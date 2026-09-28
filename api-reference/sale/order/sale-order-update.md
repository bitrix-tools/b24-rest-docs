# Изменить заказ sale.order.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.update` изменяет поля заказа и возвращает заказ после изменения.

Позиции корзины, оплаты и отгрузки метод не меняет — для них есть методы [sale.basketitem.*](../basket-item/index.md), [sale.payment.*](../payment/index.md) и [sale.shipment.*](../shipment/index.md).

{% note warning "" %}

Поля, которые нельзя изменить, метод пропускает без ошибки: ответ будет успешным, но значения останутся прежними. Таких полей две группы:

- `lid`, `personTypeId`, `currency`, `userId` — задаются только при создании заказа
- `id`, `accountNumber`, `payed`, `deducted` и другие поля только для чтения — их формирует Битрикс24

Какие поля можно изменить, показывают признаки `isImmutable` и `isReadOnly` в ответе [sale.order.getFields](./sale-order-get-fields.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order.id`](../data-types.md#sale_order) | Идентификатор заказа. Его возвращают методы [sale.order.add](./sale-order-add.md) и [sale.order.list](./sale-order-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля, которые нужно изменить. Непереданные поля сохраняют прежние значения, пустой объект вернет заказ без изменений [(подробное описание)](#params-fields) ||
|#

### Параметр fields {#params-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **price**
[`double`](../../data-types.md) | Сумма заказа с учетом доставки ||
|| **discountValue**
[`double`](../../data-types.md) | Значение скидки ||
|| **statusId**
[`sale_status.id`](../data-types.md#sale_status) | Идентификатор статуса заказа. Список статусов возвращает метод [sale.status.list](../status/sale-status-list.md) ||
|| **empStatusId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, изменившего статус заказа ||
|| **dateInsert**
[`datetime`](../../data-types.md) | Дата создания заказа ||
|| **marked**
[`string`](../../data-types.md) | Признак того, что заказ отмечен как проблемный. Битрикс24 ставит `Y` автоматически, если при сохранении заказа возникло предупреждение. Причину Битрикс24 записывает в поле `reasonMarked`.

- `Y` — да
- `N` — нет
||
|| **empMarkedId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, поставившего маркировку ||
|| **reasonMarked**
[`string`](../../data-types.md) | Причина, по которой заказ был промаркирован ||
|| **userDescription**
[`string`](../../data-types.md) | Комментарий покупателя к заказу ||
|| **additionalInfo**
[`string`](../../data-types.md) | Устаревший.

Дополнительная информация ||
|| **comments**
[`string`](../../data-types.md) | Комментарий менеджера к заказу ||
|| **companyId**
[`integer`](../../data-types.md) | Идентификатор компании из модуля «Интернет-магазин» ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, ответственного за заказ ||
|| **recurringId**
[`string`](../../data-types.md) | Идентификатор продления подписки ||
|| **lockedBy**
[`string`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор пользователя, заблокировавшего заказ. Заказ блокируется в административной панели, когда пользователь открывает детальную карточку заказа ||
|| **recountFlag**
[`string`](../../data-types.md) | Устаревший.

Флаг пересчета.

- `Y` — да
- `N` — нет
||
|| **affiliateId**
[`integer`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор аффилиата ||
|| **updated1c**
[`string`](../../data-types.md) | Обновлен ли заказ через 1С.

- `Y` — да
- `N` — нет
||
|| **orderTopic**
[`string`](../../data-types.md) | Устаревший.

Тема заказа ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **id1c**
[`string`](../../data-types.md) | Идентификатор в 1С ||
|| **version1c**
[`string`](../../data-types.md) | Версия в 1С ||
|| **externalOrder**
[`string`](../../data-types.md) | Заказ из внешней системы или нет.

- `Y` — да
- `N` — нет
||
|| **canceled**
[`string`](../../data-types.md) | Был ли отменен заказ.

- `Y` — да
- `N` — нет
||
|| **empCanceledId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, отменившего заказ ||
|| **reasonCanceled**
[`string`](../../data-types.md) | Причина отмены ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":300,"fields":{"statusId":"P","responsibleId":1,"comments":"Оплата получена, заказ передан на сборку"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":300,"fields":{"statusId":"P","responsibleId":1,"comments":"Оплата получена, заказ передан на сборку"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.order.update

    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type OrderUpdateResult = {
      order: {
        accountNumber: string
        additionalInfo: string
        affiliateId: number | null
        canceled: string
        clients: Record<string, unknown>[]
        comments: string
        companyId: number | null
        currency: string
        dateCanceled: ISODate | null
        dateInsert: ISODate | null
        dateLock: ISODate | null
        dateMarked: ISODate | null
        dateStatus: ISODate | null
        dateUpdate: ISODate | null
        deducted: string
        discountValue: number
        empCanceledId: number | null
        empMarkedId: number | null
        empStatusId: number
        externalOrder: string
        id: number
        id1c: string
        lid: string
        lockedBy: string
        marked: string
        orderTopic: string
        payed: string
        personTypeId: number
        personTypeXmlId: string
        price: number
        propertyValues: Record<string, unknown>[]
        reasonCanceled: string
        reasonMarked: string
        recountFlag: string
        recurringId: string
        requisiteLink: Record<string, number>
        responsibleId: number
        statusId: string
        statusXmlId: string
        taxValue: number
        updated1c: string
        userDescription: string
        userId: number
        version: number
        version1c: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<OrderUpdateResult>({
        method: 'sale.order.update',
        params: {
          id: 300,
          fields: {
            statusId: 'P',
            responsibleId: 1,
            comments: 'Оплата получена, заказ передан на сборку',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.order.id, result.order.statusId, result.order.price)
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
      async function updateOrder() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.order.update',
            params: {
              id: 300,
              fields: {
                statusId: 'P',
                responsibleId: 1,
                comments: 'Оплата получена, заказ передан на сборку',
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
          console.info(result.order.id, result.order.statusId, result.order.price)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateOrder)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "statusId": "P",
        "responsibleId": 1,
        "comments": "Оплата получена, заказ передан на сборку",
    }

    try:
        bitrix_response = client.sale.order.update(
            bitrix_id=300,
            fields=fields,
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
                'sale.order.update',
                [
                    'id' => 300,
                    'fields' => [
                        'statusId'      => 'P',
                        'responsibleId' => 1,
                        'comments'      => 'Оплата получена, заказ передан на сборку',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating sale order: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.order.update',
        {
            id: 300,
            fields: {
                statusId: 'P',
                responsibleId: 1,
                comments: 'Оплата получена, заказ передан на сборку',
            }
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
        'sale.order.update',
        [
            'id' => 300,
            'fields' => [
                'statusId' => 'P',
                'responsibleId' => 1,
                'comments' => 'Оплата получена, заказ передан на сборку',
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
    res, err := client.Core().Call(ctx, "sale.order.update", b24.Params{
    	"id": 300,
    	"fields": b24.Params{
    		"statusId":      "P",
    		"responsibleId": 1,
    		"comments":      "Оплата получена, заказ передан на сборку",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.order.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "order".
    raw, ok := b24.Unwrap(res.Result, "order")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа order")
    }

    var item struct {
    	ID            b24.ID `json:"id"`
    	AccountNumber string `json:"accountNumber"`
    	StatusID      string `json:"statusId"`
    	Comments      string `json:"comments"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.AccountNumber, item.StatusID, item.Comments)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "order": {
            "accountNumber": "300",
            "additionalInfo": "",
            "affiliateId": null,
            "canceled": "N",
            "clients": [
                {
                    "entityId": 2819,
                    "entityTypeId": 3,
                    "id": 1717,
                    "isPrimary": "Y",
                    "orderId": 300,
                    "roleId": 0,
                    "sort": 0
                }
            ],
            "comments": "Оплата получена, заказ передан на сборку",
            "companyId": null,
            "currency": "RUB",
            "dateCanceled": null,
            "dateInsert": "2026-09-28T08:02:16+03:00",
            "dateLock": null,
            "dateMarked": null,
            "dateStatus": "2026-09-28T08:02:16+03:00",
            "dateUpdate": "2026-09-28T08:02:16+03:00",
            "deducted": "N",
            "discountValue": 0,
            "empCanceledId": null,
            "empMarkedId": null,
            "empStatusId": 1,
            "externalOrder": "N",
            "id": 300,
            "id1c": "",
            "lid": "s1",
            "lockedBy": "",
            "marked": "N",
            "orderTopic": "",
            "payed": "N",
            "personTypeId": 1,
            "personTypeXmlId": "",
            "price": 0,
            "propertyValues": [
                {
                    "code": "EMAIL",
                    "id": 11287,
                    "name": "E-Mail",
                    "orderPropsId": 41,
                    "orderPropsXmlId": "bx_60b605ba1d082",
                    "value": null
                },
                {
                    "code": "FIO",
                    "id": 11289,
                    "name": "Ф.И.О.",
                    "orderPropsId": 39,
                    "orderPropsXmlId": "bx_609bec7cc794c",
                    "value": null
                }
            ],
            "reasonCanceled": "",
            "reasonMarked": "",
            "recountFlag": "Y",
            "recurringId": "",
            "requisiteLink": {
                "bankDetailId": 0,
                "mcBankDetailId": 0,
                "mcRequisiteId": 0,
                "requisiteId": 467
            },
            "responsibleId": 1,
            "statusId": "P",
            "statusXmlId": "",
            "taxValue": 0,
            "updated1c": "N",
            "userDescription": "Позвоните перед доставкой",
            "userId": 1,
            "version": 1,
            "version1c": "",
            "xmlId": "bx_6aba02e7a86af"
        }
    },
    "time": {
        "start": 1790575336,
        "finish": 1790575336.994123,
        "duration": 0.9941229820251465,
        "processing": 0,
        "date_start": "2026-09-28T09:02:16+03:00",
        "date_finish": "2026-09-28T09:02:16+03:00",
        "operating_reset_at": 1790575936,
        "operating": 0.22028803825378418
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`sale_order`](../data-types.md#sale_order) | Заказ после изменения. Кроме полей заказа содержит `clients`, `requisiteLink`, `propertyValues`, а если они есть у заказа — `basketItems` и `shipments`. Связанные объекты описаны на странице [sale.order.get](./sale-order-get.md#order-related) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200540400001",
    "error_description": "order is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200540400001` | `order is not exists` | Заказа с таким `id` нет ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Не передан параметр `fields` ||
|| `400` | `100` | `Bitrix\Sale\Order constructor must be is public` | Не передан параметр `id` ||
|| `400` | `200040300020` | `Access Denied` | Недостаточно прав для изменения заказа ||
|| `400` | `0` | Текст ошибки сохранения | Заказ не сохранен по другой причине, она указана в `error_description` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-order-add.md)
- [{#T}](./sale-order-get.md)
- [{#T}](./sale-order-list.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)