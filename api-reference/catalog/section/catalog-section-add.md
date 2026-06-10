# Добавить раздел торгового каталога catalog.section.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.section.add` добавляет раздел торгового каталога. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания нового раздела каталога ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор инфоблока.

Для получения существующих идентификаторов необходимо использовать [catalog.catalog.list](../catalog/catalog-catalog-list.md) ||
|| **iblockSectionId**
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор родительского раздела.

Для получения существующих идентификаторов необходимо использовать [catalog.section.list](./catalog-section-list.md). 

По умолчанию выбирается верхний уровень ||
|| **name***
[`string`](../data-types.md) | Название раздела каталога ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущего раздела каталога с аналогичной позицией во внешней системе ||
|| **code**
[`string`](../data-types.md) | Код раздела каталога. Должен быть уникальным ||
|| **sort**
[`integer`](../data-types.md) | Сортировка.

По умолчанию 500 ||
|| **active**
[`string`](../data-types.md) | Индикатор активности раздела каталога:
- `Y` — активен
- `N` — неактивен

По умолчанию `Y` ||
|| **description**
[`string`](../data-types.md) | Описание ||
|| **descriptionType**
[`string`](../data-types.md) | Тип описания. Доступные типы: `text`, `html` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "name": "Детские игрушки",
            "iblockId": 14,
            "iblockSectionId": 13,
            "sort": "100",
            "active": "Y",
            "code": "toys",
            "xmlId": "myXmlId",
            "description": "Товары для детей - игрушки",
            "descriptionType": "text"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "name": "Детские игрушки",
            "iblockId": 14,
            "iblockSectionId": 13,
            "sort": "100",
            "active": "Y",
            "code": "toys",
            "xmlId": "myXmlId",
            "description": "Товары для детей - игрушки",
            "descriptionType": "text"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/catalog.section.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SectionAddResult = {
      section: {
        active: string
        code: string
        description: string
        descriptionType: string
        iblockId: number
        iblockSectionId: number
        id: number
        name: string
        sort: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<SectionAddResult>({
        method: 'catalog.section.add',
        params: {
          fields: {
            name: "Kids Toys",
            iblockId: 14,
            iblockSectionId: 13,
            sort: '100',
            active: 'Y',
            code: 'toys',
            xmlId: 'myXmlId',
            description: "Products for children - toys",
            descriptionType: "text",
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.section.id, result.section.name)
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
      async function addCatalogSection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.section.add',
            params: {
              fields: {
                name: "Kids Toys",
                iblockId: 14,
                iblockSectionId: 13,
                sort: '100',
                active: 'Y',
                code: 'toys',
                xmlId: 'myXmlId',
                description: "Products for children - toys",
                descriptionType: "text",
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
          console.info(result.section.id, result.section.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCatalogSection)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.section.add',
                [
                    'fields' => [
                        'name'            => 'Детские игрушки',
                        'iblockId'        => 14,
                        'iblockSectionId' => 13,
                        'sort'            => '100',
                        'active'          => 'Y',
                        'code'            => 'toys',
                        'xmlId'           => 'myXmlId',
                        'description'     => "Товары для детей - игрушки",
                        'descriptionType' => "text",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding catalog section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.section.add', 
        {
            fields: {
                name: 'Детские игрушки',
                iblockId: 14,
                iblockSectionId: 13,
                sort: '100',
                active: 'Y',
                code: 'toys',
                xmlId: 'myXmlId',
                description: "Товары для детей - игрушки",
                descriptionType: "text"
            }
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.section.add',
        [
            'fields' => [
                'name' => 'Детские игрушки',
                'iblockId' => 14,
                'iblockSectionId' => 13,
                'sort' => '100',
                'active' => 'Y',
                'code' => 'toys',
                'xmlId' => 'myXmlId',
                'description' => 'Товары для детей - игрушки',
                'descriptionType' => 'text'
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
        "section": {
            "active": "Y",
            "code": "toys",
            "description": "Товары для детей - игрушки",
            "descriptionType": "text",
            "iblockId": 14,
            "iblockSectionId": 13,
            "id": 31,
            "name": "Детские игрушки",
            "sort": 100,
            "xmlId": "myXmlId"
        }
    },
    "time": {
        "start": 1716552521.40908,
        "finish": 1716552521.69852,
        "duration": 0.289434909820557,
        "processing": 0.011207103729248,
        "date_start": "2024-05-24T14:08:41+02:00",
        "date_finish": "2024-05-24T14:08:41+02:00",
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
|| **section**
[`catalog_section`](../data-types.md#catalog_section) | Объект с информацией о добавленном разделе каталога ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300040,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300040` | Нет доступа к редактированию ||
|| `200700300000` | Ошибки при добавлении, например, идентификатор инфоблока создаваемого раздела не совпадает с идентификатором инфоблока раздела-родителя ||
|| `200700300040` | Нарушение уникальности поля `code` ||
|| `200700300050` | Инфоблока с заданным `iblockId` не существует ||
|| `100` | Не передан обязательный параметр  `fields` ||
|| `0` | Не установлены обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-update.md)
- [{#T}](./catalog-section-get.md)
- [{#T}](./catalog-section-list.md)
- [{#T}](./catalog-section-delete.md)
- [{#T}](./catalog-section-get-fields.md)