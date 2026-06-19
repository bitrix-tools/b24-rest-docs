# Получить настройки контроля времени timeman.timecontrol.settings.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.timecontrol.settings.get` получает настройки модуля контроля времени.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.settings.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.settings.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TimecontrolSettingsGetResult = {
      active: boolean
      minimum_idle_for_report: number
      register_offline: boolean
      register_idle: boolean
      register_desktop: boolean
      report_request_type: string
      report_request_users: number[]
      report_simple_type: string
      report_simple_users: number[]
      report_full_type: string
      report_full_users: number[]
    }

    try {
      const response = await $b24.actions.v2.call.make<TimecontrolSettingsGetResult>({
        method: 'timeman.timecontrol.settings.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('active:', result.active, 'report_request_type:', result.report_request_type)
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
      async function getTimecontrolSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.timecontrol.settings.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('active:', result.active, 'report_request_type:', result.report_request_type)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTimecontrolSettings)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.timecontrol.settings.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting time control settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.settings.get',
        {},
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
        'timeman.timecontrol.settings.get',
        []
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
        "active": true,
        "minimum_idle_for_report": 15,
        "register_offline": true,
        "register_idle": true,
        "register_desktop": true,
        "report_request_type": "all",
        "report_request_users": [],
        "report_simple_type": "all",
        "report_simple_users": [],
        "report_full_type": "all",
        "report_full_users": []
    },
    "time": {
        "start": 1748526089.625516,
        "finish": 1748526089.656787,
        "duration": 0.03127098083496094,
        "processing": 0.008746147155761719,
        "date_start": "2025-05-29T16:41:29+03:00",
        "date_finish": "2025-05-29T16:41:29+03:00",
        "operating_reset_at": 1748526689,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **active**
[`boolean`](../../data-types.md) | Активность модуля контроля времени ||
|| **minimum_idle_for_report**
[`integer`](../../data-types.md) | Минимальное время отсутствия в минутах, после которого требуется отчет ||
|| **register_offline**
[`boolean`](../../data-types.md) | Регистрировать офлайн статус ||
|| **register_idle**
[`boolean`](../../data-types.md) | Регистрировать статус Отошел ||
|| **register_desktop**
[`boolean`](../../data-types.md) | Регистрировать статус десктоп приложения ||
|| **report_request_type**
[`string`](../../data-types.md) | Тип запроса отчетов. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **report_request_users**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, для которых требуется запрос отчетов.

Заполнен, если `report_request_type` имеет значение `user` ||
|| **report_simple_type**
[`string`](../../data-types.md) | Тип простого отчета. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **report_simple_users**
[`array`](../../data-types.md) | Массив идентификаторов пользователей с доступом к простому отчету.

Заполнен, если `report_simple_users` имеет значение `user` ||
|| **report_full_type**
[`string`](../../data-types.md) | Тип полного отчета. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **report_full_users**
[`array`](../../data-types.md) | Массив идентификаторов пользователей с доступом к полному отчету.

Заполнен, если `report_full_type` имеет значение `user` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to use this method"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access to use this method | У вас нет доступа к этому методу ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-report-add.md)
- [{#T}](./timeman-timecontrol-reports-get.md)
- [{#T}](./timeman-timecontrol-reports-users-get.md)