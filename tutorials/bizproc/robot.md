# Добавить робота CRM, создающего счет на основании лида или сделки

Для использования данного примера необходимо настроить работу класса CRest и подключить файл crest.php в файлах, где используется данный класс. [Подробнее](../../how-to-use-examples.md).

## Файл регистрирации активити

{% include [Сноска о примерах](../../_includes/examples.md) %}

В файле, регистрирующем активити, необходимо изменить путь `$handlerUrl` на ваш путь до обработчика активити.

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "bizproc.robot.add",
        {
            "CODE": "robotAccount",
            "HANDLER": "https://yourdomain.yyy/handler.php",
            "AUTH_USER_ID": 1,
            "NAME": "RobotAccount",
            "PROPERTIES": {
                "account_title": {
                    "Name": "Format account title",
                    "Description": "",
                    "Type": "string",
                    "Required": "Y",
                    "Multiple": "N",
                    "Default": "Account title"
                },
                "my_company_id": {
                    "Name": "My Company id",
                    "Description": "",
                    "Type": "int",
                    "Required": "Y",
                    "Multiple": "N",
                    "Default": "1"
                },
                "pay_system_id": {
                    "Name": "Pay system id",
                    "Description": "",
                    "Type": "int",
                    "Required": "Y",
                    "Multiple": "N",
                    "Default": "1"
                }
            }
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    ```php
    <?
    $handlerUrl = 'https://yourdomain.yyy/handler.php';
    $result = CRest::call(
        'bizproc.robot.add',
        [
            'CODE' => 'robotAccount',
            'HANDLER' => $handlerUrl,
            'AUTH_USER_ID' => 1,
            'NAME' => 'RobotAccount',
            'PROPERTIES' => [
                'account_title' => [
                    'Name' => 'Format account title',
                    'Description' => '',
                    'Type' => 'string',
                    'Required' => 'Y',
                    'Multiple' => 'N',
                    'Default' => 'Account title',
                ],
                'my_company_id' => [
                    'Name' => 'My Company id',
                    'Description' => '',
                    'Type' => 'int',
                    'Required' => 'Y',
                    'Multiple' => 'N',
                    'Default' => '1',
                ],
                'pay_system_id' => [
                    'Name' => 'Pay system id',
                    'Description' => '',
                    'Type' => 'int',
                    'Required' => 'Y',
                    'Multiple' => 'N',
                    'Default' => '1',
                ],
            ]
        ]
    );
    ?>
    ```

{% endlist %}

## Обработчик активити 

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    let my_company_id = parseInt(BX24.getParam('properties').my_company_id);
    let pay_system_id = parseInt(BX24.getParam('properties').pay_system_id);
    let account_title = BX24.getParam('properties').account_title;
    let arDocument = BX24.getParam('document_id');
    let iDealID = 0;
    let iLeadID = 0;

    if (Array.isArray(arDocument)) {
        arDocument.forEach(param => {
            if (param.includes('DEAL_')) {
                iDealID = parseInt(param.substring('DEAL_'.length));
            } else if (param.includes('LEAD_')) {
                iLeadID = parseInt(param.substring('LEAD_'.length));
            }
        });
    }

    if (iDealID > 0) {
        BX24.callMethod('crm.deal.get', { id: iDealID }, function(result) {
            if (result.data()) {
                let arData = result.data();
                BX24.callMethod('crm.deal.productrows.get', { id: iDealID }, function(resultProduct) {
                    processResult(arData, resultProduct.data());
                });
            }
        });
    } else if (iLeadID > 0) {
        BX24.callMethod('crm.lead.get', { id: iLeadID }, function(result) {
            if (result.data()) {
                let arData = result.data();
                BX24.callMethod('crm.lead.productrows.get', { id: iLeadID }, function(resultProduct) {
                    processResult(arData, resultProduct.data());
                });
            }
        });
    }

    function processResult(arData, resultProduct) {
        if (!arData.COMPANY_ID && !arData.CONTACT_ID) return;

        if (!resultProduct || resultProduct.length === 0) {
            resultProduct = [{
                ID: 0,
                PRODUCT_ID: 0,
                PRODUCT_NAME: account_title,
                QUANTITY: 1,
                PRICE: arData.OPPORTUNITY || 0
            }];
        }

        let arProduct = resultProduct.map(product => ({
            ID: product.ID,
            PRODUCT_ID: product.PRODUCT_ID,
            PRODUCT_NAME: product.PRODUCT_NAME,
            QUANTITY: product.QUANTITY,
            PRICE: product.PRICE
        }));

        BX24.callMethod('crm.invoice.add', {
            fields: {
                ORDER_TOPIC: account_title,
                UF_COMPANY_ID: arData.COMPANY_ID,
                UF_CONTACT_ID: arData.CONTACT_ID,
                UF_DEAL_ID: arData.ID,
                UF_MYCOMPANY_ID: my_company_id,
                PERSON_TYPE_ID: arData.COMPANY_ID > 0 ? 1 : 2,
                PAY_SYSTEM_ID: pay_system_id,
                STATUS_ID: "N",
                DATE_INSERT: new Date().toISOString(),
                DATE_BILL: new Date().toISOString(),
                DATE_PAY_BEFORE: new Date(Date.now() + 3600 * 24 * 20).toISOString(),
                PRODUCT_ROWS: arProduct
            }
        }, function(resultInvoice) {
            if (resultInvoice.error()) {
                console.error(resultInvoice.error());
            } else {
                console.dir(resultInvoice.data());
            }
        });
    }
    ```

- PHP

    ```php
    <?
    $my_company_id = intVal($_REQUEST['properties']['my_company_id']);
    $pay_system_id = intVal($_REQUEST['properties']['pay_system_id']);//some in CRest::call('sale.paysystem.list')
    $account_title = htmlspecialchars($_REQUEST['properties']['account_title']);
    $arDocument = $_REQUEST['document_id'];
    $iDealID = 0;
    $iLeadID = 0;
    if (is_array($arDocument))
    {
        foreach ($arDocument as $param)
        {//search id
            if (strpos($param, 'DEAL_') !== false)
            {
                $iDealID = intVal(substr($param, strlen('DEAL_')));
                break;
            }
            elseif(strpos($param, 'LEAD_') !== false)
            {
                $iLeadID = intVal(substr($param, strlen('LEAD_')));
                break;
            }
        }
    }
    if ($iDealID > 0)
    {
        $result = CRest::call(
            'crm.deal.get',
            [
                'id' => $iDealID
            ]
        );
        if (!empty($result['result']))
        {
            $arData = $result['result'];
            $resultProduct = CRest::call(
                'crm.deal.productrows.get',
                [
                    'id' => $iDealID
                ]
            );
        }
    }
    elseif($iLeadID > 0)
    {
        $result = CRest::call(
            'crm.lead.get',
            [
                'id' => $iLeadID
            ]
        );
        if (!empty($result['result']))
        {
            $arData = $result['result'];
            $resultProduct = CRest::call(
                'crm.lead.productrows.get',
                [
                    'id' => $iLeadID
                ]
            );
        }
    }
    if(!empty($arData['COMPANY_ID']) || !empty($arData['CONTACT_ID']))
    {
        if (empty($resultProduct['result']))
        {//if the deal or lead has no products
            $resultProduct['result'][] = [
                'ID' => 0,
                'PRODUCT_ID' => 0,
                'PRODUCT_NAME' => $account_title,
                'QUANTITY' => 1,
                'PRICE' => ($arData['OPPORTUNITY'])?:0,
            ];
        }
        $arProduct = [];
        foreach ($resultProduct['result'] as $product)
        {
            $arProduct[] = [
                'ID' => $product['ID'],
                'PRODUCT_ID' => $product['PRODUCT_ID'],
                'PRODUCT_NAME' => $product['PRODUCT_NAME'],
                'QUANTITY' => $product['QUANTITY'],
                'PRICE' => $product['PRICE']
            ];
        }
        $resultInvoice = CRest::call(
            'crm.invoice.add',
            [
                'fields' => [
                    'ORDER_TOPIC' => $account_title,
                    'UF_COMPANY_ID' => $arData['COMPANY_ID'],
                    'UF_CONTACT_ID' => $arData['CONTACT_ID'],
                    'UF_DEAL_ID' => $arData['ID'],
                    'UF_MYCOMPANY_ID' => $my_company_id,
                    'PERSON_TYPE_ID' => ($arData['COMPANY_ID'] > 0) ? 1 : 2,//1 is company, 2 is contact in CRest::call('crm.persontype.list')
                    'PAY_SYSTEM_ID' => $pay_system_id,
                    "STATUS_ID" => "N",
                    'DATE_INSERT' => date(DATE_ATOM),
                    'DATE_BILL' => date(DATE_ATOM),
                    'DATE_PAY_BEFORE' => date(DATE_ATOM, time() + 3600 * 24 * 20),//20 day pay
                    'PRODUCT_ROWS' => $arProduct,
                ]
            ]
        );
    }
    ?>
    ```

{% endlist %}
