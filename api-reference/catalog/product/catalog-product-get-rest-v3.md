# Получить товар по идентификатору v 3.0 catalog.product.get

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

Метод `catalog.product.get` возвращает поля товара по идентификатору.

{% note info "" %}

Метод возвращает товар любого типа: простой товар, товар с вариациями, вариацию, услугу. Тип товара приходит в поле `type`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор товара.

Идентификатор можно получить методом [catalog.product.list](./catalog-product-list-rest-v3.md) ||
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
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7549,"select":["id","iblockId","name","code","active","iblockSectionId","type","vatId","measure"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7549,"select":["id","iblockId","name","code","active","iblockSectionId","type","vatId","measure"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductGetResult = {
      item: {
        id?: number
        iblockId?: number
        name?: string
        code?: string | null
        active?: 'Y' | 'N'
        iblockSectionId?: number | null
        type?: number
        vatId?: number | null
        measure?: number | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductGetResult>({
        method: 'catalog.product.get',
        params: {
          id: 7549,
          select: ['id', 'iblockId', 'name', 'code', 'active', 'iblockSectionId', 'type', 'vatId', 'measure'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product:', result.item.id, result.item.name)
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
      async function productGet() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.get',
            params: {
              id: 7549,
              select: ['id', 'iblockId', 'name', 'code', 'active', 'iblockSectionId', 'type', 'vatId', 'measure'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Product:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', productGet)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.get(
            bitrix_id=7549,
            select=["id", "iblockId", "name", "code", "active", "iblockSectionId", "type", "vatId", "measure"],
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
                'catalog.product.get',
                [
                    'id' => 7549,
                    'select' => ['id', 'iblockId', 'name', 'code', 'active', 'iblockSectionId', 'type', 'vatId', 'measure'],
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
        'catalog.product.get',
        {
            id: 7549,
            select: ['id', 'iblockId', 'name', 'code', 'active', 'iblockSectionId', 'type', 'vatId', 'measure'],
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
        'catalog.product.get',
        [
            'id' => 7549,
            'select' => ['id', 'iblockId', 'name', 'code', 'active', 'iblockSectionId', 'type', 'vatId', 'measure'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.get", b24.Params{
    	"id":    7549,
    	"select":[]string{"id", "iblockId", "name", "code", "active", "iblockSectionId", "type", "vatId", "measure"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.get: %w", err)
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
            "name": "Футболка базовая белая",
            "code": "tshirt-basic",
            "active": "Y",
            "iblockSectionId": 41,
            "type": 1,
            "vatId": 1,
            "measure": 9
        }
    },
    "time": {
        "start": 1792660647,
        "finish": 1792660647.669521,
        "duration": 0.6695210933685303,
        "processing": 0,
        "date_start": "2026-10-22T12:17:27+03:00",
        "date_finish": "2026-10-22T12:17:27+03:00",
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
|| **result.item**
[`object`](../../data-types.md) | Поля товара. Состав зависит от `select`. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте положительное целое число. Ошибку вызывают также `0` и строка ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [catalog.product.list](./catalog-product-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductDto` | Укажите в `select` только поля из описания параметра `select`. Ключи `PROPERTY_{id}` и `*` не поддерживаются ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на просмотр каталога и на чтение элемента инфоблока ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-list-rest-v3.md)
- [{#T}](./catalog-product-update-rest-v3.md)
- [{#T}](./catalog-product-download-rest-v3.md)
- [{#T}](./catalog-product-field-list.md)
