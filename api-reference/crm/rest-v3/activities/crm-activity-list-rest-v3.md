# Получить список дел v 3.0 crm.activity.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор Битрикс24

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.activity.list` возвращает дела всего Битрикс24 с фильтром, сортировкой и постраничной навигацией. Метод предназначен для выгрузки и синхронизации, поэтому права на отдельные дела не проверяет и доступен только администратору Битрикс24. Администратор CRM без прав администратора Битрикс24 получит ошибку доступа.

В список попадают и дела, которые [crm.activity.get](./crm-activity-get-rest-v3.md) не отдает, например дела документов и обзвонов. Дела одного элемента для любого пользователя с правом на элемент возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0 — массив условий вида `["поле", "оператор", "значение"]`, например `[["isCompleted","=",false]]`. Чтобы получить дела одного элемента, передайте объект с привязкой. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей дела, которые нужно вернуть, например `["id","subject","deadlineTime"]`. Доступные поля описаны в [обзоре методов дел](./index.md#fields). Для `bindings` и `communications` можно выбрать вложенные поля через точку: `bindings.entityId`.

По умолчанию: все поля дела ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `{"id": "asc"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание параметра](#pagination) ||
|#

### Параметр filter {#filter}

Фильтр принимает два формата.

**Массив условий.** Обычный фильтр REST 3.0: `[["providerId","=","CRM_TODO"],["isCompleted","=",false]]`. Фильтровать можно по `id`, `type`, `providerId`, `providerTypeId`, `isCompleted`, `assignedById`, `direction`, `createdTime`, `updatedTime`, `startTime`, `deadlineTime`. Синтаксис и операторы — в [обзоре REST 3.0](../../../rest-v3.md#filter).

**Объект с привязкой.** Дела, привязанные к одному элементу CRM, и условия к ним:

```json
{
    "binding": {
        "entityTypeId": 1038,
        "entityId": 41
    },
    "conditions": [
        ["isCompleted", "=", false]
    ]
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **binding***
[`object`](../../../data-types.md) | Элемент CRM: `entityTypeId` — идентификатор типа объекта, `entityId` — идентификатор элемента. Оба значения — положительные целые числа ||
|| **conditions**
[`array`](../../../data-types.md) | Условия в формате массива, объединяются с привязкой по И ||
|#

Других ключей в объекте быть не должно. Поля `ownerId` и `ownerTypeId` в фильтре не поддерживаются: элемент задается только через `binding`.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество дел на странице. Значения больше `200` уменьшаются до `200`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество дел, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества дел. Если на странице вернулось меньше дел, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.list`

{% endnote %}

Примеры получают незавершенные дела элемента смарт-процесса с идентификатором типа `1038` и идентификатором `41`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"binding":{"entityTypeId":1038,"entityId":41},"conditions":[["isCompleted","=",false]]},"select":["id","subject","isCompleted","deadlineTime"],"order":{"id":"desc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"binding":{"entityTypeId":1038,"entityId":41},"conditions":[["isCompleted","=",false]]},"select":["id","subject","isCompleted","deadlineTime"],"order":{"id":"desc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ActivityListResult = {
      items: Array<{
        id: number
        subject: string
        isCompleted: boolean
        deadlineTime: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ActivityListResult>(
        'crm.activity.list',
        {
          filter: {
            binding: {
              entityTypeId: 1038,
              entityId: 41,
            },
            conditions: [
              ['isCompleted', '=', false],
            ],
          },
          select: ['id', 'subject', 'isCompleted', 'deadlineTime'],
          order: {
            id: 'desc',
          },
          pagination: {
            limit: 50,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Activities:', result.items)
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
      async function listActivities() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.list',
            {
              filter: {
                binding: {
                  entityTypeId: 1038,
                  entityId: 41,
                },
                conditions: [
                  ['isCompleted', '=', false],
                ],
              },
              select: ['id', 'subject', 'isCompleted', 'deadlineTime'],
              order: {
                id: 'desc',
              },
              pagination: {
                limit: 50,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Activities:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listActivities)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": {
                    "binding": {
                        "entityTypeId": 1038,
                        "entityId": 41,
                    },
                    "conditions": [
                        ["isCompleted", "=", False],
                    ],
                },
                "select": ["id", "subject", "isCompleted", "deadlineTime"],
                "order": {
                    "id": "desc",
                },
                "pagination": {
                    "limit": 50,
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
                'crm.activity.list',
                [
                    'filter' => [
                        'binding' => [
                            'entityTypeId' => 1038,
                            'entityId' => 41,
                        ],
                        'conditions' => [
                            ['isCompleted', '=', false],
                        ],
                    ],
                    'select' => ['id', 'subject', 'isCompleted', 'deadlineTime'],
                    'order' => [
                        'id' => 'desc',
                    ],
                    'pagination' => [
                        'limit' => 50,
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
        'crm.activity.list',
        {
            filter: {
                binding: {
                    entityTypeId: 1038,
                    entityId: 41,
                },
                conditions: [
                    ['isCompleted', '=', false],
                ],
            },
            select: ['id', 'subject', 'isCompleted', 'deadlineTime'],
            order: {
                id: 'desc',
            },
            pagination: {
                limit: 50,
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
        'crm.activity.list',
        [
            'filter' => [
                'binding' => [
                    'entityTypeId' => 1038,
                    'entityId' => 41,
                ],
                'conditions' => [
                    ['isCompleted', '=', false],
                ],
            ],
            'select' => ['id', 'subject', 'isCompleted', 'deadlineTime'],
            'order' => [
                'id' => 'desc',
            ],
            'pagination' => [
                'limit' => 50,
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
    res, err := client.Core().Call(ctx, "crm.activity.list", b24.Params{
    	"filter": b24.Params{
    		"binding": b24.Params{
    			"entityTypeId": 1038,
    			"entityId":     41,
    		},
    		"conditions": []any{
    			[]any{"isCompleted", "=", false},
    		},
    	},
    	"select": []string{"id", "subject", "isCompleted", "deadlineTime"},
    	"order": b24.Params{
    		"id": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID           int     `json:"id"`
    		Subject      string  `json:"subject"`
    		IsCompleted  bool    `json:"isCompleted"`
    		DeadlineTime *string `json:"deadlineTime"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Subject, item.IsCompleted)
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
                "id": 8463,
                "subject": "Перезвонить клиенту",
                "isCompleted": false,
                "deadlineTime": "2026-11-20T18:00:00+03:00"
            }
        ]
    },
    "time": {
        "start": 1793711360,
        "finish": 1793711360.764732,
        "duration": 0.7647318840026855,
        "processing": 0,
        "date_start": "2026-11-03T16:09:20+03:00",
        "date_finish": "2026-11-03T16:09:20+03:00",
        "operating_reset_at": 1793711940,
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
[`object[]`](../../../data-types.md) | Массив дел с полями из `select`, без `select` — со всеми полями. [Описание полей дела](./index.md#fields) ||
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
                "message": "crm.activity.list takes no ownerId: narrow it by filter.binding.",
                "field": "ownerId"
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
|| `ownerId` | crm.activity.list takes no ownerId: narrow it by filter.binding. | Уберите `ownerId` из запроса и передайте элемент в `filter.binding` ||
|| `binding.entityId` | В поле `binding.entityId` требуется тип данных `positive int` для такого запроса | Передайте `entityTypeId` и `entityId` положительными целыми числами ||
|| `subject` | В DTO `ActivityDto` в поле `subject` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям с отметкой в колонке «Фильтр» [таблицы полей](./index.md#fields) ||
|| `subject` | В DTO `ActivityDto` в поле `subject` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime` ||
|| `type` | В поле `type` требуется тип данных `Type` для такого запроса | Передайте значение из списка поля `type`: `meeting`, `call`, `task`, `email`, `activity`, `provider` ||
|#

#### Неверный фильтр

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Проверьте формат фильтра: в объекте с привязкой допустимы только ключи `binding` и `conditions`, в `binding` нужны оба поля. Условия по `ownerId` и `ownerTypeId` не поддерживаются, `binding` внутри массива условий — тоже ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Ошибка доступа

Код ошибки: `CRM_ACTIVITY_LIST_ADMIN_ONLY`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещён. Требуются права администратора | Вызовите метод от имени администратора Битрикс24. Дела одного элемента без прав администратора возвращает [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ActivityDto` | Проверьте имена полей в `select`, `filter` и `order` по [таблице полей дела](./index.md#fields). Поля, которые зависят от вида дела, например настройки провайдера и напоминания, в REST 3.0 не публикуются ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода, например `crm.activity.list` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-get-rest-v3.md)
- [{#T}](./crm-entity-activity-list-rest-v3.md)
