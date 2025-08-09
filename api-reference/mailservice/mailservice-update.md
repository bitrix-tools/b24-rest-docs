# Изменить параметры почтового сервиса mailservice.update

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

Метод `mailservice.update` обновляет параметры почтового сервиса.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** | **С версии** ||
|| **ID**
[`unknown`](../data-types.md) | Идентификатор почтового сервиса | ||
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
    		"mailservice.update",
    		{
    			'ID': 5,
    			'ACTIVE': 'N',
    			'NAME': 'Почтовый сервис Yandex',
    			'SERVER': 'imap.yandex.ru',
    			'PORT': '993',
    			'ENCRYPTION': 'Y',
    			'LINK': 'https://mail.yandex.ru/',
    			'SORT': '666'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch(error)
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
                'mailservice.update',
                [
                    'ID'        => 5,
                    'ACTIVE'    => 'N',
                    'NAME'      => 'Почтовый сервис Yandex',
                    'SERVER'    => 'imap.yandex.ru',
                    'PORT'      => '993',
                    'ENCRYPTION' => 'Y',
                    'LINK'      => 'https://mail.yandex.ru/',
                    'SORT'      => '666',
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
        echo 'Error updating mail service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "mailservice.update",
        {
            'ID': 5,
            'ACTIVE': 'N',
            'NAME': 'Почтовый сервис Yandex',
            'SERVER': 'imap.yandex.ru',
            'PORT': '993',
            'ENCRYPTION': 'Y',
            'LINK': 'https://mail.yandex.ru/',
            'SORT': '666'
        },
        function(result)
        {
            if(result.errorы())
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