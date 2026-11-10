# Форматирование сообщений

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

BB-коды позволяют форматировать текст сообщений: выделять фрагменты, добавлять ссылки и переносы строк, вставлять иконки, изображения и дату.

## Когда использовать форматирование

Разметка нужна, когда сообщение должно читаться как оформленный текст, а не как сплошная строка: выделить главное, разбить на строки, дать ссылку на сотрудника или чат, показать код без искажений.

Для других задач в разделе есть свои механизмы:

- добавить кнопки под сообщением — [клавиатуры](./keyboards.md)
- приложить структурированные блоки, изображения или таблицы — [вложения](./attachments.md)
- добавить пункты в контекстное меню сообщения — [меню](./menu.md)

## Что нужно перед началом

- скоуп [`im`](../../scopes/permissions.md)
- право отправлять сообщения в чат, куда адресовано сообщение
- сообщение не длиннее 20 000 символов

Первые 20 000 символов Битрикс24 сохраняет всегда, а более длинный текст может обрезать по этой границе и дописать в конце ` (...)`. Ошибку метод при этом не возвращает, поэтому длину проверяйте на своей стороне.

Разметку передают в поле `MESSAGE` методов [im.message.add](./im-message-add.md) и [im.message.update](./im-message-update.md). Коды регистронезависимы: `[b]` и `[B]` работают одинаково.

Битрикс24 хранит сообщение вместе с кодами, а разбирает их при показе в мессенджере. Метод чтения [im.dialog.messages.get](./im-dialog-messages-get.md) вернет тот же текст с кодами, а не готовую разметку.

## Поддерживаемые коды {#codes}

