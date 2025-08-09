# Получить сокращенный список последних чатов im.recent.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.recent.get` получает список последних диалогов пользователя.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **SKIP_OPENLINES**
[`unknown`](../data-types.md) | `N` | Пропускать чаты открытых линий | 18 ||
|| **SKIP_CHAT**
[`unknown`](../data-types.md) | `N` | Пропускать чаты | 18 ||
|| **SKIP_DIALOG**
[`unknown`](../data-types.md) | `N` | Пропускать диалоги один-на-один | 18 ||
|| **LAST_UPDATE**
[`unknown`](../data-types.md) | `2019-07-11T10:45:31+02:00` | Ограничение выборки для минимизации переданных данных, дата в формате ATOM | 23 ||
|| **ONLY_OPENLINES**
[`unknown`](../data-types.md) | `N` | Выборка только чатов открытых линий | 29 ||
|| **LAST_SYNC_DATE**
[`unknown`](../data-types.md) | `2019-07-11T10:45:31+02:00` | Дата предыдущей выборки для загрузки изменений, произошедших в списке с этого времени. Выборка возвращает данные не старше 7 дней. Дата в формате ATOM | 29 ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.recent.get',
    		{
    			'SKIP_OPENLINES': 'Y'
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
                'im.recent.get',
                [
                    'SKIP_OPENLINES' => 'Y'
                ]
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
        echo 'Error getting recent messages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.recent.get',
        {
            'SKIP_OPENLINES': 'Y'
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

    {% include [Пояснение о restCommand](./_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.user.status.idle.start',
        Array(
            'SKIP_OPENLINES' => 'Y'
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": [
        {
            "id": "1",
             "type": "user",
             "avatar": {
                "url": "http://www.hazz/upload/resize_cache/main/1af/100_100_2/1464255149.png",
                "color": "#df532d"
             },
            "title": "Евгений Шеленков",
            "message": {
                "id": "30468",
                "text": "1",
                "file": false,
                "attach": false,
                "author_id": "1"
            },
            "counter": "3",
            "date": "2017-10-17T11:12:56+02:00",
            "user": {
                "id": "1",
                "name": "Евгений Шеленков",
                "first_name": "Евгений",
                "last_name": "Шеленков",
                "work_position": "ИТ-специалист",
                "color": "#df532d",
                "avatar": "http://www.hazz/upload/resize_cache/main/1af/100_100_2/1464255149.png",
                "gender": "M",
                "birthday": false,
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "default",
                "status": "online",
                "idle": false,
                "last_activity_date": "2017-10-17T11:16:01+02:00",
                "mobile_last_date": "2017-05-26T12:04:58+02:00",
                "absent": "2017-11-01T00:00:00+02:00"
            }
        },
        {
            "id": "chat21191",
            "type": "chat",
            "avatar": {
                "url": "",
                "color": "#4ba984"
            },
            "title": "Мятный чат №3",
            "message": {
                "id": "30467",
                "text": "Разрешение на обновление Битрикс24 получено от [Вложение]",
                "file": false,
                "attach": true,
                "author_id": "2"
            },
            "counter": "0",
            "date": "2017-10-17T10:38:20+02:00",
            "chat": {
                "id": "21191",
                "title": "Мятный чат №3",
                "owner": "2",
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
        }
    ]
}
```


### Описание ключей

- `id` – идентификатор диалога (цифра, если пользователь; chatXXX, если это чат)
- `type` – тип записи (`user` – если пользователь, `chat` – если это чат)
- `avatar` – объект описания аватара записи:
  - `url` – ссылка на аватар (если пусто, значит аватар не задан)
  - `color` – цвет диалога в формате hex
- `title` – заголовок записи (Имя, фамилия – для пользователя, название чата – для чата)
- `message` – объект описания сообщения:
  - `id` – идентификатор сообщения
  - `text` – текст сообщения (без бб-кодов и переносов строк)
  - `file` – присутствуют файлы (`true/false`)
  - `attach` – присутствуют вложения (`true/false`)
  - `author_id` – автор сообщения
  - `date` – дата сообщения в формате ATOM
- `counter` – счетчик не прочитанных сообщений
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
  - `type` – тип чата (групповой чат, чат для звонка, чат открытой линии и т.д.)
  - `entity_type` – внешний код для чата – тип
  - `entity_id` – внешний код для чата – идентификатор
  - `entity_data_1` – внешние данные для чата
  - `entity_data_2` – внешние данные для чата
  - `entity_data_3` – внешние данные для чата
  - `date_create` – дата создания чата в формате АТОМ
  - `message_type` – тип сообщений чата