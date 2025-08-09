# Установить параметры индивидуальной карточки crm.lead.details.configuration.set

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

Метод `crm.lead.details.configuration.set` устанавливает настройки карточки лидов. Метод записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

{% note warning %}

Обратите внимание, что настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов применяется параметр **leadCustomerType**.

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
[`unknown`](../../../data-types.md) | Дополнительные параметры. Здесь для лидов может быть задан параметр `leadCustomerType`, с допустимыми значениями:

- **1** - простые лиды,
- **2** - повторные лиды.
 ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.lead.details.configuration.set",
    		{
    			scope: "P",
    			userId: 1,
    			data:
    			[
    				{
    					name: "main",
    					title: "Общие сведения",
    					type: "section",
    					elements:
    					[
    						{ name: "TITLE" },
    						{ name: "STATUS_ID" },
    						{ name: "NAME" },
    						{ name: "BIRTHDATE" },
    						{ name: "POST" },
    						{ name: "PHONE" },
    						{ name: "EMAIL" }
    					]
    				},
    				{
    					name: "additional",
    					title: "Дополнительно",
    					type: "section",
    					elements:
    					[
    						{ name: "SOURCE_ID" },
    						{ name: "SOURCE_DESCRIPTION" },
    						{ name: "OPENED" },
    						{ name: "ASSIGNED_BY_ID" },
    						{ name: "OBSERVER" },
    						{ name: "COMMENTS" }
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
                'crm.lead.details.configuration.set',
                [
                    'scope' => 'P',
                    'userId' => 1,
                    'data' => [
                        [
                            'name' => 'main',
                            'title' => 'Общие сведения',
                            'type' => 'section',
                            'elements' => [
                                ['name' => 'TITLE'],
                                ['name' => 'STATUS_ID'],
                                ['name' => 'NAME'],
                                ['name' => 'BIRTHDATE'],
                                ['name' => 'POST'],
                                ['name' => 'PHONE'],
                                ['name' => 'EMAIL'],
                            ],
                        ],
                        [
                            'name' => 'additional',
                            'title' => 'Дополнительно',
                            'type' => 'section',
                            'elements' => [
                                ['name' => 'SOURCE_ID'],
                                ['name' => 'SOURCE_DESCRIPTION'],
                                ['name' => 'OPENED'],
                                ['name' => 'ASSIGNED_BY_ID'],
                                ['name' => 'OBSERVER'],
                                ['name' => 'COMMENTS'],
                            ],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting lead details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //---
    //Установка личных настроек карточки лидов для пользователя с идентификатором 1.
    BX24.callMethod(
        "crm.lead.details.configuration.set",
        {
            scope: "P",
            userId: 1,
            data:
            [
                {
                    name: "main",
                    title: "Общие сведения",
                    type: "section",
                    elements:
                    [
                        { name: "TITLE" },
                        { name: "STATUS_ID" },
                        { name: "NAME" },
                        { name: "BIRTHDATE" },
                        { name: "POST" },
                        { name: "PHONE" },
                        { name: "EMAIL" }
                    ]
                },
                {
                    name: "additional",
                    title: "Дополнительно",
                    type: "section",
                    elements:
                    [
                        { name: "SOURCE_ID" },
                        { name: "SOURCE_DESCRIPTION" },
                        { name: "OPENED" },
                        { name: "ASSIGNED_BY_ID" },
                        { name: "OBSERVER" },
                        { name: "COMMENTS" }
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