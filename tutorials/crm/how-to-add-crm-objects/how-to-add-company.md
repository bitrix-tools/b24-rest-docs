# Как просто добавить компанию

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример размещения на странице сайта формы, после заполнения которой в Битрикс24 создается новая компания.

- Создайте форму на нужной странице:

```html
<form id="form_to_crm">
    <input type="text" name="TITLE" placeholder="Title" required>
    <input type="text" name="EMAIL" placeholder="E-mail">
    <input type="text" name="PHONE" placeholder="Phone">
    <input type="submit" value="Submit">
</form>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    $(document).ready(function() {
        $('#form_to_crm').on( 'submit', function(el) {//event submit form
            el.preventDefault();//the default action of the event will not be triggered
            var formData = $(this).serialize();
            $.ajax({
                'method': 'POST',
                'dataType': 'json',
                'url': 'form.php', // файл для сохранения заполненных форм form.js или form.php
                'data': formData,
                success: function(data){//success callback
                    alert(data.message);
                }
            });
        });
    });
</script>
```

- Создайте файл, для сохранения заполненных форм:

{% list tabs %}

- JS

    ```js
    var sTitle = BX24.placement.call('getValue', 'TITLE');
    var sPhone = BX24.placement.call('getValue', 'PHONE');
    var sEmail = BX24.placement.call('getValue', 'EMAIL');

    var arPhone = sPhone ? [{ 'VALUE': sPhone, 'VALUE_TYPE': 'WORK' }] : [];
    var arEmail = sEmail ? [{ 'VALUE': sEmail, 'VALUE_TYPE': 'HOME' }] : [];

    BX24.callMethod(
        'crm.company.add',
        {
            'fields': {
                "TITLE": sTitle, // *Company Name[string]
                "COMPANY_TYPE": 'CUSTOMER', // Company type[crm_status {CUSTOMER:"Client", SUPPLIER:"Supplier", COMPETITOR:"Competitor", PARTNER:"Partner", OTHER:"Other"}]// BX24.callMethod('crm.status.list', { 'filter': { 'ENTITY_ID': 'COMPANY_TYPE' } });
                "PHONE": arPhone, // Phone[crm_multifield]
                "EMAIL": arEmail, // E-mail[crm_multifield]
                // "LOGO": '', // Logo[file]
                // "ADDRESS": '', // Street address[string]
                // "ADDRESS_2": '', // Address (line 2)[string]
                // "ADDRESS_CITY": '', // City[string]
                // "ADDRESS_POSTAL_CODE": '', // Zip[string]
                // "ADDRESS_REGION": '', // Region[string]
                // "ADDRESS_PROVINCE": '', // State / Province[string]
                // "ADDRESS_COUNTRY": '', // Country[string]
                // "ADDRESS_COUNTRY_CODE": '', // Country Code[string]
                // "ADDRESS_LEGAL": '', // Legal address[string]
                // "REG_ADDRESS": '', // Billing Address[string]
                // "REG_ADDRESS_2": '', // Billing Address (line 2)[string]
                // "REG_ADDRESS_CITY": '', // Billing City[string]
                // "REG_ADDRESS_POSTAL_CODE": '', // Billing Zip[string]
                // "REG_ADDRESS_REGION": '', // Billing Region[string]
                // "REG_ADDRESS_PROVINCE": '', // Billing State / Province[string]
                // "REG_ADDRESS_COUNTRY": '', // Billing Country[string]
                // "REG_ADDRESS_COUNTRY_CODE": '', // Billing Country Code[string]
                // "BANKING_DETAILS": '', // Payment details[string]
                // "INDUSTRY": '', // Industry[crm_status {IT:"Information Technology", TELECOM:"Telecommunication", MANUFACTURING:"Manufacturing", BANKING:"Banking Services", CONSULTING:"Consulting", FINANCE:"Finance", GOVERNMENT:"Government", DELIVERY:"Delivery", ENTERTAINMENT:"Entertainment", NOTPROFIT:"Non-profit", OTHER:"Other"}]// BX24.callMethod('crm.status.list', { 'filter': { 'ENTITY_ID': 'INDUSTRY' } });
                // "EMPLOYEES": '', // Employees[crm_status {EMPLOYEES_1:"less than 50", EMPLOYEES_2:"50 to 250", EMPLOYEES_3:"250 to 500", EMPLOYEES_4:"over 500"}]// BX24.callMethod('crm.status.list', { 'filter': { 'ENTITY_ID': 'EMPLOYEES' } });
                // "CURRENCY_ID": '', // Currency[crm_currency]// BX24.callMethod('crm.currency.list');
                // "REVENUE": '', // Annual revenue[double]
                // "OPENED": '', // Available to everyone[char]
                // "COMMENTS": '', // Comment[string]
                // "HAS_PHONE": '', // Has phone[char]
                // "HAS_EMAIL": '', // Has email[char]
                // "HAS_IMOL": '', // Has Open Channel[char]
                // "IS_MY_COMPANY": '', // My Company[char]
                // "ASSIGNED_BY_ID": '', // Responsible person[user]
                // "CREATED_BY_ID": '', // Created by[user]
                // "MODIFY_BY_ID": '', // Modified by[user]
                // "DATE_CREATE": '', // Created on[datetime]
                // "DATE_MODIFY": '', // Modified on[datetime]
                // "CONTACT_ID": '', // Contact[crm_contact]// BX24.callMethod('crm.contact.list');
                // "LEAD_ID": '', // Lead[crm_lead]
                // "ORIGINATOR_ID": '', // External source[string]
                // "ORIGIN_ID": '', // Item ID in data source[string]
                // "ORIGIN_VERSION": '', // Original version[string]
                // "UTM_SOURCE": '', // Ad system[string]
                // "UTM_MEDIUM": '', // Medium[string]
                // "UTM_CAMPAIGN": '', // Ad campaign UTM[string]
                // "UTM_CONTENT": '', // Campaign contents[string]
                // "UTM_TERM": '', // Campaign search term[string]
                // "WEB": '', // Website[crm_multifield]
                // "IM": '', // Messenger[crm_multifield]
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error() + ': ' + result.error_description());
                console.log(JSON.stringify({ 'message': 'Company not added: ' + result.error_description() }));
            } else {
                console.log(JSON.stringify({ 'message': 'Company add' }));
            }
        }
    );
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $sTitle = htmlspecialchars($_POST["TITLE"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);

    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

    $result = CRest::call(
        'crm.company.add',
        [
            'fields' =>[
                "TITLE" => $sTitle,//*Company Name[string]
                "COMPANY_TYPE" => 'CUSTOMER',//Company type[crm_status {CUSTOMER:"Client", SUPPLIER:"Supplier", COMPETITOR:"Competitor", PARTNER:"Partner", OTHER:"Other"}]// CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'COMPANY_TYPE']]);
                "PHONE" => $arPhone,//Phone[crm_multifield]
                "EMAIL" => $arEmail,//E-mail[crm_multifield]
                //"LOGO" => '',//Logo[file]
                //"ADDRESS" => '',//Street address[string]
                //"ADDRESS_2" => '',//Address (line 2)[string]
                //"ADDRESS_CITY" => '',//City[string]
                //"ADDRESS_POSTAL_CODE" => '',//Zip[string]
                //"ADDRESS_REGION" => '',//Region[string]
                //"ADDRESS_PROVINCE" => '',//State / Province[string]
                //"ADDRESS_COUNTRY" => '',//Country[string]
                //"ADDRESS_COUNTRY_CODE" => '',//Country Code[string]
                //"ADDRESS_LEGAL" => '',//Legal address[string]
                //"REG_ADDRESS" => '',//Billing Address[string]
                //"REG_ADDRESS_2" => '',//Billing Address (line 2)[string]
                //"REG_ADDRESS_CITY" => '',//Billing City[string]
                //"REG_ADDRESS_POSTAL_CODE" => '',//Billing Zip[string]
                //"REG_ADDRESS_REGION" => '',//Billing Region[string]
                //"REG_ADDRESS_PROVINCE" => '',//Billing State / Province[string]
                //"REG_ADDRESS_COUNTRY" => '',//Billing Country[string]
                //"REG_ADDRESS_COUNTRY_CODE" => '',//Billing Country Code[string]
                //"BANKING_DETAILS" => '',//Payment details[string]
                //"INDUSTRY" => '',//Industry[crm_status {IT:"Information Technology", TELECOM:"Telecommunication", MANUFACTURING:"Manufacturing", BANKING:"Banking Services", CONSULTING:"Consulting", FINANCE:"Finance", GOVERNMENT:"Government", DELIVERY:"Delivery", ENTERTAINMENT:"Entertainment", NOTPROFIT:"Non-profit", OTHER:"Other"}]// CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'INDUSTRY']]);
                //"EMPLOYEES" => '',//Employees[crm_status {EMPLOYEES_1:"less than 50", EMPLOYEES_2:"50 to 250", EMPLOYEES_3:"250 to 500", EMPLOYEES_4:"over 500"}]// CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'EMPLOYEES']]);
                //"CURRENCY_ID" => '',//Currency[crm_currency]// CRest::call('crm.currency.list');
                //"REVENUE" => '',//Annual revenue[double]
                //"OPENED" => '',//Available to everyone[char]
                //"COMMENTS" => '',//Comment[string]
                //"HAS_PHONE" => '',//Has phone[char]
                //"HAS_EMAIL" => '',//Has email[char]
                //"HAS_IMOL" => '',//Has Open Channel[char]
                //"IS_MY_COMPANY" => '',//My Company[char]
                //"ASSIGNED_BY_ID" => '',//Responsible person[user]
                //"CREATED_BY_ID" => '',//Created by[user]
                //"MODIFY_BY_ID" => '',//Modified by[user]
                //"DATE_CREATE" => '',//Created on[datetime]
                //"DATE_MODIFY" => '',//Modified on[datetime]
                //"CONTACT_ID" => '',//Contact[crm_contact]// CRest::call('crm.contact.list');
                //"LEAD_ID" => '',//Lead[crm_lead]
                //"ORIGINATOR_ID" => '',//External source[string]
                //"ORIGIN_ID" => '',//Item ID in data source[string]
                //"ORIGIN_VERSION" => '',//Original version[string]
                //"UTM_SOURCE" => '',//Ad system[string]
                //"UTM_MEDIUM" => '',//Medium[string]
                //"UTM_CAMPAIGN" => '',//Ad campaign UTM[string]
                //"UTM_CONTENT" => '',//Campaign contents[string]
                //"UTM_TERM" => '',//Campaign search term[string]
                //"WEB" => '',//Website[crm_multifield]
                //"IM" => '',//Messenger[crm_multifield]
            ]
        ]
    );
    if(!empty($result['result'])){
        echo json_encode(['message' => 'Company add']);
    }elseif(!empty($result['error_description'])){
        echo json_encode(['message' => 'Company not added: '.$result['error_description']]);
    }else{
        echo json_encode(['message' => 'Company not added']);
    }
    ?>
    ```

{% endlist %}
