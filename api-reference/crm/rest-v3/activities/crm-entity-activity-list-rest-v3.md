# Получить список дел элемента v 3.0 crm.<тип>.activity.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента CRM, дела которого запрашиваются

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.list` возвращает дела, привязанные к одному элементу CRM. Тип объекта задает сегмент `<тип>` в имени метода, элемент — условие по `ownerId` в фильтре.

В список попадают дела с любой привязкой к элементу, у каждого дела приходят все его привязки. Дела документов и обзвонов в список не входят.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.list` ||
|| Лид | `crm.lead.activity.list` ||
|| Контакт | `crm.contact.activity.list` ||
|| Компания | `crm.company.activity.list` ||
|| Предложение | `crm.quote.activity.list` ||
|| Счет | `crm.smartinvoice.activity.list` ||
|| Документ CRM | `crm.smartdocument.activity.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.list`, например `crm.smartprocess1038.activity.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.activity.list`, а не `crm.smartInvoice.activity.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Обязательно условие `["ownerId","=",<идентификатор элемента>]`, например `[["ownerId","=",41],["isCompleted","=",false]]`. [Описание параметра](#filter) ||
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

Условие по `ownerId` задает элемент, дела которого нужно получить. Правила для него:

- условие одно, на верхнем уровне фильтра, с оператором `=` и положительным целым числом
- `ownerId` нельзя указать в группе условий, под отрицанием, с другим оператором, дважды или отдельно от `filter`
- если элемента нет, он в корзине или у вас нет права на его просмотр, метод отвечает ошибкой «не найдено», а не пустым списком

Остальные условия объединяются с ним по И. Фильтровать можно по `id`, `type`, `providerId`, `providerTypeId`, `isCompleted`, `assignedById`, `direction`, `createdTime`, `updatedTime`, `startTime`, `deadlineTime`. Поддерживаются операторы и группы условий REST 3.0, синтаксис — в [обзоре REST 3.0](../../../rest-v3.md#filter). Группа условий записывается с ключом `"type": "filter"`: `{"type":"filter","logic":"or","conditions":[...]}`.

Чтобы найти дела без крайнего срока, используйте условие `["deadlineTime","=",null]`.

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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.activity.list`

{% endnote %}

Примеры получают незавершенные дела элемента смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",41],["isCompleted","=",false]],"select":["id","subject","isCompleted","deadlineTime"],"order":{"deadlineTime":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.activity.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",41],["isCompleted","=",false]],"select":["id","subject","isCompleted","deadlineTime"],"order":{"deadlineTime":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.activity.list
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
        'crm.smartprocess1038.activity.list',
        {
          filter: [
            ['ownerId', '=', 41],
            ['isCompleted', '=', false],
          ],
          select: ['id', 'subject', 'isCompleted', 'deadlineTime'],
          order: {
            deadlineTime: 'asc',
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
            'crm.smartprocess1038.activity.list',
            {
              filter: [
                ['ownerId', '=', 41],
                ['isCompleted', '=', false],
              ],
              select: ['id', 'subject', 'isCompleted', 'deadlineTime'],
              order: {
                deadlineTime: 'asc',
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

    method = "crm.smartprocess1038.activity.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerId", "=", 41],
                    ["isCompleted", "=", False],
                ],
                "select": ["id", "subject", "isCompleted", "deadlineTime"],
                "order": {
                    "deadlineTime": "asc",
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
                'crm.smartprocess1038.activity.list',
                [
                    'filter' => [
                        ['ownerId', '=', 41],
                        ['isCompleted', '=', false],
                    ],
                    'select' => ['id', 'subject', 'isCompleted', 'deadlineTime'],
                    'order' => [
                        'deadlineTime' => 'asc',
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
        'crm.smartprocess1038.activity.list',
        {
            filter: [
                ['ownerId', '=', 41],
                ['isCompleted', '=', false],
            ],
            select: ['id', 'subject', 'isCompleted', 'deadlineTime'],
            order: {
                deadlineTime: 'asc',
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
        'crm.smartprocess1038.activity.list',
        [
            'filter' => [
                ['ownerId', '=', 41],
                ['isCompleted', '=', false],
            ],
            'select' => ['id', 'subject', 'isCompleted', 'deadlineTime'],
            'order' => [
                'deadlineTime' => 'asc',
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.activity.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerId", "=", 41},
    		[]any{"isCompleted", "=", false},
    	},
    	"select": []string{"id", "subject", "isCompleted", "deadlineTime"},
    	"order": b24.Params{
    		"deadlineTime": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.activity.list: %w", err)
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
[`object[]`](../../../data-types.md) | Массив дел с полями из `select`, без `select` — со всеми полями. Если у элемента нет подходящих дел, массив пустой. [Описание полей дела](./index.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `ownerId`",
                "field": "filter.ownerId"
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
|| `filter` | Обязательное поле `filter` не указано | Передайте `filter` с условием по `ownerId` ||
|| `ownerId` | ownerId is a condition of the filter: name it as ["ownerId", "=", N] there. | Уберите `ownerId` из тела запроса и передайте его условием в `filter` ||
|| `subject` | В DTO `ActivityDto` в поле `subject` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям с отметкой в колонке «Фильтр» [таблицы полей](./index.md#fields) ||
|| `subject` | В DTO `ActivityDto` в поле `subject` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime` ||
|| `type` | В поле `type` требуется тип данных `Type` для такого запроса | Передайте значение из списка поля `type`: `meeting`, `call`, `task`, `email`, `activity`, `provider` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.ownerId` | Требуется указать фильтр по обязательному полю `ownerId` | Добавьте в `filter` условие `["ownerId","=",<идентификатор элемента>]` ||
|#

#### Неверный фильтр

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Проверьте условие по `ownerId`: одно, на верхнем уровне, с оператором `=`. Группы условий записывайте с ключом `"type": "filter"` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Элемента из `ownerId` нет у этого типа объекта, он в корзине или у вас нет права на его просмотр. Проверьте `ownerId` и имя метода ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании и документов КЭДО методов дел нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-get-rest-v3.md)
- [{#T}](./crm-activity-list-rest-v3.md)
- [{#T}](./crm-entity-activity-complete-rest-v3.md)
