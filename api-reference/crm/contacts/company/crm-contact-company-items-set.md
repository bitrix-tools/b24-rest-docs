# Установить набор компаний, связанных с указанным контактом crm.contact.company.items.set

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «изменения» контактов

Метод `crm.contact.company.items.set` устанавливает набор компаний, связанных с указанным контактом.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор контакта.

Идентификатор можно получить с помощью методов [crm.contact.list](../crm-contact-list.md) или [crm.contact.add](../crm-contact-add.md)
||
|| **items***
[`object[]`][1] | Набор объектов, которые описывают привязанные компании к контакту. Структура отдельно взятого объекта привязки смотрите [ниже](#contact_company_binding) ||
|#

### Структура объекта привязки {#contact_company_binding}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMPANY_ID***
[`crm_entity`][2] | Идентификатор компании, который будет привязан к контакту.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 4` ||
|| **IS_PRIMARY**
[`boolean`][1] | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет

Если нет привязки с `IS_PRIMARY = Y`, то она выставляется у первой привязки в `items`.

Если передано несколько привязок с `IS_PRIMARY = Y`, то первичной будет считаться первая привязка с `IS_PRIMARY = Y`
||
|| **SORT**
[`integer`][1] | Индекс сортировки.

По умолчанию `i + 10`, где `i` — максимальный индекс сортировки у существующих и переданных привязок для текущего контакта или `0` в случае, если `SORT` не передан ни у одной из привязок и если у контакта отсутствуют привязки.

Если передана уже существующая привязка без параметра `SORT`, то значение по умолчанию не выставится (значение останется тем же) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить у контакта с `id = 82` следующие привязанные компании:
- компания с `id = 8`, сделать ее первичной и установить `SORT = 100`
- компания с `id = 9`, установить `SORT = 200`
- компания с `id = 10`, установить `SORT = 400`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":82,"items":[{"COMPANY_ID":8,"IS_PRIMARY":"Y","SORT":100},{"COMPANY_ID":9,"SORT":200},{"COMPANY_ID":10,"SORT":400}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.company.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":82,"items":[{"COMPANY_ID":8,"IS_PRIMARY":"Y","SORT":100},{"COMPANY_ID":9,"SORT":200},{"COMPANY_ID":10,"SORT":400}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.company.items.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.contact.company.items.set',
    		{
    			id: 82,
    			items: [
    				{
    					COMPANY_ID: 8,
    					IS_PRIMARY: "Y",
    					SORT: 100,
    				},
    				{
    					COMPANY_ID: 9,
    					SORT: 200,
    				},
    				{
    					COMPANY_ID: 10,
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
                'crm.contact.company.items.set',
                [
                    'id'    => 82,
                    'items' => [
                        [
                            'COMPANY_ID' => 8,
                            'IS_PRIMARY' => 'Y',
                            'SORT'       => 100,
                        ],
                        [
                            'COMPANY_ID' => 9,
                            'SORT'       => 200,
                        ],
                        [
                            'COMPANY_ID' => 10,
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
        echo 'Error setting company items for contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.company.items.set',
        {
            id: 82,
            items: [
                {
                    COMPANY_ID: 8,
                    IS_PRIMARY: "Y",
                    SORT: 100,
                },
                {
                    COMPANY_ID: 9,
                    SORT: 200,
                },
                {
                    COMPANY_ID: 10,
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
        'crm.contact.company.items.set',
        [
            'id' => 82,
            'items' => [
                [
                    'COMPANY_ID' => 8,
                    'IS_PRIMARY' => 'Y',
                    'SORT' => 100,
                ],
                [
                    'COMPANY_ID' => 9,
                    'SORT' => 200,
                ],
                [
                    'COMPANY_ID' => 10,
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
[`boolean`][1] | Корневой элемент ответа. Содержит `true` в случае успеха ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
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
|| `-`     | `The parameter ownerEntityID is invalid or not defined` | Передан `id` меньше 0 или не передан вовсе ||
|| `-`     | `The parameter items must be array` | В `items` передан не массив ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на изменения контактов ||
|| `-`     | `Not found` | Контакт с переданным `id` не найден ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-company-add.md)
- [{#T}](./crm-contact-company-delete.md)
- [{#T}](./crm-contact-company-fields.md)
- [{#T}](./crm-contact-company-items-get.md)
- [{#T}](./crm-contact-company-items-delete.md)

[1]: ../../../data-types.md
[2]: ../../data-types.md
