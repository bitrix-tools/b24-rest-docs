# Получить список параметров свойств товаров или вариаций v 3.0 catalog.product.property.feature.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.property.feature.list` возвращает параметры свойств, например все параметры одного свойства. В список попадают включенные и выключенные параметры, но только у свойств торгового каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей параметра, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор параметра свойства
- `propertyId` — идентификатор свойства
- `moduleId` — идентификатор модуля
- `featureId` — код параметра
- `isEnabled` — признак активности параметра

В ответ попадают только перечисленные поля. Если нужен `id`, перечислите и его.

По умолчанию: все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Фильтровать можно по всем полям из `select`.

Чтобы получить параметры одного свойства, передайте условие по `propertyId`. Для нескольких свойств перечислите их оператором `in`. Отрицание по `propertyId` не поддерживается: условие `["propertyId", "!=", 1285]` вернет ошибку.

Для `isEnabled` передавайте `true` или `false`.

Синтаксис и операторы описаны в [обзоре REST 3.0](../../rest-v3.md#filter) ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `id`, `propertyId`, `moduleId`, `featureId`. Сортировка по `isEnabled` вызывает ошибку.

Возможные значения направления:

- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество параметров на странице. Значения больше `1000` уменьшаются до `1000`. Ноль вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit` ||
|| **offset**
[`integer`](../../data-types.md) | Количество параметров, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества параметров. Если на странице вернулось меньше параметров, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.property.feature.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","moduleId","featureId","isEnabled"],"filter":[["propertyId","=",907]],"order":{"id":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.property.feature.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","moduleId","featureId","isEnabled"],"filter":[["propertyId","=",907]],"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.property.feature.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FeatureListResult = {
      items: Array<{
        id: number
        moduleId: string
        featureId: string
        isEnabled: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FeatureListResult>({
        method: 'catalog.product.property.feature.list',
        params: {
            select: ['id', 'moduleId', 'featureId', 'isEnabled'],
            filter: [
              ['propertyId', '=', 907],
            ],
            order: {
              id: 'ASC',
            },
          },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Features:', result.items.length)
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
      async function listPropertyFeatures() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.property.feature.list',
            params: {
                  select: ['id', 'moduleId', 'featureId', 'isEnabled'],
                  filter: [
                    ['propertyId', '=', 907],
                  ],
                  order: {
                    id: 'ASC',
                  },
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Features:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listPropertyFeatures)
    </script>
    ```

- Python

    У методов `catalog.product.property.feature.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.product.property.feature.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "moduleId", "featureId", "isEnabled"],
                "filter": [
                    ["propertyId", "=", 907],
                ],
                "order": {
                    "id": "ASC",
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
                    'catalog.product.property.feature.list',
                    [
                        'select' => ['id', 'moduleId', 'featureId', 'isEnabled'],
                        'filter' => [
                            ['propertyId', '=', 907],
                        ],
                        'order' => [
                            'id' => 'ASC',
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
        'catalog.product.property.feature.list',
        {
            select: ['id', 'moduleId', 'featureId', 'isEnabled'],
            filter: [
                ['propertyId', '=', 907],
            ],
            order: {
                id: 'ASC',
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
        'catalog.product.property.feature.list',
        [
            'select' => ['id', 'moduleId', 'featureId', 'isEnabled'],
            'filter' => [
                ['propertyId', '=', 907],
            ],
            'order' => [
                'id' => 'ASC',
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
    res, err := client.Core().Call(ctx, "catalog.product.property.feature.list", b24.Params{
    	"select": []string{"id", "moduleId", "featureId", "isEnabled"},
    	"filter": []any{
    		[]any{"propertyId", "=", 907},
    	},
    	"order": b24.Params{
    		"id": "ASC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.property.feature.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID        int    `json:"id"`
    		ModuleID  string `json:"moduleId"`
    		FeatureID string `json:"featureId"`
    		IsEnabled bool   `json:"isEnabled"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.FeatureID, item.IsEnabled)
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
                "id": 111,
                "moduleId": "iblock",
                "featureId": "DETAIL_PAGE_SHOW",
                "isEnabled": false
            },
            {
                "id": 113,
                "moduleId": "catalog",
                "featureId": "OFFER_TREE",
                "isEnabled": true
            },
            {
                "id": 115,
                "moduleId": "iblock",
                "featureId": "LIST_PAGE_SHOW",
                "isEnabled": false
            },
            {
                "id": 117,
                "moduleId": "catalog",
                "featureId": "IN_BASKET",
                "isEnabled": true
            }
        ]
    },
    "time": {
        "start": 1794923352,
        "finish": 1794923352.091853,
        "duration": 0.09185290336608887,
        "processing": 0,
        "date_start": "2026-11-17T16:49:12+03:00",
        "date_finish": "2026-11-17T16:49:12+03:00",
        "operating_reset_at": 1794923940,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив параметров на странице. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор параметра свойства ||
|| **propertyId**
[`integer`](../../data-types.md) | Идентификатор свойства, к которому относится параметр ||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит параметр: `iblock` или `catalog` ||
|| **featureId**
[`string`](../../data-types.md) | Код параметра, например `LIST_PAGE_SHOW` или `IN_BASKET` ||
|| **isEnabled**
[`boolean`](../../data-types.md) | Признак активности параметра: `true` — параметр включен, `false` — выключен ||
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
                "message": "Filter negation over `propertyId` is not supported"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Filter negation over `propertyId` is not supported | Уберите из фильтра отрицание по `propertyId`. Перечислите нужные свойства оператором `in` ||
|| `isEnabled` | В DTO `ProductPropertyFeatureDto` в поле `isEnabled` требуется наличие атрибута `Sortable` для такого запроса | Уберите `isEnabled` из `order` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `ProductPropertyFeatureDto` | Используйте только поля из списка параметра `select` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["propertyId","=",907]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../rest-v3.md#operators) ||
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
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-feature-add-rest-v3.md)
- [{#T}](./catalog-product-property-feature-update-rest-v3.md)
- [{#T}](./catalog-product-property-feature-get-rest-v3.md)
- [{#T}](./catalog-product-property-feature-available-list.md)
- [{#T}](./catalog-product-property-feature-field-list.md)
