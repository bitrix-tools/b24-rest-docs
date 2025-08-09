# Изменить значения пользовательских полей документов складского учета catalog.userfield.document.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки 
- нет примеров на др. языках
- добавить ссылку на [`userfieldconfig.list`](.)
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
catalog.userfield.document.update(documentId, fields)
```

Метод обновляет значения пользовательских полей документов складского учёта.

## Параметры

#|
|| **Параметр** | **Описание**  ||
|| **documentId** 
[`integer`](../../data-types.md) | Идентификатор документа складского учёта. | ||
|| **fields** 
[`object`](../../data-types.md)| Поля, которые нужно обновить, и их новые значения. Обязательно должен быть указан `documentType` – [тип документов складского учёта](../enum/catalog-enum-get-store-document-types.md). | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

### Пример

В API используются названия полей в виде `field[ID поля в базе]` – например, `field287`. ID поля можно узнать с помощью метода [`userfieldconfig.list`](.).

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.userfield.document.update',
    		{
    			documentId: 64,
    			fields: {
    				'documentType': 'S',
    				'field287': 'new value'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.userfield.document.update',
                [
                    'documentId' => 64,
                    'fields'     => [
                        'documentType' => 'S',
                        'field287'     => 'new value'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating document user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.userfield.document.update',
        {
            documentId: 64,
            fields: {
                'documentType': 'S',
                'field287': 'new value'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
