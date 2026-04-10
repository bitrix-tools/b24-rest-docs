# Получить поля привязки типов цен к группам покупателей catalog.priceTypeGroup.getFields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

Метод `catalog.priceTypeGroup.getFields` возвращает описание полей привязки типов цен к группам покупателей.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceTypeGroup.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeGroup.getFields
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceTypeGroup.getFields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.priceTypeGroup.getFields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting price type group fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeGroup.getFields',
        {},
        function(result) {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceTypeGroup.getFields',
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
    "result": {
        "priceTypeGroup": {
            "access": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "type": "char"
            },
            "catalogGroupId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "groupId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "id": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": false,
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1774259882,
        "finish": 1774259882.700544,
        "duration": 0.7005441188812256,
        "processing": 0,
        "date_start": "2026-03-23T12:58:02+03:00",
        "date_finish": "2026-03-23T12:58:02+03:00",
        "operating_reset_at": 1774260482,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **priceTypeGroup**
[`object`](../../data-types.md#catalog_price_type_group) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор поля объекта [catalog_price_type_group](../../data-types.md#catalog_price_type_group), а `value` — объект типа [rest_field_description](../../data-types.md#rest_field_description) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300010,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300010` | Access Denied | Недостаточно прав на просмотр каталога ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-group-add.md)
- [{#T}](./catalog-price-type-group-list.md)
- [{#T}](./catalog-price-type-group-delete.md)

