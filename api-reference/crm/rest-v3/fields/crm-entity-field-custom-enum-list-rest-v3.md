# Получить варианты поля-списка v 3.0 crm.<тип>.field.custom.enum.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение элементов этого типа объекта CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.field.custom.enum.list` возвращает варианты одного пользовательского поля-списка. Тип объекта задает сегмент `<тип>` в имени метода.

Поле-список хранит набор вариантов, из которых пользователь выбирает значение, например приоритет «Высокий», «Средний», «Низкий». Создать такое поле методом [crm.<тип>.field.custom.add](./crm-entity-field-custom-add-rest-v3.md) нельзя: тип `enumeration` он не принимает. Поле можно создать в интерфейсе Битрикс24 или другим способом, а работать с его вариантами — методами [crm.<тип>.field.custom.enum.*](./crm-entity-field-custom-enum-list-rest-v3.md). Поля-списки есть в ответе метода [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md): у них `userTypeId` равен `enumeration`.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.custom.enum.list` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.custom.enum.list` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.custom.enum.list` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.custom.enum.list` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.custom.enum.list` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.custom.enum.list` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.custom.enum.list`, например `crm.smartprocess1038.field.custom.enum.list` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы вариантов полей-списков есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.custom.enum.list` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.custom.enum.list`, а не `crm.smartInvoice.field.custom.enum.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Условие по полю-списку. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей варианта, которые нужно вернуть, например `["id", "value"]`. [Поля варианта](#item).

По умолчанию метод возвращает все поля ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "asc"}` или `{"поле": "desc"}`. Сортировать можно по `id` и `sort` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация: `limit` — сколько вариантов вернуть, `offset` — сколько пропустить ||
|#

### Параметр filter {#filter}

Фильтр состоит из одного условия по полю `fieldId`, без внешнего массива: `["fieldId", "=", 6008205]`. Вместо идентификатора поля можно передать его имя: `["fieldId", "=", "UF_CRM_19_PRIORITY"]`. Идентификаторы и имена полей возвращает метод [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md).

Пользователю без права «Разрешить изменять настройки» метод [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md) поля не вернет. Имя поля-списка такой пользователь может взять из ответа метода [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md): там поле-список описано с типом `int`.

{% note warning "" %}

Массив условий `[["fieldId", "=", 6008205]]`, как в [обзоре REST 3.0](../../../rest-v3.md#filter), метод не принимает и отвечает ошибкой «Требуется указать фильтр по обязательному полю `fieldId`».

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.custom.enum.list`

{% endnote %}

Примеры получают варианты поля «Приоритет» смарт-процесса с идентификатором типа `1038` по возрастанию `sort`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["fieldId","=",6008205],"order":{"sort":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.custom.enum.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["fieldId","=",6008205],"order":{"sort":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.custom.enum.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EnumListResult = {
      items: Array<{
        id: number
        fieldId: number
        value: string
        isDefault: boolean
        sort: number
        xmlId: string
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EnumListResult>(
        'crm.smartprocess1038.field.custom.enum.list',
        {
          filter: ['fieldId', '=', 6008205],
          order: {
            sort: 'asc',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach((value) => console.info(value.id, value.value, value.isDefault))
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
      async function listEnumValues() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.custom.enum.list',
            {
              filter: ['fieldId', '=', 6008205],
              order: {
                sort: 'asc',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach((value) => console.info(value.id, value.value, value.isDefault))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listEnumValues)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.custom.enum.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": ["fieldId", "=", 6008205],
                "order": {
                    "sort": "asc",
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        for value in result["items"]:
            print(value["id"], value["value"], value["isDefault"])
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
                'crm.smartprocess1038.field.custom.enum.list',
                [
                    'filter' => ['fieldId', '=', 6008205],
                    'order' => [
                        'sort' => 'asc',
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
        'crm.smartprocess1038.field.custom.enum.list',
        {
            filter: ['fieldId', '=', 6008205],
            order: {
                sort: 'asc',
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
        'crm.smartprocess1038.field.custom.enum.list',
        [
            'filter' => ['fieldId', '=', 6008205],
            'order' => [
                'sort' => 'asc',
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.custom.enum.list", b24.Params{
    	"filter": []any{"fieldId", "=", 6008205},
    	"order": b24.Params{
    		"sort": "asc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.custom.enum.list: %w", err)
    }

    var out struct {
    	Items []struct {
    		ID    int    `json:"id"`
    		Value string `json:"value"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, v := range out.Items {
    	fmt.Println(v.ID, v.Value)
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
                "id": 4135,
                "fieldId": 6008205,
                "value": "Очень срочный",
                "isDefault": false,
                "sort": 1,
                "xmlId": "URGENT"
            },
            {
                "id": 4129,
                "fieldId": 6008205,
                "value": "Высокий",
                "isDefault": false,
                "sort": 10,
                "xmlId": "HIGH"
            },
            {
                "id": 4131,
                "fieldId": 6008205,
                "value": "Средний",
                "isDefault": true,
                "sort": 20,
                "xmlId": "MEDIUM"
            },
            {
                "id": 4133,
                "fieldId": 6008205,
                "value": "Низкий",
                "isDefault": false,
                "sort": 30,
                "xmlId": "LOW"
            }
        ]
    },
    "time": {
        "start": 1793714992,
        "finish": 1793714992.390954,
        "duration": 0.39095401763916016,
        "processing": 0,
        "date_start": "2026-11-03T17:09:52+03:00",
        "date_finish": "2026-11-03T17:09:52+03:00",
        "operating_reset_at": 1793715540,
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
[`array`](../../../data-types.md) | Массив вариантов. [Поля варианта](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля варианта {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор варианта ||
|| **fieldId**
[`integer`](../../../data-types.md) | Идентификатор поля-списка ||
|| **value**
[`string`](../../../data-types.md) | Текст варианта ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Выбран ли вариант по умолчанию ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок варианта в списке ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код варианта ||
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
                "message": "Требуется указать фильтр по обязательному полю `fieldId`",
                "field": "filter.fieldId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Нет фильтра по полю

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.fieldId` | Требуется указать фильтр по обязательному полю `fieldId` | Передайте условие без внешнего массива: `"filter": ["fieldId", "=", 6008205]` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `value` | В DTO `EnumDto` в поле `value` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `fieldId` ||
|| `value` | В DTO `EnumDto` в поле `value` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` и `sort` ||
|#

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом из трех элементов, а не объектом ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#ID#` не найдено | Проверьте идентификатор поля методом [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md). Та же ошибка придет, если поле относится к другому типу объекта или не является списком ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `EnumDto` | Проверьте имена в `select` по [таблице полей варианта](#item) ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#VALUE#` | Передайте `select` массивом имен, например `["id", "value"]` ||
|#

#### Неизвестный оператор фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `%` | Используйте в условии по `fieldId` оператор `=` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `#VALUE#` | Передайте направление `asc` или `desc` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#VALUE#` | Передайте `limit` больше нуля ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени пользователя с правом на чтение элементов этого типа объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.custom.enum.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании этих методов нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-custom-enum-add-rest-v3.md)
- [{#T}](./crm-entity-field-custom-enum-update-rest-v3.md)
- [{#T}](./crm-entity-field-custom-enum-get-rest-v3.md)
- [{#T}](./crm-entity-field-custom-enum-delete-rest-v3.md)
