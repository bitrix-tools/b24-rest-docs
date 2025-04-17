# Как работают роли в генераторе документов

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
|| [documentgenerator.role.get](./document-generator-role-get.md) | Отдает информацию о роли и её правах доступа. ||
|| [documentgenerator.role.list](./document-generator-role-list.md) | Метод вернет список ролей без их прав доступа. ||
|| [documentgenerator.role.delete](./document-generator-role-delete.md) | Удаляет роль. ||
|| [documentgenerator.role.add](./document-generator-role-add.md) | Метод добавит новую роль. ||
|| [documentgenerator.role.update](./document-generator-role-update.md) | Обновление роли ||
|| [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md) | Метод установит набор ролей и их привязок. ||
|#
