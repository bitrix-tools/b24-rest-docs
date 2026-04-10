# Получить данные о рабочей группе socialnetwork.api.workgroup.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`socialnetwork`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `socialnetwork.api.workgroup.get` возвращает информацию о рабочей группе, проекте, скраме или коллабе по идентификатору. 

Администратор может получить информацию о любой группе на портале, даже если она секретная и он в ней не состоит.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **params***
[`object`](../data-types.md) | Параметры запроса для получения группы. Подробнее [ниже](#params) ||
|#

### Параметр params {#params}

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId***
[`integer`](../data-types.md#standart-types) | Идентификатор группы. Значение для поля может быть получено методом [sonet_group.get](./sonet-group-get.md) ||
|| **select**
[`array`](../data-types.md#standart-types) | Список дополнительных полей для извлечения, возвращаемых в `result`. Подробнее [ниже](#paramsselect) ||
|| **mode**
[`string`](../data-types.md#standart-types) | Режим запроса. Может принимать только значение `mobile`, которое позволяет получить дополнительные данные в массиве `result[ADDITIONAL_DATA]` ||
|#

#### Параметр select {#paramsselect}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIONS**
[`string`](../data-types.md#standart-types) | Доступные текущему пользователю операции над группой ||
|| **AVATAR**
[`string`](../data-types.md#standart-types) | URL сжатого пользовательского аватара группы ||
|| **AVATAR_DATA**
[`string`](../data-types.md#standart-types) | Информация об аватаре группы ||
|| **AVATAR_TYPES**
[`string`](../data-types.md#standart-types) | Типы аватаров для групп ||
|| **COUNTERS**
[`string`](../data-types.md#standart-types) | Количество непринятых запросов и приглашений на вступление в группу ||
|| **DATE_CREATE**
[`string`](../data-types.md#standart-types) | Дата и время создания группы в более читаемом формате ||
|| **DEPARTMENTS**
[`string`](../data-types.md#standart-types) | Отделы сотрудников, добавленные в группу ||
|| **EFFICIENCY**
[`string`](../data-types.md#standart-types) | Эффективность группы ||
|| **FEATURES**
[`string`](../data-types.md#standart-types) | Доступные в группе инструменты, указанные в расширенных настройках группы ||
|| **GROUP_MEMBERS_LIST**
[`string`](../data-types.md#standart-types) | Список активных участников группы, приглашенных пользователей и пользователей, ожидающих подтверждения вступления в группу ||
|| **LIST_OF_MEMBERS**
[`string`](../data-types.md#standart-types) | Список участников группы с информацией о них ||
|| **LIST_OF_MEMBERS_AWAITING_INVITE**
[`string`](../data-types.md#standart-types) | Пользователи, ожидающие подтверждения вступления в группу ||
|| **OWNER_DATA**
[`string`](../data-types.md#standart-types) | Данные о владельце группы ||
|| **PIN**
[`string`](../data-types.md#standart-types) | Закреплена ли группа у текущего пользователя на странице групп и проектов. Возвращается ключом `result[IS_PIN]` ||
|| **PRIVACY_TYPE**
[`string`](../data-types.md#standart-types) | Уровень приватности группы. Возвращается ключом `result[PRIVACY_CODE]` ||
|| **SUBJECT_DATA**
[`string`](../data-types.md#standart-types) | Информация о тематике группы, указанной в расширенных настройках группы ||
|| **TAGS**
[`string`](../data-types.md#standart-types) | Теги группы, указанные в расширенных настройках группы ||
|| **USER_DATA**
[`string`](../data-types.md#standart-types) | Данные о роли текущего пользователя в группе ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"params":{"groupId":622,"select":["DEPARTMENTS","TAGS"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/socialnetwork.api.workgroup.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"params":{"groupId":622,"select":["DEPARTMENTS","TAGS"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/socialnetwork.api.workgroup.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'socialnetwork.api.workgroup.get',
    		{
    			params: {
    				groupId: 622,
    				select: [ 'DEPARTMENTS', 'TAGS' ],
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'socialnetwork.api.workgroup.get',
                [
                    'params' => [
                        'groupId' => 622,
                        'select'  => [ 'DEPARTMENTS', 'TAGS' ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting workgroup info: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'socialnetwork.api.workgroup.get', {
        params: {
            groupId: 622,
            select: [ 'DEPARTMENTS', 'TAGS' ],
        },
    }, result => {
        console.log(result);
    });
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'socialnetwork.api.workgroup.get',
        [
            'params' => [
                'groupId' => 622,
                'select' => ['DEPARTMENTS', 'TAGS']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": 622,
        "ACTIVE": "Y",
        "SITE_ID": "s1",
        "SUBJECT_ID": 1,
        "NAME": "Группа для демонстрации метода",
        "DESCRIPTION": "Первая строка описания группы\r\nВторая строка описания группы",
        "KEYWORDS": "тег группы,еще один тег группы",
        "CLOSED": "N",
        "VISIBLE": "Y",
        "OPENED": "N",
        "DATE_CREATE": "17.04.2025 19:37:55",
        "DATE_UPDATE": "17.04.2025 19:40:48",
        "DATE_ACTIVITY": "17.04.2025 19:40:48",
        "IMAGE_ID": 0,
        "AVATAR_TYPE": "folder",
        "OWNER_ID": 1,
        "INITIATE_PERMS": "K",
        "NUMBER_OF_MEMBERS": 1,
        "NUMBER_OF_MODERATORS": 1,
        "PROJECT": "N",
        "PROJECT_DATE_START": null,
        "PROJECT_DATE_FINISH": null,
        "SEARCH_INDEX": "Группа для демонстрации метода Первая строка описания группы\r\nВторая строка описания группы тег группы #тег группы еще один тег группы #еще один тег группы group@example.com",
        "LANDING": "N",
        "SCRUM_OWNER_ID": 0,
        "SCRUM_SPRINT_DURATION": 0,
        "SCRUM_TASK_RESPONSIBLE": "",
        "TYPE": "group",
        "MEMBERS": [
            1,
            10,
            20
        ],
        "CHAT_ID": 1034,
        "DIALOG_ID": "chat1034",
        "ORDINARY_MEMBERS": [
            10
        ],
        "INVITED_MEMBERS": [
            38
        ],
        "MODERATOR_MEMBERS": [
            20
        ],
        "SITE_IDS": [
            "s1"
        ],
        "TAGS": [
            "еще один тег группы",
            "тег группы"
        ],
        "DEPARTMENTS": [
            8
        ],
        "NUMBER_OF_MEMBERS_PLURAL": 0
    },
    "time": {
        "start": 1744908074.244266,
        "finish": 1744908074.279072,
        "duration": 0.034806013107299805,
        "processing": 0.010703086853027344,
        "date_start": "2025-04-17T19:41:14+03:00",
        "date_finish": "2025-04-17T19:41:14+03:00",
        "operating_reset_at": 1744908674,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md#standart-types) | Результат выполнения запроса. Подробнее [ниже](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Ключ result {#result}
#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md#standart-types) | Идентификатор группы ||
|| **ACTIVE**
[`boolean`](../data-types.md#standart-types) | Флаг `Y`/`N` — является ли группа активной. Активировать или деактивировать группу можно с помощью метода [sonet_group.update](sonet-group-update.md) ||
|| **SITE_ID**
[`string`](../data-types.md#standart-types) | Идентификатор сайта, которому принадлежит группа ||
|| **SUBJECT_ID**
[`integer`](../data-types.md#standart-types) | Идентификатор тематики группы. Тематика группы указывается в расширенных настройках группы ||
|| **NAME**
[`string`](../data-types.md#standart-types) | Имя группы ||
|| **DESCRIPTION**
[`text`](../data-types.md#standart-types) | Описание группы ||
|| **KEYWORDS**
[`string`](../data-types.md#standart-types) | Теги группы через запятую: `тег1,тег2` ||
|| **CLOSED**
[`boolean`](../data-types.md#standart-types) | Флаг `Y`/`N` — является ли группа архивной ||
|| **VISIBLE**
[`boolean`](../data-types.md#standart-types) | Флаг `Y`/`N` — видна ли группа в списке групп ||
|| **OPENED**
[`boolean`](../data-types.md#standart-types) | Флаг `Y`/`N` — является ли группа открытой ||
|| **DATE_CREATE**
[`string`](../data-types.md#standart-types) | Дата создания группы в формате `DD.MM.YYYY hh:mm:ss`. Если ключ `DATE_CREATE` запрошен в `select`, то дата возвращается в более читаемом формате, например:
- `сегодня, 12:16`
- `вчера, 14:42`
- `15 апреля 14:42`, если группа создана в этом году
- `11 июня 2024 15:08`, если группа создана не в этом году
||
|| **DATE_UPDATE**
[`string`](../data-types.md#standart-types) | Дата обновления группы в формате `DD.MM.YYYY hh:mm:ss` ||
|| **DATE_ACTIVITY**
[`string`](../data-types.md#standart-types) | Дата последней активности в группе в формате `DD.MM.YYYY hh:mm:ss` ||
|| **IMAGE_ID**
[`integer`](../data-types.md#standart-types) | Идентификатор пользовательского аватара группы в таблице `b_file`. `0`, если используется системное изображение в качестве аватара ||
|| **AVATAR_TYPE**
[`string`](../data-types.md#standart-types) | Тип последнего установленного системного аватара:
- `folder` — аватар в виде папки
- `checks` — аватар в виде чекбокса
- `pie` — аватар в виде графика «пирог»
- `bag` — аватар в виде портфеля
- `members` — аватар в виде силуэтов
- `""` — иной системный аватар
||
|| **OWNER_ID**
[`user`](../data-types.md#standart-objects) | Идентификатор владельца группы ||
|| **INITIATE_PERMS**
[`enum`](../data-types.md#standart-types) | Кто имеет право на приглашение пользователей в группу:
- `A` — только владелец группы
- `E` — владелец группы и модераторы группы
- `K` — все члены группы
||
|| **NUMBER_OF_MEMBERS**
[`integer`](../data-types.md#standart-types) | Количество участников группы ||
|| **NUMBER_OF_MODERATORS**
[`integer`](../data-types.md#standart-types) | Количество модераторов группы ||
|| **PROJECT**
[`boolean`](../data-types.md#standart-types) | Флаг `Y`/`N` — является ли группа проектом ||
|| **PROJECT_DATE_START**
[`any`](../data-types.md#standart-types) | Дата начала проекта в формате `DD.MM.YYYY hh:mm:ss`. `null`, если не указана ||
|| **PROJECT_DATE_FINISH**
[`any`](../data-types.md#standart-types) | Дата окончания проекта в формате `DD.MM.YYYY hh:mm:ss`. `null`, если не указана ||
|| **SEARCH_INDEX**
[`string`](../data-types.md#standart-types) | Индекс, ключевые слова для поиска группы ||
|| **LANDING**
[`boolean`](../data-types.md#standart-types) | Флаг `Y`/`N` — является ли группа группой для публикации ||
|| **SCRUM_MASTER_ID**
[`integer`](../data-types.md#standart-objects) | Идентификатор мастера скрама. `0`, если группа не является скрамом ||
|| **SCRUM_SPRINT_DURATION**
[`integer`](../data-types.md#standart-types) | Длительность спринта скрама в секундах. `0`, если группа не является скрамом ||
|| **SCRUM_TASK_RESPONSIBLE**
[`string`](../data-types.md#standart-types) | Исполнитель по умолчанию при постановке задач:
- `A` — постановщик
- `M` — скрам-мастер
- `""` — группа не является скрамом
||
|| **TYPE**
[`enum`](../data-types.md#standart-types) | Тип группы:
- `group` — группа
- `project` — проект
- `scrum` — скрам
- `collab` — коллаба
||
|| **MEMBERS**
[`array`](../data-types.md#standart-types) | Идентификаторы участников группы ||
|| **CHAT_ID**
[`integer`](../data-types.md#standart-types) | Идентификатор чата группы ||
|| **DIALOG_ID**
[`string`](../data-types.md#standart-types) | Идентификатор диалога группы ||
|| **ORDINARY_MEMBERS**
[`array`](../data-types.md#standart-types) | Массив идентификаторов пользователей группы, не являющихся владельцами или модераторами ||
|| **INVITED_MEMBERS**
[`array`](../data-types.md#standart-types) | Массив идентификаторов пользователей портала, которым было отправлено приглашение в группу, но они его еще не приняли ||
|| **MODERATOR_MEMBERS**
[`array`](../data-types.md#standart-types) | Массив идентификаторов участников группы с ролью модератора ||
|| **SITE_IDS**
[`array`](../data-types.md#standart-types) | Список идентификаторов сайтов, которым принадлежит группа ||
|| **AVATAR**
[`string`](../data-types.md#standart-types) | URL сжатого пользовательского аватара группы. `""`, если пользовательский аватар не установлен ||
|| **AVATAR_TYPES**
[`object`](../data-types.md#standart-types) | Объект, содержащий аватары групп [(подробное описание)](#avatartypes) ||
|| **AVATAR_DATA**
[`object`](../data-types.md#standart-types) | Информация об аватаре группы [(подробное описание)](#avatardata) ||
|| **OWNER_DATA**
[`object`](../data-types.md#standart-types) | Информация о владельце группы [(подробное описание)](#ownerdata) ||
|| **SUBJECT_DATA**
[`object`](../data-types.md#standart-types) | Информация о тематике группы, указанной в расширенных настройках группы [(подробное описание)](#subjectdata) ||
|| **TAGS**
[`array`](../data-types.md#standart-types) | Теги группы, аналогично `KEYWORDS`, но в формате массива ||
|| **ACTIONS**
[`object`](../data-types.md#standart-types) | Данные о доступных текущему пользователю операциях над группой [(подробное описание)](#actions) ||
|| **USER_DATA**
[`object`](../data-types.md#standart-types) | Информация о текущем пользователе относительно группы [(подробное описание)](#userdata) ||
|| **DEPARTMENTS**
[`array`](../data-types.md#standart-types) | Массив идентификаторов отделов, добавленных в группу ||
|| **IS_PIN**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — закреплена ли группа у текущего пользователя  на странице групп и проектов ||
|| **PRIVACY_CODE**
[`string`](../data-types.md#standart-types) | Уровень приватности группы:
- `open` — открытая группа
- `closed` — закрытая группа
- `secret` — секретная группа
||
|| **LIST_OF_MEMBERS**
[`object`](../data-types.md#standart-types) | Массив с информацией о пользователях группы [(подробное описание)](#listofmembers) ||
|| **FEATURES**
[`object`](../data-types.md#standart-types) | Массив с информацией об инструментах группы [(подробное описание)](#features) ||
|| **LIST_OF_MEMBERS_AWAITING_INVITE**
[`object`](../data-types.md#standart-types) | Информация о пользователях, ожидающих подтверждения вступления в группу [(подробное описание)](#listofmembersawaitinginvite) ||
|| **GROUP_MEMBERS_LIST**
[`object`](../data-types.md#standart-types) | Информация о связанных с группой пользователями [(подробное описание)](#groupmemberslist) ||
|| **COUNTERS**
[`object`](../data-types.md#standart-types) | Счетчики [(подробное описание)](#counters) ||
|| **EFFICIENCY**
[`integer`](../data-types.md#standart-types) | Эффективность группы ||
|| **ADDITIONAL_DATA**
[`object`](../data-types.md#standart-types) | Дополнительные данные для текущего пользователя [(подробное описание)](#additionaldata) ||
|#

### Объект AVATAR_TYPES {#avatartypes}

#|
|| **Название**
`тип` | **Описание** ||
|| **sort**
[`integer`](../data-types.md#standart-types) | Сортировка аватара ||
|| **mobileUrl**
[`string`](../data-types.md#standart-types) | URL для отображения аватара в мобильном приложении ||
|| **webCssClass**
[`string`](../data-types.md#standart-types) | CSS-класс аватара ||
|| **entitySelectorUrl**
[`string`](../data-types.md#standart-types) | URL аватара для entity selector ||
|#

### Объект AVATAR_DATA {#avatardata}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md#standart-types) | Тип аватара:
- `icon` — системный аватар
- `image` — пользовательское изображение ||
|| **id**
[`string`](../data-types.md#standart-types) | Идентификатор аватара:
- `folder` — аватар в виде папки
- `tasks` — аватар в виде чекбокса
- `chart` — аватар в виде графика «пирог»
- `briefcase` — аватар в виде портфеля
- `group` — аватар в виде силуэтов
- `""` — иной системный аватар
- `URL` — ссылка на сжатый пользовательский аватар, если он установлен ||
|#

### Объект OWNER_DATA {#ownerdata}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`user`](../data-types.md#standart-objects) | Идентификатор владельца группы ||
|| **PHOTO**
[`string`](../data-types.md#standart-types) | URL сжатого аватара владельца группы ||
|| **FORMATTED_NAME**
[`string`](../data-types.md#standart-types) | Отформатированное согласно настройкам портала имя владельца группы ||
|#

### Объект SUBJECT_DATA {#subjectdata}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md#standart-types) | Идентификатор тематики ||
|| **NAME**
[`string`](../data-types.md#standart-types) | Название тематики ||
|#

### Объект ACTIONS {#actions}

#|
|| **Название**
`тип` | **Описание** ||
|| **EDIT**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — доступно ли редактирование группы ||
|| **DELETE**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — доступно ли удаление группы ||
|| **INVITE**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — доступно ли приглашение сторонних участников в группу ||
|| **JOIN**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — может ли пользователь присоединиться к группе ||
|| **LEAVE**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — может ли пользователь покинуть группу ||
|| **FOLLOW**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — может ли пользователь подписаться на обновления группы ||
|| **PIN**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — доступно ли закрепление группы ||
|| **EDIT_FEATURES**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — доступно ли изменение инструментов группы ||
|#

### Объект USER_DATA {#userdata}

#|
|| **Название**
`тип` | **Описание** ||
|| **ROLE**
[`any`](../data-types.md#standart-types) | Роль пользователя в группе:
- `A` — владелец группы
- `E` — модератор группы
- `K` — участник группы
- `Z` — ожидает вступления
- `false` — значение отсутствует ||
|| **INITIATED_BY_TYPE**
[`any`](../data-types.md#standart-types) | Кем инициирована связь пользователя с группой:
- `U` — пользователем, например пользователь отправил запрос на вступление в группу
- `G` — группой, например пользователю отправили приглашение
- `false` — значение отсутствует ||
|| **IS_SUBSCRIBED**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — подписан ли пользователь на обновления группы ||
|#

### Объект LIST_OF_MEMBERS {#listofmembers}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`user`](../data-types.md#standart-objects) | Идентификатор пользователя ||
|| **isOwner**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — является ли пользователь владельцем группы ||
|| **isModerator**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — является ли пользователь модератором ||
|| **isScrumMaster**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — является ли пользователь скрам-мастером (для скрам-групп) ||
|| **isAutoMember**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — пользователь добавлен в группу автоматически (без приглашения) ||
|| **name**
[`string`](../data-types.md#standart-types) | Имя пользователя ||
|| **lastName**
[`string`](../data-types.md#standart-types) | Фамилия пользователя ||
|| **position**
[`string`](../data-types.md#standart-types) | Должность пользователя ||
|| **photo**
[`string`](../data-types.md#standart-types) | URL сжатого аватара пользователя ||
|#

### Объект FEATURES {#features}

#|
|| **Название**
`тип` | **Описание** ||
|| **featureName**
[`string`](../data-types.md#standart-types) | Символьный идентификатор инструмента ||
|| **name**
[`string`](../data-types.md#standart-types) | Название инструмента ||
|| **customName**
[`string`](../data-types.md#standart-types) | Пользовательское название инструмента в расширенных настройках группы ||
|| **id**
[`string`](../data-types.md#standart-types) | Числовой идентификатор инструмента ||
|| **active**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — включен ли инструмент в группе ||
|#

### Объект LIST_OF_MEMBERS_AWAITING_INVITE {#listofmembersawaitinginvite}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`user`](../data-types.md#standart-objects) | Идентификатор пользователя ||
|| **name**
[`string`](../data-types.md#standart-types) | Отформатированное согласно настройкам портала имя ||
|| **photo**
[`string`](../data-types.md#standart-types) | URL сжатого аватара пользователя ||
|#

### Объект GROUP_MEMBERS_LIST {#groupmemberslist}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`user`](../data-types.md#standart-objects) | Идентификатор участника ||
|| **invited**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — пользователь приглашен ||
|| **isAwaiting**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — пользователь ожидает принятия в группу ||
|| **isMember**
[`boolean`](../data-types.md#standart-types) | Значение `true`/`false` — пользователь является участником группы ||
|#

### Объект COUNTERS {#counters}

#|
|| **Название**
`тип` | **Описание** ||
|| **workgroup_requests_out**
[`integer`](../data-types.md#standart-types) | Текущее количество непринятых приглашений в группу ||
|| **workgroup_requests_in**
[`integer`](../data-types.md#standart-types) | Текущее количество запросов на вступление в группу ||
|#

### Объект ADDITIONAL_DATA {#additionaldata}

#|
|| **Название**
`тип` | **Описание** ||
|| **ROLE**
[`string`](../data-types.md#standart-types) | Роль текущего пользователя в группе:
- `A` — владелец группы
- `E` — модератор группы
- `K` — участник группы
- `Z` — ожидает вступления
- `""` — пользователь никак не относится к группе ||
|| **INITIATED_BY_TYPE**
[`string`](../data-types.md#standart-types) | Кем инициирована связь пользователя с группой:
- `U` — пользователем, например пользователь отправил запрос на вступление в группу
- `G` — группой, например пользователю отправили приглашение
- `""` — пользователь никак не относится к группе ||
|#

## Обработка ошибок

HTTP-код: **400**

```json
{
    "error": "SONET_CONTROLLER_WORKGROUP_EMPTY",
    "error_description": "Не передано значение ID рабочей группы."
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `SONET_CONTROLLER_WORKGROUP_EMPTY` | `Не передано значение ID рабочей группы.` | В массив `params` не передан параметр `groupId` ||
|| `SONET_CONTROLLER_WORKGROUP_NOT_FOUND` | `Рабочая группа не найдена.` | Группа по идентификатору `params[groupId]` не найдена или у текущего пользователя нет доступа к ней ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-create.md)
- [{#T}](./sonet-group-update.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
