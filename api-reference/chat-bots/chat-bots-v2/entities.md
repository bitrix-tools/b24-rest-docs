# Поля объектов

Описание объектов, которые возвращаются в ответах методов `im.v2` и `imbot.v2`, а также в данных событий и webhook-уведомлениях.

> Быстрый переход: [User](#user) | [Bot](#bot) | [Chat](#chat) | [Message](#message) | [File](#file) | [Command](#command)

Типы полей зависят от контекста: 

— в ответах методов и FETCH-событиях `Event.get` типы сохраняются как есть 
— в webhook-событиях все скалярные значения приходят строками из-за сериализации через `http_build_query`: `integer` → `"123"`, `boolean` → `"1"`/`"0"`, `null` → `""`
— в событиях онлайн-поля объекта User `idle`, `lastActivityDate`, `mobileLastDate`, `desktopLastDate` всегда равны `false`

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
[`string`](../../data-types.md) | Имя ||
|| **lastName**
[`string`](../../data-types.md) | Фамилия ||
|| **workPosition**
[`string`](../../data-types.md) | Должность ||
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
[`string`](../../data-types.md) | Тип внешней авторизации: `default`, `bot`, `email`, `replica` и др. ||
|| **status**
[`string`](../../data-types.md) | Статус: `online`, `dnd` ||
|| **idle**
[`string\|false`](../../data-types.md) | Время начала бездействия в формате ISO 8601, или `false` ||
|| **lastActivityDate**
[`string\|false`](../../data-types.md) | Дата последней активности в формате ISO 8601, или `false` ||
|| **mobileLastDate**
[`string\|false`](../../data-types.md) | Дата последнего входа с мобильного в формате ISO 8601, или `false` ||
|| **desktopLastDate**
[`string\|false`](../../data-types.md) | Дата последнего входа с десктопа в формате ISO 8601, или `false` ||
|| **absent**
[`string\|false`](../../data-types.md) | Дата начала отсутствия в формате ISO 8601, или `false` ||
|| **departments**
[`integer[]`](../../data-types.md) | Массив ID отделов ||
|| **phones**
[`object\|false`](../../data-types.md) | Объект с телефонами (`personalPhone`, `workPhone` и др.) или `false` ||
|| **type**
[`string`](../../data-types.md) | Тип: `employee`, `extranet`, `email`, `collaber`, `bot` ||
|| **website**
[`string`](../../data-types.md) | Персональный сайт ||
|| **email**
[`string`](../../data-types.md) | Email ||
|#

### Пример объекта User

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
    "type": "employee",
    "website": "",
    "email": "john@example.com"
}
```

## Bot {#bot}

Чат-бот. Возвращается в поле `bot` ответов методов [imbot.v2.Bot.get](./imbot.v2/bots/bot-get.md), [imbot.v2.Bot.list](./imbot.v2/bots/bot-list.md), а также в данных событий.

Имеет два формата: краткий (публичный) и расширенный (только для владельца бота).

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
[`string\|null`](../../data-types.md) | ID фона чата бота или `null` ||
|| **language**
[`string`](../../data-types.md) | Язык бота по умолчанию, например `en`, `ru` ||
|#

### Дополнительные поля (только для владельца)

#|
|| **Поле**
`Тип` | **Описание** ||
|| **moduleId**
[`string`](../../data-types.md) | ID модуля, которому принадлежит бот ||
|| **appId**
[`string`](../../data-types.md) | ID приложения, зарегистрировавшего бота ||
|| **eventMode**
[`string`](../../data-types.md) | Режим доставки событий: `webhook` или `fetch` ||
|| **countMessage**
[`integer`](../../data-types.md) | Количество обработанных сообщений ||
|| **countCommand**
[`integer`](../../data-types.md) | Количество зарегистрированных команд ||
|| **countChat**
[`integer`](../../data-types.md) | Количество чатов, в которых состоит бот ||
|| **countUser**
[`integer`](../../data-types.md) | Количество уникальных пользователей ||
|#

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
    "appId": "custom123abc",
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
[`string`](../../data-types.md) | Тип: `chat`, `open`, `channel`, `openChannel`, `copilot`, `thread`, `generalChannel` ||
|| **messageType**
[`string`](../../data-types.md) | Внутренний тип: `C` (chat), `O` (open), `P` (private) и др. ||
|| **owner**
[`integer`](../../data-types.md) | ID владельца чата ||
|| **color**
[`string\|null`](../../data-types.md) | Цвет чата в формате HEX ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара чата. Пустая строка, если не установлен ||
|| **description**
[`string`](../../data-types.md) | Описание чата ||
|| **extranet**
[`boolean`](../../data-types.md) | Содержит ли чат экстранет-пользователей ||
|| **role**
[`string`](../../data-types.md) | Роль текущего пользователя: `owner`, `manager`, `member`, `guest`, `none` ||
|| **containsCollaber**
[`boolean`](../../data-types.md) | Содержит ли чат коллаберов ||
|| **muteList**
[`array`](../../data-types.md) | Список ID пользователей, отключивших уведомления. Отсутствует в событиях — зависит от конкретного пользователя ||
|| **entityType**
[`string`](../../data-types.md) | Тип объекта, например `LINES` для Открытых линий ||
|| **entityId**
[`string`](../../data-types.md) | Идентификатор элемента ||
|| **entityData1**
[`string`](../../data-types.md) | Дополнительные данные объекта (поле 1) ||
|| **entityData2**
[`string`](../../data-types.md) | Дополнительные данные объекта (поле 2) ||
|| **entityData3**
[`string`](../../data-types.md) | Дополнительные данные объекта (поле 3) ||
|| **entityLink**
[`object`](../../data-types.md) | Данные ссылки на внешний объект ||
|| **diskFolderId**
[`integer\|null`](../../data-types.md) | ID папки на Диске для файлов чата ||
|| **permissions**
[`object`](../../data-types.md) | Права доступа для текущего пользователя ||
|| **parentChatId**
[`integer\|null`](../../data-types.md) | ID родительского чата для тредов ||
|| **parentMessageId**
[`integer\|null`](../../data-types.md) | ID родительского сообщения для тредов ||
|| **isNew**
[`boolean`](../../data-types.md) | Является ли чат только что созданным ||
|| **textFieldEnabled**
[`string`](../../data-types.md) | Включено ли поле ввода текста: `Y` или `N` ||
|| **backgroundId**
[`string\|null`](../../data-types.md) | ID фона чата или `null` ||
|#

### Дополнительные поля (только в ответах методов)

Поля, которые возвращаются в ответах методов (например, [imbot.v2.Chat.get](./imbot.v2/chats/chat-get.md)), но не передаются в событиях.

#|
|| **Поле**
`Тип` | **Описание** ||
|| **dateCreate**
[`string\|null`](../../data-types.md) | Дата создания чата в формате ISO 8601 ||
|| **lastMessageId**
[`integer\|null`](../../data-types.md) | ID последнего сообщения ||
|| **lastId**
[`integer\|null`](../../data-types.md) | ID последнего прочитанного сообщения ||
|| **managerList**
[`array`](../../data-types.md) | Массив ID менеджеров чата ||
|| **messageCount**
[`integer`](../../data-types.md) | Количество сообщений в чате ||
|| **userCounter**
[`integer`](../../data-types.md) | Количество участников чата ||
|| **unreadId**
[`integer\|null`](../../data-types.md) | ID первого непрочитанного сообщения ||
|| **lastMessageViews**
[`string`](../../data-types.md) | JSON-строка с данными просмотров последнего сообщения ||
|| **markedId**
[`integer\|null`](../../data-types.md) | ID отмеченного сообщения ||
|| **public**
[`object\|string`](../../data-types.md) | Настройки публичного доступа ||
|#

### Пример объекта Chat

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
    "textFieldEnabled": "Y",
    "backgroundId": null,
    "dateCreate": "2025-01-10T09:00:00+03:00",
    "lastMessageId": 789,
    "managerList": [1, 3],
    "messageCount": 42,
    "userCounter": 5,
    "unreadId": null
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
[`integer`](../../data-types.md) | ID автора. `0` для системных сообщений ||
|| **date**
[`string\|null`](../../data-types.md) | Дата создания в формате ISO 8601 ||
|| **text**
[`string`](../../data-types.md) | Текст сообщения. Максимальная длина — 20 000 символов. Более длинные сообщения обрезаются с добавлением суффикса ` (...)` ||
|| **isSystem**
[`boolean`](../../data-types.md) | Является ли сообщение системным ||
|| **uuid**
[`string`](../../data-types.md) | UUID для дедупликации ||
|| **forward**
[`object\|null`](../../data-types.md) | Информация о пересылке: `{id, userId, chatId, date}` или `null` ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры: attach, keyboard, файлы и др. ||
|| **viewedByOthers**
[`boolean`](../../data-types.md) | Прочитано ли сообщение другими участниками ||
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

```json
{
    "id": 789,
    "chatId": 5,
    "authorId": 1,
    "date": "2025-01-15T10:30:00+03:00",
    "text": "Hello bot!",
    "isSystem": false,
    "uuid": "",
    "forward": null,
    "params": {},
    "viewedByOthers": false
}
```

## File {#file}

Файл, прикреплённый к сообщению. Возвращается в поле `file` ответа метода [imbot.v2.File.upload](./imbot.v2/files/file-upload.md).

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | ID файла на Диске ||
|| **chatId**
[`integer`](../../data-types.md) | ID чата ||
|| **date**
[`string\|null`](../../data-types.md) | Дата загрузки в формате ISO 8601 ||
|| **type**
[`string`](../../data-types.md) | Тип контента: `file`, `image`, `video`, `audio` ||
|| **name**
[`string`](../../data-types.md) | Имя файла с расширением ||
|| **extension**
[`string`](../../data-types.md) | Расширение файла в нижнем регистре ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **image**
[`object\|false`](../../data-types.md) | Размеры превью для изображений: `{"height": 600, "width": 800}`, или `false` ||
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
    "image": false,
    "authorId": 1,
    "authorName": "John Smith",
    "isTranscribable": false,
    "isVideoNote": false,
    "isVoiceNote": false
}
```

## Command {#command}

Слэш-команда бота. Возвращается в ответах методов [imbot.v2.Command.register](./imbot.v2/commands/command-register.md), [imbot.v2.Command.update](./imbot.v2/commands/command-update.md), [imbot.v2.Command.list](./imbot.v2/commands/command-list.md).

#|
|| **Поле**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор команды ||
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
|| **title**
[`string`](../../data-types.md) | Заголовок команды на языке портала. Только в ответах методов ||
|| **params**
[`string`](../../data-types.md) | Описание параметров команды на языке портала. Только в ответах методов ||
|| **category**
[`string`](../../data-types.md) | Имя бота-владельца команды. Только в ответах методов ||
|| **context**
[`string`](../../data-types.md) | Контекст вызова команды. Только в ответах методов ||
|#

### Пример объекта Command

```json
{
    "id": 78,
    "botId": 456,
    "command": "/help",
    "common": false,
    "hidden": false,
    "extranetSupport": false,
    "title": "Show help",
    "params": "[query]",
    "category": "Support Bot",
    "context": "chat"
}
```

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imbot.v2/bots/index.md)
- [{#T}](./imbot.v2/events/events.md)
- [{#T}](./im.v2/events/events.md)
