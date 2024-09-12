# Добавить стадию Канбана / Моего плана task.stages.add

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

Метод `task.stages.add` добавляет стадию Канбана / Моего плана.

## Параметры метода

#|
|| **Название** `тип` | **Описание** ||
|| **fields^*^**
[`object`](../../data-types.md) | Значения полей (подробное описание приведено ниже) для добавления стадии ||
|| **isAdmin**
[`boolean`](../../data-types.md) | Если установлено `true`, то проверки прав происходить не будет. При условии, что запрашивающий является администратором портала. ||
|#

## Параметр fields

#|
|| **Название** `тип` | **Описание** ||
|| **TITLE^*^** [`string`](../../data-types.md) | Заголовок стадии. ||
|| **COLOR** [`string`](../../data-types.md) | Цвет стадии. ||
|| **AFTER_ID** [`integer`](../../data-types.md) | Идентификатор стадии, после которой надо добавить новую стадию. Если не указано или равно `0`, то добавится в начало. ||
|| **ENTITY_ID** [`integer`](../../data-types.md)| Идентификатор сущности. Может равняться `ID` группы, тогда стадия добавится в Канбан группы. При недостаточном уровне прав выводится ошибка доступа. Если равняется `0` или отсутствует, то стадия добавляется в Мой план текущего пользователя. ||
|#

## Примеры кода

{% list tabs %}

- JS
    ```js
    BX24.callMethod(
        'task.stages.add',
        {
            fields: {
                TITLE: 'Название стадии',
                COLOR: '#FFAAEE',
                AFTER_ID: 1,
                ENTITY_ID: 1
            },
            isAdmin: false,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- cURL (oAuth)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Authorization: YOUR_ACCESS_TOKEN" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "#FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://your-domain.bitrix24.com/rest/task.stages.add
    ```

- cURL (Webhook)
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
    "fields": {
        "TITLE": "Название стадии",
        "COLOR": "#FFAAEE",
        "AFTER_ID": 1,
        "ENTITY_ID": 1
    },
    "isAdmin": false
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/task.stages.add
    ```

- PHP
    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    $fields = [
        "TITLE" => "Название стадии",
        "COLOR" => "#FFAAEE",
        "AFTER_ID" => 1,
        "ENTITY_ID" => 1
    ];

    // выполнение запроса к REST API
    $result = CRest::call(
        'task.stages.add',
        [
            'fields' => $fields,
            'isAdmin' => false
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

HTTP-статус: **200**

```json
{
    "result": 1
}
```

### Возвращаемые данные

#|
|| **Название** `тип` | **Описание** ||
|| **result** [`integer`](../../data-types.md) | Идентификатор добавленной стадии. ||
|#

## Обработка ошибок

```json
{
    "error": "EMPTY_TITLE",
    "error_description": "Не указан заголовок стадии"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `EMPTY_TITLE` | Не указан заголовок стадии ||
|| `ACCESS_DENIED` | Вы не можете управлять стадиями ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}