# Обзор методов и событий

## Методы

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [catalog.measure.add](./catalog-measure-add.md) | Добавляет единицу измерения ||
|| [catalog.measure.update](./catalog-measure-update.md) | Обновляет единицу измерения ||
|| [catalog.measure.get](./catalog-measure-get.md) | Возвращает информацию о единице измерения по ее идентификатору ||
|| [catalog.measure.list](./catalog-measure-list.md) | Возвращает список единиц измерения ||
|| [catalog.measure.delete](./catalog-measure-delete.md) | Удаляет единицу измерения ||
|| [catalog.measure.getFields](./catalog-measure-get-fields.md) | Возвращает доступные поля единиц измерения ||
|#

## События

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [CATALOG.MEASURE.ON.ADD](../events/catalog-measure-on-add.md) | При добавлении единицы измерения ||
|| [CATALOG.MEASURE.ON.UPDATE](../events/catalog-measure-on-update.md)| При обновлении единицы измерения ||
|| [CATALOG.MEASURE.ON.DELETE](../events/catalog-measure-on-delete.md)| При удалении единицы измерения ||
|#
