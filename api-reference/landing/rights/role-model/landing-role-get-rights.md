# Получить список сайтов с правами для роли landing.role.getRights

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

{% note info "" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Права на выполнение**: `администратор`

{% endnote %}

Метод `landing.role.getRights` позволяет получить список сайтов, права на которые установлены в рамках роли. Метод вернет массив (см. пример), где ключами будут идентификаторы сайта, а значениями массив доступных операций (нулевой ключ означает доступ по-умолчанию для роли):

- **denied** - запрещено всё,
- **read** – чтение (право автоматически ставится системой дополнительно при указании любого другого отличного от denied),
- **edit** – изменение (содержимого страниц),
- **sett** – изменение настроек,
- **public** – публикация,
- **delete** – удаление (в корзину, и восстановление из корзины).

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор роли. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.role.getRights',
    		{
    			id: 11
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
                'landing.role.getRights',
                [
                    'id' => 11
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting role rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.getRights',
        {
            id: 11
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