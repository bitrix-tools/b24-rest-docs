# Добавить пользователей в группу sonet_group.user.add

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

Метод позволяет добавлять пользователей в качестве участников рабочей группы без необходимости приглашения и подтверждения. Для осуществления операции текущий пользователь должен иметь права администратора соцсети. В случае, если добавляется пользователь экстранет, группа станет доступной в экстранете (если не была до этого доступна).

## Параметры вызова

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | ID рабочей группы. ||
|| **USER_ID** | ID пользователя (или массив ID), который/ые добавляются в участники группы. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.user.add',
    		{
    			GROUP_ID: 15,
    			USER_ID: [ 10, 21 ]
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
                'sonet_group.user.add',
                [
                    'GROUP_ID' => 15,
                    'USER_ID'  => [10, 21],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding users to social network group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Добавляем пользователей с ID=10 и 21 в группу соцсети с ID=15
    BX24.callMethod('sonet_group.user.add', {
        GROUP_ID: 15,
        USER_ID: [ 10, 21 ]
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../../_includes/examples.md) %}