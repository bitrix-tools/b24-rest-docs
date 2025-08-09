# Получить список связей реквизитов crm.requisite.link.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список связей реквизитов по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив со списком полей, которые необходимо выбрать (смотрите [поля связи реквизитов](#fields)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля связи реквизитов ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных связей реквизитов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют [полям связи реквизита](#fields).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно 
||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных связей реквизитов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют [полям связи реквизитов](#fields).

Возможные значения для `order`:
- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

### Описание полей связи реквизита с объектом CRM {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE_ID**
[`integer`](../../../data-types.md) | Идентификатор типа объекта, к которому относится связь.

Могут использоваться следующие типы:
- сделка (значение `2`)
- старый счет (значение `5`)
- предложение (значение `7`)
- новый счет (значение `31`)
- другие динамические объекты (для получения возможных значений смотрите метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md)).

Идентификаторы типов объектов CRM можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор объекта, к которому относится связь. 

Идентификаторы объектов можно получить с помощью следующих методов: [crm.deal.list](../../deals/crm-deal-list.md), [crm.quote.list](../../quote/crm-quote-list.md), [crm.item.list](../../universal/crm-item-list.md) ||
|| **REQUISITE_ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита клиента, выбранного для объекта. 

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **BANK_DETAIL_ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита клиента, выбранного для объекта.

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|| **MC_REQUISITE_ID**
[`integer`](../../../data-types.md) | Идентификатор реквизита моей компании, выбранного для объекта. 

Идентификаторы реквизитов можно получить с помощью метода [crm.requisite.list](../universal/crm-requisite-list.md) ||
|| **MC_BANK_DETAIL_ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита моей компании, выбранного для объекта. 

Идентификаторы банковских реквизитов можно получить с помощью метода [crm.requisite.bankdetail.list](../bank-detail/crm-requisite-bank-detail-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ENTITY_ID":"ASC"},"filter":{"@ENTITY_TYPE_ID":[1,2,7,31]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.link.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ENTITY_ID":"ASC"},"filter":{"@ENTITY_TYPE_ID":[1,2,7,31]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.link.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.requisite.link.list',
        {
          order: { "ENTITY_ID": "ASC" },
          filter: { "@ENTITY_TYPE_ID": [1, 2, 7, 31] }    // Лиды, сделки, предложения, счёта.
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.requisite.link.list', {
        order: { "ENTITY_ID": "ASC" },
        filter: { "@ENTITY_TYPE_ID": [1, 2, 7, 31] }    // Лиды, сделки, предложения, счёта.
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.requisite.link.list', {
        order: { "ENTITY_ID": "ASC" },
        filter: { "@ENTITY_TYPE_ID": [1, 2, 7, 31] }    // Лиды, сделки, предложения, счёта.
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.link.list',
                [
                    'order' => ['ENTITY_ID' => 'ASC'],
                    'filter' => ['@ENTITY_TYPE_ID' => [1, 2, 7, 31]],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        if ($result->more()) {
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching requisite links: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.link.list", {
            order: {"ENTITY_ID": "ASC"},
            filter: {"@ENTITY_TYPE_ID": [1, 2, 7, 31]}    // Лиды, сделки, предложения, счёта.
        },
        function (result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.dir(result.data());
                if (result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.link.list',
        [
            'order' => ['ENTITY_ID' => 'ASC'],
            'filter' => ['@ENTITY_TYPE_ID' => [1, 2, 7, 31]]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ENTITY_TYPE_ID": "7",
            "ENTITY_ID": "1",
            "REQUISITE_ID": "0",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "0",
            "MC_BANK_DETAIL_ID": "0"
        },
        {
            "ENTITY_TYPE_ID": "7",
            "ENTITY_ID": "2",
            "REQUISITE_ID": "0",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "0",
            "MC_BANK_DETAIL_ID": "0"
        },
        {
            "ENTITY_TYPE_ID": "7",
            "ENTITY_ID": "3",
            "REQUISITE_ID": "0",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "0",
            "MC_BANK_DETAIL_ID": "0"
        },
        {
            "ENTITY_TYPE_ID": "7",
            "ENTITY_ID": "4",
            "REQUISITE_ID": "7",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "2",
            "MC_BANK_DETAIL_ID": "2"
        },
        {
            "ENTITY_TYPE_ID": "7",
            "ENTITY_ID": "5",
            "REQUISITE_ID": "0",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "2",
            "MC_BANK_DETAIL_ID": "2"
        },
        {
            "ENTITY_TYPE_ID": "7",
            "ENTITY_ID": "6",
            "REQUISITE_ID": "0",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "2",
            "MC_BANK_DETAIL_ID": "2"
        },
        {
            "ENTITY_TYPE_ID": "2",
            "ENTITY_ID": "25",
            "REQUISITE_ID": "38",
            "BANK_DETAIL_ID": "0",
            "MC_REQUISITE_ID": "0",
            "MC_BANK_DETAIL_ID": "0"
        },
        {
            "ENTITY_TYPE_ID": "31",
            "ENTITY_ID": "315",
            "REQUISITE_ID": "60",
            "BANK_DETAIL_ID": "24",
            "MC_REQUISITE_ID": "2",
            "MC_BANK_DETAIL_ID": "2"
        }
    ],
    "total": 8,
    "time": {
        "start": 1718709631.410351,
        "finish": 1718709631.771324,
        "duration": 0.36097288131713867,
        "processing": 0.015230178833007812,
        "date_start": "2024-06-18T13:20:31+02:00",
        "date_finish": "2024-06-18T13:20:31+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md)| Массив объектов с информацией из выбранных связей реквизитов. Каждый элемент содержит выбранные [поля связи реквизита](#fields) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": 0,
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `Access denied` | Недостаточно прав доступа для получения списка связей реквизитов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-link-register.md)
- [{#T}](./crm-requisite-link-get.md)
- [{#T}](./crm-requisite-link-unregister.md)
- [{#T}](./crm-requisite-link-fields.md)
