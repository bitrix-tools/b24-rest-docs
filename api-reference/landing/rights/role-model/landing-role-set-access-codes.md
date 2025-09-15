# Установить коды доступа для роли landing.role.setAccessCodes

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

{% note info "" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Права на выполнение**: `администратор`

{% endnote %}

Метод `landing.role.setAccessCodes` устанавливает для роли коды доступа, для которых будет действовать данная роль (и ее ограничения на сайты). На вход методу передается идентификатор роли и массив кодов доступа. Если массив будет пуст, коды для роли будут сброшены.

Права независимы и могут даваться точечно. Например, пользователь может обладать только правом публикации без возможности любого изменения.

В качестве ключей можно использовать значения:

- **SG<X>** - рабочая группа, например SG1 - рабочая группа с идентификатором 2;
- **U<X>** - пользователь, например U45 - пользователь с идентификатором 45;
- **DR<X>** - отдел, включая подразделы, например DR23 - раздел с идентификатором 23;
- **UA** - все авторизованные пользователи.
- **G<X>** - группа пользователей, например G2 - группа пользователей с идентификатором 2.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор роли. ||
|| **codes**
[`unknown`](../../../data-types.md) | Массив кодов доступа. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.role.setAccessCodes',
    		{
    			id: 11,
    			codes: [
    				'SG3_A', 'G4'
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'landing.role.setAccessCodes',
                [
                    'id'    => 11,
                    'codes' => [
                        'SG3_A', 'G4'
                    ],
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
        echo 'Error setting access codes: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.setAccessCodes',
        {
            id: 11,
            codes: [
                'SG3_A', 'G4'
            ]
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