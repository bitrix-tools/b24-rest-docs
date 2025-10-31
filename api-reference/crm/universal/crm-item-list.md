# Получить список элементов crm.item.list

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «чтения» элементов объекта CRM

Метод получает список элементов определенного типа объекта CRM.

Элементы объекта CRM не попадут в итоговую выборку, если у пользователя нет прав на «чтение» этих элементов.  

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./index.md) или [пользовательского типа](./user-defined-object-types/index.md), чьи элементы нужно получить ||
|| **select**
[`array`][1] | Список полей, которые должны быть заполнены у элементов в выборке.

Может содержать в себе только названия полей элемента или `'*'`.

Список всех доступных полей для выборки можно узнать методом [`crm.item.fields`](./crm-item-fields.md). Перечень стандартных полей доступен в статье [Поля объектов CRM](./object-fields.md)
||
|| **filter**
[`object`][1] |
Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где
- `field_n` — название поля по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

Фильтр может иметь неограниченную вложенность и количество условий.
По умолчанию все условия соединяются друг с другом как `AND` (логическое И). Если нужно использовать `OR` (Логическое ИЛИ), то можно передать специальный ключ `logic` со значением `OR`.

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
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

Список всех доступных полей для фильтрации можно узнать методом [`crm.item.fields`](./crm-item-fields.md). Перечень стандартных полей доступен в статье [Поля объектов CRM](./object-fields.md)
||
|| **order**
[`object`][1] |
Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где
- `field_n` — название поля по которому будет произведена сортировка выборки элементов
- `value_n` — значение типа `string` равное:
  - `ASC` — сортировка по возрастанию
  - `DESC` — сортировка по убыванию

Список всех доступных полей для сортировки можно узнать методом [`crm.item.fields`](./crm-item-fields.md). Перечень стандартных полей доступен в статье [Поля объектов CRM](./object-fields.md)
||
|| **start**
[`integer`][1] | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|| **useOriginalUfNames**
[`boolean`][1] | Параметр для управления форматом имен пользовательских полей в запросе и ответе.   
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

## Примеры кода

Получить список лидов у которых:
1. Имя или фамилия не пустые
2. Находятся в статусе "В работе" или "Не обработан".
3. Пришли из источников "Реклама" или "Сайт".
4. Закреплены за менеджерами с идентификаторами 1 или 6.
5. Имеют сумму сделки от 5000 до 20000.
6. Режим расчета суммы является ручным

Задать следующий порядок сортировки у данной выборки:
* Имя и фамилия в порядке возрастания

