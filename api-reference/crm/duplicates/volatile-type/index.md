# Настройки поиска дубликатов по любым полям: обзор методов

По умолчанию Битрикс24 ищет дубликаты по фиксированному набору полей: Ф.И.О., название компании, телефон, адрес электронной почты и реквизиты. Методы `crm.duplicate.volatileType.*` расширяют этот набор — в поиск можно добавить любое стандартное или пользовательское поле лида, контакта или компании.

Добавленное поле появляется в настройках поиска дубликатов в интерфейсе Битрикс24 у всех сотрудников. На поиск методом [crm.duplicate.findbycomm](../crm-duplicate-find-by-comm.md) эти настройки не влияют: он работает только по телефону и адресу электронной почты. Как устроена работа с дубликатами целиком, описано в разделе [Поиск и обработка дубликатов в CRM](../index.md).

Например, можно добавить в поиск ИНН компании — тогда две компании с одинаковым ИНН Битрикс24 покажет как дубликаты.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Поиск и обработка дубликатов в Битрикс24](https://helpdesk.bitrix24.ru/open/10649014/)

## Как настроить поиск по дополнительным полям

1. Получите список доступных полей методом [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md) — в ответе придут пары `entityTypeId` и `fieldCode`
2. Проверьте, какие поля уже подключены, методом [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)
3. Подключите нужное поле методом [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md), передав `entityTypeId` и `fieldCode` из первого шага
4. Отключите поле методом [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md), передав `id` записи из [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)

## Идентификаторы и коды полей

**entityTypeId.** Задает тип объекта CRM. Дубликаты ищутся только по трем объектам:

#|
|| **Тип объекта CRM** | **entityTypeId** ||
|| Лид | `1` ||
|| Контакт | `3` ||
|| Компания | `4` ||
|#

**fieldCode.** Символьный код поля: `TITLE` для названия, `ADDRESS` для адреса, `UF_CRM_1750854801` для пользовательского поля. У полей реквизитов код записывают через точку, например `RQ.RU.NAME`. Коды не конструируют вручную — их берут из ответа [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md) для нужного `entityTypeId`. Если передать код, которого нет в списке доступных, [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) вернет ошибку `FIELD_NOT_FOUND`.

**id.** Идентификатор записи о подключенном поле. Его возвращают [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) и [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md), и только он подходит для отключения поля.

## Что важно учитывать

- Подключить можно не более семи полей суммарно для лидов, контактов и компаний. При попытке подключить восьмое [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) вернет ошибку `MAX_TYPES_COUNT_EXCEEDED`
- Повторный вызов [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) для уже подключенного поля не создает новую запись — метод вернет `id` существующей
- После подключения поля индекс дубликатов пересчитывается фоновым агентом, поэтому новые совпадения появятся в интерфейсе не сразу

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор Битрикс24 или администратор CRM

#|
|| **Метод** | **Описание** ||
|| [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md) | Возвращает список стандартных и пользовательских полей для поиска дубликатов ||
|| [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md) | Возвращает список дополнительных полей, уже подключенных к поиску дубликатов ||
|| [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) | Добавляет поле в настройки поиска дубликатов ||
|| [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md) | Удаляет поле из настроек поиска дубликатов ||
|#
