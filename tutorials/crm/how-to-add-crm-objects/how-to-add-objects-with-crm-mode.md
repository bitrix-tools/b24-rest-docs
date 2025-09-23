# Добавить дело в новый лид или сделку в зависимости от режима CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод:
> -  создания лида — пользователи с правом создания лида,
> -  добавления дела в лид или сделку — пользователи с правом изменения лида или сделки в CRM

На сайте можно разместить форму для сбора данных потенциальных клиентов. Когда клиент заполнит форму, его данные попадут в CRM. Вы сможете обработать заявку и позвонить клиенту.

Настройка формы состоит из двух шагов.

1. Разместите форму на HTML-странице. Она отправит данные в обработчик.

2. Создайте файл для обработки данных. Обработчик:

   -  примет и подготовит данные,

   -  создаст лид методом [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add),

   -  проверит режим CRM,

   -  добавит дело с напоминанием о звонке в сделку или в лид.

## Режимы CRM

В Битрикс24 есть два режима работы CRM.

1. Простой режим — работает без лидов. Система автоматически конвертирует новый лид в сделку.

2. Классический режим — разделяет потенциальных и действующих клиентов. Лид остается в системе после создания.

В обработчике определим, в каком режиме работает CRM — простом или классическом — и в зависимости от этого привяжем напоминание о звонке к сделке или к лиду.

{% note tip "Пользовательская документация" %}

