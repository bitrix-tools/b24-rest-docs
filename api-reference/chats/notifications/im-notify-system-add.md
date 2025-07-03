# Отправить системное уведомление im.notify.system.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.system.add` отправляет системное уведомление.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **USER_ID^*^**
[`unknown`](../../data-types.md) | `1` | Идентификатор пользователя, кому будет адресовано уведомление | 18 ||
|| **MESSAGE^*^**
[`unknown`](../../data-types.md) | Системное уведомление | Текст уведомления | 18 ||
|| **MESSAGE_OUT**
[`unknown`](../../data-types.md) | Текст системного уведомления для почты | Текст уведомления для почты. Если не задано, то используется поле MESSAGE | 18 ||
|| **TAG**
[`unknown`](../../data-types.md) | `TEST` | Тег уведомления, уникальный в рамках системы. При добавлении уведомления с существующим тегом другие уведомления будут удалены | 18 ||
|| **SUB_TAG**
[`unknown`](../../data-types.md) | `SUB`\|`TEST` | Дополнительный тег, без проверки на уникальность | 18 ||
|| **ATTACH**
[`unknown`](../../data-types.md) | | Вложение | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'im.notify.system.add',
        Array(
            'USER_ID' => 1,
            'MESSAGE' => 'Системное уведомление',
            'MESSAGE_OUT' => 'Текст системного уведомления для почты',
            'TAG' => 'TEST',
            'SUB_TAG' => 'SUB|TEST',
            'ATTACH' => 'Array()'
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- PHP (B24PhpSdk)

    ```php
    try {
        $result = $serviceBuilder->getIMScope()
            ->notify()
            ->fromSystem(
                123, // $userId
                'This is a test message.', // $message
                null, // $forEmailChannelMessage
                null, // $notificationTag
                null, // $subTag
                null // $attachment
            );

        print($result->getId());
    } catch (Throwable $e) {
        // Handle exception
        print('Error: ' . $e->getMessage());
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": 123
}
```

**Результат выполнения**: идентификатор уведомления `ID` или ошибка.

## Ответ в случае ошибки

```json
{
    "error": "USER_ID_EMPTY",
    "error_description": "Идентификатор получателя не задан"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **USER_ID_EMPTY** | Идентификатор получателя не задан ||
|| **MESSAGE_EMPTY** | Не передан текст сообщения ||
|| **ATTACH_ERROR** | Весь переданный объект вложения не прошел валидацию ||
|| **ATTACH_OVERSIZE** | Превышен максимально допустимый размер вложения (30 Кб) ||
|#

## Ссылки по теме

- [{#T}](../messages/attachments/index.md)
