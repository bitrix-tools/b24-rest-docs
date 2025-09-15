# Пригласить пользователей в группу sonet_group.user.invite

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

> Scope: [`sonet`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

Метод выполняет приглашение пользователей в группу соцсети от лица текущего пользователя, при этом проверяются права на доступ текущего пользователя к группе.

## Возвращает массив ID пользователей, успешно приглашенных в группу.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | ID группы, в которую происходит приглашение. ||
|| **USER_ID** | ID пользователя (или массив ID пользователей), который приглашается (которые приглашаются) в группу. ||
|| **MESSAGE** | Текст приглашения. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.user.invite',
    		{
    			'GROUP_ID': 15,
    			'USER_ID': 3,
    			'MESSAGE': 'Invitation'
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
                'sonet_group.user.invite',
                [
                    'GROUP_ID' => 15,
                    'USER_ID' => 3,
                    'MESSAGE' => 'Invitation',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error inviting user to group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Приглашаем пользователя с ID=3 в группу соцсети с ID=15
    BX24.callMethod('sonet_group.user.invite', {
        'GROUP_ID': 15,
        'USER_ID': 3,
        'MESSAGE': 'Invitation'
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../../_includes/examples.md) %}


## Запрос:

```
https://mydomain.bitrix24.ru/rest/sonet_group.user.invite.json?auth=52423d4a5f19f5f964f9b4e96a925cfa&GROUP_ID=15&USER_ID=3&MESSAGE=Invitation
```

## Ответ:

>200 OK

```json
{"result":["3"]}
```