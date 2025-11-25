# Получить параметры элемента или список элементов lists.element.get

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного списка

Метод `lists.element.get` возвращает элемент или список элементов. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **ELEMENT_ID**
[`integer`](../../data-types.md) | Идентификатор элемента.

Идентификатор можно получить с помощью метода [lists.element.get](./lists-element-get.md) ||
|| **ELEMENT_CODE**
[`string`](../../data-types.md) | Символьный код элемента.

Код можно получить с помощью метода [lists.element.get](./lists-element-get.md)

{% note info "" %}

Чтобы получить данные элемента, необходимо указать хотя бы один из параметров: `ELEMENT_ID` и `ELEMENT_CODE`

{% endnote %} ||
|| **SELECT**
[`array`](../../data-types.md) | Массив содержит список полей, которые необходимо выбрать. Если поля не указаны, возвращаются все доступные по умолчанию.

Доступные поля:
- `ID` — идентификатор элемента
- `CODE` — код элемента
- `NAME` — название элемента
- `IBLOCK_SECTION_ID` — идентификатор раздела, в который добавляется элемент
- `CREATED_BY` — идентификатор пользователя, создавшего элемент
- `CREATED_USER_NAME` — имя пользователя, создавшего элемент (устаревшее)
- `ACTIVE_TO` — дата окончания активности (устаревшее)
- `BP_PUBLISHED` — публикация в рамках бизнес-процесса (устаревшее)
- `DATE_CREATE` — дата создания элемента
- `PREVIEW_TEXT` — текст анонса (устаревшее)
- `DETAIL_TEXT` — детальный текст (устаревшее)
- `SORT` — сортировка
- `PREVIEW_TEXT_TYPE` — тип текста анонса (устаревшее)
- `DETAIL_TEXT_TYPE` — тип детального текста (устаревшее)
- `PROPERTY_PropertyId` — пользовательские свойства

  Идентификатор свойства можно получить с помощью метода [lists.field.get](../fields/lists-field-get.md).

||
|| **FILTER**
[`object`] | Объект для фильтрации полей элементов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. Фильтруемое поле может принимать значения: 

- `NAME` — название элемента
- `IBLOCK_SECTION_ID` — идентификатор раздела, в который добавляется элемент
- `CREATED_BY` — идентификатор пользователя, создавшего элемент
- `ACTIVE_TO` — дата окончания активности (устаревшее)
- `BP_PUBLISHED` — публикация в рамках бизнес-процесса (устаревшее)
- `DATE_CREATE` — дата создания элемента
- `PREVIEW_TEXT` — текст анонса (устаревшее)
- `DETAIL_TEXT` — детальный текст (устаревшее)
- `SORT` — сортировка
- `PREVIEW_TEXT_TYPE` — тип текста анонса (устаревшее)
- `DETAIL_TEXT_TYPE` — тип детального текста (устаревшее)
- `PROPERTY_PropertyId` — пользовательские свойства

  Идентификатор свойства можно получить с помощью метода [lists.field.get](../fields/lists-field-get.md).

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `=` — точное совпадение
- `!=`, `!` — не равно
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `=` — равно, точное совпадение, используется по умолчанию
- `!=` — не равно
- `!` — не равно

