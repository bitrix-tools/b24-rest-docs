# Загрузить шаблон documentgenerator.template.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.add` добавляет новый шаблон документа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Набор полей шаблона [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название шаблона ||
|| **fileId***
[`integer`](../../data-types.md) | Идентификатор ранее загруженного файла шаблона с Диска.

Получить идентификатор файла можно двумя способами.

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren](../../disk/folder/disk-folder-get-children.md)

||
|| **file***
[`file`](../../data-types.md#file) | Файл шаблона, если его нужно загрузить. Используется вместо параметра `fileId`.

Файл можно передать тремя способами:
- строкой base64
- массивом `["имя_файла.docx","base64_контент"]`
- как файл `multipart/form-data`

{% note tip "Частые кейсы и сценарии" %}

- [Как загрузить файлы](../../files/how-to-upload-files.md)

{% endnote %}

||
|| **numeratorId***
[`integer`](../../data-types.md) | Идентификатор нумератора.

Получить идентификатор можно после [создания нумератора](../numerators/document-generator-numerator-add.md) или методом [получения списка нумераторов](../numerators/document-generator-numerator-list.md)
||
|| **region***
[`string`](../../data-types.md) | Регион шаблона, например, `ru` ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **users**
[`array`](../../data-types.md) | Пользователи, у которых будет доступ к шаблону.

Возможные значения:

- `U{id}` — пользователь
- `G{id}` — группа пользователей
- `AU` — все авторизованные пользователи
- `UA` — все пользователи
- `D{id}` — отдел
- `DR{id}` — отдел с подотделами
- `SG{id}` — рабочая группа или проект
- `SG{id}_A` — владелец рабочей группы или проекта
- `SG{id}_E` — модераторы рабочей группы или проекта
- `SG{id}_K` — все члены рабочей группы или проекта

Если не передан, автоматически добавляется текущий пользователь ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен

По умолчанию `Y` ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печати и подписи. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"SUPPLY_CONTRACT Template","fileId":5641,"numeratorId":1,"region":"ru","code":"REST_TEMPLATE","users":["UA"],"active":"Y","withStamps":"N","sort":500}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"SUPPLY_CONTRACT Template","fileId":5641,"numeratorId":1,"region":"ru","code":"REST_TEMPLATE","users":["UA"],"active":"Y","withStamps":"N","sort":500},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.add
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.template.add',
          {
              fields: {
                  name: 'SUPPLY_CONTRACT Template',
                  fileId: 5641,
                  numeratorId: 1,
                  region: 'ru',
                  code: 'REST_TEMPLATE',
                  users: ['UA'],
                  active: 'Y',
                  withStamps: 'N',
                  sort: 500
              }
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
          'documentgenerator.template.add',
          [
              'fields' => [
                  'name' => 'SUPPLY_CONTRACT Template',
                  'fileId' => 5641,
                  'numeratorId' => 1,
                  'region' => 'ru',
                  'code' => 'REST_TEMPLATE',
                  'users' => ['UA'],
                  'active' => 'Y',
                  'withStamps' => 'N',
                  'sort' => 500,
              ],
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
      'documentgenerator.template.add',
      {
          fields: {
              name: 'SUPPLY_CONTRACT Template',
              fileId: 5641,
              numeratorId: 1,
              region: 'ru',
              code: 'REST_TEMPLATE',
              users: ['UA'],
              active: 'Y',
              withStamps: 'N',
              sort: 500
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
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'documentgenerator.template.add',
      [
          'fields' => [
              'name' => 'SUPPLY_CONTRACT Template',
              'fileId' => 5641,
              'numeratorId' => 1,
              'region' => 'ru',
              'code' => 'REST_TEMPLATE',
              'users' => ['UA'],
              'active' => 'Y',
              'withStamps' => 'N',
              'sort' => 500,
          ],
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
        "template": {
            "id": "57",
            "name": "SUPPLY_CONTRACT Template",
            "region": "ru",
            "code": "REST_TEMPLATE",
            "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.template.download&SITE_ID=s1&id=57&ts=0",
            "active": "Y",
            "moduleId": "rest",
            "numeratorId": "1",
            "withStamps": "N",
            "providers": {
                "bitrix\\documentgenerator\\dataprovider\\rest": "bitrix\\documentgenerator\\dataprovider\\rest"
            },
            "users": {
                "UA": "UA"
            },
            "isDeleted": "N",
            "sort": "500",
            "createTime": "2026-03-23T16:51:25+03:00",
            "updateTime": "2026-03-23T16:51:25+03:00",
            "downloadMachine": "https://mysite.ru/rest/documentgenerator.api.template.download.json?auth=6d53c1690000071b00000844000001f7f0f1075612a492ef6fe0b4127e521b543e4376&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTU3JnRzPTAmXz1IeG56TmtsQklGNjRsQlBkNkNiekNwd1U2bnduQk40Mw%3D%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZHxkb2N1bWVudGdlbmVyYXRvcnxZV04wYVc5dVBXUnZZM1Z0Wlc1MFoyVnVaWEpoZEc5eUxtRndhUzUwWlcxd2JHRjBaUzVrYjNkdWJHOWhaQ1pUU1ZSRlgwbEVQWE14Sm1sa1BUVTNKblJ6UFRBbVh6MUllRzU2VG10c1FrbEdOalJzUWxCa05rTmlla053ZDFVMmJuZHVRazQwTXc9PXw2ZDUzYzE2OTAwMDAwNzFiMDAwMDA4NDQwMDAwMDFmN2YwZjEwNzU2MTJhNDkyZWY2ZmUwYjQxMjdlNTIxYjU0M2U0Mzc2Ig%3D%3D.vtTu%2B9Ac%2BT5VgeyDm1jiVBGsmCQagvrqjACd%2BNgDigA%3D"
        }
    },
    "time": {
        "start": 1774273885,
        "finish": 1774273885.843453,
        "duration": 0.8434529304504395,
        "processing": 0,
        "date_start": "2026-03-23T16:51:25+03:00",
        "date_finish": "2026-03-23T16:51:25+03:00",
        "operating_reset_at": 1774274485,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **template**
[`object`](../../data-types.md) | Данные шаблона [(подробное описание)](#template) ||
|#

#### Объект template {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание шаблона ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка на скачивание шаблона для машинной обработки ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен
||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Использование печатей и подписей. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **providers**
[`object`](../../data-types.md) | Провайдеры данных шаблона. 

Ключ и значение равны имени класса провайдера данных ||
|| **users**
[`object`](../../data-types.md) | Коды доступа к шаблону. 

Ключ и значение равны коду доступа ||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона. Возможные значения:
- `Y` — удален
- `N` — не удален
||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время обновления ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Empty required fields: numeratorId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `100` | Invalid value to match with parameter {fields}. Should be value of type array | Параметр `fields` передан не как объект ||
|| `400` | `0` | Empty required fields: name, numeratorId, region | Не переданы обязательные поля для создания шаблона: `name`, `numeratorId`, `region`. В ошибке перечислены те поля, которых не хватает в запросе ||
|| `400` | `0` | Missing file content | Не передан файл шаблона ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-list.md)
- [{#T}](./document-generator-template-delete.md)
- [{#T}](./document-generator-template-get-fields.md)
