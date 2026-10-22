# Получить значения полей услуги v 3.0 catalog.product.service.get

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

Метод `catalog.product.service.get` возвращает поля услуги по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор услуги.

Идентификатор можно получить методом [catalog.product.service.list](./catalog-product-service-list-rest-v3.md) ||
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
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.service.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7551,"select":["id","name","xmlId","active","type","iblockSectionId","vatId","vatIncluded","measure","detailPicture"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7551,"select":["id","name","xmlId","active","type","iblockSectionId","vatId","vatIncluded","measure","detailPicture"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.service.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ServiceGetResult = {
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
      const response = await $b24.actions.v3.call.make<ServiceGetResult>({
        method: 'catalog.product.service.get',
        params: {
          id: 7551,
          select: [
            'id',
            'name',
            'xmlId',
            'active',
            'type',
            'iblockSectionId',
            'vatId',
            'vatIncluded',
            'measure',
            'detailPicture',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Service:', result.item.id, result.item.name)
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
      async function getService() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.service.get',
            params: {
              id: 7551,
              select: [
                'id',
                'name',
                'xmlId',
                'active',
                'type',
                'iblockSectionId',
                'vatId',
                'vatIncluded',
                'measure',
                'detailPicture',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Service:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getService)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.get(
            bitrix_id=7551,
            select=[
                "id",
                "name",
                "xmlId",
                "active",
                "type",
                "iblockSectionId",
                "vatId",
                "vatIncluded",
                "measure",
                "detailPicture",
            ],
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
                'catalog.product.service.get',
                [
                    'id' => 7551,
                    'select' => [
                        'id',
                        'name',
                        'xmlId',
                        'active',
                        'type',
                        'iblockSectionId',
                        'vatId',
                        'vatIncluded',
                        'measure',
                        'detailPicture',
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
        'catalog.product.service.get',
        {
            id: 7551,
            select: [
                'id',
                'name',
                'xmlId',
                'active',
                'type',
                'iblockSectionId',
                'vatId',
                'vatIncluded',
                'measure',
                'detailPicture',
            ],
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
        'catalog.product.service.get',
        [
            'id' => 7551,
            'select' => [
                'id',
                'name',
                'xmlId',
                'active',
                'type',
                'iblockSectionId',
                'vatId',
                'vatIncluded',
                'measure',
                'detailPicture',
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
    res, err := client.Core().Call(ctx, "catalog.product.service.get", b24.Params{
    	"id":     7551,
    	"select": []string{"id", "name", "xmlId", "active", "type", "iblockSectionId", "vatId", "vatIncluded", "measure", "detailPicture"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.service.get: %w", err)
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
            "name": "Монтаж и настройка оборудования",
            "xmlId": "DOCS-V3-SERVICE-1",
            "active": "Y",
            "detailPicture": "39453",
            "iblockSectionId": 45,
            "type": 7,
            "vatId": 1,
            "vatIncluded": "Y",
            "measure": 9
        }
    },
    "time": {
        "start": 1792660775,
        "finish": 1792660775.911054,
        "duration": 0.9110538959503174,
        "processing": 0,
        "date_start": "2026-10-22T12:19:35+03:00",
        "date_finish": "2026-10-22T12:19:35+03:00",
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
[`object`](../../../data-types.md) | Поля услуги. Состав зависит от `select`. [Описание полей](#item) ||
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
|| `id` | Обязательное поле `id` не указано | Передайте в `id` положительное число ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Услуги с таким идентификатором нет. Ошибка приходит и для идентификатора товара другого типа. Проверьте идентификатор методом [catalog.product.service.list](./catalog-product-service-list-rest-v3.md) ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Передайте в `select` только поля из описания параметра `select` ||
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

- [{#T}](./catalog-product-service-list-rest-v3.md)
- [{#T}](./catalog-product-service-update-rest-v3.md)
- [{#T}](./catalog-product-service-download-rest-v3.md)
- [{#T}](./catalog-product-service-field-list.md)
