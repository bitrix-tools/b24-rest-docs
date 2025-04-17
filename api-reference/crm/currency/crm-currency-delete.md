# Удалить валюту crm.currency.delete

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к изменению настроек CRM

Метод удаляет валюту.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
||  **Название**
`тип`| **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор валюты.

Соответствует стандарту ISO 4217.

Идентификатор можно получить методом [crm.currency.list](./crm-currency-list.md)
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"IDR"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.currency.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"IDR","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.currency.delete
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.currency.delete",
        {
            id: 'IDR'
        },
    )
    .then(
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        },
        function(error)
        {
            console.info(error);
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.currency.delete',
        [
            'id' => 'IDR'
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
    "result": true,
    "time": {
        "start": 1718094270.751676,
        "finish": 1718094271.335892,
        "duration": 0.5842158794403076,
        "processing": 0.1017751693725586,
        "date_start": "2024-06-11T10:24:30+02:00",
        "date_finish": "2024-06-11T10:24:31+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат удаления валюты ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
	"error": "",
	"error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Недостаточно прав доступа ||
|| Пустая строка | Модуль "Валюты" не найден! Пожалуйста, установите модуль "Валюты". |  ||
|| Пустая строка | Пустая строка | Идентификатор валют должен состоять из 3 символов ||
|| Пустая строка | Нельзя удалить базовую валюту. |  ||
|| Пустая строка | Нельзя удалить валюту отчётов. |  ||
|| `ERROR_CODE` | Другие ошибки в данных для изменения валюты |  ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-currency-add.md)
- [{#T}](./crm-currency-update.md)
- [{#T}](./crm-currency-get.md)
- [{#T}](./crm-currency-list.md)
- [{#T}](./crm-currency-fields.md)