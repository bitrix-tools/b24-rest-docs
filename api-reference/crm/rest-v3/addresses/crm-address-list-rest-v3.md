# Получить адреса контактов, компаний и лидов v 3.0 crm.address.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор Битрикс24

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.address.list` возвращает адреса всех контактов, компаний и лидов Битрикс24. Метод подходит для выгрузки адресов: он не проверяет права на каждого владельца, поэтому вызвать его может только администратор Битрикс24. Право администратора CRM для метода не подходит.

Адреса одного контакта или одной компании возвращает метод [crm.<тип>.address.list](./crm-entity-address-list-rest-v3.md), адрес лида — [crm.lead.address.get](./crm-entity-address-get-rest-v3.md).

Метод возвращает и адреса, владельцев которых уже нет в Битрикс24. Адреса владельцев в корзине в ответ не попадают.

Метод `crm.address.list` по адресу `/rest/api/` — это новый метод REST 3.0. Старый [crm.address.list](../../requisites/addresses/crm-address-list.md) по адресу `/rest/` работает как раньше, у него другие поля и фильтр.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей адреса, которые нужно вернуть, например `["id","ownerTypeId","ownerId","city"]`. [Описание полей](#fields).

По умолчанию: только `id` ||
|| **filter**
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["ownerTypeId","=",3]]`. Фильтровать можно по полям `id`, `typeId`, `ownerTypeId` и `ownerId`.

