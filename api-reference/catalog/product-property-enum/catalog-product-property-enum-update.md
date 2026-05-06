# Изменить значение списочного свойства catalog.productPropertyEnum.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства

Метод `catalog.productPropertyEnum.update` изменяет значение списочного свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор значения списочного свойства.

Идентификатор можно получить методом [catalog.productPropertyEnum.list](./catalog-product-property-enum-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей обновляемого значения списка [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства товара или вариации.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|| **value***
[`string`](../../data-types.md) | Значение элемента списка ||
|| **xmlId***
[`string`](../../data-types.md) | Внешний идентификатор значения списка. Должен быть уникальным в рамках свойства ||
|| **def**
[`char`](../../data-types.md) | Признак значения по умолчанию. Допустимые значения:
- `Y` — по умолчанию
- `N` — не по умолчанию ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":1739,"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"N","sort":110}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":1739,"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"N","sort":110},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.update
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productPropertyEnum.update', {
            id: 1739,
            fields: {
                propertyId: 431,
                value: 'Средний',
                xmlId: 'M',
                def: 'N',
                sort: 110,
            }
        });

        console.log(response.getData().result);
    } catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertyEnum.update',
                [
                    'id' => 1739,
                    'fields' => [
                        'propertyId' => 431,
                        'value' => 'Средний',
                        'xmlId' => 'M',
                        'def' => 'N',
                        'sort' => 110,
                    ],
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
        'catalog.productPropertyEnum.update',
        {
            id: 1739,
            fields: {
                propertyId: 431,
                value: 'Средний',
                xmlId: 'M',
                def: 'N',
                sort: 110,
            }
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
        'catalog.productPropertyEnum.update',
        [
            'id' => 1739,
            'fields' => [
                'propertyId' => 431,
                'value' => 'Средний',
                'xmlId' => 'M',
                'def' => 'N',
                'sort' => 110,
            ]
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "productPropertyEnum": {
        "def": "N",
        "id": 1739,
        "propertyId": 431,
        "sort": 110,
        "value": "Средний",
        "xmlId": "M"
        }
    },
    "time": {
        "start": 1774339029,
        "finish": 1774339030.119726,
        "duration": 1.1197259426116943,
        "processing": 1,
        "date_start": "2026-03-24T10:57:09+03:00",
        "date_finish": "2026-03-24T10:57:10+03:00",
        "operating_reset_at": 1774339629,
        "operating": 0.1804349422454834
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **productPropertyEnum**
[`catalog_product_property_enum`](../data-types.md#catalog_product_property_enum) | Объект обновленного значения списочного свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "productPropertyEnum does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для изменения свойства инфоблока ||
|| `0` | productPropertyEnum does not exist. | Значение списочного свойства с переданным `id` не найдено или не относится к торговому каталогу ||
|| `0` | The specified property does not belong to a product catalog | Свойство с переданным `propertyId` не относится к торговому каталогу ||
|| `0` | Required fields: xmlId | Не передано обязательное поле `xmlId` ||
|| `0` | Internal error updating enumeration value. Try updating again. | Внутренняя ошибка при обновлении значения списка ||
|| `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-add.md)
- [{#T}](./catalog-product-property-enum-get.md)
- [{#T}](./catalog-product-property-enum-list.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
