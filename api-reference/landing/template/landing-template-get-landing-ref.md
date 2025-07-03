# Получить список включаемых областей для страницы landing.template.getLandingRef

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

Метод `landing.template.getLandingRef` получает список включаемых областей для страницы. Ключами возвращаемого массива являются идентификаторы включаемых областей, а значениями - идентификаторы страниц.

## Параметры

#|
|| **Метод** | **Описание** ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор страницы ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.template.getLandingRef',
        {
            id: 557
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
