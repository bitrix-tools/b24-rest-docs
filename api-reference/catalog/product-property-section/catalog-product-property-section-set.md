# Установить секционные настройки свойств catalog.productPropertySection.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры на других языках
- отсутствует ответ в случае успеха и ошибки

{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод устанавливает (создаёт или обновляет) секционные настройки свойств товаров или торговых предложений.

#|
|| **Параметр** | **Описание** ||
|| **propertyId**
 `integer`  | Идентификатор свойства товаров или торговых предложений. ||
|| **fields**
`object` | Массив, содержащий следующие поля:
- **smartFilter** – показывать в умном фильтре (Y/N);
- **displayType** – вид в умном фильтре; возможные значения:
  - "F" – флажки;
  - "K" – радиокнопки;
  - "P" – выпадающий список.
- **displayExpanded** – показать развёрнутым (Y/N);
- **filterHint** – подсказка в умном фильтре для посетителей. ||
|#

## Пример

```js
BX24.callMethod(
    'catalog.productPropertySection.set',
    {
        propertyId: 128,
        fields: {
            displayType: "F",
            displayExpanded: "Y",
            filterHint: "Размер товара"
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error().ex);
        else
            console.log(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}