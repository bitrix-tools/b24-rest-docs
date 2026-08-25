# Добавить событие календаря для работы с клиентами

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «изменение контакта»
>
> - [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — пользователь с правом на чтение контактов
> - [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) — пользователь с правом на изменение элемента CRM, для которого добавляется дело

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События календаря можно добавлять автоматически, чтобы напомнить сотрудникам о встречах или звонках клиентам. В карточке контакта появится дело типа «встреча», а Битрикс24 продублирует его событием в личном календаре ответственного сотрудника: название события возьмется из `SUBJECT`, границы — из `START_TIME` и `END_TIME`.

Ключевые параметры сценария — `OWNER_TYPE_ID` и `TYPE_ID`. `OWNER_TYPE_ID` определяет, в карточке какого объекта CRM появится дело, `TYPE_ID` — каким это дело будет. Событие в календаре создает только встреча, поэтому в `TYPE_ID` передаем `1`.

Метод создания дела не принимает данные клиента сам: телефон для `COMMUNICATIONS` и ответственного для `RESPONSIBLE_ID` нужно сначала получить из карточки контакта. Поэтому сценарий состоит из двух шагов.

1. Получить телефон и ответственного методом [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md)

2. Создать дело методом [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md), подставив полученные значения в `COMMUNICATIONS` и `RESPONSIBLE_ID`

В результате метод вернет идентификатор дела, дело появится в таймлайне контакта, а событие — в календаре ответственного.

## Что нужно до начала

- контакт уже создан в Битрикс24, и вы знаете его идентификатор. Идентификатор возвращают методы [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) и [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md)

- у контакта заполнен телефон. Без коммуникации метод [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) дело не создаст и вернет ошибку `The field COMMUNICATIONS is not defined or invalid`

- у контакта заполнено поле «Ответственный». Его идентификатор попадет в `RESPONSIBLE_ID`, и именно в календаре этого сотрудника появится событие

- вебхук создан от имени пользователя, который может изменять этот контакт. Метод проверяет права не на дело, а на объект CRM, к которому дело привязывается

## 1. Получим данные клиента

Используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором клиента. Замените `1` на идентификатор своего контакта.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const contactID = 1;
    const response = await $b24.actions.v2.call.make({
        method: 'crm.contact.get',
        params: { id: contactID },
        requestId: 'contact-get'
    })
    const resultContact = response.getData().result;
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

- Go

    ```go
    // core, ctx и contactID объявлены в полном примере ниже
    res, err := core.Call(ctx, "crm.contact.get",
    	b24.Params{"id": contactID}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.get: %w", err)
    }

    // Из ответа нужны телефон и ответственный. PHONE — мультиполе: список
    // объектов, даже когда номер один, и приходит он только если у контакта
    // вообще есть телефоны.
    var contact struct {
    	ID           b24.ID `json:"ID"`
    	Name         string `json:"NAME"`
    	LastName     string `json:"LAST_NAME"`
    	AssignedByID b24.ID `json:"ASSIGNED_BY_ID"`
    	Phone        []struct {
    		ID        b24.ID `json:"ID"`
    		Value     string `json:"VALUE"`
    		ValueType string `json:"VALUE_TYPE"`
    	} `json:"PHONE"`
    }
    if err := json.Unmarshal(res.Result, &contact); err != nil {
    	return fmt.Errorf("разбор контакта: %w", err)
    }
    if len(contact.Phone) == 0 {
    	return fmt.Errorf("у контакта %d нет телефона", contactID)
    }
    ```

{% endlist %}

В результате получим данные клиента. Для следующего шага сохраните два значения:

- `PHONE[0].VALUE` — номер телефона. Это мультиполе: метод возвращает список объектов, даже если номер один, и не возвращает ключ `PHONE` вовсе, если телефонов у контакта нет

- `ASSIGNED_BY_ID` — идентификатор ответственного сотрудника

Остальные поля ответа сценарию не нужны.

```json
{
    "result": {
        "ID": "1",
        "POST": "Исполнительный директор",
        "COMMENTS": null,
        "NAME": "Алексей",
        "SECOND_NAME": "Кириллович",
        "LAST_NAME": "Вронский",
        "PHOTO": null,
        "LEAD_ID": null,
        "TYPE_ID": "SHARE",
        "SOURCE_ID": "SELF",
        "SOURCE_DESCRIPTION": null,
        "COMPANY_ID": "52",
        "BIRTHDATE": "",
        "EXPORT": "Y",
        "HAS_PHONE": "Y",
        "HAS_EMAIL": "Y",
        "HAS_IMOL": "N",
        "DATE_CREATE": "2023-08-18T12:43:42+03:00",
        "DATE_MODIFY": "2023-10-17T15:59:13+03:00",
        "ASSIGNED_BY_ID": "61",
        "CREATED_BY_ID": "57",
        "MODIFY_BY_ID": "47",
        "OPENED": "N",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "ORIGIN_VERSION": null,
        "FACE_ID": null,
        "LAST_ACTIVITY_TIME": "2025-03-15T10:38:21+02:00",
        "ADDRESS": null,
        "ADDRESS_2": null,
        "ADDRESS_CITY": null,
        "ADDRESS_POSTAL_CODE": null,
        "ADDRESS_REGION": null,
        "ADDRESS_PROVINCE": null,
        "ADDRESS_COUNTRY": null,
        "ADDRESS_LOC_ADDR_ID": null,
        "UTM_SOURCE": null,
        "UTM_MEDIUM": null,
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "LAST_ACTIVITY_BY": "1",
        "PHONE": [
            {
                "ID": "1326",
                "VALUE_TYPE": "MOBILE",
                "VALUE": "88001001020",
                "TYPE_ID": "PHONE"
            }
        ],
        "EMAIL": [
            {
                "ID": "1328",
                "VALUE_TYPE": "WORK",
                "VALUE": "vronsky@example.ru",
                "TYPE_ID": "EMAIL"
            }
        ]
    },
    "time": {
        "start": 1747737934.888428,
        "finish": 1747737934.945823,
        "duration": 0.057394981384277344,
        "processing": 0.029510021209716797,
        "date_start": "2025-05-20T13:45:34+03:00",
        "date_finish": "2025-05-20T13:45:34+03:00"
    }
}
```

## 2. Создадим событие календаря

Чтобы создать дело и событие в календаре, используем метод [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) с параметрами:

- `SUBJECT` — название дела, оно же станет названием события в календаре. Укажем `calendar title`. Пустую строку метод не принимает

- `DESCRIPTION` — описание. Например, `calendar body`

- `DESCRIPTION_TYPE` — формат текста описания: `1` — обычный текст, `2` — HTML-разметка, `3` — BB-код. Зададим значение `3`

- `OWNER_ID` — идентификатор объекта CRM, в карточке которого появится дело. Передаем `contactID` — идентификатор контакта из шага 1

- `OWNER_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `3` — контакт. Полный список типов объектов возвращает метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)

- `TYPE_ID` — тип дела. Укажем `1` — встреча. Метод принимает только `1` — встреча, `2` — звонок, `4` — письмо и `6` — дело внешнего провайдера. На других значениях он вернет ошибку

- `COMMUNICATIONS` — контактные данные клиента. Для встречи допустима ровно одна коммуникация:

    - `VALUE` — номер телефона, берем `PHONE[0].VALUE` из ответа шага 1

    - `ENTITY_ID` — идентификатор клиента, передаем `contactID`

    - `ENTITY_TYPE_ID` — [идентификатор типа объекта](../../../api-reference/crm/data-types.md#object_type), передаем `3` — контакт

Ключ `TYPE` в `COMMUNICATIONS` для встречи не передаем: Битрикс24 заполняет его автоматически только для звонков и писем, у встречи он остается пустым.

- `START_TIME` и `END_TIME` — дата и время начала и окончания в формате [ISO 8601](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom). Эти же значения станут границами события в календаре, укажем длительность один час. Замените даты из примера на будущие: прошедшую встречу метод создаст, но напоминания по ней уже не будет

- `RESPONSIBLE_ID` — идентификатор ответственного, передаем `ASSIGNED_BY_ID` из ответа шага 1. Событие появится в личном календаре именно этого сотрудника

Поле `COMPLETED` в этом сценарии не передаем: встреча запланирована, а не завершена.

{% list tabs %}

- JS

    ```javascript
    const contactPhone = resultContact.PHONE[0];

    const response = await $b24.actions.v2.call.make({
        method: 'crm.activity.add',
        params: {
            fields: {
                "SUBJECT": "calendar title",
                "DESCRIPTION": "calendar body",
                "DESCRIPTION_TYPE": 3,
                "OWNER_ID": contactID,
                "OWNER_TYPE_ID": 3,
                "TYPE_ID": 1,
                "COMMUNICATIONS": [
                    {
                        'VALUE': contactPhone.VALUE,
                        'ENTITY_ID': contactID,
                        'ENTITY_TYPE_ID': 3
                    }
                ],
                "START_TIME": "2025-05-20T14:00:00",
                "END_TIME": "2025-05-20T15:00:00",
                "RESPONSIBLE_ID": resultContact.ASSIGNED_BY_ID
            }
        },
        requestId: 'activity-add'
    });
    ```

- Python

    ```python
    contact_phone = result_contact["PHONE"][0]

    response = client.crm.activity.add(
        fields={
            "SUBJECT": "calendar title",
            "DESCRIPTION": "calendar body",
            "DESCRIPTION_TYPE": 3,
            "OWNER_ID": contact_id,
            "OWNER_TYPE_ID": 3,
            "TYPE_ID": 1,
            "COMMUNICATIONS": [
                {
                    "VALUE": contact_phone["VALUE"],
                    "ENTITY_ID": contact_id,
                    "ENTITY_TYPE_ID": 3,
                }
            ],
            "START_TIME": "2025-05-20T14:00:00",
            "END_TIME": "2025-05-20T15:00:00",
            "RESPONSIBLE_ID": result_contact["ASSIGNED_BY_ID"],
        }
    ).response
    ```

- PHP

    ```php
    $phones = $resultContact->PHONE;
    $contactPhone = reset($phones);

    $result = $sb->getCRMScope()->activity()->add(
        [
            "SUBJECT" => "calendar title",
            "DESCRIPTION" => "calendar body",
            "DESCRIPTION_TYPE" => 3,
            "OWNER_ID" => $contactID,
            "OWNER_TYPE_ID" => 3,
            "TYPE_ID" => 1,
            "COMMUNICATIONS" => [
                [
                    'VALUE' => $contactPhone->VALUE,
                    'ENTITY_ID' => $contactID,
                    'ENTITY_TYPE_ID' => 3
                ]
            ],
            "START_TIME" => "2025-05-20T14:00:00",
            "END_TIME" => "2025-05-20T15:00:00",
            "RESPONSIBLE_ID" => $resultContact->ASSIGNED_BY_ID,
        ]
    );
    ```

- Go

    ```go
    // core, ctx и contact объявлены в полном примере ниже.
    // Время начала и окончания — в формате ISO 8601. Здесь встреча на час,
    // завтра в это же время.
    start := time.Now().Add(24 * time.Hour)

    res, err = core.Call(ctx, "crm.activity.add", b24.Params{
    	"fields": b24.Params{
    		"SUBJECT":     "Встреча с клиентом",
    		"DESCRIPTION": "Обсудить условия поставки",
    		// 1 — обычный текст, 2 — HTML, 3 — BB-код.
    		"DESCRIPTION_TYPE": 3,
    		"OWNER_ID":         contact.ID,
    		"OWNER_TYPE_ID":    entityTypeContact,
    		// 1 — встреча; полный список типов дел отдаёт crm.enum.activitytype.
    		"TYPE_ID": 1,
    		// COMMUNICATIONS связывает событие с контактными данными клиента:
    		// значение берётся из мультиполя PHONE, полученного на шаге 1.
    		"COMMUNICATIONS": []b24.Params{{
    			"VALUE":          contact.Phone[0].Value,
    			"ENTITY_ID":      contact.ID,
    			"ENTITY_TYPE_ID": entityTypeContact,
    		}},
    		"START_TIME":     start.Format(time.RFC3339),
    		"END_TIME":       start.Add(time.Hour).Format(time.RFC3339),
    		"RESPONSIBLE_ID": contact.AssignedByID,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.add: %w", err)
    }

    // Обёртки нет: result — сразу идентификатор созданного дела.
    var activityID b24.ID
    if err := json.Unmarshal(res.Result, &activityID); err != nil {
    	return fmt.Errorf("разбор идентификатора события: %w", err)
    }
    ```

{% endlist %}

Мы создали дело и в ответ получили его идентификатор `6915`. Обертки в ответе нет: `result` — это сразу число. Идентификатор можно использовать в методах [изменения](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md) и [удаления](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-delete.md) дела.

```json
{
    "result": 6915
}
```

## Проверим результат

Откройте карточку контакта в Битрикс24. Встреча отображается в таймлайне карточки. Откройте календарь сотрудника из `RESPONSIBLE_ID` — событие с названием из `SUBJECT` стоит на дату из `START_TIME`.

Через REST дела контакта возвращает метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с теми же значениями `OWNER_TYPE_ID` и `OWNER_ID`, что и на шаге 2. Поле `COMMUNICATIONS` возвращается только тогда, когда оно указано в `select`.

{% list tabs %}

- JS

    ```javascript
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

Сценарий выполнен, если в ответе есть объект с `ID` из шага 2, у него `TYPE_ID` равен `1`, а в `COMMUNICATIONS` лежит телефон клиента.

```json
{
    "result": [
        {
            "ID": "6915",
            "OWNER_ID": "1",
            "OWNER_TYPE_ID": "3",
            "TYPE_ID": "1",
            "SUBJECT": "calendar title",
            "START_TIME": "2025-05-20T14:00:00+03:00",
            "END_TIME": "2025-05-20T15:00:00+03:00",
            "COMPLETED": "N",
            "RESPONSIBLE_ID": "61",
            "DESCRIPTION": "calendar body",
            "DESCRIPTION_TYPE": "3",
            "COMMUNICATIONS": [
                {
                    "ID": "1204",
                    "TYPE": "",
                    "VALUE": "88001001020",
                    "ENTITY_ID": "1",
                    "ENTITY_TYPE_ID": "3"
                }
            ]
        }
    ],
    "total": 1
}
```

В ответе числовые поля приходят строками — `"TYPE_ID": "1"`, хотя в запросе передавалось число, а `TYPE` коммуникации у встречи пустой. Это не признаки ошибки.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `Access denied.` | У пользователя нет права на изменение контакта из `OWNER_ID`. Проверьте, от имени какого пользователя создан вебхук ||
|| `Could not find 'CONTACT' with ID: 1` | Контакта с таким `OWNER_ID` в Битрикс24 нет. Возьмите существующий идентификатор методом [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) ||
|| `The field SUBJECT is not defined or empty` | В `SUBJECT` передана пустая строка или поле пропущено ||
|| `The field COMMUNICATIONS is not defined or invalid` | Коммуникация не передана или отброшена. Так бывает, когда у контакта нет телефона и в `VALUE` попало пустое значение. Проверьте `PHONE` в ответе шага 1 ||
|| `The field RESPONSIBLE_ID is not defined or invalid` | Метод не смог определить ответственного: в `RESPONSIBLE_ID` пустое или нечисловое значение, и у объекта из `OWNER_ID` ответственного тоже нет. Проверьте `ASSIGNED_BY_ID` в ответе шага 1 ||
|| `The field TYPE_ID is not defined or invalid` | В `TYPE_ID` передано значение вне диапазона `1`–`6` ||
|| `The activity type "..." is not supported in current context` | В `TYPE_ID` передан тип, недоступный через REST. Метод создает только встречи `1`, звонки `2`, письма `4` и дела провайдера `6` ||
|| `The only one communication is allowed for activity of specified type` | Во встрече передано больше одной коммуникации. Оставьте один элемент в `COMMUNICATIONS` ||
|| `Could not build binding. Please ensure that owner info and communications are defined correctly` | Не переданы ни `OWNER_ID` с `OWNER_TYPE_ID`, ни коммуникация с `ENTITY_ID` и `ENTITY_TYPE_ID`. Делу не к чему привязаться ||
|#

Повторяйте сценарий с того шага, который вернул ошибку. Шаг 1 ничего не создает, его можно выполнять сколько угодно раз. Если ошибку вернул шаг 2, дело не создано: исправьте `fields` и повторите только его.

Отдельный случай — метод вернул идентификатор, дело в карточке контакта есть, а события в календаре нет. Проверьте три условия:

- в `TYPE_ID` передана встреча `1`

- вы смотрите календарь сотрудника из `RESPONSIBLE_ID`, а не свой

- если в запросе было `COMPLETED` со значением `Y`, проверьте настройки CRM. По умолчанию завершенные встречи в календаре сохраняются, но при выключенной настройке событие для них не создается

## Что важно учитывать

- дело другого типа события в календаре не создаст. Звонок `2` и письмо `4` появятся только в таймлайне контакта

- событие создается в личном календаре сотрудника из `RESPONSIBLE_ID`, а не у автора запроса. Если поле пропустить, метод подставит ответственного за объект CRM из `OWNER_ID`

- поле `DIRECTION` для встреч не используется. Направление имеет смысл только у звонков и писем

- повторный запуск примера создает еще одно дело и еще одно событие, дубликаты не отсеиваются

- у метода [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) остановлено развитие, но для этого сценария замены нет: только он создает дело типа «встреча» с синхронизацией в календарь. Метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) создает дело другого типа — запланированное дело без типа «встреча»

## Пример кода

Пример объединяет оба шага: читает контакт, берет из ответа телефон и ответственного и создает дело «Встреча» в карточке контакта и событие длительностью один час в календаре сотрудника. Замените `contactID` на идентификатор своего контакта, а `SUBJECT` и `DESCRIPTION` — на свой текст.

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function createCalendarActivity() {
        try {
            var contactID = 1;
            const responseContact = await $b24.actions.v2.call.make({
                method: 'crm.contact.get',
                params: { id: contactID },
                requestId: 'contact-get'
            });
            var resultContact = responseContact.getData().result;

            if (resultContact.ASSIGNED_BY_ID && resultContact.PHONE) {
                var contactPhone = resultContact.PHONE[0];
                var staffID = resultContact.ASSIGNED_BY_ID;
                await $b24.actions.v2.call.make({
                    method: 'crm.activity.add',
                    params: {
                        fields: {
                            "SUBJECT": "calendar title",
                            "DESCRIPTION": "calendar body",
                            "DESCRIPTION_TYPE": 3, // тип текста (crm.enum.contenttype): обычный, HTML, BB-код
                            "OWNER_ID": contactID,
                            "OWNER_TYPE_ID": 3, // crm.enum.ownertype
                            "TYPE_ID": 1, // crm.enum.activitytype
                            "COMMUNICATIONS": [
                                {
                                    'VALUE': contactPhone.VALUE,
                                    'ENTITY_ID': contactID,
                                    'ENTITY_TYPE_ID': 3 // crm.enum.ownertype
                                }
                            ],
                            "START_TIME": new Date().toISOString(),
                            "END_TIME": new Date(new Date().getTime() + 3600 * 1000).toISOString(),
                            "RESPONSIBLE_ID": staffID,
                        }
                    },
                    requestId: 'activity-add'
                });
                console.log(JSON.stringify({ 'message': 'Activity add' }));
            } else {
                console.log(JSON.stringify({ 'message': 'Activity not added' }));
            }
        } catch (error) {
            console.error(error);
            console.log(JSON.stringify({ 'message': 'Activity not added: ' + error.message }));
        }
    }

    createCalendarActivity();
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
    result_activity = None

    try:
        contact = client.crm.contact.get(bitrix_id=contact_id).response.result

        if contact.get("ASSIGNED_BY_ID") and contact.get("PHONE"):
            contact_phone = contact["PHONE"][0]
            staff_id = contact["ASSIGNED_BY_ID"]
            now = datetime.now()
            result_activity = client.crm.activity.add(
                fields={
                    "SUBJECT": "calendar title",
                    "DESCRIPTION": "calendar body",
                    "DESCRIPTION_TYPE": 3,
                    "OWNER_ID": contact_id,
                    "OWNER_TYPE_ID": 3,
                    "TYPE_ID": 1,
                    "COMMUNICATIONS": [
                        {
                            "VALUE": contact_phone["VALUE"],
                            "ENTITY_ID": contact_id,
                            "ENTITY_TYPE_ID": 3,
                        }
                    ],
                    "START_TIME": now.isoformat(timespec="seconds"),
                    "END_TIME": (now + timedelta(hours=1)).isoformat(timespec="seconds"),
                    "RESPONSIBLE_ID": staff_id,
                }
            ).response
    except BitrixAPIError as error:
        print({"message": f"Activity not added: {error}"})
    else:
        if result_activity and result_activity.result:
            print({"message": "Activity add"})
        else:
            print({"message": "Activity not added"})
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
        if (!empty($resultContact->ASSIGNED_BY_ID) && !empty($resultContact->PHONE))
        {
            $phones = $resultContact->PHONE;
            $contactPhone = reset($phones);
            $staffID = $resultContact->ASSIGNED_BY_ID;
            $resultActivity = $sb->getCRMScope()->activity()->add(
                [
                    "SUBJECT" => "calendar title",
                    "DESCRIPTION" => "calendar body",
                    "DESCRIPTION_TYPE" => 3,// тип текста (crm.enum.contenttype): обычный, HTML, BB-код
                    "OWNER_ID" => $contactID,
                    "OWNER_TYPE_ID" => 3, // crm.enum.ownertype
                    "TYPE_ID" => 1, // crm.enum.activitytype
                    "COMMUNICATIONS" => [
                        [
                            'VALUE' => $contactPhone->VALUE,
                            'ENTITY_ID' => $contactID,
                            'ENTITY_TYPE_ID' => 3// crm.enum.ownertype
                        ]
                    ],
                    "START_TIME" => date("Y-m-d H:i:s", time()),
                    "END_TIME" => date("Y-m-d H:i:s", time() + 3600),
                    "RESPONSIBLE_ID" => $staffID,
                ]
            )->getId();
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

- Go

    ```go
    // Подготовка в пустом каталоге — go get без go mod init не сработает:
    //
    //	go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //
    //	export B24_WEBHOOK_URL='https://ваш-портал.bitrix24.ru/rest/1/токен/' && go run .
    //
    // Пример самодостаточный: он создаёт контакт с телефоном, читает его данные,
    // заводит событие календаря со ссылкой на этот контакт и убирает за собой.
    // Запускается на любом портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"fmt"
    	"log"
    	"os"
    	"time"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // entityTypeContact — идентификатор типа объекта «контакт» из crm.enum.ownertype.
    const entityTypeContact = 3

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- подготовка: свой контакт с телефоном

    	contactID, err := addContact(ctx, core)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "crm.contact.delete", b24.Params{"id": contactID})

    	// --- шаг 1: данные клиента
    	res, err := core.Call(ctx, "crm.contact.get",
    		b24.Params{"id": contactID}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.contact.get: %w", err)
    	}

    	// Из ответа нужны телефон и ответственный. PHONE — мультиполе: список
    	// объектов, даже когда номер один, и приходит он только если у контакта
    	// вообще есть телефоны.
    	var contact struct {
    		ID           b24.ID `json:"ID"`
    		Name         string `json:"NAME"`
    		LastName     string `json:"LAST_NAME"`
    		AssignedByID b24.ID `json:"ASSIGNED_BY_ID"`
    		Phone        []struct {
    			ID        b24.ID `json:"ID"`
    			Value     string `json:"VALUE"`
    			ValueType string `json:"VALUE_TYPE"`
    		} `json:"PHONE"`
    	}
    	if err := json.Unmarshal(res.Result, &contact); err != nil {
    		return fmt.Errorf("разбор контакта: %w", err)
    	}
    	if len(contact.Phone) == 0 {
    		return fmt.Errorf("у контакта %d нет телефона", contactID)
    	}
    	fmt.Printf("контакт %d %s %s, телефон %s, ответственный %d\n",
    		contact.ID, contact.Name, contact.LastName, contact.Phone[0].Value, contact.AssignedByID)

    	// --- шаг 2: событие календаря
    	// Время начала и окончания — в формате ISO 8601. Здесь встреча на час,
    	// завтра в это же время.
    	start := time.Now().Add(24 * time.Hour)

    	res, err = core.Call(ctx, "crm.activity.add", b24.Params{
    		"fields": b24.Params{
    			"SUBJECT":     "Встреча с клиентом",
    			"DESCRIPTION": "Обсудить условия поставки",
    			// 1 — обычный текст, 2 — HTML, 3 — BB-код.
    			"DESCRIPTION_TYPE": 3,
    			"OWNER_ID":         contact.ID,
    			"OWNER_TYPE_ID":    entityTypeContact,
    			// 1 — встреча; полный список отдаёт crm.enum.activitytype.
    			"TYPE_ID": 1,
    			// COMMUNICATIONS связывает событие с контактными данными клиента:
    			// значение берётся из мультиполя PHONE, полученного на шаге 1.
    			"COMMUNICATIONS": []b24.Params{{
    				"VALUE":          contact.Phone[0].Value,
    				"ENTITY_ID":      contact.ID,
    				"ENTITY_TYPE_ID": entityTypeContact,
    			}},
    			"START_TIME":     start.Format(time.RFC3339),
    			"END_TIME":       start.Add(time.Hour).Format(time.RFC3339),
    			"RESPONSIBLE_ID": contact.AssignedByID,
    		},
    	})
    	if err != nil {
    		return fmt.Errorf("crm.activity.add: %w", err)
    	}

    	// Обёртки нет: result — сразу идентификатор созданного события.
    	var activityID b24.ID
    	if err := json.Unmarshal(res.Result, &activityID); err != nil {
    		return fmt.Errorf("разбор идентификатора события: %w", err)
    	}
    	defer del(ctx, core, "crm.activity.delete", b24.Params{"id": activityID})

    	fmt.Printf("событие %d создано на %s\n", activityID, start.Format("02.01.2006 15:04"))
    	return nil
    }

    // --- вспомогательное: подготовка данных и уборка

    // addContact создаёт контакт с телефоном: страница берёт готовый контакт с
    // идентификатором 1, но на чужом портале это другой человек или никого.
    func addContact(ctx context.Context, core *b24.Core) (b24.ID, error) {
    	res, err := core.Call(ctx, "crm.contact.add", b24.Params{
    		"fields": b24.Params{
    			"NAME":      "Алексей",
    			"LAST_NAME": "Вронский",
    			// Мультиполе: строка без ID ДОБАВЛЯЕТ значение. MultifieldAdd
    			// собирает её за вас, чтобы не путаться в ключах.
    			"PHONE": []map[string]any{
    				b24.MultifieldAdd("+7 800 100-10-20", "MOBILE"),
    			},
    		},
    	})
    	if err != nil {
    		return 0, fmt.Errorf("crm.contact.add: %w", err)
    	}
    	var id b24.ID
    	return id, json.Unmarshal(res.Result, &id)
    }

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна подменить собой настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, params b24.Params) {
    	if _, err := core.Call(ctx, method, params); err != nil {
    		fmt.Fprintf(os.Stderr, "уборка, %s: %v\n", method, err)
    	}
    }
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-update.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-delete.md)
- [{#T}](../../../api-reference/crm/contacts/crm-contact-get.md)
- [{#T}](../../../api-reference/crm/data-types.md)
- [{#T}](how-to-send-email.md)
