# Поля основных объектов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> **Внимание!** Более полный перечень полей приводится на страницах методов, возвращающих описание полей объектов. Такие методы имеют название **crm.название_объекта.fields**.

## Сделки

Описание полей возвращает метод [crm.deal.fields](./deals/crm-deal-fields.md)

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор сделки | Да | Нет ||
|| **TITLE**
[`string`](../data-types.md) | Название | Да | Да ||
|| **TYPE_ID**
[`crm_status`](./data-types.md) | Тип сделки. Используется только для привязки к внешнему источнику. | Да | Да ||
|| **CATEGORY_ID**
[`crm_category`](./data-types.md) | Идентификатор направления. Неизменяемое. Если не передавать это поле при создании сделки, то сделка создастся в общем направлении. | Да | Да ||
|| **STAGE_ID**
[`crm_status`](./data-types.md) | Идентификатор стадии. Возможные значения:
- `NEW` — новая сделка
- `PREPARATION` — подготовка бумаг
- `PREPAYMENT_INVOICE` — отправка счета
- `EXECUTING` — в процессе выполнения
- `FINAL_INVOICE` — финальный счет
- `WON` — выиграна
- `>LOSE` — проиграна, анализ причин не требуется
- `APOLOGY` — проиграна, требуется анализ причин | Да | Да ||
|| **STAGE_SEMANTIC_ID**
[`string`](../data-types.md) | Имя. Только для чтения. В некотором смысле обобщает значения идентификатора сделки `STAGE_ID`:
- `P` — у стадий с идентификаторами `NEW`, `PREPARATION`, `PREPAYMENT_INVOICE`, `EXECUTING` и `FINAL_INVOICE`
- `S` — у стадии с идентификатором `WON`
- `F` — у стадий с идентификаторами `>LOSE` и `APOLOGY` | Да | Нет ||
|| **IS_NEW**
[`char`](../data-types.md) | Флаг новой сделки (сделки в первой стадии) | Да | Нет ||
|| **IS_RECURRING**
[`char`](../data-types.md) | Флаг шаблона регулярной сделки. Если стоит `Y`, то это шаблон, а не сделка | Да | Да ||
|| **IS_RETURN_CUSTOMER**
[`char`](../data-types.md) | Признак повторного лида | Да | Да ||
|| **IS_REPEATED_APPROACH**
[`char`](../data-types.md) | Повторное обращение | Да | Да ||
|| **PROBABILITY**
[`integer`](../data-types.md) | Вероятность | Да | Да ||
|| **CURRENCY_ID**
[`crm_currency`](./data-types.md) | Идентификатор валюты сделки | Да | Да ||
|| **OPPORTUNITY**
[`double`](../data-types.md) | Сумма | Да | Да ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../data-types.md) | Повторное обращение | Да | Да ||
|| **TAX_VALUE**
[`double`](../data-types.md) | Ставка налога | Да | Да ||
|| **COMPANY_ID**
[`crm_company`](./data-types.md) | Идентификатор привязанной компании | Да | Да ||
|| **CONTACT_ID**
[`crm_contact`](./data-types.md) | Идентификатор привязанного контакта. Устаревший. Сохраняется для совместимости | Да | Да ||
|| **CONTACT_IDS**
[`crm_contact`](./data-types.md) | Идентификатор привязанного контакта. Множественный.

При использовании [crm.deal.update](./deals/crm-deal-update.md) и [crm.deal.add](./deals/crm-deal-add.md) можно подать массив контактов.

В методах [crm.deal.list](./deals/crm-deal-list.md) и [crm.deal.get](./deals/crm-deal-get.md) поля нет и необходимо использовать [crm.deal.contact.items.get](./deals/contacts/crm-deal-contact-items-get.md) для получения списка контактов.

