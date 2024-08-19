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
|| [crm.deal.details.configuration.get](./crm-deal-details-configuration-get.md) | Получает настройки карточки сделок ||
|| [crm.deal.details.configuration.reset](./crm-deal-details-configuration-reset.md) | Сбрасывает настроек карточки сделок ||
|| [crm.deal.details.configuration.set](./crm-deal-details-configuration-set.md) | Позволяет установить настройки карточки сделок ||
|| [crm.deal.details.configuration.forceCommonScopeForAll](./crm-deal-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку сделок для всех пользователей ||
|#