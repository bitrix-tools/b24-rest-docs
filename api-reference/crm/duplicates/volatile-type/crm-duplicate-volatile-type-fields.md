# Получить список полей для поиска дубликатов crm.duplicate.volatileType.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.duplicate.volatileType.fields` возвращает список стандартных и пользовательcких полей, которые можно использовать для поиска дубликатов в лидах, контактах и компаниях.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта. Возможные значения:
- `1` — [лид](../../leads/index.md)
- `3` — [контакт](../../contacts/index.md)
- `4` — [компания](../../companies/index.md)

Если не указан, возвращаются поля для всех типов ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"entityTypeId":1}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.duplicate.volatileType.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.duplicate.volatileType.fields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type VolatileTypeField = {
      entityTypeId: number
      fieldCode: string
      fieldTitle: string
    }

    try {
      const response = await $b24.actions.v2.call.make<VolatileTypeField[]>({
        method: 'crm.duplicate.volatileType.fields',
        params: {
          entityTypeId: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.length, result[0]?.fieldCode, result[0]?.fieldTitle)
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
      async function getVolatileTypeFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.duplicate.volatileType.fields',
            params: {
              entityTypeId: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.length, result[0]?.fieldCode, result[0]?.fieldTitle)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getVolatileTypeFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.duplicate.volatileType.fields',
                [
                    'entityTypeId' => 1,
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
        echo 'Error calling crm.duplicate.volatileType.fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.duplicate.volatileType.fields",
        {
            entityTypeId: 1
        },
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
        'crm.duplicate.volatileType.fields',
        [
            'entityTypeId' => 1
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
            "entityTypeId": 1,
            "fieldCode": "TITLE",
            "fieldTitle": "Название лида"
        },
        {
            "entityTypeId": 1,
            "fieldCode": "ADDRESS",
            "fieldTitle": "Адрес"
        },
        {
            "entityTypeId": 1,
            "fieldCode": "UF_CRM_1750854801",
            "fieldTitle": "Строка"
        },
        // ... другие поля ...
    ],
    "time": {
        "start": 1750854837.219779,
        "finish": 1750854837.296077,
        "duration": 0.07629799842834473,
        "processing": 0.028430938720703125,
        "date_start": "2025-06-25T12:33:57+00:00",
        "date_finish": "2025-06-25T12:33:57+00:00" 
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Тип объекта ||
|| **fieldCode**
[`string`](../../../data-types.md) | Код поля ||
|| **fieldTitle**
[`string`](../../../data-types.md) | Название поля ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Специфичные ошибки метода не выделены.

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)
- [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md)
- [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md) 
