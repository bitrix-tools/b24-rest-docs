# Обновить поля торгового каталога catalog.catalog.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет поля торгового каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор торгового каталога ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления торгового каталога ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **yandexExport**
[`string`](../../data-types.md) | Устаревший параметр. Экспортировать ли в *Яндекс.Маркет*. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **subscription**
[`string`](../../data-types.md) | Производится ли продажа контента. Возможные значения:
- `Y` — да
- `N` — нет

Параметр используется только в коробочной версии
||
|| **vatId**
[`catalog_vat.id`](../data-types.md#catalog_vat) | Идентификатор НДС.

Для получения существующих идентификаторов НДС используйте [catalog.vat.list](../vat/catalog-vat-list.md)
||
|| **productIblockId**
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор родительского информационного блока торгового каталога. Заполняется только для торгового каталога торговых предложений.

Для получения существующих идентификаторов информационных блоков используйте [catalog.catalog.list](./catalog-catalog-list.md)
||
|| **skuPropertyId**
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства, в котором хранится идентификатор родительского товара. Заполняется только для торгового каталога торговых предложений.

Для получения существующих идентификаторов свойств используйте [catalog.productProperty.list](../product-property/catalog-product-property-list.md)
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
    -d '{"id":24,"fields":{"vatId":2,"productIblockId":23,"skuPropertyId":97}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":24,"fields":{"vatId":2,"productIblockId":23,"skuPropertyId":97},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.catalog.update
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.catalog.update', 
        {
            id: 24,
            fields: {
                vatId: 2,
                productIblockId: 23,
                skuPropertyId: 97,
            },
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.catalog.update',
        [
            'id' => 24,
            'fields' => [
                'vatId' => 2,
                'productIblockId' => 23,
                'skuPropertyId' => 97,
            ]
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
        "catalog": {
            "iblockId": 24,
            "iblockTypeId": 0,
            "id": 24, 
            "lid": "s1",
            "name": "Товарный каталог CRM (предложения)",
            "productIblockId": 23,
            "skuPropertyId": 97,
            "subscription": "N",
            "vatId": 2,
            "yandexExport": "N"
        }
    },
    "time": {
        "start": 1716806984.460591,
        "finish": 1716806984.92558,
        "duration": 0.46498894691467285,
        "processing": 0.03661203384399414,
        "date_start": "2024-05-27T13:49:44+03:00",
        "date_finish": "2024-05-27T13:49:44+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **catalog**
[`catalog_catalog`](../data-types.md#catalog_catalog) | Объект с информацией об обновленном торговом каталоге ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Catalog is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ERROR_CORE` | Указанное свойство привязки не существует либо неактивно
|| 
|| `ERROR_CORE` | Указан идентификатор свойства привязки к информационному блоку товаров, но не указан идентификатор информационного блока товаров
|| 
|| `ERROR_CORE` | Указан идентификатор информационного блока товаров, но не указан идентификатор свойства привязки к информационному блоку товаров
|| 
|| `ERROR_CORE` | Неверный идентификатор свойства привязки к информационному блоку товаров
|| 
|| `ERROR_CORE` | Нельзя сделать торговый каталог информационным блоком торговых предложений для самого себя
|| 
|| `ERROR_CORE` | Указанный информационный блок товаров не существует
||
|| `ERROR_CORE` | Неверный идентификатор информационного блока товаров
|| 
|| `ERROR_CORE` | Идентификатор торгового каталога и идентификатор свойства привязки к нему необходимо указывать вместе
|| 
|| `ERROR_CORE` | Неверный идентификатор торгового каталога
|| 
|| `200040300020` | Недостаточно прав для обновления торгового каталога
|| 
|| `200040300010` | Недостаточно прав для обновления торгового каталога
|| 
|| `200040300030` | Недостаточно прав для обновления торгового каталога
|| 
|| `100` | Не указан параметр `id`
|| 
|| `100` | Не указан или пустой параметр `fields`
|| 
|| `0` | Торговый каталог с указанным идентификатором не существует
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-add.md)
- [{#T}](./catalog-catalog-get.md)
- [{#T}](./catalog-catalog-list.md)
- [{#T}](./catalog-catalog-is-offers.md)
- [{#T}](./catalog-catalog-delete.md)
- [{#T}](./catalog-catalog-get-fields.md)