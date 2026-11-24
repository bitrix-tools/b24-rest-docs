# Получить шаблон задачи v 3.0 tasks.template.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на просмотр шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.get` возвращает шаблон задачи по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона.

Идентификатор можно получить методом [tasks.template.list](./tasks-template-list-rest-v3.md) или при [создании шаблона](./tasks-template-add-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть. Названия полей совпадают с ключами [объекта шаблона](./fields-rest-v3.md#templatedto).

Без `select` метод возвращает простые поля шаблона без вложенных и связанных объектов.

Вложенные объекты `tags`, `permissions`, `replicateParams`, `userFields` возвращаются, только если указаны в `select`. Можно указать объект целиком, например `replicateParams`, или его поле через точку, например `replicateParams.period`.

Связанные объекты возвращаются, если указаны их поля через точку:
- `creator` — постановщик, например `creator.name`. [Поля пользователя](../fields-rest-v3.md#user)
- `group` — проект, например `group.name`. [Поля группы](../fields-rest-v3.md#group)
- `task` — задача, из которой создан шаблон. Доступны только `task.id` и `task.title`

Поля `parent`, `templateChildrenCount`, `subTemplateIds` метод не возвращает ||
|#

{% note warning "" %}

Если у шаблона не указан проект, `groupId` равен `0`, запрос с полями `group` в `select` завершается ошибкой `INTERNAL_SERVER_ERROR`. Запрашивайте `group` только для шаблонов, у которых `groupId` больше `0`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":143,"select":["id","title","description","creatorId","creator.name","responsibleCollection","auditors","priority","deadlineAfterTs","replicate","replicateParams","tags","permissions"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":143,"select":["id","title","description","creatorId","creator.name","responsibleCollection","auditors","priority","deadlineAfterTs","replicate","replicateParams","tags","permissions"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.get
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
    type TemplateGetResult = {
      item: {
        id: number
        title: string
        description?: string
        creatorId: number
        creator?: { name: string }
        responsibleCollection?: Array<{ id: number }>
        auditors?: Array<{ id: number }>
        priority: 'low' | 'average' | 'high'
        deadlineAfterTs?: number
        replicate: boolean
        replicateParams?: Record<string, string | number | number[]>
        tags?: Array<{ id: number, name: string, ownerId: number }>
        permissions?: Array<{ id: number, accessCode: string, permission: 'read_only' | 'full' }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateGetResult>(
        'tasks.template.get',
        {
          id: 143,
          select: [
            'id', 'title', 'description', 'creatorId', 'creator.name',
            'responsibleCollection', 'auditors', 'priority', 'deadlineAfterTs',
            'replicate', 'replicateParams', 'tags', 'permissions',
          ],
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Template:', result.item.id, result.item.title)
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
      async function getTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.get',
            {
              id: 143,
              select: [
                'id', 'title', 'description', 'creatorId', 'creator.name',
                'responsibleCollection', 'auditors', 'priority', 'deadlineAfterTs',
                'replicate', 'replicateParams', 'tags', 'permissions',
              ],
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Template:', result.item.id, result.item.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplate)
    </script>
    ```

- Python

    Имя метода совпадает с методом прошлой версии `tasks.template.get`, а методы шаблонов REST 3.0 пока не входят в список новой версии в `b24pysdk`: обычный вызов SDK уйдет в предыдущую версию REST. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 143,
                "select": [
                    "id", "title", "description", "creatorId", "creator.name",
                    "responsibleCollection", "auditors", "priority", "deadlineAfterTs",
                    "replicate", "replicateParams", "tags", "permissions",
                ],
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"])
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
                'tasks.template.get',
                [
                    'id' => 143,
                    'select' => [
                        'id', 'title', 'description', 'creatorId', 'creator.name',
                        'responsibleCollection', 'auditors', 'priority', 'deadlineAfterTs',
                        'replicate', 'replicateParams', 'tags', 'permissions',
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
        'tasks.template.get',
        {
            id: 143,
            select: [
                'id', 'title', 'description', 'creatorId', 'creator.name',
                'responsibleCollection', 'auditors', 'priority', 'deadlineAfterTs',
                'replicate', 'replicateParams', 'tags', 'permissions',
            ],
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
        'tasks.template.get',
        [
            'id' => 143,
            'select' => [
                'id', 'title', 'description', 'creatorId', 'creator.name',
                'responsibleCollection', 'auditors', 'priority', 'deadlineAfterTs',
                'replicate', 'replicateParams', 'tags', 'permissions',
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
    res, err := client.Core().Call(ctx, "tasks.template.get", b24.Params{
    	"id": 143,
    	"select": []string{
    		"id", "title", "description", "creatorId", "creator.name",
    		"responsibleCollection", "auditors", "priority", "deadlineAfterTs",
    		"replicate", "replicateParams", "tags", "permissions",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var template struct {
    	ID        int    `json:"id"`
    	Title     string `json:"title"`
    	Priority  string `json:"priority"`
    	Replicate bool   `json:"replicate"`
    }
    if err := json.Unmarshal(raw, &template); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(template.ID, template.Title, template.Replicate)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 143,
            "title": "Ежемесячный отчет по продажам",
            "description": "Собрать данные о продажах за неделю",
            "creatorId": 1269,
            "creator": {
                "name": "Мария Иванова"
            },
            "responsibleCollection": [
                {
                    "id": 1269
                }
            ],
            "auditors": [
                {
                    "id": 29
                }
            ],
            "priority": "high",
            "deadlineAfterTs": 86400,
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
            "tags": [
                {
                    "id": 25,
                    "name": "отчет",
                    "ownerId": 1269
                }
            ],
            "permissions": [
                {
                    "id": 299,
                    "accessCode": "U29",
                    "permission": "read_only"
                }
            ]
        }
    },
    "time": {
        "start": 1795429349,
        "finish": 1795429349.223943,
        "duration": 0.22394299507141113,
        "processing": 0,
        "date_start": "2026-11-23T13:22:29+03:00",
        "date_finish": "2026-11-23T13:22:29+03:00",
        "operating_reset_at": 1795429380,
        "operating": 0.10017204284667969
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
[`object`](./fields-rest-v3.md#templatedto) | Объект с полями шаблона. Состав полей зависит от `select`. Поля со значением `null` в ответ не попадают. [Описание полей шаблона](./fields-rest-v3.md#templatedto) ||
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
|| `id` | Обязательное поле `id` не указано | Передайте идентификатор шаблона ||
|| `id` | В поле `id` требуется тип данных `integer` для такого запроса | Передайте положительное целое число ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `TemplateDto` | Укажите поля из таблицы [Объект шаблона](./fields-rest-v3.md#templatedto) ||
|| `select` | Неизвестное поле `foo` для сущности `UserDto` | Укажите поля [объекта пользователя](../fields-rest-v3.md#user) ||
|#

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_FIELDNOTSUPPORTEDEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Этот метод не поддерживает `subTemplateIds` | Уберите из `select` поля `parent`, `templateChildrenCount`, `subTemplateIds`. Дочерние шаблоны возвращает метод [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|| `select` | Этот метод не поддерживает `task.description` | У объекта `task` укажите только `task.id` или `task.title` ||
|| `select` | Этот метод не поддерживает `tags.taskId` | У объекта `tags` укажите `tags.id`, `tags.name` или `tags.ownerId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть доступ на просмотр шаблона. Права на шаблон возвращает метод [tasks.template.access.get](./tasks-template-access-get-rest-v3.md) ||
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

- [{#T}](./tasks-template-list-rest-v3.md)
- [{#T}](./tasks-template-update-rest-v3.md)
- [{#T}](./tasks-template-copy-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
- [{#T}](./tasks-template-access-get-rest-v3.md)
- [{#T}](./checklist/tasks-template-checklist-get-rest-v3.md)
- [{#T}](./tasks-template-get.md)
