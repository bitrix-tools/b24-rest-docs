# Изменить существующий шаблон документа crm.documentgenerator.template.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm.documentgenerator`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.documentgenerator.template.update` обновляет существующий шаблон. Возвращает те же данные, что и при вызове [crm.documentgenerator.template.get()](./crm-document-generator-template-get.md).

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор шаблона. ||
|| **fields** | Массив полей. Аналогично методу [crm.documentgenerator.template.add](./crm-document-generator-template-add.md), только здесь все поля необязательные. ||
|#