Если не передать идентификатор элемента и не задать условия для фильтрациии, будут возвращены все элементы списка
||
|| **ELEMENT_ORDER**
[`object`](../../data-types.md) | Объект для сортировки полей элементов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Не поддерживается сортировка множественных свойств, а также свойств:
- `S:Money` — тип деньги
- `PREVIEW_TEXT`
- `DETAIL_TEXT`
- `S:ECrm` — тип привязка к элементам CRM
- `S:map_yandex` — тип привязка к Яндекс.Карте
- `S:DiskFile` — тип Файл (Диск)
- `IBLOCK_SECTION_ID` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":47,"ELEMENT_ID":6999,"SELECT":["ID","CODE","NAME","IBLOCK_SECTION_ID","DATE_CREATE","PROPERTY_951","PROPERTY_1003"],"FILTER":{"NAME":"%Тестовый%","<=DATE_CREATE":"2025-12-31",">=DATE_CREATE":"2025-01-01"},"ELEMENT_ORDER":{"NAME":"asc"},"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":47,"ELEMENT_ID":6999,"SELECT":["ID","CODE","NAME","IBLOCK_SECTION_ID","DATE_CREATE","PROPERTY_951","PROPERTY_1003"],"FILTER":{"NAME":"%Тестовый%","<=DATE_CREATE":"2025-12-31",">=DATE_CREATE":"2025-01-01"},"ELEMENT_ORDER":{"NAME":"asc"},"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.get
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'lists.element.get',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 47,
                ELEMENT_ID: 6999,
                SELECT: [
                    'ID',
                    'CODE',
                    'NAME',
                    'IBLOCK_SECTION_ID',
                    'DATE_CREATE',
                    'PROPERTY_951',
                    'PROPERTY_1003'
                ],
                FILTER: {
                    NAME: '%Тестовый%',
                    '>=DATE_CREATE': '2025-01-01',
                    '<=DATE_CREATE': '2025-12-31'
                },
                ELEMENT_ORDER: {
                    NAME: 'asc'
                },
                start: 0
            }
        );

        const result = response.getData().result;
        console.log('Fetched elements:', result);
        processResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.element.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 47,
                    'ELEMENT_ID' => 6999,
                    'SELECT' => [
                        'ID',
                        'CODE',
                        'NAME',
                        'IBLOCK_SECTION_ID',
                        'DATE_CREATE',
                        'PROPERTY_951',
                        'PROPERTY_1003'
                    ],
                    'FILTER' => [
                        'NAME' => '%Тестовый%',
                        '>=DATE_CREATE' => '2025-01-01',
                        '<=DATE_CREATE' => '2025-12-31'
                    ],
                    'ELEMENT_ORDER' => [
                        'NAME' => 'asc'
                    ],
                    'start' => 0
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching list element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "lists.element.get",
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 47,
            ELEMENT_ID: 6999,
            SELECT: [
                'ID',
                'CODE',
                'NAME',
                `IBLOCK_SECTION_ID`,
                'DATE_CREATE',
                'PROPERTY_951',
                'PROPERTY_1003'
            ],
            FILTER: {
                NAME: '%Тестовый%',
                '>=DATE_CREATE': '2025-01-01',
                '<=DATE_CREATE': '2025-12-31'
            },
            ELEMENT_ORDER: {
                NAME: 'asc'
            },
            start: 0
        },
        function(res) {
            if (res.error()) {
                console.error(res.error());
            } else {
                console.log(res.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.element.get',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 47,
            'ELEMENT_ID' => 6999,
            'SELECT' => [
                'ID',
                'CODE',
                'NAME',
                'IBLOCK_SECTION_ID',
                'DATE_CREATE',
                'PROPERTY_951',
                'PROPERTY_1003'
            ],
            'FILTER' => [
                'NAME' => '%Тестовый%',
                '>=DATE_CREATE' => '2025-01-01',
                '<=DATE_CREATE' => '2025-12-31'
            ],
            'ELEMENT_ORDER' => [
                'NAME' => 'asc'
            ],
            'start' => 0
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
        "ID": "6999",
        "NAME": "Тестовый элемент",
        "IBLOCK_SECTION_ID": null,
        "CREATED_BY": "1269",
        "CODE": "test_element",
        "PROPERTY_951": {
            "3743": "1269",
            "3745": "1271"
        },
        "PROPERTY_1003": {
            "3747": "12/31/2024 11:59:59 pm"
        }
        }
    ],
    "total": 1,
    "time": {
        "start": 1763656328,
        "finish": 1763656328.442951,
        "duration": 0.442950963973999,
        "processing": 0,
        "date_start": "2025-11-19T14:32:08+03:00",
        "date_finish": "2025-11-19T14:32:08+03:00",
        "operating_reset_at": 1763656928,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Данные элемента или массив элементов. Результат зависит от параметра SELECT.

Пустой массив означает, что в списке нет элементов, либо элементы не соответствуют фильтру ||
|| **total**
[`integer`](../../data-types.md) | Общее количество элементов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-element-add.md)
- [{#T}](./lists-element-update.md)
- [{#T}](./lists-element-delete.md)
- [{#T}](./lists-element-get-file-url.md)