# Как создать пользовательское поле в смарт-процессе

> Scope: [`crm, userfieldconfig`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение смарт-процесса

Пользовательские поля расширяют функционал CRM под задачи вашего бизнеса:

- можно создать поля для хранения информации в разных форматах: строка, деньги, число, адрес, файл и другие

- можно настроить характеристики полей: названия для разных языков, флаг множественного поля, настройка округления для числовых полей и другие

Для создания пользовательского поля в смарт-процессе последовательно выполним два метода:

1. [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — получим ID смарт-процесса

2. [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-add.md) — создадим пользовательское поле в смарт-процессе

## 1. Получаем идентификатор смарт-процесса {#spa-id}

Для получения ID смарт-процесса используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром:

- `title` — укажем название смарт-процесса

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```JavaScript
    BX24.callMethod(
        'crm.type.list',
        {
            filter: { // массив полей для фильтрации
                "title": "Закупка оборудования" // название смарт-процесса
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.list',
        [
            'filter' => [
                'title' => 'Закупка оборудования' // название смарт-процесса
            ]
        ]
    );
    ```

{% endlist %}

В результате получим id -- это порядковый номер смарт-процесса в Битрикс24. В примере `id`: `7`.

```json
{
    "result": {
        "types": [
            {
                "id": 7,
                "title": "Закупка оборудования",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 177,
                "customSectionId": null,
                "isCategoriesEnabled": "Y",
                "isStagesEnabled": "Y",
                "isBeginCloseDatesEnabled": "Y",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "Y",
                "isMycompanyEnabled": "Y",
                "isDocumentsEnabled": "Y",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "Y",
                "isRecyclebinEnabled": "Y",
                "isAutomationEnabled": "Y",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2021-11-26T10:52:17+03:00",
                "updatedTime": "2024-11-12T15:32:39+03:00",
                "updatedBy": 1
            }
        ]
    }
}
```

## 2. Создаем пользовательское поле в смарт-процессе

Для создания пользовательского поля используем метод [userfieldconfig.add ](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-add.md)с параметрами:

- `moduleId` — идентификатор модуля в котором метод создаст поле, обязательный параметр. Модуль смарт-процессов — `crm`

- `field[entityId]` — идентификатор объекта по формуле `CRM_ + {ID}`, где ID это порядковый номер смарт-процесса в Битрикс24 из результата [crm.type.list](./how-to-add-user-field-to-spa.md#spa-id), обязательный параметр.  В примере укажем `CRM_7`

- `field[fieldName]`— код поля по формуле `UF_ + {идентификатор объекта} + _ + {произвольная строка в UPPERCASE}`. Ограничение длины кода — 50 символов, обязательный параметр. В примере укажем `UF_CRM_7_NEW_REST_LIST`

- `field[userTypeId]` — идентификатор [типа поля](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md), обязательный параметр. В примере укажем `enumeration` для создания поля типа список, варианты значений списочного поля передадим в отдельном массиве `enum`

- `field[multiple]` — флаг множественного поля, необязательный параметр. Изменить флаг множественности после создания поля нельзя

- `field[editFormLabel]` — массив названий для отображения поля в Битрикс24 на разных языках. Необязательный параметр, при отсутствии названия в Битрикс24 будет отображаться код поля

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'userfieldconfig.add',
        {
            moduleId: 'crm', // Идентификатор модуля
            field: {
                entityId: 'CRM_7', // Идентификатор объекта
                fieldName: 'UF_CRM_7_NEW_REST_LIST', // Код поля
                userTypeId: 'enumeration', // Идентификатор типа поля
                multiple: 'Y', // Флаг множественности
                editFormLabel: { 
                    'ru': 'Список характеристик', // Название поля на русском
                    'en': 'List of characteristics' // Название поля на английском
                },
                enum: [ // Значения списочного поля
                    {
                        value: 'Характеристика 1', // Значение варианта
                        def: 'N', // Флаг значения по умолчанию
                        sort: 100, // Индекс сортировки
                    },
                    {
                        value: 'Характеристика 2',
                        def: 'Y', // Этот вариант будет значением по умолчанию
                        sort: 200,
                    }
                ]
            }
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.add',
        [
            'moduleId' => 'crm', // Идентификатор модуля
            'field' => [
                'entityId' => 'CRM_7', // Идентификатор объекта
                'fieldName' => 'UF_CRM_7_NEW_REST_LIST', // Код поля
                'userTypeId' => 'enumeration', // Идентификатор типа поля
                'multiple' => 'Y', // Флаг множественности
                'editFormLabel' => [
                    'ru' => 'Список характеристик', // Название поля на русском
                    'en' => 'List of characteristics' // Название поля на английском
                ],
                'enum' => [ // Значения списочного поля
                    [
                        'value' => 'Характеристика 1', // Значение варианта
                        'def' => 'N', // Флаг значения по умолчанию
                        'sort' => 100, // Индекс сортировки
                    ],
                    [
                        'value' => 'Характеристика 2',
                        'def' => 'Y', // Этот вариант будет значением по умолчанию
                        'sort' => 200,
                    ]
                ]
            ]
        ]
    );
    ```

{% endlist %}

В результате получим данные созданного поля.

```json
{
    "result": {
        "field": {
            "id": "6953",
            "entityId": "CRM_7",
            "fieldName": "UF_CRM_7_NEW_REST_LIST",
            "userTypeId": "enumeration",
            "xmlId": null,
            "sort": "100",
            "multiple": "Y",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "DISPLAY": "LIST",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "List of characteristics",
                "ru": "Список характеристик"
            },
            "listColumnLabel": {
                "en": null,
                "ru": null
            },
            "listFilterLabel": {
                "en": null,
                "ru": null
            },
            "errorMessage": {
                "en": null,
                "ru": null
            },
            "helpMessage": {
                "en": null,
                "ru": null
            },
            "enum": [
                {
                    "id": "3363",
                    "userFieldId": "6953",
                    "value": "Характеристика 1",
                    "def": "N",
                    "sort": "100",
                    "xmlId": "56dff18efcfe25f3bae0117a6b372567"
                },
                {
                    "id": "3365",
                    "userFieldId": "6953",
                    "value": "Характеристика 2",
                    "def": "Y",
                    "sort": "200",
                    "xmlId": "42e3ebcf5506a65283bf3bf510d8f05a"
                }
            ]
        }
    },
}
```

## Пример кода

{% list tabs %}

- JS
  
    ```JavaScript
    // Функция для получения смарт-процесса и создания пользовательского поля
    function getCrmTypeAndAddUserField() {
    // Переменная для ввода названия смарт-процесса пользователем
    var processTitle = prompt("Введите название смарт-процесса для поиска:", "Название_вашего_процесса");
        // Вызываем метод crm.type.list для получения смарт-процесса
        BX24.callMethod(
            'crm.type.list',
            {
                filter: {
                    "title": processTitle // Используем введенное пользователем название
                }
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при получении смарт-процесса:', result.error());
                } else {
                    console.log('Смарт-процесс успешно получен:', result.data());
                    var spaId = result.data().types[0].id; // Используем id из результата
                    addUserField(spaId);
                }
            }
        );
    }

    // Функция для создания пользовательского поля
    function addUserField(spaId) {
        // Вызываем метод userfieldconfig.add для создания пользовательского поля
        BX24.callMethod(
            'userfieldconfig.add',
            {
                moduleId: 'crm',
                field: {
                    entityId: 'CRM_' + spaId, // Используем id из предыдущего результата
                    fieldName: 'UF_CRM_' + spaId + '_NEW_REST_LIST', // Используем id
                    userTypeId: 'enumeration',
                    multiple: 'Y',
                    editFormLabel: {
                        'ru': 'Список характеристик',
                        'en': 'List of characteristics'
                    },
                    enum: [
                        {
                            value: 'Характеристика 1',
                            def: 'N',
                            sort: 100
                        },
                        {
                            value: 'Характеристика 2',
                            def: 'Y',
                            sort: 200
                        }
                    ]
                }
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка создания пользовательского поля:', result.error());
                } else {
                    console.log('Пользовательское поле успешно создано:', result.data());
                }
            }
        );
    }

    // Вызов функции для получения данных смарт-процесса и создания пользовательского поля
    getCrmTypeAndAddUserField();
    ```

- PHP
  
    ```php
    require_once('crest.php');

    // Функция для получения смарт-процесса и создания пользовательского поля
    function getCrmTypeAndAddUserField($processTitle) {
        // Вызываем метод crm.type.list для получения смарт-процесса
        $result = CRest::call('crm.type.list', [
            'filter' => [
                'title' => $processTitle // Используем введенное пользователем название
            ]
        ]);

        if (isset($result['error'])) {
            echo 'Ошибка при получении смарт-процесса: ' . $result['error_description'];
        } else {
            echo 'Смарт-процесс успешно получен: ';
            print_r($result['result']);
            
            if (!empty($result['result']['types'])) {
                $spaId = $result['result']['types'][0]['id']; // Используем id из результата
                addUserField($spaId);
            } else {
                echo 'Смарт-процесс не найден.';
            }
        }
    }

    // Функция для создания пользовательского поля
    function addUserField($spaId) {
        // Вызываем метод userfieldconfig.add для создания пользовательского поля
        $result = CRest::call('userfieldconfig.add', [
            'moduleId' => 'crm',
            'field' => [
                'entityId' => 'CRM_' . $spaId, // Используем id из предыдущего результата
                'fieldName' => 'UF_CRM_' . $spaId . '_NEW_REST_LIST', // Используем id
                'userTypeId' => 'enumeration',
                'multiple' => 'Y',
                'editFormLabel' => [
                    'ru' => 'Список характеристик',
                    'en' => 'List of characteristics'
                ],
                'enum' => [
                    [
                        'value' => 'Характеристика 1',
                        'def' => 'N',
                        'sort' => 100
                    ],
                    [
                        'value' => 'Характеристика 2',
                        'def' => 'Y',
                        'sort' => 200
                    ]
                ]
            ]
        ]);

        if (isset($result['error'])) {
            echo 'Ошибка создания пользовательского поля: ' . $result['error_description'];
        } else {
            echo 'Пользовательское поле успешно создано: ';
            print_r($result['result']);
        }
    }

    // Вызов функции для получения данных смарт-процесса и создания пользовательского поля
    $processTitle = readline("Введите название смарт-процесса для поиска: ");
    getCrmTypeAndAddUserField($processTitle);
    ```

{% endlist %}