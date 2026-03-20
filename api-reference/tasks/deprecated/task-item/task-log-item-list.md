# Просмотреть историю изменения задачи task.logitem.list

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает историю изменений задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название** | **Описание** ||
|| **ID*** | Идентификатор задачи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":1205}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.logitem.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":1205,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.logitem.list
    ```

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'task.logitem.list',
        [1205],
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
      const generator = $b24.fetchListMethod('task.logitem.list', [1205], 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.logitem.list', [1205], 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.logitem.list',
                [1205]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching task log items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.logitem.list',
        [1205],
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.logitem.list',
        ['taskId' => 1205]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
Array
(
    [result] => Array
        (
            [0] => Array
                (
                    [CREATED_DATE] => 2022-12-09T11:10:49+02:00
                    [USER_ID] => 1
                    [TASK_ID] => 1223
                    [FIELD] => NEW
                    [FROM_VALUE] =>
                    [TO_VALUE] =>
                )

            [1] => Array
                (
                    [CREATED_DATE] => 2022-12-09T11:11:29+02:00
                    [USER_ID] => 1
                    [TASK_ID] => 1223
                    [FIELD] => COMMENT
                    [FROM_VALUE] =>
                    [TO_VALUE] => 1247
                )

            [2] => Array
                (
                    [CREATED_DATE] => 2022-12-09T11:11:40+02:00
                    [USER_ID] => 1
                    [TASK_ID] => 1223
                    [FIELD] => TAGS
                    [FROM_VALUE] =>
                    [TO_VALUE] => это секретно
                )
        )

    [time] => Array
        (
            [start] => 1670577445.3012
            [finish] => 1670577447.9552
            [duration] => 2.6539649963379
            [processing] => 2.2574801445007
            [date_start] => 2022-12-09T11:17:25+02:00
            [date_finish] => 2022-12-09T11:17:27+02:00
            [operating] => 2.2573609352112
        )
)
```