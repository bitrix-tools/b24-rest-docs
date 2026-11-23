# Получить список связанных задач шаблона v 3.0 tasks.template.relation.related.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `tasks.template.relation.related.list` возвращает задачи, связанные с шаблоном, с постраничной навигацией.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона.

Идентификатор шаблона можно получить при [создании шаблона](../tasks-template-add-rest-v3.md) или методом [получения списка шаблонов](../tasks-template-list-rest-v3.md) ||
|| **select**
[`string[]`](../../../data-types.md) | Поля задач, которые нужно вернуть. Если `select` не передан, метод возвращает все поля из списка ниже.

Возможные значения:

- `id` — идентификатор задачи
- `title` — название задачи
- `responsibleId` — идентификатор ответственного
- `responsible` — объект ответственного
- `deadline` — крайний срок
- `status` — статус задачи
- `groupId` — идентификатор группы или проекта
- `group` — объект группы или проекта
- `allowsChangeDeadline` — разрешает ли задача ответственному менять крайний срок
- `activity` — дата последней активности
- `changed` — дата изменения

Для полей объектов `responsible` и `group` используйте путь через точку, например `["title","responsible.name"]`. Подробное описание полей — в [описании объекта задачи](../../fields-rest-v3.md#taskdto) ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации:

- `page` — номер страницы
- `limit` — количество задач на странице, по умолчанию `50`, максимум `1000`
- `offset` — смещение от начала списка. Если переданы `page` и `limit`, смещение вычисляется автоматически ||
|#

{% note info "" %}

Метод не поддерживает параметры `filter` и `order`: с ними метод вернет ошибку. Поле `id` возвращается всегда, даже если его нет в `select`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.relation.related.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":117,"select":["title","status","deadline","responsible.name"],"pagination":{"page":1,"limit":20}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.relation.related.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":117,"select":["title","status","deadline","responsible.name"],"pagination":{"page":1,"limit":20},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.relation.related.list
    ```

- JS (TS)

    Методы `tasks.template.relation.*` пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type RelatedListResult = {
      items: Array<{
        id: number
        title: string
        status: string
        deadline: ISODate | null
        responsible: {
          name: string
        }
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RelatedListResult>(
        'tasks.template.relation.related.list',
        {
          templateId: 117,
          select: ['title', 'status', 'deadline', 'responsible.name'],
          pagination: {
            page: 1,
            limit: 20,
          },
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        for (const item of result.items) {
          console.info(item.id, item.title, item.status, item.responsible.name)
        }
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы `tasks.template.relation.*` пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getRelatedTasks() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.relation.related.list',
            {
              templateId: 117,
              select: ['title', 'status', 'deadline', 'responsible.name'],
              pagination: {
                page: 1,
                limit: 20,
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
          result.items.forEach(item => console.info(item.id, item.title, item.status, item.responsible.name))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getRelatedTasks)
    </script>
    ```

- Python

    У методов `tasks.template.relation.*` нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.relation.related.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 117,
                "select": ["title", "status", "deadline", "responsible.name"],
                "pagination": {
                    "page": 1,
                    "limit": 20,
                },
            },
            prefer_version=3,
        )
        for item in response["result"]["items"]:
            print(item["id"], item["title"], item["status"], item["responsible"]["name"])
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
                'tasks.template.relation.related.list',
                [
                    'templateId' => 117,
                    'select' => ['title', 'status', 'deadline', 'responsible.name'],
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
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
        'tasks.template.relation.related.list',
        {
            templateId: 117,
            select: ['title', 'status', 'deadline', 'responsible.name'],
            pagination: {
                page: 1,
                limit: 20,
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
        'tasks.template.relation.related.list',
        [
            'templateId' => 117,
            'select' => ['title', 'status', 'deadline', 'responsible.name'],
            'pagination' => [
                'page' => 1,
                'limit' => 20,
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
    res, err := client.Core().Call(ctx, "tasks.template.relation.related.list", b24.Params{
    	"templateId": 117,
    	"select":     []string{"title", "status", "deadline", "responsible.name"},
    	"pagination": map[string]int{"page": 1, "limit": 20},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.relation.related.list: %w", err)
    }

    var out struct {
    	Items []struct {
    		ID          int    `json:"id"`
    		Title       string `json:"title"`
    		Status      string `json:"status"`
    		Deadline    string `json:"deadline"`
    		Responsible struct {
    			Name string `json:"name"`
    		} `json:"responsible"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range out.Items {
    	fmt.Println(item.ID, item.Title, item.Status, item.Responsible.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ответ на запрос из примера:

```json
{
    "result": {
        "items": [
            {
                "id": 4401,
                "title": "Согласовать план адаптации",
                "responsible": {
                    "name": "Анна Петрова"
                },
                "deadline": "2026-11-30T22:00:00+03:00",
                "status": "pending"
            },
            {
                "id": 4399,
                "title": "Подготовить приказ о приеме",
                "responsible": {
                    "name": "Анна Петрова"
                },
                "deadline": "2026-11-30T22:00:00+03:00",
                "status": "pending"
            }
        ]
    },
    "time": {
        "start": 1795429118,
        "finish": 1795429118.215197,
        "duration": 0.21519708633422852,
        "processing": 0,
        "date_start": "2026-11-23T13:18:38+03:00",
        "date_finish": "2026-11-23T13:18:38+03:00",
        "operating_reset_at": 1795429680,
        "operating": 0
    }
}
```

Ответ без `select` содержит все поля задачи:

```json
{
    "result": {
        "items": [
            {
                "id": 4401,
                "title": "Согласовать план адаптации",
                "responsibleId": 1269,
                "responsible": {
                    "id": 1269,
                    "name": "Анна Петрова",
                    "role": null,
                    "image": {
                        "id": null,
                        "src": "https://cdn-ru.bitrix24.ru/b13743910/resize_cache/32741/45a41af90f4a8f8ae94152f60a6ec694/main/bd3/bd36722eacdbe1263e452943ce21a820/normal.jpg.png",
                        "name": null,
                        "width": 100,
                        "height": 100,
                        "size": 24131,
                        "subDir": null,
                        "contentType": null,
                        "file": null
                    },
                    "gender": "F",
                    "email": "",
                    "externalAuthId": null,
                    "rights": []
                },
                "deadline": "2026-11-30T22:00:00+03:00",
                "groupId": null,
                "group": null,
                "status": "pending",
                "changed": "2026-11-23T13:16:44+03:00",
                "activity": "2026-11-23T13:16:44+03:00",
                "allowsChangeDeadline": false
            }
        ]
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит массив `items` ||
|| **items**
[`object[]`](../../../data-types.md) | Массив связанных задач шаблона [(подробное описание)](#items). Если связанных задач нет, массив пустой ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор задачи ||
|| **title**
[`string`](../../../data-types.md) | Название задачи ||
|| **responsibleId**
[`integer`](../../../data-types.md) | Идентификатор ответственного ||
|| **responsible**
[`object`](../../fields-rest-v3.md#user) | Ответственный, объект типа [пользователь](../../fields-rest-v3.md#user) ||
|| **deadline**
[`datetime`](../../../data-types.md) | Крайний срок в формате ISO 8601. `null`, если срок не задан ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы или проекта. `null`, если задача не в группе ||
|| **group**
[`object`](../../fields-rest-v3.md#group) | Группа или проект, объект типа [группа](../../fields-rest-v3.md#group). `null`, если задача не в группе ||
|| **status**
[`string`](../../../data-types.md) | Статус задачи. Возможные значения:

- `pending` — ждет выполнения
- `in_progress` — выполняется
- `supposedly_completed` — ожидает контроля
- `completed` — завершена
- `deferred` — отложена
- `declined` — отклонена ||
|| **changed**
[`datetime`](../../../data-types.md) | Дата изменения в формате ISO 8601 ||
|| **activity**
[`datetime`](../../../data-types.md) | Дата последней активности в формате ISO 8601 ||
|| **allowsChangeDeadline**
[`boolean`](../../../data-types.md) | Разрешает ли задача ответственному менять крайний срок:

- `true` — разрешает
- `false` — не разрешает ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_FIELDNOTSUPPORTEDEXCEPTION",
        "message": "Этот метод не поддерживает `priority`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

HTTP-статус: **400**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId` | Обязательное поле `templateId` не указано | Добавьте `templateId` в тело запроса ||
|| `templateId` | В поле `templateId` требуется тип данных `int` для такого запроса | Передайте идентификатор числом, а не строкой ||
|#

#### Параметр не поддерживается

HTTP-статус: **400**

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_FIELDNOTSUPPORTEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Этот метод не поддерживает `filter` | Уберите `filter` из запроса ||
|| `order` | Этот метод не поддерживает `order` | Уберите `order` из запроса ||
|| `select` | Этот метод не поддерживает `priority` | Оставьте в `select` только поля из описания параметра `select` ||
|#

#### Ошибка постраничной навигации

HTTP-статус: **400**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше нуля, `offset` не меньше нуля и `page` числом ||
|#

#### Шаблон не найден

HTTP-статус: **404**

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId` | Запись с ID = `999999` не найдена | Проверьте идентификатор методом [tasks.template.get](../tasks-template-get-rest-v3.md). Удаленный шаблон метод считает ненайденным ||
|#

#### Ошибка доступа

HTTP-статус: **403**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право чтения шаблона из `templateId` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-relation-related-add-rest-v3.md)
- [{#T}](./tasks-template-relation-related-delete-rest-v3.md)
- [{#T}](./tasks-template-relation-related-list-by-ids-rest-v3.md)
- [{#T}](../../fields-rest-v3.md)
