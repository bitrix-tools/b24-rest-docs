# Получить список переводов называния типов цен по фильтру catalog.priceTypeLang.list

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

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.priceTypeLang.list(select, filter, order, start)
```

Метод получает список переводов называний типов цен по фильтру.


## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-lang-get-fields.md).||
|| **filter** 
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-lang-get-fields.md). ||
|| **order**
[`object`](../../data-types.md)| Поля, соответствующие доступному списку полей [`fields`](./catalog-price-type-lang-get-fields.md). ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.priceTypeLang.list',
        {
            filter: {
                catalogGroupId: 1
            },
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

{% endlist %}

Пример HTTPS запроса

```
https://ваш_портал/rest/catalog.priceTypeLang.list?auth=_ключ_авторизации_&start=50
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}
