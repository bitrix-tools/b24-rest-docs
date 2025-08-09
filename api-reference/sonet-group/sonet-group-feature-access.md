# Проверить права текущего пользователя sonet_group.feature.access

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

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Проверяет, имеет ли текущий пользователь право на совершение операции в группе соцсети, осуществляя вызов функции `CSocNetFeaturesPerms::CurrentUserCanPerformOperation()`.

## Запрос:

```http
https://mydomain.bitrix24.ru/rest/sonet_group.feature.access.json?auth=52423d4a5f19f5f964f9b4e96a925cfa&GROUP_ID=1&FEATURE=blog&OPERATION=write_post
```

## Ответ:

>200 OK

```json
{"result":true}
```

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | ID группы соцсети. ||
|| **FEATURE** | Символьный код функционала. ||
|| **OPERATION** | Символьный код операции. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

Возвращает **true**, если пользователь имеет право на совершение операции, **false** - если не имеет и ошибку в случае некорректных параметров.

{% note info "Примечание" %}

Коды операций и функционала смотрите в описании метода `CanPerformOperation`.

{% endnote %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.feature.access',
    		{
    			'GROUP_ID': 1,
    			'FEATURE': 'blog',
    			'OPERATION': 'write_post'
    		}
    	);
    	
    	const result = response.getData().result;
    	// Нужная вам логика обработки данных
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
                'sonet_group.feature.access',
                [
                    'GROUP_ID' => 1,
                    'FEATURE' => 'blog',
                    'OPERATION' => 'write_post'
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
        echo 'Error getting group list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Получаем список групп текущего пользователя

    BX24.callMethod('sonet_group.feature.access', {
        'GROUP_ID': 1,
        'FEATURE': 'blog',
        'OPERATION': 'write_post'
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}