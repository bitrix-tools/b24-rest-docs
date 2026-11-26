# Получить список служб доставки sale.delivery.getlist

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `sale.delivery.getlist` получает список служб доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../../../data-types.md) | Массив полей, которые нужно вернуть. Доступные поля:
- `ID` — идентификатор службы
- `PARENT_ID` — идентификатор родительской службы
- `NAME` — название
- `ACTIVE` — активность
- `DESCRIPTION` — описание
- `SORT` — сортировка
- `CURRENCY` — код валюты
- `LOGOTYPE` — идентификатор файла логотипа

Имена полей передавайте в верхнем регистре, другое поле вызывает ошибку `ERROR_CHECK_FAILURE`.

Если параметр не передан, возвращаются все поля. Если передан пустой массив, элементы списка приходят пустыми: `[[]]` ||
|| **FILTER**
[`object`](../../../data-types.md) | Объект для фильтрации в формате `{"поле_1": "значение_1", ..., "поле_N": "значение_N"}`. Доступные поля те же, что в `SELECT`. Для фильтра по логотипу используйте имя `LOGOTIP`: поле `LOGOTYPE` в фильтре вызывает ошибку `100`.

К имени поля можно добавить префикс:
- без префикса или `=` — равно. Значение-массив работает как «одно из»
- `@` — одно из значений массива
- `!` или `!=` — не равно
- `>`, `>=`, `<`, `<=` — больше, больше или равно, меньше, меньше или равно
- `%` — содержит подстроку без учета регистра. Символ `%` в значении не нужен
- `!%` — не содержит подстроку
- `=%` или `%=` — LIKE по шаблону. Символ `%` передавайте в значении: `"Курьер%"` — начинается с «Курьер»
- `!=%` или `!%=` — NOT LIKE по шаблону

Префикс `><` не поддерживается ||
|| **ORDER**
[`object`](../../../data-types.md) | Объект для сортировки в формате `{"поле_1": "направление_1", ..., "поле_N": "направление_N"}`. Доступные поля те же, что в `SELECT`.

Возможные значения направления:
- `asc` — по возрастанию
- `desc` — по убыванию

Регистр направления не важен. Другое значение вызывает ошибку `ERROR_ARGUMENT` ||
|#

{% note info "" %}

