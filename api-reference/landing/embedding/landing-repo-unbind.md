# Удалить место встраивания landing.repo.unbind

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.repo.unbind` удаляет место встраивания, зарегистрированное текущим приложением в разделе `landing`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**^*^
[`string`](../../data-types.md) | Код места встраивания.

Доступные коды для раздела `landing` смотрите на страницах [LANDING_SETTINGS](./settings.md) и [LANDING_BLOCK](./block.md) ||
|| **handler**
[`string`](../../data-types.md) | Путь обработчика места встраивания.

Значение `handler` должно совпадать со значением поля `PLACEMENT_HANDLER`, которое передавалось при регистрации места встраивания методом `landing.repo.bind`.

Примеры передачи `PLACEMENT_HANDLER` смотрите на страницах [LANDING_SETTINGS](./settings.md) и [LANDING_BLOCK](./block.md).

Если параметр не передан, метод удаляет все места встраивания текущего приложения с кодом `code`.

Если параметр передан, метод удаляет только место встраивания с указанными `code` и `handler` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример удаления места встраивания, где:
- `code` — код места встраивания
- `handler` — путь обработчика места встраивания

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "LANDING_SETTINGS",
        "handler": "https://your-domain.com/widgets/landing-settings-handler.php",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.repo.unbind.json"
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
        method: 'landing.repo.unbind',
        params: {
          code: 'LANDING_SETTINGS',
          handler: 'https://your-domain.com/widgets/landing-settings-handler.php',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Unbind result:', result)
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
      async function unbindLandingRepo() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.repo.unbind',
            params: {
              code: 'LANDING_SETTINGS',
              handler: 'https://your-domain.com/widgets/landing-settings-handler.php',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Unbind result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', unbindLandingRepo)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.unbind',
                [
                    'code' => 'LANDING_SETTINGS',
                    'handler' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unbinding landing placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.unbind',
        {
            code: 'LANDING_SETTINGS',
            handler: 'https://your-domain.com/widgets/landing-settings-handler.php'
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
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.unbind',
        [
            'code' => 'LANDING_SETTINGS',
            'handler' => 'https://your-domain.com/widgets/landing-settings-handler.php',
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1775203200,
        "finish": 1775203200.764211,
        "duration": 0.7642109394073486,
        "processing": 0,
        "date_start": "2026-04-03T11:00:00+03:00",
        "date_finish": "2026-04-03T11:00:00+03:00",
        "operating_reset_at": 1775203800,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат успешного удаления места встраивания ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "PLACEMENT_NO_EXIST",
    "error_description": "Такое место встраивания не существует"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: code | Вызов метода без `code` ||
|| `400` | `PLACEMENT_NO_EXIST` | Такое место встраивания не существует | У текущего приложения нет места встраивания с указанными `code` и `handler` ||
|| `400` | `ACCESS_DENIED` | Недостаточно прав. | Пользователь не прошел общие проверки доступа модуля landing ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./settings.md)
- [{#T}](./block.md)
