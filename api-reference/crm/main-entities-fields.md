# Поля основных объектов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Страница помогает определить назначение и тип стандартных полей основных объектов CRM. Используйте справочник при формировании `select`, `filter` и `fields` в методах CRM.

Состав полей и их настройки могут отличаться в разных Битрикс24. Перед созданием интеграции получите актуальное описание полей методом `crm.название_объекта.fields`, например [crm.deal.fields](./deals/crm-deal-fields.md) для сделки. Таблицы ниже нужны для быстрого поиска и не заменяют ответ метода.

Методы возвращают актуальные признаки доступности каждого поля:

- `isReadOnly: true` — поле доступно только для чтения
- `isImmutable: true` — значение поля можно задать при создании объекта, но нельзя изменить после сохранения
- `isRequired: true` — поле обязательно
- `isMultiple: true` — поле принимает несколько значений
- `isDynamic: true` — поле создано в конкретном Битрикс24 и не входит в стандартный набор

Чтобы подготовить запрос:

1. Выберите объект и вызовите его метод `.fields`
2. Найдите поле по идентификатору и проверьте его тип и признаки доступности
3. Получите допустимые значения динамических справочников, например стадий и пользовательских полей
4. Передайте поле в методе создания, изменения, получения или списка с учетом возвращенных признаков

Ограничения длины полей описаны в статье [Ограничения длины полей CRM](./field-length-limits.md).

## Сделки

Описание полей возвращает метод [crm.deal.fields](./deals/crm-deal-fields.md)

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор сделки ||
|| **TITLE**
[`string`](../data-types.md) | Название ||
|| **TYPE_ID**
[`crm_status`](./data-types.md) | Тип сделки. Используется только для привязки к внешнему источнику. ||
|| **CATEGORY_ID**
[`crm_category`](./data-types.md) | Идентификатор воронки. Неизменяемое. Если не передавать это поле при создании сделки, сделка будет создана в общей воронке ||
|| **STAGE_ID**
[`crm_status`](./data-types.md) | Идентификатор стадии сделки. Набор стадий зависит от воронки. Получить стадии можно методом [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID`: `DEAL_STAGE` для общей воронки или `DEAL_STAGE_{CATEGORY_ID}` для другой воронки ||
|| **STAGE_SEMANTIC_ID**
[`string`](../data-types.md) | Группа стадии сделки. Возможные значения:
- `P` — стадия в работе
- `S` — успешная стадия
- `F` — неуспешная стадия ||
|| **IS_NEW**
[`char`](../data-types.md) | Флаг новой сделки (сделки в первой стадии) ||
|| **IS_RECURRING**
[`char`](../data-types.md) | Флаг шаблона регулярной сделки. Если стоит `Y`, то это шаблон, а не сделка ||
|| **IS_RETURN_CUSTOMER**
[`char`](../data-types.md) | Признак повторной сделки. Допустимые значения `Y` или `N` ||
|| **IS_REPEATED_APPROACH**
[`char`](../data-types.md) | Повторное обращение ||
|| **PROBABILITY**
[`integer`](../data-types.md) | Вероятность ||
|| **CURRENCY_ID**
[`crm_currency`](./data-types.md) | Идентификатор валюты сделки ||
|| **OPPORTUNITY**
[`double`](../data-types.md) | Сумма ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../data-types.md) | Признак ручного расчета суммы. Допустимые значения `Y` или `N` ||
|| **TAX_VALUE**
[`double`](../data-types.md) | Ставка налога ||
|| **COMPANY_ID**
[`crm_company`](./data-types.md) | Идентификатор привязанной компании ||
|| **CONTACT_ID**
[`crm_contact`](./data-types.md) | Идентификатор привязанного контакта. Устаревший. Сохраняется для совместимости ||
|| **CONTACT_IDS**
[`crm_contact`](./data-types.md) | Идентификатор привязанного контакта. Множественный.

При использовании [crm.deal.update](./deals/crm-deal-update.md) и [crm.deal.add](./deals/crm-deal-add.md) можно подать массив контактов.

В методах [crm.deal.list](./deals/crm-deal-list.md) и [crm.deal.get](./deals/crm-deal-get.md) поля нет и необходимо использовать [crm.deal.contact.items.get](./deals/contacts/crm-deal-contact-items-get.md) для получения списка контактов.

Для очистки поля используйте [crm.deal.contact.items.delete](./deals/contacts/crm-deal-contact-items-delete.md), для замены значения используйте [crm.deal.contact.items.set](./deals/contacts/crm-deal-contact-items-set.md) ||
|| **QUOTE_ID**
[`crm_quote`](./data-types.md) | Идентификатор квоты. Только для чтения. Устаревший. Используйте метод [crm.quote.list](./quote/crm-quote-list.md) с фильтром по сделке ||
|| **BEGINDATE**
[`date`](../data-types.md) | Дата начала ||
|| **CLOSEDATE**
[`date`](../data-types.md) | Дата завершения ||
|| **OPENED**
[`char`](../data-types.md) | Доступен для всех ||
|| **CLOSED**
[`char`](../data-types.md) | Завершена ли сделка ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарии ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Связано с пользователем по ID ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Создано пользователем ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор автора последнего изменения ||
|| **MOVED_BY_ID**
[`user`](../data-types.md) | Идентификатор автора, который переместил элемент на текущую стадию ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
|| **MOVED_TIME**
[`datetime`](../data-types.md) | Дата перемещения элемента на текущую стадию ||
|| **SOURCE_ID**
[`string`](../data-types.md) | Идентификатор источника. Определяет источник сделки (обратный звонок, реклама, электронная почта и прочее).

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **SOURCE_DESCRIPTION**
[`string`](../data-types.md) | Дополнительно об источнике. Текстовое поле ||
|| **ADDITIONAL_INFO**
[`string`](../data-types.md) | Дополнительная информация ||
|| **LEAD_ID**
[`crm_lead`](./data-types.md) | Идентификатор привязанного лида ||
|| **LOCATION_ID**
[`location`](./data-types.md) | Местоположение клиента. Служебное поле, не рекомендуется к использованию ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
|| **UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) ||
|| **UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **PARENT_ID_xxx**
[`crm_entity`](./data-types.md) | Поля связей.

Если в Битрикс24 есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле связи. Поле хранит идентификатор элемента смарт-процесса, связанного с текущим контактом.

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом ||
|| **LAST_ACTIVITY_BY**
[`string`](../data-types.md) | Идентификатор пользователя, ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде) ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Время последней активности ||
|| **UF_CRM_ххх** | [Пользовательские поля](./deals/user-defined-fields/index.md) ||
|#

## Лиды

Описание полей возвращает метод [crm.lead.fields](./leads/crm-lead-fields.md)

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Целочисленный идентификатор лида ||
|| **TITLE**
[`string`](../data-types.md) | Название лида ||
|| **HONORIFIC**
[`crm_status`](./data-types.md) | Вид обращения. Статус из справочника.

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=HONORIFIC` ||
|| **NAME**
[`string`](../data-types.md) |  Имя контакта ||
|| **SECOND_NAME**
[`string`](../data-types.md) |  Отчество контакта ||
|| **LAST_NAME**
[`string`](../data-types.md) |  Фамилия контакта ||
|| **BIRTHDATE**
[`date`](../data-types.md) | Дата рождения ||
|| **COMPANY_TITLE**
[`string`](../data-types.md) | Название компании, привязанной к лиду ||
|| **SOURCE_ID**
[`crm_status`](./data-types.md) | Идентификатор источника. Статус из справочника.

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md)  с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **SOURCE_DESCRIPTION**
[`string`](../data-types.md) | Описание источника ||
|| **STATUS_ID**
[`crm_status`](./data-types.md) | Идентификатор стадии лида. Статус из справочника.

