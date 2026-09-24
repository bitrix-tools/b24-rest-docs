# Коннекторы открытых линий: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннекторы открытых линий связывают внешний канал связи с Битрикс24. Через коннектор приложение регистрирует внешний канал, передает сообщения клиентов в открытую линию и получает события о сообщениях, диалогах, отключении коннектора и удалении линии.

{% note info "" %}

Методы раздела работают только в контексте [приложения](../../../settings/app-installation/index.md). Вызов через вебхук возвращает ошибку авторизации.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Какие каналы можно подключить в Контакт-центре Битрикс24](https://helpdesk.bitrix24.ru/open/28037030)

## Связь коннекторов с другими объектами

Коннектор работает не сам по себе: он подключается к открытой линии, а переписка в ней связана с чатом, сотрудниками, чат-ботами и объектами CRM.

**Открытые линии.** Линия принимает сообщения от коннектора, применяет настройки очереди и распределяет диалоги между сотрудниками. Настройками и сессиями управляет группа методов [imopenlines.*](../openlines/index.md), а полный состав модуля собран в разделе [Открытые линии](../index.md).

**CRM.** Диалоги открытых линий связываются с лидами, сделками, контактами и компаниями через CRM-трекер: он распознает контактные данные клиента во входящих сообщениях. Трекер можно отключить для отдельного сообщения параметром `message.disable_crm` метода [imconnector.send.messages](./imconnector-send-messages.md), а у коннекторов с группировкой чатов по `chat.id` он не запускается. Создать лид по диалогу вручную позволяет метод [imopenlines.crm.lead.create](../openlines/sessions/imopenlines-crm-lead-create.md).

**Пользователь.** В разделе встречаются два разных идентификатора пользователя. Собеседника из внешнего канала задает `user.id`, и то же значение передают в параметре `USER_ID` метода [imconnector.chat.name.set](./imconnector-chat-name-set.md). Сотрудника Битрикс24 задает `message.user_id` метода [imconnector.send.messages](./imconnector-send-messages.md) — от его имени уходит сообщение. Получить идентификатор сотрудника можно методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**Чат.** Переписка клиента и сотрудника хранится в чате открытой линии. Внешний идентификатор `chat.id` связывает чат внешней системы с чатом Битрикс24 в методах отправки, изменения и удаления сообщений.

**Чат-боты.** Боты могут отвечать в диалоге, переводить обращение на сотрудника и завершать сессию. Для действий бота в открытой линии используйте группу методов [imopenlines.bot.*](../openlines/chat-bots/index.md).

## Как подключить коннектор

1. Создайте открытую линию методом [imopenlines.config.add](../openlines/imopenlines-config-add.md) или получите идентификатор существующей линии методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md)
2. Зарегистрируйте коннектор методом [imconnector.register](./imconnector-register.md)
3. Активируйте коннектор на линии методом [imconnector.activate](./imconnector-activate.md)
4. Установите настройки коннектора методом [imconnector.connector.data.set](./imconnector-connector-data-set.md)
5. Проверьте готовность канала методом [imconnector.status](./imconnector-status.md)
6. Подпишитесь на [события коннектора](./events/index.md), чтобы получать сообщения открытой линии и передавать их во внешний канал

## Идентификаторы и коды

**Код коннектора.** Задается в параметре `ID` метода [imconnector.register](./imconnector-register.md) и хранится в нижнем регистре: `MyConnector` превращается в `myconnector`. Это же значение передают в параметре `CONNECTOR` остальных методов, получают в ключах ответа [imconnector.list](./imconnector-list.md) и в данных событий. Точка в коде коннектора запрещена.

**Идентификатор линии.** `LINE` — числовой идентификатор открытой линии, к которой подключен коннектор, например `107`. Получить его можно методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md). Состояние коннектора хранится отдельно для каждой пары «коннектор — линия»: на одной линии коннектор может быть включен, на другой выключен.

**Идентификаторы чата и сообщения.** Внешние идентификаторы `chat.id` и `message.id` приложение задает само и передает в методах отправки сообщений, например `channel-123` и `ext-msg-1007`. Внутренние идентификаторы `im.chat_id` и `im.message_id` создает Битрикс24, приложение получает их в событии [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md). Внешние идентификаторы не заменяют внутренние: в статусе доставки передают обе пары значений.

**Режим чатов.** Параметр `CHAT_GROUP` метода [imconnector.register](./imconnector-register.md) задает, как коннектор группирует переписку: по `chat.id` или по `user.id`. От этого режима зависит и обязательность параметра `USER_ID` в методе [imconnector.chat.name.set](./imconnector-chat-name-set.md).

## Формат ответа

Во всех ответах есть блок `time` с временем выполнения запроса, а в `result` приходит одна из четырех форм:

