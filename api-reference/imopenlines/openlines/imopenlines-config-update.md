# Изменить открытую линию

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Название метода: **imopenlines.config.update**
>
> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод меняет открытую линию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CONFIG_ID***
[`unknown`](../../data-types.md) | ID линии ||
|| **PARAMS**
[`unknown`](../../data-types.md) | Массив параметров для обновления (необязательный). Список возможных полей есть в описании метода [imopenlines.config.add](./imopenlines-config-add.md) ||
|#

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS

    ```js
    //imopenlines.config.update
    function configUpdate()
    {
        var params = {
            CONFIG_ID: 1,
            PARAMS: {
                LINE_NAME: 'New line name',
                ...
            }
        };
        BX24.callMethod(
            'imopenlines.config.update',
            params,
            function (result) {
                if (result.error())
                    alert("Error: " + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

- PHP

    // пример для php

{% endlist %}
