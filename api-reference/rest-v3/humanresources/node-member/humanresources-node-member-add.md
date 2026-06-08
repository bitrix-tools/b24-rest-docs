# Добавить участников в отдел humanresources.node.member.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление сотрудников в отдел» или «Добавление участников в команду»

Метод `humanresources.node.member.add` добавляет пользователей в отдел или команду.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **nodeId***
[`integer`](../../../data-types.md) | Идентификатор отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](../node/humanresources-node-list.md) ||
|| **userIds***
[`array`](../../../data-types.md) | Массив идентификаторов пользователей, которых нужно добавить в отдел или команду. Если пользователь уже состоит в этом отделе или команде, метод обновит его роль.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|| **role***
[`string`](../../../data-types.md) | Роль, которую нужно назначить всем пользователям из `userIds`.

Возможные значения для отдела:

- `MEMBER_HEAD` — руководитель отдела
- `MEMBER_DEPUTY_HEAD` — заместитель руководителя отдела
- `MEMBER_EMPLOYEE` — сотрудник отдела

Возможные значения для команды:

- `MEMBER_TEAM_HEAD` — руководитель команды
- `MEMBER_TEAM_DEPUTY_HEAD` — заместитель руководителя команды
- `MEMBER_TEAM_EMPLOYEE` — участник команды ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.member.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"nodeId":15,"userIds":[7,12,18],"role":"MEMBER_EMPLOYEE"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.member.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"nodeId":15,"userIds":[7,12,18],"role":"MEMBER_EMPLOYEE","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.member.add
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.member.add',
            {
                nodeId: 15,
                userIds: [7, 12, 18],
                role: 'MEMBER_EMPLOYEE'
            }
        );

        const result = response.getData().result;
        console.log(result.success);
    }
    catch (error)
    {
        console.error('Error:', error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.member.add',
                [
                    'nodeId' => 15,
                    'userIds' => [7, 12, 18],
                    'role' => 'MEMBER_EMPLOYEE',
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.member.add',
        {
            nodeId: 15,
            userIds: [7, 12, 18],
            role: 'MEMBER_EMPLOYEE'
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
        'humanresources.node.member.add',
        [
            'nodeId' => 15,
            'userIds' => [7, 12, 18],
            'role' => 'MEMBER_EMPLOYEE',
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
        "success": true
    },
    "time": {
        "start": 1780405600,
        "finish": 1780405600.184422,
        "duration": 0.18442201614379883,
        "processing": 0.12311410903930664,
        "date_start": "2026-06-02T16:06:40+03:00",
        "date_finish": "2026-06-02T16:06:40+03:00",
        "operating_reset_at": 1780406200,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом операции ||
|| **success**
[`boolean`](../../../data-types.md) | Значение `true`, если пользователи успешно добавлены в отдел или команду ||
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
                "message": "Parameter \"role\" is required.",
                "field": "role"
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
|| `nodeId` | Parameter `"nodeId"` is required. | Передайте идентификатор отдела или команды в параметре `nodeId` ||
|| `userIds` | Parameter `"userIds"` is required and must be a non-empty array. | Передайте непустой массив идентификаторов пользователей ||
|| `role` | Parameter `"role"` is required. | Передайте роль участника в параметре `role` ||
|| `role` | Role `#ROLE#` not found. | Передайте существующую роль для выбранного типа отдела или команды ||
|| `role` | Invalid role `#ROLE#`. Allowed: `#ROLE_LIST#`. | Передайте роль, которая поддерживается для выбранного типа отдела или команды ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право добавлять участников в этот отдел или команду ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `nodeId` | Запись с указанным идентификатором не найдена | Передайте идентификатор существующего отдела или команды ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-member-set.md)
- [{#T}](./humanresources-node-member-move.md)
- [{#T}](./index.md)
