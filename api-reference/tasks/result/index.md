# Результаты задачи: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Результат выполнения задачи — это закрепленный комментарий с итогами работы над задачей. Результат выделен отдельным блоком в карточке задачи, и его не надо искать среди всех комментариев. В задаче может быть несколько результатов.

В [REST 3.0](../../rest-v3.md) у результатов задачи появились отдельные методы для создания, изменения и удаления результата, а также вариант получения списка в новом формате ответа.

> Быстрый переход: [все методы и события](#all-methods)
> 
> Пользовательская документация: [как зафиксировать результат работы над задачей](https://helpdesk.bitrix24.ru/open/18135236/) 

## Как начать работу

### Если работаете с прежней версией

1. Получите идентификатор задачи
2. Создайте комментарий методом [task.commentitem.add](../comment-item/task-comment-item-add.md)
3. Зафиксируйте комментарий как результат методом [tasks.task.result.addFromComment](./tasks-task-result-add-from-comment.md)
4. Получите список результатов методом [tasks.task.result.list](./tasks-task-result-list.md)
5. Если результат больше не нужен, снимите фиксацию комментария методом [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md)

### Если работаете с REST 3.0

1. Получите идентификатор задачи
2. Добавьте результат методом [tasks.task.result.add](./tasks-task-result-add.md) или создайте его из сообщения чата методом [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md)
3. При необходимости измените текст результата методом [tasks.task.result.update](./tasks-task-result-update.md)
4. Получите список результатов методом [tasks.task.result.list](./tasks-task-result-list-rest-v3.md)
5. Если результат больше не нужен, удалите его методом [tasks.task.result.delete](./tasks-task-result-delete.md)

## Связь результатов с другими объектами

**Задача.** Результаты привязаны к задаче по идентификатору `taskId`. Получить его можно методом [создания новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md)

**Комментарий.** Результат задачи создается из комментария по идентификатору `commentId`. Получить идентификатор комментария можно методом [создания комментария](../comment-item/task-comment-item-add.md) или методом [получения списка комментариев](../comment-item/task-comment-item-get-list.md) задачи

**Чат задачи.** В REST 3.0 метод [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md) создает результат из сообщения чата задачи. Для этого передайте `messageId`, полученный при отправке сообщения методом [tasks.task.chat.message.send](../tasks-task-chat-message-send.md) или методами [работы с сообщениями чатов](../../chats/messages/index.md)

{% note tip "Пользовательская документация" %}

- [Задачи Битрикс24](https://helpdesk.bitrix24.ru/open/17962166/)

{% endnote %}

## Как удалить комментарий

Метод [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md) не удаляет комментарий, только снимает фиксацию в качестве результата. Чтобы удалить комментарий с результатом используйте метод [task.commentitem.delete](../comment-item/task-comment-item-delete.md).

## Обзор методов {#all-methods}

> Scope:
>
> - [`task`](../../scopes/permissions.md) — для методов прежней версии API
> - [`tasks`](../../scopes/permissions.md) — для методов REST 3.0
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [tasks.task.result.add](./tasks-task-result-add.md) | Добавляет результат к задаче ||
|| [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md) | Создает результат из сообщения чата задачи ||
|| [tasks.task.result.update](./tasks-task-result-update.md) | Обновляет текст результата ||
|| [tasks.task.result.list](./tasks-task-result-list-rest-v3.md) | Получает список результатов задачи v 3.0 ||
|| [tasks.task.result.delete](./tasks-task-result-delete.md) | Удаляет результат задачи ||
|| [tasks.task.result.addFromComment](./tasks-task-result-add-from-comment.md) | Добавляет комментарий в результат ||
|| [tasks.task.result.list](./tasks-task-result-list.md) | Получает список результатов задачи ||
|| [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md) | Удаляет комментарий из результата задачи ||
|#
