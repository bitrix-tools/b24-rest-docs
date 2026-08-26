# Ограничения длины полей CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Ограничение длины важно учитывать при создании и обновлении объектов CRM. Если значение длиннее допустимого, метод может вернуть ошибку валидации или сохранить значение, обрезанное до лимита. Поведение зависит от конкретного поля и уровня проверки: валидатора, ORM или ограничения базы данных.

В таблицах указана максимальная длина стандартных полей основных объектов CRM: лидов, сделок, контактов, компаний, предложений, счетов, смарт-процессов, дел, адресов, реквизитов, банковских реквизитов, товарных позиций, UTM-полей и множественных полей. Максимальная длина измеряется в символах, если не указана другая единица измерения.

## Как читать таблицы

В таблицах и настройках полей встречаются разные виды ограничений:

- для строковых полей значение в таблице означает максимальное количество символов
- для полей типа `file` длина пользовательского текста не применяется: в поле передается файл или идентификатор файла
- для полей типа `text`, `mediumText` и `longText` отдельный лимит в символах не возвращается. Фактический объем ограничен типом хранения и общими ограничениями запроса
- для полей типа `integer`, `double`, `date`, `datetime`, `crm_status`, `crm`, `boolean` ограничение проверяется не как длина строки, а как корректность значения: число, дата, идентификатор объекта, код статуса или флаг
- для пользовательских полей лимит зависит от типа поля и настроек конкретного поля

Чтобы найти нужный лимит:

