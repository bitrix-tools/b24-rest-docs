# Получить список шаблонов задач v 3.0 tasks.template.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.list` возвращает список шаблонов задач, доступных текущему пользователю.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть. Названия полей совпадают с ключами [объекта шаблона](./fields-rest-v3.md#templatedto). Если `select` не задан, метод возвращает только `id`.

Вложенные объекты `tags`, `replicateParams`, `userFields` можно указать целиком или по полям через точку, например `replicateParams.period`. Поля постановщика указывайте через точку, например `creator.name`.

Только этот метод возвращает поля `templateChildrenCount` и `subTemplateIds`.

В `select` недоступны поля `permissions`, `crmItemIds`, `checklist`, `requireResult`, `checklistAutonumbering`, `parent` и связанные объекты `group`, `task`. Получите их методом [tasks.template.get](./tasks-template-get-rest-v3.md) ||
|| **filter**
[`array`](../../data-types.md) | Условия отбора в формате:
- `["field", "operator", value]`
- `["field", value]` — оператор `=`, для массива значений — `in`

Все условия объединяются логическим И. Группы с логикой `or` и отрицание `negative` метод не поддерживает.

Поля для фильтра: `id`, `title`, `creatorId`, `responsibleId`, `groupId`, `taskId`, `baseTemplateId`, `stageId`, `xmlId`, `priority`, `tParamType`, `replicate`, `tags`. Для `tags` передайте название тега строкой.

Операторы: `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`, `like`. Оператор `between` не поддерживается. Для `in` передайте массив значений.

[Подробнее о фильтрации в REST 3.0](../../rest-v3.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"field": "direction"}`.

Возможные направления:
- `asc` — по возрастанию
- `desc` — по убыванию

Поля для сортировки: `id`, `title`, `groupId`, `taskId`, `baseTemplateId`, `templateChildrenCount`, `stageId`, `tParamType`, `responsibleLastName`, `dependsOn`.

По умолчанию шаблоны сортируются по `id` по возрастанию ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации:
- `limit` — количество шаблонов на странице, больше `0`. По умолчанию `50`, максимум `1000`
- `offset` — смещение от начала списка, не меньше `0`
- `page` — номер страницы. Смещение вычисляется как `(page - 1) * limit`

Общее количество шаблонов метод не возвращает. Если на странице меньше записей, чем `limit`, это последняя страница ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","priority","replicate","templateChildrenCount"],"filter":[["title","like","%отчет%"],["creatorId","=",1269]],"order":{"id":"desc"},"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","title","priority","replicate","templateChildrenCount"],"filter":[["title","like","%отчет%"],["creatorId","=",1269]],"order":{"id":"desc"},"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.list
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
    type TemplateListResult = {
      items: Array<{
        id: number
        title: string
        priority: 'low' | 'average' | 'high'
        replicate: boolean
        templateChildrenCount: number
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateListResult>(
        'tasks.template.list',
        {
          select: ['id', 'title', 'priority', 'replicate', 'templateChildrenCount'],
          filter: [
            ['title', 'like', '%отчет%'],
            ['creatorId', '=', 1269],
          ],
          order: { id: 'desc' },
          pagination: { limit: 2 },
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(template => console.info(template.id, template.title))
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
      async function listTemplates() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.list',
            {
              select: ['id', 'title', 'priority', 'replicate', 'templateChildrenCount'],
              filter: [
                ['title', 'like', '%отчет%'],
                ['creatorId', '=', 1269],
              ],
              order: { id: 'desc' },
              pagination: { limit: 2 },
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(template => console.info(template.id, template.title))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplates)
    </script>
    ```

