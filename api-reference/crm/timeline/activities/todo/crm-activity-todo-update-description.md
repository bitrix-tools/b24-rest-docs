# Обновить описание универсального дела crm.activity.todo.updateDescription

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь с правом на редактирование элемента CRM, для которого обновляется дело`

Метод меняет описание в универсальном деле.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор обновляемого дела, например  `999` ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | [Целочисленный идентификатор типа сущности CRM](../../../data-types.md#object_type), к которому привязано дело (например, `2` для сделки) ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор элемента CRM, к которому привязано дело (например, `1`) ||
|| **value***
[`string`](../../../../data-types.md) | Новое описание дела ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    ```

- cURL (OAuth)

    ```bash

    ```

- JS

    ```js
    BX24.callMethod(
        "crm.activity.todo.updateDescription",
        {
            id: 999,
            ownerTypeId: 2,
            ownerId: 1,
            value: 'Новое описание дела'
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

    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 999
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
[`object`](../../../../data-types.md) | В случае успеха возвращает объект, содержащий целочисленный идентификатор обновлённого дела `id`, в случае ошибки = `null` ||
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

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `NOT_FOUND` | Элемент CRM не найден ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `CAN_NOT_UPDATE_COMPLETED_TODO` | Закрытое дело нельзя изменять ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-todo-add.md)
- [{#T}](./crm-activity-todo-update.md)
- [{#T}](./crm-activity-todo-update-deadline.md)
- [{#T}](./crm-activity-todo-update-color.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)

