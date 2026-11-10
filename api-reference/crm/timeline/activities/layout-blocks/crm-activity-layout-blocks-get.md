# Получить набор дополнительных контентных блоков дела crm.activity.layout.blocks.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом на чтение элемента CRM, к которому привязано дело

Метод `crm.activity.layout.blocks.get` получает набор дополнительных контентных блоков дела.

Метод работает только в контексте [приложения](../../../../../settings/app-installation/index.md): при вызове через вебхук он вернет ошибку `ERROR_WRONG_CONTEXT`. Приложение видит только тот набор блоков, который установило само методом [crm.activity.layout.blocks.set](./crm-activity-layout-blocks-set.md).

Метод работает только с делами. Чтобы получить набор блоков комментария или другой записи таймлайна, используйте [crm.timeline.layout.blocks.get](../../layout-blocks/crm-timeline-layout-blocks-get.md).

Если дело привязано сразу к нескольким элементам CRM, набор блоков остается один. Передайте в `entityTypeId` и `entityId` тип и идентификатор любого из связанных элементов.

Порядок вызова методов и общие правила работы с наборами блоков описаны в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому привязано дело, например `2` для сделки ||
|| **entityId***
[`integer`](../../../../data-types.md) | Идентификатор объекта CRM, к которому привязано дело, например идентификатор сделки ||
|| **activityId***
[`integer`](../../../../data-types.md) | Идентификатор дела. Возвращают методы [crm.activity.add](../activity-base/crm-activity-add.md) и [crm.activity.list](../activity-base/crm-activity-list.md) ||
|#

## Примеры кода

Получить набор дополнительных контентных блоков дела с `id = 8`, привязанного к сделке с `id = 4`.

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"entityId":4,"activityId":8,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.layout.blocks.get
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
      // layout is null when the app has not set any blocks for this activity
      layout: null | {
        blocks: Record<string, {
          type: string
          properties: Record<string, unknown>
        }>
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<LayoutBlocksGetResult>({
        method: 'crm.activity.layout.blocks.get',
        params: {
          entityTypeId: 2,
          entityId: 4,
          activityId: 8,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Layout blocks:', result.layout?.blocks)
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
            method: 'crm.activity.layout.blocks.get',
            params: {
              entityTypeId: 2,
              entityId: 4,
              activityId: 8,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          // layout is null when the app has not set any blocks for this activity
          console.info('Layout blocks:', result.layout?.blocks)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLayoutBlocks)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.layout.blocks.get(
            entity_type_id=2,
            entity_id=4,
            activity_id=8,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.layout.blocks.get',
                [
                    'entityTypeId' => 2,
                    'entityId'     => 4,
                    'activityId'   => 8,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Info: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting activity layout blocks: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.activity.layout.blocks.get',
        {
            entityTypeId: 2, // Сделка
            entityId: 4,     // ID Сделки
            activityId: 8,   // ID Дела привязанного к данной сделке
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
        'crm.activity.layout.blocks.get',
        [
            'entityTypeId' => 2,
            'entityId' => 4,
            'activityId' => 8
        ]
    );
    echo '';
    print_r($result);
    echo '';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.layout.blocks.get", b24.Params{
    	"entityTypeId": 2,
    	"entityId":     4,
    	"activityId":   8,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.layout.blocks.get: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
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

Если набор блоков не установлен:

```json
{
    "result": {
        "layout": null
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
[`object`](../../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result). Если получить набор блоков не удалось, метод возвращает не `result`, а объект `error` — смотрите раздел «Обработка ошибок» ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **layout**
[`RestAppLayoutDto`](../configurable/structure/rest-app-layout-dto.md) | Набор дополнительных контентных блоков, установленный в дело текущим приложением [(подробное описание)](#layout). Если приложение не устанавливало набор блоков в это дело, поле имеет значение `null` ||
|#

#### Объект layout {#layout}

#|
|| **Название**
`тип` | **Описание** ||
|| **blocks**
[`object`](../../../../data-types.md) | Ассоциативный массив [контентных блоков](../configurable/structure/content-block.md) в том виде, в каком их передало приложение в [crm.activity.layout.blocks.set](./crm-activity-layout-blocks-set.md). Ключ — идентификатор блока, заданный приложением. Значение — объект с полями `type` и `properties` ||
|#

Поле `type` принимает одно из значений `text`, `largeText`, `link`, `deadline`, `withTitle`, `lineOfBlocks`. Состав `properties` зависит от типа блока и описан в структуре [ContentBlockDto](../configurable/structure/content-block.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_WRONG_CONTEXT",
    "error_description": "Вызов метода возможен только в контексте rest приложения"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ERROR_WRONG_CONTEXT` | Вызов метода возможен только в контексте rest приложения. Метод вызван через вебхук ||
|| `OWNER_NOT_FOUND` | Элемент, к которому привязано дело, не найден. Передан неизвестный `entityTypeId` или дело не привязано к элементу с указанным `entityId` ||
|| `NOT_FOUND` | Дело с указанным `activityId` не найдено ||
|| `ACCESS_DENIED` | У пользователя нет права на чтение элемента CRM, к которому привязано дело ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-layout-blocks-set.md)
- [{#T}](./crm-activity-layout-blocks-delete.md)
- [{#T}](../configurable/structure/content-block.md)
- [{#T}](../../layout-blocks/content-blocks-test-app.md)
