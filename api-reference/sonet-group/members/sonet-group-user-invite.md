# Пригласить пользователей в группу sonet_group.user.invite

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Приглашать в группу или проект

Метод `sonet_group.user.invite` отправляет приглашения пользователям в рабочую группу или проект.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../../data-types.md) | Идентификатор рабочей группы или проекта.

Идентификатор можно получить с помощью метода [sonet_group.get](../sonet-group-get.md) ||
|| **USER_ID***
[`integer/array`](../../data-types.md) | Идентификатор пользователя.

Идентификатор можно получить с помощью метода [user.get](../../user/user-get.md) ||
|| **MESSAGE**
[`string`](../../data-types.md) | Текст приглашения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":1271,"MESSAGE":"Присоединяйтесь к проекту"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.invite
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"USER_ID":1271,"MESSAGE":"Присоединяйтесь к проекту","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.invite
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.user.invite',
            {
                GROUP_ID: 69,
                USER_ID: 1271,
                MESSAGE: 'Присоединяйтесь к проекту',
            }
        );
        
        const result = response.getData().result;
        console.log('User invited to group:', result);
        
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
                'sonet_group.user.invite',
                [
                    'GROUP_ID' => 69,
                    'USER_ID' => 1271,
                    'MESSAGE' => 'Присоединяйтесь к проекту'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error inviting user to group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sonet_group.user.invite',
        {
            GROUP_ID: 69,
            USER_ID: 1271,
            MESSAGE: 'Присоединяйтесь к проекту'
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
        'sonet_group.user.invite',
        [
            'GROUP_ID' => 69,
            'USER_ID' => 1271,
            'MESSAGE' => 'Присоединяйтесь к проекту'
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
    "result": ["1271"],
    "time": {
        "start": 1773846932,
        "finish": 1773846933.077318,
        "duration": 1.0773179531097412,
        "processing": 0,
        "date_start": "2026-03-18T18:15:32+03:00",
        "date_finish": "2026-03-18T18:15:33+03:00",
        "operating_reset_at": 1773847533,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, которые были успешно приглашены.

Пустой массив означает, что не удалось пригласить ни одного из переданных пользователей. Например, пользователь уже состоит в группе или у текущего пользователя нет прав на приглашение ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong user IDs"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `Wrong user IDs` | Передан пустой или некорректный `USER_ID` ||
|| — | `Socialnetwork group not found` | Группа или проект не найдены или недоступны текущему пользователю ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-user-request.md)
- [{#T}](./sonet-group-user-add.md)
- [{#T}](./sonet-group-user-update.md)
- [{#T}](./sonet-group-user-get.md)
- [{#T}](./sonet-group-user-delete.md)
