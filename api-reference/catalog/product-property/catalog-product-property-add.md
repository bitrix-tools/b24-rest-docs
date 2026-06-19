# Добавить свойство товара или вариации catalog.productProperty.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение каталога товаров

Метод `catalog.productProperty.add` добавляет свойство товара или вариации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Набор полей нового свойства [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор торгового каталога. 

Получить существующие идентификаторы можно методом [catalog.catalog.list](../catalog/catalog-catalog-list.md) ||
|| **name***
[`string`](../../data-types.md) | Название свойства ||
|| **propertyType***
[`string`](../../data-types.md) | Базовый тип свойства. Допустимые значения:
- `N` — число
- `S` — строка
- `L` — список
- `F` — файл
- `E` — привязка к элементам
- `G` — привязка к разделам ||
|| **active**
[`char`](../../data-types.md) | Признак активности. Допустимые значения:
- `Y` — да
- `N` — нет
||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства. Код свойства может состоять из латинских символов, цифр и знака подчеркивания. Первый символ не может быть цифрой ||
|| **defaultValue**
[`text`](../../data-types.md) | Значение свойства по умолчанию ||
|| **userType**
[`string`](../../data-types.md) | Пользовательский тип свойства. Значение должно соответствовать указанному `propertyType`.

Примеры значений:
- `DateTime` — дата и время
- `Money` — денежное значение с валютой
- `SKU` — привязка к вариациям товара
- `directory` — привязка к справочнику
- `employee` — привязка к сотруднику
- `UserID` — привязка к пользователю
- `EList` — выбор элемента из списка
- `EAutocomplete` — привязка к элементам с автопоиском
- `SectionAuto` — привязка к разделам с автопоиском
- `HTML` — значение в формате HTML
- `map_google` — координаты и адрес на карте Google
- `map_yandex` — координаты и адрес на карте Яндекс
- `DiskFile` — привязка к файлу из Битрикс24.Диск
- `ECrm` — привязка к элементам CRM
- `BoolEnum` — чекбокс на базе списка, это значение используйте вместе с `propertyType = L` ||
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
[`object`](../../data-types.md) | Настройки пользовательского типа. Поддерживаются только скалярные значения и вложенные объекты из скалярных значений ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"iblockId":19,"name":"Рубрика","code":"CATEGORY","propertyType":"S","userType":"directory","multiple":"N","isRequired":"N","active":"Y","sort":100,"userTypeSettings":{"tableName":"b_hlbd_categories"}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productProperty.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"fields":{"iblockId":19,"name":"Рубрика","code":"CATEGORY","propertyType":"S","userType":"directory","multiple":"N","isRequired":"N","active":"Y","sort":100,"userTypeSettings":{"tableName":"b_hlbd_categories"}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productProperty.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertyResult = {
      productProperty: {
        active: string,
        code: string | null,
        colCount: number,
        defaultValue: string | null,
        fileType: string | null,
        filtrable: string,
        hint: string | null,
        iblockId: number,
        id: number,
        isRequired: string,
        linkIblockId: number | null,
        listType: string,
        multiple: string,
        multipleCnt: number | null,
        name: string,
        propertyType: string,
        rowCount: number,
        searchable: string,
        sort: number,
        timestampX: ISODate,
        userType: string | null,
        userTypeSettings: Record<string, unknown> | null,
        withDescription: string | null,
        xmlId: string | null,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductPropertyResult>({
        method: 'catalog.productProperty.add',
        params: {
          fields: {
            iblockId: 19,
            name: 'Category',
            code: 'CATEGORY',
            propertyType: 'S',
            userType: 'directory',
            multiple: 'N',
            isRequired: 'N',
            active: 'Y',
            sort: 100,
            userTypeSettings: {
              tableName: 'b_hlbd_categories', // existing catalog in Bitrix24
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productProperty.id, result.productProperty.name)
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
      async function addProductProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productProperty.add',
            params: {
              fields: {
                iblockId: 19,
                name: 'Category',
                code: 'CATEGORY',
                propertyType: 'S',
                userType: 'directory',
                multiple: 'N',
                isRequired: 'N',
                active: 'Y',
                sort: 100,
                userTypeSettings: {
                  tableName: 'b_hlbd_categories', // existing catalog in Bitrix24
                },
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
          console.info(result.productProperty.id, result.productProperty.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProductProperty)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productProperty.add',
                [
                    'fields' => [
                        'iblockId' => 19,
                        'name' => 'Рубрика',
                        'code' => 'CATEGORY',
                        'propertyType' => 'S',
                        'userType' => 'directory',
                        'multiple' => 'N',
                        'isRequired' => 'N',
                        'active' => 'Y',
                        'sort' => 100,
                        'userTypeSettings' => [
                            'tableName' => 'b_hlbd_categories', // существующий справочник в Битрикс24
                        ],
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
        'catalog.productProperty.add',
        {
            fields: {
                iblockId: 19,
                name: 'Рубрика',
                code: 'CATEGORY',
                propertyType: 'S',
                userType: 'directory',
                multiple: 'N',
                isRequired: 'N',
                active: 'Y',
                sort: 100,
                userTypeSettings: {
                    tableName: 'b_hlbd_categories', // существующий справочник в Битрикс24
                }
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
        'catalog.productProperty.add',
        [
            'fields' => [
                'iblockId' => 19,
                'name' => 'Рубрика',
                'code' => 'CATEGORY',
                'propertyType' => 'S',
                'userType' => 'directory',
                'multiple' => 'N',
                'isRequired' => 'N',
                'active' => 'Y',
                'sort' => 100,
                'userTypeSettings' => [
                    'tableName' => 'b_hlbd_categories', // существующий справочник в Битрикс24
                ],
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
            "code": "CATEGORY",
            "colCount": 30,
            "defaultValue": null,
            "fileType": null,
            "filtrable": "N",
            "hint": null,
            "iblockId": 19,
            "id": 659,
            "isRequired": "N",
            "linkIblockId": null,
            "listType": "L",
            "multiple": "N",
            "multipleCnt": null,
            "name": "Рубрика",
            "propertyType": "S",
            "rowCount": 1,
            "searchable": "N",
            "sort": 100,
            "timestampX": "2026-03-19T15:46:23+03:00",
            "userType": "directory",
            "userTypeSettings": {
                "group": "N",
                "multiple": "N",
                "size": 1,
                "tableName": "b_hlbd_categories",
                "width": 0
            },
            "withDescription": null,
            "xmlId": null
        }
    },
    "time": {
        "start": 1773927983,
        "finish": 1773927983.409049,
        "duration": 0.40904903411865234,
        "processing": 0,
        "date_start": "2026-03-19T16:46:23+03:00",
        "date_finish": "2026-03-19T16:46:23+03:00",
        "operating_reset_at": 1773928583,
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
[`catalog_product_property`](../data-types.md#catalog_product_property) | Объект с информацией о добавленном свойстве ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Invalid property type specified"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Required fields: iblockId, name, propertyType | Не переданы обязательные поля в `fields` ||
|| `400` | `0` | Access Denied | Нет прав на изменение инфоблока ||
|| `400` | `0` | The specified iblock is not a product catalog | Передан `iblockId`, который не является торговым каталогом ||
|| `400` | `0` | Invalid property type specified | Передана недопустимая комбинация `propertyType` и `userType` ||
|| `400` | `0` | Invalid custom property type settings specified | Передан недопустимый формат `userTypeSettings` ||
|| `400` | `0` | Код свойства не может начинаться с цифры | Неверный формат параметра `code` ||
|| `400` | `0` | Wrong format of field `...` | Передан параметр с типом, который не соответствует формату поля ||
|| `400` | `0` | Error adding property | Внутренняя ошибка при создании свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-update.md)
- [{#T}](./catalog-product-property-get.md)
- [{#T}](./catalog-product-property-list.md)
- [{#T}](./catalog-product-property-delete.md)
- [{#T}](./catalog-product-property-get-fields.md)
