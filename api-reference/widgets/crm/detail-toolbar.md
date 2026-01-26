# Пункт выпадающего меню верхней кнопки карточки элемента CRM_XXX_DETAIL_TOOLBAR, CRM_DYNAMIC_XXX_DETAIL_TOOLBAR

> Scope: [`crm`](../../scopes/permissions.md)

Вы можете добавить свой пункт выпадающего меню в верхней кнопки карточки объектов CRM: [лиды](../../crm/leads/index.md), [контакты](../../crm/contacts/index.md), [компании](../../crm/companies/index.md), [сделки](../../crm/deals/index.md), [коммерческие предложения](../../crm/quote/index.md), [новые счета](../../crm/universal/invoice.md), [пользовательские типы объектов](../../crm/universal/index.md).

![Виджет в виде пункта выпадающего меню верхней кнопки карточки сделки](./_images/CRM_DEAL_DETAIL_TOOLBAR.png "Виджет в виде пункта выпадающего меню верхней кнопки карточки сделки")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки [лида](../../crm/leads/index.md) ||
|| `CRM_DEAL_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки [сделки](../../crm/deals/index.md) ||
|| `CRM_CONTACT_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки [контакта](../../crm/contacts/index.md) ||
|| `CRM_COMPANY_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки [компании](../../crm/companies/index.md) ||
|| `CRM_QUOTE_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки [коммерческого предложения](../../crm/quote/index.md) ||
|| `CRM_SMART_INVOICE_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки [счетов](../../crm/universal/invoice.md) ||
|| `CRM_DYNAMIC_XXX_DETAIL_TOOLBAR` | Пункт выпадающего меню верхней кнопки карточки пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_DETAIL_ACTIVITY` ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- CRM_LEAD_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 0d43bf11edd7e3c050ea8b0577eb6a87
        [AUTH_ID] => 18d3a06600631fcd00005a4b00000001f0f1077b7ce52f79713d82c4bc9960bcf4b598
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 0852c86600631fcd00005a4b00000001f0f107ce505dcd9306e0eb55ad77df1d2b2f16
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_LEAD_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ID":"6591"}
    )

    ```

- CRM_DEAL_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 88fe421c3ce39985adb9d220cc965e61
        [AUTH_ID] => 31d3a06600631fcd00005a4b00000001f0f10791c1fc87943e62dc8a28210b56b2af87
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 2152c86600631fcd00005a4b00000001f0f10780aada857e86212d3a73281c74525ccd
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DEAL_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ID":"3473"}
    )

    ```

- CRM_CONTACT_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 8bc3acce3a150e11f48469e4a37384af
        [AUTH_ID] => 44d3a06600631fcd00005a4b00000001f0f10784af91cb9aeebddf2b1822776d4e7a9e
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 3452c86600631fcd00005a4b00000001f0f1078f707dfdc8c4b9830929c565294f37b0
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_CONTACT_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ID":"13037"}
    )

    ```

- CRM_COMPANY_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 75ca32f216adb32ca5a16c928d9a6fd2
        [AUTH_ID] => 5bd3a06600631fcd00005a4b00000001f0f107b39291622bfbbc6a0c75eeadb4ef65ea
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 4b52c86600631fcd00005a4b00000001f0f107ac1cfa783b59df28b087eead8d49b869
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_COMPANY_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ID":"2946"}
    )
        
    ```

- CRM_QUOTE_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 7c10e9dd04fc0ee9a2ca4981b708f322
        [AUTH_ID] => 85d3a06600631fcd00005a4b00000001f0f107f1285d38d8f287a126f7fd9d42ab87fb
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 7552c86600631fcd00005a4b00000001f0f1072f206ef3499d9fb87f5d9a575a78186a
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_QUOTE_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"5"}
    )
    
    ```

- CRM_SMART_INVOICE_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 0913971fc9a85afea6263cc6dcff04bd
        [AUTH_ID] => 9fc7ca670076a4b8006f518000000001201c07e51994c33447f80190049359e6d29a0c
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 8f46f2670076a4b8006f518000000001201c078f877b9e542e35eeeca4c284d2fd976a
        [member_id] => e8857f161a1a8288f312b6cc6ad67995
        [status] => L
        [PLACEMENT] => CRM_SMART_INVOICE_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"32"}
    )
    
    ```

- CRM_DYNAMIC_XXX_DETAIL_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 220448997c6d7f606bd25c1c1896456e
        [AUTH_ID] => 9ed3a06600631fcd00005a4b00000001f0f10797d8322191958e46f791643a1f7cb06f
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 8e52c86600631fcd00005a4b00000001f0f10734c4bc5b1f7ad2eca54b546ef12a2bf9
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DYNAMIC_183_DETAIL_TOOLBAR
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"3"}
    )
    
    ```

{% endlist %}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значением `PLACEMENT_OPTIONS` является JSON-строка, содержащая массив из одного и более ключей.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **ID*** или **ENTITY_ID***
[`string`](../../data-types.md) | Идентификатор объекта CRM, для которого был открыт виджет.

Может быть использован для получения дополнительной информации с помощью соответствующих методов:

- любой тип объекта [crm.item.get](../../crm/universal/crm-item-get.md) с указанием entityTypeId = '1' для лидов, '2' для сделок и [т.д.](../../crm/data-types.md#object_type)
- лид [crm.lead.get](../../crm/leads/crm-lead-get.md)
- сделка [crm.deal.get](../../crm/deals/crm-deal-get.md)
- контакт [crm.contact.get](../../crm/contacts/crm-contact-get.md)
- компания [crm.company.get](../../crm/companies/crm-company-get.md)
- коммерческое предложение [crm.quote.get](../../crm/quote/crm-quote-get.md)

В случае встройки виджета в объект пользовательского типа, идентификатор типа можно получить из значения параметра `PLACEMENT`. В примере выше — `183`

||
|#

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)