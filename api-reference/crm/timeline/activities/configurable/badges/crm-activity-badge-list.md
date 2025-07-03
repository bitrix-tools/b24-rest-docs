# Получить список бейджей crm.activity.badge.list

> Scope: [`crm`](../../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.badge.list` получает список доступных бейджей. Вернет массив, содержащий список всех зарегистрированных бейджей. Каждый элемент массива содержит [поля бейджа](./index.md#поля-записи-о-бейдже).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.badge.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.activity.badge.list",
        {
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }    
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.badge.list',
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
    "result": {
        "badges": [
            {
                "code": "missedCall",
                "title": "Статус звонка",
                "value": "Пропущен",
                "type": "failure"
            }
        ]
    },
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Корневой элемент ответа, содержащий массив, каждый элемент которого несет информацию о бейдже ||
|| **time**
[`time`](../../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|#

{% include [системные ошибки](../../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-badge-add.md)
- [{#T}](./crm-activity-badge-get.md)
- [{#T}](./crm-activity-badge-delete.md)
