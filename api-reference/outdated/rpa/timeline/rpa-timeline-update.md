# Обновить запись таймлайна rpa.timeline.update

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет запись таймлайна с идентификатором `id`.

Метод обновляет только поля `title` и `description`, и только те записи, которые созданы этим же пользователем и с помощью приложения.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор записи ||
|| **fields** 
[`object`](../../../data-types.md) | Объект с [полями](#fields) записи ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title** 
[`string`](../../../data-types.md) | Заголовок записи ||
|| **description** 
[`string`](../../../data-types.md) | Описание записи. Можно использовать HTML теги ||
|#

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-timeline-add.md)
- [{#T}](./rpa-timeline-update-is-fixed.md)
- [{#T}](./rpa-timeline-list-for-item.md)
- [{#T}](./rpa-timeline-delete.md)
