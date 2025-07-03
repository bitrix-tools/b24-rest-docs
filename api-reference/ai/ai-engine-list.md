# Получить список сервисов ai.engine.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`ai_admin`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод без параметров возвращает список зарегистрированных [engine](./ai-engine-register.md) для текущего партнера. Метод вызывается без параметров.

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'ai.engine.list',
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

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}