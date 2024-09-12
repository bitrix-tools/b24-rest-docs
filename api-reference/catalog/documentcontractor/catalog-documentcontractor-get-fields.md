# Получить поля с привязками CRM-поставщиков к складским документам catalog.documentcontractor.getFields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
catalog.documentcontractor.getFields()
```

Метод возвращает массив полей с привязками.

## Параметры

Без параметров.

## Примеры

```js
BX.callMethod(
    'catalog.documentcontractor.getFields',
    {},
    function(result) {
        if (result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **documentId^*^**
[`integer`](../../data-types.md) | Идентификатор документа, к которому привязан поставщик. |  ||
|| **entityTypeId^*^**
[`integer`](../../data-types.md) | Идентификатор типа CRM-сущности (Контакт или Компания). |  ||
|| **entityId^*^**
[`integer`](../../data-types.md) | Идентификатор CRM-сущности. |  ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор привязки сущности к документу. | Только для чтения. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
