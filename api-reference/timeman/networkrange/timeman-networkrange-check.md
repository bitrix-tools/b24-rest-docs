# Проверка IP-адреса

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

{% note info "timeman.networkrange.check" %}

**Scope**: [`timeman`](../../scopes/permissions.md) | **Кто может выполнять метод**: `администратор`

{% endnote %}

Метод `timeman.networkrange.check` для проверки IP-адреса на вхождение в диапазоны сетевых адресов офисной сети.

## Параметры

#|
|| **Параметр** | **Пример** | **Обязательный** | **Описание** ||
|| **IP**
[`unknown`](../../data-types.md) | 10.10.255.255 | Нет | IP-адрес. ||
|#

Если не указать параметр `IP`, то проверка будет выполнена для текущего IP-адреса.

## Пример вызова

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod('timeman.networkrange.check',
        {
            'IP': '10.10.255.255'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    $result = restCommand(
        'timeman.networkrange.check',
        Array(
            'IP' => '10.10.255.255'
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result": {
        "ip": "10.10.255.255",
        "range": "10.0.0.0-10.255.255.255",
        "name": "Офисная сеть 10.x.x.x"
    }
}
```

### Описание ключей

- **ip** - IP-адрес, который был проверен.
- **range** - диапазон в который входит указанный IP-адрес.
- **name** - название диапазона в который входит указанный IP-адрес.

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