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

По умолчанию метод не возвращает страницы из корзины. Чтобы получить только их, передайте в фильтре `DELETED: "Y"`, а чтобы получить все страницы — `DELETED: ["Y", "N"]`. Страницы сайтов, которые лежат в корзине, метод не возвращает

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний параметр лендингов: тип сайтов, с которыми работает метод. Он не связан с REST-скоупом `landing`.

Для страниц Базы знаний передайте `KNOWLEDGE`, для страниц Базы знаний группы — `GROUP`, регистр не важен. Без `scope` страниц Базы знаний в ответе не будет. Для сайтов типов `PAGE`, `STORE`, `SMN` и `VIBE` параметр не нужен [(подробное описание)](../../types.md) ||
|| **params**
[`object`](../../../data-types.md) | Параметры выборки страниц [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../../data-types.md) | Список полей для выборки из [полей объекта Страница](../fields.md). Если параметр не передан или равен `null`, используется `["*"]`.

Метод принимает только простые имена полей страницы. Элементы с `.` игнорируются.

Если перечисляете поля в `select`, добавьте `ID`: без него метод вернет только одну страницу, а флаги `get_preview`, `get_urls` и `check_area` не сработают ||
|| **filter**
[`object`](../../../data-types.md) | Фильтр по полям из [полей объекта Страница](../fields.md). Если параметр не передан или передан в неверном формате, выборка выполняется без пользовательских условий. Ключи с `.` и `CHECK_PERMISSIONS` игнорируются.

Если в фильтре передан `SITE_ID`, метод дополнительно исключает страницы, которые находятся в папках этого сайта, помеченных как удаленные.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"FIELD": "ASC"}` или `{"FIELD": "DESC"}`. Если параметр не передан, специальная сортировка не применяется ||
|| **group**
[`array`](../../../data-types.md) | Группировка в формате ORM. Собственного значения по умолчанию у метода нет ||
|| **limit**
[`integer`](../../../data-types.md) | Сколько страниц вернуть. Без `limit` метод вернет все подходящие страницы за один вызов ||
|| **offset**
[`integer`](../../../data-types.md) | Сколько страниц пропустить. С `limit` и `offset` список можно получать частями: например, `limit: 50` и `offset: 50` пропустят первые 50 страниц и вернут следующие 50.

Стандартной постраничной навигации REST у метода нет: параметр `start` он не учитывает, `next` и `total` в ответе не приходят ||
|| **get_preview**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в каждый элемент результата добавляется поле `PREVIEW` со ссылкой на превью страницы. Флаг работает, только если `select` не передан, равен `["*"]` или содержит `ID` ||
|| **get_urls**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в каждый элемент результата добавляется поле `PUBLIC_URL` с публичным адресом страницы. Флаг работает, только если `select` не передан, равен `["*"]` или содержит `ID` ||
|| **check_area**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в каждый элемент результата добавляется поле `IS_AREA`, которое показывает, является ли страница включаемой областью. Флаг работает, только если `select` не передан, равен `["*"]` или содержит `ID` ||
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
      "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/landing.landing.getList.json"
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
      "https://**put_your_bitrix24_address**/rest/landing.landing.getList.json"
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
      // landing.landing.getList returns all matching pages in one call; use params.limit and params.offset to get them in parts
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

          // landing.landing.getList returns all matching pages in one call; use params.limit and params.offset to get them in parts
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.landing.get_list(
            params={
                "select": [
                    "ID",
                    "TITLE",
                    "SITE_ID",
                    "DATE_MODIFY",
                ],
                "filter": {
                    "SITE_ID": 205,
                    "=DELETED": "N",
                },
                "order": {
                    "ID": "DESC",
                },
                "get_urls": True,
                "get_preview": True,
                "check_area": True,
            },
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.landing.getList", b24.Params{
    	"params": b24.Params{
    		"select": []string{"ID", "TITLE", "SITE_ID", "DATE_MODIFY"},
    		"filter": b24.Params{
    			"SITE_ID":  205,
    			"=DELETED": "N",
    		},
    		"order": b24.Params{
    			"ID": "DESC",
    		},
    		"get_urls":    true,
    		"get_preview": true,
    		"check_area":  true,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("landing.landing.getList: %w", err)
    }

    var items []struct {
    	ID         b24.ID `json:"ID"`
    	Title      string `json:"TITLE"`
    	SiteID     b24.ID `json:"SITE_ID"`
    	DateModify string `json:"DATE_MODIFY"`
    	DomainID   b24.ID `json:"DOMAIN_ID"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Title)
    }
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
            "SITE_ID": "205",
            "DATE_MODIFY": "10/10/2022 03:25:30 pm",
            "DOMAIN_ID": "5",
            "PUBLIC_URL": "https://mysite.bitrix24site.ru/news-detail/",
            "PREVIEW": "https://mysite.bitrix24site.ru/news-detail/preview.jpg",
            "IS_AREA": false
        },
        {
            "ID": "573",
            "TITLE": "Главная",
            "SITE_ID": "205",
            "DATE_MODIFY": "10/10/2022 03:25:30 pm",
            "DOMAIN_ID": "5",
            "PUBLIC_URL": "https://mysite.bitrix24site.ru/",
            "PREVIEW": "https://mysite.bitrix24site.ru/preview.jpg",
            "IS_AREA": false
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
[`string`](../../../data-types.md) \| `null` | Идентификатор домена сайта, к которому привязана страница. Возвращается, даже если поля нет в `params.select` ||
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
    "error_description": "Недостаточно прав."
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
