# Вкладка в карточке звонка CALL_CARD

> Scope: [`telephony`](../../scopes/permissions.md)

Вы можете добавлять свой пункт во вкладке карточки звонка.

![Виджет в виде пункта во вкладке карточки звонка](./_images/CALL_CARD.png "Виджет в виде пункта во вкладке карточки звонка")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CALL_CARD` | Пункт во вкладке карточки звонка ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => en
    [APP_SID] => 588b8a98e848778a4ffb38fbcf70f2b9
    [AUTH_ID] => 4172bb6600705a0700005a4b00000001f0f107c42ca5bd5f61030c5d9c3e4d60d11b5a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 31f1e26600705a0700005a4b00000001f0f107b1918506d8a2ed9ecf76e8fdac962471
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CALL_CARD
    [PLACEMENT_OPTIONS] => {"CALL_ID":"externalCall.c3ee67f1a63f6e6117c230ab59cc49ea.1723556778","PHONE_NUMBER":"555555","LINE_NUMBER":"","LINE_NAME":"","CRM_ENTITY_TYPE":"","CRM_ENTITY_ID":"0","CRM_ACTIVITY_ID":"undefined","CALL_DIRECTION":"incoming","CALL_STATE":"connected","CALL_LIST_MODE":"false"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значением `PLACEMENT_OPTIONS` является JSON-строка, содержащая массив из одного и более ключей.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **CALL_ID***
[`string`](../../data-types.md) | Идентификатор звонка, во время которого был открыт виджет.

||
|| **PHONE_NUMBER***
[`string`](../../data-types.md) | Номер телефона клиента, с которым происходит разговор

||
|| **LINE_NUMBER**
[`string`](../../data-types.md) | Номер телефона компании, который используется для разговора с клиентом.

||
|| **LINE_NAME**
[`string`](../../data-types.md) | Название телефонной линии компании, который используется для разговора с клиентом.

Линии добавляются приложениями для интеграции телефоний с помощью метода [telephony.externalLine.add](../../telephony/telephony-external-line-add.md) и используются для удобства пользователя в сквозной аналитике.

||
|| **CRM_ENTITY_TYPE**
[`integer`](../../data-types.md) | [Тип элемента](../../crm/data-types.md#object_type) CRM, к которому привязан текущий звонок.

Зная тип и идентификатор элемента CRM (указывается в параметре `CRM_ENTITY_ID`), можно получать информацию об элементе.

||
|| **CRM_ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор элемента CRM, к которому привязан текущий звонок.

Зная тип (указан в параметре `CRM_ENTITY_TYPE`) и идентификатор элемента CRM (указывается в параметре `CRM_ENTITY_ID`), можно получать информацию об элементе с помощью соответствующих методов:

- любой тип объекта [crm.item.get](../../crm/universal/crm-item-get.md) с указанием entityTypeId = '1' для лидов, '2' для сделок и [т.д.](../../crm/data-types.md#object_type)
- лид [crm.lead.get](../../crm/leads/crm-lead-get.md)
- сделка [crm.deal.get](../../crm/deals/crm-deal-get.md)
- контакт [crm.contact.get](../../crm/contacts/crm-contact-get.md)
- компания [crm.comany.get](../../crm/companies/crm-company-get.md)
- коммерческое предложение [crm.quote.get](../../crm/quote/crm-quote-get.md)

||
|| **CRM_ACTIVITY_ID**
[`string`](../../data-types.md) | Идентификатор [дела CRM](../../crm/timeline/activities/index.md), связанного с текущим звонком.

Может быть использован для получения дополнительной информации с помощью метода [user.get](../../user/user-get.md).

||
|| **CALL_DIRECTION***
[`string`](../../data-types.md) | Определяет тип звонка. Может принимать значения:

- 'incoming', входящий звонок;
- 'outcoming' исходящий звонок

||
|| **CALL_STATE**
[`string`](../../data-types.md) | Определяет состояние звонка. Может принимать значения:

- 'connected', активный звонок;

Остальные возможные значения будут опубликованы позже

||
|| **CALL_LIST_MODE**
[`string`](../../data-types.md) | Указывает, совершается ли звонок в рамках [обзвона](https://helpdesk.bitrix24.ru/open/17520342/) или нет.

Может принимать следующие значения:

- `False`, звонок не является частью обзвона;
- `True`, звонок совершается в рамках обзвона

||
|#

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)
