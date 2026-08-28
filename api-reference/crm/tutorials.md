# Типовые кейсы использования REST API в CRM и туториалы

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Справочник CRM описывает отдельные методы, а туториалы показывают, как собрать из них рабочий сценарий: в каком порядке вызывать методы, какие идентификаторы передавать между запросами и что проверить в результате.

Туториалы сгруппированы по пяти направлениям. Выберите направление по задаче, а внутри — туториал по конкретному случаю. Обзор направлений с таблицей частых сценариев собран на странице [{#T}](../../tutorials/crm/index.md).

> Быстрый переход: [все сценарии](#choose-tutorial)
>
> Пользовательская документация: [Как начать работать с CRM в Битрикс24](https://helpdesk.bitrix24.ru/open/26035204/)

## Сценарии по направлениям {#choose-tutorial}

### Добавить данные

Сценарии создают лиды, контакты, компании, сделки, дела, документы и элементы смарт-процессов, а также привязывают к ним реквизиты, адреса и товарные позиции. Основные группы методов: [crm.lead.*](./leads/index.md), [crm.contact.*](./contacts/index.md), [crm.company.*](./companies/index.md), [crm.deal.*](./deals/index.md), [crm.item.*](./universal/index.md), [дела](./timeline/activities/index.md) и [реквизиты](./requisites/index.md). Обзор направления — [{#T}](../../tutorials/crm/how-to-add-crm-objects/index.md).

#|
|| **Если нужно** | **Откройте** ||
|| Принять заявку с формы сайта и создать лид | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-lead.md) ||
|| Создать лид по клиенту, который уже обращался | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-repeat-lead.md) ||
|| Создать контакт по данным с формы сайта | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact.md) ||
|| Создать компанию по данным с формы сайта | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-company.md) ||
|| Создать сделку и компанию с выбором реквизитов | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-deal-with-choice-of-requisite.md) ||
|| Принять заявку с вложенными файлами | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-lead-with-files.md) ||
|| Создать контакт вместе с реквизитами и адресом | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact-with-requisite.md) ||
|| Создать компанию вместе с реквизитами и адресом | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-company-with-requisite.md) ||
|| Завести поставщика для складских документов | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-contractor.md) ||
|| Создать дело с учетом режима CRM — простого или классического | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-objects-with-crm-mode.md) ||
|| Запланировать встречу или событие календаря по клиенту | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-activity-to-contact.md) ||
|| Отправить письмо клиенту от имени сотрудника | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md) ||
|| Собрать документ по шаблону — счет, договор или акт | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md) ||
|| Написать комментарий в таймлайн смарт-процесса | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-comment-to-spa.md) ||
|| Добавить свое поле в смарт-процесс | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md) ||
|| Задать округление числового поля | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-precision-to-user-field.md) ||
|| Создать воронку и стадии в смарт-процессе | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md) ||
|| Добавить в объект CRM товары со скидками и налогами | [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-product-binding.md) ||
|#

### Редактировать данные

Сценарии обновляют поля карточки, телефоны и email, переносят дела между объектами и записывают дату оплаты в поле сделки. Основные группы методов: [crm.item.*](./universal/index.md), [crm.lead.*](./leads/index.md), [crm.contact.*](./contacts/index.md), [crm.company.*](./companies/index.md), [crm.deal.*](./deals/index.md) и [дела](./timeline/activities/index.md). Обзор направления — [{#T}](../../tutorials/crm/how-to-edit-crm-objects/index.md).

#|
|| **Если нужно** | **Откройте** ||
|| Дать сотруднику веб-форму для создания и правки лида | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-generate-edit-form-for-lead.md) ||
|| Дать веб-форму для создания и правки контакта | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-make-contact-edit-card.md) ||
|| Дать веб-форму для создания и правки компании | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-generate-edit-form-for-company.md) ||
|| Дать веб-форму для сделки с выбором воронки и стадии | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-generate-edit-form-for-deal.md) ||
|| Изменить или удалить телефон и email клиента | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md) ||
|| Сдвинуть срок и напоминания у запланированного дела | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-change-date-in-activity.md) ||
|| Перенести дело в другой элемент того же типа | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity.md) ||
|| Перенести дело в объект другого типа | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md) ||
|| Перенести дату из платежа в поле сделки | [{#T}](../../tutorials/crm/how-to-edit-crm-objects/how-to-set-paid-date-to-deal.md) ||
|#

### Получить списки

Сценарии находят дубли, получают дела, стадии, воронки, адреса и поставщиков, фильтруют элементы по стадии. Основные группы методов: [crm.duplicate.*](./duplicates/index.md), [crm.status.*](./status/index.md), [crm.category.*](./universal/category/index.md), [crm.item.*](./universal/index.md) и [реквизиты](./requisites/index.md). Обзор направления — [{#T}](../../tutorials/crm/how-to-get-lists/index.md).

#|
|| **Если нужно** | **Откройте** ||
|| Проверить перед созданием, есть ли уже такой клиент в CRM | [{#T}](../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md) ||
|| Получить адрес клиента из реквизитов | [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-address.md) ||
|| Получить стадии объекта вместе с их семантикой | [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-stages-with-semantics.md) ||
|| Получить воронки сделок со стадиями | [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-deal-funnels.md) ||
|| Отобрать элементы, которые стоят на нужной стадии | [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md) ||
|| Собрать дела по сделкам сотрудника | [{#T}](../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md) ||
|| Отобрать контакты и компании с признаком поставщика | [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-contractors.md) ||
|#

### Сквозная аналитика

Сценарии передают источник обращения и маршрут клиента в CRM через UTM-поля, поле `TRACE` или отдельный трейс. Основные группы методов: [CRM-трекинг](./tracking/index.md) и методы создания объектов CRM. Обзор направления — [{#T}](../../tutorials/crm/how-to-use-analitycs/index.md).

#|
|| **Если нужно** | **Откройте** ||
|| Выбрать способ передачи данных — UTM-поля, `TRACE` или отдельный трейс | [{#T}](../../tutorials/crm/how-to-use-analitycs/info-to-analitics.md) ||
|| Передать источник обращения при создании лида | [{#T}](../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-lead.md) ||
|| Связать контакт и сделку с одним трейсом | [{#T}](../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-contact.md) ||
|#

### Виджеты в CRM

Сценарии встраивают интерфейс приложения в карточку CRM — через пользовательское поле или отдельную вкладку. Основные группы методов: [виджеты](../widgets/index.md) и [пользовательские типы полей](./universal/user-defined-fields/index.md). Обзор направления — [{#T}](../../tutorials/crm/crm-widgets/index.md).

#|
|| **Если нужно** | **Откройте** ||
|| Показать приложение внутри поля карточки лида | [{#T}](../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md) ||
|| Добавить в карточку CRM свою вкладку | [{#T}](../../tutorials/crm/crm-widgets/widget-as-detail-tab.md) ||
|#

## Продолжите изучение

- [{#T}](../../tutorials/index.md)
- [{#T}](./index.md)