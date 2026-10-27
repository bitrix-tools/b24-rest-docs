# Получить поле товара catalog.product.field.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.field.get` возвращает описание поля товара по имени.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Имя поля, описание которого нужно получить.

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

Ключи свойств `PROPERTY_{id}` не поддерживаются: метод вернет ошибку «Поле не найдено» ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть для каждого поля.

Доступные поля:

- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — группы обязательности
- `filterable` — признак доступности в фильтре
- `sortable` — признак доступности в сортировке
- `editable` — признак редактируемости
- `editableGroups` — группы операций, в которых поле редактируется
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей

Значение `["*"]` не поддерживается.

По умолчанию: все свойства описания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.field.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"properties"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"properties","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.field.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldGetResult = {
      item: {
        name?: string
        type?: string
        title?: string
        editableGroups?: string[] | null
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FieldGetResult>({
        method: 'catalog.product.field.get',
        params: {
          name: 'properties',
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field:', result.item)
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
      async function fieldGet() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.field.get',
            params: {
              name: 'properties',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Field:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fieldGet)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.field.get(
            name="properties",
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
                'catalog.product.field.get',
                [
                    'name' => 'properties',
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
        'catalog.product.field.get',
        {
            name: 'properties',
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
        'catalog.product.field.get',
        [
            'name' => 'properties',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.field.get", b24.Params{
    	"name":"properties",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.field.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	Name string `json:"name"`
    	Type string `json:"type"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Name, item.Type)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "name": "properties",
            "type": "array",
            "title": "properties",
            "description": null,
            "validationRules": [],
            "requiredGroups": null,
            "filterable": false,
            "sortable": false,
            "editable": true,
            "editableGroups": [
                "add",
                "update"
            ],
            "multiple": false,
            "elementType": null
        }
    },
    "time": {
        "start": 1792661048,
        "finish": 1792661048.738532,
        "duration": 0.7385320663452148,
        "processing": 0,
        "date_start": "2026-10-22T12:24:08+03:00",
        "date_finish": "2026-10-22T12:24:08+03:00",
        "operating_reset_at": 1792661640,
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
[`object`](../../data-types.md) | Описание поля. [Свойства объекта](#item) зависят от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Состав описания зависит от `select`. Таблица содержит все свойства, которые можно запросить.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля: `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `createdBy`, `modifiedBy`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `previewText`, `previewTextType`, `previewPicture`, `detailText`, `detailTextType`, `detailPicture`, `iblockSectionId`, `iblockSection`, `type`, `available`, `bundle`, `quantity`, `quantityReserved`, `quantityTrace`, `canBuyZero`, `subscribe`, `vatId`, `vatIncluded`, `purchasingPrice`, `purchasingCurrency`, `barcodeMulti`, `weight`, `length`, `width`, `height`, `measure`, `recurSchemeLength`, `recurSchemeType`, `trialPriceId`, `withoutOrder`, `quantityTraceRaw`, `paymentType`, `subscribeRaw`, `canBuyZeroRaw`, `properties` ||
|| **type**
[`string`](../../data-types.md) | Тип в метаданных: `int`, `string`, `float`, `object`, `array`. Для полей даты и файлов возвращается `object`, хотя в ответах методов даты передаются строками ISO 8601, а файлы — строкой с идентификатором ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) или `null` | Описание поля. Для полей этого объекта — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Правила валидации. Для полей этого объекта — `[]` ||
|| **requiredGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле обязательно. Для `iblockId` и `name` — `["add"]`; для остальных полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно для фильтрации в [catalog.product.list](./catalog-product-list-rest-v3.md), `false` — недоступно. `true` у полей `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `createdBy`, `modifiedBy`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `iblockSectionId`, `type`, `available`, `bundle`, `quantity`, `quantityReserved`, `quantityTrace`, `canBuyZero`, `subscribe`, `vatId`, `vatIncluded`, `purchasingPrice`, `purchasingCurrency`, `barcodeMulti`, `weight`, `length`, `width`, `height`, `measure` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно. `true` у полей `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `type`, `quantity` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups`, `false` — нельзя. Признак не заменяет проверку прав пользователя ||
|| **editableGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле можно задавать. Для `iblockId` — `["add"]`; для `id`, `dateCreate`, `timestampX`, `type`, `available`, `bundle` — `null`; для остальных полей — `["add", "update"]` ||
|| **multiple**
[`boolean`](../../data-types.md) | Признак множественного значения в метаданных. Для всех полей — `false` ||
|| **elementType**
[`string`](../../data-types.md) или `null` | Тип элемента составного поля. Для всех полей — `null` ||
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
                "message": "Обязательное поле `name` не указано",
                "field": "name"
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
|| `name` | Обязательное поле `name` не указано | Передайте параметр `name` с существующим именем поля ||
|#

#### Ошибка отсутствия поля

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Поле `#FIELD#` не найдено | Укажите имя поля из описания параметра `name` ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте только поля из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `editableGroups`, `multiple`, `elementType` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["name","type"]` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-field-list.md)
- [{#T}](./catalog-product-add-rest-v3.md)
- [{#T}](./catalog-product-update-rest-v3.md)
