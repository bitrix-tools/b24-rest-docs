# Логика привязки дел

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

Из файла Сергея:
тут надо рассмотреть разницу привязки через ownerId и bindings

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.activity.binding.add](./crm-activity-binding-list.md) | Добавить привязку ||
|| [crm.activity.binding.list](./crm-activity-binding-list.md) | Получить список привязок ||
|| [crm.activity.binding.delete](./crm-activity-binding-delete.md) | Удалить привязку ||
|#