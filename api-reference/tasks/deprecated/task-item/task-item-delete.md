# Удалить задачу task.item.delete

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет задачу.

{% note warning %}

Метод устарел и не поддерживается. Рекомендуется использовать методы [tasks.task.*](../../index.md).

{% endnote %}

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **TASKID** | Идентификатор задачи ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.item.delete
    ```

- JS

    ```js
    BX24.callMethod(
        'task.item.delete',
        [13],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.delete',
        [
            'TASKID' => 13
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
