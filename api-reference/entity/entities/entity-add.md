# Создать хранилище данных entity.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.add` cоздает хранилище данных. Перед созданием проверить наличие хранилища можно с помощью [entity.get](./entity-get.md)

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища, уникален для данного приложения (максимальная длина - 13 символов). ||
|| **NAME**^*^
[`string`](../../data-types.md) | Обязательный. Название хранилища ||
|| **ACCESS**
[`unknown`](../../data-types.md) | Описание прав доступа к хранилищу. 
Должно иметь вид ассоциативного массива, ключами которого являются идентификаторы прав доступа, значением - **R** (чтение), **W** (запись) или **X** (управление). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Создатель хранилища автоматически получает право **X**.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.add',
    		{
    			'ENTITY': 'dish',
    			'NAME': 'Dishes',
    			'ACCESS': {
    				U1:'W',
    				AU:'R'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Created element with ID:', result);
    	// Нужная вам логика обработки данных
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.add',
                [
                    'ENTITY' => 'dish',
                    'NAME'   => 'Dishes',
                    'ACCESS' => [
                        'U1' => 'W',
                        'AU' => 'R'
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
        echo 'Error adding entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'entity.add',
        {
            'ENTITY': 'dish',
            'NAME': 'Dishes',
            'ACCESS': {
                U1:'W',
                AU:'R'
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}