# Получить список дочерних шаблонов v 3.0 tasks.template.relation.child.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения родительского шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `tasks.template.relation.child.list` возвращает дочерние шаблоны шаблона с постраничной навигацией.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор родительского шаблона.

Идентификатор шаблона можно получить при [создании шаблона](../tasks-template-add-rest-v3.md) или методом [получения списка шаблонов](../tasks-template-list-rest-v3.md) ||
|| **select**
[`string[]`](../../../data-types.md) | Поля дочерних шаблонов, которые нужно вернуть. Если `select` не передан, метод возвращает только `id`.

Возможные значения:

- `id` — идентификатор шаблона
- `title` — название шаблона
- `responsibleId` — идентификатор ответственного
- `responsibleCollection` — список ответственных, каждый элемент — объект с ключом `id`
- `deadlineAfterTs` — через сколько секунд после создания задачи по шаблону наступит ее срок
- `matchesWorkTime` — признак учета рабочего времени при расчете сроков
- `tParamType` — тип шаблона
- `subTemplateIds` — идентификаторы дочерних шаблонов следующего уровня

Подробное описание полей — в [описании объекта шаблона](../fields-rest-v3.md#templatedto) ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации:

- `page` — номер страницы
- `limit` — количество шаблонов на странице, по умолчанию `50`, максимум `1000`
- `offset` — смещение от начала списка. Если переданы `page` и `limit`, смещение вычисляется автоматически ||
|#

{% note info "" %}

Метод возвращает только дочерние шаблоны первого уровня и не поддерживает параметры `filter` и `order`: с ними метод вернет ошибку. Если в `select` есть другие поля, включайте в него `id` — иначе идентификатор шаблона не вернется. Поле `deadlineAfterTs` не попадает в ответ, если срок у шаблона не задан.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.relation.child.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":117,"select":["id","title","responsibleId","deadlineAfterTs","subTemplateIds"],"pagination":{"page":1,"limit":20}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.relation.child.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":117,"select":["id","title","responsibleId","deadlineAfterTs","subTemplateIds"],"pagination":{"page":1,"limit":20},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.relation.child.list
    ```

- JS (TS)

    Методы `tasks.template.relation.*` пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ChildListResult = {
      items: Array<{
        id: number
        title?: string
        responsibleId?: number
        deadlineAfterTs?: number
        subTemplateIds?: number[]
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ChildListResult>(
        'tasks.template.relation.child.list',
        {
          templateId: 117,
          select: ['id', 'title', 'responsibleId', 'deadlineAfterTs', 'subTemplateIds'],
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
          console.info(item.id, item.title, item.subTemplateIds)
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
      async function getChildTemplates() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.relation.child.list',
            {
              templateId: 117,
              select: ['id', 'title', 'responsibleId', 'deadlineAfterTs', 'subTemplateIds'],
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
          result.items.forEach(item => console.info(item.id, item.title, item.subTemplateIds))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getChildTemplates)
    </script>
    ```

- Python

    У методов `tasks.template.relation.*` нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.relation.child.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 117,
                "select": ["id", "title", "responsibleId", "deadlineAfterTs", "subTemplateIds"],
                "pagination": {
                    "page": 1,
                    "limit": 20,
                },
            },
            prefer_version=3,
        )
        for item in response["result"]["items"]:
            print(item["id"], item.get("title"), item.get("subTemplateIds"))
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
                'tasks.template.relation.child.list',
                [
                    'templateId' => 117,
                    'select' => ['id', 'title', 'responsibleId', 'deadlineAfterTs', 'subTemplateIds'],
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
        'tasks.template.relation.child.list',
        {
            templateId: 117,
            select: ['id', 'title', 'responsibleId', 'deadlineAfterTs', 'subTemplateIds'],
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
        'tasks.template.relation.child.list',
        [
            'templateId' => 117,
            'select' => ['id', 'title', 'responsibleId', 'deadlineAfterTs', 'subTemplateIds'],
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
    res, err := client.Core().Call(ctx, "tasks.template.relation.child.list", b24.Params{
    	"templateId": 117,
    	"select":     []string{"id", "title", "responsibleId", "deadlineAfterTs", "subTemplateIds"},
    	"pagination": map[string]int{"page": 1, "limit": 20},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.relation.child.list: %w", err)
    }

    var out struct {
    	Items []struct {
    		ID              int    `json:"id"`
    		Title           string `json:"title"`
    		ResponsibleID   int    `json:"responsibleId"`
    		DeadlineAfterTs int    `json:"deadlineAfterTs"`
    		SubTemplateIDs  []int  `json:"subTemplateIds"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range out.Items {
    	fmt.Println(item.ID, item.Title, item.SubTemplateIDs)
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
                "id": 119,
                "title": "Подготовить рабочее место",
                "responsibleId": 1269,
                "deadlineAfterTs": 86400,
                "subTemplateIds": [
                    121
                ]
            },
            {
                "id": 123,
                "title": "Выдать доступы",
                "responsibleId": 1269,
                "subTemplateIds": []
            }
        ]
    },
    "time": {
        "start": 1795429168,
        "finish": 1795429168.258815,
        "duration": 0.25881505012512207,
        "processing": 0,
        "date_start": "2026-11-23T13:19:28+03:00",
        "date_finish": "2026-11-23T13:19:28+03:00",
        "operating_reset_at": 1795429740,
        "operating": 0
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
[`object[]`](../../../data-types.md) | Массив дочерних шаблонов. Каждый элемент содержит поля из `select` [(подробное описание)](#items). Если дочерних шаблонов нет, массив пустой ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор дочернего шаблона ||
|| **title**
[`string`](../../../data-types.md) | Название шаблона ||
|| **responsibleId**
[`integer`](../../../data-types.md) | Идентификатор ответственного ||
|| **responsibleCollection**
[`object[]`](../../../data-types.md) | Список ответственных, каждый элемент — объект с ключом `id` ||
|| **deadlineAfterTs**
[`integer`](../../../data-types.md) | Через сколько секунд после создания задачи по шаблону наступит ее срок. Не возвращается, если срок не задан ||
|| **matchesWorkTime**
[`boolean`](../../../data-types.md) | Признак учета рабочего времени при расчете сроков:

- `true` — сроки считаются по рабочему времени без выходных и праздников
- `false` — сроки считаются по календарному времени ||
|| **tParamType**
[`string`](../../../data-types.md) | Тип шаблона:

- `usual` — обычный шаблон
- `new_users` — шаблон для нового сотрудника ||
|| **subTemplateIds**
[`integer[]`](../../../data-types.md) | Идентификаторы дочерних шаблонов следующего уровня. Пустой массив, если их нет ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_FIELDNOTSUPPORTEDEXCEPTION",
        "message": "Этот метод не поддерживает `filter`"
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
|| `select` | Этот метод не поддерживает `description` | Оставьте в `select` только поля из описания параметра `select` ||
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

- [{#T}](./tasks-template-relation-child-add-rest-v3.md)
- [{#T}](./tasks-template-relation-child-delete-rest-v3.md)
- [{#T}](./tasks-template-relation-child-ids-rest-v3.md)
- [{#T}](./tasks-template-relation-child-list-by-ids-rest-v3.md)
- [{#T}](../fields-rest-v3.md)
