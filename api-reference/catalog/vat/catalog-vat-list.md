# Получение списка ставок НДС по фильтру

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

{% note info "catalog.vat.list" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.vat.list(select, filter, order, start)
```

Метод получает список ставок НДС по фильтру.

Если операция успешна, возвращается список ставок НДС в теле ответа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-vat-get-fields.md).||
|| **filter** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-vat-get-fields.md). ||
|| **order**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](catalog-vat-get-fields.md). ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
        'catalog.vat.list',
        {
            select: {
                id        
            },
            filter: {
                modifiedBy: 1
            },
            order: {
                id: "ASC"
            }
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
    https://ваш_портал/rest/catalog.vat.list?auth=_ключ_авторизации_&start=50
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
