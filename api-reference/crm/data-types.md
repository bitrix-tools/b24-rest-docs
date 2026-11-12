# Типы данных и структура объектов в REST API CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Кроме базовых типов, поля методов CRM предыдущей версии API используют типы CRM: идентификаторы элементов и справочников, множественные поля, файлы, адреса, коды типов объектов. Тип поля указан в ключе `type` — его возвращают методы получения полей, например [crm.item.fields](./universal/crm-item-fields.md). Формат ответа описан в разделе [Описание поля](#crm_rest_field_description).

Справочник нужен, если:

- у поля указан тип CRM, например `crm_status`, `crm_multifield` или `crm_entity`
- нужен числовой или символьный код типа объекта CRM
- нужно собрать значение для записи: [привязку к элементу CRM](#crm-binding-format), [файл дела](#diskfile) или [комментария таймлайна](#attached_diskfile), [адрес](#crm_user_field_address)

{% note info "" %}

Справочник описывает типы предыдущей версии API — методов `crm.deal.*`, `crm.item.*` и других, которые вызываются по адресу `/rest/`. Форматы значений пользовательских полей [«Привязка к элементам CRM»](#crm-binding-format) и [«Адрес»](#crm_user_field_address) описаны для обеих версий.

- Для новых интеграций используйте [REST 3.0](../rest-v3.md) — его методы вызываются по адресу `/rest/api/`. Многие методы сохранили имена, например `crm.deal.get`, аналоги остальных — в статье [{#T}](./migration.md).
- Валюты, типы смарт-процессов, таймлайн и некоторые другие методы пока есть только в предыдущей версии, список — в разделе [Чего пока нет в REST 3.0](./migration.md#previous-only).
- В REST 3.0 поля описаны иначе: тип поля возвращает метод [crm.<тип>.field.list](./rest-v3/fields/crm-entity-field-list-rest-v3.md), а состав полей приведен на страницах объектов, например [Поля контакта в REST 3.0](./rest-v3/items/fields-contact.md).
- В обеих версиях действуют числовые идентификаторы типов `entityTypeId` из таблицы [Тип объекта CRM](#object_type) и [идентификаторы языков](#lang-ids). Краткие коды `entityTypeAbbr` используются только в предыдущей версии. Коды `userFieldEntityId` в REST 3.0 не передаются — тип объекта задает имя метода, — но приходят в поле `entityId` ответа методов [crm.<тип>.field.custom.*](./rest-v3/fields/index.md).

{% endnote %}

Что описано в других статьях:

- базовые типы `integer`, `string`, `datetime`, `boolean` и другие — в статье [Типы данных и форматы параметров в REST API](../data-types.md#standart-types), составные записи, например `тип[]`, — в разделе [Как записаны составные типы](../data-types.md#compound-types)
- типы CRM-форм `crm_form*` — в статье [{#T}](./form/data-types.md)

Запись `объект.поле`, например `catalog_product.id`, означает значение поля `id` объекта `catalog_product`.

## Типы данных

#|
|| **Тип** | **Описание** ||
|| `crm_status` | Строковый идентификатор элемента справочника CRM (например, `NEW`). Получить возможные значения конкретного справочника можно методом [crm.status.list](./status/crm-status-list.md) с фильтром по `ENTITY_ID`. Код справочника для фильтра приходит в ключе `statusType` [описания поля](#crm_rest_field_description).

В REST 3.0:

- справочники `DEAL_TYPE`, `CONTACT_TYPE`, `COMPANY_TYPE`, `HONORIFIC`, `EMPLOYEES`, `INDUSTRY` и `SOURCE` возвращают методы [crm.dictionary.<справочник>.*](./rest-v3/dictionaries/index.md). Имя справочника — код без подчеркивания в нижнем регистре: `DEAL_TYPE` → `crm.dictionary.dealtype.list`
- стадии сделок `DEAL_STAGE` и `DEAL_STAGE_{id воронки}` и смарт-процессов `DYNAMIC_{entityTypeId}_STAGE_{id воронки}` возвращает метод [crm.<тип>.category.stage.list](./rest-v3/categories/crm-entity-category-stage-list-rest-v3.md)
- стадий лидов `STATUS`, предложений `QUOTE_STATUS`, счетов `SMART_INVOICE_STAGE_{id воронки}`, старых счетов `INVOICE_STATUS` и статусов списков обзвона `CALL_LIST` в REST 3.0 нет — получайте их методом [crm.status.list](./status/crm-status-list.md) предыдущей версии
||
|| `crm_lead` | Целочисленный идентификатор лида CRM. Получить информацию о лиде: [crm.lead.get в REST 3.0](./rest-v3/items/crm-entity-get-rest-v3.md) или [crm.lead.get предыдущей версии](./leads/crm-lead-get.md) ||
|| `crm_deal` | Целочисленный идентификатор сделки CRM. Получить информацию о сделке: [crm.deal.get в REST 3.0](./rest-v3/items/crm-entity-get-rest-v3.md) или [crm.deal.get предыдущей версии](./deals/crm-deal-get.md) ||
|| `crm_contact` | Целочисленный идентификатор контакта CRM. Получить информацию о контакте: [crm.contact.get в REST 3.0](./rest-v3/items/crm-entity-get-rest-v3.md) или [crm.contact.get предыдущей версии](./contacts/crm-contact-get.md) ||
|| `crm_company` | Целочисленный идентификатор компании CRM. Получить информацию о компании: [crm.company.get в REST 3.0](./rest-v3/items/crm-entity-get-rest-v3.md) или [crm.company.get предыдущей версии](./companies/crm-company-get.md) ||
|| `crm_quote` | Целочисленный идентификатор коммерческого предложения CRM. Получить информацию о коммерческом предложении: [crm.quote.get в REST 3.0](./rest-v3/items/crm-entity-get-rest-v3.md) или [crm.quote.get предыдущей версии](./quote/crm-quote-get.md) ||
|| `crm_category` | Целочисленный идентификатор воронки CRM. Получить информацию о воронке: [crm.<тип>.category.get в REST 3.0](./rest-v3/categories/crm-entity-category-get-rest-v3.md) или [crm.category.get предыдущей версии](./universal/category/crm-category-get.md) ||
|| `crm_entity` | Целочисленный идентификатор элемента CRM. Тип объекта приходит в ключе `settings.parentEntityTypeId` [описания поля](#crm_rest_field_description) и повторяется в названии поля. Например, в поле `parentId2` хранится идентификатор сделки: `2` — это `entityTypeId` сделки. Получить информацию об элементе:

- в REST 3.0 вызовите [crm.<тип>.get](./rest-v3/items/crm-entity-get-rest-v3.md) и передайте `id` из значения поля. Сегмент `<тип>` берется из таблицы на странице метода: `crm.deal.get` для `entityTypeId = 2`, `crm.smartprocess1038.get` для смарт-процесса с `entityTypeId = 1038`
- в предыдущей версии вызовите [crm.item.get](./universal/crm-item-get.md) и передайте `entityTypeId` и `id`
||
|| `lang_map` | Объект формата:

```text
{
    lang_1: value_1,
    lang_2: value_2,
    ..
    lang_n: value_n,
}
```

где:

- `lang_n` — [идентификатор языка](#lang-ids)
- `value_n` — значение для языка `lang_n`
||
|| `crm_dynamic_type.id` | Целочисленный идентификатор смарт-процесса — поле `id` объекта [type](#type). ||
|| `crm_userfield` | Значение пользовательского поля. Так тип записан в таблицах полей на страницах методов `crm.item.*`. Конкретный тип значения зависит от типа самого поля — смотрите [{#T}](./universal/user-defined-fields/crm-userfield-types.md). В описании полей пользовательское поле приходит с типом самого поля, например `enumeration`, `crm`, `address`, `money`, `employee`. Формат значений типов `crm` и `address` — в разделах [Привязка к элементам CRM](#crm-binding-format) и [Адрес](#crm_user_field_address) ||
|| `userFieldEntityId` | Строковый код типа объекта CRM, к которому привязано пользовательское поле. Например, `CRM_CONTACT`. Коды системных типов и правило для смарт-процессов — в разделе [Тип объекта CRM](#object_type) ||
|| `location` | Строковый идентификатор местоположения из справочника местоположений Битрикс24. Служебный тип для расчета налогов по местоположению: поля с ним, например `LOCATION_ID` у сделки, заполняют, только когда в Битрикс24 включен такой расчет налогов ||
|| [`crm_item_product_row`](#crm_item_product_row) | Объект товарной позиции элемента CRM. Структура в предыдущей версии — в разделе [crm_item_product_row](#crm_item_product_row), в REST 3.0 — в разделе [Поля товарной позиции](./rest-v3/product-rows/index.md#fields). Идентификатор позиции записывается как `crm_item_product_row.id`. Получить товарные позиции: в REST 3.0 — методом [crm.<тип>.productrow.list](./rest-v3/product-rows/crm-entity-product-row-list-rest-v3.md), в предыдущей версии — методом [crm.item.productrow.list](./universal/product-rows/crm-item-productrow-list.md) ||
|| [`crm_multifield`](#crm_multifield) | Объект, описывающий «множественное поле». Множественные поля применяются для хранения телефонов, email-адресов и другой контактной информации в лидах, контактах, компаниях и смарт-процессах с включенным `isMultifieldsEnabled` ||
|| [`crm_currency`](#crm_currency) | Валюта CRM. В полях объектов, например в `CURRENCY_ID` сделки, это строковый код валюты: `RUB`, `USD`. Полный объект валюты возвращает метод [crm.currency.get](./currency/crm-currency-get.md) ||
|| [`crm_currency_localization`](#crm_currency_localization) | Объект, описывающий локализацию валюты. В ответе [crm.currency.fields](./currency/crm-currency-fields.md) поле с этими объектами имеет тип `currency_localization` ||
|| [`crm_orderentity`](#crm_orderentity) | Объект, описывающий связь элемента CRM с заказом интернет-магазина. Приходит в ответе методов [crm.orderentity.*](./universal/order-entity/index.md) ||
|| `recurring_params` | Объект с параметрами расчета даты следующего повторения для шаблона регулярного объекта CRM. Состав полей зависит от объекта и описан на странице конкретного метода. Например, [поля объекта PARAMS](./deals/recurring-deals/crm-deal-recurring-fields.md#params-fields) для регулярных сделок ||
|| [`type`](#type) | Объект, описывающий пользовательский тип объекта CRM (смарт-процесс) ||
|| [`type.relations`](#typerelations) | Объект со связями смарт-процесса с другими типами объектов CRM ||
|| [`relation`](#relation) | Объект, описывающий одну связь смарт-процесса с типом объекта CRM ||
|| [`type.linkedUserFields`](#typelinkeduserfields) | Объект с пользовательскими полями других модулей, в которых можно выбирать элементы смарт-процесса ||
|| [`diskfile`](#diskfile) | Файл, сохраненный на Диске Битрикс24 ||
|| [`attached_diskfile`](#attached_diskfile) | Файл, прикрепленный к комментарию таймлайна ||
|| `product_file` | Картинка товара в старой карточке товара — поля `PREVIEW_PICTURE` и `DETAIL_PICTURE` в устаревших методах `crm.product.*`. В ответе приходит объект с ключами `id` — идентификатор файла, `showUrl` — относительный адрес для просмотра и `downloadUrl` — относительный адрес для скачивания. Если картинки нет — `null` ||
|| `crm_webform` | Целочисленный идентификатор CRM-формы, через которую создан элемент. Данные формы возвращает метод [crm.form.get](./form/crm-form-get.md) ||
|| `crm_repeat_sale_segment_title` | Целочисленный идентификатор сценария повторной продажи, по которому создана сделка. Несмотря на имя типа, в поле приходит идентификатор, а не название сценария. Поле этого типа `repeatSaleSegmentId` множественное и доступно только для чтения. Приходит в [crm.item.fields](./universal/crm-item-fields.md), только если повторные продажи доступны в Битрикс24 ||
|| [`crm_activity_binding`](#crm_activity_binding) | Объект, описывающий привязку дела к элементу CRM ||
|| `crm_activity_communication` | Объект, описывающий канал коммуникации дела. Состав полей — в статье [{#T}](./timeline/activities/activity-base/crm-activity-communication-fields.md). В REST 3.0 каналы коммуникации приходят в поле `communications`, его формат — в разделе [Поля дела](./rest-v3/activities/index.md#fields) ||
|#

## Перечисления дел {#activity-enums}

Поля дел в методах [crm.activity.*](./timeline/activities/activity-base/index.md) предыдущей версии ссылаются на служебные перечисления. Значение поля — целое число из фиксированного набора. В REST 3.0 поля дел устроены иначе: направление и формат описания передаются строками, например `incoming` или `html`, привязки — парами `entityTypeId` и `entityId`. Формат — в разделе [Поля дела](./rest-v3/activities/index.md#fields).

#|
|| **Тип** | **Значения** ||
|| `crm_enum_activitytype` | Тип дела: `1` — встреча, `2` — звонок, `3` — задача, `4` — письмо, `5` — общий тип для импорта событий календаря, `6` — общий тип для дел, которыми управляют провайдеры. `0` — тип не определен ||
|| `crm_enum_activitystatus` | Статус дела: `1` — ожидает выполнения, `2` — выполнено, `3` — выполнено автоматически. `0` — статус не определен ||
|| `crm_enum_activitypriority` | Важность дела: `1` — низкая, `2` — средняя, `3` — высокая. `0` — не задана ||
|| `crm_enum_activitynotifytype` | Единица измерения времени для напоминания: `1` — минуты, `2` — часы, `3` — дни. `0` — напоминание не задано ||
|| `crm_enum_activitydirection` | Направление дела: `1` — входящее, `2` — исходящее. `0` — направление не определено. Актуально для звонков и писем ||
|| `crm_enum_contenttype` | Формат текста описания: `1` — простой текст, `2` — BB-коды, `3` — HTML. `0` — формат не определен ||
|| `crm_enum_ownertype` | Целочисленный идентификатор типа объекта CRM, которому принадлежит запись, — значение `entityTypeId` из таблицы [Тип объекта CRM](#object_type) ||
|#

## Структура объектов

### crm_multifield {#crm_multifield}

Методы `crm.lead.*`, `crm.contact.*` и `crm.company.*` возвращают ключи в верхнем регистре, как в таблице. В методах `crm.item.*` те же данные приходят в поле `fm` — подробнее в статье [Поля объектов CRM](./universal/object-fields.md#fm).

Запись в методах предыдущей версии — в поле, например `PHONE`, передается массив объектов:

- добавить значение — `VALUE` и `VALUE_TYPE`
- изменить — `ID`, новый `VALUE` и `VALUE_TYPE`. Без `VALUE_TYPE` тип сбросится на `WORK`, у `IM` — на `OTHER`
- удалить — `ID` и `DELETE: "Y"` или пустой `VALUE`

Примеры — на странице [crm.contact.update](./contacts/crm-contact-update.md).

В REST 3.0 телефоны, почта, сайты и мессенджеры — отдельные поля `phone`, `email`, `web` и `im`, их формат описан в разделе [Телефоны, почта, сайты и мессенджеры](./rest-v3/items/fields-contact.md#multifield).

#|
|| **Значение**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md#standart-types) | Идентификатор значения множественного поля ||
|| **TYPE_ID**
[`string`](../data-types.md#standart-types) | Тип множественного поля: `PHONE`, `EMAIL`, `WEB`, `IM` или служебный `LINK` ||
|| **VALUE**
[`string`](../data-types.md#standart-types) | Строковое значение множественного поля ||
|| **VALUE_TYPE**
[`string`](../data-types.md#standart-types) | Тип значения множественного поля. Возможные значения зависят от `TYPE_ID`:
- `PHONE` — `WORK`, `MOBILE`, `FAX`, `HOME`, `PAGER`, `MAILING`, `OTHER`
- `EMAIL` — `WORK`, `HOME`, `MAILING`, `OTHER`
- `WEB` — `WORK`, `HOME`, `FACEBOOK`, `VK`, `LIVEJOURNAL`, `TWITTER`, `OTHER`
- `IM` — `TELEGRAM`, `VK`, `FACEBOOK`, `INSTAGRAM`, `VIBER`, `BITRIX24`, `OPENLINE`, `IMOL`, `OTHER`. Устаревшие `SKYPE`, `ICQ`, `MSN`, `JABBER` доступны, только если уже используются в Битрикс24
- `LINK` — `USER`
||
|#

### crm_item_product_row {#crm_item_product_row}

Товарная позиция элемента CRM в методах [crm.item.productrow.*](./universal/product-rows/index.md) предыдущей версии. В REST 3.0 поля позиции другие, например `ownerTypeId` вместо `ownerType`, — смотрите [Поля товарной позиции](./rest-v3/product-rows/index.md#fields).

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md#standart-types) | Идентификатор товарной позиции ||
|| **ownerId**
[`integer`](../data-types.md#standart-types) | Идентификатор объекта CRM ||
|| **ownerType**
[`string`](../data-types.md#standart-types) | Краткий символьный код типа объекта CRM — значение из колонки `entityTypeAbbr` таблицы [Тип объекта CRM](#object_type). Например, `D` для сделки ||
|| **productId**
[`catalog_product.id`](../catalog/data-types.md#catalog_product) | Идентификатор товара из каталога ||
|| **productName**
[`string`](../data-types.md#standart-types) | Название товара в товарной позиции ||
|| **price**
[`double`](../data-types.md#standart-types) | Цена за единицу товарной позиции с учетом скидок и налогов ||
|| **priceAccount**
[`double`](../data-types.md#standart-types) | Цена за единицу товарной позиции с учетом скидок и налогов, сконвертированная в валюту отчетов ||
|| **priceExclusive**
[`double`](../data-types.md#standart-types) | Цена за единицу товарной позиции с учетом скидок, но без учета налогов ||
|| **priceNetto**
[`double`](../data-types.md#standart-types) | Цена за единицу товарной позиции без учета скидок и без учета налогов ||
|| **priceBrutto**
[`double`](../data-types.md#standart-types) | Цена за единицу товарной позиции с учетом налогов, но без учета скидок ||
|| **quantity**
[`double`](../data-types.md#standart-types) | Количество товара ||
|| **discountTypeId**
[`integer`](../data-types.md#standart-types) | Тип скидки.
Возможные значения:
- `1` — абсолютное значение
- `2` — процентное значение ||
|| **discountRate**
[`double`](../data-types.md#standart-types) | Значение скидки в процентах ||
|| **discountSum**
[`double`](../data-types.md#standart-types) | Абсолютное значение скидки ||
|| **taxRate**
[`double`](../data-types.md#standart-types) | Ставка налога в процентах. Возвращается `null`, если налог для позиции не задан ||
|| **taxName**
[`string`](../data-types.md#standart-types) | Название налоговой ставки. Например, `НДС 20` или `Без НДС` ||
|| **taxIncluded**
[`string`](../data-types.md#standart-types) | Индикатор того, включен ли налог в стоимость.
Возможные значения:
- `Y` — налог включен
- `N` — налог не включен ||
|| **customized**
[`string`](../data-types.md#standart-types) | Устаревшее поле. В ответе всегда `Y`, при записи игнорируется ||
|| **measureCode**
[`catalog_measure.code`](../catalog/data-types.md#catalog_measure) | Код единицы измерения ||
|| **measureName**
[`string`](../data-types.md#standart-types) | Текстовое представление единицы измерения. Например, шт, кг, м, л ||
|| **sort**
[`integer`](../data-types.md#standart-types) | Сортировка ||
|| **xmlId**
[`string`](../data-types.md#standart-types) | Внешний идентификатор товарной позиции ||
|| **type**
[`integer`](../data-types.md#standart-types) | Тип товара.
Возможные значения:
- `1` — простой товар
- `2` — комплект
- `3` — товар с торговыми предложениями
- `4` — торговое предложение
- `5` — торговое предложение, у которого нет товара: товар не указан или удален
- `6` — некорректный товар с торговыми предложениями
- `7` — услуга ||
|| **storeId**
[`integer`](../data-types.md#standart-types) | Идентификатор склада. Заполняется, только если по товарной позиции есть резерв, иначе возвращается `null`.
Поле возвращают методы [crm.item.productrow.get](./universal/product-rows/crm-item-productrow-get.md) и [crm.item.productrow.list](./universal/product-rows/crm-item-productrow-list.md) ||
|#

### crm_currency {#crm_currency}

Валюта в ответе методов [crm.currency.get](./currency/crm-currency-get.md) и [crm.currency.list](./currency/crm-currency-list.md).

#|
|| **Значение**
`тип` | **Описание** ||
|| **AMOUNT**
[`double`](../data-types.md#standart-types) | Курс обмена по отношению к базовой валюте.
Для базовой валюты всегда равен `1`. Точность — четыре знака после запятой
 ||
|| **AMOUNT_CNT**
[`integer`](../data-types.md#standart-types) | Номинал.
Для базовой валюты всегда равен `1`
 ||
|| **BASE**
[`string`](../data-types.md#standart-types) | Признак, является ли валюта базовой (`Y`/`N`) ||
|| **CURRENCY**
[`string`](../data-types.md#standart-types) | Идентификатор валюты. Соответствует стандарту ISO 4217 ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md#standart-types) | Дата последнего изменения ||
|| **SORT**
[`integer`](../data-types.md#standart-types) | Сортировка ||
|| **LID**
[`string`](../data-types.md#standart-types) | Код языка, для которого возвращаются [параметры локализации](#crm_currency_localization) ||
|| **DECIMALS**
[`integer`](../data-types.md#standart-types) | Число десятичных знаков дробной части ||
|| **DEC_POINT**
[`string`](../data-types.md#standart-types) | Десятичная точка при выводе ||
|| **FORMAT_STRING**
[`string`](../data-types.md#standart-types) | Шаблон формата ||
|| **FULL_NAME**
[`string`](../data-types.md#standart-types) | Название валюты ||
|| **THOUSANDS_SEP**
[`string`](../data-types.md#standart-types) | Разделитель триад ||
|| **LANG**
[`lang_map`](#tipy-dannyh) | Локализации валюты. Значение для каждого языка — объект [crm_currency_localization](#crm_currency_localization) ||
|#

### crm_currency_localization {#crm_currency_localization}

Параметры вывода валюты на одном языке. Управлять ими можно методами [crm.currency.localizations.*](./currency/localizations/index.md).

#|
|| **Значение**
`тип` | **Описание** ||
|| **DECIMALS**
[`integer`](../data-types.md#standart-types) | Число десятичных знаков дробной части.

Значение по умолчанию — `2` ||
|| **DEC_POINT**
[`string`](../data-types.md#standart-types) | Десятичная точка при выводе.

Значение по умолчанию — `.` (символ точки) ||
|| **FORMAT_STRING**
[`string`](../data-types.md#standart-types) | Шаблон формата. Должен содержать символ `#` — вместо него будет подставлено значение цены. При добавлении локализации поле обязательно.

Примеры шаблонов для суммы 1000:
- `$ #` — $ 1000
- `# руб.` — 1000 руб.
- `€ #` — € 1000
  ||
|| **FULL_NAME**
[`string`](../data-types.md#standart-types) | Название валюты.

Если название не задано, в поле `FULL_NAME` объекта [crm_currency](#crm_currency) возвращается код валюты ||
|| **HIDE_ZERO**
[`string`](../data-types.md#standart-types) | Признак, скрывать незначащие нули или нет (`Y`/`N`).

Значение по умолчанию — `N` ||
|| **THOUSANDS_SEP**
[`string`](../data-types.md#standart-types) | Разделитель триад.

Значение по умолчанию — ` ` (пробел) ||
|| **THOUSANDS_VARIANT**
[`string`](../data-types.md#standart-types) | Код разделителя триад.

Значение по умолчанию — `S`: при добавлении локализации его подставляет Битрикс24, если `THOUSANDS_VARIANT` не передан.

Если передать непустое значение `THOUSANDS_VARIANT`, Битрикс24 игнорирует `THOUSANDS_SEP` и подставляет разделитель по коду:
- `N` — пусто, разделитель триад отсутствует. Пример: 12345678
- `C` — запятая. Пример: 12,345,678
- `D` — точка. Пример: 12.345.678
- `S` — пробел. Пример: 12 345 678
- `B` — неразрывный пробел `&nbsp;`. Пример: 12 345 678. От предыдущего варианта отличается тем, что при переносе строк результат не разбивается на части

Если разделитель триад не нужен, передайте поле `THOUSANDS_VARIANT` со значением `N`. Пустая строка в поле `THOUSANDS_SEP` не допускается.

Свой разделитель передавайте в `THOUSANDS_SEP` только в виде HTML-кода символа, например `&#8239;` для узкого неразрывного пробела. При изменении локализации `THOUSANDS_VARIANT` не передавайте. При добавлении передайте `THOUSANDS_VARIANT` пустой строкой, иначе Битрикс24 подставит `S` и заменит разделитель пробелом ||
|#

### crm_orderentity {#crm_orderentity}

Связь элемента CRM с заказом в методах [crm.orderentity.*](./universal/order-entity/index.md).

#|
|| **Значение**
`тип` | **Описание** ||
|| **ownerId**
[`integer`](../data-types.md#standart-types) | Идентификатор объекта CRM ||
|| **ownerTypeId**
[`integer`](../data-types.md#standart-types) | Числовой идентификатор типа объекта CRM — значение из колонки `entityTypeId` таблицы [Тип объекта CRM](#object_type). Например, `2` для сделки ||
|| **orderId**
[`sale_order.id`](../sale/data-types.md#sale_order) | Идентификатор заказа ||
|#

### type {#type}

Смарт-процесс в методах [crm.type.*](./universal/user-defined-object-types/index.md). Признаки `is*` приходят значениями `Y` или `N`.

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md#standart-types)  | Идентификатор смарт-процесса ||
|| **title**
[`string`](../data-types.md#standart-types) | Название смарт-процесса ||
|| **code** 
[`string`](../data-types.md#standart-types) | Символьный код ||
|| **createdBy**
[`integer`](../data-types.md#standart-types)  | Идентификатор пользователя, который создал смарт-процесс. Только для чтения ||
|| **entityTypeId**
[`integer`](../data-types.md#standart-types)  | Числовой идентификатор типа объекта CRM, `entityTypeId`. Подробнее — в разделе [Тип объекта CRM](#object_type) ||
|| **isCategoriesEnabled**
[`boolean`](../data-types.md#standart-types)  | Включены ли свои воронки и туннели продаж ||
|| **isStagesEnabled**    
[`boolean`](../data-types.md#standart-types)  | Включено ли использование своих стадий и канбана ||
|| **isBeginCloseDatesEnabled**
[`boolean`](../data-types.md#standart-types)  | Включены ли поля **Дата начала** и **Дата завершения** ||
|| **isClientEnabled**    
[`boolean`](../data-types.md#standart-types)  | Включено ли поле **Клиент** ||
|| **isUseInUserfieldEnabled** 
[`boolean`](../data-types.md#standart-types)  | Включено ли использование смарт-процесса в пользовательском поле ||
|| **isLinkWithProductsEnabled**
[`boolean`](../data-types.md#standart-types)  | Включена ли привязка товаров каталога ||
|| **isMycompanyEnabled** 
[`boolean`](../data-types.md#standart-types)  | Включено ли поле **Реквизиты вашей компании** ||
|| **isDocumentsEnabled** 
[`boolean`](../data-types.md#standart-types)  | Включена ли печать документов ||
|| **isSourceEnabled**    
[`boolean`](../data-types.md#standart-types)  | Включены ли поля **Источник** и **Дополнительно об источнике** ||
|| **isObserversEnabled** 
[`boolean`](../data-types.md#standart-types)  | Включено ли поле **Наблюдатели** ||
|| **isRecyclebinEnabled**
[`boolean`](../data-types.md#standart-types)  | Включено ли использование корзины ||
|| **isAutomationEnabled**
[`boolean`](../data-types.md#standart-types)  | Включены ли роботы и триггеры ||
|| **isBizProcEnabled**   
[`boolean`](../data-types.md#standart-types)  | Включено ли использование дизайнера бизнес-процессов ||
|| **isSetOpenPermissions**    
[`boolean`](../data-types.md#standart-types)  | Делать ли новые воронки доступными для всех ||
|| **isRecurringEnabled**
[`boolean`](../data-types.md#standart-types) | Включено ли поле **Регулярность** ||
|| **isMultifieldsEnabled**
[`boolean`](../data-types.md#standart-types) | Включены ли поля коммуникаций: телефон, email и другие ||
|| **isStartCatalogEnabled**
[`boolean`](../data-types.md#standart-types) | Включен ли каталог запуска процессов ||
|| **isCreateByFormEnabled**
[`boolean`](../data-types.md#standart-types) | Включено ли создание элементов через CRM-форму ||
|| **startCatalogFormId**
[`integer`](../data-types.md#standart-types) | Идентификатор CRM-формы для создания элементов. Если форма не задана — `null` ||
|| **daysBeforeClose**
[`integer`](../data-types.md#standart-types) | Сколько дней с момента создания отводится элементу до завершения. Если срок не задан — `null` ||
|| **isPaymentsEnabled**  
[`boolean`](../data-types.md#standart-types)  | Включена ли возможность оплаты. Только для чтения ||
|| **isCountersEnabled**  
[`boolean`](../data-types.md#standart-types)  | Включены ли счетчики. Только для чтения ||
|| **isInitialized**
[`boolean`](../data-types.md#standart-types) | Завершено ли создание смарт-процесса. Значение `N` бывает только в первые секунды создания и во время удаления. Только для чтения ||
|| **createdTime** 
[`datetime`](../data-types.md#standart-types) | Время создания смарт-процесса. Только для чтения ||
|| **updatedTime** 
[`datetime`](../data-types.md#standart-types) | Время изменения смарт-процесса. Только для чтения ||
|| **updatedBy**
[`integer`](../data-types.md#standart-types)  | Идентификатор пользователя, который изменил смарт-процесс. Только для чтения ||
|| **relations**
[`type.relations`](#typerelations) | Связи смарт-процесса с другими типами объектов CRM ||
|| **linkedUserFields**
[`type.linkedUserFields`](#typelinkeduserfields) | Пользовательские поля других модулей, в которых можно выбрать элементы смарт-процесса ||
|| **customSections**
[`array`](../data-types.md#standart-types)    | Список всех цифровых рабочих мест

Поле устарело. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](./automated-solution/index.md) ||
|| **additionalCustomSectionIds**
[`integer[]`](../data-types.md#standart-types) | Идентификаторы дополнительных цифровых рабочих мест, в которых отображается смарт-процесс ||
|| **customSectionId**
[`integer`](../data-types.md#standart-types)  | Идентификатор цифрового рабочего места

Поле устарело. Для работы с цифровыми рабочими местами используйте методы [`crm.automatedsolution.*`](./automated-solution/index.md) ||
|#

### type.relations {#typerelations}

Связи смарт-процесса — поле `relations` объекта [type](#type).

#|
|| **Значение**
`тип` | **Описание** ||
|| **parent**
[`relation[]`](#relation) | Типы объектов CRM, которые могут быть родителями смарт-процесса ||
|| **child**
[`relation[]`](#relation) | Типы объектов CRM, для которых смарт-процесс может быть родителем ||
|#

#### relation {#relation}

Одна связь из массивов `parent` и `child`. Признаки `is*` приходят значениями `Y` или `N`.

#|
|| **Значение**
`тип` | **Описание** ||
|| **entityTypeId**     
[`integer`](../data-types.md#standart-types)  | Числовой идентификатор типа объекта CRM `entityTypeId`: системного или смарт-процесса. Значения — в разделе [Тип объекта CRM](#object_type) ||
|| **isChildrenListEnabled**
[`boolean`](../data-types.md#standart-types)  | Показывать ли список дочерних элементов в карточке родителя. При записи в [crm.type.add](./universal/user-defined-object-types/crm-type-add.md) и [crm.type.update](./universal/user-defined-object-types/crm-type-update.md) передавайте строку `"true"` или `"false"`: значения `Y` и `N` выключают список ||
|| **isPredefined**        
[`boolean`](../data-types.md#standart-types)  | Является ли данная связь предустановленной (системной) ||
|#

### type.linkedUserFields {#typelinkeduserfields}

Пользовательские поля других модулей, в которых можно выбирать элементы смарт-процесса, — поле `linkedUserFields` объекта [type](#type). Битрикс24 сохраняет его, только если у смарт-процесса включен `isUseInUserfieldEnabled`.

- Ключ — строка вида `{объект поля}|{код поля}`, например `TASKS_TASK|UF_CRM_TASK`. Это один ключ целиком, символ `|` его не делит.
- Значение в ответе — `Y`, если элементы смарт-процесса можно выбирать в этом поле, и `N`, если нельзя.

#|
|| **Значение**
`тип` | **Описание** ||
|| **CALENDAR_EVENT\|UF_CRM_CAL_EVENT**
[`boolean`](../data-types.md#standart-types) | Событие в календаре ||
|| **TASKS_TASK\|UF_CRM_TASK**
[`boolean`](../data-types.md#standart-types) | Задачи ||
|| **TASKS_TASK_TEMPLATE\|UF_CRM_TASK**
[`boolean`](../data-types.md#standart-types) | Шаблоны задач ||
|#

{% note warning "" %}

Тип `boolean` в таблице описывает ответ: `Y` или `N`. При записи в [crm.type.add](./universal/user-defined-object-types/crm-type-add.md) и [crm.type.update](./universal/user-defined-object-types/crm-type-update.md) передавайте только строку `"true"` — любое другое значение, в том числе `Y`, выключит поле.

{% endnote %}

### diskfile {#diskfile}

Файл дела, сохраненный на Диске Битрикс24. Этот тип имеют поля `FILES` и устаревшее `WEBDAV_ELEMENTS` в методах [crm.activity.*](./timeline/activities/activity-base/index.md). Поле множественное: в ответе приходит массив объектов. В REST 3.0 файлы дела приходят в поле `files` с ключами `id`, `name`, `url` и `downloadUrl`, подробнее — в разделе [Поля дела](./rest-v3/activities/index.md#fields).

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md#standart-types) | Идентификатор файла ||
|| **url**
[`string`](../data-types.md#standart-types) | Адрес для скачивания файла ||
|#

Чтобы записать значение в поле такого типа, передайте структуру загрузки файла по [правилам работы с файлами](../files/how-to-upload-files.md).

### attached_diskfile {#attached_diskfile}

Файл, прикрепленный к комментарию таймлайна, — поле `FILES` в методах [crm.timeline.comment.*](./timeline/comments/index.md).

В ответе поле приходит объектом, ключи которого — идентификаторы файлов на Диске, а значения — описания файлов:

#|
|| **Значение**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md#standart-types) | Идентификатор файла на Диске ||
|| **date**
[`datetime`](../data-types.md#standart-types) | Дата загрузки файла ||
|| **type**
[`string`](../data-types.md#standart-types) | Вид файла: `file`, `image` или `video` ||
|| **name**
[`string`](../data-types.md#standart-types) | Имя файла ||
|| **size**
[`integer`](../data-types.md#standart-types) | Размер файла в байтах ||
|| **image**
[`object`](../data-types.md#standart-types) \| [`boolean`](../data-types.md#standart-types) | Размеры изображения `{"width": ..., "height": ...}` для картинок и видео. Для остальных файлов — `false` ||
|| **authorId**
[`integer`](../data-types.md#standart-types) | Идентификатор пользователя, который загрузил файл ||
|| **authorName**
[`string`](../data-types.md#standart-types) | Имя пользователя, который загрузил файл ||
|| **urlPreview**
[`string`](../data-types.md#standart-types) | Адрес превью. Для файлов без превью — `null` ||
|| **urlShow**
[`string`](../data-types.md#standart-types) | Адрес для просмотра картинки. Для остальных файлов совпадает с `urlDownload` ||
|| **urlDownload**
[`string`](../data-types.md#standart-types) | Адрес для скачивания файла ||
|#

Пример значения поля:

```json
{
    "11051": {
        "id": 11051,
        "date": "2026-11-10T15:20:58+03:00",
        "type": "file",
        "name": "check.txt",
        "size": 5,
        "image": false,
        "authorId": 1,
        "authorName": "Иван Иванов",
        "urlPreview": null,
        "urlShow": "https://example.bitrix24.ru/disk/downloadFile/11051/?&ncc=1&filename=check.txt",
        "urlDownload": "https://example.bitrix24.ru/disk/downloadFile/11051/?&ncc=1&filename=check.txt"
    }
}
```

Значение записывается так же, как у [diskfile](#diskfile).

### crm_activity_binding {#crm_activity_binding}

Привязка дела к элементу CRM в методах `crm.activity.*` предыдущей версии. Поле множественное и доступно только для чтения. В REST 3.0 привязки приходят в поле `bindings` парами `entityTypeId` и `entityId`, подробнее — в разделе [Поля дела](./rest-v3/activities/index.md#fields).

#|
|| **Значение**
`тип` | **Описание** ||
|| **OWNER_TYPE_ID**
[`crm_enum_ownertype`](#activity-enums) | Тип объекта CRM, к которому привязано дело ||
|| **OWNER_ID**
[`integer`](../data-types.md#standart-types) | Идентификатор элемента CRM, к которому привязано дело ||
|#

## Описание поля {#crm_rest_field_description}

Структура `crm_rest_field_description` — описание одного поля в ответе методов получения полей, например [crm.item.fields](./universal/crm-item-fields.md) или [crm.deal.fields](./deals/crm-deal-fields.md). Ответ — объект, где ключ — код поля, а значение — описание в этом формате. Признаки `is*` приходят JSON-значениями `true` или `false`. В REST 3.0 описание поля устроено иначе, его формат — на странице [crm.<тип>.field.list](./rest-v3/fields/crm-entity-field-list-rest-v3.md#item).

#|
|| **Значение**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md#standart-types) | Тип поля: базовый тип, тип CRM из этого справочника или тип пользовательского поля ||
|| **isRequired**
[`boolean`](../data-types.md#standart-types) | Является ли поле обязательным ||
|| **isReadOnly**
[`boolean`](../data-types.md#standart-types) | Доступно ли поле только для чтения. Значение такого поля нельзя передать при создании и изменении ||
|| **isImmutable**
[`boolean`](../data-types.md#standart-types) | Можно ли заполнить поле только при создании элемента. Изменить значение потом нельзя ||
|| **isMultiple**
[`boolean`](../data-types.md#standart-types) | Является ли поле множественным. Значения множественного поля передаются массивом ||
|| **isDynamic**
[`boolean`](../data-types.md#standart-types) | Является ли поле пользовательским ||
|| **isDeprecated**
[`boolean`](../data-types.md#standart-types) | Признак устаревшего поля. Приходит только у устаревших полей со значением `true` ||
|| **title**
[`string`](../data-types.md#standart-types) | Название поля. В методах отдельных объектов, например `crm.deal.fields`, у пользовательских полей здесь код поля, а название — в `formLabel` ||
|| **upperName**
[`string`](../data-types.md#standart-types) | Код поля в верхнем регистре. Возвращают универсальные методы `crm.item.fields`, `crm.type.fields`, `crm.category.fields`. В методах отдельных объектов, например `crm.deal.fields` и `crm.lead.fields`, ключа нет ||
|| **statusType**
[`string`](../data-types.md#standart-types) | Код справочника, из которого берутся значения поля. Приходит у полей типа `crm_status` ||
|| **items**
[`array`](../data-types.md#standart-types) | Варианты значений. Приходит у пользовательских полей типа `enumeration` ||
|| **settings**
[`object`](../data-types.md#standart-types) | Настройки поля. Состав зависит от типа поля ||
|| **listLabel**
[`string`](../data-types.md#standart-types) | Название пользовательского поля в списке ||
|| **formLabel**
[`string`](../data-types.md#standart-types) | Название пользовательского поля в карточке ||
|| **filterLabel**
[`string`](../data-types.md#standart-types) | Название пользовательского поля в фильтре ||
|#

## Тип объекта CRM {#object_type}

Тип объекта CRM задается в разных методах в одном из четырех форматов:

- `entityTypeId` — например, в методах `crm.item.*`, в привязках дел и в связях смарт-процессов
- `entityTypeName` — например, в поле `ENTITY_TYPE` методов [crm.timeline.comment.*](./timeline/comments/index.md). В ответе значение приходит в нижнем регистре, при записи регистр не важен
- `entityTypeAbbr` — в значениях полей привязки к нескольким типам и в `ownerType` товарных позиций
- `userFieldEntityId` — в методах пользовательских полей

#|
|| **Тип объекта** | **Числовой идентификатор типа**
`entityTypeId` | **Символьный код типа**
`entityTypeName` | **Краткий символьный код типа**
`entityTypeAbbr` | **Тип объекта пользовательского поля**
`userFieldEntityId` ||
|| Лид | 1 | LEAD | L | CRM_LEAD ||
|| Сделка | 2 | DEAL | D | CRM_DEAL ||
|| Контакт | 3 | CONTACT | C | CRM_CONTACT ||
|| Компания | 4 | COMPANY | CO | CRM_COMPANY ||
|| Счет (старый) | 5 | INVOICE | I | CRM_INVOICE ||
|| Счет (новый) | 31 | SMART_INVOICE | SI | CRM_SMART_INVOICE ||
|| Коммерческое предложение | 7 | QUOTE | Q | CRM_QUOTE ||
|| Реквизит | 8 | REQUISITE | RQ | CRM_REQUISITE ||
|| Заказ | 14 | ORDER | O | ORDER ||
|| Документ | 36 | SMART_DOCUMENT | DO | CRM_SMART_DOCUMENT ||
|| Документ компании | 39 | SMART_B2E_DOC | SBD | CRM_SMART_B2E_DOC ||
|| Смарт-процесс | `{entityTypeId}`, например `128` | `DYNAMIC_{entityTypeId}`, например `DYNAMIC_128` | `T` + `entityTypeId` в шестнадцатеричной записи в нижнем регистре, например `T80` или `Tb1` | `CRM_` + `id` объекта [type](#type), не `entityTypeId`, например `CRM_1` ||
|#

У смарт-процесса `id` и `entityTypeId` — разные значения, подробнее — в разделе [Идентификаторы смарт-процессов](./universal/user-defined-object-types/index.md#id). Список типов объектов вместе со смарт-процессами возвращает метод [crm.enum.ownertype](./auxiliary/enum/crm-enum-owner-type.md). В REST 3.0 системные типы объектов возвращает метод [crm.dictionary.entitytype.list](./rest-v3/dictionaries/crm-dictionary-list-rest-v3.md), смарт-процессов в его ответе нет — их возвращает [crm.type.list](./universal/user-defined-object-types/crm-type-list.md).

{% note warning "" %}

Для новых интеграций используйте «Счет (новый)» с `entityTypeId = 31` (`SMART_INVOICE`). Тип `INVOICE` с `entityTypeId = 5` оставлен для совместимости со старым функционалом счетов и в новых проектах не рекомендуется.

{% endnote %}

## Значение пользовательского поля «Привязка к элементам CRM» {#crm-binding-format}

Формат значения поля типа `crm` зависит от версии API и от настроек поля. Настройки приходят в ключе `settings` описания поля: типы со значением `Y` разрешены.

Поле поддерживает привязку к лидам, сделкам, контактам, компаниям, заказам, коммерческим предложениям, новым счетам и смарт-процессам. Старые счета `I` выбрать в нем нельзя.

### В REST 3.0 {#crm-binding-format-v3}

Поле передается по имени `UF_CRM_…`. Значение зависит от того, к скольким типам разрешена привязка:

- к одному типу — числовой идентификатор элемента, например `107`
- к нескольким типам — объект с ключами `entityTypeId` и `entityId`, например `{"entityTypeId": 4, "entityId": 31}`

Множественное поле принимает и возвращает массив таких значений: `[107, 31]` или `[{"entityTypeId": 3, "entityId": 2571}, {"entityTypeId": 4, "entityId": 31}]`. Строки с префиксом, например `C_2571`, REST 3.0 не принимает.

### В предыдущей версии {#crm-binding-format-previous}

Формат значения поля типа `crm` зависит от того, к скольким типам объектов разрешена привязка:

- Привязка разрешена к одному типу — значение содержит только идентификатор элемента без префикса. В ответе он приходит строкой, например `"107"`.
- Привязка разрешена к нескольким типам — значение имеет формат `{PREFIX}_{ID}`, где `PREFIX` — краткий символьный код типа `entityTypeAbbr` из таблицы [Тип объекта CRM](#object_type), `ID` — числовой идентификатор элемента. У смарт-процесса `entityTypeId = 177` → `b1` → `PREFIX` `Tb1`.

Примеры значений с префиксом:

#|
|| **Тип объекта** | **Пример значения** ||
|| Лид | `L_4` ||
|| Сделка | `D_1` ||
|| Контакт | `C_2` ||
|| Компания | `CO_3` ||
|| Счет (новый) | `SI_7` ||
|| Смарт-процесс | `T80_6` ||
|#

Если поле множественное (`isMultiple: true`), значения передаются массивом строк в том же формате:

```json
["C_123", "CO_456"]
```

или, если разрешен один тип:

```json
["107", "31"]
```

## Значение пользовательского поля «Адрес» {#crm_user_field_address}

### В REST 3.0 {#crm-address-format-v3}

Значение передается и приходит объектом с ключами `address`, `latitude` и `longitude`:

```json
{"address": "Москва, Тверская улица, 1", "latitude": 55.75, "longitude": 37.61}
```

### В предыдущей версии {#crm-address-format-previous}

Пользовательское поле типа `address` хранит адрес одной строкой из трех частей, разделенных символом `|`:

```text
{адрес}|{широта};{долгота}|{идентификатор адреса}
```

- `{адрес}` — адрес текстом
- `{широта};{долгота}` — координаты через точку с запятой. Если координат нет, на их месте остается `;`
- `{идентификатор адреса}` — идентификатор адреса в модуле местоположений Битрикс24. Может отсутствовать, если значение записано с координатами

Пример значения в ответе:

```text
Монастырская улица, 14А, Пермь, Пермский край, Россия, 614096|58.0152188;56.228395549256|453
```

При записи передайте строку в формате `{адрес}|{широта};{долгота}` — она сохранится как есть, без идентификатора. Если передать только текст адреса, Битрикс24 создаст адрес в модуле местоположений и сам добавит пустые координаты и идентификатор: `{адрес}|;|{идентификатор адреса}`.

Адреса реквизитов устроены иначе: они хранятся по отдельным полям — улица, город, индекс и другие. Их описание — в статье [Об адресах](./requisites/addresses/index.md).

## Идентификаторы языков для Битрикс24 {#lang-ids}

Идентификатор языка — строка из двух латинских букв. Набор языков зависит от Битрикс24: в ключах локализаций приходят установленные языки. В таблице — языки, которые встречаются чаще всего.

#|
|| **Идентификатор языка** | **Язык** ||
|| `ar` | Арабский ||
|| `br` | Португальский (Бразилия) ||
|| `de` | Немецкий ||
|| `en` | Английский ||
|| `fr` | Французский ||
|| `hi` | Хинди ||
|| `id` | Индонезийский ||
|| `it` | Итальянский ||
|| `ja` | Японский ||
|| `kz` | Казахский ||
|| `la` | Испанский ||
|| `ms` | Малайский ||
|| `pl` | Польский ||
|| `ru` | Русский ||
|| `sc` | Китайский ||
|| `tc` | Китайский (Тайвань) ||
|| `th` | Тайский ||
|| `tr` | Турецкий ||
|| `ua` | Украинский ||
|| `uz` | Узбекский ||
|| `vn` | Вьетнамский ||
|#

## Продолжите изучение

- [{#T}](../rest-v3.md)
- [{#T}](./rest-v3/fields/crm-entity-field-list-rest-v3.md)
- [{#T}](../data-types.md#standart-types)
- [{#T}](./migration.md)
- [{#T}](./universal/object-fields.md)
- [{#T}](./universal/crm-item-fields.md)
- [{#T}](./universal/user-defined-fields/crm-userfield-types.md)
- [{#T}](./auxiliary/enum/crm-enum-owner-type.md)
