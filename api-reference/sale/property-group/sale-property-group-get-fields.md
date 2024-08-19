# Получить доступные поля групп свойств

> Название метода: **sale.propertygroup.getFields**
>
> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод предназначен для получения доступных полей групп свойств.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertygroup.getFields
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertygroup.getFields
    ```

- JS

    ```js
    BX24.callMethod(
        "sale.propertygroup.getFields", {},
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertygroup.getFields',
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
    "result":{
        "propertyGroup":{
            "id":{
                "isImmutable":false,
                "isReadOnly":true,
                "isRequired":false,
                "type":"integer"
            },
            "name":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":true,
                "type":"string"
            },
            "personTypeId":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":true,
                "type":"integer"
            },
            "sort":{
                "isImmutable":false,
                "isReadOnly":false,
                "isRequired":false,
                "type":"integer"
            }
        }
    },
    "time":{
        "start":1711455574.780152,
        "finish":1711455574.977252,
        "duration":0.19709992408752441,
        "processing":0.002568960189819336,
        "date_start":"2024-03-26T15:19:34+03:00",
        "date_finish":"2024-03-26T15:19:34+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyGroup**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [sale_order_property_group](../data-types.md), а `value` — объект типа [rest_field_description](../data-types.md) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения доступных полей групп  свойств ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-group-add.md)
- [{#T}](./sale-property-group-update.md)
- [{#T}](./sale-property-group-get.md)
- [{#T}](./sale-property-group-list.md)
- [{#T}](./sale-property-group-delete.md)

