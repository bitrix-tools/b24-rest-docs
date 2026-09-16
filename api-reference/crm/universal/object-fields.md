# Поля объектов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поля объектов CRM — это набор стандартных полей элемента, который универсальные методы [crm.item.*](./index.md) принимают в параметре `fields` и возвращают в ответе. Так работают методы [crm.item.add](./crm-item-add.md), [crm.item.update](./crm-item-update.md), [crm.item.get](./crm-item-get.md) и [crm.item.list](./crm-item-list.md).

Имена полей даны в нотации `camelCase`. Методы отдельных типов объектов — [crm.lead.*](../leads/index.md), [crm.deal.*](../deals/index.md), [crm.contact.*](../contacts/index.md), [crm.company.*](../companies/index.md) — работают с теми же данными в нотации `UPPER_CASE`. Например, `stageId` у них называется `STATUS_ID` или `STAGE_ID`. Перечни их полей возвращают методы [crm.lead.fields](../leads/crm-lead-fields.md), [crm.deal.fields](../deals/crm-deal-fields.md), [crm.contact.fields](../contacts/crm-contact-fields.md) и [crm.company.fields](../companies/crm-company-fields.md). Имена полей из этой статьи для методов отдельных типов объектов не подходят.

> Scope: [`crm`](../../scopes/permissions.md)
>
> Права доступа к элементам объекта CRM действуют и на поля: без права на чтение элемента и без права на его изменение метод вернет ошибку доступа вместо ответа

Пользовательские поля, ограничения длины и форматы типов данных описаны отдельно:

