# Коннекторы открытых линий: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннекторы открытых линий связывают внешний канал связи с Битрикс24. Через коннектор приложение регистрирует канал, передает сообщения клиентов в открытую линию и получает события о сообщениях, диалогах и отключении линии.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Какие каналы можно подключить в Контакт-центре Битрикс24](https://helpdesk.bitrix24.ru/open/28037030)

## Связь коннекторов с другими объектами

**Открытые линии.** Линия принимает сообщения от коннектора, применяет настройки очереди и распределяет диалоги между сотрудниками. Настройками и сессиями управляет группа методов [imopenlines.*](../openlines/index.md).

**CRM.** Диалоги открытых линий можно связать с лидами, сделками, контактами и компаниями. Создать лид по диалогу позволяет метод [imopenlines.crm.lead.create](../openlines/sessions/imopenlines-crm-lead-create.md).

**Пользователь.** Идентификатор сотрудника `USER_ID` нужен для маршрутизации и добавления участников в чат. Получить его можно методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**Чат.** Переписка клиента и сотрудника хранится в чате открытой линии. Идентификаторы `chat.id` и `im.chat_id` связывают внешний чат с чатом Битрикс24 в методах отправки, изменения и удаления сообщений.

**Чат-боты.** Боты могут отвечать в диалоге, переводить обращение на сотрудника и завершать сессию. Для действий бота в открытой линии используйте группу методов [imopenlines.bot.*](../openlines/chat-bots/index.md).

## Как подключить коннектор

1. Зарегистрируйте коннектор методом [imconnector.register](imconnector-register.md)
2. Активируйте коннектор методом [imconnector.activate](imconnector-activate.md)
3. Установите данные коннектора методом [imconnector.connector.data.set](imconnector-connector-data-set.md)
4. Проверьте готовность канала методом [imconnector.status](imconnector-status.md)

## Как работать с сообщениями

Отправить сообщение можно методом [imconnector.send.messages](./imconnector-send-messages.md).

Отправленные сообщения можно изменять методом [imconnector.update.messages](imconnector-update-messages.md). Метод обновляет данные сообщения, пользователя и чата во внешнем канале.

Удалить сообщения открытых линий можно методом [imconnector.delete.messages](imconnector-delete-messages.md).

## Как добавить виджет в Контакт-центр

Чтобы добавить виджет коннектора в Контакт-центр, используйте код встройки [CONTACT_CENTER](../../widgets/contact-center.md). Этот код необходимо указать в параметре `PLACEMENT` метода [placement.bind](../../widgets/placement-bind.md).

## Обзор методов и событий {#all-methods}

> Scope: [`imconnector`](../../scopes/permissions.md), [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

{% note info "" %}

Методы `imconnector.*` в текущей версии не поддерживают работу через вебхуки.

{% endnote %}

### Коннектор

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imconnector.register](imconnector-register.md) | Регистрирует коннектор ||
    || [imconnector.activate](imconnector-activate.md) | Активирует коннектор ||
    || [imconnector.status](imconnector-status.md) | Получает статус коннектора ||
    || [imconnector.connector.data.set](imconnector-connector-data-set.md) | Изменяет настройки коннектора ||
    || [imconnector.list](imconnector-list.md) | Получает список коннекторов ||
    || [imconnector.unregister](imconnector-unregister.md) | Отменяет регистрацию коннектора ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnImConnectorLineDelete](./events/on-im-connector-line-delete.md) | При удалении открытой линии ||
    || [OnImConnectorStatusDelete](./events/on-im-connector-status-delete.md) | При отключении открытой линии ||
    |#

{% endlist %}

### Чаты и сообщения

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imconnector.send.messages](imconnector-send-messages.md) | Передает сообщения внешнего канала в Битрикс24 ||
    || [imconnector.update.messages](imconnector-update-messages.md) | Изменяет отправленные сообщения ||
    || [imconnector.delete.messages](imconnector-delete-messages.md) | Удаляет отправленные сообщения ||
    || [imconnector.send.status.delivery](imconnector-send-status-delivery.md) | Обновляет статус `доставлено` ||
    || [imconnector.chat.name.set](imconnector-chat-name-set.md) | Устанавливает новое имя чата ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnImConnectorDialogStart](./events/on-im-connector-dialog-start.md) | При создании диалога ||
    || [OnImConnectorDialogFinish](./events/on-im-connector-dialog-finish.md) | При закрытии диалога ||
    || [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md) | При добавлении нового сообщения ||
    || [OnImConnectorMessageDelete](./events/on-im-connector-message-delete.md) | При удалении сообщений ||
    || [OnImConnectorMessageUpdate](./events/on-im-connector-message-update.md) | При изменении сообщений ||
    |#

{% endlist %}

## Продолжите изучение

- [Как создать коннектор открытых линий для чата на сайте](../../../tutorials/openlines/example-connector.md)

