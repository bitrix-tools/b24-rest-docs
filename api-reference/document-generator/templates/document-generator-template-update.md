# Изменить шаблон documentgenerator.template.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.update` обновляет существующий шаблон.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона.

Получить идентификатор шаблона можно после [создания шаблона](./document-generator-template-add.md) или методом [получения списка шаблонов](./document-generator-template-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля шаблона для обновления [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **file**
[`file`](../../data-types.md#file) | Новый файл шаблона. Можно передать тремя способами:
- строкой base64
- массивом `["имя_файла.docx","base64_контент"]`
- как файл `multipart/form-data`

{% note tip "Частые кейсы и сценарии" %}

- [Как загрузить файлы](../../files/how-to-upload-files.md)

{% endnote %}
||
|| **numeratorId**
[`integer`](../../data-types.md) | Идентификатор нумератора ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона, например `ru` ||
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
||
|| **providers**
[`array`](../../data-types.md) | Список провайдеров данных ||
|| **active**
[`char`](../../data-types.md) | Активность. Возможные значения:
- `Y` — активен
- `N` — не активен
||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печати и подписи. Возможные значения:
- `Y` — да
- `N` — нет
||
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
    -d '{"id":57,"fields":{"name":"SUPPLY_CONTRACT_NEW Template","numeratorId":3,"code":"REST_TEMPLATE","users":["U503"],"sort":700}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.update
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":57,"fields":{"name":"SUPPLY_CONTRACT_NEW Template","numeratorId":3,"code":"REST_TEMPLATE","users":["U503"],"sort":700},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.update
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.template.update',
          {
              id: 57,
              fields: {
                  name: 'SUPPLY_CONTRACT_NEW Template',
                  numeratorId: 3,
                  code: 'REST_TEMPLATE',
                  users: ['U503'],
                  sort: 700
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
          'documentgenerator.template.update',
          [
              'id' => 57,
              'fields' => [
                  'name' => 'SUPPLY_CONTRACT_NEW Template',
                  'numeratorId' => 3,
                  'code' => 'REST_TEMPLATE',
                  'users' => ['U503'],
                  'sort' => 700,
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
      'documentgenerator.template.update',
      {
          id: 57,
          fields: {
              name: 'SUPPLY_CONTRACT_NEW Template',
              numeratorId: 3,
              code: 'REST_TEMPLATE',
              users: ['U503'],
              sort: 700
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
      'documentgenerator.template.update',
      [
          'id' => 57,
          'fields' => [
              'name' => 'SUPPLY_CONTRACT_NEW Template',
              'numeratorId' => 3,
              'code' => 'REST_TEMPLATE',
              'users' => ['U503'],
              'sort' => 700,
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
            "name": "SUPPLY_CONTRACT_NEW Template",
            "region": "ru",
            "code": "REST_TEMPLATE",
            "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.template.download&SITE_ID=s1&id=57&ts=0",
            "active": "Y",
            "moduleId": "rest",
            "numeratorId": "3",
            "withStamps": "N",
            "providers": {
                "bitrix\\documentgenerator\\dataprovider\\rest": "bitrix\\documentgenerator\\dataprovider\\rest"
            },
            "users": {
                "U503": "U503"
            },
            "isDeleted": "N",
            "sort": "700",
            "createTime": "2026-03-23T16:51:25+03:00",
            "updateTime": "2026-03-23T17:26:39+03:00",
            "downloadMachine": "https://mysite.ru/rest/documentgenerator.api.template.download.json?auth=6d53c1690000071b00000844000001f7f0f1075612a492ef6fe0b4127e521b543e4376&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTU3JnRzPTAmXz1UdDBpNDBOU2hvQkxtN1Y5VmhEZm1MbTU2ZmQ0d3puNA%3D%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZHxkb2N1bWVudGdlbmVyYXRvcnxZV04wYVc5dVBXUnZZM1Z0Wlc1MFoyVnVaWEpoZEc5eUxtRndhUzUwWlcxd2JHRjBaUzVrYjNkdWJHOWhaQ1pUU1ZSRlgwbEVQWE14Sm1sa1BUVTNKblJ6UFRBbVh6MVVkREJwTkRCT1UyaHZRa3h0TjFZNVZtaEVabTFNYlRVMlptUTBkM3B1TkE9PXw2ZDUzYzE2OTAwMDAwNzFiMDAwMDA4NDQwMDAwMDFmN2YwZjEwNzU2MTJhNDkyZWY2ZmUwYjQxMjdlNTIxYjU0M2U0Mzc2Ig%3D%3D.6kAmDGdiQCSZI%2Bcm%2Fg86RUqVH5dMvSDxHbx20yjOYK4%3D"
        }
    },
    "time": {
        "start": 1774275999,
        "finish": 1774275999.631086,
        "duration": 0.6310861110687256,
        "processing": 0,
        "date_start": "2026-03-23T17:26:39+03:00",
        "date_finish": "2026-03-23T17:26:39+03:00",
        "operating_reset_at": 1774276599,
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
    "error_description": "Шаблон не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\DocumentGenerator\Template constructor must be is public | Не передан обязательный параметр `id` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `0` | Шаблон не найден | Шаблон с указанным `id` не найден ||
|| `400` | `0` | You do not have permissions to modify this template | Недостаточно прав на изменение указанного шаблона ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-add.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-list.md)
- [{#T}](./document-generator-template-delete.md)
- [{#T}](./document-generator-template-get-fields.md)
