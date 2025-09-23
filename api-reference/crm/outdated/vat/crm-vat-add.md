# Создать ставку НДС crm.vat.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами администратора CRM

{% note warning "Развитие метода остановлено" %}

Метод `crm.vat.add` продолжает работать, но у него есть более актуальный аналог [catalog.vat.add](../../../catalog/vat/catalog-vat-add.md).

{% endnote %}

Метод `crm.vat.add` создает новую ставку НДС в CRM.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
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

- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
 `тип` | **Описание** ||
|| **ACTIVE** 
[`string`](../../../data-types.md) | Активность ставки:
- `Y` — активна,
- `N` — неактивна.

По умолчанию — `Y` ||
|| **C_SORT** 
[`integer`](../../../data-types.md) | Сортировка. 
По умолчанию — 100 ||
|| **NAME***
[`string`](../../../data-types.md) | Название ставки ||
|| **RATE*** 
[`double`](../../../data-types.md) | Значение ставки НДС, % ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"fields":{"ACTIVE":"Y","C_SORT":100,"NAME":"НДС 20%","RATE":20.0}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.vat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ACTIVE":"Y","C_SORT":100,"NAME":"НДС 20%","RATE":20.0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.vat.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.vat.add",
    		{
    			fields: {
    				ACTIVE: "Y",
    				C_SORT: 100,
    				NAME: "НДС 20%",
    				RATE: 20.0
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
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
                'crm.vat.add',
                [
                    'fields' => [
                        'ACTIVE' => 'Y',
                        'C_SORT' => 100,
                        'NAME'   => 'НДС 20%',
                        'RATE'   => 20.0
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
        echo 'Error adding VAT: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.vat.add",
        {
            fields: {
                ACTIVE: "Y",
                C_SORT: 100,
                NAME: "НДС 20%",
                RATE: 20.0
            }
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
        'crm.vat.add',
        [
            'fields' => [
                'ACTIVE' => 'Y',
                'C_SORT' => 100,
                'NAME' => 'НДС 20%',
                'RATE' => 20.0
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
    "result": 13,
    "time": {
        "start": 1751982588.245153,
        "finish": 1751982588.287266,
        "duration": 0.04211306571960449,
        "processing": 0.005285978317260742,
        "date_start": "2025-07-08T16:49:48+03:00",
        "date_finish": "2025-07-08T16:49:48+03:00",
        "operating_reset_at": 1751983188,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result** 
[`integer`](../../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданной ставки НДС ||
|| **time** 
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid parameters.",
    "error_description": "Переданы некорректные параметры."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `The Commercial Catalog module is not installed.` | Модуль catalog не установлен ||
|| `400`     | `Invalid parameters.` | Переданы некорректные параметры ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-vat-list.md)
- [{#T}](./crm-vat-get.md)
- [{#T}](./crm-vat-update.md)
- [{#T}](./crm-vat-delete.md) 
- [{#T}](./crm-vat-fields.md)