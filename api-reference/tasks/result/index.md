# Результаты задачи: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Результат задачи — итог работы, например «Клиент подписал документы». Битрикс24 показывает результат отдельным блоком в карточке задачи, и его не надо искать среди комментариев. В задаче может быть несколько результатов.

В прежней версии API результатом становится зафиксированный комментарий задачи. В [REST 3.0](../../rest-v3.md) результат создают по тексту или из сообщения чата задачи, а меняют и удаляют отдельными методами.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как зафиксировать результат работы над задачей](https://helpdesk.bitrix24.ru/open/18135236/)

## Как начать работу

Методы прежней версии вызывают по адресу `/rest/`, методы REST 3.0 — по адресу `/rest/api/`. Если в Битрикс24 включена [новая карточка задач](../tasks-new.md), используйте методы REST 3.0: с версии модуля `tasks 25.700.0` комментарии в ней стали сообщениями чата, и методы прежней версии с ними не работают.

### Если работаете с прежней версией API

1. Получите идентификатор задачи методом [tasks.task.list](../tasks-task-list.md)
2. Создайте комментарий методом [task.commentitem.add](../comment-item/task-comment-item-add.md) — метод вернет его идентификатор
3. Зафиксируйте комментарий как результат методом [tasks.task.result.addFromComment](./tasks-task-result-add-from-comment.md)
4. Получите список результатов методом [tasks.task.result.list](./tasks-task-result-list.md)
5. Если результат больше не нужен, снимите фиксацию комментария методом [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md)

### Если работаете с REST 3.0

1. Получите идентификатор задачи методом [tasks.task.list](../tasks-task-list-rest-v3.md)
2. Добавьте результат методом [tasks.task.result.add](./tasks-task-result-add.md) или создайте его из сообщения чата методом [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md). Где взять идентификатор сообщения, описано ниже, в блоке «Чат задачи»
3. При необходимости измените текст результата методом [tasks.task.result.update](./tasks-task-result-update.md)
4. Получите список результатов методом [tasks.task.result.list](./tasks-task-result-list-rest-v3.md)
5. Если результат больше не нужен, удалите его методом [tasks.task.result.delete](./tasks-task-result-delete.md)

### Соответствие методов прежней версии и REST 3.0

Если интеграция уже работает с результатами через комментарии, замените методы по таблице.

#|
|| **Метод прежней версии** | **Метод REST 3.0** ||
|| [tasks.task.result.addFromComment](./tasks-task-result-add-from-comment.md) | [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md) — из сообщения чата задачи, [tasks.task.result.add](./tasks-task-result-add.md) — по тексту ||
|| [tasks.task.result.list](./tasks-task-result-list.md) | [tasks.task.result.list](./tasks-task-result-list-rest-v3.md) ||
|| [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md) | [tasks.task.result.delete](./tasks-task-result-delete.md) ||
|| Аналога нет | [tasks.task.result.update](./tasks-task-result-update.md) ||
|#

Прежний метод получения списка возвращает все результаты сразу массивом в `result`. Метод REST 3.0 возвращает их постранично в `result.items`, страницу задает параметр `pagination`.

## Связь результатов с другими объектами

**Задача.** Результаты привязаны к задаче по идентификатору `taskId`. Получить его можно методом [создания новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md).

**Комментарий.** В прежней версии метод [tasks.task.result.addFromComment](./tasks-task-result-add-from-comment.md) создает результат по идентификатору комментария `commentId`. Его возвращают методы [создания комментария](../comment-item/task-comment-item-add.md) и [получения списка комментариев](../comment-item/task-comment-item-get-list.md).

**Чат задачи.** В REST 3.0 метод [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md) создает результат из сообщения по его идентификатору `messageId`. Получить `messageId` можно двумя способами:

- методом [im.dialog.messages.get](../../chats/messages/im-dialog-messages-get.md) с `DIALOG_ID` вида `chat{chatId}`, где `chatId` — поле `result.item.chatId` ответа [tasks.task.get](../tasks-task-get-rest-v3.md). Идентификаторы сообщений приходят в `result.messages[].id`, для вызова нужен scope `im`
- из поля `data.FIELDS_AFTER.MESSAGE_ID` события [OnTaskCommentAdd](../comment-item/events-comment/on-task-comment-add.md), когда в чат задачи приходит новое сообщение

Метод [tasks.task.chat.message.send](../tasks-task-chat-message-send.md) `messageId` не возвращает, поэтому после отправки сообщения получите его идентификатор одним из этих способов.

{% note tip "Пользовательская документация" %}

- [Задачи Битрикс24](https://helpdesk.bitrix24.ru/open/17962166/)

{% endnote %}

## Как удалить комментарий

Метод [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md) не удаляет комментарий, а только снимает фиксацию результата. Чтобы удалить сам комментарий, используйте метод [task.commentitem.delete](../comment-item/task-comment-item-delete.md).

## Обзор методов {#all-methods}

### Методы прежней версии

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - любой пользователь с доступом к задаче — для получения списка
> - автор комментария или администратор с доступом к задаче — для фиксации комментария и ее снятия

#|
|| **Метод** | **Описание** ||
|| [tasks.task.result.addFromComment](./tasks-task-result-add-from-comment.md) | Фиксирует комментарий как результат ||
|| [tasks.task.result.list](./tasks-task-result-list.md) | Получает список результатов задачи ||
|| [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md) | Снимает фиксацию комментария как результата ||
|#

### Методы REST 3.0

> Scope: [`tasks`](../../scopes/permissions.md)
>
> В [списке scope](../../scopes/permissions.md) `tasks` отмечен устаревшим, но методы REST 3.0 работают только с ним
>
> Кто может выполнять методы:
> - любой пользователь с доступом к задаче — для добавления результата и получения списка
> - автор результата — для изменения результата
> - автор результата или администратор — для удаления результата

#|
|| **Метод** | **Описание** ||
|| [tasks.task.result.add](./tasks-task-result-add.md) | Добавляет результат к задаче ||
|| [tasks.task.result.addfromchatmessage](./tasks-task-result-addfromchatmessage.md) | Создает результат из сообщения чата задачи ||
|| [tasks.task.result.update](./tasks-task-result-update.md) | Обновляет текст результата ||
|| [tasks.task.result.list](./tasks-task-result-list-rest-v3.md) | Получает список результатов задачи v 3.0 ||
|| [tasks.task.result.delete](./tasks-task-result-delete.md) | Удаляет результат задачи ||
|#

Метод `tasks.task.result.list` есть в двух версиях — [прежней](./tasks-task-result-list.md) и [REST 3.0](./tasks-task-result-list-rest-v3.md), поэтому в таблице REST 3.0 у него пометка `v 3.0`.
