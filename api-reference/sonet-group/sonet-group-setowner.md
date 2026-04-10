# Изменить владельца группы или проекта sonet_group.setowner

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: владелец группы или проекта

Метод `sonet_group.setowner` назначает нового владельца рабочей группы или проекта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../data-types.md) | Идентификатор группы или проекта.

Идентификатор можно получить методом [sonet_group.get](./sonet-group-get.md) ||
|| **USER_ID***
[`integer`](../data-types.md) | Идентификатор нового владельца.

Идентификатор пользователя можно получить методом [user.get](../user/user-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"USER_ID":1269}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.setowner
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"USER_ID":1269,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.setowner
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.setowner',
            {
                GROUP_ID: 77,
                USER_ID: 1269
            }
        );
        
        const result = response.getData().result;
        console.log('Set owner for group:', result);
        
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
                'sonet_group.setowner',
                [
                    'GROUP_ID' => 77,
                    'USER_ID' => 1269
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting group owner: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.setowner',
        {
            GROUP_ID: 77,
            USER_ID: 1269
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
        'sonet_group.setowner',
        [
            'GROUP_ID' => 77,
            'USER_ID' => 1269
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
    "result": true,
    "time": {
        "start": 1773810300,
        "finish": 1773810300.3341,
        "duration": 0.3341,
        "processing": 0.1503,
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
[`boolean`](../data-types.md) | `true`, если владелец изменен ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "User has no permissions to set owner"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Invalid workgroup/project ID` | Передан неверный `GROUP_ID` или группа/проект не найдены ||
|| — | `Invalid user ID` | Передан неверный `USER_ID` ||
|| — | `Insufficient permissions to complete the operation.` | Недостаточно прав для смены владельца ||
|| — | `Cannot complete operation.` | Не удалось выполнить смену владельца ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-update.md)
- [{#T}](./sonet-group-user-groups.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
