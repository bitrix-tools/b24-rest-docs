# Получить список сотрудников подразделений im.department.employees.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой интранет-пользователь, кроме ботов

Метод `im.department.employees.get` получает список сотрудников указанных подразделений.

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
- `Y` — да,
- `N` — нет ||
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
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.department.employees.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":[3,7],"USER_DATA":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.department.employees.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.department.employees.get',
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
                'im.department.employees.get',
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
        'im.department.employees.get',
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
        'im.department.employees.get',
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
            "7": [3,67,61,103],
            "3": [278,517,13]
        },
        "time": {
            "start": 1772519829,
            "finish": 1772519829.456118,
            "duration": 0.456118106842041,
            "processing": 0,
            "date_start": "2026-03-03T09:37:09+03:00",
            "date_finish": "2026-03-03T09:37:09+03:00",
            "operating_reset_at": 1772520429,
            "operating": 0.18364310264587402
        }
    }
    ```

- При `USER_DATA = 'Y'`:

    ```json
    {
        "result": {
            "7": [
                {
                    "id": 3,
                    "active": true,
                    "name": "Иван Иванов",
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "work_position": "Системный администратор",
                    "color": "#4ba984",
                    "avatar": "https://mysite.ru/upload/avatars/ivan-ivanov.jpg",
                    "avatar_hr": "https://mysite.ru/upload/avatars/ivan-ivanov.jpg",
                    "gender": "M",
                    "birthday": "",
                    "extranet": false,
                    "network": false,
                    "bot": false,
                    "connector": false,
                    "external_auth_id": "socservices",
                    "status": "online",
                    "idle": false,
                    "last_activity_date": "2015-02-16T19:41:09+03:00",
                    "mobile_last_date": false,
                    "desktop_last_date": false,
                    "absent": false,
                    "departments": [
                        7
                    ],
                    "phones": {
                        "inner_phone": "42"
                    },
                    "bot_data": null,
                    "type": "user",
                    "website": "",
                    "email": "ivan.ivanov@mysite.ru"
                },
                {
                    "id": 67,
                    "active": true,
                    "name": "Анна Петрова",
                    "first_name": "Анна",
                    ...
                },

            ],
            "3": [
                {
                    "id": 278,
                    "active": true,
                    "name": "Мария Сидорова",
                    "first_name": "Мария",
                    "last_name": "Сидорова",
                    ...
                },
            ...
            ]
        },
        "time": {
            "start": 1772519820,
            "finish": 1772519820.48721,
            "duration": 0.4872100353240967,
            "processing": 0,
            "date_start": "2026-03-03T09:37:00+03:00",
            "date_finish": "2026-03-03T09:37:00+03:00",
            "operating_reset_at": 1772520420,
            "operating": 0.18364310264587402
        }
    }
    ```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект, где ключ — идентификатор подразделения, значение:
- при `USER_DATA = 'N'` содержит массив идентификаторов сотрудников,
- при `USER_DATA = 'Y'` содержит массив объектов с описанием пользователей [(подробное описание)](#user-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект пользователя {#user-object}

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
