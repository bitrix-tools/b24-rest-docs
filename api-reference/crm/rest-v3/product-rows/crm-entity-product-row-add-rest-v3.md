# Добавить товарную позицию v 3.0 crm.<тип>.productrow.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элемента CRM, в который добавляется товарная позиция

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.productrow.add` добавляет одну товарную позицию в элемент CRM и возвращает ее идентификатор. Тип объекта задает сегмент `<тип>` в имени метода. Сумма элемента пересчитывается по товарным позициям, если ее не задали вручную.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.productrow.add` ||
|| Лид | `crm.lead.productrow.add` ||
|| Предложение | `crm.quote.productrow.add` ||
|| Счет | `crm.smartinvoice.productrow.add` ||
|| Документ CRM | `crm.smartdocument.productrow.add` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.productrow.add`, например `crm.smartprocess1038.productrow.add` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы товарных позиций есть у смарт-процесса, только если в настройках типа включена привязка товаров каталога.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.productrow.add`, а не `crm.smartInvoice.productRow.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями товарной позиции в формате `{"поле": "значение"}`. [Описание параметра](#fields)

Обязательное поле — `ownerId`, и в объекте должно быть хотя бы одно поле, кроме него ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, в который добавляется позиция. Тип элемента задает имя метода: `crm.deal.productrow.add` добавляет позицию в сделку.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) или из ответа метода [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) ||
|| **productId**
[`integer`](../../../data-types.md) | Идентификатор товара из каталога. Если не передать `productName`, название позиции берется из каталога.

Идентификатор можно получить методом [catalog.product.list](../../../catalog/product/catalog-product-list-rest-v3.md).

Если поле не передать, позиция создается без привязки к каталогу и в ответах приходит `productId: 0` ||
|| **productName**
[`string`](../../../data-types.md) | Название позиции. Для позиции без товара из каталога передайте название явно ||
|| **price**
[`double`](../../../data-types.md) | Цена за единицу с учетом скидки и налога ||
|| **quantity**
[`double`](../../../data-types.md) | Количество ||
|| **discountTypeId**
[`integer`](../../../data-types.md) | Тип скидки.

Возможные значения:

- `1` — скидка в деньгах, задается в `discountSum`
- `2` — скидка в процентах, задается в `discountRate`

По умолчанию: `2` ||
|| **discountRate**
[`double`](../../../data-types.md) | Скидка в процентах. Используйте, если `discountTypeId` равно `2` ||
|| **discountSum**
[`double`](../../../data-types.md) | Сумма скидки на единицу товара. Используйте, если `discountTypeId` равно `1`. При скидке в процентах сумма рассчитывается автоматически ||
|| **taxRate**
[`double`](../../../data-types.md) | Ставка налога в процентах, например `20`. Без значения позиция считается без налога.

По умолчанию: `null` ||
|| **taxIncluded**
[`boolean`](../../../data-types.md) | Включен ли налог в цену.

Возможные значения:

- `true` — налог включен в `price`
- `false` — налог начисляется сверх цены

По умолчанию: `false` ||
|| **measureCode**
[`integer`](../../../data-types.md) | Код единицы измерения по классификатору, например `796` — штука. Название единицы в `measureName` подставляется по коду.

Коды единиц измерения можно получить методом [catalog.measure.list](../../../catalog/measure/catalog-measure-list-rest-v3.md) ||
|| **measureName**
[`string`](../../../data-types.md) | Название единицы измерения. Если передан `measureCode`, название берется из справочника единиц измерения ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок позиции в списке.

По умолчанию: `0` ||
|#

Поля `id`, `ownerTypeId` и `productTypeId` только для чтения: метод отвечает на них ошибкой. Список полей с признаком, можно ли поле изменять, возвращает метод `crm.<тип>.productrow.field.list`. Описание полей — в [обзоре методов товарных позиций](./index.md#fields).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.productrow.add`

{% endnote %}

