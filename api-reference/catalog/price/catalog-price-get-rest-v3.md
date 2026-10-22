# Получить цену товара по идентификатору v 3.0 catalog.price.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.price.get` возвращает поля цены товара по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор цены.

Идентификатор можно получить методом [catalog.price.list](./catalog-price-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Массив полей цены, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор цены
- `productId` — идентификатор товара или вариации
- `catalogGroupId` — идентификатор типа цены
- `price` — цена
- `currency` — код валюты
- `extraId` — идентификатор наценки
- `quantityFrom` — нижняя граница диапазона количества
- `quantityTo` — верхняя граница диапазона количества
- `priceScale` — цена в базовой валюте
- `timestampX` — дата и время последнего изменения

Поле `id` возвращается всегда, даже если его нет в `select`.

По умолчанию: все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.price.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":891,"select":["id","productId","catalogGroupId","price","currency","priceScale"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.price.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":891,"select":["id","productId","catalogGroupId","price","currency","priceScale"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.price.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceGetResult = {
      item: {
        id: number
        productId: number
        catalogGroupId: number
        price: number
        currency: string
        priceScale: number
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceGetResult>({
        method: 'catalog.price.get',
        params: {
          id: 891,
          select: [
            'id',
            'productId',
            'catalogGroupId',
            'price',
            'currency',
            'priceScale',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Price:', result.item.price, result.item.currency)
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
      async function getPrice() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.price.get',
            params: {
              id: 891,
              select: [
                'id',
                'productId',
                'catalogGroupId',
                'price',
                'currency',
                'priceScale',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Price:', result.item.price, result.item.currency)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPrice)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price.get(
            bitrix_id=891,
            select=[
                "id",
                "productId",
                "catalogGroupId",
                "price",
                "currency",
                "priceScale",
            ],
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
                'catalog.price.get',
                [
                    'id' => 891,
                    'select' => [
                        'id',
                        'productId',
                        'catalogGroupId',
                        'price',
                        'currency',
                        'priceScale',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.price.get',
        {
            id: 891,
            select: [
                'id',
                'productId',
                'catalogGroupId',
                'price',
                'currency',
                'priceScale',
            ],
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
        'catalog.price.get',
        [
            'id' => 891,
            'select' => [
                'id',
                'productId',
                'catalogGroupId',
                'price',
                'currency',
                'priceScale',
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
    res, err := client.Core().Call(ctx, "catalog.price.get", b24.Params{
    	"id":     891,
    	"select": []string{"id", "productId", "catalogGroupId", "price", "currency", "priceScale"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.price.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID             int     `json:"id"`
    	ProductID      int     `json:"productId"`
    	CatalogGroupID int     `json:"catalogGroupId"`
    	Price          float64 `json:"price"`
    	Currency       string  `json:"currency"`
    	PriceScale     float64 `json:"priceScale"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Price, item.Currency)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 891,
            "productId": 7525,
            "catalogGroupId": 1,
            "price": 1490,
            "currency": "RUB",
            "priceScale": 1490
        }
    },
    "time": {
        "start": 1792668101,
        "finish": 1792668101.356511,
        "duration": 0.35651111602783203,
        "processing": 0,
        "date_start": "2026-10-22T14:21:41+03:00",
        "date_finish": "2026-10-22T14:21:41+03:00",
        "operating_reset_at": 1792668660,
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
|| **result.item**
[`object`](../../data-types.md) | Поля цены. Состав зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор цены ||
|| **productId**
[`integer`](../../data-types.md) | Идентификатор товара или вариации ||
|| **catalogGroupId**
[`integer`](../../data-types.md) | Идентификатор типа цены ||
|| **price**
[`double`](../../data-types.md) | Цена ||
|| **currency**
[`string`](../../data-types.md) | Код валюты ||
|| **extraId**
[`integer`](../../data-types.md) | Идентификатор наценки. `0`, если наценка не задана ||
|| **quantityFrom**
[`integer`](../../data-types.md) | Нижняя граница диапазона количества. `0`, если граница не задана ||
|| **quantityTo**
[`integer`](../../data-types.md) | Верхняя граница диапазона количества. `0`, если граница не задана ||
|| **priceScale**
[`double`](../../data-types.md) | Цена в базовой валюте. Вычисляется автоматически ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения цены ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте в `id` положительное число ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Цены с таким идентификатором нет. Проверьте идентификатор методом [catalog.price.list](./catalog-price-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `PriceDto` | Укажите в `select` только поля из списка параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Изменение цены продажи товара» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-list-rest-v3.md)
- [{#T}](./catalog-price-update-rest-v3.md)
- [{#T}](./catalog-price-delete-rest-v3.md)
- [{#T}](./catalog-price-field-list.md)
