# Получить список полей задачи tasks.task.field.list

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.field.list` возвращает список доступных полей задачи.

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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","filterable","sortable","multiple"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","filterable","sortable","multiple"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.field.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'tasks.task.field.list',
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
        console.log('Field list:', result);
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
                'tasks.task.field.list',
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
        'tasks.task.field.list',
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
        'tasks.task.field.list',
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
                "name": "title",
                "type": "string",
                "title": "title",
                "description": null,
                "filterable": false,
                "sortable": false,
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
            },
            {
                "name": "creatorId",
                "type": "int",
                "title": "creatorId",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "creator",
                "type": "object",
                "title": "creator",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "created",
                "type": "object",
                "title": "created",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "responsibleId",
                "type": "int",
                "title": "responsibleId",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "responsible",
                "type": "object",
                "title": "responsible",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            // ...
            {
                "name": "inMute",
                "type": "array",
                "title": "inMute",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "source",
                "type": "object",
                "title": "source",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "dependsOn",
                "type": "array",
                "title": "dependsOn",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            },
            {
                "name": "scenarios",
                "type": "array",
                "title": "scenarios",
                "description": null,
                "filterable": false,
                "sortable": false,
                "multiple": false
            }
        ]
    },
    "time": {
        "start": 1773648753,
        "finish": 1773648753.478823,
        "duration": 0.4788229465484619,
        "processing": 0,
        "date_start": "2026-03-16T11:12:33+03:00",
        "date_finish": "2026-03-16T11:12:33+03:00",
        "operating_reset_at": 1773649353,
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
[`array`](../../data-types.md) | Массив объектов с описанием полей. Структура ответа зависит от `select` ||
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
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `task` ||
|#

#### Ошибки в параметре `select`

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

- [{#T}](./tasks-task-field-get.md)
- [{#T}](./tasks-task-get.md)
- [{#T}](./index.md)



