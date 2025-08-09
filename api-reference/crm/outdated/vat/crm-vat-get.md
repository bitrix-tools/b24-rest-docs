# Получить ставку НДС по идентификатору crm.vat.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.vat.get` продолжает работать, но у него есть более актуальный аналог [catalog.vat.get](../../../catalog/vat/catalog-vat-get.md).

{% endnote %}

Метод `crm.vat.get` возвращает параметры ставки НДС по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../../data-types.md) | Идентификатор ставки НДС. Получить список ставок можно методом [crm.vat.list](./crm-vat-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"id":7}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.vat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.vat.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.vat.get',
    		{
    			id: 7
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
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
                'crm.vat.get',
                [
                    'id' => 7,
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
        echo 'Error getting VAT information: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.vat.get",
        {
            id: 7
        },
        function(result) {
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
        'crm.vat.get',
        [
            'id' => 7
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
        "ID": "13",
        "ACTIVE": "Y",
        "NAME": "НДС 20%",
        "RATE": "20.00",
        "C_SORT": "100"
    },
    "time": {
        "start": 1752043855.534128,
        "finish": 1752043855.598301,
        "duration": 0.06417298316955566,
        "processing": 0.008214235305786133,
        "date_start": "2025-07-09T09:50:55+03:00",
        "date_finish": "2025-07-09T09:50:55+03:00",
        "operating_reset_at": 1752044455,
        "operating": 0
    }
}
```


### Возвращаемые данные

#|
|| **Название**
 `тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор ставки НДС ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность ставки ||
|| **C_SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **NAME**
[`string`](../../../data-types.md) | Название ставки ||
|| **RATE**
[`double`](../../../data-types.md) | Значение ставки НДС, % ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "VAT rate not found.",
    "error_description": "Ставка НДС не найдена."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `The Commercial Catalog module is not installed.` | Модуль catalog не установлен ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `VAT rate not found.` | Ставка НДС не найдена ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-vat-fields.md)
- [{#T}](./crm-vat-list.md)
- [{#T}](./crm-vat-add.md)
- [{#T}](./crm-vat-update.md)
- [{#T}](./crm-vat-delete.md) 