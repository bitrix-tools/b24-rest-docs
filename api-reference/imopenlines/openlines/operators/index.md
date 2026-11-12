# Операторы открытых линий: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы раздела выполняют действия оператора с диалогом открытой линии от имени пользователя, который вызывает метод: принять диалог, пропустить, передать, завершить или отметить как спам.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как настроить очередь сотрудников в открытых линиях](https://helpdesk.bitrix24.ru/open/26228062/)

## Связь операторов с другими объектами

**Чаты.** Все методы раздела работают с чатом открытой линии по числовому идентификатору `CHAT_ID` без префикса `chat`. Идентификатор можно получить методами [imopenlines.session.open](../sessions/imopenlines-session-open.md) и [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md).

**Пользователь.** Метод [imopenlines.operator.transfer](./imopenlines-operator-transfer.md) передает диалог сотруднику по идентификатору `USER_ID`. Идентификатор пользователя можно получить методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md).

**Открытые линии.** Метод [imopenlines.operator.transfer](./imopenlines-operator-transfer.md) передает диалог в очередь открытой линии по идентификатору `QUEUE_ID` или строке вида `queue<ID линии>`. Идентификатор линии — поле `ID` в ответе метода [imopenlines.config.list.get](../imopenlines-config-list-get.md).

{% note tip "Пользовательская документация" %}

- [Как настроить очередь сотрудников в открытых линиях](https://helpdesk.bitrix24.ru/open/26228062/)
- [Для чего нужна проверка доступности оператора в открытой линии](https://helpdesk.bitrix24.ru/open/25115040/)
- [Лимит на незакрытые диалоги у операторов открытых линий](https://helpdesk.bitrix24.ru/open/26928654/)

{% endnote %}

## Как начать работу

1. Получите идентификатор чата `CHAT_ID` методом [imopenlines.session.open](../sessions/imopenlines-session-open.md) или [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md)
2. Чтобы взять диалог в работу, вызовите [imopenlines.operator.answer](./imopenlines-operator-answer.md). Метод забирает диалог из очереди или у чат-бота. Чтобы забрать диалог у другого оператора, используйте [imopenlines.session.intercept](../sessions/imopenlines-session-intercept.md)
3. Если диалог нужно передать другому сотруднику или в другую очередь, вызовите [imopenlines.operator.transfer](./imopenlines-operator-transfer.md)
4. Если оператор не может обработать обращение, передайте его следующему оператору методом [imopenlines.operator.skip](./imopenlines-operator-skip.md)
5. Если обращение завершено, закройте его методом [imopenlines.operator.finish](./imopenlines-operator-finish.md). Диалог другого оператора закрывает метод [imopenlines.operator.another.finish](./imopenlines-operator-another-finish.md)
6. Если обращение некорректное, отметьте его как спам методом [imopenlines.operator.spam](./imopenlines-operator-spam.md)

### Правила вызова imopenlines.operator.transfer

- Передавайте только один параметр: `TRANSFER_ID`, `USER_ID` или `QUEUE_ID`
- В качестве `TRANSFER_ID` используйте идентификатор сотрудника или строку вида `queue<ID линии>`, например `queue3`
- Сотрудник должен быть активным, передать диалог себе нельзя

## Формат ответа методов

Все методы раздела возвращают `true` в поле `result`, если действие выполнено. При ошибке методы возвращают код и текст ошибки.

Метод [imopenlines.operator.spam](./imopenlines-operator-spam.md) возвращает `true` сразу после проверки доступа, даже если в чате нет активного диалога.

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [imopenlines.operator.answer](./imopenlines-operator-answer.md) | Назначает пользователя ответственным за диалог ||
|| [imopenlines.operator.finish](./imopenlines-operator-finish.md) | Завершает диалог, который ведет пользователь ||
|| [imopenlines.operator.another.finish](./imopenlines-operator-another-finish.md) | Завершает диалог другого оператора ||
|| [imopenlines.operator.skip](./imopenlines-operator-skip.md) | Передает диалог следующему оператору в очереди ||
|| [imopenlines.operator.spam](./imopenlines-operator-spam.md) | Отмечает диалог как спам ||
|| [imopenlines.operator.transfer](./imopenlines-operator-transfer.md) | Передает диалог другому оператору или в другую линию ||
|#
