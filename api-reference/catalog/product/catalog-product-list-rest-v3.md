# Получить список товаров по фильтру v 3.0 catalog.product.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.list` возвращает список товаров торгового каталога по фильтру.

{% note info "" %}

Метод возвращает товары любого типа: простые товары, товары с вариациями, вариации, услуги. Чтобы получить товары одного типа, добавьте в фильтр условие по полю `type`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Фильтр списка в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Условие `["iblockId", "=", <идентификатор>]` обязательно. Идентификатор инфоблока можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md).

Фильтровать можно по полям `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `createdBy`, `modifiedBy`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `iblockSectionId`, `type`, `available`, `bundle`, `quantity`, `quantityReserved`, `quantityTrace`, `canBuyZero`, `subscribe`, `vatId`, `vatIncluded`, `purchasingPrice`, `purchasingCurrency`, `barcodeMulti`, `weight`, `length`, `width`, `height`, `measure`. Фильтр по значениям свойств не поддерживается.

Группы с логикой `or` и отрицание не поддерживаются. Условие `in` с пустым списком возвращает пустой список ||
|| **select**
[`array`](../../data-types.md) | Массив полей товара, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор товара
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
- `bundle` — признак комплекта
- `quantity` — количество
- `quantityReserved` — зарезервированное количество
- `quantityTrace` — количественный учет
- `canBuyZero` — покупка при отсутствии
- `subscribe` — подписка на товар
- `vatId` — ставка НДС
- `vatIncluded` — НДС включен в цену
- `purchasingPrice` — закупочная цена
- `purchasingCurrency` — валюта закупочной цены
- `barcodeMulti` — штрихкод для каждого экземпляра
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
- `properties` — значения всех свойств товара

Поле `id` возвращается, только если указано в `select`. Значения отдельных свойств выбрать нельзя: `properties` возвращает все свойства товара. Значение `["*"]` не поддерживается.

По умолчанию: все поля ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"id": "desc"}`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

Сортировать можно по полям `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `type`, `quantity`.

По умолчанию: `{"id": "asc"}` ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание параметра](#pagination) ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество товаров на странице. Значения больше `50` уменьшаются до `50`, значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1` ||
|| **offset**
[`integer`](../../data-types.md) | Количество товаров, которые нужно пропустить. Значение должно быть кратно `limit`, иначе метод вернет ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId","=",25],["iblockSectionId","=",41]],"select":["id","name","active","type"],"order":{"id":"desc"},"pagination":{"limit":2}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["iblockId","=",25],["iblockSectionId","=",41]],"select":["id","name","active","type"],"order":{"id":"desc"},"pagination":{"limit":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductListResult = {
      items: Array<{
        id: number
        name: string
        active: 'Y' | 'N'
        type: number
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductListResult>({
        method: 'catalog.product.list',
        params: {
          filter: [
            ['iblockId', '=', 25],
            ['iblockSectionId', '=', 41],
          ],
          select: ['id', 'name', 'active', 'type'],
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
        console.info('Products:', result.items.length)
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
      async function productList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.list',
            params: {
              filter: [
                ['iblockId', '=', 25],
                ['iblockSectionId', '=', 41],
              ],
              select: ['id', 'name', 'active', 'type'],
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
          console.info('Products:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', productList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.list(
            filter=[
                ["iblockId", "=", 25],
                ["iblockSectionId", "=", 41],
            ],
            select=["id", "name", "active", "type"],
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
                'catalog.product.list',
                [
                    'filter' => [
                        ['iblockId', '=', 25],
                        ['iblockSectionId', '=', 41],
                    ],
                    'select' => ['id', 'name', 'active', 'type'],
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
        'catalog.product.list',
        {
            filter: [
                ['iblockId', '=', 25],
                ['iblockSectionId', '=', 41],
            ],
            select: ['id', 'name', 'active', 'type'],
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
        'catalog.product.list',
        [
            'filter' => [
                ['iblockId', '=', 25],
                ['iblockSectionId', '=', 41],
            ],
            'select' => ['id', 'name', 'active', 'type'],
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
    res, err := client.Core().Call(ctx, "catalog.product.list", b24.Params{
    	"filter":    []any{
    		[]any{"iblockId", "=", 25},
    		[]any{"iblockSectionId", "=", 41},
    	},
    	"select":    []string{"id", "name", "active", "type"},
    	"order":     b24.Params{
    		"id":"desc",
    	},
    	"pagination":b24.Params{
    		"limit":2,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID     int    `json:"id"`
    		Name   string `json:"name"`
    		Active string `json:"active"`
    		Type   int    `json:"type"`
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
                "id": 7549,
                "name": "Футболка базовая белая",
                "active": "Y",
                "type": 1
            },
            {
                "id": 7527,
                "name": "Футболка хлопковая",
                "active": "Y",
                "type": 1
            }
        ]
    },
    "time": {
        "start": 1792660648,
        "finish": 1792660648.515471,
        "duration": 0.5154709815979004,
        "processing": 0,
        "date_start": "2026-10-22T12:17:28+03:00",
        "date_finish": "2026-10-22T12:17:28+03:00",
        "operating_reset_at": 1792661220,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив товаров. Состав полей каждого товара зависит от `select`. [Описание полей](#items) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `200040300000` | Iblock Not Found | Добавьте в `filter` условие `["iblockId", "=", <идентификатор>]` с существующим инфоблоком ||
|| `-` | Filter OR groups are not supported | Уберите из фильтра группы с логикой `or` ||
|| `#FIELD#` | В DTO `ProductDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям из описания параметра `filter` ||
|| `#FIELD#` | В DTO `ProductDto` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по полям из описания параметра `order` ||
|| `-` | pagination.offset must be a non-negative multiple of pagination.limit | Передайте `offset`, кратный `limit`, или используйте `page` ||
|#

#### Ошибка параметра пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `limit` больше нуля ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter`, `order` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Укажите только поля из описания параметра `select`. Ключи `PROPERTY_{id}` не поддерживаются ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на просмотр каталога и на чтение инфоблока ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-get-rest-v3.md)
- [{#T}](./catalog-product-add-rest-v3.md)
- [{#T}](./catalog-product-type-list.md)
- [{#T}](./catalog-product-field-list.md)
