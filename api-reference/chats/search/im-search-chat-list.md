# Найти чаты по названиям im.search.chat.list

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

Метод `im.search.chat.list` выполняет поиск чатов.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **FIND^*^**
[`unknown`](../../data-types.md) | `Мятный` | Поисковая фраза | 19 ||
|| **OFFSET**
[`unknown`](../../data-types.md) | `0` | Смещение выборки пользователей | 19 ||
|| **LIMIT**
[`unknown`](../../data-types.md) | `10` | Лимит выборки пользователей | 19 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

- Поиск осуществляется по следующим полям: **Заголовок**, **Имя** и **Фамилия** участников чата.
- Метод поддерживает стандартную постраничную навигацию Bitrix24 Rest Api, но в добавок к ней есть возможность построить навигацию с помощью параметров `OFFSET` и `LIMIT`.

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```js
    BX24.callMethod(
        'im.search.chat.list',
        {
            FIND: 'Мятный'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log('users', result.data());
                console.log('total', result.total());
            }
        }
    );
    ```

- PHP

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.search.chat.list',
        Array(
            'FIND' => 'Мятный'
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
        21191: {
            "id": 21191,
            "title": "Мятный чат №3",
            "owner": 2,
            "extranet": false,
            "avatar": "",
            "color": "#4ba984",
            "type": "chat",
            "entity_type": "",
            "entity_data_1": "",
            "entity_data_2": "",
            "entity_data_3": "",
            "date_create": "2017-10-14T12:15:32+02:00",
            "message_type": "C"
        }
    },
    "total": 1
}    
```

### Описание ключей

- `id` – идентификатор чата
- `title` – название чата
- `owner` – идентификатор пользователя владельца чата
- `color` – цвет чата в формате hex
- `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
- `type` – тип чата (групповой чат, чат для звонка, чат открытой линии и т.д.)
- `entity_type` – внешний код для чата – тип
- `entity_id` – внешний код для чата – идентификатор
- `entity_data_1` – внешние данные для чата
- `entity_data_2` – внешние данные для чата
- `entity_data_3` – внешние данные для чата
- `date_create` – дата создания чата в формате АТОМ
- `message_type` – тип сообщений чата

## Ответ в случае ошибки

```json
{
    "error": "FIND_SHORT",
    "error_description": "Too short a search phrase."
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **FIND_SHORT** | Слишком короткая поисковая фраза, поиск осуществляется от трех символов. ||
|#