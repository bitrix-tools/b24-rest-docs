# Удалить комментарий crm.timeline.comment.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод удаляет дело типа «Комментарий».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Целочисленный идентификатор дела типа «Комментарий» (например, `1`). Получить идентификаторы можно методом [`crm.timeline.comment.list`](./crm-timeline-comment-list.md) ||
|| **ownerTypeId**
[`integer`](../../data-types.md#object_type) | [Целочисленный идентификатор типа сущности CRM](../../data-types.md#object_type), к которому привязан комментарий (например, `2` для сделки) ||
|| **ownerId**
[`integer`](../../../data-types.md) | Целочисленный идентификатор элемента CRM, к которому привязан комментарий (например, `1`). Получить список идентификаторов  можно с помощью метода [`crm.timeline.bindings.list`](../bindings/crm-timeline-bindings-list.md) (поле `ENTITY_ID`) ||
|#

{% note warning %}

При указании `ownerTypeId` и `ownerTypeId`, если комментарий имеет привязки к нескольким элементам, комментарий удалится у сущности, идентификаторы которой были переданы. Получить список всех связей для комментария можно с помощью метода [`crm.timeline.bindings.list`](../bindings/crm-timeline-bindings-list.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":10}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.timeline.comment.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":10,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.comment.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.timeline.comment.delete',
    		{
    			id: 999,
    			ownerTypeId: 2,
    			ownerId: 10,
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
                'crm.timeline.comment.delete',
                [
                    'id'          => 999,
                    'ownerTypeId' => 2,
                    'ownerId'     => 10,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting timeline comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.comment.delete",
        {
            id: 999,
            ownerTypeId: 2,
            ownerId: 10,
        },
        result => {
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
        'crm.timeline.comment.delete',
        [
            'id' => 999,
            'ownerTypeId' => 2,
            'ownerId' => 10
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
    "result": null,
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
`null` | В результате операции всегда возвращается `null` ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `NOT_FOUND` | Элемент не найден ||
|| `MULTIPLE_BINDINGS` | Элемент имеет привязки к нескольким элементам ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `100` | Не переданы обязательные поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-comment-add.md)
- [{#T}](./crm-timeline-comment-update.md)
- [{#T}](./crm-timeline-comment-get.md)
- [{#T}](./crm-timeline-comment-list.md)
- [{#T}](./crm-timeline-comment-fields.md)