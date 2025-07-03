# Как настроить округление для пользовательского поля типа «Число»

У пользовательских полей есть стандартные настройки: название, обязательность заполнения, множественное значение.

Дополнительно есть специализированные настройки в зависимости от типа поля:
- значения для списка
- точность округления для чисел
- валюта для денежных полей

Чтобы получить специализированные настройки для типа «Число» — `double`, используем метод [crm.userfield.settings.fields](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-settings-fields.md):

{% list tabs %}

- JS
  
    ```JavaScript
    BX24.callMethod(
        "crm.userfield.settings.fields",
        {
            type: "double" // тип пользовательского поля
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.userfield.settings.fields',
        [
            'type' => 'double' // Тип пользовательского поля
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

В результате получим две настройки: значение по умолчанию и точность.

```JSON
{
    "result": {
        "DEFAULT_VALUE": {
            "type": "double",
            "title": "Значение по умолчанию"
        },
        "PRECISION": {
            "type": "int",
            "title": "Точность"
        }
    }
}
```

## Создаем числовое поле с настройкой для округления

Создадим поле с типом число с настройкой точности три знака после запятой. Если в поле ввести значение с четырьмя или более знаками после запятой, оно автоматически округлится до трех знаков.

Чтобы создать пользовательское поле, используем метод [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-add.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод создаст поле, обязательный параметр. В примере создаем поле для сделок, модуль — `crm`
- `field[entityId]` — идентификатор объекта по формуле `CRM_ + {ID}`, обязательный параметр. Перечень идентификаторов для объектов есть в статье — [Идентификаторы entityId](../../../api-reference/crm/universal/userfieldconfig/entity-id.md). В примере укажем `CRM_DEAL`

- `field[fieldName]` — код поля по формуле `UF_ + {идентификатор объекта} + _ + {произвольная строка в UPPERCASE}` . Ограничение длины кода — 50 символов, обязательный параметр. В примере укажем `UF_CRM_DEAL_NEW_DOUBLE_FIELD`

- `field[userTypeId]` — идентификатор [типа поля](../../../api-reference/crm/universal/user-defined-fields/crm-userfield-types.md), обязательный параметр. В примере укажем `double` для создания поля типа число

- `field[editFormLabel]` — массив названий для отображения поля в Битрикс24 на разных языках. Необязательный параметр, при отсутствии названия в Битрикс24 будет отображаться код поля

- `field[settings]` — массив дополнительных настроек поля в зависимости от его типа. Необязательный параметр, при отсутствии будут использованы настройки по умолчанию. В примере укажем настройку `PRECISION` — точность. В нее передадим целое число равное количеству знаков после запятой.

{% list tabs %}

- JS
  
    ```JavaScript
    BX24.callMethod(
        'userfieldconfig.add',
        {
            moduleId: 'crm', // Идентификатор модуля
            field: {
                entityId: 'CRM_DEAL', // Идентификатор объекта
                fieldName: 'UF_CRM_DEAL_NEW_DOUBLE_FIELD', // Код поля
                userTypeId: 'double', // Идентификатор типа поля
                editFormLabel: { 
                    'ru': 'Число с округлением', // Название поля на русском
                    'en': 'PRECISION double' // Название поля на английском
                },
                settings: { // Дополнительные настройки поля
                        PRECISION: 3, // Количество знаков после запятой
                    },
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
                'entityId' => 'CRM_DEAL', // Идентификатор объекта
                'fieldName' => 'UF_CRM_DEAL_NEW_DOUBLE_FIELD', // Код поля
                'userTypeId' => 'double', // Идентификатор типа поля
                'editFormLabel' => [
                    'ru' => 'Число с округлением', // Название поля на русском
                    'en' => 'PRECISION double' // Название поля на английском
                ],
                'settings' => [ // Дополнительные настройки поля
                    'PRECISION' => 3 // Количество знаков после запятой
                ]
            ]
        ]
    );
    ```

{% endlist %}

В результате получим данные созданного поля.

```JSON
{
    "result": {
        "field": {
            "id": "6961",
            "entityId": "CRM_DEAL",
            "fieldName": "UF_CRM_DEAL_NEW_DOUBLE_FIELD",
            "userTypeId": "double",
            "xmlId": null,
            "sort": "100",
            "multiple": "N",
            "mandatory": "N",
            "showFilter": "N",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "PRECISION": 3,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "languageId": {
                "en": "en",
                "ru": "ru"
            },
            "editFormLabel": {
                "en": "PRECISION double",
                "ru": "Число с округлением"
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
            }
        }
    },
}
```

## Изменяем настройку существующего числового поля

Чтобы изменить настройку округления существующего поля используем метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-update.md) с указанием ID поля. ID поля можно получить двумя способами: при создании поля методом [userfieldconfig.add](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-add.md) или через метод получения списка пользовательских полей объекта. В примере поле cделки, поэтому используем метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md).

### 1. Получаем ID поля

Чтобы получить ID поля используем метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) с параметрами:

- `filter[LANG]` — фильтр по языку используем для вывода названий полей на нужном языке. Без данного фильтра названия выведены не будут

- `filter[USER_TYPE_ID]` — фильтр по типу поля используем чтобы получить только поля с типом «Число» в результате

{% list tabs %}

- JS
  
    ```JavaScript
    BX24.callMethod(
        "crm.deal.userfield.list",
        {
            filter: {
                LANG: 'ru', // Фильтр по языку для вывода названия поля
                USER_TYPE_ID: 'double' // Фильтр по типу поля
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.userfield.list',
        [
            'filter' => [
                'LANG' => 'ru', // Фильтр по языку для вывода названия поля
                'USER_TYPE_ID' => 'double' // Фильтр по типу поля
            ]
        ]
    );
    ```

{% endlist %}

В результате получим все числовые поля сделок с названиями.

```JSON
{
    "result": [
        {
            "ID": "6963",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1740471712",
            "USER_TYPE_ID": "double",
            "XML_ID": null,
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Аванс",
            "LIST_COLUMN_LABEL": "Аванс",
            "LIST_FILTER_LABEL": "Аванс",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6807",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1723464314",
            "USER_TYPE_ID": "double",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Сумма к возврату",
            "LIST_COLUMN_LABEL": "Сумма к возврату",
            "LIST_FILTER_LABEL": "Сумма к возврату",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        }
    ],
    "total": 2,
}
```

### 2. Изменяем настройку для округления значения в поле

Для изменения настройки существующего поля используем метод [userfieldconfig.update](../../../api-reference/crm/universal/userfieldconfig/userfieldconfig/userfieldconfig-update.md) с параметрами:

- `moduleId` — идентификатор модуля в котором метод изменит поле, обязательный параметр. В примере изменяем поле сделок, модуль — `crm`

- `id` — идентификатор пользовательского поля, обязательный параметр. В примере передадим id поля, полученный методом [crm.deal.userfield.list](#1-получаем-id-поля)

- `field[settings]` — массив дополнительных настроек поля в зависимости от его типа. В примере укажем настройку `PRECISION` — точность. В нее передадим целое число равное количеству знаков после запятой.

{% list tabs %}

- JS
  
    ```JavaScript
    BX24.callMethod(
        'userfieldconfig.update',
        {
            moduleId: 'crm', // Идентификатор модуля
            id: 6807, // id пользовательского поля
            field: {
                settings: { // Дополнительные настройки поля
                        PRECISION: 3, // Количество знаков после запятой
                    },
            }
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.update',
        [
            'moduleId' => 'crm', // Идентификатор модуля
            'id' => 6807, // ID пользовательского поля
            'field' => [
                'settings' => [ // Дополнительные настройки поля
                    'PRECISION' => 3 // Количество знаков после запятой
                ]
            ]
        ]
    );
    ```

{% endlist %}

В результате получим данные измененного поля.

```JSON
{
    "result": {
        "field": {
            "id": "6807",
            "entityId": "CRM_DEAL",
            "fieldName": "UF_CRM_1723464314",
            "userTypeId": "double",
            "xmlId": null,
            "sort": "150",
            "multiple": "N",
            "mandatory": "N",
            "showFilter": "E",
            "showInList": "Y",
            "editInList": "Y",
            "isSearchable": "N",
            "settings": {
                "PRECISION": 3,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            },
            "languageId": {
                "ru": "ru"
            },
            "editFormLabel": {
                "ru": "Сумма к возврату"
            },
            "listColumnLabel": {
                "ru": "Сумма к возврату"
            },
            "listFilterLabel": {
                "ru": "Сумма к возврату"
            },
            "errorMessage": {
                "ru": null
            },
            "helpMessage": {
                "ru": null
            }
        }
    },
}
```

### Пример кода

{% list tabs %}

- JS
  
    ```JavaScript
    // Функция для поиска и обновления пользовательского поля
    function updateUserField() {
        // Запрашиваем у пользователя название поля
        var fieldName = prompt("Введите название поля:");

        // Первый метод: Получаем список всех пользовательских полей типа 'double'
        BX24.callMethod(
            "crm.deal.userfield.list",
            {
                filter: {
                    LANG: 'ru', // Фильтр по языку для вывода названия поля
                    USER_TYPE_ID: 'double' // Фильтр по типу поля
                }
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    // Перебираем полученные поля, чтобы найти нужное по названию
                    var fields = result.data();
                    var fieldId = null;

                    for (var i = 0; i < fields.length; i++) {
                        if (fields[i].EDIT_FORM_LABEL === fieldName) {
                            fieldId = fields[i].ID;
                            break;
                        }
                    }

                    if (fieldId) {
                        // Второй метод: Обновляем настройки найденного поля
                        BX24.callMethod(
                            'userfieldconfig.update',
                            {
                                moduleId: 'crm', // Идентификатор модуля
                                id: fieldId, // ID найденного пользовательского поля
                                field: {
                                    settings: { 
                                        PRECISION: 3 // Количество знаков после запятой
                                    }
                                }
                            },
                            function(updateResult) {
                                if (updateResult.error()) {
                                    console.error(updateResult.error());
                                } else {
                                    console.log("Настройки поля успешно обновлены.");
                                }
                            }
                        );
                    } else {
                        console.log("Поле с указанным названием не найдено.");
                    }
                }
            }
        );
    }

    // Запускаем функцию
    updateUserField();
    ```

- PHP
  
    ```php
    require_once('crest.php');

    // Функция для поиска и обновления пользовательского поля
    function updateUserField($fieldName) {
        // Первый метод: Получаем список всех пользовательских полей типа 'double'
        $result = CRest::call(
            'crm.deal.userfield.list',
            [
                'filter' => [
                    'LANG' => 'ru', // Фильтр по языку для вывода названия поля
                    'USER_TYPE_ID' => 'double' // Фильтр по типу поля
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка: ' . $result['error_description'];
        } else {
            // Перебираем полученные поля, чтобы найти нужное по названию
            $fields = $result['result'];
            $fieldId = null;

            foreach ($fields as $field) {
                if ($field['EDIT_FORM_LABEL'] === $fieldName) {
                    $fieldId = $field['ID'];
                    break;
                }
            }

            if ($fieldId) {
                // Второй метод: Обновляем настройки найденного поля
                $updateResult = CRest::call(
                    'userfieldconfig.update',
                    [
                        'moduleId' => 'crm', // Идентификатор модуля
                        'id' => $fieldId, // ID найденного пользовательского поля
                        'field' => [
                            'settings' => [
                                'PRECISION' => 3 // Количество знаков после запятой
                            ]
                        ]
                    ]
                );

                if (isset($updateResult['error'])) {
                    echo 'Ошибка: ' . $updateResult['error_description'];
                } else {
                    echo 'Настройки поля успешно обновлены.';
                }
            } else {
                echo 'Поле с указанным названием не найдено.';
            }
        }
    }

    // Запрашиваем у пользователя название поля
    $fieldName = readline("Введите название поля: ");

    // Запускаем функцию
    updateUserField($fieldName);
    ```

{% endlist %}
