{% list tabs %}

- Лид

  Идентификатор объекта CRM **entityTypeId:** `1`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`](/api-reference/data-types.html) | Название элемента.

  По умолчанию генерируется по шаблону `{entityTypeName} #{id}`, где
  - `entityTypeName` — название сущности
  - `id` — идентификатор элемента
  
  Например для лида с `id = 13` — 'Лид #13' 
  ||
  || **honorific**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор обращения лида (например `'HNR_RU_1' = 'г-н'`).

  Список доступных обращений можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "HONOFIRIC" }`.

  По умолчанию — `null` ||
  || **name**
  [`string`](/api-reference/data-types.html) | Имя.

  По умолчанию — `null` ||
  || **secondName**
  [`string`](/api-reference/data-types.html) | Отчество.

  По умолчанию — `null` ||
  || **lastName**
  [`string`](/api-reference/data-types.html) | Фамилия.

  По умолчанию — `null` ||
  || **birthdate**
  [`date`](/api-reference/data-types.html) | Дата рождения.

  По умолчанию — `null` ||
  || **companyTitle**
  [`string`](/api-reference/data-types.html) | Название компании.

  По умолчанию — `null` ||
  || **sourceId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор источника.
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "SOURCE" }`.

  По умолчанию имеет значение первого доступного источника  ||
  || **sourceDescription**
  [`text`](/api-reference/data-types.html) | Дополнительно об источнике.

  По умолчанию — `null` ||
  || **stageId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор стадии элемента.
  
  Например `'NEW' = 'Не обработан'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "STATUS" }`

  По умолчанию имеет значение первой доступной стадии  ||
  || **statusDescription**
  [`text`](/api-reference/data-types.html) | Дополнительно о стадии.

  По умолчанию — `null` ||
  || **post**
  [`string`](/api-reference/data-types.html) | Должность.

  По умолчанию — `null` ||
  || **currencyId**
  [`crm_currency`](/api-reference/data-types.html) | Идентификатор валюты элемента

  По умолчанию имеет значение валюты по умолчанию  ||
  || **isManualOpportunity**
  [`boolean`](/api-reference/data-types.html) | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический

  По умолчанию — `N` ||
  || **opportunity**
  [`double`](/api-reference/data-types.html) | Сумма.

  По умолчанию — `null` ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках CRM  ||
  || **comments**
  [`text`](/api-reference/data-types.html) | Комментарий.

  По умолчанию — `null` ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию это идентификатор пользователя, который вызывает метод  ||
  || **companyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 4`.

  По умолчанию — `null` ||
  || **contactId**
  [`crm_contact`](/api-reference/data-types.html) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **contactIds**
  [`crm_contact[]`](/api-reference/data-types.html) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **originatorId**
  [`string`](/api-reference/data-types.html) | Внешний источник.

  По умолчанию — `null` ||
  || **originId**
  [`string`](/api-reference/data-types.html) | Идентификатор элемента во внешнем источнике.

  По умолчанию — `null` ||
  || **webformId**
  [`integer`](/api-reference/data-types.html) | Идентификатор CRM Формы.

  По умолчанию — `null` ||
  || **observers**
  [`user[]`](/api-reference/data-types.html) | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  По умолчанию — `null` ||
  || **utmSource**
  [`string`](/api-reference/data-types.html) | Рекламная система. Например: Yandex-Direct, Google-Adwords и другие.

  По умолчанию — `null` ||
  || **utmMedium**
  [`string`](/api-reference/data-types.html) | Тип трафика. Возможные значения:
  
  - CPC — объявления
  - CPM — баннеры

  По умолчанию — `null` ||
  || **utmCampaign**
  [`string`](/api-reference/data-types.html) | Обозначение рекламной кампании.

  По умолчанию — `null` ||
  || **utmContent**
  [`string`](/api-reference/data-types.html) | Содержание кампании. Например, для контекстных объявлений.

  По умолчанию — `null` ||
  || **utmTerm**
  [`string`](/api-reference/data-types.html) | Условие поиска кампании. Например, ключевые слова контекстной рекламы.

  По умолчанию равен`null` ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. 
  
  О пользовательских полях читайте раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html) 
  
  Значения множественных полей передаются в виде массива.
  
  Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла.
  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  || **fm**
  [`multifield[]`](/api-reference/data-types.html) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [Структура объектов](/api-reference/crm/data-types.html#crm_multifield)

  Структура мультиполя:

    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  Пример:

    ```bash
    fm: [
      {
        "valueType": "WORK",
        "value": "+79999999",
        "typeId": "PHONE"
      },
      {
        "valueType": "WORK",
        "value": "bitrix@bitrix.ru",
        "typeId": "EMAIL"
      }
    ]
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
  [`string`](/api-reference/data-types.html) | Название элемента

  По умолчанию генерируется по шаблону `{entityTypeName} #{id}`, где
  - `entityTypeName` — название сущности
  - `id` — идентификатор элемента
  Например для сделки с `id = 13` => 'Сделка #13' ||
  || **typeId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор типа сущности.

  Например для сделки: `'SALE' = 'Продажа'`

  Список доступных типов сущности можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "DEAL_TYPE" }`

  По умолчанию — первый доступный тип сущности ||
  || **categoryId**
  [`integer`](/api-reference/data-types.html) | Идентификатор [направления](/api-reference/crm/universal/category/index.html) (воронки) сделки.

  По умолчанию — `0` (общая) ||
  || **stageId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор стадии элемента. 
  
  Например `'NEW' = 'Не обработан'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр:
    - Если сделка находится в общей воронке (направления)  — `{ ENTITY_ID: "DEAL_STAGE" }`
    - Если сделка находится не в общей воронке (направления) — `{ ENTITY_ID: "DEAL_STAGE_{categoryId}" }`, где
      `categoryId` это идентификатор воронки ([направления](/api-reference/crm/universal/category/index.html)) сделки

  По умолчанию — первая доступная стадия относительно воронки ||
  || **isRecurring**
  [`boolean`](/api-reference/data-types.html) | Является ли сделка регулярной. Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `N`||
  || **probability**
  [`integer`](/api-reference/data-types.html) | Вероятность %.

  По умолчанию — `null` ||
  || **currencyId**
  [`crm_currency`](/api-reference/data-types.html) | Идентификатор валюты элемента.

  По умолчанию — валюта по умолчанию ||
  || **isManualOpportunity**
  [`boolean`](/api-reference/data-types.html) | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический

  По умолчанию — `N` ||
  || **opportunity**
  [`double`](/api-reference/data-types.html) | Сумма.

  По умолчанию — `null` ||
  || **taxValue**
  [`double`](/api-reference/data-types.html) | Сумма налога.

  По умолчанию — `null` ||
  || **companyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 4`.

  По умолчанию — `null` ||
  || **contactId**
  [`crm_contact`](/api-reference/data-types.html) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **contactIds**
  [`crm_contact[]`](/api-reference/data-types.html) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **quoteId**
  [`crm_quote`](/api-reference/data-types.html) | Идентификатор предложения, который будет привязан к сделке ||
  || **begindate**
  [`date`](/api-reference/data-types.html) | Дата начала элемента.

  По умолчанию — дата создания ||
  || **closedate**
  [`date`](/api-reference/data-types.html) | Дата окончания элемента.

  По умолчанию — дата создания элемента + 7 дней ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех.  Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках crm ||
  || **comments**
  [`text`](/api-reference/data-types.html) | Комментарий.

  По умолчанию — `null` ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию — идентификатор пользователя, который вызывает метод ||
  || **sourceId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор источника. 
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "SOURCE" }`.

  По умолчанию — Первый доступный источник ||
  || **sourceDescription**
  [`text`](/api-reference/data-types.html) | Дополнительно об источнике.

  По умолчанию — `null`||
  || **leadId**
  [`crm_lead`](/api-reference/data-types.html) | Идентификатор лида, на основании, которого создается элемент.

  По умолчанию — `null`||
  || **additionalInfo**
  [`string`](/api-reference/data-types.html) | Дополнительная информация.

  По умолчанию — `null` ||
  || **originatorId**
  [`string`](/api-reference/data-types.html) | Внешний источник.

  По умолчанию — `null`||
  || **originId**
  [`string`](/api-reference/data-types.html) | Идентификатор элемента во внешнем источнике.

  По умолчанию — `null`||
  || **observers**
  [`user[]`](/api-reference/data-types.html) | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  По умолчанию — `null` ||
  || **locationId**
  [`location`](/api-reference/data-types.html) | Идентификатор местоположения. Служебное поле.

  По умолчанию — `null` ||
  || **utmSource**
  [`string`](/api-reference/data-types.html) | Рекламная система. Yandex-Direct, Google-Adwords и другие.

  По умолчанию — `null` ||
  || **utmMedium**
  [`string`](/api-reference/data-types.html) | Тип трафика.  Возможные значения:
  
  - CPC — объявления
  - CPM — баннеры

  По умолчанию — `null` ||
  || **utmCampaign** [`string`](/api-reference/data-types.html) | Обозначение рекламной кампании.

  По умолчанию — `null` ||
  || **utmContent**
  [`string`](/api-reference/data-types.html) | Содержание кампании. Например, для контекстных объявлений.

  По умолчанию — `null` ||
  || **utmTerm**
  [`string`](/api-reference/data-types.html) | Условие поиска кампании. Например, ключевые слова контекстной рекламы.

  По умолчанию — `null` ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html)

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла.
  
  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}` 
  ||
  |#


- Контакт

  Идентификатор объекта CRM **entityTypeId:** `3`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **honorific**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор обращения контакта. 
  
  Например `'HNR_RU_1' = 'г-н'`.

  Список доступных обращений можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "HONOFIRIC" }`.

  По умолчанию — `null` ||
  || **name**
  [`string`](/api-reference/data-types.html) | Имя.

  По умолчанию — `null` ||
  || **secondName**
  [`string`](/api-reference/data-types.html) | Отчество.

  По умолчанию — `null` ||
  || **lastName**
  [`string`](/api-reference/data-types.html) | Фамилия.

  По умолчанию — `null` ||
  || **photo**
  [`file`](/api-reference/data-types.html) | Фотография.

  По умолчанию — `null` ||
  || **birthdate**
  [`date`](/api-reference/data-types.html) | Дата рождения.

  По умолчанию — `null` ||
  || **typeId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор типа сущности.
  
  Например для сделки: `'SALE' = 'Продажа'`.
  
  Список доступных типов сущности можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "CONTACT_TYPE" }`.

  По умолчанию — первый доступный тип сущности  ||
  || **sourceId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор источника.
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "SOURCE" }`.

  По умолчанию — первый доступный источник  ||
  || **sourceDescription**
  [`text`](/api-reference/data-types.html) | Дополнительно об источнике.

  По умолчанию — `null` ||
  || **post**
  [`string`](/api-reference/data-types.html) | Должность.

  По умолчанию — `null` ||
  || **comments**
  [`text`](/api-reference/data-types.html) | Комментарий.

  По умолчанию — `null` ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках crm  ||
  || **export**
  [`boolean`](/api-reference/data-types.html) | Участвует ли контакт в экспорте.

  По умолчанию — `Y` ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию — идентификатор пользователя, который вызывает метод ||
  || **companyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор компании привязанный к элементу.

  Список компаний можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 4`.

  По умолчанию — `null` ||
  || **companyIds**
  [`crm_company`](/api-reference/data-types.html)     | Массив идентификаторов компаний, которые будут привязаны к элементу ||
  || **leadId**
  [`crm_lead`](/api-reference/data-types.html) | Идентификатор лида, на основании, которого создается элемент.

  По умолчанию — `null` ||
  || **originatorId**
  [`string`](/api-reference/data-types.html) | Внешний источник.

  По умолчанию — `null` ||
  || **originId**
  [`string`](/api-reference/data-types.html) | Идентификатор элемента во внешнем источнике.

  По умолчанию — `null` ||
  || **originVersion**
  [`string`](/api-reference/data-types.html)          | Версия оригинала.

  По умолчанию — `null` ||
  || **observers**
  [`user[]`](/api-reference/data-types.html) | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  По умолчанию — `null` ||
  || **utmSource**
  [`string`](/api-reference/data-types.html) | Рекламная система. Yandex-Direct, Google-Adwords и другие.

  По умолчанию — `null` ||
  || **utmMedium**
  [`string`](/api-reference/data-types.html) | Тип трафика. Возможные значения:
  
  - CPC — объявления
  - CPM — баннеры

  По умолчанию — `null` ||
  || **utmCampaign**
  [`string`](/api-reference/data-types.html) | Обозначение рекламной кампании.

  По умолчанию — `null` ||
  || **utmContent**
  [`string`](/api-reference/data-types.html) | Содержание кампании. Например, для контекстных объявлений.

  По умолчанию — `null` ||
  || **utmTerm**
  [`string`](/api-reference/data-types.html) | Условие поиска кампании. Например, ключевые слова контекстной рекламы.

  По умолчанию — `null` ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html)

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  || **fm**
  [`multifield[]`](/api-reference/data-types.html) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [Структура объектов](/api-reference/crm/data-types.html#crm_multifield)

  Структура мультиполя:

    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  Пример:

    ```bash
    fm: [
      {
        "valueType": "WORK",
        "value": "+79999999",
        "typeId": "PHONE"
      },
      {
        "valueType": "WORK",
        "value": "bitrix@bitrix.ru",
        "typeId": "EMAIL"
      }
    ]
    ```
  По умолчанию — `null`||
  |#


- Компания

  Идентификатор объекта CRM **entityTypeId:** `4`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`](/api-reference/data-types.html) | Название элемента.

  По умолчанию генерируется по шаблону `{entityTypeName} #{id}`, где
  
  - `entityTypeName` — название сущности
  - `id` — идентификатор элемента
  
  Например для компании с `id = 13` => 'Компания #13' ||
  || **typeId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор типа сущности.
  
  Например для сделки: `'SALE' = 'Продажа'`.
  
  Список доступных типов сущности можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "COMPANY_TYPE" }`.

  По умолчанию — первый доступный тип сущности ||
  || **logo**
  [`file`](/api-reference/data-types.html) | Логотип.

  По умолчанию — `null` ||
  || **bankingDetails**
  [`string`](/api-reference/data-types.html) | Банковские реквизиты.

  По умолчанию — `null` ||
  || **industry**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор типа индустрии. 
  
  Например `'IT' = 'Информационные технологии'`.
  
  Список доступных типов индустрий можно узнать с помощью метода [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "INDUSTRY"}`.

  По умолчанию — первый доступный тип индустрии ||
  || **employees**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор типа количества сотрудников.
  
  Значение берется из списка доступных, например `'EMPLOYEES_1' = 'менее 50'`.

  Список доступных типов количеств сотрудников можно узнать с помощью метода [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "EMPLOYEES" }`.

  По умолчанию — первый доступный тип количества сотрудников ||
  || **currencyId**
  [`crm_currency`](/api-reference/data-types.html) | Идентификатор валюты элемента.

  По умолчанию — валюта по умолчанию ||
  || **revenue**
  [`double`](/api-reference/data-types.html) | Годовой оборот.

  По умолчанию — `0` ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках crm ||
  || **comments**
  [`text`](/api-reference/data-types.html) | Комментарий.

  По умолчанию — `null` ||
  || **isMyCompany**
  [`boolean`](/api-reference/data-types.html) | Является ли компания моей компанией.

  По умолчанию — `N` ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию — идентификатор пользователя, который вызывает метод ||
  || **contactIds**
  [`crm_contact[]`](/api-reference/data-types.html) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null`||
  || **leadId**
  [`crm_lead`](/api-reference/data-types.html) | Идентификатор лида, на основании, которого создается элемент.

  По умолчанию — `null`||
  || **originatorId**
  [`string`](/api-reference/data-types.html) | Внешний источник.

  По умолчанию — `null` ||
  || **originId**
  [`string`](/api-reference/data-types.html) | Идентификатор элемента во внешнем источнике.

  По умолчанию — `null` ||
  || **originVersion**
  [`string`](/api-reference/data-types.html) | Версия оригинала.

  По умолчанию — `null` ||
  || **observers**
  [`user[]`](/api-reference/data-types.html) | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  По умолчанию — `null` ||
  || **utmSource**
  [`string`](/api-reference/data-types.html) | Рекламная система. Yandex-Direct, Google-Adwords и другие.

  По умолчанию — `null` ||
  || **utmMedium**
  [`string`](/api-reference/data-types.html) | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры

  По умолчанию — `null` ||
  || **utmCampaign**
  [`string`](/api-reference/data-types.html) | Обозначение рекламной кампании.

  По умолчанию — `null` ||
  || **utmContent**
  [`string`](/api-reference/data-types.html) | Содержание кампании. Например, для контекстных объявлений.

  По умолчанию — `null` ||
  || **utmTerm**
  [`string`](/api-reference/data-types.html) | Условие поиска кампании. Например, ключевые слова контекстной рекламы.

  По умолчанию — `null` ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html)

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  || **fm**
  [`multifield[]`](/api-reference/data-types.html) | Массив мультиполей.

  Подробнее о мультиполях можно почитать в разделе [Структура объектов](/api-reference/crm/data-types.html#crm_multifield)

  Структура мультиполя:

    - `typeId` — Тип мультиполя
    - `valueType` — Тип значения
    - `value` — Значение

  Пример:

    ```bash
    fm: [
      {
        "valueType": "WORK",
        "value": "+79999999",
        "typeId": "PHONE"
      },
      {
        "valueType": "WORK",
        "value": "bitrix@bitrix.ru",
        "typeId": "EMAIL"
      }
    ]

    ```
  По умолчанию — `null`||
  |#


- Предложение

  Идентификатор объекта CRM  **entityTypeId:** `7`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`](/api-reference/data-types.html) | Название элемента.

  По умолчанию генерируется по шаблону `{entityTypeName} #{id}`, где
  - `entityTypeName` — название сущности
  - `id` — идентификатор элемента
  
  Например для предложения с `id = 13` => 'Предложение #13' ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию — идентификатор пользователя, который вызывает метод ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках CRM ||
  || **content**
  [`text`](/api-reference/data-types.html) | Содержание.

  По умолчанию — `null` ||
  || **terms**
  [`text`](/api-reference/data-types.html) | Условия.

  По умолчанию — `null` ||
  || **comments**
  [`text`](/api-reference/data-types.html) | Комментарий.

  По умолчанию — `null` ||
  || **dealId**
  [`crm_deal`](/api-reference/data-types.html)        | Идентификатор привязанной сделки.

  По умолчанию — `null` ||
  || **leadId**
  [`crm_lead`](/api-reference/data-types.html) | Идентификатор лида, на основании, которого создается элемент.

  По умолчанию — `null` ||
  || **storageTypeId**
  [`integer`](/api-reference/data-types.html) | Идентификатор типа хранения. Возможные значения:
  - `1` — файл
  - `2` — WebDAV
  - `3` — диск

  По умолчанию:
  1. Если установлен модуль `disk` -> Диск
  2. Если установлен модуль `webdav` -> WebDAV
  3. Файл 
  ||
  || **storageElementIds**
  [`integer`](/api-reference/data-types.html) | Массив файлов.

  По умолчанию — `null` ||
  || **webformId**
  [`integer`](/api-reference/data-types.html) | Идентификатор CRM Формы.

  По умолчанию — `null` ||
  || **companyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 4`.

  По умолчанию — `null` ||
  || **contactId**
  [`crm_contact`](/api-reference/data-types.html) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`

  По умолчанию — `null` ||
  || **contactIds**
  [`crm_contact[]`](/api-reference/data-types.html) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **locationId**
  [`location`](/api-reference/data-types.html) | Идентификатор местоположения. Служебное поле.

  По умолчанию — `null` ||
  || **currencyId**
  [`crm_currency`](/api-reference/data-types.html) | Идентификатор валюты элемента.

  По умолчанию — валюта по умолчанию ||
  || **isManualOpportunity**
  [`boolean`](/api-reference/data-types.html) | Режим расчета суммы.

  - `Y` — ручной
  - `N` — автоматический

  По умолчанию — `N` ||
  || **opportunity**
  [`double`](/api-reference/data-types.html) | Сумма.

  По умолчанию — `null` ||
  || **taxValue**
  [`double`](/api-reference/data-types.html) | Сумма налога.

  По умолчанию — `null` ||
  || **stageId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор стадии элемента. 
  
  Например `'DRAFT' = 'Новое'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "QUOTE_STATUS" }`.

  По умолчанию — первая доступная стадия ||
  || **begindate**
  [`date`](/api-reference/data-types.html) | Дата начала элемента.

  По умолчанию — дата создания элемента ||
  || **closedate**
  [`date`](/api-reference/data-types.html) | Дата окончания элемента.

  По умолчанию — дата создания элемента + 7 дней ||
  || **actualDate**
  [`date`](/api-reference/data-types.html) | Актуально до.

  По умолчанию — дата создания элемента + 7 дней ||
  || **mycompanyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор моей компании.

  По умолчанию — идентификатор первой доступной «моей» компании ||
  || **utmSource**
  [`string`](/api-reference/data-types.html) | Рекламная система. Yandex-Direct, Google-Adwords и другие.

  По умолчанию — `null` ||
  || **utmMedium**
  [`string`](/api-reference/data-types.html) | Тип трафика.
  
  - CPC — объявления
  - CPM — баннеры

  По умолчанию — `null` ||
  || **utmCampaign**
  [`string`](/api-reference/data-types.html) | Обозначение рекламной кампании.

  По умолчанию — `null` ||
  || **utmContent**
  [`string`](/api-reference/data-types.html) | Содержание кампании. Например, для контекстных объявлений.

  По умолчанию — `null` ||
  || **utmTerm**
  [`string`](/api-reference/data-types.html) | Условие поиска кампании. Например, ключевые слова контекстной рекламы.

  По умолчанию — `null` ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

  - Значения множественных полей передаются в виде массива
  - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#


- Счет

  Идентификатор объекта CRM **entityTypeId:** `31`

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`](/api-reference/data-types.html) | Название элемента.

  По умолчанию генерируется по шаблону `{entityTypeName} #{id}`, где
  
  - `entityTypeName` — название сущности
  - `id` — идентификатор элемента
  
  Например для счета с `id = 13` => 'Счет #13'
  ||
  || **xmlId**
  [`string`](/api-reference/data-types.html) | Внешний код.

  По умолчанию — `null` ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию — идентификатор пользователя, который вызывает метод ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех. Возможные значения:

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках CRM ||
  || **webformId**
  [`integer`](/api-reference/data-types.html) | Идентификатор CRM Формы.

  По умолчанию — `null` ||
  || **begindate**
  [`date`](/api-reference/data-types.html) | Дата начала элемента.

  По умолчанию — дата создания элемента ||
  || **closedate**
  [`date`](/api-reference/data-types.html) | Дата окончания элемента.

  По умолчанию — дата создания элемента + 7 дней ||
  || **companyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 4`.

  По умолчанию — `null` ||
  || **contactId**
  [`crm_contact`](/api-reference/data-types.html) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **contactIds**
  [`crm_contact[]`](/api-reference/data-types.html) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  По умолчанию — `null` ||
  || **observers**
  [`user[]`](/api-reference/data-types.html) | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  По умолчанию — `null` ||
  || **stageId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор стадии элемента. 
  
  Например `'DT31_13:N' = 'Новый'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html), применив фильтр: `{ ENTITY_ID: "SMART_INVOICE_STAGE_{categoryId}" }`, где
  `categoryId` — идентификатор воронки счетов по умолчанию. Его можно узнать с помощью [`crm.category.list`](/api-reference/crm/universal/category/crm-category-list.html) по `entityTypeId = 31`.

  По умолчанию — первая доступная стадия ||
  || **sourceId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор источника.
  
  Например `'CALL' = 'Звонок'`.
  
  Список доступных источников можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "SOURCE" }`.

  По умолчанию — первый доступный источник ||
  || **sourceDescription**
  [`text`](/api-reference/data-types.html) | Дополнительно об источнике.

  По умолчанию — `null` ||
  || **currencyId**
  [`crm_currency`](/api-reference/data-types.html) | Идентификатор валюты элемента.

  По умолчанию — валюта по умолчанию ||
  || **isManualOpportunity**
  [`boolean`](/api-reference/data-types.html) | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический

  По умолчанию — `N` ||
  || **opportunity**
  [`double`](/api-reference/data-types.html) | Сумма.

  По умолчанию — `null` ||
  || **taxValue**
  [`double`](/api-reference/data-types.html) | Сумма налога.

  По умолчанию — `null` ||
  || **mycompanyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор моей компании.

  По умолчанию — идентификатор первой доступной «моей» компании ||
  || **comments**
  [`text`](/api-reference/data-types.html) | Комментарий.

  По умолчанию — `null` ||
  || **locationId**
  [`location`](/api-reference/data-types.html) | Идентификатор местоположения. Служебное поле.

  По умолчанию — `null` ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#


- Смарт-процесс

  Идентификатор объекта CRM **entityTypeId:** можно получить методом [`crm.type.list`](/api-reference/crm/universal/user-defined-object-types/crm-type-list.html) или создать новый методом [`crm.type.add`](/api-reference/crm/universal/user-defined-object-types/crm-type-add.html)

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`](/api-reference/data-types.html) | Название элемента.

  По умолчанию генерируется по шаблону `{entityTypeName} #{id}`, где
  - `entityTypeName` — название смарт-процесса
  - `id` — идентификатор элемента
  
  Например для элемента смарт-процесса "HR" с `id = 13` => 'HR #13'  ||
  || **xmlId**
  [`string`](/api-reference/data-types.html) | Внешний код.

  По умолчанию — `null` ||
  || **assignedById**
  [`user`](/api-reference/data-types.html) | Идентификатор ответственного за элемент.

  По умолчанию — идентификатор пользователя, который вызывает метод  ||
  || **opened**
  [`boolean`](/api-reference/data-types.html) | Является ли элемент доступным для всех.

  - `Y` — да
  - `N` — нет

  По умолчанию — `Y`. Значение по умолчанию может быть изменено в настройках CRM  ||
  || **webformId**
  [`integer`](/api-reference/data-types.html) | Идентификатор CRM Формы.

  По умолчанию — `null` ||
  || **begindate**
  [`date`](/api-reference/data-types.html) | Дата начала элемента.

  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса.

  По умолчанию — дата создания элемента  ||
  || **closedate**
  [`date`](/api-reference/data-types.html) | Дата окончания элемента.

  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса.

  По умолчанию — дата создания элемента + 7 дней  ||
  || **companyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор компании привязанный к элементу.

  Список компании можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 4`.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **contactId**
  [`crm_contact`](/api-reference/data-types.html) | Идентификатор контакта привязанный к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **contactIds**
  [`crm_contact[]`](/api-reference/data-types.html) | Список идентификаторов контакта привязанных к элементу.

  Список контактов можно получить с помощью метода [`crm.item.list`](/api-reference/crm/universal/crm-item-list.html) по `entityTypeId = 3`.

  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **observers**
  [`user[]`](/api-reference/data-types.html) | Массив идентификаторов пользователей, которые будут являться Наблюдателями в элементе.

  Доступно лишь при включенной настройке `isObserversEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **categoryId**
  [`crm_category`](/api-reference/data-types.html) | Идентификатор воронки элемента смарт-процесса.

  Список доступных воронок можно узнать с помощью [`crm.category.list`](/api-reference/crm/universal/category/crm-category-list.html) применив соответсвующий `entityTypeId` ||
  || **stageId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор стадии элемента. 
  
  Например `'DT1220_30:NEW' = 'Начало'`.

  Список доступных стадий можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "DYNAMIC_{entityTypeId}_STAGE_{categoryId}" }`, где
  - `entityTypeId` — идентификатор типа смарт-процесса
  - `categoryId` — идентификатор воронки (направления) элемента смарт-процесса

  [Подробнее о воронках (направлениях)](/api-reference/crm/universal/category/index.html).

  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса.

  По умолчанию — первая доступная стадия относительно воронки  ||
  || **sourceId**
  [`crm_status`](/api-reference/data-types.html) | Строковый идентификатор источника. (например `'CALL' = 'Звонок'`).
  
  Список доступных источников можно узнать с помощью [`crm.status.list`](/api-reference/crm/status/crm-status-list.html) применив фильтр `{ ENTITY_ID: "SOURCE" }`.

  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса.

  По умолчанию — первый доступный источник  ||
  || **sourceDescription**
  [`text`](/api-reference/data-types.html) | Дополнительно об источнике.

  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **currencyId**
  [`crm_currency`](/api-reference/data-types.html) | Идентификатор валюты элемента.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса.

  По умолчанию — валюта по умолчанию  ||
  || **isManualOpportunity**
  [`boolean`](/api-reference/data-types.html) | Режим расчета суммы. Возможные значения:

  - `Y` — ручной
  - `N` — автоматический

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса.

  По умолчанию — `N` ||
  || **opportunity**
  [`double`](/api-reference/data-types.html) | Сумма.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **taxValue**
  [`double`](/api-reference/data-types.html) | Сумма налога.

  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса.

  По умолчанию — `null` ||
  || **mycompanyId**
  [`crm_company`](/api-reference/data-types.html) | Идентификатор моей компании.

  Доступно лишь при включенной настройке `isMycompanyEnabled` у соответствующего смарт-процесса.

  По умолчанию — Идентификатор первой доступной «моей» компании ||
  || **ufCrm...**
  [`crm_userfield`](/api-reference/data-types.html) | Пользовательское поле. Смотрите раздел [Пользовательские поля в CRM](/api-reference/crm/universal/user-defined-fields/index.html).

    - Значения множественных полей передаются в виде массива
    - Чтобы загрузить файл, в качестве значения пользовательского поля необходимо передать массив, где первый элемент — это имя файла, а второй — это закодированный в [base64](/api-reference/files/how-to-upload-files.html) контент файла.

  ||
  || **parentId...**
  [`crm_entity`](/api-reference/data-types.html) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.

  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  |#

  {% note info "Настройки смарт-процесса" %}

  Подробнее об управлении настройками смарт-процессов можно прочитать в статье [Смарт-процессы: обзор методов](/api-reference/crm/universal/user-defined-object-types/index.html)

  {% endnote %}

{% endlist %}