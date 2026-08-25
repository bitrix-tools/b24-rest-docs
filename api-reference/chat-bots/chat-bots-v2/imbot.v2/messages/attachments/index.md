# Вложения в сообщениях ATTACH

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Вложения `ATTACH` позволяют добавлять в сообщения структурированный контент: текстовые блоки, ссылки, изображения, файлы, разделители и таблицы.

![Вложения](./_images/attach1.png){width=520}

> Быстрый переход: [все методы](#all-methods)

## Как собрать вложение {#how-to-start}

1. Выберите форму объекта: полную — с метаданными `ID`, `COLOR_TOKEN`, `COLOR` и массивом `BLOCKS`, или краткую — сразу массив блоков.
2. Наберите массив блоков. Каждый элемент — объект с одним ключом верхнего уровня, и этот ключ задает тип блока: `MESSAGE`, `LINK`, `USER`, `GRID`, `IMAGE`, `FILE`, `DELIMITER`.
3. Передайте объект в параметре `fields.attach` метода отправки сообщения — например, [imbot.v2.Chat.Message.send](../chat-message-send.md).
4. Чтобы изменить уже отправленное вложение, вызовите [imbot.v2.Chat.Message.update](../chat-message-update.md) с новым значением `fields.attach`.

Готовые составные карточки, собранные из нескольких блоков, — [Конструктор вложений ATTACH](./constructor.md).

## Типы блоков {#blocks}

#|
|| **Ключ в BLOCKS** | **Блок** | **Для чего использовать** ||
|| `MESSAGE` | [Блок с текстом](./block-collections/text.md) | Текстовый фрагмент с поддержкой BB-кодов ||
|| `LINK` | [Блок со ссылками](./block-collections/links.md) | Кликабельная ссылка с подписью ||
|| `USER` | [Блок пользователя](./block-collections/user.md) | Карточка пользователя: имя, аватар, ссылка ||
|| `GRID` | [Блок для построения строк и колонок](./block-collections/grid.md) | Таблица из пар «название-значение» ||
|| `IMAGE` | [Блок с изображениями](./block-collections/images.md) | Одно или несколько изображений ||
|| `FILE` | [Блок с файлами](./block-collections/files.md) | Файл с названием, размером и ссылкой ||
|| `DELIMITER` | [Блок с разделителем](./block-collections/delimiter.md) | Визуальный разделитель между частями вложения ||
|#

Полное описание параметров каждого блока — [Коллекция блоков ATTACH](./block-collections/index.md).

## Форматы объекта ATTACH {#formats}

Передать `ATTACH` можно в одном из двух форматов:

1. Полная форма: объект с метаданными вложения и массивом `BLOCKS`
2. Краткая форма: массив блоков без обертки

### Полная форма ATTACH

{% list tabs %}

- JS

    ```js
    ATTACH: {
        ID: 1,
        COLOR_TOKEN: 'secondary',
        COLOR: '#29619b',
        BLOCKS: [
            {...},
            {...}
        ]
    }
    ```

- PHP

    ```php
    'ATTACH' => [
        'ID' => 1,
        'COLOR_TOKEN' => 'secondary',
        'COLOR' => '#29619b',
        'BLOCKS' => [
            [...],
            [...]
        ]
    ]
    ```

- Python

    ```python
    attach = {
        "ID": 1,
        "COLOR_TOKEN": "secondary",
        "COLOR": "#29619b",
        "BLOCKS": [
            Ellipsis,
            Ellipsis,
        ],
    }
    ```

{% endlist %}

### Поля полной формы

#|
|| **Поле**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../../data-types.md) | Идентификатор вложения внутри сообщения ||
|| **COLOR_TOKEN**
[`string`](../../../../../data-types.md) | Цветовая схема вложения. Допустимые значения: `primary`, `secondary`, `alert`, `base`. По умолчанию: `base` ||
|| **COLOR**
[`string`](../../../../../data-types.md) | Явный HEX-цвет вложения. Используется для совместимости со старыми сценариями и в некоторых типах уведомлений ||
|| **BLOCKS**
[`array`](../../../../../data-types.md) | Массив блоков содержимого вложения. Типы блоков описаны в разделе [Коллекции блоков](./block-collections/index.md) ||
|#

