# Получить информацию о деле по идентификатору crm.activity.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.get` возвращает информацию о деле по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор дела в таймлайне, например `999` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
     curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{ "id":999 }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ActivityGetResult = {
      ID: string
      OWNER_ID: string
      OWNER_TYPE_ID: string
      TYPE_ID: string
      PROVIDER_ID: string
      PROVIDER_TYPE_ID: string
      PROVIDER_GROUP_ID: string | null
      ASSOCIATED_ENTITY_ID: string
      SUBJECT: string
      CREATED: ISODate
      LAST_UPDATED: ISODate
      START_TIME: ISODate
      END_TIME: ISODate
      DEADLINE: ISODate
      COMPLETED: string
      STATUS: string
      RESPONSIBLE_ID: string
      PRIORITY: string
      NOTIFY_TYPE: string
      NOTIFY_VALUE: string
      DESCRIPTION: string
      DESCRIPTION_TYPE: string
      DIRECTION: string
      LOCATION: string
      SETTINGS: unknown[]
      ORIGINATOR_ID: string | null
      ORIGIN_ID: string | null
      AUTHOR_ID: string
      EDITOR_ID: string
      PROVIDER_PARAMS: unknown[]
      PROVIDER_DATA: string | null
      RESULT_MARK: string
      RESULT_VALUE: unknown | null
      RESULT_SUM: unknown | null
      RESULT_CURRENCY_ID: string | null
      RESULT_STATUS: string
      RESULT_STREAM: string
      RESULT_SOURCE_ID: string | null
      AUTOCOMPLETE_RULE: string
    }

    try {
      const response = await $b24.actions.v2.call.make<ActivityGetResult>({
        method: 'crm.activity.get',
        params: {
          id: 999,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Activity:', result.ID, result.SUBJECT, result.STATUS)
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
      async function getActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.get',
            params: {
              id: 999,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Activity:', result.ID, result.SUBJECT, result.STATUS)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getActivity)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.get',
                [
                    'id' => 999,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.get',
        {
            id: 999,
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

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.get',
        [
            'id' => 999
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.activity.get(
            bitrix_id=999,
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "999",
        "OWNER_ID": "15",
        "OWNER_TYPE_ID": "3",
        "TYPE_ID": "2",
        "PROVIDER_ID": "VOXIMPLANT_CALL",
        "PROVIDER_TYPE_ID": "CALL",
        "PROVIDER_GROUP_ID": null,
        "ASSOCIATED_ENTITY_ID": "0",
        "SUBJECT": "Исходящий звонок Андрей Николаев",
        "CREATED": "2020-09-27T13:26:55+03:00",
        "LAST_UPDATED": "2021-03-21T20:28:24+03:00",
        "START_TIME": "2020-09-27T13:25:00+03:00",
        "END_TIME": "2020-09-27T19:25:00+03:00",
        "DEADLINE": "2020-09-27T13:25:00+03:00",
        "COMPLETED": "Y",
        "STATUS": "2",
        "RESPONSIBLE_ID": "505",
        "PRIORITY": "2",
        "NOTIFY_TYPE": "1",
        "NOTIFY_VALUE": "15",
        "DESCRIPTION": "",
        "DESCRIPTION_TYPE": "1",
        "DIRECTION": "2",
        "LOCATION": "",
        "SETTINGS": [],
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "AUTHOR_ID": "505",
        "EDITOR_ID": "505",
        "PROVIDER_PARAMS": [],
        "PROVIDER_DATA": null,
        "RESULT_MARK": "0",
        "RESULT_VALUE": null,
        "RESULT_SUM": null,
        "RESULT_CURRENCY_ID": null,
        "RESULT_STATUS": "0",
        "RESULT_STREAM": "0",
        "RESULT_SOURCE_ID": null,
        "AUTOCOMPLETE_RULE": "0"
    },
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
[`object`](../../../../data-types.md) | Корневой элемент ответа. Значения для поля `result` соответствуют [полям объекта](./crm-activity-fields.md#all-fields) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `Activity is not found` | Дело с указанным идентификатором не найдено для сущности в CRM ||
|| `Access denied` | Отсутствуют права на редактирование сущности в CRM ||
|| `Application context required` | Некорректный параметр `PROVIDER_ID` для дела, созданного в контексте приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-add.md)
- [{#T}](./crm-activity-update.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)