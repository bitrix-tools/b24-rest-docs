# Участники отделов и команд: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Участники отделов и команд определяют, кто входит в отдел или команду и какую роль занимает в структуре компании. Методы `humanresources.node.member.*` помогают добавить пользователей, задать состав по ролям, перенести участников между отделами и командами, удалить их и получить описание полей участника.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Структура компании: интерфейс и возможности](https://helpdesk.bitrix24.ru/open/23039004/)

{% note info "" %}

Методы раздела относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

## Порядок работы с участниками

1. Получите `nodeId` отдела или команды методом [humanresources.node.list](../node/humanresources-node-list.md)
2. Получите идентификаторы пользователей методом [user.get](../../user/user-get.md)
3. Выберите метод по задаче:
   - добавить сотрудников или сменить им роль — [humanresources.node.member.add](./humanresources-node-member-add.md). Остальные участники не меняются, сотрудники остаются в прежних отделах
   - задать полный состав по ролям — [humanresources.node.member.set](./humanresources-node-member-set.md). Участники, которых нет в запросе, удаляются из отдела или команды
   - перевести сотрудников в другое место — [humanresources.node.member.move](./humanresources-node-member-move.md). Сотрудники убираются из всех своих отделов и остаются только в целевом
   - убрать пользователей — [humanresources.node.member.remove](./humanresources-node-member-remove.md). Остальные участники не меняются
4. Проверьте состав отдела или команды методом [humanresources.node.get](../node/humanresources-node-get.md): передайте `members` в `select`. Методы `add`, `set` и `move` пропускают неподходящие идентификаторы без ошибки, поэтому `success: true` не гарантирует, что все пользователи добавлены

## Ограничения раздела

- Методы `add`, `set` и `move` работают только с сотрудниками — пользователями, которые уже состоят хотя бы в одном отделе. Другие идентификаторы пропускаются без ошибки, а метод все равно возвращает `success: true`
- Сотрудника нельзя удалить из его единственного отдела: методы `set` и `remove` вернут ошибку или причину отказа
- Метод [humanresources.node.member.add](./humanresources-node-member-add.md) назначает одну роль для всех пользователей из `userIds`
- Права зависят от типа объекта: для отдела нужны права «Добавление сотрудников в отдел» и «Удаление сотрудников из отдела», для команды — «Добавление участников в команду» и «Удаление участников из команды». Методы полей доступны любому пользователю

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа к структуре компании](https://helpdesk.bitrix24.ru/open/23274718/)

{% endnote %}

## Связь с другими объектами

**Отделы и команды.** Во всех методах раздела используется `nodeId` — идентификатор отдела или команды, для которых меняется состав участников. `nodeId` получают методом [humanresources.node.list](../node/humanresources-node-list.md). Данные отдела или команды можно проверить методом [humanresources.node.get](../node/humanresources-node-get.md). Для работы с иерархией отделов и команд подходят методы [humanresources.node.*](../node/index.md).

**Пользователи.** Для добавления, переноса и удаления участников используются `userIds` — идентификаторы пользователей. Получить их можно методом [user.get](../../user/user-get.md). В методе [humanresources.node.member.add](./humanresources-node-member-add.md) `userIds` передаются одним списком, а в [humanresources.node.member.set](./humanresources-node-member-set.md) — в виде объекта со списками по ролям.

**Роли участников.** Роль определяет место пользователя в отделе или команде: руководитель, заместитель или сотрудник. Коды ролей передаются в параметре `role` методов [humanresources.node.member.add](./humanresources-node-member-add.md) и [humanresources.node.member.move](./humanresources-node-member-move.md) и в ключах объекта `userIds` метода [humanresources.node.member.set](./humanresources-node-member-set.md). Набор ролей зависит от типа объекта: роль команды для отдела и роль отдела для команды вернут ошибку `INVALID_ROLE`.

### Коды ролей {#roles}

#|
|| **Код** | **Тип объекта** | **Роль** ||
|| `MEMBER_HEAD` | Отдел | Руководитель отдела ||
|| `MEMBER_DEPUTY_HEAD` | Отдел | Заместитель руководителя ||
|| `MEMBER_EMPLOYEE` | Отдел | Сотрудник ||
|| `MEMBER_TEAM_HEAD` | Команда | Руководитель команды ||
|| `MEMBER_TEAM_DEPUTY_HEAD` | Команда | Заместитель руководителя команды ||
|| `MEMBER_TEAM_EMPLOYEE` | Команда | Участник команды ||
|#

Пример `role` в методе `add`: `"role": "MEMBER_EMPLOYEE"`. Пример `userIds` в методе `set`: `{"MEMBER_HEAD": [7], "MEMBER_EMPLOYEE": [18, 25]}`.

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.member.add](./humanresources-node-member-add.md) | Добавляет пользователей в отдел или команду ||
|| [humanresources.node.member.set](./humanresources-node-member-set.md) | Обновляет состав участников отдела или команды по ролям ||
|| [humanresources.node.member.move](./humanresources-node-member-move.md) | Переносит пользователей в другой отдел или команду ||
|| [humanresources.node.member.remove](./humanresources-node-member-remove.md) | Удаляет пользователей из отдела или команды ||
|| [humanresources.node.member.field.list](./humanresources-node-member-field-list.md) | Возвращает список полей участника отдела или команды ||
|| [humanresources.node.member.field.get](./humanresources-node-member-field-get.md) | Возвращает описание поля участника отдела или команды ||
|#

## Продолжите изучение

- [{#T}](../node/index.md)
- [{#T}](../index.md)