Метод возвращает все службы доставки без постраничной навигации, включая службы, созданные не через REST, и профили. Имена параметров `SELECT`, `FILTER`, `ORDER` передавайте в верхнем регистре: параметры в нижнем регистре метод не распознает и возвращает весь список.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","PARENT_ID","NAME","ACTIVE","DESCRIPTION","SORT","CURRENCY"],"FILTER":{"@ID":[196,197,198]},"ORDER":{"SORT":"ASC","ID":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","PARENT_ID","NAME","ACTIVE","DESCRIPTION","SORT","CURRENCY"],"FILTER":{"@ID":[196,197,198]},"ORDER":{"SORT":"ASC","ID":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.getlist
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each DeliveryService returned in result[]
    type DeliveryService = {
      ID: number
      PARENT_ID: number | null
      NAME: string
      ACTIVE: string
      DESCRIPTION: string
      SORT: number
      CURRENCY: string
    }

    try {
      // sale.delivery.getlist returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<DeliveryService[]>({
        method: 'sale.delivery.getlist',
        params: {
          SELECT: ['ID', 'PARENT_ID', 'NAME', 'ACTIVE', 'DESCRIPTION', 'SORT', 'CURRENCY'],
          FILTER: {
            '@ID': [196, 197, 198],
          },
          ORDER: {
            SORT: 'ASC',
            ID: 'DESC',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Delivery services (%d):', result.length, result)
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
      async function getDeliveryList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.delivery.getlist returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.getlist',
            params: {
              SELECT: ['ID', 'PARENT_ID', 'NAME', 'ACTIVE', 'DESCRIPTION', 'SORT', 'CURRENCY'],
              FILTER: {
                '@ID': [196, 197, 198],
              },
              ORDER: {
                SORT: 'ASC',
                ID: 'DESC',
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Delivery services (%d):', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDeliveryList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.delivery.getlist(
            select=[
                "ID",
                "PARENT_ID",
                "NAME",
                "ACTIVE",
                "DESCRIPTION",
                "SORT",
                "CURRENCY",
            ],
            filter={
                "@ID": [
                    196,
                    197,
                    198,
                ],
            },
            order={
                "SORT": "ASC",
                "ID": "DESC",
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
                'sale.delivery.getlist',
                [
                    'SELECT' => [
                        "ID",
                        "PARENT_ID",
                        "NAME",
                        "ACTIVE",
                        "DESCRIPTION",
                        "SORT",
                        "CURRENCY",
                    ],
                    'FILTER' => [
                        '@ID' => [196, 197, 198],
                    ],
                    'ORDER' => [
                        'SORT' => "ASC",
                        'ID'   => "DESC",
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting delivery list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.getlist', {
            SELECT: [
                "ID",
                "PARENT_ID",
                "NAME",
                "ACTIVE",
                "DESCRIPTION",
                "SORT",
                "CURRENCY",
            ],
            FILTER: {
                "@ID": [196, 197, 198],
            },
            ORDER: {

                SORT: "ASC",
                ID: "DESC",
            },
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
        'sale.delivery.getlist',
        [
            'SELECT' => [
                "ID",
                "PARENT_ID",
                "NAME",
                "ACTIVE",
                "DESCRIPTION",
                "SORT",
                "CURRENCY",
            ],
            'FILTER' => [
                "@ID" => [196, 197, 198],
            ],
            'ORDER' => [
                "SORT" => "ASC",
                "ID" => "DESC",
            ]
        ]
    );
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.delivery.getlist", b24.Params{
    	"SELECT": []string{"ID", "PARENT_ID", "NAME", "ACTIVE", "DESCRIPTION", "SORT", "CURRENCY"},
    	"FILTER": b24.Params{
    		"@ID": []int{196, 197, 198},
    	},
    	"ORDER": b24.Params{
    		"SORT": "ASC",
    		"ID":   "DESC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sale.delivery.getlist: %w", err)
    }

    var items []struct {
    	Name        string `json:"NAME"`
    	Active      string `json:"ACTIVE"`
    	Description string `json:"DESCRIPTION"`
    	Currency    string `json:"CURRENCY"`
    	ID          b24.ID `json:"ID"`
    	ParentID    b24.ID `json:"PARENT_ID"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Name, it.Active)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":[
        {
            "NAME":"Cargo",
            "ACTIVE":"Y",
            "DESCRIPTION":"Cargo Delivery",
            "CURRENCY":"RUB",
            "ID":198,
            "PARENT_ID":196,
            "SORT":500
        },
        {
            "NAME":"Taxi",
            "ACTIVE":"Y",
            "DESCRIPTION":"Taxi Delivery",
            "CURRENCY":"RUB",
            "ID":197,
            "PARENT_ID":196,
            "SORT":500
        },
        {
            "NAME":"Uber Taxi",
            "ACTIVE":"Y",
            "DESCRIPTION":"Uber Taxi Description",
            "CURRENCY":"RUB",
            "ID":196,
            "PARENT_ID":null,
            "SORT":500
        }
    ],
    "time":{
        "start":1714141661.751638,
        "finish":1714141661.945714,
        "duration":0.1940760612487793,
        "processing":0.013057947158813477,
        "date_start":"2024-04-26T17:27:41+03:00",
        "date_finish":"2024-04-26T17:27:41+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Массив служб доставки. Если ничего не найдено, возвращается пустой массив [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент result {#result}

Элемент содержит поля из `SELECT`. Без `SELECT` возвращаются все поля.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор службы доставки ||
|| **PARENT_ID**
[`integer`](../../../data-types.md) | Идентификатор родительской службы. У профиля — идентификатор службы, у службы верхнего уровня — `null` или `0` ||
|| **NAME**
[`string`](../../../data-types.md) | Название ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность: `Y` — активна, `N` — неактивна ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание. Может быть `null` ||
|| **CURRENCY**
[`string`](../../../data-types.md) | Символьный код валюты ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **LOGOTYPE**
[`integer`](../../../data-types.md) | Идентификатор файла логотипа или `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CHECK_FAILURE",
    "error_description": "FOO not allowed for select"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | FOO not allowed for select | В `SELECT` передано недоступное поле или поле не в верхнем регистре ||
|| `400` | `ERROR_CHECK_FAILURE` | FOO not allowed for filter | В `FILTER` передано недоступное поле или неподдерживаемый префикс ||
|| `400` | `ERROR_CHECK_FAILURE` | FOO not allowed for order | В `ORDER` передано недоступное поле ||
|| `400` | `ERROR_ARGUMENT` | Invalid order "BAD" | В `ORDER` передано направление, отличное от `asc` и `desc` ||
|| `400` | `100` | Unknown field definition `LOGOTYPE` (LOGOTYPE) for \Bitrix\Sale\Delivery\Services\ Entity. | В `FILTER` передано поле `LOGOTYPE`. Для фильтра по логотипу используйте `LOGOTIP` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-add.md)
- [{#T}](./sale-delivery-update.md)
- [{#T}](./sale-delivery-delete.md)
- [{#T}](./sale-delivery-config-update.md)
- [{#T}](./sale-delivery-config-get.md)
