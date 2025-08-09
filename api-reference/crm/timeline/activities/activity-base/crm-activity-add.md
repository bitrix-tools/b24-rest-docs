# Добавить системное дело crm.activity.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на добавление дела

{% note warning "Развитие метода остановлено" %}

Метод `crm.activity.add` продолжает работать, но у него есть более актуальный аналог [crm.activity.todo.add](../todo/crm-activity-todo-add.md).

{% endnote %}

Метод `crm.activity.add` создает новое системное дело.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`array`](../../../../data-types.md) | Массив значений [полей дела](#fields) в виде структуры:

```json
fields:
{
    "OWNER_TYPE_ID": 2, 
    "OWNER_ID": 102, 
    "TYPE_ID": 2, 
    "SUBJECT": "Новый звонок",
}
```
Имеется дополнительное поле `DISABLE_SENDING_MESSAGE_COPY`. Оно предназначено для принудительного отключения отправки копии сообщения адресату из MESSAGE_FROM. Если параметр не заполнен или указано любое значение отличное от `Y` - копия отправлена будет. Пример:

```js
[
    'fields'=> array(
        'SETTINGS'=> array(
            'DISABLE_SENDING_MESSAGE_COPY'=>'Y'
        )
    )
]
```
 ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Поле** `тип` | **Описание** ||
|| **OWNER_ID***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM ||
|| **OWNER_TYPE_ID***
[`integer`](../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type) ||
|| **TYPE_ID***
[`crm_enum_activitytype`](../../../data-types.md) | Тип дела ||
|| **ASSOCIATED_ENTITY_ID**
[`integer`](../../../../data-types.md) | Идентификатор связанного с делом элемента ||
|| **COMMUNICATIONS***
[`crm_activity_communication`](../../../data-types.md) | [Описание коммуникации](./crm-activity-communication-fields.md) ||
|| **DEADLINE**
[`datetime`](../../../data-types.md) | Дата и время срока исполнения дела. Поле напрямую не устанавливается, значение берётся из START_TIME для звонка и встречи и из END_TIME для задачи ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Текстовое описание дела ||
|| **DESCRIPTION_TYPE**
[`crm.enum.contenttype`](../../../data-types.md) | Тип описания ||
|| **DIRECTION**
[`crm.enum.activitydirection`](../../../data-types.md) | Направление дела: входящее/исходящее. Актуально для звонков и писем, для встреч не используется ||
|| **END_TIME**
[`datetime`](../../../data-types.md) | Время завершения дела | ||
|| **FILES**
[`diskfile`](../../../data-types.md) | Добавленные в дело файлы ||
|| **LOCATION**
[`string`](../../../data-types.md) | Местоположение ||
|| **NOTIFY_TYPE**
[`crm.enum.activitynotifytype`](../../../data-types.md) | Тип уведомления ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор источника данных, используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../../../data-types.md) | Идентификатор элемента в источнике данных, используется только для привязки к внешнему источнику ||
|| **ORIGIN_VERSION**
[`string`](../../../data-types.md) | Оригинальная версия, используется для защиты данных от случайного перетирания внешней системой. Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **PRIORITY**
[`crm.enum.activitypriority`](../../../data-types.md) | Приоритет ||
|| **PROVIDER_DATA**
[`string`](../../../data-types.md) | Дополнительные данные провайдера ||
|| **PROVIDER_GROUP_ID**
[`string`](../../../data-types.md) | Идентификатор группы провайдера ||
|| **PROVIDER_ID**
[`string`](../../../data-types.md) | Идентификатор провайдера ||
|| **PROVIDER_TYPE_ID**
[`string`](../../../data-types.md) | Идентификатор типа провайдера, статус из справочника ||
|| **PROVIDER_PARAMS**
[`object`](../../../data-types.md) | Дополнительные параметры провайдера ||
|| **RESPONSIBLE_ID***
[`user`](../../../data-types.md) | Идентификатор пользователя, ответственного за дело ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные настройки ||
|| **START_TIME**
[`datetime`](../../../data-types.md) | Время начала выполнения дела ||
|| **STATUS**
[`crm_enum_activitystatus`](../../../data-types.md) | Статус дела ||
|| **SUBJECT**
[`string`](../../../data-types.md) | Дополнительное описание дела ||
|| **WEBDAV_ELEMENTS**
[`diskfile`](../../../data-types.md) | Добавленные файлы. Устарел, сохраняется для совместимости ||
|| **IS_INCOMING_CHANNEL**
[`char`](../../../data-types.md) | Флаг, говорящий дело создано из входящего канала или нет (`Y`/`N`) ||
|#


