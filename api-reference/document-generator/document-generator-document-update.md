# Изменить существующий документ documentgenerator.document.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр документов и на изменение этого документа

Метод `documentgenerator.document.update` обновляет документ новыми значениями полей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор документа.

Получить идентификатор документа можно после [создания документа](./document-generator-document-add.md) или методом [получения списка документов](./document-generator-document-list.md) ||
|| **values**
[`object`](../data-types.md) | Значения полей документа вида `{"КодПоля":"Значение"}` ||
|| **stampsEnabled**
[`integer`](../data-types.md) | Режим печатей и подписей:
- `1` — включить
- `0` — выключить

По умолчанию `1` ||
|| **fields**
[`object`](../data-types.md) | Описание того, как интерпретировать и форматировать значения из `values` [(подробное описание)](#fields).

Ключ объекта `fields` должен совпадать с кодом поля из шаблона.

Если передаете только обычный текст, параметр можно не указывать.

Пример структуры `fields`:

```json
{
    "CurrentDate": {
        "TYPE": "DATE",
        "FORMAT": {
            "format": "d.m.Y"
        },
        "TITLE": "Дата договора"
    }
}
```
||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../data-types.md) | Тип поля.

Типы, для которых можно указать форматирование:
- `DATE` — дата или дата-время
- `NAME` — ФИО
||
|| **FORMAT**
[`object`](../data-types.md) | Параметры формата для типа поля.

`FORMAT` не фиксирован одним значением, его нужно выбирать под ваш шаблон и требования к выводу.

Для `DATE` значение `format` задается в формате модификаторов даты генератора документов. Пример: `{"format":"d.m.Y"}`

Для `NAME`:
- `format` задает шаблон вывода частей имени, например `#NAME# #LAST_NAME#`
- `case` задает падеж

{% note tip "Пользовательская документация" %}

