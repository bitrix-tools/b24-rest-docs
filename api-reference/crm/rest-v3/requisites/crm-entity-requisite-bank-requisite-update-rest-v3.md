# Изменить банковский реквизит v 3.0 crm.<тип>.requisite.bankrequisite.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение контакта или компании, которой принадлежит реквизит

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.requisite.bankrequisite.update` изменяет поля банковского реквизита и возвращает его после записи. Метод меняет только переданные поля.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Компания | `crm.company.requisite.bankrequisite.update` ||
|| Контакт | `crm.contact.requisite.bankrequisite.update` ||
|#

Банковские реквизиты есть у реквизитов контактов и компаний. Сегмент `company` или `contact` в имени метода должен совпадать с владельцем реквизита: банковский реквизит компании метод `crm.contact.*` не найдет.

Имя метода пишется в нижнем регистре: `crm.company.requisite.bankrequisite.update`, а не `crm.company.requisite.bankRequisite.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита.

Идентификатор можно получить методом [crm.<тип>.requisite.bankrequisite.list](./crm-entity-requisite-bank-requisite-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми значениями полей. Передайте хотя бы одно поле.

Можно изменить `name` и банковские поля. Состав полей зависит от страны шаблона реквизита. Для российского шаблона доступны `name`, `comments`, `bankName`, `bankAddress`, `bik`, `bankAccountNumber`, `bankAccountCurrency`, `correspondentAccountNumber` и `swift`. Поле не из этого набора метод отклоняет. Описание всех полей — в [обзоре методов реквизитов](./index.md#bank-fields).

Поле `requisiteId` изменить нельзя: банковский реквизит нельзя перенести к другому реквизиту ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.company.requisite.bankrequisite.update`

{% endnote %}

Примеры добавляют комментарий и адрес банка к банковскому реквизиту `23`. Для контакта замените имя метода на `crm.contact.requisite.bankrequisite.update`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23,"fields":{"comments":"Для оплаты поставщикам","bankAddress":"Москва, ул. Вавилова, 19"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.requisite.bankrequisite.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23,"fields":{"comments":"Для оплаты поставщикам","bankAddress":"Москва, ул. Вавилова, 19"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.company.requisite.bankrequisite.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type BankRequisiteUpdateResult = {
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
      const response = await $b24.getHttpClient(ApiVersion.v3).call<BankRequisiteUpdateResult>(
        'crm.company.requisite.bankrequisite.update',
        {
          id: 23,
          fields: {
            comments: 'Для оплаты поставщикам',
            bankAddress: 'Москва, ул. Вавилова, 19',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bank requisite updated:', result.item)
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
      async function updateBankRequisite() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.company.requisite.bankrequisite.update',
            {
              id: 23,
              fields: {
                comments: 'Для оплаты поставщикам',
                bankAddress: 'Москва, ул. Вавилова, 19',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bank requisite updated:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateBankRequisite)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.company.requisite.bankrequisite.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 23,
                "fields": {
                    "comments": "Для оплаты поставщикам",
                    "bankAddress": "Москва, ул. Вавилова, 19",
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
                'crm.company.requisite.bankrequisite.update',
                [
                    'id' => 23,
                    'fields' => [
                        'comments' => 'Для оплаты поставщикам',
                        'bankAddress' => 'Москва, ул. Вавилова, 19',
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
        'crm.company.requisite.bankrequisite.update',
        {
            id: 23,
            fields: {
                comments: 'Для оплаты поставщикам',
                bankAddress: 'Москва, ул. Вавилова, 19',
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
        'crm.company.requisite.bankrequisite.update',
        [
            'id' => 23,
            'fields' => [
                'comments' => 'Для оплаты поставщикам',
                'bankAddress' => 'Москва, ул. Вавилова, 19',
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
    res, err := client.Core().Call(ctx, "crm.company.requisite.bankrequisite.update", b24.Params{
    	"id": 23,
    	"fields": b24.Params{
    		"comments":    "Для оплаты поставщикам",
    		"bankAddress": "Москва, ул. Вавилова, 19",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.company.requisite.bankrequisite.update: %w", err)
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
            "comments": "Для оплаты поставщикам",
            "bankName": "ПАО Сбербанк",
            "bankAddress": "Москва, ул. Вавилова, 19",
            "bik": "044525225",
            "bankAccountNumber": "40702810938000000001",
            "bankAccountCurrency": "RUB",
            "correspondentAccountNumber": "30101810400000000225",
            "swift": null
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
[`object`](../../../data-types.md) | Банковский реквизит после записи со всеми полями, доступными для страны шаблона реквизита. Незаполненные поля приходят как `null`. [Описание полей](./index.md#bank-fields) ||
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
                "message": "A bank requisite cannot be moved to another requisite.",
                "field": "requisiteId"
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` банковского реквизита ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `fields` | The fields property must not be empty. | Передайте в `fields` хотя бы одно поле ||
|| `requisiteId` | A bank requisite cannot be moved to another requisite. | Уберите `requisiteId` из `fields`. Чтобы перенести счет, удалите банковский реквизит и добавьте его к нужному реквизиту ||
|| `iban` | The bank requisite field is not available in the current template. | Поле не входит в набор банковских полей для страны шаблона реквизита. Передайте поля из набора, который возвращают методы чтения ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Значение поля не может быть пустым | Передайте непустое `name` ||
|| `bik` | Длина строки должна быть не больше, чем 11 знаков | Сократите значение до указанной длины ||
|#

#### Банковский реквизит не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Банковского реквизита нет, он принадлежит владельцу другого типа или у вас нет права на изменение владельца. Проверьте `id` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `BankRequisiteDto` | Проверьте имя поля по [описанию полей банковского реквизита](./index.md#bank-fields) ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.requisite.bankrequisite.update`. Методы реквизитов есть только у контактов и компаний: сегмент `company` или `contact` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-bank-requisite-add-rest-v3.md)
- [{#T}](./crm-entity-requisite-bank-requisite-get-rest-v3.md)
- [{#T}](./crm-entity-requisite-bank-requisite-delete-rest-v3.md)
