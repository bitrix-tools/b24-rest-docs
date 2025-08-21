# Получить список пользовательских полей контактов crm.contact.userfield.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.contact.userfield.list` возвращает список пользовательских полей контактов по фильтру. 

Выводится и информация об этих полях, но без названия, которое присвоил полю пользователь, только внутренний идентификатор. Если нужно пользовательское название поля, воспользуйтесь методом [crm.contact.list](../crm-contact-list.md), который выводит как стандартные поля, так и пользовательские.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`][1] | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет отфильтрована выборка пользовательских полей
- `value_n` — значение фильтра (доступно лишь точное соответствие)

Все условия по отдельным полям соединяются с помощью `AND`. Смотрите ниже [список доступных полей для фильтрации](#filterable) ||
|| **order**
[`object`][1] | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
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

```json
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
[`integer`][1] | Идентификатор пользовательского поля ||
|| **FIELD_NAME**
[`string`][1] | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`][1] | Тип пользовательского поля. Возможные значения:
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
[`string`][1] | Внешний код ||
|| **SORT**
[`integer`][1] | Индекс сортировки ||
|| **MULTIPLE**
[`boolean`][1] | Является ли пользовательское поле множественным (`Y` — да / `N` — нет) ||
|| **MANDATORY**
[`boolean`][1] | Является ли пользовательское поле обязательным (`Y` — да/ `N` — нет) ||
|| **SHOW_FILTER**
[`char`][1] | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока
||
|| **SHOW_IN_LIST**
[`boolean`][1] | Показывать ли в списке (`Y` — да/ `N` — нет).

Данный параметр ни на что не влияет в рамках `crm`
||
|| **EDIT_IN_LIST**
[`boolean`][1] | Разрешать ли редактирование пользователем (`Y` — да/ `N` — нет) ||
|| **IS_SEARCHABLE**
[`boolean`][1] | Участвуют ли значения поля в поиске (`Y` — да/ `N` — нет)

Данный параметр ни на что не влияет в рамках `crm`
||
|| **LANG**
[`string`][1] | [Языковой идентификатор](../../data-types.md#last-ids). При фильтрации по данному параметру будет предоставлен набор полей со значениями на переданном языке:
- `EDIT_FORM_LABEL` — подпись в форме редактирования
- `LIST_COLUMN_LABEL` — заголовок в списке
- `LIST_FILTER_LABEL` — подпись фильтра в списке
- `ERROR_MESSAGE` — сообщение об ошибке
- `HELP_MESSAGE` — помощь
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить список пользовательских полей, которые:
1. являются множественными
2. являются обязательными
3. имеют подписи пользовательского поля на русском языке

Задать следующий порядок сортировки у данной выборки: тип поля и индекс сортировки по возрастанию.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.userfield.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.contact.userfield.list',
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
        (progress) => { 
          result.error()
            ? console.error(result.error())
            : console.info(result.data())
          ;
        }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.contact.userfield.list', {
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
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.contact.userfield.list', {
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
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.userfield.list',
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
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.userfield.list',
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
        'crm.contact.userfield.list',
        [
            'filter' => [
                'MULTIPLE' => "Y",
                'MANDATORY' => "Y",
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
        "ID": "474",
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_1724412832",
        "USER_TYPE_ID": "address",
        "XML_ID": null,
        "SORT": "300",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "E",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "SHOW_MAP": "Y"
        },
        "EDIT_FORM_LABEL": "Пользовательское поле (Адрес)",
        "LIST_COLUMN_LABEL": "Пользовательское поле (Адрес)",
        "LIST_FILTER_LABEL": "Пользовательское поле (Адрес)",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "475",
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_1724412867",
        "USER_TYPE_ID": "crm",
        "XML_ID": null,
        "SORT": "1400",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "I",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "CONTACT": "Y",
            "COMPANY": "Y",
            "DYNAMIC_1224": "Y",
            "DYNAMIC_1226": "Y",
            "DYNAMIC_1268": "Y",
            "DYNAMIC_1278": "Y",
            "LEAD": null
        },
        "EDIT_FORM_LABEL": "Пользовательское поле (Привязка к элементам CRM))",
        "LIST_COLUMN_LABEL": "Пользовательское поле (Привязка к элементам CRM))",
        "LIST_FILTER_LABEL": "Пользовательское поле (Привязка к элементам CRM))",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "472",
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_1724412764",
        "USER_TYPE_ID": "date",
        "XML_ID": null,
        "SORT": "2000",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "E",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "DEFAULT_VALUE": {
            "VALUE": "2024-08-22",
            "TYPE": "FIXED"
            }
        },
        "EDIT_FORM_LABEL": "Пользовательское поле (Дата)",
        "LIST_COLUMN_LABEL": "Пользовательское поле (Дата)",
        "LIST_FILTER_LABEL": "Пользовательское поле (Дата)",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "471",
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_1724412713",
        "USER_TYPE_ID": "double",
        "XML_ID": null,
        "SORT": "1500",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "E",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "PRECISION": 2,
            "SIZE": 20,
            "MIN_VALUE": 0,
            "MAX_VALUE": 0,
            "DEFAULT_VALUE": 150
        },
        "EDIT_FORM_LABEL": "Пользовательское поле (число)",
        "LIST_COLUMN_LABEL": "Пользовательское поле (число)",
        "LIST_FILTER_LABEL": "Пользовательское поле (число)",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "473",
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_1724412805",
        "USER_TYPE_ID": "employee",
        "XML_ID": null,
        "SORT": "800",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "I",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": [],
        "EDIT_FORM_LABEL": "Пользовательское поле (Сотрудник)",
        "LIST_COLUMN_LABEL": "Пользовательское поле (Сотрудник)",
        "LIST_FILTER_LABEL": "Пользовательское поле (Сотрудник)",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        },
        {
        "ID": "476",
        "ENTITY_ID": "CRM_CONTACT",
        "FIELD_NAME": "UF_CRM_1724412914",
        "USER_TYPE_ID": "file",
        "XML_ID": null,
        "SORT": "1200",
        "MULTIPLE": "Y",
        "MANDATORY": "Y",
        "SHOW_FILTER": "N",
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
        "EDIT_FORM_LABEL": "Пользовательское поле (Файл)",
        "LIST_COLUMN_LABEL": "Пользовательское поле (Файл)",
        "LIST_FILTER_LABEL": "Пользовательское поле (Файл)",
        "ERROR_MESSAGE": null,
        "HELP_MESSAGE": null
        }
    ],
    "total": 6,
    "time": {
        "start": 1724435524.016968,
        "finish": 1724435527.855702,
        "duration": 3.8387339115142822,
        "processing": 0.366832971572876,
        "date_start": "2024-08-23T19:52:04+02:00",
        "date_finish": "2024-08-23T19:52:07+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`userfield[]`](crm-contact-userfield-get.md#userfield) | Корневой элемент ответа, содержит список пользовательских полей.

Структура отдельно взятого пользовательского поля идентична [`userfield`](./crm-contact-userfield-get.md#userfield) за исключением того, что поля: `EDIT_FORM_LABEL`, `LIST_COLUMN_LABEL`, `LIST_FILTER_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE` отдаются либо в виде `string` при передаче `filter.LANG`, либо не отдаются вовсе ||
|| **total**
[`integer`][1] | Количество найденных пользовательских полей ||
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
|| `-`     | `Parameter 'order' must be array` | Переданный `order` не является объектом ||
|| `-`     | `Parameter 'filter' must be array` | Переданный `filter` не является объектом ||
|| `-`     | `Access denied` | У пользователя нет административных прав ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-userfield-add.md)
- [{#T}](./crm-contact-userfield-update.md)
- [{#T}](./crm-contact-userfield-get.md)
- [{#T}](./crm-contact-userfield-delete.md)

[1]: ../../../data-types.md