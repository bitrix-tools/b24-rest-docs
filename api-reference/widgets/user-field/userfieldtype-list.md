# Cписок зарегистрированных типов пользовательских полей

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

{% note info "userfieldtype.list" %}

**Scope**: [`в зависимости от места встройки`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Получение списка зарегистрированных приложением типов пользовательских полей. Списочный метод. На выход отдается список типов полей с постраничной навигацией.

## Параметры

Входных параметров нет.

## Примеры

Пример вызова:

```js
BX24.callMethod(
    'userfieldtype.list',
    {},
    function(result)
    {
        console.log(result.data());
    }
);
```

Пример запроса

```http
POST https://sometestportal.bitrix24.com/rest/userfieldtype.list HTTP/1.1

auth=63t6r4z9cugaciaxocrh2r47zlodp12y

HTTP/1.1 200 OK

{
    "result": [
        {
            "DESCRIPTION": "Test userfield type for documentation",
            "HANDLER": "https://www.myapplication.com/handler/",
            "TITLE": "Test type",
            "USER_TYPE_ID": "test"
        }
    ],
    "total": 1
}
```


{% include [Сноска о примерах](../../../_includes/examples.md) %}