-  [Как выбрать режим работы CRM](https://helpdesk.bitrix24.ru/open/23440468/)

{% endnote %}

## 1. Создаем веб-форму

В Битрикс24 из лида можно автоматически создать контакт и компанию. Чтобы форма подходила для разных случаев, сделаем ее универсальной. Для контакта нужно указать имя и фамилию, а для компании — название. Создадим на странице сайта веб-форму с пятью полями:

-  `NAME` — имя клиента, обязательное поле,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `PHONE` — телефон,

-  `EMAIL` — электронная почта.

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

Создадим файл `form.php`, который будет:

-  принимать данные из формы,

-  создавать лид,

-  определять режим CRM,

-  добавлять дело с напоминанием о звонке в лид или сделку.

### Подготавливаем данные из формы

Получаем и очищаем от HTML-тегов данные из формы.

```php
// Получаем и очищаем данные из формы
$sName = htmlspecialchars($_POST["NAME"]);
$sLastName = htmlspecialchars($_POST["LAST_NAME"]);
$sCompanyTitle = htmlspecialchars($_POST["COMPANY_TITLE"]);
$sPhone = htmlspecialchars($_POST["PHONE"]);
$sEmail = htmlspecialchars($_POST["EMAIL"]);
```

Телефон и email система хранит как массив объектов [crm_multifield](../../../api-reference/crm/data-types#crm_multifield), поэтому их нужно привести к формату массива.

1. Если значение есть, добавляем его первым элементом `VALUE` в массив, а вторым значением указываем тип  `VALUE_TYPE`, например:

   -  `WORK` — для телефона,

   -  `HOME` — для email.

2. Если значения нет, передаем пустой массив.

```php
// Форматируем телефон и почту для Битрикс24 в формат crm_multifield
$arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'WORK')) : array();
$arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'HOME')) : array();
```

Заголовок лида сформируем из имени и фамилии. Для компаний добавим в заголовок название компании.

```php
// Формируем заголовок лида из имени и фамилии
$sTitle = 'С сайта: ' . trim($sName . ' ' . $sLastName);
// Если есть название компании — добавляем его через тире после имени и фамилии
if (!empty($sCompanyTitle)) {
    $sTitle .= ' — ' . $sCompanyTitle;
}
```

### Создаем лид и получаем данные лида

Используем пакетный метод [CRest::callBatch()](../../../settings/how-to-call-rest-api/batch.md) для последовательного выполнения двух методов в одном запросе: создания лида и получения данных лида. Методы соберем в массив `$arData[]`.

Для добавления лида используем метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md). В объекте `fields` передаем поля:

-  `TITLE` — заголовок лида,

-  `NAME` — имя лида,

-  `LAST_NAME` — фамилия,

-  `COMPANY_TITLE` — название компании,

-  `PHONE` — номер телефона,

-  `EMAIL` — электронная почта.

{% note warning "" %}

Проверьте, какие обязательные поля настроены для лидов в вашем Битрикс24. Все обязательные поля нужно передать в метод [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

{% endnote %}

```php
'add_lead' => [
    'method' => 'crm.lead.add',
    'params' => [
        'fields' => [
            'TITLE' => $sTitle, // Заголовок лида
            'NAME' => $sName, // Имя
            'LAST_NAME' => $sLastName, // Фамилия
            'COMPANY_TITLE' => $sCompanyTitle, // Название компании
            'PHONE' => $arPhone, // Телефон
            'EMAIL' => $arEmail, // Email
        ]
    ]
],
```

Для получения данных лида используем метод [crm.lead.get](../../../api-reference/crm/leads/crm-lead-get.md). В параметр `ID` передаем идентификатор созданного лида `$result[add_lead]` из результата метода [crm.lead.add](../../../api-reference/crm/leads/crm-lead-add.md).

```php
'get_lead' => [
    'method' => 'crm.lead.get',
    'params' => [
        'id' => $result[add_lead] // ID из результата выполнения метода crm.lead.add
    ]
]
```

Массив с запросами `$arData` передаем в метод `CRest::callBatch`. Результат выполнения метода сохраняем в переменную `$result`.

```php
$result = CRest::callBatch($arData);
```

В результате получим идентификатор нового лида `add_lead` и данные о лиде `get_lead`.

```json
{
    "result": {
        "result": {
            "add_lead": 22, // результат выполнения метода crm.lead.add
            "get_lead": { // результат выполнения метода crm.lead.get
                "ID": "22",
                "TITLE": "Иван Иванов",
                "HONORIFIC": null,
                "NAME": "Иван",
                "SECOND_NAME": null,
                "LAST_NAME": "Иванов",
                "COMPANY_TITLE": null,
                ...,
                "STATUS_ID": "CONVERTED",
                ...
            }
        },
        "result_error": [],
        ...
}
```

### Определяем режим CRM и создаем дело

Если система создала лид успешно, сохраним в переменные:

-  `$leadId` — идентификатор лида,

-  `$leadStatus` — статус лида `STATUS_ID`.

```php
if (empty($result['result']['result_error']['add_lead']) && !empty($result['result']['result']['get_lead'])) {
    $leadId = $result['result']['result']['add_lead'];
    $leadStatus = $result['result']['result']['get_lead']['STATUS_ID'];
    ...
}
```

#### Простой режим

В простом режиме при создании лида с заполненным именем система автоматически конвертирует его в сделку. Поле лида `STATUS_ID` принимает значение `CONVERTED`.

Проверяем значение переменной `$leadStatus`. Если значение равно `'CONVERTED'` — CRM работает в простом режиме и лид уже сконвертирован в сделку.

{% note warning "" %}

В классическом режиме новый лид тоже можно автоматически сконвертировать в сделку с помощью инструментов автоматизации.

Точно узнать режим работы CRM можно специальным методом [crm.settings.mode.get](../../../api-reference/crm/crm-settings-mode-get.md).

{% endnote %}

Чтобы получить идентификатор сделки, используем метод [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md). Укажем в `select` поле `ID`, а в фильтр `filter` передадим поле `LEAD_ID` с идентификатором лида из переменной `$leadId`.

```php
if ($leadStatus == 'CONVERTED') {
    // Простой режим: ищем сделку, созданную из лида
    $resultDeal = CRest::call('crm.deal.list', [
        'select' => [
            'ID'
        ] 
        'filter' => [
            'LEAD_ID' => $leadId
        ]
    ]);
```

В результате получим идентификатор сделки.

```json
"result": [
    {
        "ID": "1811"
    }
],
```

Для добавления дела в сделку используем метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md). Передаем поля:

-  `ownerTypeId` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `2`, то есть сделка,

-  `ownerId` — идентификатор элемента CRM. Укажем идентификатор сделки, который получили в прошлом запросе,

-  `deadline` — крайний срок дела,

-  `title` — название дела,

-  `description` — описание дела.

```php
if (!empty($resultDeal['result'][0]['ID'])) {
    $dealId = $resultDeal['result'][0]['ID'];
    // Привязываем дело к сделке
    CRest::call(
        'crm.activity.todo.add',
        [
            'ownerTypeId' => 2, // тип объекта — сделка
            'ownerId' => $dealId, // идентификатор сделки
            'deadline' => date("Y-m-d H:i:s", time() + 3600), // текущее время + 1 час
            'title' => 'Позвонить клиенту',
            'description' => 'Заполнил заявку на сайте',
        ]
    );
}
```

#### Классический режим

В классическом режиме система не конвертирует лид, поэтому дело привязываем к созданному лиду.

Для добавления дела в лид используем метод [crm.activity.todo.add](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md). Передаем поля:

-  `ownerTypeId` — идентификатор типа объекта CRM. Получить идентификаторы можно методом [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md). Укажем значение — `1`, то есть лид,

-  `ownerId` — идентификатор элемента CRM. Укажем идентификатор нового лида,

-  `deadline` — крайний срок дела,

-  `title` — название дела,

-  `description` — описание дела.

```php
// Классический режим: привязываем дело к лиду
CRest::call(
    'crm.activity.todo.add',
    [
        'ownerTypeId' => 1, // тип объекта — лид
        'ownerId' => $leadId, // идентификатор лида
        'deadline' => date("Y-m-d H:i:s", time() + 3600), // текущее время + 1 час
        'title' => 'Позвонить клиенту',
        'description' => 'Заполнил заявку на сайте',
    ]
);
```

## Полный пример кода обработчика

{% include [Сноска о примерах](../../../_includes/examples.md) %}

```php
<?php
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

$arData = [
    'add_lead' => [
        'method' => 'crm.lead.add',
        'params' => [
            'fields' => [
	            'TITLE' => $sTitle, // Заголовок лида
	            'NAME' => $sName, // Имя
	            'LAST_NAME' => $sLastName, // Фамилия
	            'COMPANY_TITLE' => $sCompanyTitle, // Название компании
	            'PHONE' => $arPhone, // Телефон
	            'EMAIL' => $arEmail, // Email
	        ]
   	 	]
    ],
    'get_lead' => [
        'method' => 'crm.lead.get',
        'params' => [
            'id' => '$result[add_lead]' // ID из результата выполнения метода crm.lead.add
        ]
    ]
];

$result = CRest::callBatch($arData);

if (empty($result['result']['result_error']['add_lead']) && !empty($result['result']['result']['get_lead'])) {
    $leadId = $result['result']['result']['add_lead']; // сохраняем в переменную идентификатор лида
    $leadStatus = $result['result']['result']['get_lead']['STATUS_ID']; // сохраняем в переменную статус лида

    if ($leadStatus == 'CONVERTED') {
        // Простой режим: ищем сделку, созданную из лида
        $resultDeal = CRest::call('crm.deal.list', [
			'select' => [
                'ID'
            ] 
            'filter' => [
                'LEAD_ID' => $leadId
            ]
        ]);

        if (!empty($resultDeal['result'][0]['ID'])) {
            $dealId = $resultDeal['result'][0]['ID'];
            CRest::call(
                // Добавляем дело в сделку
				'crm.activity.todo.add',
			    [
			        'ownerTypeId' => 2, // тип объекта — сделка
			        'ownerId' => $dealId, // идентификатор сделки
			        'deadline' => date("Y-m-d H:i:s", time() + 3600), // текущее время + 1 час
			        'title' => 'Позвонить клиенту',
			        'description' => 'Заполнил заявку на сайте',
			    ]
			);
        }
    } else {
            CRest::call(
                // Классический режим: добавляем дело в новый лид
				'crm.activity.todo.add',
			    [
			        'ownerTypeId' => 1, // тип объекта — лид
			        'ownerId' => $leadId, // идентификатор лида
			        'deadline' => date("Y-m-d H:i:s", time() + 3600), // текущее время + 1 час
			        'title' => 'Позвонить клиенту',
			        'description' => 'Заполнил заявку на сайте',
			    ]
			);
    }

    echo json_encode(['message' => 'Дело добавлено в лид или сделку']);
} else {
    $errors = [];
    if (!empty($result['result']['result_error']['add_lead'])) {
        $errors[] = 'Error adding lead: ' . $result['result']['result_error']['add_lead']['error_description'];
    }
    if (!empty($result['result']['result_error']['get_lead'])) {
        $errors[] = 'Error getting lead: ' . $result['result']['result_error']['get_lead']['error_description'];
    }
    echo json_encode(['message' => !empty($errors) ? implode('; ', $errors) : 'Неизвестная ошибка']);
}
?>
```