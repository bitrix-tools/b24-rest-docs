# Добавить универсальное дело crm.activity.todo.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет универсальное дело. Результат будет содержать `id` - идентификатор созданного дела.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ownerTypeId**
[`integer`](../../../../data-types.md) | Идентификатор типа элемента (справочник доступных типов), к которому относится дело ||
|| **ownerId**
[`integer`](../../../../data-types.md) | Идентификатор элемента, к которому относится дело ||
|| **description**
[`string`](../../../../data-types.md) | Текст дела ||
|| **deadline**
[`datetime`](../../../../data-types.md) | Крайний срок дела ||
|| **responsibleId**
[`integer`](../../../../data-types.md) | Ответственный за дело ||
|#

## Примеры

{% list tabs %}

- HTTP

    ```http
    crm.activity.todo.add?ownerTypeId=2&ownerId=1&deadline=2022-12-31T15:00:00&description=Связаться с клиентом
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result": {
        "id": 243
    }
}
```