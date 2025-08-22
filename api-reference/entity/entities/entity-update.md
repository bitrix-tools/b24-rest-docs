# Изменить параметры хранилища entity.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.update` обновляет параметры хранилища данных. Пользователь должен обладать правами на управление (**Х**) хранилищем. Пользователь не может отнять у себя права на управление.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор обновляемого хранилища. ||
|| **NAME**
[`string`](../../data-types.md) | Новое название хранилища. ||
|| **ACCESS**
[`unknown`](../../data-types.md) | Описание нового набора прав доступа к хранилищу. 
Должно иметь вид ассоциативного массива, ключами которого являются идентификаторы прав доступа, значением - **R** (чтение), **W** (запись) или **X** (управление). ||
|| **ENTITY_NEW**
[`string`](../../data-types.md) | Новый строковой идентификатор хранилища. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.update',
    		{
    			'ENTITY': 'dish',
    			'ACCESS': {
    				U1:'W',
    				AU:'R'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
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
                'entity.update',
                [
                    'ENTITY' => 'dish',
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
        echo 'Error updating entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'entity.update',
        {
            'ENTITY': 'dish',
            'ACCESS': {
                U1:'W',
                AU:'R'
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}