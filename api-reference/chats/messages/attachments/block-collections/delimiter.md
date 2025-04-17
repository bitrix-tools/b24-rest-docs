# Блок с разделителем DELIMITER

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

![Блок c разделителем](./_images/delimiter.png)

`DELIMITER` - вывод разделителя.

Для него можно задать размер через параметр SIZE. Параметр не обязательный.

## Пример

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    {
        DELIMITER: {
            SIZE: 200,
        }
    },
    ```

- PHP

    ```php
    Array(
        "DELIMITER" => Array(
            'SIZE' => 200,
        )
    ),
    ```

{% endlist %}
