# Получить коммуникации отдела humanresources.node.communication.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр отделов» или «Просмотр команд»

Метод `humanresources.node.communication.list` возвращает чаты, каналы и коллабы, связанные с отделом или командой.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](../node/humanresources-node-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/humanresources.node.communication.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.communication.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.communication.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.communication.list',
            {
                id: 15
            }
        );

        const result = response.getData().result;
        console.log(result);
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
                'humanresources.node.communication.list',
                [
                    'id' => 15,
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.communication.list',
        {
            id: 15
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
        'humanresources.node.communication.list',
        [
            'id' => 15,
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
        "channels": [
            {
                "avatar": "",
                "color": "#8474c8",
                "dialogId": "chat21",
                "hasAccess": true,
                "id": 21,
                "isExtranet": false,
                "originalNodeId": null,
                "subtitle": "Закрытый канал",
                "title": "Канал отдела",
                "type": "CHANNEL"
            }
        ],
        "channelsNoAccess": 0,
        "chats": [
            {
                "avatar": "",
                "color": "#1eb4aa",
                "dialogId": "chat22",
                "hasAccess": true,
                "id": 22,
                "isExtranet": false,
                "originalNodeId": null,
                "subtitle": "Закрытый чат",
                "title": "Чат отдела",
                "type": "CHAT"
            }
        ],
        "chatsNoAccess": 0,
        "collabs": [
            {
                "avatar": null,
                "dialogId": "chat23",
                "hasAccess": true,
                "id": 23,
                "originalNodeId": null,
                "subtitle": "Коллаба",
                "title": "Коллаба отдела",
                "type": "COLLAB"
            }
        ],
        "collabsNoAccess": 0
    },
    "time": {
        "start": 1780407000,
        "finish": 1780407000.104211,
        "duration": 0.10421109199523926,
        "processing": 0.08111310005187988,
        "date_start": "2026-06-02T16:30:00+03:00",
        "date_finish": "2026-06-02T16:30:00+03:00",
        "operating_reset_at": 1780407600,
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
|| **chats[]**
[`array`](../../../data-types.md) | Массив чатов, связанных с отделом или командой. [Описание полей коммуникации](#communication) ||
|| **chatsNoAccess**
[`integer`](../../../data-types.md) | Количество связанных чатов, недоступных текущему пользователю ||
|| **channels[]**
[`array`](../../../data-types.md) | Массив каналов, связанных с отделом или командой. [Описание полей коммуникации](#communication) ||
|| **channelsNoAccess**
[`integer`](../../../data-types.md) | Количество связанных каналов, недоступных текущему пользователю ||
|| **collabs[]**
[`array`](../../../data-types.md) | Массив коллабов, связанных с отделом или командой. [Описание полей коммуникации](#communication) ||
|| **collabsNoAccess**
[`integer`](../../../data-types.md) | Количество связанных коллабов, недоступных текущему пользователю ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля коммуникации {#communication}

#|
|| **Название**
`тип` | **Описание** ||
|| **avatar**
[`string`](../../../data-types.md) | Ссылка на аватар коммуникации ||
|| **color**
[`string`](../../../data-types.md) | Цвет коммуникации. Поле возвращается для чатов и каналов ||
|| **dialogId**
[`string`](../../../data-types.md) | Идентификатор диалога ||
|| **hasAccess**
[`boolean`](../../../data-types.md) | Признак доступа текущего пользователя к коммуникации ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор коммуникации ||
|| **isExtranet**
[`boolean`](../../../data-types.md) | Признак экстранет-коммуникации. Поле возвращается для чатов и каналов ||
|| **originalNodeId**
[`integer`](../../../data-types.md) | Идентификатор исходного отдела или команды ||
|| **subtitle**
[`string`](../../../data-types.md) | Подзаголовок коммуникации ||
|| **title**
[`string`](../../../data-types.md) | Название коммуникации ||
|| **type**
[`string`](../../../data-types.md) | Тип коммуникации.

Возможные значения:

- `CHAT` — чат
- `CHANNEL` — канал
- `COLLAB` — коллаб ||
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
                "message": "Обязательное поле `id` не указано",
                "field": "id"
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
|| `id` | Обязательное поле `id` не указано | Передайте идентификатор отдела или команды ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Объект с идентификатором `#ID#` не найден | Укажите существующий идентификатор отдела или команды ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте право просмотра отдела или команды ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-communication-edit.md)
- [{#T}](./index.md)
