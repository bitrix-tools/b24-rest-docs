# Добавить заказ sale.order.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.add` создает заказ без позиций корзины, оплат и отгрузок и возвращает его поля. Позиции корзины, оплаты и отгрузки добавляют после создания методами [sale.basketitem.*](../basket-item/index.md), [sale.payment.*](../payment/index.md) и [sale.shipment.*](../shipment/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания заказа [(подробное описание)](#params-fields) ||
|#

### Параметр fields {#params-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`string`](../../data-types.md) | Идентификатор сайта, к которому относится заказ. В облачном Битрикс24 передавайте `s1`. После создания заказа поле изменить нельзя ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md#sale_person_type) | Идентификатор типа плательщика, например физического или юридического лица. Получите его методом [sale.persontype.list](../person-type/sale-person-type-list.md). Метод не проверяет, что такой тип плательщика существует. После создания заказа поле изменить нельзя ||
|| **currency***
[`string`](../../data-types.md) | Код валюты, например `RUB`. Получите список валют методом [crm.currency.list](../../crm/currency/crm-currency-list.md). После создания заказа поле изменить нельзя ||
|| **price**
[`double`](../../data-types.md) | Сумма заказа с учетом доставки ||
|| **discountValue**
[`double`](../../data-types.md) | Значение скидки ||
|| **statusId**
[`sale_status.id`](../data-types.md#sale_status) | Идентификатор статуса заказа. Получите список статусов методом [sale.status.list](../status/sale-status-list.md). Если не передать поле, заказ получит начальный статус `N` ||
|| **empStatusId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, изменившего статус заказа ||
|| **dateInsert**
[`datetime`](../../data-types.md) | Дата создания заказа ||
|| **marked**
[`string`](../../data-types.md) | Признак того, что заказ отмечен как проблемный. Битрикс24 ставит `Y` автоматически, если при сохранении заказа возникло предупреждение. Причину он записывает в поле `reasonMarked`.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **empMarkedId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, поставившего маркировку ||
|| **reasonMarked**
[`string`](../../data-types.md) | Причина, по которой заказ отмечен как проблемный ||
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

По умолчанию устанавливается `Y` ||
|| **affiliateId**
[`integer`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор аффилиата ||
|| **updated1c**
[`string`](../../data-types.md) | Обновлен ли заказ через 1С.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
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

По умолчанию устанавливается `N` ||
|| **canceled**
[`string`](../../data-types.md) | Был ли отменен заказ.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
|| **empCanceledId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, отменившего заказ ||
|| **reasonCanceled**
[`string`](../../data-types.md) | Причина отмены ||
|| **userId**
[`user.id`](../../data-types.md) | Идентификатор покупателя. После создания заказа поле изменить нельзя ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"lid":"s1","personTypeId":1,"currency":"RUB","statusId":"N","userId":1,"responsibleId":1,"userDescription":"Позвоните перед доставкой","comments":"Заказ из интеграции с сайтом"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"lid":"s1","personTypeId":1,"currency":"RUB","statusId":"N","userId":1,"responsibleId":1,"userDescription":"Позвоните перед доставкой","comments":"Заказ из интеграции с сайтом"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.order.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type OrderResult = {
      order: {
        accountNumber: string
        canceled: string
        clients: Record<string, unknown>[]
        comments: string
        currency: string
        dateInsert: ISODate | null
        dateStatus: ISODate | null
        dateUpdate: ISODate | null
        deducted: string
        empStatusId: number
        id: number
        lid: string
        payed: string
        personTypeId: number
        personTypeXmlId: string
        propertyValues: Record<string, unknown>[]
        requisiteLink: Record<string, number>
        responsibleId: number
        statusId: string
        statusXmlId: string
        updated1c: string
        userDescription: string
        userId: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<OrderResult>({
        method: 'sale.order.add',
        params: {
          fields: {
            lid: 's1',
            personTypeId: 1,
            currency: 'RUB',
            statusId: 'N',
            userId: 1,
            responsibleId: 1,
            userDescription: 'Позвоните перед доставкой',
            comments: 'Заказ из интеграции с сайтом',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.order.id, result.order.accountNumber)
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
      async function addOrder() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.order.add',
            params: {
              fields: {
                lid: 's1',
                personTypeId: 1,
                currency: 'RUB',
                statusId: 'N',
                userId: 1,
                responsibleId: 1,
                userDescription: 'Позвоните перед доставкой',
                comments: 'Заказ из интеграции с сайтом',
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
          console.info(result.order.id, result.order.accountNumber)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addOrder)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "lid": "s1",
        "personTypeId": 1,
        "currency": "RUB",
        "statusId": "N",
        "userId": 1,
        "responsibleId": 1,
        "userDescription": "Позвоните перед доставкой",
        "comments": "Заказ из интеграции с сайтом",
    }

    try:
        bitrix_response = client.sale.order.add(
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
                'sale.order.add',
                [
                    'fields' => [
                        'lid'             => 's1',
                        'personTypeId'    => 1,
                        'currency'        => 'RUB',
                        'statusId'        => 'N',
                        'userId'          => 1,
                        'responsibleId'   => 1,
                        'userDescription' => 'Позвоните перед доставкой',
                        'comments'        => 'Заказ из интеграции с сайтом',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding order: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.order.add',
        {
            fields: {
                lid: 's1',
                personTypeId: 1,
                currency: 'RUB',
                statusId: 'N',
                userId: 1,
                responsibleId: 1,
                userDescription: 'Позвоните перед доставкой',
                comments: 'Заказ из интеграции с сайтом',
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
        'sale.order.add',
        [
            'fields' => [
                'lid' => 's1',
                'personTypeId' => 1,
                'currency' => 'RUB',
                'statusId' => 'N',
                'userId' => 1,
                'responsibleId' => 1,
                'userDescription' => 'Позвоните перед доставкой',
                'comments' => 'Заказ из интеграции с сайтом',
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
    res, err := client.Core().Call(ctx, "sale.order.add", b24.Params{
    	"fields": b24.Params{
    		"lid":             "s1",
    		"personTypeId":    1,
    		"currency":        "RUB",
    		"statusId":        "N",
    		"userId":          1,
    		"responsibleId":   1,
    		"userDescription": "Позвоните перед доставкой",
    		"comments":        "Заказ из интеграции с сайтом",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.order.add: %w", err)
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
            "accountNumber": "971",
            "canceled": "N",
            "clients": [
                {
                    "entityId": 2819,
                    "entityTypeId": 3,
                    "id": 1717,
                    "isPrimary": "Y",
                    "orderId": 971
                }
            ],
            "comments": "Заказ из интеграции с сайтом",
            "currency": "RUB",
            "dateInsert": "2026-09-28T08:02:16+03:00",
            "dateStatus": "2026-09-28T08:02:15+03:00",
            "dateUpdate": "2026-09-28T08:02:16+03:00",
            "deducted": "N",
            "empStatusId": 1,
            "id": 971,
            "lid": "s1",
            "payed": "N",
            "personTypeId": 1,
            "personTypeXmlId": "",
            "propertyValues": [
                {
                    "code": "EMAIL",
                    "id": 11287,
                    "name": "E-Mail",
                    "orderPropsId": 41,
                    "orderPropsXmlId": "bx_60b605ba1d082"
                },
                {
                    "code": "FIO",
                    "id": 11289,
                    "name": "Ф.И.О.",
                    "orderPropsId": 39,
                    "orderPropsXmlId": "bx_609bec7cc794c"
                }
            ],
            "requisiteLink": {
                "mcBankDetailId": 0,
                "mcRequisiteId": 0,
                "requisiteId": 467
            },
            "responsibleId": 1,
            "statusId": "N",
            "statusXmlId": "",
            "updated1c": "N",
            "userDescription": "Позвоните перед доставкой",
            "userId": 1,
            "xmlId": "bx_6aba02e7a86af"
        }
    },
    "time": {
        "start": 1790575335,
        "finish": 1790575336.454058,
        "duration": 1.4540579319000244,
        "processing": 1,
        "date_start": "2026-09-28T09:02:15+03:00",
        "date_finish": "2026-09-28T09:02:16+03:00",
        "operating_reset_at": 1790575935,
        "operating": 0.7697091102600098
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
[`sale_order`](../data-types.md#sale_order) | Созданный заказ. Идентификатор заказа для других методов — в поле `id`. В ответ попадают только заполненные поля заказа, а также `clients`, `requisiteLink` и `propertyValues` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: personTypeId, currency, lid"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | `Required fields: personTypeId, currency, lid` | Не переданы обязательные поля, их имена перечислены в тексте ошибки ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Не передан параметр `fields` ||
|| `400` | `200040300020` | `Access Denied` | Недостаточно прав для добавления заказа ||
|| `400` | `0` | Текст ошибки сохранения | Заказ не сохранен по другой причине, она указана в `error_description` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-order-update.md)
- [{#T}](./sale-order-get.md)
- [{#T}](./sale-order-list.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)