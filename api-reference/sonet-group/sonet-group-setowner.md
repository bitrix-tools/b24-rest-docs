# Изменить владельца группы sonet_group.setowner

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет владельца группы. Может быть запущен либо администратором социальной сети, либо текущим владельцем группы.

## Параметры:

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | Идентификатор группы, владелец которой меняется. ||
|| **USER_ID** | Идентификатор нового владельца. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

В случае успеха возвращает `true`.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.setowner',
    		{
    			'GROUP_ID': 11,
    			'USER_ID': 2
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
                'sonet_group.setowner',
                [
                    'GROUP_ID' => 11,
                    'USER_ID'  => 2
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting group owner: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.setowner', {
        'GROUP_ID': 11,
        'USER_ID': 2
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}