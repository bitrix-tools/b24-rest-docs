# Получить список последних сообщений im.dialog.messages.get

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
> Кто может выполнять метод: участник чата

Метод `im.dialog.messages.get` получает список последних сообщений в чате. 

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **DIALOG_ID^*^**
[`unknown`](../../data-types.md) | `chat29`
или
`256` | Идентификатор диалога. Формат:
- **chatXXX** – чат получателя, если сообщение для чата
- **XXX** – идентификатор получателя, если сообщение для приватного диалога | 19 ||
|| **LAST_ID**
[`unknown`](../../data-types.md) | `28561624` | Идентификатор последнего загруженного сообщения | 19 ||
|| **FIRST_ID**
[`unknown`](../../data-types.md) | `454322` | Идентификатор первого загруженного сообщения | 19 ||
|| **LIMIT**
[`unknown`](../../data-types.md) | `20` | Ограничение на выборку сообщений в диалоге | 19 ||
|#

{% note info "" %}

Получить сообщения не будучи участником чата можно только для чатов открытой линии. Для этого используйте метод [imopenlines.session.history.get](../../imopenlines/openlines/sessions/imopenlines-session-history-get.md). 

{% endnote %}

- Если не переданы ключи `LAST_ID` и `FIRST_ID`, будут загружены последние 20 сообщений чата.
- Для загрузки предыдущих 20 сообщений, необходимо передать `LAST_ID` с идентификатором минимального ID сообщения, полученного из последней выборки.
- Если вам необходимо загрузить следующие 20 сообщений, необходимо передать `FIRST_ID` с идентификатором максимального ID сообщения, полученного из последней выборки.
- Если вам необходимо загрузить первые 20 сообщений, необходимо передать `FIRST_ID` с идентификатором 0, вам будет возвращен результат с самым первым доступным вам сообщением в этом чате.

{% note warning %}

