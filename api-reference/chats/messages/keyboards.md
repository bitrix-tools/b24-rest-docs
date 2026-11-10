# Работа с клавиатурами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

`KEYBOARD` добавляет в сообщение интерактивные кнопки: переход по ссылке, подстановку текста в поле ввода, звонок и другие действия.

Клавиатуру передают в параметре `KEYBOARD` при отправке или обновлении сообщения: [im.message.add](./im-message-add.md), [im.message.update](./im-message-update.md).

## Что можно сделать

- открыть ссылку: `LINK`
- подставить или отправить текст, скопировать его, позвонить, открыть чат: `ACTION`
- выполнить команду чат-бота: `COMMAND` — работает только в клавиатуре самого бота
- перенести следующие кнопки на новую строку: `TYPE`

Кнопки нужны, когда от пользователя ждут действия в ответ на сообщение. Для других задач в разделе есть свои механизмы:

- оформить текст сообщения — [форматирование](./formatting.md)
- приложить структурированные блоки, изображения или таблицы — [вложения](./attachments.md)
- добавить пункты в контекстное меню сообщения — [меню](./menu.md)

## Поля кнопки {#button-fields}

Кнопки перечисляют в массиве `KEYBOARD.BUTTONS`. Битрикс24 принимает и сокращенные формы: массив кнопок без обертки `BUTTONS` и ту же структуру строкой JSON — обертка подставляется автоматически.

У обычной кнопки обязателен `TEXT` и хотя бы одно действие: `LINK`, `APP_ID`, пара `ACTION` и `ACTION_VALUE` или `COMMAND`.

#|
|| **Название**
`тип` | **Описание** ||
|| **TEXT**
[`string`](../../data-types.md) | Текст кнопки ||
|| **LINK**
[`string`](../../data-types.md) | Ссылка. Принимаются только адреса, начинающиеся с `http://`, `https://` или `/` ||
|| **ACTION**
[`string`](../../data-types.md) | Действие кнопки:

- `PUT` — подставить текст в поле ввода
- `SEND` — отправить текст
- `COPY` — скопировать текст в буфер обмена
- `CALL` — позвонить
- `DIALOG` — открыть чат ||
|| **ACTION_VALUE**
[`string`](../../data-types.md) | Значение для `ACTION`: текст для `PUT`, `SEND` и `COPY`, номер телефона для `CALL`, идентификатор диалога для `DIALOG`. Передается только вместе с `ACTION`, пустым быть не может ||
|| **COMMAND**
[`string`](../../data-types.md) | Команда чат-бота. Ведущий символ `/` можно не передавать: Битрикс24 его уберет.

