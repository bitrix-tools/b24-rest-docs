# Как отправить письмо клиенту от имени сотрудника

> Scope: [`crm`, `user_basic`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «изменение контакта»
>
> - [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — пользователь с правом на чтение контактов
> - [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) — пользователь с правом на изменение элемента CRM, для которого добавляется дело
> - [user.get](../../../api-reference/user/user-get.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Письмо клиенту можно отправить автоматически через CRM. В поле «От кого» будут указаны имя и адрес электронной почты сотрудника. В карточке контакта добавится дело типа «письмо».

Отправить письмо через REST можно и методом [mail.message.send](../../../api-reference/mail/message/mail-message-send.md), но он работает с почтовым ящиком, а не с CRM: письмо уйдет, а в карточке клиента о нем ничего не останется. Здесь задача обратная — письмо должно попасть в таймлайн контакта, и такую запись создает только [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md).

Отправка идет как побочный эффект создания дела. Битрикс24 отправит письмо, только если в одном запросе сойдутся три условия — `TYPE_ID` со значением `4`, `DIRECTION` со значением `2` и `COMPLETED` со значением `Y`. Если хотя бы одного не хватит, дело в карточке появится, но письмо не отправится.

Метод создания дела не принимает данные участников сам: адрес клиента для `COMMUNICATIONS` и подпись отправителя для `SETTINGS` нужно сначала получить из карточки контакта и профиля сотрудника. Поэтому сценарий состоит из трех шагов.

1. Получить адрес клиента и его ответственного методом [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md)

2. Получить имя и адрес ответственного методом [user.get](../../../api-reference/user/user-get.md)

3. Создать дело методом [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md), собрав из полученных значений `COMMUNICATIONS` и `SETTINGS`

В результате метод вернет идентификатор дела, дело появится в таймлайне контакта, а письмо уйдет на адрес клиента.

## Что нужно до начала

- контакт уже создан в Битрикс24, и вы знаете его идентификатор. Идентификатор возвращают методы [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) и [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md)

- у контакта заполнен адрес электронной почты. Без адреса в `COMMUNICATIONS` письму некуда уходить, и метод вернет ошибку `Email send error. "To" is not found`

- у контакта заполнено поле «Ответственный», а у самого сотрудника — адрес электронной почты. Из них соберется поле «От кого»

- вебхуку или приложению доступен скоуп `user_basic` или `user`. Скоуп `user_brief` не подойдет: он отдает данные пользователей без контактных, и `EMAIL` в ответе [user.get](../../../api-reference/user/user-get.md) не придет

- вебхук создан от имени пользователя, который может изменять этот контакт. Метод проверяет права не на дело, а на объект CRM, к которому дело привязывается

## 1. Получим данные клиента

Используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором клиента. Сохраним идентификатор в переменной `contactID` — он понадобится еще раз на шаге 3. Замените `1` на идентификатор своего контакта.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    let contactID = 1;
    const response = await $b24.actions.v2.call.make({
        method: 'crm.contact.get',
        params: { id: contactID },
        requestId: 'contact-get'
    })
    let resultContact = response.getData().result
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    contact_id = 1
    result_contact = client.crm.contact.get(
        bitrix_id=contact_id,
    ).response.result
    ```


- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $contactID = 1;
    $resultContact = $sb->getCRMScope()->contact()->get($contactID)->contact();
    ```
{% endlist %}

В результате получим данные клиента. Для следующих шагов сохраните два значения:

- `EMAIL[0].VALUE` — адрес электронной почты. Это мультиполе: метод возвращает список объектов, даже если адрес один, и не возвращает ключ `EMAIL` вовсе, если адресов у контакта нет

- `ASSIGNED_BY_ID` — идентификатор ответственного сотрудника, по нему пойдет шаг 2

Ответ сокращен до полей, которые нужны сценарию.

```json
{
    "result": {
        "ID": "1",
        "NAME": "Алексей",
        "SECOND_NAME": "Кириллович",
        "LAST_NAME": "Вронский",
        "ASSIGNED_BY_ID": "61",
        "EMAIL": [
            {
                "ID": "1328",
                "VALUE_TYPE": "WORK",
                "VALUE": "vronsky@example.ru",
                "TYPE_ID": "EMAIL"
            }
        ]
    }
}
```

## 2. Получим данные сотрудника

Чтобы получить данные ответственного сотрудника, используем метод [user.get](../../../api-reference/user/user-get.md) с фильтром по идентификатору. В фильтр `ID` передаем значение `ASSIGNED_BY_ID` из ответа шага 1.

{% list tabs %}

- JS

    ```js
    const responseUser = await $b24.actions.v2.call.make({
        method: 'user.get',
        params: {
            filter: {
                ID: resultContact.ASSIGNED_BY_ID
            }
        },
        requestId: 'user-get'
    })
    let resultUser = responseUser.getData().result
    ```

- Python

    ```python
    result_user = client.user.get(
        filter={
            "ID": result_contact["ASSIGNED_BY_ID"],
        }
    ).response.result
    ```


- PHP

    ```php
    $resultUser = $sb->getUserScope()->user()->get(
        [],
        ['ID' => $resultContact->ASSIGNED_BY_ID]
    )->getUsers();
    ```
{% endlist %}

Метод возвращает список, даже когда фильтр отбирает одного пользователя. Из первого элемента понадобятся три поля — `NAME`, `LAST_NAME` и `EMAIL`: из них соберется поле «От кого». Поле `EMAIL` у пользователя — обычная строка, а не мультиполе, как у контакта.

```json
{
    "result": [
        {
            "ID": "61",
            "ACTIVE": true,
            "NAME": "Иван",
            "LAST_NAME": "Петров",
            "EMAIL": "ivanpetrov@example.ru"
        }
    ]
}
```

## 3. Создадим дело типа «Письмо»

Подготовим переменные:

- `contactEmail` — первый элемент мультиполя `EMAIL` из ответа шага 1

- `staff` — первый элемент списка из ответа шага 2

{% list tabs %}

- JS

    ```js
    let contactEmail = resultContact.EMAIL[0];
    let staff = resultUser[0];
    ```

- Python

    ```python
    contact_email = result_contact["EMAIL"][0]
    staff = result_user[0]
    ```


- PHP

    ```php
    $emails = $resultContact->EMAIL;
    $contactEmail = reset($emails);
    $staff = reset($resultUser);
    ```
{% endlist %}

Чтобы добавить дело и отправить письмо, используем метод [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) с параметрами:

- `SUBJECT` — тема письма. Укажем `subject email now`. Пустую строку метод не принимает

- `DESCRIPTION` — текст письма. Например, `body email now`

- `DESCRIPTION_TYPE` — формат текста: `1` — обычный текст, `2` — HTML-разметка, `3` — BB-код. Зададим значение `3`

- `COMPLETED` — признак завершенного дела. Укажем `Y`. Это одно из трех условий отправки: с `N` дело останется запланированным письмом, и Битрикс24 его не отправит

- `DIRECTION` — направление дела: `1` — входящее, `2` — исходящее. Передаем `2` — второе условие отправки

- `OWNER_ID` — идентификатор объекта CRM, в карточке которого появится дело. Передаем переменную `contactID`

- `OWNER_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `3` — контакт. Полный список типов объектов возвращает метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

- `TYPE_ID` — тип дела. Укажем `4` — письмо, это третье условие отправки. Метод принимает только `1` — встреча, `2` — звонок, `4` — письмо и `6` — дело внешнего провайдера

- `COMMUNICATIONS` — контактные данные клиента, отсюда берется адрес получателя:

    - `VALUE` — адрес электронной почты, берем `contactEmail.VALUE`

    - `ENTITY_ID` — идентификатор клиента, передаем `contactID`

    - `ENTITY_TYPE_ID` — [идентификатор типа объекта](../../../api-reference/crm/data-types.md#object_type), передаем `3` — контакт

- `START_TIME` и `END_TIME` — дата и время начала и окончания дела. Укажем длительность один час

- `RESPONSIBLE_ID` — идентификатор ответственного, передаем `staff.ID`

- `SETTINGS` — дополнительные настройки:

    - `MESSAGE_FROM` — поле «От кого». Собираем строку из имени `staff.NAME`, фамилии `staff.LAST_NAME` и адреса `staff.EMAIL` в формате `Имя Фамилия <адрес>`. Адрес обязателен: Битрикс24 берет его из угловых скобок и проверяет как почтовый

Ключ `TYPE` в `COMMUNICATIONS` не передаем: для письма Битрикс24 подставит `EMAIL` сам. Если передать его вручную с другим значением, коммуникация будет отброшена и письму некуда будет уходить.

{% note warning "" %}

Следующий запрос отправляет письмо на реальный адрес из `COMMUNICATIONS`. Отменить отправку нельзя: удаление дела письмо не отзывает. Отлаживайте сценарий на тестовом контакте со своим адресом.

{% endnote %}

{% list tabs %}

- JS

    ```js
    const responseActivity = await $b24.actions.v2.call.make({
        method: 'crm.activity.add',
        params: {
            fields: {
                "SUBJECT": "subject email now",
                "DESCRIPTION": "body email now",
                "DESCRIPTION_TYPE": 3,
                "COMPLETED": "Y",
                "DIRECTION": 2,
                "OWNER_ID": contactID,
                "OWNER_TYPE_ID": 3,
                "TYPE_ID": 4,
                "COMMUNICATIONS": [
                    {
                        'VALUE': contactEmail.VALUE,
                        'ENTITY_ID': contactID,
                        'ENTITY_TYPE_ID': 3
                    }
                ],
                "START_TIME": new Date().toISOString(),
                "END_TIME": new Date(Date.now() + 3600 * 1000).toISOString(),
                "RESPONSIBLE_ID": staff.ID,
                'SETTINGS': {
                    'MESSAGE_FROM': `${staff.NAME} ${staff.LAST_NAME} <${staff.EMAIL}>`
                }
            }
        },
        requestId: 'activity-add'
    });
    ```

- Python

    ```python
    from datetime import datetime, timedelta

    now = datetime.now()

    result_activity = client.crm.activity.add(
        fields={
            "SUBJECT": "subject email now",
            "DESCRIPTION": "body email now",
            "DESCRIPTION_TYPE": 3,
            "COMPLETED": "Y",
            "DIRECTION": 2,
            "OWNER_ID": contact_id,
            "OWNER_TYPE_ID": 3,
            "TYPE_ID": 4,
            "COMMUNICATIONS": [
                {
                    "VALUE": contact_email["VALUE"],
                    "ENTITY_ID": contact_id,
                    "ENTITY_TYPE_ID": 3,
                }
            ],
            "START_TIME": now.isoformat(timespec="seconds"),
            "END_TIME": (now + timedelta(hours=1)).isoformat(timespec="seconds"),
            "RESPONSIBLE_ID": staff["ID"],
            "SETTINGS": {
                "MESSAGE_FROM": f"{staff['NAME']} {staff['LAST_NAME']} <{staff['EMAIL']}>"
            },
        }
    ).response.result
    ```


- PHP

    ```php
    $resultActivity = $sb->getCRMScope()->activity()->add(
        [
            "SUBJECT" => "subject email now",
            "DESCRIPTION" => "body email now",
            "DESCRIPTION_TYPE" => 3,// тип текста (crm.enum.contenttype): обычный, HTML, BB-код
            "COMPLETED" => "Y",// отправить сейчас
            "DIRECTION" => 2,// crm.enum.activitydirection
            "OWNER_ID" => $contactID,
            "OWNER_TYPE_ID" => 3, // crm.enum.ownertype
            "TYPE_ID" => 4, // crm.enum.activitytype
            "COMMUNICATIONS" => [
                [
                    'VALUE' => $contactEmail->VALUE,
                    'ENTITY_ID' => $contactID,
                    'ENTITY_TYPE_ID' => 3// crm.enum.ownertype
                ]
            ],
            "START_TIME" => date("Y-m-d H:i:s", time()),
            "END_TIME" => date("Y-m-d H:i:s", time() + 3600),
            "RESPONSIBLE_ID" => $staff->ID,
            'SETTINGS' => [
                'MESSAGE_FROM' => implode(
                    ' ',
                    [$staff->NAME, $staff->LAST_NAME, '<' . $staff->EMAIL . '>']
                ),
            ],
        ]
    )->getId();
    ```
{% endlist %}

Мы создали дело и в ответ получили его идентификатор `3165`. Обертки в ответе нет: `result` — это сразу число. Идентификатор можно использовать в методах [изменения](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md) и [удаления](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-delete.md) дела.

```json
{
    "result": 3165
}
```

Успешный ответ подтверждает, что дело создано, но не что письмо доставлено. Ошибки отправки метод возвращает отдельными кодами — они собраны в разделе «Ошибки и диагностика».

## Проверим результат

Откройте карточку контакта в Битрикс24. Письмо отображается в таймлайне карточки, в поле «От кого» — имя и адрес сотрудника из `MESSAGE_FROM`. Проверьте почтовый ящик клиента: письмо приходит с темой из `SUBJECT` и текстом из `DESCRIPTION`.

Через REST дела контакта возвращает метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с теми же значениями `OWNER_TYPE_ID` и `OWNER_ID`, что и на шаге 3. Поле `COMMUNICATIONS` возвращается только тогда, когда оно указано в `select`.

{% list tabs %}

- JS

    ```js
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'crm.activity.list',
        params: {
            filter: {
                "OWNER_TYPE_ID": 3,
                "OWNER_ID": contactID
            },
            select: ['*', 'COMMUNICATIONS'],
            order: { ID: 'DESC' }
        },
        requestId: 'activity-list'
    });

    console.dir(checkResponse.getData().result);
    ```

- Python

    ```python
    activities = client.crm.activity.list(
        filter={
            "OWNER_TYPE_ID": 3,
            "OWNER_ID": contact_id,
        },
        select=["*", "COMMUNICATIONS"],
        order={"ID": "DESC"},
    ).response.result
    ```


- PHP

    ```php
    // у crm.activity.list нет обертки в SDK — вызываем метод напрямую
    $activities = $sb->core->call(
        'crm.activity.list',
        [
            'filter' => [
                'OWNER_TYPE_ID' => 3,
                'OWNER_ID' => $contactID,
            ],
            'select' => ['*', 'COMMUNICATIONS'],
            'order' => ['ID' => 'DESC'],
        ]
    )->getResponseData()->getResult();
    ```
{% endlist %}

Сценарий выполнен, если в ответе есть объект с `ID` из шага 3, у него `TYPE_ID` равен `4`, `DIRECTION` — `2`, `COMPLETED` — `Y`, а в `COMMUNICATIONS` лежит адрес клиента с типом `EMAIL`.

```json
{
    "result": [
        {
            "ID": "3165",
            "OWNER_ID": "1",
            "OWNER_TYPE_ID": "3",
            "TYPE_ID": "4",
            "SUBJECT": "subject email now",
            "COMPLETED": "Y",
            "DIRECTION": "2",
            "RESPONSIBLE_ID": "61",
            "DESCRIPTION": "body email now",
            "DESCRIPTION_TYPE": "3",
            "COMMUNICATIONS": [
                {
                    "ID": "4488",
                    "TYPE": "EMAIL",
                    "VALUE": "vronsky@example.ru",
                    "ENTITY_ID": "1",
                    "ENTITY_TYPE_ID": "3"
                }
            ]
        }
    ],
    "total": 1
}
```

В ответе числовые поля приходят строками — `"TYPE_ID": "4"`, хотя в запросе передавалось число. Это не признак ошибки.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `Access denied.` | У пользователя нет права на изменение контакта из `OWNER_ID`. Проверьте, от имени какого пользователя создан вебхук ||
|| `Could not find 'CONTACT' with ID: 1` | Контакта с таким `OWNER_ID` в Битрикс24 нет. Возьмите существующий идентификатор методом [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) ||
|| `The field SUBJECT is not defined or empty` | В `SUBJECT` передана пустая строка или поле пропущено ||
|| `The field COMMUNICATIONS is not defined or invalid` | Коммуникация не передана или отброшена. Так бывает, когда у контакта нет адреса и в `VALUE` попало пустое значение, либо когда в `TYPE` передано значение, отличное от `EMAIL`. Проверьте `EMAIL` в ответе шага 1 ||
|| `Email send error. "To" is not found` | Дело создано, письмо не отправлено: среди коммуникаций нет ни одного корректного адреса получателя. Проверьте, что в `VALUE` лежит адрес, а не пустая строка ||
|| `Email send error. "From" is not found` | Дело создано, письмо не отправлено: отправитель не определен. В `SETTINGS.MESSAGE_FROM` пусто, а почтового ящика, подключенного к CRM, у сотрудника нет. Проверьте `EMAIL` в ответе шага 2 ||
|| `Email send error. Invalid email is specified` | Адрес отправителя или получателя не прошел проверку формата. Соберите `MESSAGE_FROM` как `Имя Фамилия <адрес>` и проверьте адрес клиента ||
|| `Email send error. Failed to load module "subscribe"` | В Битрикс24 не установлен модуль рассылок, через который уходит письмо. Дело создано, письмо не отправлено ||
|#

Повторяйте сценарий с того шага, который вернул ошибку. Шаги 1 и 2 ничего не создают, их можно выполнять сколько угодно раз. Ошибки с префиксом `Email send error` означают, что дело уже создано, а письмо не ушло: перед повтором удалите созданное дело методом [crm.activity.delete](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-delete.md), иначе в карточке контакта останется письмо, которого клиент не получал.

Отдельный случай — метод вернул идентификатор без ошибок, дело в карточке есть, а письмо не пришло. Проверьте, что в запросе одновременно были `TYPE_ID` со значением `4`, `DIRECTION` со значением `2` и `COMPLETED` со значением `Y`. Без любого из трех Битрикс24 создает дело молча и отправку не запускает.

## Что важно учитывать

- копия письма уходит на адрес из `MESSAGE_FROM`. Чтобы ее отключить, передайте в `SETTINGS` ключ `DISABLE_SENDING_MESSAGE_COPY` со значением `Y`

- если `MESSAGE_FROM` не передать, Битрикс24 подставит отправителя сам: сначала почтовый ящик сотрудника, подключенный к CRM, затем общий ящик CRM. Когда нет ни одного, метод вернет `Email send error. "From" is not found`

- повторный запуск примера создает еще одно дело и отправляет клиенту еще одно письмо, дубликаты не отсеиваются

- у метода [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) остановлено развитие, но для этого сценария замены нет: только он одним вызовом и отправляет письмо, и записывает его в карточку клиента. Метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) создает запланированное дело и писем не отправляет

- если запись в CRM не нужна, берите [mail.message.send](../../../api-reference/mail/message/mail-message-send.md) из раздела почты: он отправляет письмо из подключенного ящика, поддерживает копию и скрытую копию и учитывает лимиты отправки. Собрать из него цепочку «отправить и привязать к контакту» нельзя — метод не возвращает идентификатор письма, а [mail.message.createCrmActivity](../../../api-reference/mail/message/mail-message-createcrmactivity.md) требует его на входе

## Пример кода

Пример объединяет все три шага: получает данные клиента и сотрудника, добавляет дело «Письмо» и отправляет письмо клиенту. Замените `contactID` на идентификатор своего контакта, а `SUBJECT` и `DESCRIPTION` — на свой текст.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function createEmailActivityForContact() {
        try {
            let contactID = 1;

            const responseContact = await $b24.actions.v2.call.make({
                method: 'crm.contact.get',
                params: { id: contactID },
                requestId: 'contact-get'
            });
            let resultContact = responseContact.getData().result;

            if (resultContact && resultContact.ASSIGNED_BY_ID && resultContact.EMAIL) {
                const responseUser = await $b24.actions.v2.call.make({
                    method: 'user.get',
                    params: { filter: { ID: resultContact.ASSIGNED_BY_ID } },
                    requestId: 'user-get'
                });
                let resultUser = responseUser.getData().result;

                if (resultUser.length > 0) {
                    let contactEmail = resultContact.EMAIL[0];
                    let staff = resultUser[0];

                    if (contactEmail.VALUE && staff.EMAIL) {
                        const responseActivity = await $b24.actions.v2.call.make({
                            method: 'crm.activity.add',
                            params: {
                                fields: {
                                    "SUBJECT": "subject email now",
                                    "DESCRIPTION": "body email now",
                                    "DESCRIPTION_TYPE": 3,
                                    "COMPLETED": "Y",
                                    "DIRECTION": 2,
                                    "OWNER_ID": contactID,
                                    "OWNER_TYPE_ID": 3,
                                    "TYPE_ID": 4,
                                    "COMMUNICATIONS": [
                                        {
                                            'VALUE': contactEmail.VALUE,
                                            'ENTITY_ID': contactID,
                                            'ENTITY_TYPE_ID': 3
                                        }
                                    ],
                                    "START_TIME": new Date().toISOString(),
                                    "END_TIME": new Date(Date.now() + 3600 * 1000).toISOString(),
                                    "RESPONSIBLE_ID": staff.ID,
                                    'SETTINGS': {
                                        'MESSAGE_FROM': `${staff.NAME} ${staff.LAST_NAME} <${staff.EMAIL}>`
                                    }
                                }
                            },
                            requestId: 'activity-add'
                        });
                        let resultActivity = responseActivity.getData().result;

                        if (resultActivity) {
                            console.log(JSON.stringify({ 'message': 'Activity added' }));
                        } else {
                            console.log(JSON.stringify({ 'message': 'Activity not added' }));
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            console.log(JSON.stringify({ 'message': 'Activity not added: ' + error.message }));
        }
    }

    createEmailActivityForContact();
    ```

- Python

    ```python
    from datetime import datetime, timedelta

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    contact_id = 1

    try:
        contact = client.crm.contact.get(bitrix_id=contact_id).response.result
        result_activity = None

        if contact.get("ASSIGNED_BY_ID") and contact.get("EMAIL"):
            result_user = client.user.get(
                filter={"ID": contact["ASSIGNED_BY_ID"]},
            ).response.result

            if result_user:
                contact_email = contact["EMAIL"][0]
                staff = result_user[0]

                if contact_email.get("VALUE") and staff.get("EMAIL"):
                    now = datetime.now()
                    result_activity = client.crm.activity.add(
                        fields={
                            "SUBJECT": "subject email now",
                            "DESCRIPTION": "body email now",
                            "DESCRIPTION_TYPE": 3,
                            "COMPLETED": "Y",
                            "DIRECTION": 2,
                            "OWNER_ID": contact_id,
                            "OWNER_TYPE_ID": 3,
                            "TYPE_ID": 4,
                            "COMMUNICATIONS": [
                                {
                                    "VALUE": contact_email["VALUE"],
                                    "ENTITY_ID": contact_id,
                                    "ENTITY_TYPE_ID": 3,
                                }
                            ],
                            "START_TIME": now.isoformat(timespec="seconds"),
                            "END_TIME": (now + timedelta(hours=1)).isoformat(timespec="seconds"),
                            "RESPONSIBLE_ID": staff["ID"],
                            "SETTINGS": {
                                "MESSAGE_FROM": f"{staff['NAME']} {staff['LAST_NAME']} <{staff['EMAIL']}>"
                            },
                        }
                    ).response.result

        if result_activity:
            print({"message": "Activity add"})
        else:
            print({"message": "Activity not added"})
    except BitrixAPIError as error:
        print({"message": f"Activity not added: {error}"})
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $contactID = 1;
    try {
        $resultContact = $sb->getCRMScope()->contact()->get($contactID)->contact();
        $resultActivity = null;
        if (!empty($resultContact->ASSIGNED_BY_ID) && !empty($resultContact->EMAIL))
        {
            $resultUser = $sb->getUserScope()->user()->get(
                [],
                ['ID' => $resultContact->ASSIGNED_BY_ID]
            )->getUsers();
            if ($resultUser)
            {
                $emails = $resultContact->EMAIL;
                $contactEmail = reset($emails);
                $staff = reset($resultUser);
                if (!empty($contactEmail->VALUE) && !empty($staff->EMAIL))
                {
                    $resultActivity = $sb->getCRMScope()->activity()->add(
                        [
                            "SUBJECT" => "subject email now",
                            "DESCRIPTION" => "body email now",
                            "DESCRIPTION_TYPE" => 3,// тип текста (crm.enum.contenttype): обычный, HTML, BB-код
                            "COMPLETED" => "Y",// отправить сейчас
                            "DIRECTION" => 2,// crm.enum.activitydirection
                            "OWNER_ID" => $contactID,
                            "OWNER_TYPE_ID" => 3, // crm.enum.ownertype
                            "TYPE_ID" => 4, // crm.enum.activitytype
                            "COMMUNICATIONS" => [
                                [
                                    'VALUE' => $contactEmail->VALUE,
                                    'ENTITY_ID' => $contactID,
                                    'ENTITY_TYPE_ID' => 3// crm.enum.ownertype
                                ]
                            ],
                            "START_TIME" => date("Y-m-d H:i:s", time()),
                            "END_TIME" => date("Y-m-d H:i:s", time() + 3600),
                            "RESPONSIBLE_ID" => $staff->ID,
                            'SETTINGS' => [
                                'MESSAGE_FROM' => implode(
                                    ' ',
                                    [$staff->NAME, $staff->LAST_NAME, '<' . $staff->EMAIL . '>']
                                ),
                            ],
                        ]
                    )->getId();
                }
            }
        }
        if (!empty($resultActivity))
        {
            echo json_encode(['message' => 'Activity add']);
        }
        else
        {
            echo json_encode(['message' => 'Activity not added']);
        }
    } catch (\Throwable $e) {
        echo json_encode(['message' => 'Activity not added: ' . $e->getMessage()]);
    }
    ```
{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-delete.md)
- [{#T}](../../../api-reference/crm/contacts/crm-contact-get.md)
- [{#T}](../../../api-reference/user/user-get.md)
- [{#T}](../../../api-reference/crm/data-types.md)
- [{#T}](how-to-add-activity-to-contact.md)
