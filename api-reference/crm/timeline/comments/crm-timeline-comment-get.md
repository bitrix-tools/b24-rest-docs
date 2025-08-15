# Получить информацию о комментарии crm.timeline.comment.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод получает информацию о деле типа типа «Комментарий».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Целочисленный идентификатор дела типа «Комментарий» (например, `1`). Получить идентификаторы можно методом [`crm.timeline.comment.list`](./crm-timeline-comment-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.timeline.comment.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.comment.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.timeline.comment.get',
    		{
    			id: 999,
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.comment.get',
                [
                    'id' => 999,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting timeline comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.comment.get",
        {
            id: 999,
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.comment.get',
        [
            'id' => 999
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "999",
        "ENTITY_ID": "2",
        "ENTITY_TYPE": "deal",
        "CREATED": "2020-03-02T12:00:00+03:00",
        "COMMENT": "New comment was added",
        "AUTHOR_ID": "1",
        "FILES": {
            "1": {
                "id": 1,
                "date": "2020-03-02T12:00:00+03:00",
                "type": "image",
                "name": "1.gif",
                "size": 43,
                "image": {
                    "width": 1,
                    "height": 1
                },
                "authorId": 1,
                "authorName": "John Dou",
                "urlPreview": "https://my.bitrix24.com/disk/showFile/930/?&ncc=1&width=640&height=640&signature=292f450929833cd881070155e05a2c41b5bb265ea8c8c1bc2108dbcbb56f667f&ts=1718366521&filename=1.gif",
                "urlShow": "https://my.bitrix24.com/disk/showFile/930/?&ncc=1&ts=1718366521&filename=1.gif",
                "urlDownload": "https://my.bitrix24.com/disk/downloadFile/930/?&ncc=1&filename=1.gif"
            },
            "2": {
                "id": 2,
                "date": "2020-03-02T12:00:00+03:00",
                "type": "image",
                "name": "2.gif",
                "size": 43,
                "image": {
                    "width": 1,
                    "height": 1
                },
                "authorId": 1,
                "authorName": "John Dou",
                "urlPreview": "https://my.bitrix24.com/disk/showFile/931/?&ncc=1&width=640&height=640&signature=118de010a40eff06fb9d691ee9235e2ef809a17780e46927bf8b12f8dc3224db&ts=1718366521&filename=2.gif",
                "urlShow": "https://my.bitrix24.com/disk/showFile/931/?&ncc=1&ts=1718366521&filename=2.gif",
                "urlDownload": "https://my.bitrix24.com/disk/downloadFile/931/?&ncc=1&filename=2.gif"
            }
        }
    },
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Значения для поля `result` соответствуют полям объекта [result](./crm-timeline-comment-fields.md#поле-result). ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Not found. | Элемент с указанными параметрами не найден ||
|| Пустая строка | Access denied. | Отсутствуют права на редактирование сущности в CRM ||
|| Пустая строка | ID is not defined or invalid. | Не переданы обязательные поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-comment-add.md)
- [{#T}](./crm-timeline-comment-update.md)
- [{#T}](./crm-timeline-comment-list.md)
- [{#T}](./crm-timeline-comment-delete.md)
- [{#T}](./crm-timeline-comment-fields.md)