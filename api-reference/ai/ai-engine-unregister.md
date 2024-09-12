# Удалить сервис ai.engine.unregister

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы.

{% endnote %}

{% endif %}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод для удаления [engine](./ai-engine-register.md).

#|
|| **Параметры** | **Описание** ||
|| **code**
[`unknown`](../data-types.md) | Код engine ||
|#

## Примеры

```js
BX24.callMethod(
    'ai.engine.unregister',
    {
        code: 'ivanov_gpt',
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

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

В случае успеха возвращает `true`.