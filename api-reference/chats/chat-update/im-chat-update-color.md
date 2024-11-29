# Изменить цвет чата im.chat.updateColor

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

Метод `im.chat.updateColor` обновляет цвет чата.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID^*^**
[`unknown`](../../data-types.md) | `13` | Идентификатор чата | 18 ||
|| **COLOR^*^**
[`unknown`](../../data-types.md) | `MINT` | Цвет чата для мобильного приложения (RED, GREEN, MINT, LIGHT_BLUE, DARK_BLUE, PURPLE, AQUA, PINK, LIME, BROWN, AZURE, KHAKI, SAND, MARENGO, GRAY, GRAPHITE) | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'im.chat.updateColor',
        Array(
            'CHAT_ID' => 13,
            'COLOR' => 'MINT'
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

## Ответ в случае ошибки

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Не передан идентификатор чата"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **CHAT_ID_EMPTY** | Не передан идентификатор чата ||
|| **WRONG_COLOR** | Цвет не входит в список доступных цветов ||
|| **WRONG_REQUEST** | Цвет уже установлен или указанный чат не существует ||
|#