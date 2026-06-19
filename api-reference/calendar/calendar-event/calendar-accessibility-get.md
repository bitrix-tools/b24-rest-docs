# Получить занятость пользователей из списка calendar.accessibility.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает занятость пользователей из списка.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|s
|| **Название**
`тип` | **Описание** ||
|| **users***
[`array`](../../data-types.md) | Массив идентификаторов пользователей ||
|| **from***
[`date`](../../data-types.md) | Дата начала периода для определения занятости в формате `ГГГГ-ММ-ДД`.

Например, `2024-06-20` ||
|| **to***
[`date`](../../data-types.md) | Дата окончания периода для определения занятости в формате `ГГГГ-ММ-ДД`.

Например, `2024-12-20`  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"from":"2024-06-20","to":"2024-12-20","users":[1,2,34]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.accessibility.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"from":"2024-06-20","to":"2024-12-20","users":[1,2,34],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.accessibility.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CalendarEventItem = {
      ID: string
      NAME: string
      DATE_FROM: string
      DATE_TO: string
      DATE_FROM_TS_UTC: string
      DATE_TO_TS_UTC: string
      '~USER_OFFSET_FROM': number
      '~USER_OFFSET_TO': number
      DT_SKIP_TIME: 'Y' | 'N'
      TZ_FROM: string
      TZ_TO: string
      ACCESSIBILITY: 'busy' | 'absent' | 'quest' | 'free'
      IMPORTANCE: 'high' | 'normal' | 'low'
      EVENT_TYPE: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AccessibilityGetResult = Record<string, CalendarEventItem[]>

    try {
      const response = await $b24.actions.v2.call.make<AccessibilityGetResult>({
        method: 'calendar.accessibility.get',
        params: {
          from: '2024-06-20',
          to: '2024-12-20',
          users: [1, 2, 34],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        for (const [userId, events] of Object.entries(result)) {
          console.info(`User ${userId}:`, events.map(e => `${e.NAME} (${e.ACCESSIBILITY})`))
        }
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
      async function getAccessibility() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.accessibility.get',
            params: {
              from: '2024-06-20',
              to: '2024-12-20',
              users: [1, 2, 34],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          for (const [userId, events] of Object.entries(result)) {
            console.info(`User ${userId}:`, events.map(e => `${e.NAME} (${e.ACCESSIBILITY})`))
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAccessibility)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'calendar.accessibility.get',
                [
                    'from'  => '2024-06-20',
                    'to'    => '2024-12-20',
                    'users' => [1, 2, 34]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting calendar accessibility: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.accessibility.get',
        {
            from: '2024-06-20',
            to: '2024-12-20',
            users: [1, 2, 34]
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.accessibility.get',
        [
            'from' => '2024-06-20',
            'to' => '2024-12-20',
            'users' => [1, 2, 34]
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
        "1": [
            {
                "ID": "1213",
                "NAME": "Event name",
                "DATE_FROM": "02.12.2024 11:00:00",
                "DATE_TO": "02.12.2024 12:00:00",
                "DATE_FROM_TS_UTC": "1733158800",
                "DATE_TO_TS_UTC": "1733162400",
                "~USER_OFFSET_FROM": -21600,
                "~USER_OFFSET_TO": -21600,
                "DT_SKIP_TIME": "N",
                "TZ_FROM": "America/Managua",
                "TZ_TO": "America/Managua",
                "ACCESSIBILITY": "busy",
                "IMPORTANCE": "normal",
                "EVENT_TYPE": "#collab#"
            },
            {
                "ID": "1216",
                ...
            }
        ],
        "2": [
            {
                "ID": 1,
                ...
            },
            {
                "ID": 2,
                ...
            }
        ],
        "34": []
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат содержит объект.

Ключ объекта — это идентификатор пользователя из запроса.

Значение — массив объектов, каждый из которых описывает [событие](#event), в котором занят пользователь в указанный период ||
|#

#### Объект события {#event}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор события ||
|| **NAME**
[`string`](../../data-types.md) | Название события ||
|| **DATE_FROM**
[`datetime`](../../data-types.md) | Дата и время начала события ||
|| **DATE_TO**
[`datetime`](../../data-types.md) | Дата и время окончания события ||
|| **DATE_FROM_TS_UTC**
[`string`](../../data-types.md) | Дата и время начала события в UTC в формате timestamp ||
|| **DATE_TO_TS_UTC**
[`string`](../../data-types.md) | Дата и время окончания события в UTC в формате timestamp ||
|| **~USER_OFFSET_FROM**
[`integer`](../../data-types.md) | Смещение времени начала события относительно UTC в секундах ||
|| **~USER_OFFSET_TO**
[`integer`](../../data-types.md) | Смещение времени окончания события относительно UTC в секундах ||
|| **DT_SKIP_TIME**
[`integer`](../../data-types.md) | Флаг отображающий что событие длится целый день. Возможные значения:
- `Y` — целый день
- `N` — не целый день ||
|| **TZ_FROM**
[`integer`](../../data-types.md) | Таймзона даты начала события ||
|| **TZ_TO**
[`integer`](../../data-types.md) | Таймзона даты окончания события ||
|| **ACCESSIBILITY**
[`integer`](../../data-types.md) | Доступность участников события. Возможные значения:

- `busy` — занят
- `absent` — отсутствую
- `quest` — под вопросом
- `free` — свободен ||
|| **IMPORTANCE**
[`string`](../../data-types.md) | Важность события. Возможные значения:

- `high` — высокая
- `normal` — средняя
- `low`— низкая ||
|| **EVENT_TYPE**
[`string`](../../data-types.md) | Некоторые события содержат информацию о способе создания.

Событие может быть создано через:

- `#shared#` — слоты календаря
- `#shared_crm#` — слоты CRM
- `#collab#` — коллабу
- `#shared_collab#` — слоты коллабы
||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "from" для метода "calendar.accessibility.get""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "from" для метода "calendar.accessibility.get" | Не передан обязательный параметр `from` ||
|| Пустая строка | Не задан обязательный параметр "to" для метода "calendar.accessibility.get" | Не передан обязательный параметр `to` ||
|| Пустая строка | Не задан обязательный параметр "users" для метода "calendar.accessibility.get" | Не передан обязательный параметр `users` ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-meeting-status-get.md)
- [{#T}](./calendar-meeting-status-set.md)