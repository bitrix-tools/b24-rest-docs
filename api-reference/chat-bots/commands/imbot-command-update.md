# Изменить команду imbot.command.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не для всех параметров есть пример в таблице
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imbot.command.update` обновляет данные в команде.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **COMMAND_ID^*^**
[`unknown`](../../data-types.md) | `13` | Идентификатор команды для обновления | ||
|| **FIELDS^*^**
[`unknown`](../../data-types.md) | | Поля для обновления. Должно быть обязательно указано хотя бы одно поле. | ||
|| **EVENT_COMMAND_ADD**
[`unknown`](../../data-types.md) | `'http://www.hazz/chatApi/bot.php'` | Ссылка на обработчик команд | ||
|| **HIDDEN**
[`unknown`](../../data-types.md) | `'N'` | Скрытая команда или нет | ||
|| **EXTRANET_SUPPORT**
[`unknown`](../../data-types.md) | `'N'` | Доступна ли команда пользователям Экстранет | ||
|| **CLIENT_ID**
[`unknown`](../../data-types.md) | `''` | Строковый идентификатор чат-бота, используется только в режиме Вебхуков | ||
|| **LANG^*^**
[`unknown`](../../data-types.md) | 
```php
Array(
    Array(
        'LANGUAGE_ID' => 'en',
        'TITLE' => 'Get echo message',
        'PARAMS' => 'some text'
    )
)
```
 | Новые фразы перевода, все предыдущие будут удалены | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note warning %}

Для обработки команды нужно, чтобы в приложении была обработка события добавления команды [ONIMCOMMANDADD](./events/on-im-command-add.md).

{% endnote %}

{% note warning %}

Обязательно указывать массив переводов `LANG` как минимум для RU и EN. Если нет фразы для BY, UA, KZ, то показываются по умолчанию фразы RU, если в RU нет фразы - команда скрывается. Для остальных языков то же самое - если нет фраз, то по умолчанию показываются фразы EN, если в EN нет фразы, то команда скрывается в публичной части.

{% endnote %}

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'imbot.command.update',
        Array(
            'COMMAND_ID' => 13,
            'FIELDS' => Array(
                'EVENT_COMMAND_ADD' => 'http://www.hazz/chatApi/bot.php',
                'HIDDEN' => 'N',
                'EXTRANET_SUPPORT' => 'N',
                'CLIENT_ID' => '',
                'LANG' => Array(
                    Array(
                        'LANGUAGE_ID' => 'en',
                        'TITLE' => 'Get echo message',
                        'PARAMS' => 'some text'
                    ),
                ),
            )
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

`true`

## Ответ в случае ошибки

ошибка

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **COMMAND_ID_ERROR** | Команда не найдена. ||
|| **APP_ID_ERROR** | Чат-бот не принадлежит этому приложению. Работать можно только с чат-ботами, установленными в рамках приложения. ||
|| **EVENT_COMMAND_ADD** | Ссылка обработчик события невалидная или не указана. ||
|| **WRONG_REQUEST** | Что-то пошло не так. ||
|#