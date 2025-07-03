# Изменить данные о приложении в чате imbot.app.update

> Scope: [`imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.app.update` обновляет данные о приложении в чате.

{% note warning %}

Обязательными полями является идентификатор приложения и одно из нужных полей для редактирования. Если указать методы JS и IFRAME в одной команде, будут использованы только JS.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название** | **Пример** | **Описание** ||
|| **APP_ID*** | `13` | Идентификатор чата ||
|| **IFRAME** | `'https://marta.bitrix24.tech/iframe/echo.php'` | URL адрес фрейма ||
|| **IFRAME_WIDTH** | `'350'` | Желаемая ширина фрейма. Минимальное значение - 250px ||
|| **IFRAME_HEIGHT** | `'150'` | Желаемая высота фрейма. Минимальное значение - 50px ||
|| **JS_METHOD** | `'SEND'` | ||
|| **JS_PARAM** | `'/help'` | ||
|| **HASH** | `'register'` | Токен для доступа к вашему фрейму, 32 символа ||
|| **ICON_FILE** | `'/* base64 image */'` | Иконка вашего приложения - base64 ||
|| **CONTEXT** | `'BOT'` | Контекст приложения ||
|| **EXTRANET_SUPPORT** | `'N'` | Доступна ли команда пользователям экстранет, по умолчанию N ||
|| **LIVECHAT_SUPPORT** | `'N'` | Поддержка онлайн-чата ||
|| **IFRAME_POPUP** | `'N'` | iframe будет открыт с возможностью перемещения внутри мессенджера, переход между диалогами не будет закрывать такое окно ||
|| **LANG** | `Array(...)` | Массив переводов, желательно указывать как минимум для RU и EN ||
|| **LANGUAGE_ID (LANG)** | `'en'` | Идентификатор языка для перевода ||
|| **TITLE (LANG)** | `'Echobot IFRAME'` | Заголовок для кнопки или команды на указанном языке ||
|| **DESCRIPTION (LANG)** | `'Open Echobot IFRAME app'` | Описание команды на указанном языке ||
|| **COPYRIGHT (LANG)** | `'Bitrix24'` | Авторские права ||
|#

## Пример кода

{% include [Пояснение о restCommand](../../_includes/rest-command.md) %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imbot.app.update',
        Array(
            'APP_ID' => 13,
            'FIELDS' => Array(
                'IFRAME' => 'https://marta.bitrix24.tech/iframe/echo.php',
                'IFRAME_WIDTH' => '350',
                'IFRAME_HEIGHT' => '150',
                'JS_METHOD' => 'SEND',
                'JS_PARAM' => '/help',
                'HASH' => 'register',
                'ICON_FILE' => '/* base64 image */',
                'CONTEXT' => 'BOT',
                'EXTRANET_SUPPORT' => 'N',
                'LIVECHAT_SUPPORT' => 'N',
                'IFRAME_POPUP' => 'N',
                'LANG' => Array(
                    Array(
                        'LANGUAGE_ID' => 'en',
                        'TITLE' => 'Echobot IFRAME',
                        'DESCRIPTION' => 'Open Echobot IFRAME app',
                        'COPYRIGHT' => 'Bitrix24'
                    ),
                )
            )
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
|| `IFRAME_HTTPS` | Ссылка на `IFRAME` обязательно должна быть на сайт с активным HTTPS-сертификатом ||
|| `WRONG_REQUEST` | Что-то пошло не так ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-app-register.md)
- [{#T}](./imbot-app-unregister.md)