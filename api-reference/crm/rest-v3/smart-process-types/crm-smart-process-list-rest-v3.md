# Получить список типов смарт-процессов v 3.0 crm.smartprocess.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь. Метод возвращает только типы, к которым у пользователя есть доступ

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.smartprocess.list` возвращает типы смарт-процессов с фильтром, сортировкой и постраничной навигацией.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть для каждого типа. [Описание параметра](#select)

Если параметр не передан, метод возвращает все поля ||
|| **filter**
[`array`](../../../data-types.md) | Условия отбора типов в формате REST 3.0. [Описание параметра](#filter)

Если параметр не передан, метод возвращает все доступные типы ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. [Описание параметра](#order)

По умолчанию — по возрастанию `entityTypeId` ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации. [Описание параметра](#pagination)

Если параметр не передан, метод возвращает первые 50 типов ||
|#

Тип попадает в ответ, если пользователь — администратор CRM или администратор этого смарт-процесса, может читать элементы типа хотя бы в одной воронке или может управлять смарт-процессами. Остальные типы метод пропускает без ошибки.

Имя метода пишется в нижнем регистре: `crm.smartprocess.list`. На имя `crm.smartProcess.list` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

### Параметр select {#select}

Поля типа описаны на странице метода [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md#item).

Без `select` метод возвращает все поля, в том числе связи `relations`, привязки `linkedUserFields` и цифровые рабочие места `customSectionIds`. Если `select` передан, вложенные объекты приходят, только когда они перечислены в нем. Поле `entityTypeId` само не добавляется: перечислите его явно.

Из вложенных объектов можно выбрать часть полей путем через точку:

- `relations.parent` — только родительские связи
- `relations.parent.entityTypeId` — только идентификаторы родительских типов
- ```linkedUserFields.TASKS_TASK|UF_CRM_TASK``` — только признак для задач

`select` можно передать строкой с одним полем: `"select": "entityTypeId"`. На неизвестное поле, включая устаревшие `customSectionId` и `customSections`, метод отвечает [ошибкой](#unknown-field).

### Параметр filter {#filter}

Фильтр — массив условий. Метод соединяет условия массива логикой И. Условие записывается в формате `["поле", "оператор", значение]`, например `["isClientEnabled", "=", true]`.

Фильтровать можно по всем полям типа, кроме `description`, `customSectionIds`, `relations` и `linkedUserFields`. Операторы:

- `=`, `!=` — для всех полей
- `>`, `>=`, `<`, `<=` — для чисел и дат
- `in` — значение из списка, например `["entityTypeId", "in", [156, 1038]]`
- `between` — диапазон из двух значений, например `["entityTypeId", "between", [160, 180]]`

Что делает каждый оператор, описано в [обзоре REST 3.0](../../../rest-v3.md#operators). Искать по части названия нельзя: оператора `like` нет.

Значение должно соответствовать типу поля: `true` или `false` для признаков `is…`, число для `entityTypeId`, строка для `title` и `code`, дата в формате ISO 8601 для `createdTime` и `updatedTime`, например `"2025-01-01T00:00:00+03:00"`. Значение `"Y"` для признака или `null` для `primaryCustomSectionId` вызывает ошибку валидации. Типы без цифрового рабочего места условия по `primaryCustomSectionId` не проходят, в том числе условие `!=`.

Чтобы соединить условия логикой ИЛИ, передайте группу — объект с ключами:

- `type` — значение `filter`
- `logic` — `and` или `or`, по умолчанию `and`
- `negative` — `true` отбирает типы, для которых условие группы не выполнено
- `conditions` — массив условий и вложенных групп

Пример: тип `156` или типы, созданные после 1 января 2025 года.

```json
{
    "filter": [
        {
            "type": "filter",
            "logic": "or",
            "conditions": [
                ["entityTypeId", "=", 156],
                ["createdTime", ">", "2025-01-01T00:00:00+03:00"]
            ]
        }
    ]
}
```

{% note warning "" %}

Условие `in` с пустым списком, например `["entityTypeId", "in", []]`, метод не применяет и возвращает все типы.

{% endnote %}

### Параметр order {#order}

Объект, где ключ — имя поля, а значение — направление сортировки:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Сортировать можно по тем же полям, что и фильтровать. Если `order` не передан или в нем нет `entityTypeId`, метод добавляет сортировку по возрастанию `entityTypeId`.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество типов на странице. При значении больше `1000` метод вернет не больше 1000 типов. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество типов, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

Ответ не содержит общего количества типов. Если на странице вернулось меньше типов, чем указано в `limit`, это последняя страница.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess.list`

{% endnote %}

