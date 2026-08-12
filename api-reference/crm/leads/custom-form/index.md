# Управление карточками лидов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Группа методов `crm.lead.details.configuration.*` управляет настройками карточки для двух представлений:

* «Общий вид» — вид карточки для всех сотрудников
* «Мой вид» — личная настройка карточки сотрудника

Для каждого вида карточки можно настроить секции, внутри секции — перечень полей. Например создать секцию «Контактные данные» и вывести в ней поля «Телефон» и «Почта». Для полей, которые не относятся к контактным данным, создать другую секцию.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Представления CRM](https://helpdesk.bitrix24.ru/open/17914816/)

## Актуальная версия API

Развитие методов `crm.lead.details.configuration.*` остановлено. Для новой разработки используйте универсальные методы [crm.item.details.configuration.*](../../universal/item-details-configuration/index.md) и передавайте в них `entityTypeId: 1` — это идентификатор типа объекта «Лид». Параметр `entityTypeId` позволяет одной группой методов настраивать карточки любого объекта CRM.

#|
|| **Метод с остановленным развитием** | **Чем заменить** ||
|| `crm.lead.details.configuration.get` | [crm.item.details.configuration.get](../../universal/item-details-configuration/crm-item-details-configuration-get.md) ||
|| `crm.lead.details.configuration.set` | [crm.item.details.configuration.set](../../universal/item-details-configuration/crm-item-details-configuration-set.md) ||
|| `crm.lead.details.configuration.reset` | [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md) ||
|| `crm.lead.details.configuration.forceCommonScopeForAll` | [crm.item.details.configuration.forceCommonScopeForAll](../../universal/item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md) ||
|#

Методы `crm.lead.details.configuration.*` продолжают работать, оставляйте их только в существующих интеграциях.

## Как настроить карточку

1. Получите идентификаторы полей, которые нужно вывести в карточку, методом [crm.lead.fields](../crm-lead-fields.md). В настройках карточки используются те же имена, что и в ответе этого метода: `TITLE`, `STATUS_ID`, `PHONE` и другие.
2. Посмотрите текущую структуру карточки методом [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md) — она вернет список секций с вложенными полями.
3. Передайте новую структуру методом [crm.lead.details.configuration.set](./crm-lead-details-configuration-set.md). В параметре `data` перечислите секции, в `elements` каждой секции — поля.
4. Если результат не подошел, вернитесь к настройкам по умолчанию методом [crm.lead.details.configuration.reset](./crm-lead-details-configuration-reset.md).
5. Чтобы принудительно применить общий вид карточки ко всем сотрудникам и удалить их личные настройки, вызовите [crm.lead.details.configuration.forceCommonScopeForAll](./crm-lead-details-configuration-force-common-scope-for-all.md).

## Область настроек

Область настроек задает параметр `scope`:

#|
|| **Значение** | **Что настраивает** | **Что нужно передать дополнительно** ||
|| `P` | Личный вид карточки сотрудника. Значение по умолчанию | `userId` — идентификатор сотрудника. Если не передать, методы работают с настройками того, кто вызывает метод ||
|| `C` | Общий вид карточки для всех сотрудников | — ||
|#

От области зависят и права: свои личные настройки читает и меняет любой пользователь, а общие и чужие — только пользователь с правом «Разрешить изменять настройки» в CRM. Это одно общее право роли на весь модуль CRM, отдельно для лидов его выдать нельзя.

## Связь карточки лидов с другими объектами

**Пользователь.** Идентификатор пользователя `userId` используется при установке личных настроек карточки. Получить идентификатор пользователя можно с помощью метода [user.get](../../../user/user-get.md).

**Поля лида.** Идентификаторы полей используются при установке видимых полей в секции карточки. Получить идентификаторы системных и пользовательских полей лида можно с помощью метода [crm.lead.fields](../crm-lead-fields.md).

## Настройка карточки для простых и повторных лидов

Лиды могут быть двух типов: простые и повторные. Лид становится повторным, если у него заполнено поле «Клиент». У повторных лидов нет контактных полей, таких как «Телефон», «Почта», «Адрес» — эта информация хранится в связанных через поле «Клиент» контакте или компании.

Для карточек простых и повторных лидов настройки хранятся отдельно. Тип лида выбирает параметр `leadCustomerType` в объекте `extras`:

#|
|| **Значение** | **Карточка какого лида настраивается** ||
|| `1` | Простой лид ||
|| `2` | Повторный лид ||
|#

Если не передать `extras`, методы работают с карточкой простого лида.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.lead.details.configuration.set](./crm-lead-details-configuration-set.md) | Устанавливает настройки карточки лидов ||
|| [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md) | Получает настройки карточки лидов ||
|| [crm.lead.details.configuration.reset](./crm-lead-details-configuration-reset.md) | Сбрасывает настройки карточки лидов ||
|| [crm.lead.details.configuration.forceCommonScopeForAll](./crm-lead-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку лидов для всех пользователей ||
|#