Для очистки поля используйте [crm.deal.contact.items.delete](./deals/contacts/crm-deal-contact-items-delete.md), для замены значения используйте [crm.deal.contact.items.set](./deals/contacts/crm-deal-contact-items-set.md) | Да | Да ||
|| **QUOTE_ID**
[`crm_quote`](./data-types.md) | Идентификатор квоты. Только для чтения. Устаревший. Используйте метод [crm.quote.list](./quote/crm-quote-list.md) с фильтром по сделке | Да | Нет ||
|| **BEGINDATE**
[`date`](../data-types.md) | Дата начала | Да | Да ||
|| **CLOSEDATE**
[`date`](../data-types.md) | Дата завершения | Да | Да ||
|| **OPENED**
[`char`](../data-types.md) | Доступен для всех | Да | Да ||
|| **CLOSED**
[`char`](../data-types.md) | Завершена ли сделка | Да | Да ||
|| **COMMENTS**
[`string`](../data-types.md) | Коментарии | Да | Да ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Связано с пользователем по ID | Да | Да ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Создано пользователем | Да | Нет ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор автора последнего изменения | Да | Нет ||
|| **MOVED_BY_ID**
[`user`](../data-types.md) | Идентификатор автора, который переместил элемент на текущую стадию | Да | Нет ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения | Да | Нет ||
|| **MOVED_TIME**
[`datetime`](../data-types.md) | Дата перемещения элемента на текущую стадию | Да | Нет ||
|| **SOURCE_ID**
[`string`](../data-types.md) | Идентификатор источника. Определяет источник сделки (обратный звонок, реклама, электронная почта и прочее).

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=SOURCE` | Да | Да ||
|| **SOURCE_DESCRIPTION**
[`string`](../data-types.md) | Дополнительно об источнике. Текстовое поле | Да | Да ||
|| **ADDITIONAL_INFO**
[`string`](../data-types.md) | Дополнительная информация | Да | Да ||
|| **LEAD_ID**
[`crm_lead`](./data-types.md) | Идентификатор привязанного лида | Да | Нет ||
|| **LOCATION_ID**
[`location`](./data-types.md) | Местоположение клиента. Служебное поле, не рекомендуется к использованию | Да | Да ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) | Да | Да ||
|| **UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) | Да | Да ||
|| **UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании | Да | Да ||
|| **UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений | Да | Да ||
|| **UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы | Да | Да ||
|| **PARENT_ID_xxx**
[`crm_entity`](./data-types.md) | Поля связей.

Если на портале есть смарт-процессы, связанные с контактами, то для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и контактом. Само поле хранит идентификатор элемента такого смарт-процесса.

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом | Да | Да ||
|| **LAST_ACTIVITY_BY**
[`string`](../data-types.md) | Идентификатор пользователя, ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде) | Да | Да ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Время последней активности | Да | Да ||
|| **UF_CRM_ххх** | [Пользовательские поля](./deals/user-defined-fields/index.md) | Да | Да ||
|#

## Лиды

Описание полей возвращает метод [crm.lead.fields](./leads/crm-lead-fields.md)

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Целочисленный идентификатор лида | Да | Нет ||
|| **TITLE**
[`string`](../data-types.md) | Название лида | Да | Да ||
|| **HONORIFIC**
[`crm_status`](./data-types.md) | Вид обращения. Статус из справочника.

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=HONORIFIC` | Да | Да ||
|| **NAME**
[`string`](../data-types.md) |  Имя контакта | Да | Да ||
|| **SECOND_NAME**
[`string`](../data-types.md) |  Отчество контакта | Да | Да ||
|| **LAST_NAME**
[`string`](../data-types.md) |  Фамилия контакта | Да | Да ||
|| **BIRTHDATE**
[`date`](../data-types.md) | Дата рождения | Да | Да ||
|| **COMPANY_TITLE**
[`string`](../data-types.md) | Название компании, привязанной к лиду | Да | Да ||
|| **SOURCE_ID**
[`crm_status`](./data-types.md) | Идентификатор источника. Статус из справочника.

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md)  с фильтром `filter[ENTITY_ID]=SOURCE` | Да | Да ||
|| **SOURCE_DESCRIPTION**
[`string`](../data-types.md) | Описание источника | Да | Да ||
|| **STATUS_ID**
[`crm_status`](./data-types.md) | Идентификатор стадии лида. Статус из справочника.

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md)  с фильтром `filter[ENTITY_ID]=STATUS` | Да | Да ||
|| **STATUS_DESCRIPTION**
[`string`](../data-types.md) | Дополнительно о стадии | Да | Да ||
|| **STATUS_SEMANTIC_ID**
[`string`](../data-types.md) | Статус. Возможные значения:
- `F` (failed) — обработан неуспешно
- `S` (success) — обработан успешно
- `P` (processing) — лид в обработке | Да | Нет ||
|| **POST**
[`string`](../data-types.md) | Должность | Да | Да ||
|| **ADDRESS**
[`string`](../data-types.md) | Адрес контакта | Да | Да ||
|| **ADDRESS_2**
[`string`](../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части | Да | Да ||
|| **ADDRESS_CITY**
[`string`](../data-types.md) | Город | Да | Да ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс | Да | Да ||
|| **ADDRESS_REGION**
[`string`](../data-types.md) | Район | Да | Да ||
|| **ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область | Да | Да ||
|| **ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна | Да | Да ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны | Да | Да ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../data-types.md) | Идентификатор адреса из модуля местоположений | Да | Да ||
|| **CURRENCY_ID**
[`crm_currency`](./data-types.md) | Идентификатор валюты | Да | Да ||
|| **OPPORTUNITY**
[`double`](../data-types.md) | Предполагаемая сумма | Да | Да ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../data-types.md) | Признак ручного расчета суммы. Допустимые значения `Y` или `N` | Да | Да ||
|| **OPENED**
[`char`](../data-types.md) | Доступен для всех. Допустимые значения `Y` или `N` | Да | Да ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарии | Да | Да ||
|| **HAS_PHONE**
[`char`](../data-types.md) | Признак заполненности поля `телефон`. Допустимые значения `Y` или `N` | Да | Нет ||
|| **HAS_EMAIL**
[`char`](../data-types.md) | Признак заполненности поля электронной почты. Допустимые значения `Y` или `N` | Да | Нет ||
|| **HAS_IMOL**
[`char`](../data-types.md) | Признак наличия привязанной открытой линии. Допустимые значения `Y` или `N` | Да | Нет ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, ответственного за лид | Да | Да ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, создавшего лид | Да | Нет ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор автора последнего изменения | Да | Нет ||
|| **MOVED_BY_ID**
[`user`](../data-types.md) | Идентификатор автора перемещения элемента на текущую стадию | Да | Нет ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения | Да | Нет ||
|| **MOVED_TIME**
[`datetime`](../data-types.md) | Дата перемещения элемента на текущую стадию | Да | Нет ||
|| **COMPANY_ID**
[`crm_company`](./data-types.md) | Привязка лида к компании (Поле Клиент->Компания) | Да | Да ||
|| **CONTACT_ID**
[`crm_contact`](./data-types.md) | Привязка лида к контакту. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости | Да | Да ||
|| **CONTACT_IDS**
[`crm_contact`](./data-types.md) |  Идентификатор привязанного контакта. Множественный.

