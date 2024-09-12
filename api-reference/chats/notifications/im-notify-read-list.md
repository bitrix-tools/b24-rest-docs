# Прочитать список уведомлений (кроме CONFIRM) im.notify.read.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.read.list` «прочитывает» список уведомлений, исключая уведомления типа CONFIRM.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **IDS^*^**
[`unknown`](../../data-types.md) | `[1,2,3]` | Массив идентификаторов уведомлений | 30 ||
|| **ACTION**
[`unknown`](../../data-types.md) | `'Y'` | Отметить, как прочитанные|непрочитанные (`Y`\|`N`) | 30 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```js
B24.callMethod(
    'im.notify.read.list',
    {
        IDS: [1,2,3],
        ACTION: 'Y'
    },
    res => {
        if (res.error())
        {
        console.error(result.error().ex);
        }
        else
        {
        console.log(res.data())
        }
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}        
```

## Ответ в случае ошибки

```json
{
    "error": "PARAMS_ERROR",
    "error_description": "No IDS param or it is not an array"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **PARAMS_ERROR** | Не передан параметр `IDS` или он не является массивом ||
|#