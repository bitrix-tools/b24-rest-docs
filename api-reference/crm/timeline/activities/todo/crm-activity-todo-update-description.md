# Обновить описание универсального дела crm.activity.todo.updateDescription

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод меняет текст универсального дела. Результат будет содержать `id` – идентификатор измененного дела.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ownerTypeId**
[`number`](../../../../data-types.md) | Идентификатор типа элемента (справочник доступных типов), к которому относится дело ||
|| **ownerId**
[`number`](../../../../data-types.md) | Идентификатор элемента, к которому относится дело ||
|| **id**
[`number`](../../../../data-types.md) | Идентификатор дела ||
|| **value**
[`string`](../../../../data-types.md) | Новый текст дела ||
|#

## Примеры

{% list tabs %}

- HTTP

    ```http
    crm.activity.todo.updateDescription?ownerTypeId=2&ownerId=1&id=1&value=перезвонить
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