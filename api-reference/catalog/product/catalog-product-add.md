# Добавить товар catalog.product.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание товара» и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

Метод `catalog.product.add` добавляет товар в торговый каталог и возвращает его поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового товара [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор инфоблока торгового каталога. Идентификатор можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list.md).

Передайте инфоблок товаров, а не вариаций: с инфоблоком вариаций метод создаст вариацию без головного товара. Вариации добавляйте методом [catalog.product.offer.add](./offer/catalog-product-offer-add.md) ||
|| **name***
[`string`](../../data-types.md) | Название товара ||
|| **active**
[`string`](../../data-types.md) | Активность товара.

Возможные значения:

- `Y` — активен
- `N` — неактивен

Другие значения сохраняются как `N`

По умолчанию: `Y` ||
|| **code**
[`string`](../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код. Если не передать, совпадет с идентификатором товара ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка

По умолчанию: `500` ||
|| **createdBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который создал товар. Идентификатор можно получить методом [user.get](../../user/user-get.md).

По умолчанию: пользователь, который вызвал метод ||
|| **modifiedBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, который изменил товар.

По умолчанию: пользователь, который вызвал метод ||
|| **dateActiveFrom**
[`datetime`](../../data-types.md) | Дата начала активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты начала активности», число игнорируется. Принимается `null` ||
|| **dateActiveTo**
[`datetime`](../../data-types.md) | Дата окончания активности. Сейчас дату нельзя задать: строка в любом формате вызывает ошибку «Неверный формат даты завершения активности», число игнорируется. Принимается `null` ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания. Поле заполняется автоматически, передавать его не нужно: сейчас переданная дата сохраняется неверно, например `2024-05-27T10:00:00+03:00` сохраняется как `2001-11-30T00:00:00+03:00` ||
|| **iblockSectionId**
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор основного раздела. Идентификатор можно получить методом [catalog.section.list](../section/catalog-section-list.md).

Для несуществующего раздела метод возвращает ошибку `200040300050` ||
|| **iblockSection**
[`catalog_section.id[]`](../data-types.md#catalog_section) | Массив идентификаторов разделов, к которым нужно привязать товар, например `[41, 39]`. Основной раздел задайте в `iblockSectionId` ||
|| **previewText**
[`string`](../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../data-types.md) | Тип описания для анонса.

Возможные значения:

- `text` — текст
- `html` — HTML

По умолчанию: `text` ||
|| **previewPicture**
[`object`](../../data-types.md) | Картинка для анонса. Объект в формате `{"fileData": ["photo.png", "base64"]}`: первый элемент — название файла с расширением, второй — содержимое файла в кодировке [Base64](../../files/how-to-upload-files.md).

Чтобы удалить картинку, передайте `{"remove": "Y"}` ||
|| **detailText**
[`string`](../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../data-types.md) | Тип детального описания.

Возможные значения:

- `text` — текст
- `html` — HTML

По умолчанию: `text` ||
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
- `D` — значение из настроек модуля Торговый каталог

По умолчанию: `D`.

В ответе возвращается итоговое значение `Y` или `N` ||
|| **canBuyZero**
[`string`](../../data-types.md) | Разрешить покупку при отсутствии товара.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — значение из настроек модуля Торговый каталог

По умолчанию: `D`.

В ответе возвращается итоговое значение `Y` или `N` ||
|| **subscribe**
[`string`](../../data-types.md) | Разрешить подписку на товар.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — значение из настроек модуля Торговый каталог

По умолчанию: `D`.

В ответе возвращается итоговое значение `Y` или `N` ||
|| **vatId**
[`catalog_vat.id`](../data-types.md#catalog_vat) | Идентификатор ставки НДС. Идентификатор можно получить методом [catalog.vat.list](../vat/catalog-vat-list.md) ||
|| **vatIncluded**
[`string`](../../data-types.md) | НДС включен в цену.

Возможные значения:

- `Y` — да
- `N` — нет

По умолчанию: `N` ||
|| **purchasingPrice**
[`double`](../../data-types.md) | Закупочная цена. При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **purchasingCurrency**
[`string`](../../data-types.md) | Валюта закупочной цены, например `RUB`. Список валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md).

При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **barcodeMulti**
[`string`](../../data-types.md) | Уникальный штрихкод для каждого экземпляра.

Возможные значения:

- `Y` — да
- `N` — нет

По умолчанию: `N` ||
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
- `Y` — год

По умолчанию: `D`.

Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **trialPriceId**
[`integer`](../../data-types.md) | Идентификатор товара для пробной оплаты. Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **withoutOrder**
[`string`](../../data-types.md) | Продление без оформления заказа.

Возможные значения:

- `Y` — да
- `N` — нет

По умолчанию: `N`.

Используется только в [коробочной версии](../../../settings/cloud-and-on-premise/index.md) для продажи контента ||
|| **propertyN**
[`any`](../../data-types.md) | Значение свойства товара, где `N` — идентификатор свойства, например `property301`. Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md).

Значение одиночного свойства передайте строкой, числом или объектом `{"value": "значение"}`. Значение множественного свойства передайте массивом значений или объектов `{"value": "значение"}`.

Свойства с несуществующим идентификатором метод пропускает без ошибки. Загрузка значений свойств типа «Файл» описана в статье [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|#

Поля `id`, `type`, `available`, `bundle` и `timestampX` заполняются автоматически. Поля, которых нет в таблице, метод пропускает без ошибки.

{% note warning "Работа с ценой товара" %}

Чтобы указать цену товара, используйте методы [catalog.price.*](../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Футболка базовая","code":"tshirt-basic","iblockSectionId":41,"iblockSection":[41,39],"vatId":1,"vatIncluded":"Y","measure":9,"weight":200,"previewText":"Футболка из хлопка","previewPicture":{"fileData":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="]},"property301":"TS-001","property305":["Хлопок","Полиэстер"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Футболка базовая","code":"tshirt-basic","iblockSectionId":41,"iblockSection":[41,39],"vatId":1,"vatIncluded":"Y","measure":9,"weight":200,"previewText":"Футболка из хлопка","previewPicture":{"fileData":["photo.png","iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="]},"property301":"TS-001","property305":["Хлопок","Полиэстер"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.add
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
        method: 'catalog.product.add',
        params: {
          fields: {
            iblockId: 25,
            name: 'Футболка базовая',
            code: 'tshirt-basic',
            iblockSectionId: 41,
            iblockSection: [41, 39],
            vatId: 1,
            vatIncluded: 'Y',
            measure: 9,
            weight: 200,
            previewText: 'Футболка из хлопка',
            previewPicture: {
              fileData: ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
            },
            property301: 'TS-001',
            property305: ['Хлопок', 'Полиэстер'],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added product id:', result.element.id, 'name:', result.element.name)
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
      async function addProduct() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.add',
            params: {
              fields: {
                iblockId: 25,
                name: 'Футболка базовая',
                code: 'tshirt-basic',
                iblockSectionId: 41,
                iblockSection: [41, 39],
                vatId: 1,
                vatIncluded: 'Y',
                measure: 9,
                weight: 200,
                previewText: 'Футболка из хлопка',
                previewPicture: {
                  fileData: ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                },
                property301: 'TS-001',
                property305: ['Хлопок', 'Полиэстер'],
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
          console.info('Added product id:', result.element.id, 'name:', result.element.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProduct)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.add(
            fields={
                "iblockId": 25,
                "name": "Футболка базовая",
                "code": "tshirt-basic",
                "iblockSectionId": 41,
                "iblockSection": [41, 39],
                "vatId": 1,
                "vatIncluded": "Y",
                "measure": 9,
                "weight": 200,
                "previewText": "Футболка из хлопка",
                "previewPicture": {
                    "fileData": ["photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="],
                },
                "property301": "TS-001",
                "property305": ["Хлопок", "Полиэстер"],
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
                'catalog.product.add',
                [
                    'fields' => [
                        'iblockId'        => 25,
                        'name'            => 'Футболка базовая',
                        'code'            => 'tshirt-basic',
                        'iblockSectionId' => 41,
                        'iblockSection'   => [41, 39],
                        'vatId'           => 1,
                        'vatIncluded'     => 'Y',
                        'measure'         => 9,
                        'weight'          => 200,
                        'previewText'     => 'Футболка из хлопка',
                        'previewPicture'  => [
                            'fileData' => ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                        ],
                        'property301'     => 'TS-001',
                        'property305'     => ['Хлопок', 'Полиэстер'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.add',
        {
            'fields': {
                'iblockId': 25,
                'name': 'Футболка базовая',
                'code': 'tshirt-basic',
                'iblockSectionId': 41,
                'iblockSection': [41, 39],
                'vatId': 1,
                'vatIncluded': 'Y',
                'measure': 9,
                'weight': 200,
                'previewText': 'Футболка из хлопка',
                'previewPicture': {
                    'fileData': ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==']
                },
                'property301': 'TS-001',
                'property305': ['Хлопок', 'Полиэстер']
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
        'catalog.product.add',
        [
            'fields' => [
                'iblockId'        => 25,
                'name'            => 'Футболка базовая',
                'code'            => 'tshirt-basic',
                'iblockSectionId' => 41,
                'iblockSection'   => [41, 39],
                'vatId'           => 1,
                'vatIncluded'     => 'Y',
                'measure'         => 9,
                'weight'          => 200,
                'previewText'     => 'Футболка из хлопка',
                'previewPicture'  => [
                    'fileData' => ['photo.png', 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='],
                ],
                'property301'     => 'TS-001',
                'property305'     => ['Хлопок', 'Полиэстер'],
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
    res, err := client.Core().Call(ctx, "catalog.product.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId":        25,
    		"name":            "Футболка базовая",
    		"code":            "tshirt-basic",
    		"iblockSectionId": 41,
    		"iblockSection":   []int{41, 39},
    		"vatId":           1,
    		"vatIncluded":     "Y",
    		"measure":         9,
    		"weight":          200,
    		"previewText":     "Футболка из хлопка",
    		"previewPicture":  b24.Params{
    			"fileData": []string{"photo.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="},
    		},
    		"property301":     "TS-001",
    		"property305":     []string{"Хлопок", "Полиэстер"},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.add: %w", err)
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
            "detailPicture": null,
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
            "name": "Футболка базовая",
            "previewPicture": {
                "id": "40041",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40041&fields%5BproductId%5D=7651",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40041&fields%5BproductId%5D=7651"
            },
            "previewText": "Футболка из хлопка",
            "previewTextType": "text",
            "property301": {
                "value": "TS-001",
                "valueId": "4083"
            },
            "property305": [
                {
                    "value": "Хлопок",
                    "valueId": "4085"
                },
                {
                    "value": "Полиэстер",
                    "valueId": "4087"
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
            "timestampX": "2026-11-05T18:23:16+03:00",
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
        "start": 1793892196,
        "finish": 1793892196.679604,
        "duration": 0.6796040534973145,
        "processing": 0,
        "date_start": "2026-11-05T18:23:16+03:00",
        "date_finish": "2026-11-05T18:23:16+03:00",
        "operating_reset_at": 1793892360,
        "operating": 1.0158729553222656
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Результат запроса с созданным товаром ||
|| **result.element**
[`catalog_product`](../data-types.md#catalog_product) | Объект с информацией о добавленном товаре ||
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
|| `400` | `200040300050` | `Access Denied` | Раздел из `iblockSectionId` не найден или нет права на привязку товара к разделу ||
|| `400` | `200040300040` | `Access Denied` | Нет права на создание товара ||
|| `400` | `200040300043` | `Access Denied` | Нет права на добавление элемента информационного блока ||
|| `400` | `200040300010` | `Access Denied` | Нет права на просмотр каталога товаров ||
|| `400` | `200040300000` | `Iblock Not Found` | Информационный блок из `fields.iblockId` не найден ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Не передан обязательный параметр `fields` ||
|| `400` | `0` | `Required fields: name, iblockId` | В `fields` не переданы обязательные поля. Сообщение перечисляет только недостающие поля ||
|| `400` | `0` | `Неверный формат даты начала активности.<br>` | Передано значение `dateActiveFrom`. Для `dateActiveTo` текст ошибки — `Неверный формат даты завершения активности.<br>` ||
|| `400` | `0` | `VAT vatId is not exists` | Ставка НДС из `fields.vatId` не найдена ||
|| `400` | `0` | `Currency purchasingCurrency is not exists` | Валюта закупочной цены не найдена ||
|| `400` | `0` | `User createdBy is not exists` или `User modifiedBy is not exists` | Пользователь из `createdBy` или `modifiedBy` не найден ||
|| `400` | `0` | `Internal error adding product. Try adding again.` | Внутренняя ошибка при сохранении товара ||
|#

Проверка обязательных полей и свойств товара может вернуть дополнительные ошибки с описанием конкретного поля.

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-update.md)
- [{#T}](./catalog-product-get.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](../../../tutorials/catalog/index.md)
- [{#T}](./catalog-product-download.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)
