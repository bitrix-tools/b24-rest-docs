# Получить список полей шаблона регулярной сделки crm.deal.recurring.fields

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

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.recurring.fields` возвращает список полей настройки шаблона регулярной сделки c описанием.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.recurring.fields',
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
                'crm.deal.recurring.fields',
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
        echo 'Error fetching recurring deal fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.deal.recurring.fields",
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые поля

#|
|| **Поле** | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор записи в таблице настроек регулярной сделки. Только для чтения. ||
|| **DEAL_ID**
[`integer`](../../../data-types.md) | ID шаблона сделки. Неизменяемое. ||
|| **BASED_ID**
[`integer`](../../../data-types.md) | ID сделки, на основании которой был создан шаблон. Неизменяемое. ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Флаг активности. Значения: Y/N. ||
|| **NEXT_EXECUTION**
[`date`](../../../data-types.md) | Дата следующего создания новой сделки из шаблона. Рассчитывается системой по указанным параметрам. Если значение пустое, новые сделки не создаются. Только для чтения. ||
|| **LAST_EXECUTION**
[`date`](../../../data-types.md) | Дата последнего создания новой сделки из шаблона. Только для чтения. ||
|| **COUNTER_REPEAT**
[`integer`](../../../data-types.md) | Количество созданных из шаблона сделок. Только для чтения. ||
|| **START_DATE**
[`date`](../../../data-types.md) | Дата начала отсчета при расчете даты следующего создания новой сделки. Если значение пустое, рассчитывается от текущей даты. ||
|| **CATEGORY_ID**
[`char`](../../../data-types.md) | Категория, которая будет задана у сделки, созданной из шаблона. ||
|| **IS_LIMIT**
[`char`](../../../data-types.md) | Есть ли ограничения по созданию новых сделок. Значения: N - без ограничений, D - установлено ограничение по дате, T - установлено ограничение по количеству новых сделок. ||
|| **LIMIT_REPEAT**
[`integer`](../../../data-types.md) | Максимальное число сделок, которое можно создать из этого шаблона. Учитывается, если `IS_LIMIT` равно T. ||
|| **LIMIT_DATE**
[`date`](../../../data-types.md) | Дата, до достижения которой можно создавать сделки из этого шаблона. Учитывается, если `IS_LIMIT равно` D. ||
|| **PARAMS** | Набор параметров для расчета - `recurring_params`:

- **MODE** - режим повторения:
    - single - единичный (будет создана одна сделка из шаблона, смещение рассчитывается до значения START_DATE);
    - multiple - множественный

- **MULTIPLE_TYPE** - тип повторения в множественном режиме [MODE равен multiple]:
    - day - день
    - week - неделя
    - month - месяц
    - year - год

- **MULTIPLE_INTERVAL** - значение смещения [MODE равен multiple]

- **SINGLE_BEFORE_START_DATE_TYPE** - тип смещения до даты начала [MODE равен single]:
    - day - день
    - week - неделя
    - month - месяц
    - year - год

- **SINGLE_BEFORE_START_DATE_VALUE** - значение смещения до даты начала, если не установлено - смещения нет [MODE равен single]

- **OFFSET_BEGINDATE_TYPE** - тип смещения для расчета поля "даты начала сделки", расчет ведется от момента создания новой сделки из шаблона:
    - day - день
    - week - неделя
    - month - месяц
    - year - год

- **OFFSET_BEGINDATE_VALUE** - значение смещения для расчета поля "даты начала сделки", расчет ведется от момента создания новой сделки из шаблона

- **OFFSET_CLOSEDATE_TYPE** - значение смещения для расчета поля "даты завершения сделки", расчет ведется от момента создания новой сделки из шаблона:
    - day - день
    - week - неделя
    - month - месяц
    - year - год

- **OFFSET_CLOSEDATE_VALUE** - значение смещения для расчета поля "даты завершения сделки", расчет ведется от момента создания новой сделки из шаблона ||
|#


{% note tip "Связанные методы и темы" %}

[{#T}](./crm-deal-recurring-add.md)

{% endnote %}
