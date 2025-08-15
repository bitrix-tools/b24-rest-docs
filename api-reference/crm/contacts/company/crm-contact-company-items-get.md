# Получить набор компаний, связанных с указанным контактом crm.contact.company.items.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «чтения» контактов

Метод `crm.contact.company.items.get` возвращает набор компаний, связанных с указанным контактом.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор контакта.

Идентификатор можно получить с помощью методов [crm.contact.list](../crm-contact-list.md) или [crm.contact.add](../crm-contact-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения всех привязанных компаний у контакта с `id = 54`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.company.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":54,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.company.items.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.contact.company.items.get',
    		{
    			id: 54,
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
                'crm.contact.company.items.get',
                [
                    'id' => 54,
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
        echo 'Error getting contact company items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.company.items.get',
        {
            id: 54,
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
        'crm.contact.company.items.get',
        [
            'id' => 54
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
    "result": [
        {
        "COMPANY_ID": 7,
        "SORT": 100,
        "ROLE_ID": 0,
        "IS_PRIMARY": "Y"
        },
        {
        "COMPANY_ID": 8,
        "SORT": 110,
        "ROLE_ID": 0,
        "IS_PRIMARY": "N"
        },
        {
        "COMPANY_ID": 9,
        "SORT": 120,
        "ROLE_ID": 0,
        "IS_PRIMARY": "N"
        }
    ],
    "time": {
        "start": 1724078791.470108,
        "finish": 1724078791.969407,
        "duration": 0.4992990493774414,
        "processing": 0.19150400161743164,
        "date_start": "2024-08-19T16:46:31+02:00",
        "date_finish": "2024-08-19T16:46:31+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`contact_company_binding[]`](#contact_company_binding) | Корневой элемент ответа. Содержит массив с информацией о привязанных к контакту компаниях ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

### Параметр contact_company_binding {#contact_company_binding}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMPANY_ID**
[`integer`][1] | Идентификатор компании ||
|| **SORT**
[`integer`][1] | Индекс сортировки ||
|| **ROLE_ID**
[`integer`][1] | Идентификатор роли (зарезервировано) ||
|| **IS_PRIMARY**
[`boolean`][1] | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "",
    "error_description": "The parameter ownerEntityID is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `The parameter 'ownerEntityID' is invalid or not defined` | Передан `id` меньше 0 или не передан вовсе ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на чтение контактов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-company-add.md)
- [{#T}](./crm-contact-company-delete.md)
- [{#T}](./crm-contact-company-fields.md)
- [{#T}](./crm-contact-company-items-set.md)
- [{#T}](./crm-contact-company-items-delete.md)

[1]: ../../../data-types.md