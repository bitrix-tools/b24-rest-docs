# Возвращение данных о настройках пользовательского поля

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

{% note info "userfieldconfig.get" %}

**Scope**: [`userfieldconfig, scope модуля`](../../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

```http
userfieldconfig.get({id: number, moduleId: string})
```

Метод вернет данные о настройках пользовательского поля с идентификатором **id**.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id^*^** | Идентификатор настроек поля.  | ||
|| **moduleId^*^** | Строковый идентификатор модуля.  | ||
|#

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

## Примеры

Пример ответа:

```json
{
    "field": {
        "id": "165",
        "entityId": "RPA_1",
        "fieldName": "UF_RPA_1_1585069397",
        "userTypeId": "file",
        "xmlId": null,
        "sort": "100",
        "multiple": "Y",
        "mandatory": "N",
        "showFilter": "E",
        "showInList": "Y",
        "editInList": "Y",
        "isSearchable": "Y",
        "settings": {
            "SIZE": 20,
            "LIST_WIDTH": 0,
            "LIST_HEIGHT": 0,
            "MAX_SHOW_SIZE": 0,
            "MAX_ALLOWED_SIZE": 0,
            "EXTENSIONS": []
        },
        "languageId": {
            "en": "en",
            "ru": "ru"
        },
        "editFormLabel": {
            "en": "",
            "ru": "Множественный файл"
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
}
```

Где:
- **id** - идентификатор
- **entityId** - строковый идентификатор сущности
- **fieldName** - код поля
- **userTypeId** - строковый идентификатор типа поля
- **xmlId** - внешний идентификатор
- **sort** - индекс сортировки
- **multiple** - флаг множественности
- **mandatory** - флаг обязательности
- **showFilter** - флаг показа поля в фильтре
- **showInList** - флаг показа поля в списке
- **editInList** - флаг разрешения редактирования поля в списке
- **isSearchable** - флаг наличия значения поля в полнотекстовом индексе
- **settings** - список дополнительных настроек поля, зависит от его типа
- **languageId** - список идентификаторов языков, для которых есть фразы
- **editFormLabel** - список с языкозависимыми названиями поля, где ключ - идентификатор языка, а значение - фраза
- **listColumnLabel**, **listFilterLabel**, **errorMessage**, **helpMessage** - аналогичные списки фраз для различных целей (не используются)
- **enum** - массив с вариантами значений для свойств типа "список" (enumeration), включая идентификатор варианта, значение, флаг по умолчанию, индекс сортировки и внешний идентификатор варианта.

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}
