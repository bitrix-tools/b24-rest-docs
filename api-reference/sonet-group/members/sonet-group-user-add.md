# Добавить пользователей в группу sonet_group.user.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sonet_group.user.add` добавляет пользователей в рабочую группу или проект без приглашения и подтверждения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../../data-types.md) | Идентификатор рабочей группы или проекта.

Идентификатор можно получить методом [sonet_group.get](../sonet-group-get.md) ||
|| **USER_ID***
[`integer/array`](../../data-types.md) | Идентификатор пользователя.

Идентификатор можно получить с помощью метода [user.get](../../user/user-get.md).

Если включен модуль `intranet` метод добавляет только сотрудников и экстранет-пользователей. Остальные пользователи игнорируются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":[1271,1272]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":[1271,1272],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.user.add',
            {
                GROUP_ID: 69,
                USER_ID: [1271, 1272],
            }
        );
        
        const result = response.getData().result;
        console.log('Users added to group:', result);
        
        processResult(result);
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
                'sonet_group.user.add',
                [
                    'GROUP_ID' => 69,
                    'USER_ID' => [1271, 1272]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding users to group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sonet_group.user.add',
        {
            GROUP_ID: 69,
            USER_ID: [1271, 1272]
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'sonet_group.user.add',
        [
            'GROUP_ID' => 69,
            'USER_ID' => [1271, 1272]
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
    "result": ["1271", "1272"],
    "time": {
        "start": 1773810300,
        "finish": 1773810300.8123,
        "duration": 0.8123,
        "processing": 0.4021,
        "date_start": "2026-03-18T08:45:00+03:00",
        "date_finish": "2026-03-18T08:45:00+03:00",
        "operating_reset_at": 1773810900,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, которые были успешно добавлены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong group ID"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `No permissions to add users` | Недостаточно прав для добавления участников ||
|| — | `Wrong user IDs` | Передан пустой или некорректный `USER_ID` ||
|| — | `Socialnetwork group not found` | Группа или проект с указанным `GROUP_ID` не найдены ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-user-invite.md)
- [{#T}](./sonet-group-user-request.md)
- [{#T}](./sonet-group-user-update.md)
- [{#T}](./sonet-group-user-get.md)
- [{#T}](./sonet-group-user-delete.md)
