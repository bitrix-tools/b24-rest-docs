# Создать новый банковский реквизит crm.requisite.bankdetail.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новый банковский реквизит.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}` для добавления банковского реквизита ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор родительского объекта. Сейчас может быть только идентификатор реквизита. Идентификаторы реквизитов можно получить с помощью метода [`crm.requisite.list`](../universal/crm-requisite-list.md) ||
|| **COUNTRY_ID**
[`integer`](../../../data-types.md) | Идентификатор страны, которой соответствует набор полей банковского реквизита (смотрите метод [crm.requisite.preset.countries](../presets/crm-requisite-preset-countries.md) для получения доступных значений).

Код страны банковского реквизита совпадает с кодом страны в привязанном шаблоне реквизитов, идентификатор которого указан в поле `ENTITY_ID` 
||
|| **NAME***
[`string`](../../../data-types.md) | Название банковского реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле. 

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями ||
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
    -d '{"fields":{"ENTITY_ID":27,"COUNTRY_ID":1,"NAME":"Супербанк","RQ_BANK_NAME":"ПАО Супербанк","RQ_BANK_ADDR":"117312, г. Москва, улица Вавилова, дом 19","RQ_BIK":"044525225","RQ_ACC_NUM":"40702810938000060473","RQ_ACC_CURRENCY":"RUR","RQ_COR_ACC_NUM":"30101810400000000225","XML_ID":"1e4641fd-2dd9-31e6-b2f2-105056c00008","ACTIVE":"Y","SORT":600}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.bankdetail.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_ID":27,"COUNTRY_ID":1,"NAME":"Супербанк","RQ_BANK_NAME":"ПАО Супербанк","RQ_BANK_ADDR":"117312, г. Москва, улица Вавилова, дом 19","RQ_BIK":"044525225","RQ_ACC_NUM":"40702810938000060473","RQ_ACC_CURRENCY":"RUR","RQ_COR_ACC_NUM":"30101810400000000225","XML_ID":"1e4641fd-2dd9-31e6-b2f2-105056c00008","ACTIVE":"Y","SORT":600},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.bankdetail.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.bankdetail.add",
    		{
    			fields:
    			{
    				"ENTITY_ID": 27,                 // Идентификатор реквизита
    				"COUNTRY_ID": 1,                 // Код страны (Россия)
    				"NAME": "Супербанк",              // Название банковского реквизита
    				"RQ_BANK_NAME": "ПАО Супербанк",  // Наименование банка
    				"RQ_BANK_ADDR": "117312, г. Москва, улица Вавилова, дом 19",
    				"RQ_BIK": "044525225",
    				"RQ_ACC_NUM": "40702810938000060473",
    				"RQ_ACC_CURRENCY": "RUR",
    				"RQ_COR_ACC_NUM": "30101810400000000225",
    				"XML_ID":"1e4641fd-2dd9-31e6-b2f2-105056c00008",
    				"ACTIVE":"Y",
    				"SORT":600
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Создан банковский реквизит с ID " + result);
    }
    catch(error)
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
                'crm.requisite.bankdetail.add',
                [
                    'fields' => [
                        'ENTITY_ID'       => 27,
                        'COUNTRY_ID'      => 1,
                        'NAME'            => 'Супербанк',
                        'RQ_BANK_NAME'    => 'ПАО Супербанк',
                        'RQ_BANK_ADDR'    => '117312, г. Москва, улица Вавилова, дом 19',
                        'RQ_BIK'          => '044525225',
                        'RQ_ACC_NUM'      => '40702810938000060473',
                        'RQ_ACC_CURRENCY' => 'RUR',
                        'RQ_COR_ACC_NUM'  => '30101810400000000225',
                        'XML_ID'          => '1e4641fd-2dd9-31e6-b2f2-105056c00008',
                        'ACTIVE'          => 'Y',
                        'SORT'            => 600,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создан банковский реквизит с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating bank detail: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.bankdetail.add",
        {
            fields:
            {
                "ENTITY_ID": 27,                 // Идентификатор реквизита
                "COUNTRY_ID": 1,                 // Код страны (Россия)
                "NAME": "Супербанк",              // Название банковского реквизита
                "RQ_BANK_NAME": "ПАО Супербанк",  // Наименование банка
                "RQ_BANK_ADDR": "117312, г. Москва, улица Вавилова, дом 19",
                "RQ_BIK": "044525225",
                "RQ_ACC_NUM": "40702810938000060473",
                "RQ_ACC_CURRENCY": "RUR",
                "RQ_COR_ACC_NUM": "30101810400000000225",
                "XML_ID":"1e4641fd-2dd9-31e6-b2f2-105056c00008",
                "ACTIVE":"Y",
                "SORT":600
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан банковский реквизит с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.bankdetail.add',
        [
            'fields' => [
                'ENTITY_ID' => 27,
                'COUNTRY_ID' => 1,
                'NAME' => 'Супербанк',
                'RQ_BANK_NAME' => 'ПАО Супербанк',
                'RQ_BANK_ADDR' => '117312, г. Москва, улица Вавилова, дом 19',
                'RQ_BIK' => '044525225',
                'RQ_ACC_NUM' => '40702810938000060473',
                'RQ_ACC_CURRENCY' => 'RUR',
                'RQ_COR_ACC_NUM' => '30101810400000000225',
                'XML_ID' => '1e4641fd-2dd9-31e6-b2f2-105056c00008',
                'ACTIVE' => 'Y',
                'SORT' => 600
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
    "result": 357,
    "time": {
        "start": 1717429942.060649,
        "finish": 1717429942.626925,
        "duration": 0.5662760734558105,
        "processing": 0.09111285209655762,
        "date_start": "2024-06-03T17:52:22+02:00",
        "date_finish": "2024-06-03T17:52:22+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданного банковского реквизита ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "ENTITY_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| `ENTITY_ID is not defined or invalid` | Идентификатор реквизита не определен или имеет недопустимое значение ||
|| `Access denied` | Недостаточно прав доступа для добавления банковского реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-bank-detail-update.md)
- [{#T}](./crm-requisite-bank-detail-get.md)
- [{#T}](./crm-requisite-bank-detail-list.md)
- [{#T}](./crm-requisite-bank-detail-delete.md)
- [{#T}](./crm-requisite-bank-detail-fields.md)
