# Получить описание коммуникации crm.activity.communication.fields

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод `crm.activity.communication.fields` возвращает описание коммуникации для дела. Коммуникации хранят номера телефонов в звонках, email-адреса в письмах, имена во встречах.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.communication.fields
    ```

- cURL (OAuth)

    ```bash

    ```

- JS
    
    ```javascript
    BX24.callMethod(
        'crm.activity.communication.fields',
        {},
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    ```php
    
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
        "ACTIVITY_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дело"
        },
        "ENTITY_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID элемента сущности"
        },
        "ENTITY_TYPE_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип сущности"
        },
        "TYPE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип"
        },
        "VALUE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Значение"
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
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Обзор полей коммуникации дела {#all-fields}

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Поле** `тип` | **Описание** | **Примечание** ||
|| **ID***
[`integer`](../../../data-types.md) | Целочисленный идентификатор коммуниуации | Неизменяемое ||
|| **ACTIVITY_ID***
[`integer`](../../../data-types.md) | Целочисленный идентификатор дела | Неизменяемое ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Целочисленный идентификатор элемента CRM | Неизменяемое ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | [Целочисленный идентификатор типа объекта CRM](../../../data-types.md#object_type) | Неизменяемое ||
|| **TYPE_ID***
[`integer`](../../../data-types.md) | Тип коммуникации | Неизменяемый ||
|| **VALUE***
[`integer`](../../../data-types.md) | Значение коммуникации | Неизменяемый ||
|#

# Обработка ошибок

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
- [{#T}](./crm-activity-fields.md)
- [{#T}](./crm-activity-get.md)
