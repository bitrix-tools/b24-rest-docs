# Получить список торговых каталогов v 3.0 catalog.catalog.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.catalog.list` возвращает список торговых каталогов с фильтрацией, сортировкой и постраничной навигацией.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей торгового каталога, которые нужно вернуть в ответе, например `["id","name","productIblockId"]`.

Доступные поля:

- `id` — идентификатор торгового каталога
- `iblockId` — идентификатор инфоблока каталога
- `yandexExport` — признак выгрузки в Яндекс Маркет
- `subscription` — признак продажи контента
- `vatId` — идентификатор ставки НДС
- `productIblockId` — идентификатор инфоблока товаров для каталога вариаций
- `skuPropertyId` — идентификатор свойства привязки вариации к товару
- `iblockTypeId` — тип инфоблока
- `lid` — идентификатор сайта
- `name` — название каталога

Поле `id` возвращается, только если указано в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля ||
|| **filter**
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`, например `[["productIblockId", ">", 0]]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтровать можно по всем полям из параметра `select`.

Поддерживаются операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`. Оператор `between`, группы с логикой `or` и отрицание не поддерживаются.

Для одного поля нельзя передать два условия с одинаковым оператором. Условие `in` с пустым списком возвращает пустой список ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "desc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по всем полям из параметра `select`.

По умолчанию: `{"id": "asc"}` ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание структуры объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество каталогов на странице.

Допустимые значения: от `1` до `1000`. Значения больше `1000` уменьшаются до `1000`, нулевое и отрицательное значение вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы. Смещение вычисляется как `(page - 1) * limit`.

Если передан `page`, значение `offset` не учитывается ||
|| **offset**
[`integer`](../../data-types.md) | Смещение от начала списка. Значение должно быть кратно `limit`, например `0`, `10`, `20` при `limit`, равном `10`.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.catalog.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","productIblockId"],"filter":[["iblockTypeId","=","CRM_PRODUCT_CATALOG"]],"order":{"id":"desc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","productIblockId"],"filter":[["iblockTypeId","=","CRM_PRODUCT_CATALOG"]],"order":{"id":"desc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.catalog.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CatalogListResult = {
      items: Array<{
        id: number
        name: string
        productIblockId: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<CatalogListResult>({
        method: 'catalog.catalog.list',
        params: {
          select: [
            'id',
            'name',
            'productIblockId',
          ],
          filter: [
            ['iblockTypeId', '=', 'CRM_PRODUCT_CATALOG'],
          ],
          order: {
            id: 'desc',
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
        console.info('Catalogs:', result.items)
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
      async function listCatalogs() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.catalog.list',
            params: {
              select: [
                'id',
                'name',
                'productIblockId',
              ],
              filter: [
                ['iblockTypeId', '=', 'CRM_PRODUCT_CATALOG'],
              ],
              order: {
                id: 'desc',
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
          console.info('Catalogs:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listCatalogs)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.catalog.list(
            select=["id", "name", "productIblockId"],
            filter=[
                ["iblockTypeId", "=", "CRM_PRODUCT_CATALOG"],
            ],
            order={"id": "desc"},
            pagination={"limit": 10},
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
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
                'catalog.catalog.list',
                [
                    'select' => ['id', 'name', 'productIblockId'],
                    'filter' => [
                        ['iblockTypeId', '=', 'CRM_PRODUCT_CATALOG'],
                    ],
                    'order' => ['id' => 'desc'],
                    'pagination' => ['limit' => 10],
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
        'catalog.catalog.list',
        {
            select: ['id', 'name', 'productIblockId'],
            filter: [
                ['iblockTypeId', '=', 'CRM_PRODUCT_CATALOG'],
            ],
            order: { id: 'desc' },
            pagination: { limit: 10 },
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
        'catalog.catalog.list',
        [
            'select' => ['id', 'name', 'productIblockId'],
            'filter' => [
                ['iblockTypeId', '=', 'CRM_PRODUCT_CATALOG'],
            ],
            'order' => ['id' => 'desc'],
            'pagination' => ['limit' => 10],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.catalog.list", b24.Params{
    	"select": []string{"id", "name", "productIblockId"},
    	"filter": []any{
    		[]any{"iblockTypeId", "=", "CRM_PRODUCT_CATALOG"},
    	},
    	"order": b24.Params{
    		"id": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.catalog.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID              int    `json:"id"`
    		Name            string `json:"name"`
    		ProductIblockID int    `json:"productIblockId"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name, item.ProductIblockID)
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
                "id": 27,
                "productIblockId": 25,
                "name": "Товарный каталог CRM (предложения)"
            },
            {
                "id": 25,
                "productIblockId": 0,
                "name": "Товарный каталог CRM"
            }
        ]
    },
    "time": {
        "start": 1792665492,
        "finish": 1792665492.231132,
        "duration": 0.23113203048706055,
        "processing": 0,
        "date_start": "2026-10-22T13:38:12+03:00",
        "date_finish": "2026-10-22T13:38:12+03:00",
        "operating_reset_at": 1792666080,
        "operating": 0
    }
}
```

### Возвращаемые данные {#returned-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком торговых каталогов ||
|| **result.items**
[`array`](../../data-types.md) | Массив торговых каталогов на странице. Состав полей зависит от `select`. Если страниц больше нет, массив пустой ||
|| **result.items[].id**
[`integer`](../../data-types.md) | Идентификатор торгового каталога. Совпадает с `iblockId` ||
|| **result.items[].iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока, который зарегистрирован как торговый каталог ||
|| **result.items[].yandexExport**
[`string`](../../data-types.md) | Признак выгрузки товаров каталога в Яндекс Маркет: `Y` — да, `N` — нет ||
|| **result.items[].subscription**
[`string`](../../data-types.md) | Признак продажи контента: `Y` — да, `N` — нет. Используется только в коробочной версии ||
|| **result.items[].vatId**
[`integer`](../../data-types.md) | Идентификатор ставки НДС каталога. `0` — ставка не задана ||
|| **result.items[].productIblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока товаров, к которому привязан каталог вариаций. `0` — каталог не является каталогом вариаций ||
|| **result.items[].skuPropertyId**
[`integer`](../../data-types.md) | Идентификатор свойства, в котором вариация хранит идентификатор головного товара. `0` — каталог не является каталогом вариаций ||
|| **result.items[].iblockTypeId**
[`string`](../../data-types.md) | Тип инфоблока. Для торговых каталогов CRM — `CRM_PRODUCT_CATALOG`, для каталога на основе универсального списка — `lists` ||
|| **result.items[].lid**
[`string`](../../data-types.md) | Идентификатор сайта, к которому привязан инфоблок, например `s1` ||
|| **result.items[].name**
[`string`](../../data-types.md) | Название инфоблока торгового каталога ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Filter OR groups are not supported"
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
|| `-` | Filter OR groups are not supported | Уберите из фильтра группу с логикой `or`. Выполните несколько запросов или используйте оператор `in` ||
|| `-` | Filter NOT groups are not supported | Уберите из фильтра отрицание. Используйте оператор `!=` ||
|| `-` | Filter operator "between" is not supported | Замените `between` двумя условиями с операторами `>=` и `<=` ||
|| `-` | Filter has conflicting conditions for the field "#FIELD#" | Оставьте для поля одно условие с каждым оператором. Для нескольких значений используйте `in` ||
|| `-` | pagination.offset must be a non-negative multiple of pagination.limit | Передайте `offset`, кратный `limit`, или используйте `page` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Передайте `filter` массивом условий, например `[["productIblockId",">",0]]` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in` ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `order` | Не удается распознать выражение сортировки `#ORDER#` | Передайте направление `asc` или `desc` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число, в `offset` — неотрицательное число, в `page` — число ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `CatalogDto` | Укажите только поля из описания параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав на просмотр настроек торгового каталога. Вызовите метод от имени администратора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-get-rest-v3.md)
- [{#T}](./catalog-catalog-is-offers-rest-v3.md)
- [{#T}](./catalog-catalog-field-list.md)
- [{#T}](../../rest-v3.md)
