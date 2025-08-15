# Изменить правило округления цен catalog.roundingRule.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет правило округления цен.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **Id***
[`catalog_rounding_rule.id`](../data-types.md#catalog_rounding_rule)| Идентификатор правила округления цен ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для обновления правила округления цен ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`catalog_price_type.id`](../data-types.md#catalog_price_type) | Тип цены ||
|| **price***
[`double`](../../data-types.md) | Минимальная цена для округления ||
|| **roundType***
[`integer`](../../data-types.md) | Тип округления. Возможные значения:
- `1` — математическое округление
- `2` — округление вверх (в пользу магазина)
- `4` — округление вниз (в пользу клиента)
||
|| **roundPrecision***
[`double`](../../data-types.md) | Точность округления ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"catalogGroupId":14,"price":1500,"roundType":2,"roundPrecision":10}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.roundingRule.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"catalogGroupId":14,"price":1500,"roundType":2,"roundPrecision":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.roundingRule.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.roundingRule.update', 
    		{
    			id: 1,
    			fields: {
    				catalogGroupId: 14,
    				price: 1500,
    				roundType: 2,
    				roundPrecision: 10,
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'catalog.roundingRule.update',
                [
                    'id' => 1,
                    'fields' => [
                        'catalogGroupId' => 14,
                        'price' => 1500,
                        'roundType' => 2,
                        'roundPrecision' => 10,
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
        echo 'Error updating rounding rule: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.roundingRule.update', 
        {
            id: 1,
            fields: {
                catalogGroupId: 14,
                price: 1500,
                roundType: 2,
                roundPrecision: 10,
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.roundingRule.update',
        [
            'id' => 1,
            'fields' => [
                'catalogGroupId' => 14,
                'price' => 1500,
                'roundType' => 2,
                'roundPrecision' => 10
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
    "result": {
        "roundingRule": {
            "catalogGroupId": 14,
            "createdBy": 1,
            "dateCreate": "2024-09-26T15:09:58+02:00",
            "dateModify": "2024-09-26T15:10:37+02:00",
            "id": 1,
            "modifiedBy": 1,
            "price": 1500,
            "roundPrecision": 10,
            "roundType": 2
        }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-09-26T15:09:58+02:00",
        "date_finish": "2024-09-26T15:09:58+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **roundingRule**
[`catalog_rounding_rule`](../data-types.md#catalog_rounding_rule) | Объект с информацией об обновленном правиле округления цен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: catalogGroupId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
||
|| `200900000000` | Правила округления цен с таким идентификатором не существует
||
|| `100` | Не указан параметр `id`
||
|| `100` | Не указан или пустой параметр `fields`
||
|| `0` | Не переданы обязательные поля структуры `fields`
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-rounding-rule-add.md)
- [{#T}](./catalog-rounding-rule-get.md)
- [{#T}](./catalog-rounding-rule-list.md)
- [{#T}](./catalog-rounding-rule-delete.md)
- [{#T}](./catalog-rounding-rule-get-fields.md)