# Получить список звонков элемента v 3.0 crm.<тип>.activity.call.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента CRM, звонки которого запрашиваются

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.call.list` возвращает звонки телефонии, привязанные к одному элементу CRM, с направлением, длительностью, исходом, записью и номером. Тип объекта задает сегмент `<тип>` в имени метода, элемент — условие по `ownerId` в фильтре.

В список попадают только звонки: дела других видов метод пропускает, и они не занимают место на странице. Все дела элемента возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.call.list` ||
|| Лид | `crm.lead.activity.call.list` ||
|| Контакт | `crm.contact.activity.call.list` ||
|| Компания | `crm.company.activity.call.list` ||
|| Предложение | `crm.quote.activity.call.list` ||
|| Счет | `crm.smartinvoice.activity.call.list` ||
|| Документ CRM | `crm.smartdocument.activity.call.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.call.list`, например `crm.smartprocess1038.activity.call.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.activity.call.list`, а не `crm.smartInvoice.activity.Call.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Обязательно условие `["ownerId","=",<идентификатор элемента>]`, например `[["ownerId","=",41],["direction","=","incoming"]]`. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей звонка, которые нужно вернуть, например `["id","direction","duration","outcome"]`. Доступные поля описаны в таблице [Элемент items](#items). Для `bindings`, `communications` и `record` можно выбрать вложенные поля через точку: `record.downloadUrl`.

По умолчанию: все поля звонка ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `{"id": "asc"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание параметра](#pagination) ||
|#

### Параметр filter {#filter}

Условие по `ownerId` задает элемент, звонки которого нужно получить. Правила для него:

- условие одно, на верхнем уровне фильтра, с оператором `=` и положительным целым числом
- `ownerId` нельзя указать в группе условий, под отрицанием, с другим оператором, дважды или отдельно от `filter`
- если элемента нет, он в корзине или у вас нет права на его просмотр, метод отвечает ошибкой «не найдено», а не пустым списком

Остальные условия объединяются с ним по И. Фильтровать можно по `id`, `providerId`, `isCompleted`, `assignedById`, `direction`, `createdTime`, `updatedTime`, `startTime`, `deadlineTime`. Поддерживаются операторы и группы условий REST 3.0, синтаксис — в [обзоре REST 3.0](../../../rest-v3.md#filter). Группа условий записывается с ключом `"type": "filter"`: `{"type":"filter","logic":"or","conditions":[...]}`.

Поля из статистики телефонии — `duration`, `outcome`, `record`, `comment`, `clientVote`, `portalLine`, `phoneNumber`, `callId`, `isCallback` — в фильтре и сортировке не участвуют. Например, чтобы найти пропущенные звонки, получите звонки элемента и отберите записи с `outcome` = `missed` на своей стороне.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество звонков на странице. Значения больше `200` уменьшаются до `200`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество звонков, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества звонков. Если на странице вернулось меньше звонков, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.activity.call.list`

{% endnote %}

Примеры получают входящие звонки элемента смарт-процесса с идентификатором типа `1038`, сначала новые. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",41],["direction","=","incoming"]],"select":["id","startTime","duration","outcome","phoneNumber","record.downloadUrl"],"order":{"startTime":"desc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.activity.call.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",41],["direction","=","incoming"]],"select":["id","startTime","duration","outcome","phoneNumber","record.downloadUrl"],"order":{"startTime":"desc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.activity.call.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CallListResult = {
      items: Array<{
        id: number
        startTime: string | null
        duration: number | null
        outcome: string | null
        phoneNumber: string | null
        record: { downloadUrl: string } | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CallListResult>(
        'crm.smartprocess1038.activity.call.list',
        {
          filter: [
            ['ownerId', '=', 41],
            ['direction', '=', 'incoming'],
          ],
          select: ['id', 'startTime', 'duration', 'outcome', 'phoneNumber', 'record.downloadUrl'],
          order: {
            startTime: 'desc',
          },
          pagination: {
            limit: 50,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Calls:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listCalls() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.activity.call.list',
            {
              filter: [
                ['ownerId', '=', 41],
                ['direction', '=', 'incoming'],
              ],
              select: ['id', 'startTime', 'duration', 'outcome', 'phoneNumber', 'record.downloadUrl'],
              order: {
                startTime: 'desc',
              },
              pagination: {
                limit: 50,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Calls:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCalls)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.activity.call.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerId", "=", 41],
                    ["direction", "=", "incoming"],
                ],
                "select": ["id", "startTime", "duration", "outcome", "phoneNumber", "record.downloadUrl"],
                "order": {
                    "startTime": "desc",
                },
                "pagination": {
                    "limit": 50,
                },
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
                'crm.smartprocess1038.activity.call.list',
                [
                    'filter' => [
                        ['ownerId', '=', 41],
                        ['direction', '=', 'incoming'],
                    ],
                    'select' => ['id', 'startTime', 'duration', 'outcome', 'phoneNumber', 'record.downloadUrl'],
                    'order' => [
                        'startTime' => 'desc',
                    ],
                    'pagination' => [
                        'limit' => 50,
                    ],
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
        'crm.smartprocess1038.activity.call.list',
        {
            filter: [
                ['ownerId', '=', 41],
                ['direction', '=', 'incoming'],
            ],
            select: ['id', 'startTime', 'duration', 'outcome', 'phoneNumber', 'record.downloadUrl'],
            order: {
                startTime: 'desc',
            },
            pagination: {
                limit: 50,
            },
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
        'crm.smartprocess1038.activity.call.list',
        [
            'filter' => [
                ['ownerId', '=', 41],
                ['direction', '=', 'incoming'],
            ],
            'select' => ['id', 'startTime', 'duration', 'outcome', 'phoneNumber', 'record.downloadUrl'],
            'order' => [
                'startTime' => 'desc',
            ],
            'pagination' => [
                'limit' => 50,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.activity.call.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerId", "=", 41},
    		[]any{"direction", "=", "incoming"},
    	},
    	"select": []string{"id", "startTime", "duration", "outcome", "phoneNumber", "record.downloadUrl"},
    	"order": b24.Params{
    		"startTime": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.activity.call.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int     `json:"id"`
    		StartTime   *string `json:"startTime"`
    		Duration    *int    `json:"duration"`
    		Outcome     *string `json:"outcome"`
    		PhoneNumber *string `json:"phoneNumber"`
    		Record      *struct {
    			DownloadURL string `json:"downloadUrl"`
    		} `json:"record"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Outcome, item.Duration)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "duration": 95,
                "outcome": "successful",
                "record": {
                    "downloadUrl": "/bitrix/tools/crm_show_file.php?fileId=9079&ownerTypeId=6&ownerId=8471"
                },
                "phoneNumber": "+79990000001",
                "id": 8471,
                "startTime": "2026-11-10T11:19:38+03:00"
            },
            {
                "duration": 0,
                "outcome": "missed",
                "record": null,
                "phoneNumber": "+79990000002",
                "id": 8465,
                "startTime": "2026-11-09T16:02:11+03:00"
            }
        ]
    },
    "time": {
        "start": 1795430960,
        "finish": 1795430960.333926,
        "duration": 0.3339259624481201,
        "processing": 0,
        "date_start": "2026-11-23T13:49:20+03:00",
        "date_finish": "2026-11-23T13:49:20+03:00",
        "operating_reset_at": 1795431540,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`object[]`](../../../data-types.md) | Массив звонков с полями из `select`, без `select` — со всеми полями. Если у элемента нет подходящих звонков, массив пустой. [Описание полей](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Все поля только для чтения: звонки создает и меняет телефония.

#|
|| **Название**
`тип` | **Описание** | **Фильтр** | **Сортировка** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор звонка | + | + ||
|| **providerId**
[`string`](../../../data-types.md) | Провайдер дела, у звонков всегда `VOXIMPLANT_CALL` | + | — ||
|| **isCompleted**
[`boolean`](../../../data-types.md) | Признак, что звонок завершен как дело | + | — ||
|| **assignedById**
[`integer`](../../../data-types.md) | Идентификатор ответственного | + | — ||
|| **authorId**
[`integer`](../../../data-types.md) | Идентификатор автора | — | — ||
|| **editorId**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил дело | — | — ||
|| **createdTime**
[`datetime`](../../../data-types.md) | Дата и время создания | + | + ||
|| **updatedTime**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения | + | + ||
|| **startTime**
[`datetime`](../../../data-types.md) | Дата и время начала звонка | + | + ||
|| **endTime**
[`datetime`](../../../data-types.md) | Дата и время окончания звонка | — | + ||
|| **deadlineTime**
[`datetime`](../../../data-types.md) | Крайний срок дела, `null` — без срока | + | + ||
|| **bindings**
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязан звонок: `entityTypeId` — идентификатор типа объекта, `entityId` — идентификатор элемента | — | — ||
|| **direction**
[`string`](../../../data-types.md) | Направление звонка. Возможные значения:

- `incoming` — входящий
- `outgoing` — исходящий
- `undefined` — направление не задано | + | — ||
|| **communications**
[`object[]`](../../../data-types.md) | Участники звонка: `type` — тип канала связи `PHONE`, `value` — номер, `entityTypeId` и `entityId` — элемент CRM участника. Если у вас нет доступа к номеру, в `value` приходит `null` | — | — ||
|| **callId**
[`string`](../../../data-types.md) | Идентификатор звонка в телефонии, `null` — звонок создан не телефонией | — | — ||
|| **isCallback**
[`boolean`](../../../data-types.md) | Признак обратного звонка, который заказал клиент. Поле не приходит, если у звонка нет данных телефонии | — | — ||
|| **duration**
[`integer`](../../../data-types.md) | Длительность разговора в секундах | — | — ||
|| **outcome**
[`string`](../../../data-types.md) | Исход звонка, `null` — исхода еще нет. Возможные значения:

- `successful` — успешный звонок
- `missed` — пропущенный
- `declined` — отклонен
- `canceled` — отменен
- `busy` — занято
- `unavailable` — абонент недоступен
- `invalidNumber` — неверный номер
- `insufficientFunds` — недостаточно средств
- `unavailableOnPlan` — недоступно на тарифе
- `forbidden` — запрещено
- `blocked` — заблокировано
- `routeUnavailable` — направление недоступно
- `serverError` — ошибка сервера
- `other` — другой исход | — | — ||
|| **record**
[`object`](../../../data-types.md) | Запись разговора — первый аудиофайл звонка, `null` — записи нет. Поля: `id` — идентификатор файла, `name` — имя файла, `url` — относительная ссылка для просмотра, `downloadUrl` — относительная ссылка для скачивания | — | — ||
|| **comment**
[`string`](../../../data-types.md) | Комментарий к звонку в телефонии | — | — ||
|| **clientVote**
[`integer`](../../../data-types.md) | Оценка клиента от `1` до `5`, `null` — клиент не оценил звонок | — | — ||
|| **portalLine**
[`string`](../../../data-types.md) | Линия Битрикс24, через которую прошел звонок | — | — ||
|| **phoneNumber**
[`string`](../../../data-types.md) | Номер телефона собеседника | — | — ||
|#

Поля `callId`, `duration`, `outcome`, `comment`, `clientVote`, `portalLine` и `phoneNumber` берутся из статистики телефонии. Если звонок создан не телефонией, например вручную, эти поля приходят со значением `null`. Если у вас нет доступа к клиенту звонка, `record`, `comment`, `clientVote` и `phoneNumber` тоже приходят со значением `null`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "В DTO `CallActivityDto` в поле `duration` требуется наличие атрибута `Filterable` для такого запроса",
                "field": "duration"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Обязательное поле `filter` не указано | Передайте `filter` с условием по `ownerId`. Ошибку дает и `filter`, переданный строкой ||
|| `ownerId` | ownerId is a condition of the filter: name it as ["ownerId", "=", N] there. | Уберите `ownerId` из тела запроса и передайте его условием в `filter` ||
|| `duration` | В DTO `CallActivityDto` в поле `duration` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям с отметкой в колонке «Фильтр» таблицы [Элемент items](#items) ||
|| `duration` | В DTO `CallActivityDto` в поле `duration` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime` ||
|| `direction` | В поле `direction` требуется тип данных `Direction` для такого запроса | Передайте значение из списка поля `direction`: `incoming`, `outgoing`, `undefined` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.ownerId` | Требуется указать фильтр по обязательному полю `ownerId` | Добавьте в `filter` условие `["ownerId","=",<идентификатор элемента>]` ||
|#

#### Неверный фильтр

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `["ownerId",">",41]` | Проверьте условие по `ownerId`: одно, на верхнем уровне, с оператором `=`. Группы условий записывайте с ключом `"type": "filter"` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999999` не найдена | Элемента из `ownerId` нет у этого типа объекта, он в корзине или у вас нет права на его просмотр. Проверьте `ownerId` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `subject` для сущности `CallActivityDto` | Проверьте имена полей в `select`, `filter` и `order` по таблице [Элемент items](#items). Поля `subject`, `description`, `type` и файлы дела возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|| `-` | Неизвестное поле `foo` для сущности `FileDto` | Проверьте вложенное поле записи в `select`: `record.id`, `record.name`, `record.url`, `record.downloadUrl` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.call.list`: лиды выключены на Битрикс24. Включите лиды или запрашивайте звонки другого типа объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.deal.activity.Call.list` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.call.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов звонков нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-call-get-rest-v3.md)
- [{#T}](./crm-entity-activity-list-rest-v3.md)
- [{#T}](./crm-entity-activity-openline-list-rest-v3.md)
