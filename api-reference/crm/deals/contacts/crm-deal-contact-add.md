# Добавить контакт к сделке crm.deal.contact.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» сделок

Метод `crm.deal.contact.add` добавляет контакт к указанной сделке.

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

Список доступных полей описан [(подробное описание)](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который будет привязан к сделке

Идентификатор можно получить с помощью методов [crm.contact.list](../../contacts/crm-contact-list.md) или [crm.contact.add](../../contacts/crm-contact-add.md) ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет

Если параметр не передан и у сделки нет первичной привязки, добавляемая привязка будет помечена как первичная ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления связи сделка-контакт, где:
- идентификатор сделки — `1875`
- идентификатор контакта — `55`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"fields":{"CONTACT_ID":55,"IS_PRIMARY":"Y","SORT":1000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.contact.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1875,"fields":{"CONTACT_ID":55,"IS_PRIMARY":"Y","SORT":1000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.contact.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.contact.add',
    		{
    			id: 1875,
    			fields: {
    				CONTACT_ID: 55,
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
                'crm.deal.contact.add',
                [
                    'id' => 1875,
                    'fields' => [
                        'CONTACT_ID' => 55,
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
        echo 'Error adding deal contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.contact.add',
        {
            id: 1875,
            fields: {
                CONTACT_ID: 55,
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
        'crm.deal.contact.add',
        [
        'id' => 1875,
        'fields' => [
            'CONTACT_ID' => 55,
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
        "start": 1773222863,
        "finish": 1773222863.626254,
        "duration": 0.6262540817260742,
        "processing": 0,
        "date_start": "2026-03-11T12:54:23+03:00",
        "date_finish": "2026-03-11T12:54:23+03:00",
        "operating_reset_at": 1773223463,
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
- `true` — связь добавлена
- `false` — связь не добавлена, контакт уже связан со сделкой
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
|| `-` | `The parameter 'fields' must be array.` | В `fields` передан не объект ||
|| `-` | `Access denied.` | У пользователя нет прав на изменение сделок ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на изменение сделки ||
|| `-` | `Not found.` | Сделка с переданным `id` не найдена ||
|| `-` | `The parameter 'fields' is not valid.` | Может возникать из-за нескольких причин:
- если не передан обязательный параметр `fields.CONTACT_ID`
- если переданный параметр `fields.CONTACT_ID` меньше или равен 0 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-contact-delete.md)
- [{#T}](./crm-deal-contact-fields.md)
- [{#T}](./crm-deal-contact-items-get.md)
- [{#T}](./crm-deal-contact-items-set.md)
- [{#T}](./crm-deal-contact-items-delete.md)
