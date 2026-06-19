# Удалить зарегистрированный обработчик места встраивания placement.unbind

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, авторизованный в приложении

Метод `placement.unbind` удаляет зарегистрированный обработчик места встраивания.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PLACEMENT**^*^
[`string`](../data-types.md) | Идентификатор места встраивания.

`PLACEMENT` можно получить:
- методом [placement.list](./placement-list.md)
- методом [placement.get](./placement-get.md) в поле `placement` ||
|| **HANDLER**
[`string`](../data-types.md) | URL обработчика места встраивания.

`HANDLER` можно получить методом [placement.get](./placement-get.md) в поле `handler`.

Если параметр не передан или передан пустым, метод удаляет все обработчики указанного места встраивания, зарегистрированные приложением ||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя Битрикс24, для которого был зарегистрирован обработчик.

`USER_ID` можно получить:
- методом [user.get](../user/user-get.md)
- методом [user.current](../user/user-current.md) для текущего пользователя

Если параметр передан, метод удаляет только обработчики указанного пользователя ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример удаления зарегистрированного обработчика места встраивания, где:
- `PLACEMENT` — идентификатор места встраивания
- `HANDLER` — URL обработчика места встраивания

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "PLACEMENT": "CRM_LEAD_DETAIL_TAB",
        "HANDLER": "https://www.myapplicationhost.com/placement/",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/placement.unbind.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PlacementUnbindResult = {
      count: number
    }

    try {
      const response = await $b24.actions.v2.call.make<PlacementUnbindResult>({
        method: 'placement.unbind',
        params: {
          PLACEMENT: 'CRM_LEAD_DETAIL_TAB',
          HANDLER: 'https://www.myapplicationhost.com/placement/',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Unbound handlers count:', result.count)
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
      async function unbindPlacement() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.unbind',
            params: {
              PLACEMENT: 'CRM_LEAD_DETAIL_TAB',
              HANDLER: 'https://www.myapplicationhost.com/placement/',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Unbound handlers count:', result.count)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', unbindPlacement)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.unbind',
                [
                    'PLACEMENT' => 'CRM_LEAD_DETAIL_TAB',
                    'HANDLER' => 'https://www.myapplicationhost.com/placement/',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unbinding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.unbind',
        {
            PLACEMENT: 'CRM_LEAD_DETAIL_TAB',
            HANDLER: 'https://www.myapplicationhost.com/placement/'
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
        'placement.unbind',
        [
            'PLACEMENT' => 'CRM_LEAD_DETAIL_TAB',
            'HANDLER' => 'https://www.myapplicationhost.com/placement/',
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
    "result": {
        "count": 4
    },
    "time": {
        "start": 1775058296,
        "finish": 1775058296.998083,
        "duration": 0.9980831146240234,
        "processing": 0,
        "date_start": "2026-04-01T18:44:56+03:00",
        "date_finish": "2026-04-01T18:44:56+03:00",
        "operating_reset_at": 1775058896,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с результатом удаления:

- **count** [`integer`](../data-types.md) — число, которое метод увеличивает:
  - на `1` при каждой найденной записи обработчика перед вызовом удаления
  - еще на `1` после каждого успешного удаления ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Вызов метода не из контекста приложения ||
|| `403` | `ACCESS_DENIED` | Access denied! | Пользователь не является администратором ||
|| `400` | `ERROR_ARGUMENT` | Argument 'PLACEMENT' is null or empty | Не передан `PLACEMENT` или передано пустое значение ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument 'PLACEMENT' must be of type string | Параметр `PLACEMENT` передан не строкой ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-get.md)
- [{#T}](./ui-interaction/index.md)
