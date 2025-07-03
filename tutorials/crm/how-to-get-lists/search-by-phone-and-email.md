# Как найти дубликаты в CRM по телефону и email

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователи с доступом на чтение к элементам CRM

Автоматизировать поиск дубликатов по телефону и адресу электронной почты можно с помощью скрипта. Он будет находить лиды, контакты и компании с совпадающими данными, получать информацию о них и выводить в таблицу:

- идентификатор объекта,

- тип объекта: лид, контакт или компания,

- заголовок или имя и фамилию,

- телефон,

- адрес электронной почты.

Чтобы найти дубликаты, последовательно выполним методы:

1. [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) — найдем дубликаты по телефону и email,

2. [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md) — получим лиды,

3. [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) — получим контакты,

4. [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) — получим компании.

## Подготовим данные

Передадим скрипту номер телефона и email с помощью диалоговых окон в браузере. Значения сохраним в переменных `phone` и `email`.

Если данные введены корректно и дубликаты найдены, они отобразятся в таблице. В других случаях таблица будет пустой.

Создадим массивы:

- `entityIDs` — идентификаторы найденных лидов, контактов, компаний,

- `$resultEntity` — подробные данные о найденных объектах.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

   ```js
   let phone = prompt("Введите номер телефона:");
   let email = prompt("Введите email:");
   
   let entityIDs = {
       'LEAD': [],
       'CONTACT': [],
       'COMPANY': []
   };
   
   let resultEntity = {
       'lead': [],
       'contact': [],
       'company': []
   };
   ```

- PHP

   ```php
   require_once('crest.php');
   
   $phone = readline("Введите номер телефона: ");
   $phone = readline("Введите email: ");
   
   $entityIDs = [
       'LEAD' => [],
       'CONTACT' => [],
       'COMPANY' => []
   ];
   $resultEntity = [
       'lead' => [],
       'contact' => [],
       'company' => []
   ];
   ```

{% endlist %}

## 1\. Найдем дубликаты объектов

Чтобы найти повторяющиеся объекты по телефону и электронной почте, дважды вызовем метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md). В него передадим два параметра.

- `type` — тип коммуникации, `PHONE` или `EMAIL`.

- `values` — массив телефонов или адресов электронной почты. Укажем переменные `phone` и `email`.

Идентификаторы найденных дубликатов объединим в массиве `entityIDs`.

{% list tabs %}

- JS

   ```js
   if (phone) {
       BX24.callMethod(
           "crm.duplicate.findbycomm",
           {
               type: "PHONE",
               values: [phone]
           },
           function (phoneResult) {
               if (phoneResult.error()) {
                   console.error("Ошибка при поиске дубликатов по телефону:", phoneResult.error());
               } else {
                   if (Array.isArray(phoneResult.data().LEAD)) {
                       entityIDs.LEAD = entityIDs.LEAD.concat(phoneResult.data().LEAD);
                   }
                   if (Array.isArray(phoneResult.data().CONTACT)) {
                       entityIDs.CONTACT = entityIDs.CONTACT.concat(phoneResult.data().CONTACT);
                   }
                   if (Array.isArray(phoneResult.data().COMPANY)) {
                       entityIDs.COMPANY = entityIDs.COMPANY.concat(phoneResult.data().COMPANY);
                   }
               }
           }
       );
    }
   
   if (email) {
       BX24.callMethod(
           "crm.duplicate.findbycomm",
           {
               type: "EMAIL",
               values: [email]
           },
           function (emailResult) {
               if (emailResult.error()) {
                   console.error("Ошибка при поиске дубликатов по email:", emailResult.error());
               } else {
                   if (Array.isArray(emailResult.data().LEAD)) {
                       entityIDs.LEAD = entityIDs.LEAD.concat(emailResult.data().LEAD);
                   }
                   if (Array.isArray(emailResult.data().CONTACT)) {
                       entityIDs.CONTACT = entityIDs.CONTACT.concat(emailResult.data().CONTACT);
                   }
                   if (Array.isArray(emailResult.data().COMPANY)) {
                       entityIDs.COMPANY = entityIDs.COMPANY.concat(emailResult.data().COMPANY);
                   }
               }
           }
       );
   }
   ```

