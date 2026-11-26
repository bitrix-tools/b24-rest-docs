# Обновить службу доставки sale.delivery.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `sale.delivery.update` обновляет службу доставки или ее профиль.

{% note info "" %}

Метод работает только со службами и профилями, созданными на основе REST-обработчиков. Для остальных служб метод возвращает ошибку `ACCESS_DENIED`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_delivery_service.ID`](../../data-types.md#sale_delivery_service) | Идентификатор службы доставки или профиля.

Получить идентификатор можно методом [sale.delivery.getlist](./sale-delivery-get-list.md) или из ответа [sale.delivery.add](./sale-delivery-add.md) ||
|| **NAME**
[`string`](../../../data-types.md) | Название службы доставки. Пустое значение вызывает ошибку ||
|| **CURRENCY**
[`crm_currency.CURRENCY`](../../../crm/data-types.md#crm_currency) | Символьный код валюты, например `USD`.

Получить коды валют можно методом [crm.currency.list](../../../crm/currency/crm-currency-list.md). Метод не проверяет, что валюта существует. Валюта профилей службы при этом не меняется ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание службы доставки ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка. Нечисловое значение сохраняется как `0` ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность службы доставки. Возможные значения:
- `Y` — активна
- `N` — неактивна

Любое значение, кроме `Y`, сохраняется как `N` ||
|| **LOGOTYPE**
[`string`](../../../data-types.md) \| [`array`](../../../data-types.md) | Логотип службы доставки. Передайте содержимое файла в формате Base64 строкой или массивом `["имя_файла.png", "содержимое в Base64"]`.

Пустая строка удаляет логотип ||
|#

{% note info "" %}

Поля службы передавайте на верхнем уровне запроса, без обертки `FIELDS`. Метод меняет только переданные поля. Если не передать ни одного поля или передать их внутри `FIELDS`, метод вернет `true` и ничего не изменит.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":196,"NAME":"Uber Taxi New Name","CURRENCY":"USD","DESCRIPTION":"Uber Taxi New Description","SORT":100,"ACTIVE":"N","LOGOTYPE":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":196,"NAME":"Uber Taxi New Name","CURRENCY":"USD","DESCRIPTION":"Uber Taxi New Description","SORT":100,"ACTIVE":"N","LOGOTYPE":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'sale.delivery.update',
        params: {
          ID: 196,
          NAME: 'Uber Taxi New Name',
          CURRENCY: 'USD',
          DESCRIPTION: 'Uber Taxi New Description',
          SORT: 100,
          ACTIVE: 'N',
          LOGOTYPE: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Delivery updated:', result)
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
      async function updateDelivery() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.update',
            params: {
              ID: 196,
              NAME: 'Uber Taxi New Name',
              CURRENCY: 'USD',
              DESCRIPTION: 'Uber Taxi New Description',
              SORT: 100,
              ACTIVE: 'N',
              LOGOTYPE: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Delivery updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDelivery)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sale.delivery.update(
            bitrix_id=196,
            name='Uber Taxi New Name',
            currency='USD',
            description='Uber Taxi New Description',
            sort=100,
            active=False,
            logotype='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
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
                'sale.delivery.update',
                [
                    'ID'          => 196,
                    'NAME'        => 'Uber Taxi New Name',
                    'CURRENCY'    => 'USD',
                    'DESCRIPTION' => 'Uber Taxi New Description',
                    'SORT'        => 100,
                    'ACTIVE'      => 'N',
                    'LOGOTYPE'    => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating delivery: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.update',
        {
            ID: 196,
            NAME: 'Uber Taxi New Name',
            CURRENCY: 'USD',
            DESCRIPTION: 'Uber Taxi New Description',
            SORT: 100,
            ACTIVE: 'N',
            LOGOTYPE: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
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
        'sale.delivery.update',
        [
            'ID' => 196,
            'NAME' => 'Uber Taxi New Name',
            'CURRENCY' => 'USD',
            'DESCRIPTION' => 'Uber Taxi New Description',
            'SORT' => 100,
            'ACTIVE' => 'N',
            'LOGOTYPE' => 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sale.delivery.update", b24.Params{
    	"ID":          196,
    	"NAME":        "Uber Taxi New Name",
    	"CURRENCY":    "USD",
    	"DESCRIPTION": "Uber Taxi New Description",
    	"SORT":        100,
    	"ACTIVE":      "N",
    	"LOGOTYPE":    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    })
    if err != nil {
    	return fmt.Errorf("sale.delivery.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1713950516.938559,
        "finish": 1713950517.279213,
        "duration": 0.3406538963317871,
        "processing": 0.0717771053314209,
        "date_start": "2024-04-24T12:21:56+03:00",
        "date_finish": "2024-04-24T12:21:57+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | `true`, если служба доставки обновлена ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_DELIVERY_NOT_FOUND",
    "error_description": "Delivery not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter ID is not defined | Не передан параметр `ID` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter NAME should not be empty | В `NAME` передана пустая строка ||
|| `400` | `ERROR_DELIVERY_NOT_FOUND` | Delivery not found | Служба доставки с указанным `ID` не найдена ||
|| `400` | `ERROR_DELIVERY_UPDATE` | Текст ошибки сохранения | Не удалось сохранить службу доставки, текст ошибки — в `error_description` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM, служба создана не на основе REST-обработчика или обработчик создан другим приложением ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-add.md)
- [{#T}](./sale-delivery-get-list.md)
- [{#T}](./sale-delivery-delete.md)
- [{#T}](./sale-delivery-config-update.md)
- [{#T}](./sale-delivery-config-get.md)
