# Получить информацию о заметке crm.timeline.note.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод возвращает информацию о заметке к записи таймлайна.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerTypeId***
[`integer`](../../../data-types.md) | [Идентификатор типа элемента](../../data-types.md), к которому относится запись ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор элемента, к которому относится запись ||
|| **itemType***
[`integer`](../../../data-types.md) | Тип записи, к которой нужно применить заметку: 

- `1` — запись истории
- `2` — дело ||
|| **itemId***
[`integer`](../../../data-types.md) | Идентификатор записи, к которой нужно применить заметку. Если `itemType=1`, то это идентификатор записи истории таймлайна. Если `itemType=2`, то это идентификатор дела ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerTypeId":1,"ownerId":1,"itemType":1,"itemId":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.note.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerTypeId":1,"ownerId":1,"itemType":1,"itemId":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.note.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.timeline.note.get",
    		{
    			ownerTypeId: 1,
    			ownerId: 1,
    			itemType: 1,
    			itemId: 2,
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.timeline.note.get',
                [
                    'ownerTypeId' => 1,
                    'ownerId'     => 1,
                    'itemType'    => 1,
                    'itemId'      => 2,
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
        echo 'Error getting timeline note: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.note.get",
        {
            ownerTypeId: 1,
            ownerId: 1,
            itemType: 1,
            itemId: 2,
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
        'crm.timeline.note.get',
        [
            'ownerTypeId' => 1,
            'ownerId' => 1,
            'itemType' => 1,
            'itemId' => 2
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
        "text": "Test note",
        "createdById": 1,
        "createdTime": "2024-03-17T15:55:10+03:00",
        "updatedById": 1,
        "updatedTime": "2024-03-17T15:55:10+03:00"
    },
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Информация о найденной заметке:

- **text** — текст заметки
- **createdById** — идентификатор пользователя, создавшего заметку
- **createdTime** — дата и время создания заметки
- **updatedById** — идентификатор пользователя, изменившего заметку
- **updatedTime** — дата и время изменения заметки ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `NOT_FOUND` | Элемент не найден ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-note-delete.md)
- [{#T}](./crm-timeline-note-save.md)