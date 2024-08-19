# Получить список комментариев

> Название метода: **crm.timeline.comment.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод получает список всех дела типа «Комментарий» элемента CRM.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля объекта [result](./crm-timeline-comment-fields.md#fields)). Если не передан или передан пустой массив, то результат вернет пустой массив ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных комментариев в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [result](./crm-timeline-comment-fields.md#fields). 

Обязательные поля: `ENTITY_ID`, `ENTITY_TYPE`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения, начинающиеся с «мол»
    - `"%мол"` — ищем значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения, не начинающиеся с «мол»
    - `"%мол"` — ищем значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных комментариев в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [result](./crm-timeline-comment-fields.md#fields). 
 
Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ENTITY_ID":10,"ENTITY_TYPE":"deal"},"select":["ID","CREATED","ENTITY_ID","ENTITY_TYPE","AUTHOR_ID","COMMENT","FILES"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.timeline.comment.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ENTITY_ID":10,"ENTITY_TYPE":"deal"},"select":["ID","CREATED","ENTITY_ID","ENTITY_TYPE","AUTHOR_ID","COMMENT","FILES"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.comment.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.timeline.comment.list",
        {
            filter: {
                "ENTITY_ID": 10,
                "ENTITY_TYPE": "deal",
            },
            select: [
                "ID",
                "CREATED",
                "ENTITY_ID",
                "ENTITY_TYPE",
                "AUTHOR_ID",
                "COMMENT", 
                "FILES",
            ],
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.comment.list',
        [
            'filter' => [
                'ENTITY_ID' => 10,
                'ENTITY_TYPE' => 'deal',
            ],
            'select' => [
                'ID',
                'CREATED',
                'ENTITY_ID',
                'ENTITY_TYPE',
                'AUTHOR_ID',
                'COMMENT',
                'FILES',
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
    "result": [
        {
            "ID": "999",
            "ENTITY_ID": "2",
            "ENTITY_TYPE": "deal",
            "CREATED": "2020-03-02T12:00:00+03:00",
            "COMMENT": "New comment was added",
            "AUTHOR_ID": "1",
            "FILES": {
                "1": {
                    "id": 1,
                    "date": "2020-03-02T12:00:00+03:00",
                    "type": "image",
                    "name": "1.gif",
                    "size": 43,
                    "image": {
                        "width": 1,
                        "height": 1
                    },
                    "authorId": 1,
                    "authorName": "Иван Михайлов",
                    "urlPreview": "https://mydomain.loc/disk/showFile/930/?&ncc=1&width=640&height=640&signature=292f450929833cd881070155e05a2c41b5bb265ea8c8c1bc2108dbcbb56f667f&ts=1718366521&filename=1.gif",
                    "urlShow": "https://mydomain.loc/disk/showFile/930/?&ncc=1&ts=1718366521&filename=1.gif",
                    "urlDownload": "https://mydomain.loc/disk/downloadFile/930/?&ncc=1&filename=1.gif"
                },
                "2": {
                    "id": 2,
                    "date": "2020-03-02T12:00:00+03:00",
                    "type": "image",
                    "name": "2.gif",
                    "size": 43,
                    "image": {
                        "width": 1,
                        "height": 1
                    },
                    "authorId": 1,
                    "authorName": "Иван Михайлов",
                    "urlPreview": "https://mydomain.loc/disk/showFile/931/?&ncc=1&width=640&height=640&signature=118de010a40eff06fb9d691ee9235e2ef809a17780e46927bf8b12f8dc3224db&ts=1718366521&filename=2.gif",
                    "urlShow": "https://mydomain.loc/disk/showFile/931/?&ncc=1&ts=1718366521&filename=2.gif",
                    "urlDownload": "https://mydomain/disk/downloadFile/931/?&ncc=1&filename=2.gif"
                }
            },
        },
        {
            "ID": "1000",
            "ENTITY_ID": "2",
            "ENTITY_TYPE": "deal",
            "CREATED": "2020-03-02T12:00:00+03:00",
            "COMMENT": "Test comment",
            "AUTHOR_ID": "1",
            "FILES": {},
        }
    ],
    "total": 2,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Корневой элемент ответа, содержащий массив объектов с информацией о выбранных комментариях ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Access denied. | Отсутствуют права на редактирование сущности в CRM ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-comment-add.md)
- [{#T}](./crm-timeline-comment-update.md)
- [{#T}](./crm-timeline-comment-get.md)
- [{#T}](./crm-timeline-comment-delete.md)
- [{#T}](./crm-timeline-comment-fields.md)