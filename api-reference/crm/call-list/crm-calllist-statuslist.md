# Получить список статусов обзвона crm.calllist.statuslist

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.calllist.statuslist` возвращает список статусов обзвона.

Чтобы создать новый статус, изменить или удалить существующий, используйте методы [crm.status.*](../status/index.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.calllist.statuslist",
        {},
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
         -d '{}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.statuslist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.statuslist
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.calllist.statuslist',
        []
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
            "ID": 61,
            "NAME": "В работе",
            "SORT": 10,
            "STATUS_ID": "IN_WORK"
        },
        {
            "ID": 63,
            "NAME": "Успешно",
            "SORT": 20,
            "STATUS_ID": "SUCCESS"
        },
        {
            "ID": 65,
            "NAME": "Неверный номер",
            "SORT": 30,
            "STATUS_ID": "WRONG_NUMBER"
        },
        {
            "ID": 67,
            "NAME": "Больше не звонить",
            "SORT": 40,
            "STATUS_ID": "STOP_CALLING"
        }
    ],
    "time": {
        "start": 1752560909.614115,
        "finish": 1752560909.68214,
        "duration": 0.06802511215209961,
        "processing": 0.007961034774780273,
        "date_start": "2025-07-15T09:28:29+03:00",
        "date_finish": "2025-07-15T09:28:29+03:00",
        "operating_reset_at": 1752561509,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив статусов обзвона [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Описание полей result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор статуса ||
|| **NAME**
[`string`](../../data-types.md) | Название ||
|| **SORT**
[`integer`](../../data-types.md) | Порядок сортировки||
|| **STATUS_ID**
[`string`](../../data-types.md) | Код статуса, используйте в методе [crm.calllist.items.get](./crm-calllist-items-get.md) ||
|#

## Обработка ошибок

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-update.md) 