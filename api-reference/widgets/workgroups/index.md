# Пункт меню группы SONET_GROUP_DETAIL_TAB

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet_group`](../../scopes/permissions.md)

Виджет добавляет свой пункт в меню рабочей группы или проекта.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `SONET_GROUP_DETAIL_TAB` | Пункт меню рабочей группы или проекта ||
|#

### Где находится в интерфейсе

Место пункта зависит от версии интерфейса. Классический вид сейчас работает в большинстве Битрикс24, новый вид «Проекты AI» включается постепенно.

В классическом интерфейсе откройте рабочую группу и нажмите *Еще* в ряду вкладок группы. Пункт приложения выводится в конце списка.

В интерфейсе «Проекты AI» откройте проект, нажмите *•••* в карточке проекта и выберите *Приложения*. На скриншоте показан этот вариант.

![Пункт меню рабочей группы или проекта](./_images/SONET_GROUP_DETAIL_TAB.png "Пункт меню рабочей группы или проекта")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 3c900e588b941b81eef07608e4253159
    [AUTH_ID] => 1a55ba6600705a0700005a4b00000001f0f107db29f044c6ff24e984d378967134de83
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 0ad4e16600705a0700005a4b00000001f0f10731fce9fa3219163d545a088b217cc2d4
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => sonet_group,task,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => SONET_GROUP_DETAIL_TAB
    [PLACEMENT_OPTIONS] => {"GROUP_ID":"10","URI":"\/workgroups\/group\/10\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `SONET_GROUP_DETAIL_TAB` в контекст передается ключ:

- `GROUP_ID` — идентификатор рабочей группы или проекта, из которого открыт виджет. По нему можно получить данные группы методом [sonet_group.get](../../sonet-group/sonet-group-get.md)

## Продолжите изучение

- [{#T}](./toolbar.md)
- [{#T}](./robot-designer-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
