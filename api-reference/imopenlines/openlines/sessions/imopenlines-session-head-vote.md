# Поставить оценку работе сотрудника в диалоге imopenlines.session.head.vote

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

Метод для оценки диалога руководителем.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Пример** | **Описание** ||
|| **SESSION_ID***
[`unknown`](../../../data-types.md) | `494` | Идентификатор сессии ||
|| **RATING**
[`unknown`](../../../data-types.md) | `5` | Количество звёзд от 1 до 5 ||
|| **COMMENT**
[`unknown`](../../../data-types.md) | `Молодец` | Комментарий руководителя ||
|#

**Обратите внимание:** несмотря на то, что два параметра не обязательны, как минимум один из них должен быть заполнен.

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
    		'imopenlines.session.head.vote',
    		{
    			CHAT_ID: 2024
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
                'imopenlines.session.head.vote',
                [
                    'CHAT_ID' => 2024
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
        echo 'Error voting for session head: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.session.head.vote',
        {
            CHAT_ID: 2024
        },
        function(result)
        {
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

```json
true
```

## Ответ в случае ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа к указанному чату ||
|| **CHAT_TYPE** | Указанный чат не является открытой линией ||
|| **CHAT_ID** | Указан не корректный идентификатор чата ||
|| **WRONG_PARAMETER** | Как минимум один из необязательных параметров должен быть указан ||
|#