# Как выполнить пакет запросов batch 3.0

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../api-reference/rest-v3.md).

{% endnote %}

Метод `batch` в REST 3.0 выполняет несколько запросов за одно обращение к API. Результат предыдущего подзапроса можно передать в параметры следующего.

Адрес метода:

```http
POST https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/batch
```

Тело запроса передавайте в формате JSON — массивом объектов подзапросов.

## Когда использовать batch

Метод подходит для двух сценариев:

- выполнить несколько независимых методов одним обращением к серверу
- передать результат одного подзапроса в параметры следующего

## Параметры метода

Метод принимает в теле запроса JSON-массив подзапросов. Каждый элемент массива — объект с описанием одного вызова.

### Элемент массива подзапросов

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **method***
[`string`](../../api-reference/data-types.md) | Имя вызываемого метода ||
|| **query***
[`object`](../../api-reference/data-types.md) | Параметры вызываемого метода. Если у метода нет параметров, передайте пустой объект `{}` ||
|| **as**
[`string`](../../api-reference/data-types.md) | Уникальное имя результата подзапроса. По этому имени к результату можно обратиться в следующих подзапросах.

Если `as` не указан, к результату обращаются по индексу подзапроса. Индексация начинается с нуля.

Если двум подзапросам назначить одинаковое имя, batch вернет ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION` ||
|#

### Передача одного значения

Чтобы передать значение из результата предыдущего подзапроса, используйте объект с ключом `$ref`:

```json
{"$ref": "first_task.id"}
```

Путь состоит из идентификатора подзапроса и пути к полю через точку. Идентификатором может быть значение `as` или индекс подзапроса, например `1.id`.

### Передача массива значений

Чтобы собрать значения одного поля из всех элементов результата, используйте `$refArray`:

```json
{"$refArray": "tasks_list.id"}
```

В примере API берет результат подзапроса `tasks_list`, извлекает поле `id` из каждого элемента и передает полученный массив в следующий запрос.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/batch`

{% endnote %}

Для вызова batch 3.0 отправьте прямой HTTP-запрос.

### Независимые вызовы

Если результаты подзапросов не связаны, передайте их в одном массиве без ссылок `$ref` и `$refArray`:

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '[
        {"method":"tasks.task.get","query":{"id":101,"select":["id","title"]}},
        {"method":"tasks.task.get","query":{"id":102,"select":["id","title"]}}
    ]' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/batch
    ```

{% endlist %}

Каждый результат в ответе соответствует подзапросу с тем же индексом.

### Последовательное выполнение

Подзапросы выполняются в следующем порядке:

1. [tasks.task.get](../../api-reference/tasks/tasks-task-get-rest-v3.md) получает задачу и сохраняет результат под именем `first_task`
2. Второй вызов `tasks.task.get` получает другую задачу. У подзапроса нет имени, поэтому к его результату обращаются по индексу `1`
3. [tasks.task.update](../../api-reference/tasks/tasks-task-update-rest-v3.md) получает идентификатор задачи из `first_task` через `$ref` и изменяет ее название
4. [tasks.task.list](../../api-reference/tasks/tasks-task-list-rest-v3.md) получает задачи по идентификаторам и сохраняет список под именем `tasks_list`
5. Второй вызов `tasks.task.list` получает через `$refArray` все идентификаторы из `tasks_list`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '[
        {"method":"tasks.task.get","query":{"id":101,"select":["id","title"]},"as":"first_task"},
        {"method":"tasks.task.get","query":{"id":102,"select":["id","title"]}},
        {"method":"tasks.task.update","query":{"id":{"$ref":"first_task.id"},"fields":{"title":"Обновленная задача"}}},
        {"method":"tasks.task.list","query":{"select":["id","title"],"filter":["id",[101,{"$ref":"first_task.id"},{"$ref":"1.id"}]]},"as":"tasks_list"},
        {"method":"tasks.task.list","query":{"select":["id","title"],"filter":["id",{"$refArray":"tasks_list.id"}]}}
    ]' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/batch
    ```

{% endlist %}

