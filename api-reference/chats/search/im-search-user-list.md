# Найти пользователей

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

{% note info "im.search.user.list" %}

**Scope**: [`im`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `im.search.user.list` выполняет поиск пользователей.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **FIND^*^**
[`unknown`](../../data-types.md) | `Евгений` | Поисковая фраза | 19 ||
|| **BUSINESS**
[`unknown`](../../data-types.md) | `N` | Поиск среди бизнес пользователей | 19 ||
|| **AVATAR_HR**
[`unknown`](../../data-types.md) | `N` | Генерировать аватар в высоком разрешении | 19 ||
|| **OFFSET**
[`unknown`](../../data-types.md) | `0` | Смещение выборки пользователей | 19 ||
|| **LIMIT**
[`unknown`](../../data-types.md) | `10` | Лимит выборки пользователей | 19 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

- Поиск осуществляется по следующим полям: **Имя**, **Фамилия**, **Должность**, **Подразделение**.
- Метод поддерживает стандартную постраничную навигацию Bitrix24 Rest Api, но в добавок к ней есть возможность построить навигацию с помощью параметров `OFFSET` и `LIMIT`.

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```js
    BX24.callMethod(
        'im.search.user.list',
        {
            FIND: 'Евгений'
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
        'im.search.user.list',
        Array(
            'FIND' => 'Евгений'
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
        1: {
            "id": 1,
            "name": "Евгений Шеленков",
            "first_name": "Евгений",
            "last_name": "Шеленков",
            "work_position": "",
            "color": "#df532d",
            "avatar": "http://192.168.2.232/upload/resize_cache/main/1d3/100_100_2/shelenkov.png",
            "gender": "M",
            "birthday": "",
            "extranet": false,
            "network": false,
            "bot": false,
            "connector": false,
            "external_auth_id": "default",
            "status": "online",
            "idle": false,
            "last_activity_date": "2018-01-29T17:35:31+03:00",
            "desktop_last_date": false,
            "mobile_last_date": false,
            "departments": [
             50
            ],
            "absent": false
        }
    },
    "total": 1
}    
```

### Описание ключей

- `id` – идентификатор пользователя
- `name` – имя и фамилия пользователя
- `first_name` – имя пользователя
- `last_name` – фамилия пользователя
- `work_position` – должность
- `color` – цвет пользователя в формате hex
- `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
- `avatar_hr` – ссылка на аватар в высоком разрешении (доступен только при запросе с параметром `AVATAR_HR = 'Y'`)
- `gender` – пол пользователя
- `birthday` – день рождения пользователя в формате DD-MM, если пусто – не задан
- `extranet` – признак внешнего экстранет-пользователя (`true/false`)
- `network` – признак пользователя Битрикс24.Network (`true/false`)
- `bot` – признак бота (`true/false`)
- `connector` – признак пользователя открытых линий (`true/false`)
- `external_auth_id` – код внешней авторизации
- `status` – выбранный статус пользователя
- `idle` – дата, когда пользователь отошел от компьютера, в формате АТОМ (если не задано, `false`)
- `last_activity_date` – дата последнего действия пользователя в формате АТОМ
- `mobile_last_date` – дата последнего действия в мобильном приложении в формате АТОМ (если не задано, `false`)
- `desktop_last_date` – дата последнего действия в десктопном приложении в формате АТОМ (если не задано, `false`)
- `absent` – дата, по какое число у пользователя отпуск, в формате АТОМ (если не задано, `false`)

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