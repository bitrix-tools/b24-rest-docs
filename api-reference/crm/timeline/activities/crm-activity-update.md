# Изменить системное дело crm.activity.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
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

С версии CRM 22.1350.0 метод устарел. Используйте методы универсального дела:
- [{#T}](./todo/crm-activity-todo-update-deadline.md)
- [{#T}](./todo/crm-activity-todo-update-description.md).

{% endnote %}

Метод `crm.activity.update` обновляет существующее дело.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`unknown`](../../../data-types.md) | Идентификатор дела. ||
|| **fields**
[`array`](../../../data-types.md) | Набор полей - массив вида array("обновляемое поле"=>"значение"[, ...]), где "обновляемое поле" может принимать значения из возвращаемых методом [crm.activity.fields](./crm-activity-fields.md). 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.activity.fields](./crm-activity-fields.md) и посмотрите формат пришедших значений этих полей.

{% endnote %}

 ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    var d = new Date();
    d.setSeconds(0);
    var dateStr = d.getFullYear() + '-' + paddatepart(1 + d.getMonth()) + '-' + paddatepart(d.getDate()) + 'T' + paddatepart(d.getHours()) + ':' + paddatepart(d.getMinutes()) + ':' + paddatepart(d.getSeconds()) + '+00:00';
    var paddatepart = function(part)
    {
        return part >= 10 ? part.toString() : '0' + part.toString();
    }
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.activity.update",
        {
            id: id,
            fields:
            {
                "START_TIME": dateStr,
                "END_TIME": dateStr,
                COMPLETED: 'Y'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}