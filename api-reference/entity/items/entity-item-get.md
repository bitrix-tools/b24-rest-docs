# Получить список элементов хранилища entity.item.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

Метод `entity.item.get` получает список элементов хранилища. Списочный метод.

Пользователь должен обладать хотя бы правами на чтение (**R**) хранилища.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^** | Обязательный. Строковой идентификатор хранилища. ||
|| **SORT** | Аналогичны параметрам *arOrder* и *arFilter* PHP-метода `CIBlockElement::GetList` (включая операции фильтра и сложную логику). ||
|| **FILTER** | Аналогичны параметрам *arOrder* и *arFilter* PHP-метода `CIBlockElement::GetList` (включая операции фильтра и сложную логику). ||
|| **start** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.get',
    		{
    			ENTITY: 'menu',
    			SORT: {
    				DATE_ACTIVE_FROM: 'ASC',
    				ID: 'ASC'
    			},
    			FILTER: {
    				'>=DATE_ACTIVE_FROM': dateStart,
    				'<DATE_ACTIVE_FROM': dateFinish
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	this.buildData(result);
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
                'entity.item.get',
                [
                    'ENTITY' => 'menu',
                    'SORT' => [
                        'DATE_ACTIVE_FROM' => 'ASC',
                        'ID' => 'ASC'
                    ],
                    'FILTER' => [
                        '>=DATE_ACTIVE_FROM' => $dateStart,
                        '<DATE_ACTIVE_FROM' => $dateFinish
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        $this->buildData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting entity items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.get',
        {
            ENTITY: 'menu',
            SORT: {
                DATE_ACTIVE_FROM: 'ASC',
                ID: 'ASC'
            },
            FILTER: {
                '>=DATE_ACTIVE_FROM': dateStart,
                '<DATE_ACTIVE_FROM': dateFinish
            }
        },
        $.proxy(
            this.buildData,
            this
        )
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.get.json?=&ENTITY=menu&FILTER%5B%3CDATE_ACTIVE_FROM%5D=2013-07-01T00%3A00%3A00.000Z&FILTER%5B%3E%3DDATE_ACTIVE_FROM%5D=2013-06-24T00%3A00%3A00.000Z&SORT%5BDATE_ACTIVE_FROM%5D=ASC&SORT%5BID%5D=ASC&auth=723867cdb1ada1de7870de8b0e558679
    ```

{% endlist %}

### Пример вызова со сложным фильтром

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.item.get',
    		{
    			ENTITY: 'menu',
    			SORT: {
    				DATE_ACTIVE_FROM: 'ASC',
    				ID: 'ASC'
    			},
    			FILTER: {
    				'1':{
    					'LOGIC':'OR',
    					'PROPERTY_MYPROP1':'value1',
    					'PROPERTY_MYPROP2':'value2'
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	// Необходимая вам логика обработки данных
    	processResult(result);
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
                'entity.item.get',
                [
                    'ENTITY' => 'menu',
                    'SORT' => [
                        'DATE_ACTIVE_FROM' => 'ASC',
                        'ID' => 'ASC'
                    ],
                    'FILTER' => [
                        '1' => [
                            'LOGIC' => 'OR',
                            'PROPERTY_MYPROP1' => 'value1',
                            'PROPERTY_MYPROP2' => 'value2'
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting entity items: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.get',
        {
            ENTITY: 'menu',
            SORT: {
                DATE_ACTIVE_FROM: 'ASC',
                ID: 'ASC'
            },
            FILTER: {
                '1':{
                    'LOGIC':'OR',
                    'PROPERTY_MYPROP1':'value1',
                    'PROPERTY_MYPROP2':'value2'
                }
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result":
    [
        {
            "ID":"838",
            "TIMESTAMP_X":"2013-06-25T15:06:47+03:00",
            "MODIFIED_BY":"1",
            "DATE_CREATE":"2013-06-25T15:06:47+03:00",
            "CREATED_BY":"1",
            "ACTIVE":"Y",
            "DATE_ACTIVE_FROM":"2013-07-01T03:00:00+03:00",
            "DATE_ACTIVE_TO":"",
            "SORT":"500",
            "NAME":"Гречка в мундире",
            "PREVIEW_PICTURE":null,
            "PREVIEW_TEXT":null,
            "DETAIL_PICTURE":null,
            "DETAIL_TEXT":null,
            "CODE":null,
            "ENTITY":"menu",
            "SECTION":null,
            "PROPERTY_VALUES":
            {
                "dish":"813",
                "price":"16"
            }
        }
    ],
    "total":1
}
```