При использовании [crm.lead.update](./leads/crm-lead-update.md) и [crm.lead.add](./leads/crm-lead-add.md) можно передать массив контактов  | Да | Да ||
|| **IS_RETURN_CUSTOMER**
[`char`](../data-types.md) | Признак повторного лида. Допустимые значения `Y` или `N` | Да | Нет ||
|| **DATE_CLOSED**
[`datetime`](../data-types.md) | Дата закрытия | Да | Нет ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) | Да | Да ||
|| **UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) | Да | Да ||
|| **UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании | Да | Да ||
|| **UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений | Да | Да ||
|| **UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы | Да | Да ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Время последней активности | Да | Нет ||
|| **LAST_ACTIVITY_BY**
[`string`](../data-types.md) | Идентификатор пользователя, ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде) | Да | Нет ||
|| **PHONE**
[`crm_multifield`](./data-types.md) | Телефон контакта. Множественный | Да | Да ||
|| **EMAIL**
[`crm_multifield`](./data-types.md) | Адрес электронной почты.  Множественный | Да | Да ||
|| **WEB**
[`crm_multifield`](./data-types.md) | URL ресурсы лида. Множественный | Да | Да ||
|| **IM**
[`crm_multifield`](./data-types.md) | Мессенджеры. Множественный | Да | Да ||
|| **LINK**
[`crm_multifield`](./data-types.md) |  Ссылки. Множественное. Служебное | Да | Да ||
|| **UF_CRM_ххх** | [Пользовательские поля](./leads/userfield/index.md) | Да | Да ||
|#

## Компании

Описание полей возвращает метод [crm.company.fields](./companies/crm-company-fields.md)

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор компании | Да | Нет ||
|| **TITLE**
[`string`](../data-types.md) | Название. Обязательное | Да | Да ||
|| **COMPANY_TYPE**
[`crm_status`](./data-types.md) | Тип компании | Да | Да ||
|| **LOGO**
[`file`](../data-types.md) | Логотип | Да | Да ||
|| **ADDRESS**
[`string`](../data-types.md) | Адрес компании | Да | Да ||
|| **ADDRESS_2**
[`string`](../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части | Да | Да ||
|| **ADDRESS_CITY**
[`string`](../data-types.md) | Город | Да | Да ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс | Да | Да ||
|| **ADDRESS_REGION**
[`string`](../data-types.md) | Район | Да | Да ||
|| **ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область | Да | Да ||
|| **ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна | Да | Да ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны | Да | Да ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../data-types.md) | Идентификатор адреса местоположения | Да | Да ||
|| **ADDRESS_LEGAL**
[`string`](../data-types.md) | Юридический адрес | Да | Да ||
|| **REG_ADDRESS**
[`string`](../data-types.md) | Юридический адрес компании. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_2**
[`string`](../data-types.md) | Вторая страница юридического адреса. В некоторых странах принято разбивать адрес на 2 части.

Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_CITY**
[`string`](../data-types.md) | Город юридического адреса. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс юридического адреса. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_REGION**
[`string`](../data-types.md) | Район юридического адреса. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область юридического адреса. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна юридического адреса. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны юридического адресa. Устарел, используется для совместимости | Да | Да ||
|| **REG_ADDRESS_LOC_ADDR_ID**
[`integer`](../data-types.md) | Юридический адрес идентификатор адреса местоположения. Устарел, используется для совместимости | Да | Да ||
|| **BANKING_DETAILS**
[`string`](../data-types.md) | Банковские реквизиты | Да | Да ||
|| **INDUSTRY**
[`crm_status`](./data-types.md) | Сфера деятельности | Да | Да ||
|| **EMPLOYEES**
[`crm_status`](./data-types.md) | Количество сотрудников | Да | Да ||
|| **CURRENCY_ID**
[`crm_currency`](./data-types.md) | Валюта | Да | Да ||
|| **REVENUE**
[`double`](../data-types.md) | Годовой оборот | Да | Да ||
|| **OPENED**
[`char`](../data-types.md) | Доступен для всех | Да | Да ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарии | Да | Да ||
|| **HAS_PHONE**
[`char`](../data-types.md) | Проверка заполненности поля телефона | Да | Нет ||
|| **HAS_EMAIL**
[`char`](../data-types.md) | Проверка заполненности поля электронной почты | Да | Нет ||
|| **HAS_IMOL**
[`char`](../data-types.md) | Задана ли открытая линия | Да | Нет ||
|| **IS_MY_COMPANY**
[`char`](../data-types.md) | Моя компания | Да | Да ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Связана ли с пользователем по ID | Да | Да ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Кем создана компания | Да | Нет ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор автора последнего изменения | Да | Нет ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения | Да | Нет ||
|| **CONTACT_ID**
[`string`](../data-types.md) | Контакт. Используется только для привязки к внешнему источнику. | Да | Да ||
|| **LEAD_ID**
[`crm_lead`](./data-types.md) | Идентификатор лида, связанного с компанией | Да | Нет ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **ORIGIN_VERSION**
[`string`](../data-types.md) | Оригинальная версия. Используется для защиты данных от случайного перетирания внешней системой.

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных | Да | Да ||
|| **UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) | Да | Да ||
|| **UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) | Да | Да ||
|| **UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании | Да | Да ||
|| **UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений | Да | Да ||
|| **UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы | Да | Да ||
|| **PARENT_ID_xxx**
[`crm_entity`](./data-types.md) | Поля связей.

Если на портале есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и контактом. Само поле хранит идентификатор элемента такого смарт-процесса.

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом | Да | Да ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Время последней активности. | Да | Нет ||
|| **LAST_ACTIVITY_BY**
[`string`](../data-types.md) | Идентификатор пользователя, ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде) | Да | Нет ||
|| **PHONE**
[`crm_multifield`](./data-types.md) | Телефон компании. Множественное | Да | Да ||
|| **EMAIL**
[`crm_multifield`](./data-types.md) | Адрес электронной почты. Множественное | Да | Да ||
|| **WEB**
[`crm_multifield`](./data-types.md) | URL ресурсов компании. Множественное | Да | Да ||
|| **IM**
[`crm_multifield`](./data-types.md) | Мессенджеры. Множественное | Да | Да ||
|| **LINK**
[`crm_multifield`](./data-types.md) |  Ссылки. Множественное. Служебное | Да | Да ||
|#


## Контакты

