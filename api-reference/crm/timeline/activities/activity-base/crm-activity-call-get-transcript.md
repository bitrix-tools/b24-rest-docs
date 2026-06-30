# Получить расшифровку звонка crm.activity.call.getTranscript

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение объекта CRM

Метод `crm.activity.call.getTranscript` возвращает текст готовой расшифровки звонка по идентификатору дела CRM.

{% note info "" %}

Метод не запускает генерацию расшифровки, а только читает расшифровку, сформированную AI-обработкой звонка.

Если расшифровка не готова, отсутствует или обработка звонка завершилась с ошибкой, метод возвращает `null`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../../data-types.md) | Идентификатор дела типа Звонок, например `12345`.

Получить идентификатор можно методом [crm.activity.list](./crm-activity-list.md). Передайте в фильтре идентификатор объекта CRM и тип дела `TYPE_ID: 2` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":12345}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.call.getTranscript
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":12345,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.call.getTranscript
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CallTranscriptResult = {
      transcription: string
    } | null

    try {
      const response = await $b24.actions.v2.call.make<CallTranscriptResult>({
        method: 'crm.activity.call.getTranscript',
        params: {
          activityId: 12345,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result

        if (result === null) {
          console.info('Расшифровки для этого звонка нет')
        } else {
          console.info('Call transcript:', result.transcription)
        }
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
      async function getCallTranscript() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.call.getTranscript',
            params: {
              activityId: 12345,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result

          if (result === null) {
            console.info('Расшифровки для этого звонка нет')
          } else {
            console.info('Call transcript:', result.transcription)
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCallTranscript)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.call.getTranscript',
                [
                    'activityId' => 12345,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            $data = $result->data();

            if ($data === null) {
                echo 'Расшифровки для этого звонка нет';
            } else {
                echo $data['transcription'];
            }
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting call transcript: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.call.getTranscript',
        {
            activityId: 12345,
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                const data = result.data();

                if (data === null) {
                    console.log('Расшифровки для этого звонка нет');
                } else {
                    console.log(data.transcription);
                }
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.call.getTranscript',
        [
            'activityId' => 12345
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
        "transcription": "Текст расшифровки звонка..."
    },
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) или `null` | Корневой элемент ответа. Если расшифровки нет, возвращает `null` [(подробное описание)](#result) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **transcription**
[`string`](../../../../data-types.md) | Полный текст расшифровки звонка ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `NOT_FOUND` | Элемент не найден | Дело с указанным `activityId` не найдено или не привязано к объектам CRM ||
|| `403` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет прав на чтение привязанных объектов CRM или в Битрикс24 выключена AI-обработка звонков ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-get.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-fields.md)
