# Добавить контакт к указанной компании crm.company.contact.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» компаний

Метод `crm.company.contact.add` добавляет контакт к указанной компании.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор компании

Можно получить с помощью методов [crm.company.list](../crm-company-list.md) или [crm.company.add](../crm-company-add.md)
||
|| **fields***
[`object`](../../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан [ниже](#parameter-fields). ||
|#

### Параметр fields {#parameter-fields}

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

У первого добавленного элемента `IS_PRIMARY` по умолчанию равен `Y`

Передача `IS_PRIMARY = Y` у новой и не первой привязки перетирает существующую первичную привязку. ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки.

По умолчанию `i + 10`, где `i` — максимальный индекс сортировки у существующих привязок для текущей компании или `0`, если таких нет ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"fields":{"CONTACT_ID":54,"IS_PRIMARY":"Y","SORT":1000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.contact.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"fields":{"CONTACT_ID":54,"IS_PRIMARY":"Y","SORT":1000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.contact.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.company.contact.add',
    		{
    			id: 32,
    			fields: {
    				CONTACT_ID: 54,
    				IS_PRIMARY: "Y",
    				SORT: 1000,
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
                'crm.company.contact.add',
                [
                    'id' => 32,
                    'fields' => [
                        'CONTACT_ID' => 54,
                        'IS_PRIMARY' => 'Y',
                        'SORT' => 1000,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding company contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.company.contact.add',
        {
            id: 32,
            fields: {
                CONTACT_ID: 54,
                IS_PRIMARY: "Y",
                SORT: 1000,
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
        'crm.company.contact.add',
        [
            'id' => 32,
            'fields' => [
                'CONTACT_ID' => 54,
                'IS_PRIMARY' => 'Y',
                'SORT' => 1000,
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
        "date_start": "2024-08-19T13:47:08+02:00",
        "date_finish": "2024-08-19T13:47:08+02:00"
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
- `false` — в случае неудачи, если контакт, который вы пытаетесь добавить, уже есть в привязках
||
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
|| `-`     | `The parameter 'ownerEntityID' is invalid or not defined` | Передан `id` меньше или равен 0 или не передан вовсе ||
|| `-`     | `The parameter 'fields' must be array` | В `fields` передан не объект ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на изменение компании ||
|| `-`     | `Not found` | Компания с переданным `id` не найдена ||
|| `-`     | `The parameter 'fields' is not valid` | Может возникать из-за нескольких причин:
- если не передан обязательный параметр `fields.CONTACT_ID`
- если переданный параметр `fields.CONTACT_ID` меньше или равен 0 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-contact-delete.md)
- [{#T}](./crm-company-contact-fields.md)
- [{#T}](./crm-company-contact-items-get.md)
- [{#T}](./crm-company-contact-items-set.md)
- [{#T}](./crm-company-contact-items-delete.md)
