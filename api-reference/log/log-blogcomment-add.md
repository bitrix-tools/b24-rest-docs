# Добавить комментарий к сообщению Ленты новостей log.blogcomment.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Добавляет комментарий к указанному сообщению Ленты новостей.

#|
|| **Параметр** | **Описание** | **Версия** ||
|| **USER_ID** | Автор комментария. Пользователь с обычными правами не может указать в качестве значения идентификатор другого пользователя. Такая возможность доступна только для пользователей с правами администратора | ||
|| **POST_ID** | ID сообщения | ||
|| **TEXT** | Текст комментария | ||
|| **FILES** | Файлы, массив значений, описанный по правилам [работы с файлами](../files/how-to-upload-files.md) | ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'log.blogcomment.add',
    		{
    			POST_ID: 10,
    			TEXT: 'Комментарий к посту'
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
                'log.blogcomment.add',
                [
                    'POST_ID' => 10,
                    'TEXT'    => 'Комментарий к посту',
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
        echo 'Error adding blog comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Пример добавления
    BX24.callMethod('log.blogcomment.add', {
        POST_ID: 10,
        TEXT: 'Комментарий к посту'
    }, result => {
        console.log(result);
    });
    ```

{% endlist %}

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'log.blogcomment.user.get',
    		{
    			FIRST_ID: 893,
    			LAST_ID: 894
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'FIRST_ID' => 893, // id из таблицы b_sonet_log_comment
            'LAST_ID'  => 894,
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'log.blogcomment.user.get',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting blog comments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Получает комментарий в ленте новостей. Если не передавать id в фильтр, вернёт все доступные по правам комментарии
    let params = {
        FIRST_ID: 893, //id из таблицы b_sonet_log_comment
        LAST_ID: 894,
    };
    BX24.callMethod('log.blogcomment.user.get', params,
        result => {
            if(result.error())
            {
                alert("Error: " + result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

{% endlist %}

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'log.blogcomment.delete',
    		{
    			COMMENT_ID: 261, //id из таблицы b_blog_comment
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'COMMENT_ID' => 261, //id из таблицы b_blog_comment
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'log.blogcomment.delete',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Удаляет комментарий в ленте новостей
    let params = {
        COMMENT_ID: 261, //id из таблицы b_blog_comment
    };
    BX24.callMethod('log.blogcomment.delete', params,
        result => {
            if(result.error())
            {
                alert("Error: " + result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

{% endlist %}
