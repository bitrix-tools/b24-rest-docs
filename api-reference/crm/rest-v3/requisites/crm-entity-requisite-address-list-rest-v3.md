# Получить адреса реквизита v 3.0 crm.<тип>.requisite.address.list

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

Метод `crm.<тип>.requisite.address.list` возвращает адреса одного реквизита контакта или компании. Адреса всех реквизитов контакта или компании возвращает метод [crm.<тип>.address.list](../addresses/crm-entity-address-list-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Компания | `crm.company.requisite.address.list` ||
|| Контакт | `crm.contact.requisite.address.list` ||
|#

Адрес реквизита определяет пара `requisiteId` и `typeId`: у реквизита может быть только один адрес каждого типа, отдельного идентификатора у адреса нет. Сегмент `company` или `contact` в имени метода должен совпадать с владельцем реквизита.

Имя метода пишется в нижнем регистре: `crm.company.requisite.address.list`, а не `crm.company.requisite.Address.List`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0. Обязательно условие `["requisiteId","=",<идентификатор>]`. Дополнительно можно фильтровать по `typeId` и полям адреса, в том числе группами условий с `"type": "filter"` и `"logic": "or"`. Синтаксис — в [обзоре REST 3.0](../../../rest-v3.md#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей адреса, которые нужно вернуть. [Описание полей](./index.md#address-fields).

По умолчанию: все поля адреса ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по `typeId` и полям адреса.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: по возрастанию `typeId` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация: `limit` — количество адресов на странице, от `1` до `1000`, по умолчанию `50`, `offset` — сколько адресов пропустить. Значение `limit` больше `1000` вызывает ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.company.requisite.address.list`

{% endnote %}

Примеры получают все адреса реквизита компании `549`. Для контакта замените имя метода на `crm.contact.requisite.address.list`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["requisiteId","=",549]],"select":["typeId","address1","city","postalCode"],"order":{"typeId":"asc"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.requisite.address.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["requisiteId","=",549]],"select":["typeId","address1","city","postalCode"],"order":{"typeId":"asc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.company.requisite.address.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RequisiteAddressListResult = {
      items: Array<{
        typeId: number
        address1: string
        city: string
        postalCode: string
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RequisiteAddressListResult>(
        'crm.company.requisite.address.list',
        {
          filter: [
            ['requisiteId', '=', 549],
          ],
          select: ['typeId', 'address1', 'city', 'postalCode'],
          order: {
            typeId: 'asc',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Addresses:', result.items)
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
      async function listRequisiteAddresses() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.company.requisite.address.list',
            {
              filter: [
                ['requisiteId', '=', 549],
              ],
              select: ['typeId', 'address1', 'city', 'postalCode'],
              order: {
                typeId: 'asc',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Addresses:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listRequisiteAddresses)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.company.requisite.address.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["requisiteId", "=", 549],
                ],
                "select": ["typeId", "address1", "city", "postalCode"],
                "order": {
                    "typeId": "asc",
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
                'crm.company.requisite.address.list',
                [
                    'filter' => [
                        ['requisiteId', '=', 549],
                    ],
                    'select' => ['typeId', 'address1', 'city', 'postalCode'],
                    'order' => [
                        'typeId' => 'asc',
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
        'crm.company.requisite.address.list',
        {
            filter: [
                ['requisiteId', '=', 549],
            ],
            select: ['typeId', 'address1', 'city', 'postalCode'],
            order: {
                typeId: 'asc',
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
        'crm.company.requisite.address.list',
        [
            'filter' => [
                ['requisiteId', '=', 549],
            ],
            'select' => ['typeId', 'address1', 'city', 'postalCode'],
            'order' => [
                'typeId' => 'asc',
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
    res, err := client.Core().Call(ctx, "crm.company.requisite.address.list", b24.Params{
    	"filter": []any{
    		[]any{"requisiteId", "=", 549},
    	},
    	"select": []string{"typeId", "address1", "city", "postalCode"},
    	"order": b24.Params{
    		"typeId": "asc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.company.requisite.address.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		TypeID     int    `json:"typeId"`
    		Address1   string `json:"address1"`
    		City       string `json:"city"`
    		PostalCode string `json:"postalCode"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.TypeID, item.City, item.Address1)
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
                "typeId": 1,
                "address1": "ул. Арбат, д. 10",
                "city": "Москва",
                "postalCode": ""
            },
            {
                "typeId": 6,
                "address1": "ул. Тверская, д. 1",
                "city": "Москва",
                "postalCode": "125009"
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
[`object[]`](../../../data-types.md) | Адреса реквизита с полями из `select`. Если адресов нет, массив пустой. [Описание полей](./index.md#address-fields) ||
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
                "message": "Требуется указать фильтр по обязательному полю `requisiteId`",
                "field": "filter.requisiteId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.requisiteId` | Требуется указать фильтр по обязательному полю `requisiteId` | Добавьте в `filter` одно условие `["requisiteId","=",<идентификатор>]` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` от `1` до `1000` и `offset` не меньше нуля ||
|#

#### Реквизит не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Реквизита нет, он принадлежит владельцу другого типа или у вас нет права на просмотр владельца ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.requisite.address.list`. Методы реквизитов есть только у контактов и компаний: сегмент `company` или `contact` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-address-get-rest-v3.md)
- [{#T}](./crm-entity-requisite-address-add-rest-v3.md)
- [{#T}](./../addresses/crm-entity-address-list-rest-v3.md)
