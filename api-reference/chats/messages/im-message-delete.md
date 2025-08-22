# Удаление сообщения чат-бота im.message.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.message.delete` удаляет сообщение в чате.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **MESSAGE_ID^*^**
[`unknown`](../../data-types.md) | `1` | Идентификатор сообщения | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'im.message.delete',
        Array(
            'MESSAGE_ID' => 1,
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

**Результат выполнения**: `true` или ошибка.

## Ответ в случае ошибки

```json
{
    "error": "MESSAGE_ID_ERROR",
    "error_description": "Не передан идентификатор сообщения"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **MESSAGE_ID_ERROR** | Не передан идентификатор сообщения ||
|| **CANT_EDIT_MESSAGE** | У вас нет доступа к этому сообщению ||
|#