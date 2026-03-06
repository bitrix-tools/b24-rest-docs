# Получить данные о пользователе im.user.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.get` получает данные о текущем пользователе или о пользователе по `ID`.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор пользователя. Если не передан, метод вернет данные текущего пользователя. 

Получить идентификатор пользователя можно методами [user.get](../../user/user-get.md), [user.search](../../user/user-search.md) или [im.chat.user.list](../chat-users/im-chat-user-list.md) ||
|| **AVATAR_HR**
[`string`](../../data-types.md) | Параметр для запроса поля `avatar_hr` с адресом аватара в высоком разрешении. Допустимые значения: `Y` или `N`, по умолчанию `N`. 

На текущий момент поле `avatar_hr` возвращается всегда, независимо от значения параметра ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":5,"AVATAR_HR":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":5,"AVATAR_HR":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.user.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.user.get', {
        ID: 5,
        AVATAR_HR: 'Y',
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
            'im.user.get',
            [
                'ID' => 5,
                'AVATAR_HR' => 'Y',
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
        'im.user.get',
        {
            ID: 5,
            AVATAR_HR: 'Y',
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
        'im.user.get',
        [
            'ID' => 5,
            'AVATAR_HR' => 'Y',
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
    "result": {
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
    },
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.2,
        "duration": 0.2,
        "processing": 0.08,
        "date_start": "2026-03-02T09:30:00+03:00",
        "date_finish": "2026-03-02T09:30:00+03:00",
        "operating_reset_at": 1760030000,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными пользователя. 

Структура объекта подробно описана [ниже](#result-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result-object}

{% include [Таблицы объекта пользователя](../_includes/user-object-tables.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ID_EMPTY",
    "error_description": "User ID can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ID_EMPTY` | User ID can't be empty | Передан `ID <= 0` ||
|| `USER_NOT_EXISTS` | User is not exists | Пользователь с указанным `ID` не найден ||
|| `ACCESS_DENIED` | You can request only users who consist of your extranet group | Текущий экстранет-пользователь запрашивает пользователя не из своей экстранет-группы ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-user-list-get.md)
- [{#T}](./im-user-status-set.md)
- [{#T}](./im-user-status-get.md)
- [{#T}](./im-user-status-idle-start.md)
- [{#T}](./im-user-status-idle-end.md)
