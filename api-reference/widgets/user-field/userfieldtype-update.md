# Изменить настройки типа пользовательских полей userfieldtype.update

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

> Scope: [`в зависимости от места встройки`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Изменение настроек зарегистрированного приложением типа пользовательских полей. Метод возвращает _true_ или ошибку с описанием причины.

## Параметры

#|
|| **Параметр** | **Тип** | **Описание** | **Ограничения** ||
|| **USER_TYPE_ID**^*^
[`Строка`](../../data-types.md) | Строковой код типа.  | a-z0-9 ||
|| **HANDLER**^*^
[`URL`](../../data-types.md) | Адрес обработчика пользовательского типа.  | Должен быть в том же домене, что и основной адрес приложения. ||
|| **TITLE**^*^
[`Строка`](../../data-types.md) | Текстовое название типа. Будет выводиться в административном интерфейсе настройки пользовательских полей.  | ||
|| **DESCRIPTION**
[`Строка`](../../data-types.md) | Текстовое описание типа. Будет выводиться в административном интерфейсе настройки пользовательских полей. | ||
|#

\* - Обязательный параметр.

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

Пример вызова

```js
BX24.callMethod(
    'userfieldtype.update',
    {
        USER_TYPE_ID: 'test',
        TITLE: 'Updated test type',
        DESCRIPTION: 'Test userfield type for documentation with updated description'
    }
);
```

Пример запроса

```http
POST https://sometestportal.bitrix24.com/rest/userfieldtype.update HTTP/1.1
USER_TYPE_ID=test&TITLE=Updated+test+type&DESCRIPTION=Test+userfield+type+for+documentation+with+updated+description&auth=63t6r4z9cugaciaxocrh2r47zlodp12y
HTTP/1.1 200 OK
{
    "result": true
}
```


{% include [Сноска о примерах](../../../_includes/examples.md) %}