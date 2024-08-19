# Обновление календаря

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

{% note info "calendar.section.update" %}

**Scope**: [`calendar`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `calendar.section.update` обновляет календарь. Здесь и в дальнейшем section будет именоваться как "календарь".

#|
|| **Параметр** | **Описание** ||
|| **type**^*^ | Тип календаря: 
- user; 
- group. ||
|| **ownerId**^*^ | Идентификатор владельца календаря. ||
|| **id**^*^ | Идентификатор календаря. ||
|| **name** | Название календаря. ||
|| **description** | Описание календаря. ||
|| **color** | Цвет календаря. ||
|| **text_color** | Цвет текста в календаре. ||
|| **export** | Список параметров: 
- ALLOW - разрешить экспорт календаря; 
- SET - устанавливается период, за который производить экспорт. ||
|| **access** | Массив данных доступа к календарю. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

```js
BX24.callMethod("calendar.section.update",
    {
        id: 325,
        type: 'user',
        ownerId: '2',
        name: 'Changed Section Name',
        description: 'New description for section',
        color: '#9cbeAA',
        text_color: '#283099',
        export: [{ALLOW: false}],
        access: {
            'D114': 17,
            'G2': 13,
            'U2': 15
        }
    }
);
```

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

Возвращает id модифицированных календарей.