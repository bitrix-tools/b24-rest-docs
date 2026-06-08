# Участники отделов и команд: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Участники отделов и команд определяют, кто входит в отдел или команду и какую роль занимает в структуре компании. Методы `humanresources.node.member.*` помогают добавить пользователей, задать состав по ролям, перенести участников между отделами и командами, удалить их.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Структура компании: интерфейс и возможности](https://helpdesk.bitrix24.ru/open/23039004/)

## Порядок работы с участниками

1. Определите нужный отдел или команду и получите `nodeId` методом [humanresources.node.list](../node/humanresources-node-list.md). Если идентификатор уже известен, проверьте данные отдела или команды методом [humanresources.node.get](../node/humanresources-node-get.md)
2. Получите идентификаторы пользователей методом [user.get](../../../user/user-get.md), если нужно подготовить `userIds` для добавления, переноса или удаления участников
3. Добавьте пользователей в нужный отдел или команду методом [humanresources.node.member.add](./humanresources-node-member-add.md)
4. Используйте [humanresources.node.member.set](./humanresources-node-member-set.md), если нужно задать полный состав участников по ролям в одном запросе
5. Перенесите участников в другой отдел или команду методом [humanresources.node.member.move](./humanresources-node-member-move.md), если нужно сменить их место в структуре
6. Удалите участников методом [humanresources.node.member.remove](./humanresources-node-member-remove.md), если они больше не должны входить в отдел или команду

## Ограничения раздела

- Доступ к просмотру и изменению участников зависит от прав текущего пользователя
- Метод [humanresources.node.member.add](./humanresources-node-member-add.md) назначает одну роль для всех пользователей из `userIds`

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа к структуре компании](https://helpdesk.bitrix24.ru/open/23274718/)

{% endnote %}

## Связь с другими объектами

**Отделы и команды.** Во всех методах раздела используется `nodeId` — идентификатор отдела или команды, для которых меняется состав участников. `nodeId` получают методом [humanresources.node.list](../node/humanresources-node-list.md). Данные отдела или команды можно проверить методом [humanresources.node.get](../node/humanresources-node-get.md). Для работы с иерархией отделов и команд используйте методы раздела [humanresources.node.*](../node/index.md).

**Пользователи.** Для добавления, переноса и удаления участников используются `userIds` — идентификаторы пользователей. Получить их можно методом [user.get](../../../user/user-get.md). В методе [humanresources.node.member.add](./humanresources-node-member-add.md) `userIds` передаются одним списком, а в [humanresources.node.member.set](./humanresources-node-member-set.md) — в виде объекта со списками по ролям.

**Роли участников.** Роль определяет место пользователя в отделе или команде: руководитель, заместитель или сотрудник. Коды ролей передаются в параметре `role` метода [humanresources.node.member.add](./humanresources-node-member-add.md) и в ключах объекта `userIds` метода [humanresources.node.member.set](./humanresources-node-member-set.md).

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.member.add](./humanresources-node-member-add.md) | Добавляет пользователей в отдел или команду ||
|| [humanresources.node.member.set](./humanresources-node-member-set.md) | Обновляет состав участников отдела или команды по ролям ||
|| [humanresources.node.member.move](./humanresources-node-member-move.md) | Переносит пользователей в другой отдел или команду ||
|| [humanresources.node.member.remove](./humanresources-node-member-remove.md) | Удаляет пользователей из отдела или команды ||
|#

## Продолжите изучение

- [{#T}](../node/index.md)
- [{#T}](../index.md)
