# Добавить вариацию товара v 3.0 catalog.product.offer.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание товара» и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.product.offer.add` создает вариацию в каталоге вариаций и возвращает ее поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями новой вариации. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../../data-types.md) | Идентификатор инфоблока каталога вариаций.

Идентификатор можно получить методом [catalog.catalog.list](../../catalog/catalog-catalog-list-rest-v3.md): это каталог, у которого `productIblockId` больше `0` ||
|| **name***
[`string`](../../../data-types.md) | Название вариации ||
|| **code**
[`string`](../../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код. Если не передать при создании, совпадает с `id` ||
|| **active**
[`string`](../../../data-types.md) | Активность.

Возможные значения:

- `Y` — активен
- `N` — неактивен

Любое значение, кроме `Y`, сохраняется как `N`.

По умолчанию: `Y` ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка.

По умолчанию: `500` ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал запись. Идентификатор можно получить методом [user.get](../../../user/user-get.md) ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который изменил запись. По умолчанию — текущий пользователь ||
|| **dateActiveFrom**
[`datetime`](../../../data-types.md) | Дата начала активности в формате ISO 8601 ||
|| **dateActiveTo**
[`datetime`](../../../data-types.md) | Дата окончания активности в формате ISO 8601 ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса.

Возможные значения:

- `text` — текст
- `html` — HTML

По умолчанию: `text` ||
|| **previewPicture**
[`object`](../../../data-types.md) | Картинка для анонса. Сейчас метод не сохраняет значение поля, подробнее — в предупреждении ниже ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания.

Возможные значения:

- `text` — текст
- `html` — HTML

По умолчанию: `text` ||
|| **detailPicture**
[`object`](../../../data-types.md) | Детальная картинка. Сейчас метод не сохраняет значение поля, подробнее — в предупреждении ниже ||
|| **iblockSectionId**
[`integer`](../../../data-types.md) | Идентификатор основного раздела.

Идентификатор можно получить методом [catalog.section.list](../../section/catalog-section-list-rest-v3.md). Для несуществующего раздела метод вернет ошибку доступа ||
|| **iblockSection**
[`array`](../../../data-types.md) | Массив идентификаторов всех разделов, к которым нужно привязать товар ||
|| **quantity**
[`double`](../../../data-types.md) | Доступное количество. При включенном складском учете значение не сохраняется ||
|| **quantityReserved**
[`double`](../../../data-types.md) | Зарезервированное количество ||
|| **quantityTrace**
[`string`](../../../data-types.md) | Количественный учет.

Возможные значения:

- `Y` — включен
- `N` — выключен

При включенном складском учете всегда `Y` ||
|| **canBuyZero**
[`string`](../../../data-types.md) | Разрешить покупку при отсутствии товара.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **subscribe**
[`string`](../../../data-types.md) | Разрешить подписку на товар.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **vatId**
[`integer`](../../../data-types.md) | Идентификатор ставки НДС. Идентификатор можно получить методом [catalog.vat.list](../../vat/catalog-vat-list-rest-v3.md) ||
|| **vatIncluded**
[`string`](../../../data-types.md) | Включен ли НДС в цену.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена. При включенном складском учете значение не сохраняется ||
|| **purchasingCurrency**
[`string`](../../../data-types.md) | Валюта закупочной цены, например `RUB`. Список валют можно получить методом [crm.currency.list](../../../crm/currency/crm-currency-list.md). При включенном складском учете значение не сохраняется ||
|| **barcodeMulti**
[`string`](../../../data-types.md) | Уникальные штрихкоды для каждого экземпляра.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **weight**
[`double`](../../../data-types.md) | Вес ||
|| **length**
[`double`](../../../data-types.md) | Длина ||
|| **width**
[`double`](../../../data-types.md) | Ширина ||
|| **height**
[`double`](../../../data-types.md) | Высота ||
|| **measure**
[`integer`](../../../data-types.md) | Идентификатор единицы измерения. Идентификатор можно получить методом [catalog.measure.list](../../measure/catalog-measure-list-rest-v3.md) ||
|| **recurSchemeLength**
[`integer`](../../../data-types.md) | Длина периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../../../data-types.md) | Единица времени периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **trialPriceId**
[`integer`](../../../data-types.md) | Товар для пробной оплаты. Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../../../data-types.md) | Продление без оформления заказа: `Y` или `N`. Используется только в коробочной версии для продажи контента ||
|| **quantityTraceRaw**
[`string`](../../../data-types.md) | Количественный учет с учетом значения по умолчанию.

