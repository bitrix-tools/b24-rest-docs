# Получить список Follow-up звонков Битрикс24 Синк syncconnector.followup.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`syncconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `syncconnector.followup.list` возвращает список Follow-up звонков Битрикс24 Синк за период.

Обычный пользователь получает Follow-up звонков, в которых он говорил или в чате которых состоит. Администратор получает Follow-up всех сотрудников, а с параметром `filter.participantId` — одного сотрудника.

Метод возвращает только Follow-up звонков Синка. Чтобы получить их вместе с Follow-up звонков Битрикс24, используйте [call.followup.list](./call-followup-list.md): параметры и поля ответа у него те же.

`callId` в ответе — идентификатор не звонка, а страницы подробного разбора: ее открывает ссылка «Подробный разбор» в чате. У звонка Синка может быть несколько таких страниц, по одной на каждую часть. Части одного звонка объединяет поле `uuid`: добавьте его в `select`, чтобы их собрать. В [call.followup.list](./call-followup-list.md) тот же Follow-up приходит с `callId`, равным `10000000000` плюс идентификатор страницы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../data-types.md) | Условия выборки [(подробное описание)](#filter) ||
|| **select**
[`array`](../../data-types.md) | Список полей и вложенных путей, которые нужно вернуть в элементах списка.

Если параметр не передан или передан пустой массив, метод возвращает поля `callId`, `callType`, `initiatorId`, `startDate`, `endDate`, `durationSeconds`.

Поле из `select` есть в ответе, даже если его значение `null`. Поле `callId` метод возвращает всегда. Полный список полей и вложенных путей — в статье [Поля Follow-up звонков](./fields.md#select-paths).

AI-поля — `transcription`, `overview`, `summary`, `insights`, `evaluation`. Если в `select` есть хотя бы одно из них или его вложенный путь, в одном ответе будет не больше `20` элементов ||
|| **order**
[`object`](../../data-types.md) | Параметры сортировки [(подробное описание)](#order).

По умолчанию: `{ "startDate": "desc" }` ||
|| **pagination**
[`object`](../../data-types.md) | Параметры курсорной постраничной навигации [(подробное описание)](#pagination) ||
|| **mentionFormat**
[`string`](../../data-types.md) | Формат упоминаний пользователей в текстовых AI-полях.

Возможные значения:

- `bb` — BBCode-формат
- `html` — HTML-формат
- `none` — текст без разметки упоминаний

По умолчанию: `bb` ||
|#

### Параметр filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **startDate***
[`object`](../../data-types.md) | Период начала звонка [(подробное описание)](#startdate) ||
|| **participantId**
[`integer`](../../data-types.md) | Идентификатор сотрудника. Администратору метод вернет Follow-up этого сотрудника, а без параметра — всех сотрудников. Для остальных пользователей параметр не меняет результат.

Передайте значение числом, иначе метод вернет ошибку валидации ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата. Метод вернет Follow-up только звонков из этого чата.

Передайте значение числом: строка `"123"` вернет ошибку валидации. Если передать `0` или отрицательное число, метод вернет пустой список ||
|#

#### Параметр filter.startDate {#startdate}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`string`](../../data-types.md) | Начало периода в формате ISO 8601 с временем и часовым поясом, например `2026-01-01T00:00:00Z` или `2026-01-01T00:00:00+03:00` ||
|| **to***
[`string`](../../data-types.md) | Конец периода в том же формате. Значение должно быть больше или равно `from` ||
|#

### Параметр order {#order}

#|
|| **Название**
`тип` | **Описание** ||
|| **startDate**
[`string`](../../data-types.md) | Направление сортировки по дате начала.

Возможные значения:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `desc` ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Наибольшее число Follow-up в одном ответе.

По умолчанию: `50`. Максимум: `200`. Если в `select` есть AI-поле, в ответе не больше `20` элементов, даже без `limit`. Если передать значение больше максимума, метод применит максимальное значение ||
|| **afterCursor**
[`object`](../../data-types.md) | Курсор следующей страницы. Передайте объект `afterCursor` из предыдущего ответа без изменений [(подробное описание)](#aftercursor) ||
|#

Другие ключи в `pagination` метод не принимает: `page` и `offset` вернут ошибку `invalid_pagination`.

#### Параметр pagination.afterCursor {#aftercursor}

Чтобы получить все страницы:

1. Отправьте первый запрос без `pagination.afterCursor`
2. Если в ответе `hasMore` равен `true`, скопируйте объект `afterCursor` из ответа в `pagination.afterCursor` следующего запроса
3. Повторяйте запросы, пока `hasMore` не станет равен `false`, даже если ответ пришел пустым или в нем меньше элементов, чем `limit`

#|
|| **Название**
`тип` | **Описание** ||
|| **startDate***
[`string`](../../data-types.md) | Дата начала последнего элемента предыдущей страницы ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор последнего элемента предыдущей страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/syncconnector.followup.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"startDate":{"from":"2026-11-01T00:00:00Z","to":"2026-11-30T23:59:59Z"}},"select":["callId","startDate","participants","overview.topic","overview.actionItems"],"order":{"startDate":"desc"},"pagination":{"limit":20},"mentionFormat":"html"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/syncconnector.followup.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"startDate":{"from":"2026-11-01T00:00:00Z","to":"2026-11-30T23:59:59Z"}},"select":["callId","startDate","participants","overview.topic","overview.actionItems"],"order":{"startDate":"desc"},"pagination":{"limit":20},"mentionFormat":"html","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/syncconnector.followup.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SyncFollowUpListResult = {
      items: Array<{
        callId: number
        startDate?: string
        participants?: unknown[]
        overview?: { topic?: string, actionItems?: unknown[] } | null
      }>
      hasMore: boolean
      afterCursor: { startDate: string, id: number } | null
    }

    try {
      const response = await $b24.actions.v3.call.make<SyncFollowUpListResult>({
        method: 'syncconnector.followup.list',
        params: {
          filter: {
            startDate: {
              from: '2026-11-01T00:00:00Z',
              to: '2026-11-30T23:59:59Z',
            },
          },
          select: ['callId', 'startDate', 'participants', 'overview.topic', 'overview.actionItems'],
          order: { startDate: 'desc' },
          pagination: { limit: 20 },
          mentionFormat: 'html',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items, result.hasMore, result.afterCursor)
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
      async function getSyncFollowUpList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'syncconnector.followup.list',
            params: {
              filter: {
                startDate: {
                  from: '2026-11-01T00:00:00Z',
                  to: '2026-11-30T23:59:59Z',
                },
              },
              select: ['callId', 'startDate', 'participants', 'overview.topic', 'overview.actionItems'],
              order: { startDate: 'desc' },
              pagination: { limit: 20 },
              mentionFormat: 'html',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Follow-ups found:', result.items.length, result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSyncFollowUpList)
    </script>
    ```

- Python

    В `b24pysdk` нет готовых методов [syncconnector.followup.*](./index.md#sync-methods), поэтому метод вызывается через `call_method` — добавьте его в `api_v3_methods`, как в примере.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "syncconnector.followup.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": {
                    "startDate": {
                        "from": "2026-11-01T00:00:00Z",
                        "to": "2026-11-30T23:59:59Z",
                    },
                },
                "select": [
                    "callId",
                    "startDate",
                    "participants",
                    "overview.topic",
                    "overview.actionItems",
                ],
                "order": {
                    "startDate": "desc",
                },
                "pagination": {
                    "limit": 20,
                },
                "mentionFormat": "html",
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'syncconnector.followup.list',
                [
                    'filter' => [
                        'startDate' => [
                            'from' => '2026-11-01T00:00:00Z',
                            'to' => '2026-11-30T23:59:59Z',
                        ],
                    ],
                    'select' => ['callId', 'startDate', 'participants', 'overview.topic', 'overview.actionItems'],
                    'order' => ['startDate' => 'desc'],
                    'pagination' => ['limit' => 20],
                    'mentionFormat' => 'html',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'syncconnector.followup.list',
        {
            filter: {
                startDate: {
                    from: '2026-11-01T00:00:00Z',
                    to: '2026-11-30T23:59:59Z'
                }
            },
            select: ['callId', 'startDate', 'participants', 'overview.topic', 'overview.actionItems'],
            order: { startDate: 'desc' },
            pagination: { limit: 20 },
            mentionFormat: 'html'
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'syncconnector.followup.list',
        [
            'filter' => [
                'startDate' => [
                    'from' => '2026-11-01T00:00:00Z',
                    'to' => '2026-11-30T23:59:59Z',
                ],
            ],
            'select' => ['callId', 'startDate', 'participants', 'overview.topic', 'overview.actionItems'],
            'order' => ['startDate' => 'desc'],
            'pagination' => ['limit' => 20],
            'mentionFormat' => 'html',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "syncconnector.followup.list", b24.Params{
    	"filter": b24.Params{
    		"startDate": b24.Params{
    			"from": "2026-11-01T00:00:00Z",
    			"to":   "2026-11-30T23:59:59Z",
    		},
    	},
    	"select": []string{"callId", "startDate", "participants", "overview.topic", "overview.actionItems"},
    	"order": b24.Params{
    		"startDate": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 20,
    	},
    	"mentionFormat": "html",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("syncconnector.followup.list: %w", err)
    }

    var page struct {
    	Items       []json.RawMessage `json:"items"`
    	HasMore     bool              `json:"hasMore"`
    	AfterCursor *struct {
    		StartDate string `json:"startDate"`
    		ID        int    `json:"id"`
    	} `json:"afterCursor"`
    }
    if err := json.Unmarshal(res.Result, &page); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(len(page.Items), page.HasMore)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "callId": 128,
                "startDate": "2026-11-12T09:00:00+00:00",
                "participants": [
                    { "userId": 7, "talkedSeconds": 600, "name": "Иван Петров", "avatar": "https://...", "workPosition": "Руководитель проекта" },
                    { "userId": 42, "talkedSeconds": 1200, "name": "Мария Иванова", "avatar": null, "workPosition": null }
                ],
                "overview": {
                    "topic": "Планирование спринта",
                    "actionItems": [
                        { "actionItem": "Выкатить MVP к пятнице", "quote": "..." }
                    ]
                }
            }
        ],
        "hasMore": true,
        "afterCursor": { "startDate": "2026-11-12T09:00:00.000000+00:00", "id": 128 }
    },
    "time": {
        "start": 1794476996,
        "finish": 1794476996.873855,
        "duration": 0.8738551139831543,
        "processing": 0,
        "date_start": "2026-11-12T12:49:56+03:00",
        "date_finish": "2026-11-12T12:49:56+03:00",
        "operating_reset_at": 1794477540,
        "operating": 0
    }
}
```

Если Follow-up за период нет, метод вернет `{"items":[],"hasMore":false,"afterCursor":null}`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../data-types.md) | Массив объектов Follow-up. Состав полей зависит от `select`. Описание полей — в статье [Поля Follow-up звонков](./fields.md#root-object), отличия полей Синка — в разделе [Отличия полей в Битрикс24 Синк](./fields.md#sync).

Если подходящих Follow-up нет, вернется пустой массив `[]` ||
|| **hasMore**
[`boolean`](../../data-types.md) | Есть ли следующая страница ||
|| **afterCursor**
[`object`](../../data-types.md) | Курсор для получения следующей страницы.

Если следующей страницы нет, возвращается `null` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "invalid_date_range",
        "message": "Некорректный диапазон дат: both from and to are required"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте, что у приложения или вебхука есть scope `syncconnector` ||
|#

#### Ошибки фильтра

Код ошибки: `invalid_date_range`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.startDate` | Некорректный диапазон дат: both from and to are required | Передайте `from` и `to` в формате ISO 8601 с временем и часовым поясом. Дата без времени, например `2026-01-01`, вернет ту же ошибку ||
|| `filter.startDate` | Некорректный диапазон дат: from must be <= to | Значение `from` должно быть меньше или равно `to` ||
|#

#### Ошибки в параметре `select`

Код ошибки: `invalid_select_field`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Недопустимое поле в select: `#FIELD#` | Передайте поле из [списка доступных значений](./fields.md#select-paths) ||
|#

#### Ошибки сортировки

Код ошибки: `invalid_order`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Некорректный параметр order | Передайте `{ "startDate": "asc" }` или `{ "startDate": "desc" }` ||
|#

#### Ошибки постраничной навигации

Код ошибки: `invalid_pagination`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Некорректный параметр pagination | Передайте только `limit` и `afterCursor` из предыдущего ответа. `limit` — положительное целое число ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.participantId` | В поле `filter.participantId` требуется тип данных `int` для такого запроса | Передайте `filter.participantId` числом ||
|| `filter.chatId` | В поле `filter.chatId` требуется тип данных `int` для такого запроса | Передайте `filter.chatId` числом ||
|| `mentionFormat` | Значение поля не содержится в списке допустимых значений | Передайте `bb`, `html` или `none` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./syncconnector-followup-get.md)
- [{#T}](./syncconnector-followup-field-list.md)
- [{#T}](./syncconnector-followup-field-get.md)
- [{#T}](./fields.md)
- [{#T}](./index.md)
