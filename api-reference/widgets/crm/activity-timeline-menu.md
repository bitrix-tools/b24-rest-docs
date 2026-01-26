# Пункт контекстного меню дела в карточке элемента CRM_XXX_ACTIVITY_TIMELINE_MENU, CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU

> Scope: [`crm`](../../scopes/permissions.md)

Вы можете добавить свой пункт контекстного меню дела в карточке объектов CRM: [лиды](../../crm/leads/index.md), [сделки](../../crm/deals/index.md), [коммерческие предложения](../../crm/quote/index.md), [новые счета](../../crm/universal/invoice.md), [пользовательские типы объектов](../../crm/universal/index.md).

![Виджет в виде пункта контекстного меню дела в лиде](./_images/CRM__ACTIVITY_TIMELINE_MENU.png "Виджет в виде пункта контекстного меню дела в лиде")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню дела в [лиде](../../crm/leads/index.md) ||
|| `CRM_DEAL_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню дела в [сделке](../../crm/deals/index.md) ||
|| `CRM_QUOTE_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню дела в [коммерческом предложении](../../crm/quote/index.md) ||
|| `CRM_SMART_INVOICE_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню дела в [новых счетах](../../crm/universal/invoice.md) ||
|| `CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU` |  Пункт контекстного меню дела в пользовательских типах объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_LIST_MENU` ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- CRM_LEAD_ACTIVITY_TIMELINE_MENU

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => e6a18a6abe41ba3bd944897d8dc5186d
        [AUTH_ID] => 45d4a06600631fcd00005a4b00000001f0f10767246d86a580fae119d2a2601665eb33
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 3553c86600631fcd00005a4b00000001f0f1074bdbcddd7232d3413e2b9ff1ee91dc96
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_LEAD_ACTIVITY_TIMELINE_MENU
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"6591","TYPE_ID":"1","TYPE_CATEGORY_ID":"6","ASSOCIATED_ENTITY_ID":"1523","ASSOCIATED_ENTITY_TYPE_ID":"6","TIMELINE_ITEM_ID":"29937"}
    )

    ```

- CRM_DEAL_ACTIVITY_TIMELINE_MENU

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 71cc8c707a630542d5e2cf7435bf88c4
        [AUTH_ID] => 87d4a06600631fcd00005a4b00000001f0f10758d4aabbf27967a9af747de646c5447c
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 7753c86600631fcd00005a4b00000001f0f1078ec2dd6e94d5dc8f1aebf6524a86ee78
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DEAL_ACTIVITY_TIMELINE_MENU
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"3463","ASSOCIATED_ENTITY_ID":"1517","ASSOCIATED_ENTITY_TYPE_ID":"6"}
    )

    ```

- CRM_QUOTE_ACTIVITY_TIMELINE_MENU

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => a63d2f88ffd62d6a300aaea7bf5ebf32
        [AUTH_ID] => 757ba26600631fcd00005a4b00000001f0f107b07473a33f9378bf912d602ecb056119
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 65fac96600631fcd00005a4b00000001f0f10726b77ceb5a0aaa50e143b1086fa03324
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_QUOTE_ACTIVITY_TIMELINE_MENU
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"5","ASSOCIATED_ENTITY_ID":"1529","ASSOCIATED_ENTITY_TYPE_ID":"6"}
    )
    
    ```

- CRM_SMART_INVOICE_ACTIVITY_TIMELINE_MENU

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => a2032d292bcc91a22022db330433a933
        [AUTH_ID] => ee2ad0670076a4b8006f518000000001201c07383646b2116914be86aecd467ade5a3e
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => dea9f7670076a4b8006f518000000001201c07e183b89e2613ce88ba7c56f8f80f19d9
        [member_id] => e8857f161a1a8288f312b6cc6ad67995
        [status] => L
        [PLACEMENT] => CRM_SMART_INVOICE_ACTIVITY_TIMELINE_MENU
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"32","ASSOCIATED_ENTITY_ID":"238","ASSOCIATED_ENTITY_TYPE_ID":"6"}
    )
    
    ```

- CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => d659900f7e966c5d135d349b7b7f3c0d
        [AUTH_ID] => 4a7ba26600631fcd00005a4b00000001f0f1071e1f009645e93bf550bc02ac4f8fdcf6
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => 3afac96600631fcd00005a4b00000001f0f107adfab4bb11ae71eaf061319f2b4b2f87
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DYNAMIC_183_ACTIVITY_TIMELINE_MENU
        [PLACEMENT_OPTIONS] => {"ENTITY_ID":"3","ASSOCIATED_ENTITY_ID":"1527","ASSOCIATED_ENTITY_TYPE_ID":"6"}
    )
    
    ```

{% endlist %}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

#### PLACEMENT_OPTIONS

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
- коммерческое предложение [crm.quote.get](../../crm/quote/crm-quote-get.md)

В случае встройки виджета в объект пользовательского типа, идентификатор типа можно получить из значения параметра `PLACEMENT`. В примере выше, это `183`

||
|| **ASSOCIATED_ENTITY_ID***
[`string`](../../data-types.md) | Идентификатор дела CRM, для которого был открыт виджет.

Может быть использован для получения дополнительной информации с помощью метода [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md)

||
|| **ASSOCIATED_ENTITY_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа сущности дела (Activity)

||
|| **TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа события

||
|| **TYPE_CATEGORY_ID***
[`string`](../../data-types.md) | Идентификатор типа записи таймлайна

||
|| **TIMELINE_ITEM_ID***
[`string`](../../data-types.md) | Идентификатор записи таймлайна

||
|#

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)
