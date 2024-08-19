# Обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

О контактах (общее описание, поля, выделить obsolete типа адресов и указать, что вместо этого нужно в реквизиты идти) 

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.contact.add](./crm-contact-add.md) | Создает новый контакт ||
|| [crm.contact.update](./crm-contact-update.md) | Обновляет существующий контакт ||
|| [crm.contact.get](./crm-contact-get.md) | Возвращает контакт по идентификатору ||
|| [crm.contact.list](./crm-contact-list.md) | Возвращает список контактов по фильтру ||
|| [crm.contact.delete](./crm-contact-delete.md) | Удаляет контакт и все связанные с ним объекты ||
|| [crm.contact.fields](./crm-contact-fields.md) | Возвращает описание полей контакта, в том числе пользовательских ||
|#

## Компании

#|
|| **Метод** | **Описание** ||
|| [crm.contact.company.fields](./company/crm-contact-company-fields.md) | Возвращает описание полей для связи контакт-компания ||
|| [crm.contact.company.add](./company/crm-contact-company-add.md) | Добавляет компанию к указанному контакту ||
|| [crm.contact.company.delete](./company/crm-contact-company-delete.md) | Удаляет компанию из указанного контакта ||
|| [crm.contact.company.items.get](./company/crm-contact-company-items-get.md) | Получает набор компаний, связанных с указанным контактом ||
|| [crm.contact.company.items.set](./company/crm-contact-company-items-set.md) | Устанавливает набор компаний, связанных с указанным контактом ||
|| [crm.contact.company.items.delete](./company/crm-contact-company-items-delete.md) | Очищает набор компаний, связанных с указанным контактом ||
|#

## Пользовательские поля

#|
|| **Метод** | **Описание** ||
|| [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) | Создает пользовательское поле для контактов ||
|| [crm.contact.userfield.update](./userfield/crm-contact-userfield-update.md) | Изменяет существующее пользовательское поле контактов ||
|| [crm.contact.userfield.get](./userfield/crm-contact-userfield-get.md) | Возвращает пользовательское поле контактов по Id ||
|| [crm.contact.userfield.list](./userfield/crm-contact-userfield-list.md) | Возвращает список пользовательских полей контактов ||
|| [crm.contact.userfield.delete](./userfield/crm-contact-userfield-delete.md) | Удаляет пользовательское поле контактов ||
|#

## Управление карточками контактов

#|
|| **Метод** | **Описание** ||
|| [crm.contact.details.configuration.get](./custom-form/crm-contact-details-configuration-get.md) | Получает настройки карточки контактов ||
|| [crm.contact.details.configuration.reset](./custom-form/crm-contact-details-configuration-reset.md) | Сбрасывает настройки карточки контактов ||
|| [crm.contact.details.configuration.set](./custom-form/crm-contact-details-configuration-set.md) | Устанавливает настройки карточки контактов ||
|| [crm.contact.details.configuration.forceCommonScopeForAll](./custom-form/crm-contact-details-configuration-force-common-scope-for-all.md) | Позволяет принудительно установить общую карточку контактов для всех пользователей ||
|#