# Изменить стили блока landing.block.updateStyles

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

Метод `landing.block.updateStyles` изменяет стили блока. Возвращает _true_ или ошибку.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **data**
[`unknown`](../../../data-types.md) | В параметре передается массив ключ-значение, где ключом идет селектор, а каждым значением указывается два массива:
- **classList** - какие классы добавить в изменяемый селектор.
- **affect** - передаются стили, которые надо обнулить у всех дочерних нод. Например, передаётся класс, который окрашивает элемент в цвет (color). Значит в affect надо передать массив [color], чтобы система обнулила все color у дочерних. Иначе будет такая ситуация - цвет родителя стоит красный, а текст внутри останется прежним.

Селектор может передаваться как без указания позиции (например, .landing-block-node-text), тогда будут изменены все карточки по данному селектору. Так и с указанием позиции (например, .landing-block-node-text@2), тогда будет изменена только карточка на указанной позиции (отсчет с нуля).

Селектор можно передавать в виде `#wrapper`, тогда влияние будет происходить на стили блока (его оболочки). | ||
|#

## Пример

В примере используется text-right - это **класс, который выравнивает справа**. Поэтому в affect задаётся что все нижележащие стили text-align должны быть удалены.

{% note warning %}

Такие классы как landing-block-node-text являются системными в манифесте. Если вы их не передадите, класс потеряется, и нода не сможет меняться через визуальный интерфейс. Вы должны четко понимать, что делаете.

{% endnote %}

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updateStyles',
    		{
    			lid: 311,
    			block: 6058,
    			data: {
    				'.landing-block-node-text': {
    					classList: ['landing-block-node-text', 'g-color-gray-light-v2', 'text-right'],
    					affect: ['text-align']
    				}
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
                'landing.block.updateStyles',
                [
                    'lid'   => 311,
                    'block' => 6058,
                    'data'  => [
                        '.landing-block-node-text' => [
                            'classList' => ['landing-block-node-text', 'g-color-gray-light-v2', 'text-right'],
                            'affect'    => ['text-align']
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
        echo 'Error updating block styles: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updateStyles',
        {
            lid: 311,
            block: 6058,
            data: {
                '.landing-block-node-text': {
                    classList: ['landing-block-node-text', 'g-color-gray-light-v2', 'text-right'],
                    affect: ['text-align']
                }
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