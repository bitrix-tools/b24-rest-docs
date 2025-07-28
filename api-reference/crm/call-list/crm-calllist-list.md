# Получить список обзвонов crm.calllist.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.list` возвращает список дел обзвонов.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../../data-types.md) | Массив полей для выборки. По умолчанию возвращаются все поля.
Список полей для выборки:
- `ID`,
- `DATE_CREATE`,
- `CREATED_BY_ID`,
- `WEBFORM_ID`,
- `ENTITY_TYPE_ID` ||
|| **FILTER**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет отфильтрована выборка обзвонов
- `value_n` — значение фильтра

Список полей для фильтрации:
- `ID`,
- `CREATED_BY_ID`,
- `WEBFORM_ID`,
- `ENTITY_TYPE_ID`.
  
Полю может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно,
- `>` — больше,
- `<=` — меньше либо равно,
- `<` — меньше,
- `@` — IN, в качестве значения передается массив,
- `!@`— NOT IN, в качестве значения передается массив,
- `=` — равно, точное совпадение, используется по умолчанию,
- `!=` - не равно,
- `!` — не равно ||
|| **ORDER**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка обзвонов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.calllist.list",
        {
            SELECT: ["ID", "CREATED_BY_ID"],
            FILTER: { "ENTITY_TYPE_ID": 3 },
            ORDER: { "ID": "DESC" }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"SELECT":["ID","CREATED_BY_ID"],"FILTER":{"ENTITY_TYPE_ID":3},"ORDER":{"ID":"DESC"}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.calllist.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"SELECT":["ID","CREATED_BY_ID"],"FILTER":{"ENTITY_TYPE_ID":3},"ORDER":{"ID":"DESC"},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.calllist.list
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.calllist.list',
        [
            'SELECT' => ['ID', 'CREATED_BY_ID'],
            'FILTER' => ['ENTITY_TYPE_ID' => 3],
            'ORDER' => ['ID' => 'DESC']
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
            "ID": "13",
            "CREATED_BY_ID": "29"
        },
        {
            "ID": "9",
            "CREATED_BY_ID": "1"
        },
        {
            "ID": "3",
            "CREATED_BY_ID": "131"
        },
        {
            "ID": "1",
            "CREATED_BY_ID": "131"
        }
    ],
    "time": {
        "start": 1752475786.965766,
        "finish": 1752475787.035008,
        "duration": 0.06924200057983398,
        "processing": 0.016666889190673828,
        "date_start": "2025-07-14T09:49:46+03:00",
        "date_finish": "2025-07-14T09:49:47+03:00",
        "operating_reset_at": 1752476387,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию об обзвонах. 

Структура полей зависит от параметра `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid parameters.",
    "error_description": "Переданы некорректные параметры."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `Invalid parameters` | Переданы некорректные параметры ||
|| `100` | `Unknown field definition "TITLE"` | Неизвестный параметр «Название параметра» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md) 