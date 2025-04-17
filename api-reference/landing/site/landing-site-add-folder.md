# Добавить папку на сайт landing.site.addFolder

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
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

Метод `landing.site.addFolder` добавляет папку в сайт.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **siteId**
[`unknown`](../../data-types.md) | Идентификатор сайта. 

{% note warning %}

Требуются права на запись в указанный сайт.

{% endnote %}

 | ||

|| **fields**
[`unknown`](../../data-types.md) | Поля папки: 
- ACTIVE – активность папки (Y/N). По умолчанию создается не активной;
- TITLE – заголовок (наименование) папки; 
- CODE – символьный код папки (часть URL страницы папки). По умолчанию транслитерируется из названия папки. | ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.site.addFolder',
        {
            siteId: 1817,
            fields: {
                TITLE: 'Новая папка'
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