Примеры добавляют товар из каталога в элемент смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ownerId":37,"productId":6461,"price":100.5,"quantity":2,"discountTypeId":2,"discountRate":10,"taxRate":20,"taxIncluded":true,"measureCode":796}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.productrow.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ownerId":37,"productId":6461,"price":100.5,"quantity":2,"discountTypeId":2,"discountRate":10,"taxRate":20,"taxIncluded":true,"measureCode":796},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.productrow.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductRowAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ProductRowAddResult>(
        'crm.smartprocess1038.productrow.add',
        {
          fields: {
            ownerId: 37,
            productId: 6461,
            price: 100.5,
            quantity: 2,
            discountTypeId: 2,
            discountRate: 10,
            taxRate: 20,
            taxIncluded: true,
            measureCode: 796,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product row created:', result.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addProductRow() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.productrow.add',
            {
              fields: {
                ownerId: 37,
                productId: 6461,
                price: 100.5,
                quantity: 2,
                discountTypeId: 2,
                discountRate: 10,
                taxRate: 20,
                taxIncluded: true,
                measureCode: 796,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Product row created:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProductRow)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.productrow.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "ownerId": 37,
                    "productId": 6461,
                    "price": 100.5,
                    "quantity": 2,
                    "discountTypeId": 2,
                    "discountRate": 10,
                    "taxRate": 20,
                    "taxIncluded": True,
                    "measureCode": 796,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
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
                'crm.smartprocess1038.productrow.add',
                [
                    'fields' => [
                        'ownerId' => 37,
                        'productId' => 6461,
                        'price' => 100.5,
                        'quantity' => 2,
                        'discountTypeId' => 2,
                        'discountRate' => 10,
                        'taxRate' => 20,
                        'taxIncluded' => true,
                        'measureCode' => 796,
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
        'crm.smartprocess1038.productrow.add',
        {
            fields: {
                ownerId: 37,
                productId: 6461,
                price: 100.5,
                quantity: 2,
                discountTypeId: 2,
                discountRate: 10,
                taxRate: 20,
                taxIncluded: true,
                measureCode: 796,
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
        'crm.smartprocess1038.productrow.add',
        [
            'fields' => [
                'ownerId' => 37,
                'productId' => 6461,
                'price' => 100.5,
                'quantity' => 2,
                'discountTypeId' => 2,
                'discountRate' => 10,
                'taxRate' => 20,
                'taxIncluded' => true,
                'measureCode' => 796,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.productrow.add", b24.Params{
    	"fields": b24.Params{
    		"ownerId":        37,
    		"productId":      6461,
    		"price":          100.5,
    		"quantity":       2,
    		"discountTypeId": 2,
    		"discountRate":   10,
    		"taxRate":        20,
    		"taxIncluded":    true,
    		"measureCode":    796,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.productrow.add: %w", err)
    }

    var result struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 2409
    },
    "time": {
        "start": 1793709949,
        "finish": 1793709949.853585,
        "duration": 0.8535850048065186,
        "processing": 0,
        "date_start": "2026-11-03T15:45:49+03:00",
        "date_finish": "2026-11-03T15:45:49+03:00",
        "operating_reset_at": 1793710260,
        "operating": 0.3442521095275879
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.id**
[`integer`](../../../data-types.md) | Идентификатор созданной товарной позиции. Поля позиции можно получить методом [crm.<тип>.productrow.get](./crm-entity-product-row-get-rest-v3.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Значение поля не содержится в списке допустимых значений",
                "field": "productId"
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
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Не передано ни одного поля товарной позиции | Передайте в `fields` хотя бы одно поле, кроме `ownerId`, например `productId` или `productName` ||
|| `price` | В поле `price` требуется тип данных `float` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `ownerId` | Не заполнено обязательное поле "ownerId" | Передайте `ownerId` в `fields` ||
|| `ownerId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор элемента ||
|| `ownerId` | Значение поля не содержится в списке допустимых значений | Элемента с таким идентификатором нет у этого типа объекта или у вас нет к нему доступа. Проверьте `ownerId` и имя метода ||
|| `productId` | Значение поля не содержится в списке допустимых значений | Товара нет в каталоге или у вас нет к нему доступа. Проверьте `productId` методом [catalog.product.list](../../../catalog/product/catalog-product-list-rest-v3.md) ||
|| `ownerTypeId` | Поле "ownerTypeId" не доступно к заполнению | Уберите поле только для чтения из `fields`. Так же метод отвечает на `id` и `productTypeId` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductRowDto` | Проверьте имя поля по таблице [параметра fields](#fields). Имена полей пишутся в camelCase: `productName`, а не `PRODUCT_NAME` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.productrow.add`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включена ли в типе привязка товаров ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-product-row-update-rest-v3.md)
- [{#T}](./crm-entity-product-row-replace-rest-v3.md)
- [{#T}](./crm-entity-product-row-list-rest-v3.md)
- [{#T}](./crm-entity-product-row-delete-rest-v3.md)
