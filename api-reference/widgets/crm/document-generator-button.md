# Пункт выпадающего меню генератора документов

> Коды встройки: **CRM_XXX_DOCUMENTGENERATOR_BUTTON**
>
> Scope: [`intranet`](../../scopes/permissions.md)
>

Вы можете добавлять свой пункт в выпадающее меню генератора документов таких объектов CRM как [лиды](../../crm/leads/), [контакты](../../crm/contacts/), [компании](../../crm/companies/), [сделки](../../crm/deals/), [счета](../../crm/outdated/invoice/) и [коммерческие предложения](../../crm/quote/).

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_DOCUMENTGENERATOR_BUTTON` | Пункт в выпадающем меню генератора документов [лидов](../../crm/leads/) ||
|| `CRM_CONTACT_DOCUMENTGENERATOR_BUTTON` | Пункт в выпадающем меню генератора документов [контактов](../../crm/contacts/) ||
|| `CRM_COMPANY_DOCUMENTGENERATOR_BUTTON` | Пункт в выпадающем меню генератора документов [компаний](../../crm/companies/) ||
|| `CRM_DEAL_DOCUMENTGENERATOR_BUTTON` | Пункт в выпадающем меню генератора документов [сделок](../../crm/deals/) ||
|| `CRM_INVOICE_DOCUMENTGENERATOR_BUTTON` | Пункт в выпадающем меню генератора документов [счетов](../../crm/outdated/invoice/) ||
|| `CRM_QUOTE_DOCUMENTGENERATOR_BUTTON` | Пункт в выпадающем меню генератора документов [коммерческих предложений](../../crm/quote/) ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- CRM_LEAD_DOCUMENTGENERATOR_BUTTON

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 459ca665c9cab4ddfe9ea5ae2a0840f1
        [AUTH_ID] => d54bba6600631fcd00005a4b00000001f0f10778a1773b649abec1feea11861a78c85a
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => c5cae16600631fcd00005a4b00000001f0f1070bb92bc9d139bcccf13fd5061e168c97
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_LEAD_DOCUMENTGENERATOR_BUTTON
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"6591"}
    )

    ```

- CRM_DEAL_DOCUMENTGENERATOR_BUTTON

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 23ab3058338edf7c4c30a52e4d0b3f94
        [AUTH_ID] => 024cba6600631fcd00005a4b00000001f0f10776117251d4c2d883c3b981273ddc1d2f
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => f2cae16600631fcd00005a4b00000001f0f1071ccf5fc07f1f6e09595a46e2689ad63b
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DEAL_DOCUMENTGENERATOR_BUTTON
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"3473"}
    )

    ```

- CRM_CONTACT_DOCUMENTGENERATOR_BUTTON

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 8610c737a7b6d9e8707e897310c92a5c
        [AUTH_ID] => 234cba6600631fcd00005a4b00000001f0f107e5d9a6b11c75b358354b7909a3cbb1d5
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 13cbe16600631fcd00005a4b00000001f0f1072808b892db51d0797e9f6ef1f47ac479
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_CONTACT_DOCUMENTGENERATOR_BUTTON
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"13037"}
    )

    ```

- CRM_COMPANY_DOCUMENTGENERATOR_BUTTON

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 6c69387b1893adfbce7b0e9dd09a4334
        [AUTH_ID] => 474cba6600631fcd00005a4b00000001f0f1075e5c6675d9cc38d0226e8d64a137f0d4
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 37cbe16600631fcd00005a4b00000001f0f107ad057bdb52baf3c9f25ebd88c351e5cb
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_COMPANY_DOCUMENTGENERATOR_BUTTON
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"2946"}
    )
        
    ```

- CRM_QUOTE_DOCUMENTGENERATOR_BUTTON

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 92520ef005add4cddf34ce7d56417cd6
        [AUTH_ID] => 734cba6600631fcd00005a4b00000001f0f10783d784554c5d20e60a70194e7fae0928
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 63cbe16600631fcd00005a4b00000001f0f107f7e3fca578b3e3b68e5be0cf70b35ccc
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_QUOTE_DOCUMENTGENERATOR_BUTTON
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"5"}
    )
    
    ```

- CRM_DYNAMIC_ХХХ_DOCUMENTGENERATOR_BUTTON

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => e704d5033456989068deea36a324b888
        [AUTH_ID] => 904cba6600631fcd00005a4b00000001f0f1072f641be14b9ac7606506e5e3ed850130
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 80cbe16600631fcd00005a4b00000001f0f107151fd45dc66ee22283e42cdf941e8436
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DYNAMIC_183_DOCUMENTGENERATOR_BUTTON
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
|| **ENTITY_ID***
[`string`](../../data-types.md) | Идентификатор объекта CRM, для которого был открыт виджет.

Может быть использован для получения дополнительной информации с помощью соответствующих методов:

- любой тип объекта [crm.item.get](../../crm/universal/crm-item-get.md) с указанием entityTypeId = '1' для лидов, '2' для сделок и [т.д.](../../crm/data-types.md#object_type)
- лид [crm.lead.get](../../crm/leads/crm-lead-get.md)
- сделка [crm.deal.get](../../crm/deals/crm-deal-get.md)
- контакт [crm.contact.get](../../crm/contacts/crm-contact-get.md)
- компания [crm.comany.get](../../crm/companies/crm-company-get.md)
- коммерческое предложение [crm.quote.get](../../crm/quote/crm-quote-get.md)

В случае встройки виджета в объект пользовательского типа, идентификатор типа можно получить из значения параметра `PLACEMENT`. В примере выше, это `183`.

||
|#

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)

