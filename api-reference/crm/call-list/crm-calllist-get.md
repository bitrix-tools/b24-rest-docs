# Получить информацию о деле обзвона crm.calllist.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.get` возвращает информацию о деле обзвона по его идентификатору, без списка участников.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../data-types.md) | Идентификатор дела обзвона ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"ID":123}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"ID":123,"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CallListGetResult = {
      ID: string
      DATE_CREATE: ISODate | null
      CREATED_BY_ID: string
      WEBFORM_ID: string
      ENTITY_TYPE_ID: string
      ENTITY_TYPE: string
    }

    try {
      const response = await $b24.actions.v2.call.make<CallListGetResult>({
        method: 'crm.calllist.get',
        params: {
          ID: 123,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.ID, result.ENTITY_TYPE, result.DATE_CREATE)
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
      async function getCallList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.calllist.get',
            params: {
              ID: 123,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.ID, result.ENTITY_TYPE, result.DATE_CREATE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCallList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.calllist.get',
                [
                    'ID' => 123,
                ]
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
        echo 'Error getting call list: ' . $e->getMessage();
    }
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.calllist.get(
            bitrix_id=123,
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
        "crm.calllist.get",
        { ID: 123 },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.calllist.get',
        [ 'ID' => 123 ]
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
        "ID": "13",
        "DATE_CREATE": "2025-07-14 08:47:19",
        "CREATED_BY_ID": "29",
        "WEBFORM_ID": "1",
        "ENTITY_TYPE_ID": "3",
        "ENTITY_TYPE": "CONTACT"
    },
    "time": {
        "start": 1752472572.278248,
        "finish": 1752472572.332555,
        "duration": 0.054306983947753906,
        "processing": 0.004546165466308594,
        "date_start": "2025-07-14T08:56:12+03:00",
        "date_finish": "2025-07-14T08:56:12+03:00",
        "operating_reset_at": 1752473172,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор обзвона ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания обзвона ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал обзвон ||
|| **WEBFORM_ID**
[`integer`](../../data-types.md) | Идентификатор связанной CRM-формы ||
|| **ENTITY_TYPE_ID**
[`integer`](../../data-types.md) | Идентификатор типа объекта ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта ||
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
|| `400` | `Incorrect list id` | Некорректный идентификатор списка или у пользователя нет прав на чтение ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md) 