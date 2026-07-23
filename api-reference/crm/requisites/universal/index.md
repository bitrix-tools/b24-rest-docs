# Универсальные реквизиты CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: из каких полей состоят, для чего нужны

{% endnote %}

{% endif %}

Реквизиты компании — это сведения, позволяющие точно идентифицировать организацию. У каждой официально зарегистрированной компании есть набор таких данных, как: название, юридический адрес, ИНН, ОГРН, КПП, код ОКПО, код ОКВЭД и другие.
> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/24341258/)

## Как начать работу

1. Определите родительский объект: контакт или компанию
2. Получите идентификатор шаблона реквизитов методом [crm.requisite.preset.list](../presets/crm-requisite-preset-list.md)
3. Создайте реквизит методом [crm.requisite.add](./crm-requisite-add.md)
4. Добавьте адрес через методы [адресов](../addresses/index.md), если реквизиту нужен юридический или фактический адрес
5. Добавьте банковский реквизит через методы [банковских реквизитов](../bank-detail/index.md), если реквизит используется для платежных документов
6. Получите или измените реквизит методами [crm.requisite.get](./crm-requisite-get.md) и [crm.requisite.update](./crm-requisite-update.md)

## Идентификаторы реквизита

- `ID` — идентификатор реквизита. Его возвращают методы [crm.requisite.add](./crm-requisite-add.md), [crm.requisite.get](./crm-requisite-get.md) и [crm.requisite.list](./crm-requisite-list.md)
- `ENTITY_TYPE_ID` — тип родительского объекта. Для контакта передайте `3`, для компании — `4`. Все значения отдает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md)
- `ENTITY_ID` — идентификатор родительского контакта или компании. Его можно получить методами [crm.contact.list](../../contacts/crm-contact-list.md) или [crm.company.list](../../companies/crm-company-list.md)
- `PRESET_ID` — идентификатор шаблона реквизитов. Его можно получить методом [crm.requisite.preset.list](../presets/crm-requisite-preset-list.md)

## Поля реквизита {#fields}

Обязательные поля отмечены `*`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита, можно получить с помощью метода [crm.requisite.list](./crm-requisite-list.md). Создается автоматически и уникален в рамках портала ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта.

Сейчас это может быть только:
- `3` — контакт
- `4` — компания

Идентификаторы всех типов объектов CRM отдает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md)

||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор родительского объекта (контакта либо компании).

Идентификатор можно получить методом [crm.company.list](../../companies/crm-company-list.md) для компании и методом [crm.contact.list](../../contacts/crm-contact-list.md) для контакта ||
|| **PRESET_ID***
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизитов.

