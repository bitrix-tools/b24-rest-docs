# Изменить роль пользователя в группе sonet_group.user.update

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

Метод позволяет изменить роль пользователя или пользователей в рабочей группе. Для осуществления операции текущий пользователь должен иметь права администратора соцсети. Важно отметить, что если текущая роль пользователя является владельцем группы, она не может быть изменена с помощью этого метода.

## Параметры вызова

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | ID рабочей группы. ||
|| **USER_ID** | ID пользователя (или массив ID), которому/которым меняется роль. ||
|| **ROLE** | Код новой роли участника группы (доступны значения `E` - модератор и `K` - участник). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.user.update',
    		{
    			GROUP_ID: 15,
    			USER_ID: [ 10, 21 ],
    			ROLE: 'E'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Updated user roles:', result);
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
                'sonet_group.user.update',
                [
                    'GROUP_ID' => 15,
                    'USER_ID'  => [10, 21],
                    'ROLE'     => 'E',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating user roles: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Меняем роли пользователей с ID=10 и 21 в группе соцсети с ID=15 на модераторов
    BX24.callMethod('sonet_group.user.update', {
        GROUP_ID: 15,
        USER_ID: [ 10, 21 ],
        ROLE: 'E'
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../../_includes/examples.md) %}