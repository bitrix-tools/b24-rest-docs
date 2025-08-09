# Изменить название тега landing.block.changeNodeName

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

Метод `landing.block.changeNodeName` изменяет название тега. Например, тег h3 требуется поменять на тег h1. Вернет _true_ в случае успеха, или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **data**
[`unknown`](../../../data-types.md) | Массив селекторов и новых значений. Подробнее смотрите пример.
Селектор может передаваться как без указания позиции (например, `.landing-block-node-text`), тогда будут изменены все карточки по данному селектору. Так и с указанием позиции (например, `.landing-block-node-text@2`), тогда будет изменена только карточка на указанной позиции (отсчет с нуля). | ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.changeNodeName',
    		{
    			lid: 2006,
    			block: 20476,
    			data: {
    				'.landing-block-node-small-title@0': 'i',
    				'.landing-block-node-small-title@1': 'u'
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
                'landing.block.changeNodeName',
                [
                    'lid'   => 2006,
                    'block' => 20476,
                    'data'  => [
                        '.landing-block-node-small-title@0' => 'i',
                        '.landing-block-node-small-title@1' => 'u'
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
        echo 'Error changing node name: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.changeNodeName',
        {
            lid: 2006,
            block: 20476,
            data: {
                '.landing-block-node-small-title@0': 'i',
                '.landing-block-node-small-title@1': 'u'
            }
        },
        function (result)
        {
            if (result.error())
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