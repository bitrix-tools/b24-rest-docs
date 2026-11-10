# Посчитать элементы CRM v 3.0 crm.<тип>.aggregate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение элементов этого типа объекта CRM. Для моей компании — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.aggregate` возвращает количество элементов CRM, которые подходят под фильтр. Тип объекта задает сегмент `<тип>` в имени метода.

Метод считает те же элементы, которые вернул бы [crm.<тип>.list](./crm-entity-list-rest-v3.md) с таким же фильтром: только доступные пользователю, без моих компаний в `crm.company.aggregate` и без шаблонов регулярных сделок в `crm.deal.aggregate`.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.aggregate` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.aggregate` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.aggregate` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.aggregate` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.aggregate` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.aggregate` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.aggregate` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.aggregate`, например `crm.smartprocess1038.aggregate` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.aggregate`, а не `crm.smartInvoice.aggregate`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select***
[`object`](../../../data-types.md) | Функция агрегации и поле. Метод принимает только одно значение — `{"count": ["id"]}`, количество элементов.

Другие функции и поля, например `{"sum": ["opportunity"]}` или `{"count": ["title"]}`, вызывают ошибку `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`, хотя описание метода в OpenAPI перечисляет функции `avg`, `sum`, `min`, `max` и `countDistinct` ||
|| **filter**
[`array`](../../../data-types.md) | Условия отбора элементов в формате REST 3.0. Формат, операторы, группы условий и ограничения — те же, что у метода [crm.<тип>.list](./crm-entity-list-rest-v3.md#filter).

Если параметр не передан, метод считает все доступные элементы ||
|#

Параметры `order` и `pagination` метод не принимает: при их передаче он вернет ошибку сортировки или постраничной навигации.

Фильтровать можно по полям, у которых в ответе [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md) признак `filterable` равен `true`. Состав полей у каждого типа объекта свой, описания полей — на страницах:

- [поля сделки](./fields-deal.md)
- [поля лида](./fields-lead.md)
- [поля контакта](./fields-contact.md)
- [поля компании](./fields-company.md)
- [поля предложения](./fields-quote.md)
- [поля счета](./fields-smart-invoice.md)
- [поля моей компании](./fields-my-company.md)
- [поля смарт-процесса](./fields-smart-process.md)

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.aggregate`

{% endnote %}

Примеры считают элементы смарт-процесса с идентификатором типа `1038` в воронке `69` с суммой от 10 000. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":{"count":["id"]},"filter":[["categoryId","=",69],["opportunity",">=",10000]]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.aggregate
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":{"count":["id"]},"filter":[["categoryId","=",69],["opportunity",">=",10000]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.aggregate
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ItemAggregateResult = {
      result: {
        count: {
          id: number
        }
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ItemAggregateResult>(
        'crm.smartprocess1038.aggregate',
        {
          select: {
            count: ['id'],
          },
          filter: [
            ['categoryId', '=', 69],
            ['opportunity', '>=', 10000],
          ],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Count:', result.result.count.id)
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
      async function countItems() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.aggregate',
            {
              select: {
                count: ['id'],
              },
              filter: [
                ['categoryId', '=', 69],
                ['opportunity', '>=', 10000],
              ],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Count:', result.result.count.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', countItems)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.aggregate"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": {"count": ["id"]},
                "filter": [
                    ["categoryId", "=", 69],
                    ["opportunity", ">=", 10000],
                ],
            },
            prefer_version=3,
        )
        count = response["result"]["result"]["count"]["id"]
        print(count)
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
                'crm.smartprocess1038.aggregate',
                [
                    'select' => [
                        'count' => ['id'],
                    ],
                    'filter' => [
                        ['categoryId', '=', 69],
                        ['opportunity', '>=', 10000],
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
        'crm.smartprocess1038.aggregate',
        {
            select: {
                count: ['id'],
            },
            filter: [
                ['categoryId', '=', 69],
                ['opportunity', '>=', 10000],
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
        'crm.smartprocess1038.aggregate',
        [
            'select' => [
                'count' => ['id'],
            ],
            'filter' => [
                ['categoryId', '=', 69],
                ['opportunity', '>=', 10000],
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.aggregate", b24.Params{
    	"select": b24.Params{
    		"count": []string{"id"},
    	},
    	"filter": []any{
    		[]any{"categoryId", "=", 69},
    		[]any{"opportunity", ">=", 10000},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.aggregate: %w", err)
    }

    var aggregate struct {
    	Result struct {
    		Count struct {
    			ID int `json:"id"`
    		} `json:"count"`
    	} `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &aggregate); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(aggregate.Result.Count.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": {
            "count": {
                "id": 3
            }
        }
    },
    "time": {
        "start": 1793706442,
        "finish": 1793706442.214798,
        "duration": 0.2147979736328125,
        "processing": 0,
        "date_start": "2026-11-03T14:47:22+03:00",
        "date_finish": "2026-11-03T14:47:22+03:00",
        "operating_reset_at": 1793707020,
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
|| **result.result**
[`object`](../../../data-types.md) | Результаты агрегации, сгруппированные по функции ||
|| **result.result.count**
[`object`](../../../data-types.md) | Результат функции `count` по полям из `select` ||
|| **result.result.count.id**
[`integer`](../../../data-types.md) | Количество элементов, которые подходят под фильтр. Если подходящих элементов нет — `0` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION",
        "message": "Не удается распознать выражение select `{\"sum\":[\"opportunity\"]}`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Обязательное поле `select` не указано | Передайте `"select": {"count": ["id"]}` ||
|| `#FIELD#` | В DTO `#DTO#` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Поле не участвует в фильтре. Используйте поля, у которых в `crm.<тип>.field.list` признак `filterable` равен `true` ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Передайте в условии значение типа поля: число, `true` или `false`, дату и время с часовым поясом ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#SELECT#` | Передайте `select` объектом `{"count": ["id"]}`. Другие функции, поля и массив `["id"]` метод не принимает ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Проверьте условие из текста ошибки по описанию [параметра filter](./crm-entity-list-rest-v3.md#filter). Частая причина — группа условий внутри массива без `"type": "filter"` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../../rest-v3.md#operators) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля в `filter` по странице полей типа объекта ||
|#

#### Лишние параметры

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `#ORDER#` | Уберите `order` из запроса ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Уберите `pagination` из запроса ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.aggregate`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-list-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
