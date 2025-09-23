# Добавить лид с файлами через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания лидов в CRM

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму и приложит файлы, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст лид методом [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add).

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с полями:

-  `NAME` — имя, обязательное,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `EMAIL` — электронная почта,

-  `PHONE` — телефон.

Чтобы клиент мог загрузить файлы, добавим в форму поля:

-  `FILE` — для одного файла,

-  `FILES` — для добавления нескольких файлов.

При отправке форма передает данные в обработчик `form.php`.

```html
<form id="form_to_crm" method="POST" action="form.php" enctype="multipart/form-data">
    <!-- Имя (обязательное поле) -->
    <input type="text" name="NAME" placeholder="Имя" required>
    <!-- Фамилия -->
    <input type="text" name="LAST_NAME" placeholder="Фамилия">
    <!-- Название компании -->
    <input type="text" name="COMPANY_TITLE" placeholder="Название компании">
    <!-- Email -->
    <input type="text" name="EMAIL" placeholder="Почта">
    <!-- Телефон -->
    <input type="text" name="PHONE" placeholder="Телефон">
    <!-- Поле для одного файла -->
    <input type="file" name="FILE">
    <!-- Поле для нескольких файлов -->
    <input type="file" name="FILES" multiple">

    <!-- Кнопка отправки -->
    <input type="submit" value="Отправить">
</form>

<!-- Подключаем jQuery для AJAX-запроса -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	$(document).ready(function() {
	    $('#form_to_crm').on('submit', function(el) {
	        el.preventDefault();
	        var formData = new FormData(this); // Собираем данные формы с файлами
	        $.ajax({
	            method: 'POST',
	            url: 'form.php',
	            data: formData,
	            processData: false,
	            contentType: false,
	            dataType: 'json',
	            success: function(data) {
	                alert(data.message);
	            },
	            error: function() {
	                alert('Ошибка при отправке формы');
	            }
	        });
	    });
	});
</script>
```

## 2. Создаем обработчик формы

Чтобы обработать значения из полей формы и добавить лид в CRM, создадим обработчик `form.php`.

### Подготавливаем данные из формы

Чтобы использовать данные из формы в методе создания лида, нужно их подготовить.

#### Очищаем от HTML-тегов

Получаем и очищаем от HTML-тегов данные из формы.

```php
// Получаем и очищаем данные из формы
$sName = htmlspecialchars($_POST["NAME"]);
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);
```

#### Подготавливаем файлы

Подготавливаем файлы для загрузки в Битрикс24. Для каждого файла нужно передать массив:

-  с именем файла,

-  строкой с кодировкой файла в Base64.

