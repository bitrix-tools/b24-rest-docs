# Установить диапазон сетевых адресов timeman.networkrange.set

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

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.networkrange.set` для установки диапазонов сетевых адресов, входящих в офисную сеть.

## Параметры

#|
|| **Параметр** | **Пример** | **Обязательный** | **Описание** ||
|| **RANGES^*^**
[`unknown`](../../data-types.md) | `[{"ip_range":"10.0.0.0-10.255.255.255","name":"Офисная сеть 10.x.x.x"}]` | Да | Диапазоны сетевых адресов. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Диапазон может содержать блок адресов, например `10.0.0.0-10.255.255.255` или всего один адрес `10.10.0.1`.

## Пример вызова

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod('timeman.networkrange.set', {
        ranges: '[{"ip_range":"10.0.0.0-10.255.255.255","name":"Офисная сеть 10.x.x.x"},{"ip_range":"172.16.0.0-172.31.255.255","name":"Офисная сеть 172.x.x.x"},{"ip_range":"192.168.0.0-192.168.255.255","name":"Офисная сеть 192.168.x.x"}]'
    }, function(result){
        if(result.error())
        {
            console.error(result.error().ex);
        }
        else
        {
            var answer = result.data();
            if (answer.result)
            {
                console.log('range saved');
            }
            else
            {
                console.warn('An error occurred while saving, the following ranges are incorrect', answer.error_ranges);
            }
        }
    });
    ```

- PHP

    ```php
    $result = restCommand('timeman.networkrange.set', Array(
        'RANGES' => Array(
            Array("ip_range" => "10.0.0.0-10.255.255.255", "name" => "Офисная сеть 10.x.x.x"),
            Array("ip_range" => "172.16.0.0-172.31.255.255", "name" => "Офисная сеть 172.x.x.x"),
            Array("ip_range" => "192.168.0.0-192.168.255.255", "name" => "Офисная сеть 192.168.x.x")
        )
    ), $_REQUEST["auth"]);
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

**При успешном сохранении**

> 200 OK
```json
{
    "result": {
        "result": true
    }
}
```

**При возникновении ошибки разбора диапазонов**

> 200 OK
```json
{
    "result": {
        "result": false,
        "error_range": [
            {"ip_range": "a10.0.0.0-10.255.255.255", "name": "Офисная сеть 10.x.x.x"}
        ]
    }
}
```

### Описание ключей

- **result** - результат сохранения.
- **error_range** - массив диапазонов в которых были найдены ошибки:
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
|| **INVALID_FORMAT** | Передан не корректный формат в поле RANGE. ||
|#