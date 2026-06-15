# Удалить трейс сквозной аналитики crm.tracking.trace.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь может удалить трейс
> - пользователь с правом на изменение объекта может удалить привязку трейса к объекту

Метод `crm.tracking.trace.delete` удаляет трейс сквозной аналитики.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор трейса сквозной аналитики.

Для полного удаления трейса нужны права на изменение всех связанных с ним объектов.

`id` можно получить методом [crm.tracking.trace.add](./crm-tracking-trace-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример удаления трейса сквозной аналитики, где:
- `id` — идентификатор трейса

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 125
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/crm.tracking.trace.delete.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 125,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/crm.tracking.trace.delete.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<null>({
        method: 'crm.tracking.trace.delete',
        params: {
          id: 125,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Trace deleted:', result)
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
      async function deleteTrace() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.tracking.trace.delete',
            params: {
              id: 125,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Trace deleted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteTrace)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.tracking.trace.delete',
                [
                    'id' => 125,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting trace: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.tracking.trace.delete',
        {
            id: 125
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'crm.tracking.trace.delete',
        [
            'id' => 125,
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": null,
    "time": {
        "start": 1775119058,
        "finish": 1775119058.707133,
        "duration": 0.7071330547332764,
        "processing": 0,
        "date_start": "2026-04-02T11:37:38+03:00",
        "date_finish": "2026-04-02T11:37:38+03:00",
        "operating_reset_at": 1775119658,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`null`](../../data-types.md) | Метод не возвращает данные в ответе.

Если при вызове не возникла ошибка REST, в поле `result` возвращается `null`.

При успешном удалении привязки значение очищается и в поле «Сквозная аналитика» элемента, к которому был привязан трейс ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Parameter `id` required."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Parameter `id` required. | Не передан параметр `id` или передано пустое значение ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-tracking-trace-add.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-lead.md)
- [{#T}](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-contact.md)
