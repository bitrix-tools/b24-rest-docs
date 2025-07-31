# Добавить лид через веб-форму

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом создания лидов в CRM

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму, его данные попадут в CRM, и вы сможете обработать заявку.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик примет и подготовит данные, а затем создаст лид методом [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с пятью полями:

- `NAME` — имя, обязательное,

- `LAST_NAME` — фамилия,

- `COMPANY_TITLE` — название компании,

- `EMAIL` — электронная почта,

- `PHONE` — телефон.

При отправке форма передает данные в обработчик `form.php`.

```html
<form id="form_to_crm" method="POST" action="form.php">
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

Чтобы обработать значения из полей формы и добавить лид в CRM, создадим обработчик `form.php`.

Для добавления лида используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В объекте `fields` передаем поля:

- `TITLE` — заголовок лида, можно составить из имени и фамилии,

- `NAME` — имя лида,

- `LAST_NAME` — фамилия,

- `COMPANY_TITLE` — название компании,

- `PHONE` — номер телефона,

- `EMAIL` — электронная почта.

Значения полей получаем из формы. Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

```php
<?
require_once('crest.php');

// Получаем и очищаем данные из формы
$sName = htmlspecialchars($_POST["NAME"]);
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);

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
        ]
    ]
);

// Проверяем результат и выводим сообщение
if(!empty($result['result'])){
    echo json_encode(['message' => 'Lead added']);
} elseif(!empty($result['error_description'])){
    echo json_encode(['message' => 'Lead not added: '.$result['error_description']]);
} else {
    echo json_encode(['message' => 'Lead not added']);
}
?>
```
