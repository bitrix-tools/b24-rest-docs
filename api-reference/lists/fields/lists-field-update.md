# Изменить поле списка lists.field.update

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

Метод `lists.field.update` позволяет обновить поле списка. В случае успешного обновления поля ответ `true`, иначе *Exception*.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **IBLOCK_TYPE_ID**^*^
[`unknown`](../../data-types.md) | `id` типа инфоблока (обязательно):
- **lists** - тип инфоблока списка
- **bitrix_processes** - тип инфоблока процессов
- **lists_socnet** - тип инфоблока списков групп ||
|| **IBLOCK_CODE/IBLOCK_ID**^*^
[`unknown`](../../data-types.md) | код или `id` инфоблока (обязательно) ||
|| **SOCNET_GROUP_ID**^*^
[`unknown`](../../data-types.md) | `id` группы (обязательно, если список создается для группы) ||
|| **FIELD_ID**^*^
[`unknown`](../../data-types.md) | `ID` поля (обязательно. Если поле свойство инфоблока, то формат: "PROPERTY_propertyId") ||
|| **FIELDS**
[`unknown`](../../data-types.md) | ключи такие же как при создании поля из интерфейса Битрикс24, включая:
- **NAME**^*^ - название (обязательно)
- **IS_REQUIRED** - метка обязательности
- **MULTIPLE** - метка множественности
- **TYPE**^*^ - тип (обязательно)
- **SORT** - сортировка
- **DEFAULT_VALUE** - значение по умолчанию
- **LIST** - для добавления значений поля типа "Список"
- **LIST_TEXT_VALUES** - для добавления значений поля типа "Список" с помощью строки
- **LIST_DEF** - значение по умолчанию для поля типа "Список"
- **CODE**^*^ - код (обязательно, если поле является свойством инфоблока)
- **SETTINGS** - настройки отображения поля
- **USER_TYPE_SETTINGS** - пользовательские настройки
- **ROW_COUNT/COL_COUNT** - настройка для полей textarea
- **LINK_IBLOCK_ID** - `id` привязываемого раздела ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'lists.field.update',
    		{
    			'IBLOCK_TYPE_ID': 'lists_socnet',
    			'IBLOCK_CODE': 'rest_1',
    			'FIELD_ID': 'PROPERTY_61',
    			'FIELDS': {
    				'NAME': 'List field (Update)',
    				'IS_REQUIRED': 'N',
    				'MULTIPLE': 'N',
    				'TYPE': 'L',
    				'SORT': '20',
    				'CODE': 'fieldList',
    				'LIST': {
    					'58': {
    						'SORT': '10',
    						'VALUE': 'one'
    					},
    					'59': {
    						'SORT': '20',
    						'VALUE': 'two'
    					},
    					'60': {
    						'SORT': '30',
    						'VALUE': 'three'
    					}
    				},
    				'LIST_DEF': {
    					'0': '59'
    				},
    				'SETTINGS': {
    					'SHOW_ADD_FORM': 'Y',
    					'SHOW_EDIT_FORM': 'Y',
    					'ADD_READ_ONLY_FIELD': 'N',
    					'EDIT_READ_ONLY_FIELD': 'Y',
    					'SHOW_FIELD_PREVIEW': 'N'
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	alert("Success: " + result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'IBLOCK_TYPE_ID' => 'lists_socnet',
            'IBLOCK_CODE' => 'rest_1',
            'FIELD_ID' => 'PROPERTY_61',
            'FIELDS' => [
                'NAME' => 'List field (Update)',
                'IS_REQUIRED' => 'N',
                'MULTIPLE' => 'N',
                'TYPE' => 'L',
                'SORT' => '20',
                'CODE' => 'fieldList',
                'LIST' => [
                    '58' => [
                        'SORT' => '10',
                        'VALUE' => 'one'
                    ],
                    '59' => [
                        'SORT' => '20',
                        'VALUE' => 'two'
                    ],
                    '60' => [
                        'SORT' => '30',
                        'VALUE' => 'three'
                    ]
                ],
                'LIST_DEF' => [
                    '0' => '59'
                ],
                'SETTINGS' => [
                    'SHOW_ADD_FORM' => 'Y',
                    'SHOW_EDIT_FORM' => 'Y',
                    'ADD_READ_ONLY_FIELD' => 'N',
                    'EDIT_READ_ONLY_FIELD' => 'Y',
                    'SHOW_FIELD_PREVIEW' => 'N'
                ]
            ]
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'lists.field.update',
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
        echo 'Error updating list field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        'IBLOCK_TYPE_ID': 'lists_socnet',
        'IBLOCK_CODE': 'rest_1',
        'FIELD_ID': 'PROPERTY_61',
        'FIELDS': {
            'NAME': 'List field (Update)',
            'IS_REQUIRED': 'N',
            'MULTIPLE': 'N',
            'TYPE': 'L',
            'SORT': '20',
            'CODE': 'fieldList',
            'LIST': {
                '58': {
                    'SORT': '10',
                    'VALUE': 'one'
                },
                '59': {
                    'SORT': '20',
                    'VALUE': 'two'
                },
                '60': {
                    'SORT': '30',
                    'VALUE': 'three'
                }
            },
            'LIST_DEF': {
                '0': '59'
            },
            'SETTINGS': {
                'SHOW_ADD_FORM': 'Y',
                'SHOW_EDIT_FORM': 'Y',
                'ADD_READ_ONLY_FIELD': 'N',
                'EDIT_READ_ONLY_FIELD': 'Y',
                'SHOW_FIELD_PREVIEW': 'N'
            }
        }
    };
    BX24.callMethod(
        'lists.field.update',
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