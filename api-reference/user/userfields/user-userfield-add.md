# Добавить пользовательское поле user.userfield.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры на др.языках
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
 
{% endnote %}

{% endif %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет пользовательское поле.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **USER_TYPE_ID** | Тип пользовательского поля. Возможны значения:
- `string` - строка;
- `integer` - целое число;
- `double` - число;
- `date` - дата;
- `datetime` - дата со временем;
- `boolean` - Да / Нет;
- `file` - файл;
- `enumeration` - список;
- `url` - ссылка;
- `address` - адрес Google карты;
- `money` - деньги;
- `iblock_section` - Привязка к разделу инфоблока;
- `iblock_element` - Привязка к элементу инфоблока;
- `employee` - Привязка к пользователю;
- `crm` - Привязка к элементу CRM;
- `crm_status` - Привязка к справочнику CRM.

У некоторых типов есть свои дополнительные настройки. ||
|#
{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

```php
CRest::call(
    'user.userfield.add',
    [
        'fields' => [
            'FIELD_NAME' => 'MY_TEST_FIELD_STR3',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => 'MY_TEST_FIELD_STR_xml',
            'MULTIPLE' => 'Y',
            'SHOW_FILTER' => 'Y',
            'SORT' => 100,
            'LIST_FILTER_LABEL' => 'Title',
            'LIST_COLUMN_LABEL' => 'List Title',
            'EDIT_FORM_LABEL' => 'Title',
            'ERROR_MESSAGE' => 'Title',
            'HELP_MESSAGE' => 'Title',
            'SETTINGS' => [
                'DEFAULT_VALUE' => 'value'
            ]
        ],
    ]
);
```
{% include [Сноска о примерах](../../../_includes/examples.md) %}

Вместо

```
'LIST_FILTER_LABEL',
'LIST_COLUMN_LABEL',
'EDIT_FORM_LABEL',
'ERROR_MESSAGE',
'HELP_MESSAGE',
```

можно указать ключ `'LABEL'`, который заполнит все указанные выше ключи.