Чтобы закодировать файл, используем функцию [base64_encode](https://www.php.net/manual/en/function.base64-encode.php).

{% note tip "Документация" %}

-  [Как работать с файлами](../../../api-reference/files/index.md)

{% endnote %}

```php
// Создаем переменные для массивов с файлами
$arFiles = [];
$arSingleFile = [];

// Обрабатываем поле FILES с несколькими файлами
if(!empty($_FILES['FILES']['tmp_name'])) {
    foreach($_FILES['FILES']['tmp_name'] as $key => $tmpName) {
        if(!empty($tmpName)) {
            $arFiles[] = [
                'fileData' => [
                    $_FILES['FILES']['name'][$key], // название файла
                    base64_encode(file_get_contents($tmpName)) // контент файла, закодированный в base64 
                ]
            ];
        }
    }
}

// Обрабатываем поле FILE с одним файлом
if(!empty($_FILES['FILE']['tmp_name'])) {
    $arSingleFile = [
        'fileData' => [
            $_FILES['FILE']['name'], // название файла
            base64_encode(file_get_contents($_FILES['FILE']['tmp_name'])) // контент файла, закодированный в base64 
        ]
    ];
}
```

#### Форматируем телефон и почту

Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

```php
// Форматируем телефон и почту для Битрикс24 в формат crm_multifield
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
$arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();
```

#### Формируем заголовок лида

Заголовок лида сформируем из имени и фамилии. Для компаний добавим в заголовок название компании.

```php
// Формируем заголовок лида из имени и фамилии
$sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
// Если есть название компании — добавляем его через тире после имени и фамилии
if (!empty($sCompanyTitle)) {
    $sTitle .= ' — ' . $sCompanyTitle;
}
```

### Создаем лид

Для создания лида используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В объекте `fields` передаем поля:

-  `TITLE` — заголовок лида,

-  `NAME` — имя лида,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта,

-  `UF_CRM_LEAD_FILES` — пользовательское поле для добавления нескольких файлов,

-  `UF_CRM_LEAD_FILE` — пользовательское поле для файла.

Пользовательские поля `UF_CRM_*` нужно создать в Битрикс24 до создания лида. Добавьте их на портале вручную или методом [crm.lead.userfield.add](../../../api-reference/crm/leads/userfield/crm-lead-userfield-add.md). В примере подставьте свои названия полей вместо `UF_CRM_LEAD_FILES` и `UF_CRM_LEAD_FILE`.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

```php
CRest::call(
    'crm.lead.add',
    [
        'fields' => [
            'TITLE' => $sTitle, // Заголовок лида
            'NAME' => $sName, // Имя
            'LAST_NAME' => $sLastName, // Фамилия
            'COMPANY_TITLE' => $sCompanyTitle, // Название компании
            'PHONE' => $arPhone, // Телефон
            'EMAIL' => $arEmail, // Email
            'UF_CRM_LEAD_FILES' => $arFiles, // Поле для добавления нескольких файлов
            'UF_CRM_LEAD_FILE' => $arSingleFile // Поле для файла
        ]
    ]
);
```

В результате получим идентификатор нового лида `5`.

```json
{
	"result": 5
}
```

### Полный пример кода обработчика

```php
<?
require_once('crest.php');

// Получаем и очищаем данные из формы
$sName = htmlspecialchars($_POST["NAME"]);
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);

// Создаем переменные для массивов с файлами
$arFiles = [];
$arSingleFile = [];

// Обрабатываем поле FILES с несколькими файлами
if(!empty($_FILES['FILES']['tmp_name']) {
    foreach($_FILES['FILES']['tmp_name'] as $key => $tmpName) {
        if(!empty($tmpName)) {
            $arFiles[] = [
                'fileData' => [
                    $_FILES['FILES']['name'][$key],
                    base64_encode(file_get_contents($tmpName))
                ]
            ];
        }
    }
}

// Обрабатываем поле FILE с одним файлом
if(!empty($_FILES['FILE']['tmp_name'])) {
    $arSingleFile = [
        'fileData' => [
            $_FILES['FILE']['name'],
            base64_encode(file_get_contents($_FILES['FILE']['tmp_name']))
        ]
    ];
}

// Форматируем телефон и почту для Битрикс24 в формат crm_multifield
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
$arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

// Формируем заголовок лида из имени и фамилии
$sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
// Если есть название компании — добавляем его через тире после имени и фамилии
if (!empty($sCompanyTitle)) {
    $sTitle .= ' — ' . $sCompanyTitle;
}

// Отправляем данные в Битрикс24
$result = CRest::call(
    'crm.lead.add',
    [
        'fields' => [
            'TITLE' => $sTitle, // Заголовок лида
            'NAME' => $sName, // Имя
            'LAST_NAME' => $sLastName, // Фамилия
            'COMPANY_TITLE' => $sCompanyTitle, // Название компании
            'PHONE' => $arPhone, // Телефон
            'EMAIL' => $arEmail, // Email
            'UF_CRM_LEAD_FILES' => $arFiles, // Поле для добавления нескольких файлов
            'UF_CRM_LEAD_FILE' => $arSingleFile // Поле для файла
        ]
    ]
);

// Проверяем результат и выводим сообщение
if(!empty($result['result'])){
    echo json_encode(['message' => 'Лид добавлен успешно']);
} elseif(!empty($result['error_description'])){
    echo json_encode(['message' => 'Лид не добавлен: '.$result['error_description']]);
} else {
    echo json_encode(['message' => 'Лид не добавлен']);
}
?>
```
