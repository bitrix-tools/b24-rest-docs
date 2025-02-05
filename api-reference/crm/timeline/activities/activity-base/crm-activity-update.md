# Обновить системное дело crm.activity.update

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь с правом на обновление дела`

{% note warning %}

С версии CRM 22.1350.0 метод устарел. Используйте методы универсального дела:
- [{#T}](../todo-update/crm-activity-todo-update-deadline.md)
- [{#T}](../todo-update/crm-activity-todo-update-description.md).

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
[`array`](../../../../data-types.md) | Массив вида array("поле"=>"значение"[, ...]), содержащий значения полей дел

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.activity.fields](./crm-activity-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
     curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{ "id":999, "fields":{"DESCRIPTION": "Новое описание дела"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.update
    ```

- cURL (OAuth)

    ```bash

    ```

- JS
    
    ```javascript
    BX24.callMethod(
        'crm.activity.update',
        {
            id: 999,
            fields: {
                "START_TIME": new Date(),
                "DESCRIPTION": "Новое описание дела"
            }
        },
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
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Activity is not found. | Дело с указанным идентификатором не найдено для сущности в CRM ||
|| Пустая строка | The field SUBJECT is not defined or empty. | Поле `SUBJECT` не установлено ||
|| Пустая строка | The field RESPONSIBLE_ID is not defined or invalid. | Поле `RESPONSIBLE_ID` не установлено ||
|| Пустая строка | The field TYPE_ID is not defined or invalid. | Поле `TYPE_ID` не установлено ||
|| Пустая строка | The field COMMUNICATIONS is not defined or invalid. | Поле `COMMUNICATIONS` не установлено ||
|| Пустая строка | The only one communication is allowed for activity of specified type. | Количество контактов более 1 ||
|| Пустая строка | Could not build binding. Please ensure that owner info and communications are defined correctly. | Связи для дела не указаны ||
|| Пустая строка | The custom activity without provider is not supported in current context. | Тип дела не поддерживается в заданном контексте ||
|| Пустая строка | Use crm.activity.configurable.update for this activity provider | Некорректный вызов метода для конфигур. дела ||
|| Пустая строка | Access denied. | Отсутствуют права на обновление сущности в CRM ||
|| Пустая строка | Application context required. | Некорректный параметр `PROVIDER_ID` для дела, созданного в контексте приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-add.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-get.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)