Возможные значения:

- `Y` — включен
- `N` — выключен
- `D` — по настройкам модуля ||
|| **paymentType**
[`string`](../../../data-types.md) | Тип оплаты.

Возможные значения:

- `S` — однократная
- `R` — регулярная
- `T` — пробная

Используется только в коробочной версии для продажи контента ||
|| **subscribeRaw**
[`string`](../../../data-types.md) | Подписка на товар с учетом значения по умолчанию.

Возможные значения:

- `Y` — разрешена
- `N` — запрещена
- `D` — по настройкам модуля ||
|| **canBuyZeroRaw**
[`string`](../../../data-types.md) | Покупка при отсутствии с учетом значения по умолчанию.

Возможные значения:

- `Y` — разрешена
- `N` — запрещена
- `D` — по настройкам модуля ||
|| **properties**
[`object`](../../../data-types.md) | Значения свойств товара. Ключ — `PROPERTY_{id}`, где `{id}` — идентификатор свойства. Значение можно передать строкой, числом или объектом `{"VALUE": ...}`, для множественного свойства — массивом таких значений.

Ключи другого вида вызывают ошибку валидации. Одно свойство нельзя передать под двумя ключами, например `PROPERTY_101` и `101`.

Чтобы привязать вариацию к головному товару, передайте его идентификатор в свойстве привязки, например `{"PROPERTY_101": 7553}`. Идентификатор свойства привязки — поле `skuPropertyId` каталога вариаций, его возвращает метод [catalog.catalog.get](../../catalog/catalog-catalog-get-rest-v3.md). Головной товар должен быть простым товаром или головным товаром из инфоблока товаров этого каталога. Если свойство привязки не передать, создается вариация без головного товара ||
|#

Поля `id`, `type`, `available`, `bundle`, `dateCreate` и `timestampX` заполняются автоматически. Если передать `id` или `type` в `fields`, метод вернет ошибку.

{% note warning "" %}

