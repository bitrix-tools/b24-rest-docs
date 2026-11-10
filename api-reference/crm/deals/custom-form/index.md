# Управление карточками сделок: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Группа методов `crm.deal.details.configuration.*` управляет настройками карточки для двух представлений:

* «Общий вид» — вид карточки для всех сотрудников
* «Мой вид» — личная настройка карточки сотрудника

Для каждого вида карточки можно настроить разделы, внутри раздела — перечень полей. Например, создать раздел «Информация об оплате» и вывести в нем поля «Сумма и валюта» и «Аванс», а поля, которые не относятся к оплате, вынести в другой раздел.

{% note warning "" %}

Развитие методов `crm.deal.details.configuration.*` остановлено. Для новой разработки используйте методы REST 3.0 [crm.deal.detailpagelayout.*](../../rest-v3/detail-page-layout/index.md).

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Представления CRM](https://helpdesk.bitrix24.ru/open/17914816/)

## Актуальная версия API

Методы `crm.deal.details.configuration.*` продолжают работать, оставляйте их только в существующих интеграциях.

#|
|| **Метод с остановленным развитием** | **Чем заменить** ||
|| `crm.deal.details.configuration.get` | [crm.deal.detailpagelayout.get](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-get-rest-v3.md) ||
|| `crm.deal.details.configuration.set` | [crm.deal.detailpagelayout.update](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-update-rest-v3.md) ||
|| `crm.deal.details.configuration.reset` | [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md) с `entityTypeId = 2`. Метода сброса в REST 3.0 нет ||
|| `crm.deal.details.configuration.forceCommonScopeForAll` | [crm.deal.detailpagelayout.setcommonforall](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-set-common-for-all-rest-v3.md). В отличие от `forceCommonScopeForAll`, не удаляет личные настройки пользователей ||
|#

## Как выбрать карточку

Методы `get`, `set` и `reset` работают с одной карточкой, ее задают три параметра. Без них вызов обращается к личной карточке текущего пользователя в воронке сделок по умолчанию. `forceCommonScopeForAll` принимает только `extras.dealCategoryId` и всегда работает с общим видом.

#|
|| **Параметр** | **Что задает** | **Значения** ||
|| `scope` | Представление карточки | `P` — «Мой вид». `C` — «Общий вид». По умолчанию — `P` ||
|| `userId` | Владельца личных настроек | Идентификатор пользователя из метода [user.get](../../../user/user-get.md). Нужен, только когда вы читаете или меняете личную карточку другого сотрудника ||
|| `extras.dealCategoryId` | Воронку сделок | Идентификатор воронки из метода [crm.category.list](../../universal/category/crm-category-list.md) с `entityTypeId = 2` или [crm.deal.category.list](../../rest-v3/categories/crm-entity-category-list-rest-v3.md) в REST 3.0 — идентификаторы совпадают. Если не указан, берется воронка по умолчанию ||
|#

## Из чего состоят настройки карточки

Настройки карточки — это массив разделов, в каждом из которых перечислены поля сделки. Метод `get` возвращает этот массив, метод `set` принимает его в параметре `data`. Схема раздела и поля — в описании метода [crm.deal.details.configuration.set](./crm-deal-details-configuration-set.md#section).

## Как начать работу в REST 3.0

1. Узнайте идентификатор воронки методом [crm.deal.category.list](../../rest-v3/categories/crm-entity-category-list-rest-v3.md). У воронки по умолчанию идентификатор `0`
2. Получите идентификатор общего вида методом [crm.deal.detailpagelayout.getcommonlayoutid](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-get-common-layout-id-rest-v3.md) или личного — методом [crm.deal.detailpagelayout.getpersonallayoutid](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-get-personal-layout-id-rest-v3.md)
3. Посмотрите текущую структуру вида методом [crm.deal.detailpagelayout.get](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-get-rest-v3.md) — он вернет разделы с полями
4. Измените разделы и сохраните их методом [crm.deal.detailpagelayout.update](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-update-rest-v3.md)
5. Примените общий вид для всех пользователей методом [crm.deal.detailpagelayout.setcommonforall](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-set-common-for-all-rest-v3.md)

## Связь карточки сделки с другими объектами

**Поля сделки.** Раздел карточки — это набор полей сделки, поэтому структура карточки собирается из их идентификаторов. Метод [crm.deal.fields](../crm-deal-fields.md) возвращает и системные, и пользовательские поля. Новое пользовательское поле, созданное методом [crm.deal.userfield.add](../user-defined-fields/crm-deal-userfield-add.md), тоже можно вывести в раздел — под именем с префиксом `UF_CRM_`.

**Воронки сделок.** У каждой воронки своя структура карточки: в воронке «Продажи» могут быть одни разделы и поля, в воронке «Сервисное обслуживание» — другие. Воронка выбирается параметром `extras.dealCategoryId`, поэтому настройку повторяют в каждой воронке, где она требуется.

**Пользователь.** Личная карточка принадлежит конкретному сотруднику. Чтобы обратиться к чужой личной карточке, передайте идентификатор сотрудника в параметре `userId`.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь — читать, менять и сбрасывать свою личную карточку, читать общий вид
> - пользователь с правом редактировать общий вид карточки сделки — менять и сбрасывать общий вид, применять его для всех
> - администратор CRM — читать, менять и сбрасывать личную карточку другого сотрудника

#|
|| **Метод** | **Описание** ||
|| [crm.deal.details.configuration.get](./crm-deal-details-configuration-get.md) | Возвращает настройки карточки сделки ||
|| [crm.deal.details.configuration.set](./crm-deal-details-configuration-set.md) | Устанавливает настройки карточки сделки ||
|| [crm.deal.details.configuration.reset](./crm-deal-details-configuration-reset.md) | Сбрасывает настройки карточки сделки ||
|| [crm.deal.details.configuration.forceCommonScopeForAll](./crm-deal-details-configuration-force-common-scope-for-all.md) | Применяет общий вид карточки сделки для всех пользователей и удаляет их личные настройки ||
|#
