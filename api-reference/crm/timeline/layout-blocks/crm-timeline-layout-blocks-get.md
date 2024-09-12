# Получить набор дополнительных контентных блоков для записи таймлайна crm.timeline.layout.blocks.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: REST Приложение

Метод позволяет REST приложению получать установленный им же набор дополнительных контентных блоков для записи таймлайна.

REST приложение может получить только тот набор дополнительных контентных блоков, который был установлен им же.

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

- PHP

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

Возвращает `object` с ключом `layout`, содержащим в себе [RestAppLayoutDto](../activities/structure/rest-app-layout-dto.md).

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
|| `OWNER_NOT_FOUND` | Сущность, к которой привязана запись таймлайна, не найдена ||
|| `NOT_FOUND` | Запись таймлайна не найдена ||
|| `ACCESS_DENIED` | Доступ запрещен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-timeline-layout-blocks-set.md)
- [{#T}](./crm-timeline-layout-blocks-delete.md)
- [{#T}](./content-blocks-test-app.md)