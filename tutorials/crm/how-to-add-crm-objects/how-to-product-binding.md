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
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params) {
        const result = await $b24.actions.v2.call.make({ method, params });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    async function createDealWithProducts() {
        try {
            let resultProduct = await call('crm.product.list', {
                'filter': {
                    '>PRICE': 0
                }
            });

            if (resultProduct.length === 0) {
                console.error('Product error, create product in B24');
                return;
            }

            let arProduct = resultProduct[0];

            let dealId = await call('crm.deal.add', {
                'fields': {
                    'TITLE': 'Example'
                }
            });

            if (dealId) {
                await call('crm.deal.productrows.set', {
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
                });

                console.log('Deal and products added successfully');
            } else {
                console.error('Error creating deal');
            }
        } catch (error) {
            console.error('An error occurred: ' + error.message);
        }
    }

    createDealWithProducts();
    ```

- PHP

    ```php
    <?php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $crm = $serviceBuilder->getCRMScope();

    $resultProduct = $serviceBuilder->core->call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    )->getResponseData()->getResult();

    if (empty($resultProduct))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct[0];
    }

    //Deal product
    $ID = $crm->deal()->add(['TITLE' => 'Example'])->getId();
    if ($ID)
    {
        $result = $crm->dealProductRows()->set(
            $ID,
            [
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
        );
    }
    else
    {
        echo 'error create deal';
        exit;
    }
    ?>
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # метод crm.product.list вызываем напрямую через токен
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    try:
        result_product = token.call_method("crm.product.list", {"filter": {">PRICE": 0}})["result"]

        if not result_product:
            print("product error, create product in b24")
        else:
            ar_product = result_product[0]

            # Deal product
            deal_id = client.crm.deal.add(fields={"TITLE": "Example"}).response.result
            client.crm.deal.productrows.set(
                deal_id,
                [
                    {  # product with auto calc tax
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE_EXCLUSIVE": ar_product["PRICE"],
                        "TAX_RATE": 15,
                        "TAX_INCLUDED": "N",
                        "QUANTITY": 1,
                    },
                    {  # product with tax include
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE": ar_product["PRICE"],
                        "TAX_RATE": 15,
                        "TAX_INCLUDED": "Y",
                        "QUANTITY": 1,
                    },
                    {  # product with discount
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE": ar_product["PRICE"],
                        "DISCOUNT_SUM": 100,
                        "DISCOUNT_TYPE_ID": 1,  # is sum discount type
                        "QUANTITY": 1,
                    },
                    {  # product with a real discount
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE": float(ar_product["PRICE"]) - 100,
                        "DISCOUNT_SUM": 100,
                        "DISCOUNT_TYPE_ID": 1,  # is sum discount type
                        "QUANTITY": 1,
                    },
                    {  # product with discount percent
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE_EXCLUSIVE": ar_product["PRICE"],
                        "DISCOUNT_RATE": 10,
                        "DISCOUNT_TYPE_ID": 2,  # is percent discount type
                        "QUANTITY": 1,
                    },
                    {  # product with real discount percent
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE_EXCLUSIVE": float(ar_product["PRICE"]) - (float(ar_product["PRICE"]) * 0.1),
                        "DISCOUNT_RATE": 10,
                        "DISCOUNT_TYPE_ID": 2,  # is percent discount type
                        "QUANTITY": 1,
                    },
                ],
            ).response.result

            print("Deal and products added successfully")
    except BitrixAPIError as error:
        print(f"An error occurred: {error}")
    ```

{% endlist %}

## Прикрепление товаров к лиду

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params) {
        const result = await $b24.actions.v2.call.make({ method, params });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    async function createLeadWithProducts() {
        try {
            let resultProduct = await call('crm.product.list', {
                'filter': {
                    '>PRICE': 0
                }
            });

            if (resultProduct.length === 0) {
                console.error('Product error, create product in B24');
                return;
            }

            let arProduct = resultProduct[0];

            let leadId = await call('crm.lead.add', {
                'fields': {
                    'TITLE': 'Example'
                }
            });

            if (leadId) {
                await call('crm.lead.productrows.set', {
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
                });

                console.log('Lead and products added successfully');
            } else {
                console.error('Error creating lead');
            }
        } catch (error) {
            console.error('An error occurred: ' + error.message);
        }
    }

    createLeadWithProducts();
    ```

- PHP

    ```php
    <?php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $crm = $serviceBuilder->getCRMScope();

    $resultProduct = $serviceBuilder->core->call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    )->getResponseData()->getResult();

    if (empty($resultProduct))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct[0];
    }

    //Lead product
    $ID = $crm->lead()->add(['TITLE' => 'Example'])->getId();
    if ($ID)
    {
        $result = $crm->leadProductRows()->set(
            $ID,
            [
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
        );
    }
    else
    {
        echo 'error create lead';
        exit;
    }
    ?>
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # метод crm.product.list вызываем напрямую через токен
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    try:
        result_product = token.call_method("crm.product.list", {"filter": {">PRICE": 0}})["result"]

        if not result_product:
            print("product error, create product in b24")
        else:
            ar_product = result_product[0]

            # Lead product
            lead_id = client.crm.lead.add(fields={"TITLE": "Example"}).response.result
            client.crm.lead.productrows.set(
                lead_id,
                [
                    {  # product with auto calc tax
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE_EXCLUSIVE": ar_product["PRICE"],
                        "TAX_RATE": 15,
                        "TAX_INCLUDED": "N",
                        "QUANTITY": 1,
                    },
                    {  # product with tax include
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE": ar_product["PRICE"],
                        "TAX_RATE": 15,
                        "TAX_INCLUDED": "Y",
                        "QUANTITY": 1,
                    },
                    {  # product with discount
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE": ar_product["PRICE"],
                        "DISCOUNT_SUM": 100,
                        "DISCOUNT_TYPE_ID": 1,  # is sum discount type
                        "QUANTITY": 1,
                    },
                    {  # product with a real discount
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE": float(ar_product["PRICE"]) - 100,
                        "DISCOUNT_SUM": 100,
                        "DISCOUNT_TYPE_ID": 1,  # is sum discount type
                        "QUANTITY": 1,
                    },
                    {  # product with discount percent
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE_EXCLUSIVE": ar_product["PRICE"],
                        "DISCOUNT_RATE": 10,
                        "DISCOUNT_TYPE_ID": 2,  # is percent discount type
                        "QUANTITY": 1,
                    },
                    {  # product with real discount percent
                        "PRODUCT_ID": ar_product["ID"],
                        "PRICE_EXCLUSIVE": float(ar_product["PRICE"]) - (float(ar_product["PRICE"]) * 0.1),
                        "DISCOUNT_RATE": 10,
                        "DISCOUNT_TYPE_ID": 2,  # is percent discount type
                        "QUANTITY": 1,
                    },
                ],
            ).response.result

            print("Lead and products added successfully")
    except BitrixAPIError as error:
        print(f"An error occurred: {error}")
    ```

{% endlist %}

## Создание счета с товарами

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params) {
        const result = await $b24.actions.v2.call.make({ method, params });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    async function createInvoiceWithProducts() {
        try {
            let resultProduct = await call('crm.product.list', {
                'filter': {
                    '>PRICE': 0
                }
            });

            if (resultProduct.length === 0) {
                console.error('Product error, create product in B24');
                return;
            }

            let arProduct = resultProduct[0];

            let companyId = await call('crm.company.add', {
                'fields': {
                    'TITLE': 'Example'
                }
            });

            if (companyId) {
                await call('crm.invoice.add', {
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
                });

                console.log('Invoice and products added successfully');
            } else {
                console.error('Error creating company');
            }
        } catch (error) {
            console.error('An error occurred: ' + error.message);
        }
    }

    createInvoiceWithProducts();
    ```

- PHP

    ```php
    <?php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $crm = $serviceBuilder->getCRMScope();

    $resultProduct = $serviceBuilder->core->call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    )->getResponseData()->getResult();

    if (empty($resultProduct))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct[0];
    }
    $iCompanyID = $crm->company()->add(['TITLE' => 'Example'])->getId();

    if ($iCompanyID)
    {
        $resultInvoice = $serviceBuilder->core->call(
            'crm.invoice.add',
            [
                'fields' => [
                    'ORDER_TOPIC' => 'Invoice by company with product',
                    'UF_COMPANY_ID' => $iCompanyID,
                    'PERSON_TYPE_ID' => 1,//1 is company in crm.persontype.list
                    'PAY_SYSTEM_ID' => 20,//some in sale.paysystem.list
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

- Python

    ```python
    from datetime import datetime, timedelta

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # методы crm.product.list и crm.invoice.add вызываем напрямую через токен
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    try:
        result_product = token.call_method("crm.product.list", {"filter": {">PRICE": 0}})["result"]

        if not result_product:
            print("product error, create product in b24")
        else:
            ar_product = result_product[0]
            price = float(ar_product["PRICE"])

            company_id = client.crm.company.add(fields={"TITLE": "Example"}).response.result

            if company_id:
                now = datetime.now()
                token.call_method("crm.invoice.add", {
                    "fields": {
                        "ORDER_TOPIC": "Invoice by company with product",
                        "UF_COMPANY_ID": company_id,
                        "PERSON_TYPE_ID": 1,  # 1 is company in crm.persontype.list
                        "PAY_SYSTEM_ID": 20,  # some in sale.paysystem.list
                        "STATUS_ID": "N",
                        "DATE_INSERT": now.isoformat(),
                        "DATE_BILL": now.isoformat(),
                        "DATE_PAY_BEFORE": (now + timedelta(days=20)).isoformat(),  # 20 day pay
                        "PRODUCT_ROWS": [
                            {  # product with tax
                                "PRODUCT_ID": ar_product["ID"],
                                "PRODUCT_NAME": ar_product["NAME"],
                                "PRICE": price + (price * 0.15),
                                "VAT_RATE": 0.15,
                                "QUANTITY": 1,
                            },
                            {  # product with discount sum, percent not supported
                                "PRODUCT_ID": ar_product["ID"],
                                "PRODUCT_NAME": ar_product["NAME"],
                                "PRICE": price,
                                "DISCOUNT_PRICE": 100,
                                "QUANTITY": 1,
                            },
                            {  # product with real discount sum, percent not supported
                                "PRODUCT_ID": ar_product["ID"],
                                "PRODUCT_NAME": ar_product["NAME"],
                                "PRICE": price - 100,
                                "DISCOUNT_PRICE": 100,
                                "QUANTITY": 1,
                            },
                        ],
                    }
                })

                print("Invoice and products added successfully")
            else:
                print("Error creating company")
    except BitrixAPIError as error:
        print(f"An error occurred: {error}")
    ```

{% endlist %}



## Прикрепление товаров к компред

{% list tabs %}

- JS

    ```js
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    async function call(method, params) {
        const result = await $b24.actions.v2.call.make({ method, params });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    async function createQuoteWithProducts() {
        try {
            let resultProduct = await call('crm.product.list', {
                'filter': {
                    '>PRICE': 0
                }
            });

            if (resultProduct.length === 0) {
                console.error('Product error, create product in B24');
                return;
            }

            let arProduct = resultProduct[0];

            let companyId = await call('crm.company.add', {
                'fields': {
                    'TITLE': 'Example'
                }
            });

            if (companyId) {
                let quoteId = await call('crm.quote.add', {
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
                });

                if (quoteId) {
                    await call('crm.quote.productrows.set', {
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
                    });

                    console.log('Quote and products added successfully');
                } else {
                    console.error('Error creating quote');
                }
            } else {
                console.error('Error creating company');
            }
        } catch (error) {
            console.error('An error occurred: ' + error.message);
        }
    }

    createQuoteWithProducts();
    ```

- PHP

    ```php
    <?php
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $logger = new Logger('b24');
    $logger->pushHandler(new StreamHandler('php://stdout'));

    $serviceBuilder = (new ServiceBuilderFactory(new EventDispatcher(), $logger))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $crm = $serviceBuilder->getCRMScope();

    $resultProduct = $serviceBuilder->core->call(
        'crm.product.list',
        [
            'filter' => [
                '>PRICE' => 0,
            ]
        ]
    )->getResponseData()->getResult();

    if (empty($resultProduct))
    {
        echo 'product error, create product in b24';
        exit;
    }
    else
    {
        $arProduct = $resultProduct[0];
    }
    $iCompanyID = $crm->company()->add(['TITLE' => 'Example'])->getId();

    if ($iCompanyID)
    {
        $ID = $crm->quote()->add(
            [
                "TITLE" => "Quote by company with product",
                "OPENED" => "Y",
                "ASSIGNED_BY_ID" => 1,
                "CURRENCY_ID" => "USD",
                "BEGINDATE" => date(DATE_ATOM),
                "CLOSEDATE" => date(DATE_ATOM, time() + 3600 * 24 * 20),//20 day
                'COMPANY_ID' => $iCompanyID,
                'STATUS_ID' => 'N',
            ]
        )->getId();
        if ($ID)
        {
            $result = $crm->quoteProductRows()->set(
                $ID,
                [
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

- Python

    ```python
    from datetime import datetime, timedelta

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    # метод crm.product.list вызываем напрямую через токен
    token = BitrixWebhook(
        domain="your-domain.bitrix24.com",
        webhook_token="user_id/webhook_key",
    )

    try:
        result_product = token.call_method("crm.product.list", {"filter": {">PRICE": 0}})["result"]

        if not result_product:
            print("product error, create product in b24")
        else:
            ar_product = result_product[0]
            company_id = client.crm.company.add(fields={"TITLE": "Example"}).response.result

            if company_id:
                now = datetime.now()
                quote_id = client.crm.quote.add(fields={
                    "TITLE": "Quote by company with product",
                    "OPENED": "Y",
                    "ASSIGNED_BY_ID": 1,
                    "CURRENCY_ID": "USD",
                    "BEGINDATE": now.isoformat(),
                    "CLOSEDATE": (now + timedelta(days=20)).isoformat(),  # 20 day
                    "COMPANY_ID": company_id,
                    "STATUS_ID": "N",
                }).response.result

                if quote_id:
                    client.crm.quote.productrows.set(
                        quote_id,
                        [
                            {  # product with auto calc tax
                                "PRODUCT_ID": ar_product["ID"],
                                "PRICE_EXCLUSIVE": ar_product["PRICE"],
                                "TAX_RATE": 15,
                                "TAX_INCLUDED": "N",
                                "QUANTITY": 1,
                            },
                            {  # product with tax include
                                "PRODUCT_ID": ar_product["ID"],
                                "PRICE": ar_product["PRICE"],
                                "TAX_RATE": 15,
                                "TAX_INCLUDED": "Y",
                                "QUANTITY": 1,
                            },
                            {  # product with discount
                                "PRODUCT_ID": ar_product["ID"],
                                "PRICE": ar_product["PRICE"],
                                "DISCOUNT_SUM": 100,
                                "DISCOUNT_TYPE_ID": 1,  # is sum discount type
                                "QUANTITY": 1,
                            },
                            {  # product with a real discount
                                "PRODUCT_ID": ar_product["ID"],
                                "PRICE": float(ar_product["PRICE"]) - 100,
                                "DISCOUNT_SUM": 100,
                                "DISCOUNT_TYPE_ID": 1,  # is sum discount type
                                "QUANTITY": 1,
                            },
                            {  # product with discount percent
                                "PRODUCT_ID": ar_product["ID"],
                                "PRICE_EXCLUSIVE": ar_product["PRICE"],
                                "DISCOUNT_RATE": 10,
                                "DISCOUNT_TYPE_ID": 2,  # is percent discount type
                                "QUANTITY": 1,
                            },
                            {  # product with real discount percent
                                "PRODUCT_ID": ar_product["ID"],
                                "PRICE_EXCLUSIVE": float(ar_product["PRICE"]) - (float(ar_product["PRICE"]) * 0.1),
                                "DISCOUNT_RATE": 10,
                                "DISCOUNT_TYPE_ID": 2,  # is percent discount type
                                "QUANTITY": 1,
                            },
                        ],
                    ).response.result

                    print("Quote and products added successfully")
                else:
                    print("Error create quote")
            else:
                print("Error create company")
    except BitrixAPIError as error:
        print(f"An error occurred: {error}")
    ```

{% endlist %}
