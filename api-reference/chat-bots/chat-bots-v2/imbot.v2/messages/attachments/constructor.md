# Конструктор вложений ATTACH

Страница содержит практические примеры сборки `ATTACH` из разных типов блоков. Итоговое вложение зависит от набора и порядка блоков.

## Пример 1. Карточка «Баг-трекер»

Системное сообщение с карточкой задачи, ссылкой и таблицами с параметрами.

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat20921","fields":{"message":"Карточка задачи","attach":[{"USER":{"NAME":"Уведомления Mantis","AVATAR":"https://files.shelenkov.com/bitrix/images/mantis2.jpg","LINK":"https://shelenkov.com/"}},{"LINK":{"NAME":"Открыть Mantis из внешней сети","LINK":"https://shelenkov.com/"}},{"DELIMITER":{"SIZE":200,"COLOR":"#c6c6c6"}},{"GRID":[{"NAME":"Проект","VALUE":"BUGS","DISPLAY":"LINE","WIDTH":100},{"NAME":"Категория","VALUE":"im","DISPLAY":"LINE","WIDTH":100},{"NAME":"Сводка","VALUE":"Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.","DISPLAY":"BLOCK"}]},{"DELIMITER":{"SIZE":200,"COLOR":"#c6c6c6"}},{"GRID":[{"NAME":"Новое обращение","VALUE":"","DISPLAY":"ROW","WIDTH":100},{"NAME":"Назначено","VALUE":"Шеленков Евгений","DISPLAY":"ROW","WIDTH":100},{"NAME":"Дедлайн","VALUE":"04.11.2015 17:50:43","DISPLAY":"ROW","WIDTH":100}]}]}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat20921","fields":{"message":"Карточка задачи","attach":[{"USER":{"NAME":"Уведомления Mantis","AVATAR":"https://files.shelenkov.com/bitrix/images/mantis2.jpg","LINK":"https://shelenkov.com/"}},{"LINK":{"NAME":"Открыть Mantis из внешней сети","LINK":"https://shelenkov.com/"}},{"DELIMITER":{"SIZE":200,"COLOR":"#c6c6c6"}},{"GRID":[{"NAME":"Проект","VALUE":"BUGS","DISPLAY":"LINE","WIDTH":100},{"NAME":"Категория","VALUE":"im","DISPLAY":"LINE","WIDTH":100},{"NAME":"Сводка","VALUE":"Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.","DISPLAY":"BLOCK"}]},{"DELIMITER":{"SIZE":200,"COLOR":"#c6c6c6"}},{"GRID":[{"NAME":"Новое обращение","VALUE":"","DISPLAY":"ROW","WIDTH":100},{"NAME":"Назначено","VALUE":"Шеленков Евгений","DISPLAY":"ROW","WIDTH":100},{"NAME":"Дедлайн","VALUE":"04.11.2015 17:50:43","DISPLAY":"ROW","WIDTH":100}]}]},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imbot.v2.Chat.Message.send',
            {
                botId: 456,
                dialogId: 'chat20921',
                fields: {
                    message: 'Карточка задачи',
                    attach: [
                    {
                        USER: {
                            NAME: 'Уведомления Mantis',
                            AVATAR: 'https://files.shelenkov.com/bitrix/images/mantis2.jpg',
                            LINK: 'https://shelenkov.com/'
                        }
                    },
                    {
                        LINK: {
                            NAME: 'Открыть Mantis из внешней сети',
                            LINK: 'https://shelenkov.com/'
                        }
                    },
                    {
                        DELIMITER: {
                            SIZE: 200,
                            COLOR: '#c6c6c6'
                        }
                    },
                    {
                        GRID: [
                            {
                                NAME: 'Проект',
                                VALUE: 'BUGS',
                                DISPLAY: 'LINE',
                                WIDTH: 100
                            },
                            {
                                NAME: 'Категория',
                                VALUE: 'im',
                                DISPLAY: 'LINE',
                                WIDTH: 100
                            },
                            {
                                NAME: 'Сводка',
                                VALUE: 'Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.',
                                DISPLAY: 'BLOCK'
                            }
                        ]
                    },
                    {
                        DELIMITER: {
                            SIZE: 200,
                            COLOR: '#c6c6c6'
                        }
                    },
                    {
                        GRID: [
                            {
                                NAME: 'Новое обращение',
                                VALUE: '',
                                DISPLAY: 'ROW',
                                WIDTH: 100
                            },
                            {
                                NAME: 'Назначено',
                                VALUE: 'Шеленков Евгений',
                                DISPLAY: 'ROW',
                                WIDTH: 100
                            },
                            {
                                NAME: 'Дедлайн',
                                VALUE: '04.11.2015 17:50:43',
                                DISPLAY: 'ROW',
                                WIDTH: 100
                            }
                        ]
                    }
                    ]
                }
            }
        );

        const result = response.getData().result.id;
        console.log('Created message ID:', result);
    } catch (error) {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Chat.Message.send',
                [
                    'botId' => 456,
                    'dialogId' => 'chat20921',
                    'fields' => [
                        'message' => 'Карточка задачи',
                        'attach' => [
                        [
                            'USER' => [
                                'NAME' => 'Уведомления Mantis',
                                'AVATAR' => 'https://files.shelenkov.com/bitrix/images/mantis2.jpg',
                                'LINK' => 'https://shelenkov.com/'
                            ]
                        ],
                        [
                            'LINK' => [
                                'NAME' => 'Открыть Mantis из внешней сети',
                                'LINK' => 'https://shelenkov.com/'
                            ]
                        ],
                        [
                            'DELIMITER' => [
                                'SIZE' => 200,
                                'COLOR' => '#c6c6c6'
                            ]
                        ],
                        [
                            'GRID' => [
                                [
                                    'NAME' => 'Проект',
                                    'VALUE' => 'BUGS',
                                    'DISPLAY' => 'LINE',
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => 'Категория',
                                    'VALUE' => 'im',
                                    'DISPLAY' => 'LINE',
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => 'Сводка',
                                    'VALUE' => 'Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.',
                                    'DISPLAY' => 'BLOCK'
                                ]
                            ]
                        ],
                        [
                            'DELIMITER' => [
                                'SIZE' => 200,
                                'COLOR' => '#c6c6c6'
                            ]
                        ],
                        [
                            'GRID' => [
                                [
                                    'NAME' => 'Новое обращение',
                                    'VALUE' => '',
                                    'DISPLAY' => 'ROW',
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => 'Назначено',
                                    'VALUE' => 'Шеленков Евгений',
                                    'DISPLAY' => 'ROW',
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => 'Дедлайн',
                                    'VALUE' => '04.11.2015 17:50:43',
                                    'DISPLAY' => 'ROW',
                                    'WIDTH' => 100
                                ]
                            ]
                        ]
                        ]
                    ]
                ]
            );

        $result = $response->getResponseData()->getResult()['id'];
        echo 'Created message ID: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.send',
        {
            botId: 456,
            dialogId: 'chat20921',
            fields: {
                message: 'Карточка задачи',
                attach: [
                {
                    USER: {
                        NAME: 'Уведомления Mantis',
                        AVATAR: 'https://files.shelenkov.com/bitrix/images/mantis2.jpg',
                        LINK: 'https://shelenkov.com/'
                    }
                },
                {
                    LINK: {
                        NAME: 'Открыть Mantis из внешней сети',
                        LINK: 'https://shelenkov.com/'
                    }
                },
                {
                    DELIMITER: {
                        SIZE: 200,
                        COLOR: '#c6c6c6'
                    }
                },
                {
                    GRID: [
                        {
                            NAME: 'Проект',
                            VALUE: 'BUGS',
                            DISPLAY: 'LINE',
                            WIDTH: 100
                        },
                        {
                            NAME: 'Категория',
                            VALUE: 'im',
                            DISPLAY: 'LINE',
                            WIDTH: 100
                        },
                        {
                            NAME: 'Сводка',
                            VALUE: 'Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.',
                            DISPLAY: 'BLOCK'
                        }
                    ]
                },
                {
                    DELIMITER: {
                        SIZE: 200,
                        COLOR: '#c6c6c6'
                    }
                },
                {
                    GRID: [
                        {
                            NAME: 'Новое обращение',
                            VALUE: '',
                            DISPLAY: 'ROW',
                            WIDTH: 100
                        },
                        {
                            NAME: 'Назначено',
                            VALUE: 'Шеленков Евгений',
                            DISPLAY: 'ROW',
                            WIDTH: 100
                        },
                        {
                            NAME: 'Дедлайн',
                            VALUE: '04.11.2015 17:50:43',
                            DISPLAY: 'ROW',
                            WIDTH: 100
                        }
                    ]
                }
                ]
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log('Message ID:', result.data().id);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Chat.Message.send',
        [
            'botId' => 456,
            'dialogId' => 'chat20921',
            'fields' => [
                'message' => 'Карточка задачи',
                'attach' => [
                [
                    'USER' => [
                        'NAME' => 'Уведомления Mantis',
                        'AVATAR' => 'https://files.shelenkov.com/bitrix/images/mantis2.jpg',
                        'LINK' => 'https://shelenkov.com/'
                    ]
                ],
                [
                    'LINK' => [
                        'NAME' => 'Открыть Mantis из внешней сети',
                        'LINK' => 'https://shelenkov.com/'
                    ]
                ],
                [
                    'DELIMITER' => [
                        'SIZE' => 200,
                        'COLOR' => '#c6c6c6'
                    ]
                ],
                [
                    'GRID' => [
                        [
                            'NAME' => 'Проект',
                            'VALUE' => 'BUGS',
                            'DISPLAY' => 'LINE',
                            'WIDTH' => 100
                        ],
                        [
                            'NAME' => 'Категория',
                            'VALUE' => 'im',
                            'DISPLAY' => 'LINE',
                            'WIDTH' => 100
                        ],
                        [
                            'NAME' => 'Сводка',
                            'VALUE' => 'Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.',
                            'DISPLAY' => 'BLOCK'
                        ]
                    ]
                ],
                [
                    'DELIMITER' => [
                        'SIZE' => 200,
                        'COLOR' => '#c6c6c6'
                    ]
                ],
                [
                    'GRID' => [
                        [
                            'NAME' => 'Новое обращение',
                            'VALUE' => '',
                            'DISPLAY' => 'ROW',
                            'WIDTH' => 100
                        ],
                        [
                            'NAME' => 'Назначено',
                            'VALUE' => 'Шеленков Евгений',
                            'DISPLAY' => 'ROW',
                            'WIDTH' => 100
                        ],
                        [
                            'NAME' => 'Дедлайн',
                            'VALUE' => '04.11.2015 17:50:43',
                            'DISPLAY' => 'ROW',
                            'WIDTH' => 100
                        ]
                    ]
                ]
                ]
            ]
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Message ID: ' . $result['result']['id'];
    }
    ```

{% endlist %}

## Пример 2. Информационное уведомление

Короткий информационный текст и изображение в составе одного вложения.

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat20921","fields":{"message":"У вас новое уведомление","attach":{"ID":1,"COLOR":"#29619b","BLOCKS":[{"MESSAGE":"Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем."},{"IMAGE":{"LINK":"https://files.shelenkov.com/bitrix/images/win.jpg"}}]}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat20921","fields":{"message":"У вас новое уведомление","attach":{"ID":1,"COLOR":"#29619b","BLOCKS":[{"MESSAGE":"Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем."},{"IMAGE":{"LINK":"https://files.shelenkov.com/bitrix/images/win.jpg"}}]}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imbot.v2.Chat.Message.send',
            {
                botId: 456,
                dialogId: 'chat20921',
                fields: {
                    message: 'У вас новое уведомление',
                    attach: {
                        ID: 1,
                        COLOR: '#29619b',
                        BLOCKS: [
                            { MESSAGE: 'Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем.' },
                            { IMAGE: { LINK: 'https://files.shelenkov.com/bitrix/images/win.jpg' } }
                        ]
                    }
                }
            }
        );

        const result = response.getData().result.id;
        console.log('Created message ID:', result);
    } catch (error) {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.v2.Chat.Message.send',
                [
                    'botId' => 456,
                    'dialogId' => 'chat20921',
                    'fields' => [
                        'message' => 'У вас новое уведомление',
                        'attach' => [
                            'ID' => 1,
                            'COLOR' => '#29619b',
                            'BLOCKS' => [
                                ['MESSAGE' => 'Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем.'],
                                ['IMAGE' => ['LINK' => 'https://files.shelenkov.com/bitrix/images/win.jpg']]
                            ]
                        ]
                    ]
                ]
            );

        $result = $response->getResponseData()->getResult()['id'];
        echo 'Created message ID: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.send',
        {
            botId: 456,
            dialogId: 'chat20921',
            fields: {
                message: 'У вас новое уведомление',
                attach: {
                    ID: 1,
                    COLOR: '#29619b',
                    BLOCKS: [
                        { MESSAGE: 'Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем.' },
                        { IMAGE: { LINK: 'https://files.shelenkov.com/bitrix/images/win.jpg' } }
                    ]
                }
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log('Message ID:', result.data().id);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.v2.Chat.Message.send',
        [
            'botId' => 456,
            'dialogId' => 'chat20921',
            'fields' => [
                'message' => 'У вас новое уведомление',
                'attach' => [
                    'ID' => 1,
                    'COLOR' => '#29619b',
                    'BLOCKS' => [
                        ['MESSAGE' => 'Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем.'],
                        ['IMAGE' => ['LINK' => 'https://files.shelenkov.com/bitrix/images/win.jpg']]
                    ]
                ]
            ]
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Message ID: ' . $result['result']['id'];
    }
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./block-collections/index.md)
- [{#T}](../chat-message-send.md)



