# Создать универсальный список lists.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `lists.add` создаёт список. В случае успешного создания списка ответ `true`, иначе *Exception*.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | `id` типа инфоблока (обязательное):
- **lists** - тип инфоблока списка
- **bitrix_processes** - тип инфоблока процессов
- **lists_socnet** - тип инфоблока списков групп ||
|| **IBLOCK_CODE**^*^
[`unknown`](../../data-types.md) | код инфоблока (обязательное); ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы); ||
|| **FIELDS**
[`unknown`](../../data-types.md) | поля инфоблока:
- **NAME**^*^ - название инфоблока (обязательно);
- **DESCRIPTION** - описание;
- **SORT** - сортировка;
- **PICTURE** - изображение;
- **BIZPROC** - включение поддержки бизнес-процессов. ||
|| **MESSAGES**
[`unknown`](../../data-types.md) | подписи к элементам и разделам списка; ||
|| **RIGHTS**
[`unknown`](../../data-types.md) | управление правами доступа (если не заполнены, то авторизованному пользователю, который работает с rest устанавливается полный доступ на созданный инфоблок). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'lists.add',
    		{
    			'IBLOCK_TYPE_ID': 'lists_socnet',
    			'IBLOCK_CODE': 'rest_1',
    			'SOCNET_GROUP_ID': '4',
    			'FIELDS': {
    				'NAME': 'List 1',
    				'DESCRIPTION': 'Test list',
    				'SORT': '10',
    				'PICTURE': document.getElementById('iblock-image-add'),
    				'BIZPROC': 'Y'
    			},
    			'MESSAGES': {
    				'ELEMENT_NAME': 'Element',
    				'ELEMENTS_NAME': 'Elements',
    				'ELEMENT_ADD': 'Add element',
    				'ELEMENT_EDIT': 'Edit element',
    				'ELEMENT_DELETE': 'Delete element',
    				'SECTION_NAME': 'Section',
    				'SECTIONS_NAME': 'Sections',
    				'SECTION_ADD': 'Add section',
    				'SECTION_EDIT': 'Edit section',
    				'SECTION_DELETE': 'Delete section'
    			},
    			'RIGHTS': {
    				'SG4_A': 'W',
    				'SG4_E': 'W',
    				'SG4_K': 'W',
    				'AU': 'D',
    				'G2': 'D'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		alert("Error: " + result.error());
    	}
    	else
    	{
    		alert("Success: " + result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'IBLOCK_TYPE_ID'   => 'lists_socnet',
            'IBLOCK_CODE'      => 'rest_1',
            'SOCNET_GROUP_ID'  => '4',
            'FIELDS'           => [
                'NAME'        => 'List 1',
                'DESCRIPTION' => 'Test list',
                'SORT'        => '10',
                'PICTURE'     => $_POST['iblock-image-add'], // Assuming this is a form field value
                'BIZPROC'     => 'Y',
            ],
            'MESSAGES'         => [
                'ELEMENT_NAME'     => 'Element',
                'ELEMENTS_NAME'    => 'Elements',
                'ELEMENT_ADD'      => 'Add element',
                'ELEMENT_EDIT'     => 'Edit element',
                'ELEMENT_DELETE'   => 'Delete element',
                'SECTION_NAME'     => 'Section',
                'SECTIONS_NAME'    => 'Sections',
                'SECTION_ADD'      => 'Add section',
                'SECTION_EDIT'     => 'Edit section',
                'SECTION_DELETE'   => 'Delete section',
            ],
            'RIGHTS'           => [
                'SG4_A' => 'W',
                'SG4_E' => 'W',
                'SG4_K' => 'W',
                'AU'    => 'D',
                'G2'    => 'D',
            ],
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'lists.add',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists_socnet',
        'IBLOCK_CODE': 'rest_1',
        'SOCNET_GROUP_ID': '4',
        'FIELDS': {
            'NAME': 'List 1',
            'DESCRIPTION': 'Test list',
            'SORT': '10',
            'PICTURE': document.getElementById('iblock-image-add'),
            'BIZPROC': 'Y'
        },
        'MESSAGES': {
            'ELEMENT_NAME': 'Element',
            'ELEMENTS_NAME': 'Elements',
            'ELEMENT_ADD': 'Add element',
            'ELEMENT_EDIT': 'Edit element',
            'ELEMENT_DELETE': 'Delete element',
            'SECTION_NAME': 'Section',
            'SECTIONS_NAME': 'Sections',
            'SECTION_ADD': 'Add section',
            'SECTION_EDIT': 'Edit section',
            'SECTION_DELETE': 'Delete section'
        },
        'RIGHTS': {
            'SG4_A': 'W',
            'SG4_E': 'W',
            'SG4_K': 'W',
            'AU': 'D',
            'G2': 'D'
        }
    };
    BX24.callMethod(
        'lists.add',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Success: " + result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}