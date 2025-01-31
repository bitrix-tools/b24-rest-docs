# Добавить системное дело crm.activity.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

С версии CRM 22.1350.0 метод устарел. Используйте метод добавления универсального дела [{#T}](./todo/crm-activity-todo-add.md).

{% endnote %}

Метод `crm.activity.add` создаёт новое дело.

## Параметры

#|
|| Параметр | Описание ||
|| **fields**
[`array`](../../../data-types.md) | Массив вида array("поле"=>"значение"[, ...]), содержащий значения полей дел. 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.activity.fields](./crm-activity-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}

Имеется дополнительное поле `DISABLE_SENDING_MESSAGE_COPY`. Оно предназначено для принудительного отключения отправки копии сообщения адресату из MESSAGE_FROM. Если параметр не заполнен или указано любое значение отличное от `Y` - копия отправлена будет. Пример:

```js
[
    'fields'=> array (
        'SETTINGS'=> array (
            'DISABLE_SENDING_MESSAGE_COPY'=>'Y'
        )
    )
]
```
 ||
|#

## Варианты использования значений полей
Для дел типа e-mail:
- если письмо не должно быть отправлено, то следует установить `DIRECTION=2` и `COMPLETED='N'`;
- если необходимо пометить письма как завершенные, то следует выполнить обновление с выставлением флага завершения.

## Примеры

{% list tabs %}

- JS

    ```js
    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    };

    var d = new Date();
    d.setDate(d.getDate() + 7);
    d.setSeconds(0);
    var dateStr = d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+00:00';

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
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан новый звонок с ID " + result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

