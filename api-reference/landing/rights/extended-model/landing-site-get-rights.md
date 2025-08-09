# Получить права доступа текущего пользователя landing.site.getRights

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

Метод `landing.site.getRights` вернет права текущего пользователя. В случае несуществующего сайта или отсутствия прав на него вернется одинаковое состояние – пустой массив. В ином случае массив, состоящий из возможных значений:

- **denied** - запрещено всё,
- **read** – чтение (право автоматически ставится системой дополнительно при указании любого другого отличного от denied),
- **edit** – изменение (содержимого страниц),
- **sett** – изменение настроек,
- **public** – публикация,
- **delete** – удаление (в корзину, и восстановление из корзины).

## Параметры

#|
|| **Метод** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор сайта. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getRights',
    		{
    			id: 645
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
                'landing.site.getRights',
                [
                    'id' => 645,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting site rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getRights',
        {
            id: 645
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