- Python

    Имя метода совпадает с методом прошлой версии `tasks.template.list`, а методы шаблонов REST 3.0 пока не входят в список новой версии в `b24pysdk`: обычный вызов SDK уйдет в предыдущую версию REST. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "title", "priority", "replicate", "templateChildrenCount"],
                "filter": [
                    ["title", "like", "%отчет%"],
                    ["creatorId", "=", 1269],
                ],
                "order": {"id": "desc"},
                "pagination": {"limit": 2},
            },
            prefer_version=3,
        )
        for template in response["result"]["items"]:
            print(template["id"], template["title"])
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
                'tasks.template.list',
                [
                    'select' => ['id', 'title', 'priority', 'replicate', 'templateChildrenCount'],
                    'filter' => [
                        ['title', 'like', '%отчет%'],
                        ['creatorId', '=', 1269],
                    ],
                    'order' => ['id' => 'desc'],
                    'pagination' => ['limit' => 2],
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
        'tasks.template.list',
        {
            select: ['id', 'title', 'priority', 'replicate', 'templateChildrenCount'],
            filter: [
                ['title', 'like', '%отчет%'],
                ['creatorId', '=', 1269],
            ],
            order: { id: 'desc' },
            pagination: { limit: 2 },
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
        'tasks.template.list',
        [
            'select' => ['id', 'title', 'priority', 'replicate', 'templateChildrenCount'],
            'filter' => [
                ['title', 'like', '%отчет%'],
                ['creatorId', '=', 1269],
            ],
            'order' => ['id' => 'desc'],
            'pagination' => ['limit' => 2],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.list", b24.Params{
    	"select": []string{"id", "title", "priority", "replicate", "templateChildrenCount"},
    	"filter": []any{
    		[]any{"title", "like", "%отчет%"},
    		[]any{"creatorId", "=", 1269},
    	},
    	"order":      map[string]string{"id": "desc"},
    	"pagination": map[string]int{"limit": 2},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.list: %w", err)
    }

    // Метод заворачивает список в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var templates []struct {
    	ID        int    `json:"id"`
    	Title     string `json:"title"`
    	Priority  string `json:"priority"`
    	Replicate bool   `json:"replicate"`
    }
    if err := json.Unmarshal(raw, &templates); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, t := range templates {
    	fmt.Println(t.ID, t.Title)
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
                "id": 153,
                "title": "Ежемесячный отчет по продажам",
                "templateChildrenCount": 0,
                "priority": "high",
                "replicate": false
            },
            {
                "id": 151,
                "title": "Ежедневный отчет",
                "templateChildrenCount": 0,
                "priority": "average",
                "replicate": false
            }
        ]
    },
    "time": {
        "start": 1795429693,
        "finish": 1795429693.652199,
        "duration": 0.6521990299224854,
        "processing": 0,
        "date_start": "2026-11-23T13:28:13+03:00",
        "date_finish": "2026-11-23T13:28:13+03:00",
        "operating_reset_at": 1795429740,
        "operating": 1.2517759799957275
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
[`array`](./fields-rest-v3.md#templatedto) | Массив шаблонов. Состав полей каждого шаблона зависит от `select`. Поля со значением `null` в ответ не попадают. [Описание полей шаблона](./fields-rest-v3.md#templatedto) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION",
        "message": "Не удается распознать параметр пагинации `{\"limit\":0}`"
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
|| `description` | В DTO `TemplateDto` в поле `description` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям из описания параметра `filter` ||
|| `priority` | В DTO `TemplateDto` в поле `priority` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям из описания параметра `order` ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте в условии значение того типа, что у поля в [объекте шаблона](./fields-rest-v3.md#templatedto) ||
|#

#### Неизвестное поле

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter` | Неизвестное поле `foo` для сущности `TemplateDto` | Укажите поля из таблицы [Объект шаблона](./fields-rest-v3.md#templatedto) ||
|#

#### Неподдерживаемое поле или условие

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_FIELDNOTSUPPORTEDEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Этот метод не поддерживает `permissions` | Уберите из `select` поля, недоступные в списке, и получите их методом [tasks.template.get](./tasks-template-get-rest-v3.md) ||
|| `select` | Этот метод не поддерживает `group` | Связанные объекты `group` и `task` запрашивайте методом [tasks.template.get](./tasks-template-get-rest-v3.md) ||
|| `filter` | Этот метод не поддерживает `id` | Ошибка возникает на группу условий с `logic: "or"`, на `negative: true` и на оператор `between`. Передайте плоский список условий, а диапазон задайте двумя условиями `>=` и `<=` ||
|| `filter` | Этот метод не поддерживает `priority` | Для `priority` и `tParamType` передайте значение из списка, например `high` или `usual` ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `xx` | Используйте операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`, `like` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Operator "in" requires an array value.` | Для оператора `in` передайте массив значений, например `["id", "in", [1, 3]]` ||
|#

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше `0` ||
|| `pagination` | Не удается распознать параметр пагинации `{"offset":-1}` | Передайте `offset` не меньше `0` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-add-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
- [{#T}](./relation/tasks-template-relation-child-list-rest-v3.md)
- [{#T}](./tasks-template-list.md)
- [{#T}](../../rest-v3.md)
