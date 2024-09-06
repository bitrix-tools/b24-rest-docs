# Получить поля сделки crm.deal.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на ещё не созданные страницы

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.fields` возвращает описание [полей сделки](./crm-deal-add.md), в том числе [пользовательских](./user-defined-fields/crm-deal-userfield-add.md).

Без параметров.

## Пример

```js
BX24.callMethod(
    "crm.deal.fields",
    {},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Возвращаемые данные

#|
|| **Поле** / **Тип** | **Описание** ||
|| **ADDITIONAL_INFO**
[`string`](../../data-types.md) | Дополнительная информация. ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Связано с пользователем по ID. ||
|| **BANK_DETAIL_ID**
[`integer`](../../data-types.md) | ID банковского реквизита. Принимается, но не возвращается. Параметр подаётся на функцию [crm.requisite.link.register](.) автоматически при успешном добавлении/обновлении сделки с идентификатором этой сделки. ||
|| **BEGINDATE**
[`date`](../../data-types.md) | Дата начала. ||
|| **CATEGORY_ID**
[`crm_category`](../../data-types.md) | Идентификатор направления. Неизменяемое. Если не передавать это поле при создании сделки, то сделка создастся в общем направлении.. ||
|| **CLOSED**
[`char`](../../data-types.md) | Завершена. ||
|| **CLOSEDATE**
[`date`](../../data-types.md) | Дата завершения. ||
|| **COMMENTS**
[`string`](../../data-types.md) | Коментарии. ||
|| **COMPANY_ID**
[`crm_company`](../../data-types.md) | Идентификатор привязанной компании. ||
|| **CONTACT_ID**
[`crm_contact`](../../data-types.md) | Идентификатор привязанного контакта. Устаревший. Сохраняется для совместимости. ||
|| **CONTACT_IDS**
[`crm_contact`](../../data-types.md) | Идентификатор привязанного контакта |  | Множественный. При использовании [crm.deal.update](./crm-deal-update.md) и [crm.deal.add](./crm-deal-add.md) можно подать массив контактов. В методах [crm.deal.list](./crm-deal-list.md) и [crm.deal.get](./crm-deal-get.md) поля нет и необходимо использовать [crm.deal.contact.items.get](./contacts/crm-deal-contact-items-get.md) для получения списка контактов. Для очистки поля используйте [crm.deal.contact.items.delete](./contacts/crm-deal-contact-items-delete.md), для замены значения используйте [crm.deal.contact.items.set](./contacts/crm-deal-contact-items-set.md). ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Создано пользователем. Только для чтения ||
|| **CURRENCY_ID**
[`crm_currency`](../../data-types.md) | Идентификатор валюты сделки. ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания. Только для чтения ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения. Только для чтения ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор сделки. Только для чтения ||
|| **IS_NEW**
[`char`](../../data-types.md) | Флаг новой сделки (т. е. сделка в первой стадии). ||
|| **IS_RECURRING**
[`char`](../../data-types.md) | Флаг шаблона регулярной сделки (если стоит Y, то это не сделка, а шаблон). ||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Признак повторного лида. ||
|| **LEAD_ID**
[`crm_lead`](../../data-types.md) | Идентификатор привязанного лида. Только для чтения. ||
|| **LOCATION_ID**
[`location`](../../data-types.md) | Местоположение клиента. Служебный, не рекомендуется к использованию. ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Идентификатор автора последнего изменения. Только для чтения. ||
|| **MOVED_BY_ID**
[`user`](../../data-types.md) | Идентификатор автора перемещения элемента на текущую стадию. Только для чтения. ||
|| **MOVED_TIME**
[`datetime`](../../data-types.md) | Дата перемещения элемента на текущую стадию. Только для чтения. ||
|| **OPENED**
[`char`](../../data-types.md) | Доступен для всех. ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Сумма. ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику. ||
|| **PROBABILITY**
[`integer`](../../data-types.md) | Вероятность. ||
|| **QUOTE_ID**
[`crm_quote`](../../data-types.md) | Идентификатор квоты. Только для чтения. Устаревший, использовать метод [crm.quote.list](.) с фильром по сделке. ||
|| **REQUISITE_ID** | Идентификатор реквизита. Принимается, но не возвращается. Параметр подаётся на функцию [crm.requisite.link.register](.) автоматически при успешном добавлении/обновлении сделки с идентификатором этой сделки. ||
|| **STAGE_ID**
[`crm_status`](../../data-types.md) | Идентификатор стадии.

```
 NEW // новая сделка 
 PREPARATION // подготовка бумаг 
 PREPAYMENT_INVOICE // отправка счёта 
 EXECUTING // в процессе выполнения 
 FINAL_INVOICE // финальный счёт 
```

  (P - значение у STAGE_SEMANTIC_ID) 


```
  WON // выиграна 
```

  (S - значение у STAGE_SEMANTIC_ID) 


```
  >LOSE // проиграна, анализ причин не требуется 
  APOLOGY // проиграна, требуется анализ причин 
```


  (F - значение у STAGE_SEMANTIC_ID) ||
|| **STAGE_SEMANTIC_ID**
[`string`](../../data-types.md) | Имя. Только для чтения, которое в некотором смысле обобщает значения идентификатора сделки STAGE_ID. (Значения смотри выше.) ||
|| **SOURCE_ID**
[`string`](../../data-types.md) | Идентификатор источника. Определяет источник сделки (обратный звонок, реклама, электронная почта итд). Список возможных идентификаторов можно вытащить рест методом [crm.status.list](.) с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике. Текстовое поле. ||
|| **TAX_VALUE**
[`double`](../../data-types.md) | Ставка налога. ||
|| **TITLE**^*^
[`string`](../../data-types.md) | Название. ||
|| **TYPE_ID**
[`crm_status`](../../data-types.md) | Тип сделки. Используется только для привязки к внешнему источнику. ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании. ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений. ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. CPC (объявления), CPM (баннеры) ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие. ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}