# Добавить товары в лид crm.lead.productrows.set

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописана ссылка на ещё не созданную страницу

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.lead.productrows.set` устанавливает (создаёт или обновляет) товарные позиции лида.

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор лида. ||
|| **rows** | Товарные позиции - массив вида `array(array("поле"=>"значение"[, ...])[, ...])`, где "поле" может принимать значения из возвращаемых методом [crm.productrow.fields](../outdated/productrow-old/crm-productrow-fields.md). Товарные позиции лида, существующие до момента вызова метода, будут заменены новыми. После сохранения будет произведён пересчёт суммы лида. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.lead.productrows.set",
        {
            id: id,
            rows:
            [
                { "PRODUCT_ID": 689, "PRICE": 100.00, "QUANTITY": 2 },
                { "PRODUCT_ID": 690, "PRICE": 200.00, "QUANTITY": 1 }
            ]
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

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}