Описание полей возвращает метод [crm.contact.fields](./contacts/crm-contact-fields.md)

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
||**ID**
[`integer`](../data-types.md) | Идентификатор контакта | Да | Нет ||
||**HONORIFIC**
[`crm_status`](./data-types.md) | Обращение.

Получить значения справочника можно с помощью метода [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID=HONORIFIC` | Да | Да ||
||**NAME**
[`string`](../data-types.md) | Имя | Да | Да ||
||**SECOND_NAME**
[`string`](../data-types.md) | Отчество | Да | Да ||
||**LAST_NAME**
[`string`](../data-types.md) | Фамилия | Да | Да ||
||**PHOTO**
[`file`](../data-types.md) | Фотография | Да | Да ||
||**BIRTHDATE**
[`date`](../data-types.md) | Дата рождения | Да | Да ||
||**TYPE_ID**
[`crm_status`](./data-types.md)| Тип контакта.

Получить значения справочника можно с помощью метода [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID=CONTACT_TYPE` | Да | Да ||
||**SOURCE_ID**
[`crm_status`](./data-types.md) | Источник.

Получить значения справочника можно с помощью метода [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID=SOURCE`| Да | Да ||
||**SOURCE_DESCRIPTION**
[`string`](../data-types.md) | Дополнительно об источнике | Да | Да ||
||**POST**
[`string`](../data-types.md) | Должность | Да | Да ||
|| {% note tip "Устревшие поля" %}

Поля адреса в контакте являются устаревшими и используются только в режиме совместимости. Для работы с адресом используйте [реквизиты](./requisites/index.md).

{% endnote %}
| > | > | > ||
||**ADDRESS**
[`string`](../data-types.md) | Адрес (устаревшее) | Да | Да ||
||**ADDRESS_2**
[`string`](../data-types.md) | Вторая строка адреса (устаревшее) | Да | Да ||
||**ADDRESS_CITY**
[`string`](../data-types.md) | Город (устаревшее) | Да | Да ||
||**ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс (устаревшее) | Да | Да ||
||**ADDRESS_REGION**
[`string`](../data-types.md) | Район (устаревшее) | Да | Да ||
||**ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область (устаревшее) | Да | Да ||
||**ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна (устаревшее) | Да | Да ||
||**ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны (устаревшее) | Да | Да ||
||**ADDRESS_LOC_ADDR_ID**
[`location`](./data-types.md) | Идентификатор адреса местоположения (устаревшее) | Да | Да ||
||**COMMENTS**
[`string`](../data-types.md) | Комментарий. Поддерживает bb-коды | Да | Да ||
||**OPENED**
[`char`](../data-types.md) | Доступен для всех. Может принимать значения `Y` или `N`. Учитывается в работе прав доступа для ролей с уровнем доступа «Все открытые» | Да | Да ||
||**EXPORT**
[`char`](../data-types.md) | Участвует в экспорте контактов. Может принимать значения `Y` или `N`  | Да | Да ||
||**HAS_PHONE**
[`char`](../data-types.md) | Задан телефон. Может принимать значения `Y` или `N` | Да | Нет ||
||**HAS_EMAIL**
[`char`](../data-types.md) | Задан e-mail. Может принимать значения `Y` или `N` | Да | Нет ||
||**HAS_IMOL**
[`char`](../data-types.md) | Задана открытая линия. Может принимать значения `Y` или `N` | Да | Нет ||
||**ASSIGNED_BY_ID**
[`user`](../data-types.md) | Ответственный | Да | Да ||
||**CREATED_BY_ID**
[`user`](../data-types.md) | Кем создан | Да | Нет ||
||**MODIFY_BY_ID**
[`user`](../data-types.md) | Кем изменен | Да | Нет ||
||**DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
||**DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения | Да | Нет ||
||**COMPANY_ID**
[`crm_company`](./data-types.md) | Основная компания контакта | Да | Да ||
||**COMPANY_IDS**
[`crm_company`](./data-types.md) | Привязка контакта к компаниям. Множественное.

В методах [crm.contact.update](./contacts/crm-contact-update.md) и [crm.contact.add](./contacts/crm-contact-add.md) используется для подачи массива компаний.

В методах [crm.contact.list](./contacts/crm-contact-list.md) и [crm.contact.get](./contacts/crm-contact-get.md) поля нет и необходимо использовать [crm.contact.company.items.get](./contacts/company/crm-contact-company-items-get.md) для получения списка компаний  | Да | Да ||
||**LEAD_ID**
[`crm_lead`](./data-types.md) | Идентификатор лида, связанного с контактом | Да | Нет ||
|| {% note tip "Поля связи с внешними источниками данных" %}

Если контакт создан внешней системой, то:
- поле `ORIGINATOR_ID` хранит строковый идентификатор этой системы
- поле `ORIGIN_ID` хранит строковый идентификатор контакта в этой внешней системе
- поле `ORIGIN_VERSION` хранит версию данных контакта в этой внешней системе

{% endnote %} | > | > | > ||
||**ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этом контакте | Да | Да ||
||**ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор контакта во внешней системе | Да | Да ||
||**ORIGIN_VERSION**
[`string`](../data-types.md) | Версия данных о контакте во внешней системе. Используется для защиты данных от случайного перетирания внешней системой.

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных. | Да | Да ||
||**FACE_ID**
[`integer`](../data-types.md) | Привязка к лицам из модуля `faceid` | Да | Нет ||
||**UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) | Да | Да ||
||**UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) | Да | Да ||
||**UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании | Да | Да ||
||**UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений | Да | Да ||
||**UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы | Да | Да ||
||**PARENT_ID_...** | Поля связей.

Если на портале есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и контактом. Само поле хранит идентификатор элемента такого смарт-процесса.

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом ||
||**LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Дата последней активности в таймлайне | Да | Нет ||
||**LAST_ACTIVITY_BY**
[`user`](../data-types.md) | Автор последней активности в таймлайне | Да | Нет ||
||**PHONE**
[`crm_multifield`](./data-types.md) | Телефоны. Множественное | Да | Да ||
||**EMAIL**
[`crm_multifield`](./data-types.md) | E-mail. Множественное | Да | Да ||
||**WEB**
[`crm_multifield`](./data-types.md) | Сайты. Множественное | Да | Да ||
||**IM**
[`crm_multifield`](./data-types.md) | Мессенджеры. Множественное | Да | Да ||
||**LINK**
[`crm_multifield`](./data-types.md) | Ссылки. Множественное. Служебное | Да | Да ||
||**UF_CRM_xxx**  | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек портала у контактов может быть набор пользовательских полей определенных типов. Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./contacts/userfield/crm-contact-userfield-add.md)  ||
|#

## Реквизиты

### Общие реквизиты

Описание полей возвращает метод [crm.requisite.fields](./requisites/universal/crm-requisite-fields.md)

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор реквизита.

Можно получить с помощью метода [crm.requisite.list](./requisites/universal/crm-requisite-list.md).

Создается автоматически и уникален в рамках портала | Да | Нет ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительской сущности. Сейчас это может быть только:
- `3` — контакт
- `4` — компания

Идентификаторы всех типов сущностей CRM отдает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md)
| Да | Да ||
|| **ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор родительской сущности (контакта либо компании).

Идентификатор можно получить методом [crm.company.list](./companies/crm-company-list.md) для компании и методом [crm.contact.list](./contacts/crm-contact-list.md) для контакта | Да | Да ||
|| **PRESET_ID**
[`integer`](../data-types.md) | Идентификатор шаблона реквизитов.

Идентификаторы шаблонов можно получить методом [crm.requisite.preset.list](./requisites/presets/crm-requisite-preset-list.md) | Да | Да ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения | Да | Нет ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор создавшего реквизит | Да | Нет ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор изменившего реквизит | Да | Нет ||
|| **NAME**
[`string`](../data-types.md) | Название реквизита | Да | Да ||
|| **CODE**
[`string`](../data-types.md) | Символьный код реквизита | Да | Да ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний ключ, используется для операций обмена.

Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком | Да | Да ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор внешней информационной базы.

Назначение поля может меняться конечным разработчиком | Да | Да ||
|| **ACTIVE**
[`char`](../data-types.md) | Признак активности.

Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет | Да | Да ||
|| **ADDRESS_ONLY**
[`char`](../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. При значении `Y` реквизиты не показываются в карточке сущности, но отображается адрес | Да | Да ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка. Порядок в списке реквизитов сущности, когда их несколько | Да | Да ||
|| **RQ_NAME**
[`string`](../data-types.md) | ФИО | Да | Да ||
|| **RQ_FIRST_NAME**
[`string`](../data-types.md) | Имя | Да | Да ||
|| **RQ_LAST_NAME**
[`string`](../data-types.md) | Фамилия | Да | Да ||
|| **RQ_SECOND_NAME**
[`string`](../data-types.md) | Отчество | Да | Да ||
|| **RQ_COMPANY_ID**
[`string`](../data-types.md) | Идентификатор организации | Да | Да ||
|| **RQ_COMPANY_NAME**
[`string`](../data-types.md) | Сокращенное наименование организации | Да | Да ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../data-types.md) | Полное наименование организации | Да | Да ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../data-types.md) | Дата государственной регистрации | Да | Да ||
|| **RQ_DIRECTOR**
[`string`](../data-types.md) | Генеральный директор | Да | Да ||
|| **RQ_ACCOUNTANT**
[`string`](../data-types.md) | Главный бухгалтер | Да | Да ||
|| **RQ_CEO_NAME**
[`string`](../data-types.md) | ФИО первого руководителя | Да | Да ||
|| **RQ_CEO_WORK_POS**
[`string`](../data-types.md) | Должность первого руководителя | Да | Да ||
|| **RQ_CONTACT**
[`string`](../data-types.md) | Контактное лицо | Да | Да ||
|| **RQ_EMAIL**
[`string`](../data-types.md) | E-Mail | Да | Да ||
|| **RQ_PHONE**
[`string`](../data-types.md) | Телефон | Да | Да ||
|| **RQ_FAX**
[`string`](../data-types.md) | Факс | Да | Да ||
|| **RQ_IDENT_TYPE**
[`crm_status`](./data-types.md) | Способ идентификации | Да | Да ||
|| **RQ_IDENT_DOC**
[`string`](../data-types.md) | Вид документа | Да | Да ||
|| **RQ_IDENT_DOC_SER**
[`string`](../data-types.md) | Серия | Да | Да ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../data-types.md) | Номер | Да | Да ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../data-types.md) | Личный номер | Да | Да ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../data-types.md) | Дата выдачи | Да | Да ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../data-types.md) | Кем выдан | Да | Да ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../data-types.md) | Код подразделения | Да | Да ||
|| **RQ_INN**
[`string`](../data-types.md) | ИНН | Да | Да ||
|| **RQ_KPP**
[`string`](../data-types.md) | КПП | Да | Да ||
|| **RQ_USRLE**
[`string`](../data-types.md) | Handelsregisternummer (для страны DE) | Да | Да ||
|| **RQ_IFNS**
[`string`](../data-types.md) | ИФНС | Да | Да ||
|| **RQ_OGRN**
[`string`](../data-types.md) | ОГРН | Да | Да ||
|| **RQ_OGRNIP**
[`string`](../data-types.md) | ОГРНИП | Да | Да ||
|| **RQ_OKPO**
[`string`](../data-types.md) | ОКПО | Да | Да ||
|| **RQ_OKTMO**
[`string`](../data-types.md) | ОКТМО | Да | Да ||
|| **RQ_OKVED**
[`string`](../data-types.md) | ОКВЭД | Да | Да ||
|| **RQ_EDRPOU**
[`string`](../data-types.md) | ЄДРПОУ | Да | Да ||
|| **RQ_DRFO**
[`string`](../data-types.md) | ДРФО | Да | Да ||
|| **RQ_KBE**
[`string`](../data-types.md) | КБЕ | Да | Да ||
|| **RQ_IIN**
[`string`](../data-types.md) | ИИН | Да | Да ||
|| **RQ_BIN**
[`string`](../data-types.md) | БИН | Да | Да ||
|| **RQ_ST_CERT_SER**
[`string`](../data-types.md) | Серия свидетельства о государственной регистрации | Да | Да ||
|| **RQ_ST_CERT_NUM**
[`string`](../data-types.md) | Номер свидетельства о государственной регистрации | Да | Да ||
|| **RQ_ST_CERT_DATE**
[`string`](../data-types.md) | Дата свидетельства о государственной регистрации | Да | Да ||
|| **RQ_VAT_PAYER**
[`char`](../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N` | Да | Да ||
|| **RQ_VAT_ID**
[`string`](../data-types.md) | VAT ID (идентификационный номер плательщика НДС) | Да | Да ||
|| **RQ_VAT_CERT_SER**
[`string`](../data-types.md) | Серия свидетельства по НДС | Да | Да ||
|| **RQ_VAT_CERT_NUM**
[`string`](../data-types.md) | Номер свидетельства по НДС | Да | Да ||
|| **RQ_VAT_CERT_DATE**
[`string`](../data-types.md) | Дата свидетельства по НДС | Да | Да ||
|| **RQ_RESIDENCE_COUNTRY**
[`string`](../data-types.md) | Страна резидента | Да | Да ||
|| **RQ_BASE_DOC**
[`string`](../data-types.md) | Основание действия | Да | Да ||
|| **RQ_REGON**
[`string`](../data-types.md) | REGON (для страны PL) | Да | Да ||
|| **RQ_KRS**
[`string`](../data-types.md) | KRS (для страны PL) | Да | Да ||
|| **RQ_PESEL**
[`string`](../data-types.md) | PESEL (для страны PL) | Да | Да ||
|| **RQ_LEGAL_FORM**
[`string`](../data-types.md) | Forme juridique (для страны FR) | Да | Да ||
|| **RQ_SIRET**
[`string`](../data-types.md) | Numéro Siret (для страны FR) | Да | Да ||
|| **RQ_SIREN**
[`string`](../data-types.md) | Numéro Siren (для страны FR) | Да | Да ||
|| **RQ_CAPITAL**
[`string`](../data-types.md) | Capital social (для страны FR) | Да | Да ||
|| **RQ_RCS**
[`string`](../data-types.md) | RCS (для страны FR) | Да | Да ||
|| **RQ_CNPJ**
[`string`](../data-types.md) | CNPJ (для страны BR) | Да | Да ||
|| **RQ_STATE_REG**
[`string`](../data-types.md) | Inscrição Estadual (IE) (для страны BR) | Да | Да ||
|| **RQ_MNPL_REG**
[`string`](../data-types.md) | Inscrição Municipal (IM) (для страны BR) | Да | Да ||
|| **RQ_CPF**
[`string`](../data-types.md) | CPF (для страны BR) | Да | Да ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](./requisites/user-fields/crm-requisite-userfield-add.md) | Да | Да ||
|#

### Банковские реквизиты

Описание полей возвращает метод [crm.requisite.bankdetail.fields](./requisites/bank-detail/crm-requisite-bank-detail-fields.md)

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор банковского реквизита. Создается автоматически и уникален в рамках портала | Да | Нет ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта. Может быть только `Реквизит` (значение `8`).

Идентификаторы типов объектов возвращает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md) | Да | Нет ||
|| **ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор родительского объекта | Да | Да ||
|| **COUNTRY_ID**
[`integer`](../data-types.md) | Идентификатор страны, которой соответствует набор полей банковского реквизита (смотрите метод [crm.requisite.preset.countries](./requisites/presets/crm-requisite-preset-countries.md) для получения доступных значений).

