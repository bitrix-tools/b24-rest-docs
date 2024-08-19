# Получить список связей записи в таймлайне

> Название метода: **crm.timeline.bindings.list**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод получает список связей для записи в таймлайне.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../../data-types.md) | Объект для фильтрации выбранных записей.

Обязательно использовать поле `OWNER_ID`, остальные поля не нужны ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_ID":999}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.bindings.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"OWNER_ID":999},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.bindings.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.timeline.bindings.list",
        {
            filter: {
                "OWNER_ID": 999,
            },
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
                if (result.more()) 
                {
                    result.next();
                }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.bindings.list',
        [
            'filter' => [
                'OWNER_ID' => 999,
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
    "result": [
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "39",
            "ENTITY_TYPE": "deal"
        },
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "92",
            "ENTITY_TYPE": "company"
        },
        {
            "OWNER_ID": "999",
            "ENTITY_ID": "205",
            "ENTITY_TYPE": "lead"
        }
    ],
    "total": 3,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа, содержащий массив объектов с [информацией](crm-timeline-bindings-bind.md#parametr-fields) о найденных связях ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "OWNER_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | OWNER_ID is not defined or invalid | Не передан обязательный параметр `OWNER_ID` или переданный `OWNER_ID` некорректный ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-bindings-bind.md)
- [{#T}](./crm-timeline-bindings-unbind.md)
- [{#T}](./crm-timeline-bindings-fields.md)