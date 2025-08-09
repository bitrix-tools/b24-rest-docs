# Получить или изменить права доступа entity.rights

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.rights` получает или изменяет права доступа к хранилищу. Возвращает текущий набор прав доступа.

Для изменения набора прав доступа пользователь должен обладать правами на управление (**Х**) хранилищем. Пользователь не может отнять у себя права на управление.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор обновляемого хранилища. ||
|| **ACCESS**
[`unknown`](../../data-types.md) | Описание нового набора прав доступа к хранилищу. 
Должно иметь вид ассоциативного массива, ключами которого являются идентификаторы прав доступа, значением - **R** (чтение), **W** (запись) или **X** (управление). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.rights',
    		{
    			'ENTITY': 'dish'
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
                'entity.rights',
                [
                    'ENTITY' => 'dish'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling entity rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'entity.rights',
        {
            'ENTITY': 'dish'
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Ответ

> 200 OK
```json
{"result":
    {
        "AU":"R",
        "U254":"W",
        "D115":"W",
        "U255":"W",
        "U260":"W"
    }
}
```