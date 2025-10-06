# Обновить элемент crm.item.update

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «изменения» элементов объекта CRM

Метод обновляет элемент определенного типа объекта CRM, задав ему новые значения из параметра `fields`.

При обновлении элемента производится стандартный ряд проверок, модификаций и автоматических действий:
- проверяются права доступа
- проверяется заполненность обязательных полей, если изменена стадия элемента в рамках того же направления
- проверяется заполненность зависимых от стадий обязательных полей, если изменена стадия элемента в рамках того же направления
- проверяется корректность заполнения полей
- полям присваиваются значения по умолчанию
- если перед сохранением оказывается, что никакие значения полей не были изменены, то сохранение **не производится**
- после сохранения запускаются роботы

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./index.md) или [пользовательского типа](./user-defined-object-types/index.md), чей элемент мы хотим изменить ||
|| **id^*^**
[`integer`][1] | Идентификатор элемента, который мы хотим изменить.

Можно получить методом [`crm.item.list`](crm-item-list.md) или [`crm.item.add`](crm-item-add.md) ||
|| **fields***
[`object`][1] | Объект формата
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где
- `field_n` — название поля
- `value_n` — новое значение поля

У каждого типа сущности CRM свой набор полей. Это значит, что набор полей для изменения Лида не обязан подходить набору полей для изменения Контакта или Смарт-процесса.

Список доступных полей относительно каждого типа сущности описан [ниже](#parametr-fields).

Некорректное поле в `fields` будет проигнорировано.

{% note info %}

В `fields` нужно передавать только те поля, которые нужно изменить

{% endnote %}

||
|| **useOriginalUfNames**
[`boolean`][1] | Параметр для управления форматом имен пользовательских полей в запросе и ответе.   
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

### Параметр fields

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% list tabs %}

