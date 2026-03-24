# Добавить значение списочного свойства catalog.productPropertyEnum.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» и правом на изменение инфоблока свойства

Метод `catalog.productPropertyEnum.add` добавляет значение списочного свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Набор полей нового значения списка [(подробное описание)](#fields) ||
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

{% note info "" %}

Метод добавляет значения только для свойств типа `L` (список). Если передать `propertyId` свойства другого типа, метод вернет ошибку `Only list properties are supported`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"Y","sort":100}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertyEnum.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"propertyId":431,"value":"Средний","xmlId":"M","def":"Y","sort":100},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertyEnum.add
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productPropertyEnum.add', {
            fields: {
                propertyId: 431,
                value: 'Средний',
                xmlId: 'M',
                def: 'Y',
                sort: 100,
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
                'catalog.productPropertyEnum.add',
                [
                    'fields' => [
                        'propertyId' => 431,
                        'value' => 'Средний',
                        'xmlId' => 'M',
                        'def' => 'Y',
                        'sort' => 100,
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
        'catalog.productPropertyEnum.add',
        {
            fields: {
                propertyId: 431,
                value: 'Средний',
                xmlId: 'M',
                def: 'Y',
                sort: 100,
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
        'catalog.productPropertyEnum.add',
        [
            'fields' => [
                'propertyId' => 431,
                'value' => 'Средний',
                'xmlId' => 'M',
                'def' => 'Y',
                'sort' => 100,
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
        "def": "Y",
        "id": 1739,
        "propertyId": 431,
        "sort": 100,
        "value": "Средний",
        "xmlId": "M"
        }
    },
    "time": {
        "start": 1774279799,
        "finish": 1774279799.330864,
        "duration": 0.33086395263671875,
        "processing": 0,
        "date_start": "2026-03-23T18:29:59+03:00",
        "date_finish": "2026-03-23T18:29:59+03:00",
        "operating_reset_at": 1774280399,
        "operating": 0
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
[`catalog_product_property_enum`](../data-types.md#catalog_product_property_enum) | Объект добавленного значения списочного свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BX_INVALID_VALUE",
    "error_description": "Запись со значением Внешний код, равным ..., уже есть в базе данных"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для изменения свойства инфоблока ||
|| `0` | productPropertyEnum does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `0` | Only list properties are supported | Передано свойство, тип которого не `Список` ||
|| `0` | Required fields: xmlId | Не передано обязательное поле `xmlId` ||
|| `0` | A value with xmlId '...' already exists. | Значение с таким `xmlId` уже существует в рамках свойства ||
|| `BX_INVALID_VALUE` | Запись со значением "Внешний код", равным "...", уже есть в базе данных | Локализованная ошибка дубликата `xmlId` ||
|| `0` | Internal error adding enumeration value. Try adding again. | Внутренняя ошибка при добавлении значения списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-enum-update.md)
- [{#T}](./catalog-product-property-enum-get.md)
- [{#T}](./catalog-product-property-enum-list.md)
- [{#T}](./catalog-product-property-enum-delete.md)
- [{#T}](./catalog-product-property-enum-get-fields.md)
