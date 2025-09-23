# Получить список методов и их описание task.commentitem.getmanifest

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.commentitem.getmanifest` получает актуальную информацию о методах работы с комментариями задач `task.commentitem.*`.

Рекомендуем использовать его только в качестве справочника, так как структуру ответа метода разработчик может изменить в любой момент.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.getmanifest
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.getmanifest
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'task.commentitem.getmanifest',
    		[]
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    	console.log(result);
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
                'task.commentitem.getmanifest',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result->data(), true);
        echo 'Full Result: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting task comment item manifest: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.getmanifest',
        [],
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.commentitem.getmanifest',
        []
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
        "Manifest version": "1.1",
        "Warning": "don't rely on format of this manifest, it can be changed without any notification",
        "REST: shortname alias to class": "commentitem",
        "REST: writable commentitem data fields": [
            "POST_MESSAGE",
            "AUTHOR_ID",
            "POST_DATE",
            "UF_FORUM_MESSAGE_DOC"
        ],
        "REST: readable commentitem data fields": [
            "POST_MESSAGE_HTML",
            "ID",
            "AUTHOR_ID",
            "AUTHOR_NAME",
            "AUTHOR_EMAIL",
            "POST_DATE",
            "POST_DATE",
            "POST_MESSAGE",
            "AUTHOR_ID",
            "POST_DATE",
            "UF_FORUM_MESSAGE_DOC",
            "ATTACHED_OBJECTS"
        ],
        "REST: sortable commentitem data fields": [
            "ID",
            "AUTHOR_ID",
            "AUTHOR_NAME",
            "AUTHOR_EMAIL",
            "POST_DATE"
        ],
        "REST: filterable commentitem data fields": [
            "ID",
            "AUTHOR_ID",
            "AUTHOR_NAME",
            "POST_DATE"
        ],
        "REST: date fields": [
            "POST_DATE"
        ],
        "REST: available methods": {
            "getmanifest": {
                "staticMethod": true,
                "params": []
            },
            "getlist": {
                "staticMethod": true,
                "mandatoryParamsCount": 1,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "arOrder",
                        "type": "array",
                        "allowedKeys": [
                            "ID",
                            "AUTHOR_ID",
                            "AUTHOR_NAME",
                            "AUTHOR_EMAIL",
                            "POST_DATE"
                        ]
                    },
                    {
                        "description": "arFilter",
                        "type": "array",
                        "allowedKeys": [
                            "ID",
                            "AUTHOR_ID",
                            "AUTHOR_NAME",
                            "POST_DATE"
                        ],
                        "allowedKeyPrefixes": [
                            "!",
                            "<=",
                            "<",
                            ">=",
                            ">"
                        ]
                    }
                ],
                "allowedKeysInReturnValue": [
                    "POST_MESSAGE_HTML",
                    "ID",
                    "AUTHOR_ID",
                    "AUTHOR_NAME",
                    "AUTHOR_EMAIL",
                    "POST_DATE",
                    "POST_DATE",
                    "POST_MESSAGE",
                    "AUTHOR_ID",
                    "POST_DATE",
                    "UF_FORUM_MESSAGE_DOC",
                    "ATTACHED_OBJECTS"
                ],
                "collectionInReturnValue": true
            },
            "get": {
                "mandatoryParamsCount": 2,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    }
                ],
                "allowedKeysInReturnValue": [
                    "POST_MESSAGE_HTML",
                    "ID",
                    "AUTHOR_ID",
                    "AUTHOR_NAME",
                    "AUTHOR_EMAIL",
                    "POST_DATE",
                    "POST_DATE",
                    "POST_MESSAGE",
                    "AUTHOR_ID",
                    "POST_DATE",
                    "UF_FORUM_MESSAGE_DOC",
                    "ATTACHED_OBJECTS"
                ]
            },
            "add": {
                "staticMethod": true,
                "mandatoryParamsCount": 2,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "arFields",
                        "type": "array",
                        "allowedKeys": [
                            "POST_MESSAGE",
                            "AUTHOR_ID",
                            "POST_DATE",
                            "UF_FORUM_MESSAGE_DOC"
                        ]
                    }
                ]
            },
            "update": {
                "staticMethod": false,
                "mandatoryParamsCount": 3,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    },
                    {
                        "description": "arFields",
                        "type": "array",
                        "allowedKeys": [
                            "POST_MESSAGE",
                            "AUTHOR_ID",
                            "POST_DATE",
                            "UF_FORUM_MESSAGE_DOC"
                        ]
                    }
                ]
            },
            "delete": {
                "staticMethod": false,
                "mandatoryParamsCount": 2,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    }
                ]
            },
            "isactionallowed": {
                "staticMethod": false,
                "mandatoryParamsCount": 3,
                "params": [
                    {
                        "description": "taskId",
                        "type": "integer"
                    },
                    {
                        "description": "itemId",
                        "type": "integer"
                    },
                    {
                        "description": "actionId",
                        "type": "integer"
                    }
                ]
            }
        }
    },
    "time": {
        "start": 1753261350.76179,
        "finish": 1753261350.816284,
        "duration": 0.05449390411376953,
        "processing": 0.002237081527709961,
        "date_start": "2025-07-23T12:02:30+03:00",
        "date_finish": "2025-07-23T12:02:30+03:00",
        "operating_reset_at": 1753261950,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Описание методов `task.commentitem.*` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-get-list.md)
- [{#T}](./task-comment-item-delete.md)
- [{#T}](./task-comment-item-is-action-allowed.md)