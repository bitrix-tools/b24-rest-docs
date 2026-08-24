# Регулярные сделки: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Регулярная сделка создается автоматически по шаблону с заданным периодом и количеством повторений. Шаблон хранит значения полей будущих сделок, а настройки повторения задают, как часто и до какого момента создавать новые сделки в выбранной воронке продаж.

{% note warning "" %}

Регулярные сделки доступны не на всех тарифах Битрикс24. Если инструмент недоступен, методы [crm.deal.recurring.get](./crm-deal-recurring-get.md), [crm.deal.recurring.update](./crm-deal-recurring-update.md) и [crm.deal.recurring.delete](./crm-deal-recurring-delete.md) возвращают ошибку `Recurring is not allowed`.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Регулярные сделки: что это и как использовать](https://helpdesk.bitrix24.ru/open/18453980/)

## Идентификаторы шаблона регулярной сделки

Шаблон состоит из двух объектов: сделки-шаблона, которая хранит значения полей, и записи с настройками повторения. У них разные идентификаторы, и в методах они не взаимозаменяемы.

#|
|| **Идентификатор** | **Что обозначает** | **Где используется** ||
|| `ID` | Идентификатор настроек повторения | Параметр `id` методов [crm.deal.recurring.get](./crm-deal-recurring-get.md), [crm.deal.recurring.update](./crm-deal-recurring-update.md), [crm.deal.recurring.delete](./crm-deal-recurring-delete.md) и [crm.deal.recurring.expose](./crm-deal-recurring-expose.md) ||
|| `DEAL_ID` | Идентификатор сделки-шаблона, из которой копируются значения полей | Параметр `id` методов сделки — [crm.deal.get](../crm-deal-get.md), [crm.deal.update](../crm-deal-update.md) ||
|| `BASED_ID` | Идентификатор исходной сделки, из которой сделали шаблон | Параметр `id` метода [crm.deal.get](../crm-deal-get.md) ||
|#

Метод [crm.deal.recurring.add](./crm-deal-recurring-add.md) обрабатывает обычную сделку и сделку-шаблон по-разному.

- Если в `DEAL_ID` передать обычную сделку, Битрикс24 создаст ее копию — она станет сделкой-шаблоном. В настройках повторения `DEAL_ID` будет указывать на эту копию, а `BASED_ID` — на исходную сделку. Товарные позиции копируются в шаблон вместе с полями
- Если в `DEAL_ID` передать сделку, которая уже помечена как шаблон, настройки повторения привяжутся к ней напрямую, а `BASED_ID` останется пустым. Повторно добавить настройки к той же сделке нельзя — метод вернет ошибку `Deal already have had recurring settings`

Получить оба идентификатора можно методом [crm.deal.recurring.list](./crm-deal-recurring-list.md).

## Как начать работу

1. Создайте сделку методом [crm.deal.add](../crm-deal-add.md) или возьмите существующую — ее поля станут основой шаблона
2. Узнайте идентификатор воронки, в которой нужно создавать сделки, методом [crm.category.list](../../universal/category/crm-category-list.md) с параметром `entityTypeId = 2`
3. Создайте шаблон методом [crm.deal.recurring.add](./crm-deal-recurring-add.md): передайте `DEAL_ID`, воронку в `CATEGORY_ID`, дату первого запуска в `START_DATE` и периодичность в `PARAMS`
4. Ограничьте количество повторений полями `IS_LIMIT`, `LIMIT_REPEAT` и `LIMIT_DATE`, если сделки не должны создаваться бесконечно
5. Проверьте результат методом [crm.deal.recurring.get](./crm-deal-recurring-get.md) — он вернет дату следующего запуска `NEXT_EXECUTION` и счетчик созданных сделок `COUNTER_REPEAT`
6. Создайте сделку по шаблону вне расписания методом [crm.deal.recurring.expose](./crm-deal-recurring-expose.md)
7. Подпишитесь на [события регулярных сделок](./events/index.md), чтобы получать уведомления в приложение

## Связь регулярных сделок с другими объектами CRM

**Сделки.** Значения полей будущих сделок хранит сделка-шаблон. Чтобы посмотреть или изменить их, возьмите `DEAL_ID` из результата метода [crm.deal.recurring.list](./crm-deal-recurring-list.md) и передайте его в параметр `id` методов [crm.deal.get](../crm-deal-get.md) и [crm.deal.update](../crm-deal-update.md). Каждая сделка, созданная по шаблону, — обычная сделка, поэтому она вызывает событие [onCrmDealAdd](../events/on-crm-deal-add.md) наравне с событием [onCrmDealRecurringExpose](./events/on-crm-deal-recurring-expose.md).

**Воронки.** Воронками продаж управляет группа методов [crm.category.*](../../universal/category/index.md) с `entityTypeId = 2`. Чтобы сделки по шаблону создавались в нужной воронке, передайте ее идентификатор в поле `CATEGORY_ID`. Получить список воронок можно методом [crm.category.list](../../universal/category/crm-category-list.md).

**Товары.** Товарные позиции сделки-шаблона копируются в каждую новую сделку. Изменить их можно группой методов [crm.item.productrow.*](../../universal/product-rows/index.md): передайте `ownerType = D` и значение `DEAL_ID` из результата метода [crm.deal.recurring.list](./crm-deal-recurring-list.md) в параметре `ownerId`.

**Клиенты.** Компания и контакты сделки-шаблона тоже переносятся в новые сделки. Компанию меняет метод [crm.deal.update](../crm-deal-update.md) через поле `COMPANY_ID`, контакты — группа методов [crm.deal.contact.*](../contacts/index.md). Идентификатор сделки-шаблона берите из поля `DEAL_ID` метода [crm.deal.recurring.list](./crm-deal-recurring-list.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода — все методы проверяют права доступа к сделкам. Для чтения настроек нужно право «чтения» сделок, для создания шаблона — права «добавления» и «изменения», для удаления — право «удаления»

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.deal.recurring.add](./crm-deal-recurring-add.md) | Создает шаблон регулярной сделки ||
    || [crm.deal.recurring.update](./crm-deal-recurring-update.md) | Изменяет настройки шаблона регулярной сделки ||
    || [crm.deal.recurring.get](./crm-deal-recurring-get.md) | Возвращает настройки шаблона регулярной сделки по идентификатору ||
    || [crm.deal.recurring.list](./crm-deal-recurring-list.md) | Возвращает список шаблонов регулярных сделок ||
    || [crm.deal.recurring.delete](./crm-deal-recurring-delete.md) | Удаляет шаблон регулярной сделки ||
    || [crm.deal.recurring.expose](./crm-deal-recurring-expose.md) | Создает сделку по шаблону вне расписания ||
    || [crm.deal.recurring.fields](./crm-deal-recurring-fields.md) | Возвращает описание полей шаблона регулярной сделки ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDealRecurringAdd](./events/on-crm-deal-recurring-add.md) | При создании шаблона регулярной сделки ||
    || [onCrmDealRecurringUpdate](./events/on-crm-deal-recurring-update.md) | При изменении шаблона регулярной сделки ||
    || [onCrmDealRecurringDelete](./events/on-crm-deal-recurring-delete.md) | При удалении шаблона регулярной сделки ||
    || [onCrmDealRecurringExpose](./events/on-crm-deal-recurring-expose.md) | При создании сделки по шаблону ||
    |#

{% endlist %}
