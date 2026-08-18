# Поля объектов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В блоке [общие поля](#common) приведен перечень стандартных полей, которые используются во всех типах объектов CRM. 

В блоках по типам объектов приведены перечни стандартных полей, характерных для этого типа объекта:

- [лид](#lead),
- [сделка](#deal),
- [контакт](#contact),
- [компания](#company),
- [предложение](#quote),
- [счет](#invoice),
- [смарт-процесс](#spa).

Используйте метод [crm.item.fields](./crm-item-fields.md) с указанием [типа объекта](../data-types.md#object_type) в `entityTypeId`, чтобы получить полный перечень полей для объекта, в том числе пользовательских.


## Общие поля {#common}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **assignedById**
  [`user`](../../data-types.md) | Идентификатор пользователя ответственного за элемент ||
  || **createdBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который создал элемент ||
  || **createdTime**
  [`datetime`](../../data-types.md) | Время создания элемента ||
  || **entityTypeId**
  [`integer`](../../data-types.md) | Идентификатор типа сущности ||
  || **id**
  [`integer`](../../data-types.md) | Идентификатор элемента ||
  || **lastActivityBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который последним проявлял активность в таймлайне ||
  || **lastActivityTime**
  [`datetime`](../../data-types.md) | Время, последнего проявления активности в таймлайне ||
  || **opened**
  [`boolean`](../../data-types.md) | Является ли элемент открытым ||
  || **parentId...**
  [`crm_entity`](../data-types.md) | Поле-родитель. Элемент другого типа объекта CRM, который привязан к данному элементу.
  Каждое такое поле имеет код `parentId + {parentEntityTypeId}`
  ||
  || **ufCrm...**
  [`crm_userfield`](../data-types.md) | Пользовательское поле. Смотрите раздел [{#T}](./user-defined-fields/index.md).
  - Значения множественных полей отдаются в виде массива
  - Значение поля типа `file` отдаются в виде объекта:
  - `id` — идентификатор
  - `url` — ссылка на файл на портале
  - `urlMachine` — ссылка на файл для приложения
  ||
  || **updatedBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который изменил элемент ||
  || **updatedTime**
  [`datetime`](../../data-types.md) | Время последнего изменения элемента ||
  || **utmCampaign**
  [`string`](../../data-types.md) | Обозначение рекламной кампании ||
  || **utmContent**
  [`string`](../../data-types.md) | Содержание кампании.
  Например, для контекстных объявлений
  ||
  || **utmMedium**
  [`string`](../../data-types.md) | Тип трафика. Возможные значения:
  - CPC — объявления
  - CPM — баннеры
  ||
  || **utmSource**
  [`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
  || **utmTerm**
  [`string`](../../data-types.md) | Условие поиска кампании.
  Например, ключевые слова контекстной рекламы
  ||
  || **webformId**
  [`integer`](../../data-types.md) | Идентификатор crm формы ||
  |#

## Поля по объектам

### Лид {#lead}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **dateCreateShort**
  [`datetime`](../../data-types.md) | Время создания элемента (краткий формат).
  Поле выключено
  ||
  || **dateModifyShort**
  [`datetime`](../../data-types.md) | Время последнего изменения элемента (краткий формат).
  Поле выключено
  ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании, привязанной к элементу ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта, привязанного к элементу ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента ||
  || **isConvert**
  [`boolean`](../../data-types.md) | Сконвертирован ли лид.
  Поле выключено
  ||
  || **statusDescription**
  [`text`](../../data-types.md) | Дополнительно о стадии ||
  || **stageSemanticId**
  [`string`](../../data-types.md) | Группа стадии. Возможные значения:
  - `P` — в работе
  - `S` — успешная
  - `F` — неуспешная
  ||
  || **productId**
  [`string`](../../data-types.md) | Идентификатор товара.
  Устарело.
  Поле выключено
  ||
  || **opportunity**
  [`double`](../../data-types.md) | Сумма ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа источника ||
  || **sourceDescription**
  [`text`](../../data-types.md) | Дополнительно об источнике ||
  || **title**
  [`string`](../../data-types.md) | Название элемента ||
  || **name**
  [`string`](../../data-types.md) | Имя ||
  || **lastName**
  [`string`](../../data-types.md) | Фамилия ||
  || **secondName**
  [`string`](../../data-types.md) | Отчество ||
  || **shortName**
  [`string`](../../data-types.md) | Фамилия Имя.
  Краткий формат: например 'Иванов Иван' -> 'Иванов И.'.
  Поле выключено
  ||
  || **companyTitle**
  [`string`](../../data-types.md) | Название компании ||
  || **post**
  [`string`](../../data-types.md) | Должность ||
  || **address**
  [`text`](../../data-types.md) | Адрес.
  Устарело.
  Поле выключено
  ||
  || **comments**
  [`text`](../../data-types.md) | Комментарий ||
  || **originatorId**
  [`string`](../../data-types.md) | Внешний источник ||
  || **originId**
  [`string`](../../data-types.md) | Идентификатор элемента во внешнем источнике ||
  || **dateClosed**
  [`datetime`](../../data-types.md) | Время закрытия элемента ||
  || **birthdate**
  [`date`](../../data-types.md) | Дата рождения ||
  || **honorific**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа обращения ||
  || **hasPhone**
  [`boolean`](../../data-types.md) | Имеется ли у элемента телефон ||
  || **hasEmail**
  [`boolean`](../../data-types.md) | Имеется ли у элемента почта ||
  || **hasImol**
  [`boolean`](../../data-types.md) | Имеется ли у элемента открытые линии ||
  || **login**
  [`string`](../../data-types.md) | Логин.
  Устарело.
  Поле выключено
  ||
  || **isReturnCustomer**
  [`boolean`](../../data-types.md) | Является ли элемент повторным ||
  || **searchContent**
  [`text`](../../data-types.md) | Информация для полнотекстового поиска.
  Служебное поле
  ||
  || **isManualOpportunity**
  [`boolean`](../../data-types.md) | Установлен ли ручной режим расчеты суммы ||
  || **movedBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который последним сменил стадию ||
  || **movedTime**
  [`datetime`](../../data-types.md) | Время последней смены стадии ||
  || **phoneMobile**
  [`string`](../../data-types.md) | Мобильный телефон ||
  || **phoneWork**
  [`string`](../../data-types.md) | Рабочий телефон ||
  || **phoneMailing**
  [`string`](../../data-types.md) | Телефон для рассылок ||
  || **emailHome**
  [`string`](../../data-types.md) | Личный E-mail ||
  || **emailWork**
  [`string`](../../data-types.md) | Рабочий E-mail ||
  || **emailMailing**
  [`string`](../../data-types.md) | Почта для рассылок ||
  || **skype**
  [`string`](../../data-types.md) | Skype ||
  || **icq**
  [`string`](../../data-types.md) | ICQ ||
  || **imol**
  [`string`](../../data-types.md) | IMOL ||
  || **email**
  [`string`](../../data-types.md) | E-mail ||
  || **phone**
  [`string`](../../data-types.md) | Телефон ||
  || **observers**
  [`user[]`](../../data-types.md) | Список идентификаторов пользователей, которые являются Наблюдателями ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контактов, привязанных к элементу ||
  || **fm**
  [`crm_multifield`](../data-types.md#crm_multifield) | Массив мультиполей.
  Подробнее о мультиполях можно почитать в разделе [{#T}](../data-types.md#crm_multifield)
  Структура мультиполя:
  - `id` — Уникальный идентификатор
  - `typeId` — Тип мультиполя
  - `valueType` — Тип значения
  - `value` — Значение
  ||
  |#

### Сделка {#deal}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **dateCreateShort**
  [`datetime`](../../data-types.md) | Время создания элемента (краткий формат).
  Поле выключено
  ||
  || **dateModifyShort**
  [`datetime`](../../data-types.md) | Время последнего изменения элемента (краткий формат).
  Поле выключено
  ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создан элемент ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании, привязанной к элементу ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта, привязанного к элементу ||
  || **quoteId**
  [`crm_quote`](../data-types.md) | Идентификатор предложения, привязанного к элементу ||
  || **title**
  [`string`](../../data-types.md) | Название элемента ||
  || **productId**
  [`string`](../../data-types.md) | Идентификатор товара.
  Устарело. Поле выключено
  ||
  || **categoryId**
  [`crm_category`](../data-types.md) | Идентификатор воронки (направления) элемента ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента ||
  || **stageSemanticId**
  [`string`](../../data-types.md) | Группа стадии
  - `P` — в работе
  - `S` — успешная
  - `F` — неуспешная
  ||
  || **isNew**
  [`boolean`](../../data-types.md) | Является ли сделка новой ||
  || **isRecurring**
  [`boolean`](../../data-types.md) | Является ли сделка повторной ||
  || **isReturnCustomer**
  [`boolean`](../../data-types.md) | Является ли элемент повторным ||
  || **isRepeatedApproach**
  [`boolean`](../../data-types.md) | Является ли сделка повторным обращением ||
  || **closed**
  [`boolean`](../../data-types.md) | Является ли сделка закрытой ||
  || **typeId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа сделки ||
  || **opportunity**
  [`double`](../../data-types.md) | Сумма ||
  || **isManualOpportunity**
  [`boolean`](../../data-types.md) | Установлен ли ручной режим расчеты суммы ||
  || **taxValue**
  [`double`](../../data-types.md) | Сумма налога ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **probability**
  [`integer`](../../data-types.md) | Вероятность, % ||
  || **comments**
  [`text`](../../data-types.md) | Комментарий ||
  || **begindate**
  [`date`](../../data-types.md) | Дата начала элемента ||
  || **begindateShort**
  [`datetime`](../../data-types.md) | Время начала элемента (краткий формат).
  Поле выключено
  ||
  || **closedate**
  [`date`](../../data-types.md) | Дата завершения элемента ||
  || **closedateShort**
  [`datetime`](../../data-types.md) | Время окончания элемента (краткий формат).
  Поле выключено
  ||
  || **eventDate**
  [`datetime`](../../data-types.md) | Дата события ||
  || **eventDateShort**
  [`datetime`](../../data-types.md) | Дата события (краткий формат).
  Поле выключено
  ||
  || **eventId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа события ||
  || **eventDescription**
  [`text`](../../data-types.md) | Описание события ||
  || **locationId**
  [`location`](../data-types.md) | Идентификатор местоположения.
  Служебное поле
  ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа источника ||
  || **sourceDescription**
  [`text`](../../data-types.md) | Дополнительно об источнике ||
  || **originatorId**
  [`string`](../../data-types.md) | Внешний источник ||
  || **originId**
  [`string`](../../data-types.md) | Идентификатор элемента во внешнем источнике ||
  || **additionalInfo**
  [`string`](../../data-types.md) | Дополнительная информация ||
  || **searchContent**
  [`text`](../../data-types.md) | Информация для полнотекстового поиска.
  Служебное поле
  ||
  || **orderStage**
  [`string`](../../data-types.md) | Статус оплаты сделки ||
  || **movedBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который последним сменил стадию ||
  || **movedTime**
  [`datetime`](../../data-types.md) | Время последней смены стадии ||
  || **isWork**
  [`boolean`](../../data-types.md) | Является ли сделка в работе.
  Поле выключено
  ||
  || **isWon**
  [`boolean`](../../data-types.md) | Является ли сделка выигранной.
  Поле выключено
  ||
  || **isLose**
  [`boolean`](../../data-types.md) | Является ли сделка проваленной.
  Поле выключено
  ||
  || **receivedAmount**
  [`string`](../../data-types.md) | Полученная сумма.
  Поле выключено
  ||
  || **lostAmount**
  [`string`](../../data-types.md) | Утраченная сумма.
  Поле выключено
  ||
  || **hasProducts**
  [`boolean`](../../data-types.md) | Содержит ли элемент товары.
  Поле выключено
  ||
  || **observers**
  [`user[]`](../../data-types.md) | Список идентификаторов пользователей, который являются Наблюдателями ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контактов, привязанных к элементу ||
  |#

### Контакт {#contact}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании, привязанной к элементу ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа источника ||
  || **sourceDescription**
  [`text`](../../data-types.md) | Дополнительно об источнике ||
  || **name**
  [`string`](../../data-types.md) | Имя ||
  || **lastName**
  [`string`](../../data-types.md) | Фамилия ||
  || **secondName**
  [`string`](../../data-types.md) | Отчество ||
  || **shortName**
  [`string`](../../data-types.md) | Фамилия Имя.
  Краткий формат: например 'Иванов Иван' -> 'Иванов И.'.
  Поле выключено
  ||
  || **photo**
  [`file`](../../data-types.md) | Фотография ||
  || **post**
  [`string`](../../data-types.md) | Должность ||
  || **address**
  [`text`](../../data-types.md) | Адрес.
  Устарело. Поле выключено
  ||
  || **comments**
  [`text`](../../data-types.md) | Комментарий ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создан элемент ||
  || **export**
  [`boolean`](../../data-types.md) | Разрешено ли экспортировать контакт ||
  || **typeId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа сделки ||
  || **originatorId**
  [`string`](../../data-types.md) | Внешний источник ||
  || **originId**
  [`string`](../../data-types.md) | Идентификатор элемента во внешнем источнике ||
  || **originVersion**
  [`string`](../../data-types.md) | Версия оригинала ||
  || **birthdate**
  [`date`](../../data-types.md) | Дата рождения ||
  || **honorific**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа обращения ||
  || **hasPhone**
  [`boolean`](../../data-types.md) | Имеется ли у элемента телефон ||
  || **hasEmail**
  [`boolean`](../../data-types.md) | Имеется ли у элемента почта ||
  || **hasImol**
  [`boolean`](../../data-types.md) | Имеется ли у элемента открытые линии ||
  || **searchContent**
  [`text`](../../data-types.md) | Информация для полнотекстового поиска. Служебное поле ||
  || **categoryId**
  [`crm_category`](../data-types.md) | Идентификатор воронки (направления) элемента ||
  || **login**
  [`string`](../../data-types.md) | Логин.
  Устарело. Поле выключено
  ||
  || **emailHome**
  [`string`](../../data-types.md) | Личный E-mail ||
  || **emailWork**
  [`string`](../../data-types.md) | Рабочий E-mail ||
  || **emailMailing**
  [`string`](../../data-types.md) | Почта для рассылок ||
  || **phoneMobile**
  [`string`](../../data-types.md) | Мобильный телефон ||
  || **phoneWork**
  [`string`](../../data-types.md) | Рабочий телефон ||
  || **phoneMailing**
  [`string`](../../data-types.md) | Телефон для рассылок ||
  || **imol**
  [`string`](../../data-types.md) | IMOL ||
  || **email**
  [`string`](../../data-types.md) | E-mail ||
  || **phone**
  [`string`](../../data-types.md) | Телефон ||
  || **observers**
  [`user[]`](../../data-types.md) | Список идентификаторов пользователей, который являются Наблюдателями ||
  || **companyIds**
  [`crm_company[]`](../data-types.md) | Список идентификаторов компаний, привязанных к элементу ||
  || **fm**
  [`crm_multifield`](../data-types.md#crm_multifield) | Массив мультиполей.
  Подробнее о мультиполях можно почитать в разделе [{#T}](../data-types.md#crm_multifield)
  Структура мультиполя:
  - `id` — Уникальный идентификатор
  - `typeId` — Тип мультиполя
  - `valueType` — Тип значения
  - `value` — Значение
  ||
  |#

### Компания {#company}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **title**
  [`string`](../../data-types.md) | Название элемента ||
  || **logo**
  [`file`](../../data-types.md) | Логотип ||
  || **address**
  [`text`](../../data-types.md) | Адрес.
  Устарело. Поле выключено
  ||
  || **addressLegal**
  [`text`](../../data-types.md) | Юридический адрес.
  Устарело
  ||
  || **bankingDetails**
  [`string`](../../data-types.md) | Банковские реквизиты ||
  || **comments**
  [`text`](../../data-types.md) | Комментарий ||
  || **typeId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа сделки ||
  || **industry**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа индустрии ||
  || **revenue**
  [`double`](../../data-types.md) | Годовой оборот ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **employees**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа кол-ва сотрудников ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создан элемент ||
  || **originatorId**
  [`string`](../../data-types.md) | Внешний источник ||
  || **originId**
  [`string`](../../data-types.md) | Идентификатор элемента во внешнем источнике ||
  || **originVersion**
  [`string`](../../data-types.md) | Версия оригинала ||
  || **hasPhone**
  [`boolean`](../../data-types.md) | Имеется ли у элемента телефон ||
  || **hasEmail**
  [`boolean`](../../data-types.md) | Имеется ли у элемента почта ||
  || **hasImol**
  [`boolean`](../../data-types.md) | Имеется ли у элемента открытые линии ||
  || **isMyCompany**
  [`boolean`](../../data-types.md) | Является ли компания моей компанией ||
  || **searchContent**
  [`text`](../../data-types.md) | Информация для полнотекстового поиска.
  Служебное поле
  ||
  || **categoryId**
  [`crm_category`](../data-types.md) | Идентификатор воронки (направления) элемента ||
  || **emailHome**
  [`string`](../../data-types.md) | Личный E-mail ||
  || **emailWork**
  [`string`](../../data-types.md) | Рабочий E-mail ||
  || **emailMailing**
  [`string`](../../data-types.md) | Почта для рассылок ||
  || **phoneMobile**
  [`string`](../../data-types.md) | Мобильный телефон ||
  || **phoneWork**
  [`string`](../../data-types.md) | Рабочий телефон ||
  || **phoneMailing**
  [`string`](../../data-types.md) | Телефон для рассылок ||
  || **imol**
  [`string`](../../data-types.md) | IMOL ||
  || **email**
  [`string`](../../data-types.md) | E-mail ||
  || **phone**
  [`string`](../../data-types.md) | Телефон ||
  || **ufLogo**
  [`file`](../../data-types.md) | Логотип (генератор документов) ||
  || **ufStamp**
  [`file`](../../data-types.md) | Печать организации (генератор документов) ||
  || **ufDirectorSign**
  [`file`](../../data-types.md) | Подпись директора (генератор документов) ||
  || **ufAccountantSign**
  [`file`](../../data-types.md) | Подпись гл. бухгалтера (генератор документов) ||
  || **observers**
  [`user[]`](../../data-types.md) | Список идентификаторов пользователей, который являются Наблюдателями ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контактов, привязанных к элементу ||
  || **fm**
  [`crm_multifield`](../data-types.md#crm_multifield) | Массив мультиполей.
  Подробнее о мультиполях можно почитать в разделе [{#T}](../data-types.md#crm_multifield)
  Структура мультиполя:
  - `id` — Уникальный идентификатор
  - `typeId` — Тип мультиполя
  - `valueType` — Тип значения
  - `value` — Значение
  ||
  |#

### Предложение {#quote}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **dateCreateShort**
  [`datetime`](../../data-types.md) | Время создания элемента (краткий формат).
  Поле выключено
  ||
  || **dateModifyShort**
  [`datetime`](../../data-types.md) | Время последнего изменения элемента (краткий формат).
  Поле выключено
  ||
  || **leadId**
  [`crm_lead`](../data-types.md) | Идентификатор лида, на основании, которого создан элемент ||
  || **dealId**
  [`crm_deal`](../data-types.md) | Идентификатор сделки, привязанной к элементу ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании, привязанной к элементу ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта, привязанного к элементу ||
  || **personTypeId**
  [`integer`](../../data-types.md) | Идентификатор типа плательщика ||
  || **mycompanyId**
  [`crm_company`](../data-types.md) | Идентификатор «моей» компании ||
  || **title**
  [`string`](../../data-types.md) | Название элемента ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента ||
  || **closed**
  [`boolean`](../../data-types.md) | Является ли сделка закрытой ||
  || **opportunity**
  [`double`](../../data-types.md) | Сумма ||
  || **isManualOpportunity**
  [`boolean`](../../data-types.md) | Установлен ли ручной режим расчеты суммы ||
  || **taxValue**
  [`double`](../../data-types.md) | Сумма налога ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **comments**
  [`text`](../../data-types.md) | Комментарий ||
  || **commentsType**
  [`integer`](../../data-types.md) | Идентификатор типа комментария.
  Возможные значения:
  - `0` — неизвестно
  - `1` — текст
  - `2` — bb-код
  - `3` — HTML
  ||
  || **begindate**
  [`date`](../../data-types.md) | Дата начала элемента ||
  || **begindateShort**
  [`datetime`](../../data-types.md) | Время начала элемента (краткий формат).
  Поле выключено
  ||
  || **closedate**
  [`date`](../../data-types.md) | Дата завершения элемента ||
  || **closedateShort**
  [`datetime`](../../data-types.md) | Время окончания элемента (краткий формат).
  Поле выключено
  ||
  || **quoteNumber**
  [`string`](../../data-types.md) | Номер предложения ||
  || **content**
  [`text`](../../data-types.md) | Содержание ||
  || **contentType**
  [`integer`](../../data-types.md) | Идентификатор типа содержания.
  Возможные значения:
  - `0` — неизвестно
  - `1` — текст
  - `2` — bb-код
  - `3` — HTML
  ||
  || **terms**
  [`text`](../../data-types.md) | Условия ||
  || **termsType**
  [`integer`](../../data-types.md) | Идентификатор типа условия.
  Возможные значения:
  - `0` — неизвестно
  - `1` — текст
  - `2` — bb-код
  - `3` — HTML
  ||
  || **storageTypeId**
  [`integer`](../../data-types.md) | Идентификатор типа хранения ||
  || **storageElementIds**
  [`integer[]`](../../data-types.md) | Массив файлов ||
  || **locationId**
  [`location`](../data-types.md) | Идентификатор местоположения. Служебное поле ||
  || **clientTitle**
  [`string`](../../data-types.md) | Название клиента ||
  || **clientAddr**
  [`string`](../../data-types.md) | Адрес клиента ||
  || **clientContact**
  [`string`](../../data-types.md) | Контакты клиента ||
  || **clientEmail**
  [`string`](../../data-types.md) | E-mail клиента ||
  || **clientPhone**
  [`string`](../../data-types.md) | Телефон клиента ||
  || **clientTpId**
  [`string`](../../data-types.md) | ИНН Клиента ||
  || **clientTpaId**
  [`string`](../../data-types.md) | ТПП Клиента ||
  || **searchContent**
  [`text`](../../data-types.md) | Информация для полнотекстового поиска. Служебное поле ||
  || **hasProducts**
  [`boolean`](../../data-types.md) | Содержит ли элемент товары.
  Поле выключено
  ||
  || **actualDate**
  [`date`](../../data-types.md) | Актуально до ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контактов, привязанных к элементу ||
  |#

### Счет {#invoice}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **xmlId**
  [`string`](../../data-types.md) | Внешний код ||
  || **title**
  [`string`](../../data-types.md) | Название элемента ||
  || **movedBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который последним сменил стадию ||
  || **movedTime**
  [`datetime`](../../data-types.md) | Время последней смены стадии ||
  || **categoryId**
  [`crm_category`](../data-types.md) | Идентификатор воронки (направления) элемента ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента ||
  || **previousStageId**
  [`crm_status`](../data-types.md) | Идентификатор типа предыдущей стадии ||
  || **begindate**
  [`date`](../../data-types.md) | Дата начала элемента ||
  || **closedate**
  [`date`](../../data-types.md) | Дата завершения элемента ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании, привязанной к элементу ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта, привязанного к элементу ||
  || **opportunity**
  [`double`](../../data-types.md) | Сумма ||
  || **isManualOpportunity**
  [`boolean`](../../data-types.md) | Установлен ли ручной режим расчеты суммы ||
  || **taxValue**
  [`double`](../../data-types.md) | Сумма налога ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента ||
  || **mycompanyId**
  [`crm_company`](../data-types.md) | Идентификатор «моей» компании ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа источника ||
  || **sourceDescription**
  [`text`](../../data-types.md) | Дополнительно об источнике ||
  || **comments**
  [`text`](../../data-types.md) | Комментарий ||
  || **accountNumber**
  [`string`](../../data-types.md) | Номер счета ||
  || **locationId**
  [`location`](../data-types.md) | Идентификатор местоположения.
  Служебное поле
  ||
  || **observers**
  [`user[]`](../../data-types.md) | Список идентификаторов пользователей, которые являются Наблюдателями ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контактов, привязанных к элементу ||
  |#

### Смарт-процесс {#spa}

  #|
  || **Название**
  `тип` | **Описание** ||
  || **xmlId**
  [`string`](../../data-types.md) | Внешний код ||
  || **title**
  [`string`](../../data-types.md) | Название элемента ||
  || **movedBy**
  [`user`](../../data-types.md) | Идентификатор пользователя, который последним сменил стадию.
  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **movedTime**
  [`datetime`](../../data-types.md) | Время последней смены стадии.
  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **categoryId**
  [`crm_category`](../data-types.md) | Идентификатор воронки (направления) элемента ||
  || **stageId**
  [`crm_status`](../data-types.md) | Строковый идентификатор стадии элемента.
  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **previousStageId**
  [`crm_status`](../data-types.md) | Идентификатор типа предыдущей стадии.
  Доступно лишь при включенной настройке `isStagesEnabled` у соответствующего смарт-процесса
  ||
  || **begindate**
  [`date`](../../data-types.md) | Дата начала элемента.
  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса
  ||
  || **closedate**
  [`date`](../../data-types.md) | Дата завершения элемента.
  Доступно лишь при включенной настройке `isBeginCloseDatesEnabled` у соответствующего смарт-процесса
  ||
  || **companyId**
  [`crm_company`](../data-types.md) | Идентификатор компании, привязанной к элементу.
  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса
  ||
  || **contactId**
  [`crm_contact`](../data-types.md) | Идентификатор контакта, привязанного к элементу.
  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса
  ||
  || **opportunity**
  [`double`](../../data-types.md) | Сумма.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **isManualOpportunity**
  [`boolean`](../../data-types.md) | Установлен ли ручной режим расчеты суммы.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **taxValue**
  [`double`](../../data-types.md) | Сумма налога.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **currencyId**
  [`crm_currency`](../data-types.md) | Идентификатор валюты элемента.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **opportunityAccount**
  [`double`](../../data-types.md) | Сумма в валюте учета.
  Устарело. Поле выключено.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **taxValueAccount**
  [`double`](../../data-types.md) | Сумма налога в валюте учета.
  Устарело. Поле выключено.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **accountCurrencyId**
  [`crm_currency`](../data-types.md) | Валюта учета.
  Поле выключено.
  Доступно лишь при включенной настройке `isLinkWithProductsEnabled` у соответствующего смарт-процесса
  ||
  || **mycompanyId**
  [`crm_company`](../data-types.md) | Идентификатор «моей» компании.
  Доступно лишь при включенной настройке `isMycompanyEnabled` у соответствующего смарт-процесса
  ||
  || **sourceId**
  [`crm_status`](../data-types.md) | Строковый идентификатор типа источника.
  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса
  ||
  || **sourceDescription**
  [`text`](../../data-types.md) | Дополнительно об источнике.
  Доступно лишь при включенной настройке `isSourceEnabled` у соответствующего смарт-процесса
  ||
  || **observers**
  [`user[]`](../../data-types.md) | Список идентификаторов пользователей, который являются Наблюдателями.
  Доступно лишь при включенной настройке `isObserversEnabled` у соответствующего смарт-процесса
  ||
  || **contactIds**
  [`crm_contact[]`](../data-types.md) | Список идентификаторов контактов, привязанных к элементу.
  Доступно лишь при включенной настройке `isClientEnabled` у соответствующего смарт-процесса
  ||
  |#
