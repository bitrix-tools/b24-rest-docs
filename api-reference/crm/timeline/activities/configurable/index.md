# Конфигурируемые дела CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Конфигурируемые дела — это дела CRM, которые создает приложение. Приложение настраивает внешний вид карточки дела, блоки в таймлайне, кнопки и бейджи.

{% note warning %}

Методы `crm.activity.configurable.add`, `crm.activity.configurable.update`, `crm.activity.configurable.get` работают только в контексте [приложения](../../../../../settings/app-installation/index.md). Вызов через входящий вебхук вернет ошибку `ERROR_WRONG_CONTEXT`.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Подготовьте приложение, из контекста которого будут вызываться методы, и получите токен OAuth
2. Создайте конфигурируемое дело методом [crm.activity.configurable.add](./crm-activity-configurable-add.md). Если нужен собственный тип дела, сначала зарегистрируйте его методом [crm.activity.type.add](../types/crm-activity-type-add.md) с полем `IS_CONFIGURABLE_TYPE = Y`
3. Обновите структуру или данные дела методом [crm.activity.configurable.update](./crm-activity-configurable-update.md)
4. Получите дело по идентификатору методом [crm.activity.configurable.get](./crm-activity-configurable-get.md)
5. Найдите конфигурируемые дела методом [crm.activity.list](../activity-base/crm-activity-list.md) с фильтром `PROVIDER_ID = CONFIGURABLE_REST_APP`
6. Удалите дело методом [crm.activity.delete](../activity-base/crm-activity-delete.md)

## Связь с другими разделами

**Пользовательские типы дел.** Методы [crm.activity.type.add](../types/crm-activity-type-add.md), [crm.activity.type.list](../types/crm-activity-type-list.md) и [crm.activity.type.delete](../types/crm-activity-type-delete.md) управляют типами, которые можно передать в поле `typeId` конфигурируемого дела. Для `typeId`, отличного от `CONFIGURABLE`, тип должен быть создан тем же приложением с `IS_CONFIGURABLE_TYPE = Y`.

**Структура карточки.** Раздел [Структура конфигурируемого дела](./structure/layout.md) описывает `layout`: иконку, заголовок, тело, футер и действия в карточке.

**Бейджи.** Раздел [Бейджи конфигурируемых дел](./badges/index.md) описывает коды бейджей, которые можно передать в поле `badgeCode`.

## Дополнительно

- [{#T}](./structure/layout.md)
- [{#T}](./badges/index.md)

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.activity.configurable.add](./crm-activity-configurable-add.md) | Добавляет новое конфигурируемое дело в таймлайн ||
|| [crm.activity.configurable.update](./crm-activity-configurable-update.md) | Обновляет конфигурируемое дело ||
|| [crm.activity.configurable.get](./crm-activity-configurable-get.md) | Получает информацию о деле ||
|| [crm.activity.delete](../activity-base/crm-activity-delete.md) | Удаляет конфигурируемое дело по идентификатору ||
|| [crm.activity.list](../activity-base/crm-activity-list.md) | Получает список всех конфигурируемых дел для элемента CRM с фильтром по `PROVIDER_ID` = `CONFIGURABLE_REST_APP` ||
|#
