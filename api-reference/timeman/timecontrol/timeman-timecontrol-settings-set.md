# Установить настройки контроля времени timeman.timecontrol.settings.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, в облачном Битрикс24 также интегратор

Метод `timeman.timecontrol.settings.set` устанавливает настройки контроля времени. Передавайте только те настройки, которые нужно изменить: остальные метод оставит как есть. Текущие значения возвращает метод [timeman.timecontrol.settings.get](./timeman-timecontrol-settings-get.md).

Тип отчета и список пользователей передавайте вместе: если передать только тип, метод очистит список пользователей. Это касается пар:

- `REPORT_REQUEST_TYPE` и `REPORT_REQUEST_USERS`
- `REPORT_SIMPLE_TYPE` и `REPORT_SIMPLE_USERS`
- `REPORT_FULL_TYPE` и `REPORT_FULL_USERS`

{% note warning "" %}

Битрикс24 собирает данные контроля времени только после того, как вы включите регистрацию статусов. За период до включения данных не будет.

{% endnote %}

## Параметры метода

Все параметры необязательные.

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIVE**
[`boolean`](../../data-types.md) | Включает и выключает контроль времени. Возможные значения:
- `true` или `1` — включить
- `false` или `0` — выключить ||
|| **MINIMUM_IDLE_FOR_REPORT**
[`integer`](../../data-types.md) | Минимальное время отсутствия в минутах, после которого требуется отчет. Значение `0` и меньше метод сохранит как `1` ||
|| **REGISTER_OFFLINE**
[`boolean`](../../data-types.md) | Регистрировать офлайн статус ||
|| **REGISTER_IDLE**
[`boolean`](../../data-types.md) | Регистрировать статус Отошел ||
|| **REGISTER_DESKTOP**
[`boolean`](../../data-types.md) | Регистрировать статус десктоп приложения ||
|| **REPORT_REQUEST_TYPE**
[`string`](../../data-types.md) | Тип запроса отчетов. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **REPORT_REQUEST_USERS**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, для которых требуется запрос отчетов.

Передайте, если `REPORT_REQUEST_TYPE` имеет значение `user` ||
|| **REPORT_SIMPLE_TYPE**
[`string`](../../data-types.md) | Тип простого отчета. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого. Метод сохранит значение `user` с пустым списком пользователей ||
|| **REPORT_SIMPLE_USERS**
[`array`](../../data-types.md) | Массив идентификаторов пользователей с доступом к простому отчету.

Передайте, если `REPORT_SIMPLE_TYPE` имеет значение `user` ||
|| **REPORT_FULL_TYPE**
[`string`](../../data-types.md) | Тип полного отчета. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого. Метод сохранит значение `user` с пустым списком пользователей ||
|| **REPORT_FULL_USERS**
[`array`](../../data-types.md) | Массив идентификаторов пользователей с доступом к полному отчету.

Передайте, если `REPORT_FULL_TYPE` имеет значение `user` ||
|#

{% note warning "" %}

