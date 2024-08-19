# Переключение моделей

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют параметры или поля
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.role.enable" %}

**Scope**: [`landing`](../../scopes/permissions.md) | **Права на выполнение**: `администратор`

{% endnote %}

Метод `landing.role.enable` осуществляет переключение между расширенной и ролевой моделями.

## Примеры

```js
BX24.callMethod(
    'landing.role.enable',
    {
        mode: 1// 1 – для включения ролевой модели, 0 – для выключения (включения расширенной)
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}