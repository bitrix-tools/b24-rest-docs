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

{% note info "" %}

Метод возвращает только шаблоны модуля `rest`, то есть созданные методом [documentgenerator.template.add](./document-generator-template-add.md). Шаблоны других модулей, например CRM, в список не попадают

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть. Используйте поля из [таблицы полей](#list-fields).

По умолчанию — `["*"]`: возвращаются все поля шаблона, кроме `users` и `providers`. Чтобы получить коды доступа и провайдеры, добавьте в `select` поля `users` и `providers`, например `["*", "users", "providers"]`.

Поля `id`, `download` и `downloadMachine` возвращаются всегда, даже если их нет в `select` ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки шаблонов в формате `{"field_1":"value_1", ... "field_N":"value_N"}`. Можно передать несколько полей, сортировка применяется в порядке их перечисления.

Для `field_N` используйте поля из [таблицы полей](#list-fields), кроме `users` и `providers`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию сортировка не задана ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации шаблонов в формате `{"field_1":"value_1", ... "field_N":"value_N"}`.

Для `field_N` используйте поля из [таблицы полей](#list-fields), кроме `users` и `providers`. Значения полей `createTime` и `updateTime` передавайте в формате [`datetime`](../../data-types.md), например `2026-03-18T00:00:00+03:00`.

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

По умолчанию метод возвращает только шаблоны, которые не помечены удаленными, — применяется фильтр `isDeleted = "N"`. Чтобы получить шаблоны, помеченные удаленными, передайте `"isDeleted": "Y"`, а чтобы получить все шаблоны — `"@isDeleted": ["Y", "N"]`.

Фильтр по `moduleId` не учитывается: метод всегда отбирает шаблоны модуля `rest` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N — 1) * 50`, где `N` — номер нужной страницы.

Значение, которое не кратно 50, округляется вниз до кратного 50: например, `start` = `30` вернет первую страницу.

По умолчанию — `0` ||
|#

{% note warning "" %}

Если передать в `select`, `order` или `filter` поле, которого нет в [таблице полей](#list-fields), метод вернет ошибку `100` с текстом `Internal server error.`

{% endnote %}

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
[`string`](../../data-types.md) | Регион шаблона, например `ru`. Получить список регионов можно методом [documentgenerator.region.list](../region/document-generator-region-list.md) ||
|| **timezone**
[`string`](../../data-types.md) | Часовой пояс шаблона в формате IANA, например `Europe/Moscow` ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время обновления ||
|| **createdBy**
[`user`](../../data-types.md#standart-objects) | Идентификатор пользователя, который создал шаблон ||
|| **updatedBy**
[`user`](../../data-types.md#standart-objects) | Идентификатор пользователя, который обновил шаблон ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля шаблона. Для шаблонов из REST API всегда `rest` ||
|| **fileId**
[`integer`](../../data-types.md) | Идентификатор файла шаблона ||
|| **bodyType**
[`string`](../../data-types.md) | Класс типа тела шаблона, например `Bitrix\DocumentGenerator\Body\Docx` ||
|| **numeratorId**
[`integer`](../../data-types.md) | Идентификатор нумератора. Получить список нумераторов можно методом [documentgenerator.numerator.list](../numerators/document-generator-numerator-list.md) ||
|| **withStamps**
[`char`](../../data-types.md) | Использование печатей и подписей. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **productsTableVariant**
[`string`](../../data-types.md) | Вариант таблицы товаров. Возможные значения:
- пустая строка — товары и услуги
- `goods` — только товары
- `service` — только услуги
||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона. Возможные значения:
- `Y` — шаблон помечен удаленным
- `N` — шаблон не удален
||
|| **isDefault**
[`char`](../../data-types.md) | Признак шаблона по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **users**
[`array`](../../data-types.md) | Коды доступа к шаблону. Только для `select`. Возможные значения:
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
      timezone: string | null
      sort: string
      createTime: ISODate | null
      updateTime: ISODate | null
      createdBy: string
      updatedBy: string | null
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
    // When nothing matches the filter, templates is an empty array []
    type TemplateListResult = {
      templates: Record<string, TemplateItem> | []
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

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.documentgenerator.template.list(
          select=[
              "*",
              "users",
              "providers",
          ],
          order={
              "id": "desc",
          },
          filter={
              "region": "ru",
              "active": "Y",
              ">=createTime": "2026-03-18T00:00:00+03:00",
          },
          start=0,
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.template.list", b24.Params{
    	"select": []string{"*", "users", "providers"},
    	"order": b24.Params{
    		"id": "desc",
    	},
    	"filter": b24.Params{
    		"region":       "ru",
    		"active":       "Y",
    		">=createTime": "2026-03-18T00:00:00+03:00",
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("documentgenerator.template.list: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "templates": {
            "387": {
                "id": "387",
                "active": "Y",
                "name": "Supply contract",
                "code": "SUPPLY_CONTRACT",
                "region": "ru",
                "timezone": "Europe/Moscow",
                "sort": "700",
                "createTime": "2026-11-11T13:42:08+03:00",
                "updateTime": "2026-11-11T13:42:08+03:00",
                "createdBy": "1269",
                "updatedBy": null,
                "moduleId": "rest",
                "fileId": "6629",
                "bodyType": "Bitrix\\DocumentGenerator\\Body\\Docx",
                "numeratorId": "3",
                "withStamps": "N",
                "productsTableVariant": "",
                "isDeleted": "N",
                "isDefault": "N",
                "download": "/bitrix/services/main/ajax.php?action=documentgenerator.api.template.download&SITE_ID=s1&id=387",
                "providers": [
                    "bitrix\\documentgenerator\\dataprovider\\rest"
                ],
                "users": [
                    "U1269"
                ],
                "downloadMachine": "https://mysite.bitrix24.ru/rest/1269/webhook_code/documentgenerator.api.template.download/?token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTM4NyZfPXYyRWc2U0cyYXBrVHZTZXloazNMSnB2VVd4UEZpdnlJ%7C..."
            }
        }
    },
    "total": 1,
    "time": {
        "start": 1794393731,
        "finish": 1794393731.550351,
        "duration": 0.5503509044647217,
        "processing": 0,
        "date_start": "2026-11-11T13:42:11+03:00",
        "date_finish": "2026-11-11T13:42:11+03:00",
        "operating_reset_at": 1794394320,
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
|| **next**
[`integer`](../../data-types.md) | Значение `start` для получения следующей страницы. Возвращается, если после текущей страницы есть еще шаблоны ||
|| **total**
[`integer`](../../data-types.md) | Общее количество шаблонов, которые подходят под фильтр ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **templates**
[`object`](../../data-types.md) | Объект шаблонов, где ключом выступает `id`, а значением — данные шаблона [(подробное описание)](#template).

Если по фильтру ничего не найдено, возвращается пустой массив `[]` ||
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
|| **timezone**
[`string`](../../data-types.md) | Часовой пояс шаблона в формате IANA, например `Europe/Moscow`.

Значение `null` — у шаблона нет своего часового пояса: даты выводятся в общем часовом поясе из настроек шаблонов документов, а если он не выбран — в часовом поясе сервера ||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время обновления ||
|| **createdBy**
[`string`](../../data-types.md) | Идентификатор пользователя, который создал шаблон ||
|| **updatedBy**
[`string`](../../data-types.md) | Идентификатор пользователя, который обновил шаблон. Значение `null` — шаблон не обновляли после создания ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля, всегда `rest` ||
|| **fileId**
[`string`](../../data-types.md) | Идентификатор файла шаблона. У шаблона, помеченного удаленным, значение `0` ||
|| **bodyType**
[`string`](../../data-types.md) | Класс типа тела шаблона, например `Bitrix\DocumentGenerator\Body\Docx` ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Использование печатей и подписей. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **productsTableVariant**
[`string`](../../data-types.md) | Вариант таблицы товаров. Возможные значения:
- пустая строка — товары и услуги
- `goods` — только товары
- `service` — только услуги
||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона. Возможные значения:
- `Y` — шаблон помечен удаленным, потому что по нему есть документы
- `N` — шаблон не удален
||
|| **isDefault**
[`char`](../../data-types.md) | Признак шаблона по умолчанию. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **download**
[`string`](../../data-types.md) | Относительная ссылка на скачивание файла шаблона в браузере. Возвращается всегда ||
|| **downloadMachine**
[`string`](../../data-types.md) | Абсолютная ссылка на скачивание файла шаблона через REST API с токеном доступа. Возвращается всегда ||
|| **users**
[`array`](../../data-types.md) | Массив кодов доступа, например `["U1269"]`. Возвращается, если поле выбрано в `select` ||
|| **providers**
[`array`](../../data-types.md) | Массив провайдеров данных в нижнем регистре, например `["bitrix\\documentgenerator\\dataprovider\\rest"]`. Возвращается, если поле выбрано в `select` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Internal server error."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Internal server error. | В `select`, `order` или `filter` передано поле, которого нет в [таблице полей](#list-fields) ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав для работы с шаблонами генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-add.md)
- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-delete.md)
- [{#T}](./document-generator-template-get-fields.md)