- PHP

   ```php
   if($phone)
   {
       $result = CRest::call('crm.duplicate.findbycomm', [
           'type' => 'PHONE',
           'values' => [$phone]
       ]);
       if(is_array($result['result']['LEAD']))
       {
           $entityIDs['LEAD'] = array_merge($entityIDs['LEAD'], $result['result']['LEAD']);
       }
       if(is_array($result['result']['CONTACT']))
       {
           $entityIDs['CONTACT'] = array_merge($entityIDs['CONTACT'], $result['result']['CONTACT']);
       }
       if(is_array($result['result']['COMPANY']))
       {
           $entityIDs['COMPANY'] = array_merge($entityIDs['COMPANY'], $result['result']['COMPANY']);
       }
   }
   
   if($email)
   {
       $result = CRest::call('crm.duplicate.findbycomm', [
           'type' => 'EMAIL',
           'values' => [$email]
       ]);
       if(is_array($result['result']['LEAD']))
       {
           $entityIDs['LEAD'] = array_merge($entityIDs['LEAD'], $result['result']['LEAD']);
       }
       if(is_array($result['result']['CONTACT']))
       {
           $entityIDs['CONTACT'] = array_merge($entityIDs['CONTACT'], $result['result']['CONTACT']);
       }
       if(is_array($result['result']['COMPANY']))
       {
           $entityIDs['COMPANY'] = array_merge($entityIDs['COMPANY'], $result['result']['COMPANY']);
       }
   }
   ```

{% endlist %}

Метод [crm.duplicate.findbycomm](../../../api-reference/crm/duplicates/crm-duplicate-find-by-comm.md) вернет списки идентификаторов лидов, контактов и компаний, где встречается указанный телефон или адрес электронной почты.

## 2\. Получим лиды

Если список идентификаторов лидов не пустой, получим их данные через метод [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md).

1. Применим фильтр по идентификатору.

2. Выберем поля: `ID`, `NAME`, `LAST_NAME`, `PHONE`, `EMAIL`, `TITLE`.

3. Сохраним результат в массиве `resultEntity`.

{% list tabs %}

- JS

   ```js
   if (entityIDs.LEAD.length > 0) {
       BX24.callMethod('crm.lead.list', {
           'filter': {
               'ID': entityIDs.LEAD
           },
           'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
       }, function(result) {
           if (result.error()) {
               console.error(result.error());
           } else {
               if (result.data().length > 0) {
                   resultEntity.lead = result.data();
               }
           }
       });
   }
   ```

- PHP

   ```php
   if(!empty($entityIDs['LEAD']))
   {
       $result = CRest::call(
           'crm.lead.list',
           [
           'filter' => [
               'ID' => $entityIDs['LEAD']
           ],
           'select' =>     [
               'ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE'
           ]
           ]
       );
       if(!empty($result['result']))
       {
           $resultEntity['lead'] = $result['result'];
       }
   }
   ```

{% endlist %}

Метод [crm.lead.list](../../../api-reference/crm/leads/crm-lead-list.md) вернет список лидов по фильтру.

```json
{
    "result":[{
        "ID":"1183",
        "NAME":null,
        "LAST_NAME":null,
        "TITLE":"Заполнение CRM-формы \u0022Форма контактных данных для открытых линий\u0022",
        "PHONE":[{
            "ID":"1957",
            "VALUE_TYPE":"OTHER",
            "VALUE":"+73216464646",
            "TYPE_ID":"PHONE"
        }]
    }]
}
```

## 3\. Получим контакты

Если список идентификаторов контактов не пустой, получим их данные через метод [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md).

1. Применим фильтр по идентификатору.

2. Выберем поля: `ID`, `NAME`, `LAST_NAME`, `PHONE`, `EMAIL`.

3. Сохраним результат в массиве `resultEntity`.

{% list tabs %}

- JS

   ```js
   if (entityIDs.CONTACT.length > 0) {
       BX24.callMethod('crm.contact.list', {
           'filter': {
               'ID': entityIDs.CONTACT
           },
           'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
       }, function(result) {
           if (result.error()) {
               console.error(result.error());
           } else {
               if (result.data().length > 0) {
                   resultEntity.contact = result.data();
               }
           }
       });
   }
   ```

- PHP

   ```php
   if(!empty($entityIDs['CONTACT']))
   {
       $result = CRest::call(
           'crm.contact.list',
           [
               'filter' => [
                   'ID' => $entityIDs['CONTACT']
               ],
               'select' =>     [
                   'ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL'
               ]
           ]
       );
       if(!empty($result['result']))
       {
           $resultEntity['contact'] = $result['result'];
       }
   }
   ```

{% endlist %}

Метод [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) вернет список контактов по фильтру.

```json
{
    "result":[{
        "ID":"23",
        "NAME":"Александр",
        "LAST_NAME":"Алексеев",
        "EMAIL":[{
            "ID":"854",
            "VALUE_TYPE":"WORK",
            "VALUE":"alekseev@ya.ru",
            "TYPE_ID":"EMAIL"
        }]
    }]
}
```

