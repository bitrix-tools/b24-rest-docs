# Получить информацию о компании crm.company.get

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» компаний

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.get` продолжает работать, но у него есть более актуальный аналог [crm.item.get](../universal/crm-item-get.md).

{% endnote %}

Метод `crm.company.get` возвращает компанию по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор компании ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":12}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":12,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.get
    ```

- JS

    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.company.get",
    		{ id: id }
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    $id = readline("Введите ID: ");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.get',
                [
                    'id' => $id,
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
        echo 'Error getting company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.company.get",
        { id: id },
        function(result)
        {
            if(result.error())
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
        'crm.company.get',
        [
            'ID' => 12
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
    "result": {
        "ID": "2909",
        "COMPANY_TYPE": "CUSTOMER",
        "TITLE": "ГАЗПРОМ",
        "LOGO": null,
        "LEAD_ID": null,
        "HAS_PHONE": "N",
        "HAS_EMAIL": "N",
        "HAS_IMOL": "N",
        "ASSIGNED_BY_ID": "139",
        "CREATED_BY_ID": "835",
        "MODIFY_BY_ID": "1",
        "BANKING_DETAILS": "7736050003",
        "INDUSTRY": "IT",
        "REVENUE": "0",
        "CURRENCY_ID": "RUB",
        "EMPLOYEES": "EMPLOYEES_1",
        "COMMENTS": "",
        "DATE_CREATE": "2024-03-11T16:36:46+03:00",
        "DATE_MODIFY": "2024-08-01T16:08:08+03:00",
        "OPENED": "N",
        "IS_MY_COMPANY": "N",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "ORIGIN_VERSION": null,
        "ADDRESS": null,
        "ADDRESS_2": null,
        "ADDRESS_CITY": null,
        "ADDRESS_POSTAL_CODE": null,
        "ADDRESS_REGION": null,
        "ADDRESS_PROVINCE": null,
        "ADDRESS_COUNTRY": null,
        "ADDRESS_COUNTRY_CODE": null,
        "ADDRESS_LOC_ADDR_ID": null,
        "ADDRESS_LEGAL": null,
        "REG_ADDRESS": null,
        "REG_ADDRESS_2": null,
        "REG_ADDRESS_CITY": null,
        "REG_ADDRESS_POSTAL_CODE": null,
        "REG_ADDRESS_REGION": null,
        "REG_ADDRESS_PROVINCE": null,
        "REG_ADDRESS_COUNTRY": null,
        "REG_ADDRESS_COUNTRY_CODE": null,
        "REG_ADDRESS_LOC_ADDR_ID": null,
        "UTM_SOURCE": null,
        "UTM_MEDIUM": null,
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "PARENT_ID_156": null,
        "LAST_ACTIVITY_BY": "835",
        "LAST_ACTIVITY_TIME": "2024-03-11T16:36:46+03:00",
        "LAST_COMMUNICATION_TIME": null,
        "UF_CRM_1687188367": ""
    },
    "time": {
        "start": 1769497419,
        "finish": 1769497419.915092,
        "duration": 0.9150919914245605,
        "processing": 0,
        "date_start": "2026-01-27T10:03:39+03:00",
        "date_finish": "2026-01-27T10:03:39+03:00",
        "operating_reset_at": 1769498019,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа, возвращает поля компании. Описание полей компании можно получить методом [crm.company.fields](./crm-company-fields.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Access denied` | У пользователя нет прав на «Чтение» компаний ||
|| `-` | `Not found` | Компания не найдена ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-list.md)
- [{#T}](./crm-company-update.md)
- [{#T}](./crm-company-delete.md)
- [{#T}](./crm-company-fields.md)
