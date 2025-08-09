# Установить параметры индивидуальной карточки crm.deal.details.configuration.set

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

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.details.configuration.set` позволяет установить настройки карточки сделок. Метод записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

{% note warning %}

Обратите внимание, что настройки карточки сделок разных направлений (или воронок) могут отличаться друг от друга.
Для переключения между настройками карточек сделок разных направлений применяется параметр **dealCategoryId**.

{% endnote %}

#|
|| **Параметр** | **Описание** ||
|| **scope**
[`unknown`](../../../data-types.md) | Область применения настроек. Допустимые значения:

- **P** - личные настройки,
- **C** - общие настройки.
 ||
|| **userId**
[`unknown`](../../../data-types.md) | Идентификатор пользователя. Если не задан, то берётся текущий. Нужен только при установке личных настроек. ||
|| **extras**
[`unknown`](../../../data-types.md) | Дополнительные параметры. Здесь для сделок может быть задан параметр `dealCategoryId`. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.deal.details.configuration.set",
    		{
    			scope: "P",
    			userId: 1,
    			data:
    			[
    				{
    					name: "main",
    					title: "О сделке",
    					type: "section",
    					elements:
    					[
    						{ name: "TITLE" },
    						{ name: "OPPORTUNITY_WITH_CURRENCY" },
    						{ name: "STAGE_ID" },
    						{ name: "BEGINDATE" },
    						{ name: "CLOSEDATE" },
    						{ name: "CLIENT" }
    					]
    				},
    				{
    					name: "additional",
    					title: "Дополнительно",
    					type: "section",
    					elements:
    					[
    						{ name: "TYPE_ID" },
    						{ name: "SOURCE_ID" },
    						{ name: "SOURCE_DESCRIPTION" },
    						{ name: "OPENED" },
    						{ name: "ASSIGNED_BY_ID" },
    						{ name: "OBSERVER" },
    						{ name: "COMMENTS" }
    					]
    				},
    				{
    					name: "products",
    					title: "Товары",
    					type: "section",
    					elements:
    					[
    						{ name: "PRODUCT_ROW_SUMMARY" }
    					]
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'crm.deal.details.configuration.set',
                [
                    'scope'  => 'P',
                    'userId' => 1,
                    'data'   => [
                        [
                            'name'     => 'main',
                            'title'    => 'О сделке',
                            'type'     => 'section',
                            'elements' => [
                                ['name' => 'TITLE'],
                                ['name' => 'OPPORTUNITY_WITH_CURRENCY'],
                                ['name' => 'STAGE_ID'],
                                ['name' => 'BEGINDATE'],
                                ['name' => 'CLOSEDATE'],
                                ['name' => 'CLIENT'],
                            ],
                        ],
                        [
                            'name'     => 'additional',
                            'title'    => 'Дополнительно',
                            'type'     => 'section',
                            'elements' => [
                                ['name' => 'TYPE_ID'],
                                ['name' => 'SOURCE_ID'],
                                ['name' => 'SOURCE_DESCRIPTION'],
                                ['name' => 'OPENED'],
                                ['name' => 'ASSIGNED_BY_ID'],
                                ['name' => 'OBSERVER'],
                                ['name' => 'COMMENTS'],
                            ],
                        ],
                        [
                            'name'     => 'products',
                            'title'    => 'Товары',
                            'type'     => 'section',
                            'elements' => [
                                ['name' => 'PRODUCT_ROW_SUMMARY'],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        console.dir($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting deal details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //---
    //Установка личных настроек карточки сделок общего направления для пользователя с идентификатором 1.
    BX24.callMethod(
        "crm.deal.details.configuration.set",
        {
            scope: "P",
            userId: 1,
            data:
            [
                {
                    name: "main",
                    title: "О сделке",
                    type: "section",
                    elements:
                    [
                        { name: "TITLE" },
                        { name: "OPPORTUNITY_WITH_CURRENCY" },
                        { name: "STAGE_ID" },
                        { name: "BEGINDATE" },
                        { name: "CLOSEDATE" },
                        { name: "CLIENT" }
                    ]
                },
                {
                    name: "additional",
                    title: "Дополнительно",
                    type: "section",
                    elements:
                    [
                        { name: "TYPE_ID" },
                        { name: "SOURCE_ID" },
                        { name: "SOURCE_DESCRIPTION" },
                        { name: "OPENED" },
                        { name: "ASSIGNED_BY_ID" },
                        { name: "OBSERVER" },
                        { name: "COMMENTS" }
                    ]
                },
                {
                    name: "products",
                    title: "Товары",
                    type: "section",
                    elements:
                    [
                        { name: "PRODUCT_ROW_SUMMARY" }
                    ]
                }
            ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    //---
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}