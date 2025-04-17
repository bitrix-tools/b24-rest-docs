# Шаблоны в генераторе документов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- написать статью, т.к. совершенно непонятно, как работают роли в генераторе документов

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.template.add](./document-generator-template-add.md) | Загружает новый шаблон документа ||
|| [documentgenerator.template.update](./document-generator-template-update.md) | Обновляет существующий шаблон документа ||
|| [documentgenerator.template.get](./document-generator-template-get.md) | Возвращает шаблон документа по идентификатору ||
|| [documentgenerator.template.list](./document-generator-template-list.md) | Возвращает список шаблонов документов по фильтру ||
|| [documentgenerator.template.delete](./document-generator-template-delete.md) | Удаляет шаблон документа ||
|| [documentgenerator.template.getfields](./document-generator-template-get-fields.md) | Возвращает перечень полей шаблонов документов ||
|#