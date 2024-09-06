# Блок с изображениями IMAGE

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

![Блок c изображениями](./_images/images.png)

`IMAGE` - блок с изображениями.

Рекомендуется заполнять поле **PREVIEW** с указанием уменьшенной копии изображения, если поле не заполнено, используется **LINK**.

Поля **NAME** (название) и **PREVIEW** (картинка-превью) не являются обязательными.

Поля **WIDTH** (ширина) и **HEIGHT** (высота) не являются обязательными, но рекомендуется их указывать уже сейчас, чтобы правильно отобразить изображение.

## Пример

{% list tabs %}

- JS

    ```js
    {
        IMAGE: {
            NAME: "Это Mantis",
            LINK: "https://files.shelenkov.com/bitrix/images/mantis.jpg",
            PREVIEW: "https://files.shelenkov.com/bitrix/images/mantis.jpg",
            WIDTH: 1000,
            HEIGHT: 638,
        }
    },
    ```

- PHP

    ```php
    Array(
        "IMAGE" => Array(
            Array(
                "NAME" => "Это Mantis",
                "LINK" => "https://files.shelenkov.com/bitrix/images/mantis.jpg",
                "PREVIEW" => "https://files.shelenkov.com/bitrix/images/mantis.jpg",
                "WIDTH" => "1000",
                "HEIGHT" => "638"
            )
        )
    ),
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}
