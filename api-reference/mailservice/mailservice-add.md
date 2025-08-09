# Создать новый почтовый сервис mailservice.add

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует описание типов параметров
- нет примеров ответов
- не указаны версии параметров

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `mailservice.add` добавляет новый почтовый сервис.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** | **С версии** ||
|| **ACTIVE**
[`unknown`](../data-types.md) | Активность сервиса (Y / N) | ||
|| **NAME**
[`unknown`](../data-types.md) | Имя добавляемого почтового сервиса | ||
|| **SERVER**
[`unknown`](../data-types.md) | Адрес добавляемого сервера | ||
|| **PORT**
[`unknown`](../data-types.md) | Номер порта | ||
|| **ENCRYPTION**
[`unknown`](../data-types.md) | Необходимость шифрования (Y / N) | ||
|| **LINK**
[`unknown`](../data-types.md) | Ссылка на почтовый сервис | ||
|| **SORT**
[`unknown`](../data-types.md) | Индекс сортировки | ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"mailservice.add",
    		{
    			'ACTIVE': 'Y',
    			'NAME': 'Мой почтовый сервис',
    			'SERVER': 'imap.my-mail.ru',
    			'PORT': '993',
    			'ENCRYPTION': 'Y',
    			'LINK': 'https://mail.my-mail.ru/',
    			'SORT': '500'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mailservice.add',
                [
                    'ACTIVE'     => 'Y',
                    'NAME'       => 'Мой почтовый сервис',
                    'SERVER'     => 'imap.my-mail.ru',
                    'PORT'       => '993',
                    'ENCRYPTION' => 'Y',
                    'LINK'       => 'https://mail.my-mail.ru/',
                    'SORT'       => '500',
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
        echo 'Error adding mail service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "mailservice.add",
        {
            'ACTIVE': 'Y',
            'NAME': 'Мой почтовый сервис',
            'SERVER': 'imap.my-mail.ru',
            'PORT': '993',
            'ENCRYPTION': 'Y',
            'LINK': 'https://mail.my-mail.ru/',
            'SORT': '500'
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}