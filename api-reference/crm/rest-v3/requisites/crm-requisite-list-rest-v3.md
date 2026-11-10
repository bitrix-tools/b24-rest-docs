# Получить список реквизитов Битрикс24 v 3.0 crm.requisite.list

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

Метод `crm.requisite.list` возвращает реквизиты всех контактов и компаний Битрикс24, включая мои компании, с фильтрацией и постраничной навигацией. Метод подходит для выгрузки и поиска реквизитов, например по ИНН. Реквизиты одного контакта или одной компании возвращает метод [crm.<тип>.requisite.list](./crm-entity-requisite-list-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, группы условий — с `"type": "filter"`. Синтаксис — в [обзоре REST 3.0](../../../rest-v3.md#filter).

Фильтровать можно по `id`, `ownerId`, `ownerTypeId`, `presetId`, `active`, `xmlId` и большинству полей данных реквизита: `inn`, `kpp`, `ogrn`, `companyTitle`, `lastName` и другим. Полный список возвращает `crm.requisite.field.list` с признаком `filterable`.

`ownerTypeId` — тип владельца: `3` — контакт, `4` — компания. Другие типы вызывают ошибку ||
|| **select**
[`array`](../../../data-types.md) | Список полей реквизита, которые нужно вернуть. Поля — как у [реквизита](./index.md#fields), но владелец задается парой `ownerTypeId` и `ownerId`, а не `companyId` или `contactId`. Вложенные `addresses` и `bankRequisites` метод не возвращает.

По умолчанию: только `id` ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по `id` и `ownerId`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация: `limit` — количество реквизитов на странице, по умолчанию `50`, `offset` — сколько реквизитов пропустить ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.requisite.list`

{% endnote %}

Примеры ищут реквизиты компаний с ИНН `7701234567`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerTypeId","=",4],["inn","=","7701234567"]],"select":["id","ownerTypeId","ownerId","presetId","name","inn"],"order":{"id":"asc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerTypeId","=",4],["inn","=","7701234567"]],"select":["id","ownerTypeId","ownerId","presetId","name","inn"],"order":{"id":"asc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.requisite.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RequisiteListResult = {
      items: Array<{
        id: number
        ownerTypeId: number
        ownerId: number
        presetId: number
        name: string
        inn: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RequisiteListResult>(
        'crm.requisite.list',
        {
          filter: [
            ['ownerTypeId', '=', 4],
            ['inn', '=', '7701234567'],
          ],
          select: ['id', 'ownerTypeId', 'ownerId', 'presetId', 'name', 'inn'],
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
        console.info('Requisites:', result.items)
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
      async function listAllRequisites() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.requisite.list',
            {
              filter: [
                ['ownerTypeId', '=', 4],
                ['inn', '=', '7701234567'],
              ],
              select: ['id', 'ownerTypeId', 'ownerId', 'presetId', 'name', 'inn'],
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
          console.info('Requisites:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listAllRequisites)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.requisite.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerTypeId", "=", 4],
                    ["inn", "=", "7701234567"],
                ],
                "select": ["id", "ownerTypeId", "ownerId", "presetId", "name", "inn"],
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
                'crm.requisite.list',
                [
                    'filter' => [
                        ['ownerTypeId', '=', 4],
                        ['inn', '=', '7701234567'],
                    ],
                    'select' => ['id', 'ownerTypeId', 'ownerId', 'presetId', 'name', 'inn'],
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
        'crm.requisite.list',
        {
            filter: [
                ['ownerTypeId', '=', 4],
                ['inn', '=', '7701234567'],
            ],
            select: ['id', 'ownerTypeId', 'ownerId', 'presetId', 'name', 'inn'],
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
        'crm.requisite.list',
        [
            'filter' => [
                ['ownerTypeId', '=', 4],
                ['inn', '=', '7701234567'],
            ],
            'select' => ['id', 'ownerTypeId', 'ownerId', 'presetId', 'name', 'inn'],
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
    res, err := client.Core().Call(ctx, "crm.requisite.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerTypeId", "=", 4},
    		[]string{"inn", "=", "7701234567"},
    	},
    	"select": []string{"id", "ownerTypeId", "ownerId", "presetId", "name", "inn"},
    	"order": b24.Params{
    		"id": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.requisite.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int     `json:"id"`
    		OwnerTypeID int     `json:"ownerTypeId"`
    		OwnerID     int     `json:"ownerId"`
    		PresetID    int     `json:"presetId"`
    		Name        string  `json:"name"`
    		Inn         *string `json:"inn"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.OwnerTypeID, item.OwnerID, item.Name)
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
                "id": 549,
                "ownerTypeId": 4,
                "ownerId": 3167,
                "presetId": 1,
                "name": "Основной реквизит",
                "inn": "7701234567"
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
[`object[]`](../../../data-types.md) | Реквизиты с полями из `select`. Без `select` у каждого реквизита только `id`. [Описание полей реквизита](./index.md#fields) ||
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
                "message": "Метод не возвращает реквизиты владельца типа 2.",
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
|| `name` | В DTO `RequisiteDto` в поле `name` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте по полям с признаком `filterable` из `crm.requisite.field.list` ||
|| `name` | В DTO `RequisiteDto` в поле `name` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id` и `ownerId` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.ownerTypeId` | Метод не возвращает реквизиты владельца типа `#OWNER_TYPE_ID#`. | Передайте `3` — контакт или `4` — компания ||
|#

#### Неизвестный оператор

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../../rest-v3.md#filter) ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `RequisiteDto` | Проверьте имена полей. Владелец задается `ownerTypeId` и `ownerId`, вложенных `addresses` и `bankRequisites` в методе нет ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Метод доступен только администратору Битрикс24 ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре — `crm.requisite.list` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-list-rest-v3.md)
- [{#T}](./crm-entity-requisite-get-rest-v3.md)
