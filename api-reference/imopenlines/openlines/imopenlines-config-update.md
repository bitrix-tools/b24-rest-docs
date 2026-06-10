# Изменить открытую линию imopenlines.config.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения открытых линий

Метод `imopenlines.config.update` изменяет открытую линию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Получить идентификатор открытой линии можно при [создании открытой линии](./imopenlines-config-add.md) или методом [получения списка открытых линий](./imopenlines-config-list-get.md) ||
|| **PARAMS**
[`object`](../../data-types.md) | Объект с настройками для обновления. Набор полей соответствует параметру [PARAMS](./imopenlines-config-add.md#params) метода `imopenlines.config.add` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "PARAMS": {
          "LINE_NAME": "Линия поддержки интернет-магазина (VIP)",
          "QUEUE": [
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "1"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "15"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "23"
            }
          ],
          "QUEUE_TYPE": "strictly",
          "QUEUE_TIME": 45,
          "NO_ANSWER_TIME": 120,
          "WELCOME_MESSAGE": "Y",
          "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "09:00",
          "WORKTIME_TO": "21:00",
          "WORKTIME_TIMEZONE": "Europe/Kaliningrad"
        }
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "PARAMS": {
          "LINE_NAME": "Линия поддержки интернет-магазина (VIP)",
          "QUEUE": [
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "1"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "15"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "23"
            }
          ],
          "QUEUE_TYPE": "strictly",
          "QUEUE_TIME": 45,
          "NO_ANSWER_TIME": 120,
          "WELCOME_MESSAGE": "Y",
          "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "09:00",
          "WORKTIME_TO": "21:00",
          "WORKTIME_TIMEZONE": "Europe/Kaliningrad"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.update
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
        method: 'imopenlines.config.update',
        params: {
          CONFIG_ID: 15,
          PARAMS: {
            LINE_NAME: 'Online Store Support Line (VIP)',
            QUEUE: [
              {
                ENTITY_TYPE: 'user',
                ENTITY_ID: '1',
              },
              {
                ENTITY_TYPE: 'user',
                ENTITY_ID: '15',
              },
              {
                ENTITY_TYPE: 'user',
                ENTITY_ID: '23',
              },
            ],
            QUEUE_TYPE: 'strictly',
            QUEUE_TIME: 45,
            NO_ANSWER_TIME: 120,
            WELCOME_MESSAGE: 'Y',
            WELCOME_MESSAGE_TEXT: 'Hello! We will reply in a couple of minutes',
            WORKTIME_ENABLE: 'Y',
            WORKTIME_FROM: '09:00',
            WORKTIME_TO: '21:00',
            WORKTIME_TIMEZONE: 'Europe/Kaliningrad',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Open line updated:', result)
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
      async function updateOpenLine() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.config.update',
            params: {
              CONFIG_ID: 15,
              PARAMS: {
                LINE_NAME: 'Online Store Support Line (VIP)',
                QUEUE: [
                  {
                    ENTITY_TYPE: 'user',
                    ENTITY_ID: '1',
                  },
                  {
                    ENTITY_TYPE: 'user',
                    ENTITY_ID: '15',
                  },
                  {
                    ENTITY_TYPE: 'user',
                    ENTITY_ID: '23',
                  },
                ],
                QUEUE_TYPE: 'strictly',
                QUEUE_TIME: 45,
                NO_ANSWER_TIME: 120,
                WELCOME_MESSAGE: 'Y',
                WELCOME_MESSAGE_TEXT: 'Hello! We will reply in a couple of minutes',
                WORKTIME_ENABLE: 'Y',
                WORKTIME_FROM: '09:00',
                WORKTIME_TO: '21:00',
                WORKTIME_TIMEZONE: 'Europe/Kaliningrad',
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
          console.info('Open line updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateOpenLine)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.config.update',
                [
                    'CONFIG_ID' => 15,
                    'PARAMS' => [
                        'LINE_NAME' => 'Линия поддержки интернет-магазина (VIP)',
                        'QUEUE' => [
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '1',
                            ],
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '15',
                            ],
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '23',
                            ],
                        ],
                        'QUEUE_TYPE' => 'strictly',
                        'QUEUE_TIME' => 45,
                        'NO_ANSWER_TIME' => 120,
                        'WELCOME_MESSAGE' => 'Y',
                        'WELCOME_MESSAGE_TEXT' => 'Здравствуйте! Ответим в течение пары минут',
                        'WORKTIME_ENABLE' => 'Y',
                        'WORKTIME_FROM' => '09:00',
                        'WORKTIME_TO' => '21:00',
                        'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.config.update',
        {
            CONFIG_ID: 15,
            PARAMS: {
                LINE_NAME: 'Линия поддержки интернет-магазина (VIP)',
                QUEUE: [
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '1'
                    },
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '15'
                    },
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '23'
                    }
                ],
                QUEUE_TYPE: 'strictly',
                QUEUE_TIME: 45,
                NO_ANSWER_TIME: 120,
                WELCOME_MESSAGE: 'Y',
                WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
                WORKTIME_ENABLE: 'Y',
                WORKTIME_FROM: '09:00',
                WORKTIME_TO: '21:00',
                WORKTIME_TIMEZONE: 'Europe/Kaliningrad'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
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
        'imopenlines.config.update',
        [
            'CONFIG_ID' => 15,
            'PARAMS' => [
                'LINE_NAME' => 'Линия поддержки интернет-магазина (VIP)',
                'QUEUE' => [
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '1',
                    ],
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '15',
                    ],
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '23',
                    ],
                ],
                'QUEUE_TYPE' => 'strictly',
                'QUEUE_TIME' => 45,
                'NO_ANSWER_TIME' => 120,
                'WELCOME_MESSAGE' => 'Y',
                'WELCOME_MESSAGE_TEXT' => 'Здравствуйте! Ответим в течение пары минут',
                'WORKTIME_ENABLE' => 'Y',
                'WORKTIME_FROM' => '09:00',
                'WORKTIME_TO' => '21:00',
                'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
            ],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773667094,
        "finish": 1773667094.239236,
        "duration": 0.23923611640930176,
        "processing": 0,
        "date_start": "2026-03-16T16:18:14+03:00",
        "date_finish": "2026-03-16T16:18:14+03:00",
        "operating_reset_at": 1773667694,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает:
- `true` — если линия успешно обновлена
- `false` — если линия с указанным `CONFIG_ID` не существует ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CONFIG_ID_EMPTY",
    "error_description": "Config ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CONFIG_ID_EMPTY` | Config ID can't be empty | Параметр `CONFIG_ID` не передан или передан некорректно ||
|| `403` | `CONFIG_WRONG_USER_PERMISSION` | Permission denied | Недостаточно прав для изменения линии ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-add.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-delete.md)
- [{#T}](./imopenlines-config-path-get.md)
