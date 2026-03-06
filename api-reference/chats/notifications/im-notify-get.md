# Получить уведомления im.notify.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.get` возвращает список уведомлений пользователя частями. Следующая часть запрашивается через `LAST_ID` и `LAST_TYPE`. 

Сортировка уведомлений: сначала по убыванию даты создания, затем по убыванию идентификаторов. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего уведомления предыдущей страницы для загрузки следующей. Обычно берется из поля `id` последнего элемента массива `notifications` в ответе предыдущего шага выборки или в ответе [im.notify.history.search](./im-notify-history-search.md) 

Идентификатор уведомления также возвращают методы [im.notify](./im-notify.md), [im.notify.personal.add](./im-notify-personal-add.md) и [im.notify.system.add](./im-notify-system-add.md).

Параметр нужно использовать вместе с `LAST_TYPE` ||
|| **LAST_TYPE**
[`integer`](../../data-types.md) | Технический курсор пагинации.

Допустимые значения: 
- `1` — продолжить выборку с этапа подтверждений
- `3` — продолжить выборку с этапа обычных уведомлений

Параметр нужно использовать вместе с `LAST_ID`.

Для значений, отличных от `1` и `3`, сервер не возвращает отдельную ошибку ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество уведомлений на страницу. Значение по умолчанию — `50`. Максимальное значение — `50` ||
|| **CONVERT_TEXT**
[`string`](../../data-types.md) | Преобразовать текст уведомлений. Значение `Y` включает преобразование, любое другое значение отключает ||
|#

На одной странице метод может вернуть смешанный набор уведомлений: сначала подтверждения, затем обычные уведомления для добора до `LIMIT`.

Для стабильной постраничной выборки:

- передавайте `LAST_ID` последнего элемента предыдущей страницы
- используйте `LAST_TYPE` из предыдущего шага пагинации

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_ID":1500,"LAST_TYPE":3,"LIMIT":20,"CONVERT_TEXT":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_ID":1500,"LAST_TYPE":3,"LIMIT":20,"CONVERT_TEXT":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.notify.get', {
        LAST_ID: 1500,
        LAST_TYPE: 3,
        LIMIT: 20,
        CONVERT_TEXT: 'Y',
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
            'im.notify.get',
            [
                'LAST_ID' => 1500,
                'LAST_TYPE' => 3,
                'LIMIT' => 20,
                'CONVERT_TEXT' => 'Y',
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
        'im.notify.get',
        {
            LAST_ID: 1500,
            LAST_TYPE: 3,
            LIMIT: 20,
            CONVERT_TEXT: 'Y',
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
        'im.notify.get',
        [
            'LAST_ID' => 1500,
            'LAST_TYPE' => 3,
            'LIMIT' => 20,
            'CONVERT_TEXT' => 'Y',
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
        "total_count": 120,
        "total_unread_count": 5,
        "chat_id": 77,
        "notifications": [
            {
                "id": 1500,
                "chat_id": 77,
                "author_id": 1,
                "date": "2026-03-03T09:00:00+00:00",
                "notify_type": 2,
                "notify_module": "rest",
                "notify_event": "rest_notify",
                "notify_tag": "MP|12345|TASK_42",
                "notify_sub_tag": "MP|12345|TASK|42",
                "notify_title": "",
                "setting_name": "rest|rest_notify",
                "text": "Напоминание",
                "notify_read": "N",
                "params": null
            }
        ],
        "users": [
            {
                "id": 1,
                "active":true,
                "name": "Иван Петров",
                "first_name":"Иван",
                "last_name":"Петров",
                "work_position":"",
                "color":"#1eb4aa",
                "avatar":"https://example.bitrix24.ru/upload/main/avatar.png",
                "avatar_hr":"https://example.bitrix24.ru/upload/main/avatar.png",
                "gender":"M",
                "birthday":"15-05",
                "extranet":false,
                "network":false,
                "bot":false,
                "connector":false,
                "external_auth_id":"socservices",
                "status":"online",
                "idle":false,
                "last_activity_date":"2026-03-03T15:04:20+03:00",
                "mobile_last_date":false,
                "desktop_last_date":false,
                "absent":false,
                "departments":[1],
                "phones":{
                    "work_phone":"+71234567890",
                    "inner_phone":"22"
                },
                "bot_data":null,
                "type":"user",
                "website":"example.ru",
                "email":"ivan@example.ru"
            }
        ]
    },
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.1,
        "duration": 0.1,
        "processing": 0.04,
        "date_start": "2026-03-03T10:00:00+03:00",
        "date_finish": "2026-03-03T10:00:00+03:00",
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
[`object`](../../data-types.md) | Объект с данными уведомлений. 

Структура объекта подробно описана [ниже](#result-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **total_count**
[`integer`](../../data-types.md) | Общее количество уведомлений ||
|| **total_unread_count**
[`integer`](../../data-types.md) | Количество непрочитанных уведомлений ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений ||
|| **notifications**
[`array`](../../data-types.md) | Список уведомлений. 

Структура объекта подробно описана [ниже](#notification-object) ||
|| **users**
[`array`](../../data-types.md) | Массив объектов с данными авторов уведомлений.

Структура объекта подробно описана [ниже](#users-object) ||
|#

Если у пользователя нет системного чата уведомлений или в нем нет сообщений, метод возвращает только поля `notifications` и `users`.

#### Объект notification {#notification-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор уведомления ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора уведомления ||
|| **date**
[`string`](../../data-types.md) | Дата и время уведомления в формате ISO 8601 (RFC3339) ||
|| **notify_type**
[`integer`](../../data-types.md) | Тип уведомления ||
|| **notify_module**
[`string`](../../data-types.md) | Идентификатор модуля уведомления ||
|| **notify_event**
[`string`](../../data-types.md) | Код события уведомления ||
|| **notify_tag**
[`string`](../../data-types.md) | Тег уведомления ||
|| **notify_sub_tag**
[`string`](../../data-types.md) | Дополнительный тег уведомления ||
|| **notify_title**
[`string`](../../data-types.md) | Заголовок уведомления ||
|| **setting_name**
[`string`](../../data-types.md) | Код настройки в формате ```MODULE|EVENT``` ||
|| **text**
[`string`](../../data-types.md) | Текст уведомления ||
|| **notify_read**
[`string`](../../data-types.md) | Статус прочтения уведомления: `Y` или `N` ||
|| **notify_buttons**
[`string`](../../data-types.md) | JSON клавиатуры для уведомлений типа подтверждения. Поле присутствует не всегда ||
|| **params**
[`object`](../../data-types.md) 
[`null`](../../data-types.md) | Дополнительные параметры уведомления ||
|#

#### Объект users {#users-object}

{% include [Таблицы объекта пользователя](../_includes/user-object-tables.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LAST_ID_AND_LAST_TYPE",
    "error_description": "Parameters LAST_ID and LAST_TYPE should be used together."
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `LAST_ID_AND_LAST_TYPE` | Parameters LAST_ID and LAST_TYPE should be used together | Передан только один параметр из пары `LAST_ID` и `LAST_TYPE` ||
|| `LAST_ID_STRING` | Last notification ID can't be string | Параметр `LAST_ID` содержит нечисловое значение ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)
