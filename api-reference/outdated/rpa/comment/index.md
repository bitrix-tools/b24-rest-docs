# Комментарии: обзор методов

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Набор методов для работы с комментариями в таймлайне элементов.

По факту комментарии — это те же [записи таймлайна](../timeline/index.md), но с другим отображением и возможностью редактирования пользователем.

Данные о комментариях можно получить методом `rpa.timeline.listForItem` — этот метод возвращает все записи, в том числе комментарии.

#|
|| **Метод** | **Описание** ||
|| [rpa.comment.add](./rpa-comment-add.md) | Саздает новый комментарий в таймлайне элемента с идентификатором `itemId` процесса с идентификатором `typeId` ||
|| [rpa.comment.update](./rpa-comment-update.md) | Обновляет запись таймлайна с идентификатором `id` ||
|| [rpa.comment.delete](./rpa-comment-delete.md) | Удаляет комментарий с идентификатором `id` ||
|#