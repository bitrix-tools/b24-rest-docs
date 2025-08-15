# Изменить контент блока landing.block.updatecontent

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

Метод `landing.block.updatecontent` обновляет содержимое уже размещенного на странице блока на любой произвольный. Для изменения контентной части рекомендуется метод [landing.block.updatenodes](./landing-block-update-nodes.md). Вернет _true_ в случае успеха, или ошибку.

{% note warning %}

- Если новая разметка блока не будет согласовываться с его текущим манифестом, блок может оказаться не редактируемым.
- Контент пропускается через санитайзер, который может удалить некоторые подозрительные атрибуты и теги.

{% endnote %}

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **content**
[`unknown`](../../../data-types.md) | Новый контент блока | ||
|| **designed**
[`unknown`](../../../data-types.md) | Необязательный, по умолчанию _false_. Если передать _true_, то блок будет считаться как заблокированный к изменению штатным апдейтером системы. | ||
|#

{% note info %}

Атрибут **style** может вырезаться встроенным санитайзером. Чтобы это обойти используйте вместо него атрибут **bxstyle**. При добавлении система конвертирует его в штатный style.

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updatecontent',
    		{
    			lid: 625,
    			block: 11883,
    			content: '<h3>My super content</h3>'
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
                'landing.block.updatecontent',
                [
                    'lid'     => 625,
                    'block'   => 11883,
                    'content' => '<h3>My super content</h3>',
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
        echo 'Error updating block content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updatecontent',
        {
            lid: 625,
            block: 11883,
            content: '<h3>My super content</h3>'
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