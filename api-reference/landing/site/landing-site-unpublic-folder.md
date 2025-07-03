# Снять папку сайта с публикации landing.site.unPublicFolder

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

Метод `landing.site.unPublicFolder` снимает с публикации папку сайта. Должны быть права на публикацию сайта папки.

## Параметры

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **folderId**
[`unknown`](../../data-types.md) | Идентификатор папки. | ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.site.unPublicFolder',
        {
            id: 737
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