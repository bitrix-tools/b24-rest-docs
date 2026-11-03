# Получить значения полей типа цены catalog.priceType.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

Метод `catalog.priceType.get` возвращает информацию о типе цены по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_price_type.id`](../data-types.md#catalog_price_type) | Идентификатор типа цены.

Получить идентификатор можно методом [catalog.priceType.list](./catalog-price-type-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceType.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceType.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PriceTypeResult = {
      priceType: {
        base: string
        createdBy: number
        dateCreate: ISODate | null
        id: number
        modifiedBy: number
        name: string
        sort: number
        timestampX: ISODate | null
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PriceTypeResult>({
        method: 'catalog.priceType.get',
        params: {
          id: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.priceType.id, result.priceType.name, result.priceType.base)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getPriceType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.priceType.get',
            params: {
              id: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.priceType.id, result.priceType.name, result.priceType.base)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPriceType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.price_type.get(
            bitrix_id=1,
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


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.priceType.get',
                [
                    'id' => 1
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

    ```js
    BX24.callMethod(
        'catalog.priceType.get',
        {
            id: 1
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceType.get',
        [
            'id' => 1
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.priceType.get", b24.Params{
    	"id": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.priceType.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "priceType".
    raw, ok := b24.Unwrap(res.Result, "priceType")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа priceType")
    }

    var item struct {
    	Base       string `json:"base"`
    	CreatedBy  int    `json:"createdBy"`
    	DateCreate string `json:"dateCreate"`
    	ID         b24.ID `json:"id"`
    	ModifiedBy int    `json:"modifiedBy"`
    	Name       string `json:"name"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Base, item.CreatedBy)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "priceType": {
            "base": "Y",
            "createdBy": 1,
            "dateCreate": "2020-04-22T09:37:42+03:00",
            "id": 1,
            "modifiedBy": 1269,
            "name": "BASE",
            "sort": 100,
            "timestampX": "2026-11-03T12:50:39+03:00",
            "xmlId": "BASE"
        }
    },
    "time": {
        "start": 1793700362,
        "finish": 1793700362.16221,
        "duration": 0.16220998764038086,
        "processing": 0,
        "date_start": "2026-11-03T13:06:02+03:00",
        "date_finish": "2026-11-03T13:06:02+03:00",
        "operating_reset_at": 1793700960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.priceType**
[`catalog_price_type`](../data-types.md#catalog_price_type) | Объект с информацией о типе цены с заданным идентификатором ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201000000000",
    "error_description": "priceType does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права «Просмотр каталога товаров» или «Управление типами цен» ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | `201000000000` | priceType does not exist. | Типа цены с указанным `id` нет ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-add.md)
- [{#T}](./catalog-price-type-update.md)
- [{#T}](./catalog-price-type-list.md)
- [{#T}](./catalog-price-type-delete.md)
- [{#T}](./catalog-price-type-get-fields.md)
