# Скопировать шаблон задачи v 3.0 tasks.template.copy

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на просмотр исходного шаблона и правом создавать шаблоны

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.copy` создает копию шаблона задачи и возвращает ее в сохраненном виде.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор исходного шаблона.

Идентификатор можно получить методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|#

Что получает копия:
- название и остальные поля исходного шаблона без изменений, включая исполнителей, теги, права доступа и параметры повторения
- пользователь, который создал копию, получает право `full` в `permissions`
- привязка к исходной задаче сбрасывается: `taskId` в копии равен `0`
- если исходный шаблон повторяется, копия с `replicate: true` тоже начнет создавать задачи по расписанию. Чтобы отключить повторение, передайте `replicate: false` в [tasks.template.update](./tasks-template-update-rest-v3.md)

Исходный шаблон не меняется. Метод поддерживает заголовок `Idempotency-Key`: повтор запроса с тем же ключом вернет ту же копию, а не создаст вторую. Подробнее — в разделе [Повторный вызов без дублей](../../rest-v3.md#idempotency).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.copy`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":143}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.copy
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":143,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.copy
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
    type TemplateCopyResult = {
      item: {
        id: number
        title: string
        taskId: number
        replicate: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateCopyResult>(
        'tasks.template.copy',
        {
          id: 143,
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Copy:', result.item.id, 'replicate:', result.item.replicate)
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
      async function copyTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.copy',
            {
              id: 143,
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Copy:', result.item.id, 'replicate:', result.item.replicate)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', copyTemplate)
    </script>
    ```

- Python

    Методы шаблонов REST 3.0 пока не входят в список новой версии в `b24pysdk`, и у метода нет готовой обертки в SDK. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.copy"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 143,
            },
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item["id"], item["replicate"])
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
                'tasks.template.copy',
                [
                    'id' => 143,
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
        'tasks.template.copy',
        {
            id: 143,
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
        'tasks.template.copy',
        [
            'id' => 143,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.copy", b24.Params{
    	"id": 143,
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.copy: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var copied struct {
    	ID        int    `json:"id"`
    	Title     string `json:"title"`
    	Replicate bool   `json:"replicate"`
    }
    if err := json.Unmarshal(raw, &copied); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(copied.ID, copied.Title, copied.Replicate)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 149,
            "title": "Ежемесячный отчет по продажам",
            "description": "Собрать данные о продажах за неделю",
            "descriptionInBbcode": true,
            "creatorId": 1269,
            "responsibleId": 1269,
            "responsibleCollection": [
                {
                    "id": 1269
                }
            ],
            "responsibleLastName": "Иванова",
            "accomplices": [
                {
                    "id": 1269
                }
            ],
            "auditors": [
                {
                    "id": 29
                }
            ],
            "groupId": 0,
            "taskId": 0,
            "stageId": 0,
            "xmlId": "",
            "status": "1",
            "addInReport": false,
            "priority": "high",
            "tParamType": "usual",
            "deadlineAfterTs": 86400,
            "startDatePlanTs": 0,
            "endDatePlanTs": 0,
            "allowsChangeDeadline": false,
            "allowsTimeTracking": false,
            "matchesWorkTime": false,
            "needsControl": false,
            "estimatedTime": 0,
            "multitask": false,
            "siteId": "s1",
            "replicate": true,
            "replicateParams": {
                "period": "monthly",
                "everyDay": "1",
                "workdayOnly": "N",
                "everyWeek": "1",
                "monthlyType": "1",
                "monthlyDayNum": "25",
                "monthlyMonthNum1": "1",
                "monthlyMonthNum2": "1",
                "yearlyType": "1",
                "yearlyDayNum": "1",
                "time": "09:00",
                "timezoneOffset": "0",
                "repeatTill": "times",
                "times": "6",
                "weekDays": [],
                "deadlineOffset": 86400,
                "nextExecutionTime": "11/25/2026 09:00:00 am"
            },
            "tParamReplicationCount": 0,
            "dependsOn": [],
            "crmItemIds": [],
            "checklist": [],
            "tags": [
                {
                    "id": 27,
                    "name": "отчет",
                    "ownerId": 1269
                }
            ],
            "permissions": [
                {
                    "id": 303,
                    "accessCode": "U29",
                    "permission": "read_only"
                },
                {
                    "id": 305,
                    "accessCode": "U1269",
                    "permission": "full"
                }
            ]
        }
    },
    "time": {
        "start": 1795429316,
        "finish": 1795429316.719843,
        "duration": 0.7198429107666016,
        "processing": 0,
        "date_start": "2026-11-23T13:21:56+03:00",
        "date_finish": "2026-11-23T13:21:56+03:00",
        "operating_reset_at": 1795429860,
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
[`object`](./fields-rest-v3.md#templatedto) | Копия шаблона со всеми заполненными полями, включая `tags`, `permissions` и `replicateParams`. Поля со значением `null` в ответ не попадают. [Описание полей шаблона](./fields-rest-v3.md#templatedto) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
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
|| `id` | Обязательное поле `id` не указано | Передайте идентификатор исходного шаблона ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте целое число ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть доступ на просмотр исходного шаблона и право создавать шаблоны. Права на шаблон возвращает метод [tasks.template.access.get](./tasks-template-access-get-rest-v3.md) ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `999999` не найдена | Шаблона нет или он удален. Проверьте идентификатор методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-update-rest-v3.md)
- [{#T}](./tasks-template-add-rest-v3.md)
- [{#T}](./tasks-template-delete-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
- [{#T}](./tasks-template-task-add-rest-v3.md)
