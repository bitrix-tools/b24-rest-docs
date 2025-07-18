# Коммерческие предложения в CRM: обзор методов

Коммерческое предложение — объект CRM, в котором можно формировать печатные документы и отправлять их клиенту перед сделкой.

> Быстрый переход: [все методы и события](#all-methods)
> 
> Пользовательская документация: [коммерческие предложения в Битрикс24](https://helpdesk.bitrix24.ru/open/17614102/) 

## Связь предложений с другими объектами CRM

**Сделка.** Коммерческое предложение может быть создано на основании сделки и наоборот. Связь устанавливается в поле предложения `DEAL_ID`.

**Товары.**  Добавление, изменение, удаление товарных позиций в предложениях возможно через группу методов [crm.item.productrow.*](../universal/product-rows/index.md). 

**Реквизиты.** Реквизиты покупателя подтягиваются в форму предложения из связанных с ним контакта или компании. Реквизиты продавца подтягиваются из поля `MYCOMPANY_ID`.

**Клиент.** Поле в карточке коммерческого предложения, состоящее из связанных с ним компании и контактов. Компания в поле одна, обращение к ней происходит напрямую через поле `COMPANY_ID`. Контактов может быть указано несколько, изменение их производится через массив данных в множественном поле `CONTACT_IDS`.

{% note tip "Пользовательская документация" %}

- [Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
- [Как использовать реквизиты вашей компании](https://helpdesk.bitrix24.ru/open/15987420/)

{% endnote %}

## Карточка предложения

Основное рабочее пространство в предложении — это вкладка Общее его карточки. Она состоит из двух частей: 

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие. Для создания, изменения, получения или удаления пользовательских полей предложений используется группа методов [crm.quote.userfield.*](./user-field/index.md)

* правая, в ней располагается таймлайн предложения. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку коммерческого предложения можно встроить приложение. Благодаря встраиванию можно будет использовать приложение и не покидать карточку предложения. 

Есть два сценария встройки: 
*  Использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
*  Создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружается контент вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

### Основные

{% list tabs %}

- Методы
  
    #|
    || **Метод** | **Описание** ||
    || [crm.quote.add](./crm-quote-add.md) | Создает новое коммерческое предложение ||
    || [crm.quote.update](./crm-quote-update.md) | Изменяет существующее предложение ||
    || [crm.quote.get](./crm-quote-get.md) | Возвращает коммерческое предложение по идентификатору ||
    || [crm.quote.list](./crm-quote-list.md) | Возвращает список предложений по фильтру||
    || [crm.quote.delete](./crm-quote-delete.md) | Удаляет предложение и все связанные с ним объекты ||
    || [crm.quote.fields](./crm-quote-fields.md) | Возвращает описание полей коммерческого предложения ||
    || [crm.quote.productrows.get](./crm-quote-product-rows-get.md) | Возвращает товарные позиции предложения ||
    || [crm.quote.productrows.set](./crm-quote-product-rows-set.md) | Устанавливает (создаёт или обновляет) товарные позиции предложения ||
    |#

- События 

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmQuoteAdd](./events/on-crm-quote-add.md) | При создании предложения ||
    || [onCrmQuoteUpdate](./events/on-crm-quote-update.md) | При обновлении предложения ||
    || [onCrmQuoteDelete](./events/on-crm-quote-delete.md) | При удалении предложения ||
    |#

{% endlist %}

### Пользователськие поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.quote.userfield.add](./user-field/crm-quote-user-field-add.md) | Создает новое пользовательское поле для предложений ||
    || [crm.quote.userfield.update](./user-field/crm-quote-user-field-update.md) | Обновляет существующее пользовательское поле предложений ||
    || [crm.quote.userfield.get](./user-field/crm-quote-user-field-get.md) | Возвращает пользовательское поле предложений по идентификатору ||
    || [crm.quote.userfield.list](./user-field/crm-quote-user-field-list.md) | Возвращает список пользовательских полей предложений по фильтру ||
    || [crm.quote.userfield.delete](./user-field/crm-quote-user-field-delete.md) | Удаляет пользовательское поле предложений ||
    |#

- События 
  
    #|
    || **Событие** | **Вызывается** ||
    || [onCrmQuoteUserFieldAdd](./user-field/events/on-crm-quote-user-field-add.md) | При добавлении пользовательского поля ||
    || [onCrmQuoteUserFieldUpdate](./user-field/events/on-crm-quote-user-field-update.md) | При изменении пользовательского поля ||
    || [onCrmQuoteUserFieldDelete](./user-field/events/on-crm-quote-user-field-delete.md) | При удалении пользовательского поля ||
    || [onCrmQuoteUserFieldSetEnumValues](./user-field/events/on-crm-quote-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа ||
    |#

 {% endlist %}   