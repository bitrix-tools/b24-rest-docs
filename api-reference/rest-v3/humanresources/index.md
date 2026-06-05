# Структура компании в REST 3.0: обзор разделов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Структура компании показывает, из каких отделов состоит компания и как они связаны между собой. В каждом отделе и команде можно определить роли участников: руководителя, заместителя и сотрудников. Это помогает поддерживать актуальную организационную схему, быстрее находить нужный отдел или сотрудника, настраивать совместную работу и использовать структуру в связанных инструментах Битрикс24.

Методы раздела работают с двумя группами объектов:

- [Отделы и команды](./node/index.md) — создают отделы и команды, получают их список, данные, дочерние элементы и описание полей
- [Участники отделов и команд](./node-member/index.md) — добавляют пользователей, задают состав по ролям, переносят и удаляют участников

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Структура компании: интерфейс и возможности](https://helpdesk.bitrix24.ru/open/23039004/)

## Как начать работу

1. Получите список отделов или команд через [humanresources.node.list](./node/humanresources-node-list.md), чтобы определить нужный `id`
2. Проверьте данные отдела или команды через [humanresources.node.get](./node/humanresources-node-get.md), если идентификатор уже известен
3. Создайте новый отдел или команду через [humanresources.node.add](./node/humanresources-node-add.md) или измените их свойства через [humanresources.node.edit](./node/humanresources-node-edit.md)
4. Получите идентификаторы пользователей методом [user.get](../../user/user-get.md), если нужно подготовить состав участников
5. Добавьте участников через [humanresources.node.member.add](./node-member/humanresources-node-member-add.md) или задайте полный состав через [humanresources.node.member.set](./node-member/humanresources-node-member-set.md)

## Ограничения и рекомендации

- Доступ к просмотру и изменению структуры компании зависит от прав текущего пользователя
- Для отделов и команд используются разные наборы ролей участников
- Используйте методы описания полей, чтобы проверить доступные поля и их типы перед изменением данных

{% note tip "Пользовательская документация" %}

- [Как создать и изменить отдел в структуре компании](https://helpdesk.bitrix24.ru/open/23238334/)
- [Кроссфункциональные команды в Битрикс24](https://helpdesk.bitrix24.ru/open/25545568/)
- [Как настроить права доступа к структуре компании](https://helpdesk.bitrix24.ru/open/23274718/)

{% endnote %}

## Связь с другими объектами

**Пользователи.** Для добавления, переноса и удаления участников нужны идентификаторы пользователей `userIds`. Их можно получить методом [user.get](../../user/user-get.md).

**Чаты, каналы и коллабы.** При создании отдела или команды метод [humanresources.node.add](./node/humanresources-node-add.md) позволяет сразу создать или привязать связанные чаты, каналы и коллабы.

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Отделы и команды

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

### Участники отделов и команд

#|
|| **Метод** | **Описание** ||
|| [humanresources.node.member.add](./node-member/humanresources-node-member-add.md) | Добавляет пользователей в отдел или команду ||
|| [humanresources.node.member.set](./node-member/humanresources-node-member-set.md) | Обновляет состав участников отдела или команды по ролям ||
|| [humanresources.node.member.move](./node-member/humanresources-node-member-move.md) | Переносит пользователей в другой отдел или команду ||
|| [humanresources.node.member.remove](./node-member/humanresources-node-member-remove.md) | Удаляет пользователей из отдела или команды ||
|#

## Продолжить изучение

- [{#T}](./node/index.md)
- [{#T}](./node-member/index.md)
- [{#T}](../index.md)
