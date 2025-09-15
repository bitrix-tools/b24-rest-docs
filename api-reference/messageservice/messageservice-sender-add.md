# Зарегистрировать СМС-провайдер или провайдер сообщений messageservice.sender.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- Нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод регистрирует новый провайдер сообщений

#|
|| **Параметр** | **Описание** ||
|| **CODE** | Внутренний идентификатор провайдера. Допустимые символы a-z, A-Z, 0-9, точка, дефис и нижнее подчеркивание. ||
|| **TYPE** | Тип провайдера. ||
|| **HANDLER** | URL приложения, на который будут отправлены данные. ||
|| **NAME** | Название провайдера. Может быть строкой или ассоциативным массивом локализированных строк. ||
|| **DESCRIPTION** | Описание провайдера. Может быть строкой или ассоциативным массивом локализированных строк. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}


На HANDLER приходят данные:

- **module_id** - модуль-инициатор. `crm` - значит сообщение отправлено из карточки (в будущем могут быть и другие варианты), `bizproc` - отправлено из Бизнес Процессов или робота.
- **bindings** - параметр, актуальный только для module_id = crm. В нем содержится массив привязок сообщения к сущностям CRM (к чему привяжется дело).
- **workflow_id**, **document_id**, **document_type** - параметры, актуальные только для module_id = bizproc. Параметры приходят не всегда: если отправляем из карточки, то их не будет.
- **message_id** - уникальный идентификатор сообщения. По нему можно обращаться к [messageservice.message.status.update](messageservice-message-status-update.md).
- **message_to** - номер получателя сообщения
- **message_body** - текст сообщения

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'messageservice.sender.add',
    		{
    			CODE: 'provider1',
    			TYPE: 'SMS',
    			HANDLER: 'http:///',
    			NAME: 'Провайдер ***.ru',
    			DESCRIPTION: 'Провайдер ***.ru'
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		alert("Error: " + result.error());
    	else
    		alert("Успешно: " + result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'CODE'        => 'provider1',
            'TYPE'        => 'SMS',
            'HANDLER'     => 'http:///',
            'NAME'        => 'Провайдер ***.ru',
            'DESCRIPTION' => 'Провайдер ***.ru',
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'messageservice.sender.add',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Успешно: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding sender: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var params = {
        CODE: 'provider1',
        TYPE: 'SMS',
        HANDLER: 'http:///',
        NAME: 'Провайдер ***.ru',
        DESCRIPTION: 'Провайдер ***.ru'
    };
    BX24.callMethod(
        'messageservice.sender.add',
        params,
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

{% endlist %}


**Отправление из карточки CRM**

```plaintext
Array
(
    [module_id] => crm
    [bindings] => Array
        (
            [0] => Array
                (
                    [OWNER_TYPE_ID] => 1
                    [OWNER_ID] => 98
                )

        )

    [properties] => Array
        (
            [phone_number] => +7*********
            [message_text] => test message
    )

    [type] => SMS
    [code] => example
    [message_id] => 72dd742c8270db0ddbbab92f98877537
    [message_to] => +7**********
    [message_body] => test message
    [ts] => 1506687055
    [auth] => /*auth*/

)
```

**Отправление из Бизнес-процесса или робота.**

```plaintext
Array
(
    [module_id] => bizproc
    [workflow_id] => 59ce38567ff2a5.26351167
    [document_id] => Array
        (
            [0] => crm
            [1] => CCrmDocumentLead
            [2] => LEAD_98
        )

    [document_type] => Array
        (
            [0] => crm
            [1] => CCrmDocumentLead
            [2] => LEAD
        )

    [properties] => Array
        (
            [phone_number] => +7*********
            [message_text] => test message
        )

    [type] => SMS
    [code] => example
    [message_id] => 8b3fc6cd0cb4a7b91f6632889cdf46e0
    [message_to] => +7*********
    [message_body] => test message
    [ts] => 1506687103
    [auth] => /*auth*/

)
```
{% include [Сноска о примерах](../../_includes/examples.md) %}