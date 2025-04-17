# Получить список настроек пользовательских полей userfieldconfig.list

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

```http
userfieldconfig.list({moduleId: string, select: ?{}, order: ?{}, filter: ?{}, start: number = 0})
```

Метод вернет список настроек пользовательских полей.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **moduleId^*^** | Строковый идентификатор модуля. | ||
|| **select**| Массив с полями, которые надо показать. По умолчанию выводятся все, кроме вариантов для списка и языковых фраз. Чтобы получить фразы в списке, необходимо передать идентификатор языка по ключу **language**. | ||
|| **order** | Список для определения порядка отображения, где ключ - название поля, а значение - ASC или DESC. | ||
|| **filter** | Список для фильтрации. | ||
|#

{% include [Сноска о параметрах](../../../../../_includes/required.md) %}

## Примеры

**Пример запроса**

Найти все множественные настройки пользовательских полей из модуля *rpa*, отсортированные по убыванию *id*, со всеми полями и языковыми фразами для языка *ru*.

```json
{
    "moduleId": "rpa",
    "select": {
        "0": "*",
        "language": "ru"
    },
    "order": {
        "id": "DESC"
    },
    "filter": {
        "multiple": "Y"
    }
}
```

Формат ответа в части языковых фраз немного отличается, так как здесь фразы только для одного языка.

```json
{
    "fields": [
        {
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
                "ru": "ru"
            },
            "editFormLabel": {
                "ru": "Множественный файл"
            },
            "listColumnLabel": null,
            "listFilterLabel": null,
            "errorMessage": null,
            "helpMessage": null
        },
        {
            ...
        }
    ]
}
```

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}
