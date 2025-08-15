# Удалить группу соцсети sonet_group.delete

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

Удаляет группу соцсети. Для осуществления операции текущий пользователь должен быть либо владельцем группы, либо иметь права администратора соцсети.

## Параметры функции

#|
|| **Параметр** | **Описание** ||
|| **GROUP_ID** | ID группы, которую необходимо удалить. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

В случае успешного изменения группы возвращает **true**, иначе - текст ошибки.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sonet_group.delete',
    		{
    			'GROUP_ID': 11
    		}
    	);
    	
    	const result = response.getData().result;
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
                'sonet_group.delete',
                [
                    'GROUP_ID' => 11
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting social network group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Удаляем группы соцсети с ID=11

    BX24.callMethod('sonet_group.delete', {
        'GROUP_ID': 11
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}

## Запрос:

```http
https://mydomain.bitrix24.ru/rest/sonet_group.delete.json?auth=803f65e30340ff39703f8061c8b63a10&GROUP_ID=11
```

## Ответ:

>200 OK

```json
{"result":true}
```