Примеры получают первые три типа смарт-процессов с включенным полем «Клиент»: идентификатор, название и признаки воронок и стадий.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["entityTypeId","title","isCategoriesEnabled","isStagesEnabled"],"filter":[["isClientEnabled","=",true]],"order":{"entityTypeId":"ASC"},"pagination":{"limit":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["entityTypeId","title","isCategoriesEnabled","isStagesEnabled"],"filter":[["isClientEnabled","=",true]],"order":{"entityTypeId":"ASC"},"pagination":{"limit":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SmartProcessListResult = {
      items: {
        entityTypeId: number
        title: string
        isCategoriesEnabled: boolean
        isStagesEnabled: boolean
      }[]
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<SmartProcessListResult>(
        'crm.smartprocess.list',
        {
          select: ['entityTypeId', 'title', 'isCategoriesEnabled', 'isStagesEnabled'],
          filter: [
            ['isClientEnabled', '=', true],
          ],
          order: {
            entityTypeId: 'ASC',
          },
          pagination: {
            limit: 3,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Smart process types:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listSmartProcessTypes() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess.list',
            {
              select: ['entityTypeId', 'title', 'isCategoriesEnabled', 'isStagesEnabled'],
              filter: [
                ['isClientEnabled', '=', true],
              ],
              order: {
                entityTypeId: 'ASC',
              },
              pagination: {
                limit: 3,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Smart process types:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listSmartProcessTypes)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["entityTypeId", "title", "isCategoriesEnabled", "isStagesEnabled"],
                "filter": [
                    ["isClientEnabled", "=", True],
                ],
                "order": {"entityTypeId": "ASC"},
                "pagination": {"limit": 3},
            },
            prefer_version=3,
        )
        for item in response["result"]["items"]:
            print(item["entityTypeId"], item["title"])
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
                'crm.smartprocess.list',
                [
                    'select' => ['entityTypeId', 'title', 'isCategoriesEnabled', 'isStagesEnabled'],
                    'filter' => [
                        ['isClientEnabled', '=', true],
                    ],
                    'order' => [
                        'entityTypeId' => 'ASC',
                    ],
                    'pagination' => [
                        'limit' => 3,
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
        'crm.smartprocess.list',
        {
            select: ['entityTypeId', 'title', 'isCategoriesEnabled', 'isStagesEnabled'],
            filter: [
                ['isClientEnabled', '=', true],
            ],
            order: {
                entityTypeId: 'ASC',
            },
            pagination: {
                limit: 3,
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
        'crm.smartprocess.list',
        [
            'select' => ['entityTypeId', 'title', 'isCategoriesEnabled', 'isStagesEnabled'],
            'filter' => [
                ['isClientEnabled', '=', true],
            ],
            'order' => [
                'entityTypeId' => 'ASC',
            ],
            'pagination' => [
                'limit' => 3,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess.list", b24.Params{
    	"select": []string{"entityTypeId", "title", "isCategoriesEnabled", "isStagesEnabled"},
    	"filter": []any{
    		[]any{"isClientEnabled", "=", true},
    	},
    	"order": b24.Params{
    		"entityTypeId": "ASC",
    	},
    	"pagination": b24.Params{
    		"limit": 3,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	EntityTypeID        int    `json:"entityTypeId"`
    	Title               string `json:"title"`
    	IsCategoriesEnabled bool   `json:"isCategoriesEnabled"`
    	IsStagesEnabled     bool   `json:"isStagesEnabled"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.EntityTypeID, it.Title)
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
                "entityTypeId": 156,
                "title": "Закупка",
                "isCategoriesEnabled": true,
                "isStagesEnabled": true
            },
            {
                "entityTypeId": 174,
                "title": "Согласование договоров",
                "isCategoriesEnabled": true,
                "isStagesEnabled": true
            },
            {
                "entityTypeId": 177,
                "title": "Закупка оборудования",
                "isCategoriesEnabled": true,
                "isStagesEnabled": true
            }
        ]
    },
    "time": {
        "start": 1795431330,
        "finish": 1795431330.658235,
        "duration": 0.6582350730895996,
        "processing": 0,
        "date_start": "2026-11-23T13:55:30+03:00",
        "date_finish": "2026-11-23T13:55:30+03:00",
        "operating_reset_at": 1795431900,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../../data-types.md) | Массив типов смарт-процессов текущей страницы. Если под фильтр ничего не подходит или страница за пределами списка, массив пустой ||
|| **result.items[]**
[`object`](./crm-smart-process-get-rest-v3.md#item) | Тип смарт-процесса. Состав полей задает параметр `select`. [Описание полей](./crm-smart-process-get-rest-v3.md#item) ||
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
                "message": "В поле `isClientEnabled` требуется тип данных `bool` для такого запроса",
                "field": "isClientEnabled"
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
|| `isClientEnabled` | В поле `isClientEnabled` требуется тип данных `bool` для такого запроса | Передайте в условии фильтра значение типа поля: `true` или `false`, а не `"Y"` ||
|| `primaryCustomSectionId` | В поле `primaryCustomSectionId` требуется тип данных `int` для такого запроса | Передайте число. Сравнение с `null` фильтр не поддерживает ||
|| `description` | В DTO `SmartProcessDto` в поле `description` требуется наличие атрибута `Filterable` для такого запроса | Поле не участвует в фильтре. Поля для фильтра — в разделе [Параметр filter](#filter) ||
|| `description` | В DTO `SmartProcessDto` в поле `description` требуется наличие атрибута `Sortable` для такого запроса | Поле не участвует в сортировке. Поля для сортировки — в разделе [Параметр order](#order) ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, а не строкой или числом ||
|| `-` | Не удается распознать выражение фильтра `Operator ">" cannot be used for dto field "title" with type string.` | Для строковых полей используйте `=`, `!=` или `in` ||
|#

#### Неизвестный оператор фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `like` | Используйте операторы из раздела [Параметр filter](#filter). Оператора `like` нет ||
|#

#### Ошибка неизвестного поля {#unknown-field}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `SmartProcessDto` | Проверьте имя поля в `select`, `filter` или `order` по [описанию полей типа](./crm-smart-process-get-rest-v3.md#item) ||
|| `-` | Неизвестное поле `foo` для сущности `SmartProcessRelationsDto` | Во вложенном пути через точку указано неизвестное поле. У `relations` есть только `parent` и `child` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `UP` | Передайте `order` объектом с направлением `ASC` или `DESC`, например `{"title":"DESC"}` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` положительное число, в `offset` — неотрицательное ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartProcess.list` не найден | Напишите имя метода в нижнем регистре: `crm.smartprocess.list` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-smart-process-get-rest-v3.md)
- [{#T}](./crm-smart-process-add-rest-v3.md)
- [{#T}](./crm-smart-process-field-list-rest-v3.md)
- [{#T}](../items/crm-entity-list-rest-v3.md)
