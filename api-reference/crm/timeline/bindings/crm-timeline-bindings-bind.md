# Добавить связь записи таймлайна с элементом CRM crm.timeline.bindings.bind

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод добавляет связь записи таймлайна с элементом CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления связи записи таймлайна с элементом CRM в виде структуры:

```js
fields: {
    "OWNER_ID": "значение",
    "ENTITY_ID": "значение",
    "ENTITY_TYPE": "значение",
},
```

 ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **OWNER_ID***
[`integer`](../../../data-types.md) | Идентфикатор записи таймлайна  ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор `ID` элемента CRM, к которому привязан комментарий  ||
|| **ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип элемента, к которому привязан комментарий. Возможные значения: 
- `lead` — лид
- `deal` — сделка
- `contact` — контакт
- `company` — компания
- `order` — заказ  
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"OWNER_ID":1110,"ENTITY_ID":10,"ENTITY_TYPE":"deal"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.bindings.bind
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"OWNER_ID":1110,"ENTITY_ID":10,"ENTITY_TYPE":"deal"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.bindings.bind
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.timeline.bindings.bind",
    		{
    			fields: {
    				"OWNER_ID": 1110,
    				"ENTITY_ID": 10,
    				"ENTITY_TYPE": "deal",
    			},
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
                'crm.timeline.bindings.bind',
                [
                    'fields' => [
                        'OWNER_ID'    => 1110,
                        'ENTITY_ID'   => 10,
                        'ENTITY_TYPE' => 'deal',
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
        echo 'Error binding timeline: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.bindings.bind",
        {
            fields: {
                "OWNER_ID": 1110,
                "ENTITY_ID": 10,
                "ENTITY_TYPE": "deal",
            },
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.bindings.bind',
        [
            'fields' => [
                'OWNER_ID' => 1110,
                'ENTITY_ID' => 10,
                'ENTITY_TYPE' => 'deal',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат операции. Возвращает `true` если связь успешно создана, иначе — `false` ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "OWNER_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | OWNER_ID is not defined or invalid | Не передан обязательный параметр `OWNER_ID` или переданный `OWNER_ID` некорректный ||
|| Пустая строка | ENTITY_ID is not defined or invalid. | Не передан обязательный параметр `ENTITY_ID` или переданный `ENTITY_ID` некорректный ||
|| Пустая строка | ENTITY_TYPE is not defined or invalid. | Не передан обязательный параметр `ENTITY_TYPE` или переданный `ENTITY_TYPE` некорректный ||
|| Пустая строка | Access denied. | Отсутствуют права на редактирование сущности в CRM ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-bindings-list.md)
- [{#T}](./crm-timeline-bindings-unbind.md)
- [{#T}](./crm-timeline-bindings-fields.md)