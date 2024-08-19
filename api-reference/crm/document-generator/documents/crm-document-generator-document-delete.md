# Удаление документа

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

{% note info "crm.documentgenerator.document.delete" %}

**Scope**: [`crm.documentgenerator`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.documentgenerator.document.delete` удаляет документ. 

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор документа. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Ответ в случае успеха

Ответ пустой.