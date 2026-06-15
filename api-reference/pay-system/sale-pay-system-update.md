# Изменить платежную систему sale.paysystem.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод изменяет платежную систему.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_paysystem.ID`](../sale/data-types.md) | Идентификатор платежной системы ||
|| **FIELDS**
[`object`](../data-types.md) | Объект, содержащий новые значения полей (подробное описание приведено [ниже](#parametr-fields)) ||
|#

### Параметр FIELDS

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../data-types.md) | Название платежной системы ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание платежной системы ||
|| **PERSON_TYPE_ID**
[`sale_person_type.id`](../sale/data-types.md) | Идентификатор типа плательщика ||
|| **BX_REST_HANDLER**
[`sale_paysystem_handler.CODE`](../sale/data-types.md#sale_paysystem_handler) | Код REST-обработчика, указанный при добавлении обработчика методом [sale.paysystem.handler.add](./sale-pay-system-handler-add.md) ||
|| **ACTIVE**
[`string`](../data-types.md) | Индикатор активности платежной системы. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **LOGOTYPE**
[`string`](../data-types.md) | Логотип платежной системы (картинка в формате Base64) ||
|| **NEW_WINDOW**
[`string`](../data-types.md) | Флаг, отвечающий за настройку «Открывать в новом окне». Возможные значения:
- `Y` — да
- `N` — нет
||
|| **XML_ID**
[`string`](../data-types.md) | Внешний идентификатор платежной системы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":12,"FIELDS":{"NAME":"Новое название платёжной системы","DESCRIPTION":"Новое описание платёжной системы","PERSON_TYPE_ID":1,"BX_REST_HANDLER":"resthandlercode","ACTIVE":"Y","NEW_WINDOW":"N","LOGOTYPE":"/* base64 image */"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":12,"FIELDS":{"NAME":"Новое название платёжной системы","DESCRIPTION":"Новое описание платёжной системы","PERSON_TYPE_ID":1,"BX_REST_HANDLER":"resthandlercode","ACTIVE":"Y","NEW_WINDOW":"N","LOGOTYPE":"/* base64 image */"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.update
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
        method: 'sale.paysystem.update',
        params: {
          ID: 12,
          FIELDS: {
            NAME: 'New payment system name',
            DESCRIPTION: 'New payment system description',
            PERSON_TYPE_ID: 1,
            BX_REST_HANDLER: 'resthandlercode',
            ACTIVE: 'Y',
            NEW_WINDOW: 'N',
            LOGOTYPE: '/* base64 image */',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Payment system updated:', result)
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
      async function updatePaySystem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.paysystem.update',
            params: {
              ID: 12,
              FIELDS: {
                NAME: 'New payment system name',
                DESCRIPTION: 'New payment system description',
                PERSON_TYPE_ID: 1,
                BX_REST_HANDLER: 'resthandlercode',
                ACTIVE: 'Y',
                NEW_WINDOW: 'N',
                LOGOTYPE: '/* base64 image */',
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
          console.info('Payment system updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePaySystem)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.paysystem.update',
                [
                    'ID'          => 12,
                    'FIELDS'      => [
                        'NAME'           => 'Новое название платёжной системы',
                        'DESCRIPTION'    => 'Новое описание платёжной системы',
                        'PERSON_TYPE_ID' => 1,
                        'BX_REST_HANDLER' => 'resthandlercode',
                        'ACTIVE'         => 'Y',
                        'NEW_WINDOW'     => 'N',
                        'LOGOTYPE'       => '/* base64 image */',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating payment system: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sale.paysystem.update',
    {
        "ID": 12,
        "FIELDS": {
            "NAME": "Новое название платёжной системы",
            "DESCRIPTION": "Новое описание платёжной системы",
            "PERSON_TYPE_ID": 1,
            "BX_REST_HANDLER": 'resthandlercode',
            "ACTIVE": 'Y',
            'NEW_WINDOW': 'N',
            'LOGOTYPE': '/* base64 image */',
        }
    }, 
        function(result) 
        { 
            if(result.error()) 
            { 
                console.error(result.error()); 
            } 
            else 
            { 
                console.info(result.data()); 
            } 
        } 
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.update',
        [
            'ID' => 12,
            'FIELDS' => [
                'NAME' => 'Новое название платёжной системы',
                'DESCRIPTION' => 'Новое описание платёжной системы',
                'PERSON_TYPE_ID' => 1,
                'BX_REST_HANDLER' => 'resthandlercode',
                'ACTIVE' => 'Y',
                'NEW_WINDOW' => 'N',
                'LOGOTYPE' => '/* base64 image */',
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
    "result": true,
    "time": {
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат обновления платежной системы ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_HANDLER_NOT_FOUND",
    "error_description": "Handler not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Доступ запрещен. Приложение пытается изменить платежную систему, добавленную другим приложением, либо недостаточно прав для изменения платежной системы | 403 ||
|| `ERROR_HANDLER_NOT_FOUND` | Обработчик, указанный в параметре `BX_REST_HANDLER`, не найден | 400 ||
|| `ERROR_PERSON_TYPE_NOT_FOUND` | Тип плательщика, указанный в параметре `PERSON_TYPE_ID`, не найден | 400 ||
|| `ERROR_PAY_SYSTEM_NOT_FOUND` | Платежная система с указанным `ID` не найдена | 400 ||
|| `ERROR_CHECK_FAILURE` | Не указан параметр `ID` | 400 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-update.md)
- [{#T}](./sale-pay-system-handler-list.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-add.md)
- [{#T}](./sale-pay-system-list.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-settings-update.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-pay-payment.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
