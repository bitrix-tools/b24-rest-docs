# Создать новый документ на основании шаблона documentgenerator.document.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на создание документов

Метод `documentgenerator.document.add` создает новый документ на основании шаблона.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../data-types.md) | Идентификатор шаблона.

Получить идентификатор шаблона можно после [создания шаблона](./templates/document-generator-template-add.md) или методом [получения списка шаблонов](./templates/document-generator-template-list.md) ||
|| **providerClassName**
[`string`](../data-types.md) | Класс провайдера данных.

По умолчанию имеет значение `Bitrix\DocumentGenerator\DataProvider\Rest` ||
|| **value***
[`string`](../data-types.md) | Внешний идентификатор объекта, для которого формируется документ.

Формат `value` задается интеграцией. Используйте единый формат в рамках вашего приложения, чтобы искать и фильтровать документы.

Рекомендуемый формат: `<ТИП_ОБЪЕКТА>_<ID>`, где:
- `<ТИП_ОБЪЕКТА>` — строковый код типа объекта в верхнем регистре
- `<ID>` — числовой или строковый идентификатор объекта во внешней системе

Примеры значений `value` для CRM-объектов:
- лид — `LEAD_123`
- контакт — `CONTACT_45`
- компания — `COMPANY_78`
- сделка — `DEAL_901`
- коммерческое предложение — `QUOTE_55`
- счет — `INVOICE_12`

Примеры значений `value` для другие объектов:
- заказ — `ORDER_1024`
- договор поставки — `SUPPLY_CONTRACT_2026_015`
- запись внешней системы — `ERP_DOC_A-7741`

||
|| **values**
[`object`](../data-types.md) | Значения полей документа вида `{"КодПоля":"Значение"}` ||
|| **stampsEnabled**
[`integer`](../data-types.md) | Режим печатей и подписей:
- `1` — включить
- `0` — выключить

