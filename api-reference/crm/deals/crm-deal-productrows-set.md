# Добавить товары в сделку crm.deal.productrows.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописана ссылка на ещё не созданную страницу

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.productrows.set` устанавливает (создаёт или обновляет) товарные позиции сделки.

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор cделки. ||
|| **rows** | Товарные позиции – массив вида `array(array("поле"=>"значение"[, ...])[, ...])`, где "поле" может принимать значения из возвращаемых методом [crm.productrow.fields](.). Товарные позиции сделки, существующие до момента вызова метода, будут заменены новыми. После сохранения будет произведён пересчёт суммы сделки. ||
|#

## Пример

- B24-PHP-SDK

    ```php
    
try {
    $dealId = 123; // Example deal ID
    $productRows = [
        [
            'ID' => 1,
            'OWNER_ID' => 123,
            'OWNER_TYPE' => 'D',
            'PRODUCT_ID' => 456,
            'PRODUCT_NAME' => 'Product 1',
            'PRICE' => '100.00',
            'PRICE_EXCLUSIVE' => '100.00',
            'PRICE_NETTO' => '100.00',
            'PRICE_BRUTTO' => '100.00',
            'QUANTITY' => '1',
            'DISCOUNT_TYPE_ID' => 1,
            'DISCOUNT_RATE' => '0',
            'DISCOUNT_SUM' => '0',
            'TAX_RATE' => '20',
            'TAX_INCLUDED' => 'Y',
            'CUSTOMIZED' => 'N',
            'MEASURE_CODE' => 1,
            'MEASURE_NAME' => 'pcs',
            'SORT' => 100,
        ],
        // Add more product rows as needed
    ];

    $result = $serviceBuilder
        ->getCRMScope()
        ->dealProductRows()
        ->set($dealId, $productRows);

    if ($result->isSuccess()) {
        print($result->getCoreResponse()->getResponseData()->getResult()[0]);
    } else {
        print("Failed to set product rows.");
    }
} catch (Throwable $e) {
    print("Error occurred: " . $e->getMessage());
}

    ```
```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.deal.productrows.set",
    {
        id: id,
        rows:
        [
            { "PRODUCT_ID": 689, "PRICE": 100.00, "QUANTITY": 4 },
            { "PRODUCT_ID": 690, "PRICE": 400.00, "QUANTITY": 1 }
        ]
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}