# Получить список страниц landing.landing.getList

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.landing.getList` получает список страниц по параметрам выборки.

{% note warning %}

По умолчанию метод возвращает только страницы на неудаленных сайтах с `DELETED = "N"`. Чтобы получить удаленные страницы, передайте в фильтре `DELETED` или `=DELETED`. Это работает только для страниц на неудаленных сайтах: страницы удаленных сайтов метод не возвращает

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Для обычных страниц параметр не нужен. Для `GROUP`, `KNOWLEDGE` и `MAINPAGE` передают соответствующий `scope`. Подробнее о выборе значения в статье [Работа с типами сайтов и скоупами](../../types.md) ||
|| **params**
[`object`](../../../data-types.md) | Параметры выборки страниц [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../../data-types.md) | Список полей для выборки из [полей объекта Страница](../fields.md). Если параметр не передан или равен `null`, используется `["*"]`.

Метод принимает только простые имена полей страницы. Элементы с `.` игнорируются ||
|| **filter**
[`object`](../../../data-types.md) | Фильтр по полям из [полей объекта Страница](../fields.md). Если параметр не передан или передан в неверном формате, выборка выполняется без пользовательских условий. Ключи с `.` и `CHECK_PERMISSIONS` игнорируются.

Если в фильтре передан `SITE_ID`, метод дополнительно исключает страницы, которые находятся в папках этого сайта, помеченных как удаленные.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"FIELD": "ASC"}` или `{"FIELD": "DESC"}`. Если параметр не передан, специальная сортировка не применяется ||
|| **group**
[`array`](../../../data-types.md) | Группировка в формате ORM. Собственного значения по умолчанию у метода нет ||
|| **limit**
[`integer`](../../../data-types.md) | Ограничение количества строк выборки на уровне ORM. Метод не задает собственный лимит по умолчанию ||
|| **offset**
[`integer`](../../../data-types.md) | Смещение выборки на уровне ORM ||
|| **get_preview**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в каждый элемент результата добавляется поле `PREVIEW` со ссылкой на превью страницы ||
|| **get_urls**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в каждый элемент результата добавляется поле `PUBLIC_URL` с публичным адресом страницы ||
|| **check_area**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в каждый элемент результата добавляется поле `IS_AREA`, которое показывает, является ли страница включаемой областью ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

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
            "SITE_ID",
            "DATE_MODIFY"
          ],
          "filter": {
            "SITE_ID": 205,
            "=DELETED": "N"
          },
          "order": {
            "ID": "DESC"
          },
          "get_urls": true,
          "get_preview": true,
          "check_area": true
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.getList.json"
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
            "SITE_ID",
            "DATE_MODIFY"
          ],
          "filter": {
            "SITE_ID": 205,
            "=DELETED": "N"
          },
          "order": {
            "ID": "DESC"
          },
          "get_urls": true,
          "get_preview": true,
          "check_area": true
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.getList.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each LandingItem returned in result[]
    type LandingItem = {
      ID: string
      TITLE: string
      SITE_ID: string
      DATE_MODIFY: string
      DOMAIN_ID: string | null
      PUBLIC_URL?: string | null
      PREVIEW?: string | null
      IS_AREA?: boolean
    }

    try {
      // landing.landing.getList returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<LandingItem[]>({
        method: 'landing.landing.getList',
        params: {
          params: {
            select: [
              'ID',
              'TITLE',
              'SITE_ID',
              'DATE_MODIFY',
            ],
            filter: {
              SITE_ID: 205,
              '=DELETED': 'N',
            },
            order: {
              ID: 'DESC',
            },
            get_urls: true,
            get_preview: true,
            check_area: true,
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
        console.info('Pages count:', result.length, 'First page:', result[0])
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
      async function getLandingList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // landing.landing.getList returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.getList',
            params: {
              params: {
                select: [
                  'ID',
                  'TITLE',
                  'SITE_ID',
                  'DATE_MODIFY',
                ],
                filter: {
                  SITE_ID: 205,
                  '=DELETED': 'N',
                },
                order: {
                  ID: 'DESC',
                },
                get_urls: true,
                get_preview: true,
                check_area: true,
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
          console.info('Pages count:', result.length, 'First page:', result[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLandingList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.landing.getList',
                [
                    'params' => [
                        'select' => [
                            'ID',
                            'TITLE',
                            'SITE_ID',
                            'DATE_MODIFY',
                        ],
                        'filter' => [
                            'SITE_ID' => 205,
                            '=DELETED' => 'N',
                        ],
                        'order' => [
                            'ID' => 'DESC',
                        ],
                        'get_urls' => true,
                        'get_preview' => true,
                        'check_area' => true,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting landing list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.getList',
        {
            params: {
                select: [
                    'ID',
                    'TITLE',
                    'SITE_ID',
                    'DATE_MODIFY'
                ],
                filter: {
                    SITE_ID: 205,
                    '=DELETED': 'N'
                },
                order: {
                    ID: 'DESC'
                },
                get_urls: true,
                get_preview: true,
                check_area: true
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
        'landing.landing.getList',
        [
            'params' => [
                'select' => [
                    'ID',
                    'TITLE',
                    'SITE_ID',
                    'DATE_MODIFY',
                ],
                'filter' => [
                    'SITE_ID' => 205,
                    '=DELETED' => 'N',
                ],
                'order' => [
                    'ID' => 'DESC',
                ],
                'get_urls' => true,
                'get_preview' => true,
                'check_area' => true,
            ],
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
            "ID": "985",
            "TITLE": "Новость детально",
            "SITE_ID": "3",
            "DATE_MODIFY": "10/10/2022 03:25:30 pm",
            "DOMAIN_ID": "5"
        },
        {
            "ID": "573",
            "TITLE": "Page vide",
            "SITE_ID": "3",
            "DATE_MODIFY": "10/10/2022 03:25:30 pm",
            "DOMAIN_ID": "5"
        }
    ],
    "time": {
        "start": 1773712560,
        "finish": 1773712560.955928,
        "duration": 0.9559280872344971,
        "processing": 0,
        "date_start": "2026-03-17T04:56:00+03:00",
        "date_finish": "2026-03-17T04:56:00+03:00",
        "operating_reset_at": 1773713160,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список страниц [(подробное описание)](#page). Метод может вернуть `result: []` без ошибки, если по фильтру нет подходящих страниц или у пользователя нет права «просмотр» для этих сайтов ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект page {#page}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELD**
[`string`](../../../data-types.md) \| `null` | Любое поле страницы из [полей объекта Страница](../fields.md), если оно запрошено в `params.select` или если `params.select` не передан ||
|| **DOMAIN_ID**
[`string`](../../../data-types.md) \| `null` | Идентификатор домена сайта, к которому привязана страница. Присутствует в ответе, даже если оно не указано в `params.select` ||
|| **PUBLIC_URL**
[`string`](../../../data-types.md) \| `null` | Публичный адрес страницы. Возвращается только если включен флаг `get_urls` ||
|| **PREVIEW**
[`string`](../../../data-types.md) \| `null` | Ссылка на превью страницы. Возвращается только если включен флаг `get_preview` ||
|| **IS_AREA**
[`boolean`](../../../data-types.md) | Признак того, что страница используется как включаемая область. Возвращается только если включен флаг `check_area` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-update.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-additional-fields.md)
- [{#T}](./landing-landing-get-preview.md)
- [{#T}](./landing-landing-get-public-url.md)
