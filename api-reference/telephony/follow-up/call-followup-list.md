# Получить список Follow-up звонков call.followup.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`call`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `call.followup.list` возвращает список Follow-up звонков за указанный период.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../data-types.md) | Условия выборки [(подробное описание)](#filter) ||
|| **select**
[`array`](../../data-types.md) | Список полей и вложенных путей, которые нужно вернуть в элементах списка.

Если параметр не передан или передан пустой массив, метод возвращает только базовые метаданные: `callId`, `callType`, `initiatorId`, `startDate`, `endDate`, `durationSeconds`.

В `select` можно передать корневые поля Follow-up, AI-блоки или доступные вложенные пути через точку. Полный список полей и доступных вложенных путей смотрите в статье [Поля Follow-up звонков](./fields.md#select-paths).

Поля `transcription`, `overview` и `insights` считаются тяжелыми. Если они есть в `select`, сервер ограничит `pagination.limit` значением `20` ||
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
[`integer`](../../data-types.md) | Идентификатор участника звонка.

Администратор может получить Follow-up по любому пользователю. Для обычного пользователя фильтр принудительно ограничивается его идентификатором ||
|#

#### Параметр filter.startDate {#startdate}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`string`](../../data-types.md) | Начало периода в формате ISO 8601. Например: `2026-01-01T00:00:00Z` ||
|| **to***
[`string`](../../data-types.md) | Конец периода в формате ISO 8601. Значение должно быть больше или равно `from` ||
|#

### Параметр order {#order}

#|
|| **Название**
`тип` | **Описание** ||
|| **startDate**
[`string`](../../data-types.md) | Направление сортировки по дате начала звонка.

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
[`integer`](../../data-types.md) | Размер страницы.

По умолчанию: `50`. Максимум: `200` для легкой выборки и `20` для выборки с тяжелыми AI-полями. Если передать значение больше максимума, сервер применит максимальное значение ||
|| **afterCursor**
[`object`](../../data-types.md) | Курсор следующей страницы. Передавайте значение `afterCursor` целиком из предыдущего ответа в том же формате, в котором оно пришло [(подробное описание)](#aftercursor) ||
|#

#### Параметр pagination.afterCursor {#aftercursor}

Чтобы получить все страницы:

1. Отправьте первый запрос без `pagination.afterCursor`
2. Если в ответе `hasMore` равен `true`, скопируйте объект `afterCursor` из ответа в `pagination.afterCursor` следующего запроса
3. Повторяйте запросы, пока `hasMore` не станет равен `false`

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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/call.followup.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"startDate":{"from":"2026-01-01T00:00:00Z","to":"2026-01-31T23:59:59Z"}},"select":["callId","startDate","participants","overview.topic","overview.actionItems"],"order":{"startDate":"desc"},"pagination":{"limit":20},"mentionFormat":"html"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/call.followup.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"startDate":{"from":"2026-01-01T00:00:00Z","to":"2026-01-31T23:59:59Z"}},"select":["callId","startDate","participants","overview.topic","overview.actionItems"],"order":{"startDate":"desc"},"pagination":{"limit":20},"mentionFormat":"html","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/call.followup.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FollowUpListResult = {
      items: Array<{
        callId: number
        startDate: string
        participants?: unknown[]
        overview?: { topic?: string, actionItems?: unknown[] }
      }>
      hasMore: boolean
      afterCursor: { startDate: string, id: number } | null
    }

    try {
      const response = await $b24.actions.v3.call.make<FollowUpListResult>({
        method: 'call.followup.list',
        params: {
          filter: {
            startDate: {
              from: '2026-01-01T00:00:00Z',
              to: '2026-01-31T23:59:59Z',
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
        console.info(result.items, result.afterCursor)
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
      async function getFollowUpList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'call.followup.list',
            params: {
              filter: {
                startDate: {
                  from: '2026-01-01T00:00:00Z',
                  to: '2026-01-31T23:59:59Z',
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

      document.addEventListener('DOMContentLoaded', getFollowUpList)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'call.followup.list',
                [
                    'filter' => [
                        'startDate' => [
                            'from' => '2026-01-01T00:00:00Z',
                            'to' => '2026-01-31T23:59:59Z',
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

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'call.followup.list',
        {
            filter: {
                startDate: {
                    from: '2026-01-01T00:00:00Z',
                    to: '2026-01-31T23:59:59Z'
                }
            },
            select: ['callId', 'startDate', 'participants', 'overview.topic', 'overview.actionItems'],
            order: { startDate: 'desc' },
            pagination: { limit: 20 },
            mentionFormat: 'html'
        },
        function(result) {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'call.followup.list',
        [
            'filter' => [
                'startDate' => [
                    'from' => '2026-01-01T00:00:00Z',
                    'to' => '2026-01-31T23:59:59Z',
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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "callId": 12345,
                "startDate": "2026-01-15T10:00:00+00:00",
                "participants": [
                    { "userId": 7, "name": "Иван Петров", "avatar": "https://...", "talkedSeconds": 600 },
                    { "userId": 42, "name": "Мария Иванова", "talkedSeconds": 1200 }
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
        "afterCursor": { "startDate": "2026-01-12T14:30:00.000000+00:00", "id": 12330 }
    },
    "time": {
        "start": 1784017027,
        "finish": 1784017027.356922,
        "duration": 0.356921911239624,
        "processing": 0,
        "date_start": "2026-07-14T11:17:07+03:00",
        "date_finish": "2026-07-14T11:17:07+03:00",
        "operating_reset_at": 1784017627,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../data-types.md) | Массив объектов Follow-up. Состав полей зависит от `select`.

Если подходящих Follow-up нет, вернется пустой массив `[]` ||
|| **hasMore**
[`boolean`](../../data-types.md) | Признак наличия следующей страницы ||
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
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте, что у приложения или вебхука есть scope `call` ||
|#

#### Ошибки фильтра

Код ошибки: `invalid_date_range`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.startDate` | Некорректный диапазон дат | Передайте `from` и `to` в формате ISO 8601. Значение `from` должно быть меньше или равно `to` ||
|#

#### Ошибки в параметре `select`

Код ошибки: `invalid_select_field`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Недопустимое поле в `select` | Передайте поле из списка доступных значений `select` ||
|#

#### Ошибки сортировки

Код ошибки: `invalid_order`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Некорректный параметр `order` | Передайте `{ "startDate": "asc" }` или `{ "startDate": "desc" }` ||
|#

#### Ошибки постраничной навигации

Код ошибки: `invalid_pagination`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Некорректный параметр `pagination` | Передайте положительный целочисленный `limit` и курсор из предыдущего ответа ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.participantId` | Передан неверный тип идентификатора участника | Передайте `filter.participantId` как целое число ||
|| `mentionFormat` | Передано значение не из списка допустимых форматов | Передайте `bb`, `html` или `none` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./call-followup-get.md)
- [{#T}](./fields.md)
- [{#T}](./call-followup-field-list.md)
- [{#T}](./call-followup-field-get.md)
- [{#T}](./index.md)

<!-- Generated by skill-1-gen-docs from source: api-reference/telephony/doc.md, C:\Users\g.m.tagirova\original-bitrix\modules\call\lib\Controller\FollowUp.php -->
<!-- Generated: 2026-07-14 -->
<!-- Требуется проверка: нет -->
