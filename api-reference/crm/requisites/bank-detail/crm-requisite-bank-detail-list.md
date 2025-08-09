# Получить список банковских реквизитов по фильтру crm.requisite.bankdetail.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список банковских реквизитов по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите [поля банковского реквизита](#fields)).

Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля банковских реквизитов ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных банковских реквизитов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют [полям банковского реквизита](#fields).

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
[`object`](../../../data-types.md) | Объект для сортировки выбранных банковских реквизитов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют [полям банковского реквизита](#fields).

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

### Описание полей банковского реквизита {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита. Создается автоматически и уникален в рамках портала ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор родительского объекта. Сейчас может быть только идентификатор реквизита. 

Идентификаторы реквизитов можно получить с помощью метода [`crm.requisite.list`](../universal/crm-requisite-list.md) ||
|| **COUNTRY_ID**
[`integer`](../../../data-types.md) | Идентификатор страны, которой соответствует набор полей банковского реквизита (смотрите метод [crm.requisite.preset.countries](../presets/crm-requisite-preset-countries.md) для получения доступных значений).

Код страны банковского реквизита совпадает с кодом страны в привязанном шаблоне реквизитов, идентификатор которого указан в поле `ENTITY_ID` 
||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, изменившего реквизит ||
|| **NAME**
[`string`](../../../data-types.md) | Название банковского реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле. 

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности. Используются значения `Y` или `N`. 

Сейчас поле фактически ни на что не влияет ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **RQ_BANK_NAME**
[`string`](../../../data-types.md) | Наименование банка ||
|| **RQ_BANK_ADDR**
[`string`](../../../data-types.md) | Адрес банка ||
|| **RQ_BANK_CODE**
[`string`](../../../data-types.md) | Código do banco (для страны BR) ||
|| **RQ_BANK_ROUTE_NUM**
[`string`](../../../data-types.md) | Bank Routing Number ||
|| **RQ_BIK**
[`string`](../../../data-types.md) | БИК ||
|| **RQ_CODEB**
[`string`](../../../data-types.md) | Code Banque (для страны FR) ||
|| **RQ_CODEG**
[`string`](../../../data-types.md) | Code Guichet (для страны FR) ||
|| **RQ_RIB**
[`string`](../../../data-types.md) | Clé RIB (для страны FR) ||
|| **RQ_MFO**
[`string`](../../../data-types.md) | МФО ||
|| **RQ_ACC_NAME**
[`string`](../../../data-types.md) | Bank Account Holder Name ||
|| **RQ_ACC_NUM**
[`string`](../../../data-types.md) | Bank Account Number ||
|| **RQ_ACC_TYPE**
[`string`](../../../data-types.md) | Tipo da conta (для страны BR) ||
|| **RQ_AGENCY_NAME**
[`string`](../../../data-types.md) | Agência (для страны BR) ||
|| **RQ_IIK**
[`string`](../../../data-types.md) | ИИК ||
|| **RQ_ACC_CURRENCY**
[`string`](../../../data-types.md) | Валюта счета ||
|| **RQ_COR_ACC_NUM**
[`string`](../../../data-types.md) | Корреспондентский счет ||
|| **RQ_IBAN**
[`string`](../../../data-types.md) | IBAN ||
|| **RQ_SWIFT**
[`string`](../../../data-types.md) | SWIFT ||
|| **RQ_BIC**
[`string`](../../../data-types.md) | BIC ||
|| **COMMENTS**
[`string`](../../../data-types.md) | Комментарий ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы. Назначение поля может меняться конечным разработчиком ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"DATE_CREATE":"ASC"},"filter":{"COUNTRY_ID":"1"},"select":["ENTITY_ID","ID","NAME"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.bankdetail.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"DATE_CREATE":"ASC"},"filter":{"COUNTRY_ID":"1"},"select":["ENTITY_ID","ID","NAME"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.bankdetail.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.requisite.bankdetail.list',
        {
          order: { "DATE_CREATE": "ASC" },
          filter: { "COUNTRY_ID": "1" },
          select: [ "ENTITY_ID", "ID", "NAME" ]
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
      const generator = $b24.fetchListMethod('crm.requisite.bankdetail.list', {
        order: { "DATE_CREATE": "ASC" },
        filter: { "COUNTRY_ID": "1" },
        select: [ "ENTITY_ID", "ID", "NAME" ]
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.requisite.bankdetail.list', {
        order: { "DATE_CREATE": "ASC" },
        filter: { "COUNTRY_ID": "1" },
        select: [ "ENTITY_ID", "ID", "NAME" ]
      }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.bankdetail.list',
                [
                    'order'  => ['DATE_CREATE' => 'ASC'],
                    'filter' => ['COUNTRY_ID' => '1'],
                    'select' => ['ENTITY_ID', 'ID', 'NAME'],
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
        echo 'Error listing bank details: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.bankdetail.list",
        {
            order: { "DATE_CREATE": "ASC" },
            filter: { "COUNTRY_ID": "1" },
            select: [ "ENTITY_ID", "ID", "NAME" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.bankdetail.list',
        [
            'order' => ['DATE_CREATE' => 'ASC'],
            'filter' => ['COUNTRY_ID' => '1'],
            'select' => ['ENTITY_ID', 'ID', 'NAME']
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
            "ENTITY_ID": "27",
            "ID": "11",
            "NAME": "Тинькофф"
        },
        {
            "ENTITY_ID": "30",
            "ID": "15",
            "NAME": "АО \"АЛЬФА-БАНК\""
        },
        {
            "ENTITY_ID": "30",
            "ID": "16",
            "NAME": "АО \"Тинькофф Банк\""
        },
        {
            "ENTITY_ID": "45",
            "ID": "17",
            "NAME": "АО \"Тинькофф Банк\""
        },
        {
            "ENTITY_ID": "45",
            "ID": "18",
            "NAME": "АО \"АЛЬФА-БАНК\""
        }
    ],
    "total": 5,
    "time": {
        "start": 1717498684.70562,
        "finish": 1717498685.13295,
        "duration": 0.42733001708984375,
        "processing": 0.020370006561279297,
        "date_start": "2024-06-04T12:58:04+02:00",
        "date_finish": "2024-06-04T12:58:05+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md)| Массив объектов с информацией из выбранных банковских реквизитов. Каждый элемент содержит выбранные [поля банковского реквизита](#fields) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| `Access denied` | Недостаточно прав доступа для получения списка банковских реквизитов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-bank-detail-add.md)
- [{#T}](./crm-requisite-bank-detail-update.md)
- [{#T}](./crm-requisite-bank-detail-get.md)
- [{#T}](./crm-requisite-bank-detail-delete.md)
- [{#T}](./crm-requisite-bank-detail-fields.md)
