# О пользовательских типах дел

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

Из файла Сергея:
О пользовательских типах дел, зачем нужны, где используются.

{% endnote %}

{% endif %}

{% note info "crm.activity.type.*" %}

**Scope**: [`crm`](../../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| [crm.activity.type.add](./crm-activity-type-add.md) | Метод для регистрации своего подтипа дел с указанием ему названия и иконки. ||
|| [crm.activity.type.list](./crm-activity-type-list.md) | Метод для получения списка подтипов дел. ||
|| [crm.activity.type.delete](./crm-activity-type-delete.md) | Метод для удаления подтипа дел. ||
|#