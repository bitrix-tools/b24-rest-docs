# Получить значения всех полей торгового каталога catalog.catalog.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.catalog.get` возвращает значения полей торгового каталога по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор торгового каталога. Совпадает с идентификатором информационного блока каталога.

Получить идентификатор можно методом [catalog.catalog.list](./catalog-catalog-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":25}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":25,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.catalog.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogGetResult = {
      catalog: {
        iblockId: number
        iblockTypeId: string
        id: number
        lid: string
        name: string
        productIblockId: number | null
        skuPropertyId: number | null
        subscription: 'Y' | 'N'
        vatId: number | null
        yandexExport: 'Y' | 'N'
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CatalogGetResult>({
        method: 'catalog.catalog.get',
        params: {
          id: 25,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.catalog)
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
      async function getCatalog() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.catalog.get',
            params: {
              id: 25,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.catalog)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCatalog)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.catalog.get(
            bitrix_id=25,
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
                'catalog.catalog.get',
                [
                    'id' => 25
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting catalog: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.catalog.get', {
            'id': 25
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
        'catalog.catalog.get',
        [
            'id' => 25
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.catalog.get", b24.Params{
    	"id": 25,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.catalog.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "catalog".
    raw, ok := b24.Unwrap(res.Result, "catalog")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа catalog")
    }

    var item struct {
    	IblockID     b24.ID `json:"iblockId"`
    	IblockTypeID string `json:"iblockTypeId"`
    	ID           b24.ID `json:"id"`
    	Lid          string `json:"lid"`
    	Name         string `json:"name"`
    	Subscription string `json:"subscription"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.IblockID, item.IblockTypeID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "catalog": {
            "iblockId": 25,
            "iblockTypeId": "CRM_PRODUCT_CATALOG",
            "id": 25,
            "lid": "s1",
            "name": "Товарный каталог CRM",
            "productIblockId": null,
            "skuPropertyId": null,
            "subscription": "N",
            "vatId": 1,
            "yandexExport": "N"
        }
    },
    "time": {
        "start": 1793612963,
        "finish": 1793612963.560481,
        "duration": 0.560481071472168,
        "processing": 0,
        "date_start": "2026-11-02T12:49:23+03:00",
        "date_finish": "2026-11-02T12:49:23+03:00",
        "operating_reset_at": 1793613540,
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
|| **result.catalog**
[`catalog_catalog`](../data-types.md#catalog_catalog) | Объект с информацией о торговом каталоге ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "catalog does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | У пользователя нет права на просмотр настроек Битрикс24 ||
|| `400` | `200040300030` | Access Denied | У пользователя нет права на чтение торгового каталога ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|| `400` | Пустое значение | catalog does not exist. | Торговый каталог с указанным `id` не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-list.md)
- [{#T}](./catalog-catalog-is-offers.md)
- [{#T}](./catalog-catalog-get-fields.md)