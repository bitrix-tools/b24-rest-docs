# Обновить товар catalog.product.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование товара» и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

Метод `catalog.product.update` обновляет товар торгового каталога. Поля, которых нет в запросе, сохраняют прежние значения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product.id`](../data-types.md#catalog_product) | Идентификатор товара. Идентификатор можно получить методом [catalog.product.list](./catalog-product-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями товара, которые нужно изменить [(подробное описание)](#fields).

Если передать пустой объект, метод вернет товар без изменений.

Инфоблок товара изменить нельзя: если передать `iblockId` с другим значением, метод не вернет ошибку и не перенесет товар ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название товара. Пустое значение вызывает ошибку «Не введено название» ||
|| **active**
[`string`](../../data-types.md) | Активность товара.

Возможные значения:

- `Y` — активен
- `N` — неактивен

Другие значения сохраняются как `N` ||
|| **code**
[`string`](../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **createdBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который создал товар. Идентификатор можно получить методом [user.get](../../user/user-get.md) ||
|| **modifiedBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который изменил товар ||
|| **dateActiveFrom**
[`datetime`](../../data-types.md) | Дата начала активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты начала активности», число игнорируется. Принимается `null` ||
|| **dateActiveTo**
[`datetime`](../../data-types.md) | Дата окончания активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты завершения активности», число игнорируется. Принимается `null` ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания. Поле заполняется автоматически, передавать его не нужно: сейчас переданная дата сохраняется неверно, например `2024-05-27T10:00:00+03:00` сохраняется как `2001-11-30T00:00:00+03:00` ||
|| **iblockSectionId**
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор основного раздела. Идентификатор можно получить методом [catalog.section.list](../section/catalog-section-list.md).

Для несуществующего раздела метод возвращает ошибку `200040300050`. Чтобы отвязать товар от разделов, передайте `0` ||
|| **iblockSection**
[`catalog_section.id[]`](../data-types.md#catalog_section) | Массив идентификаторов разделов, к которым нужно привязать товар, например `[41, 39]`. Основной раздел задайте в `iblockSectionId`.

Массив заменяет текущие привязки к разделам ||
|| **previewText**
[`string`](../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../data-types.md) | Тип описания для анонса.

Возможные значения:

- `text` — текст
- `html` — HTML ||
|| **previewPicture**
[`object`](../../data-types.md) | Картинка для анонса. Объект в формате `{"fileData": ["photo.png", "base64"]}`: первый элемент — название файла с расширением, второй — содержимое файла в кодировке [Base64](../../files/how-to-upload-files.md).

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **detailText**
[`string`](../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../data-types.md) | Тип детального описания.

Возможные значения:

- `text` — текст
- `html` — HTML ||
|| **detailPicture**
[`object`](../../data-types.md) | Детальная картинка. Объект в формате `{"fileData": ["photo.png", "base64"]}`: первый элемент — название файла с расширением, второй — содержимое файла в кодировке [Base64](../../files/how-to-upload-files.md).

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **quantity**
[`double`](../../data-types.md) | Доступное количество. При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **quantityReserved**
[`double`](../../data-types.md) | Зарезервированное количество. При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **quantityTrace**
[`string`](../../data-types.md) | Режим количественного учета.

Возможные значения:

- `Y` — включен
- `N` — выключен
- `D` — значение из настроек модуля Торговый каталог.

В ответе возвращается итоговое значение `Y` или `N` ||
|| **canBuyZero**
[`string`](../../data-types.md) | Разрешить покупку при отсутствии товара.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — значение из настроек модуля Торговый каталог.

В ответе возвращается итоговое значение `Y` или `N` ||
|| **subscribe**
[`string`](../../data-types.md) | Разрешить подписку на товар.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — значение из настроек модуля Торговый каталог.

В ответе возвращается итоговое значение `Y` или `N` ||
|| **vatId**
[`catalog_vat.id`](../data-types.md#catalog_vat) | Идентификатор ставки НДС. Идентификатор можно получить методом [catalog.vat.list](../vat/catalog-vat-list.md).

Метод не проверяет, что ставка существует: несуществующий идентификатор сохраняется без ошибки ||
|| **vatIncluded**
[`string`](../../data-types.md) | НДС включен в цену.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **purchasingPrice**
[`double`](../../data-types.md) | Закупочная цена. При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **purchasingCurrency**
[`string`](../../data-types.md) | Валюта закупочной цены, например `RUB`. Список валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md).

При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **barcodeMulti**
[`string`](../../data-types.md) | Уникальный штрихкод для каждого экземпляра.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **weight**
[`double`](../../data-types.md) | Вес ||
|| **length**
[`double`](../../data-types.md) | Длина ||
|| **width**
[`double`](../../data-types.md) | Ширина ||
|| **height**
[`double`](../../data-types.md) | Высота ||
|| **measure**
[`catalog_measure.id`](../data-types.md#catalog_measure) | Идентификатор единицы измерения. Идентификатор можно получить методом [catalog.measure.list](../measure/catalog-measure-list.md).

Метод не проверяет, что единица измерения существует: несуществующий идентификатор сохраняется без ошибки ||
|| **recurSchemeLength**
[`integer`](../../data-types.md) | Длина периода оплаты. Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **recurSchemeType**
[`string`](../../data-types.md) | Единица времени периода оплаты.

Возможные значения:

- `H` — час
- `D` — день
- `W` — неделя
- `M` — месяц
- `Q` — квартал
- `S` — полугодие
- `Y` — год.

Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **trialPriceId**
[`integer`](../../data-types.md) | Идентификатор товара для пробной оплаты. Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **withoutOrder**
[`string`](../../data-types.md) | Продление без оформления заказа.

Возможные значения:

- `Y` — да
- `N` — нет.

Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **propertyN**
[`object`\|`array`](../../data-types.md) | Значение свойства товара, где `N` — идентификатор свойства, например `property301`.

Формат значения:

- `{"valueId": 4083, "value": "значение"}` — для одиночного свойства
- `[{"valueId": 4085, "value": "значение 1"}, {"value": "значение 2"}]` — для множественного свойства

`valueId` — идентификатор текущего значения свойства. Идентификаторы можно получить методами [catalog.product.get](./catalog-product-get.md) и [catalog.product.list](./catalog-product-list.md). Если у свойства еще нет значения, передайте только `value`.

Значение одиночного свойства передавайте объектом: строка вместо объекта очищает значение свойства.

Если свойство множественное, значения без `valueId` в запросе удаляются. Исключение — свойства типа «Файл»: значения, которые не переданы в запросе, сохраняются, но их `valueId` меняются.

Для свойства с `userType` `BoolEnum` передайте в `value` `Y` или `N`.

Изменение значений свойств типа «Файл» описано в статье [Как обновить и удалить файлы](../../files/how-to-update-files.md) ||
|#

Поля `id`, `type`, `available`, `bundle` и `timestampX` заполняются автоматически. Поля, которых нет в таблице, метод пропускает без ошибки.

{% note warning "Работа с ценой товара" %}

Чтобы изменить цену товара, используйте методы [catalog.price.*](../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7651,"fields":{"name":"Футболка базовая белая","previewText":"Футболка из хлопка, белый цвет","detailPicture":{"fileData":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="]},"property301":{"valueId":4083,"value":"TS-002"},"property305":[{"valueId":4085,"value":"Хлопок"},{"value":"Лен"}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7651,"fields":{"name":"Футболка базовая белая","previewText":"Футболка из хлопка, белый цвет","detailPicture":{"fileData":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="]},"property301":{"valueId":4083,"value":"TS-002"},"property305":[{"valueId":4085,"value":"Хлопок"},{"value":"Лен"}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductResult = {
      element: {
        id: number,
        iblockId: number,
        iblockSectionId: number | null,
        iblockSection: number[] | null,
        name: string,
        code: string | null,
        active: string,
        xmlId: string,
        dateCreate: ISODate,
        timestampX: ISODate,
        previewPicture: { id: string, url: string, urlMachine: string } | null,
        detailPicture: { id: string, url: string, urlMachine: string } | null,
        property301: { value: string, valueId: string } | null,
        property305: Array<{ value: string, valueId: string }> | null,
        [key: string]: unknown,
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ProductResult>({
        method: 'catalog.product.update',
        params: {
          id: 7651,
          fields: {
            name: 'Футболка базовая белая',
            previewText: 'Футболка из хлопка, белый цвет',
            detailPicture: {
              fileData: ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
            },
            property301: {
              valueId: 4083,
              value: 'TS-002',
            },
            property305: [
              {
                valueId: 4085,
                value: 'Хлопок',
              },
              {
                value: 'Лен',
              },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated product id:', result.element.id, 'name:', result.element.name)
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
      async function updateProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.update',
            params: {
              id: 7651,
              fields: {
                name: 'Футболка базовая белая',
                previewText: 'Футболка из хлопка, белый цвет',
                detailPicture: {
                  fileData: ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                },
                property301: {
                  valueId: 4083,
                  value: 'TS-002',
                },
                property305: [
                  {
                    valueId: 4085,
                    value: 'Хлопок',
                  },
                  {
                    value: 'Лен',
                  },
                ],
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
          console.info('Updated product id:', result.element.id, 'name:', result.element.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.update(
            id=7651,
            fields={
                "name": "Футболка базовая белая",
                "previewText": "Футболка из хлопка, белый цвет",
                "detailPicture": {
                    "fileData": ["photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="],
                },
                "property301": {
                    "valueId": 4083,
                    "value": "TS-002",
                },
                "property305": [
                    {
                        "valueId": 4085,
                        "value": "Хлопок",
                    },
                    {
                        "value": "Лен",
                    },
                ],
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
                'catalog.product.update',
                [
                    'id'     => 7651,
                    'fields' => [
                        'name'          => 'Футболка базовая белая',
                        'previewText'   => 'Футболка из хлопка, белый цвет',
                        'detailPicture' => [
                            'fileData' => ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                        ],
                        'property301'   => [
                            'valueId' => 4083,
                            'value'   => 'TS-002',
                        ],
                        'property305'   => [
                            [
                                'valueId' => 4085,
                                'value'   => 'Хлопок',
                            ],
                            [
                                'value' => 'Лен',
                            ],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.update',
        {
            'id': 7651,
            'fields': {
                'name': 'Футболка базовая белая',
                'previewText': 'Футболка из хлопка, белый цвет',
                'detailPicture': {
                    'fileData': ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==']
                },
                'property301': {
                    'valueId': 4083,
                    'value': 'TS-002'
                },
                'property305': [
                    {
                        'valueId': 4085,
                        'value': 'Хлопок'
                    },
                    {
                        'value': 'Лен'
                    }
                ]
            }
        },
        function(result)
        {
            if(result.error())
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
        'catalog.product.update',
        [
            'id'     => 7651,
            'fields' => [
                'name'          => 'Футболка базовая белая',
                'previewText'   => 'Футболка из хлопка, белый цвет',
                'detailPicture' => [
                    'fileData' => ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                ],
                'property301'   => [
                    'valueId' => 4083,
                    'value'   => 'TS-002',
                ],
                'property305'   => [
                    [
                        'valueId' => 4085,
                        'value'   => 'Хлопок',
                    ],
                    [
                        'value' => 'Лен',
                    ],
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
    res, err := client.Core().Call(ctx, "catalog.product.update", b24.Params{
    	"id":     7651,
    	"fields": b24.Params{
    		"name":          "Футболка базовая белая",
    		"previewText":   "Футболка из хлопка, белый цвет",
    		"detailPicture": b24.Params{
    			"fileData": []string{"photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="},
    		},
    		"property301":   b24.Params{
    			"valueId": 4083,
    			"value":   "TS-002",
    		},
    		"property305":   []b24.Params{
    			b24.Params{
    				"valueId": 4085,
    				"value":   "Хлопок",
    			},
    			b24.Params{
    				"value": "Лен",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "element".
    raw, ok := b24.Unwrap(res.Result, "element")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа element")
    }

    var item struct {
    	ID              int    `json:"id"`
    	IblockID        int    `json:"iblockId"`
    	IblockSectionID int    `json:"iblockSectionId"`
    	Name            string `json:"name"`
    	Code            string `json:"code"`
    	Active          string `json:"active"`
    	XMLID           string `json:"xmlId"`
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
        "element": {
            "active": "Y",
            "available": "Y",
            "barcodeMulti": "N",
            "bundle": "N",
            "canBuyZero": "Y",
            "code": "tshirt-basic",
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-05T18:23:16+03:00",
            "detailPicture": {
                "id": "40043",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=detailPicture&fields%5BfileId%5D=40043&fields%5BproductId%5D=7651",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=detailPicture&fields%5BfileId%5D=40043&fields%5BproductId%5D=7651"
            },
            "detailText": null,
            "detailTextType": "text",
            "height": null,
            "iblockId": 25,
            "iblockSection": [
                39,
                41
            ],
            "iblockSectionId": 41,
            "id": 7651,
            "length": null,
            "measure": 9,
            "modifiedBy": 1269,
            "name": "Футболка базовая белая",
            "previewPicture": {
                "id": "40041",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40041&fields%5BproductId%5D=7651",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40041&fields%5BproductId%5D=7651"
            },
            "previewText": "Футболка из хлопка, белый цвет",
            "previewTextType": "text",
            "property301": {
                "value": "TS-002",
                "valueId": "4083"
            },
            "property305": [
                {
                    "value": "Хлопок",
                    "valueId": "4085"
                },
                {
                    "value": "Лен",
                    "valueId": "4089"
                }
            ],
            "purchasingCurrency": null,
            "purchasingPrice": null,
            "quantity": null,
            "quantityReserved": null,
            "quantityTrace": "Y",
            "recurSchemeLength": null,
            "recurSchemeType": "D",
            "sort": 500,
            "subscribe": "Y",
            "timestampX": "2026-11-05T18:23:29+03:00",
            "trialPriceId": null,
            "type": 1,
            "vatId": 1,
            "vatIncluded": "Y",
            "weight": 200,
            "width": null,
            "withoutOrder": "N",
            "xmlId": "7651"
        }
    },
    "time": {
        "start": 1793892209,
        "finish": 1793892209.31875,
        "duration": 0.31874990463256836,
        "processing": 0,
        "date_start": "2026-11-05T18:23:29+03:00",
        "date_finish": "2026-11-05T18:23:29+03:00",
        "operating_reset_at": 1793892600,
        "operating": 0.7716009616851807
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат запроса с обновленным товаром ||
|| **result.element**
[`catalog_product`](../data-types.md#catalog_product) | Объект с информацией об обновленном товаре ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"200040300010",
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300043` | `Access Denied` | Нет права на изменение элемента информационного блока ||
|| `400` | `200040300050` | `Access Denied` | Раздел из `iblockSectionId` не найден или нет права на привязку товара к разделу ||
|| `400` | `200040300040` | `Access Denied` | Нет права на изменение товара ||
|| `400` | `200040300010` | `Access Denied` | Нет права на просмотр каталога товаров ||
|| `400` | `200040300000` | `Iblock Not Found` | Информационный блок товара не найден ||
|| `400` | `100` | `Could not find value for parameter {id}` | Не передан обязательный параметр `id` ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Не передан обязательный параметр `fields` ||
|| `400` | Пустое значение | `product does not exist.` | Товар с указанным `id` не найден ||
|| `400` | `0` | `User createdBy is not exists` или `User modifiedBy is not exists` | Пользователь из `createdBy` или `modifiedBy` не найден ||
|| `400` | `0` | `Не введено название.<br>` | В `name` передана пустая строка ||
|| `400` | `0` | `Неверный формат даты начала активности.<br>` | Передано значение `dateActiveFrom`. Для `dateActiveTo` текст ошибки — `Неверный формат даты завершения активности.<br>` ||
|| `400` | `0` | `Internal error updating product. Try updating again.` | Внутренняя ошибка при сохранении товара ||
|#

Проверка изменяемых полей и свойств товара может вернуть дополнительные ошибки с описанием конкретного поля.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-get.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](./catalog-product-download.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)
