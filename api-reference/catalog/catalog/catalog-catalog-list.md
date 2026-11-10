# Получить список торговых каталогов catalog.catalog.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.catalog.list` возвращает список торговых каталогов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть. Доступны поля объекта [catalog_catalog](../data-types.md#catalog_catalog): `id`, `iblockId`, `iblockTypeId`, `lid`, `name`, `productIblockId`, `skuPropertyId`, `subscription`, `vatId`, `yandexExport`.

Если параметр не передан или передан пустой массив, метод возвращает все поля. Неизвестные поля метод пропускает без ошибки ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации торговых каталогов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

В `field` передавайте поля объекта [catalog_catalog](../data-types.md#catalog_catalog). Условие с неизвестным полем метод пропускает без ошибки.

К ключу можно добавить префикс, который задает условие:
- `=` — равно. Используется по умолчанию
- `!` или `!=` — не равно
- `>` — больше
- `>=` — больше или равно
- `<` — меньше
- `<=` — меньше или равно
- `@` — входит в список, значение передается массивом
- `!@` — не входит в список, значение передается массивом
- `%` — содержит подстроку. Символ `%` в значении передавать не нужно

Префиксы `=%`, `%=`, `!%`, `!=%` и `!%=` метод не поддерживает: условие с ними не применяется ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки торговых каталогов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

В `field` передавайте поля объекта [catalog_catalog](../data-types.md#catalog_catalog).

Возможные значения `order`:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `{"id": "asc"}` ||
|| **start**
[`integer`](../../data-types.md) | Параметр для постраничной навигации.

Размер страницы результатов — 50 записей. Чтобы получить вторую страницу, передайте `50`, третью — `100` и так далее.

Формула расчета значения: `start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","iblockTypeId","lid","name","productIblockId","skuPropertyId","subscription","vatId","yandexExport"],"filter":{">=id":25,"@vatId":[1,2],"productIblockId":25},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","iblockId","iblockTypeId","lid","name","productIblockId","skuPropertyId","subscription","vatId","yandexExport"],"filter":{">=id":25,"@vatId":[1,2],"productIblockId":25},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.catalog.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogCatalogListResult = {
      catalogs: {
        id: number
        iblockId: number
        iblockTypeId: string
        lid: string
        name: string
        productIblockId: number | null
        skuPropertyId: number | null
        subscription: 'Y' | 'N'
        vatId: number | null
        yandexExport: 'Y' | 'N'
      }[]
    }

    try {
      // catalog.catalog.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<CatalogCatalogListResult>({
        method: 'catalog.catalog.list',
        params: {
          select: [
            'id',
            'iblockId',
            'iblockTypeId',
            'lid',
            'name',
            'productIblockId',
            'skuPropertyId',
            'subscription',
            'vatId',
            'yandexExport',
          ],
          filter: {
            '>=id': 25,
            '@vatId': [1, 2],
            productIblockId: 25,
          },
          order: {
            id: 'desc',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Catalogs count:', result.catalogs.length, 'First:', result.catalogs[0])
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listCatalogs() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.catalog.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.catalog.list',
            params: {
              select: [
                'id',
                'iblockId',
                'iblockTypeId',
                'lid',
                'name',
                'productIblockId',
                'skuPropertyId',
                'subscription',
                'vatId',
                'yandexExport',
              ],
              filter: {
                '>=id': 25,
                '@vatId': [1, 2],
                productIblockId: 25,
              },
              order: {
                id: 'desc',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Catalogs count:', result.catalogs.length, 'First:', result.catalogs[0])
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
            select=[
                "id",
                "iblockId",
                "iblockTypeId",
                "lid",
                "name",
                "productIblockId",
                "skuPropertyId",
                "subscription",
                "vatId",
                "yandexExport",
            ],
            filter={
                ">=id": 25,
                "@vatId": [
                    1,
                    2,
                ],
                "productIblockId": 25,
            },
            order={
                "id": "desc",
            },
            start=0,
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.catalog.list',
                [
                    'select' => [
                        'id',
                        'iblockId',
                        'iblockTypeId',
                        'lid',
                        'name',
                        'productIblockId',
                        'skuPropertyId',
                        'subscription',
                        'vatId',
                        'yandexExport',
                    ],
                    'filter' => [
                        '>=id' => 25,
                        '@vatId' => [1, 2],
                        'productIblockId' => 25,
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching catalog list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "catalog.catalog.list", {
            "select": [
                "id",
                "iblockId",
                "iblockTypeId",
                "lid",
                "name",
                "productIblockId",
                "skuPropertyId",
                "subscription",
                "vatId",
                "yandexExport"
            ],
            "filter": {
                ">=id": 25,
                "@vatId": [1, 2],
                "productIblockId": 25
            },
            "order": {
                "id": "desc"
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.catalog.list',
        [
            'select' => [
                'id',
                'iblockId',
                'iblockTypeId',
                'lid',
                'name',
                'productIblockId',
                'skuPropertyId',
                'subscription',
                'vatId',
                'yandexExport',
            ],
            'filter' => [
                '>=id' => 25,
                '@vatId' => [1, 2],
                'productIblockId' => 25,
            ],
            'order' => [
                'id' => 'desc',
            ]
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
    	"select": []string{"id", "iblockId", "iblockTypeId", "lid", "name", "productIblockId", "skuPropertyId", "subscription", "vatId", "yandexExport"},
    	"filter": b24.Params{
    		">=id":            25,
    		"@vatId":          []int{1, 2},
    		"productIblockId": 25,
    	},
    	"order": b24.Params{
    		"id": "desc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.catalog.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "catalogs".
    raw, ok := b24.Unwrap(res.Result, "catalogs")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа catalogs")
    }

    var items []struct {
    	IblockID        b24.ID `json:"iblockId"`
    	IblockTypeID    string `json:"iblockTypeId"`
    	ID              b24.ID `json:"id"`
    	Lid             string `json:"lid"`
    	Name            string `json:"name"`
    	ProductIblockID b24.ID `json:"productIblockId"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.IblockID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "catalogs": [
            {
                "iblockId": 27,
                "iblockTypeId": "CRM_PRODUCT_CATALOG",
                "id": 27,
                "lid": "s1",
                "name": "Товарный каталог CRM (предложения)",
                "productIblockId": 25,
                "skuPropertyId": 101,
                "subscription": "N",
                "vatId": 1,
                "yandexExport": "N"
            }
        ]
    },
    "total": 1,
    "time": {
        "start": 1793613124,
        "finish": 1793613124.823565,
        "duration": 0.8235650062561035,
        "processing": 0,
        "date_start": "2026-11-02T12:52:04+03:00",
        "date_finish": "2026-11-02T12:52:04+03:00",
        "operating_reset_at": 1793613720,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.catalogs**
[`catalog_catalog[]`](../data-types.md#catalog_catalog) | Массив объектов с информацией о выбранных торговых каталогах ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040300010",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права на просмотр настроек Битрикс24 ||
|| `400` | `200040300030` | Access Denied | У пользователя нет права на чтение торгового каталога ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-get.md)
- [{#T}](./catalog-catalog-is-offers.md)
- [{#T}](./catalog-catalog-get-fields.md)