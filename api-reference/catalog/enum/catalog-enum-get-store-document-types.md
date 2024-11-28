# Получить типы документов складского учета, доступных для REST catalog.enum.getRogetStoreDocumentTypesundTypes

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

```http
catalog.enum.getStoreDocumentTypes()
```

Метод возвращает типы документов складского учёта, доступные для REST.

На текущий момент доступны следующие типы:
- `A` – Приход товара на склад;
- `S` – Оприходование товара;
- `M` – Перемещение товара между складами;
- `R` – Возврат товара;
- `D` – Списание товара.

## Параметры

Без параметров.

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.enum.getStoreDocumentTypes',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}