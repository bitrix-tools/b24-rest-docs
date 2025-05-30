# Добавить контакт через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания контактов в CRM

На сайте можно разместить форму для сбора данных клиентов. Когда клиент заполнит форму, его данные попадут в CRM и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст контакт методом [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

## 1. Создаем веб-форму

Создадим на странице сайта веб-форму с четырьмя полями:

-  `NAME` — имя контакта, обязательное,

-  `LAST_NAME` — фамилия,

-  `EMAIL` — электронная почта,

-  `PHONE` — телефон.

При отправке форма передает данные в обработчик `form.php`.

```html
<form id="form_to_crm" method="POST" action="form.php">
    
	<!-- Имя, обязательное поле -->
    <input type="text" name="NAME" placeholder="Имя" required>

	<!-- Фамилия --> 
    <input type="text" name="LAST_NAME" placeholder="Фамилия">

	<!-- Email --> 
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
        $('#form_to_crm').on('submit', function(el) {
            el.preventDefault(); // Отменяем стандартную отправку формы
            var formData = $(this).serialize(); // Собираем данные формы
            
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

Чтобы обработать значения из полей формы и добавить контакт в CRM, создадим обработчик `form.php`.

Для добавления компании используем метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md). В объекте `fields` передаем поля:

-  `NAME` — имя контакта,

-  `LAST_NAME` — фамилия,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта.

Значения полей получаем из формы. Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для контактов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.contact.add](../../../api-reference/crm/contacts/crm-contact-add.md).

{% endnote %}

```php
<?
require_once('crest.php');
            
// Получаем и очищаем данные из формы
$sName = htmlspecialchars($_POST["NAME"]);
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);                

// Форматируем телефон и почту для Битрикс24 в формат crm_multifield
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
$arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();

// Отправляем данные в Bitrix24
$result = CRest::call(
    'crm.contact.add',
    [
        'fields' => [
            'NAME' => $sName, // Имя
            'LAST_NAME' => $sLastName, // Фамилия
            'PHONE' => $arPhone, // Телефон
            'EMAIL' => $arEmail, // Email
        ]
    ]
);

// Проверяем результат и выводим сообщение
if(!empty($result['result'])){
    echo json_encode(['message' => 'Contact add']);
} elseif(!empty($result['error_description'])){
    echo json_encode(['message' => 'Contact not added: '.$result['error_description']]);
} else {
    echo json_encode(['message' => 'Contact not added']);
}
?>
```