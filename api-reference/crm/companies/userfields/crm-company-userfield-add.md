# Создать новое пользовательское поле для компаний crm.company.userfield.add

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
- не прописаны ссылки на несозданные ещё страницы (crm.userfield.fields)

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.userfield.add` создаёт новое пользовательское поле для компаний.

Системное ограничение на название поля - 20 знаков. К названию пользовательского поля всегда добавляется префикс UF_CRM_, то есть реальная длина названия - 13 знаков.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Набор полей - массив вида array("поле"=>"значение"[, ...]), содержащий описание пользовательского поля. ||
|| **LIST**
[`unknown`](../../../data-types.md) | Содержит набор значений списка для пользовательских полей типа Список. Указывается при создании/обновлении поля. Каждое значение представляет собой массив с полями: 
- **VALUE** - значение элемента списка. Поле является обязательным в случае, когда создается новый элемент. 
- **SORT** - сортировка.
- **DEF** - если равно Y, то элемент списка является значением по-умолчанию. Для множественного поля допустимо несколько DEF=Y. Для не множественного, дефолтным будет считаться первое.
- **XML_ID** - внешний код значения. Параметр учитывается только при обновлении уже существующих значений элемента списка.
- **ID** - идентификатор значения. Если он указан, то считается что это обновление существующего значения элемента списка, а не создание нового. Имеет смысл только при вызове методов `*.userfield.update`.
- **DEL** - если равно Y, то существующий элемент списка будет удален. Применяется, если заполнен параметр ID. ||
|#

Полное описание полей можно получить вызовом метода `crm.userfield.fields`.

## Примеры

**Пример #1: Создание текстового поля**

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.company.userfield.add",
    		{
    			fields:
    			{
    				"FIELD_NAME": "MY_STRING",
    				"EDIT_FORM_LABEL": "Моя строка",
    				"LIST_COLUMN_LABEL": "Моя строка",
    				"USER_TYPE_ID": "string",
    				"XML_ID": "MY_STRING",
    				"SETTINGS": { "DEFAULT_VALUE": "Привет, мир!" }
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.company.userfield.add',
                [
                    'fields' => [
                        'FIELD_NAME'       => 'MY_STRING',
                        'EDIT_FORM_LABEL'  => 'Моя строка',
                        'LIST_COLUMN_LABEL' => 'Моя строка',
                        'USER_TYPE_ID'     => 'string',
                        'XML_ID'           => 'MY_STRING',
                        'SETTINGS'         => ['DEFAULT_VALUE' => 'Привет, мир!'],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding company user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.userfield.add",
        {
            fields:
            {
                "FIELD_NAME": "MY_STRING",
                "EDIT_FORM_LABEL": "Моя строка",
                "LIST_COLUMN_LABEL": "Моя строка",
                "USER_TYPE_ID": "string",
                "XML_ID": "MY_STRING",
                "SETTINGS": { "DEFAULT_VALUE": "Привет, мир!" }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

{% endlist %}


**Пример #2: Создание списка**

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.company.userfield.add",
    		{
    			fields:
    			{
    				"FIELD_NAME": "MY_LIST",
    				"EDIT_FORM_LABEL": "Мой список",
    				"LIST_COLUMN_LABEL": "Мой список",
    				"USER_TYPE_ID": "enumeration",
    				"LIST": [
    					{ "VALUE": "Элемент #1" },
    					{ "VALUE": "Элемент #2" },
    					{ "VALUE": "Элемент #3" },
    					{ "VALUE": "Элемент #4" },
    					{ "VALUE": "Элемент #5" }
    				],
    				"XML_ID": "MY_LIST",
    				"SETTINGS": { "LIST_HEIGHT": 3 }
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.company.userfield.add',
                [
                    'fields' => [
                        'FIELD_NAME'       => 'MY_LIST',
                        'EDIT_FORM_LABEL'  => 'Мой список',
                        'LIST_COLUMN_LABEL' => 'Мой список',
                        'USER_TYPE_ID'     => 'enumeration',
                        'LIST'             => [
                            ['VALUE' => 'Элемент #1'],
                            ['VALUE' => 'Элемент #2'],
                            ['VALUE' => 'Элемент #3'],
                            ['VALUE' => 'Элемент #4'],
                            ['VALUE' => 'Элемент #5'],
                        ],
                        'XML_ID'           => 'MY_LIST',
                        'SETTINGS'         => ['LIST_HEIGHT' => 3],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding company user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.userfield.add",
        {
            fields:
            {
                "FIELD_NAME": "MY_LIST",
                "EDIT_FORM_LABEL": "Мой список",
                "LIST_COLUMN_LABEL": "Мой список",
                "USER_TYPE_ID": "enumeration",
                "LIST": [
                    { "VALUE": "Элемент #1" },
                    { "VALUE": "Элемент #2" },
                    { "VALUE": "Элемент #3" },
                    { "VALUE": "Элемент #4" },
                    { "VALUE": "Элемент #5" }
                    ],
                "XML_ID": "MY_LIST",
                "SETTINGS": { "LIST_HEIGHT": 3 }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );    
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}