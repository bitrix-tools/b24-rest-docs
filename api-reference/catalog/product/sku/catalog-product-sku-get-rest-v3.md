# Получить значения полей головного товара v 3.0 catalog.product.sku.get

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

Метод `catalog.product.sku.get` возвращает значения полей головного товара по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор головного товара.

Идентификатор можно получить методом [catalog.product.sku.list](./catalog-product-sku-list-rest-v3.md) или из ответа [catalog.product.sku.add](./catalog-product-sku-add-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Массив полей головного товара, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор головного товара
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

Поле `id` возвращается, только если указано в `select`. Значения отдельных свойств выбрать нельзя: `properties` возвращает все свойства. Значение `["*"]` не поддерживается.

По умолчанию: все поля, включая `properties` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.sku.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7553,"select":["id","iblockId","name","code","active","type","iblockSectionId","previewText","detailText","detailPicture","dateCreate"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.sku.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7553,"select":["id","iblockId","name","code","active","type","iblockSectionId","previewText","detailText","detailPicture","dateCreate"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.sku.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SkuGetResult = {
      item: {
        id: number
        name: string
        type: number
        detailPicture: string | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<SkuGetResult>({
        method: 'catalog.product.sku.get',
        params: {
          id: 7553,
          select: ['id', 'iblockId', 'name', 'code', 'active', 'type', 'iblockSectionId', 'previewText', 'detailText', 'detailPicture', 'dateCreate'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Item:', result.item)
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
      async function getSku() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.sku.get',
            params: {
              id: 7553,
              select: ['id', 'iblockId', 'name', 'code', 'active', 'type', 'iblockSectionId', 'previewText', 'detailText', 'detailPicture', 'dateCreate'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Item:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSku)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.sku.get(
            id=7553,
            select=["id", "iblockId", "name", "code", "active", "type", "iblockSectionId", "previewText", "detailText", "detailPicture", "dateCreate"],
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
                'catalog.product.sku.get',
                [
                    'id' => 7553,
                    'select' => ['id', 'iblockId', 'name', 'code', 'active', 'type', 'iblockSectionId', 'previewText', 'detailText', 'detailPicture', 'dateCreate'],
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
        'catalog.product.sku.get',
        {
            id: 7553,
            select: ['id', 'iblockId', 'name', 'code', 'active', 'type', 'iblockSectionId', 'previewText', 'detailText', 'detailPicture', 'dateCreate'],
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
        'catalog.product.sku.get',
        [
            'id' => 7553,
            'select' => ['id', 'iblockId', 'name', 'code', 'active', 'type', 'iblockSectionId', 'previewText', 'detailText', 'detailPicture', 'dateCreate'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.sku.get", b24.Params{
    	"id": 7553,
    	"select": []string{"id", "iblockId", "name", "code", "active", "type", "iblockSectionId", "previewText", "detailText", "detailPicture", "dateCreate"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.sku.get: %w", err)
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
            "active": "Y",
            "dateCreate": "2026-10-22T12:18:48+03:00",
            "previewText": "Футболка из хлопка",
            "detailText": "Состав: 100% хлопок",
            "detailPicture": "39455",
            "iblockSectionId": 31,
            "type": 3
        }
    },
    "time": {
        "start": 1792660764,
        "finish": 1792660764.959464,
        "duration": 0.9594640731811523,
        "processing": 0,
        "date_start": "2026-10-22T12:19:24+03:00",
        "date_finish": "2026-10-22T12:19:24+03:00",
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
|| **result.item**
[`object`](../../../data-types.md) | Поля головного товара. Состав зависит от `select`. [Описание полей](#item) ||
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
        "message": "Запись с ID = `7533` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте в `id` положительное число ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Записи нет или это не головной товар. Вариации получайте методом [catalog.product.offer.get](../offer/catalog-product-offer-get-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Укажите в `select` только поля из описания параметра `select`. Для значений свойств используйте `properties` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и на инфоблок ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-sku-add-rest-v3.md)
- [{#T}](./catalog-product-sku-update-rest-v3.md)
- [{#T}](./catalog-product-sku-list-rest-v3.md)
- [{#T}](./catalog-product-sku-delete-rest-v3.md)
- [{#T}](./catalog-product-sku-download-rest-v3.md)
- [{#T}](./catalog-product-sku-field-list.md)
- [{#T}](./catalog-product-sku-field-get.md)
