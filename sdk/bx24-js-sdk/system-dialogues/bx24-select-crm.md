# Вызвать диалог выбора сущности CRM BX24.selectCRM

```js
BX24.selectCRM({entityType: value, multiple: true, value:value}): void;
```

Функция `BX24.selectCRM` вызывает системный диалог выбора сущности CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityType**
[`array`](../../../api-reference/data-types.md) | Какие типы объектов выводить в диалоге. Варианты значений: 
- lead — Лиды
- contact — Контакты
- company — Компании
- deal — Сделки
- quote — Предложения ||
|| **multiple**
[`boolean`](../../../api-reference/data-types.md) | Можно ли выбирать несколько объектов. По умолчанию — `false`. ||
|| **value**
[`array`](../../../api-reference/data-types.md) | Какие объекты сразу добавить в выбранные в диалоге. Работает только в случае `multiple = true`. ||
|#

Что приходит обработчику:

```json
{
    "lead": [
        {
            "id": "L_1348",
            "type": "lead",
            "place": "lead",
            "title": "Мятный гость №2 - Открытая линия Битрикс",
            "desc": "Гость",
            "url": "/crm/lead/show/1348/"
        }
    ],
    "contact": [
        {
            "id": "C_2",
            "type": "contact",
            "place": "contact",
            "title": "Пупкин Василий",
            "desc": "",
            "url": "/crm/contact/show/2/",
            "image": "/upload/resize_cache/crm/8b5/25_25_2/MM35_PG13.jpg"
        }
    ],
    "company": [],
    "deal": [],
    "quote": []
}
```

## Пример кода

```js
BX24.selectCRM(
    {
        entityType: ['lead', 'contact', 'company', 'deal', 'quote'],
        multiple: true,
        value: {lead:[1348,2,35], contact:[2], company:[4,3], deal:[1,2], quote:[1]}
    }, 
    function(){
        console.log(arguments);
    }
)
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](./bx24-select-user.md)
- [{#T}](./bx24-select-users.md)
- [{#T}](./bx24-select-access.md)