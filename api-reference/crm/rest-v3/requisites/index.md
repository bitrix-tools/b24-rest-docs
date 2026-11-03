# Реквизиты в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Реквизиты хранят юридические данные контакта или компании: название организации, ИНН, КПП, ОГРН, данные документа физического лица. К реквизиту относятся банковские реквизиты — расчетные счета — и адреса. Реквизиты клиента и моей компании выбирают в сделке, предложении, счете или смарт-процессе, чтобы подставить их в документы.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [реквизиты вашей компании в Битрикс24](https://helpdesk.bitrix24.ru/open/15989720)

## Как выбрать метод

#|
|| **Задача** | **Методы** ||
|| Узнать, какие шаблоны реквизитов есть и какие поля в них можно заполнить | [crm.<тип>.requisite.preset.list](./crm-entity-requisite-preset-list-rest-v3.md), [crm.<тип>.requisite.preset.get](./crm-entity-requisite-preset-get-rest-v3.md) ||
|| Создать, изменить, получить или удалить реквизит контакта или компании | [crm.<тип>.requisite.add](./crm-entity-requisite-add-rest-v3.md), [update](./crm-entity-requisite-update-rest-v3.md), [get](./crm-entity-requisite-get-rest-v3.md), [list](./crm-entity-requisite-list-rest-v3.md), [delete](./crm-entity-requisite-delete-rest-v3.md) ||
|| Добавить расчетный счет к реквизиту | [crm.<тип>.requisite.bankrequisite.*](./crm-entity-requisite-bank-requisite-add-rest-v3.md) ||
|| Получить все расчетные счета контакта или компании | [crm.<тип>.bankrequisite.list](./crm-entity-bank-requisite-list-rest-v3.md) ||
|| Добавить юридический, фактический или другой адрес к реквизиту | [crm.<тип>.requisite.address.*](./crm-entity-requisite-address-add-rest-v3.md) ||
|| Выбрать реквизиты клиента в сделке, предложении, счете, документе или смарт-процессе | [crm.<тип>.clientrequisite.get](./crm-entity-client-requisite-get-rest-v3.md), [crm.<тип>.clientrequisite.set](./crm-entity-client-requisite-set-rest-v3.md) ||
|| Выбрать реквизиты моей компании в сделке или счете | [crm.<тип>.mycompanyrequisite.get](./crm-entity-my-company-requisite-get-rest-v3.md), [crm.<тип>.mycompanyrequisite.set](./crm-entity-my-company-requisite-set-rest-v3.md) ||
|| Выгрузить или найти реквизиты всех контактов и компаний | [crm.requisite.list](./crm-requisite-list-rest-v3.md) ||
|#

Имена методов пишутся в нижнем регистре: `crm.company.requisite.bankrequisite.add`.

## Как начать работу

1. Выберите шаблон методом [crm.company.requisite.preset.list](./crm-entity-requisite-preset-list-rest-v3.md). Шаблон определяет, какие поля можно заполнить: элементы `fields` с `kind: "requisiteField"` — это имена полей реквизита
2. Создайте реквизит методом [crm.company.requisite.add](./crm-entity-requisite-add-rest-v3.md): владелец `companyId`, шаблон `presetId`, название `name` и поля шаблона
3. Добавьте расчетный счет методом [crm.company.requisite.bankrequisite.add](./crm-entity-requisite-bank-requisite-add-rest-v3.md) и адрес методом [crm.company.requisite.address.add](./crm-entity-requisite-address-add-rest-v3.md)
4. Выберите реквизит и счет в сделке методом [crm.deal.clientrequisite.set](./crm-entity-client-requisite-set-rest-v3.md)

## Связь с другими объектами

Реквизиты связаны с владельцем, шаблоном и элементами CRM, в которых их выбирают.

