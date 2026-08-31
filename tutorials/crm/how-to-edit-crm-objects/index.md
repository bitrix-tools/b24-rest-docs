# Редактирование данных в CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Редактирование данных в CRM — это изменение значений, которые уже сохранены в карточках и связанных объектах: полей лидов, контактов, компаний и сделок, телефонов и email, привязок дел и даты оплаты в поле сделки.

Сценарий — это последовательность запросов для одной задачи. В нем описан порядок вызова методов, приведен пример кода и указан результат.

Таблицы ниже помогают подобрать сценарий по задаче, основным методам и результату. Сценарии создания объектов CRM собраны в статьях [Добавить данные](../how-to-add-crm-objects/index.md), выборки и списки — в статьях [Получить списки](../how-to-get-lists/index.md).

## Что нужно для работы

**Scope**. Всем сценариям нужен scope [`crm`](../../../api-reference/scopes/permissions.md). Сценариям с формами редактирования дополнительно нужен доступ к данным пользователей — метод [user.get](../../../api-reference/user/user-get.md) работает со scope [`user_brief`](../../../api-reference/scopes/permissions.md), `user_basic` или `user`.

**Права**. Пользователю нужно право изменять элемент CRM, с которым работает сценарий. Формам редактирования дополнительно нужен доступ к настройкам CRM.

Точные права и scope конкретного сценария указаны в шапке его страницы.

## Как начать работу

