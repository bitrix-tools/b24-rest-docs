# Добавить цену товара v 3.0 catalog.price.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение цены продажи товара» и правом изменять цены товара в инфоблоке каталога

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.price.add` добавляет цену товара и возвращает ее поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями новой цены. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`integer`](../../data-types.md) | Идентификатор товара или вариации.

Идентификатор можно получить методом [catalog.product.list](../product/catalog-product-list.md).

После создания цены изменить `productId` нельзя ||
|| **catalogGroupId***
[`integer`](../../data-types.md) | Идентификатор типа цены.

Идентификатор можно получить методом [catalog.pricetype.list](../price-type/catalog-price-type-list-rest-v3.md).

После создания цены изменить `catalogGroupId` нельзя ||
|| **price***
[`double`](../../data-types.md) | Цена. Отрицательное значение вызывает ошибку.

Если передан `extraId` и тип цены не базовый, цена пересчитывается от базовой цены товара с учетом наценки ||
|| **currency***
[`string`](../../data-types.md) | Код валюты, например `RUB`. Не длиннее трех символов.

Коды валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|| **extraId**
[`integer`](../../data-types.md) | Идентификатор наценки.

Идентификатор можно получить методом [catalog.extra.list](../extra/catalog-extra-list-rest-v3.md).

Для базового типа цены наценка не применяется, значение сбрасывается в `0`. Несуществующий идентификатор тоже сбрасывается в `0` без ошибки ||
|| **quantityFrom**
[`integer`](../../data-types.md) | Нижняя граница диапазона количества товара, для которого действует цена. `0` — без нижней границы.

Диапазоны у всех типов цен товара должны совпадать с диапазонами базовой цены ||
|| **quantityTo**
[`integer`](../../data-types.md) | Верхняя граница диапазона количества товара, для которого действует цена. `0` — без верхней границы ||
|#

Без диапазонов количества у товара может быть только одна цена каждого типа.

Поля `id`, `priceScale` и `timestampX` заполняются автоматически. Если передать их в `fields`, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.price.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7525,"catalogGroupId":1,"price":1500,"currency":"RUB"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.price.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7525,"catalogGroupId":1,"price":1500,"currency":"RUB"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.price.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceAddResult = {
      item: {
        id: number
        productId: number
        catalogGroupId: number
        price: number
        currency: string
        extraId: number
        quantityFrom: number
        quantityTo: number
        priceScale: number
        timestampX: ISODate
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceAddResult>({
        method: 'catalog.price.add',
        params: {
          fields: {
            productId: 7525,
            catalogGroupId: 1,
            price: 1500,
            currency: 'RUB',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Price created:', result.item.id)
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
      async function addPrice() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.price.add',
            params: {
              fields: {
                productId: 7525,
                catalogGroupId: 1,
                price: 1500,
                currency: 'RUB',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Price created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPrice)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price.add(
            fields={
                "productId": 7525,
                "catalogGroupId": 1,
                "price": 1500,
                "currency": "RUB",
            },
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
                'catalog.price.add',
                [
                    'fields' => [
                        'productId' => 7525,
                        'catalogGroupId' => 1,
                        'price' => 1500,
                        'currency' => 'RUB',
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
        'catalog.price.add',
        {
            fields: {
                productId: 7525,
                catalogGroupId: 1,
                price: 1500,
                currency: 'RUB',
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
        'catalog.price.add',
        [
            'fields' => [
                'productId' => 7525,
                'catalogGroupId' => 1,
                'price' => 1500,
                'currency' => 'RUB',
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
    res, err := client.Core().Call(ctx, "catalog.price.add", b24.Params{
    	"fields": b24.Params{
    		"productId":      7525,
    		"catalogGroupId": 1,
    		"price":          1500,
    		"currency":       "RUB",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.price.add: %w", err)
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
            "price": 1500,
            "currency": "RUB",
            "extraId": 0,
            "quantityFrom": 0,
            "quantityTo": 0,
            "priceScale": 1500,
            "timestampX": "2026-10-22T14:19:56+03:00"
        }
    },
    "time": {
        "start": 1792667996,
        "finish": 1792667996.347515,
        "duration": 0.3475151062011719,
        "processing": 0,
        "date_start": "2026-10-22T14:19:56+03:00",
        "date_finish": "2026-10-22T14:19:56+03:00",
        "operating_reset_at": 1792668540,
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
[`object`](../../data-types.md) | Поля созданной цены. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Validate price error. Catalog product is allowed has only single price without ranges in price group.",
                "field": "catalogGroupId"
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
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `price` | В поле `price` требуется тип данных `float` для такого запроса | Передайте число ||
|| `catalogGroupId` | Validate price error. Catalog price group is wrong | Типа цены с таким идентификатором нет. Проверьте идентификатор методом [catalog.pricetype.list](../price-type/catalog-price-type-list-rest-v3.md) ||
|| `catalogGroupId` | Validate price error. Catalog product is allowed has only single price without ranges in price group. | У товара уже есть цена этого типа. Измените ее методом [catalog.price.update](./catalog-price-update-rest-v3.md) ||
|| `quantityFrom` | Validate price error. Ranges of base price are not equal to another price group range | Задайте диапазоны количества так же, как у базовой цены товара ||
|| `quantityTo` | Invalid quantity range entry: no price is specified for quantity over `#QUANTITY#` | Добавьте цену для количества больше верхней границы или передайте `quantityTo` равным `0` ||
|| `BX_ERROR` | Неверная цена | Передайте в `price` число от `0` и больше ||
|| `BX_ERROR` | Неверная валюта | Передайте код существующей валюты ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `productId` | Не заполнено обязательное поле "productId" | Передайте `productId` в `fields` ||
|| `catalogGroupId` | Не заполнено обязательное поле "catalogGroupId" | Передайте `catalogGroupId` в `fields` ||
|| `price` | Не заполнено обязательное поле "price" | Передайте `price` в `fields` ||
|| `currency` | Не заполнено обязательное поле "currency" | Передайте `currency` в `fields` ||
|| `currency` | Длина строки должна быть не больше, чем 3 знака | Передайте трехбуквенный код валюты ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля `id`, `priceScale` и `timestampX` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `PriceDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на изменение цен. Ошибка также возвращается, если товара с идентификатором `productId` нет ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-update-rest-v3.md)
- [{#T}](./catalog-price-get-rest-v3.md)
- [{#T}](./catalog-price-list-rest-v3.md)
- [{#T}](./catalog-price-delete-rest-v3.md)
- [{#T}](./catalog-price-field-list.md)
