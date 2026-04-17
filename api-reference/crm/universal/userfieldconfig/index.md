# Настройки пользовательских полей: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Методы раздела позволяют управлять пользовательскими полями: получать доступные типы полей, создавать поле для нужного объекта, читать его настройки, обновлять параметры и удалять поле.

Технически обработчик этих методов находится в модуле `main`, но в REST они доступны как отдельная группа `userfieldconfig.*` и используют scope `userfieldconfig`. В AJAX тот же обработчик вызывается как `main.userfieldconfig.*`.

{% note info "" %}

Во всех методах `userfieldconfig.*` передается `moduleId`, и по нему определяется модульный контекст и права доступа к полям. Поэтому приложению нужен не только scope `userfieldconfig`, но и scope модуля из `moduleId`. Например, для изменения полей в модуле Роботизация бизнеса нужны scope `userfieldconfig` и `rpa`.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

## Как начать работу

1. Определите `moduleId` и формат `entityId` для нужного объекта.
2. Получите доступные типы полей через [userfieldconfig.getTypes](./userfieldconfig-get-types.md).
3. Создайте поле методом [userfieldconfig.add](./userfieldconfig-add.md).
4. Получите список настроек пользовательских полей через [userfieldconfig.list](./userfieldconfig-list.md) или настройки конкретного поля через [userfieldconfig.get](./userfieldconfig-get.md).
5. При необходимости измените или удалите поле методами [userfieldconfig.update](./userfieldconfig-update.md) и [userfieldconfig.delete](./userfieldconfig-delete.md).

## Связь с другими объектами

**CRM.** Связь полей с объектами CRM задается парой `moduleId=crm` и `entityId` конкретного CRM-объекта. Для смарт-процессов получите `ID` методом [crm.type.list](../user-defined-object-types/crm-type-list.md), затем передайте `entityId`. Для остальных объектов, например лидов, контактов, компаний, используйте фиксированные идентификаторы.

**RPA.** При работе с процессами Роботизации бизнеса используйте `moduleId=rpa`. В `entityId` передавайте идентификатор процесса.

{% note info "" %}

Методы `userfieldconfig.*` работают и в других модулях, если модуль поддерживает пользовательские поля. Например, для складского учета используется `moduleId=catalog` и формат `entityId` для документов склада. Подробности смотрите в разделе [Пользовательские поля документов складского учета](../../../catalog/userfield-document/index.md).

{% endnote %}

## Идентификаторы entityId {#entity-id}

Принадлежность поля к объекту задается значением `entityId`.

### CRM с фиксированными идентификаторами

- `CRM_LEAD` — лид
- `CRM_CONTACT` — контакт
- `CRM_COMPANY` — компания
- `CRM_DEAL` — сделка
- `CRM_QUOTE` — предложение
- `CRM_INVOICE` — счет
- `CRM_SMART_INVOICE` — новый счет
- `CRM_REQUISITE` — реквизит
- `CRM_SMART_DOCUMENT` — документ CRM
- `CRM_SMART_B2E_DOC` — документ КЭДО

### CRM смарт-процессы

Для смарт-процесса используется формат `CRM_{ID}`, где `ID` — идентификатор смарт-процесса.

{% note tip "Частые кейсы и сценарии" %}

- [Как создать пользовательское поле в смарт-процессе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)

{% endnote %}

### RPA

В модуле `rpa` используется формат `RPA_{ID}`, где `ID` — идентификатор процесса.

## Обзор методов {#all-methods}

> Scope: [`userfieldconfig`](../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../scopes/permissions.md))
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [userfieldconfig.add](./userfieldconfig-add.md) | Создает пользовательское поле ||
|| [userfieldconfig.update](./userfieldconfig-update.md) | Обновляет настройки пользовательского поля ||
|| [userfieldconfig.get](./userfieldconfig-get.md) | Получает настройки пользовательского поля по идентификатору ||
|| [userfieldconfig.list](./userfieldconfig-list.md) | Получает список настроек пользовательских полей ||
|| [userfieldconfig.delete](./userfieldconfig-delete.md) | Удаляет пользовательское поле ||
|| [userfieldconfig.getTypes](./userfieldconfig-get-types.md) | Получает доступные типы пользовательских полей для модуля ||
|#
