# Привязать к группе Социальной сети landing.site.bindingToGroup

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

Метод `landing.site.bindingToGroup` привязывает конкретную Базу знаний к группе. Пользователь должен состоять в указанной группе, и у группы не должно быть привязанной Базы знаний.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор Базы знаний. | ||
|| **groupId**
[`unknown`](../../../data-types.md) | Идентификатор группы. | ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.site.bindingToGroup',
        {
            id: 32,
            groupId: 174
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