### Варианты использования значений полей

Для дел типа `e-mail`:
- если письмо не должно быть отправлено, устанавливайте параметры `DIRECTION=2` и `COMPLETED='N'`;
- если необходимо пометить письма как завершенные, выполните обновление дел с выставлением флага завершения.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"OWNER_TYPE_ID":2,"OWNER_ID":102,"TYPE_ID":2,"COMMUNICATIONS":[{"VALUE":"+79832322323","ENTITY_ID":134,"ENTITY_TYPE_ID":3}],"SUBJECT":"Новый звонок","START_TIME":"2023-12-31T12:00:00+00:00","END_TIME":"2023-12-31T12:30:00+00:00","COMPLETED":"N","PRIORITY":3,"RESPONSIBLE_ID":1,"DESCRIPTION":"Важный звонок","DESCRIPTION_TYPE":3,"DIRECTION":2,"FILES":[{"fileData":["example.jpg","base64_encoded_content_here"]}]} }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"OWNER_TYPE_ID":2,"OWNER_ID":102,"TYPE_ID":2,"COMMUNICATIONS":[{"VALUE":"+79832322323","ENTITY_ID":134,"ENTITY_TYPE_ID":3}],"SUBJECT":"Новый звонок","START_TIME":"2023-12-31T12:00:00+00:00","END_TIME":"2023-12-31T12:30:00+00:00","COMPLETED":"N","PRIORITY":3,"RESPONSIBLE_ID":1,"DESCRIPTION":"Важный звонок","DESCRIPTION_TYPE":3,"DIRECTION":2,"FILES":[{"fileData":["example.jpg","base64_encoded_content_here"]}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.activity.add",
    		{
    			fields: {
    				"OWNER_TYPE_ID": 2,
    				"OWNER_ID": 102,
    				"TYPE_ID": 2,
    				"COMMUNICATIONS": [
    					{ VALUE: "+79832322323", ENTITY_ID: 134, ENTITY_TYPE_ID: 3 }
    				],
    				"SUBJECT": "Новый звонок",
    				"START_TIME": "2023-12-31T12:00:00+00:00", // Пример даты и времени
    				"END_TIME": "2023-12-31T12:30:00+00:00", // Пример даты и времени
    				"COMPLETED": "N",
    				"PRIORITY": 3,
    				"RESPONSIBLE_ID": 1,
    				"DESCRIPTION": "Важный звонок",
    				"DESCRIPTION_TYPE": 3,
    				"DIRECTION": 2,
    				"FILES": [
    					{
    						fileData: [
    							"example.jpg", // Имя файла
    							"base64_encoded_content_here" // Контент файла в формате base64
    						]
    					}
    				]
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
                'crm.activity.add',
                [
                    'fields' => [
                        'OWNER_TYPE_ID'    => 2,
                        'OWNER_ID'         => 102,
                        'TYPE_ID'          => 2,
                        'COMMUNICATIONS'   => [
                            ['VALUE' => '+79832322323', 'ENTITY_ID' => 134, 'ENTITY_TYPE_ID' => 3]
                        ],
                        'SUBJECT'          => 'Новый звонок',
                        'START_TIME'       => '2023-12-31T12:00:00+00:00',
                        'END_TIME'         => '2023-12-31T12:30:00+00:00',
                        'COMPLETED'        => 'N',
                        'PRIORITY'         => 3,
                        'RESPONSIBLE_ID'   => 1,
                        'DESCRIPTION'      => 'Важный звонок',
                        'DESCRIPTION_TYPE' => 3,
                        'DIRECTION'        => 2,
                        'FILES'            => [
                            [
                                'fileData' => [
                                    'example.jpg',
                                    'base64_encoded_content_here'
                                ]
                            ]
                        ]
                    ]
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
        echo 'Error adding activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.activity.add",
        {
            fields: {
                "OWNER_TYPE_ID": 2,
                "OWNER_ID": 102,
                "TYPE_ID": 2,
                "COMMUNICATIONS": [
                    { VALUE: "+79832322323", ENTITY_ID: 134, ENTITY_TYPE_ID: 3 }
                ],
                "SUBJECT": "Новый звонок",
                "START_TIME": "2023-12-31T12:00:00+00:00", // Пример даты и времени
                "END_TIME": "2023-12-31T12:30:00+00:00", // Пример даты и времени
                "COMPLETED": "N",
                "PRIORITY": 3,
                "RESPONSIBLE_ID": 1,
                "DESCRIPTION": "Важный звонок",
                "DESCRIPTION_TYPE": 3,
                "DIRECTION": 2,
                "FILES": [
                    {
                        fileData: [
                            "example.jpg", // Имя файла
                            "base64_encoded_content_here" // Контент файла в формате base64
                        ]
                    }
                ]
            }
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.add',
        [
            'fields' => [
                'OWNER_TYPE_ID' => 2,
                'OWNER_ID' => 102,
                'TYPE_ID' => 2,
                'COMMUNICATIONS' => [
                    [
                        'VALUE' => '+79832322323',
                        'ENTITY_ID' => 134,
                        'ENTITY_TYPE_ID' => 3
                    ]
                ],
                'SUBJECT' => 'Новый звонок',
                'START_TIME' => '2023-12-31T12:00:00+00:00', // Пример даты и времени
                'END_TIME' => '2023-12-31T12:30:00+00:00', // Пример даты и времени
                'COMPLETED' => 'N',
                'PRIORITY' => 3,
                'RESPONSIBLE_ID' => 1,
                'DESCRIPTION' => 'Важный звонок',
                'DESCRIPTION_TYPE' => 3,
                'DIRECTION' => 2,
                'FILES' => [
                    [
                        'fileData' => [
                            'example.jpg', // Имя файла
                            'base64_encoded_content_here' // Контент файла в формате base64
                        ]
                    ]
                ]
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}    

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 999,
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
[`boolean`](../../../../data-types.md) | Результат операции. Возвращает идентификатор дела в таймлайне в случае успеха, иначе — `false` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `The field SUBJECT is not defined or empty` | Поле `SUBJECT` не установлено ||
|| `The field RESPONSIBLE_ID is not defined or invalid` | Поле `RESPONSIBLE_ID` не установлено ||
|| `The field TYPE_ID is not defined or invalid` | Поле `TYPE_ID` не установлено ||
|| `The field COMMUNICATIONS is not defined or invalid` | Поле `COMMUNICATIONS` не установлено ||
|| `The only one communication is allowed for activity of specified type` | Количество контактов более 1 ||
|| `Could not build binding. Please ensure that owner info and communications are defined correctly` | Связи для дела не указаны ||
|| 
- `Email send error. Failed to load module "subscribe"`
- `Email send error. Invalid data`
- `Email send error. Invalid email is specified`
- `Email send error. "From" is not found`
- `Email send error. "To" is not found`
- `Email send error. Failed to add posting. Please see details below`
- `Email send error. Failed to save posting file. Please see details below`
- `Email send error. Failed to update activity`
- `Email send error. General error`
 | Ошибки "почтовых" дел ||
|| `The custom activity without provider is not supported in current context` | Тип дела не поддерживается в заданном контексте ||
|| `Use crm.activity.configurable.add for this activity provider` | Некорректный вызов метода для конфигурируемого дела ||
|| `Access denied` | Отсутствуют права на добавление сущности в CRM ||
|| `Application context required` | Некорректный параметр `PROVIDER_ID` для дела, созданного в контексте приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-update.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-get.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)
- [{#T}](../../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-activity-to-contact.md)
- [{#T}](../../../../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)