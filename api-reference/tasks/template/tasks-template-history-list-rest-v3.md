# Получить историю повторений шаблона задачи v 3.0 tasks.template.history.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.history.list` возвращает историю повторений шаблона: записи о создании задач по расписанию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Условие отбора в формате REST 3.0: массив условий `[поле, оператор, значение]`. Подробнее о формате — в [обзоре REST 3.0](../../rest-v3.md#filter).

Обязательно условие по полю `templateId` с оператором `=`, например `[["templateId","=",47]]`. Значение — положительное число, идентификатор шаблона задачи. Получить его можно методом [tasks.template.list](./tasks-template-list.md).

Другие поля и операторы в фильтре не поддерживаются ||
|| **select**
[`array`](../../data-types.md) | Список полей записи, которые нужно вернуть.

Доступные поля: `id`, `templateId`, `type`, `created`, `message`, `relatedTaskId`, `errors`. Описание полей — в разделе [Объект items](#items).

По умолчанию возвращаются все поля ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация:

- `limit` — сколько записей вернуть, от 1 до 1000. Значение больше 1000 метод заменяет на 1000
- `offset` — сколько записей пропустить с начала выборки
- `page` — номер страницы. Используйте вместо `offset`: метод сам рассчитает смещение по `limit`

По умолчанию возвращается 50 записей ||
|#

Записи идут от новых к старым. Параметр `order` метод не поддерживает. Общее количество записей возвращает метод [tasks.template.history.count](./tasks-template-history-count-rest-v3.md).

В историю попадают только события повторения шаблона: создание задач по расписанию и расчет времени следующего повтора. У шаблона, по которому задачи по расписанию еще не создавались, история пустая.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.history.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["templateId","=",47]],"select":["id","type","created","message","relatedTaskId","errors"],"pagination":{"limit":3,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.history.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["templateId","=",47]],"select":["id","type","created","message","relatedTaskId","errors"],"pagination":{"limit":3,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.history.list
    ```

- JS (TS)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateHistoryListResult = {
      items: Array<{
        id: number
        type: 'message' | 'error'
        created: string
        message: string
        relatedTaskId: number | null
        errors: Array<{
          code: string
          message: string
        }>
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateHistoryListResult>(
        'tasks.template.history.list',
        {
          filter: [
            ['templateId', '=', 47],
          ],
          select: ['id', 'type', 'created', 'message', 'relatedTaskId', 'errors'],
          pagination: {
            limit: 3,
            offset: 0,
          },
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listTemplateHistory() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.history.list',
            {
              filter: [
                ['templateId', '=', 47],
              ],
              select: ['id', 'type', 'created', 'message', 'relatedTaskId', 'errors'],
              pagination: {
                limit: 3,
                offset: 0,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplateHistory)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.history.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["templateId", "=", 47],
                ],
                "select": ["id", "type", "created", "message", "relatedTaskId", "errors"],
                "pagination": {
                    "limit": 3,
                    "offset": 0,
                },
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
                'tasks.template.history.list',
                [
                    'filter' => [
                        ['templateId', '=', 47],
                    ],
                    'select' => ['id', 'type', 'created', 'message', 'relatedTaskId', 'errors'],
                    'pagination' => [
                        'limit' => 3,
                        'offset' => 0,
                    ],
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
        'tasks.template.history.list',
        {
            filter: [
                ['templateId', '=', 47],
            ],
            select: ['id', 'type', 'created', 'message', 'relatedTaskId', 'errors'],
            pagination: {
                limit: 3,
                offset: 0,
            },
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
        'tasks.template.history.list',
        [
            'filter' => [
                ['templateId', '=', 47],
            ],
            'select' => ['id', 'type', 'created', 'message', 'relatedTaskId', 'errors'],
            'pagination' => [
                'limit' => 3,
                'offset' => 0,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.history.list", b24.Params{
    	"filter": []any{
    		[]any{"templateId", "=", 47},
    	},
    	"select": []string{"id", "type", "created", "message", "relatedTaskId", "errors"},
    	"pagination": map[string]any{
    		"limit":  3,
    		"offset": 0,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.history.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var records []struct {
    	ID            int    `json:"id"`
    	Type          string `json:"type"`
    	Created       string `json:"created"`
    	Message       string `json:"message"`
    	RelatedTaskID *int   `json:"relatedTaskId"`
    	Errors        []struct {
    		Code    string `json:"code"`
    		Message string `json:"message"`
    	} `json:"errors"`
    }
    if err := json.Unmarshal(raw, &records); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(len(records))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 1327,
                "type": "message",
                "created": "2026-10-26T06:00:01+03:00",
                "message": "Время следующего повтора: 11/30/2026 06:00:00 am (UTC +03:00) (через 3023999 секунд)",
                "relatedTaskId": null,
                "errors": []
            },
            {
                "id": 1325,
                "type": "message",
                "created": "2026-10-26T06:00:01+03:00",
                "message": "Регулярная задача создана (#4255)",
                "relatedTaskId": 4255,
                "errors": []
            },
            {
                "id": 1323,
                "type": "message",
                "created": "2026-09-28T06:00:01+03:00",
                "message": "Время следующего повтора: 10/26/2026 06:00:00 am (UTC +03:00) (через 2419199 секунд)",
                "relatedTaskId": null,
                "errors": []
            }
        ]
    },
    "time": {
        "start": 1795429109,
        "finish": 1795429110.004726,
        "duration": 1.0047259330749512,
        "processing": 1,
        "date_start": "2026-11-23T13:18:29+03:00",
        "date_finish": "2026-11-23T13:18:30+03:00",
        "operating_reset_at": 1795429680,
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
[`object[]`](../../data-types.md) | Массив записей истории [(подробное описание)](#items). Состав полей зависит от `select`. Если записей нет, массив пустой ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи истории ||
|| **templateId**
[`integer`](../../data-types.md) | Идентификатор шаблона. Совпадает со значением из `filter` ||
|| **type**
[`string`](../../data-types.md) | Тип события.

Возможные значения:

- `message` — информационное сообщение
- `error` — сообщение об ошибке ||
|| **created**
[`datetime`](../../data-types.md) | Дата и время, когда событие записано в историю ||
|| **message**
[`string`](../../data-types.md) | Текст события, до 255 символов. Возвращается на том языке, на котором записан в историю ||
|| **relatedTaskId**
[`integer`](../../data-types.md) | Идентификатор задачи, которую создало повторение. Если в событии задача не упоминается, возвращается `null`.

Данные задачи можно получить методом [tasks.task.get](../tasks-task-get-rest-v3.md) ||
|| **errors**
[`object[]`](../../data-types.md) | Ошибки, с которыми завершилось событие [(подробное описание)](#errors). У успешных событий массив пустой ||
|#

#### Объект errors {#errors}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../data-types.md) | Символьный код ошибки события ||
|| **message**
[`string`](../../data-types.md) | Текст ошибки, с которой завершилось событие ||
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
                "message": "Значение поля не может быть пустым",
                "field": "filter"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с условием `["templateId","=",<идентификатор шаблона>]` ||
|| `filter` | Обязательное поле `filter` не указано | Передайте в условии `templateId` положительный идентификатор шаблона ||
|| `templateId` | В поле `templateId` требуется тип данных `int` для такого запроса | Передайте идентификатор шаблона числом, а не строкой ||
|| `type` | В DTO `HistoryRecordDto` в поле `type` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `templateId` ||
|| `id` | В DTO `HistoryRecordDto` в поле `id` требуется наличие атрибута `Sortable` для такого запроса | Уберите параметр `order`: метод возвращает записи от новых к старым ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.templateId` | Требуется указать фильтр по обязательному полю `templateId` | Используйте для `templateId` оператор `=`. Операторы `in`, `>`, `<` и другие не подходят ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["templateId","=",47]]`, а не объектом ||
|#

#### Ошибки навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` от 1 до 1000 ||
|| `pagination` | Не удается распознать параметр пагинации `{"offset":-1}` | Передайте неотрицательный `offset` ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `HistoryRecordDto` | Передайте поля из описания параметра `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `{"errors":["code"]}` | Передайте `select` массивом строк, например `["id","errors"]` ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | Проверьте идентификатор шаблона методом [tasks.template.list](./tasks-template-list.md). Удаленный шаблон метод тоже не находит ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право просмотра шаблона и что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-history-count-rest-v3.md)
- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
- [{#T}](../tasks-task-get-rest-v3.md)
