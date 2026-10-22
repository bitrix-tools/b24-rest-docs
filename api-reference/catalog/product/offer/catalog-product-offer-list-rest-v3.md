# Получить список вариаций товара v 3.0 catalog.product.offer.list

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

Метод `catalog.product.offer.list` возвращает список вариаций каталога по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../../rest-v3.md#filter).

Обязательно передайте условие `["iblockId", "=", 27]` с идентификатором инфоблока каталога вариаций. Идентификатор можно получить методом [catalog.catalog.list](../../catalog/catalog-catalog-list-rest-v3.md): это каталог, у которого `productIblockId` больше `0`.

Фильтровать можно по полям: `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `createdBy`, `modifiedBy`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `iblockSectionId`, `type`, `available`, `bundle`, `quantity`, `quantityReserved`, `quantityTrace`, `canBuyZero`, `subscribe`, `vatId`, `vatIncluded`, `purchasingPrice`, `purchasingCurrency`, `barcodeMulti`, `weight`, `length`, `width`, `height`, `measure`. Фильтр по свойствам не поддерживается.

Поддерживаются операторы `=`, `!=`, `>`, `>=`, `<`, `<=`. Оператор `in` сейчас не применяется: метод возвращает записи без учета этого условия. Оператор `%`, логика `or` и отрицание не поддерживаются.

Для поля `type` доступны операторы `=`, `!=` и `in`. Значение, отличное от `4` или `5`, не сужает выборку.

Если для одного поля передать два условия с одинаковым оператором, учитывается последнее ||
|| **select**
[`array`](../../../data-types.md) | Массив полей вариации, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор
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
- `bundle` — наличие набора
- `quantity` — количество
- `quantityReserved` — зарезервированное количество
- `quantityTrace` — количественный учет
- `canBuyZero` — покупка при отсутствии
- `subscribe` — подписка
- `vatId` — ставка НДС
- `vatIncluded` — НДС включен в цену
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
- `quantityTraceRaw` — сохраненное значение количественного учета
- `paymentType` — тип оплаты
- `subscribeRaw` — сохраненное значение подписки
- `canBuyZeroRaw` — сохраненное значение покупки при отсутствии
- `properties` — значения свойств

Указывайте `id` в `select`: без него метод сейчас возвращает ошибку `INTERNAL_SERVER_ERROR` с HTTP-статусом `500`. Значения `["*"]` и `PROPERTY_{id}` не поддерживаются: значения свойств возвращает поле `properties`.

По умолчанию: все поля, кроме `properties`. Чтобы получить значения свойств, передайте `properties` в `select` ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "desc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по полям: `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `type`, `quantity` ||
|| **pagination**
[`object`](../../../data-types.md) | Постраничная навигация. [Описание объекта](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество записей на странице. Значения больше `50` уменьшаются до `50`. Значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1` ||
|| **offset**
[`integer`](../../../data-types.md) | Смещение от начала списка. Должно быть кратно `limit` ||
|#

{% note warning "" %}

Номер страницы за пределами списка возвращает первую страницу, а не пустой массив. Не завершайте обход по пустой странице: цикл не остановится. Если на странице записей меньше, чем `limit`, страница последняя. Если число записей кратно `limit`, следующая страница повторит первую — сравнивайте идентификаторы.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.offer.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId","=",27],["id",">=",7555]],"select":["id","name","type","properties"],"order":{"id":"asc"},"pagination":{"limit":10}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId","=",27],["id",">=",7555]],"select":["id","name","type","properties"],"order":{"id":"asc"},"pagination":{"limit":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.offer.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OfferListResult = {
      items: Array<{
        id: number
        name: string
        type: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<OfferListResult>({
        method: 'catalog.product.offer.list',
        params: {
          filter: [
            ['iblockId', '=', 27],
            ['id', '>=', 7555],
          ],
          select: ['id', 'name', 'type', 'properties'],
          order: {
            id: 'asc',
          },
          pagination: {
            limit: 10,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Items:', result.items.length)
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
      async function listOffers() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.offer.list',
            params: {
              filter: [
                ['iblockId', '=', 27],
                ['id', '>=', 7555],
              ],
              select: ['id', 'name', 'type', 'properties'],
              order: {
                id: 'asc',
              },
              pagination: {
                limit: 10,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Items:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listOffers)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.list(
            filter=[
                ["iblockId", "=", 27],
                ["id", ">=", 7555],
            ],
            select=["id", "name", "type", "properties"],
            order={
                "id": "asc",
            },
            pagination={
                "limit": 10,
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
                'catalog.product.offer.list',
                [
                    'filter' => [
                        ['iblockId', '=', 27],
                        ['id', '>=', 7555],
                    ],
                    'select' => ['id', 'name', 'type', 'properties'],
                    'order' => [
                        'id' => 'asc',
                    ],
                    'pagination' => [
                        'limit' => 10,
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
        'catalog.product.offer.list',
        {
            filter: [
                ['iblockId', '=', 27],
                ['id', '>=', 7555],
            ],
            select: ['id', 'name', 'type', 'properties'],
            order: {
                id: 'asc',
            },
            pagination: {
                limit: 10,
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
        'catalog.product.offer.list',
        [
            'filter' => [
                ['iblockId', '=', 27],
                ['id', '>=', 7555],
            ],
            'select' => ['id', 'name', 'type', 'properties'],
            'order' => [
                'id' => 'asc',
            ],
            'pagination' => [
                'limit' => 10,
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
    res, err := client.Core().Call(ctx, "catalog.product.offer.list", b24.Params{
    	"filter": []any{
    		[]any{"iblockId", "=", 27},
    		[]any{"id", ">=", 7555},
    	},
    	"select": []string{"id", "name", "type", "properties"},
    	"order": b24.Params{
    		"id": "asc",
    	},
    	"pagination": b24.Params{
    		"limit": 10,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID   int    `json:"id"`
    		Name string `json:"name"`
    		Type int    `json:"type"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name, item.Type)
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
                "id": 7555,
                "name": "DOCS-V3-OFFER Футболка синяя L",
                "type": 4,
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
            },
            {
                "id": 7557,
                "name": "DOCS-V3-OFFER Футболка белая L",
                "type": 4,
                "properties": {
                    "PROPERTY_101": {
                        "VALUE": "7553",
                        "VALUE_ID": "4021"
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
        ]
    },
    "time": {
        "start": 1792660769,
        "finish": 1792660769.747507,
        "duration": 0.7475070953369141,
        "processing": 0,
        "date_start": "2026-10-22T12:19:29+03:00",
        "date_finish": "2026-10-22T12:19:29+03:00",
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
[`array`](../../../data-types.md) | Массив вариаций. Состав полей зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

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

Общее количество записей в ответе не возвращается.

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
|| `200040300000` | Iblock Not Found | Передайте в `filter` условие `iblockId` с идентификатором существующего каталога ||
|| `-` | productType is not allowed for this catalog | Передайте в `iblockId` инфоблок каталога вариаций ||
|| `-` | The type field supports only the =, != and in filter operators | Используйте для `type` операторы `=`, `!=` или `in` ||
|| `#FIELD#` | В DTO `ProductDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям из описания параметра `filter` ||
|| `#FIELD#` | В DTO `ProductDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям из описания параметра `order` ||
|| `-` | pagination.offset must be a non-negative multiple of pagination.limit | Передайте `offset`, кратный `limit`, или используйте `page` ||
|#

#### Ошибка оператора фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы `=`, `!=`, `>`, `>=`, `<`, `<=` ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше `0` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Укажите только поля из описания параметров. Ключи `PROPERTY_{id}` не поддерживаются ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и на инфоблок ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add-rest-v3.md)
- [{#T}](./catalog-product-offer-update-rest-v3.md)
- [{#T}](./catalog-product-offer-get-rest-v3.md)
- [{#T}](./catalog-product-offer-delete-rest-v3.md)
- [{#T}](./catalog-product-offer-download-rest-v3.md)
- [{#T}](./catalog-product-offer-field-list.md)
- [{#T}](./catalog-product-offer-field-get.md)
