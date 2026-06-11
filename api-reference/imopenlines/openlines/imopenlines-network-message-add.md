# Отправить сообщение пользователю от имени открытой линии imopenlines.network.message.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.network.message.add` отправляет сообщение пользователю от имени открытой линии, подключенной в Битрикс24 Network.

Ограничения работы метода:
1. Метод недоступен при сессионной авторизации. Для сессионной авторизации возвращает ошибку `WRONG_AUTH_TYPE`
2. Можно отправлять сообщение не более одного раза для каждого пользователя в течение одной недели. Для аккаунта с лицензией Партнера (NFR) ограничений по лимиту нет
3. Можно использовать клавиатуру только для форматирования кнопки ссылки на стороннем сайте

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../data-types.md) | Код открытой линии, строка из 32 символов, например `ab515f5d85a8b844d484f6ea75a2e494` ||
|| **USER_ID***
[`integer`](../../data-types.md) | Идентификатор получателя сообщения, например `2` ||
|| **MESSAGE***
[`string`](../../data-types.md) | Текст сообщения. 

Как форматировать текст — в статье [форматирование](../../chats/messages/formatting.md) ||
|| **ATTACH**
[`object`](../../data-types.md) | Вложение.

Формат вложения описан в статье [Как использовать вложения](../../chats/messages/attachments.md) ||
|| **KEYBOARD**
[`object`](../../data-types.md) | Клавиатура.

Как создавать клавиатуры — в статье [Работа с клавиатурами](../../chats/messages/keyboards.md) ||
|| **URL_PREVIEW**
[`char`](../../data-types.md) | Предпросмотр ссылок. Включен `Y` по умолчанию. 

