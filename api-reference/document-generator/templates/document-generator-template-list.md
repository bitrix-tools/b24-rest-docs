# Получить список шаблонов documentgenerator.template.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

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

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
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
              },
              start: 0
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
          },
          start: 0
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
