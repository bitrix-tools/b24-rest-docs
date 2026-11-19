# Получить Follow-up звонка Битрикс24 Синк syncconnector.followup.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`syncconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к Follow-up

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `syncconnector.followup.get` возвращает Follow-up звонка Битрикс24 Синк по идентификатору страницы подробного разбора.

Обычный пользователь получит Follow-up, если говорил в той части звонка, к которой относится страница, или состоит в чате звонка. В открытом чате Follow-up видят только участники чата, а не все сотрудники. Администратор получит Follow-up любой страницы подробного разбора.

Параметры и поля ответа такие же, как у [call.followup.get](./call-followup-get.md). Отличия значений у звонков Синка — в разделе [Отличия полей в Битрикс24 Синк](./fields.md#sync). Тот же Follow-up вернет и [call.followup.get](./call-followup-get.md), если передать в `callId` число `10000000000` плюс идентификатор страницы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **callId***
[`integer`](../../data-types.md) | Идентификатор страницы подробного разбора. Это не идентификатор звонка: у звонка Синка может быть несколько страниц — по одной на каждую часть.

Идентификатор можно получить методом [syncconnector.followup.list](./syncconnector-followup-list.md). Его же содержит ссылка «Подробный разбор» в чате ||
|| **select**
[`array`](../../data-types.md) | Список полей и вложенных путей, которые нужно вернуть в ответе.

Что вернет метод:

- не передан — все поля из раздела [Корневой объект](./fields.md#root-object), кроме `source`: его нужно передать в `select` явно. Поля без данных придут со значением `null`
- пустой массив — только поля `callId`, `callType`, `initiatorId`, `startDate`, `endDate`, `durationSeconds`
- список полей — только перечисленные поля и всегда `callId`

Полный список полей — в статье [Поля Follow-up звонков](./fields.md#select-paths) ||
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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/syncconnector.followup.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"callId":128,"mentionFormat":"html"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/syncconnector.followup.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"callId":128,"mentionFormat":"html","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/syncconnector.followup.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SyncFollowUpGetResult = {
      item: {
        callId: number
        callType?: number
        chatId?: number
        initiatorId?: null
        startDate?: string
        endDate?: string | null
        durationSeconds?: number | null
        uuid?: string
        language?: string | null
        version?: number | null
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
      const response = await $b24.actions.v3.call.make<SyncFollowUpGetResult>({
        method: 'syncconnector.followup.get',
        params: {
          callId: 128,
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
      async function getSyncFollowUp() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'syncconnector.followup.get',
            params: {
              callId: 128,
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

      document.addEventListener('DOMContentLoaded', getSyncFollowUp)
    </script>
    ```

- Python

    В `b24pysdk` нет готовых методов [syncconnector.followup.*](./index.md#sync-methods), поэтому метод вызывается через `call_method` — добавьте его в `api_v3_methods`, как в примере.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "syncconnector.followup.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "callId": 128,
                "mentionFormat": "html",
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'syncconnector.followup.get',
                [
                    'callId' => 128,
                    'mentionFormat' => 'html',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'syncconnector.followup.get',
        {
            callId: 128,
            mentionFormat: 'html'
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'syncconnector.followup.get',
        [
            'callId' => 128,
            'mentionFormat' => 'html',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "syncconnector.followup.get", b24.Params{
    	"callId":        128,
    	"mentionFormat": "html",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("syncconnector.followup.get: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```jsonc
{
    "result": {
        "item": {
            "callId": 128,
            "callType": 1,
            "chatId": 2048,
            "initiatorId": null,
            "startDate": "2026-11-12T09:00:00+00:00",
            "endDate": "2026-11-12T09:42:00+00:00",
            "durationSeconds": 2520,
            "uuid": "sync-call-key",
            "language": "ru",
            "version": 3,
            "participants": [ /* ParticipantDto */ ],
            "outcomes": ["transcription", "overview", "summary", "insights", "evaluation"],
            "createdAt": "2026-11-12T09:50:00+00:00",
            "tracks": [ /* TrackDto */ ],
            "transcription": { "language": "ru", "segments": [ /* TranscriptionSegmentDto */ ] },
            "overview": { "topic": "Планирование спринта", "actionItems": [ /* ... */ ] },
            "summary": { "segments": [ /* SummarySegmentDto */ ] },
            "insights": { "speakerEvaluationAvailable": true, "speakerAnalysis": [ /* ... */ ] },
            "evaluation": { "efficiencyValue": 75, "criteria": { /* ... */ } }
        }
    },
    "time": {
        "start": 1794476996,
        "finish": 1794476996.873855,
        "duration": 0.8738551139831543,
        "processing": 0,
        "date_start": "2026-11-12T12:49:56+03:00",
        "date_finish": "2026-11-12T12:49:56+03:00",
        "operating_reset_at": 1794477540,
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
[`object`](../../data-types.md) | Объект Follow-up. Состав полей зависит от `select`. Описание полей — в статье [Поля Follow-up звонков](./fields.md#root-object), отличия — в разделе [Отличия полей в Битрикс24 Синк](./fields.md#sync) ||
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
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте, что у приложения или вебхука есть scope `syncconnector` ||
|#

Код ошибки: `access_denied`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `callId` | Нет доступа к данным Follow-up | Метод возвращает эту ошибку и для несуществующего `callId`, и для чужого Follow-up. Администратор тоже получает ее, если страницы с таким `callId` нет. Возьмите `callId` из ответа [syncconnector.followup.list](./syncconnector-followup-list.md): там только доступные пользователю Follow-up ||
|#

#### Ошибки в параметре `select`

Код ошибки: `invalid_select_field`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Недопустимое поле в select: `#FIELD#` | Передайте поле из [списка доступных значений](./fields.md#select-paths) ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `callId` | Обязательное поле `callId` не указано | Передайте `callId` ||
|| `callId` | В поле `callId` требуется тип данных `int` для такого запроса | Передайте `callId` числом ||
|| `mentionFormat` | Значение поля не содержится в списке допустимых значений | Передайте `bb`, `html` или `none` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./syncconnector-followup-list.md)
- [{#T}](./syncconnector-followup-field-list.md)
- [{#T}](./syncconnector-followup-field-get.md)
- [{#T}](./fields.md)
- [{#T}](./index.md)