- для пользовательских полей смотрите блок [Как получить лимиты пользовательских полей CRM](#user-field-limits)
- для полей лида, сделки, контакта, компании, предложения, счета и смарт-процесса смотрите блок [Лимиты полей универсальных методов CRM](#universal-fields)
- для UTM-полей, множественных полей, товарных позиций, дел, адресов, реквизитов и банковских реквизитов смотрите блок [Лимиты связанных данных CRM](#related-data)

## Как получить лимиты пользовательских полей CRM {#user-field-limits}

У пользовательских полей нет единого общего лимита. Ограничение зависит от типа поля и его настроек.

#|
|| **Тип пользовательского поля** | **Где смотреть ограничение** ||
|| `string`, `url`, `string_formatted` | Значение `SETTINGS.MAX_LENGTH` в описании поля. Если `MAX_LENGTH = 0`, отдельный лимит длины не задан ||
|| `integer`, `double` | Значения `SETTINGS.MIN_VALUE` и `SETTINGS.MAX_VALUE`. Это ограничение значения, а не количества символов ||
|| `file` | Значение `SETTINGS.MAX_ALLOWED_SIZE`. Это ограничение размера файла в байтах ||
|| `enumeration`, `boolean`, `date`, `datetime`, `crm`, `crm_status` | Ограничение проверяется не как длина строки, а как корректность значения: вариант списка, флаг, дата, идентификатор объекта или код статуса ||
|#

Получить настройки пользовательских полей можно методами:

- [userfieldconfig.list](./universal/userfieldconfig/userfieldconfig-list.md) — для пользовательских полей универсальных объектов CRM
- `crm.*.userfield.list` — для пользовательских полей конкретных объектов CRM, например [crm.lead.userfield.list](./leads/userfield/crm-lead-userfield-list.md), [crm.deal.userfield.list](./deals/user-defined-fields/crm-deal-userfield-list.md), [crm.contact.userfield.list](./contacts/userfield/crm-contact-userfield-list.md), [crm.company.userfield.list](./companies/userfields/crm-company-userfield-list.md)
- [crm.userfield.settings.fields](./universal/user-defined-fields/crm-userfield-settings-fields.md) — чтобы узнать, какие настройки поддерживает тип пользовательского поля

## Лимиты полей универсальных методов CRM {#universal-fields}

Методы [crm.item.*](./universal/index.md) управляют объектами CRM: лидами, сделками, контактами, компаниями, счетами, предложениями и элементами смарт-процессов. Для выбора типа объекта передавайте идентификатор `entityTypeId`.

### Лид

Поля лида возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId = 1`.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `title`, `companyTitle`, `post`, `originatorId`, `originId` | 255 ||
|| `honorific` | 128 ||
|| `stageId`, `sourceId`, `name`, `lastName`, `secondName`, `currencyId` | 50 ||
|| `stageSemanticId` | 3 ||
|| `opened`, `hasPhone`, `hasEmail`, `hasImol`, `isReturnCustomer`, `isManualOpportunity` | 1 ||
|#

### Сделка

Поля сделки возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId = 2`.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `title`, `originatorId`, `originId` | 255 ||
|| `locationId` | 100 ||
|| `stageId`, `previousStageId`, `typeId`, `currencyId`, `sourceId` | 50 ||
|| `stageSemanticId` | 3 ||
|| `opened`, `isNew`, `isRecurring`, `isReturnCustomer`, `isRepeatedApproach`, `closed`, `isManualOpportunity` | 1 ||
|#

### Контакт

Поля контакта возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId = 3`.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `post`, `originatorId`, `originId`, `originVersion` | 255 ||
|| `honorific` | 128 ||
|| `sourceId`, `name`, `lastName`, `secondName`, `typeId` | 50 ||
|| `photo` | 10 ||
|| `opened`, `export`, `hasPhone`, `hasEmail`, `hasImol` | 1 ||
|#

Поле `photo` относится к файлам: значение `10` описывает длину идентификатора файла в хранилище, а не количество символов в пользовательском тексте.

### Компания

Поля компании возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId = 4`.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `title`, `originatorId`, `originId`, `originVersion` | 255 ||
|| `typeId`, `industry`, `currencyId`, `employees` | 50 ||
|| `logo` | 10 ||
|| `opened`, `hasPhone`, `hasEmail`, `hasImol`, `isMyCompany` | 1 ||
|#

Поле `logo` относится к файлам: значение `10` описывает длину идентификатора файла в хранилище, а не количество символов в пользовательском тексте.

### Предложение

Поля предложения возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId = 7`.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `title` | 255 ||
|| `quoteNumber`, `locationId` | 100 ||
|| `stageId`, `currencyId` | 50 ||
|| `opened`, `closed`, `isManualOpportunity` | 1 ||
|#

### Счета

Поля счетов возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId = 31`.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `title` | 255 ||
|| `accountNumber`, `locationId` | 100 ||
|| `stageId`, `previousStageId`, `currencyId`, `sourceId` | 50 ||
|| `opened`, `isManualOpportunity`, `isRecurring` | 1 ||
|#

Поле `comments` имеет тип `text`, поэтому отдельный лимит в символах для него не возвращается.

### Смарт-процессы

Поля смарт-процессов возвращает метод [crm.item.fields](./universal/crm-item-fields.md) с `entityTypeId` смарт-процесса. Набор стандартных полей зависит от настроек типа.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `title` | 255 ||
|| `stageId`, `previousStageId`, `currencyId`, `sourceId` | 50 ||
|| `opened`, `isManualOpportunity` | 1 ||
|#

Поля смарт-процессов, созданные пользователем, проверяйте по настройкам пользовательского поля. Для поля `xmlId` отдельный лимит длины не задан.

## Лимиты связанных данных CRM {#related-data}

### UTM-поля

UTM-поля `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `utmTerm` доступны в лидах, сделках, контактах, компаниях, предложениях, счетах и смарт-процессах.

#|
|| **Поля** | **Максимальная длина, символов** ||
|| Значение каждого UTM-поля | 600 ||
|#

### Множественные поля

Множественные поля телефонов, почты, сайтов, мессенджеров и ссылок описаны типом [crm_multifield](./data-types.md#crm_multifield).

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `VALUE` | 250 ||
|| `COMPLEX_ID` | 100 ||
|| `VALUE_TYPE` | 50 ||
|| `ENTITY_ID`, `TYPE_ID` | 16 ||
|#

### Товарные позиции

Товарные позиции используются в методах [crm.item.productrow.*](./universal/product-rows/index.md).

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `PRODUCT_NAME` | 256 ||
|| `XML_ID` | 255 ||
|| `MEASURE_NAME` | 50 ||
|| `OWNER_TYPE` | 20 ||
|| `TAX_INCLUDED`, `CUSTOMIZED` | 1 ||
|#

### Дела

Поля дел возвращает метод [crm.activity.fields](./timeline/activities/activity-base/crm-activity-fields.md).

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `SUBJECT` | 512 ||
|| `LOCATION` | 256 ||
|| `ORIGINATOR_ID`, `ORIGIN_ID`, `RESULT_SOURCE_ID` | 255 ||
|| `PROVIDER_ID`, `PROVIDER_TYPE_ID`, `PROVIDER_GROUP_ID` | 100 ||
|| `URN` | 64 ||
|| `RESULT_CURRENCY_ID` | 3 ||
|| `IS_HANDLEABLE`, `COMPLETED` | 1 ||
|#

### Адреса

Поля адресов возвращает метод [crm.address.fields](./requisites/addresses/crm-address-fields.md).

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `ADDRESS_1`, `ADDRESS_2` | 1024 ||
|| `CITY`, `REGION`, `PROVINCE`, `COUNTRY` | 128 ||
|| `COUNTRY_CODE` | 100 ||
|| `POSTAL_CODE` | 16 ||
|#

### Реквизиты

Поля реквизитов возвращает метод [crm.requisite.fields](./requisites/universal/crm-requisite-fields.md).

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `RQ_COMPANY_FULL_NAME` | 300 ||
|| `NAME`, `ORIGINATOR_ID`, `RQ_COMPANY_ID`, `RQ_COMPANY_NAME`, `RQ_EMAIL`, `RQ_IDENT_DOC`, `RQ_IDENT_DOC_ISSUED_BY`, `RQ_IFNS`, `RQ_OKVED`, `RQ_BASE_DOC` | 255 ||
|| `RQ_NAME`, `RQ_DIRECTOR`, `RQ_ACCOUNTANT`, `RQ_CEO_NAME`, `RQ_CEO_WORK_POS`, `RQ_CONTACT` | 150 ||
|| `RQ_RESIDENCE_COUNTRY` | 128 ||
|| `RQ_LEGAL_FORM` | 80 ||
|| `RQ_FIRST_NAME`, `RQ_LAST_NAME`, `RQ_SECOND_NAME`, `RQ_IDENT_TYPE`, `RQ_TAX_REGIME`, `RQ_RCS` | 50 ||
|| `CODE`, `XML_ID` | 45 ||
|| `RQ_COMPANY_REG_DATE`, `RQ_PHONE`, `RQ_FAX`, `RQ_IDENT_DOC_DATE`, `RQ_ST_CERT_DATE`, `RQ_VAT_CERT_DATE`, `RQ_CAPITAL` | 30 ||
|| `RQ_IDENT_DOC_SER`, `RQ_IDENT_DOC_NUM`, `RQ_IDENT_DOC_PERS_NUM`, `RQ_IDENT_DOC_DEP_CODE`, `RQ_STATE_REG` | 25 ||
|| `RQ_USRLE`, `RQ_VAT_ID`, `RQ_SIRET`, `RQ_CNPJ`, `RQ_MNPL_REG`, `RQ_CPF` | 20 ||
|| `RQ_INN`, `RQ_OGRNIP`, `RQ_ST_CERT_NUM`, `RQ_VAT_CERT_NUM`, `RQ_SIREN` | 15 ||
|| `RQ_OGRN` | 13 ||
|| `RQ_OKPO`, `RQ_IIN`, `RQ_BIN` | 12 ||
|| `RQ_OKTMO`, `RQ_PESEL` | 11 ||
|| `RQ_EDRPOU`, `RQ_DRFO`, `RQ_ST_CERT_SER`, `RQ_VAT_CERT_SER`, `RQ_KRS` | 10 ||
|| `RQ_KPP`, `RQ_REGON` | 9 ||
|| `RQ_KBE` | 2 ||
|| `ACTIVE`, `ADDRESS_ONLY`, `RQ_VAT_PAYER` | 1 ||
|#

### Банковские реквизиты

Поля банковских реквизитов возвращает метод [crm.requisite.bankdetail.fields](./requisites/bank-detail/crm-requisite-bank-detail-fields.md).

#|
|| **Поля** | **Максимальная длина, символов** ||
|| `COMMENTS` | 500 ||
|| `NAME`, `ORIGINATOR_ID`, `RQ_BANK_NAME`, `RQ_BANK_ADDR` | 255 ||
|| `RQ_ACC_NAME` | 150 ||
|| `RQ_ACC_CURRENCY` | 100 ||
|| `RQ_BANK_CODE`, `RQ_ACC_TYPE`, `RQ_AGENCY_NAME` | 50 ||
|| `CODE`, `XML_ID` | 45 ||
|| `RQ_ACC_NUM`, `RQ_COR_ACC_NUM`, `RQ_IBAN` | 34 ||
|| `RQ_IIK` | 20 ||
|| `RQ_BIK`, `RQ_SWIFT`, `RQ_BIC` | 11 ||
|| `RQ_BANK_ROUTE_NUM` | 9 ||
|| `RQ_MFO` | 6 ||
|| `RQ_CODEB`, `RQ_CODEG` | 5 ||
|| `RQ_RIB` | 2 ||
|| `ACTIVE` | 1 ||
|#

## Продолжите изучение

- [Поля основных объектов CRM](./main-entities-fields.md)
- [Поля объектов CRM](./universal/object-fields.md)
- [Получить поля элемента crm.item.fields](./universal/crm-item-fields.md)
- [Пользовательские поля универсальных объектов CRM](./universal/userfieldconfig/index.md)
