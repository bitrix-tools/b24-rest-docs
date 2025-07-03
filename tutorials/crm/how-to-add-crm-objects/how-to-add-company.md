# Добавить компанию через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания компаний в CRM

На сайте можно разместить форму для сбора данных клиентов. Когда клиент заполнит форму, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст компанию методом [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

## 1. Создаем веб-форму

Создадим на странице сайта веб-форму с тремя полями:

-  `TITLE` — название компании, обязательное,

-  `EMAIL` — электронная почта,

-  `PHONE` — телефон.

При отправке форма передает данные в обработчик `form.php`.

```html
<form id="form_to_crm" method="POST" action="form.php">
    <!-- Название компании (обязательное поле) -->
    <input type="text" name="TITLE" placeholder="Название компании" required>
    
    <!-- Электронная почта -->
    <input type="text" name="EMAIL" placeholder="Почта">
    
    <!-- Телефон -->
    <input type="text" name="PHONE" placeholder="Телефон">
    
    <!-- Кнопка отправки -->
    <input type="submit" value="Отправить">
</form>

<!-- Подключаем jQuery для AJAX-запроса -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    $(document).ready(function() {
        // Отправка формы без перезагрузки страницы
        $('#form_to_crm').on('submit', function(el) {
            el.preventDefault(); // Отменяем стандартную отправку
            
            // Получаем данные формы
            var formData = $(this).serialize();
            
            // Отправляем данные на сервер
            $.ajax({
                'method': 'POST',
                'dataType': 'json',
                'url': 'form.php', // Файл-обработчик
                'data': formData,
                success: function(data) {
                    alert(data.message); // Показываем результат
                }
            });
        });
    });
</script>
```

## 2. Создаем обработчик формы

Чтобы обработать значения из полей формы и добавить компанию в CRM, создадим обработчик `form.php`.

Для добавления компании используем метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md). В объекте `fields` передаем поля:

-  `TITLE` — название компании,

-  `COMPANY_TYPE` — тип компании. Указываем `CUSTOMER`, так как заполняют форму только клиенты компании,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта.

Значения полей `TITLE`, `PHONE`, `EMAIL` получаем из формы. Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для компаний в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.company.add](../../../api-reference/crm/companies/crm-company-add.md).

{% endnote %}

```php
<?
// Получаем данные из формы
$sTitle = htmlspecialchars($_POST["TITLE"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);

// Форматируем телефон и почту для Битрикс24 в формат crm_multifield
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
$arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

// Отправляем данные в Битрикс24
$result = CRest::call(
    'crm.company.add',
    [
        'fields' =>[
            "TITLE" => $sTitle, // Название компании
            "COMPANY_TYPE" => 'CUSTOMER', // Тип компании — клиент
            "PHONE" => $arPhone, // Телефон
            "EMAIL" => $arEmail, // Почта
        ]
    ]
);

// Возвращаем результат
if(!empty($result['result'])){
    echo json_encode(['message' => 'Company added']);
}
elseif(!empty($result['error_description'])){
    echo json_encode(['message' => 'Company not added: '.$result['error_description']]);
}
else{
    echo json_encode(['message' => 'Company not added']);
}
?>
```