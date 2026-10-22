# Обновить поля головного товара v 3.0 catalog.product.sku.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование товара» и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.product.sku.update` изменяет поля головного товара и возвращает его поля после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор головного товара.

Идентификатор можно получить методом [catalog.product.sku.list](./catalog-product-sku-list-rest-v3.md) или из ответа [catalog.product.sku.add](./catalog-product-sku-add-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями головного товара, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` возвращает данные без изменений ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId**
[`integer`](../../../data-types.md) | Идентификатор инфоблока каталога товаров. Изменить инфоблок нельзя: можно передать только текущее значение ||
|| **name**
[`string`](../../../data-types.md) | Название головного товара ||
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
- `N` — нет

У головного товара значение не сохраняется ||
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
[`object`](../../../data-types.md) | Значения свойств, которые нужно изменить. Ключ — `PROPERTY_{id}`, где `{id}` — идентификатор свойства. Значение передавайте объектом `{"VALUE": ...}` или массивом таких объектов. Значение строкой или числом метод не сохраняет.

Свойства, которые не переданы, сохраняют текущие значения ||
|#

{% note warning "" %}

Поля `previewPicture` и `detailPicture` метод принимает в формате `{"fileData": ["имя_файла", "содержимое_в_base64"]}` и `{"remove": "Y"}`, но сейчас не сохраняет: картинка не добавляется и не удаляется, ошибки не возникает. Изображения товара добавляйте методом [catalog.product.image.add](../../product-image/catalog-product-image-add-rest-v3.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.sku.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7553,"fields":{"name":"DOCS-V3-SKU Футболка хлопковая","detailText":"Состав: 100% хлопок"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7553,"fields":{"name":"DOCS-V3-SKU Футболка хлопковая","detailText":"Состав: 100% хлопок"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.sku.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SkuUpdateResult = {
      item: {
        id: number
        name: string
        timestampX: ISODate
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<SkuUpdateResult>({
        method: 'catalog.product.sku.update',
        params: {
          id: 7553,
          fields: {
            name: 'DOCS-V3-SKU Футболка хлопковая',
            detailText: 'Состав: 100% хлопок',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated:', result.item.id, result.item.name)
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
      async function updateSku() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.sku.update',
            params: {
              id: 7553,
              fields: {
                name: 'DOCS-V3-SKU Футболка хлопковая',
                detailText: 'Состав: 100% хлопок',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSku)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.sku.update(
            id=7553,
            fields={
                "name": "DOCS-V3-SKU Футболка хлопковая",
                "detailText": "Состав: 100% хлопок",
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
                'catalog.product.sku.update',
                [
                    'id' => 7553,
                    'fields' => [
                        'name' => 'DOCS-V3-SKU Футболка хлопковая',
                        'detailText' => 'Состав: 100% хлопок',
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
        'catalog.product.sku.update',
        {
            id: 7553,
            fields: {
                name: 'DOCS-V3-SKU Футболка хлопковая',
                detailText: 'Состав: 100% хлопок',
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
        'catalog.product.sku.update',
        [
            'id' => 7553,
            'fields' => [
                'name' => 'DOCS-V3-SKU Футболка хлопковая',
                'detailText' => 'Состав: 100% хлопок',
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
    res, err := client.Core().Call(ctx, "catalog.product.sku.update", b24.Params{
    	"id": 7553,
    	"fields": b24.Params{
    		"name": "DOCS-V3-SKU Футболка хлопковая",
    		"detailText": "Состав: 100% хлопок",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.sku.update: %w", err)
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
            "id": 7553,
            "iblockId": 25,
            "name": "DOCS-V3-SKU Футболка хлопковая",
            "code": "docs-v3-sku-futbolka",
            "xmlId": "7553",
            "active": "Y",
            "sort": 100,
            "createdBy": 1,
            "modifiedBy": 1,
            "dateCreate": "2026-10-22T12:18:48+03:00",
            "timestampX": "2026-10-22T12:19:11+03:00",
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "previewText": "Футболка из хлопка",
            "previewTextType": "text",
            "previewPicture": null,
            "detailText": "Состав: 100% хлопок",
            "detailTextType": "text",
            "detailPicture": null,
            "iblockSectionId": 31,
            "iblockSection": [
                31
            ],
            "type": 3,
            "available": "Y",
            "bundle": "N",
            "quantity": 0,
            "quantityReserved": 0,
            "quantityTrace": "N",
            "canBuyZero": "Y",
            "subscribe": "Y",
            "vatId": null,
            "vatIncluded": "N",
            "purchasingPrice": null,
            "purchasingCurrency": null,
            "barcodeMulti": "N",
            "weight": 0,
            "length": null,
            "width": null,
            "height": null,
            "measure": null,
            "recurSchemeLength": null,
            "recurSchemeType": "D",
            "trialPriceId": null,
            "withoutOrder": "N",
            "quantityTraceRaw": "N",
            "paymentType": "S",
            "subscribeRaw": "D",
            "canBuyZeroRaw": "Y",
            "properties": {
                "PROPERTY_309": null,
                "PROPERTY_293": null,
                "PROPERTY_295": null,
                "PROPERTY_297": null,
                "PROPERTY_299": null,
                "PROPERTY_301": null,
                "PROPERTY_303": null,
                "PROPERTY_305": null,
                "PROPERTY_307": null,
                "PROPERTY_311": null,
                "PROPERTY_313": null,
                "PROPERTY_315": null,
                "PROPERTY_329": null,
                "PROPERTY_343": null,
                "PROPERTY_359": null,
                "PROPERTY_431": null,
                "PROPERTY_433": null,
                "PROPERTY_435": null,
                "PROPERTY_893": null,
                "PROPERTY_897": null,
                "PROPERTY_901": null,
                "PROPERTY_917": null,
                "PROPERTY_921": null,
                "PROPERTY_931": null,
                "PROPERTY_933": null,
                "PROPERTY_935": null,
                "PROPERTY_1013": null,
                "PROPERTY_1015": null,
                "PROPERTY_1019": null,
                "PROPERTY_1021": null,
                "PROPERTY_1023": null,
                "PROPERTY_1077": null,
                "PROPERTY_1079": null,
                "PROPERTY_1081": null,
                "PROPERTY_1083": null,
                "PROPERTY_1085": null,
                "PROPERTY_1231": null
            }
        }
    },
    "time": {
        "start": 1792660751,
        "finish": 1792660751.329827,
        "duration": 0.32982707023620605,
        "processing": 0,
        "date_start": "2026-10-22T12:19:11+03:00",
        "date_finish": "2026-10-22T12:19:11+03:00",
        "operating_reset_at": 1792660980,
        "operating": 0.3135650157928467
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
[`object`](../../../data-types.md) | Поля головного товара после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор головного товара ||
|| **iblockId**
[`integer`](../../../data-types.md) | Идентификатор инфоблока каталога товаров ||
|| **name**
[`string`](../../../data-types.md) | Название головного товара ||
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
[`integer`](../../../data-types.md) | Тип товара: `3` — головной товар с вариациями, `6` — без вариаций ||
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

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id`. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Product - #ID# is not exists in catalog - #IBLOCK_ID# | Уберите `iblockId` из `fields` или передайте текущий инфоблок записи ||
|| `-` | The properties field accepts only the property keys PROPERTY_{id}, unknown keys: #KEYS# | Передайте в `properties` только ключи вида `PROPERTY_{id}` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `type`, `available`, `bundle`, `dateCreate`, `timestampX` ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Записи нет или это не головной товар. Проверьте идентификатор методом [catalog.product.sku.list](./catalog-product-sku-list-rest-v3.md) ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` ||
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

- [{#T}](./catalog-product-sku-add-rest-v3.md)
- [{#T}](./catalog-product-sku-get-rest-v3.md)
- [{#T}](./catalog-product-sku-list-rest-v3.md)
- [{#T}](./catalog-product-sku-delete-rest-v3.md)
- [{#T}](./catalog-product-sku-download-rest-v3.md)
- [{#T}](./catalog-product-sku-field-list.md)
- [{#T}](./catalog-product-sku-field-get.md)
