# Получить папку хранения файлов указанного чата im.disk.folder.get

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

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.disk.folder.get` получает информацию о папке хранения файлов для чата.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID^*^**
[`unknown`](../../data-types.md) | `17` | Идентификатор чата | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```js
    BX24.callMethod(
        'im.disk.folder.get', {
            'CHAT_ID': 17,
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
        'im.disk.folder.get',
        Array(
            'CHAT_ID' => 17,
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
    "result": {
        "ID": 127
    }
}
```

## Ответ в случае ошибки

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

## Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **CHAT_ID_EMPTY** | Не передан идентификатор чата ||
|| **ACCESS_ERROR** | Текущий пользователь не имеет прав доступа к диалогу ||
|| **INTERNAL_ERROR** | Ошибка сервера, обратитесь в [техническую поддержку](../../../bitrix-support.md) ||
|#
