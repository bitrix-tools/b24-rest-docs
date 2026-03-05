# Получить список руководителей подразделений im.department.managers.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой интранет-пользователь, кроме ботов

Метод `im.department.managers.get` получает список руководителей указанных подразделений.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`array`](../../data-types.md) | Массив идентификаторов подразделений. Можно передать строку с JSON-массивом идентификаторов.

Получить идентификатор департамента можно методом [получения списка подразделений](../../departments/department-get.md) или методом [поиска подразделений по названию](../search/im-search-department-list.md) ||
|| **USER_DATA**
[`string`](../../data-types.md) | Возвращать подробные данные пользователей.  

Возможные значения:
- `Y` — да
- `N` — нет
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":[3,7],"USER_DATA":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.department.managers.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":[3,7],"USER_DATA":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.department.managers.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.department.managers.get',
            {
                ID: [3, 7],
                USER_DATA: 'Y'
            }
        );

        console.log(response.getData().result);
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
                'im.department.managers.get',
                [
                    'ID' => [3, 7],
                    'USER_DATA' => 'Y',
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
        'im.department.managers.get',
        {
            ID: [3, 7],
            USER_DATA: 'Y'
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
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.department.managers.get',
        [
            'ID' => [3, 7],
            'USER_DATA' => 'Y',
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
        "result": {
            "3": [13],
            "7": [103]
        },
        "time": {
            "start": 1772519172,
            "finish": 1772519172.208348,
            "duration": 0.20834803581237793,
            "processing": 0,
            "date_start": "2026-03-03T09:26:12+03:00",
            "date_finish": "2026-03-03T09:26:12+03:00",
            "operating_reset_at": 1772519772,
            "operating": 0
        }
    }
    ```

- При `USER_DATA = 'Y'`:

    ```json
    {
        "result": {
            "3": [
                {
                    "id": 13,
                    "active": true,
                    "name": "Иван Иванов",
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "work_position": "Главный бухгалтер",
                    "color": "#728f7a",
                    "avatar": "https://mysite.ru/upload/avatars/ivan-ivanov.jpg",
                    "avatar_hr": "https://mysite.ru/upload/avatars/ivan-ivanov.jpg",
                    "gender": "M",
                    "birthday": "10-09",
                    "extranet": false,
                    "network": false,
                    "bot": false,
                    "connector": false,
                    "external_auth_id": "socservices",
                    "status": "online",
                    "idle": false,
                    "last_activity_date": "2024-02-19T00:40:41+03:00",
                    "mobile_last_date": false,
                    "desktop_last_date": false,
                    "absent": false,
                    "departments": [
                        9,
                        3
                    ],
                    "phones": {
                        "personal_mobile": "71234567890",
                        "inner_phone": "55"
                    },
                    "bot_data": null,
                    "type": "user",
                    "website": "",
                    "email": "ivan.ivanov@mysite.ru"
                }
            ],
            "7": [
                {
                    "id": 103,
                    "active": true,
                    "name": "Анна Петрова",
                    "first_name": "Анна",
                    "last_name": "Петрова",
                    "work_position": "Руководитель отдела разработки",
                    "color": "#4ba984",
                    "avatar": "https://mysite.ru/upload/avatars/anna-petrova.jpg",
                    "avatar_hr": "https://mysite.ru/upload/avatars/anna-petrova.jpg",
                    "gender": "F",
                    "birthday": "",
                    "extranet": false,
                    "network": false,
                    "bot": false,
                    "connector": false,
                    "external_auth_id": "socservices",
                    "status": "online",
                    "idle": false,
                    "last_activity_date": "2025-11-06T16:59:28+03:00",
                    "mobile_last_date": false,
                    "desktop_last_date": false,
                    "absent": false,
                    "departments": [
                        1,
                        7
                    ],
                    "phones": false,
                    "bot_data": null,
                    "type": "user",
                    "website": "",
                    "email": "anna.petrova@mysite.ru"
                }
            ]
        },
        "time": {
            "start": 1772519165,
            "finish": 1772519165.292582,
            "duration": 0.29258203506469727,
            "processing": 0,
            "date_start": "2026-03-03T09:26:05+03:00",
            "date_finish": "2026-03-03T09:26:05+03:00",
            "operating_reset_at": 1772519765,
            "operating": 0
        }
    }
    ```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект, где ключ — идентификатор подразделения, значение:
- при `USER_DATA = 'N'` содержит массив идентификаторов руководителей,
- при `USER_DATA = 'Y'` содержит массив объектов с описанием пользователей — руководителей подразделения [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект user {#user-object}

{% include [Таблицы объекта пользователя](./_includes/user-object-tables.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ID_EMPTY",
    "error_description": "Department ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ID_EMPTY` | Department ID can't be empty | Не передан, передан неверно или пустым обязательный параметр `ID` ||
|| `403` | `ACCESS_ERROR` | Only intranet users have access to this method | Метод недоступен для экстранет-пользователей и ботов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-department-get.md)
- [{#T}](./im-department-managers-get.md)
- [{#T}](./im-department-employees-get.md)
- [{#T}](./im-department-colleagues-list.md)
