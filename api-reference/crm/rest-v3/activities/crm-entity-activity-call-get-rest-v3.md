# Получить звонок v 3.0 crm.<тип>.activity.call.get

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

Метод `crm.<тип>.activity.call.get` возвращает звонок телефонии, привязанный к элементу CRM: направление, длительность, исход, запись разговора, комментарий, оценку клиента, линию и номер.

Тип объекта задает сегмент `<тип>` в имени метода: метод находит звонок, только если он привязан хотя бы к одному элементу этого типа. Дела других видов, например встречи и задачи, метод не возвращает. Их и общие поля звонка, например `subject`, возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.call.get` ||
|| Лид | `crm.lead.activity.call.get` ||
|| Контакт | `crm.contact.activity.call.get` ||
|| Компания | `crm.company.activity.call.get` ||
|| Предложение | `crm.quote.activity.call.get` ||
|| Счет | `crm.smartinvoice.activity.call.get` ||
|| Документ CRM | `crm.smartdocument.activity.call.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.call.get`, например `crm.smartprocess1038.activity.call.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.activity.call.get`, а не `crm.smartInvoice.activity.Call.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор звонка — дела с `providerId` = `VOXIMPLANT_CALL`.

Идентификатор можно получить методом [crm.<тип>.activity.call.list](./crm-entity-activity-call-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей звонка, которые нужно вернуть, например `["id","direction","duration","outcome"]`. Доступные поля описаны в таблице [Объект item](#item). Для `bindings`, `communications` и `record` можно выбрать вложенные поля через точку: `record.downloadUrl`.

По умолчанию: все поля звонка ||
|#

Если на `id` дела другого вида, например встречи или чата открытой линии, метод отвечает ошибкой «не найдено».

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.activity.call.get`

{% endnote %}

Примеры получают звонок элемента смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8471,"select":["id","direction","duration","outcome","record","comment","clientVote","portalLine","phoneNumber","assignedById","startTime","bindings"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.activity.call.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8471,"select":["id","direction","duration","outcome","record","comment","clientVote","portalLine","phoneNumber","assignedById","startTime","bindings"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.activity.call.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CallGetResult = {
      item: {
        id: number
        direction: 'incoming' | 'outgoing' | 'undefined'
        duration: number | null
        outcome: string | null
        record: { id: string; name: string; url: string; downloadUrl: string } | null
        comment: string | null
        clientVote: number | null
        portalLine: string | null
        phoneNumber: string | null
        assignedById: number | null
        startTime: string | null
        bindings: Array<{ entityTypeId: number; entityId: number }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CallGetResult>(
        'crm.smartprocess1038.activity.call.get',
        {
          id: 8471,
          select: ['id', 'direction', 'duration', 'outcome', 'record', 'comment', 'clientVote', 'portalLine', 'phoneNumber', 'assignedById', 'startTime', 'bindings'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Call:', result.item)
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
      async function getCall() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.activity.call.get',
            {
              id: 8471,
              select: ['id', 'direction', 'duration', 'outcome', 'record', 'comment', 'clientVote', 'portalLine', 'phoneNumber', 'assignedById', 'startTime', 'bindings'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Call:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCall)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.activity.call.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 8471,
                "select": ["id", "direction", "duration", "outcome", "record", "comment", "clientVote", "portalLine", "phoneNumber", "assignedById", "startTime", "bindings"],
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
                'crm.smartprocess1038.activity.call.get',
                [
                    'id' => 8471,
                    'select' => ['id', 'direction', 'duration', 'outcome', 'record', 'comment', 'clientVote', 'portalLine', 'phoneNumber', 'assignedById', 'startTime', 'bindings'],
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
        'crm.smartprocess1038.activity.call.get',
        {
            id: 8471,
            select: ['id', 'direction', 'duration', 'outcome', 'record', 'comment', 'clientVote', 'portalLine', 'phoneNumber', 'assignedById', 'startTime', 'bindings'],
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
        'crm.smartprocess1038.activity.call.get',
        [
            'id' => 8471,
            'select' => ['id', 'direction', 'duration', 'outcome', 'record', 'comment', 'clientVote', 'portalLine', 'phoneNumber', 'assignedById', 'startTime', 'bindings'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.activity.call.get", b24.Params{
    	"id":     8471,
    	"select": []string{"id", "direction", "duration", "outcome", "record", "comment", "clientVote", "portalLine", "phoneNumber", "assignedById", "startTime", "bindings"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.activity.call.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID        int     `json:"id"`
    		Direction string  `json:"direction"`
    		Duration  *int    `json:"duration"`
    		Outcome   *string `json:"outcome"`
    		Record    *struct {
    			ID          string `json:"id"`
    			Name        string `json:"name"`
    			DownloadURL string `json:"downloadUrl"`
    		} `json:"record"`
    		Comment      *string `json:"comment"`
    		ClientVote   *int    `json:"clientVote"`
    		PortalLine   *string `json:"portalLine"`
    		PhoneNumber  *string `json:"phoneNumber"`
    		AssignedByID *int    `json:"assignedById"`
    		StartTime    *string `json:"startTime"`
    		Bindings     []struct {
    			EntityTypeID int `json:"entityTypeId"`
    			EntityID     int `json:"entityId"`
    		} `json:"bindings"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Direction, result.Item.Outcome)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "direction": "incoming",
            "duration": 95,
            "outcome": "successful",
            "record": {
                "id": "9079",
                "name": "call-001.mp3",
                "url": "/bitrix/tools/crm_show_file.php?fileId=9079&ownerTypeId=6&ownerId=8471",
                "downloadUrl": "/bitrix/tools/crm_show_file.php?fileId=9079&ownerTypeId=6&ownerId=8471"
            },
            "comment": "Клиент просит перезвонить после обеда",
            "clientVote": 5,
            "portalLine": "reg100001",
            "phoneNumber": "+79990000001",
            "id": 8471,
            "assignedById": 1269,
            "startTime": "2026-11-10T11:19:38+03:00",
            "bindings": [
                {
                    "entityTypeId": 1038,
                    "entityId": 41
                },
                {
                    "entityTypeId": 3,
                    "entityId": 797
                }
            ]
        }
    },
    "time": {
        "start": 1795430968,
        "finish": 1795430968.363972,
        "duration": 0.3639719486236572,
        "processing": 0,
        "date_start": "2026-11-23T13:49:28+03:00",
        "date_finish": "2026-11-23T13:49:28+03:00",
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
[`object`](../../../data-types.md) | Звонок с полями из `select`, без `select` — со всеми полями. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Все поля только для чтения: звонки создает и меняет телефония. Колонки «Фильтр» и «Сортировка» относятся к методу [crm.<тип>.activity.call.list](./crm-entity-activity-call-list-rest-v3.md).

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
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязан звонок. [Описание объекта](#bindings) | — | — ||
|| **direction**
[`string`](../../../data-types.md) | Направление звонка. Возможные значения:

- `incoming` — входящий
- `outgoing` — исходящий
- `undefined` — направление не задано | + | — ||
|| **communications**
[`object[]`](../../../data-types.md) | Участники звонка. [Описание объекта](#communications) | — | — ||
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
[`object`](../../../data-types.md) | Запись разговора — первый аудиофайл звонка, `null` — записи нет. [Описание объекта](#record) | — | — ||
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

#### Объект bindings {#bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM, например `2` — сделка, `3` — контакт ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM ||
|#

#### Объект communications {#communications}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип канала связи, у звонков `PHONE` ||
|| **value**
[`string`](../../../data-types.md) | Номер телефона. Если у вас нет доступа к адресу, приходит `null` ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM участника ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM участника ||
|#

#### Объект record {#record}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор файла записи ||
|| **name**
[`string`](../../../data-types.md) | Имя файла, например `call-001.mp3` ||
|| **url**
[`string`](../../../data-types.md) | Относительная ссылка для просмотра файла ||
|| **downloadUrl**
[`string`](../../../data-types.md) | Относительная ссылка для скачивания файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `7593` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` звонка ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|#

#### Звонок не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `7593` не найдена | Дела нет, это не звонок, звонок не привязан к элементу этого типа объекта или у вас нет права на его просмотр. Проверьте `id` методом [crm.<тип>.activity.call.list](./crm-entity-activity-call-list-rest-v3.md) и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `subject` для сущности `CallActivityDto` | Проверьте имена полей в `select` по таблице [Объект item](#item). Поля `subject`, `description`, `type` и файлы дела возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md) ||
|| `-` | Неизвестное поле `foo` для сущности `FileDto` | Проверьте вложенное поле записи в `select`: `record.id`, `record.name`, `record.url`, `record.downloadUrl` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.call.get`: лиды выключены на Битрикс24. Включите лиды или читайте звонок через тип объекта, к которому он тоже привязан ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.deal.activity.Call.get` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.call.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов звонков нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-call-list-rest-v3.md)
- [{#T}](./crm-entity-activity-get-rest-v3.md)
- [{#T}](./crm-entity-activity-openline-get-rest-v3.md)
