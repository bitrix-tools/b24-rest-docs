# Справочники

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- какие бывают, где используются, какие read-only
  
{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.status.add](./crm-status-add.md) | Создает новый элемент в указанном справочнике. ||
|| [crm.status.delete](./crm-status-delete.md) | Удаляет элемент справочника. ||
|| [crm.status.entity.items](./crm-status-entity-items.md) | Возвращает элементы справочника по его символьному идентификатору. ||
|| [crm.status.entity.types](./crm-status-entity-types.md) | Возвращает описание типов справочников. ||
|| [crm.status.fields](./crm-status-fields.md) | Возвращает описание полей справочника. ||
|| [crm.status.get](./crm-status-get.md) | Возвращает элемент справочника по идентификатору. ||
|| [crm.status.list](./crm-status-list.md) | Возвращает список элементов справочника по фильтру. ||
|| [crm.status.update](./crm-status-update.md) | Обновляет существующий элемент справочника. ||
|#