Идентификаторы шаблонов можно получить методом [crm.requisite.preset.list](../presets/crm-requisite-preset-list.md) ||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор изменившего реквизит ||
|| **NAME***
[`string`](../../../data-types.md) | Название реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ, используется для операций обмена.

Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности.

Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет ||
|| **ADDRESS_ONLY**
[`char`](../../../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. При значении `Y` реквизиты не показываются в карточке объекта, но отображается адрес ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка. Порядок в списке реквизитов объекта, когда их несколько ||
|| **RQ_NAME**
[`string`](../../../data-types.md) | ФИО ||
|| **RQ_FIRST_NAME**
[`string`](../../../data-types.md) | Имя ||
|| **RQ_LAST_NAME**
[`string`](../../../data-types.md) | Фамилия ||
|| **RQ_SECOND_NAME**
[`string`](../../../data-types.md) | Отчество ||
|| **RQ_COMPANY_ID**
[`string`](../../../data-types.md) | Идентификатор организации ||
|| **RQ_COMPANY_NAME**
[`string`](../../../data-types.md) | Сокращенное наименование организации ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../../../data-types.md) | Полное наименование организации ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../../../data-types.md) | Дата государственной регистрации ||
|| **RQ_DIRECTOR**
[`string`](../../../data-types.md) | Генеральный директор ||
|| **RQ_ACCOUNTANT**
[`string`](../../../data-types.md) | Главный бухгалтер ||
|| **RQ_CEO_NAME**
[`string`](../../../data-types.md) | ФИО первого руководителя ||
|| **RQ_CEO_WORK_POS**
[`string`](../../../data-types.md) | Должность первого руководителя ||
|| **RQ_CONTACT**
[`string`](../../../data-types.md) | Контактное лицо ||
|| **RQ_EMAIL**
[`string`](../../../data-types.md) | E-Mail ||
|| **RQ_PHONE**
[`string`](../../../data-types.md) | Телефон ||
|| **RQ_FAX**
[`string`](../../../data-types.md) | Факс ||
|| **RQ_IDENT_TYPE**
[`crm_status`](../../../data-types.md) | Способ идентификации ||
|| **RQ_IDENT_DOC**
[`string`](../../../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../../../data-types.md) | Личный номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../data-types.md) | Дата выдачи ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../../../data-types.md) | Кем выдан ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../../../data-types.md) | Код подразделения ||
|| **RQ_INN**
[`string`](../../../data-types.md) | ИНН ||
|| **RQ_KPP**
[`string`](../../../data-types.md) | КПП ||
|| **RQ_USRLE**
[`string`](../../../data-types.md) | Handelsregisternummer (для страны DE) ||
|| **RQ_IFNS**
[`string`](../../../data-types.md) | ИФНС ||
|| **RQ_OGRN**
[`string`](../../../data-types.md) | ОГРН ||
|| **RQ_OGRNIP**
[`string`](../../../data-types.md) | ОГРНИП ||
|| **RQ_OKPO**
[`string`](../../../data-types.md) | ОКПО ||
|| **RQ_OKTMO**
[`string`](../../../data-types.md) | ОКТМО ||
|| **RQ_OKVED**
[`string`](../../../data-types.md) | ОКВЭД ||
|| **RQ_EDRPOU**
[`string`](../../../data-types.md) | ЄДРПОУ ||
|| **RQ_DRFO**
[`string`](../../../data-types.md) | ДРФО ||
|| **RQ_KBE**
[`string`](../../../data-types.md) | КБЕ ||
|| **RQ_IIN**
[`string`](../../../data-types.md) | ИИН ||
|| **RQ_BIN**
[`string`](../../../data-types.md) | БИН ||
|| **RQ_ST_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельства о государственной регистрации ||
|| **RQ_VAT_PAYER**
[`char`](../../../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N` ||
|| **RQ_VAT_ID**
[`string`](../../../data-types.md) | VAT ID (идентификационный номер (плательщика) НДС) ||
|| **RQ_VAT_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства по НДС ||
|| **RQ_VAT_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства по НДС ||
|| **RQ_VAT_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельства по НДС ||
|| **RQ_RESIDENCE_COUNTRY**
[`string`](../../../data-types.md) | Страна резидента ||
|| **RQ_BASE_DOC**
[`string`](../../../data-types.md) | Основание действия ||
|| **RQ_REGON**
[`string`](../../../data-types.md) | REGON (для страны PL) ||
|| **RQ_KRS**
[`string`](../../../data-types.md) | KRS (для страны PL) ||
|| **RQ_PESEL**
[`string`](../../../data-types.md) | PESEL (для страны PL) ||
|| **RQ_LEGAL_FORM**
[`string`](../../../data-types.md) | Forme juridique (для страны FR) ||
|| **RQ_SIRET**
[`string`](../../../data-types.md) | Numéro Siret (для страны FR) ||
|| **RQ_SIREN**
[`string`](../../../data-types.md) | Numéro Siren (для страны FR) ||
|| **RQ_CAPITAL**
[`string`](../../../data-types.md) | Capital social (для страны FR) ||
|| **RQ_RCS**
[`string`](../../../data-types.md) | RCS (для страны FR) ||
|| **RQ_CNPJ**
[`string`](../../../data-types.md) | CNPJ (для страны BR) ||
|| **RQ_STATE_REG**
[`string`](../../../data-types.md) | Inscrição Estadual (IE) (для страны BR) ||
|| **RQ_MNPL_REG**
[`string`](../../../data-types.md) | Inscrição Municipal (IM) (для страны BR) ||
|| **RQ_CPF**
[`string`](../../../data-types.md) | CPF (для страны BR) ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](../user-fields/crm-requisite-userfield-add.md) ||
|#

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.add](./crm-requisite-add.md) | Создает новый реквизит ||
|| [crm.requisite.update](./crm-requisite-update.md) | Обновляет существующий реквизит ||
|| [crm.requisite.get](./crm-requisite-get.md) | Возвращает реквизит по идентификатору ||
|| [crm.requisite.list](./crm-requisite-list.md) | Возвращает список реквизитов по фильтру ||
|| [crm.requisite.delete](./crm-requisite-delete.md) | Удаляет реквизит и все связанные с ним объекты ||
|| [crm.requisite.fields](./crm-requisite-fields.md) | Возвращает описание полей реквизита ||
|#
