# Как добавить данные в CRM: обзор кейсов и сценариев

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Раздел помогает выбрать сценарий для интеграции с CRM. Материалы описывают создание объектов и добавление связанных данных: файлов, реквизитов, дел, документов и настроек смарт-процессов.

По таблицам можно подобрать сценарий по объекту CRM, результату интеграции и основным REST-методам.

## Выберите тип объекта

Начните с выбора базового объекта. Выбор зависит от того, на каком этапе взаимодействия находится клиент и откуда пришли данные.

**Лид**. Подходит для первичных обращений: заявок с сайта, сообщений из чатов или холодных контактов. Если в портале используется классический режим CRM и обращение еще не квалифицировано, начинайте с лида.

**Контакт и компания**. Используйте эти объекты, когда клиент уже идентифицирован. Контакт описывает человека, компания — организацию. Их часто создают в паре.

**Сделка**. Необходима для запуска коммерческого процесса. Сделку обычно создают вместе с компанией и реквизитами, если цель обращения — продажа.

### Сценарии по основным объектам

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Добавить лид через веб-форму](./how-to-add-lead.md) | [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) | ID нового лида ||
|| [Добавить повторный лид](./how-to-add-repeat-lead.md) | [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md), [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md), [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md) | ID нового повторного лида после проверки дублей ||
|| [Добавить контакт через веб-форму](./how-to-add-contact.md) | [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md) | ID нового контакта ||
|| [Добавить компанию через веб-форму](./how-to-add-company.md) | [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md) | ID новой компании ||
|| [Добавить сделку и компанию с реквизитами](./how-to-add-deal-with-choice-of-requisite.md) | [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md), [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md) | ID компании, реквизита и сделки ||
|#

## Работайте со связанными данными

Реквизиты, адреса, файлы и поставщики хранятся отдельно от основной карточки CRM. Их создают независимо, а затем привязывают к лиду, контакту, компании или сделке.

**Реквизиты и адреса**. Банковские реквизиты и юридические адреса хранятся отдельно от контактов и компаний. Сначала получите шаблоны реквизитов, затем создайте сам объект и привяжите к нему адрес.

**Файлы**. Файлы прикрепляются через пользовательские поля. Перед созданием объекта определите, в какое поле будет загружен файл.

**Поставщики**. Поставщик — отдельный тип объекта для закупок и складских документов. Для добавления поставщика используйте универсальные методы CRM и каталога.

### Сценарии по связанным данным

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Добавить лид с файлами через веб-форму](./how-to-add-lead-with-files.md) | [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md), [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md) | ID лида с заполненными файловыми полями ||
|| [Добавить контакт с реквизитами через веб-форму](./how-to-add-contact-with-requisite.md) | [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md), [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) | ID контакта, реквизита и адреса ||
|| [Добавить компанию с реквизитами через веб-форму](./how-to-add-company-with-requisite.md) | [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md), [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) | ID компании, реквизита и адреса ||
|| [Как создать поставщика в CRM](./how-to-add-contractor.md) | [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md), [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md), [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md) | ID поставщика для складских документов ||
|#

## Добавляйте активности и документы

Фиксируйте действия, которые должны остаться в карточке клиента: встречи, письма, задачи и документы.

**Дела (активности)**. Календарные события, письма и задачи сохраняются в CRM как дела. При создании указывайте тип владельца и ID объекта CRM.

**Учет режима CRM**. Режим CRM определяет, куда попадет новое обращение: в лид или сразу в сделку. Если интеграция должна работать в разных порталах, проверяйте режим CRM перед созданием дела.

**Документы**. Генерация документов происходит по шаблонам. Сначала настройте нумератор и загрузите шаблон, затем создавайте документ, привязанный к объекту CRM.

### Сценарии по делам и документам

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Добавить дело в новый лид или сделку в зависимости от режима CRM](./how-to-add-objects-with-crm-mode.md) | [crm.settings.mode.get](../../../api-reference/crm/crm-settings-mode-get.md), [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md),
[crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md) | ID дела, связанного с лидом или сделкой ||
|| [Добавить событие календаря для работы с клиентами](./how-to-add-activity-to-contact.md) | [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md), [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) | ID дела типа «Событие» ||
|| [Как отправить письмо клиенту от имени сотрудника](./how-to-send-email.md) | [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md), [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) | ID дела типа «Письмо» ||
|| [Как добавить шаблон и создать документ на его основе](./how-to-generate-documents.md) | [crm.documentgenerator.numerator.add](../../../api-reference/crm/document-generator/numerator/crm-document-generator-numerator-add.md), [crm.documentgenerator.template.add](../../../api-reference/crm/document-generator/templates/crm-document-generator-template-add.md), [crm.documentgenerator.document.add](../../../api-reference/crm/document-generator/documents/crm-document-generator-document-add.md) | ID документа и ссылка на файл ||
|#

## Настраивайте смарт-процессы

Если стандартных объектов CRM недостаточно, используйте смарт-процессы. Это пользовательские типы CRM с собственными полями, воронками и стадиями.

**Тип объекта (entityTypeId)**. Ключевой параметр для работы со смарт-процессами. Получите его перед вызовом методов API, настройкой полей или комментариев.

**Воронки и стадии**. Настройте процесс прохождения этапов. Создайте воронку и добавьте в нее необходимые статусы.

**Пользовательские поля**. Расширяйте карточку смарт-процесса своими полями. Настраивайте тип поля, формат чисел, варианты списков и параметры отображения.

### Сценарии по смарт-процессам

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Как добавить комментарий в таймлайн смарт-процесса](./how-to-add-comment-to-spa.md) | [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md), [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md), [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) | ID записи таймлайна ||
|| [Как создать пользовательское поле в смарт-процессе](./how-to-add-user-field-to-spa.md) | [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md), [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-add.md) | ID пользовательского поля ||
|| [Как настроить округление для пользовательского поля типа «Число»](./how-to-add-precision-to-user-field.md) | [crm.userfield.settings.fields](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-settings-fields.md), [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md), [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig-update.md) | Обновленные настройки числового поля ||
|| [Как создать новую воронку со стадиями в смарт-процессе](./how-to-add-category-to-spa.md) | [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md), [crm.category.add](../../../api-reference/crm/universal/category/crm-category-add.md), [crm.status.add](../../../api-reference/crm/status/crm-status-add.md) | ID воронки и созданных стадий ||
|#
