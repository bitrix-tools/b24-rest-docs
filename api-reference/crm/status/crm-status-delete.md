# Удаление элемента справочника

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

{% note info "crm.status.delete" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
crm.status.delete(id, params)
```

Метод удаляет элемент справочника.

#|
|| **Параметр** | **Описание** ||
|| **id^*^** | Идентификатор элемента справочника. ||
|| **params** | Набор параметров. FORCED - флаг принудительного удаления системных элементов. По умолчанию - N. Если удаляемый элемент является системным, то он не будет удалён. Если будет передано значение Y, то этот элемент будет удалён в любом случае. Для удаления системного элемента используйте второй пример в описании. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

```javascript
var id = prompt("Введите ID пользовательского элемента");
BX24.callMethod(
    "crm.status.delete",
    { id: id },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

```javascript
var id = prompt("Введите ID пользовательского или системного элемента");
BX24.callMethod(
    "crm.status.delete",
    { id: id, params:{ FORCED: "Y" } },
    function(result)
    {
     if(result.error())
            console.error(result.error());
     else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}