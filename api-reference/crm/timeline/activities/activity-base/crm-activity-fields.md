# Получить список полей дела crm.activity.fields

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.fields` возвращает описание полей системного дела.

## Параметры метода

Без параметров

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
     curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
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
                'crm.activity.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching CRM activity fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.fields',
        {},
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
        'crm.activity.fields',
        []
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
        "ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID"
        },
        "OWNER_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID владельца"
        },
        "OWNER_TYPE_ID": {
            "type": "crm_enum_ownertype",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип владельца"
        },
        "TYPE_ID": {
            "type": "crm_enum_activitytype",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип"
        },
        "PROVIDER_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID провайдера"
        },
        "PROVIDER_TYPE_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип провайдера"
        },
        "PROVIDER_GROUP_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип коннектора"
        },
        "ASSOCIATED_ENTITY_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID связанной с делом сущности"
        },
        "SUBJECT": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тема"
        },
        "START_TIME": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Начало"
        },
        "END_TIME": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Срок"
        },
        "DEADLINE": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Срок исполнения"
        },
        "COMPLETED": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Выполнено"
        },
        "STATUS": {
            "type": "crm_enum_activitystatus",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Статус"
        },
        "RESPONSIBLE_ID": {
            "type": "user",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ответственный"
        },
        "PRIORITY": {
            "type": "crm_enum_activitypriority",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Важность"
        },
        "NOTIFY_TYPE": {
            "type": "crm_enum_activitynotifytype",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип уведомлений"
        },
        "NOTIFY_VALUE": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Параметр уведомления"
        },
        "DESCRIPTION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Описание"
        },
        "DESCRIPTION_TYPE": {
            "type": "crm_enum_contenttype",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип описания"
        },
        "DIRECTION": {
            "type": "crm_enum_activitydirection",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Направление"
        },
        "LOCATION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Место"
        },
        "CREATED": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата создания"
        },
        "AUTHOR_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Создал"
        },
        "LAST_UPDATED": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата изменения"
        },
        "EDITOR_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Изменил"
        },
        "SETTINGS": {
            "type": "object",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Настройки"
        },
        "ORIGIN_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний код"
        },
        "ORIGINATOR_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний источник"
        },
        "RESULT_STATUS": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_STATUS"
        },
        "RESULT_STREAM": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_STREAM"
        },
        "RESULT_SOURCE_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_SOURCE_ID"
        },
        "PROVIDER_PARAMS": {
            "type": "object",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Параметры провайдера"
        },
        "PROVIDER_DATA": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Данные провайдера"
        },
        "RESULT_MARK": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_MARK"
        },
        "RESULT_VALUE": {
            "type": "double",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_VALUE"
        },
        "RESULT_SUM": {
            "type": "double",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_SUM"
        },
        "RESULT_CURRENCY_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RESULT_CURRENCY_ID"
        },
        "AUTOCOMPLETE_RULE": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Автозаполнение"
        },
        "BINDINGS": {
            "type": "crm_activity_binding",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Привязки"
        },
        "COMMUNICATIONS": {
            "type": "crm_activity_communication",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Канал коммуникации"
        },
        "FILES": {
            "type": "diskfile",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Файлы"
        },
        "WEBDAV_ELEMENTS": {
            "type": "diskfile",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "isDeprecated": true,
            "title": "Добавленные файлы"
        },
        "IS_INCOMING_CHANNEL": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "IS_INCOMING_CHANNEL"
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
[`object`](../../../../data-types.md) | Корневой элемент ответа. Значения для поля `result` соответствуют [полям объекта](#all-fields). ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Обзор полей системного дела {#all-fields}

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Поле** `тип` | **Описание** | **Примечание** ||
|| **ID***
[`integer`](../../../data-types.md) | Идентификатор дела | Только для чтения ||
|| **OWNER_ID***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM | Можно изменить методом [crm.activity.binding.move](../binding/crm-activity-binding-move.md)  ||
|| **OWNER_TYPE_ID***
[`integer`](../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type) | Неизменяемое ||
|| **TYPE_ID***
[`crm_enum_activitytype`](../../../data-types.md) | Тип дела | Обязательный, неизменяемый ||
|| **ASSOCIATED_ENTITY_ID**
[`integer`](../../../../data-types.md) | Целочисленный идентификатор связанной с делом сущности | Только для чтения ||
|| **AUTHOR_ID***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор пользователя, создавшего дело | ||
|| **AUTOCOMPLETE_RULE**
[`integer`](../../../../data-types.md) | Целочисленный идентификатор правила, по которому сработало автозаполнение | ||
|| **BINDINGS**
[`crm_activity_binding`](../../../data-types.md) | Привязки к элементам CRM | Множественное, только для чтения ||
|| **COMMUNICATIONS***
[`crm_activity_communication`](../../../data-types.md) | [Описание коммуникации](./crm-activity-communication-fields.md) | Множественное, обязательное ||
|| **COMPLETED***
[`char`](../../../data-types.md) | Флаг, говорящий завершено дело или нет (`Y`|`N`) | ||
|| **CREATED***
[`datetime`](../../../data-types.md) | Дата и время создания дела | ||
|| **DEADLINE**
[`datetime`](../../../data-types.md) | Дата и время срока исполнения дела | Поле напрямую не устанавливается, значение берётся из START_TIME для звонка и встречи и из END_TIME для задачи ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Текстовое описание дела | ||
|| **DESCRIPTION_TYPE**
[`crm.enum.contenttype`](../../../data-types.md) | Тип описания | ||
|| **DIRECTION**
[`crm.enum.activitydirection`](../../../data-types.md) | Направление дела: входящее/исходящее. | Актуально для звонков и писем, для встреч не используется ||
|| **EDITOR_ID**
[`user`](../../../data-types.md) | Целочисленный идентификатор пользователя, изменявшего дело | Только для чтения ||
|| **END_TIME**
[`datetime`](../../../data-types.md) | Время завершения дела | ||
|| **FILES**
[`diskfile`](../../../data-types.md) | Добавленные в дело файлы | Множественное ||
|| **LAST_UPDATED**
[`datetime`](../../../data-types.md) | Дата последнего обновления | Только для чтения ||
|| **LOCATION**
[`string`](../../../data-types.md) | Местоположение | ||
|| **NOTIFY_TYPE**
[`crm.enum.activitynotifytype`](../../../data-types.md) | Тип уведомления | ||
|| **NOTIFY_VALUE**
[`integer`](../../../data-types.md) | Значение уведомления | Только для чтения ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор источника данных | Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../../../data-types.md) | Идентификатор элемента в источнике данных | Используется только для привязки к внешнему источнику ||
|| **ORIGIN_VERSION**
[`string`](../../../data-types.md) | Оригинальная версия | Используется для защиты данных от случайного перетирания внешней системой. Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **PRIORITY**
[`crm.enum.activitypriority`](../../../data-types.md) | Приоритет | ||
|| **PROVIDER_DATA**
[`string`](../../../data-types.md) | Дополнительные данные провайдера | ||
|| **PROVIDER_GROUP_ID**
[`string`](../../../data-types.md) | Идентификатор группы провайдера | ||
|| **PROVIDER_ID**
[`string`](../../../data-types.md) | Идентификатор провайдера | Только для чтения ||
|| **PROVIDER_TYPE_ID**
[`string`](../../../data-types.md) | Идентификатор типа провайдера | Статус из справочника ||
|| **PROVIDER_PARAMS**
[`object`](../../../data-types.md) | Дополнительные параметры провайдера | ||
|| **RESPONSIBLE_ID***
[`user`](../../../data-types.md) | Целочисленный идентификатор пользователя, ответственного за дело | Обязательное ||
|| **RESULT_CURRENCY_ID**
[`string`](../../../data-types.md) | | ||
|| **RESULT_MARK**
[`integer`](../../../data-types.md) | | ||
|| **RESULT_SOURCE_ID**
[`string`](../../../data-types.md) | | ||
|| **RESULT_STATUS**
[`integer`](../../../data-types.md) | | ||
|| **RESULT_STREAM**
[`integer`](../../../data-types.md) | Статистика отчётов | ||
|| **RESULT_SUM**
[`double`](../../../data-types.md) | | ||
|| **RESULT_VALUE**
[`double`](../../../data-types.md) | | ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Доболнительные настройки | ||
|| **START_TIME**
[`datetime`](../../../data-types.md) | Время начала выполнения дела | ||
|| **STATUS**
[`crm_enum_activitystatus`](../../../data-types.md) | Статус дела | ||
|| **SUBJECT**
[`string`](../../../data-types.md) | Дополнительное описание дела | Обязательное ||
|| **WEBDAV_ELEMENTS**
[`diskfile`](../../../data-types.md) | Добавленные файлы | Множественное. Устарел, сохраняется для совместимости ||
|| **IS_INCOMING_CHANNEL**
[`char`](../../../data-types.md) | Флаг, говорящий дело создано из входящего канала или нет (`Y`/`N`) |  ||
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

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-add.md)
- [{#T}](./crm-activity-update.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-get.md)
