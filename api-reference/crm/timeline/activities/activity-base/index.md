# Обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- Отсутствует контент
- Заменить ссылку

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Методы работы с системными делами в [таймлайне](../../index.md)

#|
|| **Метод** | **Описание** ||
|| [crm.activity.add](./crm-activity-add.md) | Добавляет новое дело в таймлайн ||
|| [crm.activity.update](./crm-activity-update.md) | Обновляет дело ||
|| [crm.activity.get](./crm-activity-get.md) | Получает информацию о деле по идентификатору ||
|| [crm.activity.list](./crm-activity-list.md) | Получает список всех дел для элемента CRM по фильтру ||
|| [crm.activity.delete](./crm-activity-delete.md) | Удаляет любой тип дел ||
|| [crm.activity.fields](./crm-activity-fields.md) | Получает описание полей для дела ||
|| [crm.activity.communication.fields](./crm-activity-communication-fields.md) | Получает описание для полей коммуникации в деле ||
|#

## Дополнительно

- [Тип сущности CRM](../../../data-types.md#object_type) 


