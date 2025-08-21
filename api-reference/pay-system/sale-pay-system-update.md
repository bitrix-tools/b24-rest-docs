# Изменить платежную систему sale.paysystem.update

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
    -d '{"ID":12,"FIELDS":{"NAME":"Новое название платёжной системы","DESCRIPTION":"Новое описание платёжной системы","PERSON_TYPE_ID":1,"BX_REST_HANDLER":"resthandlercode","ACTIVE":"Y","NEW_WINDOW":"N","LOGOTYPE":"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAASABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73/4Oa/25vEf7CH/BK/XNW8GarrPh/wAZeONcsfCejazpk3k3GkyS+ZdTSh/vKWtbO5jDJhlaVWBBGR4V/wAFMP28vj1/wRc/4I+fs56O3jmLxh+0j4m1Wy0/V5tft11a9v4xDNc30SYJE/kTSWdn52S7o6tne+4fNv7f3/BSHwX8d/2xvjL+y/8A8FBrHxt4R+F+g/EKDxB8NtY8L6WLeTTbG3N5BDLdMqSy3FtdWkynfFFI4aSUDYQvl8r/AMFDv+Cr37P37eP/AAWX/Zz+IHw10/42fGi6+GOp2VlpnhbSrBNL03WLtLw3cF7ZtOzXJlExjWWGW1hEy20YM0aoSwB/RtRRRQBw/wAb/wBmb4b/ALTWk2On/Ej4feB/iDY6ZMbiztvEuhWurQ2khG0vGtwjhGK8EqASOKT4H/swfDX9mTTr+z+G3w78DfD201WRZr2Dw1oNrpMd46ghWkW3jQOwBIBbJAJoooA7miiigD//2Q=="}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":12,"FIELDS":{"NAME":"Новое название платёжной системы","DESCRIPTION":"Новое описание платёжной системы","PERSON_TYPE_ID":1,"BX_REST_HANDLER":"resthandlercode","ACTIVE":"Y","NEW_WINDOW":"N","LOGOTYPE":"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAASABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73/4Oa/25vEf7CH/BK/XNW8GarrPh/wAZeONcsfCejazpk3k3GkyS+ZdTSh/vKWtbO5jDJhlaVWBBGR4V/wAFMP28vj1/wRc/4I+fs56O3jmLxh+0j4m1Wy0/V5tft11a9v4xDNc30SYJE/kTSWdn52S7o6tne+4fNv7f3/BSHwX8d/2xvjL+y/8A8FBrHxt4R+F+g/EKDxB8NtY8L6WLeTTbG3N5BDLdMqSy3FtdWkynfFFI4aSUDYQvl8r/AMFDv+Cr37P37eP/AAWX/Zz+IHw10/42fGi6+GOp2VlpnhbSrBNL03WLtLw3cF7ZtOzXJlExjWWGW1hEy20YM0aoSwB/RtRRRQBw/wAb/wBmb4b/ALTWk2On/Ej4feB/iDY6ZMbiztvEuhWurQ2khG0vGtwjhGK8EqASOKT4H/swfDX9mTTr+z+G3w78DfD201WRZr2Dw1oNrpMd46ghWkW3jQOwBIBbJAJoooA7miiigD//2Q=="},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.paysystem.update',
    		{
    			"ID": 12,
    			"FIELDS": {
    				"NAME": "Новое название платёжной системы",
    				"DESCRIPTION": "Новое описание платёжной системы",
    				"PERSON_TYPE_ID": 1,
    				"BX_REST_HANDLER": 'resthandlercode',
    				"ACTIVE": 'Y',
    				'NEW_WINDOW': 'N',
    				'LOGOTYPE': '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAASABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73/4Oa/25vEf7CH/BK/XNW8GarrPh/wAZeONcsfCejazpk3k3GkyS+ZdTSh/vKWtbO5jDJhlaVWBBGR4V/wAFMP28vj1/wRc/4I+fs56O3jmLxh+0j4m1Wy0/V5tft11a9v4xDNc30SYJE/kTSWdn52S7o6tne+4fNv7f3/BSHwX8d/2xvjL+y/8A8FBrHxt4R+F+g/EKDxB8NtY8L6WLeTTbG3N5BDLdMqSy3FtdWkynfFFI4aSUDYQvl8r/AMFDv+Cr37P37eP/AAWX/Zz+IHw10/42fGi6+GOp2VlpnhbSrBNL03WLtLw3cF7ZtOzXJlExjWWGW1hEy20YM0aoSwB/RtRRRQBw/wAb/wBmb4b/ALTWk2On/Ej4feB/iDY6ZMbiztvEuhWurQ2khG0vGtwjhGK8EqASOKT4L/swfDX9mTTr+z+G3w78DfD201WRZr2Dw1oNrpMd46ghWkW3jQOwBIBbJAJoooA7miiigD//2Q==',
    			}
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
                        'LOGOTYPE'       => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAASABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73/4Oa/25vEf7CH/BK/XNW8GarrPh/wAZeONcsfCejazpk3k3GkyS+ZdTSh/vKWtbO5jDJhlaVWBBGR4V/wAFMP28vj1/wRc/4I+fs56O3jmLxh+0j4m1Wy0/V5tft11a9v4xDNc30SYJE/kTSWdn52S7o6tne+4fNv7f3/BSHwX8d/2xvjL+y/8A8FBrHxt4R+F+g/EKDxB8NtY8L6WLeTTbG3N5BDLdMqSy3FtdWkynfFFI4aSUDYQvl8r/AMFDv+Cr37P37eP/AAWX/Zz+IHw10/42fGi6+GOp2VlpnhbSrBNL03WLtLw3cF7ZtOzXJlExjWWGW1hEy20YM0aoSwB/RtRRRQBw/wAb/wBmb4b/ALTWk2On/Ej4feB/iDY6ZMbiztvEuhWurQ2khG0vGtwjhGK8EqASOKT4L/swfDX9mTTr+z+G3w78DfD201WRZr2Dw1oNrpMd46ghWkW3jQOwBIBbJAJoooA7miiigD//2Q==',
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
            'LOGOTYPE': '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAASABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73/4Oa/25vEf7CH/BK/XNW8GarrPh/wAZeONcsfCejazpk3k3GkyS+ZdTSh/vKWtbO5jDJhlaVWBBGR4V/wAFMP28vj1/wRc/4I+fs56O3jmLxh+0j4m1Wy0/V5tft11a9v4xDNc30SYJE/kTSWdn52S7o6tne+4fNv7f3/BSHwX8d/2xvjL+y/8A8FBrHxt4R+F+g/EKDxB8NtY8L6WLeTTbG3N5BDLdMqSy3FtdWkynfFFI4aSUDYQvl8r/AMFDv+Cr37P37eP/AAWX/Zz+IHw10/42fGi6+GOp2VlpnhbSrBNL03WLtLw3cF7ZtOzXJlExjWWGW1hEy20YM0aoSwB/RtRRRQBw/wAb/wBmb4b/ALTWk2On/Ej4feB/iDY6ZMbiztvEuhWurQ2khG0vGtwjhGK8EqASOKT4H/swfDX9mTTr+z+G3w78DfD201WRZr2Dw1oNrpMd46ghWkW3jQOwBIBbJAJoooA7miiigD//2Q==',
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
                'LOGOTYPE' => '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAASABUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD73/4Oa/25vEf7CH/BK/XNW8GarrPh/wAZeONcsfCejazpk3k3GkyS+ZdTSh/vKWtbO5jDJhlaVWBBGR4V/wAFMP28vj1/wRc/4I+fs56O3jmLxh+0j4m1Wy0/V5tft11a9v4xDNc30SYJE/kTSWdn52S7o6tne+4fNv7f3/BSHwX8d/2xvjL+y/8A8FBrHxt4R+F+g/EKDxB8NtY8L6WLeTTbG3N5BDLdMqSy3FtdWkynfFFI4aSUDYQvl8r/AMFDv+Cr37P37eP/AAWX/Zz+IHw10/42fGi6+GOp2VlpnhbSrBNL03WLtLw3cF7ZtOzXJlExjWWGW1hEy20YM0aoSwB/RtRRRQBw/wAb/wBmb4b/ALTWk2On/Ej4feB/iDY6ZMbiztvEuhWurQ2khG0vGtwjhGK8EqASOKT4H/swfDX9mTTr+z+G3w78DfD201WRZr2Dw1oNrpMd46ghWkW3jQOwBIBbJAJoooA7miiigD//2Q==A',
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
    "error": " ERROR_HANDLER_NOT_FOUND",
    "error_description": " Handler not found"
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
- [{#T}](./sale-pay-system-pay-invoice.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
- [{#T}](./sale-pay-system-settings-invoice-get.md)


