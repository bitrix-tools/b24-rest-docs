# Адреса в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Адрес хранит улицу, город, почтовый индекс, регион и страну. Методы группы работают с адресами контактов, компаний и лидов: у контакта и компании может быть несколько адресов разных типов, у лида — один адрес. Метод `crm.address.list` возвращает адреса всех контактов, компаний и лидов Битрикс24 для выгрузки.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/24341258/)

## Как выбрать метод

#|
|| **Задача** | **Методы** ||
|| Добавить, изменить, удалить или получить адрес контакта или компании | [crm.<тип>.address.add](./crm-entity-address-add-rest-v3.md), [update](./crm-entity-address-update-rest-v3.md), [delete](./crm-entity-address-delete-rest-v3.md), [get](./crm-entity-address-get-rest-v3.md), [list](./crm-entity-address-list-rest-v3.md) с сегментом `contact` или `company` ||
|| Записать, получить или удалить адрес лида | [crm.lead.address.set](./crm-lead-address-set-rest-v3.md), [crm.lead.address.get](./crm-entity-address-get-rest-v3.md), [crm.lead.address.delete](./crm-entity-address-delete-rest-v3.md) ||
|| Выгрузить адреса всех контактов, компаний и лидов | [crm.address.list](./crm-address-list-rest-v3.md) ||
|| Работать с адресом конкретного реквизита | Методы [crm.<тип>.requisite.address.*](../requisites/crm-entity-requisite-address-list-rest-v3.md) ||
|#

Имена методов пишутся в нижнем регистре: `crm.contact.address.add`.

## Связь с другими объектами

Адрес контакта или компании хранится в реквизите, адрес лида — в самом лиде.

**Контакт и компания.** Владельца адреса задает поле `contactId` или `companyId`, тип владельца — сегмент `contact` или `company` в имени метода. Адрес хранится в одном из реквизитов владельца, его идентификатор приходит в поле `requisiteId`. При добавлении адреса CRM выбирает реквизит сама: реквизит с адресом того же типа, реквизит, выбранный в карточке, или первый реквизит владельца. Если реквизитов нет, CRM создает реквизит для хранения адреса. После удаления адреса реквизит остается. Реквизиты владельца возвращает метод [crm.<тип>.requisite.list](../requisites/crm-entity-requisite-list-rest-v3.md).

**Лид.** У лида нет реквизитов и отдельного идентификатора адреса. Методы `crm.lead.address.*` принимают идентификатор лида, а [crm.lead.address.set](./crm-lead-address-set-rest-v3.md) и создает, и изменяет адрес.

**Тип адреса.** Поле `typeId` — тип адреса из справочника. У одного владельца может быть только один адрес каждого типа. Тип задается при добавлении адреса и потом не меняется. Типы адресов возвращает метод [crm.dictionary.addresstype.list](../dictionaries/crm-dictionary-list-rest-v3.md):

#|
|| **typeId** | **Тип адреса** ||
|| `1` | Фактический адрес ||
|| `4` | Адрес регистрации ||
|| `6` | Юридический адрес ||
|| `9` | Адрес бенефициара ||
|| `11` | Адрес доставки ||
|#

## Поля адреса {#fields}

Имена полей пишутся в camelCase. Методы `crm.<тип>.address.get` и `crm.<тип>.address.list` возвращают все поля адреса, параметр `select` на состав ответа не влияет.

