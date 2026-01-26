# Коннекторы открытых линий: обзор методов

Коннекторы открытых линий — это инструмент для интеграции внешних мессенджеров и социальных сетей с Битрикс24. Коннекторы позволяют:

-  отвечать на сообщения клиентов из разных каналов в едином интерфейсе.

-  подключать чат-ботов, чтобы автоматизировать общение с клиентами.

-  анализировать статистику диалогов, чтобы оценить эффективность коммуникаций.

> Быстрый переход: [все методы](#all-methods) 
>
> Пользовательская документация: [Подключение каналов Контакт-центра](https://helpdesk.bitrix24.ru/open/7872935/)

## Связь коннекторов с другими объектами

**Открытые линии**. Собирают сообщения с коннекторов, управляют очередями и распределяют сообщения между сотрудниками. Работать с открытыми линиями следует с помощью группы методов [imopenlines.*](../openlines/index.md).

**CRM**. На основе сообщений можно автоматически создавать лиды и сделки методами [crm.lead.add](../../crm/leads/crm-lead-add.md) и [crm.deal.add](../../crm/deals/crm-deal-add.md).

**Пользователь**. Получить идентификатор пользователя позволяют методы [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**Чат**. За переписку с пользователями отвечают методы [im.chat.*](../../chats/index.md) и [im.message.*](../../chats/messages/index.md).

**Чат-боты**. Настройка автоматических ответов и чат-ботов выполняется с помощью методов [imbot.*](../../chat-bots/index.md)

## Как подключить коннектор

1. Зарегистрируйте коннектор с помощью метода [imconnector.register](imconnector-register.md).

2. Активируйте его методом [imconnector.activate](imconnector-activate.md).

3. Установите данные коннектора методом [imconnector.connector.data.set](imconnector-connector-data-set.md).

4. Проверьте статус коннектора методом [imconnector.status](imconnector-status.md) и убедитесь, что он готов к работе.

## Как работать с сообщениями

Отправить сообщение можно методом [imconnector.send.messages](./imconnector-send-messages.md).

Отправленные сообщения можно изменять методом [imconnector.update.messages](imconnector-update-messages.md). Метод изменяет параметры пользователя, сообщения и чата.

Удалить сообщения открытых линий можно методом [imconnector.delete.messages](imconnector-delete-messages.md).

## Как добавить виджет в Контакт-центр

Чтобы добавить виджет коннектора в Контакт-центр, используйте код встройки [CONTACT_CENTER](../../widgets/contact-center.md). Этот код необходимо указать в параметре `PLACEMENT` метода [placement.bind](../../widgets/placement-bind.md).

## Обзор методов и событий {#all-methods}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользовательs

{% note info "" %}

Методы `imconnector.*` в текущей версии не поддерживают работу через вебхуки.

{% endnote %}

### Коннектор

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imconnector.register](imconnector-register.md) | Зарегистрировать коннектор ||
    || [imconnector.activate](imconnector-activate.md) | Активировать коннектор ||
    || [imconnector.status](imconnector-status.md) | Получить статус коннектора ||
    || [imconnector.connector.data.set](imconnector-connector-data-set.md) | Изменить настройки коннектора ||
    || [imconnector.list](imconnector-list.md) | Получить список коннекторов ||
    || [imconnector.unregister](imconnector-unregister.md) | Отменить регистрацию коннектора ||
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
    || [imconnector.send.messages](imconnector-send-messages.md) | Отправить сообщения в Битрикс24 ||
    || [imconnector.update.messages](imconnector-update-messages.md) | Изменить отправленные сообщения ||
    || [imconnector.delete.messages](imconnector-delete-messages.md) | Удалить отправленные сообщения ||
    || [imconnector.send.status.delivery](imconnector-send-status-delivery.md) | Обновить статус `доставлено` ||
    || [imconnector.send.status.reading](imconnector-send-status-reading.md) | Обновить статус `прочитано` ||
    || [imconnector.chat.name.set](imconnector-chat-name-set.md) | Установить новое имя чата ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnImConnectorDialogStart](./events/on-im-connector-dialog-start.md) | При создании диалога ||
    || [OnImConnectorDialogFinish](./events/on-im-connector-dialog-finish.md) | При закрытии диалога ||
    || [OnImConnectorMessageAdd](./events/index.md) | При добавлении нового сообщения ||
    || [OnImConnectorMessageDelete](./events/on-im-connector-message-delete.md) | При удалении сообщений ||
    || [OnImConnectorMessageUpdate](./events/on-im-connector-message-update.md) | При изменении сообщений ||
    |#

{% endlist %}

## Продолжите изучение

- [Как создать коннектор Открытых линий для онлайн-чата на сайте](../../../tutorials/openlines/example-connector.md)
