# Получить чат открытой линии v 3.0 crm.<тип>.activity.openline.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр дела

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.openline.get` возвращает чат открытой линии, привязанный к элементу CRM: направление, открытую линию, канал, сессию, чат и оценку клиента.

Тип объекта задает сегмент `<тип>` в имени метода: метод находит чат, только если он привязан хотя бы к одному элементу этого типа. Дела других видов, например звонки и встречи, метод не возвращает. Их и общие поля дела, например `subject`, возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.openline.get` ||
|| Лид | `crm.lead.activity.openline.get` ||
|| Контакт | `crm.contact.activity.openline.get` ||
|| Компания | `crm.company.activity.openline.get` ||
|| Предложение | `crm.quote.activity.openline.get` ||
|| Счет | `crm.smartinvoice.activity.openline.get` ||
|| Документ CRM | `crm.smartdocument.activity.openline.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.openline.get`, например `crm.smartprocess1038.activity.openline.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.deal.activity.openline.get`, а не `crm.deal.activity.openLine.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор чата — дела с `providerId` = `IMOPENLINES_SESSION`.

Идентификатор можно получить методом [crm.<тип>.activity.openline.list](./crm-entity-activity-openline-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей чата, которые нужно вернуть, например `["id","connectorId","sessionId","chatId"]`. Доступные поля описаны в таблице [Объект item](#item). Для `bindings` и `communications` можно выбрать вложенные поля через точку: `bindings.entityId`.

По умолчанию: все поля чата ||
|#

Если на `id` дела другого вида, например звонка, метод отвечает ошибкой «не найдено».

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.activity.openline.get`

{% endnote %}

Примеры получают чат открытой линии элемента смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8135,"select":["id","direction","lineId","lineName","connectorId","sessionId","chatId","clientVote","isCompleted","startTime","bindings"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.activity.openline.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8135,"select":["id","direction","lineId","lineName","connectorId","sessionId","chatId","clientVote","isCompleted","startTime","bindings"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.activity.openline.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OpenLineGetResult = {
      item: {
        id: number
        direction: 'incoming' | 'outgoing' | 'undefined'
        lineId: number | null
        lineName: string | null
        connectorId: string | null
        sessionId: number | null
        chatId: number | null
        clientVote: number | null
        isCompleted: boolean
        startTime: string | null
        bindings: Array<{ entityTypeId: number; entityId: number }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<OpenLineGetResult>(
        'crm.smartprocess1038.activity.openline.get',
        {
          id: 8135,
          select: ['id', 'direction', 'lineId', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime', 'bindings'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Open line chat:', result.item)
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
      async function getOpenLineChat() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.activity.openline.get',
            {
              id: 8135,
              select: ['id', 'direction', 'lineId', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime', 'bindings'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Open line chat:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOpenLineChat)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.activity.openline.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 8135,
                "select": ["id", "direction", "lineId", "lineName", "connectorId", "sessionId", "chatId", "clientVote", "isCompleted", "startTime", "bindings"],
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
                'crm.smartprocess1038.activity.openline.get',
                [
                    'id' => 8135,
                    'select' => ['id', 'direction', 'lineId', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime', 'bindings'],
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
        'crm.smartprocess1038.activity.openline.get',
        {
            id: 8135,
            select: ['id', 'direction', 'lineId', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime', 'bindings'],
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
        'crm.smartprocess1038.activity.openline.get',
        [
            'id' => 8135,
            'select' => ['id', 'direction', 'lineId', 'lineName', 'connectorId', 'sessionId', 'chatId', 'clientVote', 'isCompleted', 'startTime', 'bindings'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.activity.openline.get", b24.Params{
    	"id":     8135,
    	"select": []string{"id", "direction", "lineId", "lineName", "connectorId", "sessionId", "chatId", "clientVote", "isCompleted", "startTime", "bindings"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.activity.openline.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID          int     `json:"id"`
    		Direction   string  `json:"direction"`
    		LineID      *int    `json:"lineId"`
    		LineName    *string `json:"lineName"`
    		ConnectorID *string `json:"connectorId"`
    		SessionID   *int    `json:"sessionId"`
    		ChatID      *int    `json:"chatId"`
    		ClientVote  *int    `json:"clientVote"`
    		IsCompleted bool    `json:"isCompleted"`
    		StartTime   *string `json:"startTime"`
    		Bindings    []struct {
    			EntityTypeID int `json:"entityTypeId"`
    			EntityID     int `json:"entityId"`
    		} `json:"bindings"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.ConnectorID, result.Item.ChatID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "direction": "incoming",
            "lineId": 17,
            "lineName": "Поддержка клиентов",
            "connectorId": "telegrambot",
            "sessionId": 791,
            "chatId": 4531,
            "clientVote": 5,
            "id": 8135,
            "isCompleted": true,
            "startTime": "2026-08-25T16:16:04+03:00",
            "bindings": [
                {
                    "entityTypeId": 1038,
                    "entityId": 41
                }
            ]
        }
    },
    "time": {
        "start": 1795430953,
        "finish": 1795430953.913458,
        "duration": 0.9134581089019775,
        "processing": 0,
        "date_start": "2026-11-23T13:49:13+03:00",
        "date_finish": "2026-11-23T13:49:13+03:00",
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
|| **result.item**
[`object`](../../../data-types.md) | Чат открытой линии с полями из `select`, без `select` — со всеми полями. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Все поля только для чтения: чаты создают и меняют открытые линии. Колонки «Фильтр» и «Сортировка» относятся к методу [crm.<тип>.activity.openline.list](./crm-entity-activity-openline-list-rest-v3.md).

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
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязан чат. [Описание объекта](#bindings) | — | — ||
|| **direction**
[`string`](../../../data-types.md) | Направление чата. Возможные значения:

- `incoming` — первым написал клиент
- `outgoing` — первым написал сотрудник
- `undefined` — направление не задано | + | — ||
|| **communications**
[`object[]`](../../../data-types.md) | Участники чата. [Описание объекта](#communications) | — | — ||
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

Сообщения чата метод не возвращает: их читают методы чатов по `chatId`.

#### Объект bindings {#bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM, например `1` — лид, `2` — сделка ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM ||
|#

#### Объект communications {#communications}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип канала связи, у чатов `IM` ||
|| **value**
[`string`](../../../data-types.md) | Адрес клиента в открытой линии: префикс `imol`, канал, идентификатор линии, идентификатор клиента в канале и идентификатор чата через вертикальную черту. Если у вас нет доступа к адресу, приходит `null` ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM участника ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM участника ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `7989` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` чата ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|#

#### Чат не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `7989` не найдена | Дела нет, это не чат открытой линии, чат не привязан к элементу этого типа объекта или у вас нет права на его просмотр. Проверьте `id` методом [crm.<тип>.activity.openline.list](./crm-entity-activity-openline-list-rest-v3.md) и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `OpenLineActivityDto` | Проверьте имена полей в `select` по таблице [Объект item](#item). Поля `subject`, `description`, `type` и файлы дела возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.openline.get`: лиды выключены на Битрикс24. Включите лиды или читайте чат через тип объекта, к которому он тоже привязан ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.deal.activity.openLine.get` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.openline.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов чатов открытых линий нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-openline-list-rest-v3.md)
- [{#T}](./crm-entity-activity-get-rest-v3.md)
- [{#T}](./crm-entity-activity-call-get-rest-v3.md)
- [{#T}](../../../imopenlines/openlines/sessions/imopenlines-session-history-get.md)
