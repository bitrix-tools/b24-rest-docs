# Получить список доступных типов данных task.item.userfield.gettypes

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает 1 примера (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- добавить примечание, что другие типы нельзя к задачам добавлять

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.item.userfield.gettypes` возвращает все доступные в системе типы данных.

Пользовательские поля в задачах поддерживают типы данных:
- `string` — строка
- `double` — число
- `date` — дата
- `boolean` — да/нет 

## Параметры

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **auth**
[`unknown`](../../data-types.md) | Токен авторизации. ||
|#

## Примеры

{% list tabs %}

- cURL

    ```http
    $request = 'http://your-domain.ru/rest/task.item.userfield.gettypes.xml?' . http_build_query($appParams);
    ```

- JS

    ```js
    BX24.callMethod(
        'task.item.userfield.gettypes',
        {'auth': 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa'},

        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
