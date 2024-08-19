# Получение списка коэффициентов единиц измерения по фильтру

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

{% note info "catalog.ratio.list" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.ratio.list(select, filter, order, start)
```

Метод получает список коэффициентов единиц измерения по фильтру.

Если операция успешна, возвращается список коэффициентов единиц измерения в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-ratio-get-fields.md). ||
|| **filter** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-ratio-get-fields.md). ||
|| **order** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-ratio-get-fields.md). ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
    'catalog.ratio.list',
    {
        select:{
            id
        },
        filter:{
            isDefault: "Y"
        },
        order:{
            id: "asc"
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

- Для HTTPS:

    ```
    https://ваш_портал/rest/catalog.ratio.list?auth=_ключ_авторизации_&start=50
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