Код страны банковского реквизита совпадает с кодом страны в привязанном шаблоне реквизитов, идентификатор которого указан в поле `ENTITY_ID`
| Да | Да ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения | Да | Нет ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, создавшего реквизит | Да | Нет ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, изменившего реквизит | Да | Нет ||
|| **NAME^*^**
[`string`](../data-types.md) | Название банковского реквизита | Да | Да ||
|| **CODE**
[`string`](../data-types.md) | Символьный код реквизита | Да | Да ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле.

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями | Да | Да ||
|| **ACTIVE**
[`char`](../data-types.md) | Признак активности. Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет | Да | Да ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка | Да | Да ||
|| **RQ_BANK_NAME**
[`string`](../data-types.md) | Наименование банка | Да | Да ||
|| **RQ_BANK_ADDR**
[`string`](../data-types.md) | Адрес банка | Да | Да ||
|| **RQ_BANK_CODE**
[`string`](../data-types.md) | Código do banco (для страны BR) | Да | Да ||
|| **RQ_BANK_ROUTE_NUM**
[`string`](../data-types.md) | Bank Routing Number | Да | Да ||
|| **RQ_BIK**
[`string`](../data-types.md) | БИК | Да | Да ||
|| **RQ_CODEB**
[`string`](../data-types.md) | Code Banque (для страны FR) | Да | Да ||
|| **RQ_CODEG**
[`string`](../data-types.md) | Code Guichet (для страны FR) | Да | Да ||
|| **RQ_RIB**
[`string`](../data-types.md) | Clé RIB (для страны FR) | Да | Да ||
|| **RQ_MFO**
[`string`](../data-types.md) | МФО | Да | Да ||
|| **RQ_ACC_NAME**
[`string`](../data-types.md) | Bank Account Holder Name | Да | Да ||
|| **RQ_ACC_NUM**
[`string`](../data-types.md) | Bank Account Number | Да | Да ||
|| **RQ_ACC_TYPE**
[`string`](../data-types.md) | Tipo da conta (для страны BR) | Да | Да ||
|| **RQ_AGENCY_NAME**
[`string`](../data-types.md) | Agência (для страны BR) | Да | Да ||
|| **RQ_IIK**
[`string`](../data-types.md) | ИИК | Да | Да ||
|| **RQ_ACC_CURRENCY**
[`string`](../data-types.md) | Валюта счета | Да | Да ||
|| **RQ_COR_ACC_NUM**
[`string`](../data-types.md) | Корреспондентский счет | Да | Да ||
|| **RQ_IBAN**
[`string`](../data-types.md) | IBAN | Да | Да ||
|| **RQ_SWIFT**
[`string`](../data-types.md) | SWIFT | Да | Да ||
|| **RQ_BIC**
[`string`](../data-types.md) | BIC | Да | Да ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарий | Да | Да ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор внешней информационной базы. Назначение поля может меняться конечным разработчиком | Да | Да ||
|#

