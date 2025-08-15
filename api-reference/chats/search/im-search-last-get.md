# Получить историю поиска im.search.last.get

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

Метод `im.search.last.get` получает список элементов последнего поиска.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **SKIP_OPENLINES**
[`unknown`](../../data-types.md) | `N` | Пропускать чаты открытых линий | 18 ||
|| **SKIP_CHAT**
[`unknown`](../../data-types.md) | `N` | Пропускать чаты | 18 ||
|| **SKIP_DIALOG**
[`unknown`](../../data-types.md) | `N` | Пропускать диалоги один-на-один | 18 ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.search.last.get',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.search.last.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting last search: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.search.last.get',
        {},
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
        'im.user.business.list',
        Array(),
        $_REQUEST[
            "auth"
        ]
    );    
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{    
    "result": [
        {
            "id": 1,
            "type": "user",
            "title": "Евгений Шеленков",
            "avatar": {
                "url": "http://192.168.2.232/upload/resize_cache/main/1d3/100_100_2/shelenkov.png",
                "color": "#df532d"
            },
            "user": {
                "id": 1,
                "name": "Евгений Шеленков",
                "first_name": "Евгений",
                "last_name": "Шеленков",
                "work_position": "",
                "color": "#df532d",
                "avatar": "http://192.168.2.232/upload/resize_cache/main/1d3/100_100_2/shelenkov.png",
                "gender": "M",
                "birthday": "",
                "extranet": `false`,
                "network": `false`,
                "bot": `false`,
                "connector": `false`,
                "external_auth_id": "default",
                "status": "online",
                "idle": `false`,
                "last_activity_date": "2018-01-29T17:35:31+03:00",
                "desktop_last_date": `false`,
                "mobile_last_date": `false`,
                "departments": [
                 50
                ],
                "absent": `false`,
                "phones": {
                 "work_phone": "",
                 "personal_mobile": "",
                 "personal_phone": ""
                }
            }
        }
    ]
}            
```

### Описание ключей

- `id` – идентификатор диалога (цифра если пользователь, chatXXX если это чат)
- `name` – тип записи (`user` – если пользователь, `chat` – если это чат)
- `avatar` – объект описания аватара записи:
  - `url` – ссылка на аватар (если пусто, значит аватар не задан)
  - `color` – цвет диалога в формате hex
- `title` – заголовок записи
- `user` – объект описания данных пользователя (не доступно, если это тип записи – чат):
  - `id` – идентификатор пользователя
  - `name` – имя и фамилия пользователя
  - `first_name` – имя пользователя
  - `last_name` – фамилия пользователя
  - `work_position` – должность
  - `color` – цвет пользователя в формате hex
  - `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
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
  - `absent` – дата, по какое число у пользователя отпуск, в формате АТОМ (если не задано, `false`)
- `chat` – объект описания данных чата (не доступно, если это тип записи – пользователь):
  - `id` – идентификатор чата
  - `title` – название чата
  - `owner` – идентификатор пользователя владельца чата
  - `extranet` – признак участия в чате внешнего экстранет-пользователя (`true/false`)
  - `color` – цвет чата в формате hex
  - `avatar` – ссылка на аватар (если пусто, значит аватар не задан)
  - `type` – тип чата (групповой чат, чат для звонка, чат открытой линии и тд)
  - `entity_type` – внешний код для чата – тип
  - `entity_id` – внешний код для чата – идентификатор
  - `entity_data_1` – внешние данные для чата
  - `entity_data_2` – внешние данные для чата
  - `entity_data_3` – внешние данные для чата
  - `date_create` – дата создания чата в формате АТОМ
  - `message_type` – тип сообщений чата