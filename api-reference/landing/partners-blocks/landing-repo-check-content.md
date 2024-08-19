# Проверка контента на опасные подстроки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.repo.checkContent" %}

**Scope**: [`landing`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.repo.checkContent` проверяет контент на опасные подстроки. К таким относятся `onclick=""`, `<iframe>` и ряд других. При обычном кейсе использования варианты срабатывания минимальны. Метод используется исключительно для контроля содержимого при [регистрации блока](./landing-repo-register.md).

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **content**
[`unknown`](../../data-types.md) | Содержимое для тестирования. ||
|| **splitter**
[`unknown`](../../data-types.md) | Необязательный параметр для разделения опасных подстрок. По-умолчанию равен `#SANITIZE#`. ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.repo.checkContent',
    {
        content: '<div style="color: red" onclick="alert(123)"><iframe src="//evil.com"></iframe></div>',
        splitter: '#AAA#'
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

# Ответ в случае успеха

> 200 OK
```json
content:"<div style="color: red" oncl#AAA#ick="alert(123)"><ifr#AAA#ame src="//evil.com"></iframe></div>"
is_bad:true
```

Собственно, метка `is_bad = true`, говорящая о том, что в содержимом есть опасные места, и сам текст, помеченный разделителями в опасных местах. Разработчику надлежит изменить такие места перед регистрацией.