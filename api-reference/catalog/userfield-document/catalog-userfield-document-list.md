# Возвращение списка значений пользовательских полей документов складского учёта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- добавить ссылку на `userfieldconfig.list`(.)
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

{% note info "catalog.userfield.document.list" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.userfield.document.list(select, filter, order, start)
```

Метод возвращает список значений пользовательских полей документов складского учёта.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select**
[`array`](../../data-types.md)| Массив с полями, которые надо показать. Обязательно должен быть указан `documentType` – [тип документов складского учёта](../enum/catalog-enum-get-store-document-types.md). | ||
|| **order** 
[`object`](../../data-types.md)| Список для определения порядка отображения, где ключ – название поля, а значение – `ASC` или `DESC`. | ||
|| **filter** 
[`object`](../../data-types.md)| Список для фильтрации. Обязательно должен быть указан `documentType` – [тип документов складского учёта](../enum/catalog-enum-get-store-document-types.md). | ||
|| **start** 
[`string`](../../data-types.md)| Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

В API используются названия полей в виде `field[ID поля в базе]` – например, `field288`. ID поля можно узнать с помощью метода [`userfieldconfig.list`](.).

{% list tabs %}

- js
  
    ```
    BX24.callMethod(
    'catalog.userfield.document.list',
    {
        select: [
            'documentType',
            'documentId',
            'field287',
            'field288',
            'field289',
        ],
        filter:{
            'documentType' : 'S',
            '>=field287': 10,
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

- Для HTTPS:

    ```
    https://ваш_портал/rest/catalog.userfield.document.list?auth=_ключ_авторизации_&start=50
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
