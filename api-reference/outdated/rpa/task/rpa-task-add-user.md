# Добавить пользователя к существующему заданию rpa.task.addUser

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [смарт-процессы](../../../crm/universal/user-defined-object-types/index.md) как аналог функционала.

{% endnote %}

Метод `rpa.task.addUser` добавит пользователя к существующему заданию.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **stageId** 
[`integer`](../../../data-types.md) | Идентификатор стадии ||
|| **robotName** 
[`string`](../../../data-types.md) | Имя робота ||
|| **userValue** 
[`string`](../../../data-types.md) | Строка с пользователем формата `Имя Фамилия [ид пользователя]` ||
|#

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-task-do.md)
- [{#T}](./rpa-task-delete.md)




