# Изменить товар crm.product.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "Развитие метода остановлено" %}

Метод `crm.product.update` продолжает работать, но у него есть более актуальные аналоги [catalog.product.*](../../../catalog/product/index.md).

{% endnote %}

Метод `crm.product.update` обновляет существующий товар.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор товара ||
|| **fields**
[`array`](../../../data-types.md) | [Набор полей](./crm-product-add.md) - массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.product.fields](./crm-product-fields.md). 
Необходимо обязательно указать `CURRENCY_ID` для установки цены. 

Чтобы узнать требуемый формат полей, выполните метод [crm.product.fields](./crm-product-property-fields.md) и посмотрите формат пришедших значений этих полей.

Для удаления файла в поле `valueId` указывается идентификатор значения свойства, а не идентификатор файла ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Пример 1

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_product_id","fields":{"CURRENCY_ID":"RUB","PRICE":5000}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.product.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"your_product_id","fields":{"CURRENCY_ID":"RUB","PRICE":5000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.product.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.product.update",
    		{
    			id: id,
    			fields:
    			{
    				"CURRENCY_ID": "RUB",
    				"PRICE": 5000
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
                'crm.product.update',
                [
                    'id' => $id,
                    'fields' => [
                        'CURRENCY_ID' => 'RUB',
                        'PRICE' => 5000
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Info: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.product.update",
        {
            id: id,
            fields:
            {
                "CURRENCY_ID": "RUB",
                "PRICE": 5000
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

    $id = 'your_product_id'; // Replace 'your_product_id' with the actual product ID

    $result = CRest::call(
        'crm.product.update',
        [
            'id' => $id,
            'fields' => [
                'CURRENCY_ID' => 'RUB',
                'PRICE' => 5000
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Пример 2

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.product.update",
    		{
    			id: 4611,
    			fields:
    			{
    				"PROPERTY_186": [
    					{
    						"valueId": 0,
    						"fileData": ["1.jpg", "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYH"+"BwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMD"+"AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAARABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAA"+"AAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fA"+"kM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWW"+"l5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBA"+"QEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRob"+"HBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYa"+"HiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oA"+"DAMBAAIRAxEAPwDqvg78Hf8Ahawjt7eO+n1Ce5NvDDbso3YVWycg4xkkkkAAZOACa0vjF+z3J8ILO6j1CHULXULdI5Fjl"+"kR0dWYDIKjDDkjIPUEdQRR+z38YofhBcQ6hHdR2+oWt20sayQtIrqyBCDgdCNw4IPPBBwa2P2hv2ho/jdbXV1dXVu140U"+"UEMMFu8caIrhsDcM9SzZYk5PpgD+OcViuKVxTGlSi/qN1d2le/MtFpbl5d366q2vDk2TeGUvDJ4jEPBfXvqVaXvVoLEfW"+"FCfIlDnvzX5bLlu38k/F6KKK/Xj+EQooooAKKKKAP/9k="]
    					},
    					{
    						"valueId": 124,
    						"value": {"remove": "Y"}
    					}
    				]
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
                'crm.product.update',
                [
                    'id'     => 4611,
                    'fields' => [
                        'PROPERTY_186' => [
                            [
                                'valueId' => 0,
                                'fileData' => ['1.jpg', '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYH'.'BwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMD'.'AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAARABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAA'.'AAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fA'.'kM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWW'.'l5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBA'.'QEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRob'.'HBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYa'.'HiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oA'.'DAMBAAIRAxEAPwDqvg78Hf8Ahawjt7eO+n1Ce5NvDDbso3YVWycg4xkkkkAAZOACa0vjF+z3J8ILO6j1CHULXULdI5Fjl'.'kR0dWYDIKjDDkjIPUEdQRR+z38YofhBcQ6hHdR2+oWt20sayQtIrqyBCDgdCNw4IPPBBwa2P2hv2ho/jdbXV1dXVu140U'.'UEMMFu8caIrhsDcM9SzZYk5PpgD+OcViuKVxTGlSi/qN1d2le/MtFpbl5d366q2vDk2TeGUvDJ4jEPBfXvqVaXvVoLEfW'.'FCfIlDnvzX5bLlu38k/F6KKK/Xj+EQooooAKKKKAP/9k=']
                            ],
                            [
                                'valueId' => 124,
                                'value'   => ['remove' => 'Y']
                            ]
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.product.update",
        {
            id: 4611,
            fields:
            {
                "PROPERTY_186": [
                    {
                        "valueId": 0,
                        "fileData": ["1.jpg", "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYH"+"BwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMD"+"AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAARABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAA"+"AAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fA"+"kM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWW"+"l5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBA"+"QEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRob"+"HBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYa"+"HiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oA"+"DAMBAAIRAxEAPwDqvg78Hf8Ahawjt7eO+n1Ce5NvDDbso3YVWycg4xkkkkAAZOACa0vjF+z3J8ILO6j1CHULXULdI5Fjl"+"kR0dWYDIKjDDkjIPUEdQRR+z38YofhBcQ6hHdR2+oWt20sayQtIrqyBCDgdCNw4IPPBBwa2P2hv2ho/jdbXV1dXVu140U"+"UEMMFu8caIrhsDcM9SzZYk5PpgD+OcViuKVxTGlSi/qN1d2le/MtFpbl5d366q2vDk2TeGUvDJ4jEPBfXvqVaXvVoLEfW"+"FCfIlDnvzX5bLlu38k/F6KKK/Xj+EQooooAKKKKAP/9k="]
                    },
                    {
                        "valueId": 124,
                        "value": {"remove": "Y"}
                    }
                ]
            }
        },
        function (result) {
            if (result.error())
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
        'crm.product.update',
        [
            'id' => 4611,
            'fields' => [
                'PROPERTY_186' => [
                    [
                        'valueId' => 0,
                        'fileData' => ['1.jpg', '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYH'.'BwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMD'.'AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAARABEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAA'.'AAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fA'.'kM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWW'.'l5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBA'.'QEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRob'.'HBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYa'.'HiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oA'.'DAMBAAIRAxEAPwDqvg78Hf8Ahawjt7eO+n1Ce5NvDDbso3YVWycg4xkkkkAAZOACa0vjF+z3J8ILO6j1CHULXULdI5Fjl'.'kR0dWYDIKjDDkjIPUEdQRR+z38YofhBcQ6hHdR2+oWt20sayQtIrqyBCDgdCNw4IPPBBwa2P2hv2ho/jdbXV1dXVu140U'.'UEMMFu8caIrhsDcM9SzZYk5PpgD+OcViuKVxTGlSi/qN1d2le/MtFpbl5d366q2vDk2TeGUvDJ4jEPBfXvqVaXvVoLEfW'.'FCfIlDnvzX5bLlu38k/F6KKK/Xj+EQooooAKKKKAP/9k=']
                    ],
                    [
                        'valueId' => 124,
                        'value' => ['remove' => 'Y']
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}
