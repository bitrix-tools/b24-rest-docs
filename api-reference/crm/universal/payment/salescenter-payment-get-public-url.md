# Сгенерировать ссылку на определенную оплату salescenter.payment.getPublicUrl

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`salescenter`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод генерирует ссылку на определенную оплату. Способ оплаты при выборе будет передан в эту конкретную оплату. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_payment.id`](../../../sale/data-types.md#sale_order_payment) | Идентификатор оплаты ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1063}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/salescenter.payment.getPublicUrl
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1063,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/salescenter.payment.getPublicUrl
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SalesCenterPaymentGetPublicUrlResult = {
      payment: {
        url: string
        shortUrl: string
        qr: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<SalesCenterPaymentGetPublicUrlResult>({
        method: 'salescenter.payment.getPublicUrl',
        params: {
          id: 1063,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Payment URL:', result.payment.url)
        console.info('Short URL:', result.payment.shortUrl)
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
      async function getPaymentPublicUrl() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'salescenter.payment.getPublicUrl',
            params: {
              id: 1063,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Payment URL:', result.payment.url)
          console.info('Short URL:', result.payment.shortUrl)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPaymentPublicUrl)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'salescenter.payment.getPublicUrl',
                [
                    'id' => 1063,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting public URL: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'salescenter.payment.getPublicUrl', {
            id: 1063,
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
        'salescenter.payment.getPublicUrl',
        [
            'id' => 1063
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
    "result":{
        "payment":{
            "url":"http:\/\/portal.home\/pub\/site\/10\/oformleniezakaza\/?orderId=3689\u0026access=f83b5926bd8cb4f0248b4b5a8e48b6fb\u0026paymentId=1063",
            "shortUrl":"http:\/\/portal.home\/~tR9sB",
            "qr":"iVBORw0KGgoAAAANSUhEUgAAAXwAAAF8CAYAAADM5wDKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAHaElEQVR4nO3csW7jVhRF0SjQ\/\/+y0owFN4GVeYou7+y1KhdjiCI5G8\/NuT0ej8dfAPzx\/p6+AAA+4\/71w+12m7wOXnDyx9jJ8536I7D2Tm78Y7v2jDb6\/l454QNECD5AhOADRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkCE4ANECD5AxP3nf\/KzjbOuUzbOyU5d88Y56Kl7tXH+Wjde9673ygkfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASLeMo98YuNc8MZZ16lrPnm+tanhjRPHU3Tj9zjhA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkDE+Dwy\/JuNk85wZU74ABGCDxAh+AARgg8QIfgAEYIPECH4ABGCDxAh+AARgg8QIfgAEYIPECH4ABGCDxBhHjli4+TvyTWfTCuf\/O7UNcMrnPABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIGJ8Htkk7PVNPaOpSWdT0te38ZqvwAkfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASLeMo+8cU6Wz5ia7d34uTXu1ec54QNECD5AhOADRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkCE4ANECD5AxHMe+WQSFv4Ptfncjd9XN3ZxwgeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyAiNvj176padbXTd2rk+\/r+f7ZNj7fKeVuOOEDRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QMT964ep6V2Tv6\/b+H03cp+vb2OvrsAJHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEinvPItYnjqZnTjdO7G+\/VyTVv\/L4bbZwa3t5JJ3yACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiLg9Nm6U\/mJa+XVT06yLXy9eYNJ5Fyd8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4i4f\/2wceZ040wxr6vNX5+oTVhvvOYT73q+TvgAEYIPECH4ABGCDxAh+AARgg8QIfgAEYIPECH4ABGCDxAh+AARgg8QIfgAEYIPEPGcR944N7pxEnbjfZ5ycq+mppU3TmdvvOaNrnCfnfABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIOI5jzw13Tk1Fzw1rbxx0rlm47txYuM1X2Fq+L+6wn12wgeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyAiNtjeHO3NnM6ZeN9nrJxsvvExveZ3+OEDxAh+AARgg8QIfgAEYIPECH4ABGCDxAh+AARgg8QIfgAEYIPECH4ABGCDxAh+AAR968fzOd+xsl93jhju3FqeOoZnfzu1PfdaOM7+a5rdsIHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gIjnPPLG6d2N3OfPKE\/gbvncE1OTzlPP912f64QPECH4ABGCDxAh+AARgg8QIfgAEYIPECH4ABGCDxAh+AARgg8QIfgAEYIPECH4ABHPeeSpuVFedzKvagL3dRvv1ZSNc9Abr\/ldnPABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIOL+8z\/52fbJ0E+amvytzV9PvZO1\/wsbv295ltkJHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEi3jKPfGLjbG9tEnZq1vXkczde85SN13ziCjPFU5zwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBC8AEiBB8gQvABIgQfIELwASIEHyBifB6Z6zOt\/BlT07sbn9GUjdf8nRM+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0SYR47YOPlrtvfPtvHdODE12f39+zrhA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkCE4ANECD5AhOADRAg+QITgA0QIPkDE+Dzy1FQpr6tNDW\/8vrW54I2u0DonfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIeMs8cm3mlNdtnBo+cYUJ3E+qzTJvv2YnfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIEHyACMEHiBB8gAjBB4gQfIAIwQeIuD1qe64AUU74ABGCDxDxD3Dwaiq9kYVcAAAAAElFTkSuQmCC"
        }
    },
    "time":{
        "start":1718372619.163703,
        "finish":1718372619.567831,
        "duration":0.4041280746459961,
        "processing":0.15733885765075684,
        "date_start":"2024-06-14T16:43:39+03:00",
        "date_finish":"2024-06-14T16:43:39+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **result.payment**
[`object`](../../../data-types.md) | Объект с данными ссылки на оплату ||
|| **result.payment.url**
[`string`](../../../data-types.md) | Ссылка на оплату ||
|| **result.payment.shortUrl**
[`string`](../../../data-types.md) | Короткая ссылка на оплату ||
|| **result.payment.qr**
[`string`](../../../data-types.md) | QR-код, содержащий короткую ссылку на оплату ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200640400001,
    "error_description":"payment is not exists"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200640400001` | Оплата не найдена ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-payment-add.md)
- [{#T}](./crm-item-payment-update.md)
- [{#T}](./crm-item-payment-get.md)
- [{#T}](./crm-item-payment-list.md)
- [{#T}](./crm-item-payment-pay.md)
- [{#T}](./crm-item-payment-unpay.md)
- [{#T}](./crm-item-payment-delete.md)
