# Объекты и поля чат-ботов 2.0

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользователь, бот, чат, сообщение, файл и команда приходят в ответах методов `im.v2` и `imbot.v2`, в данных событий и в webhook-уведомлениях.

> Быстрый переход: [User](#user) | [Bot](#bot) | [Chat](#chat) | [Message](#message) | [File](#file) | [Command](#command)

Типы полей зависят от того, откуда пришел объект:

- ответ метода или событие из `Event.get` в режиме `fetch` — типы сохраняются как есть
- событие в режиме `webhook` — все скалярные значения приходят строками: `integer` → `"123"`, `boolean` → `"1"`/`"0"`. Поля со значением `null` и пустые массивы в данные события не попадают

В событиях онлайн-поля объекта User — `idle`, `lastActivityDate`, `mobileLastDate`, `desktopLastDate` — всегда равны `false`.

## User {#user}

Пользователь системы. Возвращается в полях `user` и в коллекциях `users`.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Активен ли пользователь в системе ||
|| **name**
[`string`](../../data-types.md) | Полное имя ||
|| **firstName**
[```string|null```](../../data-types.md) | Имя. `null` у автора системных сообщений ||
|| **lastName**
[```string|null```](../../data-types.md) | Фамилия. `null` у автора системных сообщений ||
|| **workPosition**
[```string|null```](../../data-types.md) | Должность или `null`, если она не указана ||
|| **color**
[`string`](../../data-types.md) | Цвет аватара-заглушки в формате HEX, например `#df532d` ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара. Пустая строка, если аватар не установлен ||
|| **gender**
[`string`](../../data-types.md) | Пол: `M` — мужской, `F` — женский ||
|| **birthday**
[`string`](../../data-types.md) | Дата рождения. Пустая строка, если не указана ||
|| **extranet**
[`boolean`](../../data-types.md) | Является ли пользователь экстранет-пользователем ||
|| **bot**
[`boolean`](../../data-types.md) | Является ли пользователь ботом ||
|| **connector**
[`boolean`](../../data-types.md) | Является ли пользователь коннектором Открытых линий ||
|| **externalAuthId**
[`string`](../../data-types.md) | Тип внешней авторизации: `default`, `bot`, `email`, `replica` и другие ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя. В ответах методов `imbot.v2` и в событиях всегда `online` ||
|| **idle**
[```string | boolean```](../../data-types.md#compound-types) | Время начала бездействия в формате ISO 8601, или `false` ||
|| **lastActivityDate**
[```string | boolean```](../../data-types.md#compound-types) | Дата последней активности в формате ISO 8601, или `false` ||
|| **mobileLastDate**
[```string | boolean```](../../data-types.md#compound-types) | Дата последнего входа с мобильного в формате ISO 8601, или `false` ||
|| **desktopLastDate**
[```string | boolean```](../../data-types.md#compound-types) | Дата последнего входа с десктопа в формате ISO 8601, или `false` ||
|| **absent**
[```string | boolean```](../../data-types.md#compound-types) | Дата и время возвращения из отпуска в формате ISO 8601. Это следующий день после окончания отпуска. `false`, если пользователь не в отпуске. Другие виды отсутствия, например командировка, не учитываются ||
|| **departments**
[`integer[]`](../../data-types.md) | Массив ID отделов ||
|| **phones**
[```object | boolean```](../../data-types.md#compound-types) | Телефоны пользователя или `false`, если телефонов нет. В объекте только заполненные номера. Возможные ключи: `personal_mobile`, `work_phone`, `inner_phone`, `personal_phone` ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя, например `user` — сотрудник, `extranet` — внешний пользователь, `bot` — чат-бот ||
|| **internalAccount**
[`boolean`](../../data-types.md) | Внутренняя учетная запись Битрикс24 ||
|| **intranetUser**
[`boolean`](../../data-types.md) | Пользователь интранета — сотрудник компании ||
|| **website**
[`string`](../../data-types.md) | Персональный сайт ||
|| **email**
[`string`](../../data-types.md) | Email ||
|#

### Пример объекта User

В примере показаны не все поля.

```json
{
    "id": 1,
    "active": true,
    "name": "John Smith",
    "firstName": "John",
    "lastName": "Smith",
    "workPosition": "Developer",
    "color": "#df532d",
    "avatar": "",
    "gender": "M",
    "birthday": "",
    "extranet": false,
    "bot": false,
    "connector": false,
    "externalAuthId": "default",
    "status": "online",
    "idle": false,
    "lastActivityDate": "2025-01-15T10:29:00+03:00",
    "absent": false,
    "departments": [1, 5],
    "phones": false,
    "type": "user",
    "website": "",
    "email": "john@example.com"
}
```

## Bot {#bot}

Чат-бот. Возвращается в поле `bot` ответа [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md), в массиве `bots` ответа [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md), а также в данных событий.

Объект приходит в двух форматах: краткий содержит общие поля, расширенный — еще и поля, которые видит только владелец бота. В событиях режима `webhook` приходит третий формат с полями `id`, `code` и `auth`. Он описан в разделе [Формат объекта bot](./imbot.v2/events/events.md#bot-format).

### Общие поля

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | ID пользователя-бота ||
|| **code**
[`string`](../../data-types.md) | Уникальный строковый код бота ||
|| **type**
[`string`](../../data-types.md) | Тип бота. Описание типов — [Типы ботов](./index.md#bot-types) ||
|| **isHidden**
[`boolean`](../../data-types.md) | Скрыт ли бот из списка контактов ||
|| **isSupportOpenline**
[`boolean`](../../data-types.md) | Поддерживает ли бот работу с Открытыми линиями ||
|| **isReactionsEnabled**
[`boolean`](../../data-types.md) | Включены ли реакции на сообщения бота ||
|| **backgroundId**
[```string|null```](../../data-types.md) | ID фона чата бота или `null` ||
|| **language**
[`string`](../../data-types.md) | Язык бота по умолчанию, например `en`, `ru` ||
|#

### Дополнительные поля (только для владельца)

#|
|| **Поле**
`Тип` | **Описание** ||
|| **moduleId**
[`string`](../../data-types.md) | ID модуля, которому принадлежит бот ||
|| **eventMode**
[`string`](../../data-types.md) | Режим доставки событий: `webhook` или `fetch` ||
|| **countMessage**
[`integer`](../../data-types.md) | Служебный счетчик, см. примечание под таблицей ||
|| **countCommand**
[`integer`](../../data-types.md) | Служебный счетчик. Не равен числу зарегистрированных команд ||
|| **countChat**
[`integer`](../../data-types.md) | Служебный счетчик ||
|| **countUser**
[`integer`](../../data-types.md) | Служебный счетчик ||
|#

Битрикс24 обновляет счетчики `countMessage`, `countCommand`, `countChat` и `countUser` не для всех действий и с задержкой. После сообщений и вызова команды значения могут остаться `0`. Чтобы считать сообщения, команды или чаты бота, ведите учет на своей стороне по событиям.

### Пример объекта Bot (расширенный формат)

```json
{
    "id": 456,
    "code": "support_bot",
    "type": "bot",
    "isHidden": false,
    "isSupportOpenline": false,
    "isReactionsEnabled": true,
    "backgroundId": null,
    "language": "en",
    "moduleId": "rest",
    "eventMode": "fetch",
    "countMessage": 150,
    "countCommand": 3,
    "countChat": 12,
    "countUser": 45
}
```

## Chat {#chat}

Чат. Возвращается в поле `chat` ответов методов [imbot.v2.Chat.get](./imbot.v2/chats/chat-get.md), [imbot.v2.Chat.add](./imbot.v2/chats/chat-add.md), а также в данных событий.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор чата ||
|| **dialogId**
[`string`](../../data-types.md) | Идентификатор диалога: `chat5` для групповых, `123` для личных ||
|| **name**
[`string`](../../data-types.md) | Название чата ||
|| **type**
[`string`](../../data-types.md) | Тип чата, например `private` — личный, `chat` — групповой, `open`, `channel`, `openChannel`, `copilot`, `generalChannel` ||
|| **messageType**
[`string`](../../data-types.md) | Внутренний тип: `C` (chat), `O` (open), `P` (private) и другие ||
|| **owner**
[`integer`](../../data-types.md) | ID владельца чата ||
|| **color**
[```string|null```](../../data-types.md) | Цвет чата в формате HEX ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара чата. Пустая строка, если не установлен ||
|| **description**
[`string`](../../data-types.md) | Описание чата ||
|| **extranet**
[`boolean`](../../data-types.md) | Содержит ли чат экстранет-пользователей ||
|| **role**
[`string`](../../data-types.md) | Роль текущего пользователя: `owner`, `manager`, `member`, `guest`, `none`. Отсутствует в событиях ||
|| **containsCollaber**
[`boolean`](../../data-types.md) | Содержит ли чат коллаберов ||
|| **muteList**
[`array`](../../data-types.md) | ID текущего пользователя, если он отключил уведомления чата, иначе пустой массив. ID других участников в список не попадают. Отсутствует в событиях ||
|| **entityType**
[`string`](../../data-types.md) | Тип объекта, к которому привязан чат, например `LINES` для Открытых линий ||
|| **entityId**
[`string`](../../data-types.md) | Идентификатор объекта, к которому привязан чат ||
|| **entityData1**
[`string`](../../data-types.md) | Дополнительные данные объекта (поле 1) ||
|| **entityData2**
[`string`](../../data-types.md) | Дополнительные данные объекта (поле 2) ||
|| **entityData3**
[`string`](../../data-types.md) | Дополнительные данные объекта (поле 3) ||
|| **entityLink**
[`object`](../../data-types.md) | Ссылка на объект, к которому привязан чат: `type` — тип объекта, `url` — адрес объекта, `id` — ID объекта. Если чат не привязан, все три поля — пустые строки ||
|| **diskFolderId**
[```integer|null```](../../data-types.md) | ID папки на Диске для файлов чата ||
|| **permissions**
[`object`](../../data-types.md) | Права в чате. [(подробное описание)](#chat-permissions) ||
|| **parentChatId**
[```integer|null```](../../data-types.md) | ID родительского чата для тредов ||
|| **parentMessageId**
[```integer|null```](../../data-types.md) | ID родительского сообщения для тредов ||
|| **isNew**
[`boolean`](../../data-types.md) | Является ли чат только что созданным ||
|| **textFieldEnabled**
[`boolean`](../../data-types.md) | Включено ли поле ввода текста ||
|| **backgroundId**
[```string|null```](../../data-types.md) | ID фона чата или `null` ||
|| **hasManageCapability**
[`boolean`](../../data-types.md) | Служебное поле интерфейса ||
|| **canHaveThreads**
[`boolean`](../../data-types.md) | Можно ли в чате создавать треды ||
|#

### Объект permissions {#chat-permissions}

Каждый ключ — группа действий в чате. Значение — минимальная роль, которой разрешены эти действия: `member` — участник, `manager` — администратор чата, `owner` — владелец чата, `none` — действия запрещены всем.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **manageUsersAdd**
[`string`](../../data-types.md) | Добавлять участников ||
|| **manageUsersDelete**
[`string`](../../data-types.md) | Исключать участников ||
|| **manageUi**
[`string`](../../data-types.md) | Менять название, описание, цвет и аватар чата ||
|| **manageSettings**
[`string`](../../data-types.md) | Менять права, владельца и администраторов чата ||
|| **manageMessages**
[`string`](../../data-types.md) | Писать и закреплять сообщения ||
|| **manageMessagesAutoDelete**
[`string`](../../data-types.md) | Настраивать автоудаление сообщений ||
|| **manageGuestInvites**
[`string`](../../data-types.md) | Приглашать гостей ||
|| **manageDelete**
[`string`](../../data-types.md) | Удалять чат ||
|| **canPost**
[`string`](../../data-types.md) | Повторяет значение `manageMessages` ||
|#

### Дополнительные поля (только в ответах методов)

Поля, которые возвращаются в ответах методов (например, [imbot.v2.Chat.get](./imbot.v2/chats/chat-get.md)), но не передаются в событиях.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **dateCreate**
[```string|null```](../../data-types.md) | Дата создания чата в формате ISO 8601 ||
|| **lastMessageId**
[```integer|null```](../../data-types.md) | ID последнего сообщения ||
|| **lastId**
[`integer`](../../data-types.md) | ID последнего прочитанного сообщения. `0`, если прочитанных нет ||
|| **managerList**
[`array`](../../data-types.md) | Массив ID менеджеров чата ||
|| **messageCount**
[`integer`](../../data-types.md) | Количество сообщений в чате ||
|| **userCounter**
[`integer`](../../data-types.md) | Количество участников чата ||
|| **unreadId**
[`integer`](../../data-types.md) | ID первого непрочитанного сообщения. `0`, если непрочитанных нет ||
|| **lastMessageViews**
[`object`](../../data-types.md) | Кто посмотрел последнее сообщение чата: `messageId` — ID этого сообщения, `firstViewers` — массив первых зрителей, `countOfViewers` — сколько пользователей его посмотрели ||
|| **markedId**
[```integer|null```](../../data-types.md) | ID отмеченного сообщения ||
|| **public**
[```object|string```](../../data-types.md) | Настройки публичного доступа ||
|#

### Пример объекта Chat

В примере показаны не все поля.

```json
{
    "id": 5,
    "dialogId": "chat5",
    "name": "Support Chat",
    "type": "chat",
    "messageType": "C",
    "owner": 1,
    "color": "#ab7761",
    "avatar": "",
    "description": "",
    "extranet": false,
    "role": "member",
    "containsCollaber": false,
    "diskFolderId": 42,
    "textFieldEnabled": true,
    "backgroundId": null,
    "dateCreate": "2025-01-10T09:00:00+03:00",
    "lastMessageId": 789,
    "managerList": [1, 3],
    "messageCount": 42,
    "userCounter": 5,
    "unreadId": 0
}
```

## Message {#message}

Сообщение. Возвращается в поле `message` ответов методов и данных событий.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор сообщения ||
|| **chatId**
[`integer`](../../data-types.md) | ID чата ||
|| **authorId**
[`integer`](../../data-types.md) | ID автора. `0` у системных сообщений в чате, например о создании чата или добавлении участника ||
|| **date**
[```string|null```](../../data-types.md) | Дата создания в формате ISO 8601 ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения. Текст длиннее 20 006 символов обрезается до 20 000 символов, в конце добавляется ` (...)` ||
|| **isSystem**
[`boolean`](../../data-types.md) | Является ли сообщение системным ||
|| **uuid**
[```string|null```](../../data-types.md) | UUID сообщения, если его передали при отправке, или `null` ||
|| **forward**
[```object|null```](../../data-types.md) | Данные о пересылке, если сообщение переслано, или `null`. `id` — ID исходного сообщения в формате `<чат>/<сообщение>`, `userId` — ID автора исходного сообщения. Остальные поля описывают исходный чат: `chatTitle`, `chatType`, `parentChatId`, `parentMessageId`, `parentChatType` ||
|| **params**
[```object|array```](../../data-types.md) | Дополнительные параметры сообщения: вложения, клавиатура, файлы и другие. Если параметров нет, приходит пустой массив `[]`, а в событиях режима `webhook` поля нет. [(подробное описание)](#message-params) ||
|| **viewedByOthers**
[`boolean`](../../data-types.md) | Прочитано ли сообщение другими участниками ||
|#

### Объект params {#message-params}

В `params` приходят только ключи, заданные у сообщения. Основные:

#|
|| **Поле**
`Тип` | **Описание** ||
|| **ATTACH**
[`array`](../../data-types.md) | Вложения — карточки со свойствами, ссылками, изображениями: массив объектов с полями `ID`, `BLOCKS`, `DESCRIPTION`, `COLOR`, `COLOR_TOKEN`. Блоки описаны в разделе [Вложения](./imbot.v2/messages/attachments/index.md) ||
|| **KEYBOARD**
[`array`](../../data-types.md) | Кнопки клавиатуры под сообщением: массив объектов с полями `TEXT`, `LINK`, `BG_COLOR_TOKEN`, `BOT_ID`, `TYPE`, `DISABLED` и другими ||
|| **FILE_ID**
[`array`](../../data-types.md) | ID файлов сообщения: массив строк ||
|| **REPLY_ID**
[`string`](../../data-types.md) | ID исходного сообщения строкой, если это сообщение — ответ ||
|| **LIKE**
[`array`](../../data-types.md) | Массив ID пользователей, которые поставили реакцию «нравится» ||
|| **IS_EDITED**
[`string`](../../data-types.md) | `Y`, если сообщение редактировали ||
|| **IS_DELETED**
[`string`](../../data-types.md) | `Y`, если сообщение удалено ||
|#

### Дополнительные поля (только в ответах методов)

#|
|| **Поле**
`Тип` | **Описание** ||
|| **unread**
[`boolean`](../../data-types.md) | Непрочитанное для текущего пользователя ||
|| **viewed**
[`boolean`](../../data-types.md) | Просмотрено текущим пользователем ||
|#

### Пример объекта Message

В примере показаны не все поля.

```json
{
    "id": 789,
    "chatId": 5,
    "authorId": 1,
    "date": "2025-01-15T10:30:00+03:00",
    "text": "Hello bot!",
    "isSystem": false,
    "uuid": null,
    "forward": null,
    "params": [],
    "viewedByOthers": false
}
```

## File {#file}

Файл, прикрепленный к сообщению. Возвращается в поле `file` ответа метода [imbot.v2.File.upload](./imbot.v2/files/file-upload.md).

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | ID файла на Диске ||
|| **chatId**
[`integer`](../../data-types.md) | ID чата ||
|| **date**
[```string|null```](../../data-types.md) | Дата загрузки в формате ISO 8601 ||
|| **type**
[`string`](../../data-types.md) | Тип контента: `file`, `image`, `video`, `audio` ||
|| **name**
[`string`](../../data-types.md) | Имя файла с расширением ||
|| **extension**
[`string`](../../data-types.md) | Расширение файла в нижнем регистре ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **duration**
[```integer|null```](../../data-types.md) | Длительность аудио или видео. У остальных файлов — `null` ||
|| **image**
[```object | boolean```](../../data-types.md#compound-types) | Размеры превью для изображений: `{"height": 600, "width": 800}`, или `false` ||
|| **authorId**
[`integer`](../../data-types.md) | ID пользователя, загрузившего файл ||
|| **authorName**
[`string`](../../data-types.md) | Имя пользователя, загрузившего файл ||
|| **isTranscribable**
[`boolean`](../../data-types.md) | Возможна ли транскрибация файла ||
|| **isVideoNote**
[`boolean`](../../data-types.md) | Является ли файл видеозаметкой ||
|| **isVoiceNote**
[`boolean`](../../data-types.md) | Является ли файл голосовым сообщением ||
|#

### Пример объекта File

```json
{
    "id": 138,
    "chatId": 5,
    "date": "2025-01-15T10:30:00+03:00",
    "type": "file",
    "name": "report.pdf",
    "extension": "pdf",
    "size": 35341,
    "duration": null,
    "image": false,
    "authorId": 1,
    "authorName": "John Smith",
    "isTranscribable": false,
    "isVideoNote": false,
    "isVoiceNote": false
}
```

## Command {#command}

Слэш-команда бота — команда, которую пользователь вызывает в чате через косую черту, например `/help`. Состав полей зависит от того, где пришел объект: в ответе на регистрацию или изменение команды, в списке команд или в событии вызова команды.

### В ответах register и update {#command-register}

Поле `command` ответа [imbot.v2.Command.register](./imbot.v2/commands/command-register.md) и [imbot.v2.Command.update](./imbot.v2/commands/command-update.md).

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | ID команды ||
|| **botId**
[`integer`](../../data-types.md) | ID бота-владельца команды ||
|| **command**
[`string`](../../data-types.md) | Текст команды с ведущим слэшем, например `/help` ||
|| **common**
[`boolean`](../../data-types.md) | Доступна ли команда во всех чатах (`true`) или только там, где есть бот (`false`) ||
|| **hidden**
[`boolean`](../../data-types.md) | Скрыта ли команда из списка подсказок ||
|| **extranetSupport**
[`boolean`](../../data-types.md) | Доступна ли команда для экстранет-пользователей ||
|#

Пример объекта:

```json
{
    "id": 78,
    "botId": 456,
    "command": "/help",
    "common": false,
    "hidden": false,
    "extranetSupport": false
}
```

### В ответе list {#command-list}

Элементы массива `commands` ответа [imbot.v2.Command.list](./imbot.v2/commands/command-list.md). В список входят и встроенные команды Битрикс24, например `/me`: у них `id` — строка вида `def0`, а `botId` — `0`.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[```integer|string```](../../data-types.md) | ID команды. У встроенных команд — строка ||
|| **botId**
[`integer`](../../data-types.md) | ID бота-владельца команды. `0` у встроенных команд ||
|| **command**
[`string`](../../data-types.md) | Текст команды с ведущим слэшем ||
|| **category**
[`string`](../../data-types.md) | Имя бота-владельца или раздел встроенных команд ||
|| **common**
[`string`](../../data-types.md) | Доступна ли команда во всех чатах: `Y` или `N` ||
|| **context**
[`string`](../../data-types.md) | Контекст команды. У команд, зарегистрированных через REST, — пустая строка ||
|| **title**
[`string`](../../data-types.md) | Заголовок команды на языке Битрикс24 ||
|| **params**
[`string`](../../data-types.md) | Описание параметров команды на языке Битрикс24 ||
|| **extranet**
[`string`](../../data-types.md) | Доступна ли команда для экстранет-пользователей: `Y` или `N` ||
|#

Пример элемента массива:

```json
{
    "id": 78,
    "botId": 456,
    "command": "/help",
    "category": "Support Bot",
    "common": "N",
    "context": "",
    "title": "Показать помощь",
    "params": "запрос",
    "extranet": "N"
}
```

### В событии вызова команды {#command-event}

В событии [ONIMBOTV2COMMANDADD](./imbot.v2/events/events.md#onimbotv2commandadd) объект `command` содержит поля `id`, `command`, `params` и `context`. В `params` — аргументы, которые пользователь передал при вызове, в `context` — способ вызова. Поля описаны в разделе [Объект command](./imbot.v2/events/events.md#command-object).

## Продолжите изучение

- [Журнал изменений API imbot.v2](./change-log.md)
- [{#T}](./index.md)
- [{#T}](./imbot.v2/bots/index.md)
- [{#T}](./imbot.v2/events/events.md)
- [{#T}](./im.v2/events/events.md)
