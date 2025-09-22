# Добавить сделку (лид, счет, компред) с товарами, с применением скидок и налогов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

убрала из меню, чтобы не публиковался. Надо полностью переделывать, crm.product.list не актуальный, все примеры можно заменить одним с универсальным методом 

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Примеры создания различных объектов с одновременным добавленем товаров к ним. Добавляемый товар берется из Битрикс24 с ценой больше нуля. Все примеры добавляют товар в максимально возможном количестве вариаций, около каждой вариации есть мини комментарий с описанием, с какими дополнительными условиями будет отображаться товар.

## Прикрепление товаров к сделке

{% list tabs %}

- JS

    ```javascript
    document.addEventListener('DOMContentLoaded', function() {
        async function createDealWithProducts() {
            try {
                let resultProduct = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.product.list',
                        {
                            'filter': {
                                '>PRICE': 0
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultProduct.length === 0) {
                    alert('Product error, create product in B24');
                    return;
                }

                let arProduct = resultProduct[0];

                let resultDeal = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.deal.add',
                        {
                            'fields': {
                                'TITLE': 'Example'
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultDeal) {
                    let dealId = resultDeal;

                    let result = await new Promise((resolve, reject) => {
                        BX24.callMethod(
                            'crm.deal.productrows.set',
                            {
                                'id': dealId,
                                'rows': [
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE_EXCLUSIVE': arProduct.PRICE,
                                        'TAX_RATE': 15,
                                        'TAX_INCLUDED': 'N',
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE': arProduct.PRICE,
                                        'TAX_RATE': 15,
                                        'TAX_INCLUDED': 'Y',
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE': arProduct.PRICE,
                                        'DISCOUNT_SUM': 100,
                                        'DISCOUNT_TYPE_ID': 1,
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE': arProduct.PRICE - 100,
                                        'DISCOUNT_SUM': 100,
                                        'DISCOUNT_TYPE_ID': 1,
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE_EXCLUSIVE': arProduct.PRICE,
                                        'DISCOUNT_RATE': 10,
                                        'DISCOUNT_TYPE_ID': 2,
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE_EXCLUSIVE': arProduct.PRICE - (arProduct.PRICE * 0.1),
                                        'DISCOUNT_RATE': 10,
                                        'DISCOUNT_TYPE_ID': 2,
                                        'QUANTITY': 1
                                    }
                                ]
                            },
                            function(result) {
                                if (result.error()) {
                                    reject(result.error());
                                } else {
                                    resolve(result.data());
                                }
                            }
                        );
                    });

                    alert('Deal and products added successfully');
                } else {
                    alert('Error creating deal');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred: ' + error.message);
            }
        }

        createDealWithProducts();
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $resultProduct = CRest::call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    );

    if (empty($resultProduct['result']))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct['result'][0];
    }

    //Deal product
    $resultDeal = CRest::call(
        'crm.deal.add',
        [
            'fields' => [
                'TITLE' => 'Example',
            ]
        ]
    );
    if ($ID = $resultDeal['result'])
    {
        $result = CRest::call(
            'crm.deal.productrows.set',
            [
                'id' => $ID,
                'rows' => [
                    [//product with auto calc tax
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE_EXCLUSIVE' => $arProduct['PRICE'],
                        'TAX_RATE' => 15,
                        'TAX_INCLUDED' => 'N',
                        'QUANTITY' => 1
                    ],
                    [//product with tax include
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE' => $arProduct['PRICE'],
                        'TAX_RATE' => 15,
                        'TAX_INCLUDED' => 'Y',
                        'QUANTITY' => 1
                    ],
                    [//product with discount
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE' => $arProduct['PRICE'],
                        'DISCOUNT_SUM' => 100,
                        'DISCOUNT_TYPE_ID' => 1,//is sum discount type
                        'QUANTITY' => 1
                    ],
                    [//product with a real discount
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE' => $arProduct['PRICE'] - 100,
                        'DISCOUNT_SUM' => 100,
                        'DISCOUNT_TYPE_ID' => 1,//is sum discount type
                        'QUANTITY' => 1
                    ],
                    [//product with discount percent
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE_EXCLUSIVE' => $arProduct['PRICE'],
                        'DISCOUNT_RATE' => 10,
                        'DISCOUNT_TYPE_ID' => 2,//is percent discount type
                        'QUANTITY' => 1
                    ],
                    [//product with real discount percent
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE_EXCLUSIVE' => $arProduct['PRICE'] - ($arProduct['PRICE'] * 0.1),
                        'DISCOUNT_RATE' => 10,
                        'DISCOUNT_TYPE_ID' => 2,//is percent discount type
                        'QUANTITY' => 1
                    ],
                ]
            ]
        );
    }
    else
    {
        echo 'error create deal';
        exit;
    }

    ?>
    ```

{% endlist %}