- логическое значение — [imconnector.activate](./imconnector-activate.md) и [imconnector.connector.data.set](./imconnector-connector-data-set.md)
- объект с вложенным полем `result` — [imconnector.register](./imconnector-register.md) и [imconnector.unregister](./imconnector-unregister.md)
- объект с данными — [imconnector.status](./imconnector-status.md) и [imconnector.list](./imconnector-list.md)
- конверт с полями `SUCCESS` и `DATA` — методы работы с сообщениями и [imconnector.chat.name.set](./imconnector-chat-name-set.md):

    ```json
    {
        "result": {
            "SUCCESS": true,
            "DATA": { "RESULT": [] }
        }
    }
    ```

    Состав `DATA` зависит от метода: у методов работы с сообщениями это объект с массивом `RESULT`, у метода переименования чата — объект со служебным пустым `RESULT`, у метода подтверждения доставки — пустой массив.

Ошибки приходят в двух формах:

- системная ошибка — HTTP-статус `400` или `403`, поля `error` и `error_description` в корне ответа
- прикладная ошибка регистрации — HTTP-статус `200`, а внутри `result` поля `result: false`, `error` и `error_description`

Во второй форме отвечают [imconnector.register](./imconnector-register.md) и [imconnector.unregister](./imconnector-unregister.md).

Методы отправки, изменения и удаления сообщений показывают частичный отказ внутри `DATA.RESULT`: у каждого элемента есть собственный признак `SUCCESS`, а при `SUCCESS: false` — массив `ERRORS` с текстами ошибок. Метод подтверждения доставки такого отчета не дает: он отвечает `SUCCESS: true`, даже если статус не применился к сообщению.

## Как работать с сообщениями

Сообщения клиента из внешнего канала передает в открытую линию метод [imconnector.send.messages](./imconnector-send-messages.md). Изменить и удалить уже переданные сообщения можно методами [imconnector.update.messages](./imconnector-update-messages.md) и [imconnector.delete.messages](./imconnector-delete-messages.md).

Обратное направление работает через события: приложение получает [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md), доставляет сообщение сотрудника во внешний канал и подтверждает доставку методом [imconnector.send.status.delivery](./imconnector-send-status-delivery.md).

## Где приложение появляется в интерфейсе

**Страница настройки коннектора.** Основная встройка коннектора — [SETTING_CONNECTOR](../../widgets/setting-connector.md). Привязку создает сам Битрикс24 при регистрации: адрес обработчика передают в параметре `PLACEMENT_HANDLER` метода [imconnector.register](./imconnector-register.md), вызывать [placement.bind](../../widgets/placement-bind.md) для нее не нужно.

**Плитка в Контакт-центре.** Чтобы вывести в Контакт-центре отдельную плитку приложения, используйте код встройки [CONTACT_CENTER](../../widgets/contact-center.md) и укажите его в параметре `PLACEMENT` метода [placement.bind](../../widgets/placement-bind.md).

## Обзор методов и событий {#all-methods}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода
>
> Кто может подписаться на события: любой пользователь

Все методы раздела доступны любому пользователю, кроме [imconnector.list](./imconnector-list.md) — он требует права изменения коннекторов открытых линий.

Все события раздела и состав данных, которые получает обработчик, описаны на странице [Обзор событий](./events/index.md).

### Коннектор

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imconnector.register](./imconnector-register.md) | Регистрирует коннектор ||
    || [imconnector.activate](./imconnector-activate.md) | Включает или выключает коннектор на линии ||
    || [imconnector.status](./imconnector-status.md) | Получает статус коннектора ||
    || [imconnector.connector.data.set](./imconnector-connector-data-set.md) | Устанавливает настройки коннектора ||
    || [imconnector.list](./imconnector-list.md) | Получает список коннекторов ||
    || [imconnector.unregister](./imconnector-unregister.md) | Отменяет регистрацию коннектора ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnImConnectorLineDelete](./events/on-im-connector-line-delete.md) | При удалении открытой линии ||
    || [OnImConnectorStatusDelete](./events/on-im-connector-status-delete.md) | При отключении коннектора на открытой линии ||
    |#

{% endlist %}

### Чаты и сообщения

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [imconnector.send.messages](./imconnector-send-messages.md) | Передает сообщения внешнего канала в Битрикс24 ||
    || [imconnector.update.messages](./imconnector-update-messages.md) | Изменяет отправленные сообщения ||
    || [imconnector.delete.messages](./imconnector-delete-messages.md) | Удаляет отправленные сообщения ||
    || [imconnector.send.status.delivery](./imconnector-send-status-delivery.md) | Обновляет статус `доставлено` ||
    || [imconnector.chat.name.set](./imconnector-chat-name-set.md) | Устанавливает новое имя чата ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [OnImConnectorDialogStart](./events/on-im-connector-dialog-start.md) | При создании диалога в открытой линии ||
    || [OnImConnectorDialogFinish](./events/on-im-connector-dialog-finish.md) | При закрытии диалога в открытой линии ||
    || [OnImConnectorMessageAdd](./events/on-im-connector-message-add.md) | При отправке сообщения из открытой линии во внешний канал ||
    || [OnImConnectorMessageUpdate](./events/on-im-connector-message-update.md) | При изменении сообщения в открытой линии ||
    || [OnImConnectorMessageDelete](./events/on-im-connector-message-delete.md) | При удалении сообщения в открытой линии ||
    |#

{% endlist %}

## Продолжите изучение

- [Как создать коннектор открытых линий для чата на сайте](../../../tutorials/openlines/example-connector.md)

