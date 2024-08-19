# Установить признак «не прочитано» у сообщений

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

{% note info "im.dialog.unread" %}

**Scope**: [`im`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `im.dialog.unread` меняет факт прочтения сообщений. Все сообщения после указанного (включая само сообщение) помечаются как непрочитанные.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **DIALOG_ID^*^**
[`unknown`](../../data-types.md) | `chat29`
или
`256` | Идентификатор диалога. Формат:
- **chatXXX** – чат получателя, если сообщение для чата
- **XXX** – идентификатор получателя, если сообщение для приватного диалога | 21 ||
|| **MESSAGE_ID^*^**
[`unknown`](../../data-types.md) | `12` | Идентификатор первого непрочитанного диалога | 21 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```js
    BX24.callMethod(
        'im.dialog.unread',
        {
            'DIALOG_ID': chat29,
            'MESSAGE_ID': 12,
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

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.dialog.unread',
        Array(
            'DIALOG_ID' => chat29,
            'MESSAGE_ID' => 12,
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

## Ответ в случае ошибки

```json
{
    "error": "MESSAGE_ID_ERROR",
    "error_description": "Message ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **MESSAGE_ID_ERROR** | Указан некорректный идентификатор сообщения ||
|| **DIALOG_ID_EMPTY** | Указан некорректный идентификатор диалога ||
|#