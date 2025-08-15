# Получить поля коннектора biconnector.connector.fields

> Scope: [`biconnector`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь

Метод `biconnector.connector.fields` возвращает описание полей коннектора.
Таблицу с описанием стандартных полей можно найти в статье [Коннектор: обзор методов](./index.md#fields).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.connector.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"auth":"**put_access_token_here**"}' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.connector.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'biconnector.connector.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling biconnector.connector.fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.connector.fields',
        {},
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.connector.fields',
        []
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
    "fields": [
      {
        "title": "id",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "title",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "logo",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "description",
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "sort",
        "type": "integer",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "urlCheck",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "urlData",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "urlTableList",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "urlTableDescription",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "settings",
        "type": "array",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true
      },
      {
        "title": "dateCreate",
        "type": "datetime",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      }
    ]
  },
  "time": {
    "start": 1740671757.058651,
    "finish": 1740671757.179896,
    "duration": 0.12124514579772949,
    "processing": 5.507469177246094e-5,
    "date_start": "2025-02-27T15:55:57+00:00",
    "date_finish": "2025-02-27T15:55:57+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект в формате:

```
{
    field_1: value_1,
    field_2: value_2,
    ...
    field_n: value_n,
}
```

где:
- `field_n` — поле коннектора
- `value_n` — [информация о поле](./index.md#description) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-connector-update.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-list.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-add.md)