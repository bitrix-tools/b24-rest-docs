# Выбрать реквизит моей компании в элементе v 3.0 crm.<тип>.mycompanyrequisite.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элемента CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.mycompanyrequisite.set` выбирает в сделке или счете реквизит и банковский реквизит моей компании и возвращает выбранную пару. Можно выбрать только реквизит моей компании, указанной в поле `myCompanyId` элемента.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.mycompanyrequisite.set` ||
|| Счет | `crm.smartinvoice.mycompanyrequisite.set` ||
|#

Методы есть только у сделки и счета. Реквизиты моей компании возвращает метод [crm.company.requisite.list](./crm-entity-requisite-list-rest-v3.md) с идентификатором моей компании в фильтре `companyId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.mycompanyrequisite.set`, а не `crm.smartInvoice.myCompanyRequisite.set`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сделки или счета.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Выбранная пара реквизитов:

- `requisiteId`* — идентификатор реквизита моей компании из поля `myCompanyId` элемента. `0` снимает выбор реквизита и банковского реквизита
- `bankRequisiteId` — идентификатор банковского реквизита выбранного реквизита. Банковские реквизиты моей компании возвращает метод [crm.company.bankrequisite.list](./crm-entity-bank-requisite-list-rest-v3.md)

Пара записывается целиком: если не передать `bankRequisiteId` или передать `0`, выбор банковского реквизита снимается ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.deal.mycompanyrequisite.set`

{% endnote %}

Примеры выбирают реквизит `3` моей компании и его банковский реквизит `3` в сделке `9003`. Для счета замените имя метода на `crm.smartinvoice.mycompanyrequisite.set`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9003,"fields":{"requisiteId":3,"bankRequisiteId":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.mycompanyrequisite.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9003,"fields":{"requisiteId":3,"bankRequisiteId":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.deal.mycompanyrequisite.set
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MyCompanyRequisiteSetResult = {
      item: {
        requisiteId: number | null
        bankRequisiteId: number | null
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<MyCompanyRequisiteSetResult>(
        'crm.deal.mycompanyrequisite.set',
        {
          id: 9003,
          fields: {
            requisiteId: 3,
            bankRequisiteId: 3,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('My company requisite saved:', result.item)
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
      async function setMyCompanyRequisite() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.deal.mycompanyrequisite.set',
            {
              id: 9003,
              fields: {
                requisiteId: 3,
                bankRequisiteId: 3,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('My company requisite saved:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setMyCompanyRequisite)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.deal.mycompanyrequisite.set"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 9003,
                "fields": {
                    "requisiteId": 3,
                    "bankRequisiteId": 3,
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
                'crm.deal.mycompanyrequisite.set',
                [
                    'id' => 9003,
                    'fields' => [
                        'requisiteId' => 3,
                        'bankRequisiteId' => 3,
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
        'crm.deal.mycompanyrequisite.set',
        {
            id: 9003,
            fields: {
                requisiteId: 3,
                bankRequisiteId: 3,
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
        'crm.deal.mycompanyrequisite.set',
        [
            'id' => 9003,
            'fields' => [
                'requisiteId' => 3,
                'bankRequisiteId' => 3,
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
    res, err := client.Core().Call(ctx, "crm.deal.mycompanyrequisite.set", b24.Params{
    	"id": 9003,
    	"fields": b24.Params{
    		"requisiteId":     3,
    		"bankRequisiteId": 3,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.deal.mycompanyrequisite.set: %w", err)
    }

    var result struct {
    	Item struct {
    		RequisiteID     *int `json:"requisiteId"`
    		BankRequisiteID *int `json:"bankRequisiteId"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.RequisiteID, result.Item.BankRequisiteID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "requisiteId": 3,
            "bankRequisiteId": 3
        }
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
|| **result.item.requisiteId**
[`integer`](../../../data-types.md) | Идентификатор выбранного реквизита после записи. `null`, если выбор снят ||
|| **result.item.bankRequisiteId**
[`integer`](../../../data-types.md) | Идентификатор выбранного банковского реквизита после записи. `null`, если банковский реквизит не выбран ||
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
                "message": "Можно выбрать только реквизит моей компании",
                "field": "fields.requisiteId"
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` сделки или счета ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `fields` | The fields property must not be empty. | Передайте `fields` с `requisiteId` ||
|| `fields.requisiteId` | В поле `fields.requisiteId` требуется тип данных `integer` для такого запроса | Передайте идентификатор числом ||
|| `fields.requisiteId` | Можно выбрать только реквизит моей компании | Выберите реквизит компании из поля `myCompanyId` элемента ||
|| `fields.bankRequisiteId` | Банковский реквизит не принадлежит выбранному реквизиту | Передайте банковский реквизит, который относится к `requisiteId` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `requisiteId` | Не заполнено обязательное поле "requisiteId" | Передайте `requisiteId` в `fields` ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Сделки или счета нет или у вас нет права на изменение. Проверьте `id` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `MyCompanyRequisiteDto` | Передайте в `fields` только `requisiteId` и `bankRequisiteId` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.mycompanyrequisite.set`. Методы есть только у сделки и счета: `crm.deal.mycompanyrequisite.*` и `crm.smartinvoice.mycompanyrequisite.*` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-my-company-requisite-get-rest-v3.md)
- [{#T}](./crm-entity-client-requisite-set-rest-v3.md)
