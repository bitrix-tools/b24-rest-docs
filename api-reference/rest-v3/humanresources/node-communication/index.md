# Коммуникации отделов и команд: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коммуникации отделов и команд связывают элемент структуры компании с чатами, каналами и коллабами. Методы `humanresources.node.communication.*` помогают получить текущие связи, привязать существующие коммуникации, отвязать их или создать коммуникацию по умолчанию.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как добавить отдел в чат, канал или коллабу в Битрикс24](https://helpdesk.bitrix24.ru/open/24946138/)

## Как начать работу

1. Получите `id` отдела или команды методом [humanresources.node.list](../node/humanresources-node-list.md)
2. Проверьте связанные чаты, каналы и коллабы методом [humanresources.node.communication.list](./humanresources-node-communication-list.md)
3. Измените связи методом [humanresources.node.communication.edit](./humanresources-node-communication-edit.md): передайте тип коммуникации, идентификаторы для привязки или список для удаления

## Ограничения раздела

- Доступ к просмотру и изменению коммуникаций зависит от прав текущего пользователя на отделы и команды

## Типы коммуникаций

#|
|| **Тип** | **Описание** ||
|| `CHAT` | Чат, связанный с отделом или командой ||
|| `CHANNEL` | Канал, связанный с отделом или командой ||
|| `COLLAB` | Коллаб, связанный с отделом или командой ||
|#

## Связь с другими объектами

**Отделы и команды.** Во всех методах используется идентификатор отдела или команды. Его можно получить методом [humanresources.node.list](../node/humanresources-node-list.md) или проверить методом [humanresources.node.get](../node/humanresources-node-get.md).

**Чаты и каналы.** Метод [humanresources.node.communication.edit](./humanresources-node-communication-edit.md) принимает идентификаторы существующих чатов или каналов в `ids` и `removeIds`. Идентификаторы можно получить методом [im.recent.list](../../../chats/im-recent-list.md).

**Коллабы.** Для привязки или отвязки коллаба передайте `communicationType` со значением `COLLAB`. Идентификаторы коллабов можно получить методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md).

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.communication.list](./humanresources-node-communication-list.md) | Возвращает связанные чаты, каналы и коллабы отдела или команды ||
|| [humanresources.node.communication.edit](./humanresources-node-communication-edit.md) | Изменяет связанные чаты, каналы или коллабы отдела или команды ||
|#

## Продолжите изучение

- [{#T}](../node/index.md)
- [{#T}](../node-member/index.md)
- [{#T}](../index.md)
