# Удалить приложение для чата imbot.app.unregister

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.app.unregister` удаляет приложение из чата.

## Параметры метода

#|
|| **Название** | **Пример** | **Описание** ||
|| **APP_ID** | `13` | Идентификатор команды для удаления ||
|#

## Пример кода

{% include [Пояснение о restCommand](../../_includes/rest-command.md) %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imbot.app.unregister',
        Array(
            'APP_ID' => 13,
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

## Ответ в случае успеха

`true`

## Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `CHAT_APP_ID_ERROR` | Приложение не найдено ||
|| `APP_ID_ERROR` | Приложение для чата не принадлежит этому rest-приложению. Работать можно только с приложениями для чата, установленными в рамках текущего rest-приложения ||
|| `WRONG_REQUEST` | Что-то пошло не так ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-app-register.md)
- [{#T}](./imbot-app-update.md)