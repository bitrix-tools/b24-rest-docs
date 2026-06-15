# Проверить IP-адрес timeman.networkrange.check

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.networkrange.check` проверяет IP-адрес на вхождение в диапазоны сетевых адресов офисной сети.

Для корректной работы метода должен быть установлен хотя бы один диапазон.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **IP**
[`string`](../../data-types.md) | IP-адрес, который нужно проверить. Например `10.10.255.25`.

Если не указать — проверка будет выполнена для текущего IP-адреса ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IP":"10.10.255.255"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.networkrange.check
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IP":"10.10.255.255","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.networkrange.check
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NetworkRangeCheckResult = {
      ip: string
      range: string
      name: string
    } | false

    try {
      const response = await $b24.actions.v2.call.make<NetworkRangeCheckResult>({
        method: 'timeman.networkrange.check',
        params: {
          IP: '10.10.255.255',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        if (result) {
          console.info(result.ip, result.range, result.name)
        } else {
          console.info('IP address is not in any network range')
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
      async function checkNetworkRange() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.networkrange.check',
            params: {
              IP: '10.10.255.255',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          if (result) {
            console.info(result.ip, result.range, result.name)
          } else {
            console.info('IP address is not in any network range')
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', checkNetworkRange)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.networkrange.check',
                [
                    'IP' => '10.10.255.255'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking network range: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.networkrange.check',
        {
            'IP': '10.10.255.255'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'timeman.networkrange.check',
        [
            'IP' => '10.10.255.255'
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
        "ip": "10.10.255.255",
        "range": "10.0.0.0-10.255.255.255",
        "name": "10.x.x.x"
    },
    "time": {
        "start": 1742997578.1675889,
        "finish": 1742997578.205729,
        "duration": 0.038140058517456055,
        "processing": 0.0028028488159179688,
        "date_start": "2025-03-26T16:59:38+03:00",
        "date_finish": "2025-03-26T16:59:38+03:00",
        "operating_reset_at": 1742998178,
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

Содержит объект c описанием диапазона, в который входит IP-адрес.

Вернет `false` если IP-адрес не входит ни в один диапазон офисной сети ||
|| **ip**
 [`string`](../../data-types.md) | IP-адрес, который был проверен ||
|| **range**
 [`string`](../../data-types.md) | Диапазон, в который входит IP-адрес ||
|| **name**
 [`string`](../../data-types.md) | Название диапазона, в который входит IP-адрес ||
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
|| `ACCESS_ERROR` | You don't have access to use this method | Метод доступен только администратору ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-networkrange-get.md)
- [{#T}](./timeman-networkrange-set.md)