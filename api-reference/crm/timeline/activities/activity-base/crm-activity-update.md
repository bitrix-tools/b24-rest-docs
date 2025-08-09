# Обновить системное дело crm.activity.update

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом на обновление дела

{% note warning "Развитие метода остановлено" %}

Метод `crm.activity.update` продолжает работать, но у него есть более актуальный аналог [crm.activity.todo.update](../todo/crm-activity-todo-update.md).

{% endnote %}

Метод `crm.activity.update` обновляет существующее дело.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор дела в таймлайне, например `999` ||
|| **fields***
[`array`](../../../../data-types.md) |  Массив значений [полей дела](#fields) в виде структуры:

```json
fields:
{
    "OWNER_TYPE_ID": 2, 
    "OWNER_ID": 102, 
    "TYPE_ID": 2, 
    "SUBJECT": "Новый звонок",
}
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


## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"RESPONSIBLE_ID":1,"DESCRIPTION":"Новое описание дела"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"RESPONSIBLE_ID":1,"DESCRIPTION":"Новое описание дела"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.update',
    		{
    			id: 999,
    			fields: {
    				"RESPONSIBLE_ID": 1, 
    				"DESCRIPTION": "Новое описание дела"
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
                'crm.activity.update',
                [
                    'id' => 999,
                    'fields' => [
                        "RESPONSIBLE_ID" => 1,
                        "DESCRIPTION" => "Новое описание дела"
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
        echo 'Error updating activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.update',
        {
            id: 999,
            fields: {
                "RESPONSIBLE_ID": 1, 
                "DESCRIPTION": "Новое описание дела"
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
        'crm.activity.update',
        [
            'id' => 999,
            'fields' => [
                'RESPONSIBLE_ID' => 1,
                'DESCRIPTION' => 'Новое описание дела'
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
[`boolean`](../../../../data-types.md) | Результат операции. Возвращает `true` если дело успешно изменено, иначе — `false` ||
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
|| `Activity is not found` | Дело с указанным идентификатором не найдено для сущности в CRM ||
|| `The field SUBJECT is not defined or empty` | Поле `SUBJECT` не установлено ||
|| `The field RESPONSIBLE_ID is not defined or invalid` | Поле `RESPONSIBLE_ID` не установлено ||
|| `The field TYPE_ID is not defined or invalid` | Поле `TYPE_ID` не установлено ||
|| `The field COMMUNICATIONS is not defined or invalid` | Поле `COMMUNICATIONS` не установлено ||
|| `The only one communication is allowed for activity of specified type` | Количество контактов более 1 ||
|| `Could not build binding. Please ensure that owner info and communications are defined correctly` | Связи для дела не указаны ||
|| `The custom activity without provider is not supported in current context` | Тип дела не поддерживается в заданном контексте ||
|| `Use crm.activity.configurable.update for this activity provider` | Некорректный вызов метода для конфигур. дела ||
|| `Access denied` | Отсутствуют права на обновление сущности в CRM ||
|| `Application context required` | Некорректный параметр `PROVIDER_ID` для дела, созданного в контексте приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-add.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-get.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)