# Отправить запрос на вступление в группу sonet_group.user.request

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к группе или проекту

Метод `sonet_group.user.request` отправляет запрос текущего пользователя на вступление в рабочую группу или проект.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../../data-types.md) | Идентификатор рабочей группы или проекта.

Идентификатор можно получить с помощью метода [sonet_group.get](../sonet-group-get.md) ||
|| **MESSAGE**
[`string`](../../data-types.md) | Текст запроса на вступление ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"MESSAGE":"Прошу добавить меня в проект"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.request
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":69,"MESSAGE":"Прошу добавить меня в проект","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.request
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.user.request',
            {
                GROUP_ID: 69,
                MESSAGE: 'Прошу добавить меня в проект',
            }
        );
        
        const result = response.getData().result;
        console.log('Request result:', result);
        
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
                'sonet_group.user.request',
                [
                    'GROUP_ID' => 69,
                    'MESSAGE' => 'Прошу добавить меня в проект'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error requesting group join: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sonet_group.user.request',
        {
            GROUP_ID: 69,
            MESSAGE: 'Прошу добавить меня в проект'
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
        'sonet_group.user.request',
        [
            'GROUP_ID' => 69,
            'MESSAGE' => 'Прошу добавить меня в проект'
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
        "start": 1773810600,
        "finish": 1773810600.5026,
        "duration": 0.5026,
        "processing": 0.2404,
        "date_start": "2026-03-18T08:50:00+03:00",
        "date_finish": "2026-03-18T08:50:00+03:00",
        "operating_reset_at": 1773811200,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если запрос на вступление успешно отправлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Socialnetwork group not found"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `Socialnetwork group not found` | Группа или проект не найдены или недоступны текущему пользователю ||
|| — | `Cannot request to join group` | Не удалось отправить запрос на вступление ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-user-invite.md)
- [{#T}](./sonet-group-user-add.md)
- [{#T}](./sonet-group-user-update.md)
- [{#T}](./sonet-group-user-get.md)
- [{#T}](./sonet-group-user-delete.md)
