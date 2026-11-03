# Получить банковские реквизиты контакта или компании v 3.0 crm.<тип>.bankrequisite.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр контакта или компании

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.bankrequisite.list` возвращает банковские реквизиты всех реквизитов одного контакта или одной компании. Каждый банковский реквизит содержит `requisiteId` — реквизит, к которому он относится.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Компания | `crm.company.bankrequisite.list` ||
|| Контакт | `crm.contact.bankrequisite.list` ||
|#

Тип владельца задает сегмент `company` или `contact` в имени метода. Метод работает и для моей компании: передайте ее идентификатор в `companyId`.

Имя метода пишется в нижнем регистре: `crm.company.bankrequisite.list`, а не `crm.company.bankRequisite.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Условие по владельцу — `companyId` в методе компании, `contactId` в методе контакта: `["companyId","=",<идентификатор>]`. Оператор — только `=`, значение — положительное целое число ||
|| **select**
[`array`](../../../data-types.md) | Список полей банковского реквизита, которые нужно вернуть. [Описание полей](./index.md#bank-fields). Поля `companyId` и `contactId` в `select` недоступны.

По умолчанию: все поля, доступные для страны шаблона реквизита ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по `id`, `name` и банковским полям, кроме `requisiteId`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: по возрастанию `id` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация: `limit` — количество записей на странице, `offset` — сколько записей пропустить. Ноль и отрицательные значения вызывают ошибку ||
|#

{% note warning "" %}

Передавайте `filter` одним условием без внешнего массива: `["companyId","=",3167]`. Обычная запись REST 3.0 `[["companyId","=",3167]]` сейчас не проходит проверку и возвращает ошибку `Требуется указать фильтр по обязательному полю companyId`, даже если условие на месте. По той же причине к условию по `companyId` нельзя добавить другие условия фильтра.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.company.bankrequisite.list`

{% endnote %}

Примеры получают банковские реквизиты компании `3167`. Для контакта замените имя метода на `crm.contact.bankrequisite.list` и `companyId` на `contactId`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["companyId","=",3167],"select":["id","requisiteId","name","bankName","bik","bankAccountNumber"],"order":{"id":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.bankrequisite.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["companyId","=",3167],"select":["id","requisiteId","name","bankName","bik","bankAccountNumber"],"order":{"id":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.company.bankrequisite.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type BankRequisiteListResult = {
      items: Array<{
        id: number
        requisiteId: number
        name: string
        bankName: string | null
        bik: string | null
        bankAccountNumber: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<BankRequisiteListResult>(
        'crm.company.bankrequisite.list',
        {
          filter: ['companyId', '=', 3167],
          select: ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
          order: {
            id: 'asc',
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
        console.info('Bank requisites:', result.items)
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
      async function listCompanyBankRequisites() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.company.bankrequisite.list',
            {
              filter: ['companyId', '=', 3167],
              select: ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
              order: {
                id: 'asc',
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
          console.info('Bank requisites:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCompanyBankRequisites)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.company.bankrequisite.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": ["companyId", "=", 3167],
                "select": ["id", "requisiteId", "name", "bankName", "bik", "bankAccountNumber"],
                "order": {
                    "id": "asc",
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
                'crm.company.bankrequisite.list',
                [
                    'filter' => ['companyId', '=', 3167],
                    'select' => ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
                    'order' => [
                        'id' => 'asc',
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
        'crm.company.bankrequisite.list',
        {
            filter: ['companyId', '=', 3167],
            select: ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
            order: {
                id: 'asc',
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
        'crm.company.bankrequisite.list',
        [
            'filter' => ['companyId', '=', 3167],
            'select' => ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
            'order' => [
                'id' => 'asc',
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
    res, err := client.Core().Call(ctx, "crm.company.bankrequisite.list", b24.Params{
    	"filter": []any{"companyId", "=", 3167},
    	"select": []string{"id", "requisiteId", "name", "bankName", "bik", "bankAccountNumber"},
    	"order": b24.Params{
    		"id": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.bankrequisite.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID                int     `json:"id"`
    		RequisiteID       int     `json:"requisiteId"`
    		Name              string  `json:"name"`
    		BankName          *string `json:"bankName"`
    		Bik               *string `json:"bik"`
    		BankAccountNumber *string `json:"bankAccountNumber"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.RequisiteID, item.Name)
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
                "id": 23,
                "requisiteId": 549,
                "name": "Основной счет",
                "bankName": "ПАО Сбербанк",
                "bik": "044525225",
                "bankAccountNumber": "40702810938000000001"
            },
            {
                "id": 25,
                "requisiteId": 549,
                "name": "Резервный счет",
                "bankName": "Банк ВТБ (ПАО)",
                "bik": "044525187",
                "bankAccountNumber": null
            }
        ]
    },
    "time": {
        "start": 1793711900,
        "finish": 1793711900.089311,
        "duration": 0.08931088447570801,
        "processing": 0,
        "date_start": "2026-11-03T16:18:20+03:00",
        "date_finish": "2026-11-03T16:18:20+03:00",
        "operating_reset_at": 1793712480,
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
[`object[]`](../../../data-types.md) | Банковские реквизиты всех реквизитов владельца с полями из `select`. Если банковских реквизитов нет, массив пустой. [Описание полей](./index.md#bank-fields) ||
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
                "message": "Требуется указать фильтр по обязательному полю `companyId`",
                "field": "filter.companyId"
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
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с условием по `companyId` ||
|| `companyId` | В DTO `BankRequisiteListFilterDto` в поле `companyId` требуется наличие атрибута `Sortable` для такого запроса | Уберите поле из `order` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.companyId` | Требуется указать фильтр по обязательному полю `companyId` | Передайте фильтр одним условием без внешнего массива: `["companyId","=",<идентификатор>]`. Ошибка приходит и на запись `[["companyId","=",…]]`, и на операторы, отличные от `=` ||
|#

#### Неверный select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `companyId` | Уберите `companyId` и `contactId` из `select` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Владелец не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Контакта или компании нет или у вас нет права на просмотр. Проверьте идентификатор в фильтре и имя метода ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.bankrequisite.list`. Методы реквизитов есть только у контактов и компаний: сегмент `company` или `contact` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-bank-requisite-list-rest-v3.md)
- [{#T}](./crm-entity-requisite-list-rest-v3.md)
