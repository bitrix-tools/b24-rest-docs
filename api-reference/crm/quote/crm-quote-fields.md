# Получить поля коммерческого предложения crm.quote.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.fields` возвращает описание полей [коммерческого предложения](./crm-quote-add.md), в том числе [пользовательских](./user-field/crm-quote-user-field-add.md).

Без параметров.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.quote.fields",
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Поля

#|
|| **Поле** / **Тип** | **Описание** | **Примечание** ||
|| **ASSIGNED_BY_ID** 
[`user`](../../data-types.md) | Связано с пользователем по ID | ||
|| **BEGINDATA** 
[`date`](../../data-types.md) | Дата выставления | ||
|| **CLIENT_ADDR** 
[`string`](../../data-types.md) | Адрес контакта | ||
|| **CLIENT_CONTACT** 
[`string`](../../data-types.md) | Контакт | Устаревший. Сохраняется для совместимости. ||
|| **CLIENT_EMAIL** 
[`string`](../../data-types.md) | Адрес электронной почты контакта | Устаревший. Сохраняется для совместимости. ||
|| **CLIENT_PHONE** 
[`char`](../../data-types.md) | Проверка заполненности поля телефон | Только для чтения. Устаревший. Сохраняется для совместимости. ||
|| **CLIENT_TITLE** 
[`string`](../../data-types.md) | Название клиента | Устаревший. Сохраняется для совместимости. ||
|| **CLIENT_TPA_ID** 
[`string`](../../data-types.md) | КПП клиента | Устаревший. Сохраняется для совместимости. ||
|| **CLIENT_TP_ID** 
[`string`](../../data-types.md) | ИНН клиента | Устаревший. Сохраняется для совместимости. ||
|| **CLOSED** 
[`char`](../../data-types.md) | Завершено | ||
|| **CLOSEDATA** 
[`date`](../../data-types.md) | Дата завершения | ||
|| **COMMENTS** 
[`string`](../../data-types.md) | Комментарий менеджера | ||
|| **COMPANY_ID** 
[`crm_company`](../../data-types.md) | Привязка к компании | ||
|| **CONTACT_ID** 
[`crm_contact`](../../data-types.md) | Привязка к контакту | Устаревший. Сохраняется для совместимости. ||
|| **CONTACT_IDS** 
[`crm_contact`](../../data-types.md) | Привязка к нескольким контактам | Множественное ||
|| **CONTENT** 
[`string`](../../data-types.md) | Содержание предложения | ||
|| **CREATED_BY_ID** 
[`user`](../../data-types.md) | Кем создана | Только для чтения ||
|| **CURRENCY_ID** 
[`crm_currency`](../../data-types.md) | Валюта предложения | ||
|| **DATE_CREATE** 
[`datetime`](../../data-types.md) | Дата создания | Только для чтения ||
|| **DATE_MODIFY** 
[`datetime`](../../data-types.md) | Дата изменения | Только для чтения ||
|| **DEAL_ID** 
[`crm_deal`](../../data-types.md) | Сделка, привязанная к предложению | ||
|| **ID** 
[`integer`](../../data-types.md) | Идентификатор предложения | Только для чтения ||
|| **LEAD_ID** 
[`crm_lead`](../../data-types.md) | Лид, привязанное к предложению | ||
|| **LOCATION_ID** 
[`location`](../../data-types.md) | Месторасположение | ||
|| **MODIFY_BY_ID** 
[`user`](../../data-types.md) | Идентификатор автора последнего изменения | Только для чтения ||
|| **MYCOMPANY_ID** 
[`crm_company`](../../data-types.md) | Идентификатор компании, от которой делается предложение | ||
|| **OPENED** 
[`char`](../../data-types.md) | Доступен для всех | ||
|| **OPPORTUNITY** 
[`double`](../../data-types.md) | Сумма | ||
|| **PERSON_TYPE_ID** 
[`integer`](../../data-types.md) | Идентификатор типа плательщика | ||
|| **QUOTE_NUMBER** 
[`string`](../../data-types.md) | Номер предложения | Только для чтения ||
|| **STATUS_ID** 
[`crm_status`](../../data-types.md) | Статус | Статус из справочника ||
|| **TAX_VALUE** 
[`double`](../../data-types.md) | Сумма | ||
|| **TERMS** 
[`string`](../../data-types.md) | Условия | ||
|| **TITLE** 
[`string`](../../data-types.md) | Название | Обязательное ||
|| **UTM_CAMPAIGN** 
[`string`](../../data-types.md) | Обозначение рекламной кампании | ||
|| **UTM_CONTENT** 
[`string`](../../data-types.md) | Содержание кампании | Например, для контекстных объявлений. ||
|| **UTM_MEDIUM** 
[`string`](../../data-types.md) | Тип трафика | CPC (объявления), CPM (баннеры) ||
|| **UTM_SOURCE** 
[`string`](../../data-types.md) | Рекламная система | Yandex-Direct, Google-Adwords и другие. ||
|| **UTM_TERM** 
[`string`](../../data-types.md) | Условие поиска кампании | Например, ключевые слова контекстной рекламы. ||
|#