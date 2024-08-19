# Получить чат по символьному коду

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки
- из файла Сергея: порекомендовать также метод получения чата по id объекта CRM, как более надежный

{% endnote %}

{% endif %}

> Название метода: **imopenlines.session.open**
>
> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает идентификатор чата по USER_CODE.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Пример** | **Описание** ||
|| **USER_CODE***
[`unknown`](../../../data-types.md) | `livechat`\|`58`\|`2042`\|`479` | Код чата, можно найти в ENTITY_ID ||
|#

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS
    
    ```js
    BX24.callMethod(
        'imopenlines.session.open',
        {
            CHAT_ID: 2024
        },
        function(result)
        {
            if(result.error())
            {
                console.warn(result.error().ex);
                return false;
            }
            console.log(result.data());
        }
    );
    ```

- PHP

    // пример для php

{% endlist %}

## Ответ в случае успеха

```json
{
    "chatId":"2043"
}
```

## Ответ в случае ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа к указанному чату ||
|#