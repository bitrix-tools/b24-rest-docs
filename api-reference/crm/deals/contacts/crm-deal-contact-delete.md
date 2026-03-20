# Удалить контакт из указанной сделки crm.deal.contact.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» сделок

Метод `crm.deal.contact.delete` удаляет контакт из указанной сделки.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сделки

Можно получить с помощью методов [crm.deal.list](../crm-deal-list.md) или [crm.deal.add](../crm-deal-add.md)
||
|| **fields***
[`object`](../../../data-types.md) | Объект с информацией о том, какой контакт нужно удалить из привязок [(подробное описание)](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который нужно удалить из привязок

Идентификатор можно получить с помощью методов [crm.contact.list](../../contacts/crm-contact-list.md) или [crm.contact.add](../../contacts/crm-contact-add.md) ||
|#

{% note info "Удалить первичную привязку" %}

Если удалить первичную привязку, новой первичной станет первая доступная привязка

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления связи сделка-контакт, где:
- идентификатор сделки — `1875`
- идентификатор контакта — `55`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"fields":{"CONTACT_ID":55}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.contact.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"fields":{"CONTACT_ID":55},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.contact.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.contact.delete',
    		{
    			id: 1875,
    			fields: {
    				CONTACT_ID: 55,
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
                'crm.deal.contact.delete',
                [
                    'id' => 1875,
                    'fields' => [
                        'CONTACT_ID' => 55,
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
        echo 'Error deleting deal contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.contact.delete',
        {
            id: 1875,
            fields: {
                CONTACT_ID: 55,
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
        'crm.deal.contact.delete',
        [
            'id' => 1875,
            'fields' => [
                'CONTACT_ID' => 55,
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
        "start": 1773234105,
        "finish": 1773234105.847951,
        "duration": 0.8479509353637695,
        "processing": 0,
        "date_start": "2026-03-11T16:01:45+03:00",
        "date_finish": "2026-03-11T16:01:45+03:00",
        "operating_reset_at": 1773234705,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — контакт удален из сделки
- `false` — контакт не связан со сделкой
||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `The parameter 'ownerEntityID' is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| `-` | `The parameter 'item' must be array.` | В `fields` передан не объект ||
|| `-` | `Access denied.` | У пользователя нет прав на изменение сделок ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на изменение сделки ||
|| `-` | `Not found.` | Сделка с переданным `id` не найдена ||
|| `-` | `The parameter 'fields' is not valid.` | Может возникать из-за нескольких причин:
- если не передан обязательный параметр `fields.CONTACT_ID`
- если переданный параметр `fields.CONTACT_ID` меньше или равен 0 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-contact-add.md)
- [{#T}](./crm-deal-contact-fields.md)
- [{#T}](./crm-deal-contact-items-get.md)
- [{#T}](./crm-deal-contact-items-set.md)
- [{#T}](./crm-deal-contact-items-delete.md)
