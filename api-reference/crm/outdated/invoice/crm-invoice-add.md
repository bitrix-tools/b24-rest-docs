# Добавить счет crm.invoice.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод создает новый счет.

Если необходимо в счете указать какие реквизиты покупателя/продавца (т.к. их может быть несколько у компании), то используйте метод [crm.requisite.link.register](../../requisites/links/crm-requisite-link-register.md).

В создаваемом счете обязательно должны быть указаны компании продавца и покупателя:
- `UF_COMPANY_ID`, если покупатель - компания или `UF_CONTACT_ID`, если покупатель - контакт 
- `UF_MYCOMPANY_ID` - продавец 

Идентификаторы, указанные в **crm.requisite.link.register** и в создаваемом счете, должны соответствовать покупателю и продавцу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для создания счета.

Чтобы узнать требуемый формат полей, выполните метод [crm.invoice.fields](./crm-invoice-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Пример 1

{% list tabs %}

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ORDER_TOPIC":"Счет для юр. лица","STATUS_ID":"P","DATE_INSERT":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","PAY_VOUCHER_DATE":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","PAY_VOUCHER_NUM":"876","DATE_MARKED":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","REASON_MARKED":"Счет оплачен сразу.","COMMENTS":"комментарий менеджера","USER_DESCRIPTION":"комментарий для клиента","DATE_BILL":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","DATE_PAY_BEFORE":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" +1 month')'","RESPONSIBLE_ID":1,"UF_DEAL_ID":10,"UF_COMPANY_ID":5,"UF_CONTACT_ID":2,"PERSON_TYPE_ID":2,"PAY_SYSTEM_ID":6,"INVOICE_PROPERTIES":{"COMPANY":"ООО \"Новые технологии\"","COMPANY_ADR":"543000 Москва, ул. Песчаная, д. 15, оф. 55 (юр)","INN":"","KPP":"","CONTACT_PERSON":"Борис Соколов","EMAIL":"pr@logistics-north.com","PHONE":"8 (495) 234-54-32","FAX":"","ZIP":"","CITY":"","LOCATION":"","ADDRESS":""},"PRODUCT_ROWS":[{"ID":0,"PRODUCT_ID":438,"PRODUCT_NAME":"Товар 01","QUANTITY":1,"PRICE":100},{"ID":0,"PRODUCT_ID":515,"PRODUCT_NAME":"Товар 77","QUANTITY":1,"PRICE":118}]}}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.add?auth=**put_access_token_here**
    ```

- JS


    ```js
    try
    {
    	const current = new Date();
    	const nextMonth = new Date();
    	nextMonth.setMonth(current.getMonth() + 1);
    
    	const date2str = function(d)
    	{
    		return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    	};
    
    	const paddatepart = function(part)
    	{
    		return part >= 10 ? part.toString() : '0' + part.toString();
    	};
    
    	const response = await $b24.callMethod(
    		"crm.invoice.add",
    		{
    			"fields": {
    				"ORDER_TOPIC": "Счет для юр. лица",
    				"STATUS_ID": "P",
    				"DATE_INSERT": date2str(current),
    				"PAY_VOUCHER_DATE": date2str(current),
    				"PAY_VOUCHER_NUM": "876",
    				"DATE_MARKED": date2str(current),
    				"REASON_MARKED": "Счет оплачен сразу.",
    				"COMMENTS": "комментарий менеджера",
    				"USER_DESCRIPTION": "комментарий для клиента",
    				"DATE_BILL": date2str(current),
    				"DATE_PAY_BEFORE": date2str(nextMonth),
    				"RESPONSIBLE_ID": 1,
    				"UF_DEAL_ID": 10,
    				"UF_COMPANY_ID": 5,
    				"UF_CONTACT_ID": 2,
    				"PERSON_TYPE_ID": 2,
    				"PAY_SYSTEM_ID": 6,
    				"INVOICE_PROPERTIES": {
    					"COMPANY": "ООО \"Новые технологии\"",
    					"COMPANY_ADR": "543000 Москва, ул. Песчаная, д. 15, оф. 55 (юр)",
    					"INN": "",
    					"KPP": "",
    					"CONTACT_PERSON": "Борис Соколов",
    					"EMAIL": "pr@logistics-north.com",
    					"PHONE": "8 (495) 234-54-32",
    					"FAX": "",
    					"ZIP": "",
    					"CITY": "",
    					"LOCATION": "",
    					"ADDRESS": ""
    				},
    				"PRODUCT_ROWS": [
    					{"ID": 0, "PRODUCT_ID": 438, "PRODUCT_NAME": "Товар 01", "QUANTITY": 1, "PRICE": 100},
    					{"ID": 0, "PRODUCT_ID": 515, "PRODUCT_NAME": "Товар 77", "QUANTITY": 1, "PRICE": 118}
    				]
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.info("Создан счет с ID " + result);
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
        $nextMonth = new DateTime();
        $nextMonth->setDate($current->format('Y'), $current->format('m') + 1, $current->format('d'));
    
        $date2str = function($d) {
            return $d->format('Y-m-d\TH:i:sP');
        };
    
        $paddatepart = function($part) {
            return $part >= 10 ? $part : '0' . $part;
        };
    
        $response = $b24Service
            ->core
            ->call(
                "crm.invoice.add",
                [
                    "fields" => [
                        "ORDER_TOPIC"       => "Счет для юр. лица",
                        "STATUS_ID"         => "P",
                        "DATE_INSERT"       => $date2str($current),
                        "PAY_VOUCHER_DATE"  => $date2str($current),
                        "PAY_VOUCHER_NUM"   => "876",
                        "DATE_MARKED"       => $date2str($current),
                        "REASON_MARKED"     => "Счет оплачен сразу.",
                        "COMMENTS"          => "комментарий менеджера",
                        "USER_DESCRIPTION"  => "комментарий для клиента",
                        "DATE_BILL"         => $date2str($current),
                        "DATE_PAY_BEFORE"   => $date2str($nextMonth),
                        "RESPONSIBLE_ID"    => 1,
                        "UF_DEAL_ID"        => 10,
                        "UF_COMPANY_ID"     => 5,
                        "UF_CONTACT_ID"     => 2,
                        "PERSON_TYPE_ID"    => 2,
                        "PAY_SYSTEM_ID"     => 6,
                        "INVOICE_PROPERTIES" => [
                            "COMPANY"        => "ООО \"Новые технологии\"",
                            "COMPANY_ADR"    => "543000 Москва, ул. Песчаная, д. 15, оф. 55 (юр)",
                            "INN"            => "",
                            "KPP"            => "",
                            "CONTACT_PERSON" => "Борис Соколов",
                            "EMAIL"          => "pr@logistics-north.com",
                            "PHONE"          => "8 (495) 234-54-32",
                            "FAX"            => "",
                            "ZIP"            => "",
                            "CITY"           => "",
                            "LOCATION"       => "",
                            "ADDRESS"        => ""
                        ],
                        "PRODUCT_ROWS" => [
                            ["ID" => 0, "PRODUCT_ID" => 438, "PRODUCT_NAME" => "Товар 01", "QUANTITY" => 1, "PRICE" => 100],
                            ["ID" => 0, "PRODUCT_ID" => 515, "PRODUCT_NAME" => "Товар 77", "QUANTITY" => 1, "PRICE" => 118]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создан счет с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating invoice: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var current = new Date();
    var nextMonth = new Date();
    nextMonth.setMonth(current.getMonth() + 1);

    var date2str = function(d)
    {
        return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    };

    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };

    BX24.callMethod(
        "crm.invoice.add",
        {
            "fields": {
                "ORDER_TOPIC": "Счет для юр. лица",
                "STATUS_ID": "P",
                "DATE_INSERT": date2str(current),
                "PAY_VOUCHER_DATE": date2str(current),
                "PAY_VOUCHER_NUM": "876",
                "DATE_MARKED": date2str(current),
                "REASON_MARKED": "Счет оплачен сразу.",
                "COMMENTS": "комментарий менеджера",
                "USER_DESCRIPTION": "комментарий для клиента",
                "DATE_BILL": date2str(current),
                "DATE_PAY_BEFORE": date2str(nextMonth),
                "RESPONSIBLE_ID": 1,
                "UF_DEAL_ID": 10,
                "UF_COMPANY_ID": 5,
                "UF_CONTACT_ID": 2,
                "PERSON_TYPE_ID": 2,
                "PAY_SYSTEM_ID": 6,
                "INVOICE_PROPERTIES": {
                    "COMPANY": "ООО \"Новые технологии\"",
                    "COMPANY_ADR": "543000 Москва, ул. Песчаная, д. 15, оф. 55 (юр)",
                    "INN": "",
                    "KPP": "",
                    "CONTACT_PERSON": "Борис Соколов",
                    "EMAIL": "pr@logistics-north.com",
                    "PHONE": "8 (495) 234-54-32",
                    "FAX": "",
                    "ZIP": "",
                    "CITY": "",
                    "LOCATION": "",
                    "ADDRESS": ""
                },
                "PRODUCT_ROWS": [
                    {"ID": 0, "PRODUCT_ID": 438, "PRODUCT_NAME": "Товар 01", "QUANTITY": 1, "PRICE": 100},
                    {"ID": 0, "PRODUCT_ID": 515, "PRODUCT_NAME": "Товар 77", "QUANTITY": 1, "PRICE": 118}
                ]
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан счет с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $current = new DateTime();
    $nextMonth = (new DateTime())->modify('+1 month');

    function date2str($d) {
        return $d->format('Y-m-d\TH:i:s+03:00');
    }

    $result = CRest::call(
        'crm.invoice.add',
        [
            'fields' => [
                'ORDER_TOPIC' => 'Счет для юр. лица',
                'STATUS_ID' => 'P',
                'DATE_INSERT' => date2str($current),
                'PAY_VOUCHER_DATE' => date2str($current),
                'PAY_VOUCHER_NUM' => '876',
                'DATE_MARKED' => date2str($current),
                'REASON_MARKED' => 'Счет оплачен сразу.',
                'COMMENTS' => 'комментарий менеджера',
                'USER_DESCRIPTION' => 'комментарий для клиента',
                'DATE_BILL' => date2str($current),
                'DATE_PAY_BEFORE' => date2str($nextMonth),
                'RESPONSIBLE_ID' => 1,
                'UF_DEAL_ID' => 10,
                'UF_COMPANY_ID' => 5,
                'UF_CONTACT_ID' => 2,
                'PERSON_TYPE_ID' => 2,
                'PAY_SYSTEM_ID' => 6,
                'INVOICE_PROPERTIES' => [
                    'COMPANY' => 'ООО "Новые технологии"',
                    'COMPANY_ADR' => '543000 Москва, ул. Песчаная, д. 15, оф. 55 (юр)',
                    'INN' => '',
                    'KPP' => '',
                    'CONTACT_PERSON' => 'Борис Соколов',
                    'EMAIL' => 'pr@logistics-north.com',
                    'PHONE' => '8 (495) 234-54-32',
                    'FAX' => '',
                    'ZIP' => '',
                    'CITY' => '',
                    'LOCATION' => '',
                    'ADDRESS' => ''
                ],
                'PRODUCT_ROWS' => [
                    ['ID' => 0, 'PRODUCT_ID' => 438, 'PRODUCT_NAME' => 'Товар 01', 'QUANTITY' => 1, 'PRICE' => 100],
                    ['ID' => 0, 'PRODUCT_ID' => 515, 'PRODUCT_NAME' => 'Товар 77', 'QUANTITY' => 1, 'PRICE' => 118]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Пример 2

{% list tabs %}

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ORDER_TOPIC":"Счет для физ. лица","STATUS_ID":"P","DATE_INSERT":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","PAY_VOUCHER_DATE":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","PAY_VOUCHER_NUM":"876","DATE_MARKED":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","REASON_MARKED":"оплатили","COMMENTS":"комментарий","USER_DESCRIPTION":"комментарий клиенту","DATE_BILL":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" now')'","DATE_PAY_BEFORE":"'$(date -Iseconds --utc --date='TZ="Europe/Moscow" +1 month')'","RESPONSIBLE_ID":1,"UF_DEAL_ID":8,"UF_COMPANY_ID":0,"UF_CONTACT_ID":3,"PERSON_TYPE_ID":1,"PAY_SYSTEM_ID":6,"INVOICE_PROPERTIES":{"FIO":"Глеб Титов","EMAIL":"boss@yt-soft.net","PHONE":"","ZIP":"","CITY":"","LOCATION":"","ADDRESS":""},"PRODUCT_ROWS":[{"ID":0,"PRODUCT_ID":438,"PRODUCT_NAME":"Товар 01","QUANTITY":1,"PRICE":100},{"ID":0,"PRODUCT_ID":515,"PRODUCT_NAME":"Товар 77","QUANTITY":1,"PRICE":118}]}}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.add?auth=**put_access_token_here**
    ```

- JS


    ```js
    try
    {
    	const current = new Date();
    	const nextMonth = new Date();
    	nextMonth.setMonth(current.getMonth() + 1);
    
    	const date2str = function(d)
    	{
    		return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    	};
    
    	const paddatepart = function(part)
    	{
    		return part >= 10 ? part.toString() : '0' + part.toString();
    	};
    
    	const response = await $b24.callMethod(
    		"crm.invoice.add",
    		{
    			"fields": {
    				"ORDER_TOPIC": "Счет для физ. лица",
    				"STATUS_ID": "P",
    				"DATE_INSERT": date2str(current),
    				"PAY_VOUCHER_DATE": date2str(current),
    				"PAY_VOUCHER_NUM": "876",
    				"DATE_MARKED": date2str(current),
    				"REASON_MARKED": "оплатили",
    				"COMMENTS": "комментарий",
    				"USER_DESCRIPTION": "комментарий клиенту",
    				"DATE_BILL": date2str(current),
    				"DATE_PAY_BEFORE": date2str(nextMonth),
    				"RESPONSIBLE_ID": 1,
    				"UF_DEAL_ID": 8,
    				"UF_COMPANY_ID": 0,
    				"UF_CONTACT_ID": 3,
    				"PERSON_TYPE_ID": 1,
    				"PAY_SYSTEM_ID": 6,
    				"INVOICE_PROPERTIES": {
    					"FIO": "Глеб Титов",
    					"EMAIL": "boss@yt-soft.net",
    					"PHONE": "",
    					"ZIP": "",
    					"CITY": "",
    					"LOCATION": "",
    					"ADDRESS": ""
    				},
    				"PRODUCT_ROWS": [
    					{"ID": 0, "PRODUCT_ID": 438, "PRODUCT_NAME": "Товар 01", "QUANTITY": 1, "PRICE": 100},
    					{"ID": 0, "PRODUCT_ID": 515, "PRODUCT_NAME": "Товар 77", "QUANTITY": 1, "PRICE": 118}
    				]
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.info("Создан счет с ID " + result);
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
        $nextMonth = new DateTime();
        $nextMonth->setDate($current->format('Y'), $current->format('m') + 1, $current->format('d'));
    
        $date2str = function($d) {
            return $d->format('Y-m-d\TH:i:sP');
        };
    
        $paddatepart = function($part) {
            return $part >= 10 ? $part : '0' . $part;
        };
    
        $response = $b24Service
            ->core
            ->call(
                'crm.invoice.add',
                [
                    'fields' => [
                        'ORDER_TOPIC'       => 'Счет для физ. лица',
                        'STATUS_ID'         => 'P',
                        'DATE_INSERT'       => $date2str($current),
                        'PAY_VOUCHER_DATE'  => $date2str($current),
                        'PAY_VOUCHER_NUM'   => '876',
                        'DATE_MARKED'       => $date2str($current),
                        'REASON_MARKED'     => 'оплатили',
                        'COMMENTS'          => 'комментарий',
                        'USER_DESCRIPTION'  => 'комментарий клиенту',
                        'DATE_BILL'         => $date2str($current),
                        'DATE_PAY_BEFORE'   => $date2str($nextMonth),
                        'RESPONSIBLE_ID'    => 1,
                        'UF_DEAL_ID'        => 8,
                        'UF_COMPANY_ID'     => 0,
                        'UF_CONTACT_ID'     => 3,
                        'PERSON_TYPE_ID'    => 1,
                        'PAY_SYSTEM_ID'     => 6,
                        'INVOICE_PROPERTIES' => [
                            'FIO'      => 'Глеб Титов',
                            'EMAIL'    => 'boss@yt-soft.net',
                            'PHONE'    => '',
                            'ZIP'      => '',
                            'CITY'     => '',
                            'LOCATION' => '',
                            'ADDRESS'  => '',
                        ],
                        'PRODUCT_ROWS' => [
                            ['ID' => 0, 'PRODUCT_ID' => 438, 'PRODUCT_NAME' => 'Товар 01', 'QUANTITY' => 1, 'PRICE' => 100],
                            ['ID' => 0, 'PRODUCT_ID' => 515, 'PRODUCT_NAME' => 'Товар 77', 'QUANTITY' => 1, 'PRICE' => 118],
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
            echo 'Создан счет с ID ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating invoice: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var current = new Date();
    var nextMonth = new Date();
    nextMonth.setMonth(current.getMonth() + 1);

    var date2str = function(d)
    {
        return d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+03:00';
    };

    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };

    BX24.callMethod(
        "crm.invoice.add",
        {
            "fields": {
                "ORDER_TOPIC": "Счет для физ. лица",
                "STATUS_ID": "P",
                "DATE_INSERT": date2str(current),
                "PAY_VOUCHER_DATE": date2str(current),
                "PAY_VOUCHER_NUM": "876",
                "DATE_MARKED": date2str(current),
                "REASON_MARKED": "оплатили",
                "COMMENTS": "комментарий",
                "USER_DESCRIPTION": "комментарий клиенту",
                "DATE_BILL": date2str(current),
                "DATE_PAY_BEFORE": date2str(nextMonth),
                "RESPONSIBLE_ID": 1,
                "UF_DEAL_ID": 8,
                "UF_COMPANY_ID": 0,
                "UF_CONTACT_ID": 3,
                "PERSON_TYPE_ID": 1,
                "PAY_SYSTEM_ID": 6,
                "INVOICE_PROPERTIES": {
                    "FIO": "Глеб Титов",
                    "EMAIL": "boss@yt-soft.net",
                    "PHONE": "",
                    "ZIP": "",
                    "CITY": "",
                    "LOCATION": "",
                    "ADDRESS": ""
                },
                "PRODUCT_ROWS": [
                    {"ID": 0, "PRODUCT_ID": 438, "PRODUCT_NAME": "Товар 01", "QUANTITY": 1, "PRICE": 100},
                    {"ID": 0, "PRODUCT_ID": 515, "PRODUCT_NAME": "Товар 77", "QUANTITY": 1, "PRICE": 118}
                ]
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан счет с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $current = new DateTime();
    $nextMonth = (new DateTime())->modify('+1 month');

    function date2str($d) {
        return $d->format('Y-m-d\TH:i:s+03:00');
    }

    $result = CRest::call(
        'crm.invoice.add',
        [
            'fields' => [
                'ORDER_TOPIC' => 'Счет для физ. лица',
                'STATUS_ID' => 'P',
                'DATE_INSERT' => date2str($current),
                'PAY_VOUCHER_DATE' => date2str($current),
                'PAY_VOUCHER_NUM' => '876',
                'DATE_MARKED' => date2str($current),
                'REASON_MARKED' => 'оплатили',
                'COMMENTS' => 'комментарий',
                'USER_DESCRIPTION' => 'комментарий клиенту',
                'DATE_BILL' => date2str($current),
                'DATE_PAY_BEFORE' => date2str($nextMonth),
                'RESPONSIBLE_ID' => 1,
                'UF_DEAL_ID' => 8,
                'UF_COMPANY_ID' => 0,
                'UF_CONTACT_ID' => 3,
                'PERSON_TYPE_ID' => 1,
                'PAY_SYSTEM_ID' => 6,
                'INVOICE_PROPERTIES' => [
                    'FIO' => 'Глеб Титов',
                    'EMAIL' => 'boss@yt-soft.net',
                    'PHONE' => '',
                    'ZIP' => '',
                    'CITY' => '',
                    'LOCATION' => '',
                    'ADDRESS' => ''
                ],
                'PRODUCT_ROWS' => [
                    ['ID' => 0, 'PRODUCT_ID' => 438, 'PRODUCT_NAME' => 'Товар 01', 'QUANTITY' => 1, 'PRICE' => 100],
                    ['ID' => 0, 'PRODUCT_ID' => 515, 'PRODUCT_NAME' => 'Товар 77', 'QUANTITY' => 1, 'PRICE' => 118]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
