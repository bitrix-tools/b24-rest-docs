# Получить значения полей услуги catalog.product.service.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с одним из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение элементов инфоблока каталога

Метод `catalog.product.service.get` возвращает значения полей услуги по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product_service.id`](../../data-types.md#catalog_product_service) | Идентификатор услуги. Получить идентификатор можно методом [catalog.product.service.list](./catalog-product-service-list.md) ||
|#

{% note warning "Работа с ценой услуг" %}

Чтобы получить цены услуги, используйте методы [catalog.price.*](../../price/index.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7623}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":7623,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.service.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetServiceResult = {
      service: {
        id: number
        name: string
        active: string
        available: string
        bundle: string
        code: string
        createdBy: number
        dateActiveFrom: ISODate | null
        dateActiveTo: ISODate | null
        dateCreate: ISODate | null
        detailPicture: { id: string; url: string; urlMachine: string } | null
        detailText: string | null
        detailTextType: string
        iblockId: number
        iblockSectionId: number | null
        modifiedBy: number
        previewPicture: { id: string; url: string; urlMachine: string } | null
        previewText: string | null
        previewTextType: string
        sort: number
        timestampX: ISODate | null
        type: number
        vatId: number | null
        vatIncluded: string
        xmlId: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<GetServiceResult>({
        method: 'catalog.product.service.get',
        params: {
          id: 7623,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Service:', result.service.id, result.service.name, result.service.active)
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
      async function getService() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.product.service.get',
            params: {
              id: 7623,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Service:', result.service.id, result.service.name, result.service.active)
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
            bitrix_id=7623,
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
                'catalog.product.service.get',
                [
                    'id' => 7623
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting product service: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.service.get', {
            id: 7623
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.service.get',
        [
            'id' => 7623
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
    	"id": 7623,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.service.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "service".
    raw, ok := b24.Unwrap(res.Result, "service")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа service")
    }

    var item struct {
    	Active         string `json:"active"`
    	Available      string `json:"available"`
    	Bundle         string `json:"bundle"`
    	Code           string `json:"code"`
    	CreatedBy      int    `json:"createdBy"`
    	DateActiveFrom string `json:"dateActiveFrom"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Active, item.Available)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "service": {
            "active": "Y",
            "available": "N",
            "bundle": "N",
            "code": "ac_installation",
            "createdBy": 1269,
            "dateActiveFrom": null,
            "dateActiveTo": null,
            "dateCreate": "2026-11-05T18:19:49+03:00",
            "detailPicture": null,
            "detailText": "<p>Монтаж внутреннего и наружного блоков</p>",
            "detailTextType": "html",
            "iblockId": 25,
            "iblockSection": null,
            "iblockSectionId": null,
            "id": 7623,
            "measure": 9,
            "modifiedBy": 1269,
            "name": "Монтаж кондиционера",
            "previewPicture": {
                "id": "40055",
                "url": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40055&fields%5BproductId%5D=7623",
                "urlMachine": "/rest/catalog.product.download?fields%5BfieldName%5D=previewPicture&fields%5BfileId%5D=40055&fields%5BproductId%5D=7623"
            },
            "previewText": "Установка сплит-системы мощностью до 3,5 кВт под ключ",
            "previewTextType": "text",
            "property301": {
                "value": "SRV-AC-01",
                "valueId": "4147"
            },
            "property303": {
                "value": "Климат-Сервис",
                "valueId": "4061"
            },
            "property305": null,
            "sort": 200,
            "timestampX": "2026-11-05T19:09:53+03:00",
            "type": 7,
            "vatId": 9,
            "vatIncluded": "Y",
            "xmlId": "srv-ac-01"
        }
    },
    "time": {
        "start": 1793964025,
        "finish": 1793964025.810799,
        "duration": 0.8107988834381104,
        "processing": 0,
        "date_start": "2026-11-06T14:20:25+03:00",
        "date_finish": "2026-11-06T14:20:25+03:00",
        "operating_reset_at": 1793964600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.service**
[`catalog_product_service`](../../data-types.md#catalog_product_service) | Объект с полями услуги. Пустые поля приходят со значением `null`.

В ответе приходят все свойства инфоблока в виде ключей `propertyN`: у заполненного свойства — объект `{"value": ..., "valueId": ...}`, у множественного — массив таких объектов. В примере показаны только свойства `property301`, `property303` и `property305`.

Если `id` принадлежит товару другого типа, например простому товару, в `service` приходит пустой массив `[]` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"200040300010",
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога», «Изменение цены продажи товара» ||
|| `400` | `200040300040` | Access Denied | У пользователя нет права на чтение элемента инфоблока каталога ||
|| `400` | Пустое значение | service does not exist. | Услуга с указанным `id` не найдена. Ту же ошибку метод возвращает, если в `id` передана строка, которая не является числом ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-add.md)
- [{#T}](./catalog-product-service-update.md)
- [{#T}](./catalog-product-service-list.md)
- [{#T}](./catalog-product-service-delete.md)
- [{#T}](./catalog-product-service-download.md)
- [{#T}](./catalog-product-service-get-fields-by-filter.md)
