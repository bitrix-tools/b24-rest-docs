# Реквизиты в CRM: обзор методов

Реквизиты —  отдельные объекты CRM, в которых хранятся данные, используемые при заключении сделок: ИНН, КПП, ОГРН, банковские реквизиты, адреса. Все, что необходимо в шаблонах документов.

Поле `Реквизиты` доступно:
* в контактах, компаниях — в них хранятся данные покупателей
* в ваших компаниях — в них хранятся данные вашей компании, выступающей в роли продавца. Данный тип компании находится в отдельном разделе в настройках CRM

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [реквизиты вашей компании в Битрикс24](https://helpdesk.bitrix24.ru/open/15989720), [автоматическое заполнение реквизитов по ИНН](https://helpdesk.bitrix24.ru/open/1930547/) 

## Связь реквизитов с другими объектами CRM

**Контакт.** Шаблон реквизитов по умолчанию — Физлицо.

**Компания.** Шаблон реквизитов по умолчанию — Организация.

**Моя компания.** Реквизиты компании, выбранной как основной продавец, автоматически подставляются во все документы.

**Адрес.** Отдельный объект, доступный через стандартное поле `Адрес`.  Адреса могут быть привязаны только к Реквизитам или Лидам. Для работы с адресами используйте группу методов [crm.address.*](./addresses/index.md) ,  ID реквизита передается в параметре `ENTITY_ID`.  

**Документы.** Любые печатные формы: счета, акты, договоры и другие, которые формируются через генератор документов. 

{% note tip "Пользовательская документация" %}

- [Связи реквизитов с объектами CRM](../requisites/links/index.md)
- [Изменения в работе с адресами и реквизитами в CRM](https://helpdesk.bitrix24.ru/open/11706682/)
- [Документы в CRM: как создать и отправить за пару минут](https://helpdesk.bitrix24.ru/open/19098306/)

{% endnote %}

## Шаблоны реквизитов

Любой реквизит контакта или компании создается в рамках шаблонов. Шаблон состоит из набора полей, характерных для того или иного типа юридических и физических лиц:
* шаблон Организация состоит из полей юридических лиц типа ООО: `ОГРН`, `ОКТМО`
* шаблон ИП состоит из других полей: `ОГРНИП`, `ОКВЭД`

Добавлять, изменять и удалять шаблоны реквизитов можно через группу методов [crm.requisite.preset.*](./presets/index.md).

Управлять перечнем полей определенного шаблона — [crm.requisite.preset.field.*](./presets/fields/index.md). 

Создавать и изменять пользовательские поля, которые можно будет использовать в шаблоне — [crm.requisite.userfield.*](./user-fields/index.md).

{% note tip "Пользовательская документация" %}

- [Шаблоны реквизитов](https://helpdesk.bitrix24.ru/open/7385595/)

{% endnote %}

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.requisite.add](./universal/crm-requisite-add.md) | Создает новый реквизит ||
    || [crm.requisite.update](./universal/crm-requisite-update.md) | Обновляет существующий реквизит ||
    || [crm.requisite.get](./universal/crm-requisite-get.md) | Возвращает реквизит по идентификатору ||
    || [crm.requisite.list](./universal/crm-requisite-list.md) | Возвращает список реквизитов по фильтру ||
    || [crm.requisite.delete](./universal/crm-requisite-delete.md) | Удаляет реквизит и все связанные с ним объекты ||
    || [crm.requisite.fields](./universal/crm-requisite-fields.md) | Возвращает описание полей реквизита ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmRequisiteAdd](./events/on-crm-requisite-add.md) | При добавлении реквизита ||
    || [onCrmRequisiteUpdate](./events/on-crm-requisite-update.md) | При изменении реквизита ||
    || [onCrmRequisiteDelete](./events/on-crm-requisite-delete.md) | При удалении реквизита ||
    |#

{% endlist %}

### Адреса

{% list tabs %}

- Методы 

    #|
    || **Метод** | **Описание** ||
    || [crm.address.add](./addresses/crm-address-add.md) | Добавляет новый адрес для реквизита или лида ||
    || [crm.address.update](./addresses/crm-address-update.md) | Изменяет адрес для реквизита или лида ||
    || [crm.address.list](./addresses/crm-address-list.md) | Возвращает список адресов по фильтру ||
    || [crm.address.delete](./addresses/crm-address-delete.md) | Удаляет адрес ||
    || [crm.address.fields](./addresses/crm-address-fields.md) | Возвращает формально описание полей адреса ||
    |#

- События
  
   #|
    || **Событие** | **Вызывается** ||
    || [onCrmAddressRegister](./events/on-crm-address-register.md) | При регистрации адреса ||
    || [onCrmAddressUnregister](./events/on-crm-address-unregister.md) | При удалении адреса ||
    |#

{% endlist %}

### Банковские реквизиты

{% list tabs %}

- Методы 
 
    #|
    || **Метод** | **Описание** ||
    || [crm.requisite.bankdetail.add](./bank-detail/crm-requisite-bank-detail-add.md) | Создает новый банковский реквизит ||
    || [crm.requisite.bankdetail.update](./bank-detail/crm-requisite-bank-detail-update.md) | Изменяет существующий банковский реквизит ||
    || [crm.requisite.bankdetail.get](./bank-detail/crm-requisite-bank-detail-get.md) | Возвращает банковский реквизит по идентификатору ||
    || [crm.requisite.bankdetail.list](./bank-detail/crm-requisite-bank-detail-list.md) | Возвращает список банковских реквизитов по фильтру ||
    || [crm.requisite.bankdetail.delete](./bank-detail/crm-requisite-bank-detail-delete.md) | Удаляет банковский реквизит ||
    || [crm.requisite.bankdetail.fields](./bank-detail/crm-requisite-bank-detail-fields.md) | Возвращает формальное описание полей банковских реквизитов ||
    |#

- События
  
   #|
    || **Событие** | **Вызывается** ||
    || [onCrmBankDetailAdd](./events/on-crm-bank-detail-add.md) | При добавлении банковского реквизита ||
    || [onCrmBankDetailUpdate](./events/on-crm-bank-detail-update.md) | При изменении банковского реквизита ||
    || [onCrmBankDetailDelete](./events/on-crm-bank-detail-delete.md) | При удалении банковского реквизита ||
    |#

{% endlist %}

### Пользовательские поля реквизитов

{% list tabs %}

- Методы 

    #|
    || **Метод** | **Описание** ||
    || [crm.requisite.userfield.add.md](./user-fields/crm-requisite-userfield-add.md) | Создает новое пользовательское поле для реквизита ||
    || [crm.requisite.userfield.update.md](./user-fields/crm-requisite-userfield-update.md) | Изменяет существующее пользовательское поле реквизита ||
    || [crm.requisite.userfield.get.md](./user-fields/crm-requisite-userfield-get.md) | Возвращает пользовательское поле реквизита по идентификатору ||
    || [crm.requisite.userfield.list.md](./user-fields/crm-requisite-userfield-list.md) | Возвращает список пользовательских полей реквизита по фильтру ||
    || [crm.requisite.userfield.delete.md](./user-fields/crm-requisite-userfield-delete.md) | Удаляет пользовательское поле реквизита ||
    |#

- События
  
   #|
    || **Событие** | **Вызывается** ||
    || [onCrmRequisiteUserFieldAdd](./events/on-crm-requisite-user-field-add.md) | При добавлении пользовательского поля ||
    || [onCrmRequisiteUserFieldUpdate](./events/on-crm-requisite-user-field-update.md) | При изменении пользовательского поля ||
    || [onCrmRequisiteUserFieldDelete](./events/on-crm-requisite-user-field-delete.md) | При удалении пользовательского поля ||
    || [onCrmRequisiteUserFieldSetEnumValues](./events/on-crm-requisite-user-field-set-enum-values.md) | При изменении набора значений пользовательского поля списочного типа ||
    |#

{% endlist %}

### Связи реквизитов с объектами CRM

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.link.register](./links/crm-requisite-link-register.md) | Регистрирует связь реквизитов с объектом ||
|| [crm.requisite.link.get](./links/crm-requisite-link-get.md) | Возвращает связь реквизитов с объектом ||
|| [crm.requisite.link.list](./links/crm-requisite-link-list.md) | Возвращает список связей реквизитов по фильтру ||
|| [crm.requisite.link.unregister](./links/crm-requisite-link-unregister.md) | Удаляет связь реквизитов с объектом ||
|| [crm.requisite.link.fields](./links/crm-requisite-link-fields.md) | Возвращает формальное описание полей связи реквизитов ||
|#

### Шаблоны реквизитов

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.preset.add](./presets/crm-requisite-preset-add.md) | Создает новый шаблон реквизитов ||
|| [crm.requisite.preset.update](./presets/crm-requisite-preset-update.md) | Изменяет шаблон реквизита ||
|| [crm.requisite.preset.countries](./presets/crm-requisite-preset-countries.md) | Возвращает возможный список стран для шаблонов реквизита ||
|| [crm.requisite.preset.get](./presets/crm-requisite-preset-get.md) | Возвращает шаблон реквизитов по идентификатору ||
|| [crm.requisite.preset.list](./presets/crm-requisite-preset-list.md) | Возвращает список шаблонов реквизитов по фильтру ||
|| [crm.requisite.preset.delete](./presets/crm-requisite-preset-delete.md) | Удаляет шаблон реквизитов ||
|| [crm.requisite.preset.fields](./presets/crm-requisite-preset-fields.md) | Возвращает формально описание полей шаблона реквизитов ||
|#