Для наглядности выберем только необходимые для нас поля:
* Идентификатор `id`
* Название `title`
* Имя `name`
* Фамилия `lastName`
* Идентификатор стадии `stageId`
* Идентификатор источника `sourceId`
* Идентификатор ответственного `assignedById`
* Сумма `opportunity`
* Режим подсчета суммы `isManualOpportunity`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"select":["id","title","lastName","name","stageId","sourceId","assignedById","opportunity","isManualOpportunity"],"filter":{"0":{"logic":"OR","0":{"!=name":""},"1":{"!=lastName":""}},"@stageId":["NEW","IN_PROCESS"],"@sourceId":["WEB","ADVERTISING"],"@assignedById":[1,6],">=opportunity":5000,"<=opportunity":20000,"isManualOpportunity":"Y"},"order":{"lastName":"ASC","name":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"select":["id","title","lastName","name","stageId","sourceId","assignedById","opportunity","isManualOpportunity"],"filter":{"0":{"logic":"OR","0":{"!=name":""},"1":{"!=lastName":""}},"@stageId":["NEW","IN_PROCESS"],"@sourceId":["WEB","ADVERTISING"],"@assignedById":[1,6],">=opportunity":5000,"<=opportunity":20000,"isManualOpportunity":"Y"},"order":{"lastName":"ASC","name":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.item.list',
        {
          entityTypeId: 1,
          select: [
            "id",
            "title",
            "lastName",
            "name",
            "stageId",
            "sourceId",
            "assignedById",
            "opportunity",
            "isManualOpportunity",
          ],
          filter: {
            "0": {
              logic: "OR",
              "0": {
                "!=name": "",
              },
              "1": {
                "!=lastName": "",
              },
            },
            "@stageId": ["NEW", "IN_PROCESS"],
            "@sourceId": ['WEB', "ADVERTISING"],
            "@assignedById": [1, 6],
            ">=opportunity": 5000,
            "<=opportunity": 20000,
            "isManualOpportunity": "Y",
          },
          order: {
            lastName: 'ASC',
            name: 'ASC',
          },
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
      const generator = $b24.fetchListMethod('crm.item.list', {
        entityTypeId: 1,
        select: [
          "id",
          "title",
          "lastName",
          "name",
          "stageId",
          "sourceId",
          "assignedById",
          "opportunity",
          "isManualOpportunity",
        ],
        filter: {
          "0": {
            logic: "OR",
            "0": {
              "!=name": "",
            },
            "1": {
              "!=lastName": "",
            },
          },
          "@stageId": ["NEW", "IN_PROCESS"],
          "@sourceId": ['WEB', "ADVERTISING"],
          "@assignedById": [1, 6],
          ">=opportunity": 5000,
          "<=opportunity": 20000,
          "isManualOpportunity": "Y",
        },
        order: {
          lastName: 'ASC',
          name: 'ASC',
        },
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.item.list', {
        entityTypeId: 1,
        select: [
          "id",
          "title",
          "lastName",
          "name",
          "stageId",
          "sourceId",
          "assignedById",
          "opportunity",
          "isManualOpportunity",
        ],
        filter: {
          "0": {
            logic: "OR",
            "0": {
              "!=name": "",
            },
            "1": {
              "!=lastName": "",
            },
          },
          "@stageId": ["NEW", "IN_PROCESS"],
          "@sourceId": ['WEB', "ADVERTISING"],
          "@assignedById": [1, 6],
          ">=opportunity": 5000,
          "<=opportunity": 20000,
          "isManualOpportunity": "Y",
        },
        order: {
          lastName: 'ASC',
          name: 'ASC',
        },
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
        $entityTypeId = 1; // Replace with actual entity type ID
        $order = []; // Replace with actual order array
        $filter = []; // Replace with actual filter array
        $select = []; // Replace with actual select array
        $startItem = 0; // Optional, can be adjusted as needed
        $itemsResult = $serviceBuilder
            ->getCRMScope()
            ->item()
            ->list($entityTypeId, $order, $filter, $select, $startItem);
        foreach ($itemsResult->getItems() as $item) {
            print("ID: " . $item->id . PHP_EOL);
            print("XML ID: " . $item->xmlId . PHP_EOL);
            print("Title: " . $item->title . PHP_EOL);
            print("Created By: " . $item->createdBy . PHP_EOL);
            print("Updated By: " . $item->updatedBy . PHP_EOL);
            print("Created Time: " . $item->createdTime->format(DATE_ATOM) . PHP_EOL);
            print("Updated Time: " . $item->updatedTime->format(DATE_ATOM) . PHP_EOL);
            // Add more fields as necessary
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.item.list',
            {
                entityTypeId: 1,
                select: [
                    "id", 
                    "title",
                    "lastName",
                    "name",
                    "stageId", 
                    "sourceId", 
                    "assignedById", 
                    "opportunity", 
                    "isManualOpportunity",
                ],
                filter: {
                    "0": {
                        logic: "OR",
                        "0": {
                            "!=name": "",
                        },
                        "1": {
                            "!=lastName": "",
                        },
                    },
                    "@stageId": ["NEW", "IN_PROCESS"],
                    "@sourceId": ['WEB', "ADVERTISING"],
                    "@assignedById": [1, 6],
                    ">=opportunity": 5000,
                    "<=opportunity": 20000,
                    "isManualOpportunity": "Y",
                },
                order: {
                    lastName: 'ASC',
                    name: 'ASC',
                },
            },
            (result) => {
                if (result.error())
                {
                    console.error(result.error());

                    return;
                }

                console.info(result.data());
            },
        );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 1,
            'select' => [
                "id",
                "title",
                "lastName",
                "name",
                "stageId",
                "sourceId",
                "assignedById",
                "opportunity",
                "isManualOpportunity",
            ],
            'filter' => [
                "0" => [
                    "logic" => "OR",
                    "0" => [
                        "!=name" => "",
                    ],
                    "1" => [
                        "!=lastName" => "",
                    ],
                ],
                "@stageId" => ["NEW", "IN_PROCESS"],
                "@sourceId" => ['WEB', "ADVERTISING"],
                "@assignedById" => [1, 6],
                ">=opportunity" => 5000,
                "<=opportunity" => 20000,
                "isManualOpportunity" => "Y",
            ],
            'order' => [
                'lastName' => 'ASC',
                'name' => 'ASC',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Пример запроса с фильтром по дате с логикой OR

Фильтруем сделки `entityTypeId = 2` по двум датам создания. Для каждой даты задаем диапазон начала и конца суток.

Для наглядности выберем только необходимые для нас поля:
* Идентификатор `id`
* Название `title`
* Дата создания `createdTime`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"select":["id","title","createdTime"],"filter":{"0":{"logic":"OR","0":{">=createdTime":"2025-10-31T00:00:00+02:00","<createdTime":"2025-11-01T00:00:00+02:00"},"1":{">=createdTime":"2025-02-28T00:00:00+02:00","<createdTime":"2025-03-01T00:00:00+02:00"}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"select":["id","title","createdTime"],"filter":{"0":{"logic":"OR","0":{">=createdTime":"2025-10-31T00:00:00+02:00","<createdTime":"2025-11-01T00:00:00+02:00"},"1":{">=createdTime":"2025-02-28T00:00:00+02:00","<createdTime":"2025-03-01T00:00:00+02:00"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.list
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'crm.item.list',
            {
                entityTypeId: 2,
                select: ['id', 'title', 'createdTime'],
                filter: {
                    '0': {
                        logic: 'OR',
                        '0': {
                            '>=createdTime': '2025-10-31T00:00:00+02:00',
                            '<createdTime': '2025-11-01T00:00:00+02:00',
                        },
                        '1': {
                            '>=createdTime': '2025-02-28T00:00:00+02:00',
                            '<createdTime': '2025-03-01T00:00:00+02:00',
                        },
                    },
                },
            },
        );

        const items = response.getData().items || [];
        items.forEach((item) => {
            console.info(`Deal #${item.id}: ${item.title} (${item.createdTime})`);
        });
    } catch (error) {
        console.error('crm.item.list error', error);
    }
    ```

- PHP

    ```php
    try {
        $entityTypeId = 2;
        $order = [];
        $filter = [
            "0" => [
                "logic" => "OR",
                "0" => [
                    ">=createdTime" => "2025-10-31T00:00:00+02:00",
                    "<createdTime" => "2025-11-01T00:00:00+02:00",
                ],
                "1" => [
                    ">=createdTime" => "2025-02-28T00:00:00+02:00",
                    "<createdTime" => "2025-03-01T00:00:00+02:00",
                ],
            ],
        ];
        $select = ['id', 'title', 'createdTime'];
        $startItem = 0;

        $itemsResult = $serviceBuilder
            ->getCRMScope()
            ->item()
            ->list($entityTypeId, $order, $filter, $select, $startItem);

        foreach ($itemsResult->getItems() as $item) {
            print("ID: " . $item->id . PHP_EOL);
            print("Title: " . $item->title . PHP_EOL);
            print("Created Time: " . $item->createdTime->format(DATE_ATOM) . PHP_EOL);
            print(PHP_EOL);
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.item.list',
            {
                entityTypeId: 2,
                select: ['id', 'title', 'createdTime'],
                filter: {
                    '0': {
                        logic: 'OR',
                        '0': {
                            '>=createdTime': '2025-10-31T00:00:00+02:00',
                            '<createdTime': '2025-11-01T00:00:00+02:00',
                        },
                        '1': {
                            '>=createdTime': '2025-02-28T00:00:00+02:00',
                            '<createdTime': '2025-03-01T00:00:00+02:00',
                        },
                    },
                },
            },
            function (result) {
                if (result.error()) {
                    console.error('crm.item.list error', result.error());
                    return;
                }

                const { items } = result.data();
                items.forEach((item) => {
                    console.log(`Deal #${item.id}: ${item.title} (${item.createdTime})`);
                });

                if (result.more()) {
                    result.next();
                }
            }
        );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => 2,
            'select' => ['id', 'title', 'createdTime'],
            'filter' => [
                "0" => [
                    "logic" => "OR",
                    "0" => [
                        ">=createdTime" => "2025-10-31T00:00:00+02:00",
                        "<createdTime" => "2025-11-01T00:00:00+02:00",
                    ],
                    "1" => [
                        ">=createdTime" => "2025-02-28T00:00:00+02:00",
                        "<createdTime" => "2025-03-01T00:00:00+02:00",
                    ],
                ],
            ],
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
                "id": 253,
                "assignedById": 6,
                "stageId": "NEW",
                "opportunity": 19000,
                "sourceId": "WEB",
                "title": "Лид #253",
                "name": "Админ",
                "lastName": null,
                "isManualOpportunity": "Y"
            },
            {
                "id": 255,
                "assignedById": 1,
                "stageId": "NEW",
                "opportunity": 19600,
                "sourceId": "WEB",
                "title": "Лид #255",
                "name": "Иван",
                "lastName": "Иванов",
                "isManualOpportunity": "Y"
            },
            {
                "id": 252,
                "assignedById": 1,
                "stageId": "NEW",
                "opportunity": 12000,
                "sourceId": "ADVERTISING",
                "title": "Лид #252",
                "name": "Иван",
                "lastName": "Котов",
                "isManualOpportunity": "Y"
            },
            {
                "id": 254,
                "assignedById": 6,
                "stageId": "IN_PROCESS",
                "opportunity": 19000,
                "sourceId": "ADVERTISING",
                "title": "Лид #254",
                "name": "Кот",
                "lastName": "Котов",
                "isManualOpportunity": "Y"
            }
        ]
    },
    "total": 4,
    "time": {
        "start": 1721724354.214286,
        "finish": 1721724354.805263,
        "duration": 0.5909769535064697,
        "processing": 0.24513697624206543,
        "date_start": "2024-07-23T10:45:54+02:00",
        "date_finish": "2024-07-23T10:45:54+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит единственный ключ `items` ||
|| **items**
[`item[]`](./object-fields.md) | Массив c информацией о найденных элементах.

Возвращаемые поля зависят от параметра `select`, [описание полей](./object-fields.md) ||
|| **total**
[`integer`][1] | Общее количество найденных элементов ||
|| **next**
[`integer`][1] | Содержит значение, которое нужно передать в следующий запрос в параметр `start`, чтобы получить следующую порцию данных.

Параметр `next` появляется в ответе, если количество элементов, соответствующих вашему запросу, превышает значение `50`. ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

{% note info " " %}

По умолчанию имена пользовательских полей передаются и возвращаются в camelCase, например `ufCrm2_1639669411830`.
При передаче параметра `useOriginalUfNames` со значением `Y` пользовательские поля будут возвращаться с оригинальными именами, например `UF_CRM_2_1639669411830`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "INVALID_ARG_VALUE",
    "error_description": "Invalid filter: field 'FIELD' is not allowed in filter"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                          | **Описание**                                             | **Значение**                                          ||
|| `403`      | `allowed_only_intranet_user`     | Действие разрешено только интранет-пользователям         | Пользователь не является интранет-пользователем       ||
|| `400`      | `NOT_FOUND`                      | Смарт-процесс не найден                                  | Возникает, при передаче невалидного `entityTypeId`    ||
|| `400`      | `INVALID_ARG_VALUE`              | Invalid filter: field '`field`' is not allowed in filter | Переданное в `filter` поле `field` недоступно для фильтрации ||
|| `400`      | `INVALID_ARG_VALUE`              | Invalid filter: field '`field`' has invalid value        | Переданное значение для поля `field` в `filter` некорректно ||
|| `400`      | `INVALID_ARG_VALUE`              | Invalid order: field '`field`' is not allowed in order   | Переданное в `order` поле `field` недоступно для сортировки ||
|| `400`      | `INVALID_ARG_VALUE`              | Invalid order: allowed sort directions are `ASC, DESC`. But got '`orderValue`' for field '`field`' | Переданное значение `orderValue` для поля `field` в параметр `order` некорректно ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](crm-item-add.md)
- [{#T}](crm-item-update.md)
- [{#T}](crm-item-get.md)
- [{#T}](crm-item-delete.md)
- [{#T}](crm-item-fields.md)
- [{#T}](./object-fields.md)
- [{#T}](../../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md)

[1]: ../../data-types.md