# Получить информацию о бейдже по коду crm.activity.badge.get

> Scope: [`crm`](../../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод вернет массив, содержащий [поля значка](./index.md#поля-записи-о-бейдже), то есть информацию о значке.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}


#|
|| **Поле** | **Описание** ||
|| **code***
[`string`](../../../../../data-types.md) | Код бейджа, например `missedCall` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../../_includes/examples.md) %}

{% list tabs %}
- cURL (Webhook)

- cURL (OAuth)

- JS
    ```js
    BX24.callMethod(
        "crm.activity.badge.get",
        {
            code: 'missedCall',
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }    
);
    ```
- PHP

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "badge": {
            "code": "missedCall",
            "title": "Статус звонка",
             "value": "Пропущен",
             "type": "failure"
        }
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
[`object`](../../../../data-types.md) | Корневой элемент ответа, содержащий информацию о бейдже в случае успеха. В случае неудачи вернёт `null` ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
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
|| `NOT_FOUND` | Бейдж с указанным кодом не найден ||
|#

{% include [системные ошибки](../../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-badge-add.md)
- [{#T}](./crm-activity-badge-list.md)
- [{#T}](./crm-activity-badge-delete.md)
