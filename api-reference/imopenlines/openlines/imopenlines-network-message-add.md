# Отправить сообщение пользователю от имени открытой линии imopenlines.network.message.add

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

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
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
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
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


