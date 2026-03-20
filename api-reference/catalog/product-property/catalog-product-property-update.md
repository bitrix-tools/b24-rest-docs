# Изменить свойство товаров или вариаций catalog.productProperty.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр каталога

Метод `catalog.productProperty.update` изменяет поля свойства товара или вариации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства. 

Идентификаторы свойств можно получить методом [catalog.productProperty.list](./catalog-product-property-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей для обновления свойства [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор торгового каталога. 

Идентификаторы можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list.md) ||
|| **name**
[`string`](../../data-types.md) | Название свойства ||
|| **propertyType**
[`string`](../../data-types.md) | Базовый тип свойства. Изменять нельзя ||
|| **active**
[`char`](../../data-types.md) | Признак активности. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства. Код свойства может состоять из латинских символов, цифр и знака подчеркивания. Первый символ не может быть цифрой ||
|| **defaultValue**
[`text`](../../data-types.md) | Значение свойства по умолчанию ||
|| **userType**
[`string`](../../data-types.md) | Пользовательский тип свойства. Изменять нельзя ||
|| **rowCount**
[`integer`](../../data-types.md) | Число строк поля ввода ||
|| **colCount**
[`integer`](../../data-types.md) | Число колонок поля ввода ||
|| **listType**
[`char`](../../data-types.md) | Внешний вид списка. Допустимые значения:
- `L` — выпадающий список
- `C` — набор флажков ||
|| **multiple**
[`char`](../../data-types.md) | Признак множественного значения. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор свойства ||
|| **fileType**
[`string`](../../data-types.md) | Список расширений файлов для свойства типа `F` ||
|| **multipleCnt**
[`integer`](../../data-types.md) | Число полей для ввода множественных значений ||
|| **linkIblockId**
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор связанного инфоблока. 

Доступные идентификаторы можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list.md) ||
|| **withDescription**
[`char`](../../data-types.md) | Признак хранения описания значения. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **searchable**
[`char`](../../data-types.md) | Признак участия в поиске. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **filtrable**
[`char`](../../data-types.md) | Признак участия в фильтрации. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **isRequired**
[`char`](../../data-types.md) | Признак обязательного значения. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **hint**
[`string`](../../data-types.md) | Подсказка к полю ||
|| **userTypeSettings**
[`object`](../../data-types.md) | Настройки пользовательского типа. Поддерживаются только скалярные значения и вложенные объекты из скалярных значений.

Если указан `userType`, но не указан `userTypeSettings`, настройки не валидируются методом дополнительно ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":115,"fields":{"iblockId":19,"name":"Размер","propertyType":"L","isRequired":"Y","active":"Y"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productProperty.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"id":115,"fields":{"iblockId":19,"name":"Размер","propertyType":"L","isRequired":"Y","active":"Y"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productProperty.update
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productProperty.update', {
            id: 115,
            fields: {
                iblockId: 19,
                name: 'Размер',
                propertyType: 'L',
                isRequired: 'Y',
                active: 'Y'
            }
        });

        console.log(response.getData().result);
    }
    catch (error) {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productProperty.update',
                [
                    'id' => 115,
                    'fields' => [
                        'iblockId' => 19,
                        'name' => 'Размер',
                        'propertyType' => 'L',
                        'isRequired' => 'Y',
                        'active' => 'Y',
                    ]
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
        'catalog.productProperty.update',
        {
            id: 115,
            fields: {
                iblockId: 19,
                name: 'Размер',
                propertyType: 'L',
                isRequired: 'Y',
                active: 'Y'
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
        'catalog.productProperty.update',
        [
            'id' => 115,
            'fields' => [
                'iblockId' => 19,
                'name' => 'Размер',
                'propertyType' => 'L',
                'isRequired' => 'Y',
                'active' => 'Y',
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
        "productProperty": {
            "active": "Y",
            "code": null,
            "colCount": 30,
            "defaultValue": null,
            "fileType": null,
            "filtrable": "Y",
            "hint": null,
            "iblockId": 19,
            "id": 115,
            "name": "Размер",
            "isRequired": "Y",
            "linkIblockId": null,
            "listType": "L",
            "multiple": "N",
            "multipleCnt": null,
            "propertyType": "L",
            "rowCount": 1,
            "searchable": "N",
            "sort": 500,
            "timestampX": "2026-03-19T20:46:43+03:00",
            "userType": null,
            "userTypeSettings": null,
            "withDescription": null,
            "xmlId": null
        }
    },
    "time": {
        "start": 1773946003,
        "finish": 1773946003.953583,
        "duration": 0.9535830020904541,
        "processing": 0,
        "date_start": "2026-03-19T21:46:43+03:00",
        "date_finish": "2026-03-19T21:46:43+03:00",
        "operating_reset_at": 1773946603,
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
|| **productProperty**
[`catalog_product_property`](../data-types.md#catalog_product_property) | Объект с информацией об обновленном свойстве ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: iblockId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Required fields: iblockId | В `fields` не передан обязательный параметр `iblockId` ||
|| `400` | `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `400` | Пустое значение | productProperty does not exist | Свойство с указанным `id` не найдено ||
|| `400` | `0` | The specified property does not belong to a product catalog | Свойство не относится к торговому каталогу ||
|| `400` | `0` | Invalid property type specified | Передана недопустимая комбинация `propertyType` и `userType` ||
|| `400` | `0` | Invalid custom property type settings specified | Передан недопустимый формат `userTypeSettings` ||
|| `400` | `0` | Код свойства не может начинаться с цифры | Неверный формат параметра `code` ||
|| `400` | `0` | Неверный код информационного блока | Неверный формат параметра `iblockId` ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {id}. Should be value of type int | Неверный тип данных у значения параметра `id` ||
|| `400` | `0` | Wrong format of field `...` | Передан параметр с типом, который не соответствует формату поля ||
|| `400` | `0` | Error updating product property | Внутренняя ошибка при обновлении свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-add.md)
- [{#T}](./catalog-product-property-get.md)
- [{#T}](./catalog-product-property-list.md)
- [{#T}](./catalog-product-property-delete.md)
- [{#T}](./catalog-product-property-get-fields.md)
