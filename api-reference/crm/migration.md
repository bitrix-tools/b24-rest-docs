# Переход на новые методы CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Эта страница помогает перенести интеграцию с методов CRM предыдущей версии API на REST 3.0: найти аналог каждого метода, учесть, чего в REST 3.0 пока нет, и обновить формат запросов и ответов.

{% note info "" %}

Методы обеих версий работают одновременно и меняют одни и те же данные. Интеграцию можно переводить по частям: вызывать часть методов по адресу `/rest/api/`, а остальные — по адресу `/rest/`.

{% endnote %}

## Порядок перехода {#migration-steps}

1. Найдите аналоги методов, которые использует интеграция, по правилам из раздела [Как найти аналог метода](#methods). Если задачи нет в REST 3.0, оставьте этот вызов в предыдущей версии: такие задачи перечислены в разделе [Чего пока нет в REST 3.0](#previous-only)
2. Замените адрес вызова: `/rest/` на `/rest/api/`. Имя метода для сделок, лидов, контактов, компаний и предложений остается тем же, для смарт-процессов и счетов меняется на `crm.<тип>.<действие>`, например `crm.smartprocess1038.add`
3. Переименуйте поля в `camelCase`: `TITLE` → `title`, `STAGE_ID` → `stageId`. Названия полей каждого типа есть на страницах полей, например [Поля сделки](./rest-v3/items/fields-deal.md)
4. Перечислите нужные поля в параметре `select`. Без него методы `get` и `list` возвращают только `id`
5. Обновите обработку ответа и ошибок: данные приходят в объекте `result`, ошибки — в объекте `error` с кодом и текстом. Формат описан в [обзоре REST 3.0](../rest-v3.md)
6. Проверьте новые вызовы на тестовых данных до переключения рабочего сценария

## Пример: создание сделки {#example}

В предыдущей версии поля передаются в верхнем регистре, метод возвращает идентификатор числом.

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"FIELDS":{"TITLE":"Заявка на закупку","ASSIGNED_BY_ID":1,"OPPORTUNITY":150000,"CURRENCY_ID":"RUB"}}' \
https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.add
```

```json
{
    "result": 9021
}
```

В REST 3.0 такой же вызов идет по адресу `/rest/api/`, поля передаются в `camelCase`, идентификатор приходит в объекте `result`.

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"fields":{"title":"Заявка на закупку","assignedById":1,"opportunity":150000,"currencyId":"RUB"}}' \
https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.add
```

```json
{
    "result": {
        "id": 9023
    }
}
```

## Как найти аналог метода {#methods}

**Методы сделок, лидов, контактов, компаний и предложений.** Имя метода в REST 3.0 то же, меняется только адрес вызова. Например, `crm.deal.add`, `crm.deal.get`, `crm.deal.list`, `crm.deal.update` и `crm.deal.delete` есть в обеих версиях, как и методы `add`, `get`, `list`, `update` и `delete` лидов, контактов, компаний и предложений.

