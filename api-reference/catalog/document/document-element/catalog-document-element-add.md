# Добавить товар в документ складского учета catalog.document.element.add

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: 
> - пользователь с правом «Cоздание и редактирование» на тип документа в запросе,
> - и «Просмотр и выбор склада» на склад прихода или списания.

Метод `catalog.document.element.add` добавляет товарную позицию в документ складского учета. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Поля добавляемого товара  ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **docId***
[`catalog_document.id`](../../data-types.md#catalog_document) | Идентификатор документа складского учета, можно получить методом [catalog.document.list](../catalog-document-list.md). Документ должен иметь статус `N` — не проведен ||
|| **elementId***
[`catalog_product.id`](../../data-types.md#catalog_product) | Идентификатор товара каталога. Значение можно получить методами [catalog.product.*](../../product/index.md) ||
|| **storeFrom**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада-источника, можно получить методом [catalog.store.list](../../store/catalog-store-list.md). Используется для документов списания ||
|| **storeTo**
[`catalog_store.id`](../../data-types.md#catalog_store) | Идентификатор склада-получателя, можно получить методом [catalog.store.list](../../store/catalog-store-list.md). Используется для документов поступления и перемещения ||
|| **amount**
[`double`](../../../data-types.md) | Количество товара. Значение указывается в единицах учета документа ||
|| **purchasingPrice**
[`double`](../../../data-types.md) | Закупочная цена в валюте документа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docId":64,"elementId":312,"storeTo":2,"amount":15,"purchasingPrice":1250.5}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.element.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docId":64,"elementId":312,"storeTo":2,"amount":15,"purchasingPrice":1250.5},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.element.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.element.add',
    		{
    			fields: {
    				docId: 64,
    				elementId: 312,
    				storeTo: 2,
    				amount: 15,
    				purchasingPrice: 1250.5
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
                'catalog.document.element.add',
                [
                    'fields' => [
                        'docId' => 64,
                        'elementId' => 312,
                        'storeTo' => 2,
                        'amount' => 15,
                        'purchasingPrice' => 1250.5,
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
        echo 'Error adding document element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.element.add',
        {
            fields: {
                docId: 64,
                elementId: 312,
                storeTo: 2,
                amount: 15,
                purchasingPrice: 1250.5
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
        'catalog.document.element.add',
        [
            'fields' => [
                'docId' => 64,
                'elementId' => 312,
                'storeTo' => 2,
                'amount' => 15,
                'purchasingPrice' => 1250.5,
            ],
        ]
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
        "documentElement": {
            "amount": 15,
            "docId": 64,
            "elementId": 312,
            "id": 148,
            "purchasingPrice": 1250.5,
            "storeFrom": null,
            "storeTo": 2
        }
    },
    "time": {
        "start": 1759482001.102334,
        "finish": 1759482001.215487,
        "duration": 0.11315321922302246,
        "processing": 0.018451929092407227,
        "date_start": "2025-11-02T12:20:01+03:00",
        "date_finish": "2025-11-02T12:20:01+03:00",
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
[`catalog_document_element`](../../data-types.md#catalog_document_element) | Объект с информацией о добавленном товаре ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-код: **400**

```json
{
    "error": "ERROR_DOCUMENT_STATUS",
    "error_description": "Conducted document"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_DOCUMENT_RIGHTS` | Access denied | Недостаточно прав на документ или один из указанных складов ||
|| `ERROR_DOCUMENT_STATUS` | Document not found / Conducted document | Документ не найден, недоступен или уже проведен ||
|| `0` | Error of adding new document element | Внутренняя ошибка при сохранении позиции ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-document-element-update.md)
- [{#T}](./catalog-document-element-delete.md)
- [{#T}](./catalog-document-element-list.md)
- [{#T}](./catalog-document-element-get-fields.md)
