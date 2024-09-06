# Получить поля статуса счета crm.invoice.status.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.invoice.status.fields` возвращает описание полей статуса счета.

{% note warning %}

С версии 19.0.0 рекомендуется использовать метод [crm.status.fields](../../../crm/status/crm-status-fields.md)

{% endnote %}

Без параметров

### Возвращаемые данные

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор сущности, связанной с счетом. Только для чтения ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор счета. Только для чтения  ||
|| **NAME***
[`string`](../../../data-types.md) | Название раздела  ||
|| **NAME_INIT**
[`string`](../../../data-types.md) | Только для чтения  ||
|| **SORT***
[`integer`](../../../data-types.md) | Сортировка  ||
|| **STATUS_ID**
[`string`](../../../data-types.md) | Статус. Только для чтения  ||
|| **SYSTEM**
[`char`](../../../data-types.md) | Системный или нет. Только для чтения ||
|#
