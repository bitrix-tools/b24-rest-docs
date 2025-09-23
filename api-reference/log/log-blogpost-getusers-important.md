# Просмотреть пользователей, прочитавших важное сообщение log.blogpost.getusers.important

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
- в описании нужна ссылка на пользовательскую документацию на статью про важные сообщения

{% endnote %}

{% endif %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Отдает массив идентификаторов пользователей, прочитавших указанное важное сообщение.

#|
|| **Параметр** | **Описание** ||
|| **POST_ID** | ID сообщения ленты новостей, являющегося важным сообщением. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'log.blogpost.getusers.important',
    		{
    			POST_ID: 345
    		}
    	);
    	
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
                'log.blogpost.getusers.important',
                [
                    'POST_ID' => 345
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
        echo 'Error getting important blog post users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.getusers.important',
        {
            POST_ID: 345
        },
        function(result)
        {
            console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Запрос:

{% list tabs %}

- URL-запрос

    ```http
    https://my.bitrix24.ru/rest/log.blogpost.getusers.important.json?POST_ID=345&auth=xxxxxxx
    ```

{% endlist %}

## Ответ:

> 200 OK

```json
{"result":["1","2","3"]}
```