- пользовательские поля — [{#T}](./user-defined-fields/index.md)
- ограничения длины — [{#T}](../field-length-limits.md)
- типы данных — [{#T}](../../data-types.md) и [{#T}](../data-types.md)

## Как устроен набор полей элемента

Набор полей элемента зависит от типа объекта CRM `entityTypeId`. Поля делятся на пять групп:

- **Общие поля.** Есть у всех типов объектов. Описаны в разделе [{#T}](#common)
- **Поля по типам объектов.** Есть только у лида, сделки, контакта, компании, предложения, счета или смарт-процесса. Описаны в разделе [{#T}](#by-object)
- **Пользовательские поля `ufCrm...`.** Создаются в Битрикс24. Описаны строкой в таблице раздела [{#T}](#common), подробнее — [{#T}](./user-defined-fields/index.md)
- **Родительские поля `parentId...`.** Связывают элемент с элементом другого типа объекта. Описаны строкой в таблице раздела [{#T}](#common)
- **Мультиполя `fm`.** Хранят контактные данные. Описаны в разделе [{#T}](#fm)

У смарт-процессов набор полей дополнительно зависит от настроек типа объекта — подробнее в разделе [{#T}](#spa). У счета состав полей фиксирован — подробнее в разделе [{#T}](#invoice).

Выбирайте источник сведений о полях по задаче:

#|
|| **Задача** | **Что использовать** ||
|| Узнать состав и назначение стандартных полей | Таблицы в разделах [{#T}](#common) и [{#T}](#by-object) ||
|| Получить актуальный перечень полей конкретного типа объекта, включая пользовательские, с флагами `isRequired`, `isReadOnly`, `isImmutable`, `isMultiple` | [crm.item.fields](./crm-item-fields.md) ||
|| Узнать, какие поля приходят в ответе конкретного метода | Раздел [{#T}](#select) ||
|| Узнать правила преобразования имен между `UPPER_CASE` и `camelCase` | [Особенности имен полей](./index.md#osobennosti-imen-polej) ||
|#

{% note warning %}

Метод `crm.item.fields` возвращает служебное поле `contacts` — у контакта вместо него `companies`. Через REST они не работают: в ответах `crm.item.get` и `crm.item.list` они не приходят, а при записи метод возвращает ошибку `100`. Привязывайте контакты и компании полями `contactIds` и `companyIds`.

{% endnote %}

## Как читать таблицы полей

### Колонка «Доступ» {#access}

В колонке «Доступ» указано, что можно делать с полем через методы `crm.item.*`:

#|
|| **Значение** | **Что означает** ||
|| Чтение и запись | Поле есть в ответе `crm.item.fields`. Значение приходит в ответах и принимается в `crm.item.add` и `crm.item.update` ||
|| Только чтение | Поле есть в ответе `crm.item.fields` с флагом `isReadOnly`. Значение приходит в ответах, а при записи игнорируется без ошибки ||
|| Только при создании | Поле есть в ответе `crm.item.fields` с флагом `isImmutable`. Значение принимается в `crm.item.add`, а в `crm.item.update` игнорируется ||
|| Только в ответе | Поля нет в ответе `crm.item.fields`. Значение приходит в `crm.item.get` и `crm.item.list`, а при записи игнорируется без ошибки ||
|| Не возвращается | Поле скрыто: не приходит ни в одном ответе и не принимается при записи. В `filter` и `order` оно работает, подробнее — в разделе [{#T}](#select) ||
|#

Если доступ к полю различается по типам объектов, в колонке указаны оба значения.

Среди полей из таблиц ниже запрос при передаче в `fields` прерывает только `id` в `crm.item.update` — это отмечено в его описании. О полях в `select`, `filter` и `order` — в разделе [{#T}](#select).

### Поля в select, filter и order {#select}

Поля из таблиц можно указывать в параметрах `select`, `filter` и `order` метода [crm.item.list](./crm-item-list.md). Метод [crm.item.get](./crm-item-get.md) этих параметров не принимает и всегда возвращает элемент целиком.

Исключения:

- служебные `entityTypeId`, `contacts` и `companies` метод отбрасывает из `select`, а в `filter` и `order` прерывает запрос ошибкой. Через REST эти поля не работают: при записи метод возвращает ошибку `100`, а привязывать контакты и компании нужно полями `contactIds` и `companyIds`
- поля со значением «Не возвращается» метод отбрасывает из `select`, но в `filter` и `order` они работают
- мультиполе `fm` приходит, только если `select` не указан или равен `["*"]`; в `filter` и `order` метод возвращает ошибку `100`

### Маркеры устаревания {#deprecated}

В описаниях полей используются два маркера:

- **Устарело, используйте `X`** — у поля есть актуальная замена: другое поле или отдельный раздел методов, он назван в описании. Метод `crm.item.fields` возвращает такое поле с флагом `isDeprecated`
- **Устаревшее поле** — поле осталось от прежних версий CRM, замены нет, в ответе `crm.item.fields` его тоже нет. Значение может быть пустым. В новых интеграциях такие поля не используйте

## Значения полей

### Обязательные поля {#required}

Обязательных стандартных полей нет: элемент создается с пустым параметром `fields`. Если не передать название, оно подставится автоматически — например, `Сделка #8455` в поле `title` у сделки или `Контакт #2759` в поле `lastName` у контакта. Методы `crm.item.*` не проверяют обязательность пользовательских полей.

### Форматы значений {#value-formats}

- `boolean` — строки `Y` и `N`. При записи значением «истина» считаются `true`, `"true"`, `"y"` и `"Y"`. Любое другое значение записывается как `N`
- `datetime` и `date` — строка ISO-8601 со смещением часового пояса Битрикс24, например `2026-08-25T16:16:04+03:00`. Методы `crm.item.*` возвращают со временем и поля типа `date`, а не в кратком формате `YYYY-MM-DD` из словаря типов
- поля с суффиксом `Short` — устаревшие копии дат. Несмотря на название, методы `crm.item.*` возвращают их в том же полном формате ISO-8601, краткого формата в ответе нет
- `user` — целочисленный идентификатор пользователя, `user[]` — массив идентификаторов
- `file` у стандартных полей `photo` и `logo` — целочисленный идентификатор файла. При записи тоже передается идентификатор уже загруженного файла. Если вместо него передать имя файла и содержимое в base64, метод вернет ошибку `FILE_NOT_FOUND`

### Структура мультиполя {#fm}

Поле `fm` лида, контакта и компании хранит массив мультиполей — телефоны, почты, мессенджеры и сайты. Каждый элемент массива состоит из четырех ключей:

- `id` — уникальный идентификатор
- `typeId` — тип мультиполя: `PHONE`, `EMAIL`, `WEB`, `IM` или `LINK`
- `valueType` — тип значения, например `WORK`, `HOME` или `MAILING`
- `value` — значение

Метод `crm.item.update` только добавляет значения: переданный массив не заменяет существующие мультиполя, а дополняет их. Идентификатор `id` при записи игнорируется, поэтому изменить или удалить значение через `crm.item.*` нельзя — используйте методы отдельных типов объектов, например [crm.contact.update](../contacts/crm-contact-update.md) с полем `PHONE`.

Полные перечни значений `typeId` и `valueType` — в описании типа [{#T}](../data-types.md#crm_multifield).

## Пример запроса {#example}

Запрос создает сделку и заполняет три поля из таблицы [{#T}](#deal). В ответе метод вернет объект `item` с полями созданной сделки — состав ответа описан на странице [{#T}](./crm-item-add.md).

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{"entityTypeId":2,"fields":{"title":"Поставка оборудования","opportunity":150000,"currencyId":"RUB"}}' \
https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.add
```

## Общие поля {#common}

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **assignedById**
[`user`](../../data-types.md#standart-objects) | Чтение и запись | Идентификатор пользователя, ответственного за элемент ||
|| **createdBy**
[`user`](../../data-types.md#standart-objects) | Только чтение | Идентификатор пользователя, который создал элемент ||
|| **createdTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время создания элемента ||
|| **entityTypeId**
[`integer`](../../data-types.md#standart-types) | Только в ответе | Идентификатор [типа объекта CRM](../data-types.md#object_type). Это не собственное поле элемента: методы добавляют его в ответ, только если `select` не указан или равен `["*"]` ||
|| **id**
[`integer`](../../data-types.md#standart-types) | Только чтение | Идентификатор элемента, уникальный в пределах типа объекта. В `crm.item.add` значение игнорируется, а в `crm.item.update` прерывает запрос ошибкой `Setting value for Primary ID is not allowed, it is read-only field` — не передавайте `id` внутри `fields` ||
|| **lastActivityBy**
[`user`](../../data-types.md#standart-objects) | Чтение и запись | Идентификатор пользователя, который последним проявлял активность в таймлайне ||
|| **lastActivityTime**
[`datetime`](../../data-types.md#standart-types) | Чтение и запись | Дата и время последней активности в таймлайне ||
|| **lastCommunicationCallTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последнего звонка ||
|| **lastCommunicationEmailTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последнего письма ||
|| **lastCommunicationImolTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последнего сообщения в открытых линиях ||
|| **lastCommunicationTime**
[`string`](../../data-types.md#standart-types) | Только чтение | Дата и время последней коммуникации по любому каналу. Метод `crm.item.fields` объявляет поле типом `string`, а значение приходит в том же формате ISO-8601, что и у полей типа `datetime` ||
|| **lastCommunicationWebformTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последнего заполнения CRM-формы ||
|| **opened**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Доступен ли элемент всем сотрудникам. `Y` — всем, `N` — только ответственному, его руководителям и наблюдателям ||
|| **parentId...**
[`crm_entity`](../data-types.md#tipy-dannyh) | Чтение и запись | Поле-родитель: идентификатор элемента другого типа объекта CRM, привязанного к этому элементу.

Имя поля состоит из префикса `parentId` и идентификатора типа объекта-родителя: связь с элементом типа `entityTypeId = 177` дает поле `parentId177`.

Поля появляются только для тех связей между типами, которые настроены в Битрикс24 ||
|| **ufCrm...**
[`crm_userfield`](../data-types.md#tipy-dannyh) | Чтение и запись | Пользовательское поле. Подробнее — [{#T}](./user-defined-fields/index.md).

Значения множественных полей приходят в виде массива.

Значение поля типа `file` приходит в виде объекта:

- `id` — идентификатор файла
- `url` — ссылка на файл в Битрикс24
- `urlMachine` — ссылка на файл для приложения ||
|| **updatedBy**
[`user`](../../data-types.md#standart-objects) | Только чтение | Идентификатор пользователя, который последним изменил элемент ||
|| **updatedTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последнего изменения элемента ||
|| **utmCampaign**
[`string`](../../data-types.md#standart-types) | Чтение и запись, у счета и смарт-процессов — только в ответе | Обозначение рекламной кампании ||
|| **utmContent**
[`string`](../../data-types.md#standart-types) | Чтение и запись, у счета и смарт-процессов — только в ответе | Содержание кампании, например для контекстных объявлений ||
|| **utmMedium**
[`string`](../../data-types.md#standart-types) | Чтение и запись, у счета и смарт-процессов — только в ответе | Тип трафика. Возможные значения:

- `CPC` — объявления
- `CPM` — баннеры ||
|| **utmSource**
[`string`](../../data-types.md#standart-types) | Чтение и запись, у счета и смарт-процессов — только в ответе | Рекламная система: `Yandex-Direct`, `Google-Adwords` и другие ||
|| **utmTerm**
[`string`](../../data-types.md#standart-types) | Чтение и запись, у счета и смарт-процессов — только в ответе | Условие поиска кампании, например ключевые слова контекстной рекламы ||
|| **webformId**
[`integer`](../../data-types.md#standart-types) | Чтение и запись, у сделки, контакта и компании — только при создании | Идентификатор CRM-формы, которая создала элемент. Метод `crm.item.fields` возвращает тип поля как `crm_webform` ||
|#

## Поля по типам объектов {#by-object}

Числовой идентификатор типа объекта нужен в каждом вызове `crm.item.*`. Полная таблица типов — в справочнике [типов объектов CRM](../data-types.md#object_type). Значения колонки «Доступ» в таблицах ниже расшифрованы в разделе [{#T}](#access).

#|
|| **Тип объекта** | **`entityTypeId`** | **Поля** ||
|| Лид | 1 | [{#T}](#lead) ||
|| Сделка | 2 | [{#T}](#deal) ||
|| Контакт | 3 | [{#T}](#contact) ||
|| Компания | 4 | [{#T}](#company) ||
|| Предложение | 7 | [{#T}](#quote) ||
|| Счет | 31 | [{#T}](#invoice) ||
|| Смарт-процесс | от 128 | [{#T}](#spa) ||
|#

### Лид {#lead}

`entityTypeId = 1`

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **address**
[`text`](../../data-types.md#standart-types) | Только в ответе | Адрес. Устаревшее поле ||
|| **birthdate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата рождения ||
|| **comments**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Комментарий ||
|| **companyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор компании, привязанной к элементу ||
|| **companyTitle**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название компании ||
|| **contactId**
[`crm_contact`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор контакта, привязанного к элементу. Устарело, используйте `contactIds` ||
|| **contactIds**
[`crm_contact[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов контактов, привязанных к элементу ||
|| **currencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор валюты элемента ||
|| **dateClosed**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время закрытия элемента ||
|| **dateCreateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты создания элемента. Приходит в полном формате ISO-8601 ||
|| **dateModifyShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты изменения элемента. Приходит в полном формате ISO-8601 ||
|| **email**
[`string`](../../data-types.md#standart-types) | Только в ответе | Первый адрес почты из мультиполя `fm`. Чтобы изменить, передайте `fm` ||
|| **emailHome**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `HOME` из мультиполя `fm` ||
|| **emailMailing**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `MAILING` из мультиполя `fm` ||
|| **emailWork**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `WORK` из мультиполя `fm` ||
|| **fm**
[`crm_multifield`](../data-types.md#crm_multifield) | Чтение и запись | Массив мультиполей. Состав ключей — в разделе [{#T}](#fm) ||
|| **hasEmail**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента почта ||
|| **hasImol**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента открытые линии ||
|| **hasPhone**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента телефон ||
|| **honorific**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа обращения ||
|| **icq**
[`string`](../../data-types.md#standart-types) | Только в ответе | ICQ. Устаревшее поле ||
|| **imol**
[`string`](../../data-types.md#standart-types) | Только в ответе | Идентификатор открытой линии из мультиполя `fm` ||
|| **isConvert**
[`boolean`](../../data-types.md#standart-types) | Только в ответе | Сконвертирован ли лид. Устаревшее поле ||
|| **isManualOpportunity**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Включен ли ручной режим расчета суммы ||
|| **isReturnCustomer**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Является ли лид повторным ||
|| **lastName**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Фамилия ||
|| **login**
[`string`](../../data-types.md#standart-types) | Только в ответе | Логин. Устаревшее поле ||
|| **movedBy**
[`user`](../../data-types.md#standart-objects) | Только чтение | Идентификатор пользователя, который последним сменил стадию ||
|| **movedTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последней смены стадии ||
|| **name**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Имя ||
|| **observers**
[`user[]`](../../data-types.md#standart-objects) | Чтение и запись | Список идентификаторов пользователей, которые являются наблюдателями ||
|| **opportunity**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма ||
|| **originId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Идентификатор элемента во внешнем источнике ||
|| **originatorId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Внешний источник ||
|| **phone**
[`string`](../../data-types.md#standart-types) | Только в ответе | Первый телефон из мультиполя `fm`. Чтобы изменить, передайте `fm` ||
|| **phoneMailing**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `MAILING` из мультиполя `fm` ||
|| **phoneMobile**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `MOBILE` из мультиполя `fm` ||
|| **phoneWork**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `WORK` из мультиполя `fm` ||
|| **post**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Должность ||
|| **productId**
[`string`](../../data-types.md#standart-types) | Только в ответе | Идентификатор товара. Устаревшее поле ||
|| **searchContent**
[`text`](../../data-types.md#standart-types) | Только в ответе | Служебное поле: информация для полнотекстового поиска ||
|| **secondName**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Отчество ||
|| **shortName**
[`string`](../../data-types.md#standart-types) | Только в ответе | Фамилия с инициалами: `Иванов И.` Устаревшее поле ||
|| **skype**
[`string`](../../data-types.md#standart-types) | Только в ответе | Skype. Устаревшее поле ||
|| **sourceDescription**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Дополнительно об источнике ||
|| **sourceId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа источника ||
|| **stageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор стадии элемента ||
|| **stageSemanticId**
[`string`](../../data-types.md#standart-types) | Только чтение | Группа стадии. Возможные значения:

- `P` — в работе
- `S` — успешная
- `F` — неуспешная ||
|| **statusDescription**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Дополнительно о стадии ||
|| **title**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название элемента ||
|#

### Сделка {#deal}

`entityTypeId = 2`

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **additionalInfo**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Дополнительная информация ||
|| **begindate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата начала элемента ||
|| **begindateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты начала элемента. Приходит в полном формате ISO-8601 ||
|| **categoryId**
[`crm_category`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор воронки элемента ||
|| **closed**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Является ли сделка закрытой ||
|| **closedate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата завершения элемента ||
|| **closedateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты завершения элемента. Приходит в полном формате ISO-8601 ||
|| **comments**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Комментарий ||
|| **companyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор компании, привязанной к элементу ||
|| **contactId**
[`crm_contact`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор контакта, привязанного к элементу. Устарело, используйте `contactIds` ||
|| **contactIds**
[`crm_contact[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов контактов, привязанных к элементу ||
|| **currencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор валюты элемента ||
|| **dateCreateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты создания элемента. Приходит в полном формате ISO-8601 ||
|| **dateModifyShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты изменения элемента. Приходит в полном формате ISO-8601 ||
|| **eventDate**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Дата события. Устаревшее поле ||
|| **eventDateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты события. Приходит в полном формате ISO-8601 ||
|| **eventDescription**
[`text`](../../data-types.md#standart-types) | Только в ответе | Описание события. Устаревшее поле ||
|| **eventId**
[`crm_status`](../data-types.md#tipy-dannyh) | Только в ответе | Строковый идентификатор типа события. Устаревшее поле ||
|| **hasProducts**
[`boolean`](../../data-types.md#standart-types) | Только в ответе | Содержит ли элемент товары ||
|| **isLose**
[`boolean`](../../data-types.md#standart-types) | Только в ответе | Является ли сделка проваленной ||
|| **isManualOpportunity**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Включен ли ручной режим расчета суммы ||
|| **isNew**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Является ли сделка новой ||
|| **isRecurring**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Является ли сделка регулярной ||
|| **isRepeatedApproach**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Является ли сделка повторным обращением ||
|| **isReturnCustomer**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Является ли сделка повторной ||
|| **isWon**
[`boolean`](../../data-types.md#standart-types) | Только в ответе | Является ли сделка выигранной ||
|| **isWork**
[`boolean`](../../data-types.md#standart-types) | Только в ответе | Находится ли сделка в работе ||
|| **leadId**
[`crm_lead`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор лида, на основании которого создан элемент ||
|| **locationId**
[`location`](../data-types.md#tipy-dannyh) | Чтение и запись | Служебное поле: идентификатор местоположения ||
|| **lostAmount**
[`integer`](../../data-types.md#standart-types) | Только в ответе | Утраченная сумма ||
|| **movedBy**
[`user`](../../data-types.md#standart-objects) | Только чтение | Идентификатор пользователя, который последним сменил стадию ||
|| **movedTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последней смены стадии ||
|| **mycompanyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор «моей» компании ||
|| **observers**
[`user[]`](../../data-types.md#standart-objects) | Чтение и запись | Список идентификаторов пользователей, которые являются наблюдателями ||
|| **opportunity**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма ||
|| **orderStage**
[`string`](../../data-types.md#standart-types) | Только в ответе | Статус оплаты сделки ||
|| **originId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Идентификатор элемента во внешнем источнике ||
|| **originatorId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Внешний источник ||
|| **previousStageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Только чтение | Строковый идентификатор предыдущей стадии ||
|| **probability**
[`integer`](../../data-types.md#standart-types) | Чтение и запись | Вероятность в процентах ||
|| **productId**
[`string`](../../data-types.md#standart-types) | Только в ответе | Идентификатор товара. Устаревшее поле ||
|| **quoteId**
[`crm_quote`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор предложения, привязанного к элементу ||
|| **receivedAmount**
[`integer`](../../data-types.md#standart-types) | Только в ответе | Полученная сумма ||
|| **searchContent**
[`text`](../../data-types.md#standart-types) | Только в ответе | Служебное поле: информация для полнотекстового поиска ||
|| **sourceDescription**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Дополнительно об источнике ||
|| **sourceId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа источника ||
|| **stageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор стадии элемента ||
|| **stageSemanticId**
[`string`](../../data-types.md#standart-types) | Только чтение | Группа стадии. Возможные значения:

- `P` — в работе
- `S` — успешная
- `F` — неуспешная ||
|| **taxValue**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма налога ||
|| **title**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название элемента ||
|| **typeId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа сделки. Возможные значения возвращает метод [crm.status.list](../status/crm-status-list.md) для справочника `DEAL_TYPE` ||
|#

### Контакт {#contact}

`entityTypeId = 3`

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **address**
[`text`](../../data-types.md#standart-types) | Только в ответе | Адрес. Устаревшее поле ||
|| **birthdate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата рождения ||
|| **categoryId**
[`crm_category`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор воронки элемента ||
|| **comments**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Комментарий ||
|| **companyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор компании, привязанной к элементу. Устарело, используйте `companyIds` ||
|| **companyIds**
[`crm_company[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов компаний, привязанных к элементу ||
|| **email**
[`string`](../../data-types.md#standart-types) | Только в ответе | Первый адрес почты из мультиполя `fm`. Чтобы изменить, передайте `fm` ||
|| **emailHome**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `HOME` из мультиполя `fm` ||
|| **emailMailing**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `MAILING` из мультиполя `fm` ||
|| **emailWork**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `WORK` из мультиполя `fm` ||
|| **export**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Разрешено ли экспортировать контакт ||
|| **fm**
[`crm_multifield`](../data-types.md#crm_multifield) | Чтение и запись | Массив мультиполей. Состав ключей — в разделе [{#T}](#fm) ||
|| **hasEmail**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента почта ||
|| **hasImol**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента открытые линии ||
|| **hasPhone**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента телефон ||
|| **honorific**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа обращения ||
|| **imol**
[`string`](../../data-types.md#standart-types) | Только в ответе | Идентификатор открытой линии из мультиполя `fm` ||
|| **lastName**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Фамилия ||
|| **leadId**
[`crm_lead`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор лида, на основании которого создан элемент ||
|| **login**
[`string`](../../data-types.md#standart-types) | Только в ответе | Логин. Устаревшее поле ||
|| **name**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Имя ||
|| **observers**
[`user[]`](../../data-types.md#standart-objects) | Чтение и запись | Список идентификаторов пользователей, которые являются наблюдателями ||
|| **originId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Идентификатор элемента во внешнем источнике ||
|| **originVersion**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Версия оригинала ||
|| **originatorId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Внешний источник ||
|| **phone**
[`string`](../../data-types.md#standart-types) | Только в ответе | Первый телефон из мультиполя `fm`. Чтобы изменить, передайте `fm` ||
|| **phoneMailing**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `MAILING` из мультиполя `fm` ||
|| **phoneMobile**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `MOBILE` из мультиполя `fm` ||
|| **phoneWork**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `WORK` из мультиполя `fm` ||
|| **photo**
[`file`](../../data-types.md#standart-types) | Чтение и запись | Фотография. Приходит и записывается идентификатором файла ||
|| **post**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Должность ||
|| **searchContent**
[`text`](../../data-types.md#standart-types) | Только в ответе | Служебное поле: информация для полнотекстового поиска ||
|| **secondName**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Отчество ||
|| **shortName**
[`string`](../../data-types.md#standart-types) | Только в ответе | Фамилия с инициалами: `Иванов И.` Устаревшее поле ||
|| **sourceDescription**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Дополнительно об источнике ||
|| **sourceId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа источника ||
|| **typeId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа контакта: клиент, поставщик, партнер и другие. Возможные значения возвращает метод [crm.status.list](../status/crm-status-list.md) для справочника `CONTACT_TYPE` ||
|#

### Компания {#company}

`entityTypeId = 4`

Поля `ufAccountantSign`, `ufDirectorSign`, `ufLogo` и `ufStamp` — предустановленные пользовательские поля генератора документов. Шаблон `ufCrm...` на них не распространяется, в ответе `crm.item.fields` их нет.

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **address**
[`text`](../../data-types.md#standart-types) | Только в ответе | Адрес. Устаревшее поле ||
|| **addressLegal**
[`text`](../../data-types.md#standart-types) | Только в ответе | Юридический адрес. Устаревшее поле ||
|| **bankingDetails**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Банковские реквизиты. Устарело, используйте [реквизиты](../requisites/index.md) ||
|| **categoryId**
[`crm_category`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор воронки элемента ||
|| **comments**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Комментарий ||
|| **contactIds**
[`crm_contact[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов контактов, привязанных к элементу ||
|| **currencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор валюты элемента ||
|| **email**
[`string`](../../data-types.md#standart-types) | Только в ответе | Первый адрес почты из мультиполя `fm`. Чтобы изменить, передайте `fm` ||
|| **emailHome**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `HOME` из мультиполя `fm` ||
|| **emailMailing**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `MAILING` из мультиполя `fm` ||
|| **emailWork**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес почты с типом `WORK` из мультиполя `fm` ||
|| **employees**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор количества сотрудников ||
|| **fm**
[`crm_multifield`](../data-types.md#crm_multifield) | Чтение и запись | Массив мультиполей. Состав ключей — в разделе [{#T}](#fm) ||
|| **hasEmail**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента почта ||
|| **hasImol**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента открытые линии ||
|| **hasPhone**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Есть ли у элемента телефон ||
|| **imol**
[`string`](../../data-types.md#standart-types) | Только в ответе | Идентификатор открытой линии из мультиполя `fm` ||
|| **industry**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор сферы деятельности ||
|| **isMyCompany**
[`boolean`](../../data-types.md#standart-types) | Только при создании | Является ли компания «моей» компанией ||
|| **leadId**
[`crm_lead`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор лида, на основании которого создан элемент ||
|| **logo**
[`file`](../../data-types.md#standart-types) | Чтение и запись | Логотип. Приходит и записывается идентификатором файла ||
|| **observers**
[`user[]`](../../data-types.md#standart-objects) | Чтение и запись | Список идентификаторов пользователей, которые являются наблюдателями ||
|| **originId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Идентификатор элемента во внешнем источнике ||
|| **originVersion**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Версия оригинала ||
|| **originatorId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Внешний источник ||
|| **phone**
[`string`](../../data-types.md#standart-types) | Только в ответе | Первый телефон из мультиполя `fm`. Чтобы изменить, передайте `fm` ||
|| **phoneMailing**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `MAILING` из мультиполя `fm` ||
|| **phoneMobile**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `MOBILE` из мультиполя `fm` ||
|| **phoneWork**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон с типом `WORK` из мультиполя `fm` ||
|| **revenue**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Годовой оборот ||
|| **searchContent**
[`text`](../../data-types.md#standart-types) | Только в ответе | Служебное поле: информация для полнотекстового поиска ||
|| **title**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название элемента ||
|| **typeId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа компании: клиент, поставщик, партнер и другие. Возможные значения возвращает метод [crm.status.list](../status/crm-status-list.md) для справочника `COMPANY_TYPE` ||
|| **ufAccountantSign**
[`file`](../../data-types.md#standart-types) | Только в ответе | Подпись главного бухгалтера для генератора документов ||
|| **ufDirectorSign**
[`file`](../../data-types.md#standart-types) | Только в ответе | Подпись директора для генератора документов ||
|| **ufLogo**
[`file`](../../data-types.md#standart-types) | Только в ответе | Логотип для генератора документов ||
|| **ufStamp**
[`file`](../../data-types.md#standart-types) | Только в ответе | Печать организации для генератора документов ||
|#

### Предложение {#quote}

`entityTypeId = 7`

Поля `commentsType`, `contentType` и `termsType` используют общий словарь форматов текста:

- `0` — неизвестно
- `1` — текст
- `2` — BB-код
- `3` — HTML

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **actualDate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата, до которой предложение актуально ||
|| **begindate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата начала элемента ||
|| **begindateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты начала элемента. Приходит в полном формате ISO-8601 ||
|| **clientAddr**
[`string`](../../data-types.md#standart-types) | Только в ответе | Адрес клиента ||
|| **clientContact**
[`string`](../../data-types.md#standart-types) | Только в ответе | Контакты клиента ||
|| **clientEmail**
[`string`](../../data-types.md#standart-types) | Только в ответе | Почта клиента ||
|| **clientPhone**
[`string`](../../data-types.md#standart-types) | Только в ответе | Телефон клиента ||
|| **clientTitle**
[`string`](../../data-types.md#standart-types) | Только в ответе | Название клиента ||
|| **clientTpId**
[`string`](../../data-types.md#standart-types) | Только в ответе | ИНН клиента ||
|| **clientTpaId**
[`string`](../../data-types.md#standart-types) | Только в ответе | Код клиента в торгово-промышленной палате ||
|| **closed**
[`boolean`](../../data-types.md#standart-types) | Только чтение | Является ли предложение закрытым ||
|| **closedate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата завершения элемента ||
|| **closedateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты завершения элемента. Приходит в полном формате ISO-8601 ||
|| **comments**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Комментарий ||
|| **commentsType**
[`integer`](../../data-types.md#standart-types) | Только в ответе | Идентификатор формата комментария из общего словаря форматов текста ||
|| **companyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор компании, привязанной к элементу ||
|| **contactId**
[`crm_contact`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор контакта, привязанного к элементу. Устарело, используйте `contactIds` ||
|| **contactIds**
[`crm_contact[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов контактов, привязанных к элементу ||
|| **content**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Содержание ||
|| **contentType**
[`integer`](../../data-types.md#standart-types) | Только в ответе | Идентификатор формата содержания из общего словаря форматов текста ||
|| **currencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор валюты элемента ||
|| **dateCreateShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты создания элемента. Приходит в полном формате ISO-8601 ||
|| **dateModifyShort**
[`datetime`](../../data-types.md#standart-types) | Только в ответе | Устаревшая копия даты изменения элемента. Приходит в полном формате ISO-8601 ||
|| **dealId**
[`crm_deal`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор сделки, привязанной к элементу ||
|| **hasProducts**
[`boolean`](../../data-types.md#standart-types) | Только в ответе | Содержит ли элемент товары ||
|| **isManualOpportunity**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Включен ли ручной режим расчета суммы ||
|| **leadId**
[`crm_lead`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор лида, на основании которого создан элемент ||
|| **locationId**
[`location`](../data-types.md#tipy-dannyh) | Чтение и запись | Служебное поле: идентификатор местоположения ||
|| **mycompanyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор «моей» компании ||
|| **opportunity**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма ||
|| **personTypeId**
[`integer`](../../data-types.md#standart-types) | Только чтение | Идентификатор типа плательщика ||
|| **quoteNumber**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Номер предложения ||
|| **searchContent**
[`text`](../../data-types.md#standart-types) | Только в ответе | Служебное поле: информация для полнотекстового поиска ||
|| **stageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор стадии элемента ||
|| **storageElementIds**
[`integer[]`](../../data-types.md#standart-types) | Чтение и запись | Массив идентификаторов файлов ||
|| **storageTypeId**
[`integer`](../../data-types.md#standart-types) | Чтение и запись | Идентификатор типа хранения файлов ||
|| **taxValue**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма налога ||
|| **terms**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Условия ||
|| **termsType**
[`integer`](../../data-types.md#standart-types) | Только в ответе | Идентификатор формата условий из общего словаря форматов текста ||
|| **title**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название элемента ||
|#

### Счет {#invoice}

`entityTypeId = 31`

Методы `crm.item.*` работают только со счетами нового типа. Для счетов старого типа `entityTypeId = 5` они вернут ошибку `ENTITY_TYPE_NOT_SUPPORTED`. Подробнее — [{#T}](./invoice.md).

Тип счета предопределен, его настройки через REST недоступны: `crm.type.get` с `entityTypeId = 31` возвращает ошибку `100`. Состав полей счета фиксирован.

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **accountNumber**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Номер счета ||
|| **begindate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата начала элемента ||
|| **categoryId**
[`crm_category`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор воронки элемента ||
|| **closedate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата завершения элемента ||
|| **comments**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Комментарий ||
|| **companyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор компании, привязанной к элементу ||
|| **contactId**
[`crm_contact`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор контакта, привязанного к элементу. Устарело, используйте `contactIds` ||
|| **contactIds**
[`crm_contact[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов контактов, привязанных к элементу ||
|| **currencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор валюты элемента ||
|| **isManualOpportunity**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Включен ли ручной режим расчета суммы ||
|| **isRecurring**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Является ли счет регулярным ||
|| **locationId**
[`location`](../data-types.md#tipy-dannyh) | Чтение и запись | Служебное поле: идентификатор местоположения ||
|| **movedBy**
[`user`](../../data-types.md#standart-objects) | Только чтение | Идентификатор пользователя, который последним сменил стадию ||
|| **movedTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последней смены стадии ||
|| **mycompanyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор «моей» компании ||
|| **observers**
[`user[]`](../../data-types.md#standart-objects) | Чтение и запись | Список идентификаторов пользователей, которые являются наблюдателями ||
|| **opportunity**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма ||
|| **previousStageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Только чтение | Строковый идентификатор предыдущей стадии ||
|| **sourceDescription**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Дополнительно об источнике ||
|| **sourceId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа источника ||
|| **stageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор стадии элемента ||
|| **taxValue**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма налога ||
|| **title**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название элемента ||
|| **xmlId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Внешний код ||
|#

### Смарт-процесс {#spa}

`entityTypeId` — от 128. Идентификаторы смарт-процессов Битрикс24 возвращает метод [crm.type.list](./user-defined-object-types/crm-type-list.md).

Часть полей зависит от настроек типа смарт-процесса — в таблице настройка названа в описании поля. Настройки возвращает метод [crm.type.get](./user-defined-object-types/crm-type-get.md), он требует административного доступа к смарт-процессу или права на его чтение.

Если настройка выключена, поле не исчезает, а меняет доступ: оно пропадает из ответа `crm.item.fields` и работает как «Только в ответе» — приходит в `crm.item.get` и `crm.item.list`, но при записи игнорируется.

#|
|| **Название**
`тип` | **Доступ** | **Описание** ||
|| **accountCurrencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Не возвращается | Служебное поле: валюта учета ||
|| **begindate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата начала элемента. Зависит от настройки `isBeginCloseDatesEnabled` ||
|| **categoryId**
[`crm_category`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор воронки элемента ||
|| **closedate**
[`date`](../../data-types.md#standart-types) | Чтение и запись | Дата завершения элемента. Зависит от настройки `isBeginCloseDatesEnabled` ||
|| **companyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор компании, привязанной к элементу. Зависит от настройки `isClientEnabled` ||
|| **contactId**
[`crm_contact`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор контакта, привязанного к элементу. Устарело, используйте `contactIds`. Зависит от настройки `isClientEnabled` ||
|| **contactIds**
[`crm_contact[]`](../data-types.md#tipy-dannyh) | Чтение и запись | Список идентификаторов контактов, привязанных к элементу. Зависит от настройки `isClientEnabled` ||
|| **currencyId**
[`crm_currency`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор валюты элемента. Зависит от настройки `isLinkWithProductsEnabled` ||
|| **isManualOpportunity**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Включен ли ручной режим расчета суммы. Зависит от настройки `isLinkWithProductsEnabled` ||
|| **isRecurring**
[`boolean`](../../data-types.md#standart-types) | Чтение и запись | Является ли элемент регулярным ||
|| **movedBy**
[`user`](../../data-types.md#standart-objects) | Только чтение | Идентификатор пользователя, который последним сменил стадию. Зависит от настройки `isStagesEnabled` ||
|| **movedTime**
[`datetime`](../../data-types.md#standart-types) | Только чтение | Дата и время последней смены стадии. Зависит от настройки `isStagesEnabled` ||
|| **mycompanyId**
[`crm_company`](../data-types.md#tipy-dannyh) | Чтение и запись | Идентификатор «моей» компании. Зависит от настройки `isMycompanyEnabled` ||
|| **observers**
[`user[]`](../../data-types.md#standart-objects) | Чтение и запись | Список идентификаторов пользователей, которые являются наблюдателями. Зависит от настройки `isObserversEnabled` ||
|| **opportunity**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма. Зависит от настройки `isLinkWithProductsEnabled` ||
|| **opportunityAccount**
[`double`](../../data-types.md#standart-types) | Не возвращается | Служебное поле: сумма в валюте учета ||
|| **previousStageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Только чтение | Строковый идентификатор предыдущей стадии. Зависит от настройки `isStagesEnabled` ||
|| **sourceDescription**
[`text`](../../data-types.md#standart-types) | Чтение и запись | Дополнительно об источнике. Зависит от настройки `isSourceEnabled` ||
|| **sourceId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор типа источника. Зависит от настройки `isSourceEnabled` ||
|| **stageId**
[`crm_status`](../data-types.md#tipy-dannyh) | Чтение и запись | Строковый идентификатор стадии элемента. Зависит от настройки `isStagesEnabled` ||
|| **taxValue**
[`double`](../../data-types.md#standart-types) | Чтение и запись | Сумма налога. Зависит от настройки `isLinkWithProductsEnabled` ||
|| **taxValueAccount**
[`double`](../../data-types.md#standart-types) | Не возвращается | Служебное поле: сумма налога в валюте учета ||
|| **title**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Название элемента ||
|| **xmlId**
[`string`](../../data-types.md#standart-types) | Чтение и запись | Внешний код ||
|#

## Продолжите изучение

- создать элемент — [{#T}](./crm-item-add.md)
- изменить элемент — [{#T}](./crm-item-update.md)
- получить элемент или список элементов — [{#T}](./crm-item-get.md), [{#T}](./crm-item-list.md)
- получить перечень полей конкретного типа объекта — [{#T}](./crm-item-fields.md)
- работать с пользовательскими полями — [{#T}](./user-defined-fields/index.md)
- узнать ограничения длины полей — [{#T}](../field-length-limits.md)
