# Получить настройки рабочего времени пользователя timeman.settings

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.settings` получает настройки рабочего времени пользователя.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя.

По умолчанию — идентификатор текущего пользователя ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.settings
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":503,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.settings
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TimemanSettingsResult = {
      UF_TIMEMAN: boolean
      UF_TM_FREE: boolean
      UF_TM_MAX_START: string
      UF_TM_MIN_FINISH: string
      UF_TM_MIN_DURATION: string
      UF_TM_ALLOWED_DELTA: string
      ADMIN: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<TimemanSettingsResult>({
        method: 'timeman.settings',
        params: {
          USER_ID: 503,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Time tracking enabled:', result.UF_TIMEMAN, 'Free schedule:', result.UF_TM_FREE, 'Admin:', result.ADMIN)
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
      async function fetchTimemanSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.settings',
            params: {
              USER_ID: 503,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Time tracking enabled:', result.UF_TIMEMAN, 'Free schedule:', result.UF_TM_FREE, 'Admin:', result.ADMIN)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchTimemanSettings)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.settings',
                [
                    'USER_ID' => 503
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching timeman settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.settings',
        {
            'USER_ID' : 503
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'timeman.settings',
        [
            'USER_ID' => 503
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
        "UF_TIMEMAN": true,
        "UF_TM_FREE": false,
        "UF_TM_MAX_START": "09:15:00",
        "UF_TM_MIN_FINISH": "17:45:00",
        "UF_TM_MIN_DURATION": "08:00:00",
        "UF_TM_ALLOWED_DELTA": "00:15:00",
        "ADMIN": true
    },
    "time": {
        "start": 1742994169.701416,
        "finish": 1742994169.7355511,
        "duration": 0.03413510322570801,
        "processing": 0.0076749324798583984,
        "date_start": "2025-03-26T16:02:49+03:00",
        "date_finish": "2025-03-26T16:02:49+03:00",
        "operating_reset_at": 1742994769,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа.

Содержит объект c описанием настроек рабочего времени пользователя ||
|| **UF_TIMEMAN**
[`boolean`](../../data-types.md) | Включен ли учет рабочего времени для пользователя.

Имеет значение `true` если включен ||
|| **UF_TM_FREE**
[`boolean`](../../data-types.md) | Включен ли для пользователя свободный график работы.

Имеет значение `true` если включен.

Пользователю со свободным графиком не нужно подтверждать у руководителя изменения рабочего времени и указывать причины изменений ||
|| **UF_TM_MAX_START**
[`string`](../../data-types.md) | Максимальное время начала рабочего дня в формате `HH:MM:SS`.

Начало рабочего дня позже установленного времени считается нарушением ||
|| **UF_TM_MIN_FINISH**
[`string`](../../data-types.md) | Минимальное время завершения рабочего дня в формате `HH:MM:SS`.

Завершение рабочего дня раньше установленного времени считается нарушением ||
|| **UF_TM_MIN_DURATION**
[`string`](../../data-types.md) | Минимальная длительность рабочего дня в формате `HH:MM:SS`.

Рабочий день, длительность которого меньше установленной, считается нарушением ||
|| **UF_TM_ALLOWED_DELTA**
[`string`](../../data-types.md) | Допустимый промежуток изменения рабочего времени в формате `HH:MM:SS`.

Изменение рабочего дня на период меньше установленного не требует подтверждения руководителя ||
|| **ADMIN**
[`boolean`](../../data-types.md) | Может ли пользователь управлять рабочими днями других сотрудников. Возвращается только для текущего пользователя.

Имеет значение `true` если права есть ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"",
    "error_description":"User not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| пустая строка | User not found | Пользователь с указанным `USER_ID` не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-open.md)
- [{#T}](./timeman-pause.md)
- [{#T}](./timeman-close.md)
- [{#T}](./timeman-status.md)