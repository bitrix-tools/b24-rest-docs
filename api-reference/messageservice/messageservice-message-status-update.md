# Обновление статуса доставки сообщения

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- Нет примеров на др. языках

{% endnote %}

{% endif %}

{% note info "messageservice.message.status.update" %}

**Scope**: [`messageservice`](../scopes/permissions.md) | **Права на выполнение**: `администратор`

{% endnote %}

Метод позволяет задать статус доставки указанного сообщения, отправленного с помощью провайдера сообщений.

#|
|| **Параметр** | **Описание** ||
|| **CODE^*^** | Код провайдера.  ||
|| **MESSAGE_ID^*^** | Идентификатор сообщения.  ||
|| **STATUS** | Статус сообщения. Обязательный. Допустимые статусы:
- `delivered` - доставлено
- `undelivered` - не доставлено
- `failed` - ошибка доставки ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

### Пример

```js
BX24.callMethod(
    'messageservice.message.status.update',
    {
        CODE: 'provider1',
        message_id: 1,
        status: 'delivered'
    },
    function(result)
    {
        if(result.error())
            alert("Ошибка: " + result.error());
        else
            alert("Успешно: " + result.data());
    }
);
```

{% include [Сноска о примерах](../../_includes/examples.md) %}