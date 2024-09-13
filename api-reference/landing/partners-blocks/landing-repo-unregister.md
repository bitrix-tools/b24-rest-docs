# Удалить блок landing.repo.unregister

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

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repo.unregister` удаляет блок. Возвращает *true* при удалении или *false*, если блок уже удален или его не было.

## Параметры

#|
|| **Метод** | **Описание** ||
|| **code**
[`unknown`](../../data-types.md) | Уникальный код удаляемого блока. ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.repo.unregister',
    {code: 'myblockx'},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}