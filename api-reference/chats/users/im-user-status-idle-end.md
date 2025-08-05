# Отключить автоматический статус «Отошел» im.user.status.idle.end

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.status.idle.end` отключает автоматический статус «Отошел».

Метод разработан для предыдущей версии чата. В текущей версии чата М1 он работает, но результаты не отображаются в интерфейсе.

{% note tip "Пользовательская документация" %}

- [Битрикс24 Чат: новый мессенджер](https://helpdesk.bitrix24.ru/open/19071750/)

{% endnote %}

## Параметры метода

Без параметров.

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```js
    BX24.callMethod(
        'im.user.status.idle.end',
        {},
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.user.status.idle.start',
        Array(),
        $_REQUEST[
            "auth"
        ]
    );    
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

