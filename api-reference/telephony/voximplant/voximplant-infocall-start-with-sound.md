# Осуществить автозвонок с проигрыванием MP3-файла voximplant.infocall.startwithsound

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../../scopes/permissions.md), [`call`](../../scopes/permissions.md) 
>
> Кто может выполнять метод: пользователь с правом Исходящий звонок — Выполнение

Метод `voximplant.infocall.startwithsound` запускает автозвонок и воспроизводит MP3-файл по URL.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FROM_LINE***
[`string`](../../data-types.md) | Идентификатор исходящей линии, с которой запускается звонок.

Список доступных линий можно получить методом [voximplant.line.get](./lines/voximplant-line-get.md) ||
|| **TO_NUMBER***
[`string`](../../data-types.md) | Номер, на который нужно выполнить звонок ||
|| **URL***
[`string`](../../data-types.md) | Ссылка на MP3-файл, который нужно проиграть во время звонка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FROM_LINE":"reg151083","TO_NUMBER":"79991234567","URL":"https://example.com/sound/notice.mp3"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.infocall.startwithsound
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FROM_LINE":"reg151083","TO_NUMBER":"79991234567","URL":"https://example.com/sound/notice.mp3","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.infocall.startwithsound
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type InfocallStartWithSoundResult = {
      RESULT: boolean
      CALL_ID: string
    }

    try {
      const response = await $b24.actions.v2.call.make<InfocallStartWithSoundResult>({
        method: 'voximplant.infocall.startwithsound',
        params: {
          FROM_LINE: 'reg151083',
          TO_NUMBER: '79991234567',
          URL: 'https://example.com/sound/notice.mp3',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Call started:', result.CALL_ID, 'Success:', result.RESULT)
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
      async function startInfocallWithSound() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'voximplant.infocall.startwithsound',
            params: {
              FROM_LINE: 'reg151083',
              TO_NUMBER: '79991234567',
              URL: 'https://example.com/sound/notice.mp3',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Call started:', result.CALL_ID, 'Success:', result.RESULT)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', startInfocallWithSound)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'voximplant.infocall.startwithsound',
                [
                    'FROM_LINE' => 'reg151083',
                    'TO_NUMBER' => '79991234567',
                    'URL' => 'https://example.com/sound/notice.mp3',
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
        'voximplant.infocall.startwithsound',
        {
            FROM_LINE: 'reg151083',
            TO_NUMBER: '79991234567',
            URL: 'https://example.com/sound/notice.mp3'
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
        'voximplant.infocall.startwithsound',
        [
            'FROM_LINE' => 'reg151083',
            'TO_NUMBER' => '79991234567',
            'URL' => 'https://example.com/sound/notice.mp3',
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
        "RESULT": true,
        "CALL_ID": "infocall.e51f04feaf1b58fb5dc6ee9d03d98fea.1773740145"
    },
    "time": {
        "start": 1773740189,
        "finish": 1773740189.20988,
        "duration": 0.20988011360168457,
        "processing": 0,
        "date_start": "2026-03-17T12:36:29+03:00",
        "date_finish": "2026-03-17T12:36:29+03:00",
        "operating_reset_at": 1773740789,
        "operating": 0.13379693031311035
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом запуска автозвонка ||
|| **RESULT**
[`boolean`](../../data-types.md) | Признак успешного запуска.

`true` — автозвонок успешно запущен ||
|| **CALL_ID**
[`string`](../../data-types.md) | Идентификатор звонка ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Could not find config for number reg000000"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | `Making infocall using LINK_BASE_NUMBER is not allowed` | Нельзя запускать автозвонок через служебную линию ||
|| `ERROR_CORE` | `Could not find config for number <LINE_ID>` | Не найдена конфигурация для указанной линии ||
|| `ERROR_CORE` | `Infocall limit for this month is exceeded` | Превышен месячный лимит автозвонков ||
|| `ERROR_CORE` | `Phone number is not correct` | Некорректный номер в `TO_NUMBER` ||
|| `ERROR_CORE` | `Infocall failure` | Ошибка при запуске автозвонка ||
|| `ACCESS_DENIED` | `Access denied` | Недостаточно прав на выполнение исходящих звонков ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-callback-start.md)
- [{#T}](./voximplant-infocall-start-with-sound.md)
- [{#T}](./voximplant-infocall-start-with-text.md)
- [{#T}](./voximplant-tts-voices-get.md)