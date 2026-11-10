# Получить товарную позицию v 3.0 crm.<тип>.productrow.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента CRM, к которому относится товарная позиция

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.productrow.get` возвращает товарную позицию по идентификатору. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.productrow.get` ||
|| Лид | `crm.lead.productrow.get` ||
|| Предложение | `crm.quote.productrow.get` ||
|| Счет | `crm.smartinvoice.productrow.get` ||
|| Документ CRM | `crm.smartdocument.productrow.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.productrow.get`, например `crm.smartprocess1038.productrow.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы товарных позиций есть у смарт-процесса, только если в настройках типа включена привязка товаров каталога.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.productrow.get`, а не `crm.smartInvoice.productRow.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор товарной позиции.

Идентификатор можно получить методом [crm.<тип>.productrow.list](./crm-entity-product-row-list-rest-v3.md). Позиция должна относиться к элементу того типа, который задан в имени метода: позицию сделки метод смарт-процесса не найдет ||
|| **select**
[`array`](../../../data-types.md) | Список полей позиции, которые нужно вернуть, например `["id","productName","price"]`. Доступные поля описаны в [обзоре методов товарных позиций](./index.md#fields). Связанных объектов у позиции нет, путь через точку не поддерживается.

По умолчанию: только `id` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.productrow.get`

{% endnote %}

Примеры получают все поля позиции элемента смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2409,"select":["id","ownerId","ownerTypeId","productId","productName","price","quantity","discountTypeId","discountRate","discountSum","taxRate","taxIncluded","measureCode","measureName","sort","productTypeId"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.productrow.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2409,"select":["id","ownerId","ownerTypeId","productId","productName","price","quantity","discountTypeId","discountRate","discountSum","taxRate","taxIncluded","measureCode","measureName","sort","productTypeId"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.productrow.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductRowGetResult = {
      item: {
        id: number
        ownerId: number
        productId: number
        productName: string
        price: number
        quantity: number
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ProductRowGetResult>(
        'crm.smartprocess1038.productrow.get',
        {
          id: 2409,
          select: ['id', 'ownerId', 'ownerTypeId', 'productId', 'productName', 'price', 'quantity', 'discountTypeId', 'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'measureName', 'sort', 'productTypeId'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Product row:', result.item)
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
      async function getProductRow() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.productrow.get',
            {
              id: 2409,
              select: ['id', 'ownerId', 'ownerTypeId', 'productId', 'productName', 'price', 'quantity', 'discountTypeId', 'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'measureName', 'sort', 'productTypeId'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Product row:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProductRow)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.productrow.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 2409,
                "select": ["id", "ownerId", "ownerTypeId", "productId", "productName", "price", "quantity", "discountTypeId", "discountRate", "discountSum", "taxRate", "taxIncluded", "measureCode", "measureName", "sort", "productTypeId"],
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
                'crm.smartprocess1038.productrow.get',
                [
                    'id' => 2409,
                    'select' => ['id', 'ownerId', 'ownerTypeId', 'productId', 'productName', 'price', 'quantity', 'discountTypeId', 'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'measureName', 'sort', 'productTypeId'],
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
        'crm.smartprocess1038.productrow.get',
        {
            id: 2409,
            select: ['id', 'ownerId', 'ownerTypeId', 'productId', 'productName', 'price', 'quantity', 'discountTypeId', 'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'measureName', 'sort', 'productTypeId'],
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
        'crm.smartprocess1038.productrow.get',
        [
            'id' => 2409,
            'select' => ['id', 'ownerId', 'ownerTypeId', 'productId', 'productName', 'price', 'quantity', 'discountTypeId', 'discountRate', 'discountSum', 'taxRate', 'taxIncluded', 'measureCode', 'measureName', 'sort', 'productTypeId'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.productrow.get", b24.Params{
    	"id":     2409,
    	"select": []string{"id", "ownerId", "ownerTypeId", "productId", "productName", "price", "quantity", "discountTypeId", "discountRate", "discountSum", "taxRate", "taxIncluded", "measureCode", "measureName", "sort", "productTypeId"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.productrow.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID          int     `json:"id"`
    		OwnerID     int     `json:"ownerId"`
    		ProductID   int     `json:"productId"`
    		ProductName string  `json:"productName"`
    		Price       float64 `json:"price"`
    		Quantity    float64 `json:"quantity"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.ProductName, result.Item.Price)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 2409,
            "ownerId": 37,
            "ownerTypeId": 1038,
            "productId": 6461,
            "productName": "Товар",
            "price": 100.5,
            "quantity": 2,
            "discountTypeId": 2,
            "discountRate": 10,
            "discountSum": 9.30555556,
            "taxRate": 20,
            "taxIncluded": true,
            "measureCode": 796,
            "measureName": "шт",
            "sort": 0,
            "productTypeId": 1
        }
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
|| **result.item**
[`object`](../../../data-types.md) | Товарная позиция с полями из `select`. Без `select` объект содержит только `id`. [Описание полей товарной позиции](./index.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` товарной позиции ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|#

#### Позиция не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Позиции нет, она относится к элементу другого типа объекта или у вас нет права на просмотр элемента. Проверьте `id` методом [crm.<тип>.productrow.list](./crm-entity-product-row-list-rest-v3.md) и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductRowDto` | Проверьте имена полей в `select` по [описанию полей товарной позиции](./index.md#fields) ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.productrow.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включена ли в типе привязка товаров ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-product-row-list-rest-v3.md)
- [{#T}](./crm-entity-product-row-update-rest-v3.md)
- [{#T}](./crm-entity-product-row-delete-rest-v3.md)
