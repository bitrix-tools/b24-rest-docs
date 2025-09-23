# Получить список дел crm.activity.list

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.list` возвращает список активностей по фильтру с учетом прав текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив полей дела [crm.activity.fields](./crm-activity-fields.md), которые необходимо выбрать.
Чтобы получить поля `COMMUNICATIONS` и `FILES` укажите их в select.
||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбираемых элементов в формате ключ-значение.

Возможные значения для `field` соответствуют полям дела [crm.activity.fields](./crm-activity-fields.md).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - "мол%" — ищем значения, начинающиеся с «мол»
  - "%мол" — ищем значения, заканчивающиеся на «мол»
  - "%мол%" — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (см. описание выше)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - "мол%" — ищем значения, не начинающиеся с «мол»
  - "%мол" — ищем значения, не заканчивающиеся на «мол»
  - "%мол%" — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (см. описание выше)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно
- `!` — не равно
||
|| **order**
[`object`](../../../data-types.md) | Набор пар ключ-значение для сортировки результатов вывода.
В качестве ключей можно использовать смотрите поля дела [crm.activity.fields](./crm-activity-fields.md).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания

По-умолчанию сортируется по увеличению поля Дата начала (`START_TIME`)
||
|| **start**
  [`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

Cм. описание [списочных методов](../../../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

{% note info "" %}

Обратите внимание на особенность параметра `filter[BINDINGS]`.

Дело может быть привязано к нескольким сущностям CRM. Например, звонок одновременно может быть привязан к лиду и к сделке, поэтому для получения этих сущностей в параметрах метода `crm.activity.list` есть специальный ключ фильтра - `BINDINGS`. 

В нем нужно указать массив [системных](../../../index.md) или [пользовательских](../../../universal/user-defined-object-types/index.md) типов объектов CRM, для которых требуется найти привязку.

Каждый объект может состоять из ключей `OWNER_TYPE_ID` (идентификатор типа сущности) и `OWNER_ID` (идентификатор сущности), причем как одного, так и их комбинации. Например:

```json
"BINDINGS": [
    {"OWNER_TYPE_ID": 2},
    {"OWNER_TYPE_ID": 3}
]
```

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"DESC"},"filter":{"OWNER_TYPE_ID":3,"OWNER_ID":102},"select":["*","COMMUNICATIONS"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"DESC"},"filter":{"OWNER_TYPE_ID":3,"OWNER_ID":102},"select":["*","COMMUNICATIONS"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.list
    ```

- JS

    В примере мы получаем список дел контакта с `ID` = 102.

    ```js
    BX24.callMethod(
        "crm.activity.list",
        {
            order: { "ID": "DESC" },
            filter:
            {
                "OWNER_TYPE_ID": 3,
                "OWNER_ID": 102
            },
            select: [ "*", "COMMUNICATIONS" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.list',
        [
            'order' => [ 'ID' => 'DESC' ],
            'filter' => [
                'OWNER_TYPE_ID' => 3,
                'OWNER_ID' => 102
            ],
            'select' => [ '*', 'COMMUNICATIONS' ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](./crm-activity-list.md#example-bindings)
- [{#T}](./crm-activity-list.md#example-communications)
- [{#T}](./crm-activity-list.md#example-files)

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "20",
            "OWNER_ID": "15",
            "OWNER_TYPE_ID": "3",
            "TYPE_ID": "2",
            "PROVIDER_ID": "VOXIMPLANT_CALL",
            "PROVIDER_TYPE_ID": "CALL",
            "PROVIDER_GROUP_ID": null,
            "ASSOCIATED_ENTITY_ID": "0",
            "SUBJECT": "Исходящий звонок Андрей Николаев",
            "CREATED": "2020-09-27T13:26:55+03:00",
            "LAST_UPDATED": "2021-03-21T20:28:24+03:00",
            "START_TIME": "2020-09-27T13:25:00+03:00",
            "END_TIME": "2020-09-27T19:25:00+03:00",
            "DEADLINE": "2020-09-27T13:25:00+03:00",
            "COMPLETED": "Y",
            "STATUS": "2",
            "RESPONSIBLE_ID": "505",
            "PRIORITY": "2",
            "NOTIFY_TYPE": "1",
            "NOTIFY_VALUE": "15",
            "DESCRIPTION": "",
            "DESCRIPTION_TYPE": "1",
            "DIRECTION": "2",
            "LOCATION": "",
            "SETTINGS": [],
            "ORIGINATOR_ID": null,
            "ORIGIN_ID": null,
            "AUTHOR_ID": "505",
            "EDITOR_ID": "505",
            "PROVIDER_PARAMS": [],
            "PROVIDER_DATA": null,
            "RESULT_MARK": "0",
            "RESULT_VALUE": null,
            "RESULT_SUM": null,
            "RESULT_CURRENCY_ID": null,
            "RESULT_STATUS": "0",
            "RESULT_STREAM": "0",
            "RESULT_SOURCE_ID": null,
            "AUTOCOMPLETE_RULE": "0"
        },
        // .. Еще 49 элементов
    ],
    "next": 50,
    "total": 123456,
    "time": {
        "start": 1724677896.295857,
        "finish": 1724677897.197243,
        "duration": 0.901386022567749,
        "processing": 0.8762130737304688,
        "date_start": "2024-08-26T16:11:36+03:00",
        "date_finish": "2024-08-26T16:11:37+03:00",
        "operating_reset_at": "2024-08-26T16:11:37+03:00",
        "operating": 0.0162130737304688
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат операции. Массив дел. Для получения информации о структуре дела смотрите метод [crm.activity.fields](./crm-activity-fields.md) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "INVALID_REQUEST",
    "error_description": "Https required"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Частные примеры

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

### Использование BINGINDS {#example-bindings}

Получить поля: Идентификатор, Название, Тип собственника (Идентификатор типа сущности), Собственник (Идентификатор сущности)

Условие отбора: дело привязано одновременно к сделке и к контакту

{% note info %}

При использовании нескольких пар в `BINDINGS` в результатах возможно дублирование. Например в результате выполнения примера кода ниже, дело привязанное к обоим сущностям, будет выведено дважды.

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"DESC"},"filter":{"BINDINGS":[{"OWNER_TYPE_ID":2},{"OWNER_TYPE_ID":3}]},"select":["*","COMMUNICATIONS"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"DESC"},"filter":{"BINDINGS":[{"OWNER_TYPE_ID":2},{"OWNER_TYPE_ID":3}]},"select":["*","COMMUNICATIONS"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.list
    ```

- JS

    ```js
    BX24.callMethod(
            "crm.activity.list",
            {
                order: { "ID": "DESC" },
                filter:
                {
                    "BINDINGS": [
                        {"OWNER_TYPE_ID": 2},
                        {"OWNER_TYPE_ID": 3}
                    ]
                },
                select: [ "*", "COMMUNICATIONS" ]
            },
            function(result)
            {
                if(result.error())
                    console.error(result.error());
                else
                {
                    console.dir(result.data());
                    if(result.more())
                        result.next();
                }
            }
        );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.list',
        [
            'order' => ['ID' => 'DESC'],
            'filter' => [
                'BINDINGS' => [
                    ['OWNER_TYPE_ID' => 2],
                    ['OWNER_TYPE_ID' => 3]
                ]
            ],
            'select' => ['*', 'COMMUNICATIONS']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Получение COMMUNICATIONS {#example-communications}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ID":"20"},"select":["*","COMMUNICATIONS"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ID":"20"},"select":["*","COMMUNICATIONS"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.list
    ```

- JS

    ```js
    BX24.callMethod(
            "crm.activity.list",
            {
                filter:
                {
                    "ID": '20'
                },
                select: [ "*", "COMMUNICATIONS" ]
            },
            function(result)
            {
                if(result.error())
                    console.error(result.error());
                else
                {
                    console.dir(result.data());
                    if(result.more())
                        result.next();
                }
            }
        );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.list',
        [
            'filter' => [
                'ID' => '20'
            ],
            'select' => ['*', 'COMMUNICATIONS']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

#### Пример возвращаемых данных

HTTP-статус: **200**

```json
{
    "result": [
        {
        "ID": "20",
        "COMMUNICATIONS": [
            {
                "ID": "23",
                "TYPE": "PHONE",
                "VALUE": "89152222222",
                "ENTITY_ID": "15",
                "ENTITY_TYPE_ID": "3",
                "ENTITY_SETTINGS": {
                    "HONORIFIC": "1",
                    "NAME": "Андрей ",
                    "SECOND_NAME": "Николаев",
                    "LAST_NAME": "",
                    "COMPANY_TITLE": "ООО Фьюжн",
                    "COMPANY_ID": "21"
                }
            }
        ]
    }
    ],
    "total": 1,
    "time": {
        "start": 1724659407.69855,
        "finish": 1724659407.723506,
        "duration": 0.02495598793029785,
        "processing": 0.003489971160888672,
        "date_start": "2024-08-26T11:03:27+03:00",
        "date_finish": "2024-08-26T11:03:27+03:00"
    }
}
```

### Получение вложений {#example-files}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ID":"101121"},"select":["*","STORAGE_ELEMENT_IDS"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ID":"101121"},"select":["*","STORAGE_ELEMENT_IDS"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.list
    ```

- JS

    ```js
    BX24.callMethod(
            "crm.activity.list",
            {
                filter:
                {
                    "ID": '101121'
                },
                select: [ "*", "STORAGE_ELEMENT_IDS" ]
            },
            function(result)
            {
                if(result.error())
                    console.error(result.error());
                else
                {
                    console.dir(result.data());
                    if(result.more())
                        result.next();
                }
            }
        );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.list',
        [
            'filter' => [
                'ID' => '101121'
            ],
            'select' => ['*', 'STORAGE_ELEMENT_IDS']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

#### Пример возвращаемых данных

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "101121",
            "FILES": [
                {
                    "id": 3101820,
                    "url": "http://xxx.bitrix24.com/bitrix/tools/crm_show_file.php?fileId=3101820&ownerTypeId=6&ownerId=101121&auth="
                }
            ]
        }
    ],
    "total": 1,
    "time": {
        "start": 1724659652.591025,
        "finish": 1724659652.623784,
        "duration": 0.03275895118713379,
        "processing": 0.00624394416809082,
        "date_start": "2024-08-26T11:07:32+03:00",
        "date_finish": "2024-08-26T11:07:32+03:00"
    }
}
```

## Продолжите изучение 

- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity.md)
- [{#T}](../../../../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md)