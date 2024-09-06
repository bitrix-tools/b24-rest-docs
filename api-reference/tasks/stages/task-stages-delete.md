# Удалить стадию Канбана / Моего плана task.stages.delete

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

Метод `task.stages.delete` удаляет стадию Канбана / Моего плана. Принимает на вход `id` стадии.

Стадия проверяется на достаточный уровень прав, а также на то, что в ней нет задач.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id^*^**
[`integer`](../../data-types.md) | Идентификатор стадии, которую необходимо удалить. ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет, при условии, что запрашивающий является администратором портала. ||
|#

Возвращает `true` в случае успешного удаления стадии.

## Примеры

{% list tabs %}

- JS
    ```js
    const stageId = 5;
    BX24.callMethod(
        'task.stages.delete',
        {
            id: stageId,
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
    "id": 5
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.delete
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "id": 5
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.delete
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $stageId = 5;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.delete',
        [
            'id' => $stageId
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

```json
{
"error": "CANT_DELETE_FIRST",
"error_description": "Нельзя удалить первую стадию. Передвиньте стадию, чтобы удалить"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Вы не можете управлять стадиями||
|| `CANT_DELETE_FIRST` | Нельзя удалить первую стадию. Передвиньте стадию, чтобы удалить ||
|| `IS_SYSTEM` | Стадия, установленная по умолчанию, не может быть удалена ||
|| `NOT_FOUND` | Стадия не найдена ||
|#