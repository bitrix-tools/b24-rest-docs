# Получение списка пользовательских полей

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает 1 примера (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "task.item.userfield.getlist" %}

**Scope**: [`task`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `task.item.userfield.getlist` возвращает список свойств.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **auth**
[`unknown`](../../data-types.md) | Токен авторизации. ||
|| **ORDER**
[`unknown`](../../data-types.md) | Массив для сортировки результата. Массив вида `array('поле сортировки'=>'направление сортировки' [, ...])`. ||
|| **FILTER**
[`unknown`](../../data-types.md) | Массив фильтрации результата вида `array('фильтруемое поле'=>'значение фильтра' [, ...])`. Обязательный параметр. ||
|#

## Примеры

{% list tabs %}

- cURL

    ```http    
    $appParams = array(
    'auth' => 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
    'ORDER' => array('ID' => 'asc'),
    'FILTER' => array('USER_TYPE_ID' => 'string')
    );
    ```

    ```http    
    $request = 'http://your-domain.ru/rest/task.item.userfield.getlist.xml?' . http_build_query($appParams);
    ```

- JS

    ```js
    BX24.callMethod(
        "task.item.userfield.getlist",
        {
            order:
            {
                "ID": "ASC"
            },
            filter:
            {
                "EDIT_IN_LIST": "Y"
            }
        },
        function(result)
        {
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}