**Контакт и компания.** Реквизит принадлежит одному контакту или одной компании. Тип владельца задает сегмент `contact` или `company` в имени метода, идентификатор — поле `contactId` или `companyId`. Владельца нельзя изменить после создания. Сегмент в имени метода должен совпадать с владельцем: реквизит компании метод `crm.contact.requisite.get` не найдет. Право на просмотр владельца дает право читать его реквизиты, право на изменение — менять их.

**Моя компания.** Реквизиты моей компании читаются и меняются методами `crm.company.requisite.*` и `crm.company.bankrequisite.list` с идентификатором моей компании. Идентификаторы моих компаний возвращает метод [crm.mycompany.list](../items/crm-entity-list-rest-v3.md).

**Шаблон.** Поле `presetId` — шаблон реквизита: организация, ИП, физическое лицо и шаблоны других стран. В реквизит можно записать только поля его шаблона. От страны шаблона зависит и набор полей банковского реквизита. Шаблоны настраивают в интерфейсе Битрикс24, методы группы их только читают.

**Сделка, предложение, счет, документ, смарт-процесс.** В элементе выбирают реквизит и банковский реквизит клиента — методы `crm.<тип>.clientrequisite.*`. В сделке и счете выбирают еще реквизит моей компании — методы `crm.<тип>.mycompanyrequisite.*`. Эти реквизиты подставляются в документы элемента.

**Адреса.** Адрес реквизита определяет пара `requisiteId` и `typeId`. Адреса контакта или компании без привязки к конкретному реквизиту — в методах группы [Адреса](../addresses/index.md).

## Типы объектов

#|
|| **Методы** | **Типы объектов** ||
|| `crm.<тип>.requisite.*`, `crm.<тип>.bankrequisite.list` | Компания `company`, контакт `contact` ||
|| `crm.<тип>.clientrequisite.*` | Сделка `deal`, предложение `quote`, счет `smartinvoice`, документ CRM `smartdocument`, смарт-процесс `smartprocess<entityTypeId>` ||
|| `crm.<тип>.mycompanyrequisite.*` | Сделка `deal`, счет `smartinvoice` ||
|| `crm.requisite.list` | Без типа, реквизиты всех контактов и компаний ||
|#

Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

## Поля реквизита {#fields}

Имена полей пишутся в camelCase. Поля возвращаются в ответе, только если их перечислить в `select`. Незаполненные поля приходят как `null`. В реквизит можно записать только поля его шаблона.

