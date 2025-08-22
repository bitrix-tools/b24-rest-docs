# Получить набор дополнительных контентных блоков для записи таймлайна crm.timeline.layout.blocks.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.timeline.layout.blocks.get` получает набор дополнительных контентных блоков для записи таймлайна.

В рамках приложения можно получить только тот набор дополнительных контентных блоков, который был установлен через это приложение.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM, к которому привязана запись таймлайна ||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM, к которой привязана запись таймлайна ||
|| **timelineId***
[`integer`](../../../data-types.md) | Идентификатор записи таймлайна ||
|#

## Примеры кода

Получить набор дополнительных контентных блоков для записи таймлайна с `id = 8`, привязанного к сделке с `id = 4`:

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"entityId":4,"timelineId":8}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.layout.blocks.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"entityId":4,"timelineId":8,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.layout.blocks.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.timeline.layout.blocks.get',
    		{
    			entityTypeId: 2, // Сделка
    			entityId: 4,     // ID Сделки
    			timelineId: 8,   // ID Записи таймлайна привязанного к данной сделке
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'crm.timeline.layout.blocks.get',
                [
                    'entityTypeId' => 2, // Сделка
                    'entityId'     => 4, // ID Сделки
                    'timelineId'   => 8, // ID Записи таймлайна привязанного к данной сделке
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
        echo 'Error getting timeline layout blocks: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.timeline.layout.blocks.get',
        {
            entityTypeId: 2, // Сделка
            entityId: 4,     // ID Сделки
            timelineId: 8,   // ID Записи таймлайна привязанного к данной сделке
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');
    $result = CRest::call(
        'crm.timeline.layout.blocks.get',
        [
            'entityTypeId' => 2,
            'entityId' => 4,
            'timelineId' => 8,
        ]
    );
    echo '';
    print_r($result);
    echo '';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Возвращает `object` с ключом `layout`, содержащим в себе [RestAppLayoutDto](../activities/configurable/structure/rest-app-layout-dto.md).

```json
{
    "layout": {
        "blocks": {
            "block_1": {
                "type": "text",
                "properties": {
                    "value": "Здравствуйте!\nМы начинаем.",
                    "multiline": true,
                    "bold": true,
                    "color": "base_90"
                }
            },
            "block_2": {
                "type": "largeText",
                "properties": {
                    "value": "Здравствуйте!\nМы начинаем.\nМы продолжаем.\nМы все еще работаем над этим.\nМы продолжаем.\nМы близки к результату.\nДо свидания."
                }
            },
            "block_3": {
                "type": "link",
                "properties": {
                    "text": "Открыть сделку",
                    "bold": true,
                    "action": {
                        "type": "redirect",
                        "uri": "/crm/deal/details/123/"
                    }
                }
            },
            "block_4": {
                "type": "withTitle",
                "properties": {
                    "title": "Заголовок",
                    "block": {
                        "type": "text",
                        "properties": {
                            "value": "Какое-то значение"
                        }
                    }
                }
            }
        }
    }
}
```

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_WRONG_CONTEXT",
    "error_description": "Вызов метода возможен только в контексте rest приложения"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ERROR_WRONG_CONTEXT` | Вызов метода возможен только в контексте rest приложения ||
|| `OWNER_NOT_FOUND` | Элемент, к которому привязана запись таймлайна, не найден ||
|| `NOT_FOUND` | Запись таймлайна не найдена ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-timeline-layout-blocks-set.md)
- [{#T}](./crm-timeline-layout-blocks-delete.md)
- [{#T}](./content-blocks-test-app.md)