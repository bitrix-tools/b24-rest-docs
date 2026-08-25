# Как изменить или удалить номера телефонов и email

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «изменения» элементов объекта CRM
>
> - [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) — пользователь с правом «изменения» элементов объекта CRM
> - [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — пользователь с правом «добавления» элемента объекта CRM
> - [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом «чтения» элементов объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Телефоны и почту Битрикс24 хранит не отдельными полями контакта, а мультиполем `fm` — набором записей типа [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). У одного контакта может быть сколько угодно таких записей: рабочая и личная почта, мобильный и рабочий телефон.

У каждой записи есть свой идентификатор `id`, который выдает Битрикс24 при создании. Изменить или удалить конкретный номер можно только по этому идентификатору: по тексту значения система запись не ищет. Поэтому сначала нужно прочитать контакт и узнать идентификаторы, а уже потом отправлять изменения.

В результате сценария у контакта изменятся рабочая почта и мобильный телефон, личная почта будет удалена, а рабочий телефон останется прежним.

Сценарий состоит из трех шагов.

1. Создать контакт с почтой и телефонами методом [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md)
2. Прочитать контакт и узнать `id` записей мультиполя методом [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
3. Изменить одни значения и удалить другие методом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md)

Если контакт уже существует, шаг 1 пропустите и начните с шага 2.

## Что нужно до начала

- вебхук создан от имени пользователя, у которого есть право изменять контакты в CRM

- в правах вебхука отмечен scope `crm`

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

- обязательные пользовательские поля контакта передавайте в шаге 1 сами: учитывает их метод или нет, зависит от настройки CRM «Проверять наличие обязательных пользовательских полей»

Сценарий показан на контакте — `entityTypeId`: `3`. Мультиполя устроены одинаково у контакта, компании и лида: что поменять для других объектов, описано в блоке [Что важно учитывать](#other-types).

## Как ключ в поле fm определяет операцию {#fm-format}

В шаге 1 поле `fm` — это массив: каждый элемент добавляет новую запись.

В шаге 3 поле `fm` — это объект, и операцию определяет ключ элемента.

#|
|| **Ключ** | **Что делает** | **Что передать в элементе** ||
|| `n0`, `n1`, `n2` ... | Добавляет новую запись | `typeId`, `valueType`, `value` ||
|| Числовой `id` записи | Меняет значение существующей записи | `typeId`, `valueType`, новый `value` ||
|| Числовой `id` записи | Удаляет запись | `typeId` и пустой `value` ||
|#

Внутри каждого элемента передаются три ключа:

- `typeId` — тип записи: `PHONE`, `EMAIL`, `WEB`, `IM`, `LINK`

- `valueType` — подтип значения: для телефона — `WORK`, `MOBILE`, `FAX`, `HOME`, `PAGER`, `MAILING`, `OTHER`; для почты — `WORK`, `HOME`, `MAILING`, `OTHER`

- `value` — само значение

{% note warning "" %}

`typeId` обязателен в каждом элементе объекта `fm`, в том числе при удалении. Без него метод не вернет ошибку, но и не выполнит операцию: ответ придет успешный, а значение останется прежним.

{% endnote %}

Записи, которых нет в объекте `fm`, метод не изменяет. Поэтому удаление задают отдельной операцией с пустым `value`, а не отсутствием записи в запросе.

## 1. Создадим контакт с почтой и телефонами {#add}

Используем метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `3` — контакт

- `fields[name]` и `fields[lastName]` — имя и фамилия контакта

- `fields[fm]` — массив записей мультиполя. Передадим две почты и два телефона

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const resultAdd = await $b24.actions.v2.call.make({
        method: 'crm.item.add',
        params: {
            entityTypeId: 3, // 3 — контакт
            fields: {
                name: 'Иван',
                lastName: 'Иванов',
                fm: [
                    { typeId: 'EMAIL', valueType: 'WORK', value: 'work_email@nomail.com' },
                    { typeId: 'EMAIL', valueType: 'HOME', value: 'home_email@nomail.com' },
                    { typeId: 'PHONE', valueType: 'WORK', value: '+79991234567' },
                    { typeId: 'PHONE', valueType: 'MOBILE', value: '+79997654321' }
                ]
            }
        },
        requestId: 'item-add'
    });

    const contactId = resultAdd.getData().result.item.id;
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
        )
    )

    item = client.crm.item.add(
        3,  # 3 — контакт
        {
            "name": "Иван",
            "lastName": "Иванов",
            "fm": [
                {"typeId": "EMAIL", "valueType": "WORK", "value": "work_email@nomail.com"},
                {"typeId": "EMAIL", "valueType": "HOME", "value": "home_email@nomail.com"},
                {"typeId": "PHONE", "valueType": "WORK", "value": "+79991234567"},
                {"typeId": "PHONE", "valueType": "MOBILE", "value": "+79997654321"},
            ],
        },
    ).response.result["item"]

    contact_id = item["id"]
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

    $resultAdd = $sb->getCRMScope()->item()->add(
        3, // 3 — контакт
        [
            'name' => 'Иван',
            'lastName' => 'Иванов',
            'fm' => [
                [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'work_email@nomail.com' ],
                [ 'typeId' => 'EMAIL', 'valueType' => 'HOME', 'value' => 'home_email@nomail.com' ],
                [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+79991234567' ],
                [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+79997654321' ]
            ]
        ]
    );

    $contactId = $resultAdd->item()->id;
    ```
{% endlist %}

Метод возвращает объект `item` с полным набором полей контакта. Ответ сокращен, показаны поля, которые подтверждают результат. Сохраните `id` контакта — он нужен шагам 2 и 3. В примере `id`: `2653`.

```json
{
    "result": {
        "item": {
            "id": 2653,
            "entityTypeId": 3,
            "name": "Иван",
            "lastName": "Иванов",
            "hasPhone": "Y",
            "hasEmail": "Y",
            "fm": [
                {
                    "id": 8553,
                    "valueType": "WORK",
                    "value": "work_email@nomail.com",
                    "typeId": "EMAIL"
                },
                {
                    "id": 8555,
                    "valueType": "HOME",
                    "value": "home_email@nomail.com",
                    "typeId": "EMAIL"
                },
                {
                    "id": 8557,
                    "valueType": "WORK",
                    "value": "+79991234567",
                    "typeId": "PHONE"
                },
                {
                    "id": 8559,
                    "valueType": "MOBILE",
                    "value": "+79997654321",
                    "typeId": "PHONE"
                }
            ]
        }
    }
}
```

## 2. Прочитаем идентификаторы записей мультиполя {#get}

Метод `crm.item.add` уже вернул массив `fm` с идентификаторами, поэтому в одном скрипте шаг 2 можно пропустить. Отдельный вызов нужен, когда контакт создан раньше и идентификаторов у вас нет.

Используем метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) с параметрами:

- `entityTypeId` — `3` для контакта

- `id` — идентификатор контакта из [шага 1](#add), в примере `2653`

{% list tabs %}

- JS

    ```javascript
    const resultGet = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: {
            entityTypeId: 3,
            id: contactId
        },
        requestId: 'item-get'
    });

    const multifields = resultGet.getData().result.item.fm;
    ```

- Python

    ```python
    multifields = client.crm.item.get(
        3,
        contact_id,
    ).response.result["item"]["fm"]
    ```


- PHP

    ```php
    $multifields = $sb->getCRMScope()->item()->get(3, $contactId)->item()->fm;
    ```
{% endlist %}

В массиве `fm` найдите нужные записи по паре `typeId` и `valueType` и сохраните их `id`. В примере рабочая почта — `8553`, личная почта — `8555`, мобильный телефон — `8559`.

```json
{
    "result": {
        "item": {
            "id": 2653,
            "name": "Иван",
            "lastName": "Иванов",
            "fm": [
                {
                    "id": 8553,
                    "valueType": "WORK",
                    "value": "work_email@nomail.com",
                    "typeId": "EMAIL"
                },
                {
                    "id": 8555,
                    "valueType": "HOME",
                    "value": "home_email@nomail.com",
                    "typeId": "EMAIL"
                },
                {
                    "id": 8557,
                    "valueType": "WORK",
                    "value": "+79991234567",
                    "typeId": "PHONE"
                },
                {
                    "id": 8559,
                    "valueType": "MOBILE",
                    "value": "+79997654321",
                    "typeId": "PHONE"
                }
            ]
        }
    }
}
```

{% note warning "" %}

Не записывайте идентификаторы записей из примера в рабочий код. Их выдает Битрикс24 в момент создания записи, поэтому у каждого контакта они свои — запрашивайте их шагом 2 и подставляйте переменными, как в блоке [Пример кода](#full-example).

{% endnote %}

## 3. Изменим и удалим записи мультиполя {#update}

Используем метод [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с параметрами:

- `entityTypeId` — `3` для контакта

- `id` — идентификатор контакта из [шага 1](#add), в примере `2653`

- `fields[fm]` — объект с операциями над записями мультиполя. Ключ каждого элемента — это `id` записи из [шага 2](#get), а операцию определяет содержимое, как описано в разделе [Как ключ в поле fm определяет операцию](#fm-format)

Выполним три операции одним запросом:

- изменим рабочую почту `8553` — передадим новый `value`

- удалим личную почту `8555` — передадим пустой `value`

- изменим мобильный телефон `8559` — передадим новый `value`

Рабочий телефон `8557` в запросе не упоминаем, поэтому он останется прежним.

{% list tabs %}

- JS

    ```javascript
    const resultUpdate = await $b24.actions.v2.call.make({
        method: 'crm.item.update',
        params: {
            entityTypeId: 3,
            id: contactId,
            fields: {
                fm: {
                    // ключ — id записи из шага 2
                    8553: { typeId: 'EMAIL', valueType: 'WORK', value: 'new_work_email@nomail.com' }, // меняем рабочую почту
                    8555: { typeId: 'EMAIL', value: '' }, // пустое значение удаляет личную почту
                    8559: { typeId: 'PHONE', valueType: 'MOBILE', value: '+79995554433' } // меняем мобильный телефон
                }
            }
        },
        requestId: 'item-update'
    });
    ```

- Python

    ```python
    result_update = client.crm.item.update(
        3,
        contact_id,
        {
            "fm": {
                # ключ — id записи из шага 2
                "8553": {"typeId": "EMAIL", "valueType": "WORK", "value": "new_work_email@nomail.com"},  # меняем рабочую почту
                "8555": {"typeId": "EMAIL", "value": ""},  # пустое значение удаляет личную почту
                "8559": {"typeId": "PHONE", "valueType": "MOBILE", "value": "+79995554433"},  # меняем мобильный телефон
            },
        },
    ).response.result["item"]
    ```


- PHP

    ```php
    $resultUpdate = $sb->getCRMScope()->item()->update(
        3,
        $contactId,
        [
            'fm' => [
                // ключ — id записи из шага 2
                8553 => [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'new_work_email@nomail.com' ], // меняем рабочую почту
                8555 => [ 'typeId' => 'EMAIL', 'value' => '' ], // пустое значение удаляет личную почту
                8559 => [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+79995554433' ] // меняем мобильный телефон
            ]
        ]
    );
    ```
{% endlist %}

Метод возвращает контакт целиком уже с новым составом записей, поэтому проверять результат отдельным запросом не обязательно. Ответ сокращен.

```json
{
    "result": {
        "item": {
            "id": 2653,
            "name": "Иван",
            "lastName": "Иванов",
            "hasEmail": "Y",
            "hasPhone": "Y",
            "updatedTime": "2026-08-20T09:10:29+03:00",
            "fm": [
                {
                    "id": 8553,
                    "valueType": "WORK",
                    "value": "new_work_email@nomail.com",
                    "typeId": "EMAIL"
                },
                {
                    "id": 8557,
                    "valueType": "WORK",
                    "value": "+79991234567",
                    "typeId": "PHONE"
                },
                {
                    "id": 8559,
                    "valueType": "MOBILE",
                    "value": "+79995554433",
                    "typeId": "PHONE"
                }
            ]
        }
    }
}
```

## Проверим результат

Откройте карточку контакта «Иван Иванов» в CRM. В блоке контактных данных остались рабочая почта `new_work_email@nomail.com`, рабочий телефон `+79991234567` и мобильный `+79995554433`. Личной почты `home_email@nomail.com` больше нет. Номера телефонов Битрикс24 показывает в своем формате, поэтому сверяйте их по цифрам, а не по написанию.

Через REST состав мультиполей возвращает метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) с теми же параметрами, что в шаге 2.

{% list tabs %}

- JS

    ```javascript
    const checkResult = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: { entityTypeId: 3, id: contactId },
        requestId: 'item-check'
    });

    console.dir(checkResult.getData().result.item.fm);
    ```

- Python

    ```python
    print(client.crm.item.get(3, contact_id).response.result["item"]["fm"])
    ```


- PHP

    ```php
    print_r($sb->getCRMScope()->item()->get(3, $contactId)->item()->fm);
    ```
{% endlist %}

Сценарий выполнен, если в массиве `fm` три записи: у `8553` новый адрес почты, у `8559` новый номер телефона, записи `8555` нет, а `8557` не изменилась.

```json
{
    "result": {
        "item": {
            "id": 2653,
            "fm": [
                {
                    "id": 8553,
                    "valueType": "WORK",
                    "value": "new_work_email@nomail.com",
                    "typeId": "EMAIL"
                },
                {
                    "id": 8557,
                    "valueType": "WORK",
                    "value": "+79991234567",
                    "typeId": "PHONE"
                },
                {
                    "id": 8559,
                    "valueType": "MOBILE",
                    "value": "+79995554433",
                    "typeId": "PHONE"
                }
            ]
        }
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `NOT_FOUND` | Элемент не найден. Проверьте `id` контакта: он мог быть удален или принадлежать другому типу объекта. Тот же код приходит, если в `entityTypeId` передан идентификатор несуществующего смарт-процесса ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | В `entityTypeId` передано значение, которому не соответствует ни один объект CRM. Для контакта нужно `3`, для компании — `4`, для лида — `1` ||
|| `ACCESS_DENIED` | У пользователя вебхука нет права изменять элементы объекта с этим `entityTypeId`. Проверьте, от чьего имени создан вебхук ||
|| `allowed_only_intranet_user` | Вебхук создан от имени внешнего пользователя. Сценарий доступен только сотрудникам Битрикс24 ||
|| `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля. Текст ошибки называет поле, которое не прошло проверку ||
|#

Отдельно проверьте случаи, когда метод отвечает успешно, но результат не тот, которого вы ждали.

- значение не изменилось, ошибки нет — в элементе объекта `fm` не передан `typeId`. Добавьте его и повторите шаг 3

- вместо изменения появилась новая запись — переданного `id` у контакта нет. Метод в этом случае не отказывает, а создает новую запись. Сверьте `id` с ответом шага 2

- в карточке появилась запись с неизвестным типом — в `typeId` передано значение не из списка `PHONE`, `EMAIL`, `WEB`, `IM`, `LINK`. Метод такие значения не проверяет и сохраняет как есть. Удалите лишнюю запись по ее `id` с пустым `value`

Шаг 2 ничего не меняет, его можно повторять сколько угодно раз. Если `crm.item.update` вернул ошибку, перечитайте контакт шагом 2 и сверьте состав записей, а потом повторите только те операции, которых в нем нет.

## Что важно учитывать {#other-types}

- если передать в `crm.item.update` поле `fm` массивом, а не объектом, метод не заменит состав мультиполей, а добавит новые записи к существующим: элементы массива он читает как ключи `n0`, `n1` и так далее

- полностью очистить телефоны или почту одним параметром нельзя. Прочитайте контакт шагом 2 и передайте пустой `value` для каждой записи нужного типа

- метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) не проверяет дубликаты. Повторный запуск примера создаст второй контакт «Иван Иванов» с теми же данными. Перед созданием ищите контакт методом [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) по телефону или почте

- если в поле `fm` передать не массив, а строку, метод ошибки не вернет: контакт создастся вообще без телефонов и почты, а поля `hasPhone` и `hasEmail` останутся со значением `N`

- пользовательские поля методы `crm.item.*` называют в camelCase — `ufCrm_1723209318` вместо `UF_CRM_1723209318`. На мультиполя это не влияет, но если в том же запросе вы меняете пользовательское поле, передавайте параметр `useOriginalUfNames`: `Y`, чтобы работать с привычными именами

- сценарий одинаково работает для контакта, компании и лида. Для компании укажите `entityTypeId`: `4` и вместо `name` и `lastName` передайте `title`, для лида — `entityTypeId`: `1`

## Пример кода {#full-example}

Скрипт создает контакт с двумя адресами почты и двумя телефонами, читает идентификаторы записей мультиполя, меняет рабочую почту и мобильный телефон, удаляет личную почту и показывает итоговый состав контактных данных.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const ENTITY_TYPE_ID = 3; // 3 — контакт, компания — 4, лид — 1

    async function call(method, params, requestId) {
        const result = await $b24.actions.v2.call.make({ method, params, requestId });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    // находит id записи мультиполя по типу и подтипу значения
    function findId(multifields, typeId, valueType) {
        const found = multifields.find(item => item.typeId === typeId && item.valueType === valueType);
        return found ? found.id : null;
    }

    async function changeContacts() {
        try {
            // Шаг 1: создаем контакт с почтой и телефонами
            const created = await call('crm.item.add', {
                entityTypeId: ENTITY_TYPE_ID,
                fields: {
                    name: 'Иван',
                    lastName: 'Иванов',
                    fm: [
                        { typeId: 'EMAIL', valueType: 'WORK', value: 'work_email@nomail.com' },
                        { typeId: 'EMAIL', valueType: 'HOME', value: 'home_email@nomail.com' },
                        { typeId: 'PHONE', valueType: 'WORK', value: '+79991234567' },
                        { typeId: 'PHONE', valueType: 'MOBILE', value: '+79997654321' }
                    ]
                }
            }, 'item-add');
            const contactId = created.item.id;
            console.log('Контакт создан, id:', contactId);

            // Шаг 2: читаем идентификаторы записей мультиполя
            const read = await call('crm.item.get', {
                entityTypeId: ENTITY_TYPE_ID,
                id: contactId
            }, 'item-get');
            const multifields = read.item.fm;

            const workEmailId = findId(multifields, 'EMAIL', 'WORK');
            const homeEmailId = findId(multifields, 'EMAIL', 'HOME');
            const mobilePhoneId = findId(multifields, 'PHONE', 'MOBILE');
            if (!workEmailId || !homeEmailId || !mobilePhoneId) {
                console.error('У контакта нет нужных записей мультиполя');
                return;
            }

            // Шаг 3: меняем одни значения и удаляем другие
            // typeId обязателен в каждом элементе, иначе операция молча не выполнится
            const updated = await call('crm.item.update', {
                entityTypeId: ENTITY_TYPE_ID,
                id: contactId,
                fields: {
                    fm: {
                        [workEmailId]: { typeId: 'EMAIL', valueType: 'WORK', value: 'new_work_email@nomail.com' },
                        [homeEmailId]: { typeId: 'EMAIL', value: '' },
                        [mobilePhoneId]: { typeId: 'PHONE', valueType: 'MOBILE', value: '+79995554433' }
                    }
                }
            }, 'item-update');

            console.log('Контактные данные обновлены:');
            console.dir(updated.item.fm);
        } catch (error) {
            console.error('Контактные данные не обновлены:', error.message);
        }
    }

    changeContacts();
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
        )
    )

    ENTITY_TYPE_ID = 3  # 3 — контакт, компания — 4, лид — 1


    def find_id(multifields, type_id, value_type):
        """Находит id записи мультиполя по типу и подтипу значения."""
        for field in multifields:
            if field["typeId"] == type_id and field["valueType"] == value_type:
                return field["id"]
        return None


    try:
        # Шаг 1: создаем контакт с почтой и телефонами
        created = client.crm.item.add(
            ENTITY_TYPE_ID,
            {
                "name": "Иван",
                "lastName": "Иванов",
                "fm": [
                    {"typeId": "EMAIL", "valueType": "WORK", "value": "work_email@nomail.com"},
                    {"typeId": "EMAIL", "valueType": "HOME", "value": "home_email@nomail.com"},
                    {"typeId": "PHONE", "valueType": "WORK", "value": "+79991234567"},
                    {"typeId": "PHONE", "valueType": "MOBILE", "value": "+79997654321"},
                ],
            },
        ).response.result["item"]
        contact_id = created["id"]
        print(f"Контакт создан, id: {contact_id}")

        # Шаг 2: читаем идентификаторы записей мультиполя
        multifields = client.crm.item.get(
            ENTITY_TYPE_ID,
            contact_id,
        ).response.result["item"]["fm"]

        work_email_id = find_id(multifields, "EMAIL", "WORK")
        home_email_id = find_id(multifields, "EMAIL", "HOME")
        mobile_phone_id = find_id(multifields, "PHONE", "MOBILE")

        if not all((work_email_id, home_email_id, mobile_phone_id)):
            print("У контакта нет нужных записей мультиполя")
        else:
            # Шаг 3: меняем одни значения и удаляем другие
            # typeId обязателен в каждом элементе, иначе операция молча не выполнится
            updated = client.crm.item.update(
                ENTITY_TYPE_ID,
                contact_id,
                {
                    "fm": {
                        str(work_email_id): {"typeId": "EMAIL", "valueType": "WORK", "value": "new_work_email@nomail.com"},
                        str(home_email_id): {"typeId": "EMAIL", "value": ""},
                        str(mobile_phone_id): {"typeId": "PHONE", "valueType": "MOBILE", "value": "+79995554433"},
                    },
                },
            ).response.result["item"]

            print("Контактные данные обновлены:")
            print(updated["fm"])
    except BitrixAPIError as error:
        print(f"Контактные данные не обновлены: {error}")
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

    $entityTypeId = 3; // 3 — контакт, компания — 4, лид — 1
    $item = $sb->getCRMScope()->item();

    // находит id записи мультиполя по типу и подтипу значения
    $findId = static function (array $multifields, string $typeId, string $valueType) {
        foreach ($multifields as $field) {
            if ($field['typeId'] === $typeId && $field['valueType'] === $valueType) {
                return $field['id'];
            }
        }
        return null;
    };

    try {
        // Шаг 1: создаем контакт с почтой и телефонами
        $contactId = $item->add(
            $entityTypeId,
            [
                'name' => 'Иван',
                'lastName' => 'Иванов',
                'fm' => [
                    [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'work_email@nomail.com' ],
                    [ 'typeId' => 'EMAIL', 'valueType' => 'HOME', 'value' => 'home_email@nomail.com' ],
                    [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+79991234567' ],
                    [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+79997654321' ]
                ]
            ]
        )->item()->id;
        echo 'Контакт создан, id: ' . $contactId . PHP_EOL;

        // Шаг 2: читаем идентификаторы записей мультиполя
        $multifields = $item->get($entityTypeId, $contactId)->item()->fm;

        $workEmailId = $findId($multifields, 'EMAIL', 'WORK');
        $homeEmailId = $findId($multifields, 'EMAIL', 'HOME');
        $mobilePhoneId = $findId($multifields, 'PHONE', 'MOBILE');
        if ($workEmailId === null || $homeEmailId === null || $mobilePhoneId === null) {
            echo 'У контакта нет нужных записей мультиполя';
            return;
        }

        // Шаг 3: меняем одни значения и удаляем другие
        // typeId обязателен в каждом элементе, иначе операция молча не выполнится
        $updated = $item->update(
            $entityTypeId,
            $contactId,
            [
                'fm' => [
                    $workEmailId => [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'new_work_email@nomail.com' ],
                    $homeEmailId => [ 'typeId' => 'EMAIL', 'value' => '' ],
                    $mobilePhoneId => [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+79995554433' ]
                ]
            ]
        );

        echo 'Контактные данные обновлены:' . PHP_EOL;
        print_r($updated->item()->fm);
    } catch (\Throwable $e) {
        echo 'Контактные данные не обновлены: ' . $e->getMessage();
    }
    ```
{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/crm-item-add.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-get.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-update.md)
- [{#T}](../../../api-reference/crm/data-types.md)
- [{#T}](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md)
- [{#T}](../how-to-add-crm-objects/how-to-add-contact.md)
