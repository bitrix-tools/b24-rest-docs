# Получить список привязок в меню landing.site.getMenuBindings

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.site.getMenuBindings` возвращает список привязанных к меню (конкретному или всем) Баз знаний. Вернутся только привязки, к Базам знаний которых текущий пользователь имеет доступ на чтение.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **menuCode**
[`unknown`](../../../data-types.md) | Символьный код меню, как мы определяли выше. Не обязательный, по умолчанию возвращаются все привязки. | ||
|#

## Пример

```js
BX24.callMethod(
    'landing.site.getMenuBindings',
    {
        menuCode: 'crm_switcher:deal'
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