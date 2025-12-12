# Изменить поле универсального списка lists.field.update

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного списка

Метод `lists.field.update` обновляет поле списка.

{% note warning "" %}

Тип поля изменить нельзя. Передавайте тот тип, который был задан при создании поля

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
|| **FIELD_ID***
[`string`](../../data-types.md) | Идентификатор поля. Для пользовательского поля имеет вид `PROPERTY_PropertyId`. Для системного поля является его символьным кодом.

Идентификатор можно получить с помощью метода [lists.field.get](./lists-field-get.md) ||
|#

### Параметр FIELDS {#parametr-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название поля ||
|| **TYPE***
[`string`](../../data-types.md) | Тип поля. Изменить тип нельзя, передавайте тот, который был задан при создании поля.

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

Значения в полях Дата создания, Дата изменения, Кем создан и Кем изменен заполняются автоматически ||
|| **IS_REQUIRED**
[`string`](../../data-types.md) | Флаг обязательности поля. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **MULTIPLE**
[`string`](../../data-types.md) | Флаг множественности поля. Возможные значения:
- `Y` — да
- `N` — нет  

Системные поля и поле типа Привязка к Яндекс.Карте не могут быть множественными ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **DEFAULT_VALUE** | Значение по умолчанию. Если включена настройка `ADD_READ_ONLY_FIELD` в `SETTINGS`, параметр становится обязательным ||
|| **LIST**
[`array`](../../data-types.md) | Значения для поля типа Список. Массив в формате `{'ID': { 'VALUE': 'Value_1', 'SORT': 10, 'DEF': 'N' }}`, где `'ID'` — идентификатор, `VALUE` — отображаемый текст, `SORT` — порядок сортировки, `DEF` — признак значения по умолчанию.

Получить идентификатор можно методом [lists.field.get](./lists-field-get.md) ||
|| **LIST_TEXT_VALUES**
[`string`](../../data-types.md) | Альтернативный способ задания значений для поля типа Список. Строка, где значения разделены символом переноса `\n`

{% note info "" %}

При обновлении поля типа Список можно использовать либо `LIST`, либо `LIST_TEXT_VALUES`, либо оба параметра вместе. В этом случае значения из строки добавятся к тем, что уже есть в массиве

{% endnote %} ||
|| **LIST_DEF**
[`array`](../../data-types.md) | Значение по умолчанию для поля типа Список. Массив принимает идентификатор из `LIST` ||
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
  
Для включения настройки используйте `Y`, для выключения — `N` ||
|| **USER_TYPE_SETTINGS**
[`array`](../../data-types.md) | Массив настроек для пользовательских полей. Структура зависит от типа поля:

