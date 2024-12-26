# Пункт выпадающего меню верхней кнопки дизайнера роботов CRM_XXX_ROBOT_DESIGNER_TOOLBAR

> Scope: [`intranet`](../../scopes/permissions.md)

Вы можете добавлять свой пункт выпадающего меню верхней кнопки дизайнера роботов в таких объектов CRM как [лиды](../../crm/leads/index.md) и [сделки](../../crm/deals/index.md)

![Виджет в виде пункта выпадающего меню верхней кнопки дизайнера роботов](./_images/CRM_ROBOT_DESIGNER_TOOLBAR.png "Виджет в виде пункта выпадающего меню верхней кнопки дизайнера роботов")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_ROBOT_DESIGNER_TOOLBAR` | Пункт выпадающего меню верхней кнопки дизайнера роботов в [лиде](../../crm/leads/index.md) ||
|| `CRM_DEAL_ROBOT_DESIGNER_TOOLBAR` | Пункт выпадающего меню верхней кнопки дизайнера роботов в [сделке](../../crm/deals/index.md) ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

{% list tabs %}

- CRM_LEAD_ROBOT_DESIGNER_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => 2ce63de88c4a9f5843e148d6f7b7a6ed
        [AUTH_ID] => d54fba6600631fcd00005a4b00000001f0f1073f6f5fc879c485f124cc572c68a6ee17
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => c5cee16600631fcd00005a4b00000001f0f107833fc0c197d37b9b13905b691787bbdb
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_LEAD_ROBOT_DESIGNER_TOOLBAR
    )

    ```

- CRM_DEAL_ROBOT_DESIGNER_TOOLBAR

    ```php

    Array
    (
        [DOMAIN] => xxx.bitrix24.com
        [PROTOCOL] => 1
        [LANG] => en
        [APP_SID] => aa01af1bd7f74d944ab61bdc8ed4f011
        [AUTH_ID] => ec4fba6600631fcd00005a4b00000001f0f107219e88649824f5ded51f56111616561c
        [AUTH_EXPIRES] => 3600
        [REFRESH_ID] => dccee16600631fcd00005a4b00000001f0f107021a4718dc94fa53f048dac305baff48
        [member_id] => da45a03b265edd8787f8a258d793cc5d
        [status] => L
        [PLACEMENT] => CRM_DEAL_ROBOT_DESIGNER_TOOLBAR
    )

    ```

{% endlist %}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

В текущем виджете, параметр `PLACEMENT_OPTIONS` не передаётся.

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)
