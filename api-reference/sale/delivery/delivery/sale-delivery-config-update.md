# Обновить настройки службы доставки sale.delivery.config.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`delivery`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `sale.delivery.config.update` задает значения настроек службы доставки.

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
|| **CONFIG**
[`object[]`](../../../data-types.md) | Полный набор значений настроек службы. [Описание элемента](#config).

Набор настроек объявлен в `SETTINGS.CONFIG` обработчика. Получить его можно методом [sale.delivery.handler.list](../handler/sale-delivery-handler-list.md), текущие значения — методом [sale.delivery.config.get](./sale-delivery-config-get.md) ||
|#

{% note warning "" %}

Метод заменяет набор настроек целиком. Настройки, которые не переданы в `CONFIG`, удаляются. Если не передать `CONFIG`, удаляются все значения. Чтобы изменить одну настройку, получите текущие значения методом [sale.delivery.config.get](./sale-delivery-config-get.md) и передайте их вместе с новым значением.

Для профиля передавайте и настройку `PROFILE_TYPE` с кодом профиля обработчика, иначе она будет удалена.

{% endnote %}

### Элемент CONFIG {#config}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код настройки — поле `CODE` элемента `SETTINGS.CONFIG` обработчика, например `SETTING_1`.

Метод не сверяет код с настройками обработчика и сохраняет любой переданный код ||
|| **VALUE***
[`any`](../../../data-types.md) | Значение настройки. Пустая строка не допускается.

Метод не проверяет значение по типу настройки, например для `ENUM` сохраняется любое значение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":196,"CONFIG":[{"CODE":"SETTING_1","VALUE":"New SETTING_1 string value"},{"CODE":"SETTING_2","VALUE":"N"},{"CODE":"SETTING_3","VALUE":999.99},{"CODE":"SETTING_4","VALUE":"Option2Code"},{"CODE":"SETTING_5","VALUE":"25.03.2023"},{"CODE":"SETTING_6","VALUE":"0000144962"}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.config.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":196,"CONFIG":[{"CODE":"SETTING_1","VALUE":"New SETTING_1 string value"},{"CODE":"SETTING_2","VALUE":"N"},{"CODE":"SETTING_3","VALUE":999.99},{"CODE":"SETTING_4","VALUE":"Option2Code"},{"CODE":"SETTING_5","VALUE":"25.03.2023"},{"CODE":"SETTING_6","VALUE":"0000144962"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.config.update
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
        method: 'sale.delivery.config.update',
        params: {
          ID: 196,
          CONFIG: [
            { CODE: 'SETTING_1', VALUE: 'New SETTING_1 string value' },
            { CODE: 'SETTING_2', VALUE: 'N' },
            { CODE: 'SETTING_3', VALUE: 999.99 },
            { CODE: 'SETTING_4', VALUE: 'Option2Code' },
            { CODE: 'SETTING_5', VALUE: '25.03.2023' },
            { CODE: 'SETTING_6', VALUE: '0000144962' },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Config updated:', result)
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
      async function updateDeliveryConfig() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.delivery.config.update',
            params: {
              ID: 196,
              CONFIG: [
                { CODE: 'SETTING_1', VALUE: 'New SETTING_1 string value' },
                { CODE: 'SETTING_2', VALUE: 'N' },
                { CODE: 'SETTING_3', VALUE: 999.99 },
                { CODE: 'SETTING_4', VALUE: 'Option2Code' },
                { CODE: 'SETTING_5', VALUE: '25.03.2023' },
                { CODE: 'SETTING_6', VALUE: '0000144962' },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Config updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDeliveryConfig)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    config = [
        {
            "CODE": "SETTING_1",
            "VALUE": "New SETTING_1 string value",
        },
        {
            "CODE": "SETTING_2",
            "VALUE": "N",
        },
        {
            "CODE": "SETTING_3",
            "VALUE": 999.99,
        },
        {
            "CODE": "SETTING_4",
            "VALUE": "Option2Code",
        },
        {
            "CODE": "SETTING_5",
            "VALUE": "25.03.2023",
        },
        {
            "CODE": "SETTING_6",
            "VALUE": "0000144962",
        },
    ]

    try:
        bitrix_response = client.sale.delivery.config.update(
            bitrix_id=196,
            config=config,
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
                'sale.delivery.config.update',
                [
                    'ID'     => 196,
                    'CONFIG' => [
                        [
                            'CODE'  => "SETTING_1",
                            'VALUE' => "New SETTING_1 string value",
                        ],
                        [
                            'CODE'  => "SETTING_2",
                            'VALUE' => "N",
                        ],
                        [
                            'CODE'  => "SETTING_3",
                            'VALUE' => 999.99,
                        ],
                        [
                            'CODE'  => "SETTING_4",
                            'VALUE' => "Option2Code",
                        ],
                        [
                            'CODE'  => "SETTING_5",
                            'VALUE' => "25.03.2023",
                        ],
                        [
                            'CODE'  => "SETTING_6",
                            'VALUE' => "0000144962",
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating delivery config: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.config.update', {
            ID: 196,
            CONFIG: [{
                    CODE: "SETTING_1",
                    VALUE: "New SETTING_1 string value",
                },
                {
                    CODE: "SETTING_2",
                    VALUE: "N",
                },
                {
                    CODE: "SETTING_3",
                    VALUE: 999.99,
                },
                {
                    CODE: "SETTING_4",
                    VALUE: "Option2Code",
                },
                {
                    CODE: "SETTING_5",
                    VALUE: "25.03.2023",
                },
                {
                    CODE: "SETTING_6",
                    VALUE: "0000144962",
                },
            ],

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
        'sale.delivery.config.update',
        [
            'ID' => 196,
            'CONFIG' => [
                ['CODE' => "SETTING_1", 'VALUE' => "New SETTING_1 string value"],
                ['CODE' => "SETTING_2", 'VALUE' => "N"],
                ['CODE' => "SETTING_3", 'VALUE' => 999.99],
                ['CODE' => "SETTING_4", 'VALUE' => "Option2Code"],
                ['CODE' => "SETTING_5", 'VALUE' => "25.03.2023"],
                ['CODE' => "SETTING_6", 'VALUE' => "0000144962"],
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
    res, err := client.Core().Call(ctx, "sale.delivery.config.update", b24.Params{
    	"ID": 196,
    	"CONFIG": []b24.Params{
    		{
    			"CODE":  "SETTING_1",
    			"VALUE": "New SETTING_1 string value",
    		},
    		{
    			"CODE":  "SETTING_2",
    			"VALUE": "N",
    		},
    		{
    			"CODE":  "SETTING_3",
    			"VALUE": 999.99,
    		},
    		{
    			"CODE":  "SETTING_4",
    			"VALUE": "Option2Code",
    		},
    		{
    			"CODE":  "SETTING_5",
    			"VALUE": "25.03.2023",
    		},
    		{
    			"CODE":  "SETTING_6",
    			"VALUE": "0000144962",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.delivery.config.update: %w", err)
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
   "result":true,
   "time":{
      "start":1714134319.861777,
      "finish":1714134320.202336,
      "duration":0.3405590057373047,
      "processing":0.07335114479064941,
      "date_start":"2024-04-26T15:25:19+03:00",
      "date_finish":"2024-04-26T15:25:20+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления настроек службы доставки ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CHECK_FAILURE",
    "error_description": "Config item VALUE is not specified"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter ID is not defined | Не передан параметр `ID` ||
|| `400` | `ERROR_CHECK_FAILURE` | Parameter CONFIG must be of array type | Параметр `CONFIG` передан не массивом ||
|| `400` | `ERROR_CHECK_FAILURE` | Config item CODE is not specified | В элементе `CONFIG` не передан `CODE` или передана пустая строка ||
|| `400` | `ERROR_CHECK_FAILURE` | Config item VALUE is not specified | В элементе `CONFIG` не передано `VALUE` или передана пустая строка ||
|| `400` | `ERROR_DELIVERY_NOT_FOUND` | Delivery not found | Служба доставки с указанным `ID` не найдена ||
|| `400` | `ERROR_DELIVERY_CONFIG_UPDATE` | Текст ошибки сохранения | Не удалось сохранить настройки, текст ошибки — в `error_description` ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет прав администратора CRM, служба создана не на основе REST-обработчика или обработчик создан другим приложением ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-add.md)
- [{#T}](./sale-delivery-update.md)
- [{#T}](./sale-delivery-get-list.md)
- [{#T}](./sale-delivery-delete.md)
- [{#T}](./sale-delivery-config-get.md)
