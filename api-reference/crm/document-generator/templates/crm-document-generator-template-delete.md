# Удаление шаблона документа

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.documentgenerator.template.delete" %}

**Scope**: [`crm.documentgenerator`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.documentgenerator.template.delete` удаляет шаблон. 

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | идентификатор шаблона. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Ответ в случае успеха

Ответ пустой.