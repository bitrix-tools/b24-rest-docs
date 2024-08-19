# Получение списка привязок CRM-сущностей (Контакта/Компании) к документам по фильтру

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

{% note info "catalog.documentcontractor.list" %}

**Scope**: [`catalog`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
catalog.documentcontractor.list(select, filter, order, start)
```

Метод получает список привязок CRM-сущностей (Контакта/Компании) к документам по фильтру. 

Возвращает список привязок со структурой, описанной в параметре **select** (если не задан, то выводятся все поля, как в методе [getFields](catalog-documentcontractor-get-fields.md)).

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **select**
[`object`](../../data-types.md) | Поля, соответствующие доступному списку полей [fields](catalog-documentcontractor-get-fields.md). ||
|| **filter**
[`object`](../../data-types.md) | Поля, соответствующие доступному списку полей [fields](catalog-documentcontractor-get-fields.md). ||
|| **order**
[`object`](../../data-types.md) | Поля, соответствующие доступному списку полей [fields](catalog-documentcontractor-get-fields.md). ||
|| **start**
[`string`](../../data-types.md) | Номер страницы вывода. Работает для https запросов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- js
  
    ```
    BX.callMethod(
        'catalog.documentcontractor.list',
        {
            select: ['id', 'documentId'],
            order: {'id': 'desc'},
            filter:
            {
                'documentId': 6,
                'entityTypeId': 3
            }
        },

        function(result)
        {
            console.log(result.data())
            result.next();
        }
    );
    ```
- Для HTTPS:

    ```
    https://ваш_портал/rest/catalog.documentcontractor.list?auth=_ключ_авторизации_&start=50
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