## 4\. Получим компании

Если список идентификаторов компаний не пустой, получим их данные через метод [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md).

1. Применим фильтр по идентификатору.

2. Выберем поля: `ID`, `PHONE`, `EMAIL`, `TITLE`.

3. Сохраним результат в массиве `resultEntity`.

{% list tabs %}

- JS

   ```js
   if (entityIDs.COMPANY.length > 0) {
       BX24.callMethod('crm.company.list', {
           'filter': {
               'ID': entityIDs.COMPANY
           },
           'select': ['ID', 'PHONE', 'EMAIL', 'TITLE']
       }, function(result) {
           if (result.error()) {
               console.error(result.error());
           } else {
               if (result.data().length > 0) {
                   resultEntity.company = result.data();
               }
           }
       });
   }
   ```

- PHP

   ```php
   if(!empty($entityIDs['COMPANY']))
   {
       $result = CRest::call(
           'crm.company.list',
           [
               'filter' => [
                   'ID' => $entityIDs['COMPANY']
               ],
               'select' =>     [
                   'ID', 'PHONE', 'EMAIL', 'TITLE'
               ]
           ]
       );
       if(!empty($result['result']))
       {
           $resultEntity['company'] = $result['result'];
       }
   }
   ```

{% endlist %}

Метод [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) вернет список компаний по фильтру.

```
{
    "result":[{
        "ID":"587",
        "TITLE":"Ромашка",
        "PHONE":[{
            "ID":"1899",
            "VALUE_TYPE":"WORK",
            "VALUE":"5345654",
            "TYPE_ID":"PHONE"
        }],
        "EMAIL":[{
            "ID":"1901",
            "VALUE_TYPE":"WORK",
            "VALUE":"company@xample.ru",
            "TYPE_ID":"EMAIL"}]
        }]
}
```

## Выведем результаты в таблицу

Выведем найденные записи в колонки `Идентификатор`, `Тип объекта`, `Название/Имя и фамилия`, `Телефон`, `Email`.

{% list tabs %}

- JS

   ```js
   let table = [];
   
   table.push([
       "Идентификатор",
       "Тип объекта",
       "Название/Имя и фамилия",
       "Телефон",
       "Email"
   ]);
   
   for (let entity in resultEntity) {
       resultEntity[entity].forEach(function(item) {
           let phones = '';
           if (item.PHONE) {
               phones = item.PHONE.map(phone => phone.VALUE).join(', ');
           }
           let emails = '';
           if (item.EMAIL) {
               emails = item.EMAIL.map(email => email.VALUE).join(', ');
           }
           let title = item.TITLE ? item.TITLE + (item.NAME || item.LAST_NAME ? ': ' : '') : '';
           if (item.NAME || item.LAST_NAME) {
               title += [item.NAME, item.LAST_NAME].join(' ');
           }
   
           table.push([
               item.ID,
               entity,
               title,
               phones || '—',
               emails || '—'
           ]);
       });
   }
   
   console.table(table);
   ```

- PHP

   ```php
   $table = [];
   $table[] = [
       "Идентификатор",
       "Тип объекта",
       "Название/Имя и фамилия",
       "Телефон",
       "Email"
   ];
   
   foreach ($resultEntity as $entityType => $entities) {
       foreach ($entities as $item) {
           $phones = '';
           if (!empty($item['PHONE'])) {
               $phones = implode(', ', array_column($item['PHONE'], 'VALUE'));
           }
           $emails = '';
           if (!empty($item['EMAIL'])) {
               $emails = implode(', ', array_column($item['EMAIL'], 'VALUE'));
           }
           $title = !empty($item['TITLE']) ? $item['TITLE'] : '';
           if (!empty($item['NAME']) || !empty($item['LAST_NAME'])) {
               $namePart = trim($item['NAME'] . ' ' . $item['LAST_NAME']);
               if ($title) {
                   $title .= ': ' . $namePart;
               } else {
                   $title = $namePart;
               }
           }
   
           $table[] = [
               $item['ID'],
               $entityType,
               $title ?: '—',
               $phones ?: '—',
               $emails ?: '—'
           ];
       }
   }
   
   foreach ($table as $row) {
       echo implode("\t", $row) . "\n";
   }
   ```

{% endlist %}

## Пример кода

{% list tabs %}

