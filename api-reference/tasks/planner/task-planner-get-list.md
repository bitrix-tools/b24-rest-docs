# Получить список задач из плана на день task.planner.getlist

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.planner.getlist` получает список идентификаторов задач из «Плана на день» текущего пользователя. Чтобы получить подробную информацию о задачах используйте метод [tasks.task.get](../tasks-task-get.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.planner.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.planner.getlist
    ```

- JS

    ```javascript
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.

    try {
        const response = await $b24.callListMethod(
        "task.planner.getlist",
        {},
        (progress) => {
            console.log("Progress:", progress);
        }
        );
        const items = response.getData() || [];
        for (const entity of items) {
        console.log("Entity:", entity);
        }
    } catch (error) {
        console.error("Request failed", error);
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.

    try {
        const generator = $b24.fetchListMethod("task.planner.getlist", {}, "ID");
        for await (const page of generator) {
        for (const entity of page) {
            console.log("Entity:", entity);
        }
        }
    } catch (error) {
        console.error("Request failed", error);
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.

    try {
        const response = await $b24.callMethod("task.planner.getlist", {}, 0);
        const result = response.getData().result || [];
        for (const entity of result) {
        console.log("Entity:", entity);
        }
    } catch (error) {
        console.error("Request failed", error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.planner.getlist',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task planner list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "task.planner.getlist",
        [],
        function (result) {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.planner.getlist',
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
    "result": [7811, 8017, 7789, 8015],
    "time": {
        "start": 1755252195.609436,
        "finish": 1755252195.636649,
        "duration": 0.027212858200073242,
        "processing": 0.0030121803283691406,
        "date_start": "2025-08-15T13:03:15+03:00",
        "date_finish": "2025-08-15T13:03:15+03:00",
        "operating_reset_at": 1755252795,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список идентификаторов задач.

Если в плане на день нет задач, возвращает пустой массив ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
