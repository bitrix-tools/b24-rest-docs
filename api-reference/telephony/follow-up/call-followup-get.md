# Получить Follow-up звонка call.followup.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`call`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к звонку

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `call.followup.get` возвращает Follow-up одного звонка по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **callId***
[`integer`](../../data-types.md) | Идентификатор звонка.

Идентификатор можно получить методом [call.followup.list](./call-followup-list.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей и вложенных путей, которые нужно вернуть в ответе.

Если параметр не передан, метод возвращает все поля из раздела [Корневой объект](./fields.md#root-object). Отсутствующие данные имеют значение `null`.

Если передан пустой массив, метод возвращает только базовые метаданные: `callId`, `callType`, `initiatorId`, `startDate`, `endDate`, `durationSeconds`.

Если передан список полей, метод возвращает только перечисленные поля и всегда добавляет `callId`. Полный список полей смотрите в статье [Поля Follow-up звонков](./fields.md#select-paths) ||
|| **mentionFormat**
[`string`](../../data-types.md) | Формат упоминаний пользователей в текстовых AI-полях.

Возможные значения:

- `bb` — BBCode-формат
- `html` — HTML-формат
- `none` — текст без разметки упоминаний

По умолчанию: `bb` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/call.followup.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"callId":12345,"mentionFormat":"html"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/call.followup.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"callId":12345,"mentionFormat":"html","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/call.followup.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FollowUpGetResult = {
      item: {
        callId: number
        callType?: number
        initiatorId?: number
        startDate?: string
        endDate?: string
        durationSeconds?: number
        uuid?: string
        language?: string
        version?: number
        participants?: unknown[]
        outcomes?: string[]
        createdAt?: string
        tracks?: unknown[]
        transcription?: unknown
        overview?: unknown
        summary?: unknown
        insights?: unknown
        evaluation?: unknown
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FollowUpGetResult>({
        method: 'call.followup.get',
        params: {
          callId: 12345,
          mentionFormat: 'html',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item)
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
      async function getFollowUp() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'call.followup.get',
            params: {
              callId: 12345,
              mentionFormat: 'html',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFollowUp)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'call.followup.get',
                [
                    'callId' => 12345,
                    'mentionFormat' => 'html',
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
        'call.followup.get',
        {
            callId: 12345,
            mentionFormat: 'html'
        },
        function(result) {
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
        'call.followup.get',
        [
            'callId' => 12345,
            'mentionFormat' => 'html',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```jsonc
{
    "result": {
        "item": {
            "callId": 12345,
            "callType": 1,
            "initiatorId": 7,
            "startDate": "2026-01-15T10:00:00+00:00",
            "endDate": "2026-01-15T10:42:00+00:00",
            "durationSeconds": 2520,
            "uuid": "bb085e5d-5160-4a63-9ac4-152248046c39",
            "language": "ru",
            "version": 3,
            "participants": [ /* ParticipantDto */ ],
            "outcomes": ["transcription", "overview", "summary", "insights", "evaluation"],
            "createdAt": "2026-01-15T11:05:00+00:00",
            "tracks": [ /* TrackDto */ ],
            "transcription": { "language": "ru", "segments": [ /* TranscriptionSegmentDto */ ] },
            "overview": { "topic": "Планирование спринта", "actionItems": [ /* ... */ ] },
            "summary": { "segments": [ /* SummarySegmentDto */ ] },
            "insights": { "speakerEvaluationAvailable": true, "speakerAnalysis": [ /* ... */ ] },
            "evaluation": { "efficiencyValue": 75, "criteria": { /* ... */ } }
        }
    },
    "time": {
        "start": 1784017027,
        "finish": 1784017027.356922,
        "duration": 0.356921911239624,
        "processing": 0,
        "date_start": "2026-07-14T11:17:07+03:00",
        "date_finish": "2026-07-14T11:17:07+03:00",
        "operating_reset_at": 1784017627,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../data-types.md) | Объект Follow-up. Состав полей зависит от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "access_denied",
        "message": "Нет доступа к данным Follow-up"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте, что у приложения или вебхука есть scope `call` ||
|#

Код ошибки: `access_denied`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `callId` | Нет доступа к данным Follow-up | Проверьте, что пользователь имеет доступ к звонку или состоит в связанном чате ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `callId` | Звонок не найден | Передайте существующий идентификатор звонка. Для пользователя без прав на звонок метод вернет ошибку доступа ||
|#

#### Ошибки в параметре `select`

Код ошибки: `invalid_select_field`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Недопустимое поле в `select` | Передайте поле из списка доступных значений `select` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `callId` | Не передан обязательный параметр или передан неверный тип | Передайте `callId` как целое число ||
|| `mentionFormat` | Передано значение не из списка допустимых форматов | Передайте `bb`, `html` или `none` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./call-followup-list.md)
- [{#T}](./fields.md)
- [{#T}](./call-followup-field-list.md)
- [{#T}](./call-followup-field-get.md)
- [{#T}](./index.md)

<!-- Generated by skill-1-gen-docs from source: api-reference/telephony/doc.md, C:\Users\g.m.tagirova\original-bitrix\modules\call\lib\Controller\FollowUp.php -->
<!-- Generated: 2026-07-14 -->
<!-- Требуется проверка: нет -->
