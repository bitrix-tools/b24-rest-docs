# Получить описание полей компании crm.company.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы
- не хватает описания у некоторых полей

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.fields` возвращает описание [полей компании](./crm-company-add.md), в том числе [пользовательских](./userfields/crm-company-userfield-add.md).

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.company.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching company fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.fields",
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
|| **Поле** | **Описание** | **Примечание** ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес компании | ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая страница адреса | В некоторых странах принято разбивать адрес на 2 части ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город | ||
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна | ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны | ||
|| **ADDRESS_LEGAL**
[`string`](../../data-types.md) | | ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс | ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область | ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район | ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Связано с пользователем по ID | ||
|| **BANKING_DETAILS**
[`string`](../../data-types.md) | Банковские реквизиты | ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарии | ||
|| **COMPANY_TYPE**
[`crm_status`](../../data-types.md) | Тип компании | ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создана | Только для чтения ||
|| **CURRENCY_ID**
[`crm_currency`](../../data-types.md) | Валюта | ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания | Только для чтения ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения | Только для чтения ||
|| **EMAIL**
[`crm_multifield`](../../data-types.md) | Адрес электронной почты | Множественное ||
|| **EMPLOYEES**
[`crm_status`](../../data-types.md) | Количество сотрудников | ||
|| **HAS_EMAIL**
[`char`](../../data-types.md) | Проверка заполненности поля электронной почты | Только для чтения ||
|| **HAS_PHONE**
[`char`](../../data-types.md) | Проверка заполненности поля телефона | Только для чтения ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор компании | Только для чтения ||
|| **IM**
[`crm_multifield`](../../data-types.md) | Мессенджеры | Множественное ||
|| **INDUSTRY**
[`crm_status`](../../data-types.md) | Сфера деятельности | ||
|| **IS_MY_COMPANY**
[`char`](../../data-types.md) | | ||
|| **LEAD_ID**
[`crm_lead`](../../data-types.md) | Идентификатор лида, связанного с компанией | Только для чтения ||
|| **LOGO**
[`file`](../../data-types.md) | Логотип | ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Идентификатор автора последнего изменения | Только для чтения ||
|| **OPENED**
[`char`](../../data-types.md) | Доступен для всех | ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных | Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных | Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Оригинальная версия | Используется для защиты данных от случайного перетирания внешней системой. Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **PHONE**
[`crm_multifield`](../../data-types.md) | Телефон компании | Множественное ||
|| **REG_ADDRESS**
[`string`](../../data-types.md) | Юридический адрес компании | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_2**
[`string`](../../data-types.md) | Вторая страница юридического адреса | В некоторых странах принято разбивать адрес на 2 части. Устарел, используется для совместимости. ||
|| **REG_ADDRESS_CITY**
[`string`](../../data-types.md) | Город юридического адреса | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна юридического адреса | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны юридического адреса | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_LEGAL**
[`string`](../../data-types.md) | | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс юридического адреса | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область юридического адреса | Устарел, используется для совместимости. ||
|| **REG_ADDRESS_REGION**
[`string`](../../data-types.md) | Район юридического адреса | Устарел, используется для совместимости. ||
|| **REVENUE**
[`double`](../../data-types.md) | Годовой оборот | ||
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
|| **WEB**
[`crm_multifield`](../../data-types.md) | URL ресурсов компании | Множественное ||
|#