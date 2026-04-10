# Удалить свойство товаров или вариаций catalog.productProperty.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр каталога

Метод `catalog.productProperty.delete` удаляет свойство товара или вариации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства. 

Идентификаторы свойств можно получить методом [catalog.productProperty.list](./catalog-product-property-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":659}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productProperty.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":659,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productProperty.delete
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productProperty.delete', { id: 659 });
        console.log(response.getData().result);
    }
    catch (error) {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productProperty.delete',
                [
                    'id' => 659
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productProperty.delete',
        {
            id: 659
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productProperty.delete',
        ['id' => 659]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773951201,
        "finish": 1773951201.704125,
        "duration": 0.704124927520752,
        "processing": 0,
        "date_start": "2026-03-19T23:13:21+03:00",
        "date_finish": "2026-03-19T23:13:21+03:00",
        "operating_reset_at": 1773951801,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если свойство успешно удалено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "productProperty does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `400` | Пустое значение | productProperty does not exist | Свойство с указанным `id` не найдено ||
|| `400` | `0` | The specified property does not belong to a product catalog | Свойство не относится к торговому каталогу ||
|| `400` | `0` | Error deleting product property | Внутренняя ошибка при удалении свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-add.md)
- [{#T}](./catalog-product-property-update.md)
- [{#T}](./catalog-product-property-get.md)
- [{#T}](./catalog-product-property-list.md)
- [{#T}](./catalog-product-property-get-fields.md)