- JS

   ```javascript
   // Запрос у пользователя телефона и email
   let phone = prompt("Введите номер телефона:");
   let email = prompt("Введите email:");
   
   // Инициализация переменных
   let entityIDs = {
       'LEAD': [],
       'CONTACT': [],
       'COMPANY': []
   };
   
   let resultEntity = {
       'lead': [],
       'contact': [],
       'company': []
   };
   
   // Поиск дубликатов по телефону 
   
    if (phone) {
       BX24.callMethod(
           "crm.duplicate.findbycomm",
           {
               type: "PHONE",
               values: [phone]
           },
           function (phoneResult) {
               if (phoneResult.error()) {
                   console.error("Ошибка при поиске дубликатов по телефону:", phoneResult.error());
               } else {
                   if (Array.isArray(phoneResult.data().LEAD)) {
                       entityIDs.LEAD = entityIDs.LEAD.concat(phoneResult.data().LEAD);
                   }
                   if (Array.isArray(phoneResult.data().CONTACT)) {
                       entityIDs.CONTACT = entityIDs.CONTACT.concat(phoneResult.data().CONTACT);
                   }
                   if (Array.isArray(phoneResult.data().COMPANY)) {
                       entityIDs.COMPANY = entityIDs.COMPANY.concat(phoneResult.data().COMPANY);
                   }
               }
           }
       );
    }
   
   //Поиск дубликатов по email 
   
   if (email) {
       BX24.callMethod(
           "crm.duplicate.findbycomm",
           {
               type: "EMAIL",
               values: [email]
           },
           function (emailResult) {
               if (emailResult.error()) {
                   console.error("Ошибка при поиске дубликатов по email:", emailResult.error());
               } else {
                   if (Array.isArray(emailResult.data().LEAD)) {
                       entityIDs.LEAD = entityIDs.LEAD.concat(emailResult.data().LEAD);
                   }
                   if (Array.isArray(emailResult.data().CONTACT)) {
                       entityIDs.CONTACT = entityIDs.CONTACT.concat(emailResult.data().CONTACT);
                   }
                   if (Array.isArray(emailResult.data().COMPANY)) {
                       entityIDs.COMPANY = entityIDs.COMPANY.concat(emailResult.data().COMPANY);
                   }
               }
           }
       );
   }
   
   setTimeout(function() {
       // Обрабатываем лиды
       if (entityIDs.LEAD.length > 0) {
           BX24.callMethod('crm.lead.list', {
               'filter': {
                   'ID': entityIDs.LEAD
               },
               'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
           }, 
           function(result) {
               if (result.error()) {
                   console.error(result.error());
               } else {
                   if (result.data().length > 0) {
                       resultEntity.lead = result.data();
                  }
               }
           });
       }
   
       // Обрабатываем контакты
       if (entityIDs.CONTACT.length > 0) {
           BX24.callMethod('crm.contact.list', {
               'filter': {
                   'ID': entityIDs.CONTACT
               },
               'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
           }, function(result) {
               if (result.error()) {
                   console.error(result.error());
               } else {
                   if (result.data().length > 0) {
                       resultEntity.contact = result.data();
                   }
               }
           });
       }
   
       // Обрабатываем компании
       if (entityIDs.COMPANY.length > 0) {
           BX24.callMethod('crm.company.list', {
               'filter': {
                   'ID': entityIDs.COMPANY
               },
               'select': ['ID', 'PHONE', 'EMAIL', 'TITLE']
           }, function(result) {
               if (result.error()) {
                   console.error(result.error());
               } else {
                   if (result.data().length > 0) {
                       resultEntity.company = result.data();
                   }
               }
           });
       }
   
       setTimeout(function() {
           let table = [];
           // Заголовок таблицы
           table.push([
               "Идентификатор",
               "Тип объекта",
               "Название/Имя и фамилия",
               "Телефон",
               "Email"
           ]);
   
           // Строки данных
           for (let entity in resultEntity) {
               resultEntity[entity].forEach(function(item) {
                   let phones = '';
                   if (item.PHONE) {
                       phones = item.PHONE.map(phone => phone.VALUE).join(', ');
                   }
                   let emails = '';
                   if (item.EMAIL) {
                       emails = item.EMAIL.map(email => email.VALUE).join(', ');
                   }
                   let title = item.TITLE ? item.TITLE + (item.NAME || item.LAST_NAME ? ': ' : '') : '';
                   if (item.NAME || item.LAST_NAME) {
                       title += [item.NAME, item.LAST_NAME].join(' ');
                   }
   
                   table.push([
                       item.ID,
                       entity,
                       title,
                       phones || '—',
                       emails || '—'
                   ]);
               });
           }
           
           // Выводим таблицу в консоль
           console.table(table);
       }, 1000); // Задержка для завершения всех запросов
   }, 1000);
   ```

