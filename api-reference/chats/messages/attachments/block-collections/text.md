# Блок с текстом MESSAGE

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

![Блок с текстом](./_images/text.png)

`MESSAGE` - вывод простого текста без форматирования.

## Пример

{% list tabs %}

- JS

    ```js
    {
        MESSAGE: "API будет доступно в обновлении im 24.0.0"
    },
    ```

- PHP

    ```php
    Array(
        "MESSAGE" => "API будет доступно в обновлении im 24.0.0"
    ),
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

В тексте доступны bb-коды: `USER`, `CHAT`, `SEND`, `PUT`, `CALL`, `BR`, `B`, `U`, `I`, `S`, `URL`.