## Прикрепление товаров к лиду

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        async function createLeadWithProducts() {
            try {
                let resultProduct = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.product.list',
                        {
                            'filter': {
                                '>PRICE': 0
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultProduct.length === 0) {
                    alert('Product error, create product in B24');
                    return;
                }

                let arProduct = resultProduct[0];

                let resultLead = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.lead.add',
                        {
                            'fields': {
                                'TITLE': 'Example'
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultLead) {
                    let leadId = resultLead;

                    let result = await new Promise((resolve, reject) => {
                        BX24.callMethod(
                            'crm.lead.productrows.set',
                            {
                                'id': leadId,
                                'rows': [
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE_EXCLUSIVE': arProduct.PRICE,
                                        'TAX_RATE': 15,
                                        'TAX_INCLUDED': 'N',
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE': arProduct.PRICE,
                                        'TAX_RATE': 15,
                                        'TAX_INCLUDED': 'Y',
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE': arProduct.PRICE,
                                        'DISCOUNT_SUM': 100,
                                        'DISCOUNT_TYPE_ID': 1,
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE': arProduct.PRICE - 100,
                                        'DISCOUNT_SUM': 100,
                                        'DISCOUNT_TYPE_ID': 1,
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE_EXCLUSIVE': arProduct.PRICE,
                                        'DISCOUNT_RATE': 10,
                                        'DISCOUNT_TYPE_ID': 2,
                                        'QUANTITY': 1
                                    },
                                    {
                                        'PRODUCT_ID': arProduct.ID,
                                        'PRICE_EXCLUSIVE': arProduct.PRICE - (arProduct.PRICE * 0.1),
                                        'DISCOUNT_RATE': 10,
                                        'DISCOUNT_TYPE_ID': 2,
                                        'QUANTITY': 1
                                    }
                                ]
                            },
                            function(result) {
                                if (result.error()) {
                                    reject(result.error());
                                } else {
                                    resolve(result.data());
                                }
                            }
                        );
                    });

                    alert('Lead and products added successfully');
                } else {
                    alert('Error creating lead');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred: ' + error.message);
            }
        }

        createLeadWithProducts();
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $resultProduct = CRest::call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    );

    if (empty($resultProduct['result']))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct['result'][0];
    }

    //Lead product
    $resultLead = CRest::call(
        'crm.lead.add',
        [
            'fields' => [
                'TITLE' => 'Example',
            ]
        ]
    );
    if ($ID = $resultLead['result'])
    {
        $result = CRest::call(
            'crm.lead.productrows.set',
            [
                'id' => $ID,
                'rows' => [
                    [//product with auto calc tax
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE_EXCLUSIVE' => $arProduct['PRICE'],
                        'TAX_RATE' => 15,
                        'TAX_INCLUDED' => 'N',
                        'QUANTITY' => 1
                    ],
                    [//product with tax include
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE' => $arProduct['PRICE'],
                        'TAX_RATE' => 15,
                        'TAX_INCLUDED' => 'Y',
                        'QUANTITY' => 1
                    ],
                    [//product with discount
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE' => $arProduct['PRICE'],
                        'DISCOUNT_SUM' => 100,
                        'DISCOUNT_TYPE_ID' => 1,//is sum discount type
                        'QUANTITY' => 1
                    ],
                    [//product with a real discount
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE' => $arProduct['PRICE'] - 100,
                        'DISCOUNT_SUM' => 100,
                        'DISCOUNT_TYPE_ID' => 1,//is sum discount type
                        'QUANTITY' => 1
                    ],
                    [//product with discount percent
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE_EXCLUSIVE' => $arProduct['PRICE'],
                        'DISCOUNT_RATE' => 10,
                        'DISCOUNT_TYPE_ID' => 2,//is percent discount type
                        'QUANTITY' => 1
                    ],
                    [//product with real discount percent
                        'PRODUCT_ID' => $arProduct['ID'],
                        'PRICE_EXCLUSIVE' => $arProduct['PRICE'] - ($arProduct['PRICE'] * 0.1),
                        'DISCOUNT_RATE' => 10,
                        'DISCOUNT_TYPE_ID' => 2,//is percent discount type
                        'QUANTITY' => 1
                    ],
                ]
            ]
        );
    }
    else
    {
        echo 'error create lead';
        exit;
    }

    ?>
    ```

{% endlist %}

## Создание счета с товарами

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        async function createInvoiceWithProducts() {
            try {
                let resultProduct = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.product.list',
                        {
                            'filter': {
                                '>PRICE': 0
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultProduct.length === 0) {
                    alert('Product error, create product in B24');
                    return;
                }

                let arProduct = resultProduct[0];

                let resultCompany = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.company.add',
                        {
                            'fields': {
                                'TITLE': 'Example'
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultCompany) {
                    let companyId = resultCompany;

                    let resultInvoice = await new Promise((resolve, reject) => {
                        BX24.callMethod(
                            'crm.invoice.add',
                            {
                                'fields': {
                                    'ORDER_TOPIC': 'Invoice by company with product',
                                    'UF_COMPANY_ID': companyId,
                                    'PERSON_TYPE_ID': 1,
                                    'PAY_SYSTEM_ID': 20,
                                    'STATUS_ID': 'N',
                                    'DATE_INSERT': new Date().toISOString(),
                                    'DATE_BILL': new Date().toISOString(),
                                    'DATE_PAY_BEFORE': new Date(Date.now() + 3600 * 24 * 20).toISOString(),
                                    'PRODUCT_ROWS': [
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRODUCT_NAME': arProduct.NAME,
                                            'PRICE': arProduct.PRICE + (arProduct.PRICE * 0.15),
                                            'VAT_RATE': 0.15,
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRODUCT_NAME': arProduct.NAME,
                                            'PRICE': arProduct.PRICE,
                                            'DISCOUNT_PRICE': 100,
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRODUCT_NAME': arProduct.NAME,
                                            'PRICE': arProduct.PRICE - 100,
                                            'DISCOUNT_PRICE': 100,
                                            'QUANTITY': 1
                                        }
                                    ]
                                }
                            },
                            function(result) {
                                if (result.error()) {
                                    reject(result.error());
                                } else {
                                    resolve(result.data());
                                }
                            }
                        );
                    });

                    alert('Invoice and products added successfully');
                } else {
                    alert('Error creating company');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred: ' + error.message);
            }
        }

        createInvoiceWithProducts();
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $resultProduct = CRest::call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    );

    if (empty($resultProduct['result']))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct['result'][0];
    }
    $resultCompany = CRest::call(
        'crm.company.add',
        [
            'fields' => [
                'TITLE' => 'Example',
            ]
        ]
    );

    if ($iCompanyID = $resultCompany['result'])
    {
        $resultInvoice = CRest::call(
            'crm.invoice.add',
            [
                'fields' => [
                    'ORDER_TOPIC' => 'Invoice by company with product',
                    'UF_COMPANY_ID' => $iCompanyID,
                    'PERSON_TYPE_ID' => 1,//1 is company in CRest::call('crm.persontype.list')
                    'PAY_SYSTEM_ID' => 20,//some in CRest::call('sale.paysystem.list')
                    'STATUS_ID' => 'N',
                    'DATE_INSERT' => date(DATE_ATOM),
                    'DATE_BILL' => date(DATE_ATOM),
                    'DATE_PAY_BEFORE' => date(DATE_ATOM, time() + 3600 * 24 * 20),//20 day pay

                    'PRODUCT_ROWS' => [
                        [//product with tax
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRODUCT_NAME' => $arProduct['NAME'],
                            'PRICE' => $arProduct['PRICE'] + ($arProduct['PRICE'] * 0.15),
                            'VAT_RATE' => 0.15,
                            'QUANTITY' => 1
                        ],
                        [//product with discount sum, percent not supported
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRODUCT_NAME' => $arProduct['NAME'],
                            'PRICE' => $arProduct['PRICE'],
                            'DISCOUNT_PRICE' => 100,
                            'QUANTITY' => 1
                        ],
                        [//product with real discount sum, percent not supported
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRODUCT_NAME' => $arProduct['NAME'],
                            'PRICE' => $arProduct['PRICE'] - 100,
                            'DISCOUNT_PRICE' => 100,
                            'QUANTITY' => 1
                        ],
                    ],
                ]
            ]
        );
    }
    ?>
    ```

