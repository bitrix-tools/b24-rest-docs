# Новая карточка задач: комментарии и события

Новая карточка задач перевела комментарии в чат. Старые методы задач продолжают работать, кроме операций с комментариями. Изменения доступны с версии модуля `tasks 25.700.0`.

## Что осталось без изменений

- [task.*](index.md) методы для создания и обновления задач, файлов, чек-листов работают как раньше.
- Добавление комментария через [task.commentitem.add](./comment-item/task-comment-item-add.md) работает.

## Что изменилось в комментариях

- Обновление и удаление комментариев методами task.commentitem.update и task.commentitem.delete больше не работает. Используйте методы Чата: 
  - [im.message.update](../chats/messages/im-message-update.md) для изменения текста,
  - [im.message.delete](../chats/messages/im-message-delete.md) для удаления сообщения.
- Получение списка комментариев через task.commentitem.getlist не работает. Получайте сообщения чата задачи через [im.dialog.messages.get](../chats/messages/im-dialog-messages-get.md).
- Чат, связанный с задачей, возвращается в ответе [tasks.task.get](./tasks-task-get.md). Используйте его идентификатор для запросов в методах чатов.

### Как получить чат задачи через tasks.task.get

Запросите у задачи поля `chat.id`, `chat.entityId`, `chat.entityType`:

```http
POST https://{адрес_установки}/rest/api/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get
{
    "id": 51,
    "select": ["id", "chat.id", "chat.entityId", "chat.entityType"]
}
```
{% note info "" %}

Вызов нового api отличается добавлением параметра /api/ в запрос. 

Старая версия:

`https://{адрес_установки}/rest/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get`

Новая версия:

`https://{адрес_установки}/rest/api/{id_пользователя}/{пароль_rest-приложения}/tasks.task.get`

{% endnote %}

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

## Как отправлять сообщения в задачу

- Старый метод [task.commentitem.add](./comment-item/task-comment-item-add.md).
- Новый метод [tasks.task.chat.message.send](./tasks-task-chat-message-send.md).

## События

- События по комментариям задач недоступны в новой карточке