Список возможных идентификаторов можно получить методом [crm.status.list](./status/crm-status-list.md)  с фильтром `filter[ENTITY_ID]=STATUS` ||
|| **STATUS_DESCRIPTION**
[`string`](../data-types.md) | Дополнительно о стадии ||
|| **STATUS_SEMANTIC_ID**
[`string`](../data-types.md) | Статус. Возможные значения:
- `F` (failed) — обработан неуспешно
- `S` (success) — обработан успешно
- `P` (processing) — лид в обработке ||
|| **POST**
[`string`](../data-types.md) | Должность ||
|| **ADDRESS**
[`string`](../data-types.md) | Адрес контакта ||
|| **ADDRESS_2**
[`string`](../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части ||
|| **ADDRESS_CITY**
[`string`](../data-types.md) | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`](../data-types.md) | Район ||
|| **ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область ||
|| **ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../data-types.md) | Идентификатор адреса из модуля местоположений ||
|| **CURRENCY_ID**
[`crm_currency`](./data-types.md) | Идентификатор валюты ||
|| **OPPORTUNITY**
[`double`](../data-types.md) | Предполагаемая сумма ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../data-types.md) | Признак ручного расчета суммы. Допустимые значения `Y` или `N` ||
|| **OPENED**
[`char`](../data-types.md) | Доступен для всех. Допустимые значения `Y` или `N` ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарии ||
|| **HAS_PHONE**
[`char`](../data-types.md) | Признак заполненности поля `телефон`. Допустимые значения `Y` или `N` ||
|| **HAS_EMAIL**
[`char`](../data-types.md) | Признак заполненности поля электронной почты. Допустимые значения `Y` или `N` ||
|| **HAS_IMOL**
[`char`](../data-types.md) | Признак наличия привязанной открытой линии. Допустимые значения `Y` или `N` ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, ответственного за лид ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, создавшего лид ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор автора последнего изменения ||
|| **MOVED_BY_ID**
[`user`](../data-types.md) | Идентификатор автора перемещения элемента на текущую стадию ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
|| **MOVED_TIME**
[`datetime`](../data-types.md) | Дата перемещения элемента на текущую стадию ||
|| **COMPANY_ID**
[`crm_company`](./data-types.md) | Привязка лида к компании (Поле Клиент->Компания) ||
|| **CONTACT_ID**
[`crm_contact`](./data-types.md) | Привязка лида к контакту. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости ||
|| **CONTACT_IDS**
[`crm_contact`](./data-types.md) |  Идентификатор привязанного контакта. Множественный.

При использовании [crm.lead.update](./leads/crm-lead-update.md) и [crm.lead.add](./leads/crm-lead-add.md) можно передать массив контактов  ||
|| **IS_RETURN_CUSTOMER**
[`char`](../data-types.md) | Признак повторного лида. Допустимые значения `Y` или `N` ||
|| **DATE_CLOSED**
[`datetime`](../data-types.md) | Дата закрытия ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
|| **UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) ||
|| **UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Время последней активности ||
|| **LAST_ACTIVITY_BY**
[`string`](../data-types.md) | Идентификатор пользователя, ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде) ||
|| **PHONE**
[`crm_multifield`](./data-types.md) | Телефон контакта. Множественный ||
|| **EMAIL**
[`crm_multifield`](./data-types.md) | Адрес электронной почты.  Множественный ||
|| **WEB**
[`crm_multifield`](./data-types.md) | URL ресурсы лида. Множественный ||
|| **IM**
[`crm_multifield`](./data-types.md) | Мессенджеры. Множественный ||
|| **LINK**
[`crm_multifield`](./data-types.md) |  Ссылки. Множественное. Служебное ||
|| **UF_CRM_ххх** | [Пользовательские поля](./leads/userfield/index.md) ||
|#

## Компании

Описание полей возвращает метод [crm.company.fields](./companies/crm-company-fields.md)

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор компании ||
|| **TITLE**
[`string`](../data-types.md) | Название. Обязательное ||
|| **COMPANY_TYPE**
[`crm_status`](./data-types.md) | Тип компании ||
|| **LOGO**
[`file`](../data-types.md) | Логотип ||
|| **ADDRESS**
[`string`](../data-types.md) | Адрес компании ||
|| **ADDRESS_2**
[`string`](../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части ||
|| **ADDRESS_CITY**
[`string`](../data-types.md) | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`](../data-types.md) | Район ||
|| **ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область ||
|| **ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../data-types.md) | Идентификатор адреса местоположения ||
|| **ADDRESS_LEGAL**
[`string`](../data-types.md) | Юридический адрес ||
|| **REG_ADDRESS**
[`string`](../data-types.md) | Юридический адрес компании. Устарел, используется для совместимости ||
|| **REG_ADDRESS_2**
[`string`](../data-types.md) | Вторая страница юридического адреса. В некоторых странах принято разбивать адрес на 2 части.

