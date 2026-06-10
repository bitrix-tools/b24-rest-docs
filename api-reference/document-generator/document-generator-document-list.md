# Получить список документов documentgenerator.document.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр документов

Метод `documentgenerator.document.list` возвращает список документов по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../data-types.md) | Массив содержит [список полей](#list-fields), которые нужно вернуть.

По умолчанию `["*"]` ||
|| **order**
[`object`](../data-types.md) | Объект для сортировки документов в формате `{"field_1":"value_1", ... "field_N":"value_N"}`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Для `field_N` используйте поля из [таблицы полей](#list-fields). ||
|| **filter**
[`object`](../data-types.md) | Объект для фильтрации документов в формате `{"field_1":"value_1", ... "field_N":"value_N"}`.

Для `field_N` используйте поля из [таблицы полей](#list-fields).

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра. 
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N — 1) * 50`, где `N` — номер нужной страницы ||
|#

### Поля для select, order, filter {#list-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор документа ||
|| **title**
[`string`](../data-types.md) | Название документа ||
|| **number**
[`string`](../data-types.md) | Номер документа ||
|| **templateId**
[`integer`](../data-types.md) | Идентификатор шаблона ||
|| **provider**
[`string`](../data-types.md) | Класс провайдера ||
|| **value**
[`string`](../data-types.md) | Внешний идентификатор объекта ||
|| **fileId**
[`integer`](../data-types.md) | Идентификатор DOCX-файла документа ||
|| **imageId**
[`integer`](../data-types.md) | Идентификатор файла изображения документа ||
|| **pdfId**
[`integer`](../data-types.md) | Идентификатор PDF-файла документа ||
|| **createTime**
[`datetime`](../data-types.md) | Время создания документа ||
|| **updateTime**
[`datetime`](../data-types.md) | Время обновления документа ||
|| **values**
[`object`](../data-types.md) | Значения полей документа ||
|| **createdBy**
[`integer`](../data-types.md) | Идентификатор пользователя, который создал документ ||
|| **updatedBy**
[`integer`](../data-types.md) | Идентификатор пользователя, который обновил документ ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "select": [
        "id",
        "title",
        "number",
        "templateId",
        "provider",
        "value",
        "fileId",
        "imageId",
        "pdfId",
        "createTime",
        "updateTime",
        "createdBy"
      ],
      "order": {
        "updateTime": "desc",
        "id": "desc"
      },
      "filter": {
        ">=createTime": "2026-03-18T00:00:00+03:00",
        "%title": "ДГ-2026"
      },
      "start": 0
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "select": [
        "id",
        "title",
        "number",
        "templateId",
        "provider",
        "value",
        "fileId",
        "imageId",
        "pdfId",
        "createTime",
        "updateTime",
        "createdBy"
      ],
      "order": {
        "updateTime": "desc",
        "id": "desc"
      },
      "filter": {
        ">=createTime": "2026-03-18T00:00:00+03:00",
        "%title": "ДГ-2026"
      },
      "start": 0,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.document.list
  ```

- JS (TS)

  ```ts
  // This snippet is an ES module: top-level await requires type="module" or a bundler.
  // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
  import { Text } from '@bitrix24/b24jssdk'
  import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

  declare const $b24: B24Frame

  // Shape of the payload returned in result (match the "response handling" section of the page)
  type DocumentListResult = {
    documents: {
      id: string
      title: string
      number: string
      templateId: string
      provider: string
      value: string
      fileId: number
      imageId: number
      pdfId: number
      createTime: ISODate | null
      updateTime: ISODate | null
      createdBy: string
      updatedBy: number
      downloadUrl: string
      pdfUrl: string
      imageUrl: string
      stampsEnabled: boolean
      downloadUrlMachine: string
      pdfUrlMachine: string
      imageUrlMachine: string
      values: object | null
    }[]
  }

  try {
    // documentgenerator.document.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    const response = await $b24.actions.v2.call.make<DocumentListResult>({
      method: 'documentgenerator.document.list',
      params: {
        select: [
          'id',
          'title',
          'number',
          'templateId',
          'provider',
          'value',
          'fileId',
          'imageId',
          'pdfId',
          'createTime',
          'updateTime',
          'createdBy',
        ],
        order: {
          updateTime: 'desc',
          id: 'desc',
        },
        filter: {
          '>=createTime': '2026-03-18T00:00:00+03:00',
          '%title': 'ДГ-2026',
        },
        start: 0,
      },
      requestId: Text.getUuidRfc4122()
    })

    // The payload is available only on a successful response
    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      const result = response.getData()!.result
      console.info('Documents on page:', result.documents.length)
      console.info('Documents:', result.documents)
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

        // documentgenerator.document.list returns a single page (max 50 records). For the whole result set
        // use a list helper: $b24.actions.v2.callList.make() returns every record as one
        // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
        // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
        // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
        const response = await $b24.actions.v2.call.make({
          method: 'documentgenerator.document.list',
          params: {
            select: [
              'id',
              'title',
              'number',
              'templateId',
              'provider',
              'value',
              'fileId',
              'imageId',
              'pdfId',
              'createTime',
              'updateTime',
              'createdBy',
            ],
            order: {
              updateTime: 'desc',
              id: 'desc',
            },
            filter: {
              '>=createTime': '2026-03-18T00:00:00+03:00',
              '%title': 'ДГ-2026',
            },
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
        console.info('Documents on page:', result.documents.length)
        console.info('Documents:', result.documents)
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
      $response = $b24Service->core->call(
          'documentgenerator.document.list',
          [
              'select' => [
                  'id',
                  'title',
                  'number',
                  'templateId',
                  'provider',
                  'value',
                  'fileId',
                  'imageId',
                  'pdfId',
                  'createTime',
                  'updateTime',
                  'createdBy',
              ],
              'order' => [
                  'updateTime' => 'desc',
                  'id' => 'desc',
              ],
              'filter' => [
                  '>=createTime' => '2026-03-18T00:00:00+03:00',
                  '%title' => 'ДГ-2026',
              ],
              'start' => 0,
          ]
      );

      $result = $response->getResponseData()->getResult();
      print_r($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.document.list',
      {
          select: [
              'id',
              'title',
              'number',
              'templateId',
              'provider',
              'value',
              'fileId',
              'imageId',
              'pdfId',
              'createTime',
              'updateTime',
              'createdBy'
          ],
          order: {
              updateTime: 'desc',
              id: 'desc'
          },
          filter: {
              '>=createTime': '2026-03-18T00:00:00+03:00',
              '%title': 'ДГ-2026'
          }
      },
      function(result)
      {
          if (result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.log(result.data());

              if (result.more())
              {
                  result.next();
              }
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'documentgenerator.document.list',
      [
          'select' => [
              'id',
              'title',
              'number',
              'templateId',
              'provider',
              'value',
              'fileId',
              'imageId',
              'pdfId',
              'createTime',
              'updateTime',
              'createdBy',
          ],
          'order' => [
              'updateTime' => 'desc',
              'id' => 'desc',
          ],
          'filter' => [
              '>=createTime' => '2026-03-18T00:00:00+03:00',
              '%title' => 'ДГ-2026',
          ],
          'start' => 0,
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
        "documents": [
            {
                "id": "51",
                "title": "SUPPLY_CONTRACT Template 1773843147554 ДГ-2026-001",
                "number": "ДГ-2026-001",
                "templateId": "53",
                "provider": "bitrix\\documentgenerator\\dataprovider\\rest",
                "value": "SUPPLY_CONTRACT_2026_015",
                "fileId": "241",
                "imageId": "243",
                "pdfId": "245",
                "createTime": "2026-03-18T17:27:48+03:00",
                "updateTime": "2026-03-18T17:27:48+03:00",
                "createdBy": "503",
                "downloadUrl": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51",
                "pdfUrl": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getpdf&SITE_ID=s1&id=51",
                "imageUrl": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getimage&SITE_ID=s1&id=51",
                "values": null,
                "stampsEnabled": false,
                "downloadUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getfile.json?auth=63bfbb690000071b00000844000001f7f0f107a3f045d88e8327666879f4b04885d7af&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlJlNJVEVfSUQ9czEmaWQ9NTEmXz1WMXA5WU1YMkRSbUJraDA1cmhjVVRIZXFkRE5EWmpLcA%3D%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlfGRvY3VtZW50Z2VuZXJhdG9yfFlXTjBhVzl1UFdSdlkzVnRaVzUwWjJWdVpYSmhkRzl5TG1Gd2FTNWtiMk4xYldWdWRDNW5aWFJtYVd4bEpsTkpWRVZmU1VROWN6RW1hV1E5TlRFbVh6MVdNWEE1V1UxWU1rUlNiVUpyYURBMWNtaGpWVlJJWlhGa1JFNUVXbXBMY0E9PXw2M2JmYmI2OTAwMDAwNzFiMDAwMDA4NDQwMDAwMDFmN2YwZjEwN2EzZjA0NWQ4OGU4MzI3NjY2ODc5ZjRiMDQ4ODVkN2FmIg%3D%3D.b2USzpTXZIDIUEgZjOXB4hDphKJjQY5spzTOdimZvss%3D",
                "pdfUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getpdf.json?auth=63bfbb690000071b00000844000001f7f0f107a3f045d88e8327666879f4b04885d7af&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRwZGYmU0lURV9JRD1zMSZpZD01MSZfPUgyc0IwUlpMa1BueVpvV29rajVHUnFHUWU1T0cwQ2Z1%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRwZGZ8ZG9jdW1lbnRnZW5lcmF0b3J8WVdOMGFXOXVQV1J2WTNWdFpXNTBaMlZ1WlhKaGRHOXlMbUZ3YVM1a2IyTjFiV1Z1ZEM1blpYUndaR1ltVTBsVVJWOUpSRDF6TVNacFpEMDFNU1pmUFVneWMwSXdVbHBNYTFCdWVWcHZWMjlyYWpWSFVuRkhVV1UxVDBjd1EyWjF8NjNiZmJiNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDdhM2YwNDVkODhlODMyNzY2Njg3OWY0YjA0ODg1ZDdhZiI%3D.m0Ng5a%2BitODVrxQonwPkRt9L8dr2Jx9fbxnY%2BoZzAe4%3D",
                "imageUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getimage.json?auth=63bfbb690000071b00000844000001f7f0f107a3f045d88e8327666879f4b04885d7af&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRpbWFnZSZTSVRFX0lEPXMxJmlkPTUxJl89RGJHM3pFUTlPTmhYNVlrWUc3NEx6MTVUYUdzdlVkUGk%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRpbWFnZXxkb2N1bWVudGdlbmVyYXRvcnxZV04wYVc5dVBXUnZZM1Z0Wlc1MFoyVnVaWEpoZEc5eUxtRndhUzVrYjJOMWJXVnVkQzVuWlhScGJXRm5aU1pUU1ZSRlgwbEVQWE14Sm1sa1BUVXhKbDg5UkdKSE0zcEZVVGxQVG1oWU5WbHJXVWMzTkV4Nk1UVlVZVWR6ZGxWa1VHaz18NjNiZmJiNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDdhM2YwNDVkODhlODMyNzY2Njg3OWY0YjA0ODg1ZDdhZiI%3D.40ZdIhNinEEmMsb%2FQm%2BCseG%2BKe0ZmR6vpQhs6N6KjfQ%3D"
            },
            {
                "id": "37",
                ... // описание документа с id=37
            },
            {
                "id": "33",
                ... // описание документа с id=33
            }
        ]
    },
    "total": 3,
    "time": {
        "start": 1773908326,
        "finish": 1773908326.204212,
        "duration": 0.20421195030212402,
        "processing": 0,
        "date_start": "2026-03-19T11:18:46+03:00",
        "date_finish": "2026-03-19T11:18:46+03:00",
        "operating_reset_at": 1773908926,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **total**
[`integer`](../data-types.md) | Общее количество элементов по фильтру ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **documents**
[`array`](../data-types.md) | Список документов.

Состав полей зависит от `select` ||
|#

#### Элемент массива documents {#documents}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор документа ||
|| **title**
[`string`](../data-types.md) | Название документа ||
|| **number**
[`string`](../data-types.md) | Номер документа ||
|| **templateId**
[`string`](../data-types.md) | Идентификатор шаблона ||
|| **provider**
[`string`](../data-types.md) | Класс провайдера данных ||
|| **value**
[`string`](../data-types.md) | Внешний идентификатор объекта ||
|| **fileId**
[`integer`](../data-types.md) | Идентификатор DOCX-файла документа ||
|| **imageId**
[`integer`](../data-types.md) | Идентификатор файла изображения документа ||
|| **pdfId**
[`integer`](../data-types.md) | Идентификатор PDF-файла документа ||
|| **createTime**
[`datetime`](../data-types.md) | Время создания документа ||
|| **updateTime**
[`datetime`](../data-types.md) | Время последнего обновления документа ||
|| **values**
[`object`](../data-types.md) | Значения полей документа [(подробное описание)](#document-values) ||
|| **createdBy**
[`string`](../data-types.md) | Идентификатор пользователя, который создал документ ||
|| **updatedBy**
[`integer`](../data-types.md) | Идентификатор пользователя, который обновил документ ||
|| **downloadUrl**
[`string`](../data-types.md) | Ссылка на скачивание DOCX для пользователя ||
|| **pdfUrl**
[`string`](../data-types.md) | Ссылка на скачивание PDF для пользователя ||
|| **imageUrl**
[`string`](../data-types.md) | Ссылка на скачивание изображения для пользователя ||
|| **stampsEnabled**
[`boolean`](../data-types.md) | Признак включенных печатей и подписей ||
|| **downloadUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание DOCX для приложения ||
|| **pdfUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание PDF для приложения ||
|| **imageUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание изображения для приложения ||
|#

#### Объект values {#document-values}

#|
|| **Название**
`тип` | **Описание** ||
|| **_creationMethod**
[`string`](../data-types.md) | Способ создания документа ||
|| **stampsEnabled**
[`boolean`](../data-types.md) | Признак включенных печатей и подписей ||
|| **<код_поля>**
[`string`](../data-types.md) | Значение поля из шаблона по его коду ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to view documents"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | You do not have permissions to view documents | Недостаточно прав на просмотр списка документов ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-document-add.md)
- [{#T}](./document-generator-document-update.md)
- [{#T}](./document-generator-document-get.md)
- [{#T}](./document-generator-document-delete.md)
- [{#T}](./document-generator-document-enable-public-url.md)
- [{#T}](./document-generator-document-get-fields.md)
