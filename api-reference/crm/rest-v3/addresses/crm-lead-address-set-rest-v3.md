# Записать адрес лида v 3.0 crm.lead.address.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение лида

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.lead.address.set` записывает адрес лида. У лида один адрес без типа и отдельного идентификатора, поэтому метод и создает, и изменяет его. Метод меняет только переданные поля, остальные сохраняются.

Адрес лида возвращает метод [crm.lead.address.get](./crm-entity-address-get-rest-v3.md), удаляет — [crm.lead.address.delete](./crm-entity-address-delete-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор лида.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями адреса в формате `{"поле": "значение"}`. Передайте хотя бы одно поле. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **address1**
[`string`](../../../data-types.md) | Улица, дом, корпус, строение ||
|| **address2**
[`string`](../../../data-types.md) | Квартира или офис ||
|| **city**
[`string`](../../../data-types.md) | Город ||
|| **postalCode**
[`string`](../../../data-types.md) | Почтовый индекс ||
|| **region**
[`string`](../../../data-types.md) | Район ||
|| **province**
[`string`](../../../data-types.md) | Область ||
|| **country**
[`string`](../../../data-types.md) | Страна ||
|| **countryCode**
[`string`](../../../data-types.md) | Код страны из справочника местоположений Битрикс24. Сохраняется, только если совпадает с названием страны в `country` на языке Битрикс24. Иначе метод сохраняет адрес без кода страны и ошибку не возвращает ||
|#

Пустая строка очищает поле. Полей `typeId`, `id` и `requisiteId` у адреса лида нет.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.lead.address.set`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1001357,"fields":{"address1":"Невский проспект, 1","city":"Санкт-Петербург","postalCode":"191025","country":"Россия"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.address.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1001357,"fields":{"address1":"Невский проспект, 1","city":"Санкт-Петербург","postalCode":"191025","country":"Россия"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.lead.address.set
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type LeadAddressSetResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<LeadAddressSetResult>(
        'crm.lead.address.set',
        {
          id: 1001357,
          fields: {
            address1: 'Невский проспект, 1',
            city: 'Санкт-Петербург',
            postalCode: '191025',
            country: 'Россия',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Lead address saved:', result.result)
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
      async function setLeadAddress() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.lead.address.set',
            {
              id: 1001357,
              fields: {
                address1: 'Невский проспект, 1',
                city: 'Санкт-Петербург',
                postalCode: '191025',
                country: 'Россия',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Lead address saved:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setLeadAddress)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.lead.address.set"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 1001357,
                "fields": {
                    "address1": "Невский проспект, 1",
                    "city": "Санкт-Петербург",
                    "postalCode": "191025",
                    "country": "Россия",
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
                'crm.lead.address.set',
                [
                    'id' => 1001357,
                    'fields' => [
                        'address1' => 'Невский проспект, 1',
                        'city' => 'Санкт-Петербург',
                        'postalCode' => '191025',
                        'country' => 'Россия',
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
        'crm.lead.address.set',
        {
            id: 1001357,
            fields: {
                address1: 'Невский проспект, 1',
                city: 'Санкт-Петербург',
                postalCode: '191025',
                country: 'Россия',
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
        'crm.lead.address.set',
        [
            'id' => 1001357,
            'fields' => [
                'address1' => 'Невский проспект, 1',
                'city' => 'Санкт-Петербург',
                'postalCode' => '191025',
                'country' => 'Россия',
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
    res, err := client.Core().Call(ctx, "crm.lead.address.set", b24.Params{
    	"id": 1001357,
    	"fields": b24.Params{
    		"address1":   "Невский проспект, 1",
    		"city":       "Санкт-Петербург",
    		"postalCode": "191025",
    		"country":    "Россия",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.lead.address.set: %w", err)
    }

    var result struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1793709949,
        "finish": 1793709949.853585,
        "duration": 0.8535850048065186,
        "processing": 0,
        "date_start": "2026-11-03T15:45:49+03:00",
        "date_finish": "2026-11-03T15:45:49+03:00",
        "operating_reset_at": 1793710260,
        "operating": 0.3442521095275879
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с результатом операции ||
|| **result.result**
[`boolean`](../../../data-types.md) | `true`, если адрес записан. Адрес можно получить методом [crm.lead.address.get](./crm-entity-address-get-rest-v3.md) ||
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
                "message": "The fields property must not be empty.",
                "field": "fields"
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` лида ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `fields` | The fields property must not be empty. | Передайте в `fields` хотя бы одно поле адреса ||
|#

#### Лид не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Лида с таким идентификатором нет или у вас нет права на его изменение. Проверьте `id` методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `AddressDto` | Проверьте имя поля по таблице [параметра fields](#fields). У адреса лида нет поля `typeId` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, `crm.lead.address.set`. Метод есть только у лида, адреса контакта и компании добавляет [crm.<тип>.address.add](./crm-entity-address-add-rest-v3.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-address-get-rest-v3.md)
- [{#T}](./crm-entity-address-delete-rest-v3.md)