Устарел, используется для совместимости ||
|| **REG_ADDRESS_CITY**
[`string`](../data-types.md) | Город юридического адреса. Устарел, используется для совместимости ||
|| **REG_ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс юридического адреса. Устарел, используется для совместимости ||
|| **REG_ADDRESS_REGION**
[`string`](../data-types.md) | Район юридического адреса. Устарел, используется для совместимости ||
|| **REG_ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область юридического адреса. Устарел, используется для совместимости ||
|| **REG_ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна юридического адреса. Устарел, используется для совместимости ||
|| **REG_ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны юридического адресa. Устарел, используется для совместимости ||
|| **REG_ADDRESS_LOC_ADDR_ID**
[`integer`](../data-types.md) | Юридический адрес идентификатор адреса местоположения. Устарел, используется для совместимости ||
|| **BANKING_DETAILS**
[`string`](../data-types.md) | Банковские реквизиты ||
|| **INDUSTRY**
[`crm_status`](./data-types.md) | Сфера деятельности ||
|| **EMPLOYEES**
[`crm_status`](./data-types.md) | Количество сотрудников ||
|| **CURRENCY_ID**
[`crm_currency`](./data-types.md) | Валюта ||
|| **REVENUE**
[`double`](../data-types.md) | Годовой оборот ||
|| **OPENED**
[`char`](../data-types.md) | Доступен для всех ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарии ||
|| **HAS_PHONE**
[`char`](../data-types.md) | Проверка заполненности поля телефона ||
|| **HAS_EMAIL**
[`char`](../data-types.md) | Проверка заполненности поля электронной почты ||
|| **HAS_IMOL**
[`char`](../data-types.md) | Задана ли открытая линия ||
|| **IS_MY_COMPANY**
[`char`](../data-types.md) | Моя компания ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Связана ли с пользователем по ID ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Кем создана компания ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор автора последнего изменения ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
|| **CONTACT_ID**
[`string`](../data-types.md) | Контакт. Используется только для привязки к внешнему источнику. ||
|| **LEAD_ID**
[`crm_lead`](./data-types.md) | Идентификатор лида, связанного с компанией ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_VERSION**
[`string`](../data-types.md) | Оригинальная версия. Используется для защиты данных от случайного перетирания внешней системой.

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
|| **UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) ||
|| **UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **PARENT_ID_xxx**
[`crm_entity`](./data-types.md) | Поля связей.

Если в Битрикс24 есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле связи. Поле хранит идентификатор элемента смарт-процесса, связанного с текущим контактом.

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Время последней активности. ||
|| **LAST_ACTIVITY_BY**
[`user`](../data-types.md) | Автор последней активности в таймлайне ||
|| **PHONE**
[`crm_multifield`](./data-types.md) | Телефон компании. Множественное ||
|| **EMAIL**
[`crm_multifield`](./data-types.md) | Адрес электронной почты. Множественное ||
|| **WEB**
[`crm_multifield`](./data-types.md) | URL ресурсов компании. Множественное ||
|| **IM**
[`crm_multifield`](./data-types.md) | Мессенджеры. Множественное ||
|| **LINK**
[`crm_multifield`](./data-types.md) |  Ссылки. Множественное. Служебное ||
|#


