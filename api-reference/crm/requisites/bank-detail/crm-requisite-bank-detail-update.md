# Изменить банковский реквизит crm.requisite.bankdetail.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет существующий банковский реквизит.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита. 

Идентификаторы банковских реквизитов можно получить с помощью метода [`crm.requisite.bankdetail.list`](./crm-requisite-bank-detail-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей банковского реквизита — объект вида `{"поле": "значение"[, ...]}`, значения которых нужно изменить ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../../data-types.md) | Название банковского реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле. 

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями
||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности. Используются значения `Y` или `N`. 

Сейчас поле фактически ни на что не влияет ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **RQ_BANK_NAME**
[`string`](../../../data-types.md) | Наименование банка ||
|| **RQ_BANK_ADDR**
[`string`](../../../data-types.md) | Адрес банка ||
|| **RQ_BANK_CODE**
[`string`](../../../data-types.md) | Código do banco (для страны BR) ||
|| **RQ_BANK_ROUTE_NUM**
[`string`](../../../data-types.md) | Bank Routing Number ||
|| **RQ_BIK**
[`string`](../../../data-types.md) | БИК ||
|| **RQ_CODEB**
[`string`](../../../data-types.md) | Code Banque (для страны FR) ||
|| **RQ_CODEG**
[`string`](../../../data-types.md) | Code Guichet (для страны FR) ||
|| **RQ_RIB**
[`string`](../../../data-types.md) | Clé RIB (для страны FR) ||
|| **RQ_MFO**
[`string`](../../../data-types.md) | МФО ||
|| **RQ_ACC_NAME**
[`string`](../../../data-types.md) | Bank Account Holder Name ||
|| **RQ_ACC_NUM**
[`string`](../../../data-types.md) | Bank Account Number ||
|| **RQ_ACC_TYPE**
[`string`](../../../data-types.md) | Tipo da conta (для страны BR) ||
|| **RQ_AGENCY_NAME**
[`string`](../../../data-types.md) | Agência (для страны BR) ||
|| **RQ_IIK**
[`string`](../../../data-types.md) | ИИК ||
|| **RQ_ACC_CURRENCY**
[`string`](../../../data-types.md) | Валюта счета ||
|| **RQ_COR_ACC_NUM**
[`string`](../../../data-types.md) | Корреспондентский счет ||
|| **RQ_IBAN**
[`string`](../../../data-types.md) | IBAN ||
|| **RQ_SWIFT**
[`string`](../../../data-types.md) | SWIFT ||
|| **RQ_BIC**
[`string`](../../../data-types.md) | BIC ||
|| **COMMENTS**
[`string`](../../../data-types.md) | Комментарий ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы. Назначение поля может меняться конечным разработчиком ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":357,"fields":{"NAME":"ПАО Супербанк (не использовать)","COMMENTS":"Устаревший","SORT":10000,"ACTIVE":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.bankdetail.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":357,"fields":{"NAME":"ПАО Супербанк (не использовать)","COMMENTS":"Устаревший","SORT":10000,"ACTIVE":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.bankdetail.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.bankdetail.update",
    		{
    			id: 357,
    			fields:
    			{
    				"NAME": "ПАО Супербанк (не использовать)",
    				"COMMENTS": "Устаревший",
    				"SORT" : 10000,
    				"ACTIVE": "N"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.bankdetail.update',
                [
                    'id'     => 357,
                    'fields' => [
                        'NAME'     => 'ПАО Супербанк (не использовать)',
                        'COMMENTS' => 'Устаревший',
                        'SORT'     => 10000,
                        'ACTIVE'   => 'N',
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
        echo 'Error updating bank detail: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.bankdetail.update",
        {
            id: 357,
            fields:
            {
                "NAME": "ПАО Супербанк (не использовать)",
                "COMMENTS": "Устаревший",
                "SORT" : 10000,
                "ACTIVE": "N"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.bankdetail.update',
        [
            'id' => 357,
            'fields' => [
                'NAME' => 'ПАО Супербанк (не использовать)',
                'COMMENTS' => 'Устаревший',
                'SORT' => 10000,
                'ACTIVE' => 'N'
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
        "start": 1717509116.239588,
        "finish": 1717509116.78087,
        "duration": 0.5412819385528564,
        "processing": 0.173170804977417,
        "date_start": "2024-06-04T15:51:56+02:00",
        "date_finish": "2024-06-04T15:51:56+02:00",
        "operating": 0.17314410209655762
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат изменения банковского реквизита:
- true — изменен
- false — не изменен 
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The RequisiteBankDetail with ID '357' is not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| `ID is not defined or invalid` | Идентификатор банковского реквизита не указан или имеет недопустимое значение ||
|| `The Requisite with ID '357' is not found` | Банковский реквизит с указанным идентификатором не найден ||
|| `Access denied` | Недостаточно прав доступа для изменения банковского реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-bank-detail-add.md)
- [{#T}](./crm-requisite-bank-detail-get.md)
- [{#T}](./crm-requisite-bank-detail-list.md)
- [{#T}](./crm-requisite-bank-detail-delete.md)
- [{#T}](./crm-requisite-bank-detail-fields.md)
