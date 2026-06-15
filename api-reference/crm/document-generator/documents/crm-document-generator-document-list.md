# Получить список документов crm.documentgenerator.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "просмотра" документов генератора документов

Метод `crm.documentgenerator.document.list` возвращает список документов по фильтру.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у документов в выборке.

При выборке можно использовать:
- `'*'` — для выборки всех стандартных полей документа
- явный список полей, например `['id','title','number','entityId','createTime']`

Список полей смотрите в разделе [Тип document](#document).

По умолчанию используется `['*']` ||
|| **filter**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — название поля для фильтрации
- `value_n` — значение фильтра

К ключам `field_n` можно добавлять префиксы:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в значении передается массив
- `!@` — NOT IN, в значении передается массив
- `=` — равно (по умолчанию)
- `!=` или `!` — не равно

Список доступных полей для фильтрации смотрите в разделе [Тип document](#document). ||
|| **order**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — название поля сортировки
- `value_n` — направление сортировки: `ASC` или `DESC`

Список полей для сортировки смотрите в разделе [Тип document](#document).

Пример: `{"id":"DESC","createTime":"ASC"}` ||
|| **start**
[`integer`](../../data-types.md) | Параметр постраничной навигации.

Размер страницы фиксирован: `50` записей.

Формула для получения N-й страницы:
`start = (N - 1) * 50`

Подробнее в статье [Особенности списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения списка документов, где:
- выбираются поля `id`, `title`, `number`, `entityId`, `createTime`
- сортировка по `id` по убыванию
- фильтр по `entityTypeId = 2` и `entityId = 101`
- стартовое смещение — `0`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","number","entityId","createTime"],"order":{"id":"desc"},"filter":{"entityTypeId":2,"entityId":101},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","number","entityId","createTime"],"order":{"id":"desc"},"filter":{"entityTypeId":2,"entityId":101},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentItem = {
      id: string
      title: string
      number: string
      templateId: string
      entityTypeId: string
      entityId: string
      fileId: string
      imageId: string
      pdfId: string
      createTime: ISODate
      updateTime: ISODate
      createdBy: string | null
      updatedBy: string | null
      values: Record<string, unknown> | null
      downloadUrl: string
      imageUrl: string
      pdfUrl: string
      stampsEnabled: boolean
      downloadUrlMachine: string
      pdfUrlMachine: string
      imageUrlMachine: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentListResult = {
      documents: DocumentItem[]
    }

    try {
      // crm.documentgenerator.document.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<DocumentListResult>({
        method: 'crm.documentgenerator.document.list',
        params: {
          select: ['id', 'title', 'number', 'entityId', 'createTime'],
          order: { id: 'desc' },
          filter: { entityTypeId: 2, entityId: 101 },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents on this page:', result.documents.length, result.documents)
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
      async function fetchDocumentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.documentgenerator.document.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.documentgenerator.document.list',
            params: {
              select: ['id', 'title', 'number', 'entityId', 'createTime'],
              order: { id: 'desc' },
              filter: { entityTypeId: 2, entityId: 101 },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Documents on this page:', result.documents.length, result.documents)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchDocumentList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.documentgenerator.document.list',
                [
                    'select' => ['id', 'title', 'number', 'entityId', 'createTime'],
                    'order' => ['id' => 'desc'],
                    'filter' => ['entityTypeId' => 2, 'entityId' => 101],
                    'start' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting documents list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.list',
        {
            select: ['id', 'title', 'number', 'entityId', 'createTime'],
            order: { id: 'desc' },
            filter: { entityTypeId: 2, entityId: 101 },
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.info(result.data());

            if (result.more()) {
                result.next();
            }
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.document.list',
        [
            'select' => ['id', 'title', 'number', 'entityId', 'createTime'],
            'order' => ['id' => 'desc'],
            'filter' => ['entityTypeId' => 2, 'entityId' => 101],
            'start' => 0,
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
        "documents": [
            {
                "id": "61",
                "title": "Демонстрационная реализация товара 2026-001",
                "number": "2026-002",
                "templateId": "39",
                "fileId": "283",
                "imageId": "285",
                "pdfId": "287",
                "createTime": "2026-03-20T13:51:45+03:00",
                "updateTime": "2026-03-20T14:42:38+03:00",
                "values": {
                    "_creationMethod": "rest",
                    "stampsEnabled": true
                },
                "createdBy": "577",
                "updatedBy": "577",
                "downloadUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.download&SITE_ID=s1&id=61",
                "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=61",
                "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=61",
                "stampsEnabled": true,
                "entityId": "101",
                "entityTypeId": "2",
                "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?auth=***&token=***",
                "pdfUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getPdf.json?auth=***&token=***",
                "imageUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getImage.json?auth=***&token=***"
            },
            {
                "id": "59",
                "title": "Демонстрационная реализация товара 2026-001",
                "number": "2026-001",
                "templateId": "39",
                "fileId": "271",
                "imageId": "273",
                "pdfId": "275",
                "createTime": "2026-03-20T13:28:26+03:00",
                "updateTime": "2026-03-20T13:28:26+03:00",
                "values": {
                    "_creationMethod": "rest",
                    "stampsEnabled": true
                },
                "createdBy": "577",
                "updatedBy": null,
                "downloadUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.download&SITE_ID=s1&id=59",
                "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=59",
                "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=59",
                "stampsEnabled": true,
                "entityId": "101",
                "entityTypeId": "2",
                "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?auth=***&token=***",
                "pdfUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getPdf.json?auth=***&token=***",
                "imageUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getImage.json?auth=***&token=***"
            }
        ]
    },
    "total": 4,
    "time": {
        "start": 1774009414,
        "finish": 1774009414.09833,
        "duration": 0.09833002090454102,
        "processing": 0,
        "date_start": "2026-03-20T15:23:34+03:00",
        "date_finish": "2026-03-20T15:23:34+03:00",
        "operating_reset_at": 1774010014,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа. Содержит структуру [`result`](#result) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество документов, подходящих под фильтр ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **documents**
[`object[]`](../../data-types.md) | Массив документов. Структура элемента описана в типе [`document`](#document) ||
|#

#### Тип document {#document}

Состав полей зависит от параметра `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор документа ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **number**
[`string`](../../data-types.md) | Номер документа ||
|| **templateId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор шаблона документа ||
|| **entityTypeId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор типа CRM-объекта ||
|| **entityId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор CRM-объекта ||
|| **fileId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор DOCX-файла документа ||
|| **imageId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор изображения документа ||
|| **pdfId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор PDF-файла документа ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата создания документа ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата обновления документа ||
|| **createdBy**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор пользователя, создавшего документ ||
|| **updatedBy**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор пользователя, обновившего документ ||
|| **values**
[`object`](../../data-types.md) \| [`null`](../../data-types.md) | Значения полей документа ||
|| **downloadUrl**
[`string`](../../data-types.md) | Ссылка на скачивание документа ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение документа ||
|| **pdfUrl**
[`string`](../../data-types.md) | Ссылка на PDF-документ ||
|| **downloadUrlMachine**
[`string`](../../data-types.md) | Ссылка на скачивание документа для машинного доступа ||
|| **pdfUrlMachine**
[`string`](../../data-types.md) | Ссылка на PDF-документ для машинного доступа ||
|| **imageUrlMachine**
[`string`](../../data-types.md) | Ссылка на изображение документа для машинного доступа ||
|| **stampsEnabled**
[`boolean`](../../data-types.md) | Признак подстановки печати и подписи ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | Unknown field definition ENTITY_TYPE_ID (ENTITY_TYPE_ID) for \Bitrix\DocumentGenerator\Model\Document Entity | В параметр `select` передано поле `entityTypeId`, которое не является прямым полем модели документа. Используйте `select: ['*']` ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения документов по выбранному фильтру CRM-объектов ||
|| `Пустое значение` | You do not have permissions to view documents | Недостаточно прав для просмотра документов генератора документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-add.md)
- [{#T}](./crm-document-generator-document-get.md)
- [{#T}](./crm-document-generator-document-get-fields.md)
- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
