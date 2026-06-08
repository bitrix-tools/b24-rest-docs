# Получить список отделов humanresources.node.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр отделов» или «Просмотр команд»

Метод `humanresources.node.list` возвращает список отделов или команд.

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
|| **select**
[`array`](../../../data-types.md) | Список полей отдела или команды, которые нужно вернуть.

Доступные поля:

- `id` — идентификатор элемента структуры
- `name` — название отдела или команды
- `type` — тип элемента структуры
- `structureId` — идентификатор структуры компании
- `parentId` — идентификатор родительского отдела или команды
- `description` — описание элемента структуры
- `accessCode` — код доступа элемента структуры
- `userCount` — количество пользователей в отделе или команде
- `colorName` — цвет команды
- `xmlId` — внешний идентификатор элемента структуры
- `createdAt` — дата и время создания
- `updatedAt` — дата и время последнего обновления ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации:
- `page` — номер страницы
- `limit` — количество записей на страницу, по умолчанию `50`, максимум `200`
- `offset` — смещение записей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","select":["id","name","type","structureId","parentId","description","accessCode","userCount","colorName","xmlId","createdAt","updatedAt"],"pagination":{"page":1,"limit":20,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"DEPARTMENT","select":["id","name","type","structureId","parentId","description","accessCode","userCount","colorName","xmlId","createdAt","updatedAt"],"pagination":{"page":1,"limit":20,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.list',
            {
                type: 'DEPARTMENT',
                select: [
                    'id',
                    'name',
                    'type',
                    'structureId',
                    'parentId',
                    'description',
                    'accessCode',
                    'userCount',
                    'colorName',
                    'xmlId',
                    'createdAt',
                    'updatedAt'
                ],
                pagination: {
                    page: 1,
                    limit: 20,
                    offset: 0
                }
            }
        );

        const result = response.getData().result;
        console.log('Node list:', result);
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
                'humanresources.node.list',
                [
                    'type' => 'DEPARTMENT',
                    'select' => [
                        'id',
                        'name',
                        'type',
                        'structureId',
                        'parentId',
                        'description',
                        'accessCode',
                        'userCount',
                        'colorName',
                        'xmlId',
                        'createdAt',
                        'updatedAt'
                    ],
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
                        'offset' => 0
                    ]
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
        'humanresources.node.list',
        {
            type: 'DEPARTMENT',
            select: [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt'
            ],
            pagination: {
                page: 1,
                limit: 20,
                offset: 0
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
        'humanresources.node.list',
        [
            'type' => 'DEPARTMENT',
            'select' => [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt'
            ],
            'pagination' => [
                'page' => 1,
                'limit' => 20,
                'offset' => 0
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
                    "id": 1,
                    "name": "Отдел продаж",
                    "type": "DEPARTMENT",
                    "structureId": 1,
                    "parentId": null,
                    "description": "Основной отдел продаж",
                    "accessCode": "DR1",
                    "userCount": 18,
                    "colorName": null,
                    "xmlId": null,
                    "createdAt": "2026-05-20T10:15:00+03:00",
                    "updatedAt": "2026-06-02T10:30:00+03:00"
                },
                {
                    "id": 2,
                    "name": "Отдел маркетинга",
                    "type": "DEPARTMENT",
                    "structureId": 1,
                    "parentId": 1,
                    "description": "Отдел отвечает за продвижение продуктов компании",
                    "accessCode": "DR2",
                    "userCount": 9,
                    "colorName": null,
                    "xmlId": "marketing_department",
                    "createdAt": "2026-05-22T09:00:00+03:00",
                    "updatedAt": "2026-06-02T11:45:00+03:00"
                }
            ]
        },
    "time": {
        "start": 1780403500,
        "finish": 1780403500.248911,
        "duration": 0.24891114234924316,
        "processing": 0.21900415420532227,
        "date_start": "2026-06-02T15:31:40+03:00",
        "date_finish": "2026-06-02T15:31:40+03:00",
        "operating_reset_at": 1780404100,
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
[`array`](../../../data-types.md) | Массив объектов отделов или команд. Состав полей элемента зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":\"abc\"}`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `limit`
`offset`
`page` | Не удается распознать параметр пагинации `#PAGE#` | Передайте числовые значения. `limit` не должен быть равен `0` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `type` | Обязательное поле `type` не указано | Передайте `type` со значением `DEPARTMENT` или `TEAM` ||
|| `type` | Передано недопустимое значение типа элемента структуры | Используйте `DEPARTMENT` для отдела или `TEAM` для команды ||
|#

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `NodeDto` | Передайте только поля из списка `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["id","name"]` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права просматривать отделы и команды  ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-get.md)
- [{#T}](./humanresources-node-search.md)
- [{#T}](./index.md)
