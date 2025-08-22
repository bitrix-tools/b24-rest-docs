# Добавить карточку с измененным контентом landing.block.addcard

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

Метод `landing.block.addcard` полностью повторяет работу [landing.block.clonecard](./landing-block-clone-card.md) но дает возможность вставить карточку сразу с измененным контентом.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **selector**
[`unknown`](../../../data-types.md) | [Селектор карточки](../manifest.md#ключ-cards), взятый с манифеста, с добавленным идентификатором карточки.
Например: `.landing-block-card@0`. 0 в конце означает, что воздействуем на первую по порядку карточку. | ||
|| **content**
[`unknown`](../../../data-types.md) | Содержимое новой карточки. | ||
|#

{% note warning %}

Обратите внимание, что как только вы склонировали карточку, их счетчики поменялись.

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.addCard',
    		{
    			lid: 634,
    			block: 12079,
    			selector: '.landing-block-node-menu-list-item@0',
    			content: '<li class="landing-block-node-menu-list-item nav-item g-mx-30--lg g-mb-7 g-mb-0--lg">' + '<a href="#about" class="landing-block-node-menu-list-item-link nav-link g-color-white p-0">New card item</a>' + '</li>'
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
                'landing.block.addCard',
                [
                    'lid'      => 634,
                    'block'    => 12079,
                    'selector' => '.landing-block-node-menu-list-item@0',
                    'content'  => '<li class="landing-block-node-menu-list-item nav-item g-mx-30--lg g-mb-7 g-mb-0--lg">' . '<a href="#about" class="landing-block-node-menu-list-item-link nav-link g-color-white p-0">New card item</a>' . '</li>'
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
        echo 'Error adding card: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.addCard',
        {
            lid: 634,
            block: 12079,
            selector: '.landing-block-node-menu-list-item@0',
            content: '<li class="landing-block-node-menu-list-item nav-item g-mx-30--lg g-mb-7 g-mb-0--lg">' + '<a href="#about" class="landing-block-node-menu-list-item-link nav-link g-color-white p-0">New card item</a>' + '</li>'
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