# Сотрудники: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сотрудники в Битрикс24 — это пользователи компании, которые работают с задачами, внутренними коммуникациями, CRM и другими инструментами. В структуре компании сотрудники распределяются по отделам и командам, могут быть руководителями, заместителями или рядовыми участниками.

Методы `humanresources.employee.*` помогают найти сотрудника по имени, посчитать сотрудников компании и подчиненных пользователя, получить сотрудников, которые состоят в нескольких отделах. Поиск возвращает данные цифрового профиля сотрудника: идентификатор пользователя, имя, должность, аватар, ссылку на профиль, отделы и команды.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать со списком сотрудников в Битрикс24](https://helpdesk.bitrix24.ru/open/21141928/)

{% note info "" %}

Методы раздела относятся к REST 3.0 и вызываются по адресу с `/rest/api/`. PHP SDK, BX24.js и PHP CRest такой адрес пока не поддерживают. Особенности вызова и формат ответа описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

## Как начать работу

1. Если известна часть имени, найдите сотрудника методом [humanresources.employee.search](./humanresources-employee-search.md)
2. Возьмите `userId` найденного сотрудника из ответа поиска
3. Если нужно заранее понять, какие данные сотрудника можно получить, вызовите методы [humanresources.employee.field.list](./humanresources-employee-field-list.md) и [humanresources.employee.field.get](./humanresources-employee-field-get.md)
4. Если нужно узнать, в каких отделах пользователь руководитель или заместитель и сколько у него подчиненных, вызовите метод [humanresources.employee.subordinates](./humanresources-employee-subordinates.md)
5. Если нужно общее количество сотрудников, вызовите метод [humanresources.employee.count](./humanresources-employee-count.md)
6. Если нужно проверить совместительство, найдите сотрудников в нескольких отделах методом [humanresources.employee.multidepartment](./humanresources-employee-multidepartment.md)

## Ограничения раздела

- Методы раздела доступны авторизованному пользователю, привязанному к отделу в структуре компании. Методы полей `humanresources.employee.field.list` и `humanresources.employee.field.get` доступны любому пользователю

## Связь с другими объектами

**Пользователи.** Поле `userId` соответствует идентификатору пользователя Битрикс24. Его можно получить методом [user.get](../../user/user-get.md) или из ответа [humanresources.employee.search](./humanresources-employee-search.md).

**Отделы и команды.** Методы возвращают отделы и команды сотрудника. Остальные данные отдела или команды можно получить методом [humanresources.node.get](../node/humanresources-node-get.md).

**Участники отделов и команд.** Если нужно изменить состав отдела или команды после поиска сотрудника, используйте методы [humanresources.node.member.add](../node-member/humanresources-node-member-add.md), [humanresources.node.member.move](../node-member/humanresources-node-member-move.md) и [humanresources.node.member.remove](../node-member/humanresources-node-member-remove.md).

## Обзор методов {#all-methods}

> Scope: [`humanresources`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [humanresources.employee.search](./humanresources-employee-search.md) | Ищет сотрудников по имени ||
|| [humanresources.employee.subordinates](./humanresources-employee-subordinates.md) | Возвращает количество подчиненных пользователя по отделам ||
|| [humanresources.employee.count](./humanresources-employee-count.md) | Возвращает количество сотрудников в структуре компании ||
|| [humanresources.employee.multidepartment](./humanresources-employee-multidepartment.md) | Возвращает сотрудников, которые состоят в нескольких отделах ||
|| [humanresources.employee.field.list](./humanresources-employee-field-list.md) | Возвращает список полей сотрудника ||
|| [humanresources.employee.field.get](./humanresources-employee-field-get.md) | Возвращает описание поля сотрудника ||
|#

## Продолжите изучение

- [{#T}](../node/index.md)
- [{#T}](../node-member/index.md)
- [{#T}](../index.md)
