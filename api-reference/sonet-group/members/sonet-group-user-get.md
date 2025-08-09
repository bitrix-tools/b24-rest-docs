# Получить список участников группы sonet_group.user.get

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

Метод возвращает массив участников группы соцсети, осуществляя вызов `CSocNetUserToGroup::GetList()`, при этом проверяются права на доступ текущего пользователя к группе. Метод не возвращает неактивных пользователей (уволенных сотрудников).

## Поля участников:

- **USER_ID** - ID пользователя.
- **ROLE** - роль пользователя в группе:
  - **SONET_ROLES_OWNER (A)** - владелец,
  - **SONET_ROLES_MODERATOR (E)** - модератор,
  - **SONET_ROLES_USER (K)** - пользователь.

## Параметры функции

#|
|| **Параметр** | **Описание** ||
|| **ID** | ID группы, участников которой необходимо получить. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod('sonet_group.user.get', {
    		'ID': 15
    	});
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'sonet_group.user.get',
                [
                    'ID' => 15
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting group users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Получаем список участников группы соцсети с ID=15
    BX24.callMethod('sonet_group.user.get', {
        'ID': 15
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Запрос:

```
https://mydomain.bitrix24.ru/rest/sonet_group.user.get.json?auth=67df5afc8ce59732e4a21ed3e336979f&ID=15
```

## Ответ:

>200 OK

```json
{"result":[{"USER_ID":"1","ROLE":"A"}]}
```