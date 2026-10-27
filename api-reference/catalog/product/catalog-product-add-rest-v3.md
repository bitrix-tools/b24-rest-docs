# Добавить товар v 3.0 catalog.product.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание товара» и одним из прав: «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.add` создает простой товар в торговом каталоге и возвращает его поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового товара. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор инфоблока торгового каталога.

Идентификатор можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md). Инфоблок каталога вариаций не подходит: метод вернет ошибку «Неверный тип товара» ||
|| **name***
[`string`](../../data-types.md) | Название товара ||
|| **code**
[`string`](../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код. Если не передать, совпадет с идентификатором товара ||
|| **active**
[`string`](../../data-types.md) | Активность товара.

Возможные значения:

- `Y` — активен
- `N` — неактивен

Другие значения сохраняются как `N`.

По умолчанию: `Y` ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка.

По умолчанию: `500` ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал товар. Идентификатор можно получить методом [user.get](../../user/user-get.md) ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который изменил товар ||
|| **dateActiveFrom**
[`datetime`](../../data-types.md) | Дата начала активности. Сейчас дату нельзя задать методами REST 3.0: значение в формате ISO 8601 вызывает ошибку «Wrong format of field», значения в других форматах — ошибку типа данных. Принимается только `null` ||
|| **dateActiveTo**
[`datetime`](../../data-types.md) | Дата окончания активности. Сейчас дату нельзя задать методами REST 3.0: значение в формате ISO 8601 вызывает ошибку «Wrong format of field», значения в других форматах — ошибку типа данных. Принимается только `null` ||
|| **previewText**
[`string`](../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../data-types.md) | Тип описания для анонса.

Возможные значения:

- `text` — текст
- `html` — HTML

По умолчанию: `text` ||
|| **previewPicture**
[`object`](../../data-types.md) | Картинка для анонса. Сейчас файл нельзя загрузить или удалить методами REST 3.0: значение в формате `{"fileData": ["имя.png", "base64"]}` проходит проверку, но файл не сохраняется. Загрузите файл методом прежней версии [catalog.product.update](./catalog-product-update.md) ||
|| **detailText**
[`string`](../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../data-types.md) | Тип детального описания.

Возможные значения:

- `text` — текст
- `html` — HTML

По умолчанию: `text` ||
|| **detailPicture**
[`object`](../../data-types.md) | Детальная картинка. Сейчас файл нельзя загрузить или удалить методами REST 3.0: значение в формате `{"fileData": ["имя.png", "base64"]}` проходит проверку, но файл не сохраняется. Загрузите файл методом прежней версии [catalog.product.update](./catalog-product-update.md) ||
|| **iblockSectionId**
[`integer`](../../data-types.md) | Идентификатор основного раздела. Идентификатор можно получить методом [catalog.section.list](../section/catalog-section-list-rest-v3.md) ||
|| **iblockSection**
[`array`](../../data-types.md) | Массив идентификаторов разделов, к которым нужно привязать товар, например `[41, 39]`. Основной раздел задайте в `iblockSectionId` ||
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

При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **canBuyZero**
[`string`](../../data-types.md) | Разрешить покупку при отсутствии товара.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — значение из настроек модуля Торговый каталог ||
|| **subscribe**
[`string`](../../data-types.md) | Разрешить подписку на товар.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — значение из настроек модуля Торговый каталог ||
|| **vatId**
[`integer`](../../data-types.md) | Идентификатор ставки НДС. Идентификатор можно получить методом [catalog.vat.list](../vat/catalog-vat-list-rest-v3.md) ||
|| **vatIncluded**
[`string`](../../data-types.md) | НДС включен в цену.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **purchasingPrice**
[`double`](../../data-types.md) | Закупочная цена. При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
|| **purchasingCurrency**
[`string`](../../data-types.md) | Валюта закупочной цены, например `RUB`. При включенном складском учете значение не сохраняется: метод не вернет ошибку, но поле останется прежним ||
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
[`integer`](../../data-types.md) | Идентификатор единицы измерения. Идентификатор можно получить методом [catalog.measure.list](../measure/catalog-measure-list-rest-v3.md) ||
|| **recurSchemeLength**
[`integer`](../../data-types.md) | Длина периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../../data-types.md) | Единица времени периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **trialPriceId**
[`integer`](../../data-types.md) | Идентификатор товара для пробной оплаты. Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../../data-types.md) | Продление без оформления заказа. Используется только в коробочной версии для продажи контента ||
|| **quantityTraceRaw**
[`string`](../../data-types.md) | Режим количественного учета с учетом настроек модуля: `Y`, `N` или `D` ||
|| **paymentType**
[`string`](../../data-types.md) | Тип оплаты. Используется только в коробочной версии для продажи контента ||
|| **subscribeRaw**
[`string`](../../data-types.md) | Разрешение подписки с учетом настроек модуля: `Y`, `N` или `D` ||
|| **canBuyZeroRaw**
[`string`](../../data-types.md) | Разрешение покупки при отсутствии товара с учетом настроек модуля: `Y`, `N` или `D` ||
|| **properties**
[`object`](../../data-types.md) | Значения свойств товара. Ключ — `PROPERTY_{id}`, где `id` — идентификатор свойства, например `{"PROPERTY_301": "TS-001", "PROPERTY_305": ["Хлопок", "Полиэстер"]}`.

