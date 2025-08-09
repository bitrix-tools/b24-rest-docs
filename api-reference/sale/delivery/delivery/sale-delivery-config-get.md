# Получить настройки службы доставки sale.delivery.config.get

> Scope: [`sale`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод получает настройки службы доставки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`sale_delivery_service.ID`](../../data-types.md) | Идентификатор службы доставки.
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":196}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.delivery.config.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":196,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.delivery.config.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.delivery.config.get', {
    			ID: 196,
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.delivery.config.get',
                [
                    'ID' => 196,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting delivery config: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.delivery.config.get', {
            ID: 196,
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
        'sale.delivery.config.get',
        [
            'ID' => 196
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
   "result":[
      {
         "CODE":"SETTING_1",
         "VALUE":"New SETTING_1 string value"
      },
      {
         "CODE":"SETTING_2",
         "VALUE":"N"
      },
      {
         "CODE":"SETTING_3",
         "VALUE":"999.99"
      },
      {
         "CODE":"SETTING_4",
         "VALUE":"Option2Code"
      },
      {
         "CODE":"SETTING_5",
         "VALUE":"25.03.2023"
      },
      {
         "CODE":"SETTING_6",
         "VALUE":"0000144962"
      }
   ],
   "time":{
      "start":1714137257.450324,
      "finish":1714137257.672526,
      "duration":0.22220182418823242,
      "processing":0.029755115509033203,
      "date_start":"2024-04-26T16:14:17+03:00",
      "date_finish":"2024-04-26T16:14:17+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Значения настроек службы доставки.
Сама структура настроек (код, название, тип данных) задается при создании или обновлении обработчика службы доставки методами:
- [sale.delivery.handler.add](../handler/sale-delivery-handler-add.md)
- [sale.delivery.handler.update](../handler/sale-delivery-handler-update.md) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Ключ result

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код настройки ||
|| **VALUE**
[`any`](../../../data-types.md) | Значение настройки ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
   "error":"ERROR_DELIVERY_NOT_FOUND",
   "error_description":"Delivery not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_DELIVERY_NOT_FOUND` | Служба доставки с указанным идентификатором (ID) не найдена | 400 ||
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали в описании ошибки) | 400 ||
|| `ACCESS_DENIED` | Недостаточно прав для получения настроек службы доставки | 403 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-delivery-add.md)
- [{#T}](./sale-delivery-delete.md)
- [{#T}](./sale-delivery-update.md)
- [{#T}](./sale-delivery-config-update.md)
- [{#T}](./sale-delivery-get-list.md)