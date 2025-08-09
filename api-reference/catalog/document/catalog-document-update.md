# Изменить документ складского учета catalog.document.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- нет примеров на др. языках
- уточнить тип параметра id
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

```http
catalog.document.update(id, fields)
```

Метод для обновления документа складского учёта.
Если операция успешна, возвращается `true` добавленного склада.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор документа. ||
|| **fields** 
[`array`](../../data-types.md)|  Параметры документа. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.update',
    		{
    			'id': 42,
    			'fields': {
    				'total': '1000', // общая сумма всех PURCHASING_PRICE умноженных на AMOUNT
    				'commentary': 'first document.',
    				'title': 'Новый документ', //заголовок (поле доступно с версии catalog 22.200.0)
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
                'catalog.document.update',
                [
                    'id'     => 42,
                    'fields' => [
                        'total'      => '1000', // общая сумма всех PURCHASING_PRICE умноженных на AMOUNT
                        'commentary' => 'first document.',
                        'title'      => 'Новый документ', //заголовок (поле доступно с версии catalog 22.200.0)
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.update',
        {
            'id': 42,
            'fields': {
                'total': '1000', // общая сумма всех PURCHASING_PRICE умноженных на AMOUNT
                'commentary': 'first document.',
                'title': 'Новый документ', //заголовок (поле доступно с версии catalog 22.200.0)
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
    $result = CRest::call(
        'catalog.document.update',
        [
            'id' => 42,
            'fields' => [
                'total' => '1000',
                'commentary' => 'first document.',
                'title' => 'Новый документ',
            ],
        ]
    );
    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
