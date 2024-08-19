# О сделках в Битрикс24

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно вступление, соответствующее заголовку

{% endnote %}

{% endif %}

{% note info "Права" %}

**Scope**: [`crm`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Для сделок в Битрикс24 предусмотрены следующие методы:

#|
|| **Метод** | **Описание** ||
|| [crm.deal.fields](./crm-deal-fields.md) | Поля сделки. ||
|| [crm.deal.add](./crm-deal-add.md) | Создание новой сделки. ||
|| [crm.deal.update](./crm-deal-update.md) | Изменение сделки. ||
|| [crm.deal.get](./crm-deal-get.md) | Получение сделки по Id. ||
|| [crm.deal.list](./crm-deal-list.md) | Получение списка сделок. ||
|| [crm.deal.delete](./crm-deal-delete.md) | Удаление сделки. ||
|| [crm.deal.productrows.set](./crm-deal-productrows-set.md) | Добавление товаров в сделку. ||
|| [crm.deal.productrows.get](./crm-deal-get.md) | Получение товаров сделки. ||
|#

## Смотрите также

- [События](./events/index.md)
- [Рекуррентные сделки](./recurring-deals/index.md)
- [Пользовательские поля](./user-defined-fields/index.md)
- [Контакты у сделки](./contacts/index.md)
