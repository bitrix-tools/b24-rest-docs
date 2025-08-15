# Создать свойство элемента корзины sale.basketproperties.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет свойство для элемента (позиции) корзины в заказе.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для создания свойства элемента (позиции) корзины:

```js
fields: {
    basketId: "значение",
    name: "значение",
    value: "значение",
    code: "значение",
    sort: "значение",
    xmlId: "значение",
}
```
 ||
|#

### Параметр fields {#parametr-fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **basketId***
[`sale_basket_item.id`](../data-types.md) | Идентификатор элемента (позиции) корзины заказа.
Может быть получен методами [`sale.basketitem.get`](../basket-item/sale-basket-item-get.md) или [`sale.basketitem.list`](../basket-item/sale-basket-item-list.md) ||
|| **name***
[`string`](../../data-types.md) | Название свойства ||
|| **value***
[`string`](../../data-types.md) | Значение свойства ||
|| **code***
[`string`](../../data-types.md) | Символьный код свойства ||
|| **sort**
[`integer`](../../data-types.md) | Положение в списке свойств.
Если не указать, будет присвоено значение по умолчанию — 100 ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код свойства.
Если не указать, будет сгенерирован автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"basketId":6806,"name":"Артикул","value":"4653-4877","code":"ARTICUL"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.basketproperties.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"basketId":6806,"name":"Артикул","value":"4653-4877","code":"ARTICUL"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.basketproperties.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.basketproperties.add",
    		{
    			fields: {
    				basketId: 6806,
    				name: 'Артикул',
    				value: '4653-4877',
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
                'sale.basketproperties.add',
                [
                    'fields' => [
                        'basketId' => 6806,
                        'name'     => 'Артикул',
                        'value'    => '4653-4877',
                        'code'     => 'ARTICUL',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding basket property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.basketproperties.add",
        {
            fields: {
                basketId: 6806,
                name: 'Артикул',
                value: '4653-4877',
                code: 'ARTICUL',
            }
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
        'sale.basketproperties.add',
        [
            'fields' =>
            [
                'basketId' => 6806,
                'name' => 'Артикул',
                'value' => '4653-4877',
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
            "value": "4653-4877",
            "xmlId": "bx_662a44cff2b81"
        }
    },
    "time": {
        "start": 1714046159.109796,
        "finish": 1714046163.282623,
        "duration": 4.1728270053863525,
        "processing": 3.4128189086914062,
        "date_start": "2024-04-25T13:55:59+02:00",
        "date_finish": "2024-04-25T13:56:03+02:00",
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
[`sale_basket_item_property`](../data-types.md#sale_basket_item_property) | Объект с данными созданного свойства элемента (позиции) корзины ||
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
|| `200040300010` | Недостаточно прав для добавления ||
|| `200240400004` | Basket item id is absent
Не указан идентификатор элемента (позиции) корзины ||
|| `200240400005` | Basket item id is bad
Неверный идентификатор элемента (позиции) корзины — например, строка ‘семьдесят’ ||
|| `200240400001`, `200240400002` | Не найден элемент (позиция) корзины ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-basket-properties-update.md)
- [{#T}](./sale-basket-properties-get.md)
- [{#T}](./sale-basket-properties-list.md)
- [{#T}](./sale-basket-properties-delete.md)
- [{#T}](./sale-basket-properties-get-fields.md)