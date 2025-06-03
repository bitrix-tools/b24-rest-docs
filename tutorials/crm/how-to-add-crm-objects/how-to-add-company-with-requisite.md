# Добавить компанию с реквизитами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания компаний в CRM

На сайте можно разместить форму для сбора данных и реквизитов клиентов. Когда клиент заполнит форму, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместим форму на PHP-странице. В коде страницы получим список шаблонов реквизитов и поля адреса для формы. Данные формы отправим в обработчик.

2. Создадим файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст компанию с реквизитами.

## 1\. Создаем веб-форму

Для формирования полей формы используем данные из Битрикс24. Чтобы получить информацию о настройках реквизитов, выполним последовательно два метода:

1. [crm.address.fields](../../../api-reference/crm/requisites/addresses/crm-address-fields.md) — получаем список полей адреса. Результат сохраняем в `arAddressFields`,

   ```php
   $arAddressFields = CRest::call('crm.address.fields', []);
   ```

2. [crm.requisite.preset.list](../../../api-reference/crm/requisites/presets/crm-requisite-preset-list.md) — запрашиваем список шаблонов реквизитов. С помощью параметра `select` выбираем поля `ID` и `NAME` для каждого шаблона. Результат сохраняем в `arRequisiteType`.

   ```php
   $arRequisiteType = CRest::call(
       'crm.requisite.preset.list', [
           'select' => ["ID", "NAME"]
       ]
   );
   ```

Добавим на страницу сайта веб-форму с полями:

-  `REQ_TYPE` — выпадающий список с типом реквизитов из массива `arRequisiteType`,
  
-  `TITLE` — название компании, обязательное,

-  `INN` — ИНН,

-  `PHONE` — телефон,

-  `${addressFieldsInputs}` — поля адреса, которые создаются динамически из массива `arAddressFields`.

Форма отправляет данные методом `POST` в файл `form.php`.

### Полный пример кода страницы с формой

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```php
<?php
// Получаем список полей адреса и шаблонов реквизитов
$arAddressFields = CRest::call('crm.address.fields', []);
$arRequisiteType = CRest::call('crm.requisite.preset.list', [
    'select' => ["ID", "NAME"]
]);

if(!empty($arRequisiteType['result'])): 
    $arRequisiteType = array_column($arRequisiteType['result'], 'NAME', 'ID');
    // Удаляем системные и неиспользуемые поля адреса
    $excludeFields = ['TYPE_ID', 'ENTITY_TYPE_ID', 'ENTITY_ID', 'COUNTRY_CODE', 'ANCHOR_TYPE_ID', 'ANCHOR_ID'];
    foreach($excludeFields as $field) {
        unset($arAddressFields['result'][$field]);
    }
?>
    <form id="form_to_crm">
        <select name="REQ_TYPE" required>
            <option value="" disabled selected>Выберите тип реквизитов</option>
            <?php foreach($arRequisiteType as $id => $name): ?>
                <option value="<?=$id?>"><?=$name?></option>
            <?php endforeach; ?>
        </select>
        <input type="text" name="TITLE" placeholder="Название организации" required>
        <input type="text" name="INN" placeholder="ИНН">
        <input type="text" name="PHONE" placeholder="Телефон">
        <?php foreach($arAddressFields['result'] as $key => $arField): ?>
            <input type="text" name="ADDRESS[<?=$key?>]" 
                   placeholder="<?=$arField['title']?>" 
                   <?=$arField['isRequired'] ? 'required' : ''?>>
        <?php endforeach; ?>
        <input type="submit" value="Отправить">
    </form>
<?php else: ?>
    <p>Нет доступных типов реквизитов.</p>
<?php endif; ?>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function() {
    $('#form_to_crm').on('submit', function(el) {
        el.preventDefault();
        $.ajax({
            method: 'POST',
            dataType: 'json',
            url: 'form.php',
            data: $(this).serialize(),
            success: function(data) {
                alert(data.message);
            }
        });
    });
});
</script>
```

## 2\. Создаем обработчик формы

Чтобы обработать значения из полей формы и добавить компанию в CRM, создадим обработчик `form.php`.

### Подготавливаем данные

Получаем и очищаем данные из формы:

-  `REQ_TYPE` приводим к числу,

-  `TITLE`, `INN`, `PHONE` очищаем от HTML-тегов.

```php
$iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
$sTitle = htmlspecialchars($_POST["TITLE"]);
$sINN = htmlspecialchars($_POST["INN"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
```

Подготавливаем поля адреса и собираем их в массив `$arAddress`.

-  Значения полей из формы очищаем от HTML-тегов.

-  Добавляем тип адреса `TYPE_ID`. Получить типы адресов можно методом [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md). Укажем значение — `1`, то есть фактический адрес.

-  Добавляем идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type) `ENTITY_TYPE_ID`. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `8`, то есть реквизит.

```php
$arAddress = [];
foreach($_POST["ADDRESS"] as $key => $val) {
    $arAddress[$key] = htmlspecialchars($val);
}
$arAddress['TYPE_ID'] = 1;
$arAddress['ENTITY_TYPE_ID'] = 8;
```

Система хранит телефон как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому его нужно привести к формату массива.

