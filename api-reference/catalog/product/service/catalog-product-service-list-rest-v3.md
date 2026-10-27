# Получить список услуг v 3.0 catalog.product.service.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.product.service.list` возвращает список услуг торгового каталога по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../../rest-v3.md#filter).

Условие `["iblockId", "=", <идентификатор каталога>]` обязательно. Идентификатор можно получить методом [catalog.catalog.list](../../catalog/catalog-catalog-list-rest-v3.md).

Фильтровать можно по полям `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `createdBy`, `modifiedBy`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `iblockSectionId`, `type`, `available`, `bundle`, `quantity`, `quantityReserved`, `quantityTrace`, `canBuyZero`, `subscribe`, `vatId`, `vatIncluded`, `purchasingPrice`, `purchasingCurrency`, `barcodeMulti`, `weight`, `length`, `width`, `height`, `measure`. Значения свойств в фильтре не поддерживаются.

Для поля `type` поддерживаются операторы `=`, `!=` и `in`. Условие `=` с типом, отличным от `7`, метод пропускает. Группы с логикой `or` и отрицание не поддерживаются. Условие `in` с пустым списком возвращает пустой список ||
|| **select**
[`array`](../../../data-types.md) | Массив полей услуги, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор услуги
- `iblockId` — идентификатор инфоблока
- `name` — название
- `code` — символьный код
- `xmlId` — внешний код
- `active` — активность
- `sort` — сортировка
- `createdBy` — кто создал
- `modifiedBy` — кто изменил
- `dateCreate` — дата создания
- `timestampX` — дата изменения
- `dateActiveFrom` — начало активности
- `dateActiveTo` — окончание активности
- `previewText` — описание для анонса
- `previewTextType` — тип описания для анонса
- `previewPicture` — картинка для анонса
- `detailText` — детальное описание
- `detailTextType` — тип детального описания
- `detailPicture` — детальная картинка
- `iblockSectionId` — основной раздел
- `iblockSection` — все разделы
- `type` — тип товара
- `available` — доступность для покупки
- `bundle` — признак набора
- `quantity` — количество
- `quantityReserved` — зарезервированное количество
- `quantityTrace` — количественный учет
- `canBuyZero` — покупка при отсутствии
- `subscribe` — подписка
- `vatId` — ставка НДС
- `vatIncluded` — НДС в цене
- `purchasingPrice` — закупочная цена
- `purchasingCurrency` — валюта закупочной цены
- `barcodeMulti` — уникальные штрихкоды
- `weight` — вес
- `length` — длина
- `width` — ширина
- `height` — высота
- `measure` — единица измерения
- `recurSchemeLength` — длина периода оплаты
- `recurSchemeType` — единица периода оплаты
- `trialPriceId` — товар для пробной оплаты
- `withoutOrder` — продление без заказа
- `quantityTraceRaw` — сохраненный режим учета
- `paymentType` — тип оплаты
- `subscribeRaw` — сохраненное разрешение подписки
- `canBuyZeroRaw` — сохраненное разрешение покупки при отсутствии
- `properties` — значения свойств

Значения свойств возвращаются только целиком полем `properties`, отдельные ключи `PROPERTY_{id}` в `select` не передаются. Значение `["*"]` не поддерживается. Поле `id` возвращается, только если указано в `select`.

По умолчанию: все поля ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "desc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по полям `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `type`, `quantity` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация. [Описание параметра](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество услуг на странице. Значения больше `50` уменьшаются до `50`. Значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1` ||
|| **offset**
[`integer`](../../../data-types.md) | Сколько записей пропустить. Значение должно быть кратно `limit` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.service.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId","=",25],["active","=","Y"]],"select":["id","name","xmlId","vatId","measure"],"order":{"id":"desc"},"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId","=",25],["active","=","Y"]],"select":["id","name","xmlId","vatId","measure"],"order":{"id":"desc"},"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.service.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ServiceListResult = {
      items: Array<{
        id: number
        name: string
        xmlId: string | null
        vatId: number | null
        measure: number | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ServiceListResult>({
        method: 'catalog.product.service.list',
        params: {
          filter: [
            ['iblockId', '=', 25],
            ['active', '=', 'Y'],
          ],
          select: ['id', 'name', 'xmlId', 'vatId', 'measure'],
          order: {
            id: 'desc',
          },
          pagination: {
            limit: 2,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Services:', result.items.length)
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
      async function listServices() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.service.list',
            params: {
              filter: [
                ['iblockId', '=', 25],
                ['active', '=', 'Y'],
              ],
              select: ['id', 'name', 'xmlId', 'vatId', 'measure'],
              order: {
                id: 'desc',
              },
              pagination: {
                limit: 2,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Services:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listServices)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.list(
            filter=[
                ["iblockId", "=", 25],
                ["active", "=", "Y"],
            ],
            select=["id", "name", "xmlId", "vatId", "measure"],
            order={
                "id": "desc",
            },
            pagination={
                "limit": 2,
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
                'catalog.product.service.list',
                [
                    'filter' => [
                        ['iblockId', '=', 25],
                        ['active', '=', 'Y'],
                    ],
                    'select' => ['id', 'name', 'xmlId', 'vatId', 'measure'],
                    'order' => [
                        'id' => 'desc',
                    ],
                    'pagination' => [
                        'limit' => 2,
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
        'catalog.product.service.list',
        {
            filter: [
                ['iblockId', '=', 25],
                ['active', '=', 'Y'],
            ],
            select: ['id', 'name', 'xmlId', 'vatId', 'measure'],
            order: {
                id: 'desc',
            },
            pagination: {
                limit: 2,
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
        'catalog.product.service.list',
        [
            'filter' => [
                ['iblockId', '=', 25],
                ['active', '=', 'Y'],
            ],
            'select' => ['id', 'name', 'xmlId', 'vatId', 'measure'],
            'order' => [
                'id' => 'desc',
            ],
            'pagination' => [
                'limit' => 2,
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
    res, err := client.Core().Call(ctx, "catalog.product.service.list", b24.Params{
    	"filter":     []any{
    		[]any{
    			"iblockId",
    			"=",
    			25,
    		},
    		[]string{"active", "=", "Y"},
    	},
    	"select":     []string{"id", "name", "xmlId", "vatId", "measure"},
    	"order":      b24.Params{
    		"id": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.service.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID   int    `json:"id"`
    		Name string `json:"name"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 7551,
                "name": "Монтаж и настройка оборудования",
                "xmlId": "DOCS-V3-SERVICE-1",
                "vatId": 1,
                "measure": 9
            },
            {
                "id": 6975,
                "name": "Услуга",
                "xmlId": "6975",
                "vatId": null,
                "measure": 9
            }
        ]
    },
    "time": {
        "start": 1792660787,
        "finish": 1792660787.672372,
        "duration": 0.6723721027374268,
        "processing": 0,
        "date_start": "2026-10-22T12:19:47+03:00",
        "date_finish": "2026-10-22T12:19:47+03:00",
        "operating_reset_at": 1792661340,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../../data-types.md) | Массив услуг. Поля каждой услуги зависят от `select`. [Описание полей](#item). Общее количество записей метод не возвращает ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Iblock Not Found",
                "field": "200040300000"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `200040300000` | Iblock Not Found | Передайте в `filter` условие `["iblockId", "=", <идентификатор каталога>]` с существующим торговым каталогом ||
|| `-` | productType is not allowed for this catalog | В каталоге вариаций услуг нет. Передайте идентификатор каталога товаров ||
|| `-` | The type field supports only the =, != and in filter operators | Для `type` используйте операторы `=`, `!=` или `in` ||
|| `-` | Filter OR groups are not supported | Уберите из фильтра группы с логикой `or` ||
|| `-` | pagination.offset must be a non-negative multiple of pagination.limit | Передайте `offset`, кратный `limit`, или используйте `page` ||
|| `#FIELD#` | В DTO `ProductDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям из описания параметра `filter` ||
|| `#FIELD#` | В DTO `ProductDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям из описания параметра `order` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из [обзора REST 3.0](../../../rest-v3.md#operators) ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` число больше `0` ||
|#

#### Ошибки в параметрах select, filter и order

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Укажите только поля из описания параметра `select`. Ключи `PROPERTY_{id}` не поддерживаются ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на просмотр каталога и чтение элементов инфоблока ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-get-rest-v3.md)
- [{#T}](./catalog-product-service-add-rest-v3.md)
- [{#T}](./catalog-product-service-field-list.md)
- [{#T}](../../catalog/catalog-catalog-list-rest-v3.md)
