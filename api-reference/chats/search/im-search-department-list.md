# Найти подразделения im.search.department.list

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.department.list` выполняет поиск подразделений по полному названию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **FIND***
[`string`](../../data-types.md) | Поисковая фраза для поиска по полному названию подразделения (поле [full_name](../departments/im-department-get.md#department)) ||
|| **USER_DATA**
[`string`](../../data-types.md) | Возвращать данные руководителя подразделения в поле [manager_user_data](#manager_user_data). 

Доступные значения: 
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||
|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки подразделений. По умолчанию `0` ||
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
      -d '{"FIND":"Отдел","USER_DATA":"Y","OFFSET":0,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.department.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Отдел","USER_DATA":"Y","OFFSET":0,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.department.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.search.department.list', {
        FIND: 'Отдел',
        USER_DATA: 'Y',
        OFFSET: 0,
        LIMIT: 10,
      });

      const { result, total, next } = response.getData();
      console.log(result, total, next);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.department.list',
            [
                'FIND' => 'Отдел',
                'USER_DATA' => 'Y',
                'OFFSET' => 0,
                'LIMIT' => 10,
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
        'im.search.department.list',
        {
            FIND: 'Отдел',
            USER_DATA: 'Y',
            OFFSET: 0,
            LIMIT: 10,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data(), result.total(), result.next());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.search.department.list',
        [
            'FIND' => 'Отдел',
            'USER_DATA' => 'Y',
            'OFFSET' => 0,
            'LIMIT' => 10,
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
            "id": 9,
            "name": "Отдел маркетинга и рекламы",
            "full_name": "Отдел маркетинга и рекламы / Моя компания",
            "manager_user_id": 3,
            "manager_user_data": {
                "id": 3,
                "active": true,
                "name": "Елена Иванова",
                "first_name": "Елена",
                "last_name": "Иванова",
                "work_position": "",
                "color": "#1eb4aa",
                "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
                "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar.png",
                "gender": "F",
                "birthday": "06-04",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-03-04T22:08:29+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [1],
                "phones": {
                    "work_phone": "7495111111",
                    "inner_phone": "222"
                },
                "bot_data": null,
                "type": "user",
                "website": "example.ru",
                "email": "user@example.ru"
            }
        },
        ... // описание для каждого подразделения
    ],
    "total": 2,
    "time": {
        "start": 1772651443,
        "finish": 1772651443.378436,
        "duration": 0.3784360885620117,
        "processing": 0,
        "date_start": "2026-03-04T22:10:43+03:00",
        "date_finish": "2026-03-04T22:10:43+03:00",
        "operating_reset_at": 1772652043,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список найденных подразделений.

Структура объекта подразделения подробно описана [ниже](#department-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных подразделений ||
|| **next**
[`integer`](../../data-types.md) | Смещение следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект подразделения {#department-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор подразделения ||
|| **name**
[`string`](../../data-types.md) | Короткое название подразделения ||
|| **full_name**
[`string`](../../data-types.md) | Полное название подразделения ||
|| **manager_user_id**
[`integer`](../../data-types.md) | Идентификатор руководителя подразделения ||
|| **manager_user_data**
[`object`](../../data-types.md) | Данные руководителя подразделения. Объект возвращается только при `USER_DATA = 'Y'`.

Структура объекта руководителя подробно описана [ниже](#manager_user_data) ||
|#

#### Объект manager_user_data {#manager_user_data}

{% include [Таблицы объекта пользователя](../_includes/user-object-tables.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FIND_SHORT",
    "error_description": "Too short a search phrase."
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `FIND_SHORT` | Too short a search phrase | Не передан параметр `FIND` или фраза меньше трех символов ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-user-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-get.md)
- [{#T}](./im-search-last-delete.md)
