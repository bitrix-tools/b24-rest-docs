# Добавить клиентов к записи в лист ожидания booking.v1.waitlist.client.set

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.waitlist.client.set` устанавливает клиентов для указанной записи в листе ожидания.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **waitListId***
[`integer`](../../../data-types.md) | Идентификатор записи в лист ожидания. 
Можно получить методами [booking.v1.waitlist.add](../booking-v1-waitlist-add.md) и [booking.v1.waitlist.list](../booking-v1-waitlist-list.md) ||
|| **clients***
[`array`](../../../data-types.md) | Массив объектов, содержащий информацию о клиентах [(подробное описание)](#clients) ||
|#

### Параметр clients {#clients}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор клиента, можно получить методом [crm.item.list](../../../crm/universal/crm-item-list.md) для контактов и компаний ||
|| **type***
[`object`](../../../data-types.md) | Тип клиента в формате `{"module": "crm", "code": "CONTACT"}`.
Возможные значения `code`: 
- `CONTACT` — [контакт CRM](../../../crm/contacts/index.md)
- `COMPANY` — [компания CRM](../../../crm/companies/index.md)

Cтруктуру объекта возвращает метод [booking.v1.clienttype.list](../../booking-v1-clienttype-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":4,"clients":[{"id":1,"type":{"module":"crm","code":"CONTACT"}},{"id":2,"type":{"module":"crm","code":"CONTACT"}}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.waitlist.client.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"waitListId":4,"clients":[{"id":1,"type":{"module":"crm","code":"CONTACT"}},{"id":2,"type":{"module":"crm","code":"CONTACT"}}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/booking.v1.waitlist.client.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"booking.v1.waitlist.client.set",
    		{
    			waitListId: 4,
    			clients: [
    				{
    					id: 1,
    					type: {
    						module: "crm",
    						code: "CONTACT"
    					}
    				},
    				{
    					id: 2,
    					type: {
    						module: "crm",
    						code: "CONTACT"
    					}
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'booking.v1.waitlist.client.set',
                [
                    'waitListId' => 4,
                    'clients'    => [
                        [
                            'id'   => 1,
                            'type' => [
                                'module' => 'crm',
                                'code'   => 'CONTACT',
                            ],
                        ],
                        [
                            'id'   => 2,
                            'type' => [
                                'module' => 'crm',
                                'code'   => 'CONTACT',
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting waitlist clients: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.waitlist.client.set",
        {
            waitListId: 4,
            clients: [
                {
                    id: 1,
                    type: {
                        module: "crm",
                        code: "CONTACT"
                    }
                },
                {
                    id: 2,
                    type: {
                        module: "crm",
                        code: "CONTACT"
                    }
                }
            ]
        },
        result => {
            if (result.error())
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
        'booking.v1.waitlist.client.set',
        [
            'waitListId' => 4,
            'clients' => [
                [
                    'id' => 1,
                    'type' => [
                        'module' => 'crm',
                        'code' => 'CONTACT'
                    ]
                ],
                [
                    'id' => 2,
                    'type' => [
                        'module' => 'crm',
                        'code' => 'CONTACT'
                    ]
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
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 1040,
    "error_description": "Wait list not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields:` | Не передан обязательный параметр внутри `clients` ||
|| `1040` | `Wait list not found` | Список ожидания с указанным `id` не найден ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./booking-v1-waitlist-client-unset.md)
- [{#T}](./booking-v1-waitlist-client-list.md)