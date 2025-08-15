# Установить права доступа на сайт landing.site.setRights

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
> Кто может выполнять метод: администратор

Метод `landing.site.setRights` устанавливает права доступа для сайта. Вернёт *true* или ошибку. Метод доступен только администратору портала, а в облаке в том числе только платным тарифам.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор сайта. ||
|| **rights**
[`unknown`](../../../data-types.md) | Объект с правами, ключами которого являются уникальные идентификаторы (пользователя, отдела, группы, ...), а значениями допустимые операции:
- **denied** – доступ закрыт
- **read** – чтение
- **edit** – изменение (содержимого страниц)
- **sett** – изменение настроек
- **public** – публикация
- **delete** – удаление (в корзину, и восстановление из корзины)

Права независимы и могут даваться точечно. Например, пользователь может обладать только правом публикации без возможности любого изменения.

В качестве ключей можно использовать значения:
- **SG<X>** - рабочая группа
- **U<X>** - пользователь
- **DR<X>** - отдел, включая подразделы
- **UA** - все авторизованные пользователи
- **G<X>** - группа пользователей ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.setRights',
    		{
    			id: 645,
    			rights: {
    				'U3': [
    					'edit', 'delete'
    				],
    				'U1': [
    					'edit', 'sett'
    				]
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
                'landing.site.setRights',
                [
                    'id'     => 645,
                    'rights' => [
                        'U3' => ['edit', 'delete'],
                        'U1' => ['edit', 'sett'],
                    ],
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
        echo 'Error setting site rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.setRights',
        {
            id: 645,
            rights: {
                'U3': [
                    'edit', 'delete'
                ],
                'U1': [
                    'edit', 'sett'
                ]
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