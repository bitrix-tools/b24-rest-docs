# Конфигурируемые дела CRM: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Конфигурируемые дела — это дела CRM, которые создает приложение. Приложение настраивает внешний вид записи в таймлайне, ее кнопки и бейджи. Тип такого дела по умолчанию — `CONFIGURABLE`.

{% note info "" %}

Методы `crm.activity.configurable.add` и `crm.activity.configurable.update` работают только в контексте [приложения](../../../../../settings/app-installation/index.md). Вызов через входящий вебхук вернет ошибку `ERROR_WRONG_CONTEXT`. Обновить дело может только то приложение, которое его создало, — иначе метод вернет ошибку `ERROR_WRONG_APPLICATION`.

Метод `crm.activity.configurable.get` и методы бейджей не требуют контекста приложения.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)

## Как начать работу

1. Подготовьте приложение, из контекста которого будут вызываться методы, и получите токен OAuth.
2. Зарегистрируйте собственный тип дела методом [crm.activity.type.add](../types/crm-activity-type-add.md) с полем `IS_CONFIGURABLE_TYPE = Y`, если тип по умолчанию не подходит.
3. Зарегистрируйте бейдж методом [crm.activity.badge.add](./badges/crm-activity-badge-add.md), если делу нужен значок на канбане. Код бейджа передают в поле `badgeCode` дела.
4. Создайте конфигурируемое дело методом [crm.activity.configurable.add](./crm-activity-configurable-add.md). В ответе придет идентификатор дела — он понадобится дальше.
5. Обработайте нажатия на кнопки, теги и пункты меню. [Действие](./structure/action.md) с типом `restEvent` присылает приложению событие `onCrmTimelineItemAction`, на которое подписываются методом [event.bind](../../../../events/event-bind.md).
6. Обновите структуру или данные дела методом [crm.activity.configurable.update](./crm-activity-configurable-update.md). Этим же методом снимают блокировку записи после нажатия.
7. Получите дело по идентификатору методом [crm.activity.configurable.get](./crm-activity-configurable-get.md): он вернет поля дела и структуру `layout`.
8. Найдите конфигурируемые дела методом [crm.activity.list](../activity-base/crm-activity-list.md) с фильтром `PROVIDER_ID = CONFIGURABLE_REST_APP`.
9. Удалите дело методом [crm.activity.delete](../activity-base/crm-activity-delete.md).

## Связь с другими объектами

Конфигурируемое дело опирается на четыре соседних объекта: пользовательские типы дел, структуру записи, бейджи и общие иконки таймлайна.

**Пользовательские типы дел.** Методы [crm.activity.type.add](../types/crm-activity-type-add.md), [crm.activity.type.list](../types/crm-activity-type-list.md) и [crm.activity.type.delete](../types/crm-activity-type-delete.md) управляют типами, которые можно передать в поле `typeId` конфигурируемого дела. Для `typeId`, отличного от `CONFIGURABLE`, тип должен быть создан тем же приложением с `IS_CONFIGURABLE_TYPE = Y`.

**Структура записи.** Раздел [Структура конфигурируемого дела](./structure/layout.md) описывает `layout`: иконку, заголовок, тело и нижнюю часть. Реакцию на нажатия задает [ActionDto](./structure/action.md). Там же перечислены [ограничения структуры](./structure/layout.md#limits) и коды ошибок валидации, а готовые конфигурации собраны в [примерах](./structure/examples.md).

**Бейджи.** Раздел [Бейджи конфигурируемых дел](./badges/index.md) описывает значки на канбане и коды, которые передают в поле `badgeCode` дела.

**Иконки и логотипы.** Коды для полей `icon` и `body.logo` возвращают методы [crm.timeline.icon.list](../../logmessage/icons/crm-timeline-icon-list.md) и [crm.timeline.logo.list](../../logmessage/logo/crm-timeline-logo-list.md). Свои изображения добавляют методы [crm.timeline.icon.add](../../logmessage/icons/crm-timeline-icon-add.md) и [crm.timeline.logo.add](../../logmessage/logo/crm-timeline-logo-add.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода — дела доступны пользователю с правами на элемент CRM, добавление и удаление бейджей только администратору CRM

### Конфигурируемое дело

#|
|| **Метод** | **Описание** ||
|| [crm.activity.configurable.add](./crm-activity-configurable-add.md) | Добавляет новое конфигурируемое дело в таймлайн ||
|| [crm.activity.configurable.update](./crm-activity-configurable-update.md) | Обновляет конфигурируемое дело ||
|| [crm.activity.configurable.get](./crm-activity-configurable-get.md) | Получает конфигурируемое дело по идентификатору ||
|| [crm.activity.list](../activity-base/crm-activity-list.md) | Получает список всех конфигурируемых дел для элемента CRM с фильтром по `PROVIDER_ID` = `CONFIGURABLE_REST_APP` ||
|| [crm.activity.delete](../activity-base/crm-activity-delete.md) | Удаляет конфигурируемое дело по идентификатору ||
|#

### Бейджи

Подробности — в разделе [Бейджи конфигурируемых дел](./badges/index.md).

#|
|| **Метод** | **Описание** ||
|| [crm.activity.badge.add](./badges/crm-activity-badge-add.md) | Добавляет новый бейдж ||
|| [crm.activity.badge.get](./badges/crm-activity-badge-get.md) | Получает информацию о бейдже ||
|| [crm.activity.badge.list](./badges/crm-activity-badge-list.md) | Получает список бейджей ||
|| [crm.activity.badge.delete](./badges/crm-activity-badge-delete.md) | Удаляет бейдж по коду ||
|#

### События

#|
|| **Событие** | **Вызывается** ||
|| [onCrmTimelineItemAction](./structure/action.md#sobytie) | При нажатии на элемент записи с действием типа `restEvent` — заголовок, тег, логотип, ссылку, кнопку или пункт меню. Приходит только приложению, задавшему действие ||
|#