![Объект ATTACH](./_images/attach_variants.png){width=520}

### Пример полной формы

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat20921","fields":{"message":"Вложение с цветом primary","attach":{"ID":1,"COLOR_TOKEN":"primary","COLOR":"#29619b","BLOCKS":[{"MESSAGE":"API будет доступно в обновлении [B]im 24.0.0[/B]"}]}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat20921","fields":{"message":"Вложение с цветом primary","attach":{"ID":1,"COLOR_TOKEN":"primary","COLOR":"#29619b","BLOCKS":[{"MESSAGE":"API будет доступно в обновлении [B]im 24.0.0[/B]"}]}},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.send', {
        botId: 456,
        dialogId: 'chat20921',
        fields: {
          message: 'Вложение с цветом primary',
          attach: {
            ID: 1,
            COLOR_TOKEN: 'primary',
            COLOR: '#29619b',
            BLOCKS: [
              {
                MESSAGE: 'API будет доступно в обновлении [B]im 24.0.0[/B]'
              }
            ]
          }
        }
      });

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
                        'message' => 'Вложение с цветом primary',
                        'attach' => [
                            'ID' => 1,
                            'COLOR_TOKEN' => 'primary',
                            'COLOR' => '#29619b',
                            'BLOCKS' => [
                                [
                                    'MESSAGE' => 'API будет доступно в обновлении [B]im 24.0.0[/B]'
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.chat.message.send(
            bot_id=456,
            dialog_id="chat20921",
            fields={
                "message": "Вложение с цветом primary",
                "attach": {
                    "ID": 1,
                    "COLOR_TOKEN": "primary",
                    "COLOR": "#29619b",
                    "BLOCKS": [
                        {
                            "MESSAGE": "API будет доступно в обновлении [B]im 24.0.0[/B]",
                        },
                    ],
                },
            },
        ).response
        result = bitrix_response.result["id"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.send',
        {
            botId: 456,
            dialogId: 'chat20921',
            fields: {
                message: 'Вложение с цветом primary',
                attach: {
                    ID: 1,
                    COLOR_TOKEN: 'primary',
                    COLOR: '#29619b',
                    BLOCKS: [
                        {
                            MESSAGE: 'API будет доступно в обновлении [B]im 24.0.0[/B]'
                        }
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
                'message' => 'Вложение с цветом primary',
                'attach' => [
                    'ID' => 1,
                    'COLOR_TOKEN' => 'primary',
                    'COLOR' => '#29619b',
                    'BLOCKS' => [
                        [
                            'MESSAGE' => 'API будет доступно в обновлении [B]im 24.0.0[/B]'
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

### Краткая форма ATTACH

Если не нужны метаданные вложения (`ID`, `COLOR_TOKEN`, `COLOR`), можно передать сразу массив блоков:

{% list tabs %}

- JS

    ```js
    ATTACH: [
        {...},
        {...}
    ]
    ```

- PHP

    ```php
    'ATTACH' => [
        [...],
        [...]
    ]
    ```

- Python

    ```python
    attach = [
        Ellipsis,
        Ellipsis,
    ]
    ```

{% endlist %}

![Краткая версия ATTACH](./_images/short_attach.png){width=520}

### Пример краткой формы

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"botToken":"my_bot_token","dialogId":"chat20921","fields":{"message":"Блок текста","attach":[{"MESSAGE":"API будет доступно в обновлении [B]im 24.0.0[/B]"}]}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.v2.Chat.Message.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"botId":456,"dialogId":"chat20921","fields":{"message":"Блок текста","attach":[{"MESSAGE":"API будет доступно в обновлении [B]im 24.0.0[/B]"}]},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.v2.Chat.Message.send
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.v2.Chat.Message.send', {
        botId: 456,
        dialogId: 'chat20921',
        fields: {
          message: 'Блок текста',
          attach: [
            {
              MESSAGE: 'API будет доступно в обновлении [B]im 24.0.0[/B]'
            }
          ]
        }
      });

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
                        'message' => 'Блок текста',
                        'attach' => [
                            [
                                'MESSAGE' => 'API будет доступно в обновлении [B]im 24.0.0[/B]'
                            ]
                        ]
                    ]
                ]
            );

        $result = $response->getResponseData()->getResult()['id'];
        echo 'Created message ID: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.imbot.v2.chat.message.send(
            bot_id=456,
            dialog_id="chat20921",
            fields={
                "message": "Блок текста",
                "attach": [
                    {
                        "MESSAGE": "API будет доступно в обновлении [B]im 24.0.0[/B]",
                    },
                ],
            },
        ).response
        result = bitrix_response.result["id"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.v2.Chat.Message.send',
        {
            botId: 456,
            dialogId: 'chat20921',
            fields: {
                message: 'Блок текста',
                attach: [
                    {
                        MESSAGE: 'API будет доступно в обновлении [B]im 24.0.0[/B]'
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
                'message' => 'Блок текста',
                'attach' => [
                    [
                        'MESSAGE' => 'API будет доступно в обновлении [B]im 24.0.0[/B]'
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

## Что возвращается в ответе {#response}

Сам метод отправки возвращает только идентификатор созданного сообщения — структуру вложения он в ответе не повторяет:

```json
{
    "result": {
        "id": 789,
        "uuidMap": {}
    }
}
```

Чтобы увидеть отправленное вложение, прочитайте сообщение методом [imbot.v2.Chat.Message.get](../chat-message-get.md) или получите его в событии [ONIMBOTV2MESSAGEADD](../../events/events.md#onimbotv2messageadd). Вложение приходит в поле `params` объекта Message вместе с клавиатурой и файлами — [Объекты и поля](../../../entities.md#message).

## Ограничения и ошибки {#limits}

#|
|| **Ограничение** | **Значение** ||
|| Максимальный размер сериализованного `ATTACH` | 60 000 символов ||
|| Допустимые ссылки в блоках | Абсолютные URL `http://` и `https://` или относительные пути от корня Битрикс24, например `/company/personal/user/1/` ||
|| Внешние каналы | Содержимое `ATTACH` не транслируется автоматически в XMPP, email и push-уведомления ||
|#

Коды ошибок, специфичные для вложений:

#|
|| **Код** | **Когда возвращается** ||
|| `ATTACH_ERROR` | Структура вложения некорректна ||
|| `ATTACH_OVERSIZE` | Превышен лимит в 60 000 символов ||
|#

Остальные коды ошибок зависят от метода отправки — они перечислены в разделе «Возможные коды ошибок» на странице метода, например [imbot.v2.Chat.Message.send](../chat-message-send.md).

## Методы, поддерживающие ATTACH {#all-methods}

Ниже перечислены методы, которые поддерживают работу с `ATTACH`:

**Чат-боты 2.0 (`imbot.v2`)**

- [imbot.v2.Chat.Message.send](../chat-message-send.md) — отправить сообщение от имени чат-бота
- [imbot.v2.Chat.Message.update](../chat-message-update.md) — изменить сообщение чат-бота
- [imbot.v2.Command.answer](../../commands/command-answer.md) — отправить ответ чат-бота на команду

**Чаты (`im`)**

- [im.message.add](../../../../../chats/messages/im-message-add.md) — отправить сообщение в чат
- [im.message.update](../../../../../chats/messages/im-message-update.md) — изменить отправленное сообщение

**Уведомления (`im.notify`)**

- [im.notify](../../../../../chats/notifications/im-notify.md) — отправить уведомление
- [im.notify.personal.add](../../../../../chats/notifications/im-notify-personal-add.md) — отправить персональное уведомление
- [im.notify.system.add](../../../../../chats/notifications/im-notify-system-add.md) — отправить системное уведомление

## Продолжите изучение

- [Журнал изменений API imbot.v2](../../../change-log.md)
- [{#T}](./constructor.md)
- [{#T}](./block-collections/index.md)
- [Сообщения imbot.v2](../index.md)
- [{#T}](../message-keyboards.md)
- [{#T}](../message-formatting.md)
- [{#T}](../chat-message-send.md)
- [{#T}](../chat-message-update.md)
- [{#T}](../../../../../chats/notifications/im-notify.md)
