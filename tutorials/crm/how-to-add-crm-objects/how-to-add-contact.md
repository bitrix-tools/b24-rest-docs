# Как просто добавить контакт

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример размещения на странице сайта формы по заполнению которой в Битрикс24 создается новый контакт.

- Создаем форму на нужной странице:

```html
<form id="form_to_crm">
    <input type="text" name="NAME" placeholder="Name" required>
    <input type="text" name="LAST_NAME" placeholder="Last name">
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
                'url': 'form.php', // файл для сохранения заполненных форм
                'data': formData,
                success: function(data){//success callback
                    alert(data.message);
                }
            });
        });
    });
</script>
```

- Создаем файл для сохранения заполненных форм:

{% list tabs %}

- JS

    ```js
    var sName = BX24.placement.call('getValue', 'NAME');
    var sLastName = BX24.placement.call('getValue', 'LAST_NAME');
    var sPhone = BX24.placement.call('getValue', 'PHONE');
    var sEmail = BX24.placement.call('getValue', 'EMAIL');

    var arPhone = sPhone ? [{ 'VALUE': sPhone, 'VALUE_TYPE': 'WORK' }] : [];
    var arEmail = sEmail ? [{ 'VALUE': sEmail, 'VALUE_TYPE': 'HOME' }] : [];

    BX24.callMethod(
        'crm.contact.add',
        {
            'fields': {
                'NAME': sName, // *First name[string]
                'LAST_NAME': sLastName, // *Last name[string]
                'PHONE': arPhone, // Phone[crm_multifield]
                'EMAIL': arEmail, // E-mail[crm_multifield]
                // "HONORIFIC": '', // Salutation[crm_status {HNR_EN_1:"Mr.", HNR_EN_2:"Mrs.", HNR_EN_3:"Ms.", HNR_EN_4:"Dr."}]
                // BX24.callMethod('crm.status.list', { 'filter': { 'ENTITY_ID': 'HONORIFIC' } });
                // "SECOND_NAME": '', // *Second name[string]
                // "PHOTO": '', // Photo[file]
                // "BIRTHDATE": '', // Date of birth[date]
                // "TYPE_ID": '', // Contact type[crm_status {CLIENT:"Clients", SUPPLIER:"Suppliers", PARTNER:"Partners", OTHER:"Other"}]
                // BX24.callMethod('crm.status.list', { 'filter': { 'ENTITY_ID': 'CONTACT_TYPE' } });
                // "SOURCE_ID": '', // Source[crm_status {CALL:"Call", EMAIL:"E-Mail", WEB:"Website", ADVERTISING:"Advertising",
                // PARTNER:"Existing Client", RECOMMENDATION:"By Recommendation", TRADE_SHOW:"Show/Exhibition", WEBFORM:"CRM form", CALLBACK:"Callback", // RC_GENERATOR:"Sales boost", STORE:"Online Store", OTHER:"Other"}]
                // BX24.callMethod('crm.status.list', { 'filter': { 'ENTITY_ID': 'SOURCE' } });
                // "SOURCE_DESCRIPTION": '', // Description[string]
                // "POST": '', // Position[string]
                // "ADDRESS": '', // Address[string]
                // "ADDRESS_2": '', // Address (line 2)[string]
                // "ADDRESS_CITY": '', // City[string]
                // "ADDRESS_POSTAL_CODE": '', // Zip[string]
                // "ADDRESS_REGION": '', // Region[string]
                // "ADDRESS_PROVINCE": '', // State / Province[string]
                // "ADDRESS_COUNTRY": '', // Country[string]
                // "ADDRESS_COUNTRY_CODE": '', // Country Code[string]
                // "COMMENTS": '', // Comment[string]
                // "OPENED": '', // Available to everyone[char]
                // "EXPORT": '', // Mark for export[char]
                // "HAS_PHONE": '', // Has phone[char]
                // "HAS_EMAIL": '', // Has email[char]
                // "HAS_IMOL": '', // Has Open Channel[char]
                // "ASSIGNED_BY_ID": '', // Responsible person[user]
                // "CREATED_BY_ID": '', // Created by[user]
                // "MODIFY_BY_ID": '', // Modified by[user]
                // "DATE_CREATE": '', // Created on[datetime]
                // "DATE_MODIFY": '', // Modified on[datetime]
                // "COMPANY_ID": '', // Company[crm_company]// BX24.callMethod('crm.company.list');
                // "COMPANY_IDS": '', // COMPANY_IDS[crm_company]// BX24.callMethod('crm.company.list');
                // "LEAD_ID": '', // Lead[crm_lead]
                // "ORIGINATOR_ID": '', // External source[string]
                // "ORIGIN_ID": '', // Item ID in data source[string]
                // "ORIGIN_VERSION": '', // Original version[string]
                // "FACE_ID": '', // FaceID connection[integer]
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
                console.log(JSON.stringify({ 'message': 'Contact not added: ' + result.error_description() }));
            } else {
                console.log(JSON.stringify({ 'message': 'Contact add' }));
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
    $sName = htmlspecialchars($_POST["NAME"]);
    $sLastName = htmlspecialchars($_POST["LAST_NAME"]);
    $sPhone = htmlspecialchars($_POST["PHONE"]);
    $sEmail = htmlspecialchars($_POST["EMAIL"]);                

    $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
    $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

    $result = CRest::call(
        'crm.contact.add',
        [
            'fields' =>[
                'NAME' => $sName,//*First name[string]
                'LAST_NAME' => $sLastName,//*Last name[string]
                'PHONE' => $arPhone,//Phone[crm_multifield]
                'EMAIL' => $arEmail,//E-mail[crm_multifield]
                //"HONORIFIC" => '',//Salutation[crm_status {HNR_EN_1:"Mr.", HNR_EN_2:"Mrs.", HNR_EN_3:"Ms.", HNR_EN_4:"Dr."}]
                // CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'HONORIFIC']]);
                //"SECOND_NAME" => '',//*Second name[string]
                //"PHOTO" => '',//Photo[file]
                //"BIRTHDATE" => '',//Date of birth[date]
                //"TYPE_ID" => '',//Contact type[crm_status {CLIENT:"Clients", SUPPLIER:"Suppliers", PARTNER:"Partners", OTHER:"Other"}]
                // CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'CONTACT_TYPE']]);
                //"SOURCE_ID" => '',//Source[crm_status {CALL:"Call", EMAIL:"E-Mail", WEB:"Website", ADVERTISING:"Advertising",
                //PARTNER:"Existing Client", RECOMMENDATION:"By Recommendation", TRADE_SHOW:"Show/Exhibition", WEBFORM:"CRM form", CALLBACK:"Callback", //RC_GENERATOR:"Sales boost", STORE:"Online Store", OTHER:"Other"}]
                // CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'SOURCE']]);
                //"SOURCE_DESCRIPTION" => '',//Description[string]
                //"POST" => '',//Position[string]
                //"ADDRESS" => '',//Address[string]
                //"ADDRESS_2" => '',//Address (line 2)[string]
                //"ADDRESS_CITY" => '',//City[string]
                //"ADDRESS_POSTAL_CODE" => '',//Zip[string]
                //"ADDRESS_REGION" => '',//Region[string]
                //"ADDRESS_PROVINCE" => '',//State / Province[string]
                //"ADDRESS_COUNTRY" => '',//Country[string]
                //"ADDRESS_COUNTRY_CODE" => '',//Country Code[string]
                //"COMMENTS" => '',//Comment[string]
                //"OPENED" => '',//Available to everyone[char]
                //"EXPORT" => '',//Mark for export[char]
                //"HAS_PHONE" => '',//Has phone[char]
                //"HAS_EMAIL" => '',//Has email[char]
                //"HAS_IMOL" => '',//Has Open Channel[char]
                //"ASSIGNED_BY_ID" => '',//Responsible person[user]
                //"CREATED_BY_ID" => '',//Created by[user]
                //"MODIFY_BY_ID" => '',//Modified by[user]
                //"DATE_CREATE" => '',//Created on[datetime]
                //"DATE_MODIFY" => '',//Modified on[datetime]
                //"COMPANY_ID" => '',//Company[crm_company]// CRest::call('crm.company.list');
                //"COMPANY_IDS" => '',//COMPANY_IDS[crm_company]// CRest::call('crm.company.list');
                //"LEAD_ID" => '',//Lead[crm_lead]
                //"ORIGINATOR_ID" => '',//External source[string]
                //"ORIGIN_ID" => '',//Item ID in data source[string]
                //"ORIGIN_VERSION" => '',//Original version[string]
                //"FACE_ID" => '',//FaceID connection[integer]
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
        echo json_encode(['message' => 'Contact add']);
    }elseif(!empty($result['error_description'])){
        echo json_encode(['message' => 'Contact not added: '.$result['error_description']]);
    }else{
        echo json_encode(['message' => 'Contact not added']);
    }
    ?>
    ```

{% endlist %}
