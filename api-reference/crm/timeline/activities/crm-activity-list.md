# Получение списка дел

{% note info "crm.activity.list" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.activity.list` возвращает список активностей по фильтру с учетом прав текущего пользователя.

## Параметры


#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые необходимо выбрать (смотрите поля дела [crm.activity.fields](./crm-activity-fields.md)).
Для получения `COMMUNICATIONS` и `FILES` (`STORAGE_ELEMENT_IDS`) их надо явно указать в select.
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбираемых элементов в формате ключ-значение.

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
  || **filter[BINDINGS]** 
  [`array`](../../data-types.md) | Дело может быть привязано к нескольким сущностям поэтому для их получения есть специальный ключ фильтра - `BINDINGS`, он принимает в себя массв объектов для которых требуется найти привязку.
Каждый объект может состоять из ключей `OWNER_TYPE_ID` (идентификатор типа сущности) и `OWNER_ID` (идентификатор сущности), причем как одного, так и их комбинации.
||
|| **order** 
[`object`](../../data-types.md) | Набор пар ключ-значение для сортировки результатов вывода.
В качестве ключей можно использовать смотрите поля дела [crm.activity.fields](./crm-activity-fields.md).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания 

По-умолчанию сортируется по увеличению поля Дата начала (`START_TIME`)

||
|| **start**
  [`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

Cм. описание [списочных методов](../../../how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

{% list tabs %}

- cURL
    
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["*"], "start":"50", "filter":{"PROVIDER_ID": CRM_TODO},"order":{"START_TIME": "ASC"},"auth":"**put_access_token_here**"}' \
    https://xxx.bitrix24.com/rest/crm.activity.list.json
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
    $result = CRest::call('crm.activity.list', [
        'SELECT' => ['*', 'COMMUNICATIONS'],
        'FILTER' => [
            'OWNER_TYPE_ID' => 3,
            'OWNER_ID'      => 102
        ],
        'ORDER' => [
            'ID' => 'DESC',
        ],     
    ]);
    ```

{% endlist %}

## Некоторые практические примеры

{% list tabs %}

- Использование BINGINDS

    Получить поля: Идентификатор, Название, Тип собственника (Идентификатор типа сущности), Собственник (Идентификатор сущности)
    Условие отбора: дело привязано одновременно к сделке и к контакту
    
    
    ```bash
    curl --location 'https://xxx.bitrix24.com/rest/crm.activity.list' \
    --header 'Content-Type: application/json' \
    --data '{
        "select": ["ID", "SUBJECT", "OWNER_TYPE_ID", "OWNER_ID"],
        "filter": {
            "BINDINGS": [
                {"OWNER_TYPE_ID": 2},
                {"OWNER_TYPE_ID": 3}
            ]
        },
        "auth":"**put_access_token_here**",
        "order": {
            "ID": "asc"
        }
    }'
    ```
    
    {% note info %}
    
    При использовании нескольких пар в `BINDINGS` в результатах возможно дублирование. Например в приведенном выше фрагменте дело привязанное к обоим сущностям будет выведено дважды.
    
    {% endnote %}

- Получение COMMUNICATIONS

    ```bash
    curl --location 'https://xxx.bitrix24.com/rest/crm.activity.list' \
    --header 'Content-Type: application/json' \
    --data '{
        "select": ["ID", "COMMUNICATIONS"],
        "filter": {
            "ID": 20
        },
        "auth":"**put_access_token_here**"
    }'
    ```
    
    Пример результата:
    
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

- Получение вложений

    ```bash
    curl --location 'https://xxx.bitrix24.com/rest/crm.activity.list' \
    --header 'Content-Type: application/json' \
    --data '{
        "select": ["ID", "STORAGE_ELEMENT_IDS"],
        "filter": {
            "ID": 101121
        },
        "auth":"**put_access_token_here**"
    }'
    ```
    
    Пример результата:
    
    ```json
    {
        "result": [
            {
                "ID": "101121",
                "FILES": [
                    {
                        "id": 3101820,
                        "url": "http://xxx.bitrix24.ru/bitrix/tools/crm_show_file.php?fileId=3101820&ownerTypeId=6&ownerId=101121&auth="
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% endlist %}


## Ответ в случае успеха

> 200 OK

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
|| **Значение** / **Тип** | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Результат запроса. Массив лидов. Для получения информации о структуре лида смотрите метод [crm.activity.fields](./crm-activity-fields.md) ||
|| **next**
[`integer`](../../data-types.md) | Значение, которое нужно послать для получение следующей страницы данных списочного метода. Показывается в случае, если такие элементы существуют. ||
|| **total**
[`integer`](../../data-types.md) | Общее количество лидов, удовлетворяющее запросу ||
|| **time**
[`array`](../../data-types.md) | Информация о времени выполнения запроса ||
|| **start**
[`double`](../../data-types.md) | Timestamp момента инициализации запроса ||
|| **finish**
[`double`](../../data-types.md) | Timestamp момента завершения выполнения запроса ||
|| **duration**
[`double`](../../data-types.md) | Как долго в миллисекундах выполнялся запрос (finish - start) ||
|| **date_start**
[`string`](../../data-types.md) | Строковое представление даты и времени момента инициализации запроса ||
|| **date_finish**
[`double`](../../data-types.md) | Строковое представление даты и времени момента завершения запроса ||
|| **operating_reset_at**
[`timestamp`](../../data-types.md) | Timestamp момента, когда будет сброшен лимит на ресурсы REST API. Читайте подробности в статье [лимит на операции](../../../../limits.md) ||
|| **operating**
[`double`](../../data-types.md) | Через сколько миллисекунд будет сброшен лимит на ресурсы REST API? Читайте подробности в статье [лимит на операции](../../../../limits.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}