Из-за потенциально большого объема данных, этот метод не поддерживает стандартную постраничную навигацию Bitrix24 Rest Api.

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.dialog.messages.get',
    		{
    			DIALOG_ID: 'chat29'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
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
                'im.dialog.messages.get',
                [
                    'DIALOG_ID' => 'chat29'
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
        echo 'Error getting dialog messages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.dialog.messages.get',
        {
            DIALOG_ID: 'chat29'
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
        'im.dialog.messages.get',
        Array(
            'DIALOG_ID': 'chat29'
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

## Ответ в случае успеха

```json
{
    "result": {
        "messages": [
         {
            "id": 28561624,
            "chat_id": 29,
            "author_id": 1,
            "date": "2018-01-29T16:58:47+03:00",
            "text": "https://my-domain.com",
            "params": {
             "URL_ID": [
                5
             ],
             "URL_ONLY": "Y",
             "ATTACH": [
                {
                 "ID": "5",
                 "BLOCKS": [
                    {
                     "RICH_LINK": [
                        {
                         "NAME": "Мой сайт",
                         "LINK": "https://my-domain.com",
                         "DESC": "Мой персональный сайт",
                         "PREVIEW": "https://my-domain.com/logo/i/share-logo.png"
                        }
                     ]
                    }
                 ],
                 "COLOR": "transparent"
                }
             ]
            }
         },
         {
            "id": 28561623,
            "chat_id": 29,
            "author_id": 28,
            "date": "2018-01-29T16:43:38+03:00",
            "text": "",
            "params": {
             "FILE_ID": [
                540
             ]
            }
         },
         {
            "id": 28561622,
            "chat_id": 29,
            "author_id": 1,
            "date": "2018-01-29T16:43:12+03:00",
            "text": "Работает да :) :)",
            "params": {
             "IS_EDITED": "Y"
            }
         },
         {
            "id": 28561618,
            "chat_id": 29,
            "author_id": 0,
            "date": "2018-01-25T15:15:22+03:00",
            "text": "Евгений Шеленков изменил тему чата на \"Большой чат\"",
            "params": null
         }
        ],
        "users": [
         {
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
         },
         {
            "id": 28,
            "name": "Иван Елпидин",
            "first_name": "Иван",
            "last_name": "Елпидин",
            "work_position": "менеджер",
            "color": "#728f7a",
            "avatar": "http://192.168.2.232/upload/resize_cache/main/8b8/100_100_2/26.jpg",
            "gender": "M",
            "birthday": "26-01",
            "extranet": false,
            "network": false,
            "bot": false,
            "connector": false,
            "external_auth_id": "default",
            "status": "online",
            "idle": false,
            "last_activity_date": false,
            "mobile_last_date": false,
            "departments": [
             58
            ],
            "absent": false,
            "phones": {
             "work_phone": "8 (495) 222-33-55",
             "personal_mobile": "8 (495) 123-55-65",
             "personal_phone": ""
            }
         }
        ],
        "files": [
            {
                "id": 540,
                "chatId": 29,
                "date": "2018-01-29T16:43:39+03:00",
                "type": "image",
                "preview": "",
                "name": "1176297_698081120237288_696773366_n.jpeg",
                "size": 55013,
                "image": {
                    "width": 960,
                    "height": 640
                },
                "status": "done",
                "progress": 100,
                "authorId": 1,
                "authorName": "Евгений Шеленков",
                "urlPreview": "http://192.168.2.232/bitrix/components/bitrix/im.messenger/show.file.php?fileId=540&preview=Y&fileName=1176297_698081120237288_696773366_n.jpeg",
                "urlShow": "http://192.168.2.232/bitrix/components/bitrix/im.messenger/show.file.php?fileId=540&fileName=1176297_698081120237288_696773366_n.jpeg",
                "urlDownload": "http://192.168.2.232/bitrix/components/bitrix/im.messenger/download.file.php?fileId=540"
            }
        ],
        "chat_id": 29
    }
}
```

### Описание ключей

- `messages` – массив сообщений:

    - `id` – идентификатор сообщения
    - `chat_id` – идентификатор чата
    - `author_id` – автор сообщения (0 - если сообщение системное)
    - `date` – дата сообщения в формате ATOM
    - `text` – текст сообщения
    - `params` – параметры сообщения, обьект параметров, если параметры не переданы `null` (ниже будут описаны основные типы)

- `users` – обьекты описания данных пользователя:

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

- `files` – обьект, описывающий файлы в выбранных сообщениях:

    - `id` – идентификатор файла
    - `chatId` – идентификатор чата
    - `date` – дата модификации файла
    - `type` – тип файла: `image` – изображение, `file` – файл
    - `name` – имя загруженного файла
    - `size` – фактический размер изображения в байтах
    - `image` – фактический размер изображения в px
    - `width` – ширина в px
    - `height` – высота в px
    - `status` – текущий статус: `done` – загружен, `upload` – идет загрузка
    - `progress` – статус загрузки в процентах: `100` – загружен, `-1` – текущий статус не доступен
    - `authorId` – идентификатор пользователя, загрузившего обьект
    - `authorName` – имя и фамилия пользователя, загрузившего объект
    - `urlPreview` – ссылка на предпросмотр изображения (доступна для картинок)
    - `urlShow` – ссылка для перехода к объекту в режиме "просмотра"
    - `urlDownload` – ссылка для начала загрузки

- `chat_id` – идентификатор чата

### Описание дополнительных параметров

- `ATTACH` – объект, содержащий богатое оформление
- `KEYBOARD` – объект, содержащий описание клавиатуры
- `IS_DELETED` – флаг, обозначающий, что сообщение удалено
- `IS_EDITED` – флаг, обозначающий, что сообщение отредактировано
- `FILE_ID` – массив идентификаторов файлов
- `LIKE` – массив идентификаторов пользователей, которые проголосовали за сообщение



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
|| **DIALOG_ID_EMPTY** | Не передан идентификатор диалога ||
|| **ACCESS_ERROR** | Текущий пользователь не имеет прав доступа к диалогу ||
|#