# Получение списка складов по фильтру

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

{% note info "catalog.store.list" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.store.list(select, filter, order, start)
```

Метод получает список складов по фильтру.

Если операция успешна, возвращается список складов в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-store-get-fields.md).
{% note info "Примечание" %}

Параметр `select`, может быть и объектом, и массивом: `select: {0: 'id'}` или `select: ['id']`

{% endnote %}
||
|| **filter** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-store-get-fields.md). ||
|| **order**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-store-get-fields.md). ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

Для JS

```javascript
BX24.callMethod(
    'catalog.store.list',
    {
        select:['id', 'active'],
        filter:{
            modifiedBy: 1
        },
        order:{
            id: 'ASC'
        },
        start: 1
    },
    function(result)
    {
        if(result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
        result.next();
    }
);
```

Пример HTTPS запроса

```
https://ваш_портал/rest/catalog.store.list?auth=_ключ_авторизации_&start=50
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}
