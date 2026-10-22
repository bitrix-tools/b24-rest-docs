# Получить список полей вариации товара v 3.0 catalog.product.offer.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.product.offer.field.list` возвращает список доступных полей вариации.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив свойств описания, которые нужно вернуть в ответе.

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

По умолчанию: все свойства описания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.product.offer.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","editableGroups"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","editableGroups"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.offer.field.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldListResult = {
      items: Array<{
        name?: string
        type?: string
        editableGroups?: string[] | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FieldListResult>({
        method: 'catalog.product.offer.field.list',
        params: {
          select: ['name', 'type', 'editableGroups'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Fields:', result.items.length)
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
      async function listOfferFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.offer.field.list',
            params: {
              select: ['name', 'type', 'editableGroups'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Fields:', result.items.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listOfferFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.field.list(
            select=["name", "type", "editableGroups"],
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
                'catalog.product.offer.field.list',
                [
                    'select' => ['name', 'type', 'editableGroups'],
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
        'catalog.product.offer.field.list',
        {
            select: ['name', 'type', 'editableGroups'],
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
        'catalog.product.offer.field.list',
        [
            'select' => ['name', 'type', 'editableGroups'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.offer.field.list", b24.Params{
    	"select": []string{"name", "type", "editableGroups"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Name string `json:"name"`
    		Type string `json:"type"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range result.Items {
    	fmt.Println(field.Name, field.Type)
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
                "name": "id",
                "type": "int",
                "editableGroups": null
            },
            {
                "name": "iblockId",
                "type": "int",
                "editableGroups": [
                    "add"
                ]
            },
            {
                "name": "name",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "code",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "xmlId",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "active",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "sort",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "createdBy",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "modifiedBy",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "dateCreate",
                "type": "object",
                "editableGroups": null
            },
            {
                "name": "timestampX",
                "type": "object",
                "editableGroups": null
            },
            {
                "name": "dateActiveFrom",
                "type": "object",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "dateActiveTo",
                "type": "object",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "previewText",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "previewTextType",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "previewPicture",
                "type": "object",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "detailText",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "detailTextType",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "detailPicture",
                "type": "object",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "iblockSectionId",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "iblockSection",
                "type": "array",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "type",
                "type": "int",
                "editableGroups": null
            },
            {
                "name": "available",
                "type": "string",
                "editableGroups": null
            },
            {
                "name": "bundle",
                "type": "string",
                "editableGroups": null
            },
            {
                "name": "quantity",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "quantityReserved",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "quantityTrace",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "canBuyZero",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "subscribe",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "vatId",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "vatIncluded",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "purchasingPrice",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "purchasingCurrency",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "barcodeMulti",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "weight",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "length",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "width",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "height",
                "type": "float",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "measure",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "recurSchemeLength",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "recurSchemeType",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "trialPriceId",
                "type": "int",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "withoutOrder",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "quantityTraceRaw",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "paymentType",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "subscribeRaw",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "canBuyZeroRaw",
                "type": "string",
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "properties",
                "type": "array",
                "editableGroups": [
                    "add",
                    "update"
                ]
            }
        ]
    },
    "time": {
        "start": 1792661183,
        "finish": 1792661183.307366,
        "duration": 0.30736589431762695,
        "processing": 0,
        "date_start": "2026-10-22T12:26:23+03:00",
        "date_finish": "2026-10-22T12:26:23+03:00",
        "operating_reset_at": 1792661760,
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
[`array`](../../../data-types.md) | Массив описаний полей. Свойства описания зависят от `select`. [Описание элемента](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Имя поля ||
|| **type**
[`string`](../../../data-types.md) | Тип в метаданных: `int`, `string`, `float`, `array`, `object`. Для полей даты и картинок возвращается `object` ||
|| **title**
[`string`](../../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../../data-types.md) или `null` | Описание поля. Для полей этого объекта — `null` ||
|| **validationRules**
[`array`](../../../data-types.md) | Массив правил валидации. Для полей этого объекта — `[]` ||
|| **requiredGroups**
[`array`](../../../data-types.md) или `null` | Массив операций, в которых поле обязательно. Для `iblockId` и `name` — `["add"]`, для остальных — `null` ||
|| **filterable**
[`boolean`](../../../data-types.md) | `true` — поле доступно для фильтрации, `false` — недоступно ||
|| **sortable**
[`boolean`](../../../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно ||
|| **editable**
[`boolean`](../../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups`, `false` — нельзя ||
|| **editableGroups**
[`array`](../../../data-types.md) или `null` | Массив операций, в которых поле можно задавать: `add`, `update`. Для полей только для чтения — `null` ||
|| **multiple**
[`boolean`](../../../data-types.md) | Признак множественного значения. Для всех полей — `false` ||
|| **elementType**
[`string`](../../../data-types.md) или `null` | Тип элемента составного поля. Для всех полей — `null` ||
|#

Метод возвращает описание полей: `id`, `iblockId`, `name`, `code`, `xmlId`, `active`, `sort`, `createdBy`, `modifiedBy`, `dateCreate`, `timestampX`, `dateActiveFrom`, `dateActiveTo`, `previewText`, `previewTextType`, `previewPicture`, `detailText`, `detailTextType`, `detailPicture`, `iblockSectionId`, `iblockSection`, `type`, `available`, `bundle`, `quantity`, `quantityReserved`, `quantityTrace`, `canBuyZero`, `subscribe`, `vatId`, `vatIncluded`, `purchasingPrice`, `purchasingCurrency`, `barcodeMulti`, `weight`, `length`, `width`, `height`, `measure`, `recurSchemeLength`, `recurSchemeType`, `trialPriceId`, `withoutOrder`, `quantityTraceRaw`, `paymentType`, `subscribeRaw`, `canBuyZeroRaw`, `properties`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION",
        "message": "Неизвестное поле `foo` для сущности `DtoFieldDto`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте только свойства из описания параметра `select` ||
|#

#### Ошибка формата `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["name","type"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `catalog` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add-rest-v3.md)
- [{#T}](./catalog-product-offer-update-rest-v3.md)
- [{#T}](./catalog-product-offer-get-rest-v3.md)
- [{#T}](./catalog-product-offer-list-rest-v3.md)
- [{#T}](./catalog-product-offer-delete-rest-v3.md)
- [{#T}](./catalog-product-offer-download-rest-v3.md)
- [{#T}](./catalog-product-offer-field-get.md)