Передайте `N`, чтобы отключить предпросмотр ссылок ||
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
        "CODE": "ab515f5d85a8b844d484f6ea75a2e494",
        "USER_ID": 2,
        "MESSAGE": "Подготовили материалы по подключению открытых линий",
        "ATTACH": {
          "ID": 1,
          "COLOR_TOKEN": "primary",
          "BLOCKS": [
            {
              "MESSAGE": "Во вложении отправили чек-лист и схему подключения"
            },
            {
              "FILE": [
                {
                  "NAME": "checklist-openlines.pdf",
                  "LINK": "https://cdn.example.com/docs/checklist-openlines.pdf",
                  "SIZE": 428736
                }
              ]
            },
            {
              "IMAGE": [
                {
                  "NAME": "Схема подключения",
                  "LINK": "https://cdn.example.com/images/openlines-setup.png",
                  "PREVIEW": "https://cdn.example.com/images/openlines-setup-preview.png",
                  "WIDTH": 1280,
                  "HEIGHT": 720
                }
              ]
            }
          ]
        },
        "KEYBOARD": {
          "BUTTONS": [
            {
              "TEXT": "Открыть инструкцию",
              "LINK": "https://help.example.com/openlines/setup",
              "DISPLAY": "LINE",
              "BG_COLOR_TOKEN": "primary"
            }
          ]
        },
        "URL_PREVIEW": "N"
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.network.message.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CODE": "ab515f5d85a8b844d484f6ea75a2e494",
        "USER_ID": 2,
        "MESSAGE": "Подготовили материалы по подключению открытых линий",
        "ATTACH": {
          "ID": 1,
          "COLOR_TOKEN": "primary",
          "BLOCKS": [
            {
              "MESSAGE": "Во вложении отправили чек-лист и схему подключения"
            },
            {
              "FILE": [
                {
                  "NAME": "checklist-openlines.pdf",
                  "LINK": "https://cdn.example.com/docs/checklist-openlines.pdf",
                  "SIZE": 428736
                }
              ]
            },
            {
              "IMAGE": [
                {
                  "NAME": "Схема подключения",
                  "LINK": "https://cdn.example.com/images/openlines-setup.png",
                  "PREVIEW": "https://cdn.example.com/images/openlines-setup-preview.png",
                  "WIDTH": 1280,
                  "HEIGHT": 720
                }
              ]
            }
          ]
        },
        "KEYBOARD": {
          "BUTTONS": [
            {
              "TEXT": "Открыть инструкцию",
              "LINK": "https://help.example.com/openlines/setup",
              "DISPLAY": "LINE",
              "BG_COLOR_TOKEN": "primary"
            }
          ]
        },
        "URL_PREVIEW": "N",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.network.message.add
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
        method: 'imopenlines.network.message.add',
        params: {
          CODE: 'ab515f5d85a8b844d484f6ea75a2e494',
          USER_ID: 2,
          MESSAGE: 'We have prepared materials on connecting open lines',
          ATTACH: {
            ID: 1,
            COLOR_TOKEN: 'primary',
            BLOCKS: [
              {
                MESSAGE: 'Attached are the checklist and connection diagram',
              },
              {
                FILE: [
                  {
                    NAME: 'checklist-openlines.pdf',
                    LINK: 'https://cdn.example.com/docs/checklist-openlines.pdf',
                    SIZE: 428736,
                  },
                ],
              },
              {
                IMAGE: [
                  {
                    NAME: 'Connection diagram',
                    LINK: 'https://cdn.example.com/images/openlines-setup.png',
                    PREVIEW: 'https://cdn.example.com/images/openlines-setup-preview.png',
                    WIDTH: 1280,
                    HEIGHT: 720,
                  },
                ],
              },
            ],
          },
          KEYBOARD: {
            BUTTONS: [
              {
                TEXT: 'Open instructions',
                LINK: 'https://help.example.com/openlines/setup',
                DISPLAY: 'LINE',
                BG_COLOR_TOKEN: 'primary',
              },
            ],
          },
          URL_PREVIEW: 'N',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Message sent successfully:', result)
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
      async function sendNetworkMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.network.message.add',
            params: {
              CODE: 'ab515f5d85a8b844d484f6ea75a2e494',
              USER_ID: 2,
              MESSAGE: 'We have prepared materials on connecting open lines',
              ATTACH: {
                ID: 1,
                COLOR_TOKEN: 'primary',
                BLOCKS: [
                  {
                    MESSAGE: 'Attached are the checklist and connection diagram',
                  },
                  {
                    FILE: [
                      {
                        NAME: 'checklist-openlines.pdf',
                        LINK: 'https://cdn.example.com/docs/checklist-openlines.pdf',
                        SIZE: 428736,
                      },
                    ],
                  },
                  {
                    IMAGE: [
                      {
                        NAME: 'Connection diagram',
                        LINK: 'https://cdn.example.com/images/openlines-setup.png',
                        PREVIEW: 'https://cdn.example.com/images/openlines-setup-preview.png',
                        WIDTH: 1280,
                        HEIGHT: 720,
                      },
                    ],
                  },
                ],
              },
              KEYBOARD: {
                BUTTONS: [
                  {
                    TEXT: 'Open instructions',
                    LINK: 'https://help.example.com/openlines/setup',
                    DISPLAY: 'LINE',
                    BG_COLOR_TOKEN: 'primary',
                  },
                ],
              },
              URL_PREVIEW: 'N',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Message sent successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendNetworkMessage)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.network.message.add',
                [
                    'CODE' => 'ab515f5d85a8b844d484f6ea75a2e494',
                    'USER_ID' => 2,
                    'MESSAGE' => 'Подготовили материалы по подключению открытых линий',
                    'ATTACH' => [
                        'ID' => 1,
                        'COLOR_TOKEN' => 'primary',
                        'BLOCKS' => [
                            [
                                'MESSAGE' => 'Во вложении отправили чек-лист и схему подключения'
                            ],
                            [
                                'FILE' => [
                                    [
                                        'NAME' => 'checklist-openlines.pdf',
                                        'LINK' => 'https://cdn.example.com/docs/checklist-openlines.pdf',
                                        'SIZE' => 428736
                                    ]
                                ]
                            ],
                            [
                                'IMAGE' => [
                                    [
                                        'NAME' => 'Схема подключения',
                                        'LINK' => 'https://cdn.example.com/images/openlines-setup.png',
                                        'PREVIEW' => 'https://cdn.example.com/images/openlines-setup-preview.png',
                                        'WIDTH' => 1280,
                                        'HEIGHT' => 720
                                    ]
                                ]
                            ]
                        ]
                    ],
                    'KEYBOARD' => [
                        'BUTTONS' => [
                            [
                                'TEXT' => 'Открыть инструкцию',
                                'LINK' => 'https://help.example.com/openlines/setup',
                                'DISPLAY' => 'LINE',
                                'BG_COLOR_TOKEN' => 'primary'
                            ]
                        ]
                    ],
                    'URL_PREVIEW' => 'N',
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
        'imopenlines.network.message.add',
        {
            CODE: 'ab515f5d85a8b844d484f6ea75a2e494',
            USER_ID: 2,
            MESSAGE: 'Подготовили материалы по подключению открытых линий',
            ATTACH: {
                ID: 1,
                COLOR_TOKEN: 'primary',
                BLOCKS: [
                    {
                        MESSAGE: 'Во вложении отправили чек-лист и схему подключения'
                    },
                    {
                        FILE: [
                            {
                                NAME: 'checklist-openlines.pdf',
                                LINK: 'https://cdn.example.com/docs/checklist-openlines.pdf',
                                SIZE: 428736
                            }
                        ]
                    },
                    {
                        IMAGE: [
                            {
                                NAME: 'Схема подключения',
                                LINK: 'https://cdn.example.com/images/openlines-setup.png',
                                PREVIEW: 'https://cdn.example.com/images/openlines-setup-preview.png',
                                WIDTH: 1280,
                                HEIGHT: 720
                            }
                        ]
                    }
                ]
            },
            KEYBOARD: {
                BUTTONS: [
                    {
                        TEXT: 'Открыть инструкцию',
                        LINK: 'https://help.example.com/openlines/setup',
                        DISPLAY: 'LINE',
                        BG_COLOR_TOKEN: 'primary'
                    }
                ]
            },
            URL_PREVIEW: 'N'
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
        'imopenlines.network.message.add',
        [
            'CODE' => 'ab515f5d85a8b844d484f6ea75a2e494',
            'USER_ID' => 2,
            'MESSAGE' => 'Подготовили материалы по подключению открытых линий',
            'ATTACH' => [
                'ID' => 1,
                'COLOR_TOKEN' => 'primary',
                'BLOCKS' => [
                    [
                        'MESSAGE' => 'Во вложении отправили чек-лист и схему подключения'
                    ],
                    [
                        'FILE' => [
                            [
                                'NAME' => 'checklist-openlines.pdf',
                                'LINK' => 'https://cdn.example.com/docs/checklist-openlines.pdf',
                                'SIZE' => 428736
                            ]
                        ]
                    ],
                    [
                        'IMAGE' => [
                            [
                                'NAME' => 'Схема подключения',
                                'LINK' => 'https://cdn.example.com/images/openlines-setup.png',
                                'PREVIEW' => 'https://cdn.example.com/images/openlines-setup-preview.png',
                                'WIDTH' => 1280,
                                'HEIGHT' => 720
                            ]
                        ]
                    ]
                ]
            ],
            'KEYBOARD' => [
                'BUTTONS' => [
                    [
                        'TEXT' => 'Открыть инструкцию',
                        'LINK' => 'https://help.example.com/openlines/setup',
                        'DISPLAY' => 'LINE',
                        'BG_COLOR_TOKEN' => 'primary'
                    ]
                ]
            ],
            'URL_PREVIEW' => 'N',
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
        "start": 1773740787,
        "finish": 1773740787.828814,
        "duration": 0.8288140296936035,
        "processing": 0,
        "date_start": "2026-03-17T12:46:27+03:00",
        "date_finish": "2026-03-17T12:46:27+03:00",
        "operating_reset_at": 1773741387,
        "operating": 0.17312097549438477
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если сообщение отправлено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CODE",
    "error_description": "You entered an invalid code"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Access for this method not allowed by session authorization | Метод вызван с сессионной авторизацией ||
|| `400` | `CODE` | You entered an invalid code | Некорректный код в параметре `CODE`, ожидается строка из 32 символов ||
|| `400` | `IMBOT_ERROR` | Module IMBOT is not installed | Не установлен модуль imbot ||
|| `400` | `NOT_FOUND` | Line not found | Открытая линия не найдена ||
|| `400` | `USER_ID_EMPTY` | User ID can't be empty | Не указан идентификатор пользователя ||
|| `400` | `USER_MESSAGE_LIMIT` | You cant send more than one message per week to each user | Превышен лимит сообщений для конкретного пользователя ||
|| `400` | `MESSAGE_EMPTY` | Message can't be empty | Не указан текст сообщения ||
|| `400` | `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Превышен максимально допустимый размер вложения 30 Кб ||
|| `400` | `ATTACH_ERROR` | Incorrect attach params | Объект вложения не прошел проверку ||
|| `400` | `KEYBOARD_ERROR` | Incorrect keyboard params | Объект клавиатуры не прошел проверку ||
|| `400` | `WRONG_REQUEST` | Message isn't added | Сообщение не отправлено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-network-join.md)
- [{#T}](../../chats/messages/formatting.md)
- [{#T}](../../chats/messages/attachments.md)
- [{#T}](../../chats/messages/keyboards.md)