### Шаблоны реквизитов

Описание полей возвращает метод [crm.requisite.preset.fields](./requisites/presets/crm-requisite-preset-fields.md)

#|
|| **Название** | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор реквизита. Создается автоматически и уникален в рамках портала | Да | Нет ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов CRM отдает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md) | Да | Да ||
|| **COUNTRY_ID**
[`integer`](../data-types.md) | Идентификатор страны, которой соответствует набор полей шаблона реквизита (для получения доступных значений смотрите метод [crm.requisite.preset.countries](./requisites/presets/crm-requisite-preset-countries.md)) | Да | Да ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения. Содержит пустую строку, если шаблон не менялся после создания | Да | Нет ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, создавшего реквизит | Да | Нет ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, изменившего реквизит | Да | Нет ||
|| **NAME**
[`string`](../data-types.md) | Название реквизита | Да | Да ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком.

Каждое приложение обеспечивает уникальность значений в этом поле. Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями.

В CRM зарезервированы значения вида `#CRM_REQUISITE_PRESET_DEF_...` для идентификации шаблонов, которые используются по умолчанию. Не следует использовать эти идентификаторы для своих целей, так как это может привести к нарушению логики | Да | Да ||
|| **ACTIVE**
[`char`](../data-types.md) | Признак активности. Используются значения `Y` или `N`. Определяет доступность шаблона в списке выбора при добавлении реквизитов | Да | Да ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка | Да | Да ||
|#

