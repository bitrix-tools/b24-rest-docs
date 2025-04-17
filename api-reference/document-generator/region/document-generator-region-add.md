# Добавить страну documentgenerator.region.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.region.add` добавляет новый регион. Возвращает те же данные, что и при вызове [documentgenerator.region.get()](./document-generator-region-get.md) на новом регионе.

#|
|| **Параметр** | **Описание** ||
|| **fields** | Массив полей страны. ||
|#

## Параметры fields

#|
|| **Параметр** | **Описание** ||
|| **title**^*^ | Название страны. ||
|| **languageId** | Двухбуквенный идентификатор языка. ||
|| **formatDate**^*^ | Формат даты. ||
|| **formatDatetime**^*^ | Формат даты времени. ||
|| **formatName**^*^ | Формат имени. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Ответ в случае успеха

> 200 OK

```json
"region": {
    "id": "1",
    "title": "Турция",
    "languageId": "",
    "formatDate": "YYYY-MM-DD",
    "formatDatetime": "YYYY-MM-DD HH:MI:SS",
    "formatName": "#LAST_NAME# #NAME# #SECOND_NAME#",
    "phrases": {
        "TAX_INCLUDED": "НДС включен в цену",
        "TAX_NOT_INCLUDED": "НДС не включен в цену",
        "TAX_INCLUDED_NOT_VAT": "Налог (не НДС) включен в цену",
        "TAX_NOT_INCLUDED_NOT_VAT": "Налог (не НДС) не включен в цену",
        "UF_TYPE_BOOLEAN_YES": "Да",
        "UF_TYPE_BOOLEAN_NO": "Нет",
    }
}
```