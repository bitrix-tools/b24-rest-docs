# Получить список пользовательских полей сделок crm.deal.userfield.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

Метод `crm.deal.userfield.list` возвращает список пользовательских полей сделок по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет отфильтрована выборка пользовательских полей
- `value_n` — значение фильтра

Все условия по отдельным полям соединяются с помощью `AND`. Смотрите ниже [список доступных полей для фильтрации](#filterable) ||
|| **order**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка выборки элементов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки:
- `ID` — идентификатор пользовательского поля
- `FIELD_NAME` — код пользовательского поля
- `USER_TYPE_ID` — тип пользовательского поля
- `XML_ID` — внешний код
- `SORT` — индекс сортировки

По умолчанию:
```
{
    "SORT": "ASC",
    "ID": "ASC"
}
```
||
|#

### Доступные для фильтрации поля {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип пользовательского поля. Возможные значения:
- `string` — строка
- `integer` — целое число
- `double` — число
- `boolean` — да/нет
- `datetime` — дата/время
- `date` — дата
- `money` — деньги
- `url` — ссылка
- `address` — адрес
- `enumeration` — список
- `file` — файл
- `employee` — привязка к сотруднику
- `crm_status` — привязка к справочнику CRM
- `iblock_section` — привязка к разделам информационных блоков
- `iblock_element` — привязка к элементам информационных блоков
- `crm` — привязка к элементам CRM
- [пользовательские типы полей](../../universal/user-defined-fields/userfield-type.md)
||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **MULTIPLE**
[`boolean`](../../../data-types.md) | Является ли пользовательское поле множественным.
Возможные значения:
- `Y` — да
- `N` — нет ||
|| **MANDATORY**
[`boolean`](../../../data-types.md) | Является ли пользовательское поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока ||
|| **SHOW_IN_LIST**
[`boolean`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **EDIT_IN_LIST**
[`boolean`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_SEARCHABLE**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **LANG**
[`string`](../../../data-types.md) | [Языковой идентификатор](../../data-types.md#lang-ids). При фильтрации по данному параметру будет предоставлен набор полей со значениями на переданном языке:
- `EDIT_FORM_LABEL` — подпись в форме редактирования
- `LIST_COLUMN_LABEL` — заголовок в списке
- `LIST_FILTER_LABEL` — подпись фильтра в списке
- `ERROR_MESSAGE` — сообщение об ошибке
- `HELP_MESSAGE` — помощь ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить список пользовательских полей, которые:
- являются множественными,
- являются обязательными,
- имеют подписи пользовательского поля на русском языке. Благодаря фильтру по параметру `LANG` дополнительно получим в ответе названия полей.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.userfield.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить
    // весь набор списочных данных и объём записей относительно невелик
    // (до примерно 1000 элементов). Метод загружает все данные сразу, что
    // может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
    const response = await $b24.callListMethod(
        'crm.deal.userfield.list',
        {
         filter: {
            MULTIPLE: "Y",
            MANDATORY: "Y",
            LANG: "ru",
         },
         order: {
            USER_TYPE_ID: "ASC",
            SORT: "ASC",
         },
        },
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных.
    // Метод реализует итеративную выборку с использованием генератора, что
    // позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
    const generator = $b24.fetchListMethod('crm.deal.userfield.list', {
        filter: {
         MULTIPLE: "Y",
         MANDATORY: "Y",
         LANG: "ru",
        },
        order: {
         USER_TYPE_ID: "ASC",
         SORT: "ASC",
        },
    }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного
    // получения данных через параметр start. Подходит для сценариев, где
    // требуется точное управление пакетами запросов. Однако при больших
    // объемах данных может быть менее эффективным по сравнению с
    // fetchListMethod.
    
    try {
    const response = await $b24.callMethod('crm.deal.userfield.list', {
        filter: {
         MULTIPLE: "Y",
         MANDATORY: "Y",
         LANG: "ru",
        },
        order: {
         USER_TYPE_ID: "ASC",
         SORT: "ASC",
        },
    }, 0);
    const result = response.getData().result || [];
    for (const entity of result) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.userfield.list',
                [
                    'filter' => [
                        'MULTIPLE' => 'Y',
                        'MANDATORY' => 'Y',
                        'LANG' => 'ru',
                    ],
                    'order' => [
                        'USER_TYPE_ID' => 'ASC',
                        'SORT' => 'ASC',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching deal user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.userfield.list',
        {
            filter: {
                MULTIPLE: "Y",
                MANDATORY: "Y",
                LANG: "ru",
            },
            order: {
                USER_TYPE_ID: "ASC",
                SORT: "ASC",
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.userfield.list',
        [
            'filter' => [
                'MULTIPLE' => "Y",
                'MANDATORY' => "N",
                'LANG' => "ru",
            ],
            'order' => [
                'USER_TYPE_ID' => "ASC",
                'SORT' => "ASC",
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
    "result": [
        {
            "ID": "5815",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1713790573",
            "USER_TYPE_ID": "crm_status",
            "XML_ID": null,
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "I",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "ENTITY_TYPE": "INDUSTRY"
            },
            "EDIT_FORM_LABEL": "Справочник",
            "LIST_COLUMN_LABEL": "Справочник",
            "LIST_FILTER_LABEL": "Справочник",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6799",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1724077760",
            "USER_TYPE_ID": "enumeration",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DISPLAY": "LIST",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            },
            "EDIT_FORM_LABEL": "Радио",
            "LIST_COLUMN_LABEL": "Радио",
            "LIST_FILTER_LABEL": "Радио",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "LIST": [
                {
                    "ID": "3157",
                    "SORT": "10",
                    "VALUE": "Детское радио",
                    "DEF": "N",
                    "XML_ID": "79b4c576f96e65eb40f390e45c0dc802"
                },
                {
                    "ID": "3159",
                    "SORT": "20",
                    "VALUE": "Радио Шансон",
                    "DEF": "N",
                    "XML_ID": "d3ffd89a825f218f5efd79dffd38fbbf"
                },
                {
                    "ID": "3161",
                    "SORT": "30",
                    "VALUE": "Love Радио",
                    "DEF": "N",
                    "XML_ID": "dff769fa19d7d7ce8d0677341d221161"
                },
                {
                    "ID": "3163",
                    "SORT": "40",
                    "VALUE": "Радио Монте-Карло",
                    "DEF": "N",
                    "XML_ID": "1f22e5c818ce336a42bd0ec94eb69b9e"
                },
                {
                    "ID": "3181",
                    "SORT": "130",
                    "VALUE": "DFM Юрьев-Польский",
                    "DEF": "N",
                    "XML_ID": "fc1c5e6b4a9fd20b4749240b8dbac41a"
                }
            ]
        },
        {
            "ID": "6791",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1722578010",
            "USER_TYPE_ID": "file",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "SIZE": 20,
                "LIST_WIDTH": 0,
                "LIST_HEIGHT": 0,
                "MAX_SHOW_SIZE": 0,
                "MAX_ALLOWED_SIZE": 0,
                "EXTENSIONS": [],
                "TARGET_BLANK": "Y"
            },
            "EDIT_FORM_LABEL": "КП (файлы)",
            "LIST_COLUMN_LABEL": "КП (файлы)",
            "LIST_FILTER_LABEL": "КП (файлы)",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "5567",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1709565075",
            "USER_TYPE_ID": "resourcebooking",
            "XML_ID": null,
            "SORT": "1",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "USE_USERS": "N",
                "USE_RESOURCES": "Y",
                "RESOURCES": {
                    "resource": {
                        "XML_ID": "resource",
                        "NAME": "resource",
                        "SECTIONS": [
                            {
                                "ID": "7",
                                "CAL_TYPE": "resource",
                                "NAME": "Зал музея"
                            },
                            {
                                "ID": "49",
                                "CAL_TYPE": "resource",
                                "NAME": "ресурс 1"
                            },
                            {
                                "ID": "51",
                                "CAL_TYPE": "resource",
                                "NAME": "ресурс 2"
                            },
                            {
                                "ID": "53",
                                "CAL_TYPE": "resource",
                                "NAME": "1"
                            },
                            {
                                "ID": "57",
                                "CAL_TYPE": "resource",
                                "NAME": "Ресурс"
                            },
                            {
                                "ID": "59",
                                "CAL_TYPE": "resource",
                                "NAME": "Ресурс 2"
                            }
                        ]
                    }
                },
                "SELECTED_RESOURCES": [
                    {
                        "type": "resource",
                        "id": "7",
                        "title": "Зал музея"
                    }
                ],
                "SELECTED_USERS": [],
                "FULL_DAY": "N",
                "ALLOW_OVERBOOKING": "Y",
                "USE_SERVICES": "N",
                "SERVICE_LIST": [
                    {
                        "name": "",
                        "duration": "60"
                    }
                ],
                "RESOURCE_LIMIT": -1,
                "TIMEZONE": "Europe/Kaliningrad",
                "USE_USER_TIMEZONE": "N"
            },
            "EDIT_FORM_LABEL": "БРОНИРОВАНИЕ ПЕРЕГОВОРОК",
            "LIST_COLUMN_LABEL": "БРОНИРОВАНИЕ ПЕРЕГОВОРОК",
            "LIST_FILTER_LABEL": "БРОНИРОВАНИЕ ПЕРЕГОВОРОК",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6997",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_HELLO_WORLD",
            "USER_TYPE_ID": "string",
            "XML_ID": null,
            "SORT": "2000",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "N",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "SIZE": 20,
                "ROWS": 10,
                "REGEXP": "",
                "MIN_LENGTH": 0,
                "MAX_LENGTH": 0,
                "DEFAULT_VALUE": "Привет, мир! Значение по умолчанию (изменено)"
            },
            "EDIT_FORM_LABEL": "Привет, мир! Редактировать (изменено)",
            "LIST_COLUMN_LABEL": "Привет, мир! Колонка (изменено)",
            "LIST_FILTER_LABEL": "Привет, мир! Фильтр (изменено)",
            "ERROR_MESSAGE": "Привет, мир! Ошибка (изменено)",
            "HELP_MESSAGE": "Привет, мир! Помощь (изменено)"
        }
    ],
    "total": 5,
    "time": {
        "start": 1753793143.219832,
        "finish": 1753793143.529472,
        "duration": 0.30964016914367676,
        "processing": 0.06361007690429688,
        "date_start": "2025-07-29T15:45:43+03:00",
        "date_finish": "2025-07-29T15:45:43+03:00",
        "operating_reset_at": 1753793743,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа, содержит список пользовательских полей.

Структура отдельно взятого пользовательского поля зависит от его типа. Поля `EDIT_FORM_LABEL`, `LIST_COLUMN_LABEL`, `LIST_FILTER_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE` отдаются либо в виде `string` при передаче `filter.LANG`, либо не отдаются вовсе ||
|| **total**
[`integer`](../../../data-types.md) | Количество найденных пользовательских полей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'filter' must be array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `Parameter 'order' must be array` | Переданный `order` не является объектом ||
|| `400`     | `Parameter 'filter' must be array` | Переданный `filter` не является объектом ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-userfield-add.md)
- [{#T}](./crm-deal-userfield-update.md)
- [{#T}](./crm-deal-userfield-get.md)
- [{#T}](./crm-deal-userfield-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-precision-to-user-field.md)
- [{#T}](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-set-paid-date-to-deal.md)
