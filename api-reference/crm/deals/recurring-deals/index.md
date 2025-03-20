# Регулярные сделки: обзор методов

Регулярные сделки —  это сделки, которые создаются по шаблону. Для регулярных сделок можно настроить период и количество повторений. Они будут автоматически создаваться в выбранной воронке продаж.

> Быстрый переход: [все методы и события](#all-methods) 
>
> Пользовательская документация: [Регулярные сделки: что это и как использовать](https://helpdesk.bitrix24.ru/open/18453980/)

## Связь регулярных сделок с другими объектами CRM

**Сделки.** Чтобы создать новый шаблон используйте метод [crm.deal.recurring.add](./crm-deal-recurring-add.md). В параметр метода `DEAL_ID` передавайте ID существующей сделки. Значения полей этой сделки будут сохранены в шаблоне.

Чтобы посмотреть сделку, на основе которой создан шаблон, выполните метод [crm.deal.recurring.list](./crm-deal-recurring-list.md). В результате вы получите значение `BASED_ID`. Полученное значение передайте в параметр `id` метода [crm.deal.get](../crm-deal-get.md). Если шаблон создан в разделе регулярных сделок Битрикс24, параметр `BASED_ID` будет пустым.

**Воронки.** Для сделок можно создавать воронки продаж и управлять ими через группу методов [crm.category.*](../../universal/category/index.md) `entityTypeId` сделки = `2`. Чтобы создать регулярную сделку в нужной воронке, передайте ID воронки в параметре `CATEGORY_ID`.

**Товары.** Если в шаблоне сделки есть товарные позиции, новая регулярная сделка будет создана с ними. Чтобы изменить товарные позиции в шаблоне, используйте методы группы [crm.item.productrow.*](../../universal/product-rows/index.md). В качестве `ownerId` сделки передавайте значение `DEAL_ID` из результата метода [crm.deal.recurring.list](./crm-deal-recurring-list.md).

**Клиенты.** Если в шаблоне сделки выбраны компания и контакты, новая регулярная сделка будет создана с ними. Чтобы изменить компанию в шаблоне, используйте метод [crm.deal.update](../crm-deal-update.md), чтобы изменить контакты — методы группы [crm.deal.contact.*](../contacts/crm-deal-contact-add.md). В качестве `id` сделки передавайте значение `DEAL_ID` из результата метода [crm.deal.recurring.list](./crm-deal-recurring-list.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
> 
> Кто может выполнять метод: в зависимости от метода

{% list tabs %}

- Методы
  
    #|
    || **Метод** | **Описание** ||
    || [crm.deal.recurring.add](./crm-deal-recurring-add.md) | Создает новый шаблон регулярной сделки ||
    || [crm.deal.recurring.fields](./crm-deal-recurring-fields.md) | Возвращает список полей шаблона регулярной сделки ||
    || [crm.deal.recurring.expose](./crm-deal-recurring-expose.md) | Создает новую сделку по шаблону ||
    || [crm.deal.recurring.update](./crm-deal-recurring-update.md) | Изменяет настройки шаблона регулярной сделки ||
    || [crm.deal.recurring.get](./crm-deal-recurring-get.md) | Возвращает настройки шаблона регулярной сделки по Id ||
    || [crm.deal.recurring.list](./crm-deal-recurring-list.md) | Возвращает список шаблонов регулярных сделок ||
    || [crm.deal.recurring.delete](./crm-deal-recurring-delete.md) | Удаляет шаблон регулярной сделки ||
    |#

- События
  
    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDealRecurringAdd](./events/on-crm-deal-recurring-add.md) | При создании новой регулярной сделки ||
    || [onCrmDealRecurringUpdate](./events/on-crm-deal-recurring-update.md) | При изменении регулярной сделки ||
    || [onCrmDealRecurringDelete](./events/on-crm-deal-recurring-delete.md) | При удалении регулярной сделки ||
    || [onCrmDealRecurringExpose](./events/on-crm-deal-recurring-expose.md) | При создании новой сделки из регулярной сделки ||
    |#

{% endlist %}