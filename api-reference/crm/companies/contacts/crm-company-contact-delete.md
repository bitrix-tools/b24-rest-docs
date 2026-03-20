# Удалить контакт из указанной компании crm.company.contact.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» компаний

Метод `crm.company.contact.delete` удаляет контакт из указанной компании.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор компании.

Идентификатор можно получить с помощью методов [crm.company.list](../crm-company-list.md) или [crm.company.add](../crm-company-add.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с информацией о том, какой контакт необходимо удалить из привязок.

Содержит единственный ключ `CONTACT_ID` ||
|| **fields.CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который необходимо удалить из привязок ||
|#

{% note info "Удалить первичную привязку" %}

Если удалить первичную привязку, то новой первичной привязкой станет первая доступная привязка

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"fields":{"CONTACT_ID":54}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.contact.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"fields":{"CONTACT_ID":54},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.contact.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.company.contact.delete',
    		{
    			id: 32,
    			fields: {
    				CONTACT_ID: 54,
    			},
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
                'crm.company.contact.delete',
                [
                    'id'     => 32,
                    'fields' => [
                        'CONTACT_ID' => 54,
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
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting contact from company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.company.contact.delete',
        {
            id: 32,
            fields: {
                CONTACT_ID: 54,
            },
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
        'crm.company.contact.delete',
        [
            'id' => 32,
            'fields' => [
                'CONTACT_ID' => 54,
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
        "start": 1724072653.79827,
        "finish": 1724072717.749956,
        "duration": 63.95168590545654,
        "processing": 63.63148093223572,
        "date_start": "2024-08-19T15:04:13+02:00",
        "date_finish": "2024-08-19T15:05:17+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — в случае успеха
- `false` — в случае неудачи, если контакт, который вы пытаетесь удалить, не привязан к компании ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter 'ownerEntityID' is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `The parameter 'ownerEntityID' is invalid or not defined.` | Передан `id` меньше или равен 0 или не передан вовсе ||
|| `-`     | `The parameter 'item' must be array.` | В `fields` передан не объект ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на изменение компании ||
|| `-`     | `Not found.` | Компания с переданным `id` не найдена ||
|| `-`     | `The parameter 'fields' is not valid.` | Может возникать в нескольких случаях:
- если не передан обязательный параметр `fields.CONTACT_ID`
- если переданный параметр `fields.CONTACT_ID` меньше или равен 0 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-contact-add.md)
- [{#T}](./crm-company-contact-fields.md)
- [{#T}](./crm-company-contact-items-get.md)
- [{#T}](./crm-company-contact-items-set.md)
- [{#T}](./crm-company-contact-items-delete.md)
