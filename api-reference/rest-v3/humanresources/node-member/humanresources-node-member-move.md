# Перенести участников в отдел humanresources.node.member.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление сотрудников в отдел» или «Добавление участников в команду»

Метод `humanresources.node.member.move` переносит пользователей в указанный отдел или команду.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **nodeId***
[`integer`](../../../data-types.md) | Идентификатор целевого отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](../node/humanresources-node-list.md) ||
|| **userIds***
[`array`](../../../data-types.md) | Массив идентификаторов пользователей, которых нужно перенести.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|| **role**
[`string`](../../../data-types.md) | Роль, которую нужно назначить перенесенным участникам.

Возможные значения для отдела:

- `MEMBER_HEAD` — руководитель отдела
- `MEMBER_DEPUTY_HEAD` — заместитель руководителя отдела
- `MEMBER_EMPLOYEE` — сотрудник отдела

Возможные значения для команды:

- `MEMBER_TEAM_HEAD` — руководитель команды
- `MEMBER_TEAM_DEPUTY_HEAD` — заместитель руководителя команды
- `MEMBER_TEAM_EMPLOYEE` — участник команды 

По умолчанию: `MEMBER_EMPLOYEE` для отдела и `MEMBER_TEAM_EMPLOYEE` для команды ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.member.move`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"nodeId":28,"userIds":[12,18],"role":"MEMBER_EMPLOYEE"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.member.move
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"nodeId":28,"userIds":[12,18],"role":"MEMBER_EMPLOYEE","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.member.move
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.member.move',
            {
                nodeId: 28,
                userIds: [12, 18],
                role: 'MEMBER_EMPLOYEE'
            }
        );

        const result = response.getData().result;
        console.log('Member move result:', result.success);
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
                'humanresources.node.member.move',
                [
                    'nodeId' => 28,
                    'userIds' => [12, 18],
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
        'humanresources.node.member.move',
        {
            nodeId: 28,
            userIds: [12, 18],
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
        'humanresources.node.member.move',
        [
            'nodeId' => 28,
            'userIds' => [12, 18],
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
        "start": 1780406100,
        "finish": 1780406100.215497,
        "duration": 0.21549701690673828,
        "processing": 0.1711289882659912,
        "date_start": "2026-06-02T16:15:00+03:00",
        "date_finish": "2026-06-02T16:15:00+03:00",
        "operating_reset_at": 1780406700,
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
[`boolean`](../../../data-types.md) | Значение `true`, если пользователи успешно перенесены ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `28` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `nodeId` | Parameter `"nodeId"` is required. | Передайте идентификатор отдела или команды ||
|| `userIds` | Parameter `"userIds"` is required and must be a non-empty array. | Передайте непустой массив идентификаторов пользователей ||
|| `role` | Invalid role `#ROLE#`. Allowed: `#ROLE_LIST#`. | Передайте роль, которая поддерживается для выбранного типа отдела или команды ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право добавлять участников в целевой отдел или команду ||
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

- [{#T}](./humanresources-node-member-add.md)
- [{#T}](./humanresources-node-member-remove.md)
- [{#T}](./index.md)

<!-- Generated by skill-1-gen-docs from source: C:\Users\g.m.tagirova\github\b24-rest-docs\api-reference\rest-v3\OpenAPI.md; C:\Users\g.m.tagirova\original-bitrix\modules\humanresources\lib\Rest\Controller\Node\Member.php -->
<!-- Generated: 2026-06-02 -->