- [Что такое модификаторы в шаблонах документов](https://helpdesk.bitrix24.ru/open/18175702/)

{% endnote %}
||
|| **PROVIDER**
[`string`](../data-types.md) | Класс провайдера ||
|| **TITLE**
[`string`](../data-types.md) | Название поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"2026-03-20T00:00:00+03:00","ClientName":"ООО Ромашка","ClientPhone":"+7 999 123-45-67","Total":"130000","Comment":"Оплата в течение 3 рабочих дней после подписания","UserName":"Иван Петров"},"stampsEnabled":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.update
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"2026-03-20T00:00:00+03:00","ClientName":"ООО Ромашка","ClientPhone":"+7 999 123-45-67","Total":"130000","Comment":"Оплата в течение 3 рабочих дней после подписания","UserName":"Иван Петров"},"stampsEnabled":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.document.update
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
        id: string
        title: string
        number: string
        templateId: string
        provider: string
        value: string
        values: Record<string, unknown>
        stampsEnabled: boolean
        downloadUrl: string
        pdfUrl: string
        imageUrl: string
        printUrl: string
        downloadUrlMachine: string
        pdfUrlMachine: string
        imageUrlMachine: string
        printUrlMachine: string
        publicUrl: string
        publicUrlView: { time: ISODate | null }
        isTransformationError: boolean
        pullTag: string
        emailDiskFile: number
        createTime: ISODate | null
        updateTime: ISODate | null
        createdBy: string
        updatedBy: number | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentUpdateResult>({
        method: 'documentgenerator.document.update',
        params: {
          id: 51,
          values: {
            DocumentNumber: 'DG-2026-001',
            CurrentDate: '2026-03-20T00:00:00+03:00',
            ClientName: 'Romashka LLC',
            ClientPhone: '+7 999 123-45-67',
            Total: '130000',
            Comment: 'Payment within 3 business days after signing',
            UserName: 'Ivan Petrov',
          },
          stampsEnabled: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.document.id, result.document.title, result.document.downloadUrl)
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
            method: 'documentgenerator.document.update',
            params: {
              id: 51,
              values: {
                DocumentNumber: 'DG-2026-001',
                CurrentDate: '2026-03-20T00:00:00+03:00',
                ClientName: 'Romashka LLC',
                ClientPhone: '+7 999 123-45-67',
                Total: '130000',
                Comment: 'Payment within 3 business days after signing',
                UserName: 'Ivan Petrov',
              },
              stampsEnabled: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.document.id, result.document.title, result.document.downloadUrl)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDocument)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.documentgenerator.document.update(
          bitrix_id=51,
          values={
              "DocumentNumber": "ДГ-2026-001",
              "CurrentDate": "2026-03-20T00:00:00+03:00",
              "ClientName": "ООО Ромашка",
              "ClientPhone": "+7 999 123-45-67",
              "Total": "130000",
              "Comment": "Оплата в течение 3 рабочих дней после подписания",
              "UserName": "Иван Петров",
          },
          stamps_enabled=1,
      ).response
      result = bitrix_response.result
      print(result)
  except BitrixAPIError as error:
      print(
          "Ошибка Bitrix API",
          f"error: {error.error}",
          f"error_description: {error.error_description}",
          sep="\n",
      )
  except BitrixSDKException as error:
      print(f"Ошибка Bitrix SDK: {error.message}")
  except Exception as error:
      print(f"Непредвиденная ошибка: {error}")
  ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.document.update',
          [
              'id' => 51,
              'values' => [
                  'DocumentNumber' => 'ДГ-2026-001',
                  'CurrentDate' => '2026-03-20T00:00:00+03:00',
                  'ClientName' => 'ООО Ромашка',
                  'ClientPhone' => '+7 999 123-45-67',
                  'Total' => '130000',
                  'Comment' => 'Оплата в течение 3 рабочих дней после подписания',
                  'UserName' => 'Иван Петров',
              ],
              'stampsEnabled' => 1,
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
      'documentgenerator.document.update',
      {
          id: 51,
          values: {
              DocumentNumber: 'ДГ-2026-001',
              CurrentDate: '2026-03-20T00:00:00+03:00',
              ClientName: 'ООО Ромашка',
              ClientPhone: '+7 999 123-45-67',
              Total: '130000',
              Comment: 'Оплата в течение 3 рабочих дней после подписания',
              UserName: 'Иван Петров'
          },
          stampsEnabled: 1
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
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'documentgenerator.document.update',
      [
          'id' => 51,
          'values' => [
              'DocumentNumber' => 'ДГ-2026-001',
              'CurrentDate' => '2026-03-20T00:00:00+03:00',
              'ClientName' => 'ООО Ромашка',
              'ClientPhone' => '+7 999 123-45-67',
              'Total' => '130000',
              'Comment' => 'Оплата в течение 3 рабочих дней после подписания',
              'UserName' => 'Иван Петров',
          ],
          'stampsEnabled' => 1,
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.document.update", b24.Params{
    	"id": 51,
    	"values": b24.Params{
    		"DocumentNumber": "ДГ-2026-001",
    		"CurrentDate":    "2026-03-20T00:00:00+03:00",
    		"ClientName":     "ООО Ромашка",
    		"ClientPhone":    "+7 999 123-45-67",
    		"Total":          "130000",
    		"Comment":        "Оплата в течение 3 рабочих дней после подписания",
    		"UserName":       "Иван Петров",
    	},
    	"stampsEnabled": 1,
    })
    if err != nil {
    	return fmt.Errorf("documentgenerator.document.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "document".
    raw, ok := b24.Unwrap(res.Result, "document")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа document")
    }

    var item struct {
    	DownloadUrl string `json:"downloadUrl"`
    	PublicUrl   string `json:"publicUrl"`
    	Title       string `json:"title"`
    	Number      string `json:"number"`
    	ID          b24.ID `json:"id"`
    	CreateTime  string `json:"createTime"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.DownloadUrl, item.PublicUrl)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "document": {
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068",
            "publicUrl": "https://mysite.ru/~bat5R",
            "title": "SUPPLY_CONTRACT Template 1773843147554 ДГ-2026-001",
            "number": "ДГ-2026-001",
            "id": "51",
            "createTime": "2026-03-19T15:08:20+03:00",
            "createdBy": null,
            "updateTime": "2026-03-19T15:08:19+03:00",
            "updatedBy": 503,
            "stampsEnabled": true,
            "isTransformationError": false,
            "value": "SUPPLY_CONTRACT_2026_015",
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true,
                "DocumentNumber": "ДГ-2026-001",
                "CurrentDate": "2026-03-20T00:00:00+03:00",
                "ClientName": "ООО Ромашка",
                "ClientPhone": "+7 999 123-45-67",
                "Total": "130000",
                "Comment": "Оплата в течение 3 рабочих дней после подписания",
                "UserName": "Иван Петров"
            },
            "publicUrlView": {
                "time": "2026-03-19T15:08:05+03:00"
            },
            "templateId": "53",
            "provider": "Bitrix\\DocumentGenerator\\DataProvider\\Rest",
            "pullTag": "TRANSFORMDOCUMENT51",
            "emailDiskFile": 5573,
            "downloadUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getfile.json?auth=1fe8bb690000071b00000844000001f7f0f107826a2f4f01a384d1dcdb624764d8ea63&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlJlNJVEVfSUQ9czEmaWQ9NTEmdHM9MTc3Mzg0NDA2OCZfPVptQjFqSzNTNlhtMm5EbUR6OFV6YlJydExGbGtaOGpF%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlfGRvY3VtZW50Z2VuZXJhdG9yfFlXTjBhVzl1UFdSdlkzVnRaVzUwWjJWdVpYSmhkRzl5TG1Gd2FTNWtiMk4xYldWdWRDNW5aWFJtYVd4bEpsTkpWRVZmU1VROWN6RW1hV1E5TlRFbWRITTlNVGMzTXpnME5EQTJPQ1pmUFZwdFFqRnFTek5UTmxodE1tNUViVVI2T0ZWNllsSnlkRXhHYkd0YU9HcEZ8MWZlOGJiNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDc4MjZhMmY0ZjAxYTM4NGQxZGNkYjYyNDc2NGQ4ZWE2MyI%3D.Cifk0KKcqbktmPy6ARfXPn7dO71%2FP4MY5xys1%2FGF%2FBc%3D"
        }
    },
    "time": {
        "start": 1773922099,
        "finish": 1773922099.372946,
        "duration": 0.37294602394104004,
        "processing": 0,
        "date_start": "2026-03-19T15:08:19+03:00",
        "date_finish": "2026-03-19T15:08:19+03:00",
        "operating_reset_at": 1773922699,
        "operating": 0.13009309768676758
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **document**
[`object`](../data-types.md) | Данные обновленного документа [(подробное описание)](#document) ||
|#

#### Объект document {#document}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../data-types.md) | Идентификатор документа. В ответе [documentgenerator.document.add](./document-generator-document-add.md) приходит числом ||
|| **title**
[`string`](../data-types.md) | Название документа ||
|| **number**
[`string`](../data-types.md) | Номер документа ||
|| **templateId**
[`string`](../data-types.md) | Идентификатор шаблона ||
|| **provider**
[`string`](../data-types.md) | Класс провайдера данных ||
|| **value**
[`string`](../data-types.md) | Внешний идентификатор объекта, для которого создан документ ||
|| **values**
[`object`](../data-types.md) | Значения полей документа [(подробное описание)](#document-values) ||
|| **stampsEnabled**
[`boolean`](../data-types.md) | Признак включенных печатей и подписей ||
|| **downloadUrl**
[`string`](../data-types.md) | Ссылка на скачивание DOCX ||
|| **downloadUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание DOCX для приложения ||
|| **pdfUrl**
[`string`](../data-types.md) | Ссылка на скачивание PDF.

Поле приходит, только когда PDF уже сформирован. Конвертация выполняется асинхронно, поэтому сразу после создания или изменения документа поля обычно нет ||
|| **pdfUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание PDF для приложения. Приходит вместе с `pdfUrl` ||
|| **printUrl**
[`string`](../data-types.md) | Ссылка на просмотр или печать PDF. Приходит вместе с `pdfUrl` ||
|| **printUrlMachine**
[`string`](../data-types.md) | Ссылка на просмотр или печать PDF для приложения. Приходит вместе с `pdfUrl` ||
|| **imageUrl**
[`string`](../data-types.md) | Ссылка на скачивание изображения документа.

Поле приходит, только когда изображение уже сформировано ||
|| **imageUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание изображения для приложения. Приходит вместе с `imageUrl` ||
|| **publicUrl**
[`string`](../data-types.md) | Публичная ссылка на документ. Если ссылка не включена — `null`.

Включить ссылку можно методом [documentgenerator.document.enablepublicurl](./document-generator-document-enable-public-url.md) ||
|| **publicUrlView**
[`object`](../data-types.md) | Данные о просмотре публичной ссылки [(подробное описание)](#public-url-view).

Поле приходит, только если публичная ссылка включена ||
|| **isTransformationError**
[`boolean`](../data-types.md) | Признак ошибки конвертации документа в PDF и изображение ||
|| **transformationErrorCode**
[`string`](../data-types.md) | Код ошибки конвертации. Поле приходит, только если `isTransformationError` = `true` ||
|| **transformationErrorMessage**
[`string`](../data-types.md) | Текст ошибки конвертации. Поле приходит, только если `isTransformationError` = `true` ||
|| **transformationCancelReason**
[`string`](../data-types.md) | Причина отмены конвертации. Поле приходит, только если конвертация была отменена ||
|| **pullTag**
[`string`](../data-types.md) | Тег для подписки на обновление статуса конвертации ||
|| **emailDiskFile**
[`integer`](../data-types.md) | Идентификатор файла на Диске для отправки по почте: PDF-файла, если он сформирован, иначе DOCX-файла. Если файл не хранится на Диске — `0` ||
|| **createTime**
[`datetime`](../data-types.md) | Время создания документа ||
|| **createdBy**
[`string`](../data-types.md) | Идентификатор автора документа. В ответе [documentgenerator.document.add](./document-generator-document-add.md) приходит числом.

В ответе [documentgenerator.document.update](./document-generator-document-update.md) приходит `null`, а `createTime` содержит время изменения. Актуальные значения возвращает [documentgenerator.document.get](./document-generator-document-get.md) ||
|| **updateTime**
[`datetime`](../data-types.md) | Время последнего изменения документа ||
|| **updatedBy**
[`string`](../data-types.md) | Идентификатор пользователя, который последним изменил документ. Если документ не изменяли — `null`. В ответе [documentgenerator.document.update](./document-generator-document-update.md) приходит числом ||
|#

#### Объект values {#document-values}

#|
|| **Название**
`тип` | **Описание** ||
|| **productsTableVariant**
[`string`](../data-types.md) | Вариант отображения таблицы товаров ||
|| **_creationMethod**
[`string`](../data-types.md) | Способ создания документа ||
|| **stampsEnabled**
[`boolean`](../data-types.md) | Признак включенных печатей и подписей ||
|| **<код_поля>**
[`string`](../data-types.md) | Значение поля из шаблона по его коду ||
|#

#### Объект publicUrlView {#public-url-view}

#|
|| **Название**
`тип` | **Описание** ||
|| **time**
[`datetime`](../data-types.md) | Время последнего просмотра публичной ссылки. Если ссылку еще не открывали — `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Документ не найден"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | `0` | Документ не найден | Документ с указанным `id` не найден ||
|| `400` | `0` | You do not have permissions to view documents | Нет права на просмотр документов. Метод сначала проверяет это право, затем право на изменение документа ||
|| `400` | `0` | You do not have permissions to modify this document | Есть право на просмотр документов, но нет права на изменение документа с указанным `id` ||
|| `400` | `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к документу с указанным `id` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-document-add.md)
- [{#T}](./document-generator-document-get.md)
- [{#T}](./document-generator-document-list.md)
- [{#T}](./document-generator-document-delete.md)
- [{#T}](./document-generator-document-enable-public-url.md)
- [{#T}](./document-generator-document-get-fields.md)
