# Создать элемент универсального списка lists.element.add

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Добавление» или «Изменение» для нужного списка

Метод `lists.element.add` создает элемент списка.

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
|| **ELEMENT_CODE***
[`string`](../../data-types.md) | Символьный код элемента ||
|| **FIELDS***
[`array`](../../data-types.md) | Массив полей.

[Подробное описание](#parametr-fields) ||
|| **IBLOCK_SECTION_ID**
[`integer`](../../data-types.md) | Идентификатор раздела, в который добавляется элемент.

Если параметр не передается, элемент создается в корне списка. Значение по умолчанию — `0`.

Идентификатор можно получить с помощью метода [lists.section.get](../sections/lists-section-get.md) ||
|| **LIST_ELEMENT_URL**
[`string`](../../data-types.md) | Шаблон адреса к элементам списка.

Поддерживает замены: `#list_id#`, `#section_id#`, `#element_id#`, `#group_id#` ||
|#

### Параметр FIELDS {#parametr-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название элемента ||
|| **PROPERTY_PropertyId** | Пользовательские свойства.

Любое свойство элемента можно настроить как множественное. Для множественных свойств передавайте массив, даже если значение только одно. 
  
Чтобы передать значение в поле типа Файл укажите:
- для типа Файл — [base64](../../files/how-to-upload-files.md) или массив с названием и base64
- для типа Файл (Диск) — идентификатор файла с Диска

||
|#

{% note info "" %}

Получить данные о полях списка можно с помощью метода [lists.field.get](../fields/lists-field-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":47,"ELEMENT_CODE":"test_element","LIST_ELEMENT_URL":"#list_id#/element/#section_id#/#element_id#/","FIELDS":{"NAME":"Тестовый элемент","PROPERTY_951":["1269","1271"],"PROPERTY_1003":"2024-12-31 23:59:59"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.element.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":47,"ELEMENT_CODE":"test_element","LIST_ELEMENT_URL":"#list_id#/element/#section_id#/#element_id#/","FIELDS":{"NAME":"Тестовый элемент","PROPERTY_951":["1269","1271"],"PROPERTY_1003":"2024-12-31 23:59:59"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.element.add
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'lists.element.add',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: 47,
                ELEMENT_CODE: 'test_element',
                LIST_ELEMENT_URL: '#list_id#/element/#section_id#/#element_id#/',
                FIELDS: {
                    NAME: 'Тестовый элемент',
                    PROPERTY_951: ["1269", "1271"],
                    PROPERTY_1003: "2024-12-31 23:59:59"
                }
            }
        );

        const result = response.getData().result;
        console.log('Created element with ID:', result);
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
                'lists.element.add',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 47,
                    'ELEMENT_CODE' => 'test_element',
                    'LIST_ELEMENT_URL' => '#list_id#/element/#section_id#/#element_id#/',
                    'FIELDS' => [
                        'NAME' => 'Тестовый элемент',
                        'PROPERTY_951' => ["1269", "1271"],
                        'PROPERTY_1003' => "2024-12-31 23:59:59"
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding element: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.element.add',
        {
            IBLOCK_TYPE_ID: 'lists',
            IBLOCK_ID: 47,
            ELEMENT_CODE: 'test_element',
            LIST_ELEMENT_URL: '#list_id#/element/#section_id#/#element_id#/',
            FIELDS: {
                NAME: 'Тестовый элемент',
                PROPERTY_951: ["1269", "1271"], // Пользовательское свойство типа Строка (множественное)
                PROPERTY_1003: "2024-12-31 23:59:59" // Пользовательское свойство типа Дата/Время
            }
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
        'lists.element.add',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 47,
            'ELEMENT_CODE' => 'test_element',
            'LIST_ELEMENT_URL' => '#list_id#/element/#section_id#/#element_id#/',
            'FIELDS' => [
                'NAME' => 'Тестовый элемент',
                'PROPERTY_951' => ["1269", "1271"],
                'PROPERTY_1003' => "2024-12-31 23:59:59"
            ]
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
    "result": 6999,
    "time": {
        "start": 1763654360,
        "finish": 1763654360.814629,
        "duration": 0.814629077911377,
        "processing": 0,
        "date_start": "2025-11-19T13:59:20+03:00",
        "date_finish": "2025-11-19T13:59:20+03:00",
        "operating_reset_at": 1763654960,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного элемента ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_ELEMENT_FIELD_VALUE",
    "error_description":"Writing file values by ID is not supported"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ERROR_ELEMENT_ALREADY_EXISTS` | Element already exists | Элемент с таким `CODE` уже существует ||
|| `ERROR_ADD_ELEMENT` | — | Ошибка при добавлении элемента ||
|| `ERROR_ELEMENT_FIELD_VALUE` | Writing file values by ID is not supported | Ошибка валидации значения поля ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для добавления элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-element-update.md)
- [{#T}](./lists-element-get.md)
- [{#T}](./lists-element-delete.md)
- [{#T}](./lists-element-get-file-url.md)