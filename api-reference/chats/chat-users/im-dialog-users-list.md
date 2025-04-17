# Получить список участников im.dialog.users.list

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

Метод `im.dialog.users.list` получает информацию об участниках чата. Поддерживается пагинация.

## Параметры

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **DIALOG_ID^*^**
[`unknown`](../../data-types.md) | `chat74` | Идентификатор диалога. Формат:
- **chatXXX** – чат получателя, если сообщение для чата
- **XXX** – идентификатор получателя, если сообщение для приватного диалога | 30 ||
|| **SKIP_EXTERNAL**
[`unknown`](../../data-types.md) | `N` | Пропустить всех системных пользователей - `'Y'`\|`'N'` (по умолчанию `'N'`) | 30 ||
|| **SKIP_EXTERNAL_EXCEPT_TYPES**
[`unknown`](../../data-types.md) | `'bot, email'` | Строка с теми типами системных пользователей, которых нужно оставить в выборке | 30 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    B24.callMethod(
        'im.dialog.users.list',
        {
            DIALOG_ID: 'chat74',
            SKIP_EXTERNAL: 'Y'
        },
        res => {
            if (res.error())
            {
            console.error(result.error().ex);
            }
            else
            {
            console.log(res.data())
            }
        }
    )
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
[
    {
        "id": 1019,
        "active": true,
        "name": "alexa shasha",
        "first_name": "alexa",
        "last_name": "shasha",
        "work_position": "",
        "color": "#df532d",
        "avatar": "",
        "gender": "M",
        "birthday": "",
        "extranet": false,
        "network": false,
        "bot": false,
        "connector": false,
        "external_auth_id": "default",
        "status": "online",
        "idle": false,
        "last_activity_date": "2021-10-30T11:24:12+02:00",
        "mobile_last_date": "2021-10-20T13:02:33+02:00",
        "absent": false,
        "departments": [
        1
        ],
        "phones": false
    },
    {
        "id": 1,
        "active": true,
        "name": "Алексей Шахворостов",
        "first_name": "Алексей",
        "last_name": "Шахворостов",
        "work_position": "",
        "color": "#df532d",
        "avatar": "",
        "gender": "M",
        "birthday": "",
        "extranet": false,
        "network": false,
        "bot": false,
        "connector": false,
        "external_auth_id": "default",
        "status": "online",
        "idle": false,
        "last_activity_date": "2021-10-30T13:36:34+02:00",
        "mobile_last_date": "2021-10-27T16:39:26+02:00",
        "absent": false,
        "departments": [
        1
        ],
        "phones": false
    }
]
```

### Описание ключей

- `id` – идентификатор пользователя
- `active` – является ли пользователь активным (неуволенным)
- `name` – имя и фамилия пользователя
- `first_name` – имя пользователя
- `last_name` – фамилия пользователя
- `work_position` – должность
- `color` – цвет пользователя в формате **hex**
- `avatar` – ссылка на аватар (если пусто, значит, аватар не задан)
- `gender` – пол пользователя
- `birthday` – день рождения пользователя в формате **DD-MM** (если пусто, значит, не задан)
- `extranet` – признак внешнего экстранет-пользователя (`true/false`)
- `network` – признак пользователя **Битрикс24.Network** (`true/false`)
- `bot` – признак бота (`true/false`)
- `connector` – признак пользователя открытых линий (`true/false`)
- `external_auth_id` – код внешней авторизации
- `status` – выбранный статус пользователя
- `idle` – дата, когда пользователь отошел от компьютера, в формате **АТОМ** (если не задана, то `false`)
- `last_activity_date` – дата последнего действия пользователя в формате **АТОМ**
- `mobile_last_date` – дата последнего действия в мобильном приложении в формате **АТОМ** (если не задана, то `false`)
- `departments` – идентификаторы подразделения
- `absent` – дата, по какое число у пользователя отпуск, в формате **АТОМ** (если не задана, то `false`)
- `phones` – массив номеров телефонов:
  - `work_phone` – рабочий телефон
  - `personal_mobile` – мобильный телефон
  - `personal_phone` – домашний телефон

## Ответ в случае ошибки

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **DIALOG_ID_EMPTY** | Параметр `DIALOG_ID` не задан или не соответствует формату ||
|| **ACCESS_ERROR** | Текущий пользователь не имеет прав доступа к данным ||
|#

