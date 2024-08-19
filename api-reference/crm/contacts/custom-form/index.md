# Обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: описание и рекомендация использовать универсальные методы

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.contact.details.configuration.get](./crm-contact-details-configuration-get.md) | Получает настройки карточки контактов ||
|| [crm.contact.details.configuration.reset](./crm-contact-details-configuration-reset.md) | Сбрасывает настройки карточки контактов ||
|| [crm.contact.details.configuration.set](./crm-contact-details-configuration-set.md) | Устанавливает настройки карточки контактов ||
|| [crm.contact.details.configuration.forceCommonScopeForAll](./crm-contact-details-configuration-force-common-scope-for-all.md) | Позволяет принудительно установить общую карточку контактов для всех пользователей ||
|#