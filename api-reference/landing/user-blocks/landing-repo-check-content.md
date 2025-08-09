# Проверить контент на опасные подстроки landing.repo.checkContent

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repo.checkContent` проверяет контент на опасные подстроки. К таким относятся `onclick=""`, `<iframe>` и ряд других. При обычном кейсе использования варианты срабатывания минимальны. Метод используется исключительно для контроля содержимого при [регистрации блока](./landing-repo-register.md).

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **content**
[`unknown`](../../data-types.md) | Содержимое для тестирования. ||
|| **splitter**
[`unknown`](../../data-types.md) | Необязательный параметр для разделения опасных подстрок. По-умолчанию равен `#SANITIZE#`. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.checkContent',
    		{
    			content: '<div style="color: red" onclick="alert(123)"><iframe src="//evil.com"></iframe></div>',
    			splitter: '#AAA#'
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
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
                'landing.repo.checkContent',
                [
                    'content'  => '<div style="color: red" onclick="alert(123)"><iframe src="//evil.com"></iframe></div>',
                    'splitter' => '#AAA#',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.checkContent',
        {
            content: '<div style="color: red" onclick="alert(123)"><iframe src="//evil.com"></iframe></div>',
            splitter: '#AAA#'
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

# Ответ в случае успеха

> 200 OK
```json
content:"<div style="color: red" oncl#AAA#ick="alert(123)"><ifr#AAA#ame src="//evil.com"></iframe></div>"
is_bad:true
```

Собственно, метка `is_bad = true`, говорящая о том, что в содержимом есть опасные места, и сам текст, помеченный разделителями в опасных местах. Разработчику надлежит изменить такие места перед регистрацией.