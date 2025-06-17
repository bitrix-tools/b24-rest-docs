# Добавить повторный лид

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на чтение лидов, контактов, компаний и правом на создание лидов

Когда клиент заполняет форму на сайте, его данные передаются в обработчик. Скрипт ищет в CRM совпадения по телефону или электронной почте среди лидов, контактов и компаний. Если совпадения найдены, лид помечается как повторный и привязывается к имеющейся записи. Такой подход помогает избежать дублей и повышает эффективность работы менеджеров.

{% note info "" %}

В Битрикс24 должен быть включен режим работы с повторными лидами. Подробнее читайте в статье [Повторные лиды и сделки](https://helpdesk.bitrix24.ru/open/17707848/).

{% endnote %}

Настройка состоит из двух этапов:

1. Подготавливаем поля и размещаем форму на странице.

2. Создаем файл-обработчик, который вызывает последовательно методы [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md), [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md), [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

## 1\. Создаем веб-форму

Создаем HTML-форму с полями:

- `NAME` — имя клиента, обязательное поле,

- `LAST_NAME` — фамилия,

- `PHONE` — телефон,

- `EMAIL` — электронная почта.

Форма передает данные методом `POST` в файл `form.php`.

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

## 2\. Создаем обработчик формы

Создаем файл `form.php`. Обработчик будет обрабатывать данные, проверять дубликаты и создавать лид.

### Получаем данные из формы

Получаем и безопасно обрабатываем данные из полей `NAME`, `LAST_NAME`, `PHONE`, `EMAIL`, чтобы избежать XSS-атак.

```php
$sName = htmlspecialchars($_POST["NAME"]);    
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);
```

Формируем массив `$arFields` с данными нового лида.

```php
$arFields = [
    'TITLE' => 'From the site: ' . implode(' ', [$sName, $sLastName]),
    'NAME' => (!empty($sName)) ? $sName : 'Empty name',
    'LAST_NAME' => $sLastName,
    'PHONE' => (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'HOME')) : array(),
    'EMAIL' => (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array()
];
```

Заголовок лида формируем как `From the site: Имя Фамилия`.

Система хранит телефон и электронную почту как массивы объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому формируем массивы `PHONE` и `EMAIL` с помощью значений `$sPhone` и `$sEmail`.

- В поля `VALUE` записываем `$sPhone` и `$sEmail`.

- В поля `VALUE_TYPE` передаем [типы](../../../api-reference/crm/data-types.md#crm_multifield), например, `HOME`.

Если в переменных `$sPhone` и `$sEmail` нет значений, указываем пустые массивы.

### Ищем дубликаты лидов

Чтобы найти повторяющиеся лиды по телефону и электронной почте, используем метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) дважды. В него нужно передать следующие данные:

- `entity_type` — тип объекта. Передаем `LEAD` — лид.

- `type` — тип коммуникации. При первом вызове указываем `PHONE`, при втором — `EMAIL`.

- `PHONE` — массив с телефоном `$arPhone`, который получили из формы.

Поиск по телефону,  `"type" => "PHONE"`.

```php
if(!empty($sPhone)){
    $arResultDuplicate = CRest::call('crm.duplicate.findbycomm',[
        "entity_type" => "LEAD",
        "type" => "PHONE",
        "values" => array($sPhone)
    ]);
    if(!empty($arResultDuplicate['result']['LEAD'])){
        $arLeadDuplicate = array_merge ($arLeadDuplicate,$arResultDuplicate['result']['LEAD']);
    }
}
```

Поиск дубликатов по электронной почте, `"type" => "EMAIL"`.

```php
if(!empty($sEmail)){
    $arResultDuplicate = CRest::call('crm.duplicate.findbycomm',[
        "entity_type" => "LEAD",
        "type" => "EMAIL",
        "values" => array($sEmail)
    ]);
    if(!empty($arResultDuplicate['result']['LEAD'])){
        $arLeadDuplicate = array_merge ($arLeadDuplicate,$arResultDuplicate['result']['LEAD']);
    }
}
```

Идентификаторы найденных дубликатов объединяем в массиве `$arLeadDuplicate`.

### Обрабатываем дубликаты

Если дубликаты найдены, вызываем метод [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md).

1. Применяем фильтр по идентификатору и статусу `CONVERTED`.

2. Выбираем поля: `ID`, `COMPANY_ID,` `CONTACT_ID`.

3. Сохраняем результат в массиве `$arDuplicateLead`.

4. Заполняем поля `COMPANY_ID` и `CONTACT_ID` в массиве `$arFields` значениями из `$arDuplicateLead`.

```php
if(!empty($arLeadDuplicate)){
    $arDuplicateLead = CRest::call('crm.lead.list',[
        "filter" => [
            '=ID' => $arLeadDuplicate,
            'STATUS_ID' => 'CONVERTED'
        ],
        "select" => ['ID', 'COMPANY_ID', 'CONTACT_ID']
    ]);

    if(!empty($arDuplicateLead['result'])){
        $sCompany = reset(array_diff(array_column($arDuplicateLead['result'],'COMPANY_ID','ID'),['']));
        $sContact = reset(array_diff(array_column($arDuplicateLead['result'],'CONTACT_ID','ID'),['']));
        if($sCompany > 0) $arFields['COMPANY_ID'] = $sCompany;
        if($sContact > 0) $arFields['CONTACT_ID'] = $sContact;
    }
}
```

### Добавляем новый лид

Чтобы добавить лид, используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В него передаем массив `$arFields`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

```php
$result = CRest::call('crm.lead.add', [
    'fields' => $arFields
]);
```

Если лид создан успешно, метод вернет его идентификатор. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

```json
{
    "result": 3289,
}
```

### Полный пример кода обработчика

```php
<?
$sName = htmlspecialchars($_POST["NAME"]);    
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);
        
$arFields = [
    'TITLE' => (!empty($sName)) ? $sName : 'Empty name',
    'LAST_NAME' => $sLastName,
    'PHONE' => (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'HOME')) : array(),
    'EMAIL' => (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array()
];
    
$arLeadDuplicate = [];
if(!empty($sPhone)){ // поиск дубликатов по телефону
    $arResultDuplicate = CRest::call('crm.duplicate.findbycomm',[
        "entity_type" => "LEAD",
        "type" => "PHONE",
        "values" => array($sPhone)
    ]);
    if(!empty($arResultDuplicate['result']['LEAD'])){
        $arLeadDuplicate = array_merge ($arLeadDuplicate,$arResultDuplicate['result']['LEAD']);
    }
}
    
if(!empty($sEmail)) { // поиск дубликатов по email
    $arResultDuplicate = CRest::call('crm.duplicate.findbycomm', [
        "entity_type" => "LEAD",
        "type" => "EMAIL",
        "values" => [$sEmail]
    ]);
    if(!empty($arResultDuplicate[ 'result' ][ 'LEAD' ])) {
        $arLeadDuplicate = array_merge($arLeadDuplicate, $arResultDuplicate[ 'result' ][ 'LEAD' ]);
    }
}
    
if(!empty($arLeadDuplicate)){ // получение дубликата лида с выбором полей связанных контакта и компании
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
    
$result = CRest::call('crm.lead.add', // создание повторного лида
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

## Продолжите изучение 

- [{#T}](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md)
- [{#T}](../../../api-reference/crm/leads/crm-lead-list.md)
- [{#T}](../../../api-reference/crm/leads/crm-lead-add.md)

