# Установить включаемые области для страницы landing.template.setLandingRef

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.template.setLandingRef` устанавливает включаемые области для страницы в рамках конкретного шаблона (страница должна быть уже привязана к шаблону через поле TPL_ID). Вернет *true* в случае успеха, или ошибку.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор страницы. ||
|| **data**
[`unknown`](../../data-types.md) | Массив данных для установки (если массив пустой или не передан, установленные области сбросятся). Ключами массива являются идентификаторы областей, а значениями идентификаторы страниц, которые необходимо установить как область. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.template.setLandingRef',
    		{
    			id: 557,
    			data: {
    				1: 614,
    				2: 615,
    				3: 616
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'landing.template.setLandingRef',
                [
                    'id' => 557,
                    'data' => [
                        1 => 614,
                        2 => 615,
                        3 => 616
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
        echo 'Error setting landing reference: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.template.setLandingRef',
        {
            id: 557,
            data: {
                1: 614,
                2: 615,
                3: 616
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}