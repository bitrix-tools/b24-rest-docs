# Шаблоны документов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно вступление, соответствующее заголовку

{% endnote %}

{% endif %}

{% note info "Права" %}

**Scope**: [`crm.documentgenerator`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.template.getfields](./crm-document-generator-template-get-fields.md) | Поля шаблона документа. ||
|| [crm.documentgenerator.template.add](./crm-document-generator-template-add.md) | Добавление нового шаблона. ||
|| [crm.documentgenerator.template.update](./crm-document-generator-template-update.md) | Изменение существующего шаблона документа. ||
|| [crm.documentgenerator.template.get](./crm-document-generator-template-get.md) | Получение информации о шаблоне документа по Id. ||
|| [crm.documentgenerator.template.list](./crm-document-generator-template-list.md) | Получение списка шаблонов документов. ||
|| [crm.documentgenerator.template.delete](./crm-document-generator-template-delete.md) | Удаление шаблона документа. ||
|#
