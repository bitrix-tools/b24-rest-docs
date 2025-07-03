# Добавить сайт landing.site.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.site.add` добавляет сайт. Возвращает `ID` созданного сайта или ошибку.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **fields**
[`unknown`](../../data-types.md) | [Поля сущности](./base-fields.md) | ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.site.add',
        {
            fields: {
                TITLE: 'My first site!',
                CODE: 'firstsite',
                DOMAIN_ID: 'my.bitrix24.site'
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}