Ниже — основные коды для сообщений, которые отправляют методы `im.message.*`. У чат-ботов набор шире, их справочник в статье [Форматирование текста (BB-коды)](../../chat-bots/chat-bots-v2/imbot.v2/messages/message-formatting.md). Особенности обработки отдельных кодов собраны в разделе [{#T}](#notes).

### Оформление текста

#|
|| **Код** | **Что делает** | **Пример** ||
|| `[B]...[/B]` | Жирный текст | `[B]важно[/B]` ||
|| `[I]...[/I]` | Курсив | `[I]примечание[/I]` ||
|| `[U]...[/U]` | Подчеркивание | `[U]термин[/U]` ||
|| `[S]...[/S]` | Зачеркивание | `[S]отменено[/S]` ||
|| `[SIZE=N]...[/SIZE]` | Размер шрифта от 8 до 30 пикселей. Меньшие значения Битрикс24 поднимает до 8, большие опускает до 30. Суффиксы `px` и `pt` допустимы | `[SIZE=20]крупно[/SIZE]` ||
|| `[COLOR=#HEX]...[/COLOR]` | Цвет текста, `#RGB` или `#RRGGBB` | `[COLOR=#ff0000]красный[/COLOR]` ||
|| `[CODE]...[/CODE]` | Текст без разбора кодов внутри | `[CODE]var x = [B];[/CODE]` ||
|#

### Переносы строк {#newline}

#|
|| **Что передать** | **Что делает** | **Пример** ||
|| `[BR]` | Перенос строки | `первая[BR]вторая` ||
|| Символ `\n` | Перенос строки | `первая\nвторая` ||
|#

### Ссылки и упоминания

#|
|| **Код** | **Что делает** | **Пример** ||
|| `[URL]...[/URL]` | Ссылка, текст совпадает с адресом | `[URL]https://example.com[/URL]` ||
|| `[URL=адрес]...[/URL]` | Ссылка с произвольным текстом | `[URL=https://example.com]сайт[/URL]` ||
|| `[USER=id]...[/USER]` | Упоминание сотрудника | `[USER=1]Иван[/USER]` ||
|| `[USER=all]...[/USER]` | Упоминание всех участников чата | `[USER=all]Все[/USER]` ||
|| `[CHAT=id]...[/CHAT]` | Ссылка на чат | `[CHAT=5]Отдел продаж[/CHAT]` ||
|| `[CONTEXT=диалог/сообщение]...[/CONTEXT]` | Ссылка на сообщение в диалоге | `[CONTEXT=chat5/41017]контекст[/CONTEXT]` ||
|#

### Действия

#|
|| **Код** | **Что делает** | **Пример** ||
|| `[SEND=текст]...[/SEND]` | Ссылка, которая отправляет текст в чат | `[SEND=/help]справка[/SEND]` ||
|| `[SEND]текст[/SEND]` | То же, в чат уходит текст ссылки | `[SEND]/help[/SEND]` ||
|| `[PUT=текст]...[/PUT]` | Ссылка, которая подставляет текст в поле ввода | `[PUT=/help]подставить[/PUT]` ||
|| `[PUT]текст[/PUT]` | То же, в поле ввода подставляется текст ссылки | `[PUT]/help[/PUT]` ||
|| `[CALL=номер]...[/CALL]` | Ссылка, которая начинает звонок | `[CALL=+70000000000]позвонить[/CALL]` ||
|| `[CALL]номер[/CALL]` | То же, номер берется из текста ссылки | `[CALL]+70000000000[/CALL]` ||
|#

### Вставки

#|
|| **Код** | **Что делает** | **Пример** ||
|| `[ICON=адрес]` | Иконка по ссылке на изображение. Дополнительно принимает `title`. Размер задают через `size` или через `width` и `height`: если указано одно измерение, второе станет таким же. По умолчанию 20 пикселей, максимум 100 | `[ICON=https://example.com/i.png title=Готово size=20]` ||
|| `[IMG SIZE=размер]адрес[/IMG]` | Изображение. Размер — `small`, `medium` или `large`; с другим значением код останется обычным текстом | `[IMG SIZE=medium]https://example.com/p.png[/IMG]` ||
|| `[TIMESTAMP=метка FORMAT=формат]` | Дата и время из Unix-метки в часовом поясе читателя. Допустимые форматы — [ниже](#timestamp-formats) | `[TIMESTAMP=1789000000 FORMAT=SHORT_TIME_FORMAT]` ||
|#

#### Форматы даты и времени {#timestamp-formats}

Значение `FORMAT` должно совпадать с одним из перечисленных. Если формат не распознан, Битрикс24 покажет сам код как обычный текст.

#|
|| **Формат** | **Что показывает** ||
|| `FORMAT_DATE` | Дата ||
|| `FORMAT_DATETIME` | Дата и время с секундами ||
|| `SHORT_DATE_FORMAT` | Дата числами ||
|| `MEDIUM_DATE_FORMAT` | Дата с сокращенным названием месяца ||
|| `LONG_DATE_FORMAT` | Дата с полным названием месяца ||
|| `DAY_MONTH_FORMAT` | День и полное название месяца, без года ||
|| `DAY_SHORT_MONTH_FORMAT` | День и сокращенное название месяца, без года ||
|| `SHORT_DAY_OF_WEEK_MONTH_FORMAT` | Сокращенный день недели, день и полное название месяца ||
|| `SHORT_DAY_OF_WEEK_SHORT_MONTH_FORMAT` | Сокращенный день недели, день и сокращенное название месяца ||
|| `DAY_OF_WEEK_MONTH_FORMAT` | Полный день недели, день и название месяца ||
|| `FULL_DATE_FORMAT` | День недели, дата и год ||
|| `SHORT_TIME_FORMAT` | Часы и минуты ||
|| `LONG_TIME_FORMAT` | Часы, минуты и секунды ||
|#

Как именно выглядит результат, зависит от языка и настроек Битрикс24. Один и тот же код `SHORT_TIME_FORMAT` в одном случае даст `00:26`, в другом — `3:26 am`. Время приводится к часовому поясу читателя, поэтому у разных участников чата значение будет разным.

## Что учитывать {#notes}

Три случая, где поведение расходится с ожидаемым.

- **`[BR]` не сохраняется как код.** При записи Битрикс24 заменяет `[BR]` и `[br]` на символ `\n`, поэтому метод чтения вернет перенос строки, а не тег. Запись в смешанном регистре остается в тексте, но в чате тоже показывается переносом
- **`[IMG]` работает только с прямой ссылкой на изображение.** Если адрес ведет на страницу или на файл другого типа, код останется в сообщении обычным текстом
- **`[DISK=id]` — не разметка, а метка прикрепления.** Битрикс24 попробует приложить к сообщению файл Диска с этим идентификатором, а сам код уберет из текста

## Пример отправки сообщения с форматированием

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.message.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2725","MESSAGE":"[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]","auth":"**put_access_token_here**"}' \
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
          MESSAGE: '[B]Important[/B][BR]Open [URL=https://bitrix24.ru]site[/URL][BR][SEND=/help]Help[/SEND]',
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
      async function addMessage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.message.add',
            params: {
              DIALOG_ID: 'chat2725',
              MESSAGE: '[B]Important[/B][BR]Open [URL=https://bitrix24.ru]site[/URL][BR][SEND=/help]Help[/SEND]',
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

      document.addEventListener('DOMContentLoaded', addMessage)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.im.message.add(
          dialog_id="chat2725",
          message="[B]Важное[/B][BR]Откройте [URL=https://bitrix24.com]сайт[/URL][BR][SEND=/help]Помощь[/SEND]",
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
                  'MESSAGE' => '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
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
          MESSAGE: '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
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
          'MESSAGE' => '[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]',
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.message.add", b24.Params{
    	"DIALOG_ID": "chat2725",
    	"MESSAGE":   "[B]Важное[/B][BR]Откройте [URL=https://bitrix24.ru]сайт[/URL][BR][SEND=/help]Помощь[/SEND]",
    })
    if err != nil {
    	return fmt.Errorf("im.message.add: %w", err)
    }

    // Ответ приходит как json.RawMessage — метод возвращает
    // идентификатор созданного сообщения.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

{% note warning "" %}

Актуальная документация по форматированию находится в разделе Чат-боты 2.0:

- [Форматирование текста (BB-коды)](../../chat-bots/chat-bots-v2/imbot.v2/messages/message-formatting.md)

{% endnote %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./keyboards.md)
- [{#T}](./attachments.md)
- [{#T}](./menu.md)
- [{#T}](./index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/index.md)
- [{#T}](../../chat-bots/chat-bots-v2/imbot.v2/messages/chat-message-send.md)
