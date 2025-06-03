# Добавить сделку и компанию с реквизитами

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

С помощью веб-формы можно автоматически добавлять новые сделки и компании с реквизитами в Битрикс24. Когда клиент заполняет форму, данные попадают в обработчик. Скрипт-обработчик создает объекты в CRM через API.

Настройка состоит из двух этапов.

1. Подготавливаем поля и размещаем веб-форму на странице.

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md), [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md), [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md) и [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md).

## 1\. Создаем веб-форму

Для формирования полей используем два метода:

-  [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — получаем список полей адреса. Результат сохраняем в массив `$arAddressFields`,

-  [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — получаем список шаблонов реквизитов по полям `ID` и `NAME`. Результат сохраняем в массив `$arRequisiteType`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```php
$arAddressFields = CRest::call('crm.address.fields',[]);
$arRequisiteType = CRest::call('crm.requisite.preset.list',
    [
        'select'=>[
            "ID", "NAME"
        ]
    ]
);
```

Из массива `$arAddressFields` удаляем ненужные поля адреса, чтобы они не отображались в форме.

```php
unset($arAddressFields['result']['TYPE_ID']);
unset($arAddressFields['result']['ENTITY_TYPE_ID']);
unset($arAddressFields['result']['ENTITY_ID']);
unset($arAddressFields['result']['COUNTRY_CODE']);
unset($arAddressFields['result']['ANCHOR_TYPE_ID']);
unset($arAddressFields['result']['ANCHOR_ID']);
```

Создаем HTML-форму с полями:

- `REQ_TYPE` — выпадающий список с шаблонами реквизитов из массива `$arRequisiteType`. Обязательное поле.

- `TITLE` — название компании. Обязательное поле.

- `INN` — ИНН компании.

- `PHONE` — номер телефона.

- `ADDRESS` — поля для адреса создаются динамически из `$arAddressFields`. Если поле обязательное, добавляется атрибут `required`.

Форма собирает данные в строку и отправляет их методом `POST` в файл `form.php`.

```html
<form id="form_to_crm">
    <select name="REQ_TYPE" required>
        <option value="" disabled selected>Select</option>
        <?php foreach($arRequisiteType as $id=>$name):?>
            <option value="<?=$id?>"><?=$name?></option>
        <?php endforeach;?>
    </select>
    <input type="text" name="TITLE" placeholder="Org name" required>
    <input type="text" name="INN" placeholder="INN">
    <input type="text" name="PHONE" placeholder="Phone">
    <?php if(is_array($arAddressFields['result'])):?>
        <?php foreach($arAddressFields['result'] as $key=>$arField):?>
            <input type="text" name="ADDRESS[<?=$key?>]" placeholder="<?=$arField['title']?>" <?=($arField['isRequired'])?'required':'';?>>
        <?php endforeach;?>
    <?php endif;?>
    <input type="submit" value="Submit">
</form>
```

### Полный пример кода

```php
<?php
require_once('crest.php');

$arAddressFields = CRest::call('crm.address.fields',[]);

$arRequisiteType = CRest::call('crm.requisite.preset.list',
    [
        'select'=>[
            "ID", "NAME"
        ]
    ]
);
if(!empty($arRequisiteType['result'])):
    $arRequisiteType = array_column($arRequisiteType['result'],'NAME','ID');
    //unset system address fields
    unset($arAddressFields['result']['TYPE_ID']);
    unset($arAddressFields['result']['ENTITY_TYPE_ID']);
    unset($arAddressFields['result']['ENTITY_ID']);
    //unset uninteresting address fields
    unset($arAddressFields['result']['COUNTRY_CODE']);
    unset($arAddressFields['result']['ANCHOR_TYPE_ID']);
    unset($arAddressFields['result']['ANCHOR_ID']);
    ?>
    <form id="form_to_crm">
        <select name="REQ_TYPE" required>
            <option value="" disabled selected>Select</option>
            <?php foreach($arRequisiteType as $id=>$name):?>
                <option value="<?=$id?>"><?=$name?></option>
            <?php endforeach;?>
        </select>
        <input type="text" name="TITLE" placeholder="Org name" required>
        <input type="text" name="INN" placeholder="INN">
        <input type="text" name="PHONE" placeholder="Phone">
        <?php if(is_array($arAddressFields['result'])):?>
            <?php foreach($arAddressFields['result'] as $key=>$arField):?>
                <input type="text" name="ADDRESS[<?=$key?>]" placeholder="<?=$arField['title']?>" <?=($arField['isRequired'])?'required':'';?>>
            <?php endforeach;?>
        <?php endif;?>
        <input type="submit" value="Submit">
    </form>
<?php else:?>
    No requisite types.
<?php endif;?>
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

## 2\. Создаем обработчик формы

Создаем файл `form.php`, который будет обрабатывать данные и сохранять их в CRM.

### Получаем данные

Получаем и обрабатываем данные из формы.

```php
$iRequisitePresetID = intval($_POST["REQ_TYPE"]); 
$sTitle = htmlspecialchars($_POST["TITLE"]); 
$sINN = htmlspecialchars($_POST["INN"]); 
$sPhone = htmlspecialchars($_POST["PHONE"]);
$arAddress = [];
foreach ($_POST["ADDRESS"] as $key => $val) {
 $arAddress[$key] = htmlspecialchars($val); 
}
```

-  `$iRequisitePresetID` — преобразуем идентификатор шаблона реквизитов `REQ_TYPE` в целое число.

-  `$sTitle`, `$sINN`, `$sPhone` — безопасно обрабатываем данные из `TITLE`, `INN`, `PHONE`, чтобы избежать XSS-атак.

-  `$arAddress` — сохраняем данные из массива с адресными полями `ADDRESS`.

### Подготавливаем данные

Добавляем в массив `$arAddress` два обязательных системных поля.

-  `TYPE_ID` — тип адреса. Укажем `1` — фактический адрес. Список типов адресов можно получить с помощью метода [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md).

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `8` — реквизиты. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

```php
$arAddress['TYPE_ID'] = 1;
$arAddress['ENTITY_TYPE_ID'] = 8;
```

Система хранит телефон как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому значение `$sPhone` нужно привести к формату массива:

-  в первый элемент `VALUE` записываем `$sPhone`,

-  во второй элемент `VALUE_TYPE` передаем, например, `WORK`.

Если в переменной `$sPhone` нет значения, то указываем пустой массив.

```php
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
```

### Добавляем компанию

Чтобы добавить компанию, используем метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md). В него нужно передать следующие данные:

-  `TITLE` — название компании. Передаем `$sTitle`, который получили из формы.

-  `COMPANY_TYPE` — тип компании. Укажем `CUSTOMER` — клиент. Список типов можно получить с помощью метода [crm.status.list](../../../api-reference/crm/status/crm-status-list.md) с фильтром `'filter'=>['ENTITY_ID'=>’COMPANY_TYPE']`.

-  `PHONE` — массив с телефоном `$arPhone`, который получили из формы.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для компаний в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

{% endnote %}

```php
$result = CRest::call(
    'crm.company.add',
    [
        'fields' =>[
            'TITLE' => $sTitle,
            'COMPANY_TYPE' => 'CUSTOMER',
            'PHONE' => $arPhone,
        ]
    ]
);
```

Если компания успешно создана, метод вернет ее идентификатор в `$result`. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

### Добавляем реквизиты

Чтобы добавить реквизиты, используем метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В него нужно передать следующие данные:

-  `ENTITY_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `4` — компания. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

-  `ENTITY_ID` — идентификатор компании. Передаем `$result`, который получили при создании компании.

-  `PRESET_ID` — идентификатор шаблона реквизитов. Указываем `$iRequisitePresetID`, который получили из формы.

-  `NAME` — название реквизита. Передаем `$sTitle`, который получили из формы.

-  `RQ_INN` — ИНН компании. Передаем `$sINN`, который получили из формы.

-  `ACTIVE` — флаг активности, укажем `Y`.

```php
$resultRequisite = CRest::call(
    'crm.requisite.add',
    [
        'fields' =>[
            'ENTITY_TYPE_ID' => 4,
            'ENTITY_ID' => $result['result'],
            'PRESET_ID' => $iRequisitePresetID,
            'ACTIVE' => 'Y',
            'NAME' => $sTitle,
            'RQ_INN' => $sINN,
        ]
    ]
);
```

Если реквизиты успешно добавлены, метод вернет идентификатор записи в `$resultRequisite`. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md).

### Добавляем адрес к реквизитам

1. Добавляем в массив `$arAddress` поле `ENTITY_ID` — идентификатор реквизита. Передаем `$resultRequisite`, который получили при создании реквизита.

   ```php
   $arAddress['ENTITY_ID'] = $resultRequisite['result'];
   ```

2. Используем метод [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md). В него нужно передать массив `$arAddress`.

   ```php
   $resultAddress = CRest::call(
       'crm.address.add',
       [
           'fields' =>$arAddress
       ]
   );
   ```

Метод возвращает в переменной `$resultAddress` одно из значений:

-  `true` — адрес добавлен,

-  `false` — адрес не добавлен.

### **Добавляем сделку**

Создаем массив `$arDealFields` с данными для сделки.

-  `TITLE`  — название сделки. Укажем название компании `$sTitle`, которое получено из формы,

-  `COMPANY_ID` — идентификатор компании, которая привязана к сделке. Передаем `$result`, который получили при создании компании,

-  `REQUISITE_ID` — идентификатор реквизита. Если реквизит создан, передаем `$resultRequisite`.

```php
$arDealFields = [
    'TITLE' => $sTitle,
    'COMPANY_ID' => $result['result']
];
if(!empty($resultRequisite['result'])){
    $arDealFields['REQUISITE_ID'] = $resultRequisite['result'];
}
```

Чтобы добавить сделку, используем метод [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md). В него передаем массив `$arDealFields`.

```php
$resultDeal = CRest::call(
    'crm.deal.add',
    [
        'fields' => $arDealFields
    ]
);
```

Если сделка создана успешно, метод вернет ее идентификатор. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md).

```json
{
    "result": 1789,
}
```

### Полный пример кода обработчика

```php
<?php
require_once('crest.php');

$iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
$sTitle = htmlspecialchars($_POST["TITLE"]);
$sINN = htmlspecialchars($_POST["INN"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$arAddress = [];

foreach($_POST["ADDRESS"] as $key=>$val){
    $arAddress[$key] = htmlspecialchars($val);
}
$arAddress['TYPE_ID'] = 1;//1 is actual address in CRest::call('crm.enum.addresstype');
$arAddress['ENTITY_TYPE_ID'] = 8;//8 - is requisite in CRest::call('crm.enum.ownertype');

$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();

$result = CRest::call(
    'crm.company.add',
    [
        'fields' =>[
            'TITLE' => $sTitle,
            'COMPANY_TYPE' => 'CUSTOMER',//is Client in CRest::call('crm.status.list',['filter'=>['ENTITY_ID'=>'COMPANY_TYPE']])
            'PHONE' => $arPhone,
        ]
    ]
);
if(!empty($result['result'])){
    $resultRequisite = CRest::call(
        'crm.requisite.add',
        [
            'fields' =>[
                'ENTITY_TYPE_ID' => 4,//4 - is company in CRest::call('crm.enum.ownertype');
                'ENTITY_ID' => $result['result'],//company id
                'PRESET_ID' => $iRequisitePresetID,
                'ACTIVE' => 'Y',
                'NAME' => $sTitle,
                'RQ_INN' => $sINN,
            ]
        ]
    );
    $arDealFields = [
        'TITLE' => $sTitle,
        'COMPANY_ID' => $result['result']
    ];
    if(!empty($resultRequisite['result'])){
        $arDealFields['REQUISITE_ID'] = $resultRequisite['result'];//add requisite to deal is analogue "crm.requisite.link.list"
        $arAddress['ENTITY_ID'] = $resultRequisite['result'];//id requisite
        $resultAddress = CRest::call(
            'crm.address.add',
            [
                'fields' =>$arAddress
            ]
        );
    }
    $resultDeal = CRest::call(
        'crm.deal.add',
        [
            'fields' => $arDealFields
        ]
    );
    echo json_encode(['message' => 'add']);
}elseif(!empty($result['error_description'])){
    echo json_encode(['message' => 'not added: '.$result['error_description']]);
}else{
    echo json_encode(['message' => 'not added']);
}
?>
```

## Продолжите изучение 

- [{#T}](../../../api-reference/crm/companies/crm-company-add.md)
- [{#T}](../../../api-reference/crm/requisites/universal/crm-requisite-add.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-add.md)
- [{#T}](../../../api-reference/crm/deals/crm-deal-add.md)
- [{#T}](../../../api-reference/crm/requisites/addresses/crm-address-fields.md)
- [{#T}](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md)
- [{#T}](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md)