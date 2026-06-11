# Отделы и команды: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Отделы и команды в Битрикс24 формируют структуру компании. Методы `humanresources.node.*` помогают получить данные отдела или команды, найти нужный отдел или команду, построить иерархию, создать новый отдел или команду и изменить их положение в дереве.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Структура компании: интерфейс и возможности](https://helpdesk.bitrix24.ru/open/23039004/)

## Чем отличаются отделы и команды

**Отделы.** Используйте отделы, когда нужно описать постоянную структуру компании: направления работы, подчиненность и состав сотрудников. При создании отдела можно указать вышестоящий отдел, название, описание, руководителей, заместителей и подчиненных.

**Команды.** Используйте команды, когда нужно собрать сотрудников из разных отделов для общей задачи или проекта. У команды тоже есть руководитель и заместитель. Для команды можно задать описание, цвет и вышестоящий отдел или команду.

## Порядок работы с отделами и командами

1. Получите описание полей методами [humanresources.node.field.list](./humanresources-node-field-list.md) и [humanresources.node.field.get](./humanresources-node-field-get.md), если нужно заранее понять, какие значения можно передавать для отдела или команды
2. Получите список отделов или команд через [humanresources.node.list](./humanresources-node-list.md). В запросе укажите `type`: `DEPARTMENT` для отделов или `TEAM` для команд
3. Выберите нужный `id` и запросите детали через [humanresources.node.get](./humanresources-node-get.md). Если нужно найти отдел или команду по части названия, используйте [humanresources.node.search](./humanresources-node-search.md)
4. Если работаете с иерархией, получите `parentId` родительского отдела или команды через [humanresources.node.list](./humanresources-node-list.md) или [humanresources.node.get](./humanresources-node-get.md), а затем запросите дочерние отделы и команды через [humanresources.node.children](./humanresources-node-children.md)
5. Создайте новый отдел или команду методом [humanresources.node.add](./humanresources-node-add.md). При создании можно сразу передать список будущих участников, а также создать или привязать чаты, каналы и коллабы
6. Измените свойства отдела или команды методом [humanresources.node.edit](./humanresources-node-edit.md) или переместите их к новому родителю методом [humanresources.node.move](./humanresources-node-move.md)
7. Используйте [humanresources.node.count](./humanresources-node-count.md), когда нужно быстро узнать количество отделов и команд без загрузки полного списка

## Ограничения раздела

- Доступ к просмотру и изменению отделов и команд зависит от прав текущего пользователя

{% note tip "Пользовательская документация" %}

- [Как создать и изменить отдел в структуре компании](https://helpdesk.bitrix24.ru/open/23238334/)
- [Кроссфункциональные команды в Битрикс24](https://helpdesk.bitrix24.ru/open/25545568/)
- [Как добавить отдел в чат, канал или коллабу в Битрикс24](https://helpdesk.bitrix24.ru/open/24946138/)
- [Как настроить права доступа к структуре компании](https://helpdesk.bitrix24.ru/open/23274718/)

{% endnote %}

## Связь с другими объектами

**Пользователи.** При создании отдела или команды метод [humanresources.node.add](./humanresources-node-add.md) принимает `userIds` с идентификаторами руководителей, заместителей и сотрудников. Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md). Для отделов параметр `moveUsersToNode` определяет, будут ли сотрудники переведены в новый отдел или добавлены как совместители.

**Чаты и каналы.** При создании отдела или команды можно сразу создать отдельный чат или канал через `createChat` и `createChannel` либо привязать существующие чаты и каналы через `bindingChatIds` и `bindingChannelIds`. Идентификаторы существующих чатов и каналов можно получить методом [im.recent.list](../../../chats/im-recent-list.md).

**Коллабы.** При создании отдела или команды можно создать новый коллаб через `createCollab` или привязать существующие коллабы через `bindingCollabIds`, если коллабы доступны в тарифе. Идентификаторы коллабов можно получить методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md).

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.add](./humanresources-node-add.md) | Создает отдел или команду ||
|| [humanresources.node.edit](./humanresources-node-edit.md) | Обновляет поля отдела или команды ||
|| [humanresources.node.get](./humanresources-node-get.md) | Возвращает отдел или команду по идентификатору ||
|| [humanresources.node.list](./humanresources-node-list.md) | Возвращает список отделов и команд ||
|| [humanresources.node.search](./humanresources-node-search.md) | Ищет отделы и команды по названию ||
|| [humanresources.node.children](./humanresources-node-children.md) | Возвращает дочерние отделы и команды ||
|| [humanresources.node.count](./humanresources-node-count.md) | Возвращает количество отделов и команд ||
|| [humanresources.node.move](./humanresources-node-move.md) | Перемещает отдел или команду к новому родителю ||
|| [humanresources.node.field.list](./humanresources-node-field-list.md) | Возвращает список полей отдела или команды ||
|| [humanresources.node.field.get](./humanresources-node-field-get.md) | Возвращает описание поля отдела или команды ||
|#

## Продолжите изучение

- [{#T}](../node-member/index.md)
- [{#T}](../index.md)
