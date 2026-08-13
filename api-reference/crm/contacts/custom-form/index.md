# Управление карточками контактов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Группа методов `crm.contact.details.configuration.*` управляет настройками карточки [контакта](../index.md) для двух представлений:

* «Общий вид» — вид карточки для всех сотрудников
* «Мой вид» — личная настройка карточки сотрудника

Для каждого вида карточки можно настроить секции, внутри секции — перечень полей. Например создать секцию «Контактные данные» и вывести в ней поля «Телефон» и «Почта». Для полей, которые не относятся к контактным данным, создать другую секцию.

{% note warning "" %}

Развитие методов `crm.contact.details.configuration.*` остановлено. Для новой разработки используйте универсальные методы [crm.item.details.configuration.*](../../universal/item-details-configuration/index.md) с `entityTypeId = 3`.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Представления CRM](https://helpdesk.bitrix24.ru/open/17914816/)

## Актуальная версия API

Карточка контакта — частный случай карточки объекта CRM, поэтому ею управляют универсальные методы [crm.item.details.configuration.*](../../universal/item-details-configuration/index.md). У них есть дополнительный параметр `entityTypeId` — идентификатор типа объекта. Для карточки контакта передавайте `entityTypeId = 3`. Методы `crm.contact.details.configuration.*` продолжают работать, оставляйте их только в существующих интеграциях.

#|
|| **Метод с остановленным развитием** | **Чем заменить** ||
|| `crm.contact.details.configuration.get` | [crm.item.details.configuration.get](../../universal/item-details-configuration/crm-item-details-configuration-get.md) ||
|| `crm.contact.details.configuration.set` | [crm.item.details.configuration.set](../../universal/item-details-configuration/crm-item-details-configuration-set.md) ||
|| `crm.contact.details.configuration.reset` | [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md) ||
|| `crm.contact.details.configuration.forceCommonScopeForAll` | [crm.item.details.configuration.forceCommonScopeForAll](../../universal/item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md) ||
|#

## Какой вид карточки настраивает метод

Вид карточки выбирает параметр `scope`, а конкретного сотрудника — параметр `userId`. По умолчанию `scope` равен `P`, то есть методы работают с личными настройками вызывающего пользователя.

#|
|| **С каким видом работаете** | **Что передать** | **Кто может читать** | **Кто может изменять** ||
|| «Общий вид» — карточка для всех сотрудников | `scope = C` | Любой пользователь | Администратор CRM ||
|| «Мой вид» — своя личная карточка | `scope = P` без `userId` | Любой пользователь | Любой пользователь ||
|| «Мой вид» другого сотрудника | `scope = P` и `userId` этого сотрудника | Администратор CRM | Администратор CRM ||
|#

Администратор CRM — пользователь с правом «Разрешить изменять настройки». Это общее право на весь модуль CRM, отдельно для контактов оно не выдается.

## Как начать работу

1. Получите идентификаторы полей контакта методом [crm.contact.fields](../crm-contact-fields.md) — их вы будете перечислять в секциях карточки.
2. Прочитайте текущую конфигурацию методом [crm.contact.details.configuration.get](./crm-contact-details-configuration-get.md), чтобы увидеть готовую структуру секций и не собирать ее с нуля.
3. Запишите новую конфигурацию методом [crm.contact.details.configuration.set](./crm-contact-details-configuration-set.md): секции передаются массивом, у каждой секции есть свой набор полей.
4. Отмените изменения методом [crm.contact.details.configuration.reset](./crm-contact-details-configuration-reset.md), если нужно вернуть карточку к настройкам по умолчанию.
5. Примените общий вид ко всем сотрудникам методом [crm.contact.details.configuration.forceCommonScopeForAll](./crm-contact-details-configuration-force-common-scope-for-all.md) — он удаляет личные настройки пользователей.

## Связь карточки контактов с другими объектами

**Пользователь.** Идентификатор пользователя `userId` используется при работе с личными настройками карточки. Получить идентификатор пользователя можно с помощью метода [user.get](../../../user/user-get.md).

**Поля контакта.** Идентификаторы полей используются при установке видимых полей в секции карточки. Получить идентификаторы системных и пользовательских полей контакта можно с помощью метода [crm.contact.fields](../crm-contact-fields.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода — свои личные настройки читает и меняет любой пользователь, общий вид может прочитать любой пользователь, а изменение общего вида, работа с чужими личными настройками и метод `forceCommonScopeForAll` доступны только администратору CRM

#|
|| **Метод** | **Описание** ||
|| [crm.contact.details.configuration.get](./crm-contact-details-configuration-get.md) | Возвращает настройки карточки контакта ||
|| [crm.contact.details.configuration.set](./crm-contact-details-configuration-set.md) | Устанавливает настройки карточки контакта ||
|| [crm.contact.details.configuration.reset](./crm-contact-details-configuration-reset.md) | Сбрасывает настройки карточки контакта ||
|| [crm.contact.details.configuration.forceCommonScopeForAll](./crm-contact-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку контакта для всех пользователей ||
|#
