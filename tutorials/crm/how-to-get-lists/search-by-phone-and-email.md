# Как найти дубликаты в CRM по телефону и email

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: пользователи с доступом на чтение к элементам CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
   $phone = readline("Введите номер телефона: ");
   $email = readline("Введите email: ");
   
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

- Python

   ```python
   phone = input("Введите номер телефона: ")
   email = input("Введите email: ")

   entity_ids = {
       "LEAD": [],
       "CONTACT": [],
       "COMPANY": [],
   }

   result_entity = {
       "lead": [],
       "contact": [],
       "company": [],
   }
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
   // Объединяет идентификаторы из ответа метода с объектом entityIDs
   function mergeDuplicates(data) {
       for (const type of ['LEAD', 'CONTACT', 'COMPANY']) {
           if (Array.isArray(data?.[type])) {
               entityIDs[type] = entityIDs[type].concat(data[type]);
           }
       }
   }

   if (phone) {
       const phoneResult = await $b24.actions.v2.call.make({
           method: 'crm.duplicate.findbycomm',
           params: { type: 'PHONE', values: [phone] }
       });
       if (phoneResult.isSuccess) {
           mergeDuplicates(phoneResult.getData()?.result);
       } else {
           console.error('Ошибка при поиске дубликатов по телефону:', phoneResult.getErrorMessages().join('; '));
       }
   }

   if (email) {
       const emailResult = await $b24.actions.v2.call.make({
           method: 'crm.duplicate.findbycomm',
           params: { type: 'EMAIL', values: [email] }
       });
       if (emailResult.isSuccess) {
           mergeDuplicates(emailResult.getData()?.result);
       } else {
           console.error('Ошибка при поиске дубликатов по email:', emailResult.getErrorMessages().join('; '));
       }
   }
   ```

- PHP

   ```php
   use Bitrix24\SDK\Services\CRM\Duplicates\Result\DuplicateResult;

   // Объединяет идентификаторы из ответа метода с массивом $entityIDs
   function mergeDuplicates(DuplicateResult $result, array &$entityIDs): void
   {
       $data = $result->getCoreResponse()->getResponseData()->getResult();
       foreach (['LEAD', 'CONTACT', 'COMPANY'] as $type) {
           if (!empty($data[$type]) && is_array($data[$type])) {
               $entityIDs[$type] = array_merge($entityIDs[$type], $data[$type]);
           }
       }
   }

   if($phone)
   {
       mergeDuplicates($sb->getCRMScope()->duplicate()->findByPhone([$phone]), $entityIDs);
   }

   if($email)
   {
       mergeDuplicates($sb->getCRMScope()->duplicate()->findByEmail([$email]), $entityIDs);
   }
   ```

- Python

   ```python
   if phone:
       result = client.crm.duplicate.findbycomm(
           type="PHONE",
           values=[phone],
       ).result
       for key in entity_ids:
           if isinstance(result.get(key), list):
               entity_ids[key].extend(result[key])

   if email:
       result = client.crm.duplicate.findbycomm(
           type="EMAIL",
           values=[email],
       ).result
       for key in entity_ids:
           if isinstance(result.get(key), list):
               entity_ids[key].extend(result[key])
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
       const result = await $b24.actions.v2.call.make({
           method: 'crm.lead.list',
           params: {
               filter: { ID: entityIDs.LEAD },
               select: ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
           }
       });
       if (result.isSuccess) {
           const leads = result.getData()?.result;
           if (leads?.length > 0) {
               resultEntity.lead = leads;
           }
       } else {
           console.error(result.getErrorMessages().join('; '));
       }
   }
   ```

- PHP

   ```php
   if(!empty($entityIDs['LEAD']))
   {
       $leads = $sb->getCRMScope()->lead()->list(
           [],
           ['ID' => $entityIDs['LEAD']],
           ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
       )->getLeads();
       if(!empty($leads))
       {
           $resultEntity['lead'] = $leads;
       }
   }
   ```

- Python

   ```python
   if entity_ids["LEAD"]:
       result = client.crm.lead.list(
           filter={"ID": entity_ids["LEAD"]},
           select=["ID", "NAME", "LAST_NAME", "PHONE", "EMAIL", "TITLE"],
       ).result

       if result:
           result_entity["lead"] = result
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
       const result = await $b24.actions.v2.call.make({
           method: 'crm.contact.list',
           params: {
               filter: { ID: entityIDs.CONTACT },
               select: ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
           }
       });
       if (result.isSuccess) {
           const contacts = result.getData()?.result;
           if (contacts?.length > 0) {
               resultEntity.contact = contacts;
           }
       } else {
           console.error(result.getErrorMessages().join('; '));
       }
   }
   ```

