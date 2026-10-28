# Добавить ставку НДС catalog.vat.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление ставками НДС»

Метод `catalog.vat.add` создает ставку НДС.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания новой ставки НДС ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название ставки НДС, например `НДС 5%` ||
|| **active**
[`string`](../../data-types.md) | Индикатор активности ставки НДС. Возможные значения:
- `Y` — активен
- `N` — неактивен

По умолчанию `Y`
||
|| **rate***
[`double`](../../data-types.md) | Величина ставки в процентах, например `5` или `22`. Значение `null` не принимается, ставку без НДС этим методом создать нельзя ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ставки в списках. Чем меньше значение, тем выше ставка в списке.

По умолчанию `100`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"НДС 5%","rate":5,"sort":500,"active":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.vat.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"НДС 5%","rate":5,"sort":500,"active":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.vat.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogVatAddResult = {
      vat: {
        active: string
        id: number
        name: string
        rate: number
        sort: number
        timestampX: ISODate
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CatalogVatAddResult>({
        method: 'catalog.vat.add',
        params: {
          fields: {
            name: 'НДС 5%',
            rate: 5,
            sort: 500,
            active: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added VAT rate:', result.vat.id, result.vat.name, result.vat.rate)
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
      async function addVatRate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.vat.add',
            params: {
              fields: {
                name: 'НДС 5%',
                rate: 5,
                sort: 500,
                active: 'Y',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added VAT rate:', result.vat.id, result.vat.name, result.vat.rate)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addVatRate)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.vat.add(
            fields={
                "name": "НДС 5%",
                "rate": 5,
                "sort": 500,
                "active": "Y",
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


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.vat.add',
                [
                    'fields' => [
                        'name'   => 'НДС 5%',
                        'rate'   => 5,
                        'sort'   => 500,
                        'active' => "Y",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result['vat']);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'catalog.vat.add',
            {
                fields: {
                        name: 'НДС 5%',
                        rate: 5,
                        sort: 500,
                        active: "Y",
                }
            },
    function(result) {
            if (result.error())
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
        'catalog.vat.add',
        [
            'fields' => [
                'name' => 'НДС 5%',
                'rate' => 5,
                'sort' => 500,
                'active' => "Y"
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.vat.add", b24.Params{
    	"fields": b24.Params{
    		"name":   "НДС 5%",
    		"rate":   5,
    		"sort":   500,
    		"active": "Y",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.vat.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "vat".
    raw, ok := b24.Unwrap(res.Result, "vat")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа vat")
    }

    var item struct {
    	Active     string  `json:"active"`
    	ID         b24.ID  `json:"id"`
    	Name       string  `json:"name"`
    	Rate       float64 `json:"rate"`
    	Sort       int     `json:"sort"`
    	TimestampX string  `json:"timestampX"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Active, item.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "vat": {
            "active": "Y",
            "id": 37,
            "name": "НДС 5%",
            "rate": 5,
            "sort": 500,
            "timestampX": "2026-10-27T19:17:29+03:00"
        }
    },
    "time": {
        "start": 1793117849,
        "finish": 1793117849.807201,
        "duration": 0.8072009086608887,
        "processing": 0,
        "date_start": "2026-10-27T19:17:29+03:00",
        "date_finish": "2026-10-27T19:17:29+03:00",
        "operating_reset_at": 1793118420,
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
|| **vat**
[`catalog_vat`](../data-types.md#catalog_vat) | Созданная ставка НДС со всеми полями: `active`, `id`, `name`, `rate`, `sort`, `timestampX`. Значение `id` используйте в поле `vatId` торгового каталога или товара ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: rate"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300020` | Access Denied | У пользователя нет права «Управление ставками НДС» ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Required fields: name | В `fields` нет поля `name` ||
|| `400` | `0` | Required fields: rate | В `fields` нет поля `rate` или передано `null` ||
|| `400` | `0` | Error adding VAT | Не удалось сохранить ставку НДС ||
|| — | `0` | — | Другие ошибки, например фатальные ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./catalog-vat-update.md)
- [{#T}](./catalog-vat-get.md)
- [{#T}](./catalog-vat-list.md)
- [{#T}](./catalog-vat-delete.md)
- [{#T}](./catalog-vat-get-fields.md)
- [{#T}](../catalog/catalog-catalog-update.md)
- [{#T}](../product/catalog-product-update.md)
