# Получить документ по идентификатору documentgenerator.document.get

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр документов

Метод `documentgenerator.document.get` возвращает информацию о документе по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор документа.

Получить идентификатор документа можно после [создания документа](./document-generator-document-add.md) или методом [получения списка документов](./document-generator-document-list.md)  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.get
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.document.get
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.document.get',
          {
              id: 51
          }
      );

      const result = response.getData().result;
      console.log(result);
  }
  catch (error)
  {
      console.error(error);
  }
  ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.document.get',
          [
              'id' => 51,
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
      'documentgenerator.document.get',
      {
          id: 51
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
      'documentgenerator.document.get',
      [
          'id' => 51,
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
        "document": {
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068",
            "publicUrl": "https://mysite.ru/~bat5R",
            "title": "SUPPLY_CONTRACT Template 1773843147554 ДГ-2026-001",
            "number": "ДГ-2026-001",
            "id": "51",
            "createTime": "2026-03-18T17:27:48+03:00",
            "createdBy": "503",
            "updateTime": "2026-03-18T17:27:48+03:00",
            "updatedBy": null,
            "stampsEnabled": true,
            "isTransformationError": false,
            "value": "SUPPLY_CONTRACT_2026_015",
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true,
                "CurrentDate": "2026-03-18T00:00:00+03:00",
                "ClientName": "ООО Ромашка",
                "ClientPhone": "+7 999 123-45-67",
                "Total": "125000",
                "Comment": "Оплата в течение 5 рабочих дней после подписания",
                "UserName": "Иван Петров"
            },
            "publicUrlView": {
                "time": "2026-03-19T15:08:05+03:00"
            },
            "templateId": "53",
            "provider": "Bitrix\\DocumentGenerator\\DataProvider\\Rest",
            "pullTag": "TRANSFORMDOCUMENT51",
            "imageUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getimage&SITE_ID=s1&id=51&ts=1773844068",
            "pdfUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getpdf&SITE_ID=s1&id=51&ts=1773844068",
            "printUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.showpdf&SITE_ID=s1&id=51&print=y&ts=1773844068",
            "emailDiskFile": 5573,
            "downloadUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getfile.json?auth=1fe8bb690000071b00000844000001f7f0f107826a2f4f01a384d1dcdb624764d8ea63&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlJlNJVEVfSUQ9czEmaWQ9NTEmdHM9MTc3Mzg0NDA2OCZfPVptQjFqSzNTNlhtMm5EbUR6OFV6YlJydExGbGtaOGpF%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlfGRvY3VtZW50Z2VuZXJhdG9yfFlXTjBhVzl1UFdSdlkzVnRaVzUwWjJWdVpYSmhkRzl5TG1Gd2FTNWtiMk4xYldWdWRDNW5aWFJtYVd4bEpsTkpWRVZmU1VROWN6RW1hV1E5TlRFbWRITTlNVGMzTXpnME5EQTJPQ1pmUFZwdFFqRnFTek5UTmxodE1tNUViVVI2T0ZWNllsSnlkRXhHYkd0YU9HcEZ8MWZlOGJiNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDc4MjZhMmY0ZjAxYTM4NGQxZGNkYjYyNDc2NGQ4ZWE2MyI%3D.Cifk0KKcqbktmPy6ARfXPn7dO71%2FP4MY5xys1%2FGF%2FBc%3D",
            "imageUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getimage.json?auth=1fe8bb690000071b00000844000001f7f0f107826a2f4f01a384d1dcdb624764d8ea63&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRpbWFnZSZTSVRFX0lEPXMxJmlkPTUxJnRzPTE3NzM4NDQwNjgmXz1GOTV5aUg2SnN2UTlrZjRnQnNBN2Z6NXpxVjIxSzB1Zg%3D%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRpbWFnZXxkb2N1bWVudGdlbmVyYXRvcnxZV04wYVc5dVBXUnZZM1Z0Wlc1MFoyVnVaWEpoZEc5eUxtRndhUzVrYjJOMWJXVnVkQzVuWlhScGJXRm5aU1pUU1ZSRlgwbEVQWE14Sm1sa1BUVXhKblJ6UFRFM056TTRORFF3TmpnbVh6MUdPVFY1YVVnMlNuTjJVVGxyWmpSblFuTkJOMlo2TlhweFZqSXhTekIxWmc9PXwxZmU4YmI2OTAwMDAwNzFiMDAwMDA4NDQwMDAwMDFmN2YwZjEwNzgyNmEyZjRmMDFhMzg0ZDFkY2RiNjI0NzY0ZDhlYTYzIg%3D%3D.r2wwtKof5kdIyUr8xek%2B8XThT4RG48ZMcLABVjsa0Zk%3D",
            "pdfUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.getpdf.json?auth=1fe8bb690000071b00000844000001f7f0f107826a2f4f01a384d1dcdb624764d8ea63&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRwZGYmU0lURV9JRD1zMSZpZD01MSZ0cz0xNzczODQ0MDY4Jl89UnUxUGRvM2RWV0xXTEhXZDhhNW9VeThDTlVsWlJTd3M%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRwZGZ8ZG9jdW1lbnRnZW5lcmF0b3J8WVdOMGFXOXVQV1J2WTNWdFpXNTBaMlZ1WlhKaGRHOXlMbUZ3YVM1a2IyTjFiV1Z1ZEM1blpYUndaR1ltVTBsVVJWOUpSRDF6TVNacFpEMDFNU1owY3oweE56Y3pPRFEwTURZNEpsODlVblV4VUdSdk0yUldWMHhYVEVoWFpEaGhOVzlWZVRoRFRsVnNXbEpUZDNNPXwxZmU4YmI2OTAwMDAwNzFiMDAwMDA4NDQwMDAwMDFmN2YwZjEwNzgyNmEyZjRmMDFhMzg0ZDFkY2RiNjI0NzY0ZDhlYTYzIg%3D%3D.u%2Bkuio%2FsYEU93FKvdsODqjyEAZ7WpP0M9We%2BurZvjUk%3D",
            "printUrlMachine": "https://mysite.ru/rest/documentgenerator.api.document.showpdf.json?auth=1fe8bb690000071b00000844000001f7f0f107826a2f4f01a384d1dcdb624764d8ea63&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5zaG93cGRmJlNJVEVfSUQ9czEmaWQ9NTEmcHJpbnQ9eSZ0cz0xNzczODQ0MDY4Jl89cXFmSUhjODk1MTI4RXRWQXE3Nk5UNEdzN1dHWTlZdjU%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5zaG93cGRmfGRvY3VtZW50Z2VuZXJhdG9yfFlXTjBhVzl1UFdSdlkzVnRaVzUwWjJWdVpYSmhkRzl5TG1Gd2FTNWtiMk4xYldWdWRDNXphRzkzY0dSbUpsTkpWRVZmU1VROWN6RW1hV1E5TlRFbWNISnBiblE5ZVNaMGN6MHhOemN6T0RRME1EWTRKbDg5Y1hGbVNVaGpPRGsxTVRJNFJYUldRWEUzTms1VU5FZHpOMWRIV1RsWmRqVT18MWZlOGJiNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDc4MjZhMmY0ZjAxYTM4NGQxZGNkYjYyNDc2NGQ4ZWE2MyI%3D.s%2F4zPE4fPTMvZImi5pumUXn5s0oB5nwVbw3rFIM34eo%3D"
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
[`object`](../data-types.md) | Данные документа [(подробное описание)](#document) ||
|#

#### Объект document {#document}

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
|| **values**
[`object`](../data-types.md) | Значения полей документа [(подробное описание)](#document-values) ||
|| **fileId**
[`integer`](../data-types.md) | Идентификатор DOCX-файла документа ||
|| **imageId**
[`integer`](../data-types.md) | Идентификатор файла изображения документа ||
|| **pdfId**
[`integer`](../data-types.md) | Идентификатор PDF-файла документа ||
|| **stampsEnabled**
[`boolean`](../data-types.md) | Признак включенных печатей и подписей ||
|| **downloadUrl**
[`string`](../data-types.md) | Ссылка на скачивание DOCX ||
|| **downloadUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание DOCX для приложения ||
|| **pdfUrl**
[`string`](../data-types.md) | Ссылка на скачивание PDF, если PDF уже сформирован ||
|| **pdfUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание PDF для приложения ||
|| **printUrl**
[`string`](../data-types.md) | Ссылка на просмотр или печать PDF, если PDF уже сформирован ||
|| **printUrlMachine**
[`string`](../data-types.md) | Ссылка на просмотр или печать PDF для приложения ||
|| **imageUrl**
[`string`](../data-types.md) | Ссылка на скачивание изображения, если изображение уже сформировано ||
|| **imageUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание изображения для приложения ||
|| **publicUrl**
[`string`](../data-types.md) | Публичная ссылка на документ, если она включена ||
|| **isTransformationError**
[`boolean`](../data-types.md) | Признак ошибки конвертации документа ||
|| **transformationErrorCode**
[`string`](../data-types.md) | Код ошибки конвертации, если она произошла ||
|| **transformationErrorMessage**
[`string`](../data-types.md) | Текст ошибки конвертации, если она произошла ||
|| **transformationCancelReason**
[`string`](../data-types.md) | Причина отмены конвертации, если она была отменена ||
|| **pullTag**
[`string`](../data-types.md) | Тег для подписки на обновление статуса конвертации ||
|| **emailDiskFile**
[`integer`](../data-types.md) | Идентификатор файла на Диске для отправки по почте ||
|| **createTime**
[`datetime`](../data-types.md) | Время создания документа ||
|| **updateTime**
[`datetime`](../data-types.md) | Время последнего обновления документа ||
|| **createdBy**
[`string`](../data-types.md) | Идентификатор автора документа ||
|| **updatedBy**
[`integer`](../data-types.md) | Идентификатор пользователя, который обновил документ ||
|| **publicUrlView**
[`object`](../data-types.md) | Данные о просмотре публичной ссылки [(подробное описание)](#public-url-view) ||
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

#### Объект publicUrlView {#public-url-view}

#|
|| **Название**
`тип` | **Описание** ||
|| **time**
[`datetime`](../data-types.md) | Время последнего просмотра публичной ссылки ||
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
|| `400` | `100` | Bitrix\DocumentGenerator\Document constructor must be is public | Не передан обязательный параметр `id` ||
|| `400` | `0` | Документ не найден | Документ с указанным `id` не найден ||
|| `400` | `0` | You do not have permissions to view documents | Недостаточно прав на изменение документа ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-document-add.md)
- [{#T}](./document-generator-document-update.md)
- [{#T}](./document-generator-document-list.md)
- [{#T}](./document-generator-document-delete.md)
- [{#T}](./document-generator-document-enable-public-url.md)
- [{#T}](./document-generator-document-get-fields.md)
