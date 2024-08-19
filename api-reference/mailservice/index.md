# Методы работы с почтовыми сервисами

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны версии методов

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "mailservice.*" %}

**Scope**: [`mailservice`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** | **С версии** ||
|| [mailservice.fields](./mailservice-add.md) | Возвращает описание полей почтового сервиса. | ||
|| [mailservice.list](./mailservice-list.md) | Возвращает список всех почтовых сервисов. | ||
|| [mailservice.get](./mailservice-get.md) | Возвращает параметры указанного почтового сервиса. | ||
|| [mailservice.add](./mailservice-add.md) | Добавляет почтовый сервис. | ||
|| [mailservice.update](./mailservice-update.md) | Обновляет параметры почтового сервиса. | ||
|| [mailservice.delete](./mailservice-delete.md) | Удаляет почтовый сервис. | ||
|#