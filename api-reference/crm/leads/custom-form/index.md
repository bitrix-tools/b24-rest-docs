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
|| [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md) | Получает параметры настройки карточки лидов ||
|| [crm.lead.details.configuration.reset](./crm-lead-details-configuration-reset.md) | Сбрасывает настройки карточки лидов ||
|| [crm.lead.details.configuration.set](./crm-lead-details-configuration-set.md) | Устанавливает настройки карточки лидов ||
|| [crm.lead.details.configuration.forceCommonScopeForAll](./crm-lead-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку лидов для всех пользователей ||
|#