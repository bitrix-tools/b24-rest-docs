# Прикрепить список контактов к лиду crm.lead.contact.items.set

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод прикрепляет список контактов к указанному лиду.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор лида. Идентификатор лида можно получить методом [получения списка лидов](../crm-lead-list.md) ||
|| **items***
[`object`](../../../data-types.md) | Набор контактов в виде массива объектов со следующими полями:

- **CONTACT_ID^*^** — идентификатор контакта
- **SORT** — индекс сортировки
- **IS_PRIMARY** — флаг первичного контакта 
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"items":[{"CONTACT_ID":1010,"SORT":10,"IS_PRIMARY":"Y"},{"CONTACT_ID":1020,"SORT":20,"IS_PRIMARY":"N"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.contact.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"items":[{"CONTACT_ID":1010,"SORT":10,"IS_PRIMARY":"Y"},{"CONTACT_ID":1020,"SORT":20,"IS_PRIMARY":"N"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.contact.items.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.lead.contact.items.set",
    		{
    			id: 1,
    			items: [
    				{
    					"CONTACT_ID": 1010,
    					"SORT": 10,
    					"IS_PRIMARY": "Y"
    				},
    				{
    					"CONTACT_ID": 1020,
    					"SORT": 20,
    					"IS_PRIMARY": "N"
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'crm.lead.contact.items.set',
                [
                    'id'    => 1,
                    'items' => [
                        [
                            'CONTACT_ID' => 1010,
                            'SORT'       => 10,
                            'IS_PRIMARY' => 'Y',
                        ],
                        [
                            'CONTACT_ID' => 1020,
                            'SORT'       => 20,
                            'IS_PRIMARY' => 'N',
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
        echo 'Error setting lead contact items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.lead.contact.items.set",
        {
            id: 1,
            items: [
                {
                    "CONTACT_ID": 1010,
                    "SORT": 10,
                    "IS_PRIMARY": "Y"
                },
                {
                    "CONTACT_ID": 1020,
                    "SORT": 20,
                    "IS_PRIMARY": "N"
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
        'crm.lead.contact.items.set',
        [
            'id' => 1,
            'items' => [
                [
                    'CONTACT_ID' => 1010,
                    'SORT' => 10,
                    'IS_PRIMARY' => 'Y'
                ],
                [
                    'CONTACT_ID' => 1020,
                    'SORT' => 20,
                    'IS_PRIMARY' => 'N'
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
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат операции ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `NOT_FOUND` | Элемент не найден ||
|| ` ` | Не переданы обязательные поля ||
|| ` ` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-contact-add.md)
- [{#T}](./crm-lead-contact-delete.md)
- [{#T}](./crm-lead-contact-items-get.md)
- [{#T}](./crm-lead-contact-items-delete.md)
- [{#T}](./crm-lead-contact-fields.md)