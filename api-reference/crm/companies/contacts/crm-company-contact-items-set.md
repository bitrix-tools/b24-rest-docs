# Установить набор контактов, связанных с указанной компанией crm.company.contact.items.set

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» компаний

Метод `crm.company.contact.items.set` устанавливает набор контактов, связанных с указанной компанией.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор компании

Идентификатор можно получить с помощью методов [crm.company.list](../crm-company-list.md) или [crm.company.add](../crm-company-add.md)
||
|| **items***
[`object[]`](../../../data-types.md) | Набор объектов, которые описывают привязанные контакты к компании. Структура отдельно взятого объекта привязки смотрите [ниже](#company_contact_binding) ||
|#

### Структура объекта привязки {#company_contact_binding}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который будет привязан к компании.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 3` ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md#char) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет

Если нет привязки с `IS_PRIMARY = Y`, то она выставляется у первой привязки в `items`.

Если передано несколько привязок с `IS_PRIMARY = Y`, то первичной будет считаться первая привязка с `IS_PRIMARY = Y`
||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки.

По умолчанию `i + 10`, где `i` — максимальный индекс сортировки у существующих и переданных привязок для текущей компании или `0` в случае, если `SORT` не передан ни у одной из привязок и если у компании отсутствуют привязки.

Если передана уже существующая привязка без параметра `SORT`, то значение по умолчанию не выставится, значение останется тем же ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"items":[{"CONTACT_ID":8,"IS_PRIMARY":"Y","SORT":100},{"CONTACT_ID":9,"SORT":200},{"CONTACT_ID":10,"SORT":400}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.contact.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"items":[{"CONTACT_ID":8,"IS_PRIMARY":"Y","SORT":100},{"CONTACT_ID":9,"SORT":200},{"CONTACT_ID":10,"SORT":400}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.contact.items.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.company.contact.items.set',
    		{
    			id: 32,
    			items: [
    				{
    					CONTACT_ID: 8,
    					IS_PRIMARY: "Y",
    					SORT: 100,
    				},
    				{
    					CONTACT_ID: 9,
    					SORT: 200,
    				},
    				{
    					CONTACT_ID: 10,
    					SORT: 400,
    				}
    			],
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result)
    	;
    }
    catch( error )
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
                'crm.company.contact.items.set',
                [
                    'id'    => 32,
                    'items' => [
                        [
                            'CONTACT_ID' => 8,
                            'IS_PRIMARY' => 'Y',
                            'SORT'       => 100,
                        ],
                        [
                            'CONTACT_ID' => 9,
                            'SORT'       => 200,
                        ],
                        [
                            'CONTACT_ID' => 10,
                            'SORT'       => 400,
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
            // Нужная вам логика обработки данных
            processData($result->data());
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting contact items for company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.company.contact.items.set',
        {
            id: 32,
            items: [
                {
                    CONTACT_ID: 8,
                    IS_PRIMARY: "Y",
                    SORT: 100,
                },
                {
                    CONTACT_ID: 9,
                    SORT: 200,
                },
                {
                    CONTACT_ID: 10,
                    SORT: 400,
                }
            ],
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.contact.items.set',
        [
            'id' => 32,
            'items' => [
                [
                    'CONTACT_ID' => 8,
                    'IS_PRIMARY' => 'Y',
                    'SORT' => 100,
                ],
                [
                    'CONTACT_ID' => 9,
                    'SORT' => 200,
                ],
                [
                    'CONTACT_ID' => 10,
                    'SORT' => 400,
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1724139480.073569,
        "finish": 1724139481.016709,
        "duration": 0.9431400299072266,
        "processing": 0.4230809211730957,
        "date_start": "2024-08-20T09:38:00+02:00",
        "date_finish": "2024-08-20T09:38:01+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter items must be array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `The parameter ownerEntityID is invalid or not defined` | Передан `id` меньше или равен 0 или не передан вовсе ||
|| `-`     | `The parameter items must be array` | В `items` передан не массив ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на изменения компаний ||
|| `-`     | `Not found` | Компания с переданным `id` не найдена ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-contact-add.md)
- [{#T}](./crm-company-contact-delete.md)
- [{#T}](./crm-company-contact-fields.md)
- [{#T}](./crm-company-contact-items-get.md)
- [{#T}](./crm-company-contact-items-delete.md)
