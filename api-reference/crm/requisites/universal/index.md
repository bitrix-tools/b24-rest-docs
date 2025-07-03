# Об универсальных реквизитах

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: из каких полей состоят, для чего нужны

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Реквизиты компании — это сведения, позволяющие точно идентифицировать организацию. У каждой официально зарегистрированной компании есть набор таких данных, как: название, юридический адрес, ИНН, ОГРН, КПП, код ОКПО, код ОКВЭД и другие.
Подробнее рассказываем в статье [Что такое реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/15989720/)

## Поля реквизита {#fields}

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** | **Обязательное** | **Неизменяемое** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита, можно получить с помощью метода [crm.requisite.list](./crm-requisite-list.md). Создается автоматически и уникален в рамках портала. | Да | Нет | Нет | Нет ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа родительской сущности.

Сейчас это может быть только:
- `3` — контакт
- `4` — компания

Идентификаторы всех типов сущностей CRM отдает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md)

 | Да | Да | Да | Да ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор родительской сущности (контакта либо компании).

 Идентификатор можно получить методом [crm.company.list](../../companies/crm-company-list.md) для компании и методом [crm.contact.list](../../contacts/crm-contact-list.md) для контакта | Да | Да | Да | Да ||
|| **PRESET_ID***
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизитов.

Идентификаторы шаблонов можно получить методом [crm.requisite.preset.list](../presets/crm-requisite-preset-list.md) | Да | Да | Да | Да ||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания | Да | Нет | Нет | Нет ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения | Да | Нет | Нет | Нет ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор создавшего реквизит | Да | Нет | Нет | Нет ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор изменившего реквизит | Да | Нет | Нет | Нет ||
|| **NAME***
[`string`](../../../data-types.md) | Название реквизита | Да | Да | Да | Нет ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита | Да | Да | Нет | Нет ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ, используется для операций обмена.

Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком | Да | Да | Нет | Нет ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы.

