# Регистрация нового типа пользовательских полей

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}


{% note info "userfieldtype.add" %}

**Scope**: [`в зависимости от места встройки`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Регистрация нового типа пользовательских полей. Метод возвращает true или ошибку с описанием причины.

## Параметры

#|
|| **Параметр** | **Тип** | **Описание** | **Ограничения** ||
|| **USER_TYPE_ID**^*^
[`Строка`](../../data-types.md) | Строковой код типа. Обязательный параметр. | 
- a-z0-9
- Должен быть уникальным. ||
|| **HANDLER**^*^
[`URL`](../../data-types.md) | Адрес обработчика пользовательского типа. Обязательный параметр. | - в том же домене, что и основной адрес приложения<br>- уникальным ||
|| **TITLE**
[`Строка`](../../data-types.md) | Текстовое название типа. Будет выводиться в административном интерфейсе настройки пользовательских полей. | ||
|| **DESCRIPTION**
[`Строка`](../../data-types.md) | Текстовое описание типа. Будет выводиться в административном интерфейсе настройки пользовательских полей. | ||
|| **OPTIONS**
[`Многомерный массив`](../../data-types.md) | Дополнительные настройки. На данный момент доступен один ключ:<br>**height** - указывает высоту пользовательского поля по умолчанию в пикселях.[По умолчанию - 0](*умолчание). Применится любое положительное значение. | ||
|#

\* - обязательные параметры.

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

### Пример вызова

```js
BX24.callMethod(
    'userfieldtype.add',
    {
        USER_TYPE_ID: 'test',
        HANDLER: 'https://www.myapplication.com/handler/',
        TITLE: 'Test type',
        DESCRIPTION: 'Test userfield type for documentation'
    }
);
```

### Пример запроса

```http
POST https://sometestportal.bitrix24.com/rest/userfieldtype.add HTTP/1.1

USER_TYPE_ID=test&HANDLER=https%3A%2F%2Fwww.myapplication.com%2Fhandler%2F&TITLE=Test+type&DESCRIPTION=Test+userfield+type+for+documentation&auth=63t6r4z9cugaciaxocrh2r47zlodp12y

HTTP/1.1 200 OK

{
    "result": true
}
```

### Пример с использованием параметра OPTIONS:

```php
CRest::call(
    'userfieldtype.add',
    [
        'USER_TYPE_ID' => 'custom_type',
        'HANDLER' => 'https://example.com/field.php',
        'TITLE' => 'title',
        'OPTIONS' => [
            'height' => 60,
        ],
    ]
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

[*умолчание] При указании значения **0** - будет использована высота стандартная для отображения данной встройки.