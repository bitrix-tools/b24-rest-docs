# Обновить отдел humanresources.node.edit

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование отделов» или «Редактирование команд»

Метод `humanresources.node.edit` обновляет свойства отдела или команды.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](./humanresources-node-list.md) ||
|| **name**
[`string`](../../../data-types.md) | Новое название отдела или команды ||
|| **description**
[`string`](../../../data-types.md) | Новое описание отдела или команды ||
|| **colorName**
[`string`](../../../data-types.md) | Новый цвет команды.

Возможные значения:

- `blue` — синий
- `green` — зеленый
- `cyan` — голубой
- `orange` — оранжевый
- `purple` — фиолетовый
- `pink` — розовый ||
|#

{% note info "" %}

Передайте хотя бы одно поле для изменения: `name`, `description` или `colorName`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.edit`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":44,"name":"Отдел продаж B2B","description":"Работает с корпоративными клиентами"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.edit
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":44,"name":"Отдел продаж B2B","description":"Работает с корпоративными клиентами","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.edit
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.edit',
            {
                id: 44,
                name: 'Отдел продаж B2B',
                description: 'Работает с корпоративными клиентами'
            }
        );

        const result = response.getData().result;
        console.info('Department updated with ID', result.id);
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
                'humanresources.node.edit',
                [
                    'id' => 44,
                    'name' => 'Отдел продаж B2B',
                    'description' => 'Работает с корпоративными клиентами',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating department: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.edit',
        {
            id: 44,
            name: 'Отдел продаж B2B',
            description: 'Работает с корпоративными клиентами'
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
        'humanresources.node.edit',
        [
            'id' => 44,
            'name' => 'Отдел продаж B2B',
            'description' => 'Работает с корпоративными клиентами'
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
        "id": 44,
        "name": "Отдел продаж B2B",
        "type": "DEPARTMENT",
        "structureId": 1,
        "parentId": 1,
        "description": "Работает с корпоративными клиентами",
        "accessCode": "DR44",
        "userCount": 18,
        "colorName": null,
        "xmlId": null,
        "createdAt": "2026-05-30T09:20:15+03:00",
        "updatedAt": "2026-06-02T12:40:18+03:00"
    },
    "time": {
        "start": 1780393218,
        "finish": 1780393218.504217,
        "duration": 0.5042169094085693,
        "processing": 0.47100210189819336,
        "date_start": "2026-06-02T12:40:18+03:00",
        "date_finish": "2026-06-02T12:40:18+03:00",
        "operating_reset_at": 1780393818,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными обновленного отдела или команды ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор отдела или команды ||
|| **name**
[`string`](../../../data-types.md) | Название отдела или команды ||
|| **type**
[`string`](../../../data-types.md) | Тип элемента структуры ||
|| **structureId**
[`integer`](../../../data-types.md) | Идентификатор структуры компании ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского отдела или команды ||
|| **description**
[`string`](../../../data-types.md) | Описание отдела или команды ||
|| **accessCode**
[`string`](../../../data-types.md) | Код доступа отдела или команды ||
|| **userCount**
[`integer`](../../../data-types.md) | Количество пользователей в отделе или команде ||
|| **colorName**
[`string`](../../../data-types.md) | Цвет команды, если он задан ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор отдела или команды ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания отдела или команды ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего обновления отдела или команды ||
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
                "message": "At least one of the following fields must be provided: name, description, colorName.",
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
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Убедитесь, что значение `id` передано числом ||
|| `name`
`description`
`colorName` | Нужно передать хотя бы одно поле для изменения | Передайте `name`, `description` или `colorName` ||
|| `colorName` | Передано недопустимое значение цвета | Используйте одно из допустимых значений из описания параметра `colorName` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права редактировать указанный отдел или команду ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-get.md)
- [{#T}](./humanresources-node-move.md)
- [{#T}](./humanresources-node-add.md)
- [{#T}](./index.md)