- HTML/текст — массив в формате `{'height': 200}`, где `height` — высота окна редактора	
- Привязка к элементам в виде списка — массив в формате `{'size': 1, 'width': 0, 'group': 'N', 'multiple': 'N'}`, где `size` — высота списка, `width` — ограничение по ширине (`0` - не ограничивать), `group` — группировка по разделам, `multiple` — отображение в виде списка множественного выбора
- Счетчик — массив в формате `{'write': 'N', 'VALUE': 1}`, где `write` — разрешение изменять значения, `VALUE` — текущее значение счетчика
- Привязка к элементам CRM — массив в формате `{'VISIBLE': 'N', 'LEAD': 'N', 'CONTACT': 'N', 'COMPANY': 'N', 'DEAL': 'N'}`, где `VISIBLE` — видимость в карточке CRM, `LEAD` — лид, `CONTACT` — контакт, `COMPANY` — компания, `DEAL` — сделка ||
|| **ROW_COUNT**
[`integer`](../../data-types.md) | Высота поля ||
|| **COL_COUNT**
[`integer`](../../data-types.md) | Ширина поля ||
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
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELD_ID":"PROPERTY_1151","FIELDS":{"NAME":"Статус задачи","SORT":"50","IS_REQUIRED":"N","MULTIPLE":"N","TYPE":"L","LIST":{"1669":{"VALUE":"Планирование","SORT":10},"1671":{"VALUE":"В активной работе","SORT":20},"1673":{"VALUE":"Тестирование","SORT":30},"1675":{"VALUE":"Завершен","SORT":40},"1677":{"VALUE":"Отложен","SORT":50}},"LIST_TEXT_VALUES":"Архив","LIST_DEF":["1671"],"SETTINGS":{"SHOW_ADD_FORM":"Y","SHOW_EDIT_FORM":"Y","ADD_READ_ONLY_FIELD":"N","EDIT_READ_ONLY_FIELD":"Y","SHOW_FIELD_PREVIEW":"N"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.field.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELD_ID":"PROPERTY_1151","FIELDS":{"NAME":"Статус задачи","SORT":"50","IS_REQUIRED":"N","MULTIPLE":"N","TYPE":"L","LIST":{"1669":{"VALUE":"Планирование","SORT":10},"1671":{"VALUE":"В активной работе","SORT":20},"1673":{"VALUE":"Тестирование","SORT":30},"1675":{"VALUE":"Завершен","SORT":40},"1677":{"VALUE":"Отложен","SORT":50}},"LIST_TEXT_VALUES":"Архив","LIST_DEF":["1671"],"SETTINGS":{"SHOW_ADD_FORM":"Y","SHOW_EDIT_FORM":"Y","ADD_READ_ONLY_FIELD":"N","EDIT_READ_ONLY_FIELD":"Y","SHOW_FIELD_PREVIEW":"N"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.field.update
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'lists.field.update',
            {
                IBLOCK_TYPE_ID: 'lists',
                IBLOCK_ID: '123',
                FIELD_ID: 'PROPERTY_1151',
                FIELDS: {
                    NAME: 'Статус задачи',
                    SORT: '50',
                    IS_REQUIRED: 'N',
                    MULTIPLE: 'N',
                    TYPE: 'L',
                    LIST: {
                        '1669': { VALUE: 'Планирование', SORT: 10 },
                        '1671': { VALUE: 'В активной работе', SORT: 20 },
                        '1673': { VALUE: 'Тестирование', SORT: 30 },
                        '1675': { VALUE: 'Завершен', SORT: 40 },
                        '1677': { VALUE: 'Отложен', SORT: 50 }
                    },
                    LIST_TEXT_VALUES: 'Архив',
                    LIST_DEF: ['1671'],
                    SETTINGS: {
                        SHOW_ADD_FORM: 'Y',
                        SHOW_EDIT_FORM: 'Y',
                        ADD_READ_ONLY_FIELD: 'N',
                        EDIT_READ_ONLY_FIELD: 'Y',
                        SHOW_FIELD_PREVIEW: 'N'
                    }
                }
            }
        );

        const result = response.getData().result;
        console.log('Updated field:', result);
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
                'lists.field.update',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => '123',
                    'FIELD_ID' => 'PROPERTY_1151',
                    'FIELDS' => [
                        'NAME' => 'Статус задачи',
                        'SORT' => '50',
                        'IS_REQUIRED' => 'N',
                        'MULTIPLE' => 'N',
                        'TYPE' => 'L',
                        'LIST' => [
                            '1669' => ['VALUE' => 'Планирование', 'SORT' => 10],
                            '1671' => ['VALUE' => 'В активной работе', 'SORT' => 20],
                            '1673' => ['VALUE' => 'Тестирование', 'SORT' => 30],
                            '1675' => ['VALUE' => 'Завершен', 'SORT' => 40],
                            '1677' => ['VALUE' => 'Отложен', 'SORT' => 50]
                        ],
                        'LIST_TEXT_VALUES' => 'Архив',
                        'LIST_DEF' => ['1671'],
                        'SETTINGS' => [
                            'SHOW_ADD_FORM' => 'Y',
                            'SHOW_EDIT_FORM' => 'Y',
                            'ADD_READ_ONLY_FIELD' => 'N',
                            'EDIT_READ_ONLY_FIELD' => 'Y',
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
        echo 'Error updating field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.field.update',
        {
            'IBLOCK_TYPE_ID': 'lists',
            'IBLOCK_ID': '123',
            'FIELD_ID': 'PROPERTY_1151',
            'FIELDS': {
                'NAME': 'Статус задачи',
                'SORT': '50',
                'IS_REQUIRED': 'N',
                'MULTIPLE': 'N',
                'TYPE': 'L', // Тип менять нельзя, используем тот, что есть
                'LIST': {
                    '1669': { 'VALUE': 'Планирование', 'SORT': 10 },
                    '1671': { 'VALUE': 'В активной работе', 'SORT': 20 },
                    '1673': { 'VALUE': 'Тестирование', 'SORT': 30 },
                    '1675': { 'VALUE': 'Завершен', 'SORT': 40 },
                    '1677': { 'VALUE': 'Отложен', 'SORT': 50 }
                },
                'LIST_TEXT_VALUES': 'Архив',
                'LIST_DEF': ['1671'], // Задаем новый вариант по умолчанию
                'SETTINGS': {
                    'SHOW_ADD_FORM': 'Y',
                    'SHOW_EDIT_FORM': 'Y',
                    'ADD_READ_ONLY_FIELD': 'N',
                    'EDIT_READ_ONLY_FIELD': 'Y',
                    'SHOW_FIELD_PREVIEW': 'N'
                }
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.field.update',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '123',
            'FIELD_ID' => 'PROPERTY_1151',
            'FIELDS' => [
                'NAME' => 'Статус задачи',
                'SORT' => '50',
                'IS_REQUIRED' => 'N',
                'MULTIPLE' => 'N',
                'TYPE' => 'L',
                'LIST' => [
                    '1669' => ['VALUE' => 'Планирование', 'SORT' => 10],
                    '1671' => ['VALUE' => 'В активной работе', 'SORT' => 20],
                    '1673' => ['VALUE' => 'Тестирование', 'SORT' => 30],
                    '1675' => ['VALUE' => 'Завершен', 'SORT' => 40],
                    '1677' => ['VALUE' => 'Отложен', 'SORT' => 50]
                ],
                'LIST_TEXT_VALUES' => 'Архив',
                'LIST_DEF' => ['1671'],
                'SETTINGS' => [
                    'SHOW_ADD_FORM' => 'Y',
                    'SHOW_EDIT_FORM' => 'Y',
                    'ADD_READ_ONLY_FIELD' => 'N',
                    'EDIT_READ_ONLY_FIELD' => 'Y',
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
    "result": true,
    "time": {
        "start": 1765371241,
        "finish": 1765371241.084551,
        "duration": 0.08455109596252441,
        "processing": 0,
        "date_start": "2025-12-09T16:54:01+03:00",
        "date_finish": "2025-12-09T16:54:01+03:00",
        "operating_reset_at": 1765371841,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если поле обновлено успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_UPDATE_FIELD",
    "error_description":"Error update the field"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ERROR_UPDATE_FIELD` | Error update the field | Ошибка при обновлении поля ||
|| `ERROR_UPDATE_FIELD` | The default value of the field '...' is required | Включена настройка `ADD_READ_ONLY_FIELD`, но не указано `DEFAULT_VALUE` ||
|| `ERROR_UPDATE_FIELD` | Incorrect lists specified for '...' property | Ошибка в одном из параметров внутри `FIELDS` ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для обновления поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-field-add.md)
- [{#T}](./lists-field-get.md)
- [{#T}](./lists-field-delete.md)
- [{#T}](./lists-field-type-get.md)