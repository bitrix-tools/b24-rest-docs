# Обновить товар в документе складского учета catalog.document.element.update

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: 
> - пользователь с правом «Cоздание и редактирование» на тип документа в запросе,
> - и «Просмотр и выбор склада» на склад прихода или списания.

Метод `catalog.document.element.update` изменяет существующую позицию документа складского учета и возвращает обновленные данные товара.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_document_element.id`](../../data-types.md#catalog_document_element) | Идентификатор товара документа, можно получить методом [catalog.document.element.list](./catalog-document-element-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля, которые нужно изменить (подробное описание ниже) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **storeFrom**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада-источника, можно получить методом [catalog.store.list](../../store/catalog-store-list.md). Используйте для документов списания. Если параметр не передавать, сохранится текущее значение ||
|| **storeTo**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада-получателя, можно получить методом [catalog.store.list](../../store/catalog-store-list.md). Подходит для документов поступления и перемещения. Если параметр не передавать, сохранится текущее значение ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара в единицах учета документа. Если параметр не передавать, сохранится текущее значение ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена в валюте документа. Если параметр не передавать, сохранится текущее значение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":148,"fields":{"amount":12,"purchasingPrice":1180,"storeTo":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.element.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":148,"fields":{"amount":12,"purchasingPrice":1180,"storeTo":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.element.update',
    		{
    			id: 148,
    			fields: {
    				amount: 12,
    				purchasingPrice: 1180,
    				storeTo: 2
    			}
    		}
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
                'catalog.document.element.update',
                [
                    'id' => 148,
                    'fields' => [
                        'amount' => 12,
                        'purchasingPrice' => 1180,
                        'storeTo' => 2,
                    ],
                ]
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
        echo 'Error updating document element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.element.update',
        {
            id: 148,
            fields: {
                amount: 12,
                purchasingPrice: 1180,
                storeTo: 2
            }
        },
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
        'catalog.document.element.update',
        [
            'id' => 148,
            'fields' => [
                'amount' => 12,
                'purchasingPrice' => 1180,
                'storeTo' => 2,
            ],
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
        "documentElement": {
            "amount": 12,
            "docId": 64,
            "elementId": 312,
            "id": 148,
            "purchasingPrice": 1180,
            "storeFrom": null,
            "storeTo": 2
        }
    },
    "time": {
        "start": 1759482203.22173,
        "finish": 1759482203.33928,
        "duration": 0.11754989624023438,
        "processing": 0.02244114875793457,
        "date_start": "2025-11-02T12:23:23+03:00",
        "date_finish": "2025-11-02T12:23:23+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа ||
|| **documentElement**
[`catalog_document_element`](../../data-types.md#catalog_document_element) | Обновленные данные товара документа. ||
|| **time**
[`time`](../../../data-types.md#time) | Служебная информация о времени обработки запроса. ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_DOCUMENT_STATUS",
    "error_description": "Document not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_DOCUMENT_RIGHTS` | Access denied | Недостаточно прав на изменение документа или просмотр складов ||
|| `ERROR_DOCUMENT_STATUS` | Document not found / Conducted document | Позиция не найдена, документ удален, недоступен или уже проведен ||
|| `0` | Error of modifying new document | Внутренняя ошибка при сохранении ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-document-element-add.md)
- [{#T}](./catalog-document-element-delete.md)
- [{#T}](./catalog-document-element-list.md)
- [{#T}](./catalog-document-element-get-fields.md)
