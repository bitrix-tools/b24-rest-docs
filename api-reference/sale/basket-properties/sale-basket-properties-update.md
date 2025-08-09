# Изменить свойство элемента корзины sale.basketproperties.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет свойство для элемента (позиции) корзины в заказе.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_basket_item_property.id`](../data-types.md#sale_basket_item_property) | Идентификатор позиции заказа ||
|| **fields***
[`object`](../../data-types.md) | Значения изменяемых полей (подробное описание приведено [ниже](#parametr-fields)) свойства элемента (позиции) корзины:

```js
fields: {
    name: "значение",
    value: "значение",
    code: "значение",
    sort: "значение",
    xmlId: "значение",
}
```
 ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название свойства ||
|| **value**
[`string`](../../data-types.md) | Значение свойства ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке свойств ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17,"fields":{"name":"Артикул","value":"123-456-789","code":"ARTICUL"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketproperties.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":17,"fields":{"name":"Артикул","value":"123-456-789","code":"ARTICUL"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketproperties.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.basketproperties.update",
    		{
    			id: 17,
    			fields: {
    				name: 'Артикул',
    				value: '123-456-789',
    				code: 'ARTICUL',
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'sale.basketproperties.update',
                [
                    'id' => 17,
                    'fields' => [
                        'name'  => 'Артикул',
                        'value' => '123-456-789',
                        'code'  => 'ARTICUL',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating basket properties: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketproperties.update",
        {
            id: 17,
            fields: {
                name: 'Артикул',
                value: '123-456-789',
                code: 'ARTICUL',		}
        },
    )
        .then(
            function(result)
            {
                if (result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    console.log(result);
                }
            },
            function(error)
            {
                console.info(error);
            }
        );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.basketproperties.update',
        [
            'id' => 17,
            'fields' =>
            [
                'name' => 'Артикул',
                'value' => '123-456-789',
                'code' => 'ARTICUL',
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
        "basketProperty": {
            "basketId": 6806,
            "code": "ARTICUL",
            "id": 17,
            "name": "Артикул",
            "sort": 100,
            "value": "123-456-789",
            "xmlId": "bx_662a44cff2b81"
        }
    },
    "total": 1,
    "time": {
        "start": 1714049553.754992,
        "finish": 1714049555.158799,
        "duration": 1.4038069248199463,
        "processing": 0.67576003074646,
        "date_start": "2024-04-25T14:52:33+02:00",
        "date_finish": "2024-04-25T14:52:35+02:00",
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
|| **basketProperty**
[`sale_basket_item_property`](../data-types.md#sale_basket_item_property) | Объект с данными измененного свойства элемента (позиции) корзины ||
|| **total**
[`integer`](../../data-types.md) | Число обработанных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `20004030001` | Недостаточно прав для изменения ||
|| `100` | Не переданы обязательные параметры ||
|| `0` | Другие ошибки (например, отсутствие требуемых полей) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-basket-properties-add.md)
- [{#T}](./sale-basket-properties-get.md)
- [{#T}](./sale-basket-properties-list.md)
- [{#T}](./sale-basket-properties-delete.md)
- [{#T}](./sale-basket-properties-get-fields.md)