# Загрузить и привязать картинку к блоку landing.block.uploadfile

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.block.uploadfile` загружает картинку и привязывает ее к указанному блоку. В случае успеха возвращает пару: прямой путь до загруженного файла и id сохраненного файла. С этого момента картинка удалится только при полном удалении блока, страницы, содержащей блок, или через вызов метода [landing.landing.removeEntities](../../page/methods/landing-landing-remove-entities.md).

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **block**
[`unknown`](../../../data-types.md) | `ID` блока | ||
|| **picture**
[`unknown`](../../../data-types.md) | Варианты:
1. Путь до картинки, размещенной по веб-адресу.
2. `document.getElementById('file')` в случае работы через JS API.
3. Массив имя + содержимое
```json
{
    "0": "name.jpg",
    "1": "base64-содержимое файла"
}
``` 
| ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.uploadfile',
    		{
    			block: 12294,
    			picture: 'https://site.com/******.jpg'
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
                'landing.block.uploadfile',
                [
                    'block'   => 12294,
                    'picture' => 'https://site.com/******.jpg',
                    // 'picture' => document.getElementById('file')
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
        echo 'Error uploading file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.uploadfile',
        {
            block: 12294,
            picture: 'https://site.com/******.jpg'
    //        picture: document.getElementById('file')
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}