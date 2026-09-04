# Вложения в сообщениях

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

`ATTACH` — структурированное вложение сообщения: карточка из блоков с текстом, ссылками, изображениями, файлами, таблицами и разделителями. Вложение передают в параметре `ATTACH` методов [im.message.add](./im-message-add.md) и [im.message.update](./im-message-update.md).

Полное описание полей вложения и всех типов блоков — в справочнике [Вложения в сообщениях ATTACH](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/index.md).

## Когда использовать ATTACH

- нужна карточка из нескольких видов содержимого: заголовок, ссылка, изображение, файл, таблица значений. Форматированного текста в `MESSAGE` для этого не хватает — BB-коды описаны в статье [Форматирование](./formatting.md)
- содержимое только для чтения, реагировать на него нажатием не нужно. Кнопки под сообщением добавляет `KEYBOARD` — [Работа с клавиатурами](./keyboards.md), пункты в меню сообщения добавляет `MENU` — [Работа с контекстным меню](./menu.md)

Выбор не исключающий: `im.message.add` принимает `MESSAGE`, `ATTACH`, `KEYBOARD` и `MENU` в одном вызове.

## Что нужно перед началом

- скоуп [`im`](../../scopes/permissions.md)
- право отправлять сообщения в чат, куда адресовано сообщение
- вложение короче 60 000 символов в сериализованном виде

Битрикс24 переводит вложение в JSON целиком, вместе с полями `ID`, `COLOR_TOKEN` и `COLOR`, и сравнивает с лимитом длину получившейся строки. Если условие не выполнено, сообщение не отправляется, а метод возвращает ошибку — коды собраны в разделе «Обработка ошибок» страницы [im.message.add](./im-message-add.md).

## Как собрать вложение

1. Соберите массив блоков. Каждый элемент — объект с одним ключом верхнего уровня, и этот ключ задает тип блока.
2. Оберните массив в объект с полями `ID`, `COLOR_TOKEN` и `COLOR`, если нужны метаданные карточки. Без метаданных передавайте массив как есть.
3. Передайте результат в параметре `ATTACH` метода [im.message.add](./im-message-add.md). Чтобы заменить вложение в отправленном сообщении, вызовите [im.message.update](./im-message-update.md) с новым значением `ATTACH`.

`ID` задает номер вложения внутри сообщения, `COLOR_TOKEN` — цветовую схему карточки, `COLOR` — явный HEX-цвет.

После успешного вызова `im.message.add` карточка появляется в чате, а метод возвращает идентификатор созданного сообщения. Заменить вложение методом `im.message.update` можно, пока не истек срок на редактирование сообщения.

### Типы блоков

- [`MESSAGE`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/text.md) — абзац текста с BB-кодами
- [`LINK`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/links.md) — ссылка с подписью
- [`USER`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/user.md) — карточка сотрудника
- [`GRID`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/grid.md) — строки «название — значение»
- [`IMAGE`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/images.md) — изображения
- [`FILE`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/files.md) — файл со ссылкой на скачивание
- [`DELIMITER`](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/delimiter.md) — разделитель между частями карточки

Параметры каждого блока — в [коллекции блоков ATTACH](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/index.md).

## Две формы ATTACH

### Полная форма

```js
ATTACH: {
    ID: 1,
    COLOR_TOKEN: 'primary',
    BLOCKS: [
        { MESSAGE: 'Новая заявка' },
        { LINK: { NAME: 'Открыть', LINK: 'https://example.com' } }
    ]
}
```

### Краткая форма

Если метаданные вложения не нужны, передайте сразу массив блоков:

```js
ATTACH: [
    { MESSAGE: 'Новая заявка' },
    { LINK: { NAME: 'Открыть', LINK: 'https://example.com' } }
]
```

{% note warning "" %}

В методах `im.message.*` вложение передают в параметре `ATTACH` на верхнем уровне запроса. В методах чат-ботов `imbot.v2.*` тот же объект лежит в `fields.attach`. Пример из справочника не заработает в `im.message.*`, если не убрать эту обертку.

{% endnote %}

