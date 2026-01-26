# Отправить push-уведомления на мобильное устройство в рамках приложения Битрикс24 pull.application.push.add

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

Метод `pull.application.push.add` служит для отправки push-уведомления на мобильное устройство в рамках приложения Битрикс24.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **USER_ID**^*^ | Идентификаторы пользователей получателей push-уведомлений. ||
|| **TEXT** | Произвольный текст. ||
|| **AVATAR** | Ссылка на изображение. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JavaScript
  
    ```js
    BX24.callMethod('pull.application.push.add', {
        'USER_ID': [1,2,3],
        'TEXT': 'Hello, world!',
        'AVATAR': 'https://files.shelenkov.com/images/avatar-ivanov.jpg',
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
    $result = restCommand('pull.application.push.add', [
        'USER_ID': [1,2,3],
        'TEXT': 'Hello, world!',
        'AVATAR': 'https://files.shelenkov.com/images/avatar-ivanov.jpg',
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
    "error_description": "Send push notifications available only for application authorization."
}
```

Ключи:

- **error** - код возникшей ошибки
- **error_description** - краткое описание возникшей ошибки
  

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| TEXT_ERROR     | Не передан текст сообщения. ||
|| EMPTY_APP_NAME | Ошибка возникает если у вашего приложения не задано название. ||
|| ACCESS_ERROR    | Метод может использовать только пользователь с правами администратора. ||
|| WRONG_AUTH_TYPE | Метод можно использовать только в рамках [OAuth 2.0](../../oauth/index.md). ||
|#

## Смотрите также

- [Интерактивность в приложениях](../../interactivity/index.md)