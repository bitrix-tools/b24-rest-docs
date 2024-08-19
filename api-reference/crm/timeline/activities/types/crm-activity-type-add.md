# Добавление пользовательского типа дел

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы (конфигурируемых дел)

{% endnote %}

{% endif %}

{% note info "crm.activity.type.add" %}

**Scope**: [`crm`](../../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.activity.type.add` регистрирует свой подтип дел с указанием ему названия и иконки.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **TYPE_ID**
[`unknown`](../../../../data-types.md) | Тип дела провайдера (при создании дела это PROVIDER_TYPE_ID) | ||
|| **NAME**
[`unknown`](../../../../data-types.md) | Название вашего типа дел | ||
|| **ICON_FILE**
[`unknown`](../../../../data-types.md) | Файл иконки вашего типа дел | ||
|| **IS_CONFIGURABLE_TYPE**
[`unknown`](../../../../data-types.md) | Значение по умолчанию - `N`. Значение `Y` - признак того, что тип будет использоваться для [конфигурируемых дел](.). | ||
|#

## Примеры

```js
BX24.callMethod(
    'crm.activity.type.add',
    {
        fields:
            {
                "TYPE_ID": '1C',
                "NAME": "Дело 1с",
                'ICON_FILE': document.getElementById('type-icon'), // file input node
                "IS_CONFIGURABLE_TYPE": "N"
            }
    },
    function(result)
    {
        if(result.error())
            alert("Error: " + result.error());
        else
        {
            alert("Success: " + result.data());
        }
    }
);
```

После этого достаточно при создании дела указывать свой тип, иконка и название будут подгружаться автоматически.

```js
BX24.callMethod(
    'crm.activity.add',
    {
        fields:
            {
                "OWNER_TYPE_ID": 1,
                "OWNER_ID": selectedEntityId,
                "PROVIDER_ID": 'REST_APP',
                "PROVIDER_TYPE_ID": '1C',
                "SUBJECT": "Новое дело",
                "COMPLETED": "N",
                "RESPONSIBLE_ID": 1,
                "DESCRIPTION": "Описание нового дела"
            }
    },
    function(result)
    {
        if(result.error())
            alert("Error: " + result.error());
        else
        {
            alert("Success: " + result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}