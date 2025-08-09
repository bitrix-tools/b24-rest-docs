# Добавить лог-запись crm.timeline.logmessage.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `пользователь с правом на изменение элемента CRM, в который добавится запись`

Метод добавляет новую лог-запись таймлайна.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления новой лог-записи в виде структуры:

```js
fields:
{
    entityTypeId: "значение",
    entityId: "значение",
    title: "значение",
    text: "значение",
    iconCode: "значение",
},
```
 ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | [Идентификатор типа сущности](../../data-types.md#object_type), в которой будет создана запись ||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор элемента сущности, в которой будет создана запись ||
|| **title***
[`string`](../../../data-types.md) | Заголовок записи ||
|| **text***
[`string`](../../../data-types.md) | Текст записи ||
|| **iconCode***
[`string`](../../../data-types.md) | Код иконки.

Список доступных кодов можно получить методом [crm.timeline.icon.list](./icons/crm-timeline-icon-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityTypeId":1,"entityId":1,"title":"Test title","text":"Test text message","iconCode":"info"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.logmessage.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityTypeId":1,"entityId":1,"title":"Test title","text":"Test text message","iconCode":"info"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.logmessage.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.timeline.logmessage.add',
    		{
    			fields: {
    				entityTypeId: 1,
    				entityId: 1,
    				title: 'Test title',
    				text: 'Test text message',
    				iconCode: 'info',
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.logmessage.add',
                [
                    'fields' => [
                        'entityTypeId' => 1,
                        'entityId'     => 1,
                        'title'        => 'Test title',
                        'text'         => 'Test text message',
                        'iconCode'     => 'info',
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
        echo 'Error adding log message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.logmessage.add",
        {
            fields: {
                entityTypeId: 1,
                entityId: 1,
                title: "Test title",
                text: "Test text message",
                iconCode: "info",
            },
        },
        result => {
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
        'crm.timeline.logmessage.add',
        [
            'fields' => [
                'entityTypeId' => 1,
                'entityId' => 1,
                'title' => 'Test title',
                'text' => 'Test text message',
                'iconCode' => 'info',
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
    "result": {
        "logMessage": {
            "id": 1,
            "created": "2024-04-03T10:26:32+02:00",
            "authorId": 1,
            "title": "Test title",
            "text": "Test note",
            "iconCode": "info"
        }
    },
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
[`object`](../../../data-types.md) | Корневой элемент ответа.

Поле `result` содержит объект [logMessage](#logMessage) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект logMessage {#logMessage}

#|
|| **Название**
`тип` | **Описание**  ||
|| **id** 
[`integer`](../../../data-types.md)| Идентификатор записи таймлайна ||
|| **created** 
[`datetime`](../../../data-types.md)| Дата и время создания ||
|| **authorId** 
[`integer`](../../../data-types.md)| Пользователь, создавший запись ||
|| **title**
[`string`](../../../data-types.md)| Заголовок записи ||
|| **text** 
[`string`](../../../data-types.md)| Содержимое записи ||
|| **iconCode** 
[`string`](../../../data-types.md)| Код иконки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Доступ запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|| `OWNER_NOT_FOUND` | Элемента сущности CRM с указанными `entityTypeId` и `entityId` не существует ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-logmessage-get.md)
- [{#T}](./crm-timeline-logmessage-list.md)
- [{#T}](./crm-timeline-logmessage-delete.md)