{% endlist %}



## Прикрепление товаров к компред

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        async function createQuoteWithProducts() {
            try {
                let resultProduct = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.product.list',
                        {
                            'filter': {
                                '>PRICE': 0
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultProduct.length === 0) {
                    alert('Product error, create product in B24');
                    return;
                }

                let arProduct = resultProduct[0];

                let resultCompany = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.company.add',
                        {
                            'fields': {
                                'TITLE': 'Example'
                            }
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultCompany) {
                    let companyId = resultCompany;

                    let resultQuote = await new Promise((resolve, reject) => {
                        BX24.callMethod(
                            'crm.quote.add',
                            {
                                'fields': {
                                    "TITLE": "Quote by company with product",
                                    "OPENED": "Y",
                                    "ASSIGNED_BY_ID": 1,
                                    "CURRENCY_ID": "USD",
                                    "BEGINDATE": new Date().toISOString(),
                                    "CLOSEDATE": new Date(Date.now() + 3600 * 24 * 20).toISOString(),
                                    'COMPANY_ID': companyId,
                                    'STATUS_ID': 'N'
                                }
                            },
                            function(result) {
                                if (result.error()) {
                                    reject(result.error());
                                } else {
                                    resolve(result.data());
                                }
                            }
                        );
                    });

                    if (resultQuote) {
                        let quoteId = resultQuote;

                        let result = await new Promise((resolve, reject) => {
                            BX24.callMethod(
                                'crm.quote.productrows.set',
                                {
                                    'id': quoteId,
                                    'rows': [
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRICE_EXCLUSIVE': arProduct.PRICE,
                                            'TAX_RATE': 15,
                                            'TAX_INCLUDED': 'N',
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRICE': arProduct.PRICE,
                                            'TAX_RATE': 15,
                                            'TAX_INCLUDED': 'Y',
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRICE': arProduct.PRICE,
                                            'DISCOUNT_SUM': 100,
                                            'DISCOUNT_TYPE_ID': 1,
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRICE': arProduct.PRICE - 100,
                                            'DISCOUNT_SUM': 100,
                                            'DISCOUNT_TYPE_ID': 1,
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRICE_EXCLUSIVE': arProduct.PRICE,
                                            'DISCOUNT_RATE': 10,
                                            'DISCOUNT_TYPE_ID': 2,
                                            'QUANTITY': 1
                                        },
                                        {
                                            'PRODUCT_ID': arProduct.ID,
                                            'PRICE_EXCLUSIVE': arProduct.PRICE - (arProduct.PRICE * 0.1),
                                            'DISCOUNT_RATE': 10,
                                            'DISCOUNT_TYPE_ID': 2,
                                            'QUANTITY': 1
                                        }
                                    ]
                                },
                                function(result) {
                                    if (result.error()) {
                                        reject(result.error());
                                    } else {
                                        resolve(result.data());
                                    }
                                }
                            );
                        });

                        alert('Quote and products added successfully');
                    } else {
                        alert('Error creating quote');
                    }
                } else {
                    alert('Error creating company');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred: ' + error.message);
            }
        }

        createQuoteWithProducts();
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $resultProduct = CRest::call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    );

    if (empty($resultProduct['result']))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct['result'][0];
    }
    $resultCompany = CRest::call(
        'crm.company.add',
        [
            'fields' => [
                'TITLE' => 'Example',
            ]
        ]
    );

    if ($iCompanyID = $resultCompany['result'])
    {
        $resultQuote = CRest::call(
            'crm.quote.add',
            [
                'fields' => [
                    "TITLE" => "Quote by company with product",
                    "OPENED" => "Y",
                    "ASSIGNED_BY_ID" => 1,
                    "CURRENCY_ID" => "USD",
                    "BEGINDATE" => date(DATE_ATOM),
                    "CLOSEDATE" => date(DATE_ATOM, time() + 3600 * 24 * 20),//20 day
                    'COMPANY_ID' => $iCompanyID,
                    'STATUS_ID' => 'N',
                ]
            ]
        );
        if ($ID = $resultQuote['result'])
        {
            $result = CRest::call(
                'crm.quote.productrows.set',
                [
                    'id' => $ID,
                    'rows' => [
                        [//product with auto calc tax
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRICE_EXCLUSIVE' => $arProduct['PRICE'],
                            'TAX_RATE' => 15,
                            'TAX_INCLUDED' => 'N',
                            'QUANTITY' => 1
                        ],
                        [//product with tax include
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRICE' => $arProduct['PRICE'],
                            'TAX_RATE' => 15,
                            'TAX_INCLUDED' => 'Y',
                            'QUANTITY' => 1
                        ],
                        [//product with discount
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRICE' => $arProduct['PRICE'],
                            'DISCOUNT_SUM' => 100,
                            'DISCOUNT_TYPE_ID' => 1,//is sum discount type
                            'QUANTITY' => 1
                        ],
                        [//product with a real discount
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRICE' => $arProduct['PRICE'] - 100,
                            'DISCOUNT_SUM' => 100,
                            'DISCOUNT_TYPE_ID' => 1,//is sum discount type
                            'QUANTITY' => 1
                        ],
                        [//product with discount percent
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRICE_EXCLUSIVE' => $arProduct['PRICE'],
                            'DISCOUNT_RATE' => 10,
                            'DISCOUNT_TYPE_ID' => 2,//is percent discount type
                            'QUANTITY' => 1
                        ],
                        [//product with real discount percent
                            'PRODUCT_ID' => $arProduct['ID'],
                            'PRICE_EXCLUSIVE' => $arProduct['PRICE'] - ($arProduct['PRICE'] * 0.1),
                            'DISCOUNT_RATE' => 10,
                            'DISCOUNT_TYPE_ID' => 2,//is percent discount type
                            'QUANTITY' => 1
                        ],
                    ]
                ]
            );
        }
        else
        {
            echo 'Error create quote';
        }
    }
    else
    {
        echo 'Error create company';
    }
    ?>
    ```

{% endlist %}
