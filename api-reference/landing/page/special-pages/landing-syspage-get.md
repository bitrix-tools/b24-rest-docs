# Получить список специальных страниц landing.syspage.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.syspage.get` возвращает список страниц сайта, которые установлены как специальные.

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.syspage.get',
        {
            id: 1390,// ИД сайта
            active: true// Если true, то вернутся только активные страницы сайта (по умолчанию все)
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}