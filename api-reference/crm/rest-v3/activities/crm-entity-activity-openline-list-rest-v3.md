# Получить список чатов открытых линий элемента v 3.0 crm.<тип>.activity.openline.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента CRM, чаты которого запрашиваются

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.openline.list` возвращает чаты открытых линий, привязанные к одному элементу CRM, с открытой линией, каналом, сессией, чатом и оценкой клиента. Тип объекта задает сегмент `<тип>` в имени метода, элемент — условие по `ownerId` в фильтре.

В список попадают только чаты открытых линий: дела других видов метод пропускает, и они не занимают место на странице. Все дела элемента возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.openline.list` ||
|| Лид | `crm.lead.activity.openline.list` ||
|| Контакт | `crm.contact.activity.openline.list` ||
|| Компания | `crm.company.activity.openline.list` ||
|| Предложение | `crm.quote.activity.openline.list` ||
|| Счет | `crm.smartinvoice.activity.openline.list` ||
|| Документ CRM | `crm.smartdocument.activity.openline.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.openline.list`, например `crm.smartprocess1038.activity.openline.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.deal.activity.openline.list`, а не `crm.deal.activity.openLine.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Обязательно условие `["ownerId","=",<идентификатор элемента>]`, например `[["ownerId","=",41],["isCompleted","=",false]]`. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей чата, которые нужно вернуть, например `["id","connectorId","sessionId","chatId"]`. Доступные поля описаны в таблице [Элемент items](#items). Для `bindings` и `communications` можно выбрать вложенные поля через точку: `bindings.entityId`.

По умолчанию: все поля чата ||
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

Условие по `ownerId` задает элемент, чаты которого нужно получить. Правила для него:

- условие одно, на верхнем уровне фильтра, с оператором `=` и положительным целым числом
- `ownerId` нельзя указать в группе условий, под отрицанием, с другим оператором, дважды или отдельно от `filter`
- если элемента нет, он в корзине или у вас нет права на его просмотр, метод отвечает ошибкой «не найдено», а не пустым списком

Остальные условия объединяются с ним по И. Фильтровать можно по `id`, `providerId`, `isCompleted`, `assignedById`, `direction`, `createdTime`, `updatedTime`, `startTime`, `deadlineTime`. Поддерживаются операторы и группы условий REST 3.0, синтаксис — в [обзоре REST 3.0](../../../rest-v3.md#filter). Группа условий записывается с ключом `"type": "filter"`: `{"type":"filter","logic":"or","conditions":[...]}`.

Поля из данных открытых линий — `lineId`, `lineName`, `connectorId`, `sessionId`, `chatId`, `clientVote` — в фильтре и сортировке не участвуют. Например, чтобы найти чаты из Telegram, получите чаты элемента и отберите записи с `connectorId` = `telegrambot` на своей стороне.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество чатов на странице. Значения больше `200` уменьшаются до `200`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество чатов, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества чатов. Если на странице вернулось меньше чатов, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.activity.openline.list`

{% endnote %}

