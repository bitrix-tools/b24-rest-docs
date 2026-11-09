# Получить значения полей вариации товара catalog.product.offer.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение вариации в инфоблоке и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

Метод `catalog.product.offer.get` возвращает значения всех полей и свойств вариации товара по ее идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_offer.id`](../../data-types.md#catalog_product_offer) | Идентификатор вариации.

Получить идентификаторы вариаций можно методом [catalog.product.offer.list](./catalog-product-offer-list.md) ||
|#

Если в `id` передать идентификатор товара, а не вариации, метод вернет пустой массив `{"offer": []}` без ошибки.

Цены вариации метод не возвращает. Чтобы получить цены, используйте методы [catalog.price.*](../../price/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7695}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7695,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OfferProperty = {
      value: string
      valueId: string
      valueEnum?: string
    }

    type OfferFile = {
      id: string
      url: string
      urlMachine: string
    }

    // Shape of the offer returned in result (match the "response handling" section of the page)
    type Offer = {
      id: number
      iblockId: number
      name: string
      active: string
      code: string | null
      xmlId: string
      sort: number | null
      type: number
      available: string
      parentId: OfferProperty | null
      quantity: number | null
      purchasingPrice?: string | null
      purchasingCurrency?: string | null
      previewPicture: OfferFile | null
      detailPicture: OfferFile | null
      dateCreate: ISODate
      timestampX: ISODate
      [key: `property${number}`]: OfferProperty | OfferProperty[] | null
    }

    try {
      const response = await $b24.actions.v2.call.make<{ offer: Offer }>({
        method: 'catalog.product.offer.get',
        params: {
          id: 7695,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Offer:', result.offer.id, result.offer.name, result.offer.parentId?.value)
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
      async function getOffer() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.offer.get',
            params: {
                  id: 7695,
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Offer:', result.offer.id, result.offer.name, result.offer.parentId?.value)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOffer)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.get(
            bitrix_id=7695,
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
                'catalog.product.offer.get',
                [
                    'id' => 7695,
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

    ```js
    BX24.callMethod(
        'catalog.product.offer.get',
        {
            id: 7695,
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.offer.get',
        [
            'id' => 7695,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.offer.get", b24.Params{
    	"id": 7695,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "offer".
    raw, ok := b24.Unwrap(res.Result, "offer")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа offer")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID              b24.ID   `json:"id"`
    	IblockID        int      `json:"iblockId"`
    	Name            string   `json:"name"`
    	Active          string   `json:"active"`
    	Code            *string  `json:"code"`
    	Sort            *int     `json:"sort"`
    	Type            int      `json:"type"`
    	Quantity        *float64 `json:"quantity"`
    	PurchasingPrice *string  `json:"purchasingPrice"`
    	ParentID        *struct {
    		Value   string `json:"value"`
    		ValueID string `json:"valueId"`
    	} `json:"parentId"`
    	PreviewPicture *struct {
    		ID  string `json:"id"`
    		URL string `json:"url"`
    	} `json:"previewPicture"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "offer": {
            "active": "Y",
            "available": "Y",
            "barcodeMulti": "N",
            "bundle": "N",
            "canBuyZero": "Y",
            "code": "tshirt-red-m",
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-05T19:19:32+03:00",
            "detailPicture": null,
            "detailText": null,
            "detailTextType": "text",
            "height": 20,
            "iblockId": 27,
            "iblockSection": null,
            "iblockSectionId": null,
            "id": 7695,
            "length": 700,
            "measure": 9,
            "modifiedBy": 1269,
            "name": "Футболка красная, M",
            "parentId": {
                "value": "7603",
                "valueId": "4149"
            },
            "previewPicture": {
                "id": "40057",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40057&fields%5BproductId%5D=7695",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40057&fields%5BproductId%5D=7695"
            },
            "previewText": "Хлопок 100%, плотность 180 г/м²",
            "previewTextType": "text",
            "property429": null,
            "property891": {
                "value": "Темно-красный",
                "valueId": "4155"
            },
            "property895": null,
            "property905": null,
            "property907": {
                "value": "1603",
                "valueEnum": "M",
                "valueId": "4157"
            },
            "property909": null,
            "property911": null,
            "property925": null,
            "property937": null,
            "purchasingCurrency": "RUB",
            "purchasingPrice": "850.00000000",
            "quantity": 30,
            "quantityReserved": null,
            "quantityTrace": "Y",
            "recurSchemeLength": null,
            "recurSchemeType": "D",
            "sort": 100,
            "subscribe": "Y",
            "timestampX": "2026-11-05T19:19:32+03:00",
            "trialPriceId": null,
            "type": 4,
            "vatId": 3,
            "vatIncluded": "Y",
            "weight": 200,
            "width": 500,
            "withoutOrder": "N",
            "xmlId": "tshirt-red-m"
        }
    },
    "time": {
        "start": 1793895573,
        "finish": 1793895573.636081,
        "duration": 0.6360809803009033,
        "processing": 0,
        "date_start": "2026-11-05T19:19:33+03:00",
        "date_finish": "2026-11-05T19:19:33+03:00",
        "operating_reset_at": 1793896140,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.offer**
[`catalog_product_offer`](../../data-types.md#catalog_product_offer) | Объект со всеми полями и свойствами вариации. Пустые поля приходят со значением `null`.

Головной товар приходит в поле `parentId` объектом `{"value": ..., "valueId": ...}`, где `value` — идентификатор головного товара. Свойство приходит таким же объектом, для свойства-списка — с текстом варианта в `valueEnum`, для множественного свойства — массивом объектов.

Картинка приходит объектом с идентификатором файла `id` и относительными ссылками `url` и `urlMachine` на метод [catalog.product.download](../catalog-product-download.md). Скачать файл можно также методом [catalog.product.offer.download](./catalog-product-offer-download.md).

Поля `purchasingPrice` и `purchasingCurrency` приходят, только если у пользователя есть право «Просмотр закупочной цены товара». Закупочная цена приходит строкой ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "offer does not exist."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр товаров каталога», ни права «Изменение цены продажи товара» ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права на чтение этой вариации в инфоблоке ||
|| `400` | Пустое значение | offer does not exist. | Вариация с указанным `id` не найдена. Ту же ошибку метод возвращает, если в `id` передано не число ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-list.md)
- [{#T}](./catalog-product-offer-download.md)
- [{#T}](./catalog-product-offer-delete.md)
- [{#T}](./catalog-product-offer-get-fields-by-filter.md)
