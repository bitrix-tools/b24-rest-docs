# Найти пользователей im.search.user.list

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.user.list` выполняет поиск пользователей по имени, фамилии, должности и подразделению.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **FIND***
[`string`](../../data-types.md) | Поисковая фраза. Минимальное количество символов для поиска — `3` ||
|| **BUSINESS**
[`string`](../../data-types.md) | Искать только среди бизнес-пользователей. 

Допустимые значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||

|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки пользователей. По умолчанию `0` ||
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
      -d '{"FIND":"Иван","BUSINESS":"N","OFFSET":0,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.user.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Иван","BUSINESS":"N","OFFSET":0,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.user.list
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.search.user.list', {
        FIND: 'Иван',
        BUSINESS: 'N',
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
            'im.search.user.list',
            [
                'FIND' => 'Иван',
                'BUSINESS' => 'N',
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
        'im.search.user.list',
        {
            FIND: 'Иван',
            BUSINESS: 'N',
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
        'im.search.user.list',
        [
            'FIND' => 'Иван',
            'BUSINESS' => 'N',
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
            "id": 103,
            "name": "Светлана Иванова",
            "first_name": "Светлана",
            "last_name": "Иванова",
            "work_position": "Руководитель ИТ-отдела",
            "color": "#4ba984",
            "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
            "gender": "F",
            "birthday": "08-03",
            "extranet": false,
            "network": false,
            "bot": false,
            "connector": false,
            "external_auth_id": "socservices",
            "status": "online",
            "idle": false,
            "last_activity_date": "2026-03-04T15:40:56+03:00",
            "mobile_last_date": false,
            "departments": [1, 7],
            "absent": false,
            "phones": {
                "work_phone": "79123456789",
                "personal_mobile": "81234567890",
                "inner_phone": "78"
            }
        },
        ... // описание для каждого пользователя
    ],
    "total": 2,
    "time": {
        "start": 1772628089,
        "finish": 1772628089.061656,
        "duration": 0.06165599822998047,
        "processing": 0,
        "date_start": "2026-03-04T15:41:29+03:00",
        "date_finish": "2026-03-04T15:41:29+03:00",
        "operating_reset_at": 1772628689,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список найденных пользователей.

Структура объекта пользователя подробно описана [ниже](#user-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных пользователей ||
|| **next**
[`integer`](../../data-types.md) | Смещение следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект пользователя {#user-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../data-types.md) | Должность пользователя ||
|| **color**
[`string`](../../data-types.md) | Цвет пользователя в формате HEX ||
|| **avatar**
[`string`](../../data-types.md) 
[`null`](../../data-types.md) | Ссылка на аватар пользователя ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя: `M` или `F` ||
|| **birthday**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | День рождения в формате `DD-MM` или `false` ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Bitrix24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак пользователя-бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя-коннектора открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Идентификатор внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Текущий статус пользователя ||
|| **idle**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время перехода в статус «Отошел» в формате ISO 8601 (RFC3339) или `false` ||
|| **last_activity_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней активности в формате ISO 8601 (RFC3339) или `false` ||
|| **mobile_last_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней мобильной активности в формате ISO 8601 (RFC3339) или `false` ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **absent**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Дата окончания отсутствия в формате ISO 8601 (RFC3339) или `false` ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя или `false`.

Структура объекта подробно описана [ниже](#phones-object) ||
|#

### Объект phones {#phones-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **work_phone**
[`string`](../../data-types.md) | Рабочий телефон ||
|| **personal_mobile**
[`string`](../../data-types.md) | Мобильный телефон ||
|| **inner_phone**
[`string`](../../data-types.md) | Внутренний телефон ||
|#

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
|| `FIND_SHORT` | Too short a search phrase | Поисковая фраза не передана или слишком короткая для внутреннего фильтра поиска ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-department-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-get.md)
- [{#T}](./im-search-last-delete.md)
