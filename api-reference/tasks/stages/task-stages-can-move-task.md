# Проверить возможность перемещения задачи task.stages.canmovetask

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.stages.canmovetask` определяет, может ли текущий пользователь перемещать задачи в указанной сущности.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **entityId^*^**
[`integer`](../../data-types.md) | ID сущности. ||
|| **entityType^*^**
[`string`](../../data-types.md) | Тип сущности (`U` — пользователь или `G` — группа). В случае `U` (Мой план), `true` вернется только в одном случае - если в `entityId` передается идентификатор текущего пользователя. ||
|#

## Примеры

{% list tabs %}

- JS
    ```js
    const entityId = 1;
    const entityType = 'U';
    BX24.callMethod(
        'task.stages.canmovetask',
        {
            entityId: entityId,
            entityType: entityType
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- cURL (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "entityId": 1,
    "entityType": "U"
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.canmovetask
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "entityId": 1,
    "entityType": "U"
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.canmovetask
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $entityId = 1;
    $entityType = 'U';

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.canmovetask',
        [
            'entityId' => $entityId,
            'entityType' => $entityType
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-Статус: **200**

```json
{
"result": true
}
```

## Обработка ошибок

Метод не возвращает ошибок.