**Универсальные методы `crm.item.*`.** В REST 3.0 тип объекта входит в имя метода, поэтому параметр `entityTypeId` не нужен. Например, `crm.item.add` с `entityTypeId: 2` становится методом `crm.deal.add`, а `crm.item.list` с `entityTypeId: 1038` — методом `crm.smartprocess1038.list`. Товарные позиции элемента тоже получают тип в имени: `crm.item.productrow.add` для сделки становится `crm.deal.productrow.add`. Сегменты всех типов перечислены в [обзоре CRM](./index.md#method-name).

**Остальные методы называются в REST 3.0 иначе.** Они собраны в таблице. Для примера в таблице взяты методы сделки, а для реквизитов и адресов — методы компании. У других типов объектов вместо `deal` или `company` в имени стоит их сегмент: `crm.lead.field.list`, `crm.contact.requisite.add`.

#|
|| **Предыдущая версия** | **REST 3.0** ||
|| `crm.deal.fields` | [crm.deal.field.list](./rest-v3/fields/crm-entity-field-list-rest-v3.md) ||
|| `crm.deal.userfield.add`, `get`, `list`, `update`, `delete` | [crm.deal.field.custom.add](./rest-v3/fields/crm-entity-field-custom-add-rest-v3.md), [get](./rest-v3/fields/crm-entity-field-custom-get-rest-v3.md), [list](./rest-v3/fields/crm-entity-field-custom-list-rest-v3.md), [update](./rest-v3/fields/crm-entity-field-custom-update-rest-v3.md), [delete](./rest-v3/fields/crm-entity-field-custom-delete-rest-v3.md) ||
|| `crm.deal.productrows.get` | [crm.deal.productrow.list](./rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md) ||
|| `crm.deal.productrows.set` | [crm.deal.productrow.replace](./rest-v3/product-rows/crm-entity-product-row-replace-rest-v3.md) ||
|| `crm.deal.details.configuration.get` | [crm.deal.detailpagelayout.get](./rest-v3/detail-page-layout/crm-entity-detail-page-layout-get-rest-v3.md) ||
|| `crm.deal.details.configuration.set` | [crm.deal.detailpagelayout.update](./rest-v3/detail-page-layout/crm-entity-detail-page-layout-update-rest-v3.md) ||
|| `crm.deal.details.configuration.forceCommonScopeForAll` | [crm.deal.detailpagelayout.setcommonforall](./rest-v3/detail-page-layout/crm-entity-detail-page-layout-set-common-for-all-rest-v3.md) ||
|| `crm.deal.contact.items.get` | [crm.deal.get](./rest-v3/items/crm-entity-get-rest-v3.md): все контакты в поле `contactsId`, основной контакт в поле `contactId` ||
|| `crm.deal.contact.add` | [crm.deal.addfieldvalue](./rest-v3/items/crm-entity-add-field-value-rest-v3.md) с полем `contactsId`, основной контакт назначает [crm.deal.setprimarycontact](./rest-v3/items/crm-entity-set-primary-contact-rest-v3.md) ||
|| `crm.deal.contact.delete` | [crm.deal.deletefieldvalue](./rest-v3/items/crm-entity-delete-field-value-rest-v3.md) с полем `contactsId` ||
|| `crm.deal.contact.items.set` | [crm.deal.update](./rest-v3/items/crm-entity-update-rest-v3.md) с массивом `contactsId`, основным становится первый контакт ||
|| `crm.deal.contact.items.delete` | [crm.deal.update](./rest-v3/items/crm-entity-update-rest-v3.md) с пустым массивом `contactsId` ||
|| `crm.contact.company.items.get` | [crm.contact.get](./rest-v3/items/crm-entity-get-rest-v3.md): все компании в поле `companiesId`, основная компания в поле `companyId` ||
|| `crm.contact.company.add` | [crm.contact.addfieldvalue](./rest-v3/items/crm-entity-add-field-value-rest-v3.md) с полем `companiesId`. Компания добавляется не основной ||
|| `crm.contact.company.delete` | [crm.contact.deletefieldvalue](./rest-v3/items/crm-entity-delete-field-value-rest-v3.md) с полем `companiesId` ||
|| `crm.contact.company.items.set` | [crm.contact.update](./rest-v3/items/crm-entity-update-rest-v3.md) с массивом `companiesId`, основной становится первая компания ||
|| `crm.contact.company.items.delete` | [crm.contact.update](./rest-v3/items/crm-entity-update-rest-v3.md) с пустым массивом `companiesId` ||
|| `crm.company.contact.items.get` | [crm.company.get](./rest-v3/items/crm-entity-get-rest-v3.md): все контакты в поле `contactsId`. Признак основного контакта компании не возвращается ||
|| `crm.company.contact.add` | [crm.company.addfieldvalue](./rest-v3/items/crm-entity-add-field-value-rest-v3.md) с полем `contactsId` ||
|| `crm.company.contact.delete` | [crm.company.deletefieldvalue](./rest-v3/items/crm-entity-delete-field-value-rest-v3.md) с полем `contactsId` ||
|| `crm.company.contact.items.set` | [crm.company.update](./rest-v3/items/crm-entity-update-rest-v3.md) с массивом `contactsId` ||
|| `crm.company.contact.items.delete` | [crm.company.update](./rest-v3/items/crm-entity-update-rest-v3.md) с пустым массивом `contactsId` ||
|| `crm.category.*` | [crm.deal.category.*](./rest-v3/categories/index.md) ||
|| `crm.status.*` | Справочники — [crm.dictionary.<справочник>.*](./rest-v3/dictionaries/index.md), стадии сделок и смарт-процессов — [crm.deal.category.stage.*](./rest-v3/categories/index.md) ||
|| `crm.requisite.*` | [crm.company.requisite.*](./rest-v3/requisites/index.md) и `crm.contact.requisite.*` ||
|| `crm.requisite.bankdetail.*` | [crm.company.requisite.bankrequisite.*](./rest-v3/requisites/index.md) ||
|| `crm.requisite.link.*` | [crm.deal.clientrequisite.*](./rest-v3/requisites/index.md) — реквизиты клиента, `crm.deal.mycompanyrequisite.*` — реквизиты моей компании ||
|| `crm.address.*` | Адреса контактов, компаний и лидов — [crm.company.address.*](./rest-v3/addresses/index.md), адреса реквизитов — [crm.company.requisite.address.*](./rest-v3/requisites/index.md) ||
|| `crm.activity.binding.add`, `delete` | [crm.activity.binding.bind](./rest-v3/activities/crm-activity-binding-bind-rest-v3.md), [crm.activity.binding.unbind](./rest-v3/activities/crm-activity-binding-unbind-rest-v3.md) ||
|| `crm.enum.addresstype` | [crm.dictionary.addresstype.list](./rest-v3/dictionaries/crm-dictionary-list-rest-v3.md) ||
|#

## Чего пока нет в REST 3.0 {#previous-only}

Для этих задач оставьте вызовы предыдущей версии по адресу `/rest/`.

#|
|| **Задача** | **Метод предыдущей версии** ||
|| Работать с документами CRM и документами КЭДО | [crm.item.*](./universal/index.md) ||
|| Работать с воронками счетов и документов | [crm.category.*](./universal/category/index.md) ||
|| Работать со стадиями лидов, предложений и счетов, со справочником статусов списков обзвона | [crm.status.*](./status/index.md) ||
|| Создать пользовательское поле типа «Список» или «Файл» | `crm.deal.userfield.add`, `crm.lead.userfield.add`, `crm.contact.userfield.add`, `crm.company.userfield.add`, `crm.quote.userfield.add` ||
|| Задать порядок контактов в сделке или сделать компанию контакта основной при добавлении | `crm.deal.contact.add`, `crm.lead.contact.add`, `crm.quote.contact.add`, `crm.contact.company.add`, `crm.company.contact.add` ||
|| Работать с пользовательскими полями реквизитов | [crm.requisite.userfield.*](./requisites/user-fields/index.md) ||
|| Создавать и изменять шаблоны реквизитов | [crm.requisite.preset.*](./requisites/presets/index.md) ||
|| Выбрать реквизит моей компании в предложении или смарт-процессе | [crm.requisite.link.*](./requisites/links/index.md) ||
|| Получить все поля дела, в том числе настройки и данные провайдера, получить список дел без прав администратора | [crm.activity.get](./timeline/activities/activity-base/crm-activity-get.md), [crm.activity.list](./timeline/activities/activity-base/crm-activity-list.md) ||
|| Создать или изменить дело | [Таймлайн и дела](./timeline/index.md) ||
|| Сбросить вид карточки к настройкам по умолчанию | `crm.deal.details.configuration.reset`, `crm.lead.details.configuration.reset`, `crm.contact.details.configuration.reset`, `crm.company.details.configuration.reset`, `crm.item.details.configuration.reset` ||
|| Получить короткие коды типов объектов `D`, `L`, `C` | [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md) ||
|| Узнать режим работы CRM без прав администратора | [crm.settings.mode.get](./crm-settings-mode-get.md) ||
|| Создать или настроить тип смарт-процесса | [crm.type.*](./universal/user-defined-object-types/index.md) ||
|| Работать с таймлайном, генератором документов, автоматизацией, валютами, списками обзвона, дубликатами, сквозной аналитикой, цифровыми рабочими местами, оплатами и доставками | Методы этих разделов в [обзоре CRM](./index.md#all-methods) ||
|#

## Чем REST 3.0 отличается от предыдущей версии {#differences}

- **Одна схема для всех типов.** Методы `crm.<тип>.*` устроены одинаково для сделок, лидов, контактов, компаний, предложений, счетов и смарт-процессов. Отличаются только набор групп и поля типа
- **Имена полей в `camelCase`.** Стадия сделки — поле `stageId`, а не `STAGE_ID`. Пользовательские поля сохраняют имена вида `UF_CRM_…`
- **Поля задаются явно.** Без `select` методы `crm.<тип>.get` и `crm.<тип>.list` возвращают только `id` элемента. В `select` можно запросить поля связанных объектов через точку, например `assignedBy.lastName` или `stage.name`. У вложенных групп правила `select` свои — они описаны на страницах методов
- **Новый формат фильтра и навигации.** Параметры `filter`, `order` и `pagination` устроены по общим правилам REST 3.0. Метод `crm.<тип>.list` по умолчанию возвращает 50 элементов, максимум — 1000. У списочных методов вложенных групп фильтр, как правило, требует условия по владельцу, например `ownerId`, а лимит страницы может быть меньше
- **Описание полей у каждой группы.** У каждой группы методов есть свои `field.get` и `field.list`, например `crm.deal.productrow.field.list` возвращает поля товарной позиции

Формат параметров и ответов описан в [обзоре REST 3.0](../rest-v3.md): [выбор полей и связанных объектов](../rest-v3.md#connection), [фильтрация](../rest-v3.md#filter), [сравнение со старой версией](../rest-v3.md#table).
