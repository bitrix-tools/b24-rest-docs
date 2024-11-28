# Получить диапазон сетевых адресов timeman.networkrange.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.networkrange.get` для получения диапазонов сетевых адресов, входящих в офисную сеть.

## Параметры

Без параметров.

## Пример вызова

{% list tabs %}

- JS

    ```js
    BX24.callMethod('timeman.networkrange.get', {}, function(result){
        if(result.error())
        {
            console.error(result.error().ex);
        }
        else
        {
            console.log(result.data());
        }
    });
    ```

- PHP

    ```php
    $result = restCommand(
        'timeman.networkrange.get',
        Array(),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result": [
        {
            "ip_range":"10.0.0.0-10.255.255.255",
            "name":"Офисная сеть 10.x.x.x"
        },
        {
            "ip_range":"172.16.0.0-172.31.255.255",
            "name":"Офисная сеть 172.x.x.x"
        },
        {
            "ip_range":"192.168.0.0-192.168.255.255",
            "name":"Офисная сеть 192.168.x.x"
        }
    ]
}
```

### Описание ключей

- **ip_range** - диапазон сетевых адресов.
- **name** - название диапазона.

## Ответ в случае ошибки

> 200 Error, 50x Error
```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to user this method"
}
```
### Описание ключей

- Ключ **error** - код возникшей ошибки.
- Ключ **error_description** - краткое описание возникшей ошибки.

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_ERROR** | Указанный метод доступен только администраторам. ||
|#