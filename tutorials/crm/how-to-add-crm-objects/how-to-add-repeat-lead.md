# Добавить повторный лид

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример разместит на странице сайта форму CRM. По заполнении формы в Битрикс24 будет создаваться новый лид как повторный с привязкой к нему контакта или компании из старых лидов.

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

            let arFields = {
                'TITLE': 'From the site: ' + [sName, sLastName].join(' '),
                'NAME': sName || 'Empty name',
                'LAST_NAME': sLastName,
                'PHONE': sPhone ? [{ 'VALUE': sPhone, 'VALUE_TYPE': 'HOME' }] : [],
                'EMAIL': sEmail ? [{ 'VALUE': sEmail, 'VALUE_TYPE': 'HOME' }] : []
            };

            let arLeadDuplicate = [];

            function findDuplicates(type, values) {
                return new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.duplicate.findbycomm',
                        {
                            "entity_type": "LEAD",
                            "type": type,
                            "values": values
                        },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data().LEAD || []);
                            }
                        }
                    );
                });
            }

            function getConvertedLeads(leadIds) {
                return new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.lead.list',
                        {
                            "filter": {
                                '=ID': leadIds,
                                'STATUS_ID': 'CONVERTED'
                            },
                            'select': ['ID', 'COMPANY_ID', 'CONTACT_ID']
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
            }

            async function processForm() {
                try {
                    if (sPhone) {
                        let phoneDuplicates = await findDuplicates("PHONE", [sPhone]);
                        arLeadDuplicate = arLeadDuplicate.concat(phoneDuplicates);
                    }

                    if (sEmail) {
                        let emailDuplicates = await findDuplicates("EMAIL", [sEmail]);
                        arLeadDuplicate = arLeadDuplicate.concat(emailDuplicates);
                    }

                    if (arLeadDuplicate.length > 0) {
                        let convertedLeads = await getConvertedLeads(arLeadDuplicate);
                        let companyIds = convertedLeads.map(lead => lead.COMPANY_ID).filter(id => id);
                        let contactIds = convertedLeads.map(lead => lead.CONTACT_ID).filter(id => id);

                        if (companyIds.length > 0) {
                            arFields['COMPANY_ID'] = companyIds[0];
                        }

                        if (contactIds.length > 0) {
                            arFields['CONTACT_ID'] = contactIds[0];
                        }
                    }

                    BX24.callMethod(
                        'crm.lead.add',
                        {
                            'fields': arFields
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
                } catch (error) {
                    console.error(error);
                    alert('An error occurred: ' + error.message);
                }
            }

            processForm();
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
            
    $arFields = [
        'TITLE'         => 'From the site: ' . implode(' ', [$sName, $sLastName]),
        'NAME'         => (!empty($sName)) ? $sName : 'Empty name',//if simple mode crm NAME or LAST_NAME required for converting to contact
        'LAST_NAME' => $sLastName,
        'PHONE'         => (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'HOME')) : array(),
        'EMAIL'         => (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array()
    ];
        
    $arLeadDuplicate = [];
    if(!empty($sPhone)){//search duplicate by phone
        $arResultDuplicate = CRest::call('crm.duplicate.findbycomm',[
            "entity_type" => "LEAD",
            "type" => "PHONE",
            "values" => array($sPhone)
        ]);
        if(!empty($arResultDuplicate['result']['LEAD'])){
            $arLeadDuplicate = array_merge ($arLeadDuplicate,$arResultDuplicate['result']['LEAD']);
        }
    }
        
    if(!empty($sEmail)) {//search duplicate by email
        $arResultDuplicate = CRest::call('crm.duplicate.findbycomm', [
            "entity_type" => "LEAD",
            "type" => "EMAIL",
            "values" => [$sEmail]
        ]);
        if(!empty($arResultDuplicate[ 'result' ][ 'LEAD' ])) {
            $arLeadDuplicate = array_merge($arLeadDuplicate, $arResultDuplicate[ 'result' ][ 'LEAD' ]);
        }
    }
        
    if(!empty($arLeadDuplicate)){//get converted duplicate lead and filling $arFields COMPANY_ID or CONTACT_ID
        $arDuplicateLead = CRest::call('crm.lead.list',[
            "filter" => [
                '=ID' => $arLeadDuplicate,
                'STATUS_ID' => 'CONVERTED',
            ],
            'select' => [
                'ID', 'COMPANY_ID', 'CONTACT_ID'
            ]
        ]);
            
        if(!empty($arDuplicateLead['result'])){
            $sCompany = reset(array_diff(array_column($arDuplicateLead['result'],'COMPANY_ID','ID'),['']));
            $sContact = reset(array_diff(array_column($arDuplicateLead['result'],'CONTACT_ID','ID'),['']));
            if($sCompany > 0)
                $arFields['COMPANY_ID'] = $sCompany;
            if($sContact > 0)
                $arFields['CONTACT_ID'] = $sContact;
        }
    }
        
    $result = CRest::call('crm.lead.add',
        [
            'fields'    => $arFields
        ]
    );
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

