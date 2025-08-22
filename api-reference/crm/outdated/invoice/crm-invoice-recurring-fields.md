# Получить полня шаблона регулярного счета crm.invoice.recurring.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод возвращает список полей шаблона регулярного счета c описанием.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.invoice.recurring.fields
   ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.recurring.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.invoice.recurring.fields',
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
                'crm.invoice.recurring.fields',
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
        echo 'Error fetching recurring invoice fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.invoice.recurring.fields",
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
        'crm.invoice.recurring.fields',
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
|| **Поле** / **Тип** | **Описание** | **Примечание**||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор записи в таблице настроек регулярного счета | Только для чтения ||
|| **INVOICE_ID**
[`integer`](../../../data-types.md) | ID шаблона счета | Неизменяемое ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Флаг активности. Значения: Y/N | ||
|| **NEXT_EXECUTION**
[`date`](../../../data-types.md) | Дата следующего создания нового счета из шаблона. Рассчитывается системой по указанным параметрам. Если значение пустое, новые счета не создаются | Только для чтения. ||
|| **LAST_EXECUTION**
[`date`](../../../data-types.md) | Дата последнего создания нового счета из шаблона | Только для чтения ||
|| **COUNTER_REPEAT**
[`integer`](../../../data-types.md) | Количество созданных из шаблона счетов | Только для чтения ||
|| **START_DATE**
[`date`](../../../data-types.md) | Дата начала отсчета при расчете даты следующего создания нового счета | ||
|| **SEND_BILL**
[`char`](../../../data-types.md) | Отправлять счет на почту, привязанную к плательщику. Значения: Y/N | ||
|| **EMAIL_ID**
[`integer`](../../../data-types.md) | ID поля, содержащего email плательщика | ||
|| **IS_LIMIT**
[`char`](../../../data-types.md) | Есть ли ограничения по созданию новых счетов | ||
|| **LIMIT_REPEAT**
[`integer`](../../../data-types.md) | Максимальное число счетов, которое можно создать из этого шаблона | Учитывается, если `IS_LIMIT` равно `T` ||
|| **LIMIT_DATE**
[`date`](../../../data-types.md) | Дата, до достижения которой можно создавать счета из этого шаблона | Учитывается, если `IS_LIMIT` равно `D` ||
|| **PARAMS**
[`unknown`](../../../data-types.md)
| Набор параметров для расчета - recurring_params: 
- **PERIOD** - период повторения:
    - day - день
    - week - неделя
    - month - месяц
    - year - год
- **TYPE** - тип повторения для месяца и года:
    - если PERIOD равен month
        - 1 - расчет по порядковому номеру дня в месяце
        - 2 - расчет по номерам дней недели в месяце
    - если PERIOD равен year
        - 1 - расчет по порядковому номеру дня в заданном месяце
        - 2 - расчет по номерам дней недели в заданном месяце
- **INTERVAL** - смещение при расчете
- **IS_WORKING_ONLY** - учитываются только рабочие дни (Y/N)
- **WEEKDAY** - полное наименование дня недели (согласно форматирования PHP метода `date()`)
- **NUM_DAY_IN_MONTH** - порядковый номер даты в месяце (PERIOD равен month или year)
- **NUM_WEEKDAY_IN_MONTH**  номер дня недели в месяце (PERIOD равен month или year)
- **FIELD_YEARLY_INTERVAL_MONTH_NAME** - номер дня недели в месяце (PERIOD равен month или year)
- **DATE_PAY_BEFORE_OFFSET_TYPE** - значение смещения для расчета срока оплаты, расчет ведется от момента создания нового счета из шаблона:
    - day - день
    - week - неделя
    - month - месяц
    - year - год
- **DATE_PAY_BEFORE_OFFSET_VALUE** - значение смещения для расчета срока оплаты, расчет ведется от момента создания нового счета из шаблона| ||
|#