- PHP

   ```php
   if(!empty($entityIDs['CONTACT']))
   {
       $contacts = $sb->getCRMScope()->contact()->list(
           [],
           ['ID' => $entityIDs['CONTACT']],
           ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL'],
           0
       )->getContacts();
       if(!empty($contacts))
       {
           $resultEntity['contact'] = $contacts;
       }
   }
   ```

- Python

   ```python
   if entity_ids["CONTACT"]:
       result = client.crm.contact.list(
           filter={"ID": entity_ids["CONTACT"]},
           select=["ID", "NAME", "LAST_NAME", "PHONE", "EMAIL"],
       ).result

       if result:
           result_entity["contact"] = result
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
       const result = await $b24.actions.v2.call.make({
           method: 'crm.company.list',
           params: {
               filter: { ID: entityIDs.COMPANY },
               select: ['ID', 'PHONE', 'EMAIL', 'TITLE']
           }
       });
       if (result.isSuccess) {
           const companies = result.getData()?.result;
           if (companies?.length > 0) {
               resultEntity.company = companies;
           }
       } else {
           console.error(result.getErrorMessages().join('; '));
       }
   }
   ```

- PHP

   ```php
   if(!empty($entityIDs['COMPANY']))
   {
       $companies = $sb->getCRMScope()->company()->list(
           [],
           ['ID' => $entityIDs['COMPANY']],
           ['ID', 'PHONE', 'EMAIL', 'TITLE']
       )->getCompanies();
       if(!empty($companies))
       {
           $resultEntity['company'] = $companies;
       }
   }
   ```

