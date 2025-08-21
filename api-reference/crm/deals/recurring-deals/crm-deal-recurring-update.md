# Изменить существующую настройку для шаблона регулярной сделки crm.deal.recurring.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.recurring.update` обновляет существующую настройку для шаблона регулярной сделки.

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор настройки шаблона регулярной сделки. ||
|| **fields** | Набор полей – массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.deal.recurring.fields](./crm-deal-recurring-fields.md). 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.deal.recurring.fields](./crm-deal-recurring-fields.md) и посмотрите формат пришедших значений этих полей. 

{% endnote %}
||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const current = new Date();
    	const nextYear = new Date();
    	nextYear.setYear(current.getFullYear() + 1);
    
    	const date2str = function(d)
    	{
    		return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    	};
    
    	const paddatepart = function(part)
    	{
    		return part >= 10 ? part.toString() : '0' + part.toString();
    	};
    
    	const id = prompt("Введите ID");
    
    	const response = await $b24.callMethod(
    		"crm.deal.recurring.update",
    		{
    			id: id,
    			fields:
    			{
    				"CATEGORY_ID": "2",
    				"START_DATE": date2str(nextYear),
    				"PARAMS": {
    					"MODE": "single",
    					"SINGLE_BEFORE_START_DATE_TYPE": "day",
    					"SINGLE_BEFORE_START_DATE_VALUE": 5,
    					"OFFSET_BEGINDATE_TYPE": "day",
    					"OFFSET_BEGINDATE_VALUE": 1,
    					"OFFSET_CLOSEDATE_TYPE": "month",
    					"OFFSET_CLOSEDATE_VALUE": 2,
    				}
    			},
    		}
    	);
    
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    	{
    		console.info(result);
    	}
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $current = new DateTime();
        $nextYear = new DateTime();
        $nextYear->setDate($current->format('Y') + 1);
    
        $date2str = function($d) {
            return $d->format('Y-m-d\TH:i:sP');
        };
    
        $id = readline("Введите ID");
    
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.recurring.update',
                [
                    'id' => $id,
                    'fields' => [
                        'CATEGORY_ID' => '2',
                        'START_DATE' => $date2str($nextYear),
                        'PARAMS' => [
                            'MODE' => 'single',
                            'SINGLE_BEFORE_START_DATE_TYPE' => 'day',
                            'SINGLE_BEFORE_START_DATE_VALUE' => 5,
                            'OFFSET_BEGINDATE_TYPE' => 'day',
                            'OFFSET_BEGINDATE_VALUE' => 1,
                            'OFFSET_CLOSEDATE_TYPE' => 'month',
                            'OFFSET_CLOSEDATE_VALUE' => 2,
                        ],
                    ],
                ]
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
        echo 'Error updating recurring deal: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var current = new Date();
    var nextYear = new Date();
    nextYear.setYear(current.getFullYear() + 1);
    var date2str = function(d)
    {
        return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    };
    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.deal.recurring.update",
        {
            id: id,
            fields:
            {
                "CATEGORY_ID": "2",
                "START_DATE": date2str(nextYear),
                "PARAMS": {
                    "MODE": "single",
                    "SINGLE_BEFORE_START_DATE_TYPE": "day",
                    "SINGLE_BEFORE_START_DATE_VALUE": 5,
                    "OFFSET_BEGINDATE_TYPE": "day",
                    "OFFSET_BEGINDATE_VALUE": 1,
                    "OFFSET_CLOSEDATE_TYPE": "month",
                    "OFFSET_CLOSEDATE_VALUE": 2,
                }
            },
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}