# Получить набор контактов, связанных с указанной компанией crm.company.contact.items.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» компаний

Метод `crm.company.contact.items.get` возвращает набор контактов, связанных с указанной компанией.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор компании.

Идентификатор можно получить с помощью методов [crm.company.list](../crm-company-list.md) или [crm.company.add](../crm-company-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.contact.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":32,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.contact.items.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.company.contact.items.get',
    		{
    			id: 32,
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
                'crm.company.contact.items.get',
                [
                    'id' => 32,
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
        echo 'Error getting company contact items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.company.contact.items.get',
        {
            id: 32,
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
        'crm.company.contact.items.get',
        [
            'id' => 32
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
        "CONTACT_ID": 7,
        "SORT": 100,
        "ROLE_ID": 0,
        "IS_PRIMARY": "Y"
        },
        {
        "CONTACT_ID": 8,
        "SORT": 110,
        "ROLE_ID": 0,
        "IS_PRIMARY": "N"
        },
        {
        "CONTACT_ID": 9,
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
[`company_contact_binding[]`](#company_contact_binding) | Корневой элемент ответа. Содержит массив с информацией о привязанных к компании контактах ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Параметр company_contact_binding {#company_contact_binding}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID**
[`integer`](../../../data-types.md) | Идентификатор контакта ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **ROLE_ID**
[`integer`](../../../data-types.md) | Идентификатор роли, служебное поле ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md#char) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

## Обработка ошибок

HTTP-статус: **400**

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
|| `-` | `The parameter ownerEntityID is invalid or not defined` | Передан `id` меньше или равен 0 или не передан вовсе ||
|| `ACCESS_DENIED` | `Access denied!` | У пользователя нет прав на чтение компаний ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-contact-add.md)
- [{#T}](./crm-company-contact-delete.md)
- [{#T}](./crm-company-contact-fields.md)
- [{#T}](./crm-company-contact-items-set.md)
- [{#T}](./crm-company-contact-items-delete.md)
