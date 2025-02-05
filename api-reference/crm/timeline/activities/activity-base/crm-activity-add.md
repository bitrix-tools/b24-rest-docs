# Добавить системное дело crm.activity.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь с правом на добавление дела`

{% note warning %}

С версии CRM 22.1350.0 метод устарел. Используйте метод добавления универсального дела [{#T}](../crm-activity-todo-add.md).

{% endnote %}

Метод `crm.activity.add` создаёт новое системное дело.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`array`](../../../../data-types.md) | Массив вида array("поле"=>"значение"[, ...]), содержащий значения полей дел.

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.activity.fields](./crm-activity-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}

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

### Варианты использования значений полей

Для дел типа `e-mail`:
- если письмо не должно быть отправлено, то следует установить `DIRECTION=2` и `COMPLETED='N'`;
- если необходимо пометить письма как завершенные, то следует выполнить обновление с выставлением флага завершения.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    ```

- cURL (OAuth)

    ```bash
    ```

- JS

    ```javascript
    let paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };

    let d = new Date();
    d.setDate(d.getDate() + 7);
    d.setSeconds(0);
 
    let dateStr = d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+00:00';

    BX24.callMethod(
        "crm.activity.add",
        {
            fields:
            {
                "OWNER_TYPE_ID": 2, //из метода crm.enum.ownertype: 2 - тип "сделка"
                "OWNER_ID": 102, //id сделки
                "TYPE_ID": 2, //из метода crm.enum.activitytype
                "COMMUNICATIONS": [ { VALUE:"+79832322323", ENTITY_ID:134,ENTITY_TYPE_ID:3 } ], //где 134 - id контакта, 3 - тип "контакт"
                "SUBJECT": "Новый звонок",
                "START_TIME": dateStr,
                "END_TIME": dateStr,
                "COMPLETED": "N",
                "PRIORITY": 3, //из метода crm.enum.activitypriority
                "RESPONSIBLE_ID": 1,
                "DESCRIPTION": "Важный звонок",
                "DESCRIPTION_TYPE": 3, //из метода crm.enum.contenttype
                "DIRECTION": 2, // из метода crm.enum.activitydirection
                "WEBDAV_ELEMENTS":
                [
                    { fileData: document.getElementById('file1') }
                ],
                "FILES":
                [
                    { fileData: document.getElementById('file1') }
                ] //после установки модуля disk и конвертации данных из webdav можно будет указавать FILES вместо WEBDAV_ELEMENTS
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
[`boolean`](../../../../data-types.md) | Результат операции. Возвращает целочисленный идентификатор дела в таймлайне в случае успеха, иначе — `false` ||
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
|| Пустая строка | The field SUBJECT is not defined or empty. | Поле `SUBJECT` не установлено ||
|| Пустая строка | The field RESPONSIBLE_ID is not defined or invalid. | Поле `RESPONSIBLE_ID` не установлено ||
|| Пустая строка | The field TYPE_ID is not defined or invalid. | Поле `TYPE_ID` не установлено ||
|| Пустая строка | The field COMMUNICATIONS is not defined or invalid. | Поле `COMMUNICATIONS` не установлено ||
|| Пустая строка | The only one communication is allowed for activity of specified type. | Количество контактов более 1 ||
|| Пустая строка | Could not build binding. Please ensure that owner info and communications are defined correctly. | Связи для дела не указаны ||
|| Пустая строка | 
- Email send error. Failed to load module "subscribe".
- Email send error. Invalid data.
- Email send error. Invalid email is specified.
- Email send error. "From" is not found.
- Email send error. "To" is not found.
- Email send error. Failed to add posting. Please see details below.
- Email send error. Failed to save posting file. Please see details below.
- Email send error. Failed to update activity.
- Email send error. General error.
 | Ошибки "почтовых" дел ||
|| Пустая строка | The custom activity without provider is not supported in current context. | Тип дела не поддерживается в заданном контексте ||
|| Пустая строка | Use crm.activity.configurable.add for this activity provider | Некорректный вызов метода для конфигур. дела ||
|| Пустая строка | Access denied. | Отсутствуют права на добавление сущности в CRM ||
|| Пустая строка | Application context required. | Некорректный параметр `PROVIDER_ID` для дела, созданного в контексте приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-update.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-get.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)