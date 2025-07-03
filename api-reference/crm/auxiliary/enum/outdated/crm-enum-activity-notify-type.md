# Получить элементы перечисления «Тип уведомления о начале активности» crm.enum.activitynotifytype

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.enum.activitynotifytype` продолжает работать, но он относится к устаревшим методам [crm.activity.*](../../../timeline/activities/index.md). Более актуальный аналог методов [crm.activity.todo.*](../../../timeline/activities/todo/index.md). 

{% endnote %}

Метод `crm.enum.activitynotifytype` возвращает типы уведомлений о начале активности для поля `NOTIFY_TYPE` [дел встреч и звонков](../../../timeline/activities/index.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.enum.activitynotifytype",
        {},
        function(result) {
            if (result.error())
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
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.enum.activitynotifytype
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/crm.enum.activitynotifytype
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.enum.activitynotifytype',
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
     "ID": 0,
     "NAME": "",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    },
    {
     "ID": 1,
     "NAME": "мин.",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    },
    {
     "ID": 2,
     "NAME": "ч.",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    },
    {
     "ID": 3,
     "NAME": "дн.",
     "SYMBOL_CODE": null,
     "SYMBOL_CODE_SHORT": null
    }
],
"time": {
    "start": 1750150460.961181,
    "finish": 1750150461.006235,
    "duration": 0.045053958892822266,
    "processing": 0.00042510032653808594,
    "date_start": "2025-06-17T11:54:20+03:00",
    "date_finish": "2025-06-17T11:54:21+03:00",
    "operating_reset_at": 1750151061,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Массив с типами уведомлений о начале активности [(подробное описание)](#result) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор типа уведомления ||
|| **NAME**
[`string`](../../../../data-types.md) | Название типа уведомления ||
|| **SYMBOL_CODE**
[`string`](../../../../data-types.md) | Символьный код ||
|| **SYMBOL_CODE_SHORT**
[`string`](../../../../data-types.md) | Краткий символьный код ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./../index.md)