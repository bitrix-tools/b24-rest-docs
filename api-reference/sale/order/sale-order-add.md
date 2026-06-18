# Добавить заказ sale.order.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.order.add` предназначен для добавления заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../data-types.md) | Значения полей для создания заказа ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`string`](../../data-types.md) | Идентификатор сайта, на котором будет использоваться данный тип плательщика. Имеет постоянное значение 's1' ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md) | Идентификатор типа плательщика ||
|| **currency***
[`string`](../../data-types.md) | Валюта. Список валют можно получить через метод [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|| **price**
[`double`](../../data-types.md) | Цена ||
|| **discountValue**
[`double`](../../data-types.md) | Значение скидки ||
|| **statusId**
[`sale_status.id`](../data-types.md) | Идентификатор статуса заказа ||
|| **empStatusId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, изменившего статус заказа ||
|| **dateInsert**
[`datetime`](../../data-types.md) | Дата создания заказа ||
|| **marked**
[`string`](../../data-types.md) | Флаг маркировки. Признак того, является ли отгрузка отмеченной как проблемная. Значение `Y` ставится автоматически, если при сохранении произошла ошибка.

- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` ||
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
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор пользователя, ответственного за заказ ||
|| **recurringId**
[`integer`](../../data-types.md) | Идентификатор продления подписки ||
|| **lockedBy**
[`user.id`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор пользователя, заблокировавшего заказ. Заказ блокируется в административной панели, когда пользователь открывает детальную карточку заказа ||
|| **recountFlag**
[`string`](../../data-types.md) | Устаревший.

Флаг пересчёта.

- `Y` — да
- `N` — нет

По умолчанию устанавливается Y ||
|| **affiliateId**
[`integer`](../../data-types.md) | Актуально только для коробочной версии.

Идентификатор аффилиата ||
|| **updated1c**
[`string`](../../data-types.md) | Обновлён ли через 1С.

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
[`string`](../../data-types.md) | Версия в 1с ||
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
[`user.id`](../../data-types.md) | Идентификатор клиента ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"lid":"s1","personTypeId":1,"currency":"RUB","price":100,"discountValue":10,"statusId":"N","empStatusId":1,"dateInsert":"2024-03-01T14:00:00","marked":"Y","empMarkedId":1,"reasonMarked":"","userDescription":"","additionalInfo":"","comments":"","companyId":1,"responsibleId":1,"recurringId":1,"lockedBy":1,"recountFlag":"N","affiliateId":1,"updated1c":"N","orderTopic":"","xmlId":"","id1c":"","version1c":"","externalOrder":"N","canceled":"Y","empCanceledId":1,"reasonCanceled":"","userId":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.order.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"lid":"s1","personTypeId":1,"currency":"RUB","price":100,"discountValue":10,"statusId":"N","empStatusId":1,"dateInsert":"2024-03-01T14:00:00","marked":"Y","empMarkedId":1,"reasonMarked":"","userDescription":"","additionalInfo":"","comments":"","companyId":1,"responsibleId":1,"recurringId":1,"lockedBy":1,"recountFlag":"N","affiliateId":1,"updated1c":"N","orderTopic":"","xmlId":"","id1c":"","version1c":"","externalOrder":"N","canceled":"Y","empCanceledId":1,"reasonCanceled":"","userId":1},"auth":"**put_access_token_here**"}' \
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
        additionalInfo: string
        affiliateId: number
        canceled: string
        clients: unknown[]
        comments: string
        companyId: number
        currency: string
        dateCanceled: ISODate | null
        dateInsert: ISODate | null
        dateMarked: ISODate | null
        dateStatus: ISODate | null
        dateUpdate: ISODate | null
        deducted: string
        discountValue: number
        empCanceledId: number
        empMarkedId: number
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
        reasonCanceled: string
        reasonMarked: string
        recountFlag: string
        recurringId: string
        requisiteLink: unknown[]
        responsibleId: number
        statusId: string
        statusXmlId: string
        updated1c: string
        userDescription: string
        userId: number
        version1c: string
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
            price: 100,
            discountValue: 10,
            statusId: 'N',
            empStatusId: 1,
            dateInsert: '2024-03-01T14:00:00',
            marked: 'Y',
            empMarkedId: 1,
            reasonMarked: '',
            userDescription: '',
            additionalInfo: '',
            comments: '',
            companyId: 1,
            responsibleId: 1,
            recurringId: 1,
            lockedBy: 1,
            recountFlag: 'N',
            affiliateId: 1,
            updated1c: 'N',
            orderTopic: '',
            xmlId: '',
            id1c: '',
            version1c: '',
            externalOrder: 'N',
            canceled: 'Y',
            empCanceledId: 1,
            reasonCanceled: '',
            userId: 1,
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
                price: 100,
                discountValue: 10,
                statusId: 'N',
                empStatusId: 1,
                dateInsert: '2024-03-01T14:00:00',
                marked: 'Y',
                empMarkedId: 1,
                reasonMarked: '',
                userDescription: '',
                additionalInfo: '',
                comments: '',
                companyId: 1,
                responsibleId: 1,
                recurringId: 1,
                lockedBy: 1,
                recountFlag: 'N',
                affiliateId: 1,
                updated1c: 'N',
                orderTopic: '',
                xmlId: '',
                id1c: '',
                version1c: '',
                externalOrder: 'N',
                canceled: 'Y',
                empCanceledId: 1,
                reasonCanceled: '',
                userId: 1,
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.order.add',
                [
                    'fields' => [
                        'lid'            => 's1',
                        'personTypeId'   => 1,
                        'currency'       => 'RUB',
                        'price'          => 100,
                        'discountValue'  => 10,
                        'statusId'       => 'N',
                        'empStatusId'    => 1,
                        'dateInsert'     => '2024-03-01T14:00:00',
                        'marked'         => 'Y',
                        'empMarkedId'    => 1,
                        'reasonMarked'   => '',
                        'userDescription' => '',
                        'additionalInfo' => '',
                        'comments'       => '',
                        'companyId'      => 1,
                        'responsibleId'  => 1,
                        'recurringId'    => 1,
                        'lockedBy'       => 1,
                        'recountFlag'    => 'N',
                        'affiliateId'    => 1,
                        'updated1c'      => 'N',
                        'orderTopic'     => '',
                        'xmlId'          => '',
                        'id1c'           => '',
                        'version1c'      => '',
                        'externalOrder'  => 'N',
                        'canceled'       => 'Y',
                        'empCanceledId'  => 1,
                        'reasonCanceled' => '',
                        'userId'         => 1,
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
                price: 100,
                discountValue: 10,
                statusId: 'N',
                empStatusId: 1,
                dateInsert: '2024-03-01T14:00:00',
                marked: 'Y',
                empMarkedId: 1,
                reasonMarked: '',
                userDescription: '',
                additionalInfo: '',
                comments: '',
                companyId: 1,
                responsibleId: 1,
                recurringId: 1,
                lockedBy: 1,
                recountFlag: 'N',
                affiliateId: 1,
                updated1c: 'N',
                orderTopic: '',
                xmlId: '',
                id1c: '',
                version1c: '',
                externalOrder: 'N',
                canceled: 'Y',
                empCanceledId: 1,
                reasonCanceled: '',
                userId: 1,
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
                'price' => 100,
                'discountValue' => 10,
                'statusId' => 'N',
                'empStatusId' => 1,
                'dateInsert' => '2024-03-01T14:00:00',
                'marked' => 'Y',
                'empMarkedId' => 1,
                'reasonMarked' => '',
                'userDescription' => '',
                'additionalInfo' => '',
                'comments' => '',
                'companyId' => 1,
                'responsibleId' => 1,
                'recurringId' => 1,
                'lockedBy' => 1,
                'recountFlag' => 'N',
                'affiliateId' => 1,
                'updated1c' => 'N',
                'orderTopic' => '',
                'xmlId' => '',
                'id1c' => '',
                'version1c' => '',
                'externalOrder' => 'N',
                'canceled' => 'Y',
                'empCanceledId' => 1,
                'reasonCanceled' => '',
                'userId' => 1,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "order": {
            "accountNumber": "455",
            "additionalInfo": "",
            "affiliateId": 1,
            "canceled": "Y",
            "clients": [],
            "comments": "",
            "companyId": 1,
            "currency": "RUB",
            "dateCanceled": "2024-04-12T13:50:21+03:00",
            "dateInsert": "2024-03-01T13:00:00+03:00",
            "dateMarked": "2024-04-12T13:50:21+03:00",
            "dateStatus": "2024-04-12T13:50:21+03:00",
            "dateUpdate": "2024-04-12T13:50:21+03:00",
            "deducted": "N",
            "discountValue": 10,
            "empCanceledId": 1,
            "empMarkedId": 1,
            "empStatusId": 1,
            "externalOrder": "N",
            "id": 299,
            "id1c": "",
            "lid": "s1",
            "lockedBy": "1",
            "marked": "Y",
            "orderTopic": "",
            "payed": "N",
            "personTypeId": 1,
            "personTypeXmlId": "",
            "price": 100,
            "reasonCanceled": "",
            "reasonMarked": "",
            "recountFlag": "N",
            "recurringId": "1",
            "requisiteLink": [],
            "responsibleId": 1,
            "statusId": "N",
            "statusXmlId": "",
            "updated1c": "N",
            "userDescription": "",
            "userId": 1,
            "version1c": "",
            "xmlId": ""
        }
    },
    "time": {
        "start": 1712922620.724857,
        "finish": 1712922623.393783,
        "duration": 2.6689260005950928,
        "processing": 2.210068941116333,
        "date_start": "2024-04-12T14:50:20+03:00",
        "date_finish": "2024-04-12T14:50:23+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **order**
[`sale_order`](../data-types.md) | Объект с информацией о добавленном заказе ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300020,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для добавления заказа ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-order-update.md)
- [{#T}](./sale-order-get.md)
- [{#T}](./sale-order-list.md)
- [{#T}](./sale-order-delete.md)
- [{#T}](./sale-order-get-fields.md)