Назначение поля может меняться конечным разработчиком | Да | Да | Нет | Нет ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности.

Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет | Да | Да | Нет | Нет ||
|| **ADDRESS_ONLY**
[`char`](../../../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. При значении `Y` реквизиты не показываются в карточке сущности, но отображается адрес | Да | Да | Нет | Нет ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка. Порядок в списке реквизитов сущности, когда их несколько | Да | Да | Нет | Нет ||
|| **RQ_NAME**
[`string`](../../../data-types.md) | ФИО | Да | Да | Нет | Нет ||
|| **RQ_FIRST_NAME**
[`string`](../../../data-types.md) | Имя | Да | Да | Нет | Нет ||
|| **RQ_LAST_NAME**
[`string`](../../../data-types.md) | Фамилия | Да | Да | Нет | Нет ||
|| **RQ_SECOND_NAME**
[`string`](../../../data-types.md) | Отчество | Да | Да | Нет | Нет ||
|| **RQ_COMPANY_ID**
[`string`](../../../data-types.md) | Идентификатор организации | Да | Да | Нет | Нет ||
|| **RQ_COMPANY_NAME**
[`string`](../../../data-types.md) | Сокращенное наименование организации | Да | Да | Нет | Нет ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../../../data-types.md) | Полное наименование организации | Да | Да | Нет | Нет ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../../../data-types.md) | Дата государственной регистрации | Да | Да | Нет | Нет ||
|| **RQ_DIRECTOR**
[`string`](../../../data-types.md) | Генеральный директор | Да | Да | Нет | Нет ||
|| **RQ_ACCOUNTANT**
[`string`](../../../data-types.md) | Главный бухгалтер | Да | Да | Нет | Нет ||
|| **RQ_CEO_NAME**
[`string`](../../../data-types.md) | ФИО первого руководителя | Да | Да | Нет | Нет ||
|| **RQ_CEO_WORK_POS**
[`string`](../../../data-types.md) | Должность первого руководителя | Да | Да | Нет | Нет ||
|| **RQ_CONTACT**
[`string`](../../../data-types.md) | Контактное лицо | Да | Да | Нет | Нет ||
|| **RQ_EMAIL**
[`string`](../../../data-types.md) | E-Mail | Да | Да | Нет | Нет ||
|| **RQ_PHONE**
[`string`](../../../data-types.md) | Телефон | Да | Да | Нет | Нет ||
|| **RQ_FAX**
[`string`](../../../data-types.md) | Факс | Да | Да | Нет | Нет ||
|| **RQ_IDENT_TYPE**
[`crm_status`](../../../data-types.md) | Способ идентификации | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC**
[`string`](../../../data-types.md) | Вид документа | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../data-types.md) | Серия | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../data-types.md) | Номер | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../../../data-types.md) | Личный номер | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../data-types.md) | Дата выдачи | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../../../data-types.md) | Кем выдан | Да | Да | Нет | Нет ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../../../data-types.md) | Код подразделения | Да | Да | Нет | Нет ||
|| **RQ_INN**
[`string`](../../../data-types.md) | ИНН | Да | Да | Нет | Нет ||
|| **RQ_KPP**
[`string`](../../../data-types.md) | КПП | Да | Да | Нет | Нет ||
|| **RQ_USRLE**
[`string`](../../../data-types.md) | Handelsregisternummer (для страны DE) | Да | Да | Нет | Нет ||
|| **RQ_IFNS**
[`string`](../../../data-types.md) | ИФНС | Да | Да | Нет | Нет ||
|| **RQ_OGRN**
[`string`](../../../data-types.md) | ОГРН | Да | Да | Нет | Нет ||
|| **RQ_OGRNIP**
[`string`](../../../data-types.md) | ОГРНИП | Да | Да | Нет | Нет ||
|| **RQ_OKPO**
[`string`](../../../data-types.md) | ОКПО | Да | Да | Нет | Нет ||
|| **RQ_OKTMO**
[`string`](../../../data-types.md) | ОКТМО | Да | Да | Нет | Нет ||
|| **RQ_OKVED**
[`string`](../../../data-types.md) | ОКВЭД | Да | Да | Нет | Нет ||
|| **RQ_EDRPOU**
[`string`](../../../data-types.md) | ЄДРПОУ | Да | Да | Нет | Нет ||
|| **RQ_DRFO**
[`string`](../../../data-types.md) | ДРФО | Да | Да | Нет | Нет ||
|| **RQ_KBE**
[`string`](../../../data-types.md) | КБЕ | Да | Да | Нет | Нет ||
|| **RQ_IIN**
[`string`](../../../data-types.md) | ИИН | Да | Да | Нет | Нет ||
|| **RQ_BIN**
[`string`](../../../data-types.md) | БИН | Да | Да | Нет | Нет ||
|| **RQ_ST_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства о государственной регистрации | Да | Да | Нет | Нет ||
|| **RQ_ST_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства о государственной регистрации | Да | Да | Нет | Нет ||
|| **RQ_ST_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельства о государственной регистрации | Да | Да | Нет | Нет ||
|| **RQ_VAT_PAYER**
[`char`](../../../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N` | Да | Да | Нет | Нет ||
|| **RQ_VAT_ID**
[`string`](../../../data-types.md) | VAT ID (идентификационный номер (плательщика) НДС) | Да | Да | Нет | Нет ||
|| **RQ_VAT_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства по НДС | Да | Да | Нет | Нет ||
|| **RQ_VAT_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства по НДС | Да | Да | Нет | Нет ||
|| **RQ_VAT_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельства по НДС | Да | Да | Нет | Нет ||
|| **RQ_RESIDENCE_COUNTRY**
[`string`](../../../data-types.md) | Страна резидента | Да | Да | Нет | Нет ||
|| **RQ_BASE_DOC**
[`string`](../../../data-types.md) | Основание действия | Да | Да | Нет | Нет ||
|| **RQ_REGON**
[`string`](../../../data-types.md) | REGON (для страны PL) | Да | Да | Нет | Нет ||
|| **RQ_KRS**
[`string`](../../../data-types.md) | KRS (для страны PL) | Да | Да | Нет | Нет ||
|| **RQ_PESEL**
[`string`](../../../data-types.md) | PESEL (для страны PL) | Да | Да | Нет | Нет ||
|| **RQ_LEGAL_FORM**
[`string`](../../../data-types.md) | Forme juridique (для страны FR) | Да | Да | Нет | Нет ||
|| **RQ_SIRET**
[`string`](../../../data-types.md) | Numéro Siret (для страны FR) | Да | Да | Нет | Нет ||
|| **RQ_SIREN**
[`string`](../../../data-types.md) | Numéro Siren (для страны FR) | Да | Да | Нет | Нет ||
|| **RQ_CAPITAL**
[`string`](../../../data-types.md) | Capital social (для страны FR) | Да | Да | Нет | Нет ||
|| **RQ_RCS**
[`string`](../../../data-types.md) | RCS (для страны FR) | Да | Да | Нет | Нет ||
|| **RQ_CNPJ**
[`string`](../../../data-types.md) | CNPJ (для страны BR) | Да | Да | Нет | Нет ||
|| **RQ_STATE_REG**
[`string`](../../../data-types.md) | Inscrição Estadual (IE) (для страны BR) | Да | Да | Нет | Нет ||
|| **RQ_MNPL_REG**
[`string`](../../../data-types.md) | Inscrição Municipal (IM) (для страны BR) | Да | Да | Нет | Нет ||
|| **RQ_CPF**
[`string`](../../../data-types.md) | CPF (для страны BR) | Да | Да | Нет | Нет ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](../user-fields/crm-requisite-userfield-add.md) | Да | Да | Нет | Нет ||
|#

## Обзор методов

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.add](./crm-requisite-add.md) | Создает новый реквизит ||
|| [crm.requisite.update](./crm-requisite-update.md) | Обновляет существующий реквизит ||
|| [crm.requisite.get](./crm-requisite-get.md) | Возвращает реквизит по идентификатору ||
|| [crm.requisite.list](./crm-requisite-list.md) | Возвращает список реквизитов по фильтру ||
|| [crm.requisite.delete](./crm-requisite-delete.md) | Удаляет реквизит и все связанные с ним объекты ||
|| [crm.requisite.fields](./crm-requisite-fields.md) | Возвращает описание полей реквизита ||
|#