# Получить список полей журнала событий main.eventlog.field.list

> Scope: [`main`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `main.eventlog.field.list` возвращает список доступных полей записи журнала событий.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей описания, которые нужно вернуть в ответе.

Доступные поля:
- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — группы обязательности
- `filterable` — признак доступности в фильтре
- `sortable` — признак доступности в сортировке
- `editable` — признак редактируемости
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/main.eventlog.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","filterable","sortable","multiple"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/main.eventlog.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","filterable","sortable","multiple"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/main.eventlog.field.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'main.eventlog.field.list',
            {
                select: [
                    'name',
                    'type',
                    'title',
                    'description',
                    'filterable',
                    'sortable',
                    'multiple'
                ]
            }
        );

        const result = response.getData().result;
        console.log('Event log fields:', result);
    }
    catch( error )
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
                'main.eventlog.field.list',
                [
                    'select' => [
                        'name',
                        'type',
                        'title',
                        'description',
                        'filterable',
                        'sortable',
                        'multiple'
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
        'main.eventlog.field.list',
        {
            select: [
                'name',
                'type',
                'title',
                'description',
                'filterable',
                'sortable',
                'multiple'
            ]
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
        'main.eventlog.field.list',
        [
            'select' => [
                'name',
                'type',
                'title',
                'description',
                'filterable',
                'sortable',
                'multiple'
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
                "name": "id",
                "type": "int",
                "title": "id",
                "description": null,
                "filterable": true,
                "sortable": true,
                "multiple": false
            },
            {
                "name": "timestampX",
                "type": "object",
                "title": "timestampX",
                "description": null,
                "filterable": true,
                "sortable": true,
                "multiple": false
            },
            {
                "name": "severity",
                "type": "string",
                "title": "severity",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "auditTypeId",
                "type": "string",
                "title": "auditTypeId",
                "description": null,
                "filterable": true,
                "sortable": true,
                "multiple": false
            },
            {
                "name": "moduleId",
                "type": "string",
                "title": "moduleId",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "itemId",
                "type": "string",
                "title": "itemId",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "remoteAddr",
                "type": "string",
                "title": "remoteAddr",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "userAgent",
                "type": "string",
                "title": "userAgent",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "requestUri",
                "type": "string",
                "title": "requestUri",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "siteId",
                "type": "string",
                "title": "siteId",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "userId",
                "type": "int",
                "title": "userId",
                "description": null,
                "filterable": true,
                "sortable": true,
                "multiple": false
            },
            {
                "name": "guestId",
                "type": "int",
                "title": "guestId",
                "description": null,
                "filterable": true,
                "sortable": true,
                "multiple": false
            },
            {
                "name": "description",
                "type": "string",
                "title": "description",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            }
        ]
    },
    "time": {
        "start": 1769780464,
        "finish": 1769780464.122003,
        "duration": 0.1220030784606934,
        "processing": 0,
        "date_start": "2026-01-30T16:41:04+03:00",
        "date_finish": "2026-01-30T16:41:04+03:00",
        "operating_reset_at": 1769781064,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../data-types.md) | Массив объектов с описанием полей. Структура ответа зависит от `select`  ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION",
        "message": "Неизвестное поле `unknownField` для сущности `DtoFieldDto`"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав администратора или не хватает scope main ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте только поля из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `multiple`, `elementType` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["name","type"]` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./main-eventlog-field-get.md)
- [{#T}](./main-eventlog-list.md)
- [{#T}](./index.md)

