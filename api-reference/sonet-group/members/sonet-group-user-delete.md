# Удалить пользователей из группы sonet_group.user.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

Метод позволяет удалить пользователя или пользователей из рабочей группы. Для осуществления операции текущий пользователь должен иметь права администратора соцсети. Важно отметить, что если текущая роль пользователя является владельцем группы, он не может быть удален из группы с помощью этого метода.

## Параметры вызова

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | ID рабочей группы. ||
|| **USER_ID** | ID пользователя (или массив ID), который/ые удаляются из группы. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.user.delete',
    		{
    			GROUP_ID: 15,
    			USER_ID: [ 10, 21 ]
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Deleted users from group:', result);
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
                'sonet_group.user.delete',
                [
                    'GROUP_ID' => 15,
                    'USER_ID' => [10, 21]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting users from social network group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Удаляем пользователей с ID=10 и 21 из группы соцсети с ID=15
    BX24.callMethod('sonet_group.user.delete', {
        GROUP_ID: 15,
        USER_ID: [ 10, 21 ]
    });
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}