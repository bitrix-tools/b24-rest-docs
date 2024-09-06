# Получить список пользовательских полей контактов crm.contact.userfield.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: Администратор

Метод `crm.contact.userfield.list` возвращает список пользовательских полей контактов по фильтру. Выводится и информация об этих полях, но без названия, которое присвоил полю пользователь, только внутренний идентификатор. Если нужно пользовательское название поля, удобней будет воспользоваться методом [crm.contact.list](../crm-contact-list.md), который выводит как стандартные поля, так и пользовательские.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
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
- `field_n` — название поля по которому будет отфильтрована выборка пользовательских полей
- `value_n` — значение фильтра (доступно лишь точное соответствие)

Все условия по отдельным полям соединяются с помощью `AND`

[Список доступных полей для фильтрации](#filterable) ||
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

Список доступных полей для сортировки:
`ID` - Идентификатор пользовательского поля
`FIELD_NAME` - Код пользовательского поля
`USER_TYPE_ID` - Тип пользовательского поля
`XML_ID` - Внешний код
`SORT` - Индекс сортировки

По умолчанию:
```json
{
  "SORT": "ASC",
  "ID": "ASC"
}
```
||
|#

### Поля доступные для фильтрации {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`][1] | Идентификатор пользовательского поля. ||
|| **FIELD_NAME**
[`string`][1] | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`][1] | Тип пользовательского поля

Возможные значения:
- `string` - Строка
- `integer` - Целое число
- `double` - Число
- `boolean` - Да/Нет
- `datetime` - Дата/Время
- `date` - Дата
- `money` - Деньги
- `url` - Ссылка
- `address` - Адрес
- `enumeration` - Список
- `file` - Файл
- `employee` - Привязка к сотруднику
- `crm_status` - Привязка к справочнику CRM
- `iblock_section` - Привязка к разделам инф. блоков
- `iblock_element` - Привязка к элементам инф. блоков
- `crm` - Привязка к элементам CRM
- [Пользовательские типы полей](../../universal/user-defined-field-types/index.md)

||
|| **XML_ID**
[`string`][1] | Внешний код ||
|| **SORT**
[`integer`][1] | Индекс сортировки ||
|| **MULTIPLE**
[`boolean`][1] | Является ли пользовательское поле множественным (`Y` - Да / `N` - Нет) ||
|| **MANDATORY**
[`boolean`][1] | Является ли пользовательское поле обязательным (`Y` - Да/ `N` - Нет) ||
|| **SHOW_FILTER**
[`char`][1] | Показывать ли в фильтре списка

Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока

||
|| **SHOW_IN_LIST**
[`boolean`][1] | Показывать ли в списке (`Y` - Да/ `N` - Нет)

Данный параметр ни на что не влияет в рамках `crm`.
||
|| **EDIT_IN_LIST**
[`boolean`][1] | Разрешать ли редактирование пользователем (`Y` - Да/ `N` - Нет) ||
|| **IS_SEARCHABLE**
[`boolean`][1] | Участвуют ли значения поля в поиске (`Y` - Да/ `N` - Нет)

Данный параметр ни на что не влияет в рамках `crm`.
||
|| **LANG**
[`string`][1] | [Языковой идентификатор](../../data-types.md#last-ids). При фильтрации по данному параметру вам будет предоставлен набор полей со значениями на переданном языке:
* `EDIT_FORM_LABEL` - Подпись в форме редактирования
* `LIST_COLUMN_LABEL` - Заголовок в списке
* `LIST_FILTER_LABEL` - Подпись фильтра в списке
* `ERROR_MESSAGE` - Сообщение об ошибке
* `HELP_MESSAGE` - Помощь

||
|#


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

**Получить список пользовательских полей:**
1. Являются множественными
2. Являются обязательными
3. Подписи пользовательского поля на русском языке

**Задать следующий порядок сортировки у данной выборки:**
* Тип поля и индекс сортировки по возрастанию

{% list tabs %}

- cURL (Webhook)

    ```bash
    TODO
    ```

- cURL (OAuth)

    ```bash
    TODO
    ```

- JS

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

- PHP

    ```php
    TODO
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

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`userfield[]`](crm-contact-userfield-get.md#userfield) | Корневой элемент ответа, содержит список пользовательских полей.

Структура отдельно взятого пользовательского поля идентична [`userfield`](crm-contact-userfield-get.md#userfield) за исключением того, что поля: `EDIT_FORM_LABEL`, `LIST_COLUMN_LABEL`, `LIST_FILTER_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE` отдаются либо в виде `string` при передаче `filter.LANG`, либо не отдаются вовсе ||
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
|| `-`     | Parameter 'order' must be array. | Переданный `order` не является объектом ||
|| `-`     | Parameter 'filter' must be array.| Переданный `filter` не является объектом ||
|| `-`     | Access denied. | У пользователя нет административных прав ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}


## Продолжите изучение

TODO

[1]: ../../../data-types.md