# Получить список полей отдела humanresources.node.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `humanresources.node.field.list` возвращает список доступных полей отдела.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть в ответе.

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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","filterable","sortable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","filterable","sortable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.field.list
    ```

- JS

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```javascript
    try
    {
        const response = await $b24.callMethod(
            'humanresources.node.field.list',
            {
                select: [
                    'name',
                    'type',
                    'title',
                    'filterable',
                    'sortable'
                ]
            }
        );

        const result = response.getData().result;
        console.log('Field list:', result);
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
                'humanresources.node.field.list',
                [
                    'select' => [
                        'name',
                        'type',
                        'title',
                        'filterable',
                        'sortable'
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
        'humanresources.node.field.list',
        {
            select: [
                'name',
                'type',
                'title',
                'filterable',
                'sortable'
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
        'humanresources.node.field.list',
        [
            'select' => [
                'name',
                'type',
                'title',
                'filterable',
                'sortable'
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
                "filterable": true,
                "sortable": true
            },
            {
                "name": "name",
                "type": "string",
                "title": "name",
                "filterable": false,
                "sortable": true
            },
            {
                "name": "type",
                "type": "string",
                "title": "type",
                "filterable": true,
                "sortable": false
            },
            {
                "name": "structureId",
                "type": "int",
                "title": "structureId",
                "filterable": true,
                "sortable": false
            },
            {
                "name": "parentId",
                "type": "int",
                "title": "parentId",
                "filterable": true,
                "sortable": false
            },
            {
                "name": "description",
                "type": "string",
                "title": "description",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "accessCode",
                "type": "string",
                "title": "accessCode",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "userCount",
                "type": "int",
                "title": "userCount",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "colorName",
                "type": "string",
                "title": "colorName",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "xmlId",
                "type": "string",
                "title": "xmlId",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "createdAt",
                "type": "string",
                "title": "createdAt",
                "filterable": false,
                "sortable": true
            },
            {
                "name": "updatedAt",
                "type": "string",
                "title": "updatedAt",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "members",
                "type": "array",
                "title": "members",
                "filterable": false,
                "sortable": false
            }
        ]
    },
    "time": {
        "start": 1780402300,
        "finish": 1780402300.162847,
        "duration": 0.16284704208374023,
        "processing": 0,
        "date_start": "2026-06-02T15:11:40+03:00",
        "date_finish": "2026-06-02T15:11:40+03:00",
        "operating_reset_at": 1780402900,
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
[`array`](../../../data-types.md) | Массив объектов с описанием полей. Структура ответа зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
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

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-field-get.md)
- [{#T}](./index.md)
