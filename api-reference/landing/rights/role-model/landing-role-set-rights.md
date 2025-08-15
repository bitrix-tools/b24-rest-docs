# Установить права роли для списка сайтов landing.role.setRights

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

Метод `landing.role.setRights` устанавливает необходимые права в рамках роли для списков сайта. Все иные сайты, не указанные во входящем массиве считаются отвязанными от роли.

Ключами массива идут идентификаторы сайта, а значениями массив доступных операций (нулевой ключ означает доступ по-умолчанию для роли):

- **denied** - запрещено всё,
- **read** – чтение (право автоматически ставится системой дополнительно при указании любого другого отличного от denied),
- **edit** – изменение (содержимого страниц),
- **sett** – изменение настроек,
- **public** – публикация,
- **delete** – удаление (в корзину, и восстановление из корзины).

## Параметры

#|
|| **Параметры** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор роли. ||
|| **rights**
[`unknown`](../../../data-types.md) | Массив сайтов для привязки прав. См. пример. ||
|| **additional**
[`unknown`](../../../data-types.md) | Опционально может быть передан массив с дополнительными правами, кому разрешено в рамках роли:
- **menu24** – показывать ли для данной роли пункт меню "Сайты" / "Магазины" в облачном Битрикс24
- **create** – разрешать ли в рамках роли создавать сайты ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.role.setRights',
    		{
    			id: 11,
    			rights: {
    				'0': ['read'],
    				'66': ['read','edit','sett']
    			},
    			additional: ['menu24', 'create']
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
                'landing.role.setRights',
                [
                    'id' => 11,
                    'rights' => [
                        '0'  => ['read'],
                        '66' => ['read', 'edit', 'sett']
                    ],
                    'additional' => ['menu24', 'create']
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
        echo 'Error setting role rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.setRights',
        {
            id: 11,
            rights: {
                '0': ['read'],
                '66': ['read','edit','sett']
            },
            additional: ['menu24', 'create']
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