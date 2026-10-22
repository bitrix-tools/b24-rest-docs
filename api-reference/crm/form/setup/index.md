# Справочники для настройки CRM-формы: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Справочники показывают, из чего на конкретном Битрикс24 можно собрать CRM-форму: какие объекты CRM она может создавать, в какие воронки, из каких полей, на каком языке и с какими платежными системами. Значения из справочников подставляются в поля формы при вызове [crm.form.add](../crm-form-add.md), [crm.form.update](../crm-form-update.md) и [crm.form.validate](../crm-form-validate.md).

С помощью методов раздела можно:

- получить схемы создания объектов CRM, воронки сделок и смарт-процессов, языки, типы полей формы, платежные системы, права пользователя и лимит активных форм
- получить сценарии форм и категории, по которым они сгруппированы
- получить поля лида, контакта, компании, сделки, предложения или смарт-процесса, которые можно добавить в форму

Справочники только читают данные и ничего не меняют на Битрикс24.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как выбрать сценарий работы CRM-формы](https://helpdesk.bitrix24.ru/open/24821442/)

{% note info "" %}

Методы раздела относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

## Порядок использования при создании формы

1. Получите конфигурацию конструктора методом [crm.form.configuration.get](./crm-form-configuration-get.md). Проверьте `permissions.canEdit` и лимит `limits.activeForms`, выберите схему из `entitySchemes` и при необходимости воронку из `dealCategories` или `smartProcesses[].categories`
2. Если форма создается по готовой заготовке, выберите сценарий методом [crm.form.scenario.list](./crm-form-scenario-list.md). Для группировки сценариев используйте [crm.form.scenariocategory.list](./crm-form-scenariocategory-list.md)
3. Получите поля объектов схемы методом [crm.form.entityfield.list](./crm-form-entityfield-list.md). В фильтр передайте коды из `entitySchemes[].entityNames` выбранной схемы
4. Соберите конфигурацию формы и проверьте ее методом [crm.form.validate](../crm-form-validate.md), затем создайте форму методом [crm.form.add](../crm-form-add.md)

## Как значения справочников попадают в форму

#|
|| **Значение справочника** | **Поле формы** ||
|| `entitySchemes[].id` из [crm.form.configuration.get](./crm-form-configuration-get.md) | `crm.entityScheme` ||
|| `duplicateModes[].id` | `crm.duplicateMode` ||
|| `dealCategories[].id` | `crm.dealCategoryId` ||
|| `smartProcesses[].categories[].id` | `crm.smartProcessCategoryId` ||
|| `languages[].id` | `languageId` ||
|| `fieldTypes[].id` | `fields[].type` ||
|| `paySystems[].id` | `payment.disabledPaySystemsId` — платежные системы, которые форма не предлагает ||
|| `name` из [crm.form.entityfield.list](./crm-form-entityfield-list.md) | `fields[].name` ||
|| `id` из [crm.form.scenario.list](./crm-form-scenario-list.md) | `templateId` ||
|#

## Ограничения раздела

- Состав справочников зависит от Битрикс24: включенных лидов, смарт-процессов, воронок, платежных систем и пользовательских полей
- Метод [crm.form.entityfield.list](./crm-form-entityfield-list.md) требует фильтр по объектам CRM, за один запрос можно получить поля не больше 10 объектов
- Через REST пока нельзя добавить в форму поля с вариантами выбора: список, флажки, переключатели, а также товары и бронирование. Такие поля есть в ответе `crm.form.entityfield.list`, но методы записи формы их не принимают
- Методы справочников не поддерживают фильтр, сортировку и постраничную навигацию, кроме фильтра по объектам в `crm.form.entityfield.list`

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на просмотр CRM-форм. Методы `*.field.list` и `*.field.get` — любой пользователь

### Конфигурация конструктора

#|
|| **Метод** | **Описание** ||
|| [crm.form.configuration.get](./crm-form-configuration-get.md) | Возвращает схемы объектов CRM, воронки, языки, типы полей, платежные системы, права пользователя и лимит активных форм ||
|| [crm.form.configuration.field.list](./crm-form-configuration-field-list.md) | Возвращает список полей конфигурации конструктора ||
|| [crm.form.configuration.field.get](./crm-form-configuration-field-get.md) | Возвращает описание поля конфигурации конструктора ||
|#

### Сценарии

#|
|| **Метод** | **Описание** ||
|| [crm.form.scenario.list](./crm-form-scenario-list.md) | Возвращает сценарии CRM-форм ||
|| [crm.form.scenario.field.list](./crm-form-scenario-field-list.md) | Возвращает список полей сценария ||
|| [crm.form.scenario.field.get](./crm-form-scenario-field-get.md) | Возвращает описание поля сценария ||
|#

### Категории сценариев

#|
|| **Метод** | **Описание** ||
|| [crm.form.scenariocategory.list](./crm-form-scenariocategory-list.md) | Возвращает категории сценариев CRM-форм ||
|| [crm.form.scenariocategory.field.list](./crm-form-scenariocategory-field-list.md) | Возвращает список полей категории сценариев ||
|| [crm.form.scenariocategory.field.get](./crm-form-scenariocategory-field-get.md) | Возвращает описание поля категории сценариев ||
|#

### Поля объектов CRM

#|
|| **Метод** | **Описание** ||
|| [crm.form.entityfield.list](./crm-form-entityfield-list.md) | Возвращает поля объектов CRM, из которых можно собрать форму ||
|| [crm.form.entityfield.field.list](./crm-form-entityfield-field-list.md) | Возвращает список полей описания поля объекта CRM ||
|| [crm.form.entityfield.field.get](./crm-form-entityfield-field-get.md) | Возвращает описание поля из справочника полей объектов CRM ||
|#

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../crm-form-add.md)
- [{#T}](../crm-form-validate.md)
- [{#T}](../data-types.md)