#|
|| **Поле**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор реквизита. Только для чтения ||
|| **companyId**, **contactId**
[`integer`](../../../data-types.md) | Владелец реквизита. Задается при создании и не меняется. В `crm.requisite.list` вместо них — `ownerTypeId` и `ownerId` ||
|| **presetId**
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизита ||
|| **name**
[`string`](../../../data-types.md) | Название реквизита ||
|| **active**
[`boolean`](../../../data-types.md) | `true` — реквизит активен, `false` — неактивен ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код ||
|| **originatorId**
[`string`](../../../data-types.md) | Идентификатор внешнего источника данных ||
|| **createdTime**, **updatedTime**
[`datetime`](../../../data-types.md) | Дата создания и изменения. Только для чтения ||
|| **createdById**, **updatedById**
[`integer`](../../../data-types.md) | Кто создал и изменил реквизит. Только для чтения ||
|| **fullName**, **firstName**, **lastName**, **secondName**
[`string`](../../../data-types.md) | ФИО, имя, фамилия, отчество ||
|| **companyTitle**, **companyFullName**
[`string`](../../../data-types.md) | Сокращенное и полное наименование организации ||
|| **companyIdentifier**
[`string`](../../../data-types.md) | Идентификатор организации ||
|| **companyRegistrationDate**
[`string`](../../../data-types.md) | Дата государственной регистрации ||
|| **directorName**, **accountantName**
[`string`](../../../data-types.md) | Генеральный директор, главный бухгалтер ||
|| **ceoName**, **ceoPosition**
[`string`](../../../data-types.md) | ФИО и должность руководителя ||
|| **contactPerson**, **emailAddress**, **phoneNumber**, **faxNumber**
[`string`](../../../data-types.md) | Контактное лицо, e-mail, телефон, факс ||
|| **identificationTypeId**
[`string`](../../../data-types.md) | Способ идентификации ||
|| **identityDocumentType**, **identityDocumentSeries**, **identityDocumentNumber**, **identityDocumentPersonalNumber**, **identityDocumentIssueDate**, **identityDocumentIssuedBy**, **identityDocumentDepartmentCode**
[`string`](../../../data-types.md) | Документ, удостоверяющий личность: вид, серия, номер, личный номер, дата выдачи, кем выдан, код подразделения ||
|| **inn**, **kpp**, **ogrn**, **ogrnip**, **okpo**, **oktmo**, **okved**, **ifns**
[`string`](../../../data-types.md) | ИНН, КПП, ОГРН, ОГРНИП, ОКПО, ОКТМО, ОКВЭД, ИФНС ||
|| **basisDocument**
[`string`](../../../data-types.md) | Основание действия ||
|| **registrationCertificateSeries**, **registrationCertificateNumber**, **registrationCertificateDate**
[`string`](../../../data-types.md) | Серия, номер и дата свидетельства о государственной регистрации ||
|| **vatPayer**
[`boolean`](../../../data-types.md) | `true` — плательщик НДС, `false` — нет ||
|| **vatNumber**, **vatCertificateSeries**, **vatCertificateNumber**, **vatCertificateDate**
[`string`](../../../data-types.md) | VAT ID, серия, номер и дата свидетельства плательщика НДС ||
|| **residenceCountry**
[`string`](../../../data-types.md) | Страна резидентства ||
|| **edrpou**, **drfo**
[`string`](../../../data-types.md) | ЕДРПОУ и ДРФО — для Украины ||
|| **kbe**, **iin**, **bin**
[`string`](../../../data-types.md) | КБе, ИИН, БИН — для Казахстана ||
|| **usrle**
[`string`](../../../data-types.md) | Handelsregisternummer — для Германии ||
|| **regon**, **krs**, **pesel**
[`string`](../../../data-types.md) | REGON, KRS, PESEL — для Польши ||
|| **siret**, **siren**, **rcs**, **legalForm**, **shareCapital**
[`string`](../../../data-types.md) | SIRET, SIREN, RCS, организационно-правовая форма, уставный капитал — для Франции ||
|| **cnpj**, **cpf**, **stateRegistration**, **municipalRegistration**, **taxRegimeId**
[`string`](../../../data-types.md) | CNPJ, CPF, регистрация штата и муниципалитета, налоговый режим — для Бразилии ||
|| **addresses**
[`object[]`](../../../data-types.md) | Адреса реквизита. Только для чтения, возвращаются методами `crm.<тип>.requisite.get` и `list`, если запрошены в `select`. [Поля адреса](#address-fields) ||
|| **bankRequisites**
[`object[]`](../../../data-types.md) | Банковские реквизиты. Только для чтения, возвращаются так же, как `addresses`. [Поля](#nested-bank-fields) ||
|#

Длина значений ограничена. Если значение длиннее, метод отвечает ошибкой с допустимой длиной, например «Сократите значение поля до 15 символов» для `inn`.

## Поля банковского реквизита {#bank-fields}

Набор банковских полей зависит от страны шаблона реквизита. Для российского шаблона это `name`, `comments`, `bankName`, `bankAddress`, `bik`, `bankAccountNumber`, `bankAccountCurrency`, `correspondentAccountNumber`, `swift`. Методы чтения возвращают все поля набора, незаполненные — как `null`. Поле не из набора метод записи отклоняет.

#|
|| **Поле**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита. Только для чтения ||
|| **requisiteId**
[`integer`](../../../data-types.md) | Идентификатор реквизита. Задается при создании и не меняется ||
|| **name**
[`string`](../../../data-types.md) | Название, до 255 символов ||
|| **comments**
[`string`](../../../data-types.md) | Комментарий ||
|| **bankName**, **bankAddress**
[`string`](../../../data-types.md) | Наименование и адрес банка, до 255 символов ||
|| **bik**
[`string`](../../../data-types.md) | БИК, до 11 символов ||
|| **bankAccountNumber**
[`string`](../../../data-types.md) | Номер расчетного счета, до 34 символов ||
|| **correspondentAccountNumber**
[`string`](../../../data-types.md) | Корреспондентский счет, до 34 символов ||
|| **bankAccountCurrency**
[`string`](../../../data-types.md) | Валюта счета, до 100 символов ||
|| **bankAccountHolderName**
[`string`](../../../data-types.md) | Владелец счета, до 150 символов ||
|| **bankAccountType**
[`string`](../../../data-types.md) | Тип счета, до 50 символов ||
|| **bankCode**, **bankAgencyName**
[`string`](../../../data-types.md) | Код банка и название отделения, до 50 символов ||
|| **bankRoutingNumber**
[`string`](../../../data-types.md) | Routing Number, до 9 символов ||
|| **iban**
[`string`](../../../data-types.md) | IBAN, до 34 символов ||
|| **swift**, **bic**
[`string`](../../../data-types.md) | SWIFT и BIC, до 11 символов ||
|| **mfo**
[`string`](../../../data-types.md) | МФО, до 6 символов — для Украины ||
|| **iik**
[`string`](../../../data-types.md) | ИИК, до 20 символов — для Казахстана ||
|| **codeb**, **codeg**, **rib**
[`string`](../../../data-types.md) | Code Banque, Code Guichet — до 5 символов, Clé RIB — до 2 символов, для Франции ||
|#

### Банковские реквизиты внутри реквизита {#nested-bank-fields}

В `bankRequisites` методов `crm.<тип>.requisite.get` и `list` поля называются иначе, чем в методах банковских реквизитов, и пустые значения приходят пустой строкой. Есть поля `id`, `name`, `active`, `sort`, `comments`, `bankName`, `bankAddress`, `bankCode`, `bankRoutingNumber`, `agencyName`, `bik`, `mfo`, `accountName`, `accountNumber`, `accountType`, `accountCurrency`, `correspondentAccountNumber`, `iik`, `iban`, `swift`, `bic`, `codeB`, `codeG`, `rib`.

## Поля адреса реквизита {#address-fields}

Адрес определяет пара `requisiteId` и `typeId`. Незаполненные поля приходят пустой строкой.

#|
|| **Поле**
`тип` | **Описание** ||
|| **requisiteId**
[`integer`](../../../data-types.md) | Идентификатор реквизита. Задается при создании ||
|| **typeId**
[`integer`](../../../data-types.md) | Тип адреса: `1` — фактический, `4` — адрес регистрации, `6` — юридический, `9` — адрес бенефициара, `11` — адрес доставки. Список возвращает метод [crm.dictionary.addresstype.list](../dictionaries/crm-dictionary-list-rest-v3.md). Задается при создании ||
|| **address1**, **address2**
[`string`](../../../data-types.md) | Улица и дом, квартира или офис ||
|| **city**, **postalCode**
[`string`](../../../data-types.md) | Город, почтовый индекс ||
|| **region**, **province**
[`string`](../../../data-types.md) | Район, область ||
|| **country**
[`string`](../../../data-types.md) | Страна ||
|| **countryCode**
[`string`](../../../data-types.md) | Код страны из справочника местоположений Битрикс24. Сохраняется, только если совпадает с названием страны в `country` ||
|#

## Методы полей

У каждой группы есть методы описания полей: `crm.<тип>.requisite.field.list` и `field.get`, `crm.<тип>.requisite.preset.field.list` и `field.get`, `crm.<тип>.requisite.bankrequisite.field.list` и `field.get`, `crm.<тип>.requisite.address.field.list` и `field.get`, `crm.<тип>.clientrequisite.field.list` и `field.get`, `crm.<тип>.mycompanyrequisite.field.list` и `field.get`, `crm.requisite.field.list` и `field.get`. Они устроены как остальные методы полей REST 3.0: `field.list` принимает `select` со списком признаков, например `["name","type","editable","filterable","sortable"]`, `field.get` — еще и `name` с именем поля.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Реквизиты

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.requisite.add](./crm-entity-requisite-add-rest-v3.md) | Добавляет реквизит контакту или компании ||
|| [crm.<тип>.requisite.update](./crm-entity-requisite-update-rest-v3.md) | Изменяет реквизит ||
|| [crm.<тип>.requisite.get](./crm-entity-requisite-get-rest-v3.md) | Возвращает реквизит по идентификатору ||
|| [crm.<тип>.requisite.list](./crm-entity-requisite-list-rest-v3.md) | Возвращает реквизиты контакта или компании ||
|| [crm.<тип>.requisite.delete](./crm-entity-requisite-delete-rest-v3.md) | Удаляет реквизит ||
|| [crm.requisite.list](./crm-requisite-list-rest-v3.md) | Возвращает реквизиты всех контактов и компаний ||
|#

### Шаблоны реквизитов

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.requisite.preset.get](./crm-entity-requisite-preset-get-rest-v3.md) | Возвращает шаблон реквизита с составом полей ||
|| [crm.<тип>.requisite.preset.list](./crm-entity-requisite-preset-list-rest-v3.md) | Возвращает все активные шаблоны ||
|#

