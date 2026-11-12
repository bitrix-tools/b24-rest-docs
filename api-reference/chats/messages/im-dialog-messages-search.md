# Найти сообщения в чате im.dialog.messages.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата или пользователь с доступом к открытому чату

Метод `im.dialog.messages.search` ищет сообщения в чате по тексту и дате.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата, в котором искать сообщения, — число без префикса `chat`. Его можно получить методом [im.chat.get](../im-chat-get.md) ||
|| **SEARCH_MESSAGE**
[`string`](../../data-types.md) | Текст, который нужно найти в сообщениях.

Метод ищет только по строке длиннее 2 символов. Если передать 1–2 символа, метод вернет сообщения чата без фильтра по тексту ||
|| **DATE_FROM**
[`datetime`](../../data-types.md) | Начало периода поиска в формате ISO 8601 (RFC3339) ||
|| **DATE_TO**
[`datetime`](../../data-types.md) | Конец периода поиска в формате ISO 8601 (RFC3339) ||
|| **DATE**
[`datetime`](../../data-types.md) | Дата в формате ISO 8601 (RFC3339), за которую нужны сообщения.

Если параметр передан, поиск выполняется в пределах суток от указанной даты ||
|| **ORDER**
[`object`](../../data-types.md) | Сортировка. Доступно одно поле:
- `ID` — направление сортировки, значения `ASC` (по возрастанию) или `DESC` (по убыванию). Метод сортирует по дате создания сообщения, затем по `id`

По умолчанию — `{"ID": "DESC"}` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Сколько сообщений вернуть.

По умолчанию — `50`. Максимальное значение — `200`: большее метод уменьшает до `200`, а `0` и отрицательное заменяет на `50` ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего сообщения на предыдущей странице — поле `id` последнего элемента массива `messages`. Метод вернет сообщения, которые идут после него в порядке `ORDER`.

Для первой страницы не передавайте ||
|#

### Как получить все результаты поиска {#pagination}

