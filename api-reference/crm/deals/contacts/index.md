# Связь сделки с контактами: обзор методов

При помощи группы методов crm.deal.contact.* можно устанавливать или удалять связь контактов со сделкой. Используйте методы crm.deal.contact.* для работы с одним контактом, методы crm.deal.contact.items.* для работы с группой контактов. 

> Быстрый переход: [все методы](#all-methods) 
> 
> Пользовательская документация: [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159) 

## Что дает связь между сделкой и контактами

1. В карточке сделки отображается информация о связанных контактах: имя, номер а телефона, e-mail, должность. 
2. Из карточки сделки можно позвонить или написать письмо без перехода в карточку контакта.
3. Коммуникация с клиентом: письма, звонки, чаты открытых линий будут храниться в карточке контакта и в карточке сделки. К закрытым сделкам коммуникации не прикрепляются. 
4. CoPilot в CRM обрабатывает звонки клиентов из карточки сделки: расшифровывает записи, составляет резюме разговора, заполняет поля в карточке CRM
5. При [генерации документов по шаблону](../../document-generator/index.md) можно использовать символьные коды, которые автоматически подставят данные связанных контактов в документ.

{% note tip "Пользовательская документация" %}

- [CoPilot в CRM](https://helpdesk.bitrix24.ru/open/18799442/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.deal.contact.add](./crm-deal-contact-add.md) | Добавляет контакт к сделке ||
|| [crm.deal.contact.items.set](./crm-deal-contact-items-set.md) | Добавляет несколько контактов к сделке ||
|| [crm.deal.contact.fields](./crm-deal-contact-fields.md) | Возвращает поля связи сделка-контакт ||
|| [crm.deal.contact.items.get](./crm-deal-contact-items-get.md) | Получает набор контактов, связанных со сделкой ||
|| [crm.deal.contact.delete](./crm-deal-contact-delete.md) | Удаляет контакт из указанной сделки ||
|| [crm.deal.contact.items.delete](./crm-deal-contact-items-delete.md) | Удаляет набор контактов, связанных с указанной сделкой ||
|#