1. Добавляем телефон первым элементом `VALUE` в массив, а вторым значением указываем тип `VALUE_TYPE`, например, `WORK`.

2. Для пустого значения передаем пустой массив.

```php
$arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];
```

### Добавляем компанию

Для создания компании выполним метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md). В объекте `fields` передаем поля:

-  `TITLE` — название компании.

-  `COMPANY_TYPE` — тип компании. Узнать типы компаний можно методом [crm.status.list](../../../api-reference/crm/status/crm-status-list.md), если использовать фильтр `filter` по полю `ENTITY_ID` со значением `COMPANY_TYPE`. В примере укажем значение `CUSTOMER`, так как заполняют форму только клиенты компании.

-  `PHONE` — телефон.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для компаний в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

{% endnote %}

```php
CRest::call(
	'crm.company.add', [
    	'fields' => [
        	'TITLE' => $sTitle,
        	'COMPANY_TYPE' => 'CUSTOMER', // Тип компании — клиент
        	'PHONE' => $arPhone
    	]
	]
);
```

В результате получим идентификатор новой компании `5`.

```json
{
	"result": 5
}
```

### Добавляем реквизиты в компанию

Для добавления реквизитов в компанию выполним метод [crm.requisite.add](../../../api-reference/crm/requisites/universal/crm-requisite-add.md). В объекте `fields` передаем поля:

-  `ENTITY_TYPE_ID` — идентификатор [типа объекта](../../../api-reference/crm/data-types.md#object_type). Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). В примере укажем значение `4`, то есть компания,

-  `ENTITY_ID` — идентификатор компании, который получили в предыдущем запросе,

-  `PRESET_ID` — идентификатор шаблона реквизитов, который получили из формы,

-  `ACTIVE` — активность реквизита `Y`,

-  `NAME` — название реквизита,

-  `RQ_INN` — ИНН компании.

```php
CRest::call(
	'crm.requisite.add', 
	[
	    'fields' => [
			'ENTITY_TYPE_ID' => 4,
			'ENTITY_ID' => $companyId,
			'PRESET_ID' => $iRequisitePresetID,
			'ACTIVE' => 'Y',
			'NAME' => $sTitle,
			'RQ_INN' => $sINN
		]
	]
);
```

В результате получим идентификатор реквизитов.

```php
{
    "result": 27
}
```

### Добавляем адрес для реквизита

Добавим адрес для реквизита методом [crm.address.add](../../../api-reference/crm/requisites/addresses/crm-address-add.md), если реквизит создался успешно. В `$arAddress` добавляем `ENTITY_ID` с `ID` реквизита из ответа предыдущего запроса. В объекте `fields` передаем массив `$arAddress` с полями адреса.

```php
if(!empty($resultRequisite['result'])) {
	$arAddress['ENTITY_ID'] = $resultRequisite['result'];
	CRest::call(
		'crm.address.add',
		[
			'fields' => $arAddress
		]
	);
}
```

### Полный пример кода обработчика

```php
<?php
require_once('crest.php');

// Получаем и очищаем данные формы
$iRequisitePresetID = intVal($_POST["REQ_TYPE"]);
$sTitle = htmlspecialchars($_POST["TITLE"]);
$sINN = htmlspecialchars($_POST["INN"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);

// Подготавливаем адрес
$arAddress = [];
foreach($_POST["ADDRESS"] as $key => $val) {
    $arAddress[$key] = htmlspecialchars($val);
}
$arAddress['TYPE_ID'] = 1; // Значение 1 — фактический адрес
$arAddress['ENTITY_TYPE_ID'] = 8; // Идентификатор типа объекта — 8, то есть реквизит

// Форматируем телефон для Битрикс24 в формат crm_multifield
$arPhone = !empty($sPhone) ? [['VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK']] : [];

// Создаем компанию
$result = CRest::call('crm.company.add', [
    'fields' => [
        'TITLE' => $sTitle,
        'COMPANY_TYPE' => 'CUSTOMER', // Тип — клиент
        'PHONE' => $arPhone
    ]
]);

// получаем идентификатор новой компании из ответа метода crm.company.add
if(!empty($result['result'])) {
    $companyId = $result['result'];
    
    // Добавляем реквизиты для новой компании
    $resultRequisite = CRest::call('crm.requisite.add', [
        'fields' => [
            'ENTITY_TYPE_ID' => 4, // Идентификатор типа объекта — 4, то есть компания
            'ENTITY_ID' => $companyId,
            'PRESET_ID' => $iRequisitePresetID,
            'ACTIVE' => 'Y',
            'NAME' => $sTitle,
            'RQ_INN' => $sINN
        ]
    ]);
    
    // Добавляем адрес, если реквизиты созданы успешно
    if(!empty($resultRequisite['result'])) {
        $arAddress['ENTITY_ID'] = $resultRequisite['result'];
        CRest::call('crm.address.add', ['fields' => $arAddress]);
    }
    
    echo json_encode(['message' => 'Компания успешно добавлена']);
} else {
    $error = !empty($result['error_description']) ? $result['error_description'] : 'Неизвестная ошибка';
    echo json_encode(['message' => 'Ошибка: ' . $error]);
}
?>
```