- Python

   ```python
   if entity_ids["COMPANY"]:
       result = client.crm.company.list(
           filter={"ID": entity_ids["COMPANY"]},
           select=["ID", "PHONE", "EMAIL", "TITLE"],
       ).result

       if result:
           result_entity["company"] = result
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
           if (!empty($item->PHONE)) {
               $phones = implode(', ', array_map(fn($phone) => $phone->VALUE, $item->PHONE));
           }
           $emails = '';
           if (!empty($item->EMAIL)) {
               $emails = implode(', ', array_map(fn($email) => $email->VALUE, $item->EMAIL));
           }
           $title = !empty($item->TITLE) ? $item->TITLE : '';
           if (!empty($item->NAME) || !empty($item->LAST_NAME)) {
               $namePart = trim($item->NAME . ' ' . $item->LAST_NAME);
               if ($title) {
                   $title .= ': ' . $namePart;
               } else {
                   $title = $namePart;
               }
           }
   
           $table[] = [
               $item->ID,
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

- Python

   ```python
   table = [[
       "Идентификатор",
       "Тип объекта",
       "Название/Имя и фамилия",
       "Телефон",
       "Email",
   ]]

   for entity_type, entities in result_entity.items():
       for item in entities:
           phones = ", ".join(phone["VALUE"] for phone in (item.get("PHONE") or []))
           emails = ", ".join(email["VALUE"] for email in (item.get("EMAIL") or []))
           title = item.get("TITLE") or ""
           name_part = " ".join(filter(None, [item.get("NAME"), item.get("LAST_NAME")]))
           if title and name_part:
               title = f"{title}: {name_part}"
           elif name_part:
               title = name_part

           table.append([
               item["ID"],
               entity_type,
               title or "—",
               phones or "—",
               emails or "—",
           ])

   for row in table:
       print("\t".join(map(str, row)))
   ```

{% endlist %}

## Пример кода

{% list tabs %}

- JS

   ```javascript
   import { createInterface } from 'node:readline/promises'
   import { B24Hook } from '@bitrix24/b24jssdk'

   const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
   // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

   // Запрос у пользователя телефона и email
   const rl = createInterface({ input: process.stdin, output: process.stdout })
   const phone = await rl.question('Введите номер телефона: ')
   const email = await rl.question('Введите email: ')
   rl.close()

   // Инициализация переменных
   const entityIDs = {
       LEAD: [],
       CONTACT: [],
       COMPANY: []
   }

   const resultEntity = {
       lead: [],
       contact: [],
       company: []
   }

   // Объединяет идентификаторы из ответа метода с объектом entityIDs
   function mergeDuplicates(data) {
       for (const type of ['LEAD', 'CONTACT', 'COMPANY']) {
           if (Array.isArray(data?.[type])) {
               entityIDs[type] = entityIDs[type].concat(data[type])
           }
       }
   }

   // Поиск дубликатов по телефону
   if (phone) {
       const phoneResult = await $b24.actions.v2.call.make({
           method: 'crm.duplicate.findbycomm',
           params: { type: 'PHONE', values: [phone] }
       })
       if (phoneResult.isSuccess) {
           mergeDuplicates(phoneResult.getData()?.result)
       } else {
           console.error('Ошибка при поиске дубликатов по телефону:', phoneResult.getErrorMessages().join('; '))
       }
   }

   // Поиск дубликатов по email
   if (email) {
       const emailResult = await $b24.actions.v2.call.make({
           method: 'crm.duplicate.findbycomm',
           params: { type: 'EMAIL', values: [email] }
       })
       if (emailResult.isSuccess) {
           mergeDuplicates(emailResult.getData()?.result)
       } else {
           console.error('Ошибка при поиске дубликатов по email:', emailResult.getErrorMessages().join('; '))
       }
   }

   // Обрабатываем лиды
   if (entityIDs.LEAD.length > 0) {
       const result = await $b24.actions.v2.call.make({
           method: 'crm.lead.list',
           params: {
               filter: { ID: entityIDs.LEAD },
               select: ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
           }
       })
       if (result.isSuccess) {
           const leads = result.getData()?.result
           if (leads?.length > 0) {
               resultEntity.lead = leads
           }
       } else {
           console.error(result.getErrorMessages().join('; '))
       }
   }

   // Обрабатываем контакты
   if (entityIDs.CONTACT.length > 0) {
       const result = await $b24.actions.v2.call.make({
           method: 'crm.contact.list',
           params: {
               filter: { ID: entityIDs.CONTACT },
               select: ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
           }
       })
       if (result.isSuccess) {
           const contacts = result.getData()?.result
           if (contacts?.length > 0) {
               resultEntity.contact = contacts
           }
       } else {
           console.error(result.getErrorMessages().join('; '))
       }
   }

   // Обрабатываем компании
   if (entityIDs.COMPANY.length > 0) {
       const result = await $b24.actions.v2.call.make({
           method: 'crm.company.list',
           params: {
               filter: { ID: entityIDs.COMPANY },
               select: ['ID', 'PHONE', 'EMAIL', 'TITLE']
           }
       })
       if (result.isSuccess) {
           const companies = result.getData()?.result
           if (companies?.length > 0) {
               resultEntity.company = companies
           }
       } else {
           console.error(result.getErrorMessages().join('; '))
       }
   }

   // Формируем таблицу
   const table = []
   // Заголовок таблицы
   table.push([
       "Идентификатор",
       "Тип объекта",
       "Название/Имя и фамилия",
       "Телефон",
       "Email"
   ])

   // Строки данных
   for (const entity in resultEntity) {
       resultEntity[entity].forEach(function(item) {
           let phones = ''
           if (item.PHONE) {
               phones = item.PHONE.map(phone => phone.VALUE).join(', ')
           }
           let emails = ''
           if (item.EMAIL) {
               emails = item.EMAIL.map(email => email.VALUE).join(', ')
           }
           let title = item.TITLE ? item.TITLE + (item.NAME || item.LAST_NAME ? ': ' : '') : ''
           if (item.NAME || item.LAST_NAME) {
               title += [item.NAME, item.LAST_NAME].join(' ')
           }

           table.push([
               item.ID,
               entity,
               title,
               phones || '—',
               emails || '—'
           ])
       })
   }

   // Выводим таблицу в консоль
   console.table(table)
   ```

- PHP

   ```php
   <?php
   // composer require bitrix24/b24phpsdk:"^3.0"
   require_once 'vendor/autoload.php';

   use Bitrix24\SDK\Services\ServiceBuilderFactory;
   use Bitrix24\SDK\Services\CRM\Duplicates\Result\DuplicateResult;
   use Symfony\Component\EventDispatcher\EventDispatcher;
   use Monolog\Logger;
   use Monolog\Handler\StreamHandler;

   $log = new Logger('b24');
   $log->pushHandler(new StreamHandler('php://stdout'));

   $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
       ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

   // Запрос у пользователя телефона и email
   $phone = readline("Введите номер телефона: ");
   $email = readline("Введите email: ");

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

   // Объединяет идентификаторы из ответа метода с массивом $entityIDs
   function mergeDuplicates(DuplicateResult $result, array &$entityIDs): void
   {
       $data = $result->getCoreResponse()->getResponseData()->getResult();
       foreach (['LEAD', 'CONTACT', 'COMPANY'] as $type) {
           if (!empty($data[$type]) && is_array($data[$type])) {
               $entityIDs[$type] = array_merge($entityIDs[$type], $data[$type]);
           }
       }
   }

   // Поиск дубликатов по телефону
   if($phone)
   {
       mergeDuplicates($sb->getCRMScope()->duplicate()->findByPhone([$phone]), $entityIDs);
   }

   // Поиск дубликатов по email
   if($email)
   {
       mergeDuplicates($sb->getCRMScope()->duplicate()->findByEmail([$email]), $entityIDs);
   }

   // Обрабатываем лиды
   if(!empty($entityIDs['LEAD']))
   {
       $leads = $sb->getCRMScope()->lead()->list(
           [],
           ['ID' => $entityIDs['LEAD']],
           ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
       )->getLeads();
       if(!empty($leads))
       {
           $resultEntity['lead'] = $leads;
       }
   }

   // Обрабатываем контакты
   if(!empty($entityIDs['CONTACT']))
   {
       $contacts = $sb->getCRMScope()->contact()->list(
           [],
           ['ID' => $entityIDs['CONTACT']],
           ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL'],
           0
       )->getContacts();
       if(!empty($contacts))
       {
           $resultEntity['contact'] = $contacts;
       }
   }

   // Обрабатываем компании
   if(!empty($entityIDs['COMPANY']))
   {
       $companies = $sb->getCRMScope()->company()->list(
           [],
           ['ID' => $entityIDs['COMPANY']],
           ['ID', 'PHONE', 'EMAIL', 'TITLE']
       )->getCompanies();
       if(!empty($companies))
       {
           $resultEntity['company'] = $companies;
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
           if (!empty($item->PHONE)) {
               $phones = implode(', ', array_map(fn($phone) => $phone->VALUE, $item->PHONE));
           }
           $emails = '';
           if (!empty($item->EMAIL)) {
               $emails = implode(', ', array_map(fn($email) => $email->VALUE, $item->EMAIL));
           }
           $title = !empty($item->TITLE) ? $item->TITLE : '';
           if (!empty($item->NAME) || !empty($item->LAST_NAME)) {
               $namePart = trim($item->NAME . ' ' . $item->LAST_NAME);
               if ($title) {
                   $title .= ': ' . $namePart;
               } else {
                   $title = $namePart;
               }
           }

           $table[] = [
               $item->ID,
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
   ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    phone = input("Введите номер телефона: ")
    email = input("Введите email: ")

    entity_ids = {"LEAD": [], "CONTACT": [], "COMPANY": []}
    result_entity = {"lead": [], "contact": [], "company": []}

    try:
        if phone:
            phone_result = client.crm.duplicate.findbycomm(
                type="PHONE",
                values=[phone],
            ).response.result
            for key in entity_ids:
                entity_ids[key].extend(phone_result.get(key, []))

        if email:
            email_result = client.crm.duplicate.findbycomm(
                type="EMAIL",
                values=[email],
            ).response.result
            for key in entity_ids:
                entity_ids[key].extend(email_result.get(key, []))

        if entity_ids["LEAD"]:
            result = client.crm.lead.list(
                filter={"ID": entity_ids["LEAD"]},
                select=["ID", "NAME", "LAST_NAME", "PHONE", "EMAIL", "TITLE"],
            ).response.result
            if result:
                result_entity["lead"] = result

        if entity_ids["CONTACT"]:
            result = client.crm.contact.list(
                filter={"ID": entity_ids["CONTACT"]},
                select=["ID", "NAME", "LAST_NAME", "PHONE", "EMAIL"],
            ).response.result
            if result:
                result_entity["contact"] = result

        if entity_ids["COMPANY"]:
            result = client.crm.company.list(
                filter={"ID": entity_ids["COMPANY"]},
                select=["ID", "PHONE", "EMAIL", "TITLE"],
            ).response.result
            if result:
                result_entity["company"] = result
    except BitrixAPIError as error:
        print(error)

    table = [[
        "Идентификатор",
        "Тип объекта",
        "Название/Имя и фамилия",
        "Телефон",
        "Email",
    ]]

    for entity_type, entities in result_entity.items():
        for item in entities:
            phones = ""
            if item.get("PHONE"):
                phones = ", ".join(phone["VALUE"] for phone in item["PHONE"])

            emails = ""
            if item.get("EMAIL"):
                emails = ", ".join(email["VALUE"] for email in item["EMAIL"])

            title = item.get("TITLE") or ""
            if item.get("NAME") or item.get("LAST_NAME"):
                name_part = " ".join(filter(None, [item.get("NAME"), item.get("LAST_NAME")]))
                if title:
                    title = f"{title}: {name_part}"
                else:
                    title = name_part

            table.append([
                item["ID"],
                entity_type,
                title or "—",
                phones or "—",
                emails or "—",
            ])

    for row in table:
        print("\t".join(map(str, row)))
    ```

{% endlist %}
