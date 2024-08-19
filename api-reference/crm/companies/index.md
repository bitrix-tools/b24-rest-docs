# Список методов работы с компаниями

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "crm.company.*" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| [crm.company.add](./crm-company-add.md) | Создаёт новую компанию. ||
|| [crm.company.delete](./crm-company-delete.md) | Удаляет компанию и все связанные с ней объекты. ||
|| [crm.company.fields](./crm-company-fields.md) | Возвращает описание полей компании. ||
|| [crm.company.get](./crm-company-get.md) | Возвращает компанию по идентификатору. ||
|| [crm.company.list](./crm-company-list.md) | Возвращает список компаний по фильтру. ||
|| [crm.company.update](./crm-company-update.md) | Обновляет существующую компанию. ||
|| [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) | Создаёт новое пользовательское поле для компаний. ||
|| [crm.company.userfield.get](./userfields/crm-company-userfield-get.md) | Возвращает пользовательское поле компаний по идентификатору. ||
|| [crm.company.userfield.list](./userfields/crm-company-userfield-list.md) | Возвращает список пользовательских полей компаний по фильтру. ||
|| [crm.company.userfield.update](./userfields/crm-company-userfield-update.md) | Обновляет существующее пользовательское поле компаний. ||
|| [crm.company.userfield.delete](./userfields/crm-company-userfield-delete.md) | Удаляет пользовательское поле компаний. ||
|| [crm.company.contact.add](./contacts/crm-company-contact-add.md) | Добавляет контакт к указанной компании. ||
|| [crm.company.contact.delete](./contacts/crm-company-contact-delete.md) | Удаляет контакт из указанной компании. ||
|| [crm.company.contact.fields](./contacts/crm-company-contact-fields.md) | Возвращает описание полей для связи компания-контакт. ||
|| [crm.company.contact.items.delete](./contacts/crm-company-contact-items-delete.md) | Очищает набор контактов, связанных с указанной компанией. ||
|| [crm.company.contact.items.get](./contacts/crm-company-contact-items-get.md) | Возвращает набор контактов, связанных с указанной компанией. ||
|| [crm.company.contact.items.set](./contacts/crm-company-contact-items-set.md) | Устанавливает набор контактов, связанных с указанной компанией. ||
|#

Общий список **событий компании** приведен [здесь](./events/index.md).