## Контакты

Описание полей возвращает метод [crm.contact.fields](./contacts/crm-contact-fields.md)

#|
|| **Название**
`тип` | **Описание** ||
||**ID**
[`integer`](../data-types.md) | Идентификатор контакта ||
||**HONORIFIC**
[`crm_status`](./data-types.md) | Обращение.

Получить значения справочника можно с помощью метода [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID=HONORIFIC` ||
||**NAME**
[`string`](../data-types.md) | Имя ||
||**SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
||**LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
||**PHOTO**
[`file`](../data-types.md) | Фотография ||
||**BIRTHDATE**
[`date`](../data-types.md) | Дата рождения ||
||**TYPE_ID**
[`crm_status`](./data-types.md)| Тип контакта.

Получить значения справочника можно с помощью метода [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID=CONTACT_TYPE` ||
||**SOURCE_ID**
[`crm_status`](./data-types.md) | Источник.

Получить значения справочника можно с помощью метода [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID=SOURCE` ||
||**SOURCE_DESCRIPTION**
[`string`](../data-types.md) | Дополнительно об источнике ||
||**POST**
[`string`](../data-types.md) | Должность ||
|| {% note tip "Устаревшие поля" %}

Поля адреса в контакте являются устаревшими и используются только в режиме совместимости. Для работы с адресом используйте [реквизиты](./requisites/index.md).

{% endnote %}
| > ||
||**ADDRESS**
[`string`](../data-types.md) | Адрес (устаревшее) ||
||**ADDRESS_2**
[`string`](../data-types.md) | Вторая строка адреса (устаревшее) ||
||**ADDRESS_CITY**
[`string`](../data-types.md) | Город (устаревшее) ||
||**ADDRESS_POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс (устаревшее) ||
||**ADDRESS_REGION**
[`string`](../data-types.md) | Район (устаревшее) ||
||**ADDRESS_PROVINCE**
[`string`](../data-types.md) | Область (устаревшее) ||
||**ADDRESS_COUNTRY**
[`string`](../data-types.md) | Страна (устаревшее) ||
||**ADDRESS_COUNTRY_CODE**
[`string`](../data-types.md) | Код страны (устаревшее) ||
||**ADDRESS_LOC_ADDR_ID**
[`location`](./data-types.md) | Идентификатор адреса местоположения (устаревшее) ||
||**COMMENTS**
[`string`](../data-types.md) | Комментарий. Поддерживает bb-коды ||
||**OPENED**
[`char`](../data-types.md) | Доступен для всех. Может принимать значения `Y` или `N`. Учитывается в работе прав доступа для ролей с уровнем доступа «Все открытые» ||
||**EXPORT**
[`char`](../data-types.md) | Участвует в экспорте контактов. Может принимать значения `Y` или `N`  ||
||**HAS_PHONE**
[`char`](../data-types.md) | Задан телефон. Может принимать значения `Y` или `N` ||
||**HAS_EMAIL**
[`char`](../data-types.md) | Задан e-mail. Может принимать значения `Y` или `N` ||
||**HAS_IMOL**
[`char`](../data-types.md) | Задана открытая линия. Может принимать значения `Y` или `N` ||
||**ASSIGNED_BY_ID**
[`user`](../data-types.md) | Ответственный ||
||**CREATED_BY_ID**
[`user`](../data-types.md) | Кем создан ||
||**MODIFY_BY_ID**
[`user`](../data-types.md) | Кем изменен ||
||**DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
||**DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
||**COMPANY_ID**
[`crm_company`](./data-types.md) | Основная компания контакта ||
||**COMPANY_IDS**
[`crm_company`](./data-types.md) | Привязка контакта к компаниям. Множественное.

В методах [crm.contact.update](./contacts/crm-contact-update.md) и [crm.contact.add](./contacts/crm-contact-add.md) используется для подачи массива компаний.

В методах [crm.contact.list](./contacts/crm-contact-list.md) и [crm.contact.get](./contacts/crm-contact-get.md) поля нет и необходимо использовать [crm.contact.company.items.get](./contacts/company/crm-contact-company-items-get.md) для получения списка компаний  ||
||**LEAD_ID**
[`crm_lead`](./data-types.md) | Идентификатор лида, связанного с контактом ||
|| {% note tip "Поля связи с внешними источниками данных" %}

Если контакт создан внешней системой, то:
- поле `ORIGINATOR_ID` хранит строковый идентификатор этой системы
- поле `ORIGIN_ID` хранит строковый идентификатор контакта в этой внешней системе
- поле `ORIGIN_VERSION` хранит версию данных контакта в этой внешней системе

{% endnote %} | > ||
||**ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
||**ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор контакта во внешней системе ||
||**ORIGIN_VERSION**
[`string`](../data-types.md) | Версия данных о контакте во внешней системе. Используется для защиты данных от случайного перетирания внешней системой.

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных. ||
||**FACE_ID**
[`integer`](../data-types.md) | Привязка к лицам из модуля `faceid` ||
||**UTM_SOURCE**
[`string`](../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
||**UTM_MEDIUM**
[`string`](../data-types.md) | Тип трафика: CPC (объявления), CPM (баннеры) ||
||**UTM_CAMPAIGN**
[`string`](../data-types.md) | Обозначение рекламной кампании ||
||**UTM_CONTENT**
[`string`](../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
||**UTM_TERM**
[`string`](../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
||**PARENT_ID_...** | Поля связей.

Если в Битрикс24 есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле связи. Поле хранит идентификатор элемента смарт-процесса, связанного с текущим контактом.

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`, хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом ||
||**LAST_ACTIVITY_TIME**
[`datetime`](../data-types.md) | Дата последней активности в таймлайне ||
||**LAST_ACTIVITY_BY**
[`user`](../data-types.md) | Автор последней активности в таймлайне ||
||**PHONE**
[`crm_multifield`](./data-types.md) | Телефоны. Множественное ||
||**EMAIL**
[`crm_multifield`](./data-types.md) | E-mail. Множественное ||
||**WEB**
[`crm_multifield`](./data-types.md) | Сайты. Множественное ||
||**IM**
[`crm_multifield`](./data-types.md) | Мессенджеры. Множественное ||
||**LINK**
[`crm_multifield`](./data-types.md) | Ссылки. Множественное. Служебное ||
||**UF_CRM_xxx**  | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек Битрикс24 у контактов может быть набор пользовательских полей определенных типов. Добавить пользовательское поле в контакт можно методом [crm.contact.userfield.add](./contacts/userfield/crm-contact-userfield-add.md) ||
|#

## Реквизиты

### Общие реквизиты

Описание полей возвращает метод [crm.requisite.fields](./requisites/universal/crm-requisite-fields.md)

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор реквизита.

Можно получить с помощью метода [crm.requisite.list](./requisites/universal/crm-requisite-list.md).

Создается автоматически и уникален в рамках Битрикс24 ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта. Возможные значения:
- `3` — контакт
- `4` — компания

Идентификаторы всех типов объектов CRM возвращает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md) ||
|| **ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор родительского объекта — контакта или компании.

Идентификатор можно получить методом [crm.company.list](./companies/crm-company-list.md) для компании и методом [crm.contact.list](./contacts/crm-contact-list.md) для контакта ||
|| **PRESET_ID**
[`integer`](../data-types.md) | Идентификатор шаблона реквизитов.

Идентификаторы шаблонов можно получить методом [crm.requisite.preset.list](./requisites/presets/crm-requisite-preset-list.md) ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор изменившего реквизит ||
|| **NAME**
[`string`](../data-types.md) | Название реквизита ||
|| **CODE**
[`string`](../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний ключ, используется для операций обмена.

Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ACTIVE**
[`char`](../data-types.md) | Признак активности.

Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет ||
|| **ADDRESS_ONLY**
[`char`](../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. При значении `Y` реквизиты не показываются в карточке объекта, но отображается адрес ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка. Порядок в списке реквизитов объекта, когда их несколько ||
|| **RQ_NAME**
[`string`](../data-types.md) | ФИО ||
|| **RQ_FIRST_NAME**
[`string`](../data-types.md) | Имя ||
|| **RQ_LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **RQ_SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **RQ_COMPANY_ID**
[`string`](../data-types.md) | Идентификатор организации ||
|| **RQ_COMPANY_NAME**
[`string`](../data-types.md) | Сокращенное наименование организации ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../data-types.md) | Полное наименование организации ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../data-types.md) | Дата государственной регистрации ||
|| **RQ_DIRECTOR**
[`string`](../data-types.md) | Генеральный директор ||
|| **RQ_ACCOUNTANT**
[`string`](../data-types.md) | Главный бухгалтер ||
|| **RQ_CEO_NAME**
[`string`](../data-types.md) | ФИО первого руководителя ||
|| **RQ_CEO_WORK_POS**
[`string`](../data-types.md) | Должность первого руководителя ||
|| **RQ_CONTACT**
[`string`](../data-types.md) | Контактное лицо ||
|| **RQ_EMAIL**
[`string`](../data-types.md) | E-Mail ||
|| **RQ_PHONE**
[`string`](../data-types.md) | Телефон ||
|| **RQ_FAX**
[`string`](../data-types.md) | Факс ||
|| **RQ_IDENT_TYPE**
[`crm_status`](./data-types.md) | Способ идентификации ||
|| **RQ_IDENT_DOC**
[`string`](../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../data-types.md) | Личный номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../data-types.md) | Дата выдачи ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../data-types.md) | Кем выдан ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../data-types.md) | Код подразделения ||
|| **RQ_INN**
[`string`](../data-types.md) | ИНН ||
|| **RQ_KPP**
[`string`](../data-types.md) | КПП ||
|| **RQ_USRLE**
[`string`](../data-types.md) | Handelsregisternummer (для страны DE) ||
|| **RQ_IFNS**
[`string`](../data-types.md) | ИФНС ||
|| **RQ_OGRN**
[`string`](../data-types.md) | ОГРН ||
|| **RQ_OGRNIP**
[`string`](../data-types.md) | ОГРНИП ||
|| **RQ_OKPO**
[`string`](../data-types.md) | ОКПО ||
|| **RQ_OKTMO**
[`string`](../data-types.md) | ОКТМО ||
|| **RQ_OKVED**
[`string`](../data-types.md) | ОКВЭД ||
|| **RQ_EDRPOU**
[`string`](../data-types.md) | ЄДРПОУ ||
|| **RQ_DRFO**
[`string`](../data-types.md) | ДРФО ||
|| **RQ_KBE**
[`string`](../data-types.md) | КБЕ ||
|| **RQ_IIN**
[`string`](../data-types.md) | ИИН ||
|| **RQ_BIN**
[`string`](../data-types.md) | БИН ||
|| **RQ_ST_CERT_SER**
[`string`](../data-types.md) | Серия свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_NUM**
[`string`](../data-types.md) | Номер свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_DATE**
[`string`](../data-types.md) | Дата свидетельства о государственной регистрации ||
|| **RQ_VAT_PAYER**
[`char`](../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N` ||
|| **RQ_VAT_ID**
[`string`](../data-types.md) | VAT ID (идентификационный номер плательщика НДС) ||
|| **RQ_VAT_CERT_SER**
[`string`](../data-types.md) | Серия свидетельства по НДС ||
|| **RQ_VAT_CERT_NUM**
[`string`](../data-types.md) | Номер свидетельства по НДС ||
|| **RQ_VAT_CERT_DATE**
[`string`](../data-types.md) | Дата свидетельства по НДС ||
|| **RQ_RESIDENCE_COUNTRY**
[`string`](../data-types.md) | Страна резидента ||
|| **RQ_BASE_DOC**
[`string`](../data-types.md) | Основание действия ||
|| **RQ_REGON**
[`string`](../data-types.md) | REGON (для страны PL) ||
|| **RQ_KRS**
[`string`](../data-types.md) | KRS (для страны PL) ||
|| **RQ_PESEL**
[`string`](../data-types.md) | PESEL (для страны PL) ||
|| **RQ_LEGAL_FORM**
[`string`](../data-types.md) | Forme juridique (для страны FR) ||
|| **RQ_SIRET**
[`string`](../data-types.md) | Numéro Siret (для страны FR) ||
|| **RQ_SIREN**
[`string`](../data-types.md) | Numéro Siren (для страны FR) ||
|| **RQ_CAPITAL**
[`string`](../data-types.md) | Capital social (для страны FR) ||
|| **RQ_RCS**
[`string`](../data-types.md) | RCS (для страны FR) ||
|| **RQ_CNPJ**
[`string`](../data-types.md) | CNPJ (для страны BR) ||
|| **RQ_STATE_REG**
[`string`](../data-types.md) | Inscrição Estadual (IE) (для страны BR) ||
|| **RQ_MNPL_REG**
[`string`](../data-types.md) | Inscrição Municipal (IM) (для страны BR) ||
|| **RQ_CPF**
[`string`](../data-types.md) | CPF (для страны BR) ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](./requisites/user-fields/crm-requisite-userfield-add.md) ||
|#

### Банковские реквизиты

Описание полей возвращает метод [crm.requisite.bankdetail.fields](./requisites/bank-detail/crm-requisite-bank-detail-fields.md)

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор банковского реквизита. Создается автоматически и уникален в рамках Битрикс24 ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта. Может быть только `Реквизит` (значение `8`).

Идентификаторы типов объектов возвращает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md) ||
|| **ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор родительского объекта ||
|| **COUNTRY_ID**
[`integer`](../data-types.md) | Идентификатор страны, которой соответствует набор полей банковского реквизита (смотрите метод [crm.requisite.preset.countries](./requisites/presets/crm-requisite-preset-countries.md) для получения доступных значений).

Код страны банковского реквизита совпадает с кодом страны в привязанном шаблоне реквизитов, идентификатор которого указан в поле `ENTITY_ID` ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, изменившего реквизит ||
|| **NAME^*^**
[`string`](../data-types.md) | Название банковского реквизита ||
|| **CODE**
[`string`](../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле.

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями ||
|| **ACTIVE**
[`char`](../data-types.md) | Признак активности. Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|| **RQ_BANK_NAME**
[`string`](../data-types.md) | Наименование банка ||
|| **RQ_BANK_ADDR**
[`string`](../data-types.md) | Адрес банка ||
|| **RQ_BANK_CODE**
[`string`](../data-types.md) | Código do banco (для страны BR) ||
|| **RQ_BANK_ROUTE_NUM**
[`string`](../data-types.md) | Bank Routing Number ||
|| **RQ_BIK**
[`string`](../data-types.md) | БИК ||
|| **RQ_CODEB**
[`string`](../data-types.md) | Code Banque (для страны FR) ||
|| **RQ_CODEG**
[`string`](../data-types.md) | Code Guichet (для страны FR) ||
|| **RQ_RIB**
[`string`](../data-types.md) | Clé RIB (для страны FR) ||
|| **RQ_MFO**
[`string`](../data-types.md) | МФО ||
|| **RQ_ACC_NAME**
[`string`](../data-types.md) | Bank Account Holder Name ||
|| **RQ_ACC_NUM**
[`string`](../data-types.md) | Bank Account Number ||
|| **RQ_ACC_TYPE**
[`string`](../data-types.md) | Tipo da conta (для страны BR) ||
|| **RQ_AGENCY_NAME**
[`string`](../data-types.md) | Agência (для страны BR) ||
|| **RQ_IIK**
[`string`](../data-types.md) | ИИК ||
|| **RQ_ACC_CURRENCY**
[`string`](../data-types.md) | Валюта счета ||
|| **RQ_COR_ACC_NUM**
[`string`](../data-types.md) | Корреспондентский счет ||
|| **RQ_IBAN**
[`string`](../data-types.md) | IBAN ||
|| **RQ_SWIFT**
[`string`](../data-types.md) | SWIFT ||
|| **RQ_BIC**
[`string`](../data-types.md) | BIC ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарий ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор внешней информационной базы. Назначение поля может меняться конечным разработчиком ||
|#

### Шаблоны реквизитов

Описание полей возвращает метод [crm.requisite.preset.fields](./requisites/presets/crm-requisite-preset-fields.md)

#|
|| **Название** | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор реквизита. Создается автоматически и уникален в рамках Битрикс24 ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов CRM отдает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md) ||
|| **COUNTRY_ID**
[`integer`](../data-types.md) | Идентификатор страны, которой соответствует набор полей шаблона реквизита (для получения доступных значений смотрите метод [crm.requisite.preset.countries](./requisites/presets/crm-requisite-preset-countries.md)) ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения. Содержит пустую строку, если шаблон не менялся после создания ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Идентификатор пользователя, изменившего реквизит ||
|| **NAME**
[`string`](../data-types.md) | Название реквизита ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком.

Каждое приложение обеспечивает уникальность значений в этом поле. Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями.

В CRM зарезервированы значения вида `#CRM_REQUISITE_PRESET_DEF_...` для идентификации шаблонов, которые используются по умолчанию. Не следует использовать эти идентификаторы для своих целей, так как это может привести к нарушению логики ||
|| **ACTIVE**
[`char`](../data-types.md) | Признак активности. Используются значения `Y` или `N`. Определяет доступность шаблона в списке выбора при добавлении реквизитов ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка ||
|#

### Поля шаблонов реквизитов

Описание полей возвращает метод [crm.requisite.preset.field.fields](./requisites/presets/fields/crm-requisite-preset-field-fields.md)

#|
||  **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор поля. Создается автоматически и уникален в рамках шаблона ||
|| **FIELD_NAME**
[`string`](../data-types.md) | Название поля ||
|| **FIELD_TITLE**
[`string`](../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет ||
|| **SORT**
[`integer`](../data-types.md) | Сортировка. Порядок в списке полей шаблона ||
|| **IN_SHORT_LIST**
[`char`](../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` ||
|#

### Адреса реквизитов

Описание полей возвращает метод [crm.address.fields](./requisites/addresses/crm-address-fields.md)

#|
|| **Название** | **Описание** ||
|| **TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа адреса. Элемент перечисления «Тип адреса».

Элементы перечисления «Тип адреса» можно получить с помощью метода [crm.enum.addresstype](./auxiliary/enum/crm-enum-address-type.md) ||
|| **ENTITY_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md).

{% note tip "" %}

Адреса можно привязать к реквизитам или лидам. Реквизиты, в свою очередь, связаны с компаниями или контактами. Для обратной совместимости в некоторых старых Битрикс24 может быть доступна прямая связь адреса с контактом или компанией.

{% endnote %} ||
|| **ENTITY_ID**
[`string`](../data-types.md) | Идентификатор родительского объекта ||
|| **ADDRESS_1**
[`string`](../data-types.md) | Улица, дом, корпус, строение ||
|| **ADDRESS_2**
[`string`](../data-types.md) | Квартира / офис ||
|| **CITY**
[`string`](../data-types.md) | Город ||
|| **POSTAL_CODE**
[`string`](../data-types.md) | Почтовый индекс ||
|| **REGION**
[`string`](../data-types.md) | Район ||
|| **PROVINCE**
[`string`](../data-types.md) | Область ||
|| **COUNTRY**
[`string`](../data-types.md) | Страна ||
|| **COUNTRY_CODE**
[`string`](../data-types.md) | Код страны ||
|| **LOC_ADDR_ID**
[`integer`](../data-types.md) | Идентификатор адреса местоположения.

Это поле содержит идентификатор объекта адреса в модуле `Location`, связанного с объектов адреса CRM. Каждому адресу CRM соответствует объект адреса в модуле `location`. Это можно использовать для копирования существующего адреса в CRM с информацией о местоположении, которой нет в полях адреса CRM.

Если при создании адреса указан идентификатор адреса модуля `location`, то создается копия адреса `location` и привязывается к созданному адресу CRM. Если в таком случае не указаны значения для строковых полей адреса, то они будут заполнены из location-адреса.

Если же было указано хоть одно строковое поле, то в адресе CRM будут сохранены только указанные поля, и их значения перезапишут соответствующие значения в объекте location-адреса. Такое же поведение будет и при обновлении адреса ||
|| **ANCHOR_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа основного родительского объекта.

Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md).

В этом поле содержится идентификатор типа родительского объекта реквизита (компания или контакт), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор типа лид ||
|| **ANCHOR_ID**
[`integer`](../data-types.md) | Это поле для служебного использования. Значение заполняется автоматически при добавлении адреса.

В этом поле содержится идентификатор родительского объекта реквизита (компании или контакта), если адрес привязан к реквизиту. Если адрес привязан к лиду, то этим значением будет идентификатор лида ||
|#

## Дела

Описание полей возвращает метод [crm.activity.fields](./timeline/activities/activity-base/crm-activity-fields.md)

#|
|| **Название** | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор дела ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца, неизменяемое ||
|| **OWNER_TYPE_ID**
[`crm_enum_ownertype`](./data-types.md#activity-enums) | Тип владельца, неизменяемое ||
|| **TYPE_ID**
[`crm_enum_activitytype`](./data-types.md#activity-enums) | Тип, неизменяемый ||
|| **PROVIDER_ID**
[`string`](../data-types.md) | Идентификатор провайдера ||
|| **PROVIDER_TYPE_ID**
[`string`](../data-types.md) | Идентификатор типа провайдера ||
|| **PROVIDER_GROUP_ID**
[`string`](../data-types.md) | Тип коннектора ||
|| **ASSOCIATED_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор связанного с делом объекта ||
|| **SUBJECT**
[`string`](../data-types.md) | Тема, заголовок дела ||
|| **START_TIME**
[`datetime`](../data-types.md) | Время начала выполнения ||
|| **END_TIME**
[`datetime`](../data-types.md) | Время завершения ||
|| **DEADLINE**
[`datetime`](../data-types.md) | Срок исполнения. Поле напрямую не устанавливается, значение берется из `START_TIME` для звонка и встречи и из `END_TIME` для задачи ||
|| **COMPLETED**
[`char`](../data-types.md) | Выполнено ||
|| **STATUS**
[`crm_enum_activitystatus`](./data-types.md#activity-enums) | Статус ||
|| **RESPONSIBLE_ID**
[`user`](../data-types.md) | Ответственный ||
|| **PRIORITY**
[`crm_enum_activitypriority`](./data-types.md#activity-enums) | Важность ||
|| **NOTIFY_TYPE**
[`crm_enum_activitynotifytype`](./data-types.md#activity-enums) | Тип уведомлений ||
|| **NOTIFY_VALUE**
[`integer`](../data-types.md) | Параметр уведомления ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание ||
|| **DESCRIPTION_TYPE**
[`crm_enum_contenttype`](./data-types.md#activity-enums) | Тип описания ||
|| **DIRECTION**
[`crm_enum_activitydirection`](./data-types.md#activity-enums) | Направление дела: входящее/исходящее. Актуально для звонков и писем, для встреч не используется ||
|| **LOCATION**
[`string`](../data-types.md) | Местоположение ||
|| **CREATED**
[`datetime`](../data-types.md) | Дата создания ||
|| **AUTHOR_ID**
[`user`](../data-types.md) | Создатель дела ||
|| **LAST_UPDATED**
[`datetime`](../data-types.md) | Дата последнего обновления ||
|| **EDITOR_ID**
[`user`](../data-types.md) | Кто изменил ||
|| **SETTINGS**
[`object`](../data-types.md) | Настройки ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **RESULT_STATUS**
[`integer`](../data-types.md) | Неиспользуемое поле, остается для совместимости ||
|| **RESULT_STREAM**
[`integer`](../data-types.md) | Статистика отчетов ||
|| **RESULT_SOURCE_ID**
[`string`](../data-types.md) | Неиспользуемое поле, остается для совместимости ||
|| **PROVIDER_PARAMS**
[`object`](../data-types.md) | Параметры провайдера ||
|| **PROVIDER_DATA**
[`string`](../data-types.md) | Данные провайдера ||
|| **RESULT_MARK**
[`integer`](../data-types.md) | Неиспользуемое поле, остается для совместимости ||
|| **RESULT_VALUE**
[`double`](../data-types.md) | Неиспользуемое поле, остается для совместимости ||
|| **RESULT_SUM**
[`double`](../data-types.md) | Неиспользуемое поле, остается для совместимости ||
|| **RESULT_CURRENCY_ID**
[`string`](../data-types.md) | Неиспользуемое поле, остается для совместимости ||
|| **AUTOCOMPLETE_RULE**
[`integer`](../data-types.md) | Автозаполнение ||
|| **BINDINGS**
[`crm_activity_binding`](./data-types.md#crm_activity_binding) | Привязки ||
|| **COMMUNICATIONS**
[`crm_activity_communication`](./data-types.md) | Канал коммуникации. Множественное, обязательное ||
|| **FILES**
[`diskfile`](./data-types.md#diskfile) | Добавленные файлы. Множественное ||
|| **WEBDAV_ELEMENTS**
[`diskfile`](./data-types.md#diskfile) | Добавленные файлы. Множественное. Устарел, сохраняется для совместимости ||
|| **IS_INCOMING_CHANNEL**
[`char`](../data-types.md) | Является ли дело входящим, то есть созданным по результатам входящего обращения клиента в канал коммуникаций ||
|#

## Продолжите изучение

- [Типы данных CRM](./data-types.md) — специальные типы полей и связи между объектами
- [Пользовательские поля сделок](./deals/user-defined-fields/index.md) — создание и настройка дополнительных полей сделки
- [Статусы и справочники CRM](./status/index.md) — получение значений стадий и других справочных полей
