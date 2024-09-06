# Блок с файлами FILE

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

![Блок с файлами](./_images/files.png)

`FILE` - отображает форматированную ссылку для загрузки файла.

Размер файла необходимо указывать в байтах.

Поля **NAME** (название файла) и **SIZE** (размер файла) не являются обязательными.

## Пример

{% list tabs %}

- JS

    ```js
    {
        FILE: {
            NAME: "mantis.jpg",
            LINK: "https://files.shelenkov.com/bitrix/images/mantis.jpg",
            SIZE: 1500000,
        }
    },
    ```

- PHP

    ```php
    Array(
        "FILE" => Array(
            Array(
                "NAME" => "mantis.jpg",
                "LINK" => "https://files.shelenkov.com/bitrix/images/mantis.jpg",
                "SIZE" => "1500000"
            )
        )
    ),
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}
