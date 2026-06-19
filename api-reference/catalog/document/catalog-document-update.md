# Изменить документ складского учета catalog.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Cоздание и редактирование» на нужный тип документа

Метод `catalog.document.update` изменяет поля существующего документа складского учета. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа, можно получить методом [catalog.document.list](./catalog-document-list.md) ||
|| **fields***
[`object`](#fields) | Поля документа ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор ответственного ||
|| **dateModify**
[`datetime`](../../data-types.md) | Можно передать собственную дату изменения. По умолчанию — текущая дата ||
|| **dateDocument**
[`datetime`](../../data-types.md) | Дата проведения документа ||
|| **total**
[`double`](../../data-types.md) | Общая сумма по товарам документа. Пересчитывается автоматически после изменения товарных позиций ||
|| **commentary**
[`char`](../../data-types.md) | Комментарий к документу ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **docNumber**
[`string`](../../data-types.md) | Внутренний номер документа ||
|| **modifiedBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, изменившего документ. Администратор может указать любое значение, по умолчанию заполняется текущим пользователем ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":142,"fields":{"title":"Поступление от Поставщик-1 (корректировка)","commentary":"Обновили ответсвенного","responsibleId":21}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":142,"fields":{"title":"Поступление от Поставщик-1 (корректировка)","commentary":"Обновили ответсвенного","responsibleId":21},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentUpdateResult = {
      document: {
        commentary: string,
        createdBy: number,
        currency: string,
        dateCreate: ISODate,
        dateDocument: ISODate | null,
        dateModify: ISODate,
        dateStatus: ISODate,
        docNumber: string,
        docType: string,
        id: number,
        modifiedBy: number,
        responsibleId: number,
        siteId: string,
        status: string,
        statusBy: number | null,
        title: string,
        total: number | null,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentUpdateResult>({
        method: 'catalog.document.update',
        params: {
          id: 142,
          fields: {
            title: 'Product receipt from Supplier-1 (adjustment)',
            commentary: 'Updated the responsible person',
            responsibleId: 21,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated document:', result.document.id, result.document.title)
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
      async function updateDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.update',
            params: {
              id: 142,
              fields: {
                title: 'Product receipt from Supplier-1 (adjustment)',
                commentary: 'Updated the responsible person',
                responsibleId: 21,
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
          console.info('Updated document:', result.document.id, result.document.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDocument)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.update',
                [
                    'id' => 142,
                    'fields' => [
                        'title' => 'Поступление от Поставщик-1 (корректировка)',
                        'commentary' => 'Обновили ответсвенного',
                        'responsibleId' => 21
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.update',
        {
            id: 142,
            fields: {
                title: 'Поступление от Поставщик-1 (корректировка)',
                commentary: 'Обновили ответсвенного',
                responsibleId: 21
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
        'catalog.document.update',
        [
            'id' => 142,
            'fields' => [
                'title' => 'Поступление от Поставщик-1 (корректировка)',
                'commentary' => 'Обновили ответсвенного',
                'responsibleId' => 21
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
        "document": {
            "commentary": "Обновили ответсвенного",
            "createdBy": 29,
            "currency": "RUB",
            "dateCreate": "2025-10-30T11:19:38+03:00",
            "dateDocument": null,
            "dateModify": "2025-10-30T11:33:42+03:00",
            "dateStatus": "2025-10-30T11:19:38+03:00",
            "docNumber": "IN-00042",
            "docType": "A",
            "id": 11,
            "modifiedBy": 29,
            "responsibleId": 21,
            "siteId": "s1",
            "status": "N",
            "statusBy": null,
            "title": "Поступление от Поставщик-1 (корректировка)",
            "total": null
        }
    },
    "time": {
        "start": 1761806022,
        "finish": 1761806022.36133,
        "duration": 0.3613300323486328,
        "processing": 0,
        "date_start": "2025-10-30T09:33:42+03:00",
        "date_finish": "2025-10-30T09:33:42+03:00",
        "operating_reset_at": 1761806622,
        "operating": 0.17665815353393555
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md#catalog_document) | Корневой элемент ответа ||
|| **document**
[`catalog_document`](../data-types.md#catalog_document) | Объект с обновленными данными документа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Документ не найден."
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для сохранения документа | У пользователя нет права на редактирование документа нужного типа или документ с таким идентификатором не существует ||
|| `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на вашем тарифе ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-element/catalog-document-element-update.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-add.md)
- [{#T}](./catalog-document-cancel.md)
- [{#T}](./catalog-document-add.md)
- [{#T}](./catalog-document-conduct.md)


