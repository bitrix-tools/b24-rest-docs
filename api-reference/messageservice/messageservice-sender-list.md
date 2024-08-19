# Возвращение списка SMS-провайдеров или провайдеров сообщений

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны параметры, типы и обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- Нет примеров на др. языках

{% endnote %}

{% endif %}

{% note info "messageservice.sender.list" %}

**Scope**: [`messageservice`](../scopes/permissions.md) | **Права на выполнение**: `администратор`

{% endnote %}

Метод возвращает список зарегистрированных текущим приложением (или тем же входящим вебхуком) провайдеров сообщений.

## Пример

```js
BX24.callMethod(
    'messageservice.sender.list',
    {},
    function(result)
    {
        if(result.error())
            alert("Error: " + result.error());
        else
            alert("Успешно: " + result.data().join(', '));
    }
);
```
{% include [Сноска о примерах](../../_includes/examples.md) %}