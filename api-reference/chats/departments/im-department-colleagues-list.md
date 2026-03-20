# Получить список коллег текущего пользователя im.department.colleagues.list

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой интранет-пользователь, кроме ботов

Метод `im.department.colleagues.list` получает список коллег текущего пользователя. Для руководителя метод вернет список подчиненных и всех руководителей.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_DATA**
[`string`](../../data-types.md) | Возвращать подробные данные пользователей. 

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки пользователей ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество элементов в выборке. По умолчанию `10`. Максимальное значение `50` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_DATA":"Y","OFFSET":0,"LIMIT":5}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.department.colleagues.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_DATA":"Y","OFFSET":0,"LIMIT":5,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.department.colleagues.list
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.department.colleagues.list',
            {
                USER_DATA: 'Y',
                OFFSET: 0,
                LIMIT: 5,
            }
        );

        console.log(response.getData().result);
        console.log(response.getData().total);
        console.log(response.getData().next);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.department.colleagues.list',
                [
                    'USER_DATA' => 'Y',
                    'OFFSET' => 0,
                    'LIMIT' => 5,
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

    ```js
    BX24.callMethod(
        'im.department.colleagues.list',
        {
            USER_DATA: 'Y',
            OFFSET: 0,
            LIMIT: 5,
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
                console.log(result.total());
                console.log(result.answer.next);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.department.colleagues.list',
        [
            'USER_DATA' => 'Y',
            'OFFSET' => 0,
            'LIMIT' => 5,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

- При `USER_DATA = 'N'`:

    ```json
    {
        "result": [9,547,408,103,290],
        "next": 5,
        "total": 7,
        "time": {
            "start": 1772520802,
            "finish": 1772520802.36194,
            "duration": 0.3619399070739746,
            "processing": 0,
            "date_start": "2026-03-03T09:53:22+03:00",
            "date_finish": "2026-03-03T09:53:22+03:00",
            "operating_reset_at": 1772521402,
            "operating": 0
        }
    }
    ```

- При `USER_DATA = 'Y'`:

    ```json
    {
        "result": [
            {
                "id": 9,
                "active": true,
                "name": "Анна Петрова",
                "first_name": "Анна",
                "last_name": "Петрова",
                "work_position": "Менеджер проектов",
                "color": "#58cc47",
                "avatar": "https://mysite.ru/upload/avatars/anna-petrova.jpg",
                "avatar_hr": "https://mysite.ru/upload/avatars/anna-petrova.jpg",
                "gender": "M",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2023-03-10T17:16:44+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [
                    1,
                    667
                ],
                "phones": false,
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": "anna.petrova@mysite.ru"
            },
            ... // описание для каждого пользователя
        ],
        "next": 5,
        "total": 7,
        "time": {
            "start": 1772521273,
            "finish": 1772521273.83899,
            "duration": 0.8389899730682373,
            "processing": 0,
            "date_start": "2026-03-03T10:01:13+03:00",
            "date_finish": "2026-03-03T10:01:13+03:00",
            "operating_reset_at": 1772521873,
            "operating": 0
        }
    }
    ```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список пользователей. 
- При `USER_DATA = 'N'` содержит идентификаторы пользователей
- При `USER_DATA = 'Y'` содержит объекты пользователей [(подробное описание)](#user-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество пользователей в выборке ||
|| **next**
[`integer`](../../data-types.md) | Смещение для получения следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект user {#user-object}

{% include [Таблицы объекта пользователя](./_includes/user-object-tables.md) %}

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "Only intranet users have access to this method."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_ERROR` | Only intranet users have access to this method | Метод недоступен для экстранет-пользователей и ботов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-department-get.md)
- [{#T}](./im-department-managers-get.md)
- [{#T}](./im-department-employees-get.md)
- [{#T}](./im-department-colleagues-list.md)
