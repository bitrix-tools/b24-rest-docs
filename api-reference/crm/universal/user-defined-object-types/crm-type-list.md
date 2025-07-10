# Получить список пользовательских типов crm.type.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод получает список настроек смарт-процессов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`][1]  | Объект формата: `{ field_1: value_1, field_2: value_2, ..., field_n: value_n }`, где
* `field_n`: название поля по которому будет произведена сортировка выборки смарт-процессов
* `value_n`: значение типа `string`, равное: 
  * `ASC` — сортировка по возрастанию
  * `DESC` — сортировка по убыванию

Возможные значения для `field` соответствуют полям объекта [type](../../data-types.md#type)
 ||
|| **filter**
[`object`][1]  | Объект формата: `{ field_1: value_1, field_2: value_2, ..., field_n: value_n }`, где
* `field_n`: название поля по которому будет отфильтрована выборка смарт-процессов
* `value_n`: значение фильтра

Возможные значения для `field` соответствуют полям объекта [type](../../data-types.md#type)

Фильтр может иметь неограниченную вложенность и количество условий.
По умолчанию все условия соединяются друг с другом как `AND` (логическое И). Если нужно использовать `OR` (Логическое ИЛИ), то можно передать специальный ключ `logic` со значением `OR`.

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

 ||
|| **start**
[`integer`][1] | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Получить список всех смарт-процессов, у которых `title` содержит или `5`, или `0`. Полученный список отсортировать по убыванию `id`

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":[{"logic":"OR",{"%title":"5"},{"%title":"0"}]},"order":{"id":"DESC"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.type.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":[{"logic":"OR",{"%title":"5"},{"%title":"0"}]},"order":{"id":"DESC"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.type.list
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.type.list', 
            {
                filter: {
                    "0": {
                        logic: 'OR',
                        "0": {
                            "%title": "5",
                        },
                        "1": {
                            "%title": "0",
                        },
                    },
                },
                order: {
                    id: 'DESC',
                },
            },
            (result) => {
                if (result.error())
                {
                    console.error(result.error());

                    return;
                }

                console.info(result.data());
            },
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.type.list',
            [
                'filter' => [
                    [
                        'logic' => 'OR',
                        [
                            '%title' => '5',
                        ],
                        [
                            '%title' => '0',
                        ],
                    ],
                ],
                'order' => [
                    'id' => 'DESC',
                ],
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Получить список смарт-процессов, у которых:
   - Включены роботы и триггеры (`isAutomationEnabled`)
   - Включен дизайнер бизнес процессов (`isBizProcEnabled`)
   - Включены свои воронки и туннели продаж (`isCategoriesEnabled`)
   - Включены свои стадии и канбан (`isClientEnabled`)

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":{"isAutomationEnabled":"Y","isBizProcEnabled":"Y","isCategoriesEnabled":"Y","isClientEnabled":"Y"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":{"isAutomationEnabled":"Y","isBizProcEnabled":"Y","isCategoriesEnabled":"Y","isClientEnabled":"Y"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.type.list
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.type.list',
            {
                filter: {
                    isAutomationEnabled: 'Y',
                    isBizProcEnabled: "Y",
                    isCategoriesEnabled: "Y",
                    isClientEnabled: "Y",
                },
            },
            (result) => {
                if (result.error())
                {
                    console.error(result.error());

                    return;
                }

                console.info(result.data());
            },
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.type.list',
            [
                'filter' => [
                    'isAutomationEnabled' => 'Y',
                    'isBizProcEnabled' => 'Y',
                    'isCategoriesEnabled' => 'Y',
                    'isClientEnabled' => 'Y',
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "types": [
            {
                "id": 37,
                "title": "Смарт-процесс #20",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 1256,
                "customSectionId": null,
                "isCategoriesEnabled": "Y",
                "isStagesEnabled": "N",
                "isBeginCloseDatesEnabled": "Y",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "N",
                "isMycompanyEnabled": "Y",
                "isDocumentsEnabled": "Y",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "Y",
                "isRecyclebinEnabled": "Y",
                "isAutomationEnabled": "Y",
                "isBizProcEnabled": "N",
                "isSetOpenPermissions": "N",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2024-07-08T17:24:55+02:00",
                "updatedTime": "2024-07-08T17:24:55+02:00",
                "updatedBy": 1
            },
            {
                "id": 32,
                "title": "Смарт-процесс #15",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 1246,
                "customSectionId": null,
                "isCategoriesEnabled": "N",
                "isStagesEnabled": "Y",
                "isBeginCloseDatesEnabled": "N",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "Y",
                "isMycompanyEnabled": "N",
                "isDocumentsEnabled": "N",
                "isSourceEnabled": "N",
                "isObserversEnabled": "N",
                "isRecyclebinEnabled": "N",
                "isAutomationEnabled": "N",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2024-07-08T17:24:52+02:00",
                "updatedTime": "2024-07-08T17:24:52+02:00",
                "updatedBy": 1
            },
            {
                "id": 27,
                "title": "Смарт-процесс #10",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 1236,
                "customSectionId": null,
                "isCategoriesEnabled": "N",
                "isStagesEnabled": "Y",
                "isBeginCloseDatesEnabled": "Y",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "N",
                "isLinkWithProductsEnabled": "N",
                "isMycompanyEnabled": "Y",
                "isDocumentsEnabled": "N",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "N",
                "isRecyclebinEnabled": "N",
                "isAutomationEnabled": "Y",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2024-07-08T17:24:50+02:00",
                "updatedTime": "2024-07-08T17:24:50+02:00",
                "updatedBy": 1
            },
            {
                "id": 22,
                "title": "Смарт-процесс #5",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 1226,
                "customSectionId": null,
                "isCategoriesEnabled": "Y",
                "isStagesEnabled": "N",
                "isBeginCloseDatesEnabled": "N",
                "isClientEnabled": "N",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "Y",
                "isMycompanyEnabled": "N",
                "isDocumentsEnabled": "N",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "Y",
                "isRecyclebinEnabled": "Y",
                "isAutomationEnabled": "N",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2024-07-08T17:24:48+02:00",
                "updatedTime": "2024-07-08T17:24:48+02:00",
                "updatedBy": 1
            }
        ]
    },
    "time": {
        "start": 1720516793.835427,
        "finish": 1720516794.697913,
        "duration": 0.8624858856201172,
        "processing": 0.07323503494262695,
        "date_start": "2024-07-09T11:19:53+02:00",
        "date_finish": "2024-07-09T11:19:54+02:00",
        "operating": 0
    },
    "total": 4
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит единственный ключ `types` ||
|| **types**
[`type[]`](../../data-types.md#type) | Список смарт-процессов, каждый из которых соответствует структуре объекта [type](../../data-types.md#type) ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|| **total**
[`integer`][1]| Общее количество найденных записей || 
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок
#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет административных прав CRM ||
|| `400` | `INVALID_ARG_VALUE` | Invalid filter: field `'field_n'` is not allowed in filter | Возникает, при передаче отсутствующего в смарт-процессе поля `field_n` в параметр `filter` ||
|| `400` | `INVALID_ARG_VALUE` | Invalid filter: field `'field_n'` has invalid value | Возникает, при передаче некорректного `value_n` для поля `field_n` в параметр `filter` ||
|| `400` | `INVALID_ARG_VALUE` | Invalid order: field `'field_n'` is not allowed in order | Возникает, при передаче отсутствующего в смарт-процессе поля `field_n` в параметр `order` ||
|| `400` | `INVALID_ARG_VALUE` | Invalid order: allowed sort directions are `ASC, DESC`. But got `'invalid_value'` for field `'field_n'` | Возникает, при передаче некорректного `value_n` для поля `field_n` в параметр `order` ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-type-add.md)
- [{#T}](./crm-type-update.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-delete.md)
- [{#T}](./crm-type-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)

[1]: ../../../data-types.md