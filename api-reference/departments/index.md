# Структура компании: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Структура компании показывает, из каких отделов состоит компания и как они связаны между собой. В отделах и командах можно определить роли участников: руководителя, заместителя и сотрудников.

В [REST 3.0](../rest-v3.md) структура компании описана методами `humanresources.*`. Они работают с отделами и командами, участниками и ролями, связанными чатами, каналами и коллабами, поиском сотрудников и методами получения схемы полей (`*.field.list` / `*.field.get`). Методы `department.*` относятся к прежней версии API и работают с подразделениями.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Структура компании](https://helpdesk.bitrix24.ru/open/23039004/)

## Как выбрать группу методов

#|
|| **Если нужно** | **Открывайте** ||
|| Работать с отделами, командами, участниками, ролями и связанными коммуникациями | Методы `humanresources.*` REST 3.0 ||
|| Работать с подразделениями прежней версии API | Методы `department.*` ||
|#

## Как начать работу

### Если работаете с REST v2

1. Получите список подразделений методом [department.get](department-get.md), чтобы определить нужный `ID`
2. Проверьте поля подразделения методом [department.fields](department-fields.md), если нужно подготовить данные для создания или изменения
3. Получите идентификатор руководителя методом [user.get](../user/user-get.md), если нужно заполнить поле `UF_HEAD`
4. Создайте подразделение методом [department.add](department-add.md) или измените его методом [department.update](department-update.md)
5. Удалите подразделение методом [department.delete](department-delete.md), если оно больше не нужно

### Если работаете с REST 3.0

1. Получите список отделов или команд методом [humanresources.node.list](./node/humanresources-node-list.md), чтобы определить нужный `id`
2. Проверьте данные отдела или команды методом [humanresources.node.get](./node/humanresources-node-get.md), если идентификатор уже известен
3. Создайте новый отдел или команду методом [humanresources.node.add](./node/humanresources-node-add.md) или измените их свойства методом [humanresources.node.edit](./node/humanresources-node-edit.md)
4. Получите идентификаторы пользователей методом [user.get](../user/user-get.md), если нужно подготовить состав участников
5. Добавьте участников методом [humanresources.node.member.add](./node-member/humanresources-node-member-add.md) или задайте полный состав методом [humanresources.node.member.set](./node-member/humanresources-node-member-set.md)
6. Настройте связанные чаты, каналы и коллабы методом [humanresources.node.communication.edit](./node-communication/humanresources-node-communication-edit.md), если для отдела или команды нужны отдельные коммуникации
7. Найдите сотрудников методом [humanresources.employee.search](./employee/humanresources-employee-search.md), если нужно получить данные сотрудника, проверить подчиненных или найти сотрудников в нескольких отделах

## Ограничения и рекомендации

- Доступ к просмотру и изменению структуры компании зависит от прав текущего пользователя
- Для отделов и команд используются разные наборы ролей участников
- Методы описания полей помогают проверить доступные поля и их типы перед изменением данных

{% note tip "Пользовательская документация" %}

- [Как создать и изменить отдел в структуре компании](https://helpdesk.bitrix24.ru/open/23238334/)
- [Кроссфункциональные команды в Битрикс24](https://helpdesk.bitrix24.ru/open/25545568/)
- [Как настроить права доступа к структуре компании](https://helpdesk.bitrix24.ru/open/23274718/)

{% endnote %}

## Связь с другими объектами

**Пользователи.** В методах `department.*` руководители связаны с подразделениями числовым идентификатором в параметре `UF_HEAD`. В методах `humanresources.*` для добавления, переноса и удаления участников нужны идентификаторы пользователей `userIds`. Идентификаторы можно получить методом [user.get](../user/user-get.md).

**Чаты, каналы и коллабы.** При создании отдела или команды метод [humanresources.node.add](./node/humanresources-node-add.md) позволяет сразу создать или привязать связанные чаты, каналы и коллабы. После создания связь можно получить методом [humanresources.node.communication.list](./node-communication/humanresources-node-communication-list.md) и изменить методом [humanresources.node.communication.edit](./node-communication/humanresources-node-communication-edit.md).

**Сотрудники.** Методы [humanresources.employee.search](./employee/humanresources-employee-search.md), [humanresources.employee.subordinates](./employee/humanresources-employee-subordinates.md) и [humanresources.employee.multidepartment](./employee/humanresources-employee-multidepartment.md) помогают найти пользователей в структуре компании и проверить их связь с отделами.

## Обзор методов {#all-methods}

### Методы REST v2

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [department.add](department-add.md) | Создает подразделение ||
|| [department.update](department-update.md) | Изменяет подразделение ||
|| [department.get](department-get.md) | Возвращает список подразделений ||
|| [department.fields](department-fields.md) | Возвращает справочник полей подразделения ||
|| [department.delete](department-delete.md) | Удаляет подразделение ||
|#

### Методы REST 3.0

> Scope: [`humanresources`](../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#### Отделы и команды

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.add](./node/humanresources-node-add.md) | Создает отдел или команду ||
|| [humanresources.node.edit](./node/humanresources-node-edit.md) | Обновляет поля отдела или команды ||
|| [humanresources.node.get](./node/humanresources-node-get.md) | Возвращает отдел или команду по идентификатору ||
|| [humanresources.node.list](./node/humanresources-node-list.md) | Возвращает список отделов и команд ||
|| [humanresources.node.search](./node/humanresources-node-search.md) | Ищет отделы и команды по названию ||
|| [humanresources.node.children](./node/humanresources-node-children.md) | Возвращает дочерние отделы и команды ||
|| [humanresources.node.count](./node/humanresources-node-count.md) | Возвращает количество отделов и команд ||
|| [humanresources.node.move](./node/humanresources-node-move.md) | Перемещает отдел или команду к новому родителю ||
|| [humanresources.node.field.list](./node/humanresources-node-field-list.md) | Возвращает список полей отдела или команды ||
|| [humanresources.node.field.get](./node/humanresources-node-field-get.md) | Возвращает описание поля отдела или команды ||
|#

#### Участники отделов и команд

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.member.add](./node-member/humanresources-node-member-add.md) | Добавляет пользователей в отдел или команду ||
|| [humanresources.node.member.set](./node-member/humanresources-node-member-set.md) | Обновляет состав участников отдела или команды по ролям ||
|| [humanresources.node.member.move](./node-member/humanresources-node-member-move.md) | Переносит пользователей в другой отдел или команду ||
|| [humanresources.node.member.remove](./node-member/humanresources-node-member-remove.md) | Удаляет пользователей из отдела или команды ||
|| [humanresources.node.member.field.list](./node-member/humanresources-node-member-field-list.md) | Возвращает список полей участника отдела или команды ||
|| [humanresources.node.member.field.get](./node-member/humanresources-node-member-field-get.md) | Возвращает описание поля участника отдела или команды ||
|#

#### Коммуникации отделов и команд

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.communication.edit](./node-communication/humanresources-node-communication-edit.md) | Изменяет связанные чаты, каналы или коллабы отдела или команды ||
|| [humanresources.node.communication.list](./node-communication/humanresources-node-communication-list.md) | Возвращает связанные чаты, каналы и коллабы отдела или команды ||
|#

#### Сотрудники

#|
|| **Метод** | **Описание** ||
|| [humanresources.employee.search](./employee/humanresources-employee-search.md) | Ищет сотрудников по имени ||
|| [humanresources.employee.subordinates](./employee/humanresources-employee-subordinates.md) | Возвращает подчиненных пользователя по отделам ||
|| [humanresources.employee.count](./employee/humanresources-employee-count.md) | Возвращает количество сотрудников в структуре компании ||
|| [humanresources.employee.multidepartment](./employee/humanresources-employee-multidepartment.md) | Возвращает сотрудников, которые состоят в нескольких отделах ||
|| [humanresources.employee.field.list](./employee/humanresources-employee-field-list.md) | Возвращает список полей сотрудника ||
|| [humanresources.employee.field.get](./employee/humanresources-employee-field-get.md) | Возвращает описание поля сотрудника ||
|#
