# Получить список лидов crm.lead.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение лидов

Метод `crm.lead.list` возвращает список лидов по фильтру. Является реализацией списочного метода для лидов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите поля лида [crm-lead-fields](./crm-lead-fields.md)).

При выборке используйте маски:
- "*" - для выборки всех полей (без пользовательских и множественных)
- "UF_*"- для выборки всех пользовательских полей (без множественных)

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора ("PHONE", "EMAIL" и так далее).
Возможности добавить к фильтру логическое условие OR, если нужно выбрать по нескольким разным полям, нет||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных лидов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям лида [crm-lead-fields](./crm-lead-fields.md).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - "мол%" — ищем значения, начинающиеся с «мол»
  - "%мол" — ищем значения, заканчивающиеся на «мол»
  - "%мол%" — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - "мол%" — ищем значения, не начинающиеся с «мол»
  - "%мол" — ищем значения, не заканчивающиеся на «мол»
  - "%мол%" — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно
- `!` — не равно
  ||
  || **order**
Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания ||
  || **start**
  [`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

Так же смотрите описание [списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"select":["*","UF_*"],"start":50,"filter":{"=OPPORTUNITY":15000},"order":{"STATUS_ID":"ASC"}}' \
  https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.lead.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"select":["*","UF_*"],"start":50,"filter":{"=OPPORTUNITY":15000},"order":{"STATUS_ID":"ASC"},"auth":"**put_access_token_here**"}' \
  https://**put_your_bitrix24_address**/rest/crm.lead.list
  ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.lead.list',
        {
          select: ['*', 'UF_*'],
          filter: {
            '=OPPORTUNITY': 15000,
          },
          order: {
            STATUS_ID: 'ASC',
          },
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.lead.list', {
        select: ['*', 'UF_*'],
        filter: {
          '=OPPORTUNITY': 15000,
        },
        order: {
          STATUS_ID: 'ASC',
        },
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.lead.list', {
        select: ['*', 'UF_*'],
        filter: {
          '=OPPORTUNITY': 15000,
        },
        order: {
          STATUS_ID: 'ASC',
        },
      }, 50)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP

  ```php      
  try {
      $order = [];
      $filter = []; // Define your filter criteria here
      $select = [
          'ID', 'TITLE', 'HONORIFIC', 'NAME', 'SECOND_NAME', 'LAST_NAME', 
          'BIRTHDATE', 'COMPANY_TITLE', 'SOURCE_ID', 'SOURCE_DESCRIPTION', 
          'STATUS_ID', 'STATUS_DESCRIPTION', 'STATUS_SEMANTIC_ID', 'POST', 
          'ADDRESS', 'ADDRESS_2', 'ADDRESS_CITY', 'ADDRESS_POSTAL_CODE', 
          'ADDRESS_REGION', 'ADDRESS_PROVINCE', 'ADDRESS_COUNTRY', 
          'ADDRESS_COUNTRY_CODE', 'ADDRESS_LOC_ADDR_ID', 'CURRENCY_ID', 
          'OPPORTUNITY', 'IS_MANUAL_OPPORTUNITY', 'OPENED', 'COMMENTS', 
          'HAS_PHONE', 'HAS_EMAIL', 'HAS_IMOL', 'ASSIGNED_BY_ID', 
          'CREATED_BY_ID', 'MODIFY_BY_ID', 'MOVED_BY_ID', 'DATE_CREATE', 
          'DATE_MODIFY', 'MOVED_TIME', 'COMPANY_ID', 'CONTACT_ID', 
          'CONTACT_IDS', 'IS_RETURN_CUSTOMER', 'DATE_CLOSED', 
          'ORIGINATOR_ID', 'ORIGIN_ID', 'UTM_SOURCE', 'UTM_MEDIUM', 
          'UTM_CAMPAIGN', 'UTM_CONTENT', 'UTM_TERM', 'PHONE', 'EMAIL', 
          'WEB', 'IM', 'LINK'
      ];
      $startItem = 0;
      $leadsResult = $serviceBuilder->getCRMScope()->lead()->list($order, $filter, $select, $startItem);
      
      foreach ($leadsResult->getLeads() as $lead) {
          print("ID: {$lead->ID}, TITLE: {$lead->TITLE}, NAME: {$lead->NAME}, BIRTHDATE: " . 
                ($lead->BIRTHDATE ? $lead->BIRTHDATE->format(DATE_ATOM) : 'N/A') . "\n");
      }
  } catch (Throwable $e) {
      print("Error: " . $e->getMessage());
  }
  ```

- BX24.js

    ```javascript 
    BX24.callMethod(
      'crm.lead.list',
      {
        select: ['*', 'UF_*'],
        start: 50,
        filter: {
            '=OPPORTUNITY': 15000,
        },
        order: {
            STATUS_ID: 'ASC',
        }, 
      },
      (result) => {
        if(result.error())
        {
          console.error(result.error());
  
          return;
        }
        
        console.info(result.data());
      }
    );
    ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'crm.lead.list',
      [
          'select' => ['*', 'UF_*'],
          'start' => 50,
          'filter' => [
              '=OPPORTUNITY' => 15000,
          ],
          'order' => [
              'STATUS_ID' => 'ASC',
          ],
      ]
  );

  echo '<PRE>';
  print_r($result);
  echo '</PRE>';
  ```

{% endlist %}

## Некоторые практические примеры

{% list tabs %}

- Поиск несконвертированных лидов с суммой больше нуля

  ```js
  BX24.callMethod(
      "crm.lead.list",
      {
          order: { "STATUS_ID": "ASC" },
          filter: { ">OPPORTUNITY": 0, "!STATUS_ID": "CONVERTED" },
          select: [ "ID", "TITLE", "STATUS_ID", "OPPORTUNITY", "CURRENCY_ID" ],
      },
      (result) => {
          if(result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.dir(result.data());
              if (result.more())
              {
                  result.next();
              }
          }
      }
  );
  ```

- Поиск лида по телефону

  ```js
  BX24.callMethod(
      "crm.lead.list",
      {
          filter: { "PHONE": "555888" },
          select: [ "ID", "TITLE" ]
      },
      (result) => {
        if(result.error())
        {
          console.error(result.error());
        }
        else
        {
          console.dir(result.data());
          if (result.more())
          {
            result.next();
          }
        }
      }
  );
  ```

- Выборка лидов за месяц

  ```php
  $result = CRest::call(
      'crm.lead.list',
      [
          'filter' => [
              '>DATE_CREATE' => '2023-10-01T00:00:00',
              '<DATE_CREATE' => '2023-10-31T23:59:59',
          ],
          'select' => [
              'ID',
              'DATE_CREATE',
          ],
      ]
  );
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": [
    {
      "ID": "5",
      "TITLE": "Лид 1",
      "HONORIFIC": null,
      "NAME": "Erasmus",
      "SECOND_NAME": null,
      "LAST_NAME": "Golden of Ireland",
      "COMPANY_TITLE": null,
      "COMPANY_ID": "0",
      "CONTACT_ID": "2069",
      "IS_RETURN_CUSTOMER": "N",
      "BIRTHDATE": "",
      "SOURCE_ID": "CALL",
      "SOURCE_DESCRIPTION": null,
      "STATUS_ID": "CONVERTED",
      "STATUS_DESCRIPTION": null,
      "POST": null,
      "COMMENTS": null,
      "CURRENCY_ID": "RUB",
      "OPPORTUNITY": "15000.00",
      "IS_MANUAL_OPPORTUNITY": "Y",
      "HAS_PHONE": "Y",
      "HAS_EMAIL": "Y",
      "HAS_IMOL": "N",
      "ASSIGNED_BY_ID": "1",
      "CREATED_BY_ID": "1",
      "MODIFY_BY_ID": "1",
      "DATE_CREATE": "2021-05-31T15:10:16+03:00",
      "DATE_MODIFY": "2021-11-26T18:56:13+03:00",
      "DATE_CLOSED": "2021-07-16T16:43:44+03:00",
      "STATUS_SEMANTIC_ID": "S",
      "OPENED": "Y",
      "ORIGINATOR_ID": null,
      "ORIGIN_ID": null,
      "MOVED_BY_ID": "1",
      "MOVED_TIME": "2021-07-16T16:43:44+03:00",
      "ADDRESS": "7677 Hollow Ridge Alley",
      "ADDRESS_2": null,
      "ADDRESS_CITY": null,
      "ADDRESS_POSTAL_CODE": null,
      "ADDRESS_REGION": null,
      "ADDRESS_PROVINCE": null,
      "ADDRESS_COUNTRY": "Indonesia",
      "ADDRESS_COUNTRY_CODE": null,
      "ADDRESS_LOC_ADDR_ID": "1",
      "UTM_SOURCE": null,
      "UTM_MEDIUM": null,
      "UTM_CAMPAIGN": null,
      "UTM_CONTENT": null,
      "UTM_TERM": null,
      "LAST_ACTIVITY_BY": "1",
      "LAST_ACTIVITY_TIME": "2021-05-31T15:10:16+03:00",
      "UF_CRM_1704817278": null,
      "UF_CRM_1706782596092": null,
      "UF_CRM_1708952993785": false
    },
    {
      "ID": "6",
      "TITLE": "Лид 2",
      "HONORIFIC": null,
      "NAME": "Ignacius",
      "SECOND_NAME": null,
      "LAST_NAME": "Slayny",
      "COMPANY_TITLE": null,
      "COMPANY_ID": "0",
      "CONTACT_ID": "2070",
      "IS_RETURN_CUSTOMER": "N",
      "BIRTHDATE": "",
      "SOURCE_ID": "CALL",
      "SOURCE_DESCRIPTION": null,
      "STATUS_ID": "CONVERTED",
      "STATUS_DESCRIPTION": null,
      "POST": null,
      "COMMENTS": null,
      "CURRENCY_ID": "RUB",
      "OPPORTUNITY": "15000.00",
      "IS_MANUAL_OPPORTUNITY": "Y",
      "HAS_PHONE": "Y",
      "HAS_EMAIL": "Y",
      "HAS_IMOL": "N",
      "ASSIGNED_BY_ID": "1",
      "CREATED_BY_ID": "1",
      "MODIFY_BY_ID": "1",
      "DATE_CREATE": "2021-05-31T15:10:16+03:00",
      "DATE_MODIFY": "2021-11-26T18:56:13+03:00",
      "DATE_CLOSED": "2021-07-16T16:43:47+03:00",
      "STATUS_SEMANTIC_ID": "S",
      "OPENED": "Y",
      "ORIGINATOR_ID": null,
      "ORIGIN_ID": null,
      "MOVED_BY_ID": "1",
      "MOVED_TIME": "2021-07-16T16:43:47+03:00",
      "ADDRESS": "35 Mosinee Street",
      "ADDRESS_2": null,
      "ADDRESS_CITY": null,
      "ADDRESS_POSTAL_CODE": null,
      "ADDRESS_REGION": null,
      "ADDRESS_PROVINCE": null,
      "ADDRESS_COUNTRY": "Japan",
      "ADDRESS_COUNTRY_CODE": null,
      "ADDRESS_LOC_ADDR_ID": "2",
      "UTM_SOURCE": null,
      "UTM_MEDIUM": null,
      "UTM_CAMPAIGN": null,
      "UTM_CONTENT": null,
      "UTM_TERM": null,
      "LAST_ACTIVITY_BY": "1",
      "LAST_ACTIVITY_TIME": "2021-05-31T15:10:16+03:00",
      "UF_CRM_1704817278": null,
      "UF_CRM_1706782596092": null,
      "UF_CRM_1708952993785": true
    },
    
      еще 48 лидов с аналогичной структурой
    
  ],
  "next": 50,
  "total": 654,
  "time": {
    "start": 1718292234.554781,
    "finish": 1718292234.657739,
    "duration": 0.10295796394348145,
    "processing": 0.05574321746826172,
    "date_start": "2024-06-13T18:23:54+03:00",
    "date_finish": "2024-06-13T18:23:54+03:00",
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип`  | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях сделок. 

Стоит учитывать, что структура полей может быть изменена из-за параметра `select`.

 Для получения информации о структуре лида смотрите метод [`crm.lead.get`](./crm-lead-get.md) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных элементов ||
|| **next**
[`integer`](../../data-types.md) | Содержит значение, которое нужно передать в следующий запрос в параметр `start`, чтобы получить следующую порцию данных.

Параметр `next` появляется в ответе, если количество элементов, соответствующих вашему запросу, превышает значение `50` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

> HTTP-статус: 40x, 50x Error

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| `Access denied` | У пользователя нет прав на чтение лидов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-repeat-lead.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)