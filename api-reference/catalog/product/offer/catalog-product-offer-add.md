# Добавить вариацию товара catalog.product.offer.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание товара», правом на изменение элементов инфоблока вариаций и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

Метод `catalog.product.offer.add` создает вариацию товара в каталоге вариаций.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей новой вариации ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.iblockId`](../../data-types.md#catalog_catalog) | Идентификатор инфоблока каталога вариаций.

Получить идентификатор можно методом [catalog.catalog.list](../../catalog/catalog-catalog-list.md): у каталога вариаций заполнено поле `productIblockId` ||
|| **name***
[`string`](../../../data-types.md) | Название вариации ||
|| **parentId**
[`catalog_product_sku.id`](../../data-types.md#catalog_product_sku) | Идентификатор головного товара. Головным может быть простой товар или головной товар из инфоблока товаров, к которому привязан каталог вариаций.

Получить идентификаторы можно методами [catalog.product.sku.list](../sku/catalog-product-sku-list.md) и [catalog.product.list](../catalog-product-list.md).

Если `parentId` не передан или равен `0`, метод создает вариацию без головного товара с типом `5`. Такая вариация недоступна для покупки ||
|| **active**
[`string`](../../../data-types.md) | Активность. Возможные значения:
- `Y` — вариация активна
- `N` — вариация неактивна

Любое другое значение метод сохраняет как `N`.

По умолчанию `Y` ||
|| **code**
[`string`](../../../data-types.md) | Символьный код. Уникальность кода метод не проверяет ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код. Если не передан, совпадает с идентификатором вариации ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка. Значение, которое не является числом, метод сохраняет как `null`.

По умолчанию `500` ||
|| **createdBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который создал вариацию. Метод проверяет, что пользователь существует.

По умолчанию — текущий пользователь ||
|| **modifiedBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который изменил вариацию. Метод проверяет, что пользователь существует.

По умолчанию — текущий пользователь ||
|| **iblockSectionId**
[`catalog_section.id`](../../data-types.md#catalog_section) | Идентификатор основного раздела. Получить идентификатор можно методом [catalog.section.list](../../section/catalog-section-list.md).

Для несуществующего раздела метод возвращает ошибку доступа `200040300050` ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию `text` ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию `text` ||
|| **previewPicture**
[`object`](../../../data-types.md) | Картинка для анонса в формате `{"fileData": ["имя_файла.png", "содержимое_в_base64"]}` ||
|| **detailPicture**
[`object`](../../../data-types.md) | Детальная картинка в формате `{"fileData": ["имя_файла.png", "содержимое_в_base64"]}` ||
|| **measure**
[`catalog_measure.id`](../../data-types.md#catalog_measure) | Идентификатор единицы измерения. Получить идентификатор можно методом [catalog.measure.list](../../measure/catalog-measure-list.md) ||
|| **vatId**
[`catalog_vat.id`](../../data-types.md#catalog_vat) | Идентификатор ставки НДС. Получить идентификатор можно методом [catalog.vat.list](../../vat/catalog-vat-list.md). Метод проверяет, что ставка существует ||
|| **vatIncluded**
[`string`](../../../data-types.md) | Включен ли НДС в цену. Возможные значения:
- `Y` — да
- `N` — нет

Любое другое значение метод сохраняет как `N`.

По умолчанию `N` ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена ||
|| **purchasingCurrency**
[`string`](../../../data-types.md) | Валюта закупочной цены, например `RUB`. Получить список валют можно методом [crm.currency.list](../../../crm/currency/crm-currency-list.md). Метод проверяет, что валюта существует ||
|| **quantity**
[`double`](../../../data-types.md) | Доступное количество. Значение, которое не является числом, метод сохраняет как `null` ||
|| **quantityReserved**
[`double`](../../../data-types.md) | Зарезервированное количество ||
|| **quantityTrace**
[`string`](../../../data-types.md) | Количественный учет. Возможные значения:
- `Y` — включен
- `N` — выключен
- `D` — по настройкам модуля

По умолчанию `D`. В ответе приходит итоговое значение `Y` или `N` ||
|| **canBuyZero**
[`string`](../../../data-types.md) | Разрешена ли покупка при отсутствии товара. Возможные значения:
- `Y` — да
- `N` — нет
- `D` — по настройкам модуля

По умолчанию `D`. В ответе приходит итоговое значение `Y` или `N` ||
|| **subscribe**
[`string`](../../../data-types.md) | Разрешена ли подписка на товар. Возможные значения:
- `Y` — да
- `N` — нет
- `D` — по настройкам модуля

По умолчанию `D`. В ответе приходит итоговое значение `Y` или `N` ||
|| **barcodeMulti**
[`string`](../../../data-types.md) | Уникальный штрихкод для каждого экземпляра. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **weight**
[`double`](../../../data-types.md) | Вес ||
|| **length**
[`double`](../../../data-types.md) | Длина ||
|| **width**
[`double`](../../../data-types.md) | Ширина ||
|| **height**
[`double`](../../../data-types.md) | Высота ||
|| **recurSchemeLength**
[`integer`](../../../data-types.md) | Длина периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../../../data-types.md) | Единица времени периода оплаты. Возможные значения:
- `H` — час
- `D` — день
- `W` — неделя
- `M` — месяц
- `Q` — квартал
- `S` — полугодие
- `Y` — год

По умолчанию `D`. Используется только в коробочной версии для продажи контента ||
|| **trialPriceId**
[`integer`](../../../data-types.md) | Товар для пробной оплаты. Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../../../data-types.md) | Продление без оформления заказа. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N`. Используется только в коробочной версии для продажи контента ||
|| **propertyN**
[`any`](../../../data-types.md) | Значение свойства вариации, где `N` — идентификатор свойства, например `property907`. Получить свойства каталога вариаций можно методом [catalog.product.offer.getFieldsByFilter](./catalog-product-offer-get-fields-by-filter.md).

