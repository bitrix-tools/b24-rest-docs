# Получить список открытых линий imopenlines.config.list.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список открытых линий.

## Параметры метода

#|
|| **Название**
`Тип` | **Описание** ||
|| **PARAMS**
[`array`](../../data-types.md) | Массив параметров для выборки (select, order, filter) (необязательный). Список доступных полей есть в описании метода [imopenlines.config.add](./imopenlines-config-add.md) ||
|| **OPTIONS**
[`array`](../../data-types.md) | Массив дополнительных опций (необязательный). Сейчас включает только поле 'QUEUE' => 'Y'/'N' — очередь ответственных сотрудников ||
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
    //imopenlines.config.list.get
    function configListGet()
    {
        var params = {
            PARAMS: {
                select: {
                    'ID',
                    ...
                },
                order: {
                    ID: 'ASC',
                    ...
                },
                filter: {
                    ID: 1,
                    ...
                }
            },
            OPTIONS: {
                QUEUE: 'Y'
            }
        };
        BX24.callMethod(
            'imopenlines.config.list.get',
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
