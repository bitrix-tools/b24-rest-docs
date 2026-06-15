# Получить список участников обзвона crm.calllist.items.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.items.get` возвращает список участников, контактов или компаний, и статус обзвона. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LIST_ID***
[`integer`](../../data-types.md) | Идентификатор обзвона, можно получить методами [crm.calllist.add](./crm-calllist-add.md) и [crm.calllist.list](./crm-calllist-list.md) ||
|| **FILTER**
[`object`](../../data-types.md) | Фильтр по статусу обзвона элемента: `{ STATUS: "код_статуса" }`. 
Получить значения кодов статусов можно методом [crm.calllist.statuslist](./crm-calllist-statuslist.md)||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":13,"FILTER":{"STATUS":"IN_WORK"}}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":13,"FILTER":{"STATUS":"IN_WORK"},"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.items.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each item returned in result[]
    type CallListItem = {
      ID: number,
      STATUS: string,
      ENTITY_TYPE: number,
    }

    try {
      const response = await $b24.actions.v2.call.make<CallListItem[]>({
        method: 'crm.calllist.items.get',
        params: {
          LIST_ID: 13,
          FILTER: {
            STATUS: 'IN_WORK',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Call list items count:', result.length, result)
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
      async function getCallListItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.calllist.items.get',
            params: {
              LIST_ID: 13,
              FILTER: {
                STATUS: 'IN_WORK',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Call list items count:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCallListItems)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.calllist.items.get',
                [
                    'LIST_ID' => 13,
                    'FILTER' => [
                        'STATUS' => 'IN_WORK'
                    ]
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
        echo 'Error getting call list items: ' . $e->getMessage();
    }
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.calllist.items.get(
            list_id=13,
            filter={
                "STATUS": "IN_WORK",
            },
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

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.items.get",
        {
            LIST_ID: 13,
            FILTER: {
                STATUS: "IN_WORK"
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.calllist.items.get',
        [ 'LIST_ID' => 13, 'FILTER' => [ 'STATUS' => 'IN_WORK' ] ]
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
            "ID": 9,
            "STATUS": "IN_WORK",
            "ENTITY_TYPE": 3
        },
        {
            "ID": 17,
            "STATUS": "IN_WORK",
            "ENTITY_TYPE": 3
        },
        {
            "ID": 19,
            "STATUS": "IN_WORK",
            "ENTITY_TYPE": 3
        }
    ],
    "time": {
        "start": 1752475017.529502,
        "finish": 1752475017.588903,
        "duration": 0.05940103530883789,
        "processing": 0.010075092315673828,
        "date_start": "2025-07-14T09:36:57+03:00",
        "date_finish": "2025-07-14T09:36:57+03:00",
        "operating_reset_at": 1752475617,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив элементов со статусами обзвона и типом объекта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Incorrect list id",
    "error_description": "Передан некорректный идентификатор списка."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `Incorrect list id` | Некорректный идентификатор обзвона ||
|| `400` | `Incorrect status` | Некорректный статус обзвона ||
|| `403` | `Access denied` | Нет доступа к элементам списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md) 