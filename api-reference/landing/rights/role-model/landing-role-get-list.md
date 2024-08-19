# Получение списка ролей

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.role.getList" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Права на выполнение**: `администратор`

{% endnote %}

Метод `landing.role.getList` позволяет получить список ролей. Вернет массив идентификаторов и названий всех ролей.

## Параметры

Метод без параметров.

## Примеры

```js
BX24.callMethod(
    'landing.role.getList',
    {
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}