# Получить коннектор по id biconnector.connector.get

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.connector.get` возвращает информацию о коннекторе по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор коннектора, можно получить методами [biconnector.connector.list](./biconnector-connector-list.md) и [biconnector.connector.add](./biconnector-connector-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX.rest.callMethod(
        'biconnector.connector.get',
        {
            id: 4,
        },
        (result) => {
            result.error() ? console.error(result.error()) : console.info(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "id": 4
             }' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.connector.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "id": 4,
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.get
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.connector.get',
        [
            'id' => 4
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
        "item": {
            "id": 5,
            "title": "SUPER REST CONNECTOR",
            "dateCreate": "2025-03-24 07:25:59",
            "logo": "https://masterpiecer-images.s3.yandex.net/5fd531dca6427c7:upscaled",
            "description": "Connector with token",
            "sort": 100,
            "urlCheck": "http://app.domain/check",
            "settings": [
                {
                    "name": "Логин",
                    "code": "login",
                    "type": "STRING"
                },
                {
                    "name": "Пароль",
                    "code": "password",
                    "type": "STRING"
                }
            ],
            "urlData": "http://app.domain/data",
            "urlTableList": "http://app.domain/table_list",
            "urlTableDescription": "http://app.domain/table_description"
        }
    },
    "time": {
        "start": 1725365418.056843,
        "finish": 1725365419.671506,
        "duration": 1.6146628856658936,
        "processing": 1.3475170135498047,
        "date_start": "2024-09-03T14:10:18+02:00",
        "date_finish": "2024-09-03T14:10:19+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`item`](../../data-types.md) | Корневой элемент ответа. Содержит информацию о полях коннектора. Описание полей в статье [Коннектор: обзор методов](./index.md#fields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#                                                                         

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_ID_NOT_PROVIDED",
    "error_description": "ID is missing."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

## Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_ID_NOT_PROVIDED` | `ID is missing.` | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | `ID has to be a positive integer.` | Неверный формат ID ||
|| `CONNECTOR_NOT_FOUND` | `Connector was not found.` | Коннектор не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-connector-update.md)
- [{#T}](./biconnector-connector-add.md)
- [{#T}](./biconnector-connector-list.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)