## Пример отправки сообщения с ATTACH

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Карточка","ATTACH":{"ID":1,"COLOR_TOKEN":"primary","BLOCKS":[{"MESSAGE":"[B]Новая заявка[/B]"},{"LINK":{"NAME":"Открыть","LINK":"https://example.com"}}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Карточка","ATTACH":{"ID":1,"COLOR_TOKEN":"primary","BLOCKS":[{"MESSAGE":"[B]Новая заявка[/B]"},{"LINK":{"NAME":"Открыть","LINK":"https://example.com"}}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.message.add
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
        method: 'im.message.add',
        params: {
          DIALOG_ID: 'chat2725',
          MESSAGE: 'Card',
          ATTACH: {
            ID: 1,
            COLOR_TOKEN: 'primary',
            BLOCKS: [
              { MESSAGE: '[B]New request[/B]' },
              { LINK: { NAME: 'Open', LINK: 'https://example.com' } },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created message ID:', result)
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
      async function sendMessageWithAttach() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.add',
            params: {
              DIALOG_ID: 'chat2725',
              MESSAGE: 'Card',
              ATTACH: {
                ID: 1,
                COLOR_TOKEN: 'primary',
                BLOCKS: [
                  { MESSAGE: '[B]New request[/B]' },
                  { LINK: { NAME: 'Open', LINK: 'https://example.com' } },
                ],
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
          console.info('Created message ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendMessageWithAttach)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.im.message.add(
          dialog_id="chat2725",
          message="Карточка",
          attach={
              "ID": 1,
              "COLOR_TOKEN": "primary",
              "BLOCKS": [
                  {
                      "MESSAGE": "[B]Новая заявка[/B]",
                  },
                  {
                      "LINK": {
                          "NAME": "Открыть",
                          "LINK": "https://example.com",
                      },
                  },
              ],
          },
      ).response
      result = bitrix_response.result
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

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'im.message.add',
              [
                  'DIALOG_ID' => 'chat2725',
                  'MESSAGE' => 'Карточка',
                  'ATTACH' => [
                      'ID' => 1,
                      'COLOR_TOKEN' => 'primary',
                      'BLOCKS' => [
                          ['MESSAGE' => '[B]Новая заявка[/B]'],
                          ['LINK' => ['NAME' => 'Открыть', 'LINK' => 'https://example.com']],
                      ],
                  ],
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Created message ID: ' . $result;
  } catch (Throwable $e) {
      error_log($e->getMessage());
      echo 'Error: ' . $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'im.message.add',
      {
          DIALOG_ID: 'chat2725',
          MESSAGE: 'Карточка',
          ATTACH: {
              ID: 1,
              COLOR_TOKEN: 'primary',
              BLOCKS: [
                  { MESSAGE: '[B]Новая заявка[/B]' },
                  { LINK: { NAME: 'Открыть', LINK: 'https://example.com' } },
              ],
          },
      },
      function(result) {
          if (result.error()) {
              console.error(result.error().ex);
          } else {
              console.log(result.data());
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'im.message.add',
      [
          'DIALOG_ID' => 'chat2725',
          'MESSAGE' => 'Карточка',
          'ATTACH' => [
              'ID' => 1,
              'COLOR_TOKEN' => 'primary',
              'BLOCKS' => [
                  ['MESSAGE' => '[B]Новая заявка[/B]'],
                  ['LINK' => ['NAME' => 'Открыть', 'LINK' => 'https://example.com']],
              ],
          ],
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.message.add", b24.Params{
    	"DIALOG_ID": "chat2725",
    	"MESSAGE":   "Карточка",
    	"ATTACH": b24.Params{
    		"ID":          1,
    		"COLOR_TOKEN": "primary",
    		"BLOCKS": []b24.Params{
    			{
    				"MESSAGE": "[B]Новая заявка[/B]",
    			},
    			{
    				"LINK": b24.Params{
    					"NAME": "Открыть",
    					"LINK": "https://example.com",
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("im.message.add: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа со страницы метода im.message.add.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./formatting.md)
- [{#T}](./index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/attachments/block-collections/index.md)
