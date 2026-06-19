# Создать событие календаря из письма mail.message.createcalendarevent

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к почтовому ящику, где находится письмо

Метод `mail.message.createcalendarevent` создает событие календаря из письма.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **messageId***
[`integer`](../../../data-types.md) | Идентификатор письма.

Идентификатор можно получить методом [mail.message.list](./mail-message-list.md) ||
|| **dateFrom***
[`string`](../../../data-types.md) | Дата и время начала события в формате `Y-m-d H:i:s`, например `2026-04-15 10:00:00` ||
|| **dateTo***
[`string`](../../../data-types.md) | Дата и время окончания события в формате `Y-m-d H:i:s`, например `2026-04-15 11:00:00` ||
|| **name**
[`string`](../../../data-types.md) | Название события.

Если не передано, используется тема письма ||
|| **description**
[`string`](../../../data-types.md) | Описание события ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.createcalendarevent`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"messageId":15,"dateFrom":"2026-04-15 10:00:00","dateTo":"2026-04-15 11:00:00","name":"Встреча по договору"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.createcalendarevent
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"messageId":15,"dateFrom":"2026-04-15 10:00:00","dateTo":"2026-04-15 11:00:00","name":"Встреча по договору","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.createcalendarevent
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CreateCalendarEventResult = {
      success: boolean
      eventId: number
      messageId: number
    }

    try {
      const response = await $b24.actions.v3.call.make<CreateCalendarEventResult>({
        method: 'mail.message.createcalendarevent',
        params: {
          messageId: 15,
          dateFrom: '2026-04-15 10:00:00',
          dateTo: '2026-04-15 11:00:00',
          name: 'Contract meeting',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created calendar event ID:', result.eventId, 'for message ID:', result.messageId)
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
      async function createCalendarEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.createcalendarevent',
            params: {
              messageId: 15,
              dateFrom: '2026-04-15 10:00:00',
              dateTo: '2026-04-15 11:00:00',
              name: 'Contract meeting',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created calendar event ID:', result.eventId, 'for message ID:', result.messageId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', createCalendarEvent)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.createcalendarevent',
                [
                    'messageId' => 15,
                    'dateFrom' => '2026-04-15 10:00:00',
                    'dateTo' => '2026-04-15 11:00:00',
                    'name' => 'Встреча по договору'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'mail.message.createcalendarevent',
        {
            messageId: 15,
            dateFrom: '2026-04-15 10:00:00',
            dateTo: '2026-04-15 11:00:00',
            name: 'Встреча по договору'
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'mail.message.createcalendarevent',
        [
            'messageId' => 15,
            'dateFrom' => '2026-04-15 10:00:00',
            'dateTo' => '2026-04-15 11:00:00',
            'name' => 'Встреча по договору'
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
        "success": true,
        "eventId": 31,
        "messageId": 15
    },
    "time": {
        "start": 1779819678,
        "finish": 1779819678.84803,
        "duration": 0.8480300903320312,
        "processing": 0,
        "date_start": "2026-05-26T21:21:18+03:00",
        "date_finish": "2026-05-26T21:21:18+03:00",
        "operating_reset_at": 1779820278,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом выполнения операции ||
|| **success**
[`boolean`](../../../data-types.md) | Признак успешного выполнения операции ||
|| **eventId**
[`integer`](../../../data-types.md) | Идентификатор созданного события ||
|| **messageId**
[`integer`](../../../data-types.md) | Идентификатор исходного письма ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `messageId` не указано",
                "field": "messageId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `messageId` | Обязательное поле `messageId` не указано или передано некорректное значение | Передайте `messageId` как положительное целое число больше `0` ||
|| `dateFrom` | Обязательное поле `dateFrom` не указано | Передайте `dateFrom` в теле запроса ||
|| `dateTo` | Обязательное поле `dateTo` не указано | Передайте `dateTo` в теле запроса ||
|| `messageId` | Сообщение удалено или перемещено в другую папку | Проверьте, что письмо существует и доступно текущему пользователю ||
|| `dateFrom`, `dateTo` | Invalid date format | Передайте дату в формате `Y-m-d H:i:s` ||
|| `-` | Failed to create calendar event | Проверьте корректность параметров и доступность модуля календаря ||
|| `-` | Module calendar is not installed | Установите и настройте модуль календаря ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `mail` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-get.md)
- [{#T}](./index.md)
