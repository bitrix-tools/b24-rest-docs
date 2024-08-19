# Удалить роль

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "documentgenerator.role.delete" %}

**Scope**: [`documentgenerator`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `documentgenerator.role.delete` удаляет роль.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор роли. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}
