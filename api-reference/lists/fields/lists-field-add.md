# Создать поле универсального списка lists.field.add

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного списка

Метод `lists.field.add` создает поле списка.

{% note info "" %}

Список доступных типов полей для универсального списка можно узнать с помощью метода [lists.field.type.get](./lists-field-type-get.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп 
  
Идентификатор можно получить с помощью метода [lists.get.iblock.type.id](../lists/lists-get-iblock-type-id.md) ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **FIELDS***
[`array`](../../data-types.md) | Массив параметров.

[Подробное описание](#parametr-fields) ||
|#

### Параметр FIELDS {#parametr-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название поля ||
|| **TYPE***
[`string`](../../data-types.md) | Тип поля. После создания тип поля изменить будет нельзя.

Пользовательские поля:
- `S` — Строка
- `N` — Число
- `L` — Список
- `F` — Файл
- `G` — Привязка к разделам
- `E` — Привязка к элементам
- `S:Date` — Дата
- `S:DateTime` — Дата/Время
- `S:HTML` — HTML/текст
- `E:EList` — Привязка к элементам в виде списка
- `N:Sequence` — Счетчик
- `S:ECrm` — Привязка к элементам CRM 
- `S:Money` — Деньги
- `S:DiskFile` — Файл (Диск)
- `S:map_yandex` — Привязка к Яндекс.Карте
- `S:employee` — Привязка к сотруднику

Системные поля:
- `SORT` — Сортировка
- `ACTIVE_FROM` — Начало активности
- `ACTIVE_TO` — Окончание активности
- `PREVIEW_PICTURE` — Изображение для анонса
- `PREVIEW_TEXT` — Текст анонса
- `DETAIL_PICTURE` — Детальное изображение
- `DETAIL_TEXT` — Детальный текст
- `DATE_CREATE` — Дата создания
- `CREATED_BY` — Кем создан
- `TIMESTAMP_X` — Дата изменения
- `MODIFIED_BY` — Кем изменен
  
Значения в полях Дата создания, Дата изменения, Кем создан и Кем изменен заполняются автоматически

{% note info "" %}

Системные поля не добавляются в новый список по умолчанию. Чтобы они отображались в интерфейсе списка, их также необходимо явно создать

{% endnote %}
||
|| **IS_REQUIRED**
[`string`](../../data-types.md) | Флаг обязательности поля. Возможные значения:
- `Y` — да
- `N` — нет
  
По умолчанию — `N` ||
|| **MULTIPLE**
[`string`](../../data-types.md) | Флаг множественности поля. Возможные значения:
- `Y` — да
- `N` — нет  

По умолчанию — `N`.

Системные поля и поле типа Привязка к Яндекс.Карте не могут быть множественными ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **DEFAULT_VALUE** | Значение по умолчанию. Если включена настройка `ADD_READ_ONLY_FIELD` в `SETTINGS`, параметр становится обязательным ||
|| **LIST**
[`array`](../../data-types.md) | Значения для поля типа Список. Массив в формате `{'ID': { 'VALUE': 'Value_1', 'SORT': 10, 'DEF': 'N' }}`, где `'ID'` — временный идентификатор, `VALUE` — отображаемый текст, `SORT` — порядок сортировки, `DEF` — признак значения по умолчанию.

После создания поля система заменит временные идентификаторы на постоянные ||
|| **LIST_TEXT_VALUES**
[`string`](../../data-types.md) | Альтернативный способ задания значений для поля типа Список. Строка, где значения разделены символом переноса `\n`

{% note info "" %}

При создании поля типа Список можно использовать либо `LIST`, либо `LIST_TEXT_VALUES`, либо оба параметра вместе. В этом случае значения из строки добавятся к тем, что уже есть в массиве

{% endnote %} ||
|| **LIST_DEF**
[`array`](../../data-types.md) | Значение по умолчанию для поля типа Список. Массив принимает временный идентификатор из `LIST` ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код поля. Обязателен для пользовательских полей. Для системных полей не используется ||
|| **SETTINGS**
[`array`](../../data-types.md) | Настройки отображения и поведения.

Поддерживаются значения:
- `SHOW_ADD_FORM` — показывать в форме добавления
- `SHOW_EDIT_FORM` — показывать в форме редактирования
- `ADD_READ_ONLY_FIELD` — только для чтения (форма добавления)
- `EDIT_READ_ONLY_FIELD` — только для чтения (форма редактирования)
- `SHOW_FIELD_PREVIEW` — показать поле при формировании ссылки на элемент списка
  
Для включения настройки используйте `Y`, для выключения — `N`.

По умолчанию: `SHOW_ADD_FORM` — `Y`, `SHOW_EDIT_FORM` — `Y`, `ADD_READ_ONLY_FIELD` — `N`, `EDIT_READ_ONLY_FIELD` — `N`, `SHOW_FIELD_PREVIEW` — `N` ||
|| **USER_TYPE_SETTINGS**
[`array`](../../data-types.md) | Массив настроек для пользовательских полей. Структура зависит от типа поля:

- HTML/текст — массив в формате `{'height': 200}`, где `height` — высота окна редактора	
- Привязка к элементам в виде списка — массив в формате `{'size': 1, 'width': 0, 'group': 'N', 'multiple': 'N'}`, где `size` — высота списка, `width` — ограничение по ширине (`0` - не ограничивать), `group` — группировка по разделам, `multiple` — отображение в виде списка множественного выбора
- Счетчик — массив в формате `{'write': 'N', 'VALUE': 1}`, где `write` — разрешение изменять значения, `VALUE` — текущее значение счетчика
- Привязка к элементам CRM — массив в формате `{'VISIBLE': 'N', 'LEAD': 'N', 'CONTACT': 'N', 'COMPANY': 'N', 'DEAL': 'N'}`, где `VISIBLE` — видимость в карточке CRM, `LEAD` — лид, `CONTACT` — контакт, `COMPANY` — компания, `DEAL` — сделка 

Если не передавать — система установит значения по умолчанию, которые указаны в примерах массивов ||
|| **ROW_COUNT**
[`integer`](../../data-types.md) | Высота поля.

По умолчанию — `1` ||
|| **COL_COUNT**
[`integer`](../../data-types.md) | Ширина поля.

По умолчанию — `30` ||
|| **LINK_IBLOCK_ID**
[`integer`](../../data-types.md) | Идентификатор связанного списка. Обязателен для типов Привязка к разделам, Привязка к элементам и Привязка к элементам в виде списка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELDS":{"NAME":"Проект","IS_REQUIRED":"Y","MULTIPLE":"N","TYPE":"L","SORT":"10","CODE":"PROJECT","LIST":{"10":{"VALUE":"Планирование","SORT":10,"DEF":"Y"},"20":{"VALUE":"В разработке","SORT":20,"DEF":"N"}},"LIST_TEXT_VALUES":"Тестирование\nЗавершен\nОтложен","SETTINGS":{"SHOW_ADD_FORM":"Y","SHOW_EDIT_FORM":"Y","ADD_READ_ONLY_FIELD":"N","EDIT_READ_ONLY_FIELD":"N","SHOW_FIELD_PREVIEW":"N"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.field.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELDS":{"NAME":"Проект","IS_REQUIRED":"Y","MULTIPLE":"N","TYPE":"L","SORT":"10","CODE":"PROJECT","LIST":{"10":{"VALUE":"Планирование","SORT":10,"DEF":"Y"},"20":{"VALUE":"В разработке","SORT":20,"DEF":"N"}},"LIST_TEXT_VALUES":"Тестирование\nЗавершен\nОтложен","SETTINGS":{"SHOW_ADD_FORM":"Y","SHOW_EDIT_FORM":"Y","ADD_READ_ONLY_FIELD":"N","EDIT_READ_ONLY_FIELD":"N","SHOW_FIELD_PREVIEW":"N"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.field.add
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'lists.field.add',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: '123',
                FIELDS: {
                    NAME: 'Проект',
                    IS_REQUIRED: 'Y',
                    MULTIPLE: 'N',
                    TYPE: 'L',
                    SORT: '10',
                    CODE: 'PROJECT',
                    LIST: {
                        '10': { VALUE: 'Планирование', SORT: 10, DEF: 'Y' },
                        '20': { VALUE: 'В разработке', SORT: 20, DEF: 'N' }
                    },
                    LIST_TEXT_VALUES: 'Тестирование\nЗавершен\nОтложен',
                    SETTINGS: {
                        SHOW_ADD_FORM: 'Y',
                        SHOW_EDIT_FORM: 'Y',
                        ADD_READ_ONLY_FIELD: 'N',
                        EDIT_READ_ONLY_FIELD: 'N',
                        SHOW_FIELD_PREVIEW: 'N'
                    }
                }
            }
        );

        const result = response.getData().result;
        console.log('Created field with ID:', result);
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
                'lists.field.add',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => '123',
                    'FIELDS' => [
                        'NAME' => 'Проект',
                        'IS_REQUIRED' => 'Y',
                        'MULTIPLE' => 'N',
                        'TYPE' => 'L',
                        'SORT' => '10',
                        'CODE' => 'PROJECT',
                        'LIST' => [
                            '10' => ['VALUE' => 'Планирование', 'SORT' => 10, 'DEF' => 'Y'],
                            '20' => ['VALUE' => 'В разработке', 'SORT' => 20, 'DEF' => 'N']
                        ],
                        'LIST_TEXT_VALUES' => 'Тестирование\nЗавершен\nОтложен',
                        'SETTINGS' => [
                            'SHOW_ADD_FORM' => 'Y',
                            'SHOW_EDIT_FORM' => 'Y',
                            'ADD_READ_ONLY_FIELD' => 'N',
                            'EDIT_READ_ONLY_FIELD' => 'N',
                            'SHOW_FIELD_PREVIEW' => 'N'
                        ]
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
        echo 'Error adding field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.field.add',
        {
            'IBLOCK_TYPE_ID': 'lists',
            'IBLOCK_ID': '123',
            'FIELDS': {
                'NAME': 'Проект',
                'IS_REQUIRED': 'Y',
                'MULTIPLE': 'N',
                'TYPE': 'L',
                'SORT': '10',
                'CODE': 'PROJECT',
                // Задаем основные значения с настройками
                'LIST': {
                    '10': { 'VALUE': 'Планирование', 'SORT': 10, 'DEF': 'Y' },
                    '20': { 'VALUE': 'В разработке', 'SORT': 20, 'DEF': 'N' }
                },
                // Добавляем еще значения простой строкой
                'LIST_TEXT_VALUES': 'Тестирование\nЗавершен\nОтложен',
                'SETTINGS': {
                    'SHOW_ADD_FORM': 'Y',
                    'SHOW_EDIT_FORM': 'Y',
                    'ADD_READ_ONLY_FIELD': 'N',
                    'EDIT_READ_ONLY_FIELD': 'N',
                    'SHOW_FIELD_PREVIEW': 'N'
                }
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
                // Итоговый список будет содержать 5 вариантов:
                // 1. Планирование (по умолчанию), 2. В разработке,
                // 3. Тестирование, 4. Завершен, 5. Отложен
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.field.add',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '123',
            'FIELDS' => [
                'NAME' => 'Проект',
                'IS_REQUIRED' => 'Y',
                'MULTIPLE' => 'N',
                'TYPE' => 'L',
                'SORT' => '10',
                'CODE' => 'PROJECT',
                'LIST' => [
                    '10' => ['VALUE' => 'Планирование', 'SORT' => 10, 'DEF' => 'Y'],
                    '20' => ['VALUE' => 'В разработке', 'SORT' => 20, 'DEF' => 'N']
                ],
                'LIST_TEXT_VALUES' => 'Тестирование\nЗавершен\nОтложен',
                'SETTINGS' => [
                    'SHOW_ADD_FORM' => 'Y',
                    'SHOW_EDIT_FORM' => 'Y',
                    'ADD_READ_ONLY_FIELD' => 'N',
                    'EDIT_READ_ONLY_FIELD' => 'N',
                    'SHOW_FIELD_PREVIEW' => 'N'
                ]
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
    "result": "PROPERTY_1151",
    "time": {
        "start": 1765317940,
        "finish": 1765317940.172892,
        "duration": 0.17289209365844727,
        "processing": 0,
        "date_start": "2025-12-09T14:05:40+03:00",
        "date_finish": "2025-12-09T14:05:40+03:00",
        "operating_reset_at": 1765318540,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../data-types.md) | Идентификатор созданного поля с приставкой `PROPERTY_`.

Если создается системное поле, возвращается его символьный код ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_SAVE_FIELD",
    "error_description":"Please fill the code fields"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ERROR_SAVE_FIELD` | Error saving the field | Общая ошибка при вызове ||
|| `ERROR_SAVE_FIELD` | Property already exists | `CODE` уже используется в списке ||
|| `ERROR_SAVE_FIELD` | Please fill the code fields | Не указан `CODE` для пользовательского поля ||
|| `ERROR_SAVE_FIELD` | The default value of the field '...' is required | Включена настройка `ADD_READ_ONLY_FIELD`, но не указано `DEFAULT_VALUE` ||
|| `ERROR_SAVE_FIELD` | Incorrect lists specified for '...' property |  Ошибка в одном из параметров внутри `FIELDS` ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для добавления поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-field-update.md)
- [{#T}](./lists-field-get.md)
- [{#T}](./lists-field-delete.md)
- [{#T}](./lists-field-type-get.md)