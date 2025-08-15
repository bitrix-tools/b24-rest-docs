# Удалить карточку блока landing.block.removecard

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

Метод `landing.block.removecard` удаляет карточку блока. Возвращает *_true_* или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **selector**
[`unknown`](../../../data-types.md) | [Селектор карточки](../manifest.md#ключ-cards) взятый с манифеста, с добавленным идентификатором карточки.
Например: '.landing-block-card@0'. 0 в конце означает, что воздействуем на первую по порядку карточку. | ||
|#

{% note warning %}

Обратите внимание, что как только вы удалили карточку, их счетчики поменялись.

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.removecard',
    		{
    			lid: 311,
    			block: 6057,
    			selector: '.landing-block-card@0'
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
                'landing.block.removecard',
                [
                    'lid'      => 311,
                    'block'    => 6057,
                    'selector' => '.landing-block-card@0',
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
        echo 'Error removing card: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.removecard',
        {
            lid: 311,
            block: 6057,
            selector: '.landing-block-card@0'
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