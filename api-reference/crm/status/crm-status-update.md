# Обновить существующий элемент справочника crm.status.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

```http
crm.status.update(id, fields)
```

Метод обновляет существующий элемент справочника.

#|
|| **Параметр** | **Описание** ||
|| **id^*^** | Идентификатор элемента справочника. ||
|| **fields^*^** | Набор полей - массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.status.fields](crm-status-fields.md) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```javascript
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.status.update",
        {
            id: id,
            fields:
            {
                "SORT": 75
            }                
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());                        
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)