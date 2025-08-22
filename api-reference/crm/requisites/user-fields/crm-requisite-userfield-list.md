# Получить список пользовательских полей реквизита по фильтру crm.requisite.userfield.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список пользовательских полей реквизита по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки выбранных пользовательских полей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field`:
- ID
- ENTITY_ID
- FIELD_NAME
- USER_TYPE_ID
- XML_ID
- SORT

Возможные значения для `order`:
- asc — в порядке возрастания
- desc — в порядке убывания
||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных реквизитов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. В фильтре этого метода поддерживается только обычное сравнение значений.

Возможные значения для `field`:
- ID
- ENTITY_ID
- FIELD_NAME
- USER_TYPE_ID
- XML_ID
- SORT
- MULTIPLE
- MANDATORY
- SHOW_FILTER
- SHOW_IN_LIST
- EDIT_IN_LIST
- IS_SEARCHABLE
- LANG

Дополнительные префиксы в ключах, уточняющие поведение фильтра, не предусмотрены. Всегда используется операция `равно`.

Возможные значения для `value` соответствуют [описанию полей](#fields-description) 
||
|#

### Описание полей пользовательского поля реквизита {#fields-description}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`int`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор сущности, к которой относится пользовательское поле. Для реквизитов это всегда `CRM_REQUISITE` ||
|| **FIELD_NAME^*^**
[`string`](../../../data-types.md) | Символьный код. Для реквизитов всегда начинается с префикса `UF_CRM_` ||
|| **USER_TYPE_ID^*^**
[`string`](../../../data-types.md) | Тип данных ([`string`](../../universal/user-defined-fields/crm-userfield-types.md), [`boolean`](../../universal/user-defined-fields/crm-userfield-types.md), [`double`](../../universal/user-defined-fields/crm-userfield-types.md) или [`datetime`](../../universal/user-defined-fields/crm-userfield-types.md)) ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком ||
|| **SORT**
[`int`](../../../data-types.md) | Сортировка ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Признак множественности. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **MANDATORY**
[`char`](../../../data-types.md) | Признак обязательности. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока 
||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md) | Подпись в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md) | Заголовок в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md) | Подпись фильтра в списке ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md) | Помощь ||
|| **LIST**
[`uf_enum_element`](../../../data-types.md) | Элементы списка. Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-enumeration-fields.md) ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные настройки (зависят от типа). Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-settings-fields.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"MANDATORY":"N","LANG":"ru"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"MANDATORY":"N","LANG":"ru"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.userfield.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.requisite.userfield.list',
        {
          order: { "SORT": "ASC" },
          filter: { "MANDATORY": "N", "LANG": "ru" }
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
      const generator = $b24.fetchListMethod('crm.requisite.userfield.list', { order: { "SORT": "ASC" }, filter: { "MANDATORY": "N", "LANG": "ru" } }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.requisite.userfield.list', { order: { "SORT": "ASC" }, filter: { "MANDATORY": "N", "LANG": "ru" } }, 0)
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
                'crm.requisite.userfield.list',
                [
                    'order' => ['SORT' => 'ASC'],
                    'filter' => ['MANDATORY' => 'N', 'LANG' => 'ru']
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
        echo 'Error listing requisite user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.userfield.list",
        {
            order: { "SORT": "ASC" },
            filter: { "MANDATORY": "N", "LANG": "ru" }
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
        'crm.requisite.userfield.list',
        [
            'order' => ['SORT' => 'ASC'],
            'filter' => ['MANDATORY' => 'N', 'LANG' => 'ru']
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
        "ID": "232",
        "ENTITY_ID": "CRM_REQUISITE",
        "FIELD_NAME": "UF_CRM_NEWTECH_V1_BOOLEAN",
        "USER_TYPE_ID": "boolean",
        "XML_ID": null,
        "SORT": "100",
        "MULTIPLE": "N",
        "MANDATORY": "N",
        "SHOW_FILTER": "E",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "DEFAULT_VALUE": 0,
            "DISPLAY": "CHECKBOX",
            "LABEL": [
            "",
            ""
            ],
            "LABEL_CHECKBOX": "UF - Да/Нет"
        },
        "EDIT_FORM_LABEL": "UF - Да/Нет",
        "LIST_COLUMN_LABEL": "UF - Да/Нет",
        "LIST_FILTER_LABEL": "UF - Да/Нет",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "233",
        "ENTITY_ID": "CRM_REQUISITE",
        "FIELD_NAME": "UF_CRM_NEWTECH_V1_DATETIME",
        "USER_TYPE_ID": "datetime",
        "XML_ID": null,
        "SORT": "100",
        "MULTIPLE": "N",
        "MANDATORY": "N",
        "SHOW_FILTER": "E",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "DEFAULT_VALUE": {
            "TYPE": "NONE",
            "VALUE": ""
            },
            "USE_SECOND": "Y",
            "USE_TIMEZONE": "N"
        },
        "EDIT_FORM_LABEL": "UF - Дата",
        "LIST_COLUMN_LABEL": "UF - Дата",
        "LIST_FILTER_LABEL": "UF - Дата",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "234",
        "ENTITY_ID": "CRM_REQUISITE",
        "FIELD_NAME": "UF_CRM_NEWTECH_V1_DOUBLE",
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
        "EDIT_FORM_LABEL": "ПП - Число",
        "LIST_COLUMN_LABEL": "ПП - Число",
        "LIST_FILTER_LABEL": "ПП - Число",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "235",
        "ENTITY_ID": "CRM_REQUISITE",
        "FIELD_NAME": "UF_CRM_NEWTECH_V1_STRING",
        "USER_TYPE_ID": "string",
        "XML_ID": null,
        "SORT": "100",
        "MULTIPLE": "N",
        "MANDATORY": "N",
        "SHOW_FILTER": "N",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "SIZE": 20,
            "ROWS": 1,
            "REGEXP": "",
            "MIN_LENGTH": 0,
            "MAX_LENGTH": 0,
            "DEFAULT_VALUE": ""
        },
        "EDIT_FORM_LABEL": "ПП - Строка",
        "LIST_COLUMN_LABEL": "ПП - Строка",
        "LIST_FILTER_LABEL": "ПП - Строка",
        "ERROR_MESSAGE": "UF_CRM_NEWTECH_V1_STRING",
        "HELP_MESSAGE": "UF_CRM_NEWTECH_V1_STRING"
        }
    ],
    "total": 4,
    "time": {
        "start": 1717754823.56747,
        "finish": 1717754823.938955,
        "duration": 0.37148499488830566,
        "processing": 0.007915973663330078,
        "date_start": "2024-06-07T12:07:03+02:00",
        "date_finish": "2024-06-07T12:07:03+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md)| Массив объектов с информацией из выбранных пользовательских полей. Каждый элемент содержит выбранные [поля, описывающие пользовательское поле реквизита](#fields-description) ||
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
|| `Access denied` | Недостаточно прав доступа для получения списка пользовательских полей реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-userfield-add.md)
- [{#T}](./crm-requisite-userfield-update.md)
- [{#T}](./crm-requisite-userfield-get.md)
- [{#T}](./crm-requisite-userfield-delete.md)

