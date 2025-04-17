# Получить список нумераторов crm.documentgenerator.numerator.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- не указана обязательность параметра
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm.documentgenerator`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.documentgenerator.numerator.list` возвращает список нумераторов.

#|
|| **Параметр** | **Описание** ||
|| **start** | `offset` при запросе, для постраничной навигации. ||
|#

## Ответ в случае успеха

```json
"numerators": [
    {
        "id": "202", // id шаблона
        "name": "Rest Template", // название
        "template": "{NUMBER}", // шаблон
        "settings": { // настройки генераторов
            "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                "start": 20,
                "step": 5,
                "periodicBy": '',
                "timezone": '',
                "isDirectNumeration": ''
            }
        }
    }
]
```