# Справочники CRM в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note info "" %}

Методы относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Справочники CRM хранят значения, которые пользователь выбирает в полях карточки: тип сделки или компании, источник, обращение, тип телефона. Методы группы возвращают значения справочников. В семи справочниках значения можно добавлять, менять и удалять, они отмечены в таблице ниже.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Справочники в Битрикс24](https://helpdesk.bitrix24.ru/open/21600612/)

## Справочники

Справочник входит в имя метода: [crm.dictionary.dealtype.list](./crm-dictionary-list-rest-v3.md) возвращает типы сделок, [crm.dictionary.source.list](./crm-dictionary-list-rest-v3.md) — источники.

#|
|| **Справочник** | **Сегмент в имени метода** | **Значения можно менять** ||
|| Типы сделок | `dealtype` | Да ||
|| Типы контактов | `contacttype` | Да ||
|| Типы компаний | `companytype` | Да ||
|| Обращения | `honorific` | Да ||
|| Количество сотрудников | `employees` | Да ||
|| Сферы деятельности | `industry` | Да ||
|| Источники | `source` | Да ||
|| Типы телефонов | `phonetype` | Нет ||
|| Типы электронной почты | `emailtype` | Нет ||
|| Типы сайтов | `webtype` | Нет ||
|| Типы мессенджеров | `imtype` | Нет ||
|| Типы адресов | `addresstype` | Нет ||
|| Типы объектов CRM | `entitytype` | Нет ||
|| Группы стадий | `stagesemantic` | Нет ||
|| Провайдеры дел | `activityprovider` | Нет ||
|#

Имя метода пишется в нижнем регистре: `crm.dictionary.dealtype.list`, а не `crm.dictionary.dealType.list`.

Поля значений у справочников разные, они описаны на странице метода [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md#fields).

## Как начать работу

Пример: приложение продает подписки и отмечает такие сделки своим типом «Подписка».

1. Получите типы сделок методом [crm.dictionary.dealtype.list](./crm-dictionary-list-rest-v3.md). Если нужное значение уже есть, возьмите его `id` и переходите к шагу 3
2. Если подходящего значения нет, добавьте его методом [crm.dictionary.dealtype.add](./crm-dictionary-add-rest-v3.md). Передайте свой `id`, например `SUBSCRIPTION`, и приложение будет знать его заранее. Без `id` Битрикс24 создаст идентификатор вида `UC_1Z8DXI`
3. Передайте `id` значения в поле `typeId` при создании сделки методом [crm.deal.add](../items/crm-entity-add-rest-v3.md)
4. Переименуйте значение методом [crm.dictionary.dealtype.update](./crm-dictionary-update-rest-v3.md). Идентификатор не меняется, и сделки сохраняют свой тип
5. Удалите значение методом [crm.dictionary.dealtype.delete](./crm-dictionary-delete-rest-v3.md), когда оно больше не нужно. В сделках этого типа прежний `id` останется в поле `typeId`. Стандартные значения с `isSystem: true` удалить нельзя

## Связь с другими объектами

Справочники связаны с элементами CRM и их телефонами, почтой, сайтами и мессенджерами, а также с адресами, стадиями, делами и типами объектов.

**Элементы CRM.** Элемент хранит идентификатор значения в поле: `typeId` сделки, контакта и компании, `sourceId`, `honorificId`, `industryId`, `employeesId`. Если нужен не только идентификатор, а значение справочника целиком, передайте в `select` метода [crm.<тип>.get](../items/crm-entity-get-rest-v3.md) связанный объект без суффикса `Id`, например `type` или `source`. Какие поля есть у каждого типа объекта, описано на страницах полей, например [поля сделки](../items/fields-deal.md) и [поля компании](../items/fields-company.md).

**Телефоны, почта, сайты и мессенджеры.** В полях `phone`, `email`, `web` и `im` может быть несколько значений. Тип каждого значения задает ключ `valueTypeId`. Типы хранят [справочники типов связи](./crm-dictionary-list-rest-v3.md#communication-types): `phonetype`, `emailtype`, `webtype`, `imtype`.

**Адреса.** Тип адреса контакта или компании, например юридический или фактический, задает поле `typeId` в методах группы [crm.<тип>.address.*](../addresses/crm-entity-address-list-rest-v3.md). Типы адресов хранит справочник [`addresstype`](./crm-dictionary-list-rest-v3.md#address-types).

**Стадии.** Стадия сделки или смарт-процесса относится к одной из групп справочника [`stagesemantic`](./crm-dictionary-list-rest-v3.md#stage-semantics): в работе, успех или провал. Стадии воронки возвращает метод [crm.<тип>.category.stage.list](../categories/crm-entity-category-stage-list-rest-v3.md).

**Дела.** Поле `providerId` показывает, что это за дело: звонок, письмо, встреча или задача. Например, у письма `providerId` равен `CRM_EMAIL`. Все провайдеры хранит справочник [`activityprovider`](./crm-dictionary-list-rest-v3.md#activity-providers). Дела элемента возвращает метод [crm.<тип>.activity.list](../activities/crm-entity-activity-list-rest-v3.md).

**Типы объектов.** Справочник [`entitytype`](./crm-dictionary-list-rest-v3.md#entity-types) хранит `entityTypeId` системных типов: лида, сделки, контакта, компании и других. Смарт-процессов в нем нет, их `entityTypeId` возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md).

## Методы предыдущей версии

Методы [crm.status.*](../../status/index.md) по адресу `/rest/` работают с типами сделок, контактов и компаний, обращениями, количеством сотрудников, сферами деятельности и источниками. Справочник в них задает параметр `ENTITY_ID`, например `SOURCE` или `DEAL_TYPE`, а в REST 3.0 — имя метода. Поля там пишутся в верхнем регистре, например `STATUS_ID` и `NAME`, а в REST 3.0 — в camelCase. Типы адресов в предыдущей версии возвращает метод [crm.enum.addresstype](../../auxiliary/enum/crm-enum-address-type.md), типы объектов CRM — метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Изменение

Методы есть у справочников `dealtype`, `contacttype`, `companytype`, `honorific`, `employees`, `industry`, `source`. Вызвать их может администратор CRM.

#|
|| **Метод** | **Описание** ||
|| [crm.dictionary.<справочник>.add](./crm-dictionary-add-rest-v3.md) | Добавляет значение в справочник ||
|| [crm.dictionary.<справочник>.update](./crm-dictionary-update-rest-v3.md) | Изменяет название и порядок сортировки значения ||
|| [crm.dictionary.<справочник>.delete](./crm-dictionary-delete-rest-v3.md) | Удаляет значение справочника ||
|#

### Чтение

Методы есть у всех 15 справочников. Вызвать их может пользователь с правом на чтение лидов, сделок или других объектов CRM.

#|
|| **Метод** | **Описание** ||
|| [crm.dictionary.<справочник>.get](./crm-dictionary-get-rest-v3.md) | Возвращает значение справочника по идентификатору ||
|| [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md) | Возвращает значения справочника с фильтром, сортировкой и постраничной навигацией ||
|| [crm.dictionary.<справочник>.field.list](#field-methods) | Возвращает описание полей значения справочника ||
|| [crm.dictionary.<справочник>.field.get](#field-methods) | Возвращает описание поля значения справочника по имени ||
|#

### Описание полей справочника {#field-methods}

У каждого справочника есть методы `crm.dictionary.<справочник>.field.list` и `crm.dictionary.<справочник>.field.get`. Они описывают поля значения: `id`, `name`, `sort` и другие. Метод `field.list` возвращает описания полей в `result.items`. Метод `field.get` возвращает описание одного поля в `result.item`, имя поля передайте в параметре `name`. В описании есть признаки `filterable`, `sortable` и `editable`, устроено оно так же, как у метода [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).
