# Получить список счетов crm.invoice.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод возвращает список счетов. Является реализацией списочного метода для счетов.

При выборке используйте маски:

- "*" — для выборки всех полей (без пользовательских)
- "UF_*" — для выборки всех пользовательских полей.

Свойства и товарные позиции счета метод не возвращает.
Для получения свойств и товарных позиций нужно использовать метод [crm.invoice.get](./crm-invoice-get.md).

## Параметры метода

См. описание [списочных методов](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
 | Фильтр записей. По умолчанию отдаются все записи, без фильтрации ||
|| **order**
 | Сортировка записей. Поддерживается сортировка по тем же полям, что и в фильтре ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример выводит данные в консоль. Если нужно вывести данные по-другому, то реализуйте свою обработку данных, возвращенных вызовами `result.data()` и `result.error()`.

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"DATE_INSERT":"ASC"},"filter":{">PRICE":100},"select":["ID","ACCOUNT_NUMBER","ORDER_TOPIC","DATE_INSERT","STATUS_ID","PRICE","CURRENCY_ID"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.invoice.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"DATE_INSERT":"ASC"},"filter":{">PRICE":100},"select":["ID","ACCOUNT_NUMBER","ORDER_TOPIC","DATE_INSERT","STATUS_ID","PRICE","CURRENCY_ID"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.invoice.list',
        {
          "order": { "DATE_INSERT": "ASC" },
          "filter": { ">PRICE": 100 },
          "select": [ "ID", "ACCOUNT_NUMBER", "ORDER_TOPIC", "DATE_INSERT", "STATUS_ID", "PRICE", "CURRENCY_ID" ]
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.invoice.list', { "order": { "DATE_INSERT": "ASC" }, "filter": { ">PRICE": 100 }, "select": [ "ID", "ACCOUNT_NUMBER", "ORDER_TOPIC", "DATE_INSERT", "STATUS_ID", "PRICE", "CURRENCY_ID" ] }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.invoice.list', { "order": { "DATE_INSERT": "ASC" }, "filter": { ">PRICE": 100 }, "select": [ "ID", "ACCOUNT_NUMBER", "ORDER_TOPIC", "DATE_INSERT", "STATUS_ID", "PRICE", "CURRENCY_ID" ] }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.invoice.list',
                [
                    'order' => ['DATE_INSERT' => 'ASC'],
                    'filter' => ['>PRICE' => 100],
                    'select' => ['ID', 'ACCOUNT_NUMBER', 'ORDER_TOPIC', 'DATE_INSERT', 'STATUS_ID', 'PRICE', 'CURRENCY_ID'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
            if ($result->more()) {
                $result->next();
            }
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching invoice list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.invoice.list",
        {
            "order": { "DATE_INSERT": "ASC" },
            "filter": { ">PRICE": 100 },
            "select": [ "ID", "ACCOUNT_NUMBER", "ORDER_TOPIC", "DATE_INSERT", "STATUS_ID", "PRICE", "CURRENCY_ID" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.invoice.list',
        [
            'order' => ['DATE_INSERT' => 'ASC'],
            'filter' => ['>PRICE' => 100],
            'select' => ['ID', 'ACCOUNT_NUMBER', 'ORDER_TOPIC', 'DATE_INSERT', 'STATUS_ID', 'PRICE', 'CURRENCY_ID']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Поля, возвращаемые методом

#|
|| **Поле** / **Тип** | **Описание** | **Примечание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор | Только для чтения ||
|| **ACCOUNT_NUMBER**
[`string`](../../../data-types.md) | Номер | Обязательное ||
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
|| **IS_RECURRING**
[`char`](../../../data-types.md) | Флаг шаблона регулярной сделки | ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код | ||
|| **ORDER_TOPIC**
[`string`](../../../data-types.md) | Тема | Обязательное ||
|| **PAY_SYSTEM_ID**
[`integer`](../../../data-types.md) | Идентификатор печатной формы | Обязательное ||
|| **PAY_VOUCHER_DATE**
[`date`](../../../data-types.md) | Дата оплаты | Указывается, если счёт оплачен ||
|| **PAY_VOUCHER_NUM**
[`string`](../../../data-types.md) | Номер документа оплаты | Указывается, если счёт оплачен ||
|| **PAYED**
[`char`](../../../data-types.md) | Признак оплаченности | Только для чтения ||
|| **PERSON_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа плательщика | Обязательное ||
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
|| **UF_QUOTE_ID**
[`integer`](../../../data-types.md) | Идентификатор связанного коммерческого предложения | ||
|| **USER_DESCRIPTION**
[`string`](../../../data-types.md) | Комментарий | ||
|#