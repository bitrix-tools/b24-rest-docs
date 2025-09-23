# Отправить события в RT-канал приложения pull.application.event.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`pull`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `pull.application.event.add` служит для отправки событий в RT-канал приложения.

#|
|| **Параметр** | **Описание** ||
|| **COMMAND**^*^ | Тип события, строка. ||
|| **PARAMS** | Произвольный JSON массив с данными. ||
|| **MODULE_ID** | Если отправляются команды из разных подсистем приложения, можно это указать через модуль. ||
|| **USER_ID** | Если не указывать USER_ID, то данные будут отправлены в общий канал. Если указать ID пользователя, то данные будут отправлены в приватный канал. Администратор может отправлять одновременно нескольким пользователям и в общий канал, пользователь без прав - только себе или в общий канал. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JavaScript
  
    ```js
    BX24.callMethod('pull.application.event.add', {
        'COMMAND': 'test',
        'PARAMS': '{"param1":"value1"}',
    }, function(result){
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
    $result = restCommand('pull.application.event.add', [
        'COMMAND' => 'test',
        'PARAMS' => ['param1' => 'value1'],
    ], $_REQUEST["auth"]);
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
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Get access to application config available only for application authorization."
}
```
Ключи:

- **error** - код возникшей ошибки
- **error_description** - краткое описание возникшей ошибки
  
### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| COMMAND_ERROR        | Формат поля MODULE_ID не верный. Разрешены английские буквы в смешанном регистре, цифры, символ подчеркивания, точка и тире. ||
|| MODULE_ID_ERROR     | Формат поля MODULE_ID не верный. Разрешены английские буквы в нижнем регистре, цифры, точка и знак подчеркивания. ||
|| USER_ID_ACCESS_ERROR | Указывать произвольных пользователей может только пользователь с правами администратора. ||
|| PARAMS_ERROR         | Передан не корректный JSON объект. ||
|| WRONG_AUTH_TYPE     | Метод можно использовать только в рамках [OAuth 2.0](../../oauth/index.md). ||
|#

## Смотрите также

- [Интерактивность в приложениях](../../interactivity/index.md)