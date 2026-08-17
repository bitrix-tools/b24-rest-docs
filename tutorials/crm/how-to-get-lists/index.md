# Получение списков в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Списки в CRM — это выборки данных для интеграций: дубликаты клиентов по телефону и email, адреса, дела по сделкам, стадии и воронки, элементы на выбранной стадии и поставщики для складского учета.

Сценарий — это последовательность запросов для одной задачи. В нем описан порядок вызова методов, приведен пример кода и указан результат.

Таблицы ниже помогают подобрать сценарий по задаче, основным методам и результату. Сценарии создания объектов CRM собраны в статьях [Добавить данные](../how-to-add-crm-objects/index.md), изменения данных — в статьях [Редактировать данные](../how-to-edit-crm-objects/index.md).

## Что нужно для работы

**Scope**. Всем сценариям нужен scope [`crm`](../../../api-reference/scopes/permissions.md). Сценариям, которые выводят ответственных сотрудников, дополнительно нужен доступ к данным пользователей — методы [user.current](../../../api-reference/user/user-current.md) и [user.get](../../../api-reference/user/user-get.md) работают со scope [`user_brief`](../../../api-reference/scopes/permissions.md), `user_basic` или `user`.

**Права**. Пользователю нужно право читать элементы CRM, которые попадают в выборку. Методы возвращают только доступные пользователю элементы и воронки, поэтому у разных пользователей один и тот же запрос дает разный результат.

**Страницы результата**. Списочные методы возвращают до 50 записей за запрос. Остальные страницы получают параметром `start` — формула расчета приведена на странице метода, например [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md).

Точные права и scope конкретного сценария указаны в шапке его страницы.

## Как начать работу

1. Выберите сценарий в таблице подходящей группы
2. Создайте [входящий вебхук](../../../local-integrations/local-webhooks.md#входящий-вебхук) или приложение с нужными scope и проверьте права пользователя
3. Выполните методы в порядке, описанном в сценарии
4. Используйте полученные идентификаторы в следующих запросах CRM или складского учета

## Находите клиентов и их данные

**Дубликаты**. Один клиент может быть заведен в CRM несколько раз — лидом, контактом и компанией. Метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) ищет совпадения по телефону или email и возвращает идентификаторы, сгруппированные по типам объектов. Сами данные затем получают списочными методами [лидов](../../../api-reference/crm/leads/index.md), [контактов](../../../api-reference/crm/contacts/index.md) и [компаний](../../../api-reference/crm/companies/index.md).

**Ветка методов**. Развитие методов `crm.lead.*`, `crm.contact.*`, `crm.company.*` и `crm.deal.*` остановлено. В новой разработке те же выборки получают [универсальным методом](../../../api-reference/crm/universal/index.md) [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с нужным `entityTypeId`. Имена полей в ветках различаются: объектные методы работают с `UPPER_CASE`, например `STATUS_ID`, универсальные — с `camelCase`, например `statusId`.

**Адреса**. Адрес клиента хранится двумя независимыми способами: в [реквизитах](../../../api-reference/crm/requisites/index.md) контакта или компании и в пользовательском поле типа `address`. Способы не связаны: адрес из реквизитов не виден в пользовательском поле, а адрес из пользовательского поля — методам `crm.address.*`. Если неизвестно, каким способом заполнен адрес у конкретного клиента, проверяют оба. У лида реквизитов нет, его адрес привязан к самому лиду.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как найти дубликаты в CRM по телефону и email](./search-by-phone-and-email.md) | [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md), [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md), [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md), [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) | Таблица дубликатов с типом объекта, названием, телефоном и email ||
|| [Как получить адрес клиента из CRM](./how-to-get-address.md) | [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md), [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md) | Адреса клиента из реквизитов и из пользовательского поля ||
|#

## Разбирайте стадии и воронки

Стадия элемента CRM хранится идентификатором, а не названием. Соотнести их можно через [справочники](../../../api-reference/crm/status/index.md) — системные поля типа «список».

**Код стадий**. Метод [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) отбирает стадии по коду `ENTITY_ID`, например: `STATUS` — для лидов, `DEAL_STAGE` — для основной воронки сделок, `DEAL_STAGE_{categoryId}` — для дополнительной, `DYNAMIC_{entityTypeId}_STAGE_{categoryId}` — для смарт-процессов.

**Воронки**. Идентификатор воронки возвращает метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) по `entityTypeId` — [идентификатору типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Из этого идентификатора собирают код стадий для `crm.status.list`.

**Семантика**. Семантика стадии — это состояние элемента: в работе, успешно завершен или неуспешно завершен. Метод возвращает ее в поле `EXTRA.SEMANTICS`: `process` — в работе, `success` — успешно завершен, `failure` и `apology` — неуспешно завершен. В поле `SEMANTICS` верхнего уровня завершающие стадии отмечены значениями `S` и `F`, у стадий в работе оно пустое. По семантике отделяют активные элементы от закрытых, даже когда названия стадий в воронках отличаются.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как получить список стадий с семантикой для объектов CRM](./how-to-get-stages-with-semantics.md) | [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) | Таблица стадий объекта CRM с названиями и семантикой ||
|| [Как получить воронки сделок со стадиями и семантикой](./how-to-get-deal-funnels.md) | [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) | Таблица стадий с семантикой для каждой воронки сделок ||
|| [Как отфильтровать элементы по названию стадии](./how-to-get-elements-by-stage-filter.md) | [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.status.list](../../../api-reference/crm/status/crm-status-list.md), [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) | Список элементов CRM, которые находятся на выбранной стадии ||
|#

## Собирайте дела по элементам CRM

Дело — запись в таймлайне карточки: звонок, встреча, письмо или запланированное действие. Метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) отбирает дела по паре `OWNER_TYPE_ID` и `OWNER_ID`, поэтому сначала получают идентификаторы элементов CRM, а затем передают их в фильтр дел. Значения `OWNER_TYPE_ID` возвращает метод [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

Ответственный в деле хранится идентификатором пользователя. Имя и фамилию для отчета получают методом [user.get](../../../api-reference/user/user-get.md).

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как получить список дел из сделок](./get-activity-list-by-deals.md) | [user.current](../../../api-reference/user/user-current.md), [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md), [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md), [user.get](../../../api-reference/user/user-get.md) | Таблица дел по сделкам сотрудника со сроками и ответственными ||
|#

## Готовьте данные для складского учета

Поставщик — это не отдельный объект CRM, а контакт или компания в системной категории: `CATALOG_CONTRACTOR_CONTACT` для контакта и `CATALOG_CONTRACTOR_COMPANY` для компании. Идентификатор такой категории получают методом [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с фильтром по коду, а затем отбирают по нему элементы.

Полученные идентификаторы передают в метод складского учета [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md), чтобы связать поставщика с документом склада.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как получить список поставщиков](./how-to-get-contractors.md) | [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) | Список контактов или компаний с признаком поставщика ||
|#

## Продолжите изучение

- [{#T}](../how-to-add-crm-objects/index.md)
- [{#T}](../how-to-edit-crm-objects/index.md)
- [{#T}](../../../api-reference/crm/universal/index.md)
- [{#T}](../../../api-reference/crm/status/index.md)
- [{#T}](../../../api-reference/crm/data-types.md)
