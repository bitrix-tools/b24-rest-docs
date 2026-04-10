# Получить данные о списке пользователей im.user.list.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.list.get` возвращает данные о пользователях по списку идентификаторов.

Если текущий пользователь является экстранет-пользователем, метод вернет данные только по пользователям из его экстранет-групп. Идентификаторы пользователей вне этих групп будут пропущены без ошибки.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **ID***
[`array`](../../data-types.md) 
[`string`](../../data-types.md) | Массив идентификаторов пользователей или JSON-строка с массивом.

Получить идентификаторы пользователей можно методами [user.get](../../user/user-get.md), [user.search](../../user/user-search.md) или [im.chat.user.list](../chat-users/im-chat-user-list.md) ||
|| **AVATAR_HR**
[`string`](../../data-types.md) | Параметр для запроса поля `avatar_hr` с адресом аватара в высоком разрешении. Допустимые значения: `Y` или `N`, по умолчанию `N`.

На текущий момент поле `avatar_hr` возвращается всегда, независимо от значения параметра ||
|| **RESULT_TYPE**
[`string`](../../data-types.md) | Формат `result`. Значение `array` вернет обычный массив объектов пользователей, любое другое значение вернет объект с ключами-идентификаторами пользователей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":[4,5],"AVATAR_HR":"Y","RESULT_TYPE":"array"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.user.list.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":[4,5],"RESULT_TYPE":"array","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.user.list.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.user.list.get', {
        ID: [4, 5],
        AVATAR_HR: 'Y',
        RESULT_TYPE: 'array',
      });

      const { result } = response.getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.user.list.get',
            [
                'ID' => [4, 5],
                'AVATAR_HR' => 'Y',
                'RESULT_TYPE' => 'array',
            ]
        );

        $result = $response->getResponseData()->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            var_dump($result->data());
        }
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.user.list.get',
        {
            ID: [4, 5],
            AVATAR_HR: 'Y',
            RESULT_TYPE: 'array',
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
        'im.user.list.get',
        [
            'ID' => [4, 5],
            'AVATAR_HR' => 'Y',
            'RESULT_TYPE' => 'array',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": [
        {
            "id": 4,
            "active": true,
            "name": "Анна Соколова",
            "first_name": "Анна",
            "last_name": "Соколова",
            "work_position": "Аналитик",
            "color": "#df532d",
            "avatar": "https://example.bitrix24.ru/upload/main/avatar4.png",
            "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar4_hr.png",
            "gender": "F",
            "birthday": "",
            "extranet": false,
            "network": false,
            "bot": false,
            "connector": false,
            "external_auth_id": "default",
            "status": "online",
            "idle": false,
            "last_activity_date": "2026-03-02T09:30:00+03:00",
            "mobile_last_date": false,
            "desktop_last_date": false,
            "absent": false,
            "departments": [7, 5],
            "phones": {
                "work_phone": "+71234567891",
                "personal_mobile": "+71234567891",
                "inner_phone": "22"
            },
            "website": "example.ru",
            "email": "anna.sokolova@example.ru",
            "bot_data": null,
            "type": "user"
        },
        {
            "id": 5,
            "active": true,
            "name": "Иван Петров",
            "first_name": "Иван",
            "last_name": "Петров",
            "work_position": "Менеджер",
            "color": "#048bd0",
            "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
            "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar_hr.png",
            "gender": "M",
            "birthday": "",
            "extranet": false,
            "network": false,
            "bot": false,
            "connector": false,
            "external_auth_id": "default",
            "status": "online",
            "idle": false,
            "last_activity_date": "2026-03-02T09:30:00+03:00",
            "mobile_last_date": false,
            "desktop_last_date": false,
            "absent": false,
            "departments": [10],
            "phones": {
                "work_phone": "+71234567890",
                "personal_mobile": "+71234567890",
                "inner_phone": "21"
            },
            "website": "example.ru",
            "email": "user@example.ru",
            "bot_data": null,
            "type": "user"
        }
    ],
    "time": {
        "start": 1772449081,
        "finish": 1772449081.887056,
        "duration": 0.8870561122894287,
        "processing": 0,
        "date_start": "2026-03-02T13:58:01+03:00",
        "date_finish": "2026-03-02T13:58:01+03:00",
        "operating_reset_at": 1772449681,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) 
[`array`](../../data-types.md) | Данные пользователей. По умолчанию возвращается объект с ключами-идентификаторами, при `RESULT_TYPE = 'array'` возвращается массив.

Структура объекта пользователя подробно описана [ниже](#user-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект пользователя {#user-object}

{% include [Таблицы объекта пользователя](../_includes/user-object-tables.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "INVALID_FORMAT",
    "error_description": "A wrong format for the ID field is passed"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `INVALID_FORMAT` | A wrong format for the ID field is passed | Параметр `ID` не передан или передан в неверном формате ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-user-get.md)
- [{#T}](./im-user-status-set.md)
- [{#T}](./im-user-status-get.md)
- [{#T}](./im-user-status-idle-start.md)
- [{#T}](./im-user-status-idle-end.md)