- PHP

   ```php
   <?
   require_once('crest.php');
   
   // Запрос у пользователя телефона и email
   $phone = readline("Введите номер телефона: ");
   $phone = readline("Введите email: ");
   
   // Инициализация переменных
   $entityIDs = [
       'LEAD' => [],
       'CONTACT' => [],
       'COMPANY' => []
   ];
   $resultEntity = [
       'lead' => [],
       'contact' => [],
       'company' => []
   ];
   
   // Поиск дубликатов по телефону    
   if($phone)
   {
       $result = CRest::call('crm.duplicate.findbycomm', [
           'type' => 'PHONE',
           'values' => [$phone]
       ]);
       if(is_array($result['result']['LEAD']))
       {
           $entityIDs['LEAD'] = array_merge($entityIDs['LEAD'], $result['result']['LEAD']);
       }
       if(is_array($result['result']['CONTACT']))
       {
           $entityIDs['CONTACT'] = array_merge($entityIDs['CONTACT'], $result['result']['CONTACT']);
       }
       if(is_array($result['result']['COMPANY']))
       {
           $entityIDs['COMPANY'] = array_merge($entityIDs['COMPANY'], $result['result']['COMPANY']);
       }
   }
   
   // Поиск дубликатов по email 
   if($email)
   {
       $result = CRest::call('crm.duplicate.findbycomm', [
           'type' => 'EMAIL',
           'values' => [$email]
       ]);
       if(is_array($result['result']['LEAD']))
       {
           $entityIDs['LEAD'] = array_merge($entityIDs['LEAD'], $result['result']['LEAD']);
       }
       if(is_array($result['result']['CONTACT']))
       {
           $entityIDs['CONTACT'] = array_merge($entityIDs['CONTACT'], $result['result']['CONTACT']);
       }
       if(is_array($result['result']['COMPANY']))
       {
           $entityIDs['COMPANY'] = array_merge($entityIDs['COMPANY'], $result['result']['COMPANY']);
       }
   }
   
   // Обрабатываем лиды
   if(!empty($entityIDs['LEAD']))
   {
       $result = CRest::call(
           'crm.lead.list',
           [
           'filter' => [
               'ID' => $entityIDs['LEAD']
           ],
           'select' =>     [
               'ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE'
           ]
           ]
       );
       if(!empty($result['result']))
       {
           $resultEntity['lead'] = $result['result'];
       }
   }
   
   // Обрабатываем контакты
   if(!empty($entityIDs['CONTACT']))
   {
       $result = CRest::call(
           'crm.contact.list',
           [
               'filter' => [
                   'ID' => $entityIDs['CONTACT']
               ],
               'select' =>     [
                   'ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL'
               ]
           ]
       );
       if(!empty($result['result']))
       {
           $resultEntity['contact'] = $result['result'];
       }
   }
   
   // Обрабатываем компании
   if(!empty($entityIDs['COMPANY']))
   {
       $result = CRest::call(
           'crm.company.list',
           [
               'filter' => [
                   'ID' => $entityIDs['COMPANY']
               ],
               'select' =>     [
                   'ID', 'PHONE', 'EMAIL', 'TITLE'
               ]
           ]
       );
       if(!empty($result['result']))
       {
           $resultEntity['company'] = $result['result'];
       }
   }
   
   // Формируем таблицу
   $table = [];
   
   // Заголовок таблицы
   $table[] = [
       "Идентификатор",
       "Тип объекта",
       "Название/Имя и фамилия",
       "Телефон",
       "Email"
   ];
   
   // Строки данных
   foreach ($resultEntity as $entityType => $entities) {
       foreach ($entities as $item) {
           $phones = '';
           if (!empty($item['PHONE'])) {
               $phones = implode(', ', array_column($item['PHONE'], 'VALUE'));
           }
           $emails = '';
           if (!empty($item['EMAIL'])) {
               $emails = implode(', ', array_column($item['EMAIL'], 'VALUE'));
           }
           $title = !empty($item['TITLE']) ? $item['TITLE'] : '';
           if (!empty($item['NAME']) || !empty($item['LAST_NAME'])) {
               $namePart = trim($item['NAME'] . ' ' . $item['LAST_NAME']);
               if ($title) {
                   $title .= ': ' . $namePart;
               } else {
                   $title = $namePart;
               }
           }
   
           $table[] = [
               $item['ID'],
               $entityType,
               $title ?: '—',
               $phones ?: '—',
               $emails ?: '—'
           ];
       }
   }
   
   // Выводим таблицу в консоль через табуляцию
   foreach ($table as $row) {
       echo implode("\t", $row) . "\n";
   }
   
   ?>
   ```

{% endlist %}