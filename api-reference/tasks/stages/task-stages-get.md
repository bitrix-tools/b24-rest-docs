# Список стадий Канбана / Моего плана task.stages.get

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

Метод `task.stages.get` получения стадий Канбана / Моего плана.

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **entityId^*^**
[`integer`](../../data-types.md) | Идентификатор сущности. Если равняется `ID` группы, то возвращаются стадии Канбана группы. При недостаточном уровне прав выводится ошибка доступа. Если параметр равен `0`, то возвращаются стадии Моего плана текущего пользователя. ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала. ||
|#

Возвращает массив стадий, поля описаны в [таблице стадий](./index.md).

## Примеры

{% list tabs %}

- JS
    ```js
    const entityId = 0;
    BX24.callMethod(
        'task.stages.get',
        {
            entityId: entityId,
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
    "entityId": 0
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.get
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "entityId": 0
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.get
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $entityId = 0;

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.get',
        [
            'entityId' => $entityId
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
    "result": {
        "5": {
         "ID": "5",
         "TITLE": "Не спланированы",
         "SORT": "100",
         "COLOR": "00C4FB",
         "SYSTEM_TYPE": "NEW",
         "ENTITY_ID": "1",
         "ENTITY_TYPE": "U",
         "ADDITIONAL_FILTER": [],
         "TO_UPDATE": [],
         "TO_UPDATE_ACCESS": null
        },
        "6": {
         "ID": "6",
         "TITLE": "Сделаю на неделе",
         "SORT": "200",
         "COLOR": "47D1E2",
         "SYSTEM_TYPE": null,
         "ENTITY_ID": "1",
         "ENTITY_TYPE": "U",
         "ADDITIONAL_FILTER": [],
         "TO_UPDATE": [],
         "TO_UPDATE_ACCESS": null
        }
    }
}
```

## Возвращаемые данные

#|
|| **Поле** `тип` | **Описание** ||
|| **result** `object` | Объект, содержащий данные о стадиях Канбана / Моего плана, ключами которого являются идентификаторы стадий ||
|| **ID** `integer` | Идентификатор стадии ||
|| **TITLE** `string` | Название ||
|| **SORT** `integer` | Сортировка ||
|| **COLOR** `string` | Цвет ||
|| **SYSTEM_TYPE** `string` | Системный тип (например, "NEW", "PROGRESS", "WORK", "REVIEW", "FINISH") ||
|| **ENTITY_ID** `integer` | Идентификатор сущности (группы или пользователя) ||
|| **ENTITY_TYPE** `string` | Тип сущности (например, "U" для пользователя, "G" для группы) ||
|| **ADDITIONAL_FILTER** `array` | Дополнительные фильтры (системный параметр, всегда имеет значение пустого массива) ||
|| **TO_UPDATE** `array` | Массив элементов для обновления (системный параметр, всегда имеет значение пустого массива) ||
|| **TO_UPDATE_ACCESS** `null` | Функции, применяемые к задаче при переносе на эту стадию (системный параметр, всегда имеет значение null) ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
"error": "ACCESS_DENIED",
"error_description": "Вы не можете просматривать стадии в этой группе"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Значение** ||
|| `ACCESS_DENIED` | Вы не можете просматривать стадии в этой группе ||
|#