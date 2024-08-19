# Обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет контента
- из файла Сергея: описание и рекомендация использовать универсальные методы

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.company.details.configuration.get](./crm-company-details-configuration-get.md) | Получает настройки карточки компаний ||
|| [crm.company.details.configuration.reset](./crm-company-details-configuration-reset.md) | Сбрасывает настройки карточки компаний ||
|| [crm.company.details.configuration.set](./crm-company-details-configuration-set.md) | Устанавливает настройки карточки компаний ||
|| [crm.company.details.configuration.forceCommonScopeForAll](./crm-company-details-configuration-force-common-scope-for-all.md) | Позволяет принудительно установить общую карточку компаний для всех пользователей ||
|#