# Удалить блоки и очистить файловые привязки изображений страницы landing.landing.removeEntities

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.removeEntities` удаляет со страницы указанные блоки и связанные с ними изображения. Также с его помощью можно очистить файловые привязки у отдельных изображений без удаления самих блоков.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|| **data***
[`object`](../../../data-types.md) | Набор объектов для удаления [(подробное описание)](#data).

Если не указать блоки или изображения для удаления, страница останется без изменений. При этом метод все равно вернет `true`, если страница существует ||
|#

### Параметр data {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **blocks**
[`integer[]`](../../../data-types.md) | Идентификаторы блоков страницы, которые нужно удалить полностью.

Для каждого блока метод также удаляет все связанные изображения. 

Если в списке есть блоки, которых нет на странице, или блоки, которые пользователь не может удалить, метод пропустит их. Для существующей доступной страницы он может вернуть `true`, даже если часть блоков или все блоки из списка не были удалены ||
|| **images**
[`object[]`](../../../data-types.md) | Пары идентификаторов блока и изображения для удаления файловой привязки. Содержимое блока не изменяется — используйте, когда изображение уже убрано из блока и нужно очистить оставшуюся служебную запись. [(подробное описание)](#images).

Метод не вернет отдельную ошибку в трех случаях: если блок не найден, если он уже указан в параметре `blocks` или если изображение не связано с этим блоком ||
|#

### Параметр images {#images}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока, с которым связана файловая привязка изображения ||
|| **image***
[`integer`](../../../data-types.md) | Внутренний идентификатор файловой привязки изображения (`FILE_ID`), связанной с блоком `block`. 

Для существующих изображений `FILE_ID` можно получить методом [landing.block.getcontent](../../block/methods/landing-block-get-content.md). В ответе нужно найти HTML блока в поле `content` и посмотреть значение атрибута `data-fileid` у нужного изображения
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример показывает смешанный сценарий: блоки из `blocks` удаляются полностью, а элементы `images` очищают файловые привязки изображений в других блоках.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 648,
        "data": {
          "blocks": [12167, 123],
          "images": [
            {
              "block": 12269,
              "image": 6866
            },
            {
              "block": 12268,
              "image": 6861
            }
          ]
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.removeEntities.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 648,
        "data": {
          "blocks": [12167, 123],
          "images": [
            {
              "block": 12269,
              "image": 6866
            },
            {
              "block": 12268,
              "image": 6861
            }
          ]
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.removeEntities.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'landing.landing.removeEntities',
        params: {
          lid: 648,
          data: {
            blocks: [12167, 123],
            images: [
              {
                block: 12269,
                image: 6866,
              },
              {
                block: 12268,
                image: 6861,
              },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('removeEntities result:', result)
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
      async function removeEntities() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.removeEntities',
            params: {
              lid: 648,
              data: {
                blocks: [12167, 123],
                images: [
                  {
                    block: 12269,
                    image: 6866,
                  },
                  {
                    block: 12268,
                    image: 6861,
                  },
                ],
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('removeEntities result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', removeEntities)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.landing.removeEntities',
                [
                    'lid' => 648,
                    'data' => [
                        'blocks' => [12167, 123],
                        'images' => [
                            [
                                'block' => 12269,
                                'image' => 6866,
                            ],
                            [
                                'block' => 12268,
                                'image' => 6861,
                            ],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error removing blocks and images: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.removeEntities',
        {
            lid: 648,
            data: {
                blocks: [12167, 123],
                images: [
                    {
                        block: 12269,
                        image: 6866
                    },
                    {
                        block: 12268,
                        image: 6861
                    }
                ]
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.landing.removeEntities',
        [
            'lid' => 648,
            'data' => [
                'blocks' => [12167, 123],
                'images' => [
                    [
                        'block' => 12269,
                        'image' => 6866,
                    ],
                    [
                        'block' => 12268,
                        'image' => 6861,
                    ],
                ],
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773796328,
        "finish": 1773796328.413521,
        "duration": 0.41352105140686035,
        "processing": 0,
        "date_start": "2026-03-18T04:12:08+03:00",
        "date_finish": "2026-03-18T04:12:08+03:00",
        "operating_reset_at": 1773796928,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления, при успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не переданы обязательные параметры вызова: в запросе отсутствует `lid`, `data` или оба параметра ||
|| `LANDING_NOT_EXIST` | Страница не найдена, удалена или недоступна текущему пользователю ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-mark-delete.md)
- [{#T}](./landing-landing-mark-undelete.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