### Поля шаблона реквизитов

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.preset.field.add](./presets/fields/crm-requisite-preset-field-add.md) | Добавляет настраиваемое поле в шаблон реквизитов ||
|| [crm.requisite.preset.field.update](./presets/fields/crm-requisite-preset-field-update.md) | Изменяет настраиваемое поле в шаблоне реквизитов ||
|| [crm.requisite.preset.field.availabletoadd](./presets/fields/crm-requisite-preset-field-available-to-add.md) | Возвращает поля, доступные для добавления в указанный шаблон реквизитов ||
|| [crm.requisite.preset.field.get](./presets/fields/crm-requisite-preset-field-get.md) | Возвращает описание настраиваемого поля шаблона реквизитов по идентификатору ||
|| [crm.requisite.preset.field.list](./presets/fields/crm-requisite-preset-field-list.md) | Возвращает список всех настраиваемых полей для определенного шаблона реквизитов ||
|| [crm.requisite.preset.field.delete](./presets/fields/crm-requisite-preset-field-delete.md) | Удаляет настраиваемое поле из шаблона реквизитов ||
|| [crm.requisite.preset.field.fields](./presets/fields/crm-requisite-preset-field-fields.md) | Возвращает формально описание полей, описывающих настаиваемое поле шаблона реквизитов ||
|#