1. Выберите сценарий в таблице подходящей группы
2. Создайте [входящий вебхук](../../../local-integrations/local-webhooks.md#incoming-webhook) или приложение с нужными scope и проверьте права пользователя
3. Получите идентификаторы, с которых начинается сценарий: элемента CRM, дела, пользовательского поля или оплаты
4. Выполните методы в порядке, описанном в сценарии

## Редактируйте карточки объектов CRM

Форму редактирования строят по описанию полей, а не по заранее заданному списку. Генератор получает поля методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и подбирает элемент HTML-формы под тип каждого поля, поэтому пользовательские поля появляются в форме без изменения кода.

**Тип объекта**. Универсальные методы `crm.item.*` определяют элемент CRM парой значений: `entityTypeId` — тип объекта и `id` — идентификатор самого элемента. Для типа объекта используют значения `1` — лид, `2` — сделка, `3` — контакт, `4` — компания. Полный список приведен в таблице [Тип объекта CRM](../../../api-reference/crm/data-types.md#object_type).

**Справочники**. Служебные коды в полях заменяют на читаемые названия дополнительными методами: [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) возвращает стадии и другие списочные поля, [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — воронки, [crm.currency.list](../../../api-reference/crm/currency/crm-currency-list.md) — валюты, [user.get](../../../api-reference/user/user-get.md) — сотрудников.

**Ветка методов**. Сценарии карточек написаны на [универсальных методах](../../../api-reference/crm/universal/index.md) `crm.item.*`: они работают со всеми объектами CRM, включая смарт-процессы. Развитие методов `crm.lead.*`, `crm.contact.*`, `crm.company.*` и `crm.deal.*` остановлено — они продолжают работать, и часть сценариев ниже вызывает их, но для новой разработки выбирайте `crm.item.*`. Методы пользовательских полей, например `crm.deal.userfield.*`, работают по-прежнему.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как сделать свою карточку редактирования лида](./how-to-generate-edit-form-for-lead.md) | [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с `entityTypeId = 1` | Веб-форма, которая создает лид или обновляет существующий ||
|| [Как сделать свою карточку редактирования контакта](./how-to-make-contact-edit-card.md) | [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с `entityTypeId = 3` | Веб-форма, которая создает контакт или обновляет существующий ||
|| [Как сделать свою карточку редактирования компании](./how-to-generate-edit-form-for-company.md) | [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с `entityTypeId = 4` | Веб-форма, которая создает компанию или обновляет существующую ||
|| [Как сделать свою карточку редактирования сделки](./how-to-generate-edit-form-for-deal.md) | [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.status.list](../../../api-reference/crm/status/crm-status-list.md), [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с `entityTypeId = 2` | Веб-форма с выбором воронки и стадии, которая создает сделку или обновляет существующую ||
|#

## Изменяйте телефоны и email

Телефоны и адреса электронной почты хранятся в мультиполе `fm` — наборе записей типа [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield). У каждой записи есть свой `id`, который выдает Битрикс24 при создании.

Найти запись по тексту значения нельзя, поэтому объект сначала читают и узнают идентификаторы, а потом отправляют изменения. В методе обновления операцию задает ключ элемента в объекте `fm`: числовой `id` меняет запись, тот же `id` с пустым `value` ее удаляет, а ключи `n0`, `n1` добавляют новые.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как изменить или удалить номера телефонов и email](./how-to-change-email-or-phone.md) | [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) | Обновленный или очищенный список телефонов и email в карточке контакта ||
|#

## Автоматически заполняйте зависимые поля

Зависимое поле можно обновлять после сохранения карточки. Приложение получает событие изменения, читает актуальные значения полей, проверяет условие и записывает новое значение в другое поле.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как автоматически заполнить зависимое поле CRM после изменения основного поля](./how-to-autofill-dependent-field.md) | [event.bind](../../../api-reference/events/event-bind.md), [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) | Значение зависимого поля обновляется после сохранения сделки ||
|#

## Переносите дела и меняйте сроки

Дело — запись в таймлайне карточки: звонок, встреча, письмо или запланированное действие. С элементами CRM дела связаны привязками. У одного дела может быть несколько привязок, но последнюю удалить нельзя — метод вернет ошибку `LAST_BINDING_CANNOT_BE_DELETED`.

**Перенос внутри одного типа**. Если исходный и целевой объекты одного типа, привязку переносит один метод [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md).

**Перенос между разными типами**. Метод `crm.activity.binding.move` для этого не подходит: он вернет ошибку `SOURCE_AND_TARGET_ENTITY_TYPES_ARE_NOT_EQUAL_ERROR`. Такой перенос собирают из двух операций — сначала добавляют новую привязку, затем удаляют старую.

**Сроки**. Крайний срок и напоминания меняет метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md). Закрытое дело он не обновляет и возвращает ошибку `CAN_NOT_UPDATE_COMPLETED_TODO`, поэтому дело сначала находят с фильтром `COMPLETED: 'N'`.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как перенести запланированное дело на другую дату](./how-to-change-date-in-activity.md) | [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md), [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) | Новый крайний срок и напоминания у запланированного дела ||
|| [Как перенести дело между элементами одного типа](./how-to-move-activity.md) | [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md), [crm.activity.binding.move](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-move.md) | Дело в таймлайне другого элемента того же типа ||
|| [Как перенести дело из одного типа объекта в другой](./how-to-move-activity-between-objects.md) | [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md), [crm.activity.binding.add](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-add.md), [crm.activity.binding.delete](../../../api-reference/crm/timeline/activities/binding/crm-activity-binding-delete.md) | Дело в таймлайне объекта другого типа, например из лида в компанию ||
|#

## Сохраняйте дату оплаты в поле сделки

Дата платежа хранится в документе оплаты, а не в сделке. Ее переносят в пользовательское поле сделки, когда дата нужна внешней системе, отчету BI-конструктора, роботу или бизнес-процессу.

Пользовательское поле создают заранее в настройках CRM. Его идентификатор в каждом Битрикс24 свой, поэтому поле находят по названию: метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) возвращает состав полей сделки, где ключ — идентификатор вида `ufCrm_*`, а `title` — название поля в карточке.

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как сохранить дату оплаты в поле сделки](./how-to-set-paid-date-to-deal.md) | [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md), [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md), [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) | Дата оплаты в пользовательском поле сделки ||
|#

## Продолжите изучение

- [{#T}](../how-to-add-crm-objects/index.md)
- [{#T}](../how-to-get-lists/index.md)
- [{#T}](../../../api-reference/crm/universal/index.md)
- [{#T}](../../../api-reference/crm/timeline/activities/binding/index.md)
- [{#T}](../../../api-reference/crm/data-types.md)