Значение одиночного свойства передайте строкой или числом, множественного — массивом значений.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md). Свойства типа «Файл» сейчас не сохраняются ||
|#

Поля `id`, `type`, `available`, `bundle`, `dateCreate` и `timestampX` заполняются автоматически. Если передать их в `fields`, метод вернет ошибку.

{% note warning "" %}

Сейчас методы REST 3.0 не сохраняют файлы товара: картинки `previewPicture`, `detailPicture` и значения свойств типа «Файл». Загрузите файлы методом прежней версии [catalog.product.update](./catalog-product-update.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Футболка базовая","code":"tshirt-basic","iblockSectionId":41,"vatId":1,"vatIncluded":"Y","measure":9,"previewText":"Футболка из хлопка","properties":{"PROPERTY_301":"TS-001","PROPERTY_305":["Хлопок","Полиэстер"]}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":25,"name":"Футболка базовая","code":"tshirt-basic","iblockSectionId":41,"vatId":1,"vatIncluded":"Y","measure":9,"previewText":"Футболка из хлопка","properties":{"PROPERTY_301":"TS-001","PROPERTY_305":["Хлопок","Полиэстер"]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductResult = {
      item: {
        id: number
        iblockId: number
        name: string
        code: string | null
        active: 'Y' | 'N'
        iblockSectionId: number | null
        type: number
        vatId: number | null
        measure: number | null
        dateCreate: ISODate
        properties: Record<string, { VALUE: string, VALUE_ID: string } | Array<{ VALUE: string, VALUE_ID: string }> | null>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductResult>({
        method: 'catalog.product.add',
        params: {
          fields: {
            iblockId: 25,
            name: 'Футболка базовая',
            code: 'tshirt-basic',
            iblockSectionId: 41,
            vatId: 1,
            vatIncluded: 'Y',
            measure: 9,
            previewText: 'Футболка из хлопка',
            properties: {
              PROPERTY_301: 'TS-001',
              PROPERTY_305: ['Хлопок', 'Полиэстер'],
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product created:', result.item.id)
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
      async function product() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.add',
            params: {
              fields: {
                iblockId: 25,
                name: 'Футболка базовая',
                code: 'tshirt-basic',
                iblockSectionId: 41,
                vatId: 1,
                vatIncluded: 'Y',
                measure: 9,
                previewText: 'Футболка из хлопка',
                properties: {
                  PROPERTY_301: 'TS-001',
                  PROPERTY_305: ['Хлопок', 'Полиэстер'],
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
          console.info('Product created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', product)
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
                "vatId": 1,
                "vatIncluded": "Y",
                "measure": 9,
                "previewText": "Футболка из хлопка",
                "properties": {
                    "PROPERTY_301": "TS-001",
                    "PROPERTY_305": ["Хлопок", "Полиэстер"],
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
                'catalog.product.add',
                [
                    'fields' => [
                        'iblockId' => 25,
                        'name' => 'Футболка базовая',
                        'code' => 'tshirt-basic',
                        'iblockSectionId' => 41,
                        'vatId' => 1,
                        'vatIncluded' => 'Y',
                        'measure' => 9,
                        'previewText' => 'Футболка из хлопка',
                        'properties' => [
                            'PROPERTY_301' => 'TS-001',
                            'PROPERTY_305' => ['Хлопок', 'Полиэстер'],
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
        'catalog.product.add',
        {
            fields: {
                iblockId: 25,
                name: 'Футболка базовая',
                code: 'tshirt-basic',
                iblockSectionId: 41,
                vatId: 1,
                vatIncluded: 'Y',
                measure: 9,
                previewText: 'Футболка из хлопка',
                properties: {
                    PROPERTY_301: 'TS-001',
                    PROPERTY_305: ['Хлопок', 'Полиэстер'],
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
        'catalog.product.add',
        [
            'fields' => [
                'iblockId' => 25,
                'name' => 'Футболка базовая',
                'code' => 'tshirt-basic',
                'iblockSectionId' => 41,
                'vatId' => 1,
                'vatIncluded' => 'Y',
                'measure' => 9,
                'previewText' => 'Футболка из хлопка',
                'properties' => [
                    'PROPERTY_301' => 'TS-001',
                    'PROPERTY_305' => ['Хлопок', 'Полиэстер'],
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
    res, err := client.Core().Call(ctx, "catalog.product.add", b24.Params{
    	"fields":b24.Params{
    		"iblockId":       25,
    		"name":           "Футболка базовая",
    		"code":           "tshirt-basic",
    		"iblockSectionId":41,
    		"vatId":          1,
    		"vatIncluded":    "Y",
    		"measure":        9,
    		"previewText":    "Футболка из хлопка",
    		"properties":     b24.Params{
    			"PROPERTY_301":"TS-001",
    			"PROPERTY_305":[]string{"Хлопок", "Полиэстер"},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID         int                        `json:"id"`
    	Name       string                     `json:"name"`
    	Type       int                        `json:"type"`
    	Properties map[string]json.RawMessage `json:"properties"`
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
        "item": {
            "id": 7549,
            "iblockId": 25,
            "name": "Футболка базовая",
            "code": "tshirt-basic",
            "xmlId": "7549",
            "active": "Y",
            "sort": 500,
            "createdBy": 1,
            "modifiedBy": 1,
            "dateCreate": "2026-10-22T12:17:25+03:00",
            "timestampX": "2026-10-22T12:17:25+03:00",
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "previewText": "Футболка из хлопка",
            "previewTextType": "text",
            "previewPicture": null,
            "detailText": null,
            "detailTextType": "text",
            "detailPicture": null,
            "iblockSectionId": 41,
            "iblockSection": [
                41
            ],
            "type": 1,
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
            "weight": 0,
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
                "PROPERTY_301": {
                    "VALUE": "TS-001",
                    "VALUE_ID": "4003"
                },
                "PROPERTY_303": null,
                "PROPERTY_305": [
                    {
                        "VALUE": "Хлопок",
                        "VALUE_ID": "4005"
                    },
                    {
                        "VALUE": "Полиэстер",
                        "VALUE_ID": "4007"
                    }
                ],
                "PROPERTY_359": null
            }
        }
    },
    "time": {
        "start": 1792660645,
        "finish": 1792660645.871675,
        "duration": 0.8716750144958496,
        "processing": 0,
        "date_start": "2026-10-22T12:17:25+03:00",
        "date_finish": "2026-10-22T12:17:25+03:00",
        "operating_reset_at": 1792660860,
        "operating": 0.38492894172668457
    }
}
```

В ответе `properties` содержит все свойства инфоблока. В примере показана часть свойств.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Поля созданного товара. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор товара ||
|| **iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока торгового каталога ||
|| **name**
[`string`](../../data-types.md) | Название товара ||
|| **code**
[`string`](../../data-types.md) или `null` | Символьный код ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код. Если не задан при создании, совпадает с `id` ||
|| **active**
[`string`](../../data-types.md) | Активность товара: `Y` — активен, `N` — неактивен ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал товар ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил товар ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания в формате ISO 8601 ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения в формате ISO 8601 ||
|| **dateActiveFrom**
[`datetime`](../../data-types.md) или `null` | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../../data-types.md) или `null` | Дата окончания активности ||
|| **previewText**
[`string`](../../data-types.md) или `null` | Описание для анонса ||
|| **previewTextType**
[`string`](../../data-types.md) | Тип описания для анонса: `text` — текст, `html` — HTML ||
|| **previewPicture**
[`string`](../../data-types.md) или `null` | Идентификатор файла картинки для анонса. Файл можно получить методом [catalog.product.download](./catalog-product-download-rest-v3.md) ||
|| **detailText**
[`string`](../../data-types.md) или `null` | Детальное описание ||
|| **detailTextType**
[`string`](../../data-types.md) | Тип детального описания: `text` — текст, `html` — HTML ||
|| **detailPicture**
[`string`](../../data-types.md) или `null` | Идентификатор файла детальной картинки. Файл можно получить методом [catalog.product.download](./catalog-product-download-rest-v3.md) ||
|| **iblockSectionId**
[`integer`](../../data-types.md) или `null` | Идентификатор основного раздела товара ||
|| **iblockSection**
[`array`](../../data-types.md) | Массив идентификаторов всех разделов, к которым привязан товар ||
|| **type**
[`integer`](../../data-types.md) | Тип товара. Список типов возвращает метод [catalog.product.type.list](./catalog-product-type-list.md). У товара, созданного методом `catalog.product.add`, — `1` ||
|| **available**
[`string`](../../data-types.md) | Доступность для покупки: `Y` — доступен, `N` — недоступен ||
|| **bundle**
[`string`](../../data-types.md) | Признак комплекта: `Y` — да, `N` — нет ||
|| **quantity**
[`double`](../../data-types.md) | Доступное количество ||
|| **quantityReserved**
[`double`](../../data-types.md) | Зарезервированное количество ||
|| **quantityTrace**
[`string`](../../data-types.md) | Действующий режим количественного учета: `Y` — включен, `N` — выключен ||
|| **canBuyZero**
[`string`](../../data-types.md) | Действующее разрешение покупки при отсутствии товара: `Y` — да, `N` — нет ||
|| **subscribe**
[`string`](../../data-types.md) | Действующее разрешение подписки на товар: `Y` — да, `N` — нет ||
|| **vatId**
[`integer`](../../data-types.md) или `null` | Идентификатор ставки НДС ||
|| **vatIncluded**
[`string`](../../data-types.md) | НДС включен в цену: `Y` — да, `N` — нет ||
|| **purchasingPrice**
[`double`](../../data-types.md) или `null` | Закупочная цена ||
|| **purchasingCurrency**
[`string`](../../data-types.md) или `null` | Валюта закупочной цены ||
|| **barcodeMulti**
[`string`](../../data-types.md) | Уникальный штрихкод для каждого экземпляра: `Y` — да, `N` — нет ||
|| **weight**
[`double`](../../data-types.md) | Вес ||
|| **length**
[`double`](../../data-types.md) или `null` | Длина ||
|| **width**
[`double`](../../data-types.md) или `null` | Ширина ||
|| **height**
[`double`](../../data-types.md) или `null` | Высота ||
|| **measure**
[`integer`](../../data-types.md) или `null` | Идентификатор единицы измерения ||
|| **recurSchemeLength**
[`integer`](../../data-types.md) или `null` | Длина периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **recurSchemeType**
[`string`](../../data-types.md) | Единица времени периода оплаты. Используется только в коробочной версии для продажи контента ||
|| **trialPriceId**
[`integer`](../../data-types.md) или `null` | Идентификатор товара для пробной оплаты. Используется только в коробочной версии для продажи контента ||
|| **withoutOrder**
[`string`](../../data-types.md) | Продление без оформления заказа: `Y` — да, `N` — нет. Используется только в коробочной версии для продажи контента ||
|| **quantityTraceRaw**
[`string`](../../data-types.md) | Сохраненное значение режима количественного учета: `Y`, `N` или `D` — значение из настроек модуля ||
|| **paymentType**
[`string`](../../data-types.md) | Тип оплаты. Используется только в коробочной версии для продажи контента ||
|| **subscribeRaw**
[`string`](../../data-types.md) | Сохраненное значение разрешения подписки: `Y`, `N` или `D` — значение из настроек модуля ||
|| **canBuyZeroRaw**
[`string`](../../data-types.md) | Сохраненное значение разрешения покупки при отсутствии товара: `Y`, `N` или `D` — значение из настроек модуля ||
|| **properties**
[`object`](../../data-types.md) | Значения свойств товара. Ключ — `PROPERTY_{id}`, где `id` — идентификатор свойства. Ответ содержит все свойства инфоблока.

Значение ключа:

- `null` — значение не заполнено
- объект `{"VALUE": ..., "VALUE_ID": ...}` — значение одиночного свойства и идентификатор этого значения
- массив таких объектов — значения множественного свойства

Для свойства типа «Файл» в `VALUE` возвращается идентификатор файла ||
|#

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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `iblockId` | Не заполнено обязательное поле "iblockId" | Передайте `iblockId` в `fields` ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля `id`, `type`, `available`, `bundle`, `dateCreate`, `timestampX` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `200040300000` | Iblock Not Found | Передайте идентификатор существующего инфоблока торгового каталога ||
|| `BX_ERROR` | Неверный тип товара | Передайте инфоблок каталога товаров, а не каталога вариаций ||
|| `-` | VAT vatId is not exists | Передайте идентификатор существующей ставки НДС ||
|| `-` | Currency purchasingCurrency is not exists | Передайте код существующей валюты ||
|| `-` | User createdBy is not exists | Передайте идентификатор существующего пользователя ||
|| `-` | User modifiedBy is not exists | Передайте идентификатор существующего пользователя ||
|| `-` | The properties field accepts only the property keys PROPERTY_{id}, unknown keys: #KEYS# | Передайте в `properties` только ключи вида `PROPERTY_{id}` ||
|| `-` | The properties field names one property by several keys: #KEYS# | Укажите каждое свойство одним ключом, например только `PROPERTY_301` ||
|| `dateActiveFrom` | Wrong format of field `dateActiveFrom`. | Сейчас дату нельзя задать методами REST 3.0. Передайте `null` или не передавайте поле ||
|| `dateActiveFrom` | В поле `dateActiveFrom` требуется тип данных `DateTime` для такого запроса | Сейчас дату нельзя задать методами REST 3.0. Передайте `null` или не передавайте поле ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте целое число ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields). Значения свойств передавайте в `properties` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Создание товара» и право на изменение элементов инфоблока. Ошибку вызывает и раздел из `iblockSectionId`, которого нет в инфоблоке ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-update-rest-v3.md)
- [{#T}](./catalog-product-get-rest-v3.md)
- [{#T}](./catalog-product-list-rest-v3.md)
- [{#T}](./catalog-product-delete-rest-v3.md)
- [{#T}](./catalog-product-field-list.md)
