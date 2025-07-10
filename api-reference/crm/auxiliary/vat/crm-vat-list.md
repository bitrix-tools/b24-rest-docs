# Получить список ставок НДС по фильтру crm.vat.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.vat.list` возвращает список ставок НДС по фильтру. 
Является реализацией [списочного метода](../../../../api-reference/how-to-call-rest-api/list-methods-pecularities.md) для ставок НДС.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order** 
[`object`](../../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка выборки ставок
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки можно узнать с помощью метода [crm.vat.fields](./crm-vat-fields.md) ||
|| **filter** 
[`object`](../../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

Список доступных полей для фильтрации можно узнать с помощью метода [crm.vat.fields](./crm-vat-fields.md)
||
|| **select** 
[`array`](../../../data-types.md) | Массив возвращаемых полей. Если не указан, возвращаются все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.vat.list",
        {
            order: { ID: "ASC" },
            filter: { ACTIVE: "Y" },
            select: ["ID", "NAME", "RATE"]
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"order":{"ID":"ASC"},"filter":{"ACTIVE":"Y"},"select":["ID","NAME","RATE"]}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.vat.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"ASC"},"filter":{"ACTIVE":"Y"},"select":["ID","NAME","RATE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.vat.list
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.vat.list',
        [
            'order' => [ 'ID' => 'ASC' ],
            'filter' => [ 'ACTIVE' => 'Y' ],
            'select' => [ 'ID', 'NAME', 'RATE' ]
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
            "ID": "1",
            "NAME": "Без НДС",
            "RATE": null
        },
        {
            "ID": "3",
            "NAME": "НДС 20%",
            "RATE": "20.00"
        },
        {
            "ID": "7",
            "NAME": "12",
            "RATE": "12.00"
        }
    ],
    "total": 3,
    "time": {
        "start": 1752044697.589623,
        "finish": 1752044697.66439,
        "duration": 0.0747671127319336,
        "processing": 0.00588679313659668,
        "date_start": "2025-07-09T10:04:57+03:00",
        "date_finish": "2025-07-09T10:04:57+03:00",
        "operating_reset_at": 1752045297,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях ставок НДС. 

Структура полей может быть изменена из-за параметра `select` ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных элементов ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Inadmissible fields for selection",
    "error_description": "Переданы недопустимые поля для выборки."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `The Commercial Catalog module is not installed.` | Модуль catalog не установлен ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `"Inadmissible fields for selection.` | Переданы недопустимые поля для выборки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-vat-fields.md)
- [{#T}](./crm-vat-get.md)
- [{#T}](./crm-vat-add.md)
- [{#T}](./crm-vat-update.md)
- [{#T}](./crm-vat-delete.md) 

