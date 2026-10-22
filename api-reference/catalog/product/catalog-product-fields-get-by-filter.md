# Получить поля товара по фильтру v 3.0 catalog.product.fields.getbyfilter

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

Метод `catalog.product.fields.getbyfilter` возвращает описание полей простого товара в указанном торговом каталоге, включая свойства каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../../data-types.md) | Объект с идентификатором каталога. [Описание параметра](#filter).

Массив условий в формате REST 3.0 метод не принимает ||
|#

### Параметр filter {#filter}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`integer`](../../data-types.md) | Идентификатор торгового каталога товаров. Ключ можно передать и в виде `IBLOCK_ID`.

Идентификатор можно получить методом [catalog.catalog.list](../catalog/catalog-catalog-list-rest-v3.md).

Для каталога вариаций метод возвращает ошибку ||
|#

Метод всегда возвращает поля простого товара. Тип товара из фильтра не учитывается.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.product.fields.getbyfilter`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"iblockId":25}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.fields.getbyfilter
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"iblockId":25},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.fields.getbyfilter
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductFieldsResult = {
      fields: Record<string, {
        TYPE: string
        IS_REQUIRED: boolean
        IS_READ_ONLY: boolean
        IS_IMMUTABLE: boolean
        NAME: string
        IS_DYNAMIC?: boolean
        IS_MULTIPLE?: boolean
        PROPERTY_TYPE?: string
        USER_TYPE?: string | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductFieldsResult>({
        method: 'catalog.product.fields.getbyfilter',
        params: {
          filter: {
            iblockId: 25,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Fields:', Object.keys(result.fields))
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
      async function getProductFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.fields.getbyfilter',
            params: {
              filter: {
                iblockId: 25,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Fields:', Object.keys(result.fields))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProductFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.fields.getbyfilter(
            filter={
                "iblockId": 25,
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
                'catalog.product.fields.getbyfilter',
                [
                    'filter' => [
                        'iblockId' => 25,
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
        'catalog.product.fields.getbyfilter',
        {
            filter: {
                iblockId: 25,
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
        'catalog.product.fields.getbyfilter',
        [
            'filter' => [
                'iblockId' => 25,
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
    res, err := client.Core().Call(ctx, "catalog.product.fields.getbyfilter", b24.Params{
    	"filter": b24.Params{
    		"iblockId": 25,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.fields.getbyfilter: %w", err)
    }

    var result struct {
    	Fields map[string]struct {
    		Type       string `json:"TYPE"`
    		IsRequired bool   `json:"IS_REQUIRED"`
    		Name       string `json:"NAME"`
    	} `json:"fields"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for code, field := range result.Fields {
    	fmt.Println(code, field.Type, field.IsRequired)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод возвращает описание всех полей товара и свойств каталога. В примере показана часть полей.

```json
{
    "result": {
        "fields": {
            "ID": {
                "TYPE": "integer",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": true,
                "IS_IMMUTABLE": false,
                "NAME": "Идентификатор"
            },
            "NAME": {
                "TYPE": "string",
                "IS_REQUIRED": true,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Наименование"
            },
            "IBLOCK_ID": {
                "TYPE": "integer",
                "IS_REQUIRED": true,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": true,
                "NAME": "Идентификатор инфоблока"
            },
            "PREVIEW_PICTURE": {
                "TYPE": "file",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Картинка анонса"
            },
            "PROPERTY_301": {
                "TYPE": "productproperty",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Артикул",
                "IS_DYNAMIC": true,
                "IS_MULTIPLE": false,
                "PROPERTY_TYPE": "S",
                "USER_TYPE": ""
            },
            "PROPERTY_305": {
                "TYPE": "productproperty",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Материал",
                "IS_DYNAMIC": true,
                "IS_MULTIPLE": true,
                "PROPERTY_TYPE": "S",
                "USER_TYPE": null
            },
            "TYPE": {
                "TYPE": "integer",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": true,
                "IS_IMMUTABLE": false,
                "NAME": "Тип товара"
            },
            "QUANTITY": {
                "TYPE": "double",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Доступное количество"
            },
            "VAT_ID": {
                "TYPE": "integer",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Идентификатор НДС"
            },
            "MEASURE": {
                "TYPE": "integer",
                "IS_REQUIRED": false,
                "IS_READ_ONLY": false,
                "IS_IMMUTABLE": false,
                "NAME": "Единица измерения"
            }
        }
    },
    "time": {
        "start": 1792660854,
        "finish": 1792660854.262779,
        "duration": 0.26277899742126465,
        "processing": 0,
        "date_start": "2026-10-22T12:20:54+03:00",
        "date_finish": "2026-10-22T12:20:54+03:00",
        "operating_reset_at": 1792661400,
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
|| **result.fields**
[`object`](../../data-types.md) | Описания полей. Ключ — код поля в верхнем регистре, например `IBLOCK_ID`, для свойства — `PROPERTY_{id}`. [Описание значения](#field) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Описание поля {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../../data-types.md) | Тип поля: `integer`, `double`, `string`, `char`, `datetime`, `file`, `list`. Для свойств — `productproperty` ||
|| **IS_REQUIRED**
[`boolean`](../../data-types.md) | `true` — поле обязательно при создании товара ||
|| **IS_READ_ONLY**
[`boolean`](../../data-types.md) | `true` — поле только для чтения ||
|| **IS_IMMUTABLE**
[`boolean`](../../data-types.md) | `true` — поле можно задать только при создании товара ||
|| **NAME**
[`string`](../../data-types.md) | Название поля ||
|| **IS_DYNAMIC**
[`boolean`](../../data-types.md) | Только для свойств. `true` — поле является свойством каталога ||
|| **IS_MULTIPLE**
[`boolean`](../../data-types.md) | Только для свойств. `true` — свойство множественное ||
|| **PROPERTY_TYPE**
[`string`](../../data-types.md) | Только для свойств. Базовый тип свойства:

- `S` — строка
- `N` — число
- `L` — список
- `F` — файл
- `E` — привязка к элементам
- `G` — привязка к разделам ||
|| **USER_TYPE**
[`string`](../../data-types.md) | Только для свойств. Пользовательский тип свойства, например `directory` или `Date`. `null` или пустая строка, если тип не задан ||
|#

Коды полей возвращаются в формате прежней версии API, и их состав не совпадает с полями REST 3.0. Поля товара для методов REST 3.0 возвращает [catalog.product.field.list](./catalog-product-field-list.md). Ключи свойств `PROPERTY_{id}` из ответа передавайте в поле `properties` методов [catalog.product.add](./catalog-product-add-rest-v3.md) и [catalog.product.update](./catalog-product-update-rest-v3.md).

В прежней версии API для каждого типа товара есть свой метод: [catalog.product.getFieldsByFilter](./catalog-product-get-fields-by-filter.md), [catalog.product.sku.getFieldsByFilter](./sku/catalog-product-sku-get-fields-by-filter.md), [catalog.product.offer.getFieldsByFilter](./offer/catalog-product-offer-get-fields-by-filter.md) и [catalog.product.service.getFieldsByFilter](./service/catalog-product-service-get-fields-by-filter.md). Они возвращают поля в объекте с именем типа, например `result.product` или `result.service`, с ключами в формате `iblockId` и признаками `isRequired`, `isReadOnly`, `isImmutable`. В REST 3.0 метод один и возвращает только поля простого товара.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "productType is not allowed for this catalog"
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
|| `filter` | Обязательное поле `filter` не указано | Передайте объект `filter` с идентификатором каталога ||
|| `-` | Incorrect filter format | Передайте в `filter` ключ `iblockId` ||
|| `-` | parameter - iblockId is empty | Передайте `filter` объектом вида `{"iblockId": 25}` с числовым значением ||
|| `-` | iblock is not catalog | Инфоблок не является торговым каталогом. Передайте идентификатор торгового каталога ||
|| `-` | productType is not allowed for this catalog | Передайте идентификатор каталога товаров, а не каталога вариаций ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на просмотр каталога ||
|#

#### Ошибка имени метода

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `catalog.product.fields.getByFilter` не найден | Вызовите метод в нижнем регистре: `catalog.product.fields.getbyfilter` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-field-list.md)
- [{#T}](./catalog-product-add-rest-v3.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)