#|
|| **Поле**
`тип` | **Описание** | **Изменяемое** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор адреса. Нет у адреса лида | Нет ||
|| **typeId**
[`integer`](../../../data-types.md) | Тип адреса, значения — в таблице выше. Нет у адреса лида | Только при добавлении ||
|| **contactId**
[`integer`](../../../data-types.md) | Идентификатор контакта. Есть только в методах `crm.contact.address.*` | Только при добавлении ||
|| **companyId**
[`integer`](../../../data-types.md) | Идентификатор компании. Есть только в методах `crm.company.address.*` | Только при добавлении ||
|| **requisiteId**
[`integer`](../../../data-types.md) | Идентификатор реквизита, в котором хранится адрес. Нет у адреса лида | Нет ||
|| **address1**
[`string`](../../../data-types.md) | Улица, дом, корпус, строение | Да ||
|| **address2**
[`string`](../../../data-types.md) | Квартира или офис | Да ||
|| **city**
[`string`](../../../data-types.md) | Город | Да ||
|| **postalCode**
[`string`](../../../data-types.md) | Почтовый индекс | Да ||
|| **region**
[`string`](../../../data-types.md) | Район | Да ||
|| **province**
[`string`](../../../data-types.md) | Область | Да ||
|| **country**
[`string`](../../../data-types.md) | Страна | Да ||
|| **countryCode**
[`string`](../../../data-types.md) | Код страны из справочника местоположений Битрикс24. Сохраняется, только если совпадает с названием страны в `country` на языке Битрикс24 | Да ||
|#

Незаполненные текстовые поля приходят пустой строкой.

Описание полей с признаками `editable`, `filterable`, `sortable` возвращают методы `crm.<тип>.address.field.list` и `crm.<тип>.address.field.get`, для `crm.address.list` — `crm.address.field.list` и `crm.address.field.get`. Они устроены как остальные методы полей REST 3.0: `field.list` принимает `select` со списком признаков, `field.get` — еще и `name` с именем поля, например `{"name":"city"}`.

## Как начать работу

1. Получите идентификатор контакта или компании методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md)
2. Выберите тип адреса методом [crm.dictionary.addresstype.list](../dictionaries/crm-dictionary-list-rest-v3.md)
3. Добавьте адрес методом [crm.<тип>.address.add](./crm-entity-address-add-rest-v3.md). Для лида запишите адрес методом [crm.lead.address.set](./crm-lead-address-set-rest-v3.md)
4. Проверьте адреса методом [crm.<тип>.address.list](./crm-entity-address-list-rest-v3.md): в ответе есть идентификатор адреса и реквизита, в котором он сохранен

## Методы предыдущей версии

Адреса по адресу `/rest/` работают методами [crm.address.*](../../requisites/addresses/index.md). В них адрес контакта или компании привязан к реквизиту, а не к самому контакту или компании, и определяется сочетанием `TYPE_ID`, `ENTITY_TYPE_ID` и `ENTITY_ID`. В REST 3.0 у адреса есть свой идентификатор `id`, а владелец задается полем `contactId` или `companyId`.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Адреса контакта и компании

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.address.add](./crm-entity-address-add-rest-v3.md) | Добавляет адрес контакту или компании ||
|| [crm.<тип>.address.update](./crm-entity-address-update-rest-v3.md) | Изменяет адрес контакта или компании ||
|| [crm.<тип>.address.get](./crm-entity-address-get-rest-v3.md) | Возвращает адрес контакта, компании или лида ||
|| [crm.<тип>.address.list](./crm-entity-address-list-rest-v3.md) | Возвращает адреса контакта или компании ||
|| [crm.<тип>.address.delete](./crm-entity-address-delete-rest-v3.md) | Удаляет адрес контакта, компании или лида ||
|| `crm.<тип>.address.field.list` | Возвращает описание полей адреса ||
|| `crm.<тип>.address.field.get` | Возвращает описание поля адреса по имени ||
|#

### Адрес лида

#|
|| **Метод** | **Описание** ||
|| [crm.lead.address.set](./crm-lead-address-set-rest-v3.md) | Записывает адрес лида ||
|| [crm.lead.address.get](./crm-entity-address-get-rest-v3.md) | Возвращает адрес лида ||
|| [crm.lead.address.delete](./crm-entity-address-delete-rest-v3.md) | Удаляет адрес лида ||
|#

### Адреса Битрикс24

#|
|| **Метод** | **Описание** ||
|| [crm.address.list](./crm-address-list-rest-v3.md) | Возвращает адреса всех контактов, компаний и лидов ||
|| `crm.address.field.list` | Возвращает описание полей адреса ||
|| `crm.address.field.get` | Возвращает описание поля адреса по имени ||
|#