{% note warning "" %}

Формат с объектом `cmd` и строками вида `method?param=value` не поддерживается в REST 3.0. Передавайте подзапросы в виде JSON-массива объектов.

{% endnote %}

## Обработка ответа

HTTP-статус успешного ответа — **200**.

```json
{
    "result": [
        {
            "item": {
                "id": 101,
                "title": "Первая задача"
            }
        },
        {
            "item": {
                "id": 102,
                "title": "Вторая задача"
            }
        },
        {
            "result": true
        },
        {
            "items": [
                {
                    "id": 101,
                    "title": "Обновленная задача"
                },
                {
                    "id": 102,
                    "title": "Вторая задача"
                }
            ]
        },
        {
            "items": [
                {
                    "id": 101,
                    "title": "Обновленная задача"
                },
                {
                    "id": 102,
                    "title": "Вторая задача"
                }
            ]
        }
    ],
    "time": {
        "start": 1750096028,
        "finish": 1750096028.292702,
        "duration": 0.29270195960998535,
        "processing": 0,
        "date_start": "2025-06-16T17:47:08+00:00",
        "date_finish": "2025-06-16T17:47:08+00:00"
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../api-reference/data-types.md) | Массив результатов подзапросов в порядке их выполнения ||
|| **result[n]**
[`object`](../../api-reference/data-types.md) | Результат подзапроса с индексом `n`. Индексация начинается с нуля.

Данные метода находятся в `item`, `items` или `result` — в зависимости от вызываемого метода ||
|| **result[].item**
[`object`](../../api-reference/data-types.md) | Результат метода, который возвращает один объект ||
|| **result[].items**
[`array`](../../api-reference/data-types.md) | Результат метода, который возвращает список объектов ||
|| **result[].result**
[`boolean`](../../api-reference/data-types.md) | Результат операции, если метод возвращает признак успешного выполнения ||
|| **time**
[`time`](../../api-reference/data-types.md#time) | Информация о времени выполнения пакета ||
|#

## Обработка ошибок

Если ошибка относится к самому batch-запросу или вложенному вызову, batch возвращает объект `error` на верхнем уровне и не возвращает массив успешных результатов. Проверяйте HTTP-статус и код ошибки. Общий формат ошибок описан в [обзоре REST 3.0](../../api-reference/rest-v3.md#response).

Пример ошибки при обращении к несуществующему пути в `$ref`:

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION",
        "message": "Не удается распознать выражение select `Path 'first_task.item.id' not found in context`"
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#|
|| **Код** | **HTTP-статус** | **Причина** | **Что проверить** ||
|| `BITRIX_REST_V3_EXCEPTION_INVALIDJSONEXCEPTION` | 400 | Тело запроса не является корректным JSON | Проверьте скобки, кавычки и Content-Type `application/json` ||
|| `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION` | 400 | Параметры вложенного метода не прошли валидацию | Проверьте `query` и требования страницы вложенного метода ||
|| `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION` | 400 | Не удалось разобрать ссылку `$ref`, выражение `select` или в `as` повторяется имя другого подзапроса | Проверьте имя подзапроса, путь к полю и уникальность `as` ||
|| `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION` | 400 | Вложенный метод не нашел объект с переданным идентификатором | Проверьте идентификатор объекта ||
|| `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION` | 403 | У пользователя нет доступа к объекту | Проверьте права пользователя ||
|| `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION` | 403 | У вебхука или приложения нет нужного скоупа | Добавьте скоуп вложенного метода ||
|| `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION` | 400 | В пакете указан метод, которого нет в API | Проверьте имя вложенного метода и его версию ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Ограничения

- Подзапросы выполняются только последовательно
- Вложенный вызов `batch` не поддерживается

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./batch.md)
- [{#T}](../../api-reference/rest-v3.md)
- [{#T}](../../api-reference/tasks/tasks-task-get-rest-v3.md)
- [{#T}](../../api-reference/tasks/tasks-task-update-rest-v3.md)
- [{#T}](../../api-reference/tasks/tasks-task-list-rest-v3.md)