### Поля шаблонов реквизитов

Описание полей возвращает метод [crm.requisite.preset.field.fields](./requisites/presets/fields/crm-requisite-preset-field-fields.md)

#|
||  **Название**
`тип` | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор поля. Создается автоматически и уникален в рамках шаблона | Да | Нет ||
|| **FIELD_NAME**
[`string`](../data-types.md) | Название поля | Да | Да ||
|| **FIELD_TITLE**
[`string`](../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет | Да | Да ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка. Порядок в списке полей шаблона | Да | Да ||
|| **IN_SHORT_LIST**
[`char`](../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` | Да | Да ||
|#

### Адреса реквизитов

Описание полей возвращает метод [crm.address.fields](./requisites/addresses/crm-address-fields.md)

#|
|| **Название** | **Описание** | **Чтение** | **Запись** ||
|| **TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа адреса. Элемент перечисления «Тип адреса».

Элементы перечисления «Тип адреса» можно получить с помощью метода [crm.enum.addresstype](./auxiliary/enum/crm-enum-address-type.md) | Да | Да  ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md).

{% note tip "" %}

Адреса могут быть привязаны только к Реквизитам (а реквизиты уже к компаниям либо контактам) или Лидам. Для обратной совместимости оставлена возможность связывать Адреса с Контактами или Компаниями. Но эта связь возможна только на некоторых старых порталах, где специально техподдержкой был включен старый режим работы с адресами.

{% endnote %} | Да | Да ||
|| **ENTITY_ID**
[`string`](../data-types.md) | Идентификатор родительского объекта | Да | Да ||
|| **ADDRESS_1**
[`string`](../data-types.md) | Улица, дом, корпус, строение | Да | Да ||
|| **ADDRESS_2**
[`string`](../data-types.md) | Квартира / офис | Да | Да ||
|| **CITY**
[`string`](../data-types.md) | Город | Да | Да ||
|| **POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс | Да | Да ||
|| **REGION**
[`string`](../data-types.md) | Район | Да | Да ||
|| **PROVINCE**
[`string`](../data-types.md) | Область | Да | Да ||
|| **COUNTRY**
[`string`](../data-types.md) | Страна | Да | Да ||
|| **COUNTRY_CODE**
[`string`](../data-types.md) | Код страны | Да | Да ||
|| **LOC_ADDR_ID**
[`integer`](../data-types.md) | Идентификатор адреса местоположения.

Это поле содержит идентификатор объекта адреса в модуле `Location`, связанного с объектов адреса CRM. Каждому адресу CRM соответствует объект адреса в модуле `location`. Это можно использовать для копирования существующего адреса в CRM с информацией о местоположении, которой нет в полях адреса CRM.

Если при создании адреса указан идентификатор адреса модуля `location`, то создается копия адреса `location` и привязывается к созданному адресу CRM. Если в таком случае не указаны значения для строковых полей адреса, то они будут заполнены из location-адреса.

Если же было указано хоть одно строковое поле, то в адресе CRM будут сохранены только указанные поля, и их значения перезапишут соответствующие значения в объекте location-адреса. Такое же поведение будет и при обновлении адреса | Да | Да ||
|| **ANCHOR_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа основного родительского объекта.

Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md).

В этом поле содержится идентификатор типа родительского объекта реквизита (компания или контакт), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор типа лид | Да | Нет ||
|| **ANCHOR_ID**
[`integer`](../data-types.md) | Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

В этом поле содержится идентификатор родительского объекта реквизита (компании или контакта), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор лида | Да | Нет ||
|#

## Дела

Описание полей возвращает метод [crm.activity.fields](./timeline/activities/activity-base/crm-activity-fields.md)

#|
|| **Название** | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор дела | Да | Нет ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца, неизменяемое | Да | Да ||
|| **OWNER_TYPE_ID**
[`crm_enum_ownertype`](./data-types.md#activity-enums) | Тип владельца, неизменяемое | Да | Да ||
|| **TYPE_ID**
[`crm_enum_activitytype`](./data-types.md#activity-enums) | Тип, неизменяемый | Да | Да ||
|| **PROVIDER_ID**
[`string`](../data-types.md) | Идентификатор провайдера | Да | Да ||
|| **PROVIDER_TYPE_ID**
[`string`](../data-types.md) | Идентификатор типа провайдера | Да | Да ||
|| **PROVIDER_GROUP_ID**
[`string`](../data-types.md) | Тип коннектора | Да | Да ||
|| **ASSOCIATED_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор связанной с делом сущности | Да | Нет ||
|| **SUBJECT**
[`string`](../data-types.md) | Тема, заголовок дела | Да | Да ||
|| **START_TIME**
[`datetime`](../data-types.md) | Время начала выполнения | Да | Да ||
|| **END_TIME**
[`datetime`](../data-types.md) | Время завершения | Да | Да ||
|| **DEADLINE**
[`datetime`](../data-types.md) | Срок исполнения. Поле напрямую не устанавливается, значение берется из `START_TIME` для звонка и встречи и из `END_TIME` для задачи | Да | Да ||
|| **COMPLETED**
[`char`](../data-types.md) | Выполнено | Да | Да ||
|| **STATUS**
[`crm_enum_activitystatus`](./data-types.md#activity-enums) | Статус | Да | Да ||
|| **RESPONSIBLE_ID**
[`user`](../data-types.md) | Ответственный | Да | Да ||
|| **PRIORITY**
[`crm_enum_activitypriority`](./data-types.md#activity-enums) | Важность | Да | Да ||
|| **NOTIFY_TYPE**
[`crm_enum_activitynotifytype`](./data-types.md#activity-enums) | Тип уведомлений | Да | Да ||
|| **NOTIFY_VALUE**
[`integer`](../data-types.md) | Параметр уведомления | Да | Да ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание | Да | Да ||
|| **DESCRIPTION_TYPE**
[`crm_enum_contenttype`](./data-types.md#activity-enums) | Тип описания | Да | Да ||
|| **DIRECTION**
[`crm_enum_activitydirection`](./data-types.md#activity-enums) | Направление дела: входящее/исходящее. Актуально для звонков и писем, для встреч не используется | Да | Да ||
|| **LOCATION**
[`string`](../data-types.md) | Местоположение | Да | Да ||
|| **CREATED**
[`datetime`](../data-types.md) | Дата создания | Да | Нет ||
|| **AUTHOR_ID**
[`user`](../data-types.md) | Создатель дела | Да | Да ||
|| **LAST_UPDATED**
[`datetime`](../data-types.md) | Дата последнего обновления | Да | Нет ||
|| **EDITOR_ID**
[`user`](../data-types.md) | Кто изменил | Да | Нет ||
|| **SETTINGS**
[`object`](../data-types.md) | Настройки | Да | Да ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику | Да | Да ||
|| **RESULT_STATUS**
[`integer`](../data-types.md) | Неиспользуемое поле, остается для совместимости | Да | Да ||
|| **RESULT_STREAM**
[`integer`](../data-types.md) | Статистика отчетов | Да | Да ||
|| **RESULT_SOURCE_ID**
[`string`](../data-types.md) | Неиспользуемое поле, остается для совместимости | Да | Да ||
|| **PROVIDER_PARAMS**
[`object`](../data-types.md) | Параметры провайдера | Да | Да ||
|| **PROVIDER_DATA**
[`string`](../data-types.md) | Данные провайдера | Да | Да ||
|| **RESULT_MARK**
[`integer`](../data-types.md) | Неиспользуемое поле, остается для совместимости | Да | Да ||
|| **RESULT_VALUE**
[`double`](../data-types.md) | Неиспользуемое поле, остается для совместимости | Да | Да ||
|| **RESULT_SUM**
[`double`](../data-types.md) | Неиспользуемое поле, остается для совместимости | Да | Да ||
|| **RESULT_CURRENCY_ID**
[`string`](../data-types.md) | Неиспользуемое поле, остается для совместимости | Да | Да ||
|| **AUTOCOMPLETE_RULE**
[`integer`](../data-types.md) | Автозаполнение | Да | Да ||
|| **BINDINGS**
[`crm_activity_binding`](./data-types.md#crm_activity_binding) | Привязки | Да | Нет ||
|| **COMMUNICATIONS**
[`crm_activity_communication`](./data-types.md) | Канал коммуникации. Множественное, обязательное | Да | Да ||
|| **FILES**
[`diskfile`](./data-types.md#diskfile) | Добавленные файлы. Множественное | Да | Да ||
|| **WEBDAV_ELEMENTS**
[`diskfile`](./data-types.md#diskfile) | Добавленные файлы. Множественное. Устарел, сохраняется для совместимости | Да | Да ||
|| **IS_INCOMING_CHANNEL**
[`char`](../data-types.md) | Является ли дело входящим, то есть созданным по результатам входящего обращения клиента в канал коммуникаций | Да | Нет ||
|#
