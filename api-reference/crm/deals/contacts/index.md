# О контактах сделки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно вступление, соответствующее заголовку

{% endnote %}

{% endif %}

{% note info "Права" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| [crm.deal.contact.add](./crm-deal-contact-add.md) | Добавляет контакт к сделке ||
|| [crm.deal.contact.items.set](./crm-deal-contact-items-set.md) | Добавляет несколько контактов к сделке ||
|| [crm.deal.contact.fields](./crm-deal-contact-fields.md) | Возвращает поля связи сделка-контакт ||
|| [crm.deal.contact.items.get](./crm-deal-contact-items-get.md) | Получает набор контактов, связанных со сделкой ||
|| [crm.deal.contact.delete](./crm-deal-contact-delete.md) | Удаляет контакт из указанной сделки ||
|| [crm.deal.contact.items.delete](./crm-deal-contact-items-delete.md) | Удаляет набор контактов, связанных с указанной сделкой ||
|#