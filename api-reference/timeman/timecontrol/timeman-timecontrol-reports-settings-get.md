# Получить пользовательские настройки timeman.timecontrol.reports.settings.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.timecontrol.reports.settings.get` для получения пользовательских настроек для построения интерфейса отчетов инструмента контроля времени.

## Параметры

Без параметров.

## Пример вызова

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod('timeman.timecontrol.reports.settings.get', {}, function(result){
        if(result.error())
        {
            console.error(result.error().ex);
        }
        else
        {
            console.log(result.data());
        }
    });
    ```

- PHP

    ```php
    $result = restCommand('timeman.timecontrol.reports.settings.get', Array(), $_REQUEST["auth"]);    
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result": {
        "active":true,
        "user_id":2,
        "user_admin":true,
        "user_head":true,
        "departments":[
            {"id":"92","name":"Калининградский филиал"},
            {"id":"93","name":"Администрация"},
            {"id":"106","name":"ИТ-отдел"}
        ],
        "minimum_idle_for_report":1,
        "report_view_type":"head"
    }
}
```

### Описание ключей

- **active** - доступность инструмента контроля времени.
- **user_id** - текущий идентификатор пользователя.
- **user_admin** - флаг являетесь ли вы администратором.
- **user_head** - флаг являетесь ли вы руководителем.
- **departments** - список доступных подразделений (доступно только если вы руководитель)
- **id** - идентификатор подразделения
- **name** - название подразделения
- **minimum_idle_for_report** - минимальное кол-во времени для запроса отчета (в минутах)
- **report_view_type** - уровень детализации отчета (head, full, simple)