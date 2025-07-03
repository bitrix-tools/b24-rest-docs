# Услуги: обзор методов

Услуги — это нематериальные товары: консультации, работы или действия. Они могут использоваться в объектах CRM и быть связаны с физическими товарами.

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Услуги в CRM](https://helpdesk.bitrix24.ru/open/16560760/)

## Связь услуг с другими объектами

**Торговый каталог.** Услуга должна быть привязана к конкретному торговому каталогу. Получить идентификаторы доступных торговых каталогов можно с помощью метода [catalog.catalog.list](../../catalog/catalog-catalog-list.md).

**Разделы торгового каталога.** Услуги обычно распределены по разделам. Чтобы создать и управлять разделами, используйте группу методов [catalog.section.\* ](../../section/index.md).

**Изображения.** Услуга может содержать изображения: для анонса, детальное, дополнительное. Чтобы добавить изображения, используйте методы [catalog.productImage.\*](../../product-image/index.md), чтобы скачать — метод [catalog.product.service.download](./catalog-product-service-download.md).

**Единицы измерения.** Для услуги выбирают единицу измерения, например, часы для консультаций. Добавить или изменить единицу измерения можно с помощью методов [catalog.measure.\* ](../../measure/index.md).

**НДС.** Ставку НДС можно задать для каждой услуги отдельно. Работать со ставками можно через методы [catalog.vat.\*](../../vat/index.md).

**Пользователь**. В каждой услуге хранятся идентификаторы пользователей, которые ее создали и изменили. Информацию о пользователе можно получить с помощью методов [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Свойства товаров и вариаций.** Услуги имеют свойства, которые отличают их друг от друга. Это могут быть тип услуги, срок выполнения или статус услуги. Работать со свойствами можно с помощью методов [catalog.productProperty.\*](../../product-property/index.md).

**CRM.** Услуги связаны с CRM следующим образом:

- услугу можно добавить в список товаров [лида](../../../crm/leads/index.md), [сделки](../../../crm/deals/index.md), [счета](../../../crm/universal/invoice.md), [смарт-процесса](../../../crm/universal/index.md) и [предложения](../../../crm/quote/index.md).

- [лиды](../../../crm/leads/index.md), [сделки](../../../crm/deals/index.md), [смарт-процессы](../../../crm/universal/index.md), [счета](../../../crm/universal/invoice.md), [контакты](../../../crm/contacts/index.md) и [компании](../../../crm/companies/index.md) можно указать в услугах с помощью свойства типа «Привязка к элементам CRM».

**Корзина заказа**. Услугу можно добавить, изменить или удалить из корзины с помощью группы методов [sale.basketitem.\*](../../../sale/basket-item/index.md).

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.product.service.add](./catalog-product-service-add.md) | Добавляет услугу ||
|| [catalog.product.service.update](./catalog-product-service-update.md) | Обновляет поля услуги ||
|| [catalog.product.service.get](./catalog-product-service-get.md) | Возвращает значения полей услуги по идентификатору ||
|| [catalog.product.service.list](./catalog-product-service-list.md) | Возвращает список услуг по фильтру ||
|| [catalog.product.service.download](./catalog-product-service-download.md) | Скачивает файлы услуги по переданным параметрам ||
|| [catalog.product.service.delete](./catalog-product-service-delete.md) | Удаляет услугу ||
|| [catalog.product.service.getFieldsByFilter](./catalog-product-service-get-fields-by-filter.md) | Возвращает поля услуги по фильтру ||
|#