# Получение списка документов по фильтру

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.document.list" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.document.list(order, filter, select, offset, limit, start)
```

Метод получает список документов по фильтру.

Если операция успешна, возвращается список документов в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **order**
[`array`](../../data-types.md)| Сортировка. ||
|| **filter** 
[`array`](../../data-types.md)| Фильтр. ||
|| **select** 
[`array`](../../data-types.md)| Список получаемых полей. ||
|| **offset** 
[`integer`](../../data-types.md)| Страница выборки, работает аналогично start. ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|| **limit** 
[`integer`](../../data-types.md)| Размер страницы от 1 до 500 (если указан 0 или число больше максимального, то используется значение по умолчанию 50). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

Для JS

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.document.list',
        {
            'order': {
                'id': 'asc',
            },
            'filter': {
                '>id': 0,
            },
            'offset': 0,
            'limit': 50,
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
            result.next();
        }
    );
    ```

- php
  
    ```
    $result = CRest::call(
        'catalog.document.list',
        [
            'order' => [
                'id' => 'asc',
            ],
            'filter' => [
                '>id' => 0,
            ],
            'offset' => 0,
            'limit' => 5,
        ]
    );
    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

- Для HTTPS:

    ```
    https://ваш_портал/rest/catalog.document.list?auth=_ключ_авторизации_&start=50
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
