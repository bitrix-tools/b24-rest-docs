# Пункт левого меню CRM-аналитики CRM_ANALYTICS_MENU

> Scope: [`crm`](../../scopes/permissions.md)

Вы можете добавлять свой пункт в списке приложений CRM-аналитики.

![Виджет в виде пункта списка приложений CRM-аналитики](./_images/CRM_ANALYTICS_MENU.png "Виджет в виде пункта списка приложений CRM-аналитики")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_ANALYTICS_MENU` | Пункт в списке приложений CRM-аналитики ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => en
    [APP_SID] => 1d421409a6c74c6f917ecd29e5ec3a86
    [AUTH_ID] => 7b4eba6600631fcd00005a4b00000001f0f10785092f421ae959432ff27233c97c2226
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 6bcde16600631fcd00005a4b00000001f0f107338065a0ff687e880e437a8ec7ec6919
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CRM_ANALYTICS_MENU
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