Если вы передаете параметры формой, а не в JSON-теле, значение `false` у флагов `ACTIVE`, `REGISTER_OFFLINE`, `REGISTER_IDLE` и `REGISTER_DESKTOP` придет строкой, и метод примет его за включение. Чтобы выключить флаг, передайте `0`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ACTIVE":true,"MINIMUM_IDLE_FOR_REPORT":15,"REGISTER_OFFLINE":true,"REGISTER_IDLE":true,"REGISTER_DESKTOP":true,"REPORT_REQUEST_TYPE":"all","REPORT_SIMPLE_TYPE":"all","REPORT_FULL_TYPE":"all"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.settings.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ACTIVE":true,"MINIMUM_IDLE_FOR_REPORT":15,"REGISTER_OFFLINE":true,"REGISTER_IDLE":true,"REGISTER_DESKTOP":true,"REPORT_REQUEST_TYPE":"all","REPORT_SIMPLE_TYPE":"all","REPORT_FULL_TYPE":"all","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.settings.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'timeman.timecontrol.settings.set',
        params: {
          ACTIVE: true,
          MINIMUM_IDLE_FOR_REPORT: 15,
          REGISTER_OFFLINE: true,
          REGISTER_IDLE: true,
          REGISTER_DESKTOP: true,
          REPORT_REQUEST_TYPE: 'all',
          REPORT_SIMPLE_TYPE: 'all',
          REPORT_FULL_TYPE: 'all',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Settings saved:', result)
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
      async function setTimeControlSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.timecontrol.settings.set',
            params: {
              ACTIVE: true,
              MINIMUM_IDLE_FOR_REPORT: 15,
              REGISTER_OFFLINE: true,
              REGISTER_IDLE: true,
              REGISTER_DESKTOP: true,
              REPORT_REQUEST_TYPE: 'all',
              REPORT_SIMPLE_TYPE: 'all',
              REPORT_FULL_TYPE: 'all',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Settings saved:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setTimeControlSettings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.timeman.timecontrol.settings.set(
            active=True,
            minimum_idle_for_report=15,
            register_offline=True,
            register_idle=True,
            register_desktop=True,
            report_request_type="all",
            report_simple_type="all",
            report_full_type="all",
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.timecontrol.settings.set',
                [
                    'ACTIVE'                 => true,
                    'MINIMUM_IDLE_FOR_REPORT' => 15,
                    'REGISTER_OFFLINE'        => true,
                    'REGISTER_IDLE'           => true,
                    'REGISTER_DESKTOP'        => true,
                    'REPORT_REQUEST_TYPE'     => 'all',
                    'REPORT_SIMPLE_TYPE'      => 'all',
                    'REPORT_FULL_TYPE'        => 'all',
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
        echo 'Error setting time control settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.settings.set',
        {
            'ACTIVE': true,
            'MINIMUM_IDLE_FOR_REPORT': 15,
            'REGISTER_OFFLINE': true,
            'REGISTER_IDLE': true,
            'REGISTER_DESKTOP': true,
            'REPORT_REQUEST_TYPE': 'all',
            'REPORT_SIMPLE_TYPE': 'all',
            'REPORT_FULL_TYPE': 'all'
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
        'timeman.timecontrol.settings.set',
        [
            'ACTIVE' => true,
            'MINIMUM_IDLE_FOR_REPORT' => 15,
            'REGISTER_OFFLINE' => true,
            'REGISTER_IDLE' => true,
            'REGISTER_DESKTOP' => true,
            'REPORT_REQUEST_TYPE' => 'all',
            'REPORT_SIMPLE_TYPE' => 'all',
            'REPORT_FULL_TYPE' => 'all'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "timeman.timecontrol.settings.set", b24.Params{
    	"ACTIVE":                  true,
    	"MINIMUM_IDLE_FOR_REPORT": 15,
    	"REGISTER_OFFLINE":        true,
    	"REGISTER_IDLE":           true,
    	"REGISTER_DESKTOP":        true,
    	"REPORT_REQUEST_TYPE":     "all",
    	"REPORT_SIMPLE_TYPE":      "all",
    	"REPORT_FULL_TYPE":        "all",
    })
    if err != nil {
    	return fmt.Errorf("timeman.timecontrol.settings.set: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
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
[`boolean`](../../data-types.md) | Результат выполнения.

Возвращает `true`, если настройки успешно сохранены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to user this method"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `TIMEMAN_TOOL_DISABLED` | Учет рабочего времени отключен. | Инструмент Учет рабочего времени отключен ||
|| `ACCESS_ERROR` | You don't have access to user this method | Метод вызвал не администратор. В облачном Битрикс24 метод доступен также интегратору ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-report-add.md)
- [{#T}](./timeman-timecontrol-reports-get.md)
- [{#T}](./timeman-timecontrol-reports-users-get.md)
