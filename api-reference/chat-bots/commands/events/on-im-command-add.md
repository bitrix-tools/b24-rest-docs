# На получение команды ONIMCOMMANDADD

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- таблицы параметров сгенерированы по примеру. Что такое [14] в примере???

{% endnote %}

{% endif %}

> Scope: [`im`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONIMCOMMANDADD` на установку приложения.

{% note warning %}

Описанные ниже поля - это содержимое поля [data] в событии. Данные авторизации в ключе [auth] содержат данные пользователя инициатора события, для получения данных авторизации бота, необходимо использовать [data][BOT][__BOT_CODE__].

{% endnote %}

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **COMMAND** 
[`unknown`](../../../data-types.md) | Массив команд, которые были вызваны пользователем | ||
|| **PARAMS** 
[`unknown`](../../../data-types.md) | Массив данных сообщения | ||
|| **USER** 
[`unknown`](../../../data-types.md) | Массив данных автора сообщения, может быть пустым, если ID = 0 | ||
|#

## COMMAND / [14]???

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **AUTH** 
[`unknown`](../../../data-types.md) | Параметры для авторизации под чат-ботом для выполнения действий | ||
|| **BOT_ID** 
[`unknown`](../../../data-types.md) | Идентификатор чат-бота | ||
|| **BOT_CODE** 
[`unknown`](../../../data-types.md) | Код чат-бота | ||
|| **COMMAND** 
[`unknown`](../../../data-types.md) | Вызванная команда | ||
|| **COMMAND_ID** 
[`unknown`](../../../data-types.md) | Идентификатор команды | ||
|| **COMMAND_PARAMS** 
[`unknown`](../../../data-types.md) | Параметры, с которыми была вызвана команда | ||
|| **COMMAND_CONTEXT** 
[`unknown`](../../../data-types.md) | Контекст выполнения команды.
- TEXTAREA, если команда введена руками
- KEYBOARD, если нажал на кнопку в клавиатуре | ||
|| **MESSAGE_ID** 
[`unknown`](../../../data-types.md) | Идентификатор сообщения, на которое необходимо ответить | ||
|#

## PARAMS

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **DIALOG_ID** 
[`unknown`](../../../data-types.md) | Идентификатор диалога | ||
|| **CHAT_TYPE** 
[`unknown`](../../../data-types.md) | Тип сообщения и чата
- P (чат один-на-один),
- C (с ограниченным количеством участников),
- O (публичный чат) | ||
|| **MESSAGE_ID** 
[`unknown`](../../../data-types.md) | Идентификатор сообщения | ||
|| **MESSAGE** 
[`unknown`](../../../data-types.md) | Сообщение | ||
|| **MESSAGE_ORIGINAL** 
[`unknown`](../../../data-types.md) | Оригинальное сообщение с BB-кодом бота (параметр доступен только в групповых чатах) | ||
|| **FROM_USER_ID** 
[`unknown`](../../../data-types.md) | Идентификатор пользователя отправившего сообщение | ||
|| **TO_USER_ID** 
[`unknown`](../../../data-types.md) | Идентификатор другого пользователя (параметр доступен только в чатах один-на-один) | ||
|| **TO_CHAT_ID** 
[`unknown`](../../../data-types.md) | Идентификатор чата (параметр доступен только в групповых чатах) | ||
|| **LANGUAGE** 
[`unknown`](../../../data-types.md) | Идентификатор языка портала по умолчанию | ||
|#

## USER

#|
|| **Поле** | **Описание** | **Ревизия** ||
|| **ID** 
[`unknown`](../../../data-types.md) | Идентификатор пользователя | ||
|| **NAME** 
[`unknown`](../../../data-types.md) | Имя и фамилия пользователя | ||
|| **FIRST_NAME** 
[`unknown`](../../../data-types.md) | Имя пользователя | ||
|| **LAST_NAME** 
[`unknown`](../../../data-types.md) | Фамилия пользователя | ||
|| **WORK_POSITION** 
[`unknown`](../../../data-types.md) | Занимаемая должность | ||
|| **GENDER** 
[`unknown`](../../../data-types.md) | Пол, может быть либо M (мужской), либо F (женский) | ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    [COMMAND] => Array (
        [14] => Array (
            [AUTH] => Array (
                [domain] => b24.hazz
                [member_id] => d41d8cd98f00b204e9800998ecf8427e
                [application_token] => 8006ddd764e69deb28af0c768b10ed65
            )
            [BOT_ID] => 62
            [BOT_CODE] => echobot
            [COMMAND] => echo
            [COMMAND_ID] => 14
            [COMMAND_PARAMS] => test
            [COMMAND_CONTEXT] => TEXTAREA
            [MESSAGE_ID] => 1221
        )
    )
    [PARAMS] => Array (
        [DIALOG_ID] => 1
        [CHAT_TYPE] => P
        [MESSAGE_ID] => 1221
        [MESSAGE] => /echo test
        [MESSAGE_ORIGINAL] => /echo test
        [FROM_USER_ID] => 1
        [TO_USER_ID] => 2
        [TO_CHAT_ID] => 6
        [LANGUAGE] => ru
    )
    [USER] => Array (
        [ID] => 1
        [NAME] => Евгений Шеленков
        [FIRST_NAME] => Евгений
        [LAST_NAME] => Шеленков
        [WORK_POSITION] =>
        [GENDER] => M
    )
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}