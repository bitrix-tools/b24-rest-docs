# Добавить поле в поиск дубликатов crm.duplicate.volatileType.register

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.duplicate.volatileType.register` добавляет поле в функционал поиска дубликатов в лидах, контактах или компаниях.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId*** 
[`integer`](../../../data-types.md) | Идентификатор типа объекта. Возможные значения:
- `1` — [лид](../../leads/index.md)
- `3` — [контакт](../../contacts/index.md)
- `4` — [компания](../../companies/index.md) ||
|| **fieldCode*** 
[`string`](../../../data-types.md) | Код поля, который нужно добавить в поиск дубликатов. Например  `TITLE`, `RQ.RU.NAME`, `UF_CRM_1750854801`. Получить список доступных полей можно методом [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md) ||
|#

### Особенности работы метода

Суммарно можно зарегистрировать 7 нестандартных полей для поиска дубликатов. Например, если уже добавили 3 поля для контактов и 4 поля для компаний, при попытке добавить еще одно поле для любого типа объекта получите ошибку `MAX_TYPES_COUNT_EXCEEDED`. 

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"entityTypeId":1,"fieldCode":"TITLE"}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.duplicate.volatileType.register
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"fieldCode":"TITLE","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.duplicate.volatileType.register
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type RegisterVolatileTypeResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<RegisterVolatileTypeResult>({
        method: 'crm.duplicate.volatileType.register',
        params: {
          entityTypeId: 1,
          fieldCode: 'TITLE',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Registered field with id:', result.id)
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
      async function registerVolatileType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.duplicate.volatileType.register',
            params: {
              entityTypeId: 1,
              fieldCode: 'TITLE',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Registered field with id:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', registerVolatileType)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.duplicate.volatileType.register',
                [
                    'entityTypeId' => 1,
                    'fieldCode'    => 'TITLE',
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
        echo 'Error registering volatile type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.duplicate.volatileType.register",
        {
            entityTypeId: 1,
            fieldCode: "TITLE"
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
        'crm.duplicate.volatileType.register',
        [
            'entityTypeId' => 1,
            'fieldCode' => 'TITLE'
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
        "id": 3355
    },
    "time": {
        "start": 1750934251.736599,
        "finish": 1750934252.028757,
        "duration": 0.2921581268310547,
        "processing": 0.24904417991638184,
        "date_start": "2025-06-26T13:37:31+03:00",
        "date_finish": "2025-06-26T13:37:32+03:00",
        "operating_reset_at": 1750934851,
        "operating": 0.24902796745300293
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор записи для поля, добавленного в поиск дубликатов ||
|| **time**[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Field not found",
    "error_description": "Указанное поле не найдено."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400` | `Field not found` | Указанное поле не найдено ||
|| `400` | `MAX_TYPES_COUNT_EXCEEDED` | Превышено максимальное количество нестандартных типов полей в поиске дубликатов ||
|#

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md)
- [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)
- [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md) 