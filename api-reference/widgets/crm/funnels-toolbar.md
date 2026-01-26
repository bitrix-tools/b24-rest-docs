# Пункт выпадающего меню в туннелях продаж CRM_FUNNELS_TOOLBAR

> Scope: [`intranet`](../../scopes/permissions.md)

Вы можете добавить свой пункт в тулбаре туннелей продаж.

![Виджет в виде пункта в тулбаре туннелей продаж](./_images/CRM_FUNNELS_TOOLBAR.png "Виджет в виде пункта в тулбаре туннелей продаж")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_FUNNELS_TOOLBAR` | Пункт в тулбаре туннелей продаж ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => en
    [APP_SID] => 4c8dff86744e675bbb861d69003fbbe9
    [AUTH_ID] => 574fba6600631fcd00005a4b00000001f0f107066649fd06e706777e462385fca29ac6
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 47cee16600631fcd00005a4b00000001f0f107f2599a4c4602cfa840b6f9765e5f30c7
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CRM_FUNNELS_TOOLBAR
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

В текущем виджете параметр `PLACEMENT_OPTIONS` не передается.

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)
