# Получить данные о пользователе im.user.get

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

Метод `im.user.get` получает данные о пользователе.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ID**
[`unknown`](../../data-types.md) | `5` | Идентификатор пользователя | 18 ||
|| **AVATAR_HR**
[`unknown`](../../data-types.md) | `N` | Генерировать аватар в высоком разрешении | 18 ||
|#

Если не передан ключ `ID`, будут выбраны данные для текущего пользователя.

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.user.get',
    		{
    			ID: 5
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.user.get',
                [
                    'ID' => 5
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting user information: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'im.user.get',
        {
            ID: 5
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

- PHP CRest

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.user.get',
        Array(
            'ID' => 5,
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Пример ответа

```json
{
    "result": {
        "id": 5,
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
        "absent": false,
        "phones": {
         "work_phone": "",
         "personal_mobile": "",
         "personal_phone": ""
        }
    }
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
- `departments` – идентификаторы подразделения
- `desktop_last_date` – дата последнего действия в десктопном приложении в формате АТОМ (если не задано, `false`)
- `absent` – дата, по какое число у пользователя отпуск, в формате АТОМ (если не задано, `false`)
- `phones` – массив номеров телефонов: `work_phone` – рабочий телефон, `personal_mobile` – мобильный телефон, `personal_phone` – домашний телефон

## Ответ в случае ошибки

```json
{
    "error": "ID_EMPTY",
    "error_description": "User ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ID_EMPTY** | Не передан идентификатор пользователя ||
|| **USER_NOT_EXISTS** | Пользователь с указанным идентификатором не найден ||
|| **ACCESS_DENIED** | Текущий пользователь не имеет прав доступа к данным ||
|#