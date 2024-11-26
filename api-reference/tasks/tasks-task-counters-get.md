# Получить счетчики пользователя tasks.task.counters.get

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.counters.get` получения счетчиков пользователя.

Можно отфильтровать по:
- userId
- groupId
- type

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **userId**
[`unknown`](../data-types.md) | Идентификатор пользователя (пространство имен). Если `userId` не указан, то берется текущий пользователь. ||
|| **groupId**
[`unknown`](../data-types.md) | Идентификатор группы пользователя. ||
|| **type**
[`unknown`](../data-types.md) |Роль счетчиков: 
- **view_all** - все роли; 
- **view_role_responsible** - роль "Делаю"; 
- **view_role_accomplice** - роль "Помогаю"; 
- **view_role_auditor** - роль "Наблюдаю"; 
- **view_role_originator** - роль "Поручил". 
||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('tasks.task.counters.get', {userId:1, groupId:0, type:'view_all'}, (res)=>{console.log(res.answer.result);});
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "result": {
        "wo_deadline": {
            "counter": 0,
            "code": 10485760
        },
        "expired": {
            "counter": 1,
            "code": 6291456
        },
        "expired_soon": {
            "counter": 0,
            "code": 9437184
        },
        "not_viewed": {
            "counter": 0,
            "code": 1048576
        },
        "wait_ctrl": {
            "counter": 0,
            "code": 8388608
        }
    },
    "total": 1,
    "time": {
        "start": 1552383141.526606,
        "finish": 1552383141.576861,
        "duration": 0.05025482177734375,
        "processing": 0.002279996871948242,
        "date_start": "2019-03-12T11:32:21+02:00",
        "date_finish": "2019-03-12T11:32:21+02:00"
    }
}
```