# Изменить раздел торгового каталога catalog.section.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.section.update` изменяет раздел торгового каталога. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор раздела каталога ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления раздела каталога ||
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

Для получения существующих идентификаторов необходимо использовать [catalog.section.list](./catalog-section-list.md) 
||
|| **name***
[`string`](../data-types.md) | Название раздела каталога ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущего раздела каталога с аналогичной позицией во внешней системе ||
|| **code**
[`string`](../data-types.md) | Код раздела каталога. Должен быть уникальным ||
|| **sort**
[`integer`](../data-types.md) | Сортировка ||
|| **active**
[`string`](../data-types.md) | Индикатор активности раздела каталога:
- `Y` — активен
- `N` — неактивен ||
|| **description**
[`string`](../data-types.md) | Описание раздела каталога||
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
        "id": 32,
        "fields": {
            "iblockId": 14,
            "name": "Детские игрушки",
            "description": "<H1>Детские игрушки</H1> <p>Товары для детей</p>",
            "descriptionType": "html"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.update
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 32,
        "fields": {
            "iblockId": 14,
            "name": "Детские игрушки",
            "description": "<H1>Детские игрушки</H1> <p>Товары для детей</p>",
            "descriptionType": "html"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/catalog.section.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogSectionUpdateResult = {
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
      const response = await $b24.actions.v2.call.make<CatalogSectionUpdateResult>({
        method: 'catalog.section.update',
        params: {
          id: 32,
          fields: {
            iblockId: 14,
            name: 'Toy products for children',
            description: '<H1>Toy products for children</H1> <p>Products for kids</p>',
            descriptionType: 'html',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated section:', result.section.id, result.section.name)
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
      async function updateCatalogSection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.section.update',
            params: {
              id: 32,
              fields: {
                iblockId: 14,
                name: 'Toy products for children',
                description: '<H1>Toy products for children</H1> <p>Products for kids</p>',
                descriptionType: 'html',
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
          console.info('Updated section:', result.section.id, result.section.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCatalogSection)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.section.update',
                [
                    'id' => 32,
                    'fields' => [
                        'iblockId'        => 14,
                        'name'            => 'Детские игрушки',
                        'description'     => "<H1>Детские игрушки</H1> <p>Товары для детей</p>",
                        'descriptionType' => "html",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating catalog section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.section.update', 
        {
            id: 32,
            fields: {
                iblockId: 14,
                name: 'Детские игрушки',
                description: "<H1>Детские игрушки</H1> <p>Товары для детей</p>",
                descriptionType: "html"
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
        'catalog.section.update',
        [
            'id' => 32,
            'fields' => [
                'iblockId' => 14,
                'name' => 'Детские игрушки',
                'description' => '<H1>Детские игрушки</H1> <p>Товары для детей</p>',
                'descriptionType' => 'html'
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
        "code": "toys1",
        "description": "<H1>Детские игрушки</H1> <p>Товары для детей</p>",
        "descriptionType": "html",
        "iblockId": 14,
        "iblockSectionId": 13,
        "id": 32,
        "name": "Детские игрушки",
        "sort": 100,
        "xmlId": "myXmlId"
    }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-04-05T16:24:46+02:00",
        "date_finish": "2024-04-05T16:24:46+02:00",
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
[`catalog_section`](../data-types.md#catalog_section) | Объект с информацией об обновленном разделе каталога ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300040` | Нет доступа к редактированию ||
|| `200700300010` | Ошибки при обновлении, например, идентификатор инфоблока обновляемого раздела не совпадает с идентификатором инфоблока раздела-родителя ||
|| `200700300030` | Раздела каталога с таким идентификатором не существует ||
|| `200700300040` | Нарушение уникальности поля `code` ||
|| `200700300050` | Инфоблока с заданным `iblockId` не существует ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-section-add.md)
- [{#T}](./catalog-section-get.md)
- [{#T}](./catalog-section-list.md)
- [{#T}](./catalog-section-delete.md)
- [{#T}](./catalog-section-get-fields.md)