# Элементы: обзор методов

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Так как элементы каждого процесса хранятся в отдельной таблице, идентификаторы элементов разных процессов будут совпадать.

Поэтому во все методы необходимо передавать идентификатор процесса `typeId`.

#|
|| **Метод** | **Описание** ||
|| [rpa.item.add](./rpa-item-add.md) | Добавляет новый элемент процесса с идентификатором `typeId` ||
|| [rpa.item.update](./rpa-item-update.md) | Обновляет элемент с идентификатором `id` процессса с идентификатором `typeId` ||
|| [rpa.item.get](./rpa-item-get.md) | Получает информацию об элементе с идентификатором `id` процесса с идентификатором `typeId` ||
|| [rpa.item.getTasks](./rpa-item-get-tasks.md) | Получает данные о текущих заданиях элемента с идентификатором `id` процесса с идентификатором `typeId` ||
|| [rpa.item.list](./rpa-item-list.md) | Получает список элементов процесса с идентификатором `typeId` ||
|| [rpa.item.delete](./rpa-item-delete.md) | Удаляет элемент ||
|#