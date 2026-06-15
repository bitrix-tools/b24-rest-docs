# Получить список лог-записей таймлайна crm.timeline.logmessage.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `пользователь с правом на чтение элемента CRM, в котором находится запись`

Метод получает список лог-записей таймлайна.

{% note info "" %}

Важно иметь в виду, что метод сможет получить данные только о записях, ранее добавленных с помощью [`crm.timeline.logmessage.add`](./crm-timeline-logmessage-add.md). Системные записи с помощью `crm.timeline.logmessage.list` получить невозможно.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | [Идентификатор типа сущности](../../data-types.md#object_type), для которой нужно получить список лог-записей (например, `1` — лид) ||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор элемента сущности, для которого нужно получить список лог-записей (например, `1`) ||
|| **order**
[`object`](../../../data-types.md) | Список для сортировки, где ключ — поле, а значение — `asc` или `desc`.

По умолчанию используется `desc`.

Сортировка поддерживается только по полям **id** и **created** ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 10 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `10`. Чтобы выбрать третью страницу результатов — значение `20` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 10`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"entityId":1,"order":{"created":"desc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.logmessage.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"entityId":1,"order":{"created":"desc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.logmessage.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each log message returned in result[]
    type LogMessageItem = {
      id: number
      created: ISODate
      authorId: number
      title: string
      text: string
      iconCode: string
    }

    try {
      // crm.timeline.logmessage.list returns a single page (max 10 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<LogMessageItem[]>({
        method: 'crm.timeline.logmessage.list',
        params: {
          entityTypeId: 1,
          entityId: 1,
          order: { created: 'desc' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Log messages:', result.length, result[0]?.title)
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
      async function listLogMessages() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.timeline.logmessage.list returns a single page (max 10 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.logmessage.list',
            params: {
              entityTypeId: 1,
              entityId: 1,
              order: { created: 'desc' },
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
          console.info('Log messages:', result.length, result[0]?.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listLogMessages)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.logmessage.list',
                [
                    'entityTypeId' => 1,
                    'entityId'     => 1,
                    'order'        => ['created' => 'desc'],
                    'start'        => 0,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing log messages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.logmessage.list",
        {
            entityTypeId: 1,
            entityId: 1,
            order: { created: "desc" },
        },
        result => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.dir(result.data());

            if (result.more()) {
                result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.logmessage.list',
        [
            'entityTypeId' => 1,
            'entityId' => 1,
            'order' => ['created' => 'desc'],
            'start' => 0
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
    "result": [
        {
            "id": 42074,
            "created": "2024-04-03T10:26:32+02:00",
            "authorId": 1,
            "title": "Test title new",
            "text": "Test note new",
            "iconCode": "info"
        },
        {
            "id": 42073,
            "created": "2024-04-03T10:26:32+02:00",
            "authorId": 1,
            "title": "Test title",
            "text": "Test note",
            "iconCode": "info"
        }
    ],
    "total": 2,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Корневой элемент ответа.

Поле `result` содержит массив, каждая запись которого содержит ассоциативный массив полей лог-записи [logMessage](./crm-timeline-logmessage-add.md#logMessage) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {entityTypeId}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-logmessage-add.md)
- [{#T}](./crm-timeline-logmessage-get.md)
- [{#T}](./crm-timeline-logmessage-delete.md)