Значение передайте числом, строкой или объектом `{"value": значение}`. Для свойства-списка передайте идентификатор варианта значения. Для множественного свойства передайте массив значений ||
|#

Поля `id`, `type`, `available`, `bundle` и `timestampX` метод заполняет сам и пропускает в `fields` без ошибки. Неизвестные поля метод тоже пропускает.

{% note warning "" %}

Не передавайте поля `dateCreate`, `dateActiveFrom` и `dateActiveTo`. Сейчас метод сохраняет любое значение `dateCreate` как `2001-11-30T00:00:00`, а даты активности отклоняет в любом формате с ошибкой `Неверный формат даты начала активности.<br>` или `Неверный формат даты завершения активности.<br>`.

{% endnote %}

Цену вариации задайте методами [catalog.price.*](../../price/index.md) после создания вариации. Поля `quantity` и `purchasingPrice` метод сохраняет и при включенном складском учете. Чтобы остатки на складах и закупочная цена совпадали с документами, при складском учете используйте методы [catalog.document.*](../../document/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример создает вариацию «Футболка красная, M» для головного товара `7603`, задает размер в свойстве-списке `property907`, цвет в строковом свойстве `property891` и картинку для анонса. В примере содержимое картинки сокращено до `iVBORw0KGgo...`, передайте полную строку base64.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":27,"name":"Футболка красная, M","parentId":7603,"active":"Y","code":"tshirt-red-m","xmlId":"tshirt-red-m","sort":100,"measure":9,"vatId":3,"vatIncluded":"Y","purchasingPrice":800,"purchasingCurrency":"RUB","quantity":25,"weight":200,"width":500,"length":700,"height":20,"previewText":"Хлопок 100%","previewPicture":{"fileData":["tshirt-red.png","iVBORw0KGgo..."]},"property907":1603,"property891":"Красный"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":27,"name":"Футболка красная, M","parentId":7603,"active":"Y","code":"tshirt-red-m","xmlId":"tshirt-red-m","sort":100,"measure":9,"vatId":3,"vatIncluded":"Y","purchasingPrice":800,"purchasingCurrency":"RUB","quantity":25,"weight":200,"width":500,"length":700,"height":20,"previewText":"Хлопок 100%","previewPicture":{"fileData":["tshirt-red.png","iVBORw0KGgo..."]},"property907":1603,"property891":"Красный"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.add
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
        method: 'catalog.product.offer.add',
        params: {
          fields: {
            iblockId: 27,
            name: 'Футболка красная, M',
            parentId: 7603,
            active: 'Y',
            code: 'tshirt-red-m',
            xmlId: 'tshirt-red-m',
            sort: 100,
            measure: 9,
            vatId: 3,
            vatIncluded: 'Y',
            purchasingPrice: 800,
            purchasingCurrency: 'RUB',
            quantity: 25,
            weight: 200,
            width: 500,
            length: 700,
            height: 20,
            previewText: 'Хлопок 100%',
            previewPicture: {
              fileData: ['tshirt-red.png', 'iVBORw0KGgo...'],
            },
            property907: 1603,
            property891: 'Красный',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added offer:', result.offer.id, result.offer.name)
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
      async function addOffer() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.offer.add',
            params: {
                  fields: {
                    iblockId: 27,
                    name: 'Футболка красная, M',
                    parentId: 7603,
                    active: 'Y',
                    code: 'tshirt-red-m',
                    xmlId: 'tshirt-red-m',
                    sort: 100,
                    measure: 9,
                    vatId: 3,
                    vatIncluded: 'Y',
                    purchasingPrice: 800,
                    purchasingCurrency: 'RUB',
                    quantity: 25,
                    weight: 200,
                    width: 500,
                    length: 700,
                    height: 20,
                    previewText: 'Хлопок 100%',
                    previewPicture: {
                      fileData: ['tshirt-red.png', 'iVBORw0KGgo...'],
                    },
                    property907: 1603,
                    property891: 'Красный',
                  },
                },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added offer:', result.offer.id, result.offer.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addOffer)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.add(
            fields={
                "iblockId": 27,
                "name": "Футболка красная, M",
                "parentId": 7603,
                "active": "Y",
                "code": "tshirt-red-m",
                "xmlId": "tshirt-red-m",
                "sort": 100,
                "measure": 9,
                "vatId": 3,
                "vatIncluded": "Y",
                "purchasingPrice": 800,
                "purchasingCurrency": "RUB",
                "quantity": 25,
                "weight": 200,
                "width": 500,
                "length": 700,
                "height": 20,
                "previewText": "Хлопок 100%",
                "previewPicture": {
                    "fileData": ["tshirt-red.png", "iVBORw0KGgo..."],
                },
                "property907": 1603,
                "property891": "Красный",
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.offer.add',
                [
                    'fields' => [
                        'iblockId'           => 27,
                        'name'               => 'Футболка красная, M',
                        'parentId'           => 7603,
                        'active'             => 'Y',
                        'code'               => 'tshirt-red-m',
                        'xmlId'              => 'tshirt-red-m',
                        'sort'               => 100,
                        'measure'            => 9,
                        'vatId'              => 3,
                        'vatIncluded'        => 'Y',
                        'purchasingPrice'    => 800,
                        'purchasingCurrency' => 'RUB',
                        'quantity'           => 25,
                        'weight'             => 200,
                        'width'              => 500,
                        'length'             => 700,
                        'height'             => 20,
                        'previewText'        => 'Хлопок 100%',
                        'previewPicture'     => [
                            'fileData' => ['tshirt-red.png', 'iVBORw0KGgo...'],
                        ],
                        'property907'        => 1603,
                        'property891'        => 'Красный',
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

    ```js
    BX24.callMethod(
        'catalog.product.offer.add',
        {
            fields: {
                iblockId: 27,
                name: 'Футболка красная, M',
                parentId: 7603,
                active: 'Y',
                code: 'tshirt-red-m',
                xmlId: 'tshirt-red-m',
                sort: 100,
                measure: 9,
                vatId: 3,
                vatIncluded: 'Y',
                purchasingPrice: 800,
                purchasingCurrency: 'RUB',
                quantity: 25,
                weight: 200,
                width: 500,
                length: 700,
                height: 20,
                previewText: 'Хлопок 100%',
                previewPicture: {
                    fileData: ['tshirt-red.png', 'iVBORw0KGgo...'],
                },
                property907: 1603,
                property891: 'Красный',
            },
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
        'catalog.product.offer.add',
        [
            'fields' => [
                'iblockId' => 27,
                'name' => 'Футболка красная, M',
                'parentId' => 7603,
                'active' => 'Y',
                'code' => 'tshirt-red-m',
                'xmlId' => 'tshirt-red-m',
                'sort' => 100,
                'measure' => 9,
                'vatId' => 3,
                'vatIncluded' => 'Y',
                'purchasingPrice' => 800,
                'purchasingCurrency' => 'RUB',
                'quantity' => 25,
                'weight' => 200,
                'width' => 500,
                'length' => 700,
                'height' => 20,
                'previewText' => 'Хлопок 100%',
                'previewPicture' => [
                    'fileData' => ['tshirt-red.png', 'iVBORw0KGgo...'],
                ],
                'property907' => 1603,
                'property891' => 'Красный',
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
    res, err := client.Core().Call(ctx, "catalog.product.offer.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId":           27,
    		"name":               "Футболка красная, M",
    		"parentId":           7603,
    		"active":             "Y",
    		"code":               "tshirt-red-m",
    		"xmlId":              "tshirt-red-m",
    		"sort":               100,
    		"measure":            9,
    		"vatId":              3,
    		"vatIncluded":        "Y",
    		"purchasingPrice":    800,
    		"purchasingCurrency": "RUB",
    		"quantity":           25,
    		"weight":             200,
    		"width":              500,
    		"length":             700,
    		"height":             20,
    		"previewText":        "Хлопок 100%",
    		"previewPicture":     b24.Params{
    			"fileData": []string{"tshirt-red.png", "iVBORw0KGgo..."},
    		},
    		"property907":        1603,
    		"property891":        "Красный",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.add: %w", err)
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
            "previewText": "Хлопок 100%",
            "previewTextType": "text",
            "property429": null,
            "property891": {
                "value": "Красный",
                "valueId": "4151"
            },
            "property895": null,
            "property905": null,
            "property907": {
                "value": "1603",
                "valueEnum": "M",
                "valueId": "4153"
            },
            "property909": null,
            "property911": null,
            "property925": null,
            "property937": null,
            "purchasingCurrency": "RUB",
            "purchasingPrice": "800.00000000",
            "quantity": 25,
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
        "start": 1793895571,
        "finish": 1793895572.306547,
        "duration": 1.306546926498413,
        "processing": 1,
        "date_start": "2026-11-05T19:19:31+03:00",
        "date_finish": "2026-11-05T19:19:32+03:00",
        "operating_reset_at": 1793896140,
        "operating": 0.30707502365112305
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
[`catalog_product_offer`](../../data-types.md#catalog_product_offer) | Объект с полями созданной вариации. Метод возвращает все поля и свойства вариации, пустые — со значением `null`.

Свойство приходит объектом `{"value": ..., "valueId": ...}`, для свойства-списка — с текстом варианта в `valueEnum`. Картинка приходит объектом с идентификатором файла `id` и относительными ссылками `url` и `urlMachine` на метод [catalog.product.download](../catalog-product-download.md). Закупочная цена `purchasingPrice` приходит строкой ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040500010",
    "error_description": "Parent product not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр товаров каталога», ни права «Изменение цены продажи товара» ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права «Создание товара» ||
|| `400` | `200040300043` | Access Denied | У пользователя нет права на изменение элементов инфоблока вариаций ||
|| `400` | `200040300050` | Access Denied | Раздел из `iblockSectionId` не существует или у пользователя нет права привязывать к нему элементы ||
|| `400` | `200040500010` | Parent product not found. | Головной товар из `parentId` не найден ||
|| `400` | `200040500020` | Invalid parent product type. | В `parentId` передана вариация или услуга. Головным может быть только простой товар или головной товар ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Incorrect fields format | В `fields` передан не объект ||
|| `400` | `0` | Required fields: name | Не передано поле `name`. В тексте перечислены все пропущенные обязательные поля ||
|| `400` | `0` | iblock is not catalog | Поле `iblockId` не передано или инфоблок не является каталогом ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок товаров, а не инфоблок вариаций ||
|| `400` | `0` | Wrong format of field `name`. | В поле передан объект или массив вместо значения. В тексте указано имя поля ||
|| `400` | `0` | VAT vatId is not exists | Ставка НДС из `vatId` не найдена ||
|| `400` | `0` | Currency purchasingCurrency is not exists | Валюта из `purchasingCurrency` не найдена ||
|| `400` | `0` | User createdBy is not exists | Пользователь из `createdBy` не найден. Для `modifiedBy` текст ошибки — `User modifiedBy is not exists` ||
|| `400` | `0` | Неверный формат даты начала активности.<br> | Передано поле `dateActiveFrom`. Метод отклоняет дату в любом формате ||
|| `400` | `0` | Неверный формат даты завершения активности.<br> | Передано поле `dateActiveTo`. Метод отклоняет дату в любом формате ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-list.md)
- [{#T}](./catalog-product-offer-download.md)
- [{#T}](./catalog-product-offer-delete.md)
- [{#T}](./catalog-product-offer-get-fields-by-filter.md)
