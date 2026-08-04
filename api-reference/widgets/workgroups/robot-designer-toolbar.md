# Кнопка в дизайнере роботов группы SONET_GROUP_ROBOT_DESIGNER_TOOLBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet_group`](../../scopes/permissions.md)

Виджет добавляет свою кнопку в дизайнер роботов, где настраивают автоматизацию задач рабочей группы или проекта.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `SONET_GROUP_ROBOT_DESIGNER_TOOLBAR` | Кнопка в панели дизайнера роботов группы ||
|#

### Где находится в интерфейсе

Откройте задачи рабочей группы или проекта и нажмите *Роботы*. Кнопка приложения выводится справа в заголовке окна *Автоматизация задач*.

Не путайте эту точку с [`TASK_ROBOT_DESIGNER_TOOLBAR`](../task/robot-designer-toolbar.md): та относится к разделу задач и требует scope `task`.

![Кнопка в панели дизайнера роботов группы](./_images/SONET_GROUP_ROBOT_DESIGNER_TOOLBAR.png "Кнопка в панели дизайнера роботов группы")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 25e596577c2a1ddf98c7863421330527
    [AUTH_ID] => 5d56ba6600705a0700005a4b00000001f0f107d21c0babb82529a32836e165141a2010
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 4dd5e16600705a0700005a4b00000001f0f107a934a327935855b75f8c3686204e3bd5
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => sonet_group,task,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => SONET_GROUP_ROBOT_DESIGNER_TOOLBAR
    [PLACEMENT_OPTIONS] => {"GROUP_ID":"10","URI":"\/workgroups\/group\/10\/tasks\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `SONET_GROUP_ROBOT_DESIGNER_TOOLBAR` в контекст передается ключ:

- `GROUP_ID` — идентификатор рабочей группы или проекта, чью автоматизацию настраивает пользователь. По нему можно получить данные группы методом [sonet_group.get](../../sonet-group/sonet-group-get.md)

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./toolbar.md)
- [{#T}](../task/robot-designer-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
