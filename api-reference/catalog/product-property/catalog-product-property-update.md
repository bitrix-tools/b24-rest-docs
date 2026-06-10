# Изменить свойство товаров или вариаций catalog.productProperty.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertyUpdateResult = {
      productProperty: {
        active: 'Y' | 'N'
        code: string | null
        colCount: number
        defaultValue: string | null
        fileType: string | null
        filtrable: 'Y' | 'N'
        hint: string | null
        iblockId: number
        id: number
        isRequired: 'Y' | 'N'
        linkIblockId: number | null
        listType: string | null
        multiple: 'Y' | 'N'
        multipleCnt: number | null
        name: string
        propertyType: string
        rowCount: number
        searchable: 'Y' | 'N'
        sort: number
        timestampX: ISODate
        userType: string | null
        userTypeSettings: Record<string, unknown> | null
        withDescription: 'Y' | 'N' | null
        xmlId: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductPropertyUpdateResult>({
        method: 'catalog.productProperty.update',
        params: {
          id: 115,
          fields: {
            iblockId: 19,
            name: 'Size',
            propertyType: 'L',
            isRequired: 'Y',
            active: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productProperty.id, result.productProperty.name, result.productProperty.active)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateProductProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productProperty.update',
            params: {
              id: 115,
              fields: {
                iblockId: 19,
                name: 'Size',
                propertyType: 'L',
                isRequired: 'Y',
                active: 'Y',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.productProperty.id, result.productProperty.name, result.productProperty.active)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateProductProperty)
    </script>
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
