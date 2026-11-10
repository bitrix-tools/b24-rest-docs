# Получить поля вариации товара по фильтру catalog.product.offer.getFieldsByFilter

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

Метод `catalog.product.offer.getFieldsByFilter` возвращает описание полей и свойств вариации для указанного каталога вариаций: тип, обязательность и доступность для изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../../data-types.md) | Фильтр с идентификатором каталога вариаций ([подробное описание](#filter)) ||
|#

### Параметр filter {#filter}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.iblockId`](../../data-types.md#catalog_catalog) | Идентификатор инфоблока каталога вариаций.

Получить идентификатор можно методом [catalog.catalog.list](../../catalog/catalog-catalog-list.md): у каталога вариаций заполнено поле `productIblockId` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"iblockId":27}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.getFieldsByFilter
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"iblockId":27},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.getFieldsByFilter
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldDescription = {
      isImmutable: boolean
      isReadOnly: boolean
      isRequired: boolean
      name: string
      type: string
      isDynamic?: boolean
      isMultiple?: boolean
      propertyType?: string
      userType?: string | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type OfferFieldsResult = {
      offer: Record<string, FieldDescription>
    }

    try {
      const response = await $b24.actions.v2.call.make<OfferFieldsResult>({
        method: 'catalog.product.offer.getFieldsByFilter',
        params: {
          filter: {
            iblockId: 27,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Offer fields:', Object.keys(result.offer))
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
      async function getOfferFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.offer.getFieldsByFilter',
            params: {
                  filter: {
                    iblockId: 27,
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
          console.info('Offer fields:', Object.keys(result.offer))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOfferFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.get_fields_by_filter(
            filter={
                "iblockId": 27,
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
                'catalog.product.offer.getFieldsByFilter',
                [
                    'filter' => [
                        'iblockId' => 27,
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
        'catalog.product.offer.getFieldsByFilter',
        {
            filter: {
                iblockId: 27,
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
        'catalog.product.offer.getFieldsByFilter',
        [
            'filter' => [
                'iblockId' => 27,
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
    res, err := client.Core().Call(ctx, "catalog.product.offer.getFieldsByFilter", b24.Params{
    	"filter": b24.Params{
    		"iblockId": 27,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.getFieldsByFilter: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "offer".
    raw, ok := b24.Unwrap(res.Result, "offer")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа offer")
    }

    // Ключ — имя поля или свойства propertyN, значение — описание поля.
    var fields map[string]struct {
    	Type        string `json:"type"`
    	Name        string `json:"name"`
    	IsRequired  bool   `json:"isRequired"`
    	IsReadOnly  bool   `json:"isReadOnly"`
    	IsImmutable bool   `json:"isImmutable"`
    }
    if err := json.Unmarshal(raw, &fields); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for name, f := range fields {
    	fmt.Println(name, f.Type, f.IsRequired)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "offer": {
            "active": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Активность",
                "type": "char"
            },
            "available": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Доступность к покупке",
                "type": "char"
            },
            "barcodeMulti": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Уникальные штрихкоды для каждого экземпляра",
                "type": "char"
            },
            "bundle": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Наличие набора",
                "type": "char"
            },
            "canBuyZero": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Разрешение покупки при отсутствии товара",
                "type": "char"
            },
            "code": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Символьный код",
                "type": "string"
            },
            "createdBy": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Кто создал",
                "type": "integer"
            },
            "dateActiveFrom": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "DATE_ACTIVE_FROM",
                "type": "datetime"
            },
            "dateActiveTo": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "DATE_ACTIVE_TO",
                "type": "datetime"
            },
            "dateCreate": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Дата создания",
                "type": "datetime"
            },
            "detailPicture": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Детальная картинка",
                "type": "file"
            },
            "detailText": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Детальное описание",
                "type": "string"
            },
            "detailTextType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Тип детального описания",
                "type": "string"
            },
            "height": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Высота",
                "type": "double"
            },
            "iblockId": {
                "isImmutable": true,
                "isReadOnly": false,
                "isRequired": true,
                "name": "Идентификатор инфоблока",
                "type": "integer"
            },
            "iblockSection": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Разделы",
                "type": "list"
            },
            "iblockSectionId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Основной раздел",
                "type": "integer"
            },
            "id": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Идентификатор",
                "type": "integer"
            },
            "length": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Длина",
                "type": "double"
            },
            "measure": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Единица измерения",
                "type": "integer"
            },
            "modifiedBy": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Кто изменил",
                "type": "integer"
            },
            "name": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "name": "Наименование",
                "type": "string"
            },
            "negativeAmountTrace": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "NEGATIVE_AMOUNT_TRACE",
                "type": "char"
            },
            "parentId": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Элемент каталога",
                "propertyType": "E",
                "type": "productproperty",
                "userType": "SKU"
            },
            "previewPicture": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Картинка анонса",
                "type": "file"
            },
            "previewText": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Описание для анонса",
                "type": "string"
            },
            "previewTextType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Тип описания для анонса",
                "type": "string"
            },
            "priceType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Тип оплаты",
                "type": "char"
            },
            "property429": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": true,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Картинки",
                "propertyType": "F",
                "type": "productproperty",
                "userType": ""
            },
            "property895": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Цвет",
                "propertyType": "S",
                "type": "productproperty",
                "userType": "directory"
            },
            "property907": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Размеры одежды",
                "propertyType": "L",
                "type": "productproperty",
                "userType": null
            },
            "property909": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": true,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Картинки вариации",
                "propertyType": "F",
                "type": "productproperty",
                "userType": ""
            },
            "property925": {
                "isDynamic": true,
                "isImmutable": false,
                "isMultiple": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Дата/Время",
                "propertyType": "S",
                "type": "productproperty",
                "userType": "DateTime"
            },
            "purchasingCurrency": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Валюта закупочной цены",
                "type": "string"
            },
            "purchasingPrice": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Закупочная цена",
                "type": "string"
            },
            "quantity": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Доступное количество",
                "type": "double"
            },
            "quantityReserved": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Зарезервированное количество",
                "type": "double"
            },
            "quantityTrace": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Режим количественного учета",
                "type": "char"
            },
            "recurSchemeLength": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Длина периода оплаты",
                "type": "integer"
            },
            "recurSchemeType": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Единица времени периода оплаты",
                "type": "char"
            },
            "sort": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Индекс сортировки",
                "type": "integer"
            },
            "subscribe": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Разрешение подписки на товар",
                "type": "char"
            },
            "timestampX": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Дата изменения",
                "type": "datetime"
            },
            "trialPriceId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Товар для пробной оплаты",
                "type": "integer"
            },
            "type": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "name": "Тип товара",
                "type": "integer"
            },
            "vatId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Идентификатор НДС",
                "type": "integer"
            },
            "vatIncluded": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "НДС включен в цену",
                "type": "char"
            },
            "weight": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Вес",
                "type": "double"
            },
            "width": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Ширина",
                "type": "double"
            },
            "withoutOrder": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Продление без оформления заказа",
                "type": "char"
            },
            "xmlId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": false,
                "name": "Внешний код",
                "type": "string"
            }
        }
    },
    "time": {
        "start": 1793891987,
        "finish": 1793891987.676673,
        "duration": 0.6766729354858398,
        "processing": 0,
        "date_start": "2026-11-05T18:19:47+03:00",
        "date_finish": "2026-11-05T18:19:47+03:00",
        "operating_reset_at": 1793892540,
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
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — поле объекта [catalog_product_offer](../../data-types.md#catalog_product_offer), а `value` — объект типа [rest_field_description](../../data-types.md#rest_field_description).

Свойства вариации приходят с ключом `propertyN`, где `N` — идентификатор свойства, и с типом `productproperty`. Для них дополнительно приходят `propertyType` — тип свойства, `userType` — пользовательский тип и `isMultiple` — множественность. Свойство привязки к головному товару приходит с ключом `parentId` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "productType is not allowed for this catalog"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни права «Просмотр каталога товаров», ни права «Просмотр товаров каталога», ни права «Изменение цены продажи товара» ||
|| `400` | `100` | Could not find value for parameter {filter} | Не передан параметр `filter` ||
|| `400` | `0` | Incorrect filter format | В `filter` передан не объект ||
|| `400` | `0` | parameter - iblockId is empty | В `filter` не передан `iblockId` ||
|| `400` | `0` | iblock is not catalog | Инфоблок с указанным `iblockId` не найден или не является каталогом ||
|| `400` | `0` | productType is not allowed for this catalog | В `iblockId` передан инфоблок товаров, а не инфоблок вариаций ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-list.md)
- [{#T}](./catalog-product-offer-download.md)
- [{#T}](./catalog-product-offer-delete.md)
