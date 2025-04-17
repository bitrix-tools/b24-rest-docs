# Провести документ складского учета catalog.document.conduct

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.conduct(id)
```

Метод для проведения документа складского учёта.
Если операция успешна, возвращается `true` в теле ответа.


## Параметры

#|
|| **Параметр** | **Описание** ||
|| **id**
[`integer`](../../data-types.md)| Идентификатор документа складского учёта. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.document.conduct',
        {
            id: 112
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}