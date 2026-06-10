# Получить список шаблонов documentgenerator.template.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.list` возвращает список шаблонов по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть. По умолчанию — `["*"]`.

Для `field_N` используйте поля из [таблицы полей](#list-fields).

Чтобы получить коды доступа и провайдеры, добавьте в `select` поля `users` и `providers` ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки шаблонов в формате `{"field_1":"value_1", ... "field_N":"value_N"}`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Для `field_N` используйте поля из [таблицы полей](#list-fields).
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации шаблонов в формате `{"field_1":"value_1", ... "field_N":"value_N"}`.

Для `field_N` используйте поля из [таблицы полей](#list-fields).

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра. Возможные значения префикса:
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

По умолчанию применяется фильтр `isDeleted = "N"` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

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
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен
||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время обновления ||
|| **numeratorId**
[`integer`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Использование печатей и подписей. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **users**
[`array`](../../data-types.md) | Коды доступа к шаблону. Только для `select` ||
|| **providers**
[`array`](../../data-types.md) | Провайдеры данных шаблона. Только для `select` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "select": [
        "*",
        "users",
        "providers"
      ],
      "order": {
        "id": "desc"
      },
      "filter": {
        "region": "ru",
        "active": "Y",
        ">=createTime": "2026-03-18T00:00:00+03:00"
      },
      "start": 0
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "select": [
        "*",
        "users",
        "providers"
      ],
      "order": {
        "id": "desc"
      },
      "filter": {
        "region": "ru",
        "active": "Y",
        ">=createTime": "2026-03-18T00:00:00+03:00"
      },
      "start": 0,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.list
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TemplateItem = {
      id: string
      active: string
      name: string
      code: string
      region: string
      sort: string
      createTime: ISODate | null
      updateTime: ISODate | null
      createdBy: string
      updatedBy: string
      moduleId: string
      fileId: string
      bodyType: string
      numeratorId: string
      withStamps: string
      productsTableVariant: string
      isDeleted: string
      isDefault: string
      download: string
      downloadMachine: string
      users?: string[]
      providers?: string[]
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateListResult = {
      templates: Record<string, TemplateItem>
    }

    try {
      // documentgenerator.template.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<TemplateListResult>({
        method: 'documentgenerator.template.list',
        params: {
          select: ['*', 'users', 'providers'],
          order: {
            id: 'desc',
          },
          filter: {
            region: 'ru',
            active: 'Y',
            '>=createTime': '2026-03-18T00:00:00+03:00',
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
        console.info('Templates count:', Object.keys(result.templates).length, result.templates)
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
      async function listTemplates() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // documentgenerator.template.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.template.list',
            params: {
              select: ['*', 'users', 'providers'],
              order: {
                id: 'desc',
              },
              filter: {
                region: 'ru',
                active: 'Y',
                '>=createTime': '2026-03-18T00:00:00+03:00',
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
          console.info('Templates count:', Object.keys(result.templates).length, result.templates)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplates)
    </script>
    ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.template.list',
          [
              'select' => ['*', 'users', 'providers'],
              'order' => [
                  'id' => 'desc'
              ],
              'filter' => [
                  'region' => 'ru',
                  'active' => 'Y',
                  '>=createTime' => '2026-03-18T00:00:00+03:00'
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
      'documentgenerator.template.list',
      {
          select: ['*', 'users', 'providers'],
          order: {
              id: 'desc'
          },
          filter: {
              region: 'ru',
              active: 'Y',
              '>=createTime': '2026-03-18T00:00:00+03:00'
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
      'documentgenerator.template.list',
      [
          'select' => ['*', 'users', 'providers'],
          'order' => [
              'id' => 'desc'
          ],
          'filter' => [
              'region' => 'ru',
              'active' => 'Y',
              '>=createTime' => '2026-03-18T00:00:00+03:00'
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
        "templates": {
            "57": {
                "id": "57",
                "active": "Y",
                "name": "SUPPLY_CONTRACT_NEW Template",
                "code": "REST_TEMPLATE",
                "region": "ru",
                "sort": "700",
                "createTime": "2026-03-23T16:51:25+03:00",
                "updateTime": "2026-03-23T17:26:39+03:00",
                "createdBy": "503",
                "updatedBy": "503",
                "moduleId": "rest",
                "fileId": "5641",
                "bodyType": "Bitrix\\DocumentGenerator\\Body\\Docx",
                "numeratorId": "3",
                "withStamps": "N",
                "productsTableVariant": "",
                "isDeleted": "N",
                "isDefault": "N",
                "download": "/bitrix/services/main/ajax.php?action=documentgenerator.api.template.download&SITE_ID=s1&id=57",
                "providers": [
                    "bitrix\\documentgenerator\\dataprovider\\rest"
                ],
                "users": [
                    "U503"
                ],
                "downloadMachine": "https://mysite.ru/rest/documentgenerator.api.template.download.json?auth=3f5cc2690000071b00000844000001f7f0f107506cefda4aa5b9d0dc80371e7f0f7e26&token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTU3Jl89RFB3MHZYN1A3RXdiMm5EenY2VFYyc1Vkb0hPejA3SlM%3D%7CImRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZHxkb2N1bWVudGdlbmVyYXRvcnxZV04wYVc5dVBXUnZZM1Z0Wlc1MFoyVnVaWEpoZEc5eUxtRndhUzUwWlcxd2JHRjBaUzVrYjNkdWJHOWhaQ1pUU1ZSRlgwbEVQWE14Sm1sa1BUVTNKbDg5UkZCM01IWllOMUEzUlhkaU1tNUVlblkyVkZZeWMxVmtiMGhQZWpBM1NsTT18M2Y1Y2MyNjkwMDAwMDcxYjAwMDAwODQ0MDAwMDAxZjdmMGYxMDc1MDZjZWZkYTRhYTViOWQwZGM4MDM3MWU3ZjBmN2UyNiI%3D.XuC83kQJE21vRoqv1%2FgdT8OiYq4JdpiSLxumy%2F1UcB0%3D"
            },
            "53": {
                "id": "53", // описание следующего шаблона
                ...
            },
            "51": {
                "id": "51", // описание следующего шаблона
                ...
            }
        }
    },
    "total": 3,
    "time": {
        "start": 1774341679,
        "finish": 1774341679.641056,
        "duration": 0.6410560607910156,
        "processing": 0,
        "date_start": "2026-03-24T11:41:19+03:00",
        "date_finish": "2026-03-24T11:41:19+03:00",
        "operating_reset_at": 1774342279,
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
|| **total**
[`integer`](../../data-types.md) | Общее количество шаблонов в списке ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **templates**
[`object`](../../data-types.md) | Объект шаблонов, где ключом выступает `id`, а значением — данные шаблона [(подробное описание)](#template) ||
|#

#### Элемент объекта templates {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен
||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время обновления ||
|| **createdBy**
[`string`](../../data-types.md) | Идентификатор пользователя, который создал шаблон ||
|| **updatedBy**
[`string`](../../data-types.md) | Идентификатор пользователя, который обновил шаблон ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **fileId**
[`string`](../../data-types.md) | Идентификатор файла шаблона ||
|| **bodyType**
[`string`](../../data-types.md) | Класс типа тела шаблона ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Использование печатей и подписей. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **productsTableVariant**
[`string`](../../data-types.md) | Вариант таблицы товаров ||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона. Возможные значения:
- `Y` — удален
- `N` — не удален
||
|| **isDefault**
[`char`](../../data-types.md) | Признак шаблона по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание шаблона ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка на скачивание шаблона для машинной обработки ||
|| **users**
[`array`](../../data-types.md) | Массив кодов доступа, если поле выбрано в `select` ||
|| **providers**
[`array`](../../data-types.md) | Массив провайдеров, если поле выбрано в `select` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to modify templates"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав для получения списка шаблонов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-add.md)
- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-delete.md)
- [{#T}](./document-generator-template-get-fields.md)