Примеры получают чаты открытых линий элемента смарт-процесса с идентификатором типа `1038`, сначала новые. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",41]],"select":["id","direction","lineName","connectorId","sessionId","chatId","clientVote","isCompleted","startTime"],"order":{"startTime":"desc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.activity.openline.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",41]],"select":["id","direction","lineName","connectorId","sessionId","chatId","clientVote","isCompleted","startTime"],"order":{"startTime":"desc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.activity.openline.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OpenLineListResult = {
      items: Array<{
        id: number
        direction: 'incoming' | 'outgoing' | 'undefined'
        lineName: string | null
        connectorId: string | null
        sessionId: number | null
        chatId: number | null
        clientVote: number | null
        isCompleted: boolean
        startTime: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<OpenLineListResult>(
        'crm.smartprocess1038.activity.openline.list',
        {
          filter: [
            ['ownerId', '=', 41],
          ],
          select: ['id', 'direction', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime'],
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
        console.info('Open line chats:', result.items)
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
      async function listOpenLineChats() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.activity.openline.list',
            {
              filter: [
                ['ownerId', '=', 41],
              ],
              select: ['id', 'direction', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime'],
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
          console.info('Open line chats:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listOpenLineChats)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.activity.openline.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerId", "=", 41],
                ],
                "select": ["id", "direction", "lineName", "connectorId", "sessionId", "chatId", "clientVote", "isCompleted", "startTime"],
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
                'crm.smartprocess1038.activity.openline.list',
                [
                    'filter' => [
                        ['ownerId', '=', 41],
                    ],
                    'select' => ['id', 'direction', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime'],
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
        'crm.smartprocess1038.activity.openline.list',
        {
            filter: [
                ['ownerId', '=', 41],
            ],
            select: ['id', 'direction', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime'],
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
        'crm.smartprocess1038.activity.openline.list',
        [
            'filter' => [
                ['ownerId', '=', 41],
            ],
            'select' => ['id', 'direction', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime'],
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.activity.openline.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerId", "=", 41},
    	},
    	"select": []string{"id", "direction", "lineName", "connectorId", "sessionId", "chatId", "clientVote", "isCompleted", "startTime"},
    	"order": b24.Params{
    		"startTime": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.activity.openline.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int     `json:"id"`
    		Direction   string  `json:"direction"`
    		LineName    *string `json:"lineName"`
    		ConnectorID *string `json:"connectorId"`
    		SessionID   *int    `json:"sessionId"`
    		ChatID      *int    `json:"chatId"`
    		ClientVote  *int    `json:"clientVote"`
    		IsCompleted bool    `json:"isCompleted"`
    		StartTime   *string `json:"startTime"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.ConnectorID, item.ChatID)
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
                "direction": "incoming",
                "lineName": "Поддержка клиентов",
                "connectorId": "telegrambot",
                "sessionId": 791,
                "chatId": 4531,
                "clientVote": 5,
                "id": 8135,
                "isCompleted": true,
                "startTime": "2026-08-25T16:16:04+03:00"
            },
            {
                "direction": "incoming",
                "lineName": "Сайт",
                "connectorId": "livechat",
                "sessionId": 783,
                "chatId": 2091,
                "clientVote": null,
                "id": 7593,
                "isCompleted": true,
                "startTime": "2026-07-24T17:35:12+03:00"
            }
        ]
    },
    "time": {
        "start": 1795431012,
        "finish": 1795431012.943746,
        "duration": 0.9437460899353027,
        "processing": 0,
        "date_start": "2026-11-23T13:50:12+03:00",
        "date_finish": "2026-11-23T13:50:12+03:00",
        "operating_reset_at": 1795431600,
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
[`object[]`](../../../data-types.md) | Массив чатов с полями из `select`, без `select` — со всеми полями. Если у элемента нет подходящих чатов, массив пустой. [Описание полей](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Все поля только для чтения: чаты создают и меняют открытые линии.

#|
|| **Название**
`тип` | **Описание** | **Фильтр** | **Сортировка** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор чата как дела CRM | + | + ||
|| **providerId**
[`string`](../../../data-types.md) | Провайдер дела, у чатов всегда `IMOPENLINES_SESSION` | + | — ||
|| **isCompleted**
[`boolean`](../../../data-types.md) | Признак, что чат завершен как дело | + | — ||
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
[`datetime`](../../../data-types.md) | Дата и время начала чата | + | + ||
|| **endTime**
[`datetime`](../../../data-types.md) | Дата и время окончания чата | — | + ||
|| **deadlineTime**
[`datetime`](../../../data-types.md) | Крайний срок дела, `null` — без срока | + | + ||
|| **bindings**
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязан чат: `entityTypeId` — идентификатор типа объекта, `entityId` — идентификатор элемента | — | — ||
|| **direction**
[`string`](../../../data-types.md) | Направление чата. Возможные значения:

- `incoming` — первым написал клиент
- `outgoing` — первым написал сотрудник
- `undefined` — направление не задано | + | — ||
|| **communications**
[`object[]`](../../../data-types.md) | Участники чата: `type` — тип канала связи `IM`, `value` — адрес клиента в открытой линии, `entityTypeId` и `entityId` — элемент CRM участника. Если у вас нет доступа к адресу, в `value` приходит `null` | — | — ||
|| **lineId**
[`integer`](../../../data-types.md) | Идентификатор открытой линии. Его принимает метод [imopenlines.config.get](../../../imopenlines/openlines/imopenlines-config-get.md). `null` — у дела нет ни линии, ни сессии | — | — ||
|| **lineName**
[`string`](../../../data-types.md) | Название открытой линии, `null` — линия удалена | — | — ||
|| **connectorId**
[`string`](../../../data-types.md) | Канал, из которого написал клиент, например `telegrambot`, `whatsappbyedna`, `livechat`. `null` — сессия удалена | — | — ||
|| **sessionId**
[`integer`](../../../data-types.md) | Идентификатор сессии открытой линии. Его принимают методы сессий, например [imopenlines.session.history.get](../../../imopenlines/openlines/sessions/imopenlines-session-history-get.md) | — | — ||
|| **chatId**
[`integer`](../../../data-types.md) | Идентификатор чата сессии. Чтобы прочитать сообщения, передайте его в методы `im.dialog.*` в виде `chat<chatId>`, например в [im.dialog.messages.get](../../../chats/messages/im-dialog-messages-get.md). `null` — сессия удалена | — | — ||
|| **clientVote**
[`integer`](../../../data-types.md) | Оценка сессии клиентом: `5` — понравилось, `1` — не понравилось. `null` — клиент не оценил сессию | — | — ||
|#

Поля `lineName`, `connectorId`, `chatId` и `clientVote` берутся из данных открытых линий. Если открытых линий на Битрикс24 нет, эти поля приходят со значением `null`. Поля `lineId` и `sessionId` хранятся в деле и приходят и в этом случае. Если у вас нет доступа к клиенту чата, `sessionId`, `chatId` и `clientVote` приходят со значением `null`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "В DTO `OpenLineActivityDto` в поле `connectorId` требуется наличие атрибута `Filterable` для такого запроса",
                "field": "connectorId"
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
|| `connectorId` | В DTO `OpenLineActivityDto` в поле `connectorId` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям с отметкой в колонке «Фильтр» таблицы [Элемент items](#items) ||
|| `lineId` | В DTO `OpenLineActivityDto` в поле `lineId` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime` ||
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
|| `-` | Неизвестное поле `phoneNumber` для сущности `OpenLineActivityDto` | Проверьте имена полей в `select`, `filter` и `order` по таблице [Элемент items](#items). Поля `subject`, `description`, `type` и файлы дела возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.openline.list`: лиды выключены на Битрикс24. Включите лиды или запрашивайте чаты другого типа объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.deal.activity.openLine.list` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.openline.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов чатов открытых линий нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-openline-get-rest-v3.md)
- [{#T}](./crm-entity-activity-list-rest-v3.md)
- [{#T}](./crm-entity-activity-call-list-rest-v3.md)
- [{#T}](../../../chats/messages/im-dialog-messages-get.md)
