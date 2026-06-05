# Найти отделы humanresources.node.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр отделов» или «Просмотр команд»

Метод `humanresources.node.search` ищет отделы или команды по названию.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../../data-types.md) | Тип элемента структуры.

Возможные значения:

- `DEPARTMENT` — отдел
- `TEAM` — команда ||
|| **name***
[`string`](../../../data-types.md) | Строка поиска по части названия отдела или команды ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского отдела для ограничения поиска.

Идентификатор можно получить методом [humanresources.node.list](./humanresources-node-list.md) ||
|| **pagination**
[`object`](../../../data-types.md) | Параметр постраничной навигации.

Для метода используется `limit` — количество записей на страницу. По умолчанию `50`, максимум `200` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.search`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","name":"Продажи","parentId":1,"pagination":{"limit":20}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","name":"Продажи","parentId":1,"pagination":{"limit":20},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.search
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.search',
            {
                type: 'DEPARTMENT',
                name: 'Продажи',
                parentId: 1,
                pagination: {
                    limit: 20
                }
            }
        );

        const result = response.getData().result;
        console.info('Found departments', result.length);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.search',
                [
                    'type' => 'DEPARTMENT',
                    'name' => 'Продажи',
                    'parentId' => 1,
                    'pagination' => [
                        'limit' => 20,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching departments: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.search',
        {
            type: 'DEPARTMENT',
            name: 'Продажи',
            parentId: 1,
            pagination: {
                limit: 20
            }
        },
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
        'humanresources.node.search',
        [
            'type' => 'DEPARTMENT',
            'name' => 'Продажи',
            'parentId' => 1,
            'pagination' => [
                'limit' => 20
            ]
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
    "result": {
        "items": [
            {
                "id": 12,
                "name": "Продажи B2B",
                "type": "DEPARTMENT",
                "structureId": 1,
                "parentId": 1,
                "description": "Работа с корпоративными клиентами",
                "accessCode": "DR12",
                "userCount": 9,
                "colorName": null,
                "xmlId": null,
                "createdAt": "2026-05-20T10:15:00+03:00",
                "updatedAt": "2026-06-01T16:30:00+03:00"
            }
        ]
    },
    "time": {
        "start": 1780399800,
        "finish": 1780399800.314519,
        "duration": 0.31451892852783203,
        "processing": 0.2811400890350342,
        "date_start": "2026-06-02T14:30:00+03:00",
        "date_finish": "2026-06-02T14:30:00+03:00",
        "operating_reset_at": 1780400400,
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
|| **items**
[`array`](../../../data-types.md) | Массив найденных отделов и команд ||
|| **items[]**
[`object`](../../../data-types.md) | Объект найденного отдела или команды ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор отдела ||
|| **name**
[`string`](../../../data-types.md) | Название отдела ||
|| **type**
[`string`](../../../data-types.md) | Тип элемента структуры ||
|| **structureId**
[`integer`](../../../data-types.md) | Идентификатор структуры компании ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского отдела ||
|| **description**
[`string`](../../../data-types.md) | Описание отдела ||
|| **accessCode**
[`string`](../../../data-types.md) | Код доступа отдела ||
|| **userCount**
[`integer`](../../../data-types.md) | Количество пользователей в отделе ||
|| **colorName**
[`string`](../../../data-types.md) | Цвет команды, если он задан ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор отдела ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания отдела ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего обновления отдела ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `name` не указано",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `type`
`name` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `type` | Передано недопустимое значение типа отдела | Используйте `DEPARTMENT` для отдела или `TEAM` для команды ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права просматривать отделы и команды ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-list.md)
- [{#T}](./humanresources-node-children.md)
- [{#T}](./index.md)
