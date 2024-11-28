# Получить URL превью сайта landing.site.getPreview

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

Метод `landing.site.getPreview` возвращает URL изображения-превью сайта (превью индексной страницы). Сайт должен быть доступен на чтение.

## Параметры

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор сайта. | ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.landing.getPreview',
        {
            id: 1817
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