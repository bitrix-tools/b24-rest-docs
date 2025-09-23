# Получить поля счета и входящих в него товаров crm.invoice.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод возвращает описание полей [счета](./crm-invoice-add.md), в том числе [пользовательских](./crm-invoice-user-field-add.md).

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.invoice.fields
   ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.invoice.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
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
                'crm.invoice.fields',
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
        echo 'Error fetching invoice fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.invoice.fields",
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.invoice.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Возвращаемые данные

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** | **Примечание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор | Только для чтения ||
|| **ACCOUNT_NUMBER***
[`string`](../../../data-types.md) | Номер |  ||
|| **COMMENTS**
[`text`](../../../data-types.md) | Комментарий менеджера | ||
|| **CREATED_BY**
[`integer`](../../../data-types.md) | Создано пользователем | Только для чтения ||
|| **CURRENCY**
[`crm_currency`](../../../data-types.md) | Идентификатор валюты | Только для чтения ||
|| **DATE_BILL**
[`date`](../../../data-types.md) | Дата выставления | ||
|| **DATE_INSERT**
[`datetime`](../../../data-types.md) | Дата создания | ||
|| **DATE_MARKED**
[`datetime`](../../../data-types.md) | Дата отклонения | Указывается, если счёт отклонён ||
|| **DATE_PAY_BEFORE**
[`date`](../../../data-types.md) | Срок оплаты | ||
|| **DATE_PAYED**
[`datetime`](../../../data-types.md) | Дата перевода в состояние оплаты | Только для чтения ||
|| **DATE_STATUS**
[`datetime`](../../../data-types.md) | Дата изменения статуса | Только для чтения ||
|| **DATE_UPDATE**
[`datetime`](../../../data-types.md) | Дата изменения | Только для чтения ||
|| **EMP_PAYED_ID**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним перевёл счёт в состояние "оплачен" | Только для чтения ||
|| **EMP_STATUS_ID**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним поменял статус счёта | Только для чтения ||
|| **LID**
[`integer`](../../../data-types.md) | Идентификатор сайта | Только для чтения ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код | ||
|| **ORDER_TOPIC***
[`string`](../../../data-types.md) | Тема |  ||
|| **PAY_SYSTEM_ID***
[`integer`](../../../data-types.md) | Идентификатор печатной формы |  ||
|| **PAY_VOUCHER_DATE**
[`date`](../../../data-types.md) | Дата оплаты | Указывается, если счёт оплачен ||
|| **PAY_VOUCHER_NUM**
[`string`](../../../data-types.md) | Номер документа оплаты | Указывается, если счёт оплачен ||
|| **PAYED**
[`char`](../../../data-types.md) | Признак оплаченности | Только для чтения ||
|| **PERSON_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа плательщика |  ||
|| **PRICE**
[`double`](../../../data-types.md) | Сумма | Только для чтения ||
|| **REASON_MARKED**
[`string`](../../../data-types.md) | Комментарий статуса | Указывается, если счёт оплачен или отклонён ||
|| **RESPONSIBLE_EMAIL**
[`string`](../../../data-types.md) | E-mail ответственного | Только для чтения ||
|| **RESPONSIBLE_ID**
[`integer`](../../../data-types.md) | Идентификатор ответственного | ||
|| **RESPONSIBLE_LAST_NAME**
[`string`](../../../data-types.md) | Фамилия ответственного | Только для чтения ||
|| **RESPONSIBLE_LOGIN**
[`string`](../../../data-types.md) | Логин ответственного | Только для чтения ||
|| **RESPONSIBLE_NAME**
[`string`](../../../data-types.md) | Имя ответственного | Только для чтения ||
|| **RESPONSIBLE_PERSONAL_PHOTO**
[`integer`](../../../data-types.md) | Идентификатор фото ответственного | Только для чтения ||
|| **RESPONSIBLE_SECOND_NAME**
[`string`](../../../data-types.md) | Отчество ответственного | Только для чтения ||
|| **RESPONSIBLE_WORK_POSITION**
[`string`](../../../data-types.md) | Должность ответственного | Только для чтения ||
|| **STATUS_ID**
[`crm_status`](../../../data-types.md) | Идентификатор статуса | Идентификатор справочника "INVOICE_STATUS" ||
|| **TAX_VALUE**
[`double`](../../../data-types.md) | Сумма налога | Только для чтения ||
|| **UF_COMPANY_ID**
[`integer`](../../../data-types.md) | Идентификатор компании | Указывается, если плательщик "Юридическое лицо" ||
|| **UF_CONTACT_ID**
[`integer`](../../../data-types.md) | Идентификатор контакта | Указывается, если плательщик "Физическое лицо", либо в качестве контактного лица компании ||
|| **UF_MYCOMPANY_ID**
[`integer`](../../../data-types.md) | Идентификатор своей компании | Указывается в качестве компании с реквизитами счёта (привязка к реквизитам устанавливается отдельно) ||
|| **UF_DEAL_ID**
[`integer`](../../../data-types.md) | Идентификатор связанной сделки | ||
|| **USER_DESCRIPTION**
[`string`](../../../data-types.md) | Комментарий | ||
|| **PR_LOCATION**
[`integer`](../../../data-types.md) | Идентификатор местоположения | Обязательное, если используется режим налога на документ ||
|| **INVOICE_PROPERTIES**
[`array`](../../../data-types.md) | Список свойств | Если клиент - компания, могут быть указаны ключи (все значения типа string): 
- **COMPANY** - Название компании;
- **COMPANY_ADR** - Адрес;
- **CONTACT_PERSON** - Контактное лицо;
- **EMAIL** - E-mail;
- **PHONE** - Телефон;
- **INN** - ИНН;
- **KPP** - КПП.

Если клиент - контакт: 
- **FIO** - Ф.И.О.;
- **ADDRESS** - Адрес;
- **EMAIL** - E-mail; 
- **PHONE** - Телефон. ||
|| **PRODUCT_ROWS**
[`array`](../../../data-types.md) | Список товарных позиций | Поля товарной позиции:
- **ID** - Идентификатор (integer), для новой записи указывать 0;
- **PRICE** - Цена (double);
- **DISCOUNT_PRICE** - Скидка на единицу товара (double);
- **PRODUCT_ID** - Идентификатор товара в каталоге (integer), 0 - если не из каталога;
- **PRODUCT_NAME** - Наименование товарной позиции (string);
- **VAT_RATE** - Коэффициент ставки НДС (double);
- **VAT_INCLUDED** - НДС включён в цену ('Y' или 'N') (char);
- **MEASURE_CODE** - Код единицы измерения (integer);
- **MEASURE_NAME** - Условное обозначение единицы измерения (string);
- **CATALOG_XML_ID** - Внешний код каталога (string), только для чтения;
- **PRODUCT_XML_ID** - Внешний код товарной позиции (string), совпадает с внешним кодом товара, если он из каталога. Только для чтения.
- **QUANTITY** - Количество. ||
|#
