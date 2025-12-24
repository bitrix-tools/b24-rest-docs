# Получить описание полей привязки поставщика к документу складского учета catalog.documentcontractor.getFields  

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами:
> — «Просмотр» на тип документа «Приход»,
> — «Просмотр раздела Складской учет»
> — «Просмотр каталога товаров»   

Метод `catalog.documentcontractor.getFields` возвращает описание полей для привязки поставщика, контакта или компании, к документу складского учета.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.documentcontractor.getFields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.documentcontractor.getFields
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'catalog.documentcontractor.getFields',
            {}
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
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
                'catalog.documentcontractor.getFields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting contractor binding fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.documentcontractor.getFields',
        {},
        function(result)
        {
            if (result.error())
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
        'catalog.documentcontractor.getFields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documentContractor": {
            "documentId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "entityId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "entityTypeId": {
                "isImmutable": false,
                "isReadOnly": false,
                "isRequired": true,
                "type": "integer"
            },
            "id": {
                "isImmutable": false,
                "isReadOnly": true,
                "isRequired": false,
                "type": "integer"
            }
        }
    },
    "time": {
        "start": 1766410081,
        "finish": 1766410081.636695,
        "duration": 0.6366949081420898,
        "processing": 0,
        "date_start": "2025-12-22T16:28:01+03:00",
        "date_finish": "2025-12-22T16:28:01+03:00",
        "operating_reset_at": 1766410681,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **documentContractor**
[`object`](../data-types.md#catalog_documentContractor) | Объект с описанием полей привязки поставщика к документу складского учета.
Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. Где `field` — идентификатор поля объекта [`catalog_documentContractor`](../data-types.md#catalog_documentContractor), а `value` — объект типа [`rest_field_description`](../data-types.md) ||  
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок 

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}  

HTTP-код: **400**

```json  
{
    "error": "0",
    "error_description": "Access denied"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied | Недостаточно прав для просмотра документа или привязок ||  
|| `0` | Contractors should be provided by CRM | Модуль CRM не активен как поставщик контрагентов ||  
|#  

{% include [Системные ошибки](../../../_includes/system-errors.md) %}  

## Продолжите изучение  

- [{#T}](./catalog-documentcontractor-list.md)  
- [{#T}](./catalog-documentcontractor-add.md)  
- [{#T}](./catalog-documentcontractor-delete.md)

