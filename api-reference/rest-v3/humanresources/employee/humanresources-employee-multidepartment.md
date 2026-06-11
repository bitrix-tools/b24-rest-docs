# Получить сотрудников в нескольких отделах humanresources.employee.multidepartment

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь, привязанный к отделу в структуре компании

Метод `humanresources.employee.multidepartment` возвращает сотрудников, которые состоят в нескольких отделах.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/humanresources.employee.multidepartment`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.employee.multidepartment
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.employee.multidepartment
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.employee.multidepartment',
            {}
        );

        const result = response.getData().result;
        console.log(result.employees);
    }
    catch (error)
    {
        console.error('Error:', error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.employee.multidepartment',
                []
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.employee.multidepartment',
        {},
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.employee.multidepartment',
        []
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
    "result": {
        "employees": [
            {
                "userId": 7,
                "name": "Иван Петров",
                "workPosition": "",
                "departments": [
                    {
                        "id": 15,
                        "name": "Отдел продаж"
                    },
                    {
                        "id": 22,
                        "name": "Отдел развития"
                    }
                ]
            },
            {
                "userId": 11,
                "name": "Мария Иванова",
                "workPosition": "Руководитель отдела",
                "departments": [
                    {
                        "id": 22,
                        "name": "Отдел развития"
                    },
                    {
                        "id": 31,
                        "name": "Проектный офис"
                    }
                ]
            }
        ],
        "total": 2
    },
    "time": {
        "start": 1780407700,
        "finish": 1780407700.166208,
        "duration": 0.16620802879333496,
        "processing": 0.12675189971923828,
        "date_start": "2026-06-02T16:41:40+03:00",
        "date_finish": "2026-06-02T16:41:40+03:00",
        "operating_reset_at": 1780408300,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **employees**
[`array`](../../../data-types.md) | Массив сотрудников, которые состоят в нескольких отделах ||
|| **employees[].userId**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **employees[].name**
[`string`](../../../data-types.md) | Имя сотрудника ||
|| **employees[].workPosition**
[`string`](../../../data-types.md) | Должность сотрудника ||
|| **employees[].departments[]**
[`array`](../../../data-types.md) | Массив отделов сотрудника ||
|| **employees[].departments[].id**
[`integer`](../../../data-types.md) | Идентификатор отдела ||
|| **employees[].departments[].name**
[`string`](../../../data-types.md) | Название отдела ||
|| **total**
[`integer`](../../../data-types.md) | Количество найденных сотрудников ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что текущий пользователь является сотрудником Битрикс24 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-employee-search.md)
- [{#T}](./humanresources-employee-count.md)
- [{#T}](./index.md)
