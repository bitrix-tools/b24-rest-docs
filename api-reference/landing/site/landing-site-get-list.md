# Получить список сайтов landing.site.getList

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайтов

Метод `landing.site.getList` получает список сайтов по параметрам выборки.

{% note warning %}

По умолчанию в выборку попадают только сайты с `DELETED = "N"`. Чтобы получить удаленные сайты, передайте в фильтре `DELETED` или `=DELETED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода. 

Для `GROUP`, `KNOWLEDGE` и `MAINPAGE` передают соответствующий `scope` [(подробное описание)](#type-scope) ||
|| **params**
[`object`](../../data-types.md) | Параметры выборки сайтов [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей для выборки из [базовых полей сайта](./base-fields.md). Если параметр не передан или передан не массив, используется `["*"]`. Метод всегда добавляет в выборку `ID` и `TYPE` ||
|| **filter**
[`object`](../../data-types.md) | Фильтр по полям из [базовых полей сайта](./base-fields.md). Если параметр не передан или передан не массив, используется пустой фильтр `{}`. 

Если в параметре `TYPE` или `=TYPE` указано значение `STORE`, публичный метод преобразует его в `["STORE", "SMN"]`. 

Точная фильтрация по типу работает только для одного значения, которое разрешено в текущем внутреннем `scope`. Если передан массив или значение, недоступное в текущем scope, метод подставит список разрешенных типов ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"FIELD": "ASC DESC"}`. Если параметр не передан, специальная сортировка не применяется ||
|| **group**
[`array`](../../data-types.md) | Группировка в формате ORM. Если передан не массив, параметр приводится к пустому массиву. При фильтрации по правам доступа в группировку добавляется `ID` ||
|| **limit**
[`integer`](../../data-types.md) | Ограничение количества строк выборки на уровне ORM. По умолчанию не задано ||
|| **offset**
[`integer`](../../data-types.md) | Смещение выборки на уровне ORM. Если параметр не передан, применяется поведение ORM по умолчанию ||
|#

### Соответствие TYPE и scope {#type-scope}

Типы сайтов и правила выбора параметра `scope` описаны в статье [Работа с типами сайтов и скоупами](../types.md). 
Таблица ниже применима к `params.filter.TYPE` и `params.filter.=TYPE`

#|
|| **params.filter.TYPE** | **scope в запросе** | **Когда использовать** ||
|| `PAGE`, `STORE`, `SMN` | не передавать | Выборка сайтов и магазинов в стандартном `scope` ||
|| `GROUP` | `GROUP` | Выборка сайтов групп ||
|| `KNOWLEDGE` | `KNOWLEDGE` | Выборка баз знаний ||
|| `MAINPAGE` | `MAINPAGE` | Выборка главной страницы или вайба ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": [
            "ID",
            "TITLE",
            "TYPE"
          ],
          "filter": {
            "=DELETED": "N"
          },
          "order": {
            "ID": "DESC"
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "params": {
          "select": [
            "ID",
            "TITLE",
            "TYPE"
          ],
          "filter": {
            "=DELETED": "N"
          },
          "order": {
            "ID": "DESC"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getList.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each site item returned in result[]
    type SiteItem = {
      ID: string
      TITLE: string
      TYPE: string
    }

    try {
      // landing.site.getList returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SiteItem[]>({
        method: 'landing.site.getList',
        params: {
          params: {
            select: [
              'ID',
              'TITLE',
              'TYPE',
            ],
            filter: {
              '=DELETED': 'N',
            },
            order: {
              ID: 'DESC',
            },
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
        console.info('Sites fetched:', result.length, result)
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
      async function getSiteList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // landing.site.getList returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.getList',
            params: {
              params: {
                select: [
                  'ID',
                  'TITLE',
                  'TYPE',
                ],
                filter: {
                  '=DELETED': 'N',
                },
                order: {
                  ID: 'DESC',
                },
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
          console.info('Sites fetched:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSiteList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.getList',
                [
                    'params' => [
                        'select' => [
                            'ID',
                            'TITLE',
                            'TYPE',
                        ],
                        'filter' => [
                            '=DELETED' => 'N',
                        ],
                        'order' => [
                            'ID' => 'DESC',
                        ],
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting site list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getList',
        {
            params: {
                select: [
                    'ID',
                    'TITLE',
                    'TYPE'
                ],
                filter: {
                    '=DELETED': 'N'
                },
                order: {
                    ID: 'DESC'
                }
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
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.getList',
        [
            'params' => [
                'select' => [
                    'ID',
                    'TITLE',
                    'TYPE',
                ],
                'filter' => [
                    '=DELETED' => 'N',
                ],
                'order' => [
                    'ID' => 'DESC',
                ],
            ]
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "157",
            "TITLE": "Вилла Ранду",
            "TYPE": "PAGE"
        },
        {
            "ID": "147",
            "TITLE": "Test Test yesss",
            "TYPE": "STORE"
        },
        {
            "ID": "3",
            "TITLE": "Музей вилок",
            "TYPE": "PAGE"
        }
    ],
    "time": {
        "start": 1773269838,
        "finish": 1773269838.647153,
        "duration": 0.6471529006958008,
        "processing": 0,
        "date_start": "2026-03-12T01:57:18+03:00",
        "date_finish": "2026-03-12T01:57:18+03:00",
        "operating_reset_at": 1773270438,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Список сайтов [(подробное описание)](#site). Метод может вернуть `result: []` без ошибки, если по фильтру нет подходящих сайтов или у пользователя нет права «просмотр» для этих сайтов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект site {#site}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор сайта. Поле всегда присутствует в ответе ||
|| **TYPE**
[`string`](../../data-types.md) | Тип сайта. Поле всегда присутствует в ответе ||
|| **DOMAIN_NAME**
[`string`](../../data-types.md) | Домен сайта, возвращается при выборе поля `DOMAIN_NAME` ||
|| **PUBLIC_URL**
[`string`](../../data-types.md) | Публичный URL сайта, возвращается при выборе поля `PUBLIC_URL`. 

Может быть пустой строкой, если URL не удалось определить ||
|| **PREVIEW_PICTURE**
[`string`](../../data-types.md) | URL превью главной страницы сайта, возвращается при выборе поля `PREVIEW_PICTURE`. Может быть пустой строкой, если превью недоступно ||
|| **PHONE**
[`string`](../../data-types.md) \| `null` | Телефон компании из CRM, возвращается при выборе поля `PHONE` ||
|| **DATE_CREATE**
[`string`](../../data-types.md) | Дата создания в строковом формате, возвращается при выборе поля `DATE_CREATE` ||
|| **DATE_MODIFY**
[`string`](../../data-types.md) | Дата изменения в строковом формате, возвращается при выборе поля `DATE_MODIFY` ||
|| **LANDING_ID_INDEX**
[`string`](../../data-types.md) \| `null` | Может присутствовать, если в `select` запрошено `PREVIEW_PICTURE` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова методов landing ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-delete.md)
- [{#T}](./landing-site-get-public-url.md)
- [{#T}](./landing-site-get-folders.md)
