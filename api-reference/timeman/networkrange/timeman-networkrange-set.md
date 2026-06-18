# Установить диапазон сетевых адресов timeman.networkrange.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.networkrange.set` устанавливает диапазоны сетевых адресов для офисной сети.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **RANGES***
[`string`](../../data-types.md) | Диапазоны сетевых адресов в виде списка объектов. Каждый объект содержит описание [диапазона сетевых адресов](#ip_range).

```php
ranges: [
    {
        "ip_range": "10.0.0.0-10.255.255.255",
        "name": "Офисная сеть 10.x.x.x"
    },
    {
        "ip_range": "10.10.0.1",
        "name": "Адрес 10.10.0.1"
    },
    ...
]
```

Диапазон может содержать:
- блок адресов, например, `10.0.0.0-10.255.255.255`
- один адрес, например, `10.10.0.1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ranges":[{"ip_range":"10.0.0.0-10.255.255.255","name":"Офисная сеть 10.x.x.x"},{"ip_range":"172.16.0.0-172.31.255.255","name":"Офисная сеть 172.x.x.x"},{"ip_range":"192.168.0.0-192.168.255.255","name":"Офисная сеть 192.168.x.x"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.networkrange.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ranges":[{"ip_range":"10.0.0.0-10.255.255.255","name":"Офисная сеть 10.x.x.x"},{"ip_range":"172.16.0.0-172.31.255.255","name":"Офисная сеть 172.x.x.x"},{"ip_range":"192.168.0.0-192.168.255.255","name":"Офисная сеть 192.168.x.x"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.networkrange.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NetworkRangeSetResult = {
      result: boolean
      error_ranges?: Array<{
        ip_range: string
        name: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<NetworkRangeSetResult>({
        method: 'timeman.networkrange.set',
        params: {
          ranges: [
            {
              ip_range: '10.0.0.0-10.255.255.255',
              name: 'Office network 10.x.x.x',
            },
            {
              ip_range: '172.16.0.0-172.31.255.255',
              name: 'Office network 172.x.x.x',
            },
            {
              ip_range: '192.168.0.0-192.168.255.255',
              name: 'Office network 192.168.x.x',
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Set result:', result.result, 'Error ranges:', result.error_ranges)
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
      async function setNetworkRanges() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'timeman.networkrange.set',
            params: {
              ranges: [
                {
                  ip_range: '10.0.0.0-10.255.255.255',
                  name: 'Office network 10.x.x.x',
                },
                {
                  ip_range: '172.16.0.0-172.31.255.255',
                  name: 'Office network 172.x.x.x',
                },
                {
                  ip_range: '192.168.0.0-192.168.255.255',
                  name: 'Office network 192.168.x.x',
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Set result:', result.result, 'Error ranges:', result.error_ranges)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setNetworkRanges)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'timeman.networkrange.set',
                [
                    'ranges' => [
                        [
                            "ip_range" => "10.0.0.0-10.255.255.255",
                            "name"     => "Офисная сеть 10.x.x.x"
                        ],
                        [
                            "ip_range" => "172.16.0.0-172.31.255.255",
                            "name"     => "Офисная сеть 172.x.x.x"
                        ],
                        [
                            "ip_range" => "192.168.0.0-192.168.255.255",
                            "name"     => "Офисная сеть 192.168.x.x"
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting network ranges: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.networkrange.set',
        {
            ranges: [
                {
                    "ip_range": "10.0.0.0-10.255.255.255",
                    "name": "Офисная сеть 10.x.x.x"
                },
                {
                    "ip_range": "172.16.0.0-172.31.255.255",
                    "name": "Офисная сеть 172.x.x.x"
                },
                {
                    "ip_range": "192.168.0.0-192.168.255.255",
                    "name": "Офисная сеть 192.168.x.x"
                }
            ]
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
        'timeman.networkrange.set',
        [
            'ranges' => [
                [
                    'ip_range' => '10.0.0.0-10.255.255.255',
                    'name' => 'Офисная сеть 10.x.x.x'
                ],
                [
                    'ip_range' => '172.16.0.0-172.31.255.255',
                    'name' => 'Офисная сеть 172.x.x.x'
                ],
                [
                    'ip_range' => '192.168.0.0-192.168.255.255',
                    'name' => 'Офисная сеть 192.168.x.x'
                ]
            ]
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
        "result": true
    },
    "time": {
        "start": 1742999863.0244141,
        "finish": 1742999863.057137,
        "duration": 0.03272294998168945,
        "processing": 0.0023658275604248047,
        "date_start": "2025-03-26T17:37:43+03:00",
        "date_finish": "2025-03-26T17:37:43+03:00",
        "operating_reset_at": 1743000463,
        "operating": 0
    }
}
```

### При возникновении ошибки разбора диапазонов

HTTP-статус: **200**

```json
{
    "result": {
        "result": false,
        "error_ranges": [
            {
                "ip_range": "a172.16.0.0-172.31.255.255",
                "name": "Офисная сеть 172.x.x.x"
            }
        ]
    },
    "time": {
        "start": 1743058773.526674,
        "finish": 1743058773.5625639,
        "duration": 0.035889863967895508,
        "processing": 0.0005609989166259766,
        "date_start": "2025-03-27T09:59:33+03:00",
        "date_finish": "2025-03-27T09:59:33+03:00",
        "operating_reset_at": 1743059373,
        "operating": 0
    }
}
```


### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа. Может иметь значения:
- `true` — все диапазоны успешно установлены
- `false` — есть диапазоны с ошибками ||
|| **error_range**
 [`array`](../../data-types.md) | Массив [диапазонов](#ip_range), в которых были найдены ошибки ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект диапазона {#ip_range}

#|
|| **Название**
`тип` | **Описание** ||
|| **ip_range**
 [`string`](../../data-types.md) | Диапазон сетевых адресов ||
|| **name**
 [`string`](../../data-types.md) | Название диапазона ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "INVALID_FORMAT",
    "error_description": "A wrong format for the RANGES field is passed"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access to use this method | Метод доступен только администратору ||
|| `INVALID_FORMAT` | A wrong format for the RANGES field is passed | Передан некорректный формат в параметре `RANGES` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-networkrange-get.md)
- [{#T}](./timeman-networkrange-check.md)
