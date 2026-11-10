# Типы данных и структура объектов в REST API CRM-форм

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Типы данных CRM-форм описывают идентификаторы и структуры объектов в параметрах и ответах методов `crm.form.*`. По справочнику можно определить, какие поля есть у формы, какие из них можно записать и откуда взять для них значения. Базовые типы `integer`, `string`, `object` и другие перечислены в статье [Типы данных в REST API](../../data-types.md).

## Как выбрать объект

#|
|| **Объект** | **Когда использовать** | **Методы** ||
|| [`crm_form`](#crm_form) | Для чтения, создания и изменения CRM-формы: поля, схема CRM, оформление, соглашения, действия после отправки, интеграции | [crm.form.*](./index.md) ||
|| [`crm_form_configuration`](#crm_form_configuration) | Для получения значений, которые нужны при создании формы: схемы CRM, воронки, типы полей, языки, платежные системы, права и лимит активных форм | [crm.form.configuration.get](./setup/crm-form-configuration-get.md) ||
|| [`crm_form_scenario`](#crm_form_scenario) | Для выбора готового сценария формы | [crm.form.scenario.list](./setup/crm-form-scenario-list.md) ||
|| [`crm_form_scenario_category`](#crm_form_scenario_category) | Для группировки сценариев по категориям | [crm.form.scenariocategory.list](./setup/crm-form-scenariocategory-list.md) ||
|| [`crm_form_entity_field`](#crm_form_entity_field) | Для выбора полей объектов CRM, из которых собирается форма | [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md) ||
|| [`crm_form_embedding`](#crm_form_embedding) | Для получения кода размещения на сайте, публичной ссылки и настроек кнопки и автопоказа | [crm.form.embedding.*](./placement/index.md) ||
|| [`crm_form_embedding_selection`](#crm_form_embedding_selection) | Для получения кода одного варианта размещения | [crm.form.embedding.get](./placement/crm-form-embedding-get.md) ||
|| [`crm_form_site_button`](#crm_form_site_button) | Для проверки, к каким виджетам на сайт подключена форма | [crm.form.sitebutton.list](./placement/crm-form-sitebutton-list.md) ||
|| [`crm_form_open_line`](#crm_form_open_line) | Для проверки, в каких открытых линиях форма приветственная | [crm.form.openline.list](./placement/crm-form-openline-list.md) ||
|#

## Типы данных

#|
|| **Тип** | **Описания и значения** ||
|| [`crm_form.id`](#crm_form) | Целочисленный идентификатор CRM-формы, например `45`. Получить идентификаторы форм можно методом [crm.form.list](./crm-form-list.md) ||
|| [`crm_form.updatedTime`](#crm_form) | Версия формы — дата и время последнего изменения в формате ISO 8601, например `2026-10-21T17:44:00+03:00`. Получить можно методом [crm.form.get](./crm-form-get.md). Обязательна в [crm.form.update](./crm-form-update.md) и [crm.form.embedding.update](./placement/crm-form-embedding-update.md) ||
|| [`crm_form_configuration.entitySchemes.id`](#entity-schemes) | Целочисленный идентификатор схемы CRM, например `1` — лид. Передается в `crm.entityScheme`. Получить можно методом [crm.form.configuration.get](./setup/crm-form-configuration-get.md) ||
|| [`crm_form_configuration.dealCategories.id`](#crm_form_configuration) | Целочисленный идентификатор воронки сделок, `0` — общая воронка. Передается в `crm.dealCategoryId` ||
|| [`crm_form_configuration.smartProcesses.categories.id`](#smart-processes) | Целочисленный идентификатор воронки смарт-процесса. Передается в `crm.smartProcessCategoryId` ||
|| [`crm_form_configuration.fieldTypes.id`](#field-types) | Строковый код типа поля формы, например `string` или `phone`. Передается в `fields[].type` ||
|| [`crm_form_configuration.languages.id`](#crm_form_configuration) | Строковый код языка формы, например `ru`. Передается в `languageId` ||
|| [`crm_form_configuration.paySystems.id`](#crm_form_configuration) | Целочисленный идентификатор платежной системы. Передается в `payment.disabledPaySystemsId` ||
|| [`crm_form_scenario.id`](#crm_form_scenario) | Строковый код сценария, например `contacts` или `callback`. Передается в `templateId`. Получить можно методом [crm.form.scenario.list](./setup/crm-form-scenario-list.md) ||
|| [`crm_form_scenario_category.id`](#crm_form_scenario_category) | Строковый код категории сценариев, например `crm`. Получить можно методом [crm.form.scenariocategory.list](./setup/crm-form-scenariocategory-list.md) ||
|| [`crm_form_entity_field.name`](#crm_form_entity_field) | Строковый код поля объекта CRM, например `LEAD_NAME`. Передается в `fields[].name`. Получить можно методом [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md) ||
|| [`crm_form_site_button.id`](#crm_form_site_button) | Целочисленный идентификатор виджета на сайт. Получить можно методом [crm.form.sitebutton.list](./placement/crm-form-sitebutton-list.md) ||
|| [`crm_form_open_line.id`](#crm_form_open_line) | Целочисленный идентификатор открытой линии. Получить можно методом [crm.form.openline.list](./placement/crm-form-openline-list.md) ||
|#

## Как читать и записывать поля формы

- Методы чтения без `select` возвращают только простые поля верхнего уровня: `id`, `code`, `name`, `active`, `system`, `languageId`, `templateId`, `createdTime`, `updatedTime`, `activeChangedById`, `activeChangedTime`. Разделы `appearance`, `crm`, `fields` и другие нужно запросить в `select` явно
- В `select` можно передать раздел целиком, например `crm`, или отдельное поле раздела через точку, например `crm.entityScheme`
- При записи передавайте только поля, которые нужно изменить. Поля, которых нет в запросе, остаются без изменений
- Раздел нельзя очистить целиком через `null`: очищайте отдельные поля раздела
- Коллекции `fields`, `dependencies`, `presetFields`, `responsible.userIds`, `agreements.items`, `payment.disabledPaySystemsId` и `integrations.ads` заменяются целиком. Пустой массив `[]` очищает коллекцию, `null` не принимается
- В одной коллекции может быть до 500 элементов, во всем запросе — до 2000 элементов всех коллекций вместе
- Поля с пометкой «только чтение» нельзя передавать в `fields`: метод вернет ошибку ``` `поле` is published for reading only ```

## Структура объектов

### crm_form {#crm_form}

CRM-форма. Возвращается методами [crm.form.get](./crm-form-get.md) и [crm.form.list](./crm-form-list.md), передается в `fields` методов [crm.form.add](./crm-form-add.md), [crm.form.update](./crm-form-update.md) и [crm.form.validate](./crm-form-validate.md).

Список полей формы с признаками фильтрации и сортировки возвращает метод [crm.form.field.list](./crm-form-field-list.md).

#|
|| **Название**
`тип` | **Описание** | **Запись** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор формы | Только чтение ||
|| **code**
[`string`](../../data-types.md) | Символьный код формы | Только чтение ||
|| **name**
[`string`](../../data-types.md) | Название формы, до 50 символов | Обязательно при создании ||
|| **active**
[`boolean`](../../data-types.md) | Активность формы.

Возможные значения:

- `true` — форма работает и принимает заполнения
- `false` — форма выключена

Передается только в [crm.form.add](./crm-form-add.md), по умолчанию `true`. У созданной формы активность меняют методы [crm.form.activate](./crm-form-activate.md) и [crm.form.deactivate](./crm-form-deactivate.md) | Только при создании ||
|| **system**
[`boolean`](../../data-types.md) | Признак системной формы. Системную форму нельзя изменить или удалить

Возможные значения:

- `true` — форма системная
- `false` — форма создана пользователем | Только чтение ||
|| **languageId**
[`string`](../../data-types.md) | Язык формы. Список языков возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `languages` | Да ||
|| **templateId**
[`string`](../../data-types.md) | Сценарий, по которому создана форма, например `contacts` или `callback`. Список сценариев возвращает метод [crm.form.scenario.list](./setup/crm-form-scenario-list.md) | Да ||
|| **createdTime**
[`datetime`](../../data-types.md) | Дата и время создания формы | Только чтение ||
|| **updatedTime**
[`datetime`](../../data-types.md) | Версия формы — дата и время последнего изменения. Передается в `updatedTime` методов изменения, чтобы не перезаписать чужие изменения | Только чтение ||
|| **activeChangedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним включил или выключил форму | Только чтение ||
|| **activeChangedTime**
[`datetime`](../../data-types.md) | Дата и время последнего включения или выключения формы | Только чтение ||
|| **appearance**
[`object`](../../data-types.md) | Заголовок, описание и кнопка формы. [Структура раздела](#appearance) | Да ||
|| **crm**
[`object`](../../data-types.md) | Какие объекты CRM создает форма. [Структура раздела](#crm) | Да ||
|| **fields**
[`array`](../../data-types.md) | Поля формы. Структура элемента описана [ниже](#fields) | Да ||
|| **dependencies**
[`array`](../../data-types.md) | Правила зависимых полей. [Структура элемента](#dependencies) | Да ||
|| **presetFields**
[`array`](../../data-types.md) | Значения полей CRM, которые форма заполняет автоматически. [Структура элемента](#presetFields) | Да ||
|| **responsible**
[`object`](../../data-types.md) | Очередь ответственных. [Структура раздела](#responsible) | Да ||
|| **agreements**
[`object`](../../data-types.md) | Соглашения, которые принимает клиент. [Структура раздела](#agreements) | Да ||
|| **submission**
[`object`](../../data-types.md) | Что видит клиент после отправки формы. [Структура раздела](#submission) | Да ||
|| **payment**
[`object`](../../data-types.md) | Оплата после заполнения формы. [Структура раздела](#payment) | Да ||
|| **callback**
[`object`](../../data-types.md) | Обратный звонок после заполнения формы. [Структура раздела](#callback) | Да ||
|| **booking**
[`object`](../../data-types.md) | Онлайн-запись. Содержит поле `enabled` типа `boolean`: `true`, если в форме есть поле бронирования | Только чтение ||
|| **analytics**
[`object`](../../data-types.md) | Счетчики веб-аналитики. [Структура раздела](#analytics) | Да ||
|| **spamProtection**
[`object`](../../data-types.md) | Защита от спама. Содержит поле `enabled` типа `boolean`: `true` — защита включена, `false` — выключена | Да ||
|| **integrations**
[`object`](../../data-types.md) | Интеграции с мессенджерами и рекламными сервисами. [Структура раздела](#integrations) | Да ||
|#

#### Раздел appearance {#appearance}

#|
|| **Название**
`тип` | **Описание** | **Запись** ||
|| **title**
[`string`](../../data-types.md) | Заголовок формы | Да ||
|| **description**
[`string`](../../data-types.md) | Описание под заголовком | Да ||
|| **buttonCaption**
[`string`](../../data-types.md) | Текст кнопки отправки | Да ||
|| **buttonTextColor**
[`string`](../../data-types.md) | Цвет текста кнопки | Да ||
|| **buttonBackgroundColor**
[`string`](../../data-types.md) | Цвет фона кнопки | Да ||
|| **backgroundImageId**
[`integer`](../../data-types.md) | Идентификатор фонового изображения | Только чтение ||
|| **copyrightRemoved**
[`boolean`](../../data-types.md) | Скрыта ли надпись «Заряжено Битрикс24».

Возможные значения:

- `true` — надпись скрыта
- `false` — надпись показывается

Если тариф не позволяет убрать надпись, значение `true` без ошибки сохраняется как `false` | Да ||
|#

Тему оформления формы через REST пока изменить нельзя.

#### Раздел crm {#crm}

#|
|| **Название**
`тип` | **Описание** | **Запись** ||
|| **entityScheme**
[`integer`](../../data-types.md) | Схема CRM — какие объекты создает заполнение формы, например лид или сделку с контактом. Идентификаторы схем возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `entitySchemes`.

От схемы зависит, какие поля CRM можно добавить в форму | Обязательно при создании ||
|| **duplicateMode**
[`string`](../../data-types.md) | Что делать, если клиент уже есть в CRM.

Возможные значения из ключа `duplicateModes` метода [crm.form.configuration.get](./setup/crm-form-configuration-get.md):

- `MERGE` — объединять данные
- `REPLACE` — заменять данные | Да ||
|| **dealCategoryId**
[`integer`](../../data-types.md) | Воронка сделок. `0` — общая воронка, `null` — воронка не указана. Идентификаторы воронок возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `dealCategories` | Да ||
|| **dealDuplicateControlEnabled**
[`boolean`](../../data-types.md) | Контроль дублей для сделок.

Возможные значения:

- `true` — контроль включен
- `false` — контроль выключен | Да ||
|| **smartProcessCategoryId**
[`integer`](../../data-types.md) | Воронка смарт-процесса. Идентификаторы воронок возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `smartProcesses[].categories` | Да ||
|| **smartProcessDuplicateControlEnabled**
[`boolean`](../../data-types.md) | Контроль дублей для элементов смарт-процесса.

Возможные значения:

- `true` — контроль включен
- `false` — контроль выключен | Да ||
|#

#### Элемент fields {#fields}

#|
|| **Название**
`тип` | **Описание** | **Запись** ||
|| **name**
[`string`](../../data-types.md) | Код поля, например `LEAD_NAME`. Коды полей CRM возвращает метод [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md). Поле должно относиться к объектам схемы `crm.entityScheme`. Один код можно указать в форме один раз | Да ||
|| **type**
[`string`](../../data-types.md) | Тип поля, например `string`, `phone`, `email`. Список типов возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `fieldTypes`.

Через REST пока нельзя добавить поля с вариантами выбора и товары: `list`, `checkbox`, `radio`, `product`, `booking`. Такие поля, созданные в интерфейсе, сохраняются при записи, если не менять их тип | Да ||
|| **label**
[`string`](../../data-types.md) | Подпись поля | Да ||
|| **sort**
[`integer`](../../data-types.md) | Порядок поля. Вычисляется по позиции элемента в массиве `fields` | Только чтение ||
|| **required**
[`boolean`](../../data-types.md) | Обязательность поля.

Возможные значения:

- `true` — поле обязательное
- `false` — поле необязательное | Да ||
|| **multiple**
[`boolean`](../../data-types.md) | Можно ли ввести несколько значений.

Возможные значения:

- `true` — несколько значений
- `false` — одно значение | Да ||
|| **placeholder**
[`string`](../../data-types.md) | Подсказка внутри пустого поля | Да ||
|| **valueType**
[`string`](../../data-types.md) | Тип значения для полей контактов, например рабочий или мобильный телефон | Да ||
|| **value**
[`string`](../../data-types.md) | Значение по умолчанию | Да ||
|#

#### Элемент dependencies {#dependencies}

Каждый элемент — группа правил, которые показывают или скрывают поля в зависимости от ответов клиента.

#|
|| **Название**
`тип` | **Описание** ||
|| **logic**
[`string`](../../data-types.md) | Как объединяются правила группы.

Возможные значения:

- `and` — должны выполниться все правила
- `or` — достаточно одного правила ||
|| **rules**
[`array`](../../data-types.md) | Правила группы. В группе должно быть хотя бы одно правило. Каждое правило содержит объекты `condition` и `action` ||
|| **rules[].condition.fieldName**
[`string`](../../data-types.md) | Код поля формы, за которым следит правило. Поле должно быть в `fields` этой формы ||
|| **rules[].condition.event**
[`string`](../../data-types.md) | Событие поля. Возможное значение: `change` — значение изменилось ||
|| **rules[].condition.operation**
[`string`](../../data-types.md) | Сравнение.

Возможные значения:

- `=` — равно
- `!=` или `<>` — не равно
- `>`, `>=`, `<`, `<=` — больше, больше или равно, меньше, меньше или равно — для числовых полей
- `empty` — не заполнено
- `any` — заполнено
- `contain` — содержит — для строковых полей
- `!contain` — не содержит — для строковых полей ||
|| **rules[].condition.value**
[`string`](../../data-types.md) | Значение для сравнения ||
|| **rules[].action.fieldName**
[`string`](../../data-types.md) | Код поля формы, на которое действует правило ||
|| **rules[].action.type**
[`string`](../../data-types.md) | Действие.

Возможные значения:

- `show` — показать поле
- `hide` — скрыть поле ||
|| **rules[].action.value**
[`string`](../../data-types.md) | Значение действия ||
|#

#### Элемент presetFields {#presetFields}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityName**
[`string`](../../data-types.md) | Объект CRM, например `LEAD` ||
|| **fieldName**
[`string`](../../data-types.md) | Код поля объекта ||
|| **value**
[`string`](../../data-types.md) | Значение, которое форма запишет в поле ||
|#

#### Раздел responsible {#responsible}

#|
|| **Название**
`тип` | **Описание** ||
|| **userIds**
[`integer[]`](../../data-types.md) | Идентификаторы ответственных в порядке очереди. Идентификатор нельзя повторять. Идентификаторы пользователей можно получить методом [user.get](../../user/user-get.md) ||
|| **checkWorkTime**
[`boolean`](../../data-types.md) | Учитывать ли рабочее время при выборе следующего ответственного.

Возможные значения:

- `true` — учитывать
- `false` — не учитывать ||
|#

#### Раздел agreements {#agreements}

#|
|| **Название**
`тип` | **Описание** ||
|| **enabled**
[`boolean`](../../data-types.md) | Показывать ли соглашения в форме.

Возможные значения:

- `true` — показывать
- `false` — не показывать ||
|| **items**
[`array`](../../data-types.md) | Соглашения. Каждый элемент содержит:

- `agreementId` — идентификатор соглашения
- `checked` — отмечено ли соглашение заранее
- `required` — обязательно ли принять соглашение ||
|#

#### Раздел submission {#submission}

#|
|| **Название**
`тип` | **Описание** ||
|| **success**
[`object`](../../data-types.md) | Результат успешной отправки: `url` — адрес перенаправления, `text` — текст сообщения. Если указаны и `url`, и повторное заполнение `refill`, приоритет у адреса ||
|| **failure**
[`object`](../../data-types.md) | Результат ошибки отправки: `url` — адрес перенаправления, `text` — текст сообщения ||
|| **redirectDelay**
[`integer`](../../data-types.md) | Задержка перед перенаправлением после успешной отправки, от 0 до 10 секунд ||
|| **refill**
[`object`](../../data-types.md) | Предложение заполнить форму еще раз: `enabled` — включено ли предложение, `caption` — текст кнопки ||
|#

#### Раздел payment {#payment}

#|
|| **Название**
`тип` | **Описание** ||
|| **enabled**
[`boolean`](../../data-types.md) | Включена ли оплата. Включить оплату можно, если на Битрикс24 доступны заказы ||
|| **disabledPaySystemsId**
[`integer[]`](../../data-types.md) | Платежные системы, которые форма не предлагает. Все остальные платежные системы Битрикс24 доступны, в том числе подключенные позже. Пустой массив включает все платежные системы. Идентификаторы возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `paySystems` ||
|#

#### Раздел callback {#callback}

#|
|| **Название**
`тип` | **Описание** ||
|| **enabled**
[`boolean`](../../data-types.md) | Включен ли обратный звонок. Включить можно, если обратный звонок доступен на Битрикс24 ||
|| **from**
[`string`](../../data-types.md) | Номер, с которого Битрикс24 перезванивает клиенту. Номер должен быть среди номеров телефонии Битрикс24 ||
|| **text**
[`string`](../../data-types.md) | Текст, который клиент услышит при звонке ||
|#

#### Раздел analytics {#analytics}

#|
|| **Название**
`тип` | **Описание** ||
|| **googleAnalyticsId**
[`string`](../../data-types.md) | Идентификатор Google Analytics ||
|| **googleAnalyticsPageViewEnabled**
[`boolean`](../../data-types.md) | Отправлять ли просмотры страницы в Google Analytics ||
|| **yandexMetricaId**
[`string`](../../data-types.md) | Идентификатор счетчика Яндекс Метрики ||
|#

#### Раздел integrations {#integrations}

#|
|| **Название**
`тип` | **Описание** ||
|| **whatsAppEnabled**
[`boolean`](../../data-types.md) | Включена ли форма в мессенджере. Включить можно, если функция доступна на Битрикс24 ||
|| **ads**
[`array`](../../data-types.md) | Связи с формами рекламных сервисов. Каждый элемент содержит:

- `direction` — направление обмена
- `providerCode` — код рекламного сервиса
- `accountId` и `accountName` — идентификатор и имя рекламного аккаунта
- `formId` и `formName` — идентификатор и имя формы в рекламном сервисе
- `fieldMappings` — соответствие полей: `crmFieldName` — поле CRM, `adsFieldName` — поле рекламной формы ||
|#

### crm_form_configuration {#crm_form_configuration}

Справочники конструктора форм. Возвращается методом [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `item`.

#|
|| **Название**
`тип` | **Описание** ||
|| **entitySchemes**
[`object[]`](../../data-types.md) | Схемы создания объектов CRM: какие объекты создает заполненная форма [(подробное описание)](#entity-schemes).

Идентификатор схемы передается в поле `crm.entityScheme` при создании и изменении формы ||
|| **duplicateModes**
[`object[]`](../../data-types.md) | Режимы обработки повторного заполнения формы: элементы с полями `id` и `name`.

Значение `id` передается в поле `crm.duplicateMode`. На тестовом Битрикс24 возвращаются `MERGE` — объединять и `REPLACE` — заменять ||
|| **lead**
[`object`](../../data-types.md) | Объект с полем `enabled` типа `boolean`:
- `true` — в CRM включены лиды
- `false` — CRM работает в простом режиме без лидов ||
|| **dealCategories**
[`object[]`](../../data-types.md) | Воронки сделок: элементы с полями `id` и `name`.

Значение `id` передается в поле `crm.dealCategoryId`. Общая воронка имеет идентификатор `0` ||
|| **smartProcesses**
[`object[]`](../../data-types.md) | Смарт-процессы, элементы которых может создавать форма [(подробное описание)](#smart-processes) ||
|| **languages**
[`object[]`](../../data-types.md) | Языки формы: элементы с полями `id` и `name`.

Значение `id` передается в поле `languageId` ||
|| **currencies**
[`object[]`](../../data-types.md) | Валюты Битрикс24 [(подробное описание)](#currencies) ||
|| **fieldTypes**
[`object[]`](../../data-types.md) | Типы полей, из которых можно собрать форму [(подробное описание)](#field-types).

Значение `id` передается в поле `fields[].type` ||
|| **paySystems**
[`object[]`](../../data-types.md) | Платежные системы, через которые можно оплатить заполненную форму: элементы с полями `id` и `name`.

Идентификаторы систем, которые форма не должна предлагать, передаются в поле `payment.disabledPaySystemsId`. Если на Битрикс24 нет модуля `sale`, массив пустой ||
|| **permissions**
[`object`](../../data-types.md) | Права текущего пользователя на CRM-формы:
- `canRead` — может просматривать формы
- `canEdit` — может создавать, изменять и удалять формы ||
|| **limits**
[`object`](../../data-types.md) | Объект с полем `activeForms` — лимит активных форм:
- `current` — сколько форм сейчас активно
- `maximum` — сколько форм можно держать активными на тарифе

Если количество активных форм на Битрикс24 не ограничено, `activeForms` равно `null` ||
|| **product**
[`object`](../../data-types.md) | Сведения о продукте:
- `isCloud` — облачный Битрикс24
- `isRegionRussian` — Битрикс24 российского региона ||
|| **region**
[`string`](../../data-types.md) | Код региона Битрикс24, например `ru` ||
|#

#### Элемент entitySchemes {#entity-schemes}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор схемы ||
|| **name**
[`string`](../../data-types.md) | Название схемы ||
|| **description**
[`string`](../../data-types.md) | Описание схемы: какие объекты она создает ||
|| **entityNames**
[`string[]`](../../data-types.md) | Коды объектов CRM, которые создает схема, например `LEAD`, `CONTACT`, `COMPANY`, `DYNAMIC_174`.

Коды передаются в фильтр метода [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md), чтобы получить поля для формы ||
|| **mainEntityName**
[`string`](../../data-types.md) | Код основного объекта схемы. Для схемы «Клиент» — `null` ||
|| **hasInvoice**
[`boolean`](../../data-types.md) | Признак того, что схема создает счет ||
|| **dynamic**
[`boolean`](../../data-types.md) | Признак схемы смарт-процесса ||
|#

#### Элемент smartProcesses {#smart-processes}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../data-types.md) | Идентификатор типа смарт-процесса ||
|| **entityName**
[`string`](../../data-types.md) | Код смарт-процесса, например `DYNAMIC_177` ||
|| **name**
[`string`](../../data-types.md) | Название смарт-процесса ||
|| **categories**
[`object[]`](../../data-types.md) | Воронки смарт-процесса: элементы с полями `id` и `name`.

Значение `id` передается в поле `crm.smartProcessCategoryId` ||
|#

#### Элемент currencies {#currencies}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Код валюты, например `RUB` ||
|| **fullName**
[`string`](../../data-types.md) | Название валюты ||
|| **formatString**
[`string`](../../data-types.md) | Шаблон вывода суммы, `#` заменяется суммой ||
|#

#### Элемент fieldTypes {#field-types}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Код типа поля формы, например `string`, `phone`, `email`, `section`, `hr` ||
|| **name**
[`string`](../../data-types.md) | Название типа поля ||
|| **parameters**
[`string[]`](../../data-types.md) | Параметры, которые можно задать полю этого типа в элементе `fields[]`, например `label`, `required`, `multiple`, `placeholder`, `valueType`, `value`. Для разделителей `hr` и `br` массив пустой ||
|#

{% note info "" %}

В справочнике `fieldTypes` нет типов полей с вариантами выбора: список, флажки, переключатели. Через REST такие поля, а также товары и бронирование в форму пока добавить нельзя.

{% endnote %}

### crm_form_scenario {#crm_form_scenario}

Сценарий создания формы. Возвращается методом [crm.form.scenario.list](./setup/crm-form-scenario-list.md) в массиве `items`. Код сценария `id` передается в поле `templateId` формы.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Код сценария, например `callback`, `contacts`, `event_registration` ||
|| **title**
[`string`](../../data-types.md) | Название сценария ||
|| **description**
[`string`](../../data-types.md) | Описание сценария или `null` ||
|| **categoryId**
[`string`](../../data-types.md) | Код категории сценария. Названия категорий возвращает метод [crm.form.scenariocategory.list](./setup/crm-form-scenariocategory-list.md) ||
|| **iconUrl**
[`string`](../../data-types.md) | Путь к иконке сценария на Битрикс24 или `null`, если иконки нет ||
|| **sections**
[`string[]`](../../data-types.md) | Разделы конструктора, которые сценарий открывает для настройки, например `fields`, `agreements`, `crm`, `design` ||
|| **expertSections**
[`string[]`](../../data-types.md) | Разделы конструктора, которые сценарий открывает в расширенном режиме. Может быть пустым ||
|| **defaultSection**
[`string`](../../data-types.md) | Раздел, с которого открывается конструктор, или `null` ||
|| **openable**
[`boolean`](../../data-types.md) | Признак того, что сценарий открывает конструктор формы.

Возможные значения:

- `true` — сценарий открывает конструктор
- `false` — сценарий не открывает конструктор, а выполняет действие из `actions` ||
|| **soon**
[`boolean`](../../data-types.md) | Признак анонсированного сценария.

Возможные значения:

- `true` — сценарий анонсирован, но пока недоступен
- `false` — сценарий доступен ||
|| **actions**
[`string[]`](../../data-types.md) | Дополнительные действия сценария, например `showHelp` или `check`. Для большинства сценариев массив пустой ||
|#

### crm_form_scenario_category {#crm_form_scenario_category}

Категория сценариев. Возвращается методом [crm.form.scenariocategory.list](./setup/crm-form-scenariocategory-list.md) в массиве `items`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Код категории. Совпадает с полем `categoryId` сценария из [crm.form.scenario.list](./setup/crm-form-scenario-list.md) ||
|| **title**
[`string`](../../data-types.md) | Название категории ||
|#

### crm_form_entity_field {#crm_form_entity_field}

Поле объекта CRM, которое можно добавить в форму. Возвращается методом [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md) в массиве `items`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Код поля, например `CONTACT_NAME`. Передается в `fields[].name` при создании или изменении формы ||
|| **label**
[`string`](../../data-types.md) | Название поля ||
|| **type**
[`string`](../../data-types.md) | Тип поля, например `string`, `typed_string`, `list`, `date`, `file`, `address`. Поля с типами `list` и `checkbox` в форму через REST добавить нельзя ||
|| **required**
[`boolean`](../../data-types.md) | Признак обязательного поля в CRM ||
|| **multiple**
[`boolean`](../../data-types.md) | Признак множественного поля ||
|| **entityName**
[`string`](../../data-types.md) | Код объекта CRM, которому принадлежит поле ||
|| **entityLabel**
[`string`](../../data-types.md) | Название объекта CRM ||
|| **items**
[`object[]`](../../data-types.md) | Варианты значений поля-списка: элементы с полями `id` — значение, которое сохраняется в CRM, и `label` — название варианта. Для остальных полей массив пустой ||
|#

### crm_form_embedding {#crm_form_embedding}

Варианты размещения формы. Возвращается методом [crm.form.embedding.get](./placement/crm-form-embedding-get.md) без параметра `variant` в ключе `item`. Настройки `click.settings` и `auto.settings` меняет метод [crm.form.embedding.update](./placement/crm-form-embedding-update.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **formActive**
[`boolean`](../../data-types.md) | Активна ли форма.

Возможные значения:

- `true` — форма активна и принимает заполнения
- `false` — форма выключена. Включить ее можно методом [crm.form.activate](./crm-form-activate.md) ||
|| **resourcesReady**
[`boolean`](../../data-types.md) | Собраны ли файлы формы для публикации.

Возможные значения:

- `true` — файлы собраны, коды размещения готовы
- `false` — файлы еще не собраны, у всех вариантов `code` равен `null` ||
|| **publicUrl**
[`string`](../../data-types.md) | Публичная ссылка на форму ||
|| **inline**
[`object`](../../data-types.md) | Вариант встраивания формы в страницу сайта. У варианта нет настроек, поэтому `settings` и `options` равны `null`, [подробное описание](#embedding-variant) ||
|| **click**
[`object`](../../data-types.md) | Вариант показа формы по клику на кнопку или ссылку, [подробное описание](#embedding-variant) ||
|| **auto**
[`object`](../../data-types.md) | Вариант автоматического показа формы через заданное время, [подробное описание](#embedding-variant) ||
|#

#### Объекты inline, click, auto {#embedding-variant}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | HTML-код для вставки на сайт. Равен `null`, пока файлы формы не собраны ||
|| **previewUrl**
[`string`](../../data-types.md) | Ссылка на предпросмотр формы в этом варианте размещения ||
|| **settings**
[`object`](../../data-types.md) | Текущие настройки показа. Есть только у вариантов `click` и `auto`, [подробное описание](#embedding-settings) ||
|| **options**
[`object`](../../data-types.md) | Допустимые значения настроек показа. Есть только у вариантов `click` и `auto`, [подробное описание](#embedding-options) ||
|#

#### Объект settings {#embedding-settings}

Если значение настройки не сохранено в форме, возвращается `null`. В этом случае на сайте применяется значение по умолчанию.

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Вид окна формы.

Возможные значения:

- `popup` — всплывающее окно
- `panel` — боковая панель ||
|| **position**
[`string`](../../data-types.md) | Положение окна по горизонтали.

Возможные значения:

- `left` — слева
- `center` — по центру
- `right` — справа ||
|| **vertical**
[`string`](../../data-types.md) | Положение окна по вертикали.

Возможные значения:

- `bottom` — снизу
- `top` — сверху ||
|| **delay**
[`integer`](../../data-types.md) | Задержка автопоказа в секундах. Есть только у варианта `auto` ||
|| **button**
[`object`](../../data-types.md) | Настройки кнопки, по которой открывается форма. Есть только у варианта `click`, [подробное описание](#embedding-button) ||
|#

#### Объект button {#embedding-button}

#|
|| **Название**
`тип` | **Описание** ||
|| **use**
[`boolean`](../../data-types.md) | Показывать ли кнопку Битрикс24 на сайте.

Возможные значения:

- `true` — показывать кнопку с настройками из этого объекта
- `false` — не показывать кнопку ||
|| **text**
[`string`](../../data-types.md) | Текст кнопки ||
|| **font**
[`string`](../../data-types.md) | Шрифт кнопки. Допустимые значения перечислены в `click.options.button.font`, например `modern`, `classic`, `elegant` ||
|| **align**
[`string`](../../data-types.md) | Выравнивание кнопки. Допустимые значения перечислены в `click.options.button.align`, например `inline`, `left`, `center`, `right` ||
|| **plain**
[`boolean`](../../data-types.md) | Признак кнопки без фона.

Возможные значения:

- `true` — кнопка без фона
- `false` — кнопка с фоном ||
|| **rounded**
[`boolean`](../../data-types.md) | Признак скругленных углов.

Возможные значения:

- `true` — углы скруглены
- `false` — углы прямые ||
|| **outlined**
[`boolean`](../../data-types.md) | Признак обводки кнопки.

Возможные значения:

- `true` — у кнопки есть обводка
- `false` — обводки нет ||
|| **decoration**
[`string`](../../data-types.md) | Подчеркивание текста кнопки. В интерфейсе доступны значения `dotted`, `solid` или пустое значение ||
|| **color**
[`object`](../../data-types.md) | Цвета кнопки в формате HEX, например `#3bc8f5` или `#3eddffa6` с прозрачностью:

- `text` — цвет текста
- `textHover` — цвет текста при наведении
- `background` — цвет фона
- `backgroundHover` — цвет фона при наведении ||
|#

#### Объект options {#embedding-options}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string[]`](../../data-types.md) | Допустимые значения `settings.type` ||
|| **position**
[`string[]`](../../data-types.md) | Допустимые значения `settings.position` ||
|| **vertical**
[`string[]`](../../data-types.md) | Допустимые значения `settings.vertical` ||
|| **delay**
[`integer[]`](../../data-types.md) | Допустимые значения `settings.delay`. Есть только у варианта `auto` ||
|| **button**
[`object`](../../data-types.md) | Допустимые значения настроек кнопки: `font` и `align`. Есть только у варианта `click` ||
|#

### crm_form_embedding_selection {#crm_form_embedding_selection}

Один вариант размещения. Возвращается методом [crm.form.embedding.get](./placement/crm-form-embedding-get.md) с параметром `variant` в ключе `item`.

#|
|| **Название**
`тип` | **Описание** ||
|| **variant**
[`string`](../../data-types.md) | Выбранный вариант размещения: `inline`, `click`, `auto` или `link` ||
|| **code**
[`string`](../../data-types.md) | HTML-код для вставки на сайт. Возвращается для вариантов `inline`, `click` и `auto` ||
|| **url**
[`string`](../../data-types.md) | Публичная ссылка на форму. Возвращается для варианта `link` ||
|#

### crm_form_site_button {#crm_form_site_button}

Виджет на сайт. Возвращается методом [crm.form.sitebutton.list](./placement/crm-form-sitebutton-list.md) в массиве `items`. Привязать форму к виджету через REST нельзя.

#|
|| **Название**
`тип` | **Описание** ||
|| **formId**
[`integer`](../../data-types.md) | Идентификатор CRM-формы из фильтра запроса ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор виджета ||
|| **name**
[`string`](../../data-types.md) | Название виджета ||
|| **system**
[`boolean`](../../data-types.md) | Признак системного виджета.

Возможные значения:

- `true` — виджет создан Битрикс24 автоматически
- `false` — виджет создан пользователем ||
|| **bound**
[`boolean`](../../data-types.md) | Подключена ли форма из фильтра к этому виджету.

Возможные значения:

- `true` — форма есть в активном слоте виджета
- `false` — форма к виджету не подключена ||
|| **formsId**
[`integer[]`](../../data-types.md) | Идентификаторы всех CRM-форм, подключенных к виджету ||
|| **previewUrl**
[`string`](../../data-types.md) | Ссылка на предпросмотр виджета. Форма из фильтра видна в предпросмотре, только если `bound` равно `true` ||
|#

### crm_form_open_line {#crm_form_open_line}

Открытая линия. Возвращается методом [crm.form.openline.list](./placement/crm-form-openline-list.md) в массиве `items`. Назначить форму приветственной через REST нельзя.

#|
|| **Название**
`тип` | **Описание** ||
|| **formId**
[`integer`](../../data-types.md) | Идентификатор CRM-формы из фильтра запроса ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор открытой линии ||
|| **name**
[`string`](../../data-types.md) | Название открытой линии ||
|| **bound**
[`boolean`](../../data-types.md) | Является ли форма из фильтра приветственной формой этой линии.

Возможные значения:

- `true` — форма назначена приветственной
- `false` — форма не назначена приветственной ||
|| **welcomeFormEnabled**
[`boolean`](../../data-types.md) | Включена ли в линии приветственная форма: эта или другая.

Возможные значения:

- `true` — приветственная форма включена
- `false` — приветственная форма выключена ||
|| **welcomeFormId**
[`integer`](../../data-types.md) | Идентификатор приветственной формы линии. Равен `null`, если форма не выбрана ||
|| **welcomeFormDelayed**
[`boolean`](../../data-types.md) | Когда показывается приветственная форма.

Возможные значения:

- `true` — после первого сообщения посетителя
- `false` — до первого сообщения посетителя ||
|| **previewUrl**
[`string`](../../data-types.md) | Ссылка на предпросмотр виджета на сайт с этой открытой линией. Равна `null`, если линия не подключена ни к одному активному виджету. Форма из фильтра видна в предпросмотре, только если `bound` равно `true` ||
|#

## Пользовательская документация

- [Как создать и настроить CRM-форму](https://helpdesk.bitrix24.ru/open/24730032/)
- [Как изменить заголовок и название CRM-формы, название страницы](https://helpdesk.bitrix24.ru/open/24955978/)
- [Как настроить сбор согласий через CRM-форму](https://helpdesk.bitrix24.ru/open/26838702/)
- [Как настроить правила показа полей в CRM-формах](https://helpdesk.bitrix24.ru/open/23440516/)
- [CRM-формы: как исправить ошибки в настройках правил показа полей](https://helpdesk.bitrix24.ru/open/24277614/)
- [Как настроить автозаполнение полей в CRM-формах](https://helpdesk.bitrix24.ru/open/24955940/)
- [Как настроить автозаполнение скрытых полей в CRM-формах](https://helpdesk.bitrix24.ru/open/25978110/)
- [Как создать персонализированную CRM-форму](https://helpdesk.bitrix24.ru/open/25949136/)
- [Как настроить защиту от спама в CRM-формах](https://helpdesk.bitrix24.ru/open/24938078/)
- [Как настроить аналитику CRM-форм в Яндекс Метрике](https://helpdesk.bitrix24.ru/open/28842086/)

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-form-add.md)
- [{#T}](./crm-form-update.md)
- [{#T}](./setup/crm-form-configuration-get.md)
- [{#T}](./placement/crm-form-embedding-get.md)
