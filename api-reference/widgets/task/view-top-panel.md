# Ссылка в верхней части карточки задачи TASK_VIEW_TOP_PANEL

> Scope: [`task`](../../scopes/permissions.md)

Вы можете добавлять свой пункт в верхней части карточки задачи.

![Виджет в виде пункта в верхней части карточки задачи](./_images//TASK_VIEW_TOP_PANEL.png "Виджет в виде пункта в верхней части карточки задачи")

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `TASK_VIEW_TOP_PANEL` | Пункт в верхней части карточки задачи ||
|#

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => en
    [APP_SID] => dac3aa71afd1a1fd8bef05a282dd0b20
    [AUTH_ID] => 3153ba6600705a0700005a4b00000001f0f107fd2c2625abb62bad95fe9b37a0d1fbb6
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 21d2e16600705a0700005a4b00000001f0f10707ca46d62b79fcd8d19a8c614e621226
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => TASK_VIEW_TOP_PANEL
    [PLACEMENT_OPTIONS] => {"TASK_ID":"286"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значением `PLACEMENT_OPTIONS` является JSON-строка, содержащая массив из одного и более ключей.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **TASK_ID***
[`string`](../../data-types.md) | Идентификатор задачи, для которой был открыт виджет.

Может быть использован для получения дополнительной информации с помощью метода [tasks.task.get](../../tasks/tasks-task-get.md).

||
|#

## Продолжите изучение

- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../ui-interaction/crm-card.md)
- [{#T}](../../interactivity/index.md)
- [{#T}](../open-application.md)
- [{#T}](../open-path.md)
