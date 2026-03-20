# Получить список последних сообщений im.dialog.messages.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.dialog.messages.get` получает сообщения указанного диалога, в том числе системные. Не поддерживает стандартную постраничную навигацию из-за потенциально большого объема данных

{% note info "" %}

Получить сообщения без участия в чате можно только для чатов открытой линии через метод [imopenlines.session.history.get](../../imopenlines/openlines/sessions/imopenlines-session-history-get.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор чата в формате:

- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md). Идентификатор пользователя — с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор сообщения, старше которого нужно загрузить сообщения. Метод вернет сообщения с идентификатором меньше указанного ||
|| **FIRST_ID**
[`integer`](../../data-types.md) | Идентификатор сообщения, новее которого нужно загрузить сообщения. Метод вернет сообщения с идентификатором больше указанного.

Чтобы загрузить самые первые сообщения диалога — передайте `FIRST_ID` со значением `0` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Ограничение на количество сообщений в ответе. Если не переданы `LAST_ID` и `FIRST_ID` — метод вернет последние N сообщений диалога, указанные в `LIMIT`.

По умолчанию — `20`. Максимальное значение — `50` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","FIRST_ID":84869,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.messages.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","FIRST_ID":84869,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.dialog.messages.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.dialog.messages.get',
            {
                DIALOG_ID: 'chat1489',
                FIRST_ID: 84869,
                LIMIT: 10
            }
        );

        console.log(response.getData().result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.dialog.messages.get',
            [
                'DIALOG_ID' => 'chat1489',
                'FIRST_ID' => 84869,
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
            FIRST_ID: 84869,
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
            'FIRST_ID' => 84869,
            'LIMIT' => 10,
        ]
    );

    print_r($result);
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
                    "LIKE": [547]
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
            ...,
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
            },
            ...
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
                ...
            }
        ],
        "files": [
            {
                "id": 5255,
                "chatId": 1489,
                "date": "2026-03-02T16:10:00+03:00",
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

Метод вернет пустой массив, если в `LAST_ID` или `FIRST_ID` указать несуществующий идентификатор сообщения ||
|| **users**
[`array`](../../data-types.md) | Пользователи из выборки [(подробное описание)](#user).

Метод вернет пустой массив, если в `LAST_ID` или `FIRST_ID` указать несуществующий идентификатор сообщения ||
|| **files**
[`array`](../../data-types.md) | Файлы из выборки [(подробное описание)](#file).

Метод вернет пустой массив, если в `LAST_ID` или `FIRST_ID` указать несуществующий идентификатор сообщения ||
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
|| **unread**
[`boolean`](../../data-types.md) | Признак непрочитанного сообщения ||
|| **uuid**
[`string`](../../data-types.md) | Уникальный идентификатор сообщения, `null` для системных сообщений ||
|| **replaces**
[`array`](../../data-types.md) | Массив замен текста сообщения ||
|| **params**
[`object`](../../data-types.md) | Дополнительные параметры сообщения [(подробное описание)](#params).

Набор полей объекта зависит от типа сообщени: обычное или системное ||
|| **disappearing_date**
[`datetime`](../../data-types.md) | Дата исчезновения сообщения, `null` если не задана ||
|#

#### Объект params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **LIKE**
[`array`](../../data-types.md) | Идентификаторы пользователей, которые поставили реакцию сообщению ||
|| **CODE**
[`array`](../../data-types.md) | Коды системных событий:
- `CHAT_JOIN` — пользователь добавлен в чат
- `CHAT_LEAVE` — пользователь покинул чат ||
|| **NOTIFY**
[`string`](../../data-types.md) | Признак отправки уведомления. Значение `N` — уведомление не отправляется ||
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
[`boolean`](../../data-types.md) | Признак неактивности пользователя ||
|| **last_activity_date**
[`datetime`](../../data-types.md) | Дата последней активности ||
|| **mobile_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в мобильном приложении, `false` если приложение не использовалось ||
|| **desktop_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в десктопном приложении, `false` если приложение не использовалось ||
|| **absent**
[`boolean`](../../data-types.md) | Признак отсутствия пользователя ||
|| **departments**
[`array`](../../data-types.md) | Идентификаторы отделов пользователя ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя, `false` если не заданы ||
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

HTTP-статус: **400**

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
|| `400` | `FIRST_ID_STRING` | First ID can't be string | Параметр `FIRST_ID` передан нечисловым значением ||
|| `400` | `LAST_ID_STRING` | Last ID can't be string | Параметр `LAST_ID` передан нечисловым значением ||
|| `403` | `ACCESS_ERROR` | You do not have access to the specified dialog | У пользователя нет доступа к диалогу ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-dialog-messages-search.md)
- [{#T}](./im-dialog-read.md)
- [{#T}](./im-dialog-unread.md)
- [{#T}](./im-dialog-writing.md)
