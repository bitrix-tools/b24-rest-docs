# Удалить пользователя из чата imopenlines.crm.chat.user.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет пользователя из чата сущности CRM.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`unknown`](../../../data-types.md) | Тип CRM сущности:
- lead
- deal
- company
- contact
 ||
|| **CRM_ENTITY***
[`unknown`](../../../data-types.md) | Идентификатор CRM сущности ||
|| **USER_ID***
[`unknown`](../../../data-types.md) | Идентификатор пользователя или бота, которого мы хотим добавить в чат ||
|| **CHAT_ID**
[`unknown`](../../../data-types.md) | Идентификатор чата. Если не указан, будет использован чат, последний привязанный к сущности CRM ||
|#

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}


{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imopenlines.crm.chat.user.delete',
    		{
    			CRM_ENTITY_TYPE: 'deal',
    			CRM_ENTITY: 288,
    			USER_ID: 12,
    			CHAT_ID: 8773
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.chat.user.delete',
                [
                    'CRM_ENTITY_TYPE' => 'deal',
                    'CRM_ENTITY'      => 288,
                    'USER_ID'         => 12,
                    'CHAT_ID'         => 8773,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting chat user: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.crm.chat.user.delete',
        {
            CRM_ENTITY_TYPE: 'deal',
            CRM_ENTITY: 288,
            USER_ID: 12,
            CHAT_ID: 8773
        },
        function(result) {
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    // пример для php

{% endlist %}

## Ответ в случае успеха

Возвращает CHAT_ID в случае успеха.

```js
8773
```

## Ответ в случае ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа ||
|| **CRM_CHAT_EMPTY_USER** | Не указан идентификатор пользователя ||
|| **CRM_CHAT_EMPTY_CRM_DATA** | Не указаны данные CRM ||
|| **IM_NOT_INSTALLED** | Не установлен модуль im ||
|| **CHAT_NOT_IN_CRM** | Чат не относится к сущности CRM ||
|| **CHAT_DELETE_USER_PERMISSION_DENIED** | Пользователь не имеет доступа к сущности CRM ||
|| **CRM_CHAT_USER_NOT_ACTIVE** | Удаляемый пользователь не активен ||
|#