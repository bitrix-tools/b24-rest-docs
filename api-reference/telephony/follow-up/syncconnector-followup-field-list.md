# Получить список полей Follow-up звонков Битрикс24 Синк syncconnector.followup.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`syncconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `syncconnector.followup.field.list` возвращает список доступных полей Follow-up звонков Битрикс24 Синк. Для каждого поля метод возвращает описание, например имя и тип. Имена полей можно передать в `select` методов [syncconnector.followup.list](./syncconnector-followup-list.md) и [syncconnector.followup.get](./syncconnector-followup-get.md).

Описания полей в ответе приходят на английском языке.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей описания, которые нужно вернуть в ответе.

Доступные поля:

- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — группы обязательности
- `filterable` — признак доступности в фильтре
- `sortable` — признак доступности в сортировке
- `editable` — признак редактируемости
- `editableGroups` — группы редактируемости
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей

Если параметр не передан, метод возвращает все поля описания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/syncconnector.followup.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","description"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/syncconnector.followup.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","description"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/syncconnector.followup.field.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SyncFollowUpFieldItem = {
      name: string
      type: string
      description: string | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SyncFollowUpFieldListResult = {
      items: SyncFollowUpFieldItem[]
    }

    try {
      const response = await $b24.actions.v3.call.make<SyncFollowUpFieldListResult>({
        method: 'syncconnector.followup.field.list',
        params: {
          select: ['name', 'type', 'description'],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Fields count:', result.items.length, 'Fields:', result.items)
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
      async function getSyncFollowUpFieldList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'syncconnector.followup.field.list',
            params: {
              select: ['name', 'type', 'description'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Fields count:', result.items.length, 'Fields:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSyncFollowUpFieldList)
    </script>
    ```

- Python

    В `b24pysdk` нет готовых методов [syncconnector.followup.*](./index.md#sync-methods), поэтому метод вызывается через `call_method` — добавьте его в `api_v3_methods`, как в примере.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "syncconnector.followup.field.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["name", "type", "description"],
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
                'syncconnector.followup.field.list',
                [
                    'select' => ['name', 'type', 'description'],
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
        'syncconnector.followup.field.list',
        {
            select: ['name', 'type', 'description']
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
        'syncconnector.followup.field.list',
        [
            'select' => ['name', 'type', 'description'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "syncconnector.followup.field.list", b24.Params{
    	"select": []string{"name", "type", "description"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("syncconnector.followup.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Name        string `json:"name"`
    		Type        string `json:"type"`
    		Description string `json:"description"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range result.Items {
    	fmt.Println(it.Name, it.Type)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "name": "callId",
                "type": "int",
                "description": "Follow-up page identifier (b_syncconnector_followup_page.ID): the id get accepts and the \"Detailed analysis\" link carries. Always present."
            },
            {
                "name": "source",
                "type": "string",
                "description": "Origin of the follow-up: `call` — a Bitrix24 call, `sync` — a Sync meeting. Opt-in."
            },
            {
                "name": "callType",
                "type": "int",
                "description": "Call type: always 1 (instant). A conventional value: a Sync call has no call type of the portal."
            },
            {
                "name": "chatId",
                "type": "int",
                "description": "Id of the chat the follow-up page belongs to. Opt-in: list this in `select` to receive it."
            },
            {
                "name": "initiatorId",
                "type": "int",
                "description": "Always null: Sync does not tell the portal who initiated the call."
            },
            {
                "name": "startDate",
                "type": "string",
                "description": "ISO 8601 UTC timestamp when the page starts: the start of the window of the call part, without a window the time the page was shown."
            },
            {
                "name": "endDate",
                "type": "string",
                "description": "ISO 8601 UTC timestamp when the window of the call part ended. Null when the page has no window."
            },
            {
                "name": "durationSeconds",
                "type": "int",
                "description": "Duration of the window of the call part in seconds (endDate − startDate), never negative. Null when the page has no window."
            },
            {
                "name": "uuid",
                "type": "string",
                "description": "Key of the Sync call, shared by all its parts; not a UUID. Opt-in: list this in `select` to receive it."
            },
            {
                "name": "language",
                "type": "string",
                "description": "Detected transcription language (BCP-47 / ISO 639-1, e.g. \"ru\", \"en\"). Null when there is no transcription."
            },
            {
                "name": "version",
                "type": "int",
                "description": "Maximum schema version across all stored outcome blocks (transcription, overview, summary, insights, evaluation)."
            },
            {
                "name": "participants",
                "type": "array",
                "description": "Portal users among the speakers of the page, with display data (name, avatar, work position); guests are not listed. Opt-in via `select`."
            },
            {
                "name": "outcomes",
                "type": "array",
                "description": "Names of outcome blocks present for this page: any subset of [transcription, overview, summary, insights, evaluation]."
            },
            {
                "name": "createdAt",
                "type": "string",
                "description": "ISO 8601 UTC timestamp when the follow-up page was shown."
            },
            {
                "name": "tracks",
                "type": "array",
                "description": "Audio of the follow-up stored on Disk, with download URLs; empty when there is none or the viewer cannot read it. Opt-in via `select`."
            },
            {
                "name": "transcription",
                "type": "object",
                "description": "Time-ordered transcription of the call with per-segment speaker attribution."
            },
            {
                "name": "overview",
                "type": "object",
                "description": "AI overview of the meeting: topic, agenda, agreements, action items, takeaways."
            },
            {
                "name": "summary",
                "type": "object",
                "description": "Segmented summary of the call by topic chunks."
            },
            {
                "name": "insights",
                "type": "object",
                "description": "AI insights: per-speaker analysis with region-gated evaluation, meeting strengths/weaknesses, recommendations."
            },
            {
                "name": "evaluation",
                "type": "object",
                "description": "Meeting efficiency evaluation: overall score and individual evaluation criteria."
            }
        ]
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
|| **items**
[`array`](../../data-types.md) | Массив объектов с описанием полей. Состав каждого объекта зависит от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Описание полей на русском языке — в статье [Поля Follow-up звонков](./fields.md), отличия значений в Синке — в разделе [Отличия полей в Битрикс24 Синк](./fields.md#sync).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION",
        "message": "Неизвестное поле `bad` для сущности `DtoFieldDto`"
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

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для объекта `DtoFieldDto` | Передайте только поля описания, перечисленные у параметра `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["name","type"]` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./syncconnector-followup-field-get.md)
- [{#T}](./syncconnector-followup-list.md)
- [{#T}](./syncconnector-followup-get.md)
- [{#T}](./fields.md)
- [{#T}](./index.md)
