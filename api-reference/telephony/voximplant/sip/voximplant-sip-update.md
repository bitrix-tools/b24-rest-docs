# Обновить SIP-линию voximplant.sip.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.update` обновляет существующую SIP-линию, созданную текущим приложением.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../../data-types.md) | Идентификатор настройки SIP-линии.

Получить идентификатор можно с помощью метода [voximplant.sip.get](./voximplant-sip-get.md) ||
|| **TITLE**
[`string`](../../../data-types.md) | Новое название подключения ||
|| **SERVER**
[`string`](../../../data-types.md) | Новый адрес сервера SIP-регистрации ||
|| **LOGIN**
[`string`](../../../data-types.md) | Новый логин для подключения к серверу ||
|| **PASSWORD**
[`string`](../../../data-types.md) | Новый пароль для подключения к серверу. Максимальная длина — 100 символов ||
|#

{% note info "" %}

Для изменения нужно передать хотя бы одно из полей: `TITLE`, `SERVER`, `LOGIN`, `PASSWORD`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":5,"TITLE":"SIP line 1 (updated)"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CONFIG_ID":5,"TITLE":"SIP line 1 (updated)","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'voximplant.sip.update',
        params: {
          CONFIG_ID: 5,
          TITLE: 'SIP line 1 (updated)',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('SIP line updated, result:', result)
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
      async function updateSipLine() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'voximplant.sip.update',
            params: {
              CONFIG_ID: 5,
              TITLE: 'SIP line 1 (updated)',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('SIP line updated, result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSipLine)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'voximplant.sip.update',
                [
                    'CONFIG_ID' => 5,
                    'TITLE' => 'SIP line 1 (updated)',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.sip.update',
        {
            CONFIG_ID: 5,
            TITLE: 'SIP line 1 (updated)'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'voximplant.sip.update',
        [
            'CONFIG_ID' => 5,
            'TITLE' => 'SIP line 1 (updated)',
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
    "result": 1,
    "time": {
        "start": 1773657589,
        "finish": 1773657589.659046,
        "duration": 0.659045934677124,
        "processing": 0,
        "date_start": "2026-03-16T13:39:49+03:00",
        "date_finish": "2026-03-16T13:39:49+03:00",
        "operating_reset_at": 1773658189,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Результат обновления.

`1` — обновление выполнено успешно ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **404**

```json
{
    "error": "ERROR_NOT_FOUND",
    "error_description": "Specified CONFIG_ID is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_NOT_FOUND` | `Specified CONFIG_ID is not found` | SIP-линия с указанным `CONFIG_ID` не найдена среди линий текущего приложения ||
|| `CHECK_FIELDS_ERROR` | `Не указан адрес сервера` | Передано пустое или некорректное значение параметра `SERVER` ||
|| `CHECK_FIELDS_ERROR` | `Не указан логин для подключения к серверу` | Передано пустое или некорректное значение параметра `LOGIN` ||
|| `CHECK_FIELDS_ERROR` | `Пароль для подключения к серверу не может быть более 100 символов` | Превышен лимит значения для параметра `PASSWORD` ||
|| `TITLE_EXISTS` | `Указанное название подключения уже зарегистрировано в системе` | Линия с таким названием уже существует ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для обновления SIP-линии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-update.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-status.md)
- [{#T}](./voximplant-sip-connector-status.md)
