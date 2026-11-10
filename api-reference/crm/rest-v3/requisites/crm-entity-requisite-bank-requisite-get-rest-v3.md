# Получить банковский реквизит v 3.0 crm.<тип>.requisite.bankrequisite.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр контакта или компании, которой принадлежит реквизит

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.requisite.bankrequisite.get` возвращает банковский реквизит по идентификатору.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Компания | `crm.company.requisite.bankrequisite.get` ||
|| Контакт | `crm.contact.requisite.bankrequisite.get` ||
|#

Банковские реквизиты есть у реквизитов контактов и компаний. Сегмент `company` или `contact` в имени метода должен совпадать с владельцем реквизита: банковский реквизит компании метод `crm.contact.*` не найдет.

Имя метода пишется в нижнем регистре: `crm.company.requisite.bankrequisite.get`, а не `crm.company.requisite.bankRequisite.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита.

Идентификатор можно получить методом [crm.<тип>.requisite.bankrequisite.list](./crm-entity-requisite-bank-requisite-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть, например `["id","name","bik"]`. [Описание полей](./index.md#bank-fields).

Поле, которого нет в наборе для страны шаблона реквизита, в ответ не попадает. Если в `select` только такие поля, метод вернет `"item": []`.

По умолчанию: все поля, доступные для страны шаблона реквизита ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.company.requisite.bankrequisite.get`

{% endnote %}

Примеры получают название, банк и счет банковского реквизита `23`. Для контакта замените имя метода на `crm.contact.requisite.bankrequisite.get`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23,"select":["id","requisiteId","name","bankName","bik","bankAccountNumber"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.requisite.bankrequisite.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23,"select":["id","requisiteId","name","bankName","bik","bankAccountNumber"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.company.requisite.bankrequisite.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type BankRequisiteGetResult = {
      item: {
        id: number
        requisiteId: number
        name: string
        bankName: string | null
        bik: string | null
        bankAccountNumber: string | null
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<BankRequisiteGetResult>(
        'crm.company.requisite.bankrequisite.get',
        {
          id: 23,
          select: ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bank requisite:', result.item)
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
      async function getBankRequisite() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.company.requisite.bankrequisite.get',
            {
              id: 23,
              select: ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bank requisite:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBankRequisite)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.company.requisite.bankrequisite.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 23,
                "select": ["id", "requisiteId", "name", "bankName", "bik", "bankAccountNumber"],
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
                'crm.company.requisite.bankrequisite.get',
                [
                    'id' => 23,
                    'select' => ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
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
        'crm.company.requisite.bankrequisite.get',
        {
            id: 23,
            select: ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
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
        'crm.company.requisite.bankrequisite.get',
        [
            'id' => 23,
            'select' => ['id', 'requisiteId', 'name', 'bankName', 'bik', 'bankAccountNumber'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.company.requisite.bankrequisite.get", b24.Params{
    	"id":     23,
    	"select": []string{"id", "requisiteId", "name", "bankName", "bik", "bankAccountNumber"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.requisite.bankrequisite.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID                int     `json:"id"`
    		RequisiteID       int     `json:"requisiteId"`
    		Name              string  `json:"name"`
    		BankName          *string `json:"bankName"`
    		Bik               *string `json:"bik"`
    		BankAccountNumber *string `json:"bankAccountNumber"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 23,
            "requisiteId": 549,
            "name": "Основной счет",
            "bankName": "ПАО Сбербанк",
            "bik": "044525225",
            "bankAccountNumber": "40702810938000000001"
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
|| **result.item**
[`object`](../../../data-types.md) | Банковский реквизит с полями из `select`. Незаполненные поля приходят как `null`. [Описание полей](./index.md#bank-fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` банковского реквизита ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|#

#### Банковский реквизит не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Банковского реквизита нет, он принадлежит владельцу другого типа или у вас нет права на просмотр владельца. Проверьте `id` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `BankRequisiteDto` | Проверьте имена полей в `select` по [описанию полей банковского реквизита](./index.md#bank-fields) ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.requisite.bankrequisite.get`. Методы реквизитов есть только у контактов и компаний: сегмент `company` или `contact` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-bank-requisite-list-rest-v3.md)
- [{#T}](./crm-entity-requisite-bank-requisite-update-rest-v3.md)
