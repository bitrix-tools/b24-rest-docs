# Получить список привязок типов цен к группам покупателей v 3.0 catalog.pricetype.group.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.pricetype.group.list` возвращает привязки типов цен к группам покупателей по фильтру. Привязка задает, может ли группа покупать по типу цены или только просматривать его. Идентификатор привязки из ответа нужен, чтобы удалить ее методом [catalog.pricetype.group.delete](./catalog-price-type-group-delete-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив полей привязки, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор привязки
- `catalogGroupId` — идентификатор типа цены
- `groupId` — идентификатор группы пользователей
- `access` — тип доступа к цене

Поле `id` возвращается всегда, даже если его нет в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **filter**
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Фильтровать можно по всем полям из `select`.

Для `access` передавайте `true` или `false`. Строки `Y` и `N` вызывают ошибку.

Синтаксис и операторы описаны в [обзоре REST 3.0](../../../rest-v3.md#filter) ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по всем полям из `select`.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию

По умолчанию: `{"id": "ASC"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество привязок на странице. Значения больше `1000` уменьшаются до `1000`. Ноль и отрицательные значения вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество привязок, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества привязок. Если на странице вернулось меньше привязок, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.group.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["catalogGroupId","groupId","access"],"filter":[["catalogGroupId","=",5]],"order":{"groupId":"asc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.group.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["catalogGroupId","groupId","access"],"filter":[["catalogGroupId","=",5]],"order":{"groupId":"asc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.group.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeGroupListResult = {
      items: Array<{
        id: number
        catalogGroupId: number
        groupId: number
        access: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeGroupListResult>({
        method: 'catalog.pricetype.group.list',
        params: {
          select: ['catalogGroupId', 'groupId', 'access'],
          filter: [
            ['catalogGroupId', '=', 5],
          ],
          order: {
            groupId: 'asc',
          },
          pagination: {
            limit: 10,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Bindings:', result.items.length)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listPriceTypeGroups() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.group.list',
            params: {
              select: ['catalogGroupId', 'groupId', 'access'],
              filter: [
                ['catalogGroupId', '=', 5],
              ],
              order: {
                groupId: 'asc',
              },
              pagination: {
                limit: 10,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Bindings:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listPriceTypeGroups)
    </script>
    ```

- Python

    В `b24pysdk` нет обертки для этого метода, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.pricetype.group.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["catalogGroupId", "groupId", "access"],
                "filter": [
                    ["catalogGroupId", "=", 5],
                ],
                "order": {"groupId": "asc"},
                "pagination": {"limit": 10},
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
                'catalog.pricetype.group.list',
                [
                    'select' => ['catalogGroupId', 'groupId', 'access'],
                    'filter' => [
                        ['catalogGroupId', '=', 5],
                    ],
                    'order' => [
                        'groupId' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 10,
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
        'catalog.pricetype.group.list',
        {
            select: ['catalogGroupId', 'groupId', 'access'],
            filter: [
                ['catalogGroupId', '=', 5],
            ],
            order: {
                groupId: 'asc',
            },
            pagination: {
                limit: 10,
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
        'catalog.pricetype.group.list',
        [
            'select' => ['catalogGroupId', 'groupId', 'access'],
            'filter' => [
                ['catalogGroupId', '=', 5],
            ],
            'order' => [
                'groupId' => 'asc',
            ],
            'pagination' => [
                'limit' => 10,
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
    res, err := client.Core().Call(ctx, "catalog.pricetype.group.list", b24.Params{
    	"select": []string{"catalogGroupId", "groupId", "access"},
    	"filter": []any{
    		[]any{"catalogGroupId", "=", 5},
    	},
    	"order": b24.Params{
    		"groupId": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.group.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID             int  `json:"id"`
    		CatalogGroupID int  `json:"catalogGroupId"`
    		GroupID        int  `json:"groupId"`
    		Access         bool `json:"access"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.GroupID, item.Access)
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
                "id": 85,
                "catalogGroupId": 5,
                "groupId": 1,
                "access": false
            },
            {
                "id": 89,
                "catalogGroupId": 5,
                "groupId": 1,
                "access": true
            },
            {
                "id": 87,
                "catalogGroupId": 5,
                "groupId": 2,
                "access": false
            },
            {
                "id": 91,
                "catalogGroupId": 5,
                "groupId": 2,
                "access": true
            }
        ]
    },
    "time": {
        "start": 1794923004,
        "finish": 1794923004.789385,
        "duration": 0.7893850803375244,
        "processing": 0,
        "date_start": "2026-11-17T16:43:24+03:00",
        "date_finish": "2026-11-17T16:43:24+03:00",
        "operating_reset_at": 1794923580,
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
[`array`](../../../data-types.md) | Массив привязок на странице. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор привязки ||
|| **catalogGroupId**
[`integer`](../../../data-types.md) | Идентификатор типа цены ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор группы пользователей ||
|| **access**
[`boolean`](../../../data-types.md) | Тип доступа:
- `true` — группа может покупать по этому типу цены
- `false` — группа может только просматривать этот тип цены

У одной группы может быть две привязки к одному типу цены: на просмотр и на покупку, как у групп `1` и `2` в примере ответа ||
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
                "message": "В поле `access` требуется тип данных `bool` для такого запроса",
                "field": "access"
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
|| `access` | В поле `access` требуется тип данных `bool` для такого запроса | Передайте в фильтре `true` или `false` вместо `Y` или `N` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `PriceTypeGroupDto` | Используйте только поля из списка параметра `select` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["catalogGroupId","=",5]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../../rest-v3.md#operators) ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `ASC` или `DESC` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Управление типами цен» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-group-add-rest-v3.md)
- [{#T}](./catalog-price-type-group-delete-rest-v3.md)
- [{#T}](./catalog-price-type-group-field-list.md)
- [{#T}](./catalog-price-type-group-field-get.md)
- [{#T}](../catalog-price-type-list-rest-v3.md)
