# Добавить оплату crm.item.payment.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: требуется право на изменение объекта CRM, в который добавляется оплата

Метод `crm.item.payment.add` создает пустую оплату с суммой `0` в сделке или счете. Товары и доставку в оплату добавляют методы [crm.item.payment.product.add](./products-in-payment/crm-item-payment-product-add.md) и [crm.item.payment.delivery.add](./delivery-in-payment/crm-item-payment-delivery-add.md), сумма оплаты при этом пересчитывается автоматически.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../../../api-reference/data-types.md) | Идентификатор сделки или счета. Получить идентификатор можно методом [crm.item.list](../crm-item-list.md) ||
|| **entityTypeId***
[`integer`](../../../../api-reference/data-types.md) | Идентификатор [типа объекта CRM](../../data-types.md#object_type). Оплаты поддерживают только два типа:
- `2` — сделка
- `31` — счет

Для других типов, например для лида `1` или смарт-процесса, метод вернет ошибку `Для данной сущности функционал создания оплат недоступен` ||
|| **fields**
[`object`](../../../../api-reference/data-types.md) | Поля новой оплаты. Поддерживается один ключ:
- `paySystemId` — идентификатор платежной системы. Получить список платежных систем можно методом [sale.paysystem.list](../../../pay-system/sale-pay-system-list.md)

Если параметр не передан, оплата получает платежную систему по умолчанию. Остальные ключи метод игнорирует ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13123,"entityTypeId":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.payment.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityId":13123,"entityTypeId":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.payment.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.item.payment.add',
        params: {
          entityId: 13123,
          entityTypeId: 2,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created payment ID:', result)
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
      async function addPayment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.payment.add',
            params: {
              entityId: 13123,
              entityTypeId: 2,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created payment ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPayment)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.item.payment.add(
            entity_id=13123,
            entity_type_id=2,
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
                'crm.item.payment.add',
                [
                    'entityId'     => 13123,
                    'entityTypeId' => 2,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding payment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.payment.add', {
            entityId: 13123,
            entityTypeId: 2
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.payment.add',
        [
            'entityId' => 13123,
            'entityTypeId' => 2
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.item.payment.add", b24.Params{
    	"entityId":     13123,
    	"entityTypeId": 2,
    })
    if err != nil {
    	return fmt.Errorf("crm.item.payment.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1033,
    "time": {
        "start": 1716193064.749158,
        "finish": 1716193065.656833,
        "duration": 0.90767502784729,
        "processing": 0.6450831890106201,
        "date_start": "2024-05-20T11:17:44+03:00",
        "date_finish": "2024-05-20T11:17:45+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор созданной оплаты ||
|| **time**
[`time`](../../../../api-reference/data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Для данной сущности функционал создания оплат недоступен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Для данной сущности функционал создания оплат недоступен | Передан `entityTypeId`, который не поддерживает оплаты. Оплаты поддерживают только сделки `2` и счета `31` ||
|| `400` | `0` | Сущность с идентификатором №`entityId` не существует | Объект CRM с переданным `entityId` не найден ||
|| `400` | `0` | Вы достигли лимита создания оплат для вашего тарифного плана | Достигнут лимит оплат на тарифе Битрикс24 ||
|| `400` | `ACCESS_DENIED` | Access denied | Нет права на изменение объекта CRM или передан несуществующий `entityTypeId` ||
|| `400` | `100` | Could not find value for parameter {`имя параметра`} | Не передан обязательный параметр `entityId` или `entityTypeId` ||
|#

Код `0` метод возвращает для нескольких разных ошибок. Чтобы определить причину, проверяйте текст в `error_description`.

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./products-in-payment/index.md)
- [{#T}](./delivery-in-payment/index.md)
- [{#T}](./crm-item-payment-delete.md)
- [{#T}](./crm-item-payment-get.md)
- [{#T}](./crm-item-payment-list.md)
- [{#T}](./crm-item-payment-pay.md)
- [{#T}](./crm-item-payment-unpay.md)
- [{#T}](./crm-item-payment-update.md)