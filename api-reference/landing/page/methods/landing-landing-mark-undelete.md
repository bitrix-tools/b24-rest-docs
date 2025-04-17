# Пометить страницу как неудаленную landing.landing.markUnDelete

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.landing.markUnDelete` помечает страницу как неудаленную.

## Параметры

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **$lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.landing.markUnDelete',
        {
            lid: 1688
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