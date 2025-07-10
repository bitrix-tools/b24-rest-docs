# Получить набор доступных типов пользовательских полей для модуля moduleId userfieldconfig.getTypes

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`userfieldconfig, scope модуля`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```js
userfieldconfig.getTypes({moduleId: string})
```

Метод вернет набор доступных типов пользовательских полей для модуля moduleId.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **moduleId^*^** | Идентификатор модуля.  | ||
|#

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

## Примеры

Пример ответа

```json
{
    "types": {
        "employee": {
            "userTypeId": "employee",
            "description": "Привязка к сотруднику"
        },
        "money": {
            "userTypeId": "money",
            "description": "Деньги"
        },
        "string": {
            "userTypeId": "string",
            "description": "Строка"
        },
        "integer": {
            "userTypeId": "integer",
            "description": "Целое число"
        }
    }
}
```

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}


{% if build == 'dev' %}

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
- `disk_file` - Файл (Диск)
- `disk_version` - Версия файла (Диск)
- `video` - Видео
- `hlblock` - Привязка к элементам highload-блоков
- `mail_message` - Письмо (email)
- `resourcebooking` - Бронирование ресурсов
- `string_formatted` - Шаблон
- `vote` - Опрос
- `url_preview` - Содержимое ссылки
- [Пользовательские типы полей](../../../universal/user-defined-fields/userfield-type.md)

{% endif %}