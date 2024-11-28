# Удалить привязку к группе Социальной сети landing.site.unbindingFromGroup

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

Метод `landing.site.unbindingFromGroup` отвязывает конкретную Базу знаний от группы. Пользователь должен состоять в указанной группе.

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
        'landing.site.unbindingFromGroup',
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
