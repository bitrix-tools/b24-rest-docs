# Установить настройки инструмента контроля времени timeman.timecontrol.settings.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.timecontrol.settings.set` для установки настроек инструмента контроля времени.

## Параметры

#|
|| **Параметр** | **По умолчанию** | **Обязательный** | **Описание** ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | false | Нет | Доступность инструмента контроля времени.
Включается через `active: true`. Отключать через active: false в случае, если данные отправляются как *bool*. Если данные отправляются как текст *false* в виде текста это *true*, то отключается только через `active: 0`. ||
|| **MINIMUM_IDLE_FOR_REPORT**
[`unknown`](../../data-types.md) | 15 | Нет | Минимальное количество времени для запроса отчета в минутах. ||
|| **REGISTER_OFFLINE**
[`unknown`](../../data-types.md) | true | Нет | Фиксировать факт перехода пользователя в режим офлайн. ||
|| **REGISTER_IDLE**
[`unknown`](../../data-types.md) | true | Нет | Фиксировать факт перехода пользователя в режим отошел. ||
|| **REGISTER_DESKTOP**
[`unknown`](../../data-types.md) | true | Нет | Фиксировать факт включения и отключения десктоп приложения. ||
|| **REPORT_REQUEST_TYPE**
[`unknown`](../../data-types.md) | none | Нет | У кого запрашивать отчет (`all` - у всех, `user` - только у указанных пользователей, none - ни у кого). ||
|| **REPORT_REQUEST_USERS**
[`unknown`](../../data-types.md) | [] | Нет* | Список пользователей у кого запрашивать отчет (если `report_request_type == user`). ||
|| **REPORT_SIMPLE_TYPE**
[`unknown`](../../data-types.md) | all | Нет | Кому доступен упрощенный отчет (`all` - всем, `user` - только указанным пользователям). ||
|| **REPORT_SIMPLE_USERS**
[`unknown`](../../data-types.md) | [] | Нет* | Список пользователей кому доступен упрощенный отчет (если `report_simple_type == user`). ||
|| **REPORT_FULL_TYPE**
[`unknown`](../../data-types.md) | user | Нет | Кому доступен расширенный отчет (`all` - всем, `user` - только указанным пользователям). ||
|| **REPORT_FULL_USERS**
[`unknown`](../../data-types.md) | [] | Нет* | Список пользователей кому доступен расширенный отчет (если `report_simple_type == user`). ||
|#

\* - если вы передаете параметр `REPORT_REQUEST_TYPE = user` (или `REPORT_SIMPLE_TYPE = user`, или `REPORT_FULL_TYPE = user`), вы обязательно должны передать соответственно `REPORT_REQUEST_USERS` (или `REPORT_SIMPLE_USERS`, или `REPORT_FULL_USERS`).

## Пример

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'timeman.timecontrol.settings.set',
        {
            active: true,
            report_request_type: 'user',
            report_request_users: [1,2,3],
        },
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
        'timeman.timecontrol.settings.set',
        Array(
            active: true,
            report_request_type: 'user',
            report_request_users: [1,2,3],
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result": true
}
```

## Ответ в случае ошибки

> 200 Error, 50x Error
```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to user this method"
}
```

### Описание ключей

- **error** - код возникшей ошибки.
- **error_description** - краткое описание возникшей ошибки.

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_ERROR** | Указанный метод доступен только администраторам. ||
|| **INVALID_FORMAT** | Передан некорректный формат в поле `RANGE`. ||
|#
