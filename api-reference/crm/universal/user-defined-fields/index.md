# Пользовательские поля в CRM

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- к каким типам объектов применимо и т.д. И тут какая-то путаница с разделами, надо уточнить
- правки под стандарт написания

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Методы работы с пользовательскими полями:

#|
|| **Метод** | **Описание** ||
|| [crm.userfield.fields](./crm-userfield-fields.md) | Метод возвращает описание полей для пользовательских полей. ||
|| [crm.userfield.types](./crm-userfield-types.md) | Метод возвращает список типов пользовательских полей. ||
|| [crm.userfield.enumeration.fields](./crm-userfield-enumeration-fields.md) | Метод возвращает описание полей для пользовательского поля типа "enumeration" (список). ||
|| [crm.userfield.settings.fields](./crm-userfield-settings-fields.md) | Метод возвращает описание полей настроек для типа пользовательского поля. ||
|#

## Дополнительно
- [Настройки пользовательских полей](../userfieldconfig/index.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)
  