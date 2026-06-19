# Сотрудники: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сотрудники в Битрикс24 — это пользователи компании, которые работают с задачами, внутренними коммуникациями, CRM и другими инструментами. В структуре компании сотрудники распределяются по отделам и командам, могут быть руководителями, заместителями или рядовыми участниками.

Методы `humanresources.employee.*` возвращают данные цифрового профиля сотрудника: идентификатор пользователя, имя, должность, аватар, ссылку на профиль, отделы и команды. С помощью методов можно найти сотрудников по имени, получить количество сотрудников, проверить подчиненных пользователя и найти сотрудников, которые состоят в нескольких отделах.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать со списком сотрудников в Битрикс24](https://helpdesk.bitrix24.ru/open/21141928/)

## Как начать работу

1. Найдите сотрудника методом [humanresources.employee.search](./humanresources-employee-search.md), если известна часть имени
2. Получите `userId` из ответа поиска или методом [user.get](../../../user/user-get.md)
3. Получите описание полей методами [humanresources.employee.field.list](./humanresources-employee-field-list.md) и [humanresources.employee.field.get](./humanresources-employee-field-get.md), если нужно заранее понять, какие данные сотрудника можно получить
4. Проверьте подчиненных пользователя методом [humanresources.employee.subordinates](./humanresources-employee-subordinates.md), если нужно оценить состав отделов, где пользователь является руководителем или заместителем
5. Получите общее количество сотрудников методом [humanresources.employee.count](./humanresources-employee-count.md)
6. Найдите сотрудников в нескольких отделах методом [humanresources.employee.multidepartment](./humanresources-employee-multidepartment.md), если нужно проверить совместительство

## Ограничения раздела

- Методы раздела доступны авторизованному пользователю, привязанному к отделу в структуре компании

## Связь с другими объектами

**Пользователи.** Поле `userId` соответствует идентификатору пользователя Битрикс24. Его можно получить методом [user.get](../../../user/user-get.md) или из ответа [humanresources.employee.search](./humanresources-employee-search.md).

**Отделы и команды.** В ответах методов возвращаются данные о связи сотрудника с отделами и командами. Детали отдела или команды можно получить методом [humanresources.node.get](../node/humanresources-node-get.md).

**Участники отделов и команд.** Если нужно изменить состав отдела или команды после поиска сотрудника, используйте методы [humanresources.node.member.add](../node-member/humanresources-node-member-add.md), [humanresources.node.member.move](../node-member/humanresources-node-member-move.md) и [humanresources.node.member.remove](../node-member/humanresources-node-member-remove.md).

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.employee.search](./humanresources-employee-search.md) | Ищет сотрудников по имени ||
|| [humanresources.employee.subordinates](./humanresources-employee-subordinates.md) | Возвращает подчиненных пользователя по отделам ||
|| [humanresources.employee.count](./humanresources-employee-count.md) | Возвращает количество сотрудников в структуре компании ||
|| [humanresources.employee.multidepartment](./humanresources-employee-multidepartment.md) | Возвращает сотрудников, которые состоят в нескольких отделах ||
|| [humanresources.employee.field.list](./humanresources-employee-field-list.md) | Возвращает список полей сотрудника ||
|| [humanresources.employee.field.get](./humanresources-employee-field-get.md) | Возвращает описание поля сотрудника ||
|#

## Продолжите изучение

- [{#T}](../node/index.md)
- [{#T}](../node-member/index.md)
- [{#T}](../index.md)
