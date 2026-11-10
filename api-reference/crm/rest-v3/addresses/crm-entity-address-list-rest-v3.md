# Получить адреса контакта или компании v 3.0 crm.<тип>.address.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр контакта или компании, адреса которой запрашиваются

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.address.list` возвращает адреса одного контакта или одной компании из всех ее реквизитов. Тип владельца задает сегмент `<тип>` в имени метода, владельца — условие в фильтре.

Адреса всех контактов, компаний и лидов Битрикс24 возвращает метод [crm.address.list](./crm-address-list-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Контакт | `crm.contact.address.list` ||
|| Компания | `crm.company.address.list` ||
|#

Адрес лида возвращает метод [crm.lead.address.get](./crm-entity-address-get-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.company.address.list`, а не `crm.Company.address.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Условие по владельцу обязательно, например `[["contactId","=",3219]]`. [Описание параметра](#filter) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `id` и `typeId`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации: `limit` — количество адресов на странице, по умолчанию `50`, `page` — номер страницы, `offset` — сколько адресов пропустить. Ноль и отрицательный `limit`, отрицательный `offset` вызывают ошибку ||
|#

Метод возвращает все поля адреса. Параметр `select` на состав ответа не влияет.

### Параметр filter {#filter}

Метод принимает только условия из таблицы и объединяет их по И:

#|
|| **Поле** | **Операторы** | **Описание** ||
|| `contactId` | `=` | Идентификатор контакта. Обязательное условие в `crm.contact.address.list` ||
|| `companyId` | `=` | Идентификатор компании. Обязательное условие в `crm.company.address.list` ||
|| `typeId` | `=` | Тип адреса, например `6` — юридический адрес. Значения — в [обзоре методов адресов](./index.md#fields) ||
|#

Группы условий с `logic`, оператор `in`, другие операторы и поля метод не принимает.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.contact.address.list`

{% endnote %}

Примеры получают все адреса контакта. Для компании замените имя метода по таблице выше и условие `contactId` на `companyId`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["contactId","=",3219]],"order":{"typeId":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.address.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["contactId","=",3219]],"order":{"typeId":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.contact.address.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type AddressListResult = {
      items: Array<{
        id: number
        typeId: number
        contactId: number
        requisiteId: number
        address1: string
        city: string
        postalCode: string
        country: string
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<AddressListResult>(
        'crm.contact.address.list',
        {
          filter: [
            ['contactId', '=', 3219],
          ],
          order: {
            typeId: 'asc',
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
      async function listAddresses() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.contact.address.list',
            {
              filter: [
                ['contactId', '=', 3219],
              ],
              order: {
                typeId: 'asc',
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

      document.addEventListener('DOMContentLoaded', listAddresses)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.contact.address.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["contactId", "=", 3219],
                ],
                "order": {
                    "typeId": "asc",
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
                'crm.contact.address.list',
                [
                    'filter' => [
                        ['contactId', '=', 3219],
                    ],
                    'order' => [
                        'typeId' => 'asc',
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
        'crm.contact.address.list',
        {
            filter: [
                ['contactId', '=', 3219],
            ],
            order: {
                typeId: 'asc',
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
        'crm.contact.address.list',
        [
            'filter' => [
                ['contactId', '=', 3219],
            ],
            'order' => [
                'typeId' => 'asc',
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
    res, err := client.Core().Call(ctx, "crm.contact.address.list", b24.Params{
    	"filter": []any{
    		[]any{"contactId", "=", 3219},
    	},
    	"order": b24.Params{
    		"typeId": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.address.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int    `json:"id"`
    		TypeID      int    `json:"typeId"`
    		ContactID   int    `json:"contactId"`
    		RequisiteID int    `json:"requisiteId"`
    		Address1    string `json:"address1"`
    		City        string `json:"city"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.TypeID, item.City, item.Address1)
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
                "id": 633,
                "typeId": 1,
                "contactId": 3219,
                "requisiteId": 547,
                "address1": "Невский проспект, 1",
                "address2": "офис 10",
                "city": "Санкт-Петербург",
                "postalCode": "191025",
                "region": "",
                "province": "",
                "country": "Россия",
                "countryCode": ""
            },
            {
                "id": 637,
                "typeId": 6,
                "contactId": 3219,
                "requisiteId": 547,
                "address1": "ул. Ленина, 5",
                "address2": "",
                "city": "Казань",
                "postalCode": "",
                "region": "",
                "province": "",
                "country": "",
                "countryCode": ""
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
[`object[]`](../../../data-types.md) | Адреса владельца со всеми полями. В адресах компании вместо `contactId` приходит `companyId`. Если адресов нет, массив пустой. [Описание полей адреса](./index.md#fields) ||
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
                "message": "Требуется указать фильтр по обязательному полю `contactId`",
                "field": "filter.contactId"
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
|| `filter` | Обязательное поле `filter` не указано | Передайте `filter` с условием по владельцу ||
|| `city` | В DTO `OwnerAddressContactDto` в поле `city` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по владельцу и `typeId` ||
|| `city` | В DTO `OwnerAddressContactDto` в поле `city` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` и `typeId` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.contactId` | Требуется указать фильтр по обязательному полю `contactId` | Добавьте в `filter` условие по владельцу. Для компании поле — `companyId` ||
|#

#### Неверный фильтр

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Используйте только оператор `=` и условия из таблицы [параметра filter](#filter) ||
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
|| `-` | Запись с ID = `#ID#` не найдена | Контакта или компании из фильтра нет или у вас нет права на просмотр. Проверьте идентификатор и имя метода ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.address.list`. Метод есть только у контакта и компании ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-address-get-rest-v3.md)
- [{#T}](./crm-entity-address-add-rest-v3.md)
- [{#T}](./crm-address-list-rest-v3.md)
