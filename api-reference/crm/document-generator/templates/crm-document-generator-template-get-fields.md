# Получить поля шаблона документа crm.documentgenerator.template.getfields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствуют возвращаемые значения
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm.documentgenerator`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.documentgenerator.template.getfields` возвращает список полей шаблона с их описанием.

#|
|| **Параметр** | **Описание** ||
|| **id** | ID шаблона. ||
|| **entityTypeId** | ID типа CRM-сущности. ||
|| **entityId** | ID используемой сущности. ||
|| **values** | Массив дополнительных значений. ||
|#

## Ответ в случае успеха

```json
"templateFields": {
    "DocumentNumber": {
        "title": "Номер",
        "value": "22",
        "group": [
            "Документ"
        ],
        "default": "22"
    },
    "MyCompanyUfLogo": {
        "title": "Логотип",
        "value": "",
        "type": "IMAGE",
        "group": [
            "Документ",
            "Моя компания"
        ],
        "default": ""
    },
    "MY_COMPANY": {
        "title": "Моя компания",
        "value": [
            {
                "value": "6",
                "title": "1С-Битрикс",
                "selected": "1"
            },
            {
                "value": "11",
                "title": "ИП Копытов",
                "selected": " "
            }
        ],
        "group": [
            "Документ",
            "Моя компания"
        ]
    }
}
```