# Изменить статус счета crm.invoice.status.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.invoice.status.update` возвращает статус счета по идентификатору.

{% note warning %}

С версии 19.0.0 рекомендуется использовать метод [crm.status.update](../../../crm/status/crm-status-update.md)

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор статуса счета ||
|| **fields***
[`array`](../../data-types.md) | Набор полей — массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.invoice.status.fields](./crm-invoice-status-fields.md). 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.invoice.status.fields](./crm-invoice-status-fields.md) и посмотрите формат пришедших значений этих полей 

{% endnote %}
||
|#