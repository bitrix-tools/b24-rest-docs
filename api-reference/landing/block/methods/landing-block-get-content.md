# Получить контент блока landing.block.getcontent

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.block.getcontent` получает контент блока. Возвращает массив содержимого блока - html, файлы стилей и JS. Или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **editMode**
[`unknown`](../../../data-types.md) | Режим редактирования (1) или нет (0), вернется разный набор блоков | ||
|| **params**
[`unknown`](../../../data-types.md) | Массив дополнительных параметров. На данный момент поддерживает один ключ – **wrapper_show** – показывать ли обрамляющий системный div (0, 1). По умолчанию - показывать. | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getContent',
    		{
    			lid: 4858,
    			block: 39556,
    			editMode: 1,
    			params: {
    				wrapper_show: 0
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
                'landing.block.getContent',
                [
                    'lid'      => 4858,
                    'block'    => 39556,
                    'editMode' => 1,
                    'params'   => [
                        'wrapper_show' => 0
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
        echo 'Error getting landing block content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getContent',
        {
            lid: 4858,
            block: 39556,
            editMode: 1,
            params: {
                wrapper_show: 0
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}