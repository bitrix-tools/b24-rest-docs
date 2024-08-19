# Возвращает текущие настройки режима работы CRM

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны параметры
- отсутствуют примеры 
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "crm.settings.mode.get" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

```http
crm.settings.mode.get()
```

Возвращает текущие настройки режима работы CRM:

- 1 - классический режим работы (с лидами).
- 2 - режим работы без лидов.

То есть метод `crm.settings.mode.get` возвращает значение, определённое в [crm.enum.settings.mode](../auxiliary/enum/crm-enum-settings-mode.md).
