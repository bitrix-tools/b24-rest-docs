# Создать новый статус счета crm.invoice.status.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.invoice.status.add` создает новый статус счета.

{% note warning %}

С версии 19.0.0 рекомендуется использовать метод [crm.status.add](../../../crm/status/crm-status-add.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`array`](../../data-types.md) | Набор полей — массив вида `array("поле"=>"значение"[, ...])`, содержащий значения полей статуса счета. 

{% note info %}

Чтобы узнать требуемый формат полей, выполните метод [crm.invoice.status.fields](./crm-invoice-status-fields.md) и посмотрите формат пришедших значений этих полей 

{% endnote %}

||
|#