- Лид

  Идентификатор объекта CRM **entityTypeId:** `1`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`][1] | Название элемента 
  ||
  || **honorific**
  [`crm_status`](../data-types.md) | Строковый идентификатор обращения лида (например `'HNR_RU_1' = 'г-н'`).

  Список доступных обращений можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "HONOFIRIC" }` ||
  || **name**
  [`string`][1] | Имя ||
  || **secondName**
  [`string`][1] | Отчество ||
  || **lastName**
  [`string`][1] | Фамилия ||
  || **birthdate**
  [`date`][1] | Дата рождения ||
  || **companyTitle**
  [`string`][1] | Название компании ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор источника.
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "SOURCE" }`  ||
  || **sourceDescription**
  [`text`][1] | Дополнительно об источнике ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента.
  
  Например `'NEW' = 'Не обработан'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "STATUS" }` ||
  || **statusDescription**
  [`text`][1] | Дополнительно о стадии ||
  || **post**
  [`string`][1] | Должность ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента  ||
  || **isManualOpportunity**
  [`boolean`][1] | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический
  ||
  || **opportunity**
  [`double`][1] | Сумма ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **comments**
  [`text`][1] | Комментарий ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент  ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 4` ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **originatorId**
  [`string`][1] | Внешний источник ||
  || **originId**
  [`string`][1] | Идентификатор элемента во внешнем источнике ||
  || **webformId**
  [`integer`][1] | Идентификатор CRM Формы ||
  || **observers**
  [`user[]`][1] | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе ||
  || **utmSource**
  [`string`][1] | Рекламная система. Например: Yandex-Direct, Google-Adwords и другие ||
  || **utmMedium**
  [`string`][1] | Тип трафика. Возможные значения:
  
  - CPC — объявления
  - CPM — баннеры ||
  || **utmCampaign**
  [`string`][1] | Обозначение рекламной кампании ||
  || **utmContent**
  [`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
  || **utmTerm**
  [`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. 
  
  О пользовательских полях читайте раздел [{#T}](./user-defined-fields/index.md) 
  
  Значения множественных полей передаются в виде массива.
  
  Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла.
  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}` 
  ||
  || **fm**
  [`multifield[]`](../data-types.md) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [{#T}](../data-types.md#crm_multifield)

  Структура мультиполя:

  - `id` — Уникальный идентификатор мультиполя. Если не существует мультиполя с данным id, то будет создано новое мультиполе
  - `typeId` — Тип мультиполя
  - `valueType` — Тип значения
  - `value` — Значение

  Пример:

  ```bash
    fm: {
        "15": {
            "valueType": "WORK",
            "value": "+79999999",
            "typeId": "PHONE"
        },
        "16": {
            "valueType": "WORK",
            "value": "bitrix@bitrix.ru",
            "typeId": "EMAIL"
        }
    }
  ```
  По умолчанию — `null`
  ||
  |#


- Сделка

  Идентификатор объекта CRM **entityTypeId:** `2`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`][1] | Название элемента ||
  || **typeId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа сущности.

  Например для сделки: `'SALE' = 'Продажа'`

  Список доступных типов сущности можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "DEAL_TYPE" }` ||
  || **categoryId**
  [`integer`][1] | Идентификатор [направления](./category/index.md) (воронки) сделки ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента. 
  
  Например `'NEW' = 'Не обработан'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`][2] применив фильтр:
    - Если сделка находится в общей воронке (направления)  — `{ ENTITY_ID: "DEAL_STAGE" }`
    - Если сделка находится не в общей воронке (направления) — `{ ENTITY_ID: "DEAL_STAGE_{categoryId}" }`, где
      `categoryId` это идентификатор воронки ([направления](./category/index.md)) сделки
  ||
  || **isRecurring**
  [`boolean`][1] | Является ли сделка регулярной. Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **probability**
  [`integer`][1] | Вероятность % ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **isManualOpportunity**
  [`boolean`][1] | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический
  ||
  || **opportunity**
  [`double`][1] | Сумма ||
  || **taxValue**
  [`double`][1] | Сумма налога ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 4` ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **quoteId**
  [`crm_quote`](../data-types.md) | Идентификатор предложения, который будет привязан к сделке ||
  || **begindate**
  [`date`][1] | Дата начала элемента ||
  || **closedate**
  [`date`][1] | Дата окончания элемента ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех.  Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **comments**
  [`text`][1] | Комментарий ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор источника. 
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "SOURCE" }` ||
  || **sourceDescription**
  [`text`][1] | Дополнительно об источнике ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создается элемент ||
  || **additionalInfo**
  [`string`][1] | Дополнительная информация ||
  || **originatorId**
  [`string`][1] | Внешний источник ||
  || **originId**
  [`string`][1] | Идентификатор элемента во внешнем источнике ||
  || **observers**
  [`user[]`][1] | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе ||
  || **locationId**
  [`location`][1] | Идентификатор местоположения. Служебное поле  ||
  || **utmSource**
  [`string`][1] | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
  || **utmMedium**
  [`string`][1] | Тип трафика.  Возможные значения:
  
  - CPC — объявления
  - CPM — баннеры ||
  || **utmCampaign** [`string`][1] | Обозначение рекламной кампании ||
  || **utmContent**
  [`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
  || **utmTerm**
  [`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md)

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла.
  
  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}` 
  ||
  |#


- Контакт

  Идентификатор объекта CRM **entityTypeId:** `3`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **honorific**
  [`crm_status`](../data-types.md) | Строковый идентификатор обращения контакта. 
  
  Например `'HNR_RU_1' = 'г-н'`.

  Список доступных обращений можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "HONOFIRIC" }` ||
  || **name**
  [`string`][1] | Имя ||
  || **secondName**
  [`string`][1] | Отчество ||
  || **lastName**
  [`string`][1] | Фамилия ||
  || **photo**
  [`file`][1] | Фотография ||
  || **birthdate**
  [`date`][1] | Дата рождения ||
  || **typeId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа сущности.
  
  Например для сделки: `'SALE' = 'Продажа'`.
  
  Список доступных типов сущности можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "CONTACT_TYPE" }`  ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор источника.
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "SOURCE" }`  ||
  || **sourceDescription**
  [`text`][1] | Дополнительно об источнике ||
  || **post**
  [`string`][1] | Должность ||
  || **comments**
  [`text`][1] | Комментарий ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **export**
  [`boolean`][1] | Участвует ли контакт в экспорте ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании привязанный к элементу.

  Список компаний можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 4` ||
  || **companyIds**
  [`crm_company`](../data-types.md)     | Массив идентификаторов компаний, которые будут привязаны к элементу ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создается элемент ||
  || **originatorId**
  [`string`][1] | Внешний источник ||
  || **originId**
  [`string`][1] | Идентификатор элемента во внешнем источнике ||
  || **originVersion**
  [`string`][1]          | Версия оригинала ||
  || **observers**
  [`user[]`][1] | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе ||
  || **utmSource**
  [`string`][1] | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
  || **utmMedium**
  [`string`][1] | Тип трафика. Возможные значения:
  
  - CPC — объявления
  - CPM — баннеры ||
  || **utmCampaign**
  [`string`][1] | Обозначение рекламной кампании ||
  || **utmContent**
  [`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
  || **utmTerm**
  [`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md)

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  || **fm**
  [`multifield[]`](../data-types.md) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [{#T}](../data-types.md#crm_multifield)

  Структура мультиполя:

    - `id` — Уникальный идентификатор мультиполя. Если не существует мультиполя с данным id, то будет создано новое мультиполе
    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  Пример:

  ```bash
    fm: {
        "15": {
            "valueType": "WORK",
            "value": "+79999999",
            "typeId": "PHONE"
        },
        "16": {
            "valueType": "WORK",
            "value": "bitrix@bitrix.ru",
            "typeId": "EMAIL"
        }
    }
  ```
  По умолчанию — `null`
  ||
  |#


- Компания

  Идентификатор объекта CRM **entityTypeId:** `4`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`][1] | Название элемента ||
  || **typeId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа сущности.
  
  Например для сделки: `'SALE' = 'Продажа'`.
  
  Список доступных типов сущности можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "COMPANY_TYPE" }` ||
  || **logo**
  [`file`][1] | Логотип ||
  || **bankingDetails**
  [`string`][1] | Банковские реквизиты ||
  || **industry**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа индустрии. 
  
  Например `'IT' = 'Информационные технологии'`.
  
  Список доступных типов индустрий можно узнать с помощью метода [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "INDUSTRY"}` ||
  || **employees**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа количества сотрудников.
  
  Значение берется из списка доступных, например `'EMPLOYEES_1' = 'менее 50'`.

  Список доступных типов количеств сотрудников можно узнать с помощью метода [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "EMPLOYEES" }` ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **revenue**
  [`double`][1] | Годовой оборот ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **comments**
  [`text`][1] | Комментарий ||
  || **isMyCompany**
  [`boolean`][1] | Является ли компания моей компанией ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3`.||
  || **leadId**
  [`crm_lead`][1] | Идентификатор лида, на основании, которого создается элемент.||
  || **originatorId**
  [`string`][1] | Внешний источник ||
  || **originId**
  [`string`][1] | Идентификатор элемента во внешнем источнике ||
  || **originVersion**
  [`string`][1] | Версия оригинала ||
  || **observers**
  [`user[]`][1] | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе ||
  || **utmSource**
  [`string`][1] | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
  || **utmMedium**
  [`string`][1] | Тип трафика Возможные значения:
  - CPC — объявления
  - CPM — баннеры ||
  || **utmCampaign**
  [`string`][1] | Обозначение рекламной кампании ||
  || **utmContent**
  [`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
  || **utmTerm**
  [`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md)

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла

  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  || **fm**
  [`multifield[]`](../data-types.md) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [{#T}](../data-types.md#crm_multifield)

  Структура мультиполя:

    - `id` — Уникальный идентификатор мультиполя. Если не существует мультиполя с данным id, то будет создано новое мультиполе
    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  Пример:

  ```bash
    fm: {
        "15": {
            "valueType": "WORK",
            "value": "+79999999",
            "typeId": "PHONE"
        },
        "16": {
            "valueType": "WORK",
            "value": "bitrix@bitrix.ru",
            "typeId": "EMAIL"
        }
    }
  ```
  По умолчанию — `null`
  ||
  |#


- Предложение

  Идентификатор объекта CRM  **entityTypeId:** `7`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`][1] | Название элемента ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **content**
  [`text`][1] | Содержание ||
  || **terms**
  [`text`][1] | Условия ||
  || **comments**
  [`text`][1] | Комментарий ||
  || **dealId**
  [`crm_deal`](../data-types.md) | Идентификатор привязанной сделки ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создается элемент ||
  || **storageTypeId**
  [`integer`][1] | Идентификатор типа хранения Возможные значения:
  - `1` — файл
  - `2` — WebDAV
  - `3` — диск
  ||
  || **storageElementIds**
  [`integer`][1] | Массив файлов ||
  || **webformId**
  [`integer`][1] | Идентификатор CRM Формы ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 4` ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **locationId**
  [`location`][1] | Идентификатор местоположения. Служебное поле ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **isManualOpportunity**
  [`boolean`][1] | Режим расчета суммы.

  - `Y` — ручной
  - `N` — автоматический
  ||
  || **opportunity**
  [`double`][1] | Сумма ||
  || **taxValue**
  [`double`][1] | Сумма налога ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента. 
  
  Например `'DRAFT' = 'Новое'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "QUOTE_STATUS" }` ||
  || **begindate**
  [`date`][1] | Дата начала элемента ||
  || **closedate**
  [`date`][1] | Дата окончания элемента ||
  || **actualDate**
  [`date`][1] | Актуально до ||
  || **mycompanyId**
  [`crm_company`](../data-types.md) | Идентификатор моей компании ||
  || **utmSource**
  [`string`][1] | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
  || **utmMedium**
  [`string`][1] | Тип трафика.
  
  - CPC — объявления
  - CPM — баннеры ||
  || **utmCampaign**
  [`string`][1] | Обозначение рекламной кампании ||
  || **utmContent**
  [`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
  || **utmTerm**
  [`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md).

  - Значения множественных полей передаются в виде массива
  - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#


- Счет

  Идентификатор объекта CRM **entityTypeId:** `31`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`][1] | Название элемента
  ||
  || **xmlId**
  [`string`][1] | Внешний код ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет
  ||
  || **webformId**
  [`integer`][1] | Идентификатор CRM Формы ||
  || **begindate**
  [`date`][1] | Дата начала элемента ||
  || **closedate**
  [`date`][1] | Дата окончания элемента ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 4` ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3` ||
  || **observers**
  [`user[]`][1] | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента. 
  
  Например `'DT31_13:N' = 'Новый'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`][2], применив фильтр: `{ ENTITY_ID: "SMART_INVOICE_STAGE_{categoryId}" }`, где
  `categoryId` — идентификатор воронки счетов по умолчанию. Его можно узнать с помощью [`crm.category.list`](category/crm-category-list.md) по `entityTypeId = 31` ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор источника.
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "SOURCE" }` ||
  || **sourceDescription**
  [`text`][1] | Дополнительно об источнике ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **isManualOpportunity**
  [`boolean`][1] | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический
  ||
  || **opportunity**
  [`double`][1] | Сумма ||
  || **taxValue**
  [`double`][1] | Сумма налога ||
  || **mycompanyId**
  [`crm_company`](../data-types.md) | Идентификатор моей компании ||
  || **comments**
  [`text`][1] | Комментарий ||
  || **locationId**
  [`location`][1] | Идентификатор местоположения. Служебное поле ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md).

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#


- Смарт-процесс

  Идентификатор объекта CRM **entityTypeId:** можно получить методом [`crm.type.list`](user-defined-object-types/crm-type-list.md) или создать новый методом [`crm.type.add`](user-defined-object-types/crm-type-add.md)

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`][1] | Название элемента  ||
  || **xmlId**
  [`string`][1] | Внешний код ||
  || **assignedById**
  [`user`][1] | Идентификатор ответственного за элемент  ||
  || **opened**
  [`boolean`][1] | Является ли элемент доступным для всех.

  - `Y` — да
  - `N` — нет
  ||
  || **webformId**
  [`integer`][1] | Идентификатор CRM Формы ||
  || **begindate**
  [`date`][1] | Дата начала элемента.

  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса.
  ||
  || **closedate**
  [`date`][1] | Дата окончания элемента.

  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 4`.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3`.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](crm-item-list.md) по `entityTypeId = 3`.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса ||
  || **observers**
  [`user[]`][1] | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  Доступно лишь при включенной настройке `isObserversEnabled` у соответствующего смарт-процесса ||
  || **categoryId**
  [`crm_category`](../data-types.md) | Идентификатор воронки элемента смарт-процесса. 

  Если идентификатор не указан, то смарт-процесс будет перемещен в основную воронку.

  Список доступных воронок можно узнать с помощью [`crm.category.list`](category/crm-category-list.md) применив соответсвующий `entityTypeId` ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента. 
  
  Например `'DT1220_30:NEW' = 'Начало'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "DYNAMIC_{entityTypeId}_STAGE_{categoryId}" }`, где
  - `entityTypeId` — идентификатор типа смарт-процесса
  - `categoryId` — идентификатор воронки (направления) элемента смарт-процесса

  [Подробнее о воронках (направлениях)](category/index.md).

  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса  ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор источника. (например `'CALL' = 'Звонок'`).
  
  Список доступных источников можно узнать с помощью [`crm.status.list`][2] применив фильтр `{ ENTITY_ID: "SOURCE" }`.

  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса  ||
  || **sourceDescription**
  [`text`][1] | Дополнительно об источнике.

  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса  ||
  || **isManualOpportunity**
  [`boolean`][1] | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса||
  || **opportunity**
  [`double`][1] | Сумма.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса ||
  || **taxValue**
  [`double`][1] | Сумма налога.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса ||
  || **mycompanyId**
  [`crm_company`](../data-types.md) | Идентификатор моей компании.

  Доступно лишь при включенной настройке `isMycompanyEnabled` у соответствующего смарт-процесса ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md).

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](../../files/how-to-update-files.md) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#

  {% note info "Настройки смарт-процесса" %}

  Подробнее об управлении настройками смарт-процессов Вы можете прочитать в [{#T}](./user-defined-object-types/index.md)

  {% endnote %}

{% endlist %}

## Как обновить пользовательское поле типа file

1. Загрузить новый файл вместо старого (не множественное поле)

    Чтобы заменить файл в не множественном поле, просто загрузите новый файл. Старый будет удален автоматически.

    ```json
    {
        "fields": {
            "ufCrm1617027453943": [
                "myfile.pdf",
                "...base64_encoded_file_content..."
            ]
        }
    }
    ```

2. Удалить значение пользовательского поля типа файл

    Для этого достаточно передать пустую строку (`''`) вместо значения.

3. Оставить значение не множественного поля типа файл без изменений

    Самый простой вариант — не добавлять в `fields` ключ с этим полем.
    
    Но если надо и передать, и не изменить, то в качестве значения надо передать список, где по ключу `id` будет идентификатор файла.

    ```json
    {
        "fields": {
            "ufCrm1617027453943": {
                "id": 433
            }
        }
    }
    ```

    {% note warning %}
    
    Если в `id` передать отличное от текущего значение, то значение поля обнулится и файл будет стерт.
    
    {% endnote %}

4. Работа с множественным полем типа файл

    Значение множественного поля — это массив. Каждый элемент массива подчиняется тем же правилам, что и для не множественных значений.

    **Как частично перезаписать значения множественного поля типа файл**

    Например, сейчас в множественном поле типа файл находятся значения `[12, 255, 44]`.

    Необходимо оставить файлы `12` и `44`, а вместо `255` загрузить новый.

    Запрос должен выглядеть следующим образом:

    ```json
    {
        "fields": {
            "ufCrm1617027453943": [
                {
                    "id": 12
                },
                {
                    "id": 44
                },
                [
                    "myNewFile.pdf",
                    "...base64_encoded_file_content..."
                ]
            ]
        }
    }
    ```

## Примеры кода

Обновить сделку с `id = 351`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":351,"fields":{"title":"REST Сделка #1","stageId":"C9:UC_NYL06U","assignedById":6,"observers":[1,2,3],"opened":"N","typeId":"SERVICE","opportunity":10000,"currencyId":"USD","additionalInfo":"Изменение сделки через REST","isManualOpportunity":"N","utmSource":"google","ufCrm_1721244707107":200.05,"parentId1220":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":351,"fields":{"title":"REST Сделка #1","stageId":"C9:UC_NYL06U","assignedById":6,"observers":[1,2,3],"opened":"N","typeId":"SERVICE","opportunity":10000,"currencyId":"USD","additionalInfo":"Изменение сделки через REST","isManualOpportunity":"N","utmSource":"google","ufCrm_1721244707107":200.05,"parentId1220":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.update
    ```

- JS

    ```js
        BX24.callMethod(
            'crm.item.update',
            {
                entityTypeId: 2,
                id: 351,
                fields: {
                    title: "REST Сделка #1",
                    stageId: "C9:UC_NYL06U",
                    assignedById: 6,
                    observers: [1, 2, 3],
                    opened: "N",
                    typeId: "SERVICE",
                    opportunity: 10000,
                    currencyId: "USD",
                    additionalInfo: "Изменение сделки через REST",
                    isManualOpportunity: "N",
                    utmSource: "google",
                    ufCrm_1721244707107: 200.05,
                    parentId1220: 2,
                },
            },
            (result) => {
                if (result.error())
                {
                    console.error(result.error());

                    return;
                }

                console.info(result.data());
            },
        );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.update',
        [
            'entityTypeId' => 2,
            'id' => 351,
            'fields' => [
                'title' => "REST Сделка #1",
                'stageId' => "C9:UC_NYL06U",
                'assignedById' => 6,
                'observers' => [1, 2, 3],
                'opened' => "N",
                'typeId' => "SERVICE",
                'opportunity' => 10000,
                'currencyId' => "USD",
                'additionalInfo' => "Изменение сделки через REST",
                'isManualOpportunity' => "N",
                'utmSource' => "google",
                'ufCrm_1721244707107' => 200.05,
                'parentId1220' => 2,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- PHP (B24PhpSdk)

    ```php
    try {
        $entityTypeId = 1; // Set your entity type ID
        $id = 123; // Set the ID of the item to update
        $fields = [
            'TITLE' => 'Updated Title',
            'DATE_MODIFIED' => (new DateTime())->format(DateTime::ATOM), // Example DateTime field
            // Add other fields as necessary
        ];

        $itemService = $serviceBuilder->getCRMScope()->item();
        $updateResult = $itemService->update($entityTypeId, $id, $fields);

        if ($updateResult->isSuccess()) {
            print("Item updated successfully: " . json_encode($updateResult));
        } else {
            print("Failed to update item.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 351,
            "createdTime": "2024-07-23T19:10:26+02:00",
            "dateCreateShort": null,
            "updatedTime": "2024-07-23T18:19:21+02:00",
            "dateModifyShort": null,
            "createdBy": 1,
            "updatedBy": 1,
            "assignedById": 6,
            "opened": "N",
            "leadId": null,
            "companyId": 0,
            "contactId": 0,
            "quoteId": null,
            "title": "REST Сделка #1",
            "productId": null,
            "categoryId": 9,
            "stageId": "C9:UC_NYL06U",
            "stageSemanticId": "P",
            "isNew": "N",
            "isRecurring": "N",
            "isReturnCustomer": "N",
            "isRepeatedApproach": "N",
            "closed": "N",
            "typeId": "SERVICE",
            "opportunity": 10000,
            "isManualOpportunity": "N",
            "taxValue": 0,
            "currencyId": "USD",
            "probability": null,
            "comments": "",
            "begindate": "2024-07-23T02:00:00+02:00",
            "begindateShort": null,
            "closedate": "2024-07-31T02:00:00+02:00",
            "closedateShort": null,
            "eventDate": null,
            "eventDateShort": null,
            "eventId": null,
            "eventDescription": null,
            "locationId": null,
            "webformId": 0,
            "sourceId": "",
            "sourceDescription": "",
            "originatorId": null,
            "originId": null,
            "additionalInfo": "Изменение сделки через REST",
            "searchContent": "351 Сделка #351 10200.00 Российский рубль Не Придумал Придумал Продажа Название2134234233 23.07.2024 31.07.2024",
            "orderStage": null,
            "movedBy": 1,
            "movedTime": "2024-07-23T18:19:21+02:00",
            "lastActivityBy": 1,
            "lastActivityTime": "2024-07-23T18:10:26+02:00",
            "isWork": null,
            "isWon": null,
            "isLose": null,
            "receivedAmount": null,
            "lostAmount": null,
            "hasProducts": null,
            "ufCrm_1721244707107": 200.05,
            "parentId1220": 2,
            "utmSource": "google",
            "utmMedium": null,
            "utmCampaign": null,
            "utmContent": null,
            "utmTerm": null,
            "observers": [
                1,
                2,
                3
            ],
            "contactIds": [],
            "entityTypeId": 2
        }
    },
    "time": {
        "start": 1721751560.824475,
        "finish": 1721751564.481578,
        "duration": 3.6571030616760254,
        "processing": 3.1893951892852783,
        "date_start": "2024-07-23T18:19:20+02:00",
        "date_finish": "2024-07-23T18:19:24+02:00",
        "operating": 3.1893470287323
    }
}
```

### Возвращаемые значения

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа, содержит единственный ключ `item` ||
|| **item**
[`item`](./object-fields.md) | Информация об обновленном элементе, [описание полей](./object-fields.md) ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

{% note info " " %}

По умолчанию имена пользовательских полей передаются и возвращаются в camelCase, например `ufCrm2_1639669411830`.
При передаче параметра `useOriginalUfNames` со значением `Y` пользовательские поля будут возвращаться с оригинальными именами, например `UF_CRM_2_1639669411830`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                           | **Описание**                                                       | **Значение**                                                                                    ||
|| `403`      | `allowed_only_intranet_user`      | Действие разрешено только интранет-пользователям                   | Пользователь не является интранет-пользователем                                                 ||
|| `400`      | `NOT_FOUND`                       | Смарт-процесс не найден                                            | Возникает, при передаче невалидного `entityTypeId`                                              ||
|| `400`      | `ACCESS_DENIED`                   | Доступ запрещен                                                    | У пользователя нет прав на изменение элементов типа `entityTypeId`                              ||
|| `400`      | `CRM_FIELD_ERROR_VALUE_NOT_VALID` | Неверное значение поля "`field`"                                   | Передано неправильное значения поля `field`                                                     ||
|| `400`      | `100`                             | Expected iterable value for multiple field, but got `type` instead | В одно из множественных полей было передано значения типа `type`, хотя ожидался итерируемый тип ||
|| `400`      | `-`                               | Недостаточно прав на смену стадии                                  | Если пользователь пытается изменить стадию элемента, при том, что у него недостаточно прав      ||
|| `400`      | `UPDATE_DYNAMIC_ITEM_RESTRICTED`  | Вы не можете изменить элемент из-за ограничений вашего тарифа      | Ограничения тарифа не позволяют изменять элементы смарт-процессов                               ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](crm-item-add.md)
- [{#T}](crm-item-get.md)
- [{#T}](crm-item-list.md)
- [{#T}](crm-item-delete.md)
- [{#T}](crm-item-fields.md)
- [{#T}](./object-fields.md)

[1]: ../../data-types.md
[2]: ../data-types.md
[3]: ../status/crm-status-list.md