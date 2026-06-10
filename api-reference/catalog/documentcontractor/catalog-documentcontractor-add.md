# Добавить поставщика к документу складского учета catalog.documentcontractor.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами:
> — «Просмотр» и «Cоздание и редактирование» на тип документа «Приход»,
> — «Просмотр раздела Складской учет»
> — «Просмотр каталога товаров»  

Метод `catalog.documentcontractor.add` создает привязку поставщика, контакта или компании, к документу складского учета.

## Параметры метода  

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}  

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](#fields) | Поля привязки ([подробное описание](#fields)) ||
|# 

## Параметр fields {#fields}  

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}  

#|
|| **Название**
`тип` | **Описание** || 
|| **documentId*** 
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа складского учета типа «Приход» `A`.  
Получить можно методом [catalog.document.list](../document/catalog-document-list.md) ||  
|| **entityTypeId***  
[`integer`](../../crm/data-types.md#object_type) | Тип объекта CRM:  
`3` — контакт 
`4` — компания ||  
|| **entityId***  
[`integer`](../../data-types.md) | Идентификатор элемента CRM, контакта или компании, из категории «Поставщик».
 
Чтобы получить идентификаторы поставщиков:  
1. Получите идентификатор категории с кодом `CATALOG_CONTRACTOR_CONTACT` для контактов или `CATALOG_CONTRACTOR_COMPANY` для компаний методом [crm.category.list](../../crm/universal/category/crm-category-list.md).  
2. Используйте полученный `categoryId` в фильтре запроса [crm.item.list](../../crm/universal/crm-item-list.md) ||  
|#  

## Примеры кода  

{% include [Сноска о примерах](../../../_includes/examples.md) %}  

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"documentId":42,"entityTypeId":3,"entityId":101}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.documentcontractor.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"documentId":42,"entityTypeId":3,"entityId":101},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.documentcontractor.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentContractorAddResult = {
      documentContractor: {
        documentId: number
        entityId: number
        entityTypeId: number
        id: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentContractorAddResult>({
        method: 'catalog.documentcontractor.add',
        params: {
          fields: {
            documentId: 42,
            entityTypeId: 3,
            entityId: 101,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.documentContractor.id, result.documentContractor)
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
      async function addDocumentContractor() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.documentcontractor.add',
            params: {
              fields: {
                documentId: 42,
                entityTypeId: 3,
                entityId: 101,
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
          console.info(result.documentContractor.id, result.documentContractor)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDocumentContractor)
    </script>
    ```

- PHP

    ```php  
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.documentcontractor.add',
                [
                    'fields' => [
                        'documentId' => 42,
                        'entityTypeId' => 3,
                        'entityId' => 101
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result) {
            echo 'Success: ' . print_r($result, true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding contractor binding: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.documentcontractor.add',
        {
            fields: {
                documentId: 42,
                entityTypeId: 3,
                entityId: 101
            }
        },
        function(result)
        {
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
        'catalog.documentcontractor.add',
        [
            'fields' => [
                'documentId' => 42,
                'entityTypeId' => 3,
                'entityId' => 101
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documentContractor": {
            "documentId": 73,
            "entityId": 2185,
            "entityTypeId": 3,
            "id": 15
        }
    },
    "time": {
        "start": 1766469835,
        "finish": 1766469835.824666,
        "duration": 0.8246660232543945,
        "processing": 0,
        "date_start": "2025-12-23T09:03:55+03:00",
        "date_finish": "2025-12-23T09:03:55+03:00",
        "operating_reset_at": 1766470435,
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
|| **documentContractor**
[`catalog_documentContractor`](../data-types.md#catalog_documentContractor) | Объект с данными созданной привязки поставщика к документу складского учета ||  
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок 

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}  

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Store document was not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Store document was not found | Указан несуществующий или недоступный идентификатор документа ||  
|| `0` | Type of store document is wrong | Документ не является типом «Приход» `A` ||  
|| `0` | Unable to edit conducted document | Документ уже проведен и не может быть изменен ||  
|| `0` | Wrong entity type id | Передан недопустимый `entityTypeId`, должен быть 3 или 4 ||  
|| `0` | Wrong entity id | Указан недопустимый или несуществующий `entityId` ||  
|| `0` | This contractor has been already bound to this document | Такая привязка уже существует ||  
|| `0` | This document already has a Company contractor | К документу уже привязана компания. Повторная привязка компаний запрещена ||  
|| `0` | Access denied | Недостаточно прав для изменения документа ||  
|| `0` | Contractors should be provided by CRM | Модуль CRM не активен как поставщик контрагентов ||  
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}  

## Продолжите изучение

- [{#T}](./catalog-documentcontractor-list.md)  
- [{#T}](./catalog-documentcontractor-delete.md)  
- [{#T}](./catalog-documentcontractor-get-fields.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contractor.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/how-to-get-contractors.md)