Поля `previewPicture` и `detailPicture` метод принимает в формате `{"fileData": ["имя_файла", "содержимое_в_base64"]}` и `{"remove": "Y"}`, но сейчас не сохраняет: картинка не добавляется и не удаляется, ошибки не возникает. Изображения товара добавляйте методом [catalog.product.image.add](../../product-image/catalog-product-image-add-rest-v3.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.offer.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":27,"name":"DOCS-V3-OFFER Футболка синяя M","code":"docs-v3-offer-blue-m","measure":9,"vatId":1,"vatIncluded":"Y","weight":200,"properties":{"PROPERTY_101":7553}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":27,"name":"DOCS-V3-OFFER Футболка синяя M","code":"docs-v3-offer-blue-m","measure":9,"vatId":1,"vatIncluded":"Y","weight":200,"properties":{"PROPERTY_101":7553}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.offer.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OfferAddResult = {
      item: {
        id: number
        iblockId: number
        name: string
        type: number
        properties: Record<string, unknown>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<OfferAddResult>({
        method: 'catalog.product.offer.add',
        params: {
          fields: {
            iblockId: 27,
            name: 'DOCS-V3-OFFER Футболка синяя M',
            code: 'docs-v3-offer-blue-m',
            measure: 9,
            vatId: 1,
            vatIncluded: 'Y',
            weight: 200,
            properties: {
              PROPERTY_101: 7553,
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created:', result.item.id, result.item.type)
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
      async function addOffer() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.offer.add',
            params: {
              fields: {
                iblockId: 27,
                name: 'DOCS-V3-OFFER Футболка синяя M',
                code: 'docs-v3-offer-blue-m',
                measure: 9,
                vatId: 1,
                vatIncluded: 'Y',
                weight: 200,
                properties: {
                  PROPERTY_101: 7553,
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created:', result.item.id, result.item.type)
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
                "name": "DOCS-V3-OFFER Футболка синяя M",
                "code": "docs-v3-offer-blue-m",
                "measure": 9,
                "vatId": 1,
                "vatIncluded": "Y",
                "weight": 200,
                "properties": {
                    "PROPERTY_101": 7553,
                },
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
                'catalog.product.offer.add',
                [
                    'fields' => [
                        'iblockId' => 27,
                        'name' => 'DOCS-V3-OFFER Футболка синяя M',
                        'code' => 'docs-v3-offer-blue-m',
                        'measure' => 9,
                        'vatId' => 1,
                        'vatIncluded' => 'Y',
                        'weight' => 200,
                        'properties' => [
                            'PROPERTY_101' => 7553,
                        ],
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
        'catalog.product.offer.add',
        {
            fields: {
                iblockId: 27,
                name: 'DOCS-V3-OFFER Футболка синяя M',
                code: 'docs-v3-offer-blue-m',
                measure: 9,
                vatId: 1,
                vatIncluded: 'Y',
                weight: 200,
                properties: {
                    PROPERTY_101: 7553,
                },
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
        'catalog.product.offer.add',
        [
            'fields' => [
                'iblockId' => 27,
                'name' => 'DOCS-V3-OFFER Футболка синяя M',
                'code' => 'docs-v3-offer-blue-m',
                'measure' => 9,
                'vatId' => 1,
                'vatIncluded' => 'Y',
                'weight' => 200,
                'properties' => [
                    'PROPERTY_101' => 7553,
                ],
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
    		"iblockId": 27,
    		"name": "DOCS-V3-OFFER Футболка синяя M",
    		"code": "docs-v3-offer-blue-m",
    		"measure": 9,
    		"vatId": 1,
    		"vatIncluded": "Y",
    		"weight": 200,
    		"properties": b24.Params{
    			"PROPERTY_101": 7553,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID   int    `json:"id"`
    	Name string `json:"name"`
    	Type int    `json:"type"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name, item.Type)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 7555,
            "iblockId": 27,
            "name": "DOCS-V3-OFFER Футболка синяя M",
            "code": "docs-v3-offer-blue-m",
            "xmlId": "7555",
            "active": "Y",
            "sort": 500,
            "createdBy": 1,
            "modifiedBy": 1,
            "dateCreate": "2026-10-22T12:18:58+03:00",
            "timestampX": "2026-10-22T12:18:58+03:00",
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "previewText": null,
            "previewTextType": "text",
            "previewPicture": null,
            "detailText": null,
            "detailTextType": "text",
            "detailPicture": null,
            "iblockSectionId": null,
            "iblockSection": [],
            "type": 4,
            "available": "Y",
            "bundle": "N",
            "quantity": 0,
            "quantityReserved": 0,
            "quantityTrace": "Y",
            "canBuyZero": "Y",
            "subscribe": "Y",
            "vatId": 1,
            "vatIncluded": "Y",
            "purchasingPrice": null,
            "purchasingCurrency": null,
            "barcodeMulti": "N",
            "weight": 200,
            "length": null,
            "width": null,
            "height": null,
            "measure": 9,
            "recurSchemeLength": null,
            "recurSchemeType": "D",
            "trialPriceId": null,
            "withoutOrder": "N",
            "quantityTraceRaw": "D",
            "paymentType": "S",
            "subscribeRaw": "D",
            "canBuyZeroRaw": "D",
            "properties": {
                "PROPERTY_101": {
                    "VALUE": "7553",
                    "VALUE_ID": "4019"
                },
                "PROPERTY_907": null,
                "PROPERTY_905": null,
                "PROPERTY_429": null,
                "PROPERTY_891": null,
                "PROPERTY_895": null,
                "PROPERTY_909": null,
                "PROPERTY_911": null,
                "PROPERTY_925": null,
                "PROPERTY_937": null
            }
        }
    },
    "time": {
        "start": 1792660738,
        "finish": 1792660738.516739,
        "duration": 0.5167388916015625,
        "processing": 0,
        "date_start": "2026-10-22T12:18:58+03:00",
        "date_finish": "2026-10-22T12:18:58+03:00",
        "operating_reset_at": 1792660980,
        "operating": 0.12495088577270508
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../../data-types.md) | Поля созданной вариации. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор вариации ||
|| **iblockId**
[`integer`](../../../data-types.md) | Идентификатор инфоблока каталога вариаций ||
|| **name**
[`string`](../../../data-types.md) | Название вариации ||
|| **code**
[`string`](../../../data-types.md) или `null` | Символьный код ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код. Если не задан, совпадает с `id` ||
|| **active**
[`string`](../../../data-types.md) | Активность: `Y` — активен, `N` — неактивен ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал запись ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил запись ||
|| **dateCreate**
[`datetime`](../../../data-types.md) | Дата и время создания ||
|| **timestampX**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения ||
|| **dateActiveFrom**
[`datetime`](../../../data-types.md) или `null` | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../../../data-types.md) или `null` | Дата окончания активности ||
|| **previewText**
[`string`](../../../data-types.md) или `null` | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса: `text` или `html` ||
|| **previewPicture**
[`string`](../../../data-types.md) или `null` | Идентификатор файла картинки для анонса ||
|| **detailText**
[`string`](../../../data-types.md) или `null` | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания: `text` или `html` ||
|| **detailPicture**
[`string`](../../../data-types.md) или `null` | Идентификатор файла детальной картинки ||
|| **iblockSectionId**
[`integer`](../../../data-types.md) или `null` | Идентификатор основного раздела ||
|| **iblockSection**
[`array`](../../../data-types.md) | Массив идентификаторов всех разделов, к которым привязан товар ||
|| **type**
[`integer`](../../../data-types.md) | Тип товара: `4` — вариация с головным товаром, `5` — вариация без головного товара ||
|| **available**
[`string`](../../../data-types.md) | Доступность для покупки: `Y` — доступен, `N` — недоступен ||
|| **bundle**
[`string`](../../../data-types.md) | Наличие набора: `Y` — да, `N` — нет ||
|| **quantity**
[`double`](../../../data-types.md) | Доступное количество ||
|| **quantityReserved**
[`double`](../../../data-types.md) | Зарезервированное количество ||
|| **quantityTrace**
[`string`](../../../data-types.md) | Включен ли количественный учет: `Y` — да, `N` — нет ||
|| **canBuyZero**
[`string`](../../../data-types.md) | Разрешена ли покупка при отсутствии товара: `Y` — да, `N` — нет ||
|| **subscribe**
[`string`](../../../data-types.md) | Разрешена ли подписка на товар: `Y` — да, `N` — нет ||
|| **vatId**
[`integer`](../../../data-types.md) или `null` | Идентификатор ставки НДС ||
|| **vatIncluded**
[`string`](../../../data-types.md) | Включен ли НДС в цену: `Y` — да, `N` — нет ||
|| **purchasingPrice**
[`double`](../../../data-types.md) или `null` | Закупочная цена. Возвращается, если у пользователя есть право «Просмотр закупочной цены товара» ||
|| **purchasingCurrency**
[`string`](../../../data-types.md) или `null` | Валюта закупочной цены. Возвращается, если у пользователя есть право «Просмотр закупочной цены товара» ||
|| **barcodeMulti**
[`string`](../../../data-types.md) | Уникальные штрихкоды для каждого экземпляра: `Y` — да, `N` — нет ||
|| **weight**
[`double`](../../../data-types.md) или `null` | Вес ||
|| **length**
[`double`](../../../data-types.md) или `null` | Длина ||
|| **width**
[`double`](../../../data-types.md) или `null` | Ширина ||
|| **height**
[`double`](../../../data-types.md) или `null` | Высота ||
|| **measure**
[`integer`](../../../data-types.md) или `null` | Идентификатор единицы измерения ||
|| **recurSchemeLength**
[`integer`](../../../data-types.md) или `null` | Длина периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../../../data-types.md) | Единица времени периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **trialPriceId**
[`integer`](../../../data-types.md) или `null` | Товар для пробной оплаты. Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../../../data-types.md) | Продление без оформления заказа: `Y` — да, `N` — нет. Используется только в коробочной версии для продажи контента ||
|| **quantityTraceRaw**
[`string`](../../../data-types.md) | Сохраненное значение количественного учета: `Y` — да, `N` — нет, `D` — по настройкам модуля ||
|| **paymentType**
[`string`](../../../data-types.md) | Тип оплаты: `S` — однократная, `R` — регулярная, `T` — пробная. Используется только в коробочной версии для продажи контента ||
|| **subscribeRaw**
[`string`](../../../data-types.md) | Сохраненное значение подписки: `Y` — да, `N` — нет, `D` — по настройкам модуля ||
|| **canBuyZeroRaw**
[`string`](../../../data-types.md) | Сохраненное значение покупки при отсутствии: `Y` — да, `N` — нет, `D` — по настройкам модуля ||
|| **properties**
[`object`](../../../data-types.md) | Значения свойств товара. Ключи — `PROPERTY_{id}`, где `{id}` — идентификатор свойства. Значение — `null`, объект `{"VALUE": ..., "VALUE_ID": ...}` или массив таких объектов для множественного свойства ||
|#

Вариация с головным товаром получает тип `4`, без головного товара — `5`. Головной товар без вариаций после добавления первой вариации меняет тип с `6` на `3`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"name\"",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `iblockId` | Не заполнено обязательное поле "iblockId" | Передайте `iblockId` в `fields` ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|| `type` | Поле "type" не доступно к заполнению | Уберите `type` из `fields`: тип задается автоматически ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

В части ошибок поле `field` содержит числовой код ошибки, а не имя поля.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `iblockId` | В поле `iblockId` требуется тип данных `int` для такого запроса | Передайте число ||
|| `200040300000` | Iblock Not Found | Передайте идентификатор существующего инфоблока каталога ||
|| `-` | productType is not allowed for this catalog | Передайте идентификатор инфоблока каталога вариаций ||
|| `-` | VAT vatId is not exists | Передайте идентификатор существующей ставки НДС ||
|| `-` | User createdBy is not exists | Передайте идентификатор существующего пользователя. Для `modifiedBy` приходит аналогичная ошибка ||
|| `-` | Currency purchasingCurrency is not exists | Передайте код существующей валюты ||
|| `-` | The properties field accepts only the property keys PROPERTY_{id}, unknown keys: #KEYS# | Передайте в `properties` только ключи вида `PROPERTY_{id}` ||
|| `-` | The properties field names one property by several keys: #KEYS# | Передайте каждое свойство под одним ключом ||
|| `200040500010` | Parent product not found. | Передайте в свойстве привязки идентификатор существующего головного товара ||
|| `200040500020` | Invalid parent product type. | Головным может быть только простой товар или головной товар. Вариацию и услугу указать нельзя ||
|| `200040500020` | Invalid information block of the parent product. | Передайте головной товар из инфоблока товаров, к которому привязан каталог вариаций ||
|| `-` | Parent product must be a single value. | Передайте в свойстве привязки один идентификатор ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и на инфоблок. Ошибка также возникает, если раздел из `iblockSectionId` не существует ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-update-rest-v3.md)
- [{#T}](./catalog-product-offer-get-rest-v3.md)
- [{#T}](./catalog-product-offer-list-rest-v3.md)
- [{#T}](./catalog-product-offer-delete-rest-v3.md)
- [{#T}](./catalog-product-offer-download-rest-v3.md)
- [{#T}](./catalog-product-offer-field-list.md)
- [{#T}](./catalog-product-offer-field-get.md)
