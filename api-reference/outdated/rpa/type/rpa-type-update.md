# Обновить процесс rpa.type.update

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет процесс по его `id`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id** 
[`number`](../../../data-types.md) | Идентификатор процесса ||
|| **fields** 
[`array`](../../../data-types.md) | Список с полями процесса. Полностью аналогичен набору из метода [rpa.type.add](./rpa-type-add.md) ||
|#

## Обработка ответа

HTTP-статус: **200**

Вернет ответ как в методе [rpa.type.get](./rpa-type-get.md).

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-type-add.md)
- [{#T}](./rpa-type-get.md)
- [{#T}](./rpa-type-list.md)
- [{#T}](./rpa-type-delete.md)