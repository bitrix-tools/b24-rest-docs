# Управление карточками компаний: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Группа методов `crm.company.details.configuration.*` управляет настройками карточки для двух представлений:

- «Общий вид» — вид карточки для всех сотрудников
- «Мой вид» — личная настройка карточки сотрудника

В представлении можно настроить секции карточки, например создать секцию «Контактные данные». Внутри секции настраивается перечень полей: в «Контактные данные» вы выводите поля «Телефон» и «Почта», а остальные поля — в другие секции.

Общие сведения о компаниях и остальные группы методов — в разделе [Компании в CRM](../index.md).

{% note warning "Развитие методов остановлено" %}

Развитие методов `crm.company.details.configuration.*` остановлено. Для новой разработки используйте универсальные методы `crm.item.details.configuration.*` — таблица замен в разделе [Актуальная версия API](#actual-version).

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Представления CRM](https://helpdesk.bitrix24.ru/open/17914816/)

## Актуальная версия API {#actual-version}

Методы настроек карточки компании заменены [универсальными методами настроек карточки](../../universal/item-details-configuration/index.md). Универсальный метод работает с карточкой любого объекта CRM и получает тип объекта в параметре `entityTypeId`. Для компании `entityTypeId` равен `4`.

#|
|| **Устаревший метод** | **Актуальная замена** ||
|| `crm.company.details.configuration.get` | [crm.item.details.configuration.get](../../universal/item-details-configuration/crm-item-details-configuration-get.md) ||
|| `crm.company.details.configuration.set` | [crm.item.details.configuration.set](../../universal/item-details-configuration/crm-item-details-configuration-set.md) ||
|| `crm.company.details.configuration.reset` | [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md) ||
|| `crm.company.details.configuration.forceCommonScopeForAll` | [crm.item.details.configuration.forceCommonScopeForAll](../../universal/item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md) ||
|#

Устаревшие методы продолжают работать — переписывать существующие интеграции не обязательно.

## Кто может менять настройки карточки

Права зависят от того, чьи настройки вы читаете или меняете:

- любой пользователь получает общие настройки, а свои личные — получает, устанавливает и сбрасывает
- менять и сбрасывать общие настройки, а также читать и менять чужие личные может только пользователь с правом «Разрешить изменять настройки» в CRM. Это право распространяется на всю CRM, а не на отдельный объект
- метод `crm.company.details.configuration.forceCommonScopeForAll` доступен только пользователю с правом «Разрешить изменять настройки» в CRM

## Связь карточки компаний с другими объектами

**Пользователь.** Идентификатор пользователя `userId` используется при установке личных настроек карточки. Получить идентификатор пользователя можно с помощью метода [user.get](../../../user/user-get.md).

**Поля компании.** Идентификаторы полей используются при установке видимых полей в секции карточки. Получить идентификаторы системных и пользовательских полей компании можно с помощью метода [crm.company.fields](../crm-company-fields.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.company.details.configuration.get](./crm-company-details-configuration-get.md) | Получает настройки карточки компаний ||
|| [crm.company.details.configuration.reset](./crm-company-details-configuration-reset.md) | Сбрасывает настройки карточки компаний ||
|| [crm.company.details.configuration.set](./crm-company-details-configuration-set.md) | Устанавливает настройки карточки компаний ||
|| [crm.company.details.configuration.forceCommonScopeForAll](./crm-company-details-configuration-force-common-scope-for-all.md) | Позволяет принудительно установить общую карточку компаний для всех пользователей ||
|#
