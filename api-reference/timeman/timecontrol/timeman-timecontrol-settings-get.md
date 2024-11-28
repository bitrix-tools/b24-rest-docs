# Получить настройки инструмента контроля времени timeman.timecontrol.settings.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.timecontrol.settings.get` для получения настроек инструмента контроля времени.

## Параметры

Без параметров.

## Пример вызова

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'timeman.timecontrol.settings.get',
        {},
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    $result = restCommand(
        'timeman.timecontrol.settings.get',
        Array(),
        $_REQUEST["auth"]
    );    
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result":{
        "active":true,
        "minimum_idle_for_report":1,
        "register_offline":true,
        "register_idle":true,
        "register_desktop":true,
        "report_request_type":"all",
        "report_request_users":[],
        "report_simple_type":"all",
        "report_simple_users":[],
        "report_full_type":"all",
        "report_full_users":[]
    }
}
```

### Описание ключей

- **active** - доступность инструмента контроля времени.
- **minimum_idle_for_report** - минимальное кол-во времени для запроса отчета (в минутах).
- **register_offline** - фиксировать факт перехода пользователя в режим офлайн.
- **register_idle** - фиксировать факт перехода пользователя в режим отошел.
- **register_desktop** - фиксировать факт включения и отключения десктоп приложения.
- **report_request_type** - у кого запрашивать отчет (`all` - у всех, `user` - только у указанных пользователей, `none` - ни у кого).
- **report_request_users** - список пользователей у кого запрашивать отчет (если `report_request_type == user`).
- **report_simple_type** - кому доступен упрощенный отчет (`all` - всем, `user` - только указанным пользователям).
- **report_simple_users** - список пользователей кому доступен упрощенный отчет (если `report_simple_type == user`).
- **report_full_type** - кому доступен расширенный отчет (`all` - всем, `user` - только указанным пользователям).
- **report_full_users** - список пользователей кому доступен расширенный отчет (если `report_simple_type == user`).

## Ответ в случае ошибки

> 200 Error, 50x Error
```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to user this method"
}
```



- **error** - код возникшей ошибки.
- **error_description** - краткое описание возникшей ошибки.

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_ERROR** | Указанный метод доступен только администраторам. ||
|#