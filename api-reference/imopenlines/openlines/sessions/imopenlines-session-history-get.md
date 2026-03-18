# Получить историю сообщений диалога imopenlines.session.history.get

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.session.history.get` возвращает историю сообщений сессии открытой линии.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **SESSION_ID**
[`integer`](../../../data-types.md) | Идентификатор сессии открытой линии.

Идентификатор можно получить методом [imopenlines.dialog.get](./imopenlines-dialog-get.md) из поля `entity_data_1`. Идентификатор `SESSION_ID` находится в шестом параметре строки `entity_data_1`. Например, для ```"entity_data_1":"Y|LEAD|1205|N|N|321|1773223732|0|0|0"``` идентификатор сессии — `321` ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Числовой идентификатор чата открытой линии без префикса `chat`. Например, `1763`, не `chat1763`.

Идентификатор можно получить методами [imopenlines.dialog.get](./imopenlines-dialog-get.md) или [imopenlines.crm.chat.get](../chats/imopenlines-crm-chat-get.md) ||
|#

Метод принимает один из параметров: `SESSION_ID` или `CHAT_ID`.

- Если передан `SESSION_ID`, метод работает по нему.
- Если `SESSION_ID` не передан, метод пытается определить последнюю сессию по `CHAT_ID` с сортировкой `ID DESC`.

На практике для стабильного результата рекомендуется передавать `SESSION_ID`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SESSION_ID":321}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.session.history.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SESSION_ID":321,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imopenlines.session.history.get
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imopenlines.session.history.get',
            {
                SESSION_ID: 321,
            }
        );

        const { result } = response.getData();
        console.log(result);
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
                'imopenlines.session.history.get',
                [
                    'SESSION_ID' => 321,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error getting session history: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.session.history.get',
        {
            SESSION_ID: 321,
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
        'imopenlines.session.history.get',
        [
            'SESSION_ID' => 321,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Success: ' . print_r($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "chatId": 1763,
        "canJoin": "Y",
        "canVoteHead": "Y",
        "sessionId": 321,
        "sessionVoteHead": 0,
        "sessionCommentHead": null,
        "userId": "chat1763",
        "message": {
            "85851": {
                "id": "85851",
                "chatid": "1763",
                "senderid": "103",
                "recipientid": "chat1763",
                "date": "2026-03-11T13:12:46+03:00",
                "text": "Откройте карточку задачи и нажмите Наблюдатели",
                "textlegacy": "Откройте карточку задачи и нажмите Наблюдатели",
                "params": {
                    "connectorMid": ["85853"],
                    "fileId": [5437]
                }
            },
            "85833": {
                "id": "85833",
                "chatid": "1763",
                "senderid": "0",
                "recipientid": "chat1763",
                "date": "2026-03-11T13:09:25+03:00",
                "text": "[b]Создан новый лид[/b]",
                "textlegacy": "<b>Создан новый лид</b>",
                "params": {
                    "attach": [
                        {
                            "id": 1773223765,
                            "blocks": [
                                {
                                    "link": [
                                        {
                                            "name": "Заполнение CRM-формы \"Форма контактных данных для открытых линий\"",
                                            "link": "/crm/lead/details/1205/"
                                        }
                                    ]
                                },
                                {
                                    "grid": [
                                        {
                                            "display": "ROW",
                                            "name": "Имя",
                                            "value": "Иван",
                                            "colorToken": "base"
                                        },
                                        {
                                            "display": "LINE",
                                            "name": "Телефон",
                                            "value": "+71110000000",
                                            "height": 20,
                                            "colorToken": "base"
                                        }
                                    ]
                                }
                            ],
                            "description": "",
                            "color": "#df532d"
                        }
                    ]
                }
            },
            ... // описание для каждого сообщения
        },
        "usersMessage": {
            "chat1763": [
                "85851",
                "85833",
            ]
        },
        "users": {
            "103": {
                "id": "103",
                "name": "Светлана Иванова",
                "active": true,
                "firstName": "Светлана",
                "lastName": "Иванова",
                "workPosition": "Руководитель ИТ-отдела",
                "color": "#4ba984",
                "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
                "avatarId": "8644",
                "birthday": "08-03",
                "gender": "F",
                "phoneDevice": false,
                "phones": false,
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "profile": "/company/personal/user/103/",
                "externalAuthId": "socservices",
                "status": "online",
                "idle": false,
                "lastActivityDate": "2026-03-11T13:14:35+03:00",
                "mobileLastDate": false,
                "desktopLastDate": false,
                "departments": [1, 7],
                "absent": false,
                "type": "user",
                "services": null,
                "botData": null
            },
            ... // описание для каждого пользователя
        },
        "openlines": {
            "canvoteashead": {
                "22": true
            }
        },
        "userInGroup": {
            "1": {
                "id": 1,
                "users": ["103"]
            },
            ... // описание для каждого подразделения
        },
        "woUserInGroup": [],
        "chat": {
            "1763": {
                "id": "1763",
                "parentChatId": 0,
                "parentMessageId": 0,
                "name": "Иван - Документация Битрикс24",
                "owner": "103",
                "color": "#ba9c7b",
                "extranet": false,
                "avatar": "/bitrix/js/im/images/blank.gif",
                "call": "0",
                "callNumber": "",
                "entityType": "LINES",
                "entityId": "livechat|22|1761|587",
                "entityData1": "Y|LEAD|1205|N|N|321|1773223732|0|0|0",
                "entityData2": "LEAD|1205|COMPANY|0|CONTACT|0|DEAL|0",
                "entityData3": "",
                "messageCount": 14,
                "public": "",
                "muteList": {
                    "103": false,
                    "587": false
                },
                "managerList": [103],
                "dateCreate": "2026-03-11T12:08:52+03:00",
                "type": "lines",
                "entityLink": {
                    "type": "LINES",
                    "url": "",
                    "id": "livechat|22|1761|587"
                },
                "permissions": {
                    "manageUsersAdd": "member",
                    "manageUsersDelete": "manager",
                    "manageUi": "member",
                    "manageSettings": "owner",
                    "manageMessages": "member",
                    "canPost": "member"
                },
                "textFieldEnabled": true,
                "backgroundId": null,
                "messageType": "L",
                "isNew": false
            }
        },
        "userBlockChat": {
            "1763": {
                "103": false,
                "587": false
            }
        },
        "userInChat": {
            "1763": [103, 587]
        },
        "files": {
            "5437": {
                "id": 5437,
                "chatid": 1763,
                "date": "2026-03-11T13:12:46+03:00",
                "type": "image",
                "name": "2311.png",
                "extension": "png",
                "size": 70855,
                "image": {
                    "height": 615,
                    "width": 646
                },
                "status": "done",
                "progress": 100,
                "authorid": 103,
                "authorname": "Светлана Иванова",
                "urlpreview": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5437&exact=N&_esd=oYQLNdHU%3D&fileName=2311.png",
                "urlshow": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.showImage&SITE_ID=s1&humanRE=1&fileId=5437&width=1280&height=1280&signature=d1007a9ed47599e2160b993ca&exact=N&_esd=oYQLNdHU%3D&fileName=2311.png",
                "urldownload": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5437&exact=N&_esd=oYQLNdHU%3D&fileName=2311.png",
                "viewerattrs": {
                    "viewer": "",
                    "viewertype": "image",
                    "src": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.download&SITE_ID=s1&humanRE=1&fileId=5437&exact=N&_esd=oYQLNdHU%3D&fileName=2311.png",
                    "viewerresized": "",
                    "objectid": "5437",
                    "viewergroupby": "1763",
                    "imchatid": 1763,
                    "title": "2311.png",
                    "actions": "[{\"type\":\"download\"},{\"type\":\"copyToMe\",\"text\":\"Сохранить на Диск\",\"action\":\"BXIM.disk.saveToDiskAction\",\"params\":{\"fileId\":\"5437\"},\"extension\":\"disk.viewer.actions\",\"buttonIconClass\":\"ui-btn-icon-cloud\"}]"
                },
                "mediaurl": {
                    "preview": {
                        "250": "https://some-domain.bitrix24.ru/bitrix/services/main/ajax.php?action=disk.api.file.showImage&SITE_ID=s1&humanRE=1&fileId=5437&width=250&height=250&signature=c28f11fbae0ee5a0c40970c4e8e554&exact=Y&_esd=oYQLNdHU%3D&fileName=2311.png"
                    }
                },
                "istranscribable": false,
                "isvideonote": false,
                "isvoicenote": false
            }
        }
    },
    "time": {
        "start": 1773224138,
        "finish": 1773224138.143344,
        "duration": 0.14334392547607422,
        "processing": 0,
        "date_start": "2026-03-11T13:15:38+03:00",
        "date_finish": "2026-03-11T13:15:38+03:00",
        "operating_reset_at": 1773224738,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой объект ответа.

Структура объекта подробно описана [ниже](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **chatId**
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **canJoin**
[`string`](../../../data-types.md) | Флаг возможности подключения к диалогу: `Y` или `N` ||
|| **canVoteHead**
[`string`](../../../data-types.md) | Флаг возможности оценки операторов руководителем: `Y` или `N` ||
|| **sessionId**
[`integer`](../../../data-types.md) | Идентификатор сессии ||
|| **sessionVoteHead**
[`integer`](../../../data-types.md) | Оценка, которая выставлена руководителем ||
|| **sessionCommentHead**
[`string`](../../../data-types.md) | Комментарий руководителя к оценке или `null` ||
|| **userId**
[`string`](../../../data-types.md) | Идентификатор чата в формате `chat<ID>` ||
|| **message**
[`object`](../../../data-types.md) | Сообщения чата, индексированные по идентификатору сообщения.

Структура объекта подробно описана [ниже](#message) ||
|| **usersMessage**
[`object`](../../../data-types.md) | Связь чата и списка идентификаторов сообщений.

Структура объекта подробно описана [ниже](#users-message) ||
|| **users**
[`object`](../../../data-types.md) | Объект участников чата, где ключ — идентификатор пользователя.

Структура объекта подробно описана [ниже](#users) ||
|| **openlines**
[`object`](../../../data-types.md) | Данные открытой линии.

Структура объекта подробно описана [ниже](#openlines) ||
|| **userInGroup**
[`object`](../../../data-types.md) | Пользователи, которые группированы по подразделениям, или пустой массив 

Структура объекта подробно описана [ниже](#user-in-group) ||
|| **woUserInGroup**
[`array`](../../../data-types.md) | Пользователи, которые не входят в подразделения из `userInGroup` ||
|| **chat**
[`object`](../../../data-types.md) | Данные чата по его идентификатору.

Структура объекта подробно описана [ниже](#chat) ||
|| **userBlockChat**
[`object`](../../../data-types.md) | Флаги блокировки чата пользователями.

Структура объекта подробно описана [ниже](#user-block-chat) ||
|| **userInChat**
[`object`](../../../data-types.md) | Состав участников чата или пустой массив. 

Структура объекта участников чата подробно описана [ниже](#user-in-chat) ||
|| **files**
[`object`](../../../data-types.md) | Файлы, которые связаны с сообщениями, или пустой массив.

Структура объекта файлов подробно описана [ниже](#files) ||
|#

### Объект message {#message}

#|
|| **Название**
`тип` | **Описание** ||
|| **<messageId>**
[`object`](../../../data-types.md) | Объект сообщения.

Структура объекта сообщения подробно описана [ниже](#message-item) ||
|#

### Объект messageItem {#message-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор сообщения ||
|| **chatid**
[`string`](../../../data-types.md) | Идентификатор чата ||
|| **senderid**
[`string`](../../../data-types.md) | Идентификатор отправителя ||
|| **recipientid**
[`string`](../../../data-types.md) | Получатель сообщения в формате `chat<ID>` ||
|| **date**
[`datetime`](../../../data-types.md) | Дата и время сообщения в формате ISO 8601 (RFC3339) ||
|| **text**
[`string`](../../../data-types.md) | Текст сообщения ||
|| **textlegacy**
[`string`](../../../data-types.md) | Текст сообщения в legacy-формате ||
|| **params**
[`object`](../../../data-types.md) | Служебные параметры сообщения ||
|#

### Объект usersMessage {#users-message}

#|
|| **Название**
`тип` | **Описание** ||
|| **chat\<chatId\>**
[`array`](../../../data-types.md) | Массив идентификаторов сообщений, которые относятся к чату ||
|#

### Объект users {#users}

#|
|| **Название**
`тип` | **Описание** ||
|| **\<userId\>**
[`object`](../../../data-types.md) | Данные пользователя.

Структура объекта пользователя подробно описана [ниже](#user-item) ||
|#

### Объект userItem {#user-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../../data-types.md) | Имя и фамилия пользователя ||
|| **firstName**
[`string`](../../../data-types.md) | Имя пользователя ||
|| **lastName**
[`string`](../../../data-types.md) | Фамилия пользователя ||
|| **workPosition**
[`string`](../../../data-types.md) | Должность или `null` ||
|| **avatar**
[`string`](../../../data-types.md) | Ссылка на аватар пользователя ||
|| **avatarId**
[`integer`](../../../data-types.md) | Идентификатор файла аватара или `null` ||
|| **gender**
[`string`](../../../data-types.md) | Пол пользователя ||
|| **extranet**
[`boolean`](../../../data-types.md) | Признак экстранет-пользователя ||
|| **connector**
[`boolean`](../../../data-types.md) | Признак пользователя коннектора ||
|| **profile**
[`string`](../../../data-types.md) | Ссылка на профиль ||
|| **externalAuthId**
[`string`](../../../data-types.md) | Внешний тип авторизации ||
|| **status**
[`string`](../../../data-types.md) | Онлайн-статус или `null` ||
|| **lastActivityDate**
[`datetime`](../../../data-types.md) | Дата и время последней активности в формате ISO 8601 (RFC3339) ||
|| **departments**
[`array`](../../../data-types.md) | Идентификаторы подразделений ||
|| **type**
[`string`](../../../data-types.md) | Тип пользователя ||
|#

### Объект openlines {#openlines}

#|
|| **Название**
`тип` | **Описание** ||
|| **canvoteashead**
[`object`](../../../data-types.md) | Объект вида `{"<CONFIG_ID>": <boolean>}`, где ключ — идентификатор настроек открытой линии `CONFIG_ID`, а значение `true/false` показывает, может ли руководитель оценивать работу оператора в сессии этой линии ||
|#

### Объект userInGroup {#user-in-group}

#|
|| **Название**
`тип` | **Описание** ||
|| **\<departmentId\>**
[`object`](../../../data-types.md) | Данные подразделения.

Структура объекта подразделения подробно описана [ниже](#group-item) ||
|#

### Объект groupItem {#group-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор подразделения ||
|| **users**
[`array`](../../../data-types.md) | Список идентификаторов пользователей, которые входят в подразделение ||
|#

### Объект chat {#chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **\<chatId\>**
[`object`](../../../data-types.md) | Данные чата.

Структура объекта подразделения подробно описана [ниже](#chat-item) ||
|#

### Объект chatItem {#chat-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор чата ||
|| **name**
[`string`](../../../data-types.md) | Название чата ||
|| **owner**
[`string`](../../../data-types.md) | Идентификатор владельца чата ||
|| **entityType**
[`string`](../../../data-types.md) | Тип объекта чата ||
|| **entityId**
[`string`](../../../data-types.md) | Внешний идентификатор чата ||
|| **entityData1**
[`string`](../../../data-types.md) | Строка с метаданными чата ||
|| **entityData2**
[`string`](../../../data-types.md) | Дополнительные метаданные чата ||
|| **entityData3**
[`string`](../../../data-types.md) | Дополнительные метаданные чата ||
|| **messageCount**
[`integer`](../../../data-types.md) | Количество сообщений в чате ||
|| **public**
[`string`](../../../data-types.md) | Публичный признак чата ||
|| **muteList**
[`object`](../../../data-types.md) | Объект, где ключ — идентификатор пользователя, а значение `true/false`, выключены ли уведомления для этого пользователя в чате ||
|| **managerList**
[`array`](../../../data-types.md) | Список идентификаторов операторов-менеджеров ||
|| **dateCreate**
[`datetime`](../../../data-types.md) | Дата и время создания чата в формате ISO 8601 (RFC3339) ||
|| **type**
[`string`](../../../data-types.md) | Тип чата ||
|| **entityLink**
[`object`](../../../data-types.md) | Данные связи чата с открытой линией ||
|| **permissions**
[`object`](../../../data-types.md) | Права доступа в чате ||
|| **textFieldEnabled**
[`boolean`](../../../data-types.md) | Признак доступности поля ввода сообщений ||
|| **backgroundId**
[`integer`](../../../data-types.md) | Идентификатор фона чата или `null` ||
|| **messageType**
[`string`](../../../data-types.md) | Тип сообщений чата ||
|| **isNew**
[`boolean`](../../../data-types.md) | Признак нового чата ||
|#

### Объект userBlockChat {#user-block-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **\<chatId\>**
[`object`](../../../data-types.md) | Объект с флагами блокировки пользователей в чате: ключ — идентификатор пользователя, значение — `true` или `false` || ||
|#

### Объект userInChat {#user-in-chat}

#|
|| **Название**
`тип` | **Описание** ||
|| **\<chatId\>**
[`array`](../../../data-types.md) | Массив идентификаторов пользователей, которые входят в чат ||
|#

### Объект files {#files}

#|
|| **Название**
`тип` | **Описание** ||
|| **\<fileId\>**
[`object`](../../../data-types.md) | Данные файла. 

Структура объекта подробно описана [ниже](#file-item) ||
|#

### Объект fileItem {#file-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор файла ||
|| **chatid**
[`integer`](../../../data-types.md) | Идентификатор чата ||
|| **date**
[`datetime`](../../../data-types.md) | Дата и время загрузки в формате ISO 8601 (RFC3339) ||
|| **type**
[`string`](../../../data-types.md) | Тип файла ||
|| **name**
[`string`](../../../data-types.md) | Имя файла ||
|| **extension**
[`string`](../../../data-types.md) | Расширение файла ||
|| **size**
[`integer`](../../../data-types.md) | Размер файла в байтах ||
|| **image**
[`object`](../../../data-types.md) | Параметры изображения (`width`, `height`) ||
|| **status**
[`string`](../../../data-types.md) | Статус обработки файла ||
|| **progress**
[`integer`](../../../data-types.md) | Прогресс обработки в процентах ||
|| **authorid**
[`integer`](../../../data-types.md) | Идентификатор автора файла ||
|| **authorname**
[`string`](../../../data-types.md) | Имя автора файла ||
|| **urlpreview**
[`string`](../../../data-types.md) | URL предпросмотра файла ||
|| **urlshow**
[`string`](../../../data-types.md) | URL просмотра файла ||
|| **urldownload**
[`string`](../../../data-types.md) | URL скачивания файла ||
|| **viewerattrs**
[`object`](../../../data-types.md) | Параметры просмотра файла в интерфейсе ||
|| **mediaurl**
[`string`](../../../data-types.md) | URL медиафайла ||
|| **istranscribable**
[`boolean`](../../../data-types.md) | Признак доступности расшифровки файла ||
|| **isvideonote**
[`boolean`](../../../data-types.md) | Признак видео-заметки ||
|| **isvoicenote**
[`boolean`](../../../data-types.md) | Признак голосовой заметки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_REQUIRED_PARAM",
    "error_description": "Session ID or Chat ID must be provided"
}
```

{% include notitle [Обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `MISSING_REQUIRED_PARAM` | Session ID or Chat ID must be provided | Не переданы `SESSION_ID` и `CHAT_ID` ||
|| `INVALID_SESSION_ID` | Unable to determine session ID from provided parameters | По переданным параметрам не удалось определить сессию ||
|| `ACCESS_DENIED` | Вы не можете открыть этот разговор, т.к. у вас недостаточно прав | Недостаточно прав для просмотра истории, сессия не найдена или недоступна ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-session-open.md)
- [{#T}](./imopenlines-session-start.md)
- [{#T}](./imopenlines-session-join.md)
- [{#T}](./imopenlines-session-intercept.md)
- [{#T}](./imopenlines-session-mode-pin.md)
- [{#T}](./imopenlines-session-mode-pin-all.md)
- [{#T}](./imopenlines-session-mode-unpin-all.md)
- [{#T}](./imopenlines-session-mode-silent.md)
- [{#T}](./imopenlines-session-head-vote.md)
- [{#T}](./imopenlines-message-session-start.md)
- [{#T}](./imopenlines-crm-lead-create.md)
- [{#T}](./imopenlines-dialog-get.md)