По умолчанию берется значение из шаблона ||
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
    -d '{"templateId":53,"value":"SUPPLY_CONTRACT_2026_015","values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"2026-03-18T00:00:00+03:00","ClientName":"ООО Ромашка","ClientPhone":"+7 999 123-45-67","Total":"125000","Comment":"Оплата в течение 5 рабочих дней после подписания","UserName":"Иван Петров"},"fields":{"CurrentDate":{"TYPE":"DATE","FORMAT":{"format":"d.m.Y"},"TITLE":"Дата договора"}},"stampsEnabled":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":53,"value":"SUPPLY_CONTRACT_2026_015","values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"2026-03-18T00:00:00+03:00","ClientName":"ООО Ромашка","ClientPhone":"+7 999 123-45-67","Total":"125000","Comment":"Оплата в течение 5 рабочих дней после подписания","UserName":"Иван Петров"},"fields":{"CurrentDate":{"TYPE":"DATE","FORMAT":{"format":"d.m.Y"},"TITLE":"Дата договора"}},"stampsEnabled":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.document.add
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.document.add',
          {
              templateId: 53,
              value: 'SUPPLY_CONTRACT_2026_015',
              values: {
                  DocumentNumber: 'ДГ-2026-001',
                  CurrentDate: '2026-03-18T00:00:00+03:00',
                  ClientName: 'ООО Ромашка',
                  ClientPhone: '+7 999 123-45-67',
                  Total: '125000',
                  Comment: 'Оплата в течение 5 рабочих дней после подписания',
                  UserName: 'Иван Петров'
              },
              fields: {
                  CurrentDate: {
                      TYPE: 'DATE',
                      FORMAT: {
                          format: 'd.m.Y'
                      },
                      TITLE: 'Дата договора'
                  }
              },
              stampsEnabled: 1
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
          'documentgenerator.document.add',
          [
              'templateId' => 53,
              'value' => 'SUPPLY_CONTRACT_2026_015',
              'values' => [
                  'DocumentNumber' => 'ДГ-2026-001',
                  'CurrentDate' => '2026-03-18T00:00:00+03:00',
                  'ClientName' => 'ООО Ромашка',
                  'ClientPhone' => '+7 999 123-45-67',
                  'Total' => '125000',
                  'Comment' => 'Оплата в течение 5 рабочих дней после подписания',
                  'UserName' => 'Иван Петров',
              ],
              'fields' => [
                  'CurrentDate' => [
                      'TYPE' => 'DATE',
                      'FORMAT' => [
                          'format' => 'd.m.Y',
                      ],
                      'TITLE' => 'Дата договора',
                  ]
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
      'documentgenerator.document.add',
      {
          templateId: 53,
          value: 'SUPPLY_CONTRACT_2026_015',
          values: {
              DocumentNumber: 'ДГ-2026-001',
              CurrentDate: '2026-03-18T00:00:00+03:00',
              ClientName: 'ООО Ромашка',
              ClientPhone: '+7 999 123-45-67',
              Total: '125000',
              Comment: 'Оплата в течение 5 рабочих дней после подписания',
              UserName: 'Иван Петров'
          },
          fields: {
              CurrentDate: {
                  TYPE: 'DATE',
                  FORMAT: {
                      format: 'd.m.Y'
                  },
                  TITLE: 'Дата договора'
              }
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
      'documentgenerator.document.add',
      [
          'templateId' => 53,
          'value' => 'SUPPLY_CONTRACT_2026_015',
          'values' => [
              'DocumentNumber' => 'ДГ-2026-001',
              'CurrentDate' => '2026-03-18T00:00:00+03:00',
              'ClientName' => 'ООО Ромашка',
              'ClientPhone' => '+7 999 123-45-67',
              'Total' => '125000',
              'Comment' => 'Оплата в течение 5 рабочих дней после подписания',
              'UserName' => 'Иван Петров',
          ],
          'fields' => [
              'CurrentDate' => [
                  'TYPE' => 'DATE',
                  'FORMAT' => [
                      'format' => 'd.m.Y',
                  ],
                  'TITLE' => 'Дата договора',
              ]
          ],
          'stampsEnabled' => 1,
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
            "publicUrl": null,
            "title": "SUPPLY_CONTRACT Template 1773843147554 ДГ-2026-001",
            "number": "ДГ-2026-001",
            "id": 51,
            "createTime": "2026-03-18T17:27:48+03:00",
            "createdBy": 503,
            "updateTime": "2026-03-18T17:27:48+03:00",
            "updatedBy": null,
            "stampsEnabled": true,
            "isTransformationError": false,
            "value": "SUPPLY_CONTRACT_2026_015",
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true,
                "DocumentNumber": "ДГ-2026-001",
                "CurrentDate": "2026-03-18T00:00:00+03:00",
                "ClientName": "ООО Ромашка",
                "ClientPhone": "+7 999 123-45-67",
                "Total": "125000",
                "Comment": "Оплата в течение 5 рабочих дней после подписания",
                "UserName": "Иван Петров"
            },
            "templateId": "53",
            "provider": "Bitrix\\DocumentGenerator\\DataProvider\\Rest",
            "pullTag": "TRANSFORMDOCUMENT51",
            "emailDiskFile": 5569,
            "downloadUrlMachine": "https://**put_your_bitrix24_address**/rest/documentgenerator.api.document.getfile.json?auth=a0bfba690000071b00000844000001f7f0f1075f240da39bb5ea0e42c08c5fa182f3ed&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlJlNJVEVfSUQ9czEmaWQ9NTEmdHM9MTc3Mzg0NDA2OCZfPXZMVUFDSGMwQkY1QVpRbGQzTlNhV2ZIemNzMW5IZ1lM%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS5kb2N1bWVudC5nZXRmaWxlfGRvY3VtZW50Z2VuZXJhdG9yfFlXTjBhVzl1UFdSdlkzVnRaVzUwWjJWdVpYSmhkRzl5TG1Gd2FTNWtiMk4xYldWdWRDNW5aWFJtYVd4bEpsTkpWRVZmU1VROWN6RW1hV1E5TlRFbWRITTlNVGMzTXpnME5EQTJPQ1pmUFhaTVZVRkRTR013UWtZMVFWcFJiR1F6VGxOaFYyWkllbU56TVc1SVoxbE18YTBiZmJhNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDc1ZjI0MGRhMzliYjVlYTBlNDJjMDhjNWZhMTgyZjNlZCI%3D.6lsKyiThwQT0n4UyMQfXdyS%2BnBVTG08%2FpGguggYNGLE%3D"
        }
    },
    "time": {
        "start": 1773844068,
        "finish": 1773844068.572038,
        "duration": 0.572037935256958,
        "processing": 0,
        "date_start": "2026-03-18T17:27:48+03:00",
        "date_finish": "2026-03-18T17:27:48+03:00",
        "operating_reset_at": 1773844668,
        "operating": 0.9536302089691162
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
[`object`](../data-types.md) | Данные созданного документа [(подробное описание)](#document) ||
|#

#### Объект document {#document}

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
[`string`](../data-types.md) | Класс провайдера данных ||
|| **value**
[`string`](../data-types.md) | Внешний идентификатор объекта ||
|| **values**
[`object`](../data-types.md) | Значения полей документа [(подробное описание)](#document-values) ||
|| **stampsEnabled**
[`boolean`](../data-types.md) | Признак включенных печатей и подписей ||
|| **downloadUrl**
[`string`](../data-types.md) | Ссылка на скачивание DOCX для пользователя ||
|| **downloadUrlMachine**
[`string`](../data-types.md) | Ссылка на скачивание DOCX для приложения ||
|| **publicUrl**
[`string`](../data-types.md) | Публичная ссылка на документ, если она включена ||
|| **isTransformationError**
[`boolean`](../data-types.md) | Признак ошибки конвертации документа ||
|| **pullTag**
[`string`](../data-types.md) | Тег для подписки на обновление статуса конвертации ||
|| **emailDiskFile**
[`integer`](../data-types.md) | Идентификатор файла на Диске для отправки по почте ||
|| **createTime**
[`datetime`](../data-types.md) | Время создания документа ||
|| **updateTime**
[`datetime`](../data-types.md) | Время последнего обновления документа ||
|| **createdBy**
[`integer`](../data-types.md) | Идентификатор автора документа ||
|| **updatedBy**
[`integer`](../data-types.md) | Идентификатор пользователя, который обновил документ ||
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

{% note info "" %}

Конвертация файла в PDF выполняется асинхронно. Если поле `pdfUrl` не заполнено сразу после создания, повторно вызовите [documentgenerator.document.get](./document-generator-document-get.md), чтобы проверить результат конвертации.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "0",
    "error_description": "Cannot create document on deleted template"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\DocumentGenerator\Template constructor must be is public | Не передан обязательный параметр `templateId` ||
|| `400` | `0` | Empty required parameter "value" | Не передан обязательный параметр `value` ||
|| `400` | `0` | Cannot create document on deleted template | Нельзя создать документ по удаленному шаблону ||
|| `400` | `0` | Шаблон не найден | Шаблона с указанным `templateId` не существует ||
|| `400` | `0` | Cannot create document | Не удалось создать документ ||
|| `400` | `0` | You do not have permissions to view documents | Недостаточно прав для просмотра документов ||
|| `400` | `0` | Maximum count of documents has been reached | Достигнут лимит документов на тарифе ||
|| `403` | `DOCGEN_ACCESS_ERROR` | Access denied | Недостаточно прав на создание документа ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-document-update.md)
- [{#T}](./document-generator-document-get.md)
- [{#T}](./document-generator-document-list.md)
- [{#T}](./document-generator-document-delete.md)
- [{#T}](./document-generator-document-enable-public-url.md)
- [{#T}](./document-generator-document-get-fields.md)
