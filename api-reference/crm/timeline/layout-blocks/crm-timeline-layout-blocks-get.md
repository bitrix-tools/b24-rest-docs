# Получить набор дополнительных контентных блоков для записи таймлайна crm.timeline.layout.blocks.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
[`integer`](../../../data-types.md) | Идентификатор объекта CRM, к которому привязана запись таймлайна ||
|| **timelineId***
[`integer`](../../../data-types.md) | Идентификатор записи таймлайна ||
|#

## Примеры кода

Получить набор дополнительных контентных блоков для записи таймлайна с `id = 8`, привязанной к сделке с `id = 4`:

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type LayoutBlocksGetResult = {
      layout: {
        blocks: Record<string, {
          type: string
          properties: Record<string, unknown>
        }>
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<LayoutBlocksGetResult>({
        method: 'crm.timeline.layout.blocks.get',
        params: {
          entityTypeId: 2, // Deal
          entityId: 4,     // Deal ID
          timelineId: 8,   // Timeline entry ID linked to this deal
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.layout.blocks)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getLayoutBlocks() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.timeline.layout.blocks.get',
            params: {
              entityTypeId: 2, // Deal
              entityId: 4,     // Deal ID
              timelineId: 8,   // Timeline entry ID linked to this deal
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.layout.blocks)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLayoutBlocks)
    </script>
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
                    'entityId'     => 4, // ID сделки
                    'timelineId'   => 8, // ID записи таймлайна, привязанной к данной сделке
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
            entityId: 4,     // ID сделки
            timelineId: 8,   // ID записи таймлайна, привязанной к данной сделке
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

```json
{
    "result": {
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
    },
    "time": {
        "start": 1753341040.475739,
        "finish": 1753341040.582705,
        "duration": 0.10696601867675781,
        "processing": 0.04708504676818848,
        "date_start": "2025-07-24T17:57:20+00:00",
        "date_finish": "2025-07-24T17:57:20+00:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result

#|
|| **Название**
`тип` | **Описание** ||
|| **layout**
[`RestAppLayoutDto`](../activities/configurable/structure/rest-app-layout-dto.md) | Набор дополнительных контентных блоков, установленный приложением для записи таймлайна ||
|#

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