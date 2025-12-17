# Новая карточка задач: обзор изменений

Новая карточка задач перевела комментарии в чат. Старые методы задач продолжают работать, кроме операций с комментариями. Изменения доступны с версии модуля `tasks 25.700.0`.

## Что осталось без изменений

- [task.*](index.md) методы для создания и обновления задач, файлов, чек-листов работают как раньше.
- Добавление комментария через [task.commentitem.add](./comment-item/task-comment-item-add.md) работает.

## Что изменилось в комментариях {#comments}

- Обновление и удаление комментариев методами task.commentitem.update и task.commentitem.delete больше не работает. Используйте методы Чата: 
  - [im.message.update](../chats/messages/im-message-update.md) для изменения текста,
  - [im.message.delete](../chats/messages/im-message-delete.md) для удаления сообщения.
- Получение списка комментариев через task.commentitem.getlist не работает. Получайте сообщения чата задачи через [im.dialog.messages.get](../chats/messages/im-dialog-messages-get.md).
- Используйте метод [im.disk.file.commit](../chats/files/im-disk-file-commit.md) для отправки файлов в чат задачи.
- Чат, связанный с задачей, возвращается в ответе [tasks.task.get](./tasks-task-get.md). Используйте его идентификатор для запросов в методах чатов.
  

### Как получить ID чата задачи через tasks.task.get

#### Старая версия api 

```http
POST https://{адрес_установки}/rest/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get
{
    "taskId": 51,
    "select": ["CHAT_ID"]
}
```

Пример ответа: 

```json
{
    "result": {
        "task": {
            "id": "3835",
            "chatId": 2537,
            "favorite": "N",
            "group": [],
            "action": {
                ...
            }
        }
    }
}    
```

#### Новая версия api 

Запросите у задачи поля `chat.id`, `chat.entityId`, `chat.entityType`:

```http
POST https://{адрес_установки}/rest/api/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get
{
    "id": 51,
    "select": ["id", "chat.id", "chat.entityId", "chat.entityType"]
}
```

Пример ответа:

```json
{
    "result": {
        "item": {
            "id": 51,
            "chat": {
                "id": 58,
                "entityId": 51,
                "entityType": "TASKS_TASK"
            }
        }
    }
}
```

{% note info "" %}

С версии модуля `tasks 25.700.0` доступен вызов некоторых методов в новом формате. 

Вызов нового api отличается добавлением параметра /api/ в запрос. 

Старая версия:

`https://{адрес_установки}/rest/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get`

Новая версия:

`https://{адрес_установки}/rest/api/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get`

Для новой версии вызова метода доступна документация в формате OpenApi. Для получения OpenApi вызовите метод `documentation`: 

`https://{адрес_установки}/rest/api/{id_пользователя}/{пароль_rest-приложения}/documentation`

{% endnote %}

## Как отправлять сообщения в задачу

- Старый метод [task.commentitem.add](./comment-item/task-comment-item-add.md).
- Новый метод [tasks.task.chat.message.send](../rest-v3/tasks/tasks-task-chat-message-send.md). Чтобы отправить файл в чат задачи, используйте метод [im.disk.file.commit](../chats/files/im-disk-file-commit.md).
  
## События

- Событие [OnTaskCommentAdd](./comment-item/events-comment/on-task-comment-add.md) работает. При работе с новой карточкой задачи в обработчик будут приходить параметры: 
    - `MESSAGE_ID` с идентификатором сообщения в чате задачи,
    - `TASK_ID` с идентификатором задачи, 
    - `'ID' => 0` идентификатор комментария будет равен нулю. 

- События [OnTaskCommentUpdate](./comment-item/events-comment/on-task-comment-update.md) и [OnTaskCommentDelete](./comment-item/events-comment/on-task-comment-delete.md) не работают в новой карточке.

## Встройки

Расположение мест встроек [TASK_VIEW_SIDEBAR](../widgets/task/view-sidebar.md), [TASK_VIEW_TOP_PANEL](../widgets/task/view-top-panel.md), [TASK_VIEW_TAB](../widgets/task/view-tab.md) не актуально в новой карточке задач. В новой карточке все встройки выводятся в едином блоке «Приложения».

Все ранее зарегистрированные встройки продолжают работать. Можно регистрировать новые встройки, они также будут показаны в блоке «Приложения».

![Встроенные приложения](_images/widget.png)


