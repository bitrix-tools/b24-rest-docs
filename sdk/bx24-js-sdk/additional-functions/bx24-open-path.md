# Открыть путь в слайдере BX24.openPath

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

Метод `BX24.openPath` открывает указанный путь внутри портала в слайдере.

{% note warning %}

По соображениям безопасности метод не работает в мобильном приложении.

{% endnote %}

{% note info %}

С версии 22.300 может открывать смарт-процессы.

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **path**
[`unknown`](../../../api-reference/data-types.md) | Путь внутри портала, может начинаться с: 
```
^\/(crm\/(deal|lead|contact|company|type)|marketplace|company\/personal\/user\/[0-9]+|workgroups\/group\/[0-9]+)\/
```
 | ||
|| **callback**
[`unknown`](../../../api-reference/data-types.md) | функция вызывается в 2 случаях:
- при ошибке открытия
- если указанный путь нет возможности открыть: `{result: "error", errorCode: "PATH_NOT_AVAILABLE"}`
- в мобильном приложении: `{result: "error", errorCode: "METHOD_NOT_SUPPORTED_ON_DEVICE"}`
- при закрытии слайда: `{result: "close"}` | ||
|#

## Пример:

```js
<script src="//api.bitrix24.com/api/v1/"></script>
<script>
    BX24.init(
        function()
        {
            BX24.openPath(
                '/crm/deal/details/5/',
                function(result)
                {
                    console.log(result);
                }
            );
        }
    );
</script>
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}