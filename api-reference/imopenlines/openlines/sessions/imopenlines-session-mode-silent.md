# Переключить диалог в «скрытый» режим

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Название метода: **imopenlines.session.mode.silent**
>
> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод для включения и выключения режима скрытой переписки.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Пример** | **По умолчанию** | **Описание** ||
|| **CHAT_ID***
[`unknown`](../../../data-types.md) | 2020 | | Идентификатор чата ||
|| **ACTIVATE**
[`unknown`](../../../data-types.md) | Y | N | Флаг активации ||
|#

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS

    ```js
    BX24.callMethod(
        'imopenlines.session.mode.silent',
        {
            CHAT_ID: 2024
        },
        function(result)
        {
            if(result.error())
            {
                console.warn(result.error().ex);
                return false;
            }

            console.log(result.data());
        }
    );
    ```

- PHP

    // пример для php

{% endlist %}

## Ответ в случае успеха

```json
true
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа к указанному чату ||
|| **CHAT_TYPE** | Указанный чат не является открытой линией ||
|| **CHAT_ID** | Указан не корректный идентификатор чата ||
|#