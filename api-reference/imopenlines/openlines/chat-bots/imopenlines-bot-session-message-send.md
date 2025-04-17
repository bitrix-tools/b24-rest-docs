# Отправить приветственное сообщение imopenlines.bot.session.message.send

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт описания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines, imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод отправляет чат-ботом автоматическое сообщение.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID^*^**
[`unknown`](../../../data-types.md) | `2` | Идентификатор чата, который забирает текущий оператор | 1 ||
|| **MESSAGE^*^**
[`unknown`](../../../data-types.md) | `message text` | Отправляемое сообщение | 1 ||
|| **NAME^*^**
[`unknown`](../../../data-types.md) | `WELCOME` | Тип сообщения:
- `WELCOME` — приветственное сообщение
- `DEFAULT` — обычное сообщение
 
По умолчанию, пустое значение | 1 ||
|#

## Примеры

{% include [Пояснение о restCommand](../../../chat-bots/_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imopenlines.bot.session.message.send',
        Array(
            'CHAT_ID' => 2,
            'MESSAGE' => 'message text',
            'NAME' => 'WELCOME'
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

## Ответ в случае ошибки

или ошибка.