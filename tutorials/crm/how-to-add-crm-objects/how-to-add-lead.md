# Как добавить лид 

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример позволит разместить на любой странице вашего сайта форму, заполняя которую в битрикс24 будет создаваться новый лид.

- Создаем форму на нужной странице:

```html
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
    
<form id="form_to_crm">
    <input type="text" name="NAME" placeholder="Name" required>
    <input type="text" name="LAST_NAME" placeholder="Last name">
    <input type="text" name="PHONE" placeholder="Phone">
    <input type="text" name="EMAIL" placeholder="E-mail">
    <input type="submit" value="Submit">
</form>
```

- Создаем файл для сохранения заполненных форм:

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('form_to_crm').addEventListener('submit', function(el) {
            el.preventDefault();
            let formData = new FormData(this);
            let sName = formData.get("NAME");
            let sLastName = formData.get("LAST_NAME");
            let sPhone = formData.get("PHONE");
            let sEmail = formData.get("EMAIL");

            let arPhone = sPhone ? [{ 'VALUE': sPhone, 'VALUE_TYPE': 'WORK' }] : [];
            let arEmail = sEmail ? [{ 'VALUE': sEmail, 'VALUE_TYPE': 'HOME' }] : [];

            BX24.callMethod(
                'crm.lead.add',
                {
                    'fields': {
                        'TITLE': 'From the site: ' + [sName, sLastName].join(' '),
                        'NAME': sName,
                        'LAST_NAME': sLastName,
                        'PHONE': arPhone,
                        'EMAIL': arEmail
                    }
                },
                function(result) {
                    if (result.error()) {
                        console.error(result.error());
                        alert('Lead not added: ' + result.error_description());
                    } else {
                        alert('Lead add');
                    }
                }
            );
        });
    });
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
            
        //Форматируем телефон и почту для сохранения
        $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
        $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

        $result = CRest::call(
            'crm.lead.add',
            [
            'fields' =>[
                'TITLE' => 'From the site: '.implode(' ',[$sName,$sLastName]),//*Lead Name[string]
                'NAME' => $sName,//Name[string]
                'LAST_NAME' => $sLastName,//Last name[string]
                'PHONE' => $arPhone,//Phone[crm_multifield]
                'EMAIL' => $arEmail,//E-mail[crm_multifield]
                //'HONORIFIC' => '',//Salutation[string]
                //'SECOND_NAME' => '',//Second name[string]
                //'BIRTHDATE' => '',//Date of birth[date]
                //'COMPANY_TITLE' => '',//Company name[string]
                //'SOURCE_ID' => '',//Source[crm_status {CALL:"Call", EMAIL:"E-Mail", WEB:"Website",
                //ADVERTISING:"Advertising", PARTNER:"Existing Client", RECOMMENDATION:"By Recommendation",
                // TRADE_SHOW:"Show/Exhibition", WEBFORM:"CRM form", CALLBACK:"Callback", RC_GENERATOR:"Sales boost", STORE:"Online Store", OTHER:"Other"}]
                // CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'SOURCE']]);
                //'SOURCE_DESCRIPTION' => '',//Source information[string]
                //'STATUS_ID' => '',//Status[crm_status {NEW:"Unassigned", IN_PROCESS:"In Progress", PROCESSED:"Processed",
                // CONVERTED:"Good lead", JUNK:"Junk Lead"}]// CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'STATUS']]);
                //'STATUS_DESCRIPTION' => '',//Status information[string]
                //'STATUS_SEMANTIC_ID' => '',//Status details[string]
                //'POST' => '',//Position[string]
                //'ADDRESS' => '',//Address[string]
                //'ADDRESS_2' => '',//Address (line 2)[string]
                //'ADDRESS_CITY' => '',//City[string]
                //'ADDRESS_POSTAL_CODE' => '',//Zip[string]
                //'ADDRESS_REGION' => '',//Region[string]
                //'ADDRESS_PROVINCE' => '',//State / Province[string]
                //'ADDRESS_COUNTRY' => '',//Country[string]
                //'ADDRESS_COUNTRY_CODE' => '',//Country Code[string]
                //'CURRENCY_ID' => '',//Currency[crm_currency]// CRest::call('crm.currency.list');
                //'OPPORTUNITY' => '',//Total[double]
                //'OPENED' => '',//Available to everyone[char]
                //'COMMENTS' => '',//Comment[string]
                //'HAS_PHONE' => '',//Has phone[char]
                //'HAS_EMAIL' => '',//Has email[char]
                //'HAS_IMOL' => '',//Has Open Channel[char]
                //'ASSIGNED_BY_ID' => '',//Responsible person[user]
                //'CREATED_BY_ID' => '',//Created by[user]
                //'MODIFY_BY_ID' => '',//Modified by[user]
                //'DATE_CREATE' => '',//Created on[datetime]
                //'DATE_MODIFY' => '',//Modified on[datetime]
                //'COMPANY_ID' => '',//Company[crm_company]// CRest::call('crm.company.list');
                //'CONTACT_ID' => '',//Contact[crm_contact]// CRest::call('crm.contact.list');
                //'IS_RETURN_CUSTOMER' => '',//Repeat lead[char]
                //'DATE_CLOSED' => '',//Completed on[datetime]
                //'ORIGINATOR_ID' => '',//External source[string]
                //'ORIGIN_ID' => '',//Item ID in data source[string]
                //'UTM_SOURCE' => '',//Ad system[string]
                //'UTM_MEDIUM' => '',//Medium[string]
                //'UTM_CAMPAIGN' => '',//Ad campaign UTM[string]
                //'UTM_CONTENT' => '',//Campaign contents[string]
                //'UTM_TERM' => '',//Campaign search term[string]
                //'WEB' => '',//Website[crm_multifield]
                //'IM' => '',//Messenger[crm_multifield]
            ]
        ]);
        if(!empty($result['result'])){
            echo json_encode(['message' => 'Lead add']);
        }elseif(!empty($result['error_description'])){
            echo json_encode(['message' => 'Lead not added: '.$result['error_description']]);
        }else{
            echo json_encode(['message' => 'Lead not added']);
        }
    ?>
    ```

{% endlist %}