Методы [im.message.add](./im-message-add.md) и [im.message.update](./im-message-update.md) отправляют сообщение от имени пользователя, поэтому кнопка с `COMMAND` в него не попадет — подробности [ниже](#dropped-buttons) ||
|| **COMMAND_PARAMS**
[`string`](../../data-types.md) | Параметры команды. Передается вместе с `COMMAND` ||
|| **APP_ID**
[`integer`](../../data-types.md) | Идентификатор приложения для чата.

Устаревший сценарий: сервер такую кнопку принимает, но веб-мессенджер по ней приложение не открывает. Чтобы открыть интерфейс приложения из чата, используйте [встройки мессенджера](../../widgets/im/index.md) ||
|| **APP_PARAMS**
[`string`](../../data-types.md) | Параметры запуска приложения. Передается вместе с `APP_ID` ||
|| **TYPE**
[`string`](../../data-types.md) | Превращает элемент массива в служебную кнопку-разделитель. Единственное значение — `NEWLINE`, описано [ниже](#newline) ||
|#

Кроме перечисленных, `ACTION` принимает служебные значения `LIVECHAT` и `HELP`. Их поведение в интерфейсе документация не описывает — в своих клавиатурах используйте значения из таблицы.

Внешний вид и состояние кнопки задают еще десять полей: `BLOCK`, `DISABLED`, `CONTEXT`, `DISPLAY`, `WIDTH`, `BG_COLOR`, `BG_COLOR_TOKEN`, `TEXT_COLOR`, `OFF_BG_COLOR`, `OFF_TEXT_COLOR`. На действие кнопки они не влияют, их описание — в статье [Клавиатуры в сообщениях](../../chat-bots/chat-bots-v2/imbot.v2/messages/message-keyboards.md).

Сериализованная клавиатура должна быть короче 60 000 символов. Клавиатура большего размера в сообщение не попадает, а [im.message.update](./im-message-update.md) возвращает ошибку `KEYBOARD_OVERSIZE`.

### Какие кнопки не попадут в сообщение {#dropped-buttons}

Кнопка не попадет в сообщение в двух случаях: если у нее нет текста или если Битрикс24 не распознал ни одного действия. Незнакомые поля не мешают: на кнопку они не влияют.

Текст кнопки не может быть пустым, состоять из одних пробелов или быть строкой `"0"`. Такая кнопка не попадет в сообщение, какое бы действие вы ни задали.

Действие определяет первое подходящее поле в порядке `LINK`, `APP_ID`, `ACTION`, `COMMAND`. Поле с ошибкой кнопку не потеряет — проверка перейдет к следующему. Например, кнопка с неверной ссылкой и корректной парой `ACTION` и `ACTION_VALUE` отправится: сработает действие, а ссылка будет пропущена.

Битрикс24 не распознает действие, если:

- значение `ACTION` вне допустимых или `ACTION` передан без `ACTION_VALUE`
- `LINK` не прошел проверку формата
- передано только `COMMAND`, а сообщение отправляют методы `im.message.*`. Кнопки с командами отправляйте методами раздела [Чат-боты 2.0](../../chat-bots/chat-bots-v2/imbot.v2/messages/index.md)

{% note warning "" %}

Ошибки при этом не будет. Если в клавиатуре осталась хотя бы одна рабочая кнопка, метод вернет `200` и отправит сообщение без потерянных кнопок. Ошибка `KEYBOARD_ERROR` приходит, только когда не осталось ни одной

{% endnote %}

Чтобы убедиться, что клавиатура собралась целиком, прочитайте отправленное сообщение методом [im.dialog.messages.get](./im-dialog-messages-get.md): клавиатура приходит в `result.messages[].params.KEYBOARD`.

Сравнивать ответ с запросом дословно не получится: к каждой кнопке Битрикс24 добавляет служебные поля, в том числе `TYPE`, `BOT_ID`, `BLOCK`, `DISABLED`, `DISPLAY`, `CONTEXT`. Сверяйте состав кнопок и их действия.

### Перенос строки {#newline}

Кнопка `{"TYPE": "NEWLINE"}` не отображается и не выполняет действий — она переносит следующие кнопки на новую строку. Других полей у нее нет: `TEXT` и действие указывать не нужно.

В ответе методов чтения сообщений разделитель возвращается как есть, а у обычных кнопок появляется служебное поле `TYPE` со значением `BUTTON`.

## Пример отправки сообщения с клавиатурой

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие","KEYBOARD":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить команду","ACTION":"PUT","ACTION_VALUE":"/help"}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"Выберите действие","KEYBOARD":{"BUTTONS":[{"TEXT":"Открыть сайт","LINK":"https://www.example.ru/"},{"TYPE":"NEWLINE"},{"TEXT":"Подставить команду","ACTION":"PUT","ACTION_VALUE":"/help"}]},"auth":"**put_access_token_here**"}' \
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
          MESSAGE: 'Choose an action',
          KEYBOARD: {
            BUTTONS: [
              { TEXT: 'Open site', LINK: 'https://www.example.ru/' },
              { TYPE: 'NEWLINE' },
              { TEXT: 'Insert command', ACTION: 'PUT', ACTION_VALUE: '/help' },
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
      async function sendMessageWithKeyboard() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.add',
            params: {
              DIALOG_ID: 'chat2725',
              MESSAGE: 'Choose an action',
              KEYBOARD: {
                BUTTONS: [
                  { TEXT: 'Open site', LINK: 'https://www.example.ru/' },
                  { TYPE: 'NEWLINE' },
                  { TEXT: 'Insert command', ACTION: 'PUT', ACTION_VALUE: '/help' },
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

      document.addEventListener('DOMContentLoaded', sendMessageWithKeyboard)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.im.message.add(
          dialog_id="chat2725",
          message="Выберите действие",
          keyboard={
              "BUTTONS": [
                  {
                      "TEXT": "Открыть сайт",
                      "LINK": "https://www.example.com/",
                  },
                  {
                      "TYPE": "NEWLINE",
                  },
                  {
                      "TEXT": "Подставить команду",
                      "ACTION": "PUT",
                      "ACTION_VALUE": "/help",
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
                  'MESSAGE' => 'Выберите действие',
                  'KEYBOARD' => [
                      'BUTTONS' => [
                          ['TEXT' => 'Открыть сайт', 'LINK' => 'https://www.example.ru/'],
                          ['TYPE' => 'NEWLINE'],
                          ['TEXT' => 'Подставить команду', 'ACTION' => 'PUT', 'ACTION_VALUE' => '/help'],
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
          MESSAGE: 'Выберите действие',
          KEYBOARD: {
              BUTTONS: [
                  { TEXT: 'Открыть сайт', LINK: 'https://www.example.ru/' },
                  { TYPE: 'NEWLINE' },
                  { TEXT: 'Подставить команду', ACTION: 'PUT', ACTION_VALUE: '/help' },
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
          'MESSAGE' => 'Выберите действие',
          'KEYBOARD' => [
              'BUTTONS' => [
                  ['TEXT' => 'Открыть сайт', 'LINK' => 'https://www.example.ru/'],
                  ['TYPE' => 'NEWLINE'],
                  ['TEXT' => 'Подставить команду', 'ACTION' => 'PUT', 'ACTION_VALUE' => '/help'],
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
    	"MESSAGE":   "Выберите действие",
    	"KEYBOARD": b24.Params{
    		"BUTTONS": []b24.Params{
    			{
    				"TEXT": "Открыть сайт",
    				"LINK": "https://www.example.ru/",
    			},
    			{
    				"TYPE": "NEWLINE",
    			},
    			{
    				"TEXT":         "Подставить команду",
    				"ACTION":       "PUT",
    				"ACTION_VALUE": "/help",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("im.message.add: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его в структуру
    // под форму ответа со страницы метода im.message.add.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

{% note warning "" %}

Актуальная документация по клавиатурам находится в разделе Чат-боты 2.0:

- [Клавиатуры в сообщениях](../../chat-bots/chat-bots-v2/imbot.v2/messages/message-keyboards.md)

{% endnote %}

## Продолжите изучение

- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