Синтаксис и операторы описаны в [обзоре REST 3.0](../../../rest-v3.md#filter) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно только по `id`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации: `limit` — количество адресов на странице, по умолчанию `50`, `page` — номер страницы, `offset` — сколько адресов пропустить ||
|#

### Поля адреса {#fields}

#|
|| **Поле**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор адреса. При смене типа адреса адрес получает новый идентификатор ||
|| **typeId**
[`integer`](../../../data-types.md) | Тип адреса: `1` — фактический, `4` — адрес регистрации, `6` — юридический, `9` — адрес бенефициара, `11` — адрес доставки. Список типов возвращает [crm.dictionary.addresstype.list](../dictionaries/crm-dictionary-list-rest-v3.md) ||
|| **ownerTypeId**
[`integer`](../../../data-types.md) | Тип владельца: `1` — лид, `3` — контакт, `4` — компания. Другие значения в фильтре вызывают ошибку ||
|| **ownerId**
[`integer`](../../../data-types.md) | Идентификатор владельца. Уникален только вместе с `ownerTypeId`: фильтр по одному `ownerId` вернет адреса лида, контакта и компании с этим номером ||
|| **requisiteId**
[`integer`](../../../data-types.md) | Идентификатор реквизита, в котором хранится адрес контакта или компании. `0` — у адреса лида ||
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
[`string`](../../../data-types.md) | Код страны из справочника местоположений Битрикс24 ||
|#

Незаполненные текстовые поля приходят пустой строкой. Описание полей возвращают методы `crm.address.field.list` и `crm.address.field.get`.

### Как выгрузить все адреса

Для полной выгрузки переходите по идентификатору, а не по номеру страницы: сортируйте по `{"id": "asc"}` и в каждом следующем запросе передавайте условие `["id", ">", <последний полученный id>]`. С большим `offset` запрос выполняется медленнее.

Адрес, у которого во время выгрузки сменили тип, получает новый `id` и может попасть в выгрузку дважды или не попасть.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.address.list`

{% endnote %}

Примеры получают следующую страницу адресов контактов после адреса с `id = 100`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerTypeId","=",3],["id",">",100]],"select":["id","typeId","ownerTypeId","ownerId","requisiteId","address1","city"],"order":{"id":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.address.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerTypeId","=",3],["id",">",100]],"select":["id","typeId","ownerTypeId","ownerId","requisiteId","address1","city"],"order":{"id":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.address.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PortalAddressListResult = {
      items: Array<{
        id: number
        typeId: number
        ownerTypeId: number
        ownerId: number
        requisiteId: number
        address1: string
        city: string
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<PortalAddressListResult>(
        'crm.address.list',
        {
          filter: [
            ['ownerTypeId', '=', 3],
            ['id', '>', 100],
          ],
          select: ['id', 'typeId', 'ownerTypeId', 'ownerId', 'requisiteId', 'address1', 'city'],
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
      async function listPortalAddresses() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.address.list',
            {
              filter: [
                ['ownerTypeId', '=', 3],
                ['id', '>', 100],
              ],
              select: ['id', 'typeId', 'ownerTypeId', 'ownerId', 'requisiteId', 'address1', 'city'],
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
          console.info('Addresses:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listPortalAddresses)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.address.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerTypeId", "=", 3],
                    ["id", ">", 100],
                ],
                "select": ["id", "typeId", "ownerTypeId", "ownerId", "requisiteId", "address1", "city"],
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
                'crm.address.list',
                [
                    'filter' => [
                        ['ownerTypeId', '=', 3],
                        ['id', '>', 100],
                    ],
                    'select' => ['id', 'typeId', 'ownerTypeId', 'ownerId', 'requisiteId', 'address1', 'city'],
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
        'crm.address.list',
        {
            filter: [
                ['ownerTypeId', '=', 3],
                ['id', '>', 100],
            ],
            select: ['id', 'typeId', 'ownerTypeId', 'ownerId', 'requisiteId', 'address1', 'city'],
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
        'crm.address.list',
        [
            'filter' => [
                ['ownerTypeId', '=', 3],
                ['id', '>', 100],
            ],
            'select' => ['id', 'typeId', 'ownerTypeId', 'ownerId', 'requisiteId', 'address1', 'city'],
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
    res, err := client.Core().Call(ctx, "crm.address.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerTypeId", "=", 3},
    		[]any{"id", ">", 100},
    	},
    	"select": []string{"id", "typeId", "ownerTypeId", "ownerId", "requisiteId", "address1", "city"},
    	"order": b24.Params{
    		"id": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.address.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int    `json:"id"`
    		TypeID      int    `json:"typeId"`
    		OwnerTypeID int    `json:"ownerTypeId"`
    		OwnerID     int    `json:"ownerId"`
    		RequisiteID int    `json:"requisiteId"`
    		Address1    string `json:"address1"`
    		City        string `json:"city"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.OwnerTypeID, item.OwnerID, item.City)
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
                "id": 101,
                "typeId": 1,
                "ownerTypeId": 3,
                "ownerId": 113,
                "requisiteId": 0,
                "address1": "",
                "city": ""
            },
            {
                "id": 103,
                "typeId": 1,
                "ownerTypeId": 3,
                "ownerId": 115,
                "requisiteId": 0,
                "address1": "",
                "city": ""
            }
        ]
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
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`object[]`](../../../data-types.md) | Адреса с полями из `select`. Без `select` у каждого адреса только `id`. [Описание полей](#fields) ||
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
                "message": "Тип владельца 8 не поддерживается",
                "field": "filter.ownerTypeId"
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
|| `city` | В DTO `PortalAddressDto` в поле `city` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `id`, `typeId`, `ownerTypeId` и `ownerId` ||
|| `typeId` | В DTO `PortalAddressDto` в поле `typeId` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.ownerTypeId` | Тип владельца `#OWNER_TYPE_ID#` не поддерживается | Передайте `1` — лид, `3` — контакт или `4` — компания ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора Битрикс24 ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `PortalAddressDto` | Проверьте имена полей в `select`, `filter` и `order` по таблице [полей адреса](#fields). Поля владельца здесь называются `ownerTypeId` и `ownerId`, а не `contactId` или `companyId` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-address-list-rest-v3.md)
- [{#T}](./crm-entity-address-get-rest-v3.md)