### Банковские реквизиты

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.requisite.bankrequisite.add](./crm-entity-requisite-bank-requisite-add-rest-v3.md) | Добавляет банковский реквизит к реквизиту ||
|| [crm.<тип>.requisite.bankrequisite.update](./crm-entity-requisite-bank-requisite-update-rest-v3.md) | Изменяет банковский реквизит ||
|| [crm.<тип>.requisite.bankrequisite.get](./crm-entity-requisite-bank-requisite-get-rest-v3.md) | Возвращает банковский реквизит по идентификатору ||
|| [crm.<тип>.requisite.bankrequisite.list](./crm-entity-requisite-bank-requisite-list-rest-v3.md) | Возвращает банковские реквизиты реквизита ||
|| [crm.<тип>.requisite.bankrequisite.delete](./crm-entity-requisite-bank-requisite-delete-rest-v3.md) | Удаляет банковский реквизит ||
|| [crm.<тип>.bankrequisite.list](./crm-entity-bank-requisite-list-rest-v3.md) | Возвращает банковские реквизиты контакта или компании ||
|#

### Адреса реквизита

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.requisite.address.add](./crm-entity-requisite-address-add-rest-v3.md) | Добавляет адрес к реквизиту ||
|| [crm.<тип>.requisite.address.update](./crm-entity-requisite-address-update-rest-v3.md) | Изменяет адрес реквизита ||
|| [crm.<тип>.requisite.address.get](./crm-entity-requisite-address-get-rest-v3.md) | Возвращает адрес реквизита по типу ||
|| [crm.<тип>.requisite.address.list](./crm-entity-requisite-address-list-rest-v3.md) | Возвращает адреса реквизита ||
|| [crm.<тип>.requisite.address.delete](./crm-entity-requisite-address-delete-rest-v3.md) | Удаляет адрес реквизита ||
|#

### Реквизиты в элементах CRM

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.clientrequisite.get](./crm-entity-client-requisite-get-rest-v3.md) | Возвращает реквизиты клиента, выбранные в элементе ||
|| [crm.<тип>.clientrequisite.set](./crm-entity-client-requisite-set-rest-v3.md) | Выбирает реквизиты клиента в элементе ||
|| [crm.<тип>.mycompanyrequisite.get](./crm-entity-my-company-requisite-get-rest-v3.md) | Возвращает реквизиты моей компании, выбранные в сделке или счете ||
|| [crm.<тип>.mycompanyrequisite.set](./crm-entity-my-company-requisite-set-rest-v3.md) | Выбирает реквизиты моей компании в сделке или счете ||
|#
