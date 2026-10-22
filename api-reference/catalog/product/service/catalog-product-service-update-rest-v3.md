# Обновить поля услуги v 3.0 catalog.product.service.update

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

Метод `catalog.product.service.update` изменяет поля услуги и возвращает ее поля после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор услуги.

Идентификатор можно получить методом [catalog.product.service.list](./catalog-product-service-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями услуги, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` возвращает услугу без изменений ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название услуги ||
|| **code**
[`string`](../../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код ||
|| **active**
[`string`](../../../data-types.md) | Активность услуги.

Возможные значения:

- `Y` — да
- `N` — нет

Любое значение, кроме `Y`, сохраняется как `N` ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал услугу.

Идентификатор можно получить методом [user.get](../../../user/user-get.md) ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил услугу.

Идентификатор можно получить методом [user.get](../../../user/user-get.md) ||
|| **dateActiveFrom**
[`datetime`](../../../data-types.md) | Дата начала активности в формате ISO 8601, например `2026-11-01T10:00:00+03:00` ||
|| **dateActiveTo**
[`datetime`](../../../data-types.md) | Дата окончания активности в формате ISO 8601 ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса.

Возможные значения:

- `text` — текст
- `html` — HTML ||
|| **previewPicture**
[`object`](../../../data-types.md) | Картинка для анонса. Объект в формате `{"fileData": ["имя_файла.png", "содержимое в base64"]}`.

Сейчас метод принимает такой объект без ошибки, но файл не сохраняет: в ответе поле остается `null`. Загрузить картинку можно методом прежней версии [catalog.product.service.update](./catalog-product-service-update.md) ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания.

Возможные значения:

- `text` — текст
- `html` — HTML ||
|| **detailPicture**
[`object`](../../../data-types.md) | Детальная картинка. Объект в формате `{"fileData": ["имя_файла.png", "содержимое в base64"]}`.

Сейчас метод принимает такой объект без ошибки, но файл не сохраняет: в ответе поле остается `null`. Загрузить картинку можно методом прежней версии [catalog.product.service.update](./catalog-product-service-update.md) ||
|| **iblockSectionId**
[`integer`](../../../data-types.md) | Идентификатор основного раздела каталога.

Идентификатор можно получить методом [catalog.section.list](../../section/catalog-section-list-rest-v3.md).

Для несуществующего раздела метод возвращает ошибку доступа ||
|| **iblockSection**
[`array`](../../../data-types.md) | Массив идентификаторов разделов, к которым нужно привязать услугу, например `[31, 45]`. Если `iblockSectionId` не передан, основным становится первый раздел из массива.

Пустой массив вместе с `iblockSectionId: 0` отвязывает услугу от всех разделов ||
|| **quantity**
[`double`](../../../data-types.md) | Количество ||
|| **quantityReserved**
[`double`](../../../data-types.md) | Зарезервированное количество ||
|| **quantityTrace**
[`string`](../../../data-types.md) | Режим количественного учета.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — по настройкам каталога ||
|| **canBuyZero**
[`string`](../../../data-types.md) | Разрешение покупки при отсутствии товара.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — по настройкам каталога ||
|| **subscribe**
[`string`](../../../data-types.md) | Разрешение подписки на товар.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — по настройкам каталога ||
|| **vatId**
[`integer`](../../../data-types.md) | Идентификатор ставки НДС.

Идентификатор можно получить методом [catalog.vat.list](../../vat/catalog-vat-list-rest-v3.md).

Существование ставки при изменении не проверяется: несуществующий идентификатор сохранится без ошибки ||
|| **vatIncluded**
[`string`](../../../data-types.md) | Включен ли НДС в цену.

Возможные значения:

- `Y` — да
- `N` — нет ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена ||
|| **purchasingCurrency**
[`string`](../../../data-types.md) | Код валюты закупочной цены, например `RUB`.

Коды валют можно получить методом [crm.currency.list](../../../crm/currency/crm-currency-list.md).

Несуществующий код валюты при изменении не сохраняется, ошибки при этом нет ||
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
[`integer`](../../../data-types.md) | Идентификатор единицы измерения.

Идентификатор можно получить методом [catalog.measure.list](../../measure/catalog-measure-list-rest-v3.md) ||
|| **recurSchemeLength**
[`integer`](../../../data-types.md) | Длина периода оплаты. Используется для продажи контента в коробочной версии ||
|| **recurSchemeType**
[`string`](../../../data-types.md) | Единица времени периода оплаты.

Возможные значения:

- `H` — час
- `D` — день
- `W` — неделя
- `M` — месяц
- `Q` — квартал
- `S` — полугодие
- `Y` — год
- `T` — два года

Используется для продажи контента в коробочной версии ||
|| **trialPriceId**
[`integer`](../../../data-types.md) | Идентификатор товара для пробной оплаты. Используется для продажи контента в коробочной версии ||
|| **withoutOrder**
[`string`](../../../data-types.md) | Продление без оформления заказа.

Возможные значения:

- `Y` — да
- `N` — нет

Используется для продажи контента в коробочной версии ||
|| **quantityTraceRaw**
[`string`](../../../data-types.md) | Сохраненное значение режима количественного учета.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — по настройкам каталога ||
|| **paymentType**
[`string`](../../../data-types.md) | Тип оплаты.

Возможные значения:

- `S` — разовая
- `R` — регулярная
- `T` — пробная

Используется для продажи контента в коробочной версии ||
|| **subscribeRaw**
[`string`](../../../data-types.md) | Сохраненное значение разрешения подписки.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — по настройкам каталога ||
|| **canBuyZeroRaw**
[`string`](../../../data-types.md) | Сохраненное значение разрешения покупки при отсутствии товара.

Возможные значения:

- `Y` — да
- `N` — нет
- `D` — по настройкам каталога ||
|| **properties**
[`object`](../../../data-types.md) | Значения свойств услуги. Ключи — `PROPERTY_{id}`, где `{id}` — идентификатор свойства.

Значение одиночного свойства передавайте объектом `{"VALUE": "..."}`, например `{"PROPERTY_301": {"VALUE": "SRV-002"}}`: строку без объекта метод пропускает без ошибки. Для множественного свойства передайте массив значений, например `["лен", "хлопок"]`, — он заменит прежние значения.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../../product-property/catalog-product-property-list.md) ||
|#

Поле `iblockId` изменить нельзя. Поля `id`, `dateCreate`, `timestampX`, `type`, `available` и `bundle` только для чтения, их передача вызывает ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.service.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7551,"fields":{"name":"Монтаж и настройка оборудования","sort":200,"properties":{"PROPERTY_301":{"VALUE":"SRV-002"}}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7551,"fields":{"name":"Монтаж и настройка оборудования","sort":200,"properties":{"PROPERTY_301":{"VALUE":"SRV-002"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.service.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ServiceUpdateResult = {
      item: {
        id: number
        iblockId: number
        name: string
        xmlId: string | null
        active: 'Y' | 'N'
        sort: number
        type: number
        iblockSectionId: number | null
        vatId: number | null
        vatIncluded: 'Y' | 'N'
        measure: number | null
        previewText: string | null
        detailPicture: string | null
        timestampX: ISODate
        properties: Record<string, { VALUE: string, VALUE_ID: string } | Array<{ VALUE: string, VALUE_ID: string }> | null>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ServiceUpdateResult>({
        method: 'catalog.product.service.update',
        params: {
          id: 7551,
          fields: {
            name: 'Монтаж и настройка оборудования',
            sort: 200,
            properties: {
              PROPERTY_301: {
                VALUE: 'SRV-002',
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Service updated:', result.item.id, result.item.name)
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
      async function updateService() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.service.update',
            params: {
              id: 7551,
              fields: {
                name: 'Монтаж и настройка оборудования',
                sort: 200,
                properties: {
                  PROPERTY_301: {
                    VALUE: 'SRV-002',
                  },
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
          console.info('Service updated:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateService)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.update(
            bitrix_id=7551,
            fields={
                "name": "Монтаж и настройка оборудования",
                "sort": 200,
                "properties": {
                    "PROPERTY_301": {
                        "VALUE": "SRV-002",
                    },
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
                'catalog.product.service.update',
                [
                    'id' => 7551,
                    'fields' => [
                        'name' => 'Монтаж и настройка оборудования',
                        'sort' => 200,
                        'properties' => [
                            'PROPERTY_301' => [
                                'VALUE' => 'SRV-002',
                            ],
                        ],
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
        'catalog.product.service.update',
        {
            id: 7551,
            fields: {
                name: 'Монтаж и настройка оборудования',
                sort: 200,
                properties: {
                    PROPERTY_301: {
                        VALUE: 'SRV-002',
                    },
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
        'catalog.product.service.update',
        [
            'id' => 7551,
            'fields' => [
                'name' => 'Монтаж и настройка оборудования',
                'sort' => 200,
                'properties' => [
                    'PROPERTY_301' => [
                        'VALUE' => 'SRV-002',
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
    res, err := client.Core().Call(ctx, "catalog.product.service.update", b24.Params{
    	"id":     7551,
    	"fields": b24.Params{
    		"name":       "Монтаж и настройка оборудования",
    		"sort":       200,
    		"properties": b24.Params{
    			"PROPERTY_301": b24.Params{
    				"VALUE": "SRV-002",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.service.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID      int    `json:"id"`
    	Name    string `json:"name"`
    	Type    int    `json:"type"`
    	Measure int    `json:"measure"`
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
            "id": 7551,
            "iblockId": 25,
            "name": "Монтаж и настройка оборудования",
            "code": null,
            "xmlId": "DOCS-V3-SERVICE-1",
            "active": "Y",
            "sort": 200,
            "createdBy": 1,
            "modifiedBy": 1,
            "dateCreate": "2026-10-22T12:18:35+03:00",
            "timestampX": "2026-10-22T12:19:35+03:00",
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "previewText": "Установка и подключение оборудования",
            "previewTextType": "text",
            "previewPicture": null,
            "detailText": null,
            "detailTextType": "text",
            "detailPicture": "39453",
            "iblockSectionId": 45,
            "iblockSection": [
                45
            ],
            "type": 7,
            "available": "N",
            "bundle": "N",
            "quantity": 0,
            "quantityReserved": 0,
            "quantityTrace": "N",
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
                "PROPERTY_301": {
                    "VALUE": "SRV-002",
                    "VALUE_ID": "4033"
                },
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
        "start": 1792660775,
        "finish": 1792660775.091972,
        "duration": 0.09197211265563965,
        "processing": 0,
        "date_start": "2026-10-22T12:19:35+03:00",
        "date_finish": "2026-10-22T12:19:35+03:00",
        "operating_reset_at": 1792660980,
        "operating": 1.2356388568878174
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
[`object`](../../../data-types.md) | Поля услуги после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор услуги ||
|| **iblockId**
[`integer`](../../../data-types.md) | Идентификатор инфоблока торгового каталога ||
|| **name**
[`string`](../../../data-types.md) | Название услуги ||
|| **code**
[`string`](../../../data-types.md) | Символьный код ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код. Если код не передан при создании, он равен идентификатору услуги ||
|| **active**
[`string`](../../../data-types.md) | Активность услуги: `Y` — активна, `N` — неактивна ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал услугу ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил услугу ||
|| **dateCreate**
[`datetime`](../../../data-types.md) | Дата и время создания ||
|| **timestampX**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения ||
|| **dateActiveFrom**
[`datetime`](../../../data-types.md) | Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../../../data-types.md) | Дата окончания активности ||
|| **previewText**
[`string`](../../../data-types.md) | Описание для анонса ||
|| **previewTextType**
[`string`](../../../data-types.md) | Тип описания для анонса: `text` или `html` ||
|| **previewPicture**
[`string`](../../../data-types.md) | Идентификатор файла картинки для анонса строкой. `null`, если картинки нет ||
|| **detailText**
[`string`](../../../data-types.md) | Детальное описание ||
|| **detailTextType**
[`string`](../../../data-types.md) | Тип детального описания: `text` или `html` ||
|| **detailPicture**
[`string`](../../../data-types.md) | Идентификатор файла детальной картинки строкой. `null`, если картинки нет. Файл можно получить методом [catalog.product.service.download](./catalog-product-service-download-rest-v3.md) ||
|| **iblockSectionId**
[`integer`](../../../data-types.md) | Идентификатор основного раздела. `null`, если услуга не привязана к разделу ||
|| **iblockSection**
[`array`](../../../data-types.md) | Массив идентификаторов всех разделов, к которым привязана услуга ||
|| **type**
[`integer`](../../../data-types.md) | Тип товара. Для услуги всегда `7` ||
|| **available**
[`string`](../../../data-types.md) | Доступность для покупки: `Y` — да, `N` — нет ||
|| **bundle**
[`string`](../../../data-types.md) | Признак набора: `Y` — да, `N` — нет ||
|| **quantity**
[`double`](../../../data-types.md) | Количество ||
|| **quantityReserved**
[`double`](../../../data-types.md) | Зарезервированное количество ||
|| **quantityTrace**
[`string`](../../../data-types.md) | Действующий режим количественного учета с учетом настроек каталога: `Y` — включен, `N` — выключен ||
|| **canBuyZero**
[`string`](../../../data-types.md) | Действующее разрешение покупки при отсутствии товара с учетом настроек каталога: `Y` — да, `N` — нет ||
|| **subscribe**
[`string`](../../../data-types.md) | Действующее разрешение подписки с учетом настроек каталога: `Y` — да, `N` — нет ||
|| **vatId**
[`integer`](../../../data-types.md) | Идентификатор ставки НДС. `null`, если ставка не задана ||
|| **vatIncluded**
[`string`](../../../data-types.md) | НДС включен в цену: `Y` — да, `N` — нет ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена. `null`, если не задана ||
|| **purchasingCurrency**
[`string`](../../../data-types.md) | Валюта закупочной цены. `null`, если не задана ||
|| **barcodeMulti**
[`string`](../../../data-types.md) | Уникальные штрихкоды для каждого экземпляра: `Y` — да, `N` — нет ||
|| **weight**
[`double`](../../../data-types.md) | Вес ||
|| **length**
[`double`](../../../data-types.md) | Длина. `null`, если не задана ||
|| **width**
[`double`](../../../data-types.md) | Ширина. `null`, если не задана ||
|| **height**
[`double`](../../../data-types.md) | Высота. `null`, если не задана ||
|| **measure**
[`integer`](../../../data-types.md) | Идентификатор единицы измерения ||
|| **recurSchemeLength**
[`integer`](../../../data-types.md) | Длина периода оплаты. Используется для продажи контента в коробочной версии ||
|| **recurSchemeType**
[`string`](../../../data-types.md) | Единица времени периода оплаты, например `D` — день. Используется для продажи контента в коробочной версии ||
|| **trialPriceId**
[`integer`](../../../data-types.md) | Идентификатор товара для пробной оплаты. Используется для продажи контента в коробочной версии ||
|| **withoutOrder**
[`string`](../../../data-types.md) | Продление без оформления заказа: `Y` — да, `N` — нет ||
|| **quantityTraceRaw**
[`string`](../../../data-types.md) | Сохраненное значение режима количественного учета: `Y`, `N` или `D` — по настройкам каталога ||
|| **paymentType**
[`string`](../../../data-types.md) | Тип оплаты: `S` — разовая, `R` — регулярная, `T` — пробная ||
|| **subscribeRaw**
[`string`](../../../data-types.md) | Сохраненное значение разрешения подписки: `Y`, `N` или `D` — по настройкам каталога ||
|| **canBuyZeroRaw**
[`string`](../../../data-types.md) | Сохраненное значение разрешения покупки при отсутствии товара: `Y`, `N` или `D` — по настройкам каталога ||
|| **properties**
[`object`](../../../data-types.md) | Значения свойств услуги. Ключи — `PROPERTY_{id}`, где `{id}` — идентификатор свойства. Значение свойства — объект `{"VALUE": "...", "VALUE_ID": "..."}`, для множественного свойства — массив таких объектов. `null`, если значение не задано ||
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
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` услуги. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Product - `#ID#` is not exists in catalog - `#IBLOCK_ID#` | Уберите `iblockId` из `fields`: перенести услугу в другой каталог нельзя ||
|| `-` | Не введено название.`<br>` | Передайте непустое значение в `name` ||
|| `-` | User createdBy is not exists | Передайте в `createdBy` идентификатор существующего пользователя ||
|| `-` | User modifiedBy is not exists | Передайте в `modifiedBy` идентификатор существующего пользователя ||
|| `-` | The properties field accepts only the property keys PROPERTY_{id}, unknown keys: `#KEYS#` | Передайте ключи свойств в формате `PROPERTY_{id}`, например `PROPERTY_301` ||
|| `-` | The properties field names one property by several keys: `#KEYS#` | Передайте каждое свойство одним ключом ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Передайте значение нужного типа ||
|| `-` | Internal error updating product. Try updating again. | Повторите запрос ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `dateCreate`, `timestampX`, `type`, `available`, `bundle` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` услуги ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Услуги с таким идентификатором нет. Ошибка приходит и для идентификатора товара другого типа. Проверьте идентификатор методом [catalog.product.service.list](./catalog-product-service-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Передайте в `fields` только поля из таблицы [Параметр fields](#fields) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя. Ошибка также приходит, если раздел из `iblockSectionId` не существует: проверьте идентификатор методом [catalog.section.list](../../section/catalog-section-list-rest-v3.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-add-rest-v3.md)
- [{#T}](./catalog-product-service-get-rest-v3.md)
- [{#T}](./catalog-product-service-list-rest-v3.md)
- [{#T}](./catalog-product-service-delete-rest-v3.md)
- [{#T}](./catalog-product-service-field-list.md)
