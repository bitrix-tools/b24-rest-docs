# Получить историю движения по стадиям crm.stagehistory.list

> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод `crm.stagehistory.list` возвращает записи об истории движения по стадиям для элементов:
- [лидов](./leads/index.md),
- [сделок](./deals/index.md),
- [старых счетов](./outdated/invoice/index.md),
- [новых счетов](./universal/invoice.md),
- [смарт-процессов](./universal/user-defined-object-types/index.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`][1] | Идентификатор типа объекта. Может принимать значения:
- `1` — лид,
- `2` — сделка,
- `5` — счет (старый),
- `31` - счет (новый),
- числовой идентификатор [пользовательского типа](./universal/user-defined-object-types/index.md#id)
||
|| **order**
[`object`][1]| Список для сортировки, где ключ — поле, а значение — `ASC` или `DESC` ||
|| **filter**
[`object`][1] | Список для фильтрации. Фильтр поддерживает использование точных значений, массивов значений, а также модификаторы:
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
|| **select**
[`object`][1]| Список получаемых полей ||
|| **start**
[`integer`][1] | Сдвиг для постраничной навигации. Логика работы с постраничной навигацией стандартная для [списочных методов](../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Получить историю движения по стадиям для сделки с `ID=1`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"order":{"ID":"ASC"},"filter":{"OWNER_ID":1},"select":["ID","STAGE_ID","CREATED_TIME"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.stagehistory.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"order":{"ID":"ASC"},"filter":{"OWNER_ID":1},"select":["ID","STAGE_ID","CREATED_TIME"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.stagehistory.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const parameters = {
        entityTypeId: 2,
        order: { "ID": "ASC" },
        filter: { "OWNER_ID": 1 },
        select: [ "ID", "STAGE_ID", "CREATED_TIME" ]
    };
    
    try {
      const response = await $b24.callListMethod(
        'crm.stagehistory.list',
        parameters,
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.stagehistory.list', parameters, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.stagehistory.list', parameters, 0)
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
                'crm.stagehistory.list',
                [
                    'entityTypeId' => 2,
                    'order' => ['ID' => 'ASC'],
                    'filter' => ['OWNER_ID' => 1],
                    'select' => ['ID', 'STAGE_ID', 'CREATED_TIME'],
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
        echo 'Error listing stage history: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.stagehistory.list",
        {
            entityTypeId: 2,
            order: { "ID": "ASC" },
            filter: { "OWNER_ID": 1 },
            select: [ "ID", "STAGE_ID", "CREATED_TIME" ]
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
        'crm.stagehistory.list',
        [
            'entityTypeId' => 2,
            'order' => ['ID' => 'ASC'],
            'filter' => ['OWNER_ID' => 1],
            'select' => ['ID', 'STAGE_ID', 'CREATED_TIME']
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
    "result": {
        "items": [
        {
            "ID": 35,
            "TYPE_ID": 1,
            "OWNER_ID": 21,
            "CREATED_TIME": "2024-04-25T14:59:11+00:00",
            "CATEGORY_ID": 0,
            "STAGE_SEMANTIC_ID": "P",
            "STAGE_ID": "NEW"
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1724106224.858572,
        "finish": 1724106225.344968,
        "duration": 0.48639607429504395,
        "processing": 0.11864185333251953,
        "date_start": "2024-08-15T22:15:44+00:00",
        "date_finish": "2024-08-15T22:15:45+00:00",
        "operating": 0.11855506896972656
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Корневой элемент ответа, содержит массив записей [items](#items). Каждый объект — массив с ключами ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`int`][1] | Идентификатор записи ||
|| **TYPE_ID**
[`int`][1] | Тип записи. Может принимать значения:
- `1` — создание элемента,
- `2` — перевод на промежуточную стадию,
- `3` — перевод на финальную стадию,
- `5` — смена воронки ||
|| **OWNER_ID**
[`int`][1] | Идентификатор объекта, в котором изменилась стадия ||
|| **CREATED_TIME**
[`datetime`][1] | Идентификатор созданного элемента, равен времени перевода элемента на стадию ||
|#

Дополнительно есть специфичные для разных типов объектов поля:

{% list tabs %}

- для лидов и старых счетов

    #|
    || **Название**
    `тип` | **Описание** ||
    || **STATUS_SEMANTIC_ID**
    [`int`][1] | Cемантика стадии:
    - `P` — промежуточная стадия,
    - `S` — успешная стадия,
    - `F` — провальная стадия ||
    || **STATUS_ID**
    [`int`][1] | Идентификатор стадии ||
    |#

- для сделок, новых счетов и смарт-процессов

    #|
    || **Название**
    `тип` | **Описание** ||
    || **CATEGORY_ID**
    [`int`][1] | Идентификатор воронки ||
    || **STAGE_SEMANTIC_ID**
    [`int`][1] | Семантика стадии:
    - `P` — промежуточная стадия,
    - `S` — успешная стадия,
    - `F` — провальная стадия ||
    || **STAGE_ID**
    [`int`][1] | Идентификатор стадии ||
    |#

{% endlist %}    

## Обработка ошибок

HTTP-статус: **401**, **400**

```json
{
    "error": 0,
    "error_description": "SHIPMENT_DOCUMENT entity is not supported"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                           | **Описание**                                                       | **Значение**                                      ||
|| `403`      | `allowed_only_intranet_user`      | Действие разрешено только интранет-пользователям                   | Пользователь не является интранет-пользователем       ||
|| `400`      | `ENTITY_TYPE_NOT_SUPPORTED`       | Entity type `TYPE` is not supported                                | Возникает при передаче невалидного `entityTypeId` ||
|| `400`      | `INVALID_ARG_VALUE`               | Invalid filter: field '`field`' is not allowed in filter           | Переданное в `filter` поле `field` недоступно для фильтрации ||
|| `400`      | `INVALID_ARG_VALUE`               | Invalid filter: field '`field`' has invalid value                  | Переданное значение для поля `field` в `filter` некорректно ||
|| `400`      | `INVALID_ARG_VALUE`               | Invalid order: field '`field`' is not allowed in order             | Переданное в `order` поле `field` недоступно для сортировки ||
|| `400`      | `INVALID_ARG_VALUE`               | Invalid order: allowed sort directions are `ASC, DESC`. But got '`orderValue`' for field '`field`' | Переданное значение `orderValue` для поля `field` в параметр `order` некорректно ||

|#

{% include [системные ошибки](./../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./main-entities-fields.md)

[1]: ../data-types.md