Запросите первую страницу без `LAST_ID`. Для следующей передайте в `LAST_ID` значение `id` последнего элемента массива `messages`: при сортировке `DESC` метод вернет сообщения с меньшим `id`, при `ASC` — с большим. Выборка закончена, когда пришло меньше сообщений, чем размер страницы — значение `LIMIT` с ограничениями из таблицы параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":3,"SEARCH_MESSAGE":"test","ORDER":{"ID":"DESC"},"LIMIT":20}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.messages.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":3,"SEARCH_MESSAGE":"test","ORDER":{"ID":"DESC"},"LIMIT":20,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.dialog.messages.search
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DialogMessagesSearchResult = {
      messages: Array<{
        id: number
        chatId: number
        chat_id: number
        authorId: number
        author_id: number
        date: ISODate
        text: string
        isSystem: boolean
        uuid: string | null
        forward: object | null
        params: Record<string, unknown> | unknown[]
        viewedByOthers: boolean
        unread: boolean
        viewed: boolean
        block: object | null
      }>
      users: unknown[]
      files: unknown[]
      additionalMessages: unknown[]
      copilot: object | null
      stickers: unknown[]
      reactions: unknown[]
      tariffRestrictions: { isHistoryLimitExceeded: boolean }
      usersShort: unknown[]
    }

    try {
      const response = await $b24.actions.v2.call.make<DialogMessagesSearchResult>({
        method: 'im.dialog.messages.search',
        params: {
          CHAT_ID: 3,
          SEARCH_MESSAGE: 'test',
          ORDER: { ID: 'DESC' },
          LIMIT: 20,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Found messages:', result.messages.length, result.messages)
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
      async function searchDialogMessages() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.dialog.messages.search',
            params: {
              CHAT_ID: 3,
              SEARCH_MESSAGE: 'test',
              ORDER: { ID: 'DESC' },
              LIMIT: 20,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Found messages:', result.messages.length, result.messages)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchDialogMessages)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.dialog.messages.search(
            chat_id=3,
            search_message="test",
            order={
                "ID": "DESC",
            },
            limit=20,
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
                'im.dialog.messages.search',
                [
                    'CHAT_ID' => 3,
                    'SEARCH_MESSAGE' => 'test',
                    'ORDER' => ['ID' => 'DESC'],
                    'LIMIT' => 20,
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
        'im.dialog.messages.search',
        {
            CHAT_ID: 3,
            SEARCH_MESSAGE: 'test',
            ORDER: { ID: 'DESC' },
            LIMIT: 20
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
        'im.dialog.messages.search',
        [
            'CHAT_ID' => 3,
            'SEARCH_MESSAGE' => 'test',
            'ORDER' => ['ID' => 'DESC'],
            'LIMIT' => 20,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.dialog.messages.search", b24.Params{
    	"CHAT_ID":        3,
    	"SEARCH_MESSAGE": "test",
    	"ORDER": b24.Params{
    		"ID": "DESC",
    	},
    	"LIMIT": 20,
    })
    if err != nil {
    	return fmt.Errorf("im.dialog.messages.search: %w", err)
    }

    // Форма ответа показана ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "users": [
            {
                "id": 1,
                "active": true,
                "name": "Алекс",
                "firstName": "Алекс",
                "lastName": "",
                "workPosition": "",
                "color": "#df532d",
                "avatar": "https://cdn-ru.bitrix24.ru/path/avatar.jpg",
                "avatarHr": "https://cdn-ru.bitrix24.ru/path/avatar.jpg",
                "gender": "F",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "externalAuthId": "socservices",
                "internalAccount": true,
                "intranetUser": true,
                "status": "online",
                "idle": false,
                "lastActivityDate": "2026-02-13T14:27:33+03:00",
                "mobileLastDate": false,
                "desktopLastDate": false,
                "absent": false,
                "departments": [1, 107, 47, 3],
                "phones": {
                    "personal_mobile": "79998887766",
                    "inner_phone": "111"
                },
                "botData": null,
                "type": "user",
                "website": "",
                "email": "user@example.com"
            }
        ],
        "files": [],
        "additionalMessages": [],
        "copilot": null,
        "stickers": [],
        "reactions": [
            {
                "messageId": 33653,
                "reactionCounters": {
                    "like": 1
                },
                "reactionUsers": {
                    "like": [1]
                },
                "ownReactions": ["like"]
            }
        ],
        "tariffRestrictions": {
            "isHistoryLimitExceeded": false
        },
        "usersShort": [
            {
                "id": 1,
                "name": "Алекс",
                "avatar": "https://cdn-ru.bitrix24.ru/path/avatar.jpg",
                "color": "#df532d",
                "type": "user"
            }
        ],
        "messages": [
            {
                "id": 33653,
                "chatId": 3,
                "chat_id": 3,
                "authorId": 1,
                "author_id": 1,
                "date": "2026-02-13T14:28:00+03:00",
                "text": "test message",
                "isSystem": false,
                "uuid": "18533186-232b-4423-8438-64501da182f5",
                "forward": null,
                "params": {
                    "LIKE": [1]
                },
                "viewedByOthers": false,
                "block": null,
                "unread": false,
                "viewed": true
            }
        ]
    },
    "time": {
        "start": 1770982150,
        "finish": 1770982150.503861,
        "duration": 0.5038609504699707,
        "processing": 0,
        "date_start": "2026-02-13T14:29:10+03:00",
        "date_finish": "2026-02-13T14:29:10+03:00",
        "operating_reset_at": 1770982750,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Найденные сообщения и связанные с ними данные [(подробное описание)](#result-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **messages**
[`array`](../../data-types.md) | Массив найденных сообщений [(подробное описание)](#message) ||
|| **users**
[`array`](../../data-types.md) | Пользователи, связанные с найденными сообщениями [(подробное описание)](#user) ||
|| **files**
[`array`](../../data-types.md) | Файлы из найденных сообщений. Структура элемента — как у [объекта file](./im-dialog-messages-get.md#file) в ответе метода [im.dialog.messages.get](./im-dialog-messages-get.md). Если файлов нет — пустой массив ||
|| **additionalMessages**
[`array`](../../data-types.md) | Дополнительные сообщения, связанные с найденными, например пересылаемые или цитируемые [(подробное описание)](#message) ||
|| **copilot**
[`object`](../../data-types.md) | Данные BitrixGPT. Может быть `null` ||
|| **stickers**
[`array`](../../data-types.md) | Стикеры, связанные с найденными сообщениями. Если стикеров нет — пустой массив ||
|| **reactions**
[`array`](../../data-types.md) | Реакции на найденные сообщения [(подробное описание)](#reactions) ||
|| **tariffRestrictions**
[`object`](../../data-types.md) | Ограничения истории по тарифу.

Флаг `isHistoryLimitExceeded` равен `true`, если тарифное ограничение истории убрало из выборки часть сообщений ||
|| **usersShort**
[`array`](../../data-types.md) | Пользователи, которые поставили реакции: `id`, `name`, `avatar`, `color` — цвет аватара, `type` — тип пользователя.

По этим данным можно показать имена и аватары для идентификаторов из `result.reactions[].reactionUsers` ||
|| **commentInfo**
[`array`](../../data-types.md) | Данные о комментариях к найденным сообщениям. Заполняется для сообщений каналов ||
|#

Если ничего не найдено, все массивы объекта `result` приходят пустыми.

#### Объект message {#message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сообщения ||
|| **chatId**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор чата. То же, что `chatId`, в старом написании ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор автора сообщения ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора сообщения. То же, что `authorId`, в старом написании ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время создания сообщения ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения ||
|| **isSystem**
[`boolean`](../../data-types.md) | Признак системного сообщения ||
|| **uuid**
[`string`](../../data-types.md) | Внешний UUID сообщения. Может быть `null` ||
|| **forward**
[`object`](../../data-types.md) | Информация о пересылке. `null`, если сообщение не переслано ||
|| **params**
[`object`](../../data-types.md) | Параметры сообщения. Если параметров нет, приходит пустой массив `[]` ||
|| **viewedByOthers**
[`boolean`](../../data-types.md) | Признак, что сообщение просмотрено другими участниками ||
|| **unread**
[`boolean`](../../data-types.md) | Признак непрочитанного сообщения для текущего пользователя ||
|| **viewed**
[`boolean`](../../data-types.md) | Признак, что сообщение просмотрено текущим пользователем ||
|| **block**
[`object`](../../data-types.md) | Контентные блоки сообщения. `null`, если блоков нет ||
|#

#### Объект user {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Пользователь активен ||
|| **name**
[`string`](../../data-types.md) | Полное имя ||
|| **firstName**
[`string`](../../data-types.md) | Имя ||
|| **lastName**
[`string`](../../data-types.md) | Фамилия ||
|| **workPosition**
[`string`](../../data-types.md) | Должность ||
|| **color**
[`string`](../../data-types.md) | Цвет профиля в формате hex ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара ||
|| **avatarHr**
[`string`](../../data-types.md) | URL аватара в высоком разрешении ||
|| **gender**
[`string`](../../data-types.md) | Пол ||
|| **birthday**
[`string`](../../data-types.md) | День рождения ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-пользователя ||
|| **intranetUser**
[`boolean`](../../data-types.md) | `true`, если пользователь — сотрудник: состоит в отделе компании и его учетная запись не внешняя ||
|| **internalAccount**
[`boolean`](../../data-types.md) | `true`, если учетная запись не внешняя, например не принадлежит клиенту открытой линии ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Bitrix24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя-коннектора ||
|| **externalAuthId**
[`string`](../../data-types.md) | Код внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя ||
|| **idle**
[`datetime`](../../data-types.md) | Дата в формате ISO 8601, если пользователь неактивен, иначе `false` ||
|| **lastActivityDate**
[`datetime`](../../data-types.md) | Дата и время последней активности или `false` ||
|| **mobileLastDate**
[`datetime`](../../data-types.md) | Последняя активность в мобильном приложении. Может быть `false` ||
|| **desktopLastDate**
[`datetime`](../../data-types.md) | Последняя активность в десктоп-приложении. Может быть `false` ||
|| **absent**
[`datetime`](../../data-types.md) | Дата в формате ISO 8601, если пользователь отсутствует, иначе `false` ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя или `false`, если телефоны не заданы ||
|| **botData**
[`object`](../../data-types.md) | Данные бота. Для обычного пользователя — `null` ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../../data-types.md) | Веб-сайт пользователя ||
|| **email**
[`string`](../../data-types.md) | E-mail пользователя ||
|#

#### Объект reactions {#reactions}

#|
|| **Название**
`тип` | **Описание** ||
|| **messageId**
[`integer`](../../data-types.md) | Идентификатор сообщения ||
|| **reactionCounters**
[`object`](../../data-types.md) | Количество реакций по типам: ключ — код реакции, например `like`, значение — число реакций ||
|| **reactionUsers**
[`object`](../../data-types.md) | Кто поставил реакции: ключ — код реакции, значение — массив идентификаторов пользователей. Если реакций одного типа больше пяти, список может быть неполным. Имена и аватары этих пользователей — в `usersShort` ||
|| **ownReactions**
[`array`](../../data-types.md) | Коды реакций, которые поставил текущий пользователь, например `["like"]` ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "CHAT_ID can`t be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | ``CHAT_ID can`t be empty`` | Параметр `CHAT_ID` не передан или его значение не число ||
|| `400` | `500` | `Incorrect date/time: <значение>` | Значение `DATE_FROM`, `DATE_TO` или `DATE` не распознано как дата ||
|| `400` | `ERROR_ARGUMENT` | Invalid order "UP" | В `ORDER` передано направление не `ASC` и не `DESC`. В тексте ошибки — переданное значение ||
|| `403` | `ACCESS_ERROR` | You do not have access to this chat | Нет доступа к указанному чату ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-message-add.md)
- [{#T}](./im-message-update.md)
- [{#T}](./im-message-delete.md)
- [{#T}](./im-message-like.md)
- [{#T}](./im-message-share.md)
- [{#T}](./im-message-command.md)
- [{#T}](./im-dialog-messages-get.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
