# Обновить поля головного товара catalog.product.sku.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование товара», правом на просмотр каталога — «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» — и правом на изменение элемента инфоблока каталога

Метод `catalog.product.sku.update` изменяет поля головного товара.

{% note warning "" %}

Метод не проверяет тип товара: с идентификатором простого товара или вариации он изменит этот товар и вернет пустой массив `"sku": []`. Перед вызовом проверьте, что идентификатор принадлежит головному товару, методом [catalog.product.sku.get](./catalog-product-sku-get.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_sku.id`](../../data-types.md#catalog_product_sku) | Идентификатор головного товара.

Получить идентификаторы головных товаров можно методом [catalog.product.sku.list](./catalog-product-sku-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей, которые нужно изменить ([подробное описание](#fields)).

Метод меняет только переданные поля, остальные сохраняют прежние значения. Пустой объект `{}` метод принимает без ошибки и обновляет только дату изменения `timestampX` ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId**
[`catalog_catalog.id`](../../data-types.md#catalog_catalog) | Идентификатор инфоблока каталога. Перенести товар в другой инфоблок нельзя: передавайте текущий инфоблок товара или не передавайте поле ||
|| **name**
[`string`](../../../data-types.md) | Название головного товара. Пустая строка не принимается ||
|| **active**
[`string`](../../../data-types.md) | Активность головного товара. Возможные значения:
- `Y` — активен
- `N` — неактивен

Любое другое значение метод сохраняет как `N` ||
|| **code**
[`string`](../../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка.

Значение, которое не является числом, метод сохраняет как `null` без ошибки ||
|| **iblockSectionId**
[`catalog_section.id`](../../data-types.md#catalog_section) | Идентификатор основного раздела каталога. Чтобы отвязать товар от разделов, передайте `null` ||
|| **iblockSection**
[`catalog_section.id[]`](../../data-types.md#catalog_section) | Массив идентификаторов всех разделов, к которым нужно привязать головной товар ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML

Любое другое значение метод сохраняет как `text` ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML

Любое другое значение метод сохраняет как `text` ||
|| **previewPicture**
[`object`](../../../data-types.md) | Картинка для анонса. Объект в формате `{"fileData": ["имя_файла.png", "содержимое_в_base64"]}`.

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **detailPicture**
[`object`](../../../data-types.md) | Детальная картинка. Объект в формате `{"fileData": ["имя_файла.png", "содержимое_в_base64"]}`.

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **createdBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который создал товар ||
|| **modifiedBy**
[`user.id`](../../../data-types.md) | Идентификатор пользователя, который изменил товар. По умолчанию — текущий пользователь ||
|| **propertyN**
[`any`](../../../data-types.md) | Значение свойства товара, где `N` — идентификатор свойства, например `property303`.

Для одиночного свойства передайте объект `{"value": ...}`. Значение строкой или числом метод не сохраняет и очищает текущее значение свойства.

Для множественного свойства передайте массив значений или объектов `{"value": ..., "valueId": ...}`:
- значение с `valueId` метод изменяет
- значение без `valueId` метод добавляет
- значения, которых нет в массиве, метод удаляет. Пустой массив очищает свойство

Свойства, которые не переданы, сохраняют текущие значения. `valueId` значений свойств возвращают методы [catalog.product.sku.get](./catalog-product-sku-get.md) и [catalog.product.sku.list](./catalog-product-sku-list.md) ||
|#

Поля `id`, `type`, `available`, `bundle`, `dateCreate` и `timestampX` изменить нельзя: метод пропускает их без ошибки. Неизвестные поля в `fields` метод тоже пропускает.

Даты активности `dateActiveFrom` и `dateActiveTo` сейчас изменить нельзя: метод отклоняет любой формат даты с ошибкой `Неверный формат даты начала активности.<br>`.

Поля торгового каталога — `canBuyZero`, `vatId`, `vatIncluded`, `quantity`, `purchasingPrice`, `purchasingCurrency`, `measure`, `weight`, `length`, `width`, `height` — у головного товара в облачном Битрикс24 метод пропускает без ошибки и не сохраняет. Изменить их можно только в коробочной версии при включенной опции «Показывать вкладку Торговый каталог для товаров, имеющих торговые предложения». Значения меняйте у вариаций методом [catalog.product.offer.update](../offer/catalog-product-offer-update.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7679,"fields":{"sort":300,"previewText":"Футболка свободного кроя из хлопка","property303":{"value":"Хлопковый двор"},"property305":["Хлопок"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7679,"fields":{"sort":300,"previewText":"Футболка свободного кроя из хлопка","property303":{"value":"Хлопковый двор"},"property305":["Хлопок"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.sku.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PropertyValue = { value: string; valueId: string }
    type Picture = { id: string; url: string; urlMachine: string }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SkuUpdateResult = {
      sku: {
        active: string
        available: string
        bundle: string
        code: string | null
        createdBy: number
        dateActiveFrom: ISODate | null
        dateActiveTo: ISODate | null
        dateCreate: ISODate
        detailPicture: Picture | null
        detailText: string | null
        detailTextType: string
        iblockId: number
        iblockSection: number[] | null
        iblockSectionId: number | null
        id: number
        modifiedBy: number
        name: string
        previewPicture: Picture | null
        previewText: string | null
        previewTextType: string
        property303: PropertyValue | null
        property305: PropertyValue[] | null
        sort: number | null
        timestampX: ISODate
        type: number
        xmlId: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<SkuUpdateResult>({
        method: 'catalog.product.sku.update',
        params: {
          id: 7679,
          fields: {
            sort: 300,
            previewText: 'Футболка свободного кроя из хлопка',
            property303: { value: 'Хлопковый двор' },
            property305: ['Хлопок'],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated SKU product:', result.sku.id, result.sku.sort)
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
      async function updateSkuProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.sku.update',
            params: {
              id: 7679,
              fields: {
                sort: 300,
                previewText: 'Футболка свободного кроя из хлопка',
                property303: { value: 'Хлопковый двор' },
                property305: ['Хлопок'],
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
          console.info('Updated SKU product:', result.sku.id, result.sku.sort)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSkuProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.sku.update(
            bitrix_id=7679,
            fields={
                "sort": 300,
                "previewText": "Футболка свободного кроя из хлопка",
                "property303": {"value": "Хлопковый двор"},
                "property305": ["Хлопок"],
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
                'catalog.product.sku.update',
                [
                    'id'     => 7679,
                    'fields' => [
                        'sort'        => 300,
                        'previewText' => 'Футболка свободного кроя из хлопка',
                        'property303' => ['value' => 'Хлопковый двор'],
                        'property305' => ['Хлопок'],
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
        'catalog.product.sku.update',
        {
            id: 7679,
            fields: {
                sort: 300,
                previewText: 'Футболка свободного кроя из хлопка',
                property303: { value: 'Хлопковый двор' },
                property305: ['Хлопок'],
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
        'catalog.product.sku.update',
        [
            'id' => 7679,
            'fields' => [
                'sort' => 300,
                'previewText' => 'Футболка свободного кроя из хлопка',
                'property303' => ['value' => 'Хлопковый двор'],
                'property305' => ['Хлопок'],
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
    res, err := client.Core().Call(ctx, "catalog.product.sku.update", b24.Params{
    	"id": 7679,
    	"fields": b24.Params{
    		"sort":        300,
    		"previewText": "Футболка свободного кроя из хлопка",
    		"property303": b24.Params{"value": "Хлопковый двор"},
    		"property305": []string{"Хлопок"},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.sku.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "sku".
    raw, ok := b24.Unwrap(res.Result, "sku")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа sku")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    type propertyValue struct {
    	Value   string `json:"value"`
    	ValueID string `json:"valueId"`
    }
    var item struct {
    	ID          b24.ID          `json:"id"`
    	Name        string          `json:"name"`
    	Sort        *int            `json:"sort"`
    	PreviewText *string         `json:"previewText"`
    	TimestampX  string          `json:"timestampX"`
    	Property303 *propertyValue  `json:"property303"`
    	Property305 []propertyValue `json:"property305"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.TimestampX)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "sku": {
            "active": "Y",
            "available": "N",
            "bundle": "N",
            "code": "futbolka-bazovaya",
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-05T18:38:10+03:00",
            "detailPicture": null,
            "detailText": "<p>Футболка из 100% хлопка</p>",
            "detailTextType": "html",
            "iblockId": 25,
            "iblockSection": [
                31
            ],
            "iblockSectionId": 31,
            "id": 7679,
            "modifiedBy": 1269,
            "name": "Футболка базовая",
            "previewPicture": null,
            "previewText": "Футболка свободного кроя из хлопка",
            "previewTextType": "text",
            "property303": {
                "value": "Хлопковый двор",
                "valueId": "4117"
            },
            "property305": [
                {
                    "value": "Хлопок",
                    "valueId": "4119"
                }
            ],
            "sort": 300,
            "timestampX": "2026-11-05T18:38:23+03:00",
            "type": 6,
            "xmlId": "tshirt-basic-01"
        }
    },
    "time": {
        "start": 1793893103,
        "finish": 1793893103.99537,
        "duration": 0.9953699111938477,
        "processing": 0,
        "date_start": "2026-11-05T18:38:23+03:00",
        "date_finish": "2026-11-05T18:38:23+03:00",
        "operating_reset_at": 1793893680,
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
|| **result.sku**
[`catalog_product_sku`](../../data-types.md#catalog_product_sku) | Объект со всеми полями головного товара после изменения.

В ответе приходят все свойства инфоблока в виде ключей `propertyN`, у незаполненных значение `null`. В примере показаны только свойства `property303` и `property305`.

Если `id` принадлежит простому товару или вариации, метод изменит товар и вернет пустой массив `[]` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "sku does not exist."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права на просмотр каталога ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права «Редактирование товара» ||
|| `400` | `200040300043` | Access Denied | У пользователя нет права на изменение элемента инфоблока каталога ||
|| `400` | `200040300050` | Access Denied | Раздел из `iblockSectionId` не существует или у пользователя нет права привязывать к нему товары ||
|| `400` | Пустое значение | sku does not exist. | Товар с указанным `id` не найден. Ту же ошибку метод возвращает, если в `id` передана строка, которая не является числом ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | В `fields` передан не объект ||
|| `400` | `0` | iblock is not catalog | В `iblockId` передан инфоблок, который не является торговым каталогом ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок вариаций ||
|| `400` | `0` | Не введено название.<br> | В `name` передана пустая строка ||
|| `400` | `0` | Wrong format of field `name`. | В поле передан массив или объект вместо значения. В тексте указано имя поля ||
|| `400` | `0` | User createdBy is not exists | Пользователь из `createdBy` не найден. Для `modifiedBy` приходит ошибка `User modifiedBy is not exists` ||
|| `400` | `0` | Неверный формат даты начала активности.<br> | Передано поле `dateActiveFrom`. Для `dateActiveTo` приходит ошибка `Неверный формат даты завершения активности.<br>` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-sku-add.md)
- [{#T}](./catalog-product-sku-get.md)
- [{#T}](./catalog-product-sku-list.md)
- [{#T}](./catalog-product-sku-download.md)
- [{#T}](./catalog-product-sku-delete.md)
- [{#T}](./catalog-product-sku-get-fields-by-filter.md)
