# Добавить сообщение в Ленту новостей от имени текущего пользователя log.blogpost.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- Нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

Добавляет в **Ленту новостей** сообщение от имени текущего пользователя.

## Запрос:

```http
https://my.bitrix24.ru/rest/log.blogpost.add.json?POST_MESSAGE=Hello%2C%20world!&auth=d9a76e2929b7bc1ff21aee9c0ce7e3e2
```

## Ответ:

```json
{"result":true}
```

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **USER_ID** | ID автора записи (опционально, по умолчанию - текущий пользователь, другое значение доступно только администратору в коробочной версии). ||
|| **POST_MESSAGE** | Текст сообщения. ||
|| **POST_TITLE** | Заголовок сообщения. ||
|| **DEST** |  Список адресатов, которые получат право на просмотр сообщения.  Возможные значения элементов массива:

{% include notitle [адресаты сообщения](./_includes/log-recepients.md) %}

Значение по умолчанию - `['UA']` ||
|| **SPERM** | Список адресатов, которые получат право на просмотр сообщения (устаревшее). Аналогично `DEST` ||
|| **FILES** | Файлы, массив значений, описанный по [правилам](../files/how-to-upload-files.md).||
|| **IMPORTANT** | По умолчанию N. Сообщение ленты публикуется как "важное". ||
|| **IMPORTANT_DATE_END** | Указывается значение даты/времени, до которого сообщение будет считаться важным. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'log.blogpost.add',
    		{
    			POST_TITLE: 'Заголовок',
    			POST_MESSAGE: 'Текст',
    			DEST: ['SG1', 'U2']
    		}
    	);
    	
    	const result = response.getData().result;
    	alert('OK!');
    }
    catch( error )
    {
    	console.log(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogpost.add',
                [
                    'POST_TITLE'   => 'Заголовок',
                    'POST_MESSAGE' => 'Текст',
                    'DEST'         => ['SG1', 'U2']
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        alert('OK!');
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('log.blogpost.add', {
        POST_TITLE: 'Заголовок',
        POST_MESSAGE: 'Текст',
        DEST: ['SG1', 'U2']
    }, result => {
        if(result.error())
        {
            console.log(result.error());
        }
        else
        {
            alert('OK!');
        }
    });
    ```

{% endlist %}

## Запрос

{% list tabs %}

- URL-запрос

    ```http
    https://my.bitrix24.ru/rest/log.blogpost.add.json?POST_MESSAGE=Hello%2C%20world!&auth=d9a76e2929b7bc1ff21aee9c0ce7e3e2
    ```

{% endlist %}

## Ответ

```json
{"result": true}
```

## Смотрите также

[Использование метода REST API log.blogpost.add](http://dev.1c-bitrix.ru/community/blogs/wladart/rest_logblogpostadd.php) (блог разработчика)
