# Заменить все товарные позиции элемента v 3.0 crm.<тип>.productrow.replace

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элемента CRM, позиции которого заменяются

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.productrow.replace` заменяет весь состав товарных позиций элемента CRM переданным набором и возвращает позиции, которые получились у элемента. Тип объекта задает сегмент `<тип>` в имени метода. Позиции, которых нет в наборе, удаляются. Пустой набор удаляет все позиции элемента.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.productrow.replace` ||
|| Лид | `crm.lead.productrow.replace` ||
|| Предложение | `crm.quote.productrow.replace` ||
|| Счет | `crm.smartinvoice.productrow.replace` ||
|| Документ CRM | `crm.smartdocument.productrow.replace` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.productrow.replace`, например `crm.smartprocess1038.productrow.replace` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы товарных позиций есть у смарт-процесса, только если в настройках типа включена привязка товаров каталога.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.productrow.replace`, а не `crm.smartInvoice.productRow.replace`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, позиции которого заменяются.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **items***
[`object[]`](../../../data-types.md) | Новый набор позиций. Каждая позиция — объект с полями в формате `{"поле": "значение"}`, в позиции должно быть хотя бы одно поле. [Описание параметра](#items)

Пустой массив `[]` удаляет все позиции элемента. В наборе не больше 1000 позиций ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть у каждой позиции в ответе, например `["id","productName","price"]`. Доступные поля описаны в [обзоре методов товарных позиций](./index.md#fields).

По умолчанию: только `id` ||
|#

### Параметр items {#items}

В позиции набора передаются те же поля, что в [параметре fields метода crm.<тип>.productrow.add](./crm-entity-product-row-add-rest-v3.md#fields), кроме `ownerId`: элемент задает параметр `ownerId` метода. Можно передать `productId`, `productName`, `price`, `quantity`, `discountTypeId`, `discountRate`, `discountSum`, `taxRate`, `taxIncluded`, `measureCode`, `measureName`, `sort`.

Поле `id` в позиции передать нельзя: метод не обновляет существующие позиции по идентификатору, а сравнивает новый набор с текущим. Позиция, которая совпала с текущей по всем полям, сохраняет свой идентификатор. Измененная позиция записывается заново и получает новый `id`. Актуальные идентификаторы возвращаются в ответе.

Чтобы изменить одну позицию и сохранить ее идентификатор, используйте метод [crm.<тип>.productrow.update](./crm-entity-product-row-update-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.productrow.replace`

{% endnote %}

Примеры оставляют в элементе смарт-процесса с идентификатором типа `1038` две позиции: товар из каталога и позицию без товара. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerId":37,"items":[{"productId":6461,"price":100.5,"quantity":1},{"productName":"Доставка","price":700,"quantity":1}],"select":["id","productId","productName","price","quantity"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.productrow.replace
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerId":37,"items":[{"productId":6461,"price":100.5,"quantity":1},{"productName":"Доставка","price":700,"quantity":1}],"select":["id","productId","productName","price","quantity"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.productrow.replace
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductRowReplaceResult = {
      items: Array<{
        id: number
        productId: number
        productName: string
        price: number
        quantity: number
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ProductRowReplaceResult>(
        'crm.smartprocess1038.productrow.replace',
        {
          ownerId: 37,
          items: [
            {
              productId: 6461,
              price: 100.5,
              quantity: 1,
            },
            {
              productName: 'Доставка',
              price: 700,
              quantity: 1,
            },
          ],
          select: ['id', 'productId', 'productName', 'price', 'quantity'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product rows after replace:', result.items)
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
      async function replaceProductRows() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.productrow.replace',
            {
              ownerId: 37,
              items: [
                {
                  productId: 6461,
                  price: 100.5,
                  quantity: 1,
                },
                {
                  productName: 'Доставка',
                  price: 700,
                  quantity: 1,
                },
              ],
              select: ['id', 'productId', 'productName', 'price', 'quantity'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Product rows after replace:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', replaceProductRows)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.productrow.replace"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "ownerId": 37,
                "items": [
                    {
                        "productId": 6461,
                        "price": 100.5,
                        "quantity": 1,
                    },
                    {
                        "productName": "Доставка",
                        "price": 700,
                        "quantity": 1,
                    },
                ],
                "select": ["id", "productId", "productName", "price", "quantity"],
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
                'crm.smartprocess1038.productrow.replace',
                [
                    'ownerId' => 37,
                    'items' => [
                        [
                            'productId' => 6461,
                            'price' => 100.5,
                            'quantity' => 1,
                        ],
                        [
                            'productName' => 'Доставка',
                            'price' => 700,
                            'quantity' => 1,
                        ],
                    ],
                    'select' => ['id', 'productId', 'productName', 'price', 'quantity'],
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
        'crm.smartprocess1038.productrow.replace',
        {
            ownerId: 37,
            items: [
                {
                    productId: 6461,
                    price: 100.5,
                    quantity: 1,
                },
                {
                    productName: 'Доставка',
                    price: 700,
                    quantity: 1,
                },
            ],
            select: ['id', 'productId', 'productName', 'price', 'quantity'],
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
        'crm.smartprocess1038.productrow.replace',
        [
            'ownerId' => 37,
            'items' => [
                [
                    'productId' => 6461,
                    'price' => 100.5,
                    'quantity' => 1,
                ],
                [
                    'productName' => 'Доставка',
                    'price' => 700,
                    'quantity' => 1,
                ],
            ],
            'select' => ['id', 'productId', 'productName', 'price', 'quantity'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.productrow.replace", b24.Params{
    	"ownerId": 37,
    	"items": []b24.Params{
    		{
    			"productId": 6461,
    			"price":     100.5,
    			"quantity":  1,
    		},
    		{
    			"productName": "Доставка",
    			"price":       700,
    			"quantity":    1,
    		},
    	},
    	"select": []string{"id", "productId", "productName", "price", "quantity"},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.productrow.replace: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int     `json:"id"`
    		ProductID   int     `json:"productId"`
    		ProductName string  `json:"productName"`
    		Price       float64 `json:"price"`
    		Quantity    float64 `json:"quantity"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.ProductName, item.Price, item.Quantity)
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
                "id": 2413,
                "productId": 6461,
                "productName": "Товар",
                "price": 100.5,
                "quantity": 1
            },
            {
                "id": 2415,
                "productId": 0,
                "productName": "Доставка",
                "price": 700,
                "quantity": 1
            }
        ]
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
|| **result.items**
[`object[]`](../../../data-types.md) | Позиции элемента после замены с полями из `select`. Без `select` у каждой позиции только `id`. После замены пустым набором — пустой массив. [Описание полей товарной позиции](./index.md#fields) ||
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
                "message": "Поле \"id\" не доступно к заполнению",
                "field": "items.0.id"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

Ошибка в позиции набора указывает ее номер в `items`, начиная с `0`: `items.0.id` — поле `id` первой позиции. Если в наборе есть ошибка, метод не меняет позиции элемента.

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `ownerId` | Обязательное поле `ownerId` не указано | Передайте `ownerId` элемента ||
|| `items` | Обязательное поле `items` не указано | Передайте массив `items`. Чтобы удалить все позиции, передайте `[]` ||
|| `items` | В списке "items" больше 1000 элементов | Передайте не больше 1000 позиций ||
|| `items.0` | В поле `items.0` требуется тип данных `ProductRowDto` для такого запроса | Передайте каждую позицию объектом ||
|| `items.0` | В товарной позиции 0 нет полей, доступных для изменения | Передайте в позиции хотя бы одно поле ||
|| `items.0.ownerId` | Поле товарной позиции "ownerId" доступно только для чтения | Уберите `ownerId` из позиций набора: элемент задает параметр `ownerId` метода ||
|| `price` | В поле `price` требуется тип данных `float` для такого запроса | Передайте значение того типа, который указан в описании поля. В этой ошибке номер позиции не указывается, найдите позицию по имени поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `items.0.id` | Поле "id" не доступно к заполнению | Уберите `id` из позиций набора. Так же метод отвечает на `ownerTypeId` и `productTypeId` ||
|| `items.0.productId` | Значение поля не содержится в списке допустимых значений | Товара нет в каталоге или у вас нет к нему доступа. Проверьте `productId` методом [catalog.product.list](../../../catalog/product/catalog-product-list-rest-v3.md) ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Элемента из `ownerId` нет у этого типа объекта или у вас нет права на его изменение. Проверьте `ownerId` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `items.0.foo` для сущности `ProductRowDto` | Проверьте имя поля в позиции с указанным номером. Имена полей пишутся в camelCase: `productName`, а не `PRODUCT_NAME` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.productrow.replace`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включена ли в типе привязка товаров ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-product-row-add-rest-v3.md)
- [{#T}](./crm-entity-product-row-update-rest-v3.md)
- [{#T}](./crm-entity-product-row-list-rest-v3.md)
