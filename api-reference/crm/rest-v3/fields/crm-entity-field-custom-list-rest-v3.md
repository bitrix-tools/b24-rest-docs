# Получить список пользовательских полей v 3.0 crm.<тип>.field.custom.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.field.custom.list` возвращает пользовательские поля типа объекта с их настройками. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.custom.list` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.custom.list` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.custom.list` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.custom.list` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.custom.list` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.custom.list` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.custom.list`, например `crm.smartprocess1038.field.custom.list` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы пользовательских полей есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.custom.list` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.custom.list`, а не `crm.smartInvoice.field.custom.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список параметров поля, которые нужно вернуть, например `["id", "name", "userTypeId"]`. Можно передать `id`, `entityId` и параметры из описания [параметра fields](./crm-entity-field-custom-add-rest-v3.md#fields) метода создания.

По умолчанию метод возвращает все параметры полей ||
|| **filter**
[`array`](../../../data-types.md) | Условия отбора полей. [Описание параметра](#filter) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"параметр": "asc"}` или `{"параметр": "desc"}`. Сортировать можно по `id` и `name` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация: `limit` — сколько полей вернуть, `offset` — сколько пропустить, например `{"limit": 20, "offset": 40}` ||
|#

### Параметр filter {#filter}

Массив условий вида `["параметр", "оператор", "значение"]`, например `[["name", "=", "UF_CRM_CONTRACT_NUMBER"]]`. Формат условий описан в [обзоре REST 3.0](../../../rest-v3.md#filter).

Фильтровать можно по параметрам:

- `id` — идентификатор поля
- `name` — имя поля
- `entityId` — код типа объекта

По другим параметрам, например `userTypeId`, метод не фильтрует и отвечает ошибкой валидации запроса. Если передать `filter` строкой, а не массивом, метод вернет ошибку фильтра.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.custom.list`

{% endnote %}

Примеры получают имена, типы и подписи пользовательских полей смарт-процесса с идентификатором типа `1038`, отсортированные по имени. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","userTypeId","editFormLabel"],"order":{"name":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.custom.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","userTypeId","editFormLabel"],"order":{"name":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.custom.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldListResult = {
      items: Array<{
        id: number
        name: string
        userTypeId: string
        editFormLabel: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CustomFieldListResult>(
        'crm.smartprocess1038.field.custom.list',
        {
          select: ['id', 'name', 'userTypeId', 'editFormLabel'],
          order: {
            name: 'asc',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach((field) => console.info(field.id, field.name, field.userTypeId))
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
      async function listCustomFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.custom.list',
            {
              select: ['id', 'name', 'userTypeId', 'editFormLabel'],
              order: {
                name: 'asc',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach((field) => console.info(field.id, field.name, field.userTypeId))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCustomFields)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.custom.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "name", "userTypeId", "editFormLabel"],
                "order": {
                    "name": "asc",
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        for field in result["items"]:
            print(field["id"], field["name"], field["userTypeId"])
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
                'crm.smartprocess1038.field.custom.list',
                [
                    'select' => ['id', 'name', 'userTypeId', 'editFormLabel'],
                    'order' => [
                        'name' => 'asc',
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
        'crm.smartprocess1038.field.custom.list',
        {
            select: ['id', 'name', 'userTypeId', 'editFormLabel'],
            order: {
                name: 'asc',
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
        'crm.smartprocess1038.field.custom.list',
        [
            'select' => ['id', 'name', 'userTypeId', 'editFormLabel'],
            'order' => [
                'name' => 'asc',
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.custom.list", b24.Params{
    	"select": []string{"id", "name", "userTypeId", "editFormLabel"},
    	"order": b24.Params{
    		"name": "asc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.custom.list: %w", err)
    }

    var out struct {
    	Items []struct {
    		ID   int    `json:"id"`
    		Name string `json:"name"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, f := range out.Items {
    	fmt.Println(f.ID, f.Name)
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
                "id": 6008205,
                "name": "UF_CRM_19_PRIORITY",
                "userTypeId": "enumeration",
                "editFormLabel": "Приоритет"
            },
            {
                "id": 6008209,
                "name": "UF_CRM_CONTRACT_NUMBER",
                "userTypeId": "string",
                "editFormLabel": "Номер договора с клиентом"
            }
        ]
    },
    "time": {
        "start": 1793716018,
        "finish": 1793716018.213075,
        "duration": 0.2130749225616455,
        "processing": 0,
        "date_start": "2026-11-03T17:26:58+03:00",
        "date_finish": "2026-11-03T17:26:58+03:00",
        "operating_reset_at": 1793716560,
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
[`array`](../../../data-types.md) | Массив описаний полей с параметрами из `select`. Без `select` — все [параметры поля](./crm-entity-field-custom-add-rest-v3.md#fields), `id` и `entityId`. Массив пустой, если полей нет или у пользователя нет права «Разрешить изменять настройки» в CRM ||
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
                "message": "В DTO `CustomFieldConfigDto` в поле `userTypeId` требуется наличие атрибута `Filterable` для такого запроса",
                "field": "userTypeId"
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
|| `userTypeId` | В DTO `CustomFieldConfigDto` в поле `userTypeId` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `id`, `name` и `entityId` ||
|| `sort` | В DTO `CustomFieldConfigDto` в поле `sort` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` и `name` ||
|#

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["name", "=", "UF_CRM_CONTRACT_NUMBER"]]` ||
|#

#### Неизвестный оператор фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `%` | Используйте операторы из [обзора REST 3.0](../../../rest-v3.md#filter) ||
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
|| `-` | Не удается распознать параметр пагинации `#VALUE#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `CustomFieldConfigDto` | Проверьте имена в `select`: допустимы [параметры поля](./crm-entity-field-custom-add-rest-v3.md#fields), `id` и `entityId` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#VALUE#` | Передайте `select` массивом имен, например `["id", "name"]` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.custom.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании этих методов нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-custom-add-rest-v3.md)
- [{#T}](./crm-entity-field-custom-update-rest-v3.md)
- [{#T}](./crm-entity-field-custom-get-rest-v3.md)
- [{#T}](./crm-entity-field-custom-delete-rest-v3.md)
