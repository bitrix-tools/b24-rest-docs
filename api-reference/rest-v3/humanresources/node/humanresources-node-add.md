# Создать отдел humanresources.node.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление новых отделов» или «Добавление новых команд» 

Метод `humanresources.node.add` создает новый отдел или команду.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../../data-types.md) | Тип создаваемого элемента структуры.

Возможные значения:

- `DEPARTMENT` — отдел
- `TEAM` — команда ||
|| **name***
[`string`](../../../data-types.md) | Название отдела или команды ||
|| **parentId***
[`integer`](../../../data-types.md) | Идентификатор родительского отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](./humanresources-node-list.md) ||
|| **description**
[`string`](../../../data-types.md) | Описание отдела или команды ||
|| **colorName**
[`string`](../../../data-types.md) | Цвет команды.

Возможные значения:

- `blue` — синий
- `green` — зеленый
- `cyan` — голубой
- `orange` — оранжевый
- `purple` — фиолетовый
- `pink` — розовый ||
|| **userIds**
[`object`](../../../data-types.md) | Пользователи, которых нужно добавить в отдел или команду. [Описание структуры объекта](#userids) 

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|| **moveUsersToNode**
[`boolean`](../../../data-types.md) | Определяет, нужно ли переводить пользователей из `userIds` в новый отдел.

Возможные значения:

- `true` — пользователи перестают числиться в прежнем отделе и переходят в новый отдел
- `false` — пользователи только добавляются в новый отдел

По умолчанию: `false`

Используйте, если `type` равно `DEPARTMENT` ||
|| **createChat**
[`boolean`](../../../data-types.md) | Определяет, нужно ли создать новый чат для отдела.

Возможные значения:

- `true` — создать чат
- `false` — не создавать чат

По умолчанию: `false` ||
|| **bindingChatIds**
[`array`](../../../data-types.md) | Массив идентификаторов существующих чатов, которые нужно привязать к отделу.

Идентификаторы чатов можно получить методом [im.recent.list](../../../chats/im-recent-list.md) ||
|| **createChannel**
[`boolean`](../../../data-types.md) | Определяет, нужно ли создать новый канал для отдела.

Возможные значения:

- `true` — создать канал
- `false` — не создавать канал

По умолчанию: `false` ||
|| **bindingChannelIds**
[`array`](../../../data-types.md) | Массив идентификаторов существующих каналов, которые нужно привязать к отделу.

Идентификаторы каналов можно получить методом [im.recent.list](../../../chats/im-recent-list.md) ||
|| **createCollab**
[`boolean`](../../../data-types.md) | Определяет, нужно ли создать новый коллаб для отдела, если коллабы доступны в тарифе.

Возможные значения:

- `true` — создать коллаб
- `false` — не создавать коллаб

По умолчанию: `false` ||
|| **bindingCollabIds**
[`array`](../../../data-types.md) | Массив идентификаторов существующих коллабов, которые нужно привязать к отделу.

Идентификаторы коллабов можно получить методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md) ||
|| **settings**
[`object`](../../../data-types.md) | Дополнительные настройки отдела или команды. [Описание структуры объекта](#settings) ||
|#

### Параметр userIds {#userids}

#|
|| **Название**
`тип` | **Описание** ||
|| **MEMBER_HEAD**
[`array`](../../../data-types.md) | Идентификаторы руководителей отдела ||
|| **MEMBER_DEPUTY_HEAD**
[`array`](../../../data-types.md) | Идентификаторы заместителей руководителя отдела ||
|| **MEMBER_EMPLOYEE**
[`array`](../../../data-types.md) | Идентификаторы сотрудников отдела ||
|| **MEMBER_TEAM_HEAD**
[`array`](../../../data-types.md) | Идентификаторы руководителей команды ||
|| **MEMBER_TEAM_DEPUTY_HEAD**
[`array`](../../../data-types.md) | Идентификаторы заместителей руководителя команды ||
|| **MEMBER_TEAM_EMPLOYEE**
[`array`](../../../data-types.md) | Идентификаторы участников команды ||
|#

### Параметр settings {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **BUSINESS_PROC_AUTHORITY**
[`array`](../../../data-types.md) | Роли, которым разрешено работать с бизнес-процессами отдела или команды.

Возможные значения:

- `HEAD` — руководитель отдела
- `DEPUTY_HEAD` — заместитель руководителя отдела
- `ALL_DEPARTMENT_HEADS` — все руководители отделов
- `EMPLOYEE` — сотрудник отдела
- `TEAM_HEAD` — руководитель команды
- `TEAM_DEPUTY` — заместитель руководителя команды
- `TEAM_EMPLOYEE` — участник команды ||
|| **REPORTS_AUTHORITY**
[`array`](../../../data-types.md) | Роли, которым разрешено работать с отчетами отдела или команды.

Возможные значения:

- `HEAD` — руководитель отдела
- `DEPUTY_HEAD` — заместитель руководителя отдела
- `ALL_DEPARTMENT_HEADS` — все руководители отделов
- `EMPLOYEE` — сотрудник отдела
- `TEAM_HEAD` — руководитель команды
- `TEAM_DEPUTY` — заместитель руководителя команды
- `TEAM_EMPLOYEE` — участник команды  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","name":"Отдел маркетинга","parentId":1,"description":"Отвечает за продвижение","userIds":{"MEMBER_HEAD":[7],"MEMBER_EMPLOYEE":[12,15]},"moveUsersToNode":true,"createChat":true,"bindingChatIds":[31],"createChannel":false,"createCollab":false,"settings":{"BUSINESS_PROC_AUTHORITY":["HEAD","DEPUTY_HEAD"],"REPORTS_AUTHORITY":["HEAD"]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","name":"Отдел маркетинга","parentId":1,"description":"Отвечает за продвижение","userIds":{"MEMBER_HEAD":[7],"MEMBER_EMPLOYEE":[12,15]},"moveUsersToNode":true,"createChat":true,"bindingChatIds":[31],"createChannel":false,"createCollab":false,"settings":{"BUSINESS_PROC_AUTHORITY":["HEAD","DEPUTY_HEAD"],"REPORTS_AUTHORITY":["HEAD"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.add
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.add',
            {
                type: 'DEPARTMENT',
                name: 'Отдел маркетинга',
                parentId: 1,
                description: 'Отвечает за продвижение',
                userIds: {
                    MEMBER_HEAD: [7],
                    MEMBER_EMPLOYEE: [12, 15]
                },
                moveUsersToNode: true,
                createChat: true,
                bindingChatIds: [31],
                settings: {
                    BUSINESS_PROC_AUTHORITY: ['HEAD', 'DEPUTY_HEAD'],
                    REPORTS_AUTHORITY: ['HEAD']
                }
            }
        );

        const result = response.getData().result;
        console.info('Department created with ID', result.id);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.add',
                [
                    'type' => 'DEPARTMENT',
                    'name' => 'Отдел маркетинга',
                    'parentId' => 1,
                    'description' => 'Отвечает за продвижение',
                    'userIds' => [
                        'MEMBER_HEAD' => [7],
                        'MEMBER_EMPLOYEE' => [12, 15],
                    ],
                    'moveUsersToNode' => true,
                    'createChat' => true,
                    'bindingChatIds' => [31],
                    'settings' => [
                        'BUSINESS_PROC_AUTHORITY' => ['HEAD', 'DEPUTY_HEAD'],
                        'REPORTS_AUTHORITY' => ['HEAD'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating department: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.add',
        {
            type: 'DEPARTMENT',
            name: 'Отдел маркетинга',
            parentId: 1,
            description: 'Отвечает за продвижение',
            userIds: {
                MEMBER_HEAD: [7],
                MEMBER_EMPLOYEE: [12, 15]
            },
            moveUsersToNode: true,
            createChat: true,
            bindingChatIds: [31],
            settings: {
                BUSINESS_PROC_AUTHORITY: ['HEAD', 'DEPUTY_HEAD'],
                REPORTS_AUTHORITY: ['HEAD']
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.node.add',
        [
            'type' => 'DEPARTMENT',
            'name' => 'Отдел маркетинга',
            'parentId' => 1,
            'description' => 'Отвечает за продвижение',
            'userIds' => [
                'MEMBER_HEAD' => [7],
                'MEMBER_EMPLOYEE' => [12, 15]
            ],
            'moveUsersToNode' => true,
            'createChat' => true,
            'bindingChatIds' => [31],
            'settings' => [
                'BUSINESS_PROC_AUTHORITY' => ['HEAD', 'DEPUTY_HEAD'],
                'REPORTS_AUTHORITY' => ['HEAD']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 44,
        "name": "Отдел маркетинга",
        "type": "DEPARTMENT",
        "structureId": 1,
        "parentId": 1,
        "description": "Отвечает за продвижение",
        "accessCode": "DR44",
        "userCount": 3,
        "colorName": null,
        "xmlId": null,
        "createdAt": "2026-06-02T11:15:20+03:00",
        "updatedAt": "2026-06-02T11:15:20+03:00",
        "members": [
            {
                "userId": 7,
                "name": "Анна Смирнова",
                "workPosition": "Руководитель отдела маркетинга",
                "role": "MEMBER_HEAD",
                "avatar": "https://example.bitrix24.ru/upload/main/1/avatar.jpg",
                "url": "/company/personal/user/7/"
            },
            {
                "userId": 12,
                "name": "Иван Петров",
                "workPosition": "Маркетолог",
                "role": "MEMBER_EMPLOYEE",
                "avatar": null,
                "url": "/company/personal/user/12/"
            }
        ]
    },
    "time": {
        "start": 1780388120,
        "finish": 1780388120.645321,
        "duration": 0.6453211307525635,
        "processing": 0.6032140254974365,
        "date_start": "2026-06-02T11:15:20+03:00",
        "date_finish": "2026-06-02T11:15:20+03:00",
        "operating_reset_at": 1780388720,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными созданного элемента структуры ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор созданного отдела или команды ||
|| **name**
[`string`](../../../data-types.md) | Название отдела или команды ||
|| **type**
[`string`](../../../data-types.md) | Тип элемента структуры ||
|| **structureId**
[`integer`](../../../data-types.md) | Идентификатор структуры компании ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского отдела или команды ||
|| **description**
[`string`](../../../data-types.md) | Описание отдела или команды ||
|| **accessCode**
[`string`](../../../data-types.md) | Код доступа элемента структуры ||
|| **userCount**
[`integer`](../../../data-types.md) | Количество пользователей в отделе или команде ||
|| **colorName**
[`string`](../../../data-types.md) | Цвет команды, если он задан ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор элемента структуры ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания элемента структуры ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего обновления элемента структуры ||
|| **members**
[`array`](../../../data-types.md) | Список пользователей, добавленных в отдел или команду, с ролями ||
|| **members[]**
[`object`](../../../data-types.md) | Объект пользователя отдела или команды ||
|| **userId**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../../data-types.md) | Имя пользователя ||
|| **workPosition**
[`string`](../../../data-types.md) | Должность пользователя ||
|| **role**
[`string`](../../../data-types.md) | Роль пользователя в отделе или команде ||
|| **avatar**
[`string`](../../../data-types.md) | Ссылка на аватар пользователя ||
|| **url**
[`string`](../../../data-types.md) | Ссылка на профиль пользователя ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `name` не указано",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `type`
`name`
`parentId` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `type` | Передано недопустимое значение типа элемента структуры | Используйте `DEPARTMENT` для отдела или `TEAM` для команды ||
|| `-` | Структура компании по умолчанию не найдена | Проверьте, что структура компании создана и доступна ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права создавать элемент структуры в указанном родительском отделе или команде ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-get.md)
- [{#T}](./humanresources-node-edit.md)
- [{#T}](./humanresources-node-list.md)
- [{#T}](./index.md)
