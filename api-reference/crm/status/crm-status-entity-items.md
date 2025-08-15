# Получить элементы справочника по типу crm.status.entity.items

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.status.entity.items` возвращает все элементы справочника по  идентификатору `ENTITY_ID` с сортировкой по полю `SORT`. 
Метод аналогичен [crm.status.list](crm-status-list.md), за исключением того, что в последнем можно определить правила сортировки.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId*** 
[`string`](../../data-types.md) | Тип справочника, например `DEAL_STAGE`, `SOURCE`. Получить список типов можно методом [crm.status.entity.types](./crm-status-entity-types.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"entityId":"DEAL_STAGE"}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.entity.items
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":"DEAL_STAGE","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.entity.items
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.status.entity.items",
    		{
    			entityId: "DEAL_STAGE"
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.status.entity.items',
                [
                    'entityId' => 'DEAL_STAGE'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching status entity items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.entity.items",
        {
            entityId: "DEAL_STAGE"
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
        'crm.status.entity.items',
        [
            'entityId' => 'DEAL_STAGE'
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
            "NAME": "Новая",
            "SORT": 10,
            "STATUS_ID": "NEW"
        },
        {
            "NAME": "Подготовка документов",
            "SORT": 20,
            "STATUS_ID": "PREPARATION"
        },
        {
            "NAME": "Cчет на предоплату",
            "SORT": 30,
            "STATUS_ID": "PREPAYMENT_INVOICE"
        },
        {
            "NAME": "В работе",
            "SORT": 40,
            "STATUS_ID": "EXECUTING"
        },
        {
            "NAME": "Финальный счет",
            "SORT": 50,
            "STATUS_ID": "FINAL_INVOICE"
        },
        {
            "NAME": "Сделка успешна",
            "SORT": 60,
            "STATUS_ID": "WON"
        },
        {
            "NAME": "Сделка провалена",
            "SORT": 70,
            "STATUS_ID": "LOSE"
        },
        {
            "NAME": "Анализ причины провала",
            "SORT": 80,
            "STATUS_ID": "APOLOGY"
        }
    ],
    "time": {
        "start": 1752144806.703358,
        "finish": 1752144806.76889,
        "duration": 0.06553196907043457,
        "processing": 0.010729789733886719,
        "date_start": "2025-07-10T13:53:26+03:00",
        "date_finish": "2025-07-10T13:53:26+03:00",
        "operating_reset_at": 1752145406,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив элементов справочника ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "The parameter entityId is not defined or invalid.",
    "error_description": "Не указан или некорректен идентификатор справочника."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `The parameter entityId is not defined or invalid.` | Не указан или некорректен идентификатор справочника ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-list.md)
- [{#T}](./crm-status-add.md)
- [{#T}](./crm-status-update.md)
- [{#T}](./crm-status-delete.md) 
