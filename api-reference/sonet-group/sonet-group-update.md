# Изменить параметры группы соцсети sonet_group.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет таблицы параметров
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет параметры группы соцсети, используя метод API `CSocNetGroup::Update()`. Для осуществления операции текущий пользователь должен быть либо владельцем группы, либо иметь права администратора соцсети.

## Параметры:

Получает в параметрах все поля, необходимые для работы метода `CSocNetGroup::Update()`, а также `GROUP_ID` - ID группы, которую необходимо изменить.

В случае успешного изменения группы, возвращает ее ID, иначе - текст ошибки.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.update',
    		{
    			'GROUP_ID': 11,
    			'NAME': 'Test sonet group XXX'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Updated group with ID:', result);
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
                'sonet_group.update',
                [
                    'GROUP_ID' => 11,
                    'NAME' => 'Test sonet group XXX'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating social network group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Изменяем название группы соцсети с ID=11 на 'Test sonet group XXX'
    BX24.callMethod('sonet_group.update', {
        'GROUP_ID': 11,
        'NAME': 'Test sonet group XXX'
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}

## Запрос:

```
https://mydomain.bitrix24.ru/rest/sonet_group.update.json?auth=803f65e30340ff39703f8061c8b63a10&GROUP_ID=11&NAME=Test%20sonet%20group%20XXX
```

## Ответ:

>200 OK

```json
{"result":11}
```