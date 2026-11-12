# Получить сообщения чата im.dialog.messages.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата или пользователь с доступом к открытому чату

Метод `im.dialog.messages.get` возвращает сообщения чата, в том числе системные.

{% note info "" %}

Без участия в чате метод отдает сообщения открытых чатов, например Общего чата. Историю чата открытой линии получают методом [imopenlines.session.history.get](../../imopenlines/openlines/sessions/imopenlines-session-history-get.md). Чат открытой линии — это переписка с клиентом из внешнего канала, например из Telegram.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID**
[`string`](../../data-types.md) | Идентификатор диалога в формате:

- `chatXXX` — групповой чат, где `XXX` — идентификатор чата
- `sgXXX` — чат группы или проекта, где `XXX` — идентификатор группы
- `XXX` — личный диалог, где `XXX` — идентификатор пользователя

Идентификатор чата вернет метод [im.chat.get](../im-chat-get.md), идентификатор пользователя — методы [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **CHAT_ID**
[`integer`](../../data-types.md) | Идентификатор чата без префикса `chat`, например `2935` ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор сообщения. Метод вернет сообщения старше него — с идентификатором меньше указанного.

Для первого запроса не передавайте. Как листать историю — в разделе [Как получить всю историю](#pagination) ||
|| **FIRST_ID**
[`integer`](../../data-types.md) | Идентификатор сообщения. Метод вернет сообщения новее него — с идентификатором больше указанного. Например, при `FIRST_ID=123` и `LIMIT=10` — до 10 сообщений с `id` больше `123`.

Если переданы и `FIRST_ID`, и `LAST_ID`, метод учитывает только `FIRST_ID` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Сколько сообщений вернуть. Если в чате есть непрочитанные сообщения, метод может вернуть больше, чем указано в `LIMIT`.

По умолчанию — `20`. Максимальное значение — `50` ||
|| **CONVERT_TEXT**
[`string`](../../data-types.md) | `Y` — добавить в каждое сообщение поле `text_converted` с текстом, в котором BB-коды преобразованы в HTML ||
|#

{% note warning "" %}

Передайте один из параметров: `DIALOG_ID` или `CHAT_ID`. Если переданы оба, метод использует `CHAT_ID`.

{% endnote %}

### Как получить всю историю {#pagination}

Стандартной постраничной навигации у метода нет: историю загружают частями через `LAST_ID` и `FIRST_ID`.

1. Запросите сообщения чата без `LAST_ID` и `FIRST_ID`. Если непрочитанных больше, чем `LIMIT`, метод вернет сообщения начиная с первого непрочитанного, иначе — последние сообщения
2. Чтобы загрузить более старые, передайте в `LAST_ID` наименьший `id` из массива `messages`. Повторяйте, пока метод не вернет пустой массив `messages`
3. Чтобы загрузить более новые, передайте в `FIRST_ID` наибольший `id` из массива `messages`. Повторяйте, пока метод не вернет пустой массив `messages`

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","FIRST_ID":84868,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.messages.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","FIRST_ID":84868,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.dialog.messages.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DialogMessagesGetResult = {
      chat_id: number
      messages: {
        id: number
        chat_id: number
        author_id: number
        date: ISODate
        text: string
        unread: boolean
        uuid: string | null
        replaces: unknown[]
        params: Record<string, unknown> | unknown[]
        disappearing_date: ISODate | null
      }[]
      users: {
        id: number
        active: boolean
        name: string
        first_name: string
        last_name: string
        status: string
        last_activity_date: ISODate | false
        type: string
      }[]
      files: {
        id: number
        chatId: number
        date: ISODate
        type: string
        name: string
        size: number
        status: string
        authorId: number
        authorName: string
        urlDownload: string
        isTranscribable: boolean
        isVideoNote: boolean
        isVoiceNote: boolean
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<DialogMessagesGetResult>({
        method: 'im.dialog.messages.get',
        params: {
          DIALOG_ID: 'chat1489',
          FIRST_ID: 84868,
          LIMIT: 10,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.chat_id, result.messages.length, result.messages)
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
      async function getDialogMessages() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.dialog.messages.get',
            params: {
              DIALOG_ID: 'chat1489',
              FIRST_ID: 84868,
              LIMIT: 10,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.chat_id, result.messages.length, result.messages)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDialogMessages)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.dialog.messages.get(
            dialog_id="chat1489",
            first_id=84868,
            limit=10,
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
        $response = $b24Service->core->call(
            'im.dialog.messages.get',
            [
                'DIALOG_ID' => 'chat1489',
                'FIRST_ID' => 84868,
                'LIMIT' => 10,
            ]
        );

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.dialog.messages.get',
        {
            DIALOG_ID: 'chat1489',
            FIRST_ID: 84868,
            LIMIT: 10
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
        'im.dialog.messages.get',
        [
            'DIALOG_ID' => 'chat1489',
            'FIRST_ID' => 84868,
            'LIMIT' => 10,
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.dialog.messages.get", b24.Params{
    	"DIALOG_ID": "chat1489",
    	"FIRST_ID":  84868,
    	"LIMIT":     10,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("im.dialog.messages.get: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "chat_id": 1489,
        "messages": [
            {
                "id": 84877,
                "chat_id": 1489,
                "author_id": 503,
                "date": "2026-03-04T09:43:26+03:00",
                "text": "Рады тебе очень!",
                "unread": false,
                "uuid": "0c42a08f-4235-49fc-994f-c9bccd499ac1",
                "replaces": [],
                "params": {
                    "LIKE": [547],
                    "FILE_ID": [5255]
                },
                "disappearing_date": null
            },
            {
                "id": 84875,
                "chat_id": 1489,
                "author_id": 503,
                "date": "2026-03-04T09:43:21+03:00",
                "text": "Привет, Анна! Здесь будем обсуждать проект.",
                "unread": false,
                "uuid": "db2e826a-dd18-4ab5-b76c-4084e106ee28",
                "replaces": [],
                "params": [],
                "disappearing_date": null
            },
            {
                "id": 84869,
                "chat_id": 1489,
                "author_id": 0,
                "date": "2026-03-04T09:42:31+03:00",
                "text": "[USER=503 REPLACE]Иван Иванов[/USER] пригласил в чат [USER=547 REPLACE]Анна Петрова[/USER]",
                "unread": false,
                "uuid": null,
                "replaces": [],
                "params": {
                    "CODE": ["CHAT_JOIN"],
                    "NOTIFY": "N"
                },
                "disappearing_date": null
            }
        ],
        "users": [
            {
                "id": 503,
                "active": true,
                "name": "Иван Иванов",
                "first_name": "Иван",
                "last_name": "Иванов",
                "work_position": "админ",
                "color": "#4ba984",
                "avatar": "https://mysite.ru/upload/resize_cache/main/avatar.jpg",
                "avatar_hr": "https://mysite.ru/upload/resize_cache/main/avatar.jpg",
                "gender": "M",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-03-04T10:13:14+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [667],
                "phones": false,
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": "ivanov@mysite.ru"
            },
            {
                "id": 547,
                "active": true,
                "name": "Анна Петрова",
                "first_name": "Анна",
                "last_name": "Петрова",
                "work_position": "Менеджер",
                "color": "#df532d",
                "avatar": "",
                "avatar_hr": "",
                "gender": "F",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "default",
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-03-04T10:11:02+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [667],
                "phones": false,
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": "petrova@mysite.ru"
            }
        ],
        "files": [
            {
                "id": 5255,
                "chatId": 1489,
                "date": "2026-03-04T09:43:27+03:00",
                "type": "image",
                "name": "image.png",
                "extension": "png",
                "size": 2144,
                "image": {
                    "height": 61,
                    "width": 72
                },
                "status": "done",
                "progress": 100,
                "authorId": 503,
                "authorName": "Иван Иванов",
                "urlPreview": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5255&exact=N&_esd=s6P3x5qDBEKU0NiS7sczr69Y%2FHHR8Za8EXa7STOAXIVOylYhMsnMj5nGU0VXeQ1PIsqm%2F0GNxOju5wR1jNj76d%2FZnVgpyqeIcJ4UiWXm8CJsrmARXWpxWe%2BgJ%2BpGqx0M5CxgjNzIopQp2cwM&fileName=image.png",
                "urlShow": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.showImage&SITE_ID=s1&humanRE=1&fileId=5255&width=1280&height=1280&signature=4b6b2bbba680d3bccd8b70e398d94c1c3cfcb018f813089c32db3bb25df594f5&exact=N&_esd=s6P3x5qDBEKU0NiS7sczr69Y%2FHHR8Za8EXa7STOAXIVOylYhMsnMj5nGU0VXeQ1PIsqm%2F0GNxOju5wR1jNj76d%2FZnVgpyqeIcJ4UiWXm8CJsrmARXWpxWe%2BgJ%2BpGqx0M5CxgjNzIopQp2cwM&fileName=image.png",
                "urlDownload": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5255&exact=N&_esd=s6P3x5qDBEKU0NiS7sczr69Y%2FHHR8Za8EXa7STOAXIVOylYhMsnMj5nGU0VXeQ1PIsqm%2F0GNxOju5wR1jNj76d%2FZnVgpyqeIcJ4UiWXm8CJsrmARXWpxWe%2BgJ%2BpGqx0M5CxgjNzIopQp2cwM&fileName=image.png",
                "viewerAttrs": {
                    "viewer": "",
                    "viewerType": "image",
                    "src": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5255&exact=N&_esd=s6P3x5qDBEKU0NiS7sczr69Y%2FHHR8Za8EXa7STOAXIVOylYhMsnMj5nGU0VXeQ1PIsqm%2F0GNxOju5wR1jNj76d%2FZnVgpyqeIcJ4UiWXm8CJsrmARXWpxWe%2BgJ%2BpGqx0M5CxgjNzIopQp2cwM&fileName=image.png",
                    "viewerResized": "",
                    "objectId": "5255",
                    "viewerGroupBy": "1489",
                    "imChatId": 1489,
                    "title": "image.png",
                    "actions": "[{\"type\":\"download\"},{\"type\":\"copyToMe\",\"text\":\"Сохранить на Диск\",\"action\":\"BXIM.disk.saveToDiskAction\",\"params\":{\"fileId\":\"5255\"},\"extension\":\"disk.viewer.actions\",\"buttonIconClass\":\"ui-btn-icon-cloud\"}]"
                },
                "mediaUrl": {
                    "preview": {
                        "250": "https://mysite.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5255&exact=N&_esd=s6P3x5qDBEKU0NiS7sczr69Y%2FHHR8Za8EXa7STOAXIVOylYhMsnMj5nGU0VXeQ1PIsqm%2F0GNxOju5wR1jNj76d%2FZnVgpyqeIcJ4UiWXm8CJsrmARXWpxWe%2BgJ%2BpGqx0M5CxgjNzIopQp2cwM&fileName=image.png"
                    }
                },
                "isTranscribable": false,
                "isVideoNote": false,
                "isVoiceNote": false
            }
        ]
    },
    "time": {
        "start": 1772608704,
        "finish": 1772608704.545697,
        "duration": 0.5456969738006592,
        "processing": 0,
        "date_start": "2026-03-04T10:18:24+03:00",
        "date_finish": "2026-03-04T10:18:24+03:00",
        "operating_reset_at": 1772609304,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **messages**
[`array`](../../data-types.md) | Массив сообщений [(подробное описание)](#message).

Метод вернет пустой массив, если в чате нет сообщений до `LAST_ID` или после `FIRST_ID` ||
|| **users**
[`array`](../../data-types.md) | Пользователи из выборки [(подробное описание)](#user).

Пустой массив в тех же случаях, что и `messages` ||
|| **files**
[`array`](../../data-types.md) | Файлы из выборки [(подробное описание)](#file).

Пустой массив в тех же случаях, что и `messages` ||
|#

#### Объект message {#message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сообщения ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора, `0` для системного сообщения ||
|| **date**
[`datetime`](../../data-types.md) | Дата сообщения в формате ISO 8601 ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения ||
|| **text_converted**
[`string`](../../data-types.md) | Текст сообщения в HTML. Приходит, если передан `CONVERT_TEXT=Y` ||
|| **unread**
[`boolean`](../../data-types.md) | Признак непрочитанного сообщения ||
|| **uuid**
[`string`](../../data-types.md) | Уникальный идентификатор сообщения, `null` для системных сообщений ||
|| **replaces**
[`array`](../../data-types.md) | Даты, которые Битрикс24 распознал в тексте сообщения [(подробное описание)](#replaces). Если дат нет — пустой массив ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры сообщения [(подробное описание)](#params).

Набор полей объекта зависит от типа сообщения: обычное или системное. Если параметров нет, приходит пустой массив `[]` ||
|| **disappearing_date**
[`datetime`](../../data-types.md) | Дата исчезновения сообщения, `null`, если не задана ||
|#

#### Объект params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **LIKE**
[`array`](../../data-types.md) | Идентификаторы пользователей, которые поставили реакцию сообщению ||
|| **CODE**
[`array`](../../data-types.md) | Коды системных событий, например:
- `CHAT_JOIN` — пользователь добавлен в чат
- `CHAT_LEAVE` — пользователь покинул чат ||
|| **NOTIFY**
[`string`](../../data-types.md) | Признак отправки уведомления. Значение `N` — уведомление не отправляется ||
|| **FILE_ID**
[`array`](../../data-types.md) | Идентификаторы файлов, которые прикреплены к сообщению ||
|| **ATTACH**
[`array`](../../data-types.md) | Вложения сообщения. Формат описан в статье [Вложения](./attachments.md) ||
|| **KEYBOARD**
[`array`](../../data-types.md) | Кнопки под сообщением. Формат описан в статье [Работа с клавиатурами](./keyboards.md) ||
|| **MENU**
[`array`](../../data-types.md) | Пункты контекстного меню сообщения. Формат описан в статье [Контекстное меню](./menu.md) ||
|| **IS_EDITED**
[`string`](../../data-types.md) | `Y`, если сообщение изменено ||
|| **IS_DELETED**
[`string`](../../data-types.md) | `Y`, если сообщение удалено ||
|| **DATE_TEXT**
[`array`](../../data-types.md) | Даты из текста сообщения в том виде, как они написаны ||
|| **DATE_TS**
[`array`](../../data-types.md) | Те же даты в формате Unix timestamp ||
|| **CHAT_ID**
[`integer`](../../data-types.md) | Идентификатор чата, который создан из этого сообщения методом [im.message.share](./im-message-share.md). Приходит в системном сообщении о создании чата ||
|#

Ключи с пустыми значениями и значениями по умолчанию в `params` не приходят.

#### Объект replaces {#replaces}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип замены. Сейчас всегда `DATE` ||
|| **text**
[`string`](../../data-types.md) | Фрагмент текста с датой, например `12.11.2026 в 15:00` ||
|| **value**
[`datetime`](../../data-types.md) | Распознанная дата в формате ISO 8601 ||
|| **start**
[`integer`](../../data-types.md) | Позиция начала фрагмента в тексте сообщения ||
|| **end**
[`integer`](../../data-types.md) | Позиция конца фрагмента в тексте сообщения ||
|#

#### Объект user {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Признак активного пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия ||
|| **first_name**
[`string`](../../data-types.md) | Имя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия ||
|| **work_position**
[`string`](../../data-types.md) | Должность ||
|| **color**
[`string`](../../data-types.md) | Цвет аватара в формате hex ||
|| **avatar**
[`string`](../../data-types.md) | Ссылка на аватар ||
|| **avatar_hr**
[`string`](../../data-types.md) | Ссылка на аватар в высоком разрешении ||
|| **gender**
[`string`](../../data-types.md) | Пол.
- `M` — мужской
- `F` — женский ||
|| **birthday**
[`string`](../../data-types.md) | Дата рождения ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-пользователя ||
|| **intranet_user**
[`boolean`](../../data-types.md) | `true`, если пользователь — сотрудник: состоит в отделе компании и его учетная запись не внешняя ||
|| **internal_account**
[`boolean`](../../data-types.md) | `true`, если учетная запись не внешняя, например не принадлежит клиенту открытой линии ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя сети Bitrix24 ||
|| **bot**
[`boolean`](../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Тип авторизации ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя ||
|| **idle**
[`datetime`](../../data-types.md) | Дата в формате ISO 8601, если пользователь неактивен, иначе `false` ||
|| **last_activity_date**
[`datetime`](../../data-types.md) | Дата последней активности или `false` ||
|| **mobile_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в мобильном приложении, `false`, если приложение не использовалось ||
|| **desktop_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в десктопном приложении, `false`, если приложение не использовалось ||
|| **absent**
[`datetime`](../../data-types.md) | Дата в формате ISO 8601, если пользователь отсутствует, иначе `false` ||
|| **departments**
[`array`](../../data-types.md) | Идентификаторы отделов пользователя ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя или `false`, если телефоны не заданы ||
|| **bot_data**
[`object`](../../data-types.md) | Данные бота, `null` для обычного пользователя ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../../data-types.md) | Сайт пользователя ||
|| **email**
[`string`](../../data-types.md) | E-mail пользователя ||
|#

#### Объект file {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **date**
[`datetime`](../../data-types.md) | Дата загрузки файла ||
|| **type**
[`string`](../../data-types.md) | Тип файла: `image`, `video`, `audio`, `file` ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **extension**
[`string`](../../data-types.md) | Расширение файла ||
|| **size**
[`integer`](../../data-types.md) | Размер в байтах ||
|| **image**
[`object`](../../data-types.md) | Размеры изображения для файлов типа `image` [(подробное описание)](#image) ||
|| **status**
[`string`](../../data-types.md) | Статус файла: `done` — загружен ||
|| **progress**
[`integer`](../../data-types.md) | Процент загрузки файла ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор автора файла ||
|| **authorName**
[`string`](../../data-types.md) | Имя автора файла ||
|| **urlPreview**
[`string`](../../data-types.md) | Ссылка для предпросмотра файла ||
|| **urlShow**
[`string`](../../data-types.md) | Ссылка для отображения файла ||
|| **urlDownload**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **viewerAttrs**
[`object`](../../data-types.md) | Атрибуты для просмотрщика файлов [(подробное описание)](#viewerAttrs) ||
|| **mediaUrl**
[`object`](../../data-types.md) | URL медиафайла для предпросмотра [(подробное описание)](#mediaUrl) ||
|| **isTranscribable**
[`boolean`](../../data-types.md) | Признак возможности транскрибации ||
|| **isVideoNote**
[`boolean`](../../data-types.md) | Признак видеозаметки ||
|| **isVoiceNote**
[`boolean`](../../data-types.md) | Признак голосовой заметки ||
|#

#### Объект image {#image}

#|
|| **Название**
`тип` | **Описание** ||
|| **height**
[`integer`](../../data-types.md) | Высота изображения в пикселях ||
|| **width**
[`integer`](../../data-types.md) | Ширина изображения в пикселях ||
|#

#### Объект viewerAttrs {#viewerAttrs}

#|
|| **Название**
`тип` | **Описание** ||
|| **viewer**
[`string`](../../data-types.md) | Тип просмотрщика ||
|| **viewerType**
[`string`](../../data-types.md) | Тип отображения файла ||
|| **src**
[`string`](../../data-types.md) | Ссылка на файл ||
|| **viewerResized**
[`string`](../../data-types.md) | Ссылка на уменьшенную версию файла ||
|| **objectId**
[`string`](../../data-types.md) | Идентификатор объекта файла ||
|| **viewerGroupBy**
[`string`](../../data-types.md) | Идентификатор группы для просмотра файлов в чате ||
|| **imChatId**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **title**
[`string`](../../data-types.md) | Имя файла ||
|| **actions**
[`string`](../../data-types.md) | Доступные действия с файлом в формате JSON ||
|#

#### Объект mediaUrl {#mediaUrl}

#|
|| **Название**
`тип` | **Описание** ||
|| **preview**
[`object`](../../data-types.md) | Ссылки для предпросмотра файла. Ключи объекта — размеры изображения в пикселях ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Параметр `DIALOG_ID` не передан, передан пустым или в неверном формате ||
|| `400` | `FIRST_ID_STRING` | First ID can't be string | Значение `FIRST_ID` состоит не только из цифр, например `abc`, `-1` или `1.5` ||
|| `400` | `LAST_ID_STRING` | Last ID can't be string | Значение `LAST_ID` состоит не только из цифр, например `abc`, `-1` или `1.5` ||
|| `403` | `ACCESS_ERROR` | You do not have access to the specified dialog | У пользователя нет доступа к чату ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./im-message-delete.md)
- [{#T}](./im-message-like.md)
- [{#T}](./im-message-share.md)
- [{#T}](./im-message-command.md)
- [{#T}](./im-dialog-messages-search.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
