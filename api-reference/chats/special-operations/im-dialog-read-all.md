# Установить признак «прочитано» у всех чатов im.dialog.read.all

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.dialog.read.all` устанавливает метки «прочитано» для всех диалогов.

Параметры не передаются.

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'im.dialog.read.all',
        {},
        res => console.log(res.data())
    )
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

