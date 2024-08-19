# Указание параметров индивидуальной карточки

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

{% endnote %}

{% endif %}

{% note info "crm.contact.details.configuration.set" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `crm.contact.details.configuration.set` устанавливает настройки карточки контактов. Метод записывает личные настройки карточки указанного пользователя или общие настройки для всех пользователей.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **scope**
[`unknown`](../../../data-types.md) | Область применения настроек. Допустимые значения:

- **P** - личные настройки,
- **C** - общие настройки
 ||
|| **userId**
[`unknown`](../../../data-types.md) | Идентификатор пользователя. Если не задан, то берётся текущий. Нужен только при установке личных настроек. ||
|| **data**
[`unknown`](../../../data-types.md) | Массив настроек. ||
|#

## Примеры

```js
//Установка личных настроек карточки контактов для пользователя с идентификатором 1.
BX24.callMethod(
    "crm.contact.details.configuration.set",
    {
        scope: "P",
        userId: 1,
        data:
        [
            {
                name: "main",
                title: "О контакте",
                type: "section",
                elements:
                [
                    { name: "NAME" },
                    { name: "SECOND_NAME" },
                    { name: "LAST_NAME" },
                    { name: "PHOTO" },
                    { name: "BIRTHDATE" },
                    { name: "POST" },
                    { name: "PHONE" },
                    { name: "EMAIL" },
                    { name: "COMPANY" }
                ]
            },
            {
                name: "additional",
                title: "Дополнительно",
                type: "section",
                elements:
                [
                    { name: "TYPE_ID" },
                    { name: "SOURCE_ID" },
                    { name: "SOURCE_DESCRIPTION" },
                    { name: "OPENED" },
                    { name: "EXPORT" },
                    { name: "ASSIGNED_BY_ID" },
                    { name: "COMMENTS" }
                ]
            }
        ]
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
//---
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}