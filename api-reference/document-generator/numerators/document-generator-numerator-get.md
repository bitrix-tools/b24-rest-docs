# Получить нумератор по идентификатору documentgenerator.numerator.get

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

Метод `documentgenerator.numerator.get` возвращает информацию о нумераторе по его идентификатору.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | ID нумератора. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Ответ в случае успеха

> 200 OK

```json
"numerator": {
    "id": "202", // id шаблона
    "name": "Rest Template", // название
    "template": "{NUMBER}", // шаблон
    "settings": { // настройки генераторов
        "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
            "start": 20,
            "step": 5,
            "periodicBy": "",
            "timezone": "",
            "isDirectNumeration": ""
        }
    },
}
```