# Открытые линии Битрикс24: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Открытые линии собирают обращения клиентов с сайтов, из мессенджеров и социальных сетей в одну очередь и передают их операторам. В REST с ними работают три связанные группы методов:

- [Открытые линии](./openlines/index.md) — настроить линию, очередь операторов и обработать диалог
- [Коннекторы открытых линий](./imconnector/index.md) — подключить собственный канал связи
- [Статистика открытых линий](./statistics/index.md) — выгрузить показатели для отчетов во внешней системе

Для собственного канала связи нужны первые две группы: коннектор регистрирует канал, а открытые линии обрабатывают обращения из него. Открытую линию другого Битрикс24 подключают без своего коннектора.

{% note info "" %}

Методы `imconnector.*` работают только в контексте [приложения](../../settings/app-installation/index.md). Вызов через вебхук возвращает ошибку авторизации.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Контакт-центр в Битрикс24](https://helpdesk.bitrix24.ru/open/27978904/)

{% note tip "Частые кейсы и сценарии" %}

- [Как создать коннектор открытых линий для чата на сайте](../../tutorials/openlines/example-connector.md)
- [Как найти CRM-объект, созданный из диалога открытой линии](../../tutorials/openlines/find-crm-object-by-dialog.md)

{% endnote %}

## Связь с другими объектами

Открытые линии связаны с чатами и сессиями, участниками диалога, сообщениями и чат-ботами, CRM, универсальными списками и данными статистики.

**Чат.** Обращение клиента обрабатывается в чате открытой линии. Чат связывает сообщения, операторов и сессии, а его идентификатор `CHAT_ID` — сквозной параметр методов раздела, начиная с группы [Диалоги открытых линий](./openlines/sessions/index.md).

**Сессия.** Внутри чата обращение проходит как сессия и получает свой `SESSION_ID`. Чтобы запустить сессию, прочитать историю, подключить оператора и переключить режим, используйте методы той же группы [Диалоги открытых линий](./openlines/sessions/index.md).

**Оператор.** Линия распределяет обращения между операторами из очереди. Очередь настраивают методы группы [Открытые линии](./openlines/index.md), а действия оператора в активном диалоге выполняют методы группы [Операторы открытых линий](./openlines/operators/index.md) от имени авторизованного пользователя. Получателя перевода в этой группе принимает метод [imopenlines.operator.transfer](./openlines/operators/imopenlines-operator-transfer.md): сотрудника — в `USER_ID`, линию, в очередь которой уйдет диалог, — в `QUEUE_ID`.

**Внешний пользователь.** Клиент внешнего канала связан с диалогом через `USER_CODE`. По этому коду методы группы [Диалоги открытых линий](./openlines/sessions/index.md) находят чат и сессию клиента.

**Сообщение.** Переписка клиента и оператора связана с чатом и сессией. Отправить сообщение в чат, привязанный к объекту CRM, можно методом [imopenlines.crm.message.add](./openlines/messages/imopenlines-crm-message-add.md), сохранить быстрый ответ — методом [imopenlines.message.quick.save](./openlines/messages/imopenlines-message-quick-save.md). Чтобы реагировать на добавление, изменение и удаление сообщений, используйте [события открытых линий](./openlines/events/index.md).

**Чат-бот.** Бот отправляет сообщения, переключает диалог на оператора и завершает сессию методами группы [Чат-боты в открытых линиях](./openlines/chat-bots/index.md).

**CRM.** Чат открытой линии привязывается к объекту CRM — лиду, сделке, контакту или компании. Методы группы [Чаты CRM](./openlines/chats/index.md) находят такие чаты и управляют их участниками: тип объекта они принимают в `CRM_ENTITY_TYPE`, идентификатор — в `CRM_ENTITY`. Метод [imopenlines.crm.lead.create](./openlines/sessions/imopenlines-crm-lead-create.md) создает лид по итогам диалога.

**Универсальные списки.** Быстрые ответы линии хранятся в универсальном списке. Его идентификатор передается в параметре `QUICK_ANSWERS_IBLOCK_ID`. Прочитать значение можно методом [imopenlines.config.get](./openlines/imopenlines-config-get.md), а задать при создании или обновлении линии — методами [imopenlines.config.add](./openlines/imopenlines-config-add.md) и [imopenlines.config.update](./openlines/imopenlines-config-update.md).

**Данные статистики.** Накопленные показатели связаны с сессиями, линиями и операторами. Методы группы [Статистика открытых линий](./statistics/index.md) ограничивают выборку по линии и оператору, а отдельные сессии детализируют по `sessionId`.

## Ключевые идентификаторы

#|
|| **Идентификатор** | **Описание** | **Пример** | **Как получить** ||
|| `CHAT_ID` | Идентификатор чата открытой линии. Нужен, чтобы работать с диалогом, сообщениями, операторами и чат-ботами | `1763` | [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md) по коду `USER_CODE` — в поле `chatId`, [imopenlines.dialog.get](./openlines/sessions/imopenlines-dialog-get.md) — в поле `id` ||
|| `SESSION_ID` | Идентификатор сессии внутри чата. Нужен, чтобы прочитать историю, обработать обращение и получить детальную статистику | `321` | [imopenlines.session.history.get](./openlines/sessions/imopenlines-session-history-get.md) — в поле `sessionId`, по известному `CHAT_ID`. Выборкой по линии, каналу и периоду — [imopenlines.v2.Session.list](./statistics/imopenlines-v2-session-list.md). Идентификатор входит и в строку `entity_data_1` ответа [imopenlines.dialog.get](./openlines/sessions/imopenlines-dialog-get.md). Правило разбора этой строки описано на странице метода `imopenlines.session.history.get` ||
|| `USER_CODE` | Внешний код пользователя канала связи. Нужен, чтобы однозначно связать внешнего клиента с чатом и сессией в линии. Составное значение формата ```<connector>|<LINE_ID>|<CONNECTOR_CHAT_ID>|<CONNECTOR_USER_ID>``` | ```livechat|22|1761|587``` | Внешний канал собирает его из четырех частей: код коннектора, идентификатор линии, идентификатор чата и идентификатор собеседника в самом канале. Готовое значение возвращает [imopenlines.dialog.get](./openlines/sessions/imopenlines-dialog-get.md) в поле `entity_id`, принимает — [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md) ||
|| `USER_ID` | Идентификатор пользователя Битрикс24. Нужен, чтобы назначить получателя при передаче диалога, указать отправителя в [imopenlines.crm.message.add](./openlines/messages/imopenlines-crm-message-add.md) и отбирать сессии по оператору. В большинстве методов статистики тот же идентификатор называется `operatorId` и `operatorIdList`, в [imopenlines.v2.Operator.list](./statistics/imopenlines-v2-operator-list.md) — `userId` и `userIdList` | `1` | [user.get](../user/user-get.md), [user.search](../user/user-search.md) ||
|| `LINE`/`CONFIG_ID` | Идентификатор открытой линии. Нужен, чтобы читать данные линии, менять настройки, связывать с линией сообщения коннектора и ограничивать выборку статистики. В методах `imconnector.*` называется `LINE`, в методах, которые читают, изменяют и удаляют конкретную линию, — `CONFIG_ID`, в методах статистики — `configId` и `configIdList` | `22` | [imopenlines.config.add](./openlines/imopenlines-config-add.md) возвращает идентификатор созданной линии в `result`, [imopenlines.config.list.get](./openlines/imopenlines-config-list-get.md) — идентификаторы существующих линий ||
|| `CONNECTOR` | Идентификатор коннектора. Нужен, чтобы указать, к какому подключенному каналу относится вызов `imconnector.*`. Хранится в нижнем регистре | `myconnector` | Задается в параметре `ID` метода [imconnector.register](./imconnector/imconnector-register.md), затем передается, например, методам [imconnector.activate](./imconnector/imconnector-activate.md) и [imconnector.send.messages](./imconnector/imconnector-send-messages.md) ||
|| `source` | Код канала открытой линии в методах статистики. Нужен, чтобы отбирать сессии по каналу обращения. У собственного коннектора совпадает с его `CONNECTOR`. У встроенных каналов свой код, он может не совпадать с первой частью `USER_CODE` | `livechat` | Готовые значения приходят в поле `source` ответа [imopenlines.v2.Session.list](./statistics/imopenlines-v2-session-list.md). Коды доступных каналов возвращает [imconnector.list](./imconnector/imconnector-list.md) ||
|#

Идентификаторы `CHAT_ID` и `USER_ID` приведены в таблице в том значении, которое им дают методы `imopenlines.*`. В методе [imconnector.chat.name.set](./imconnector/imconnector-chat-name-set.md) те же имена означают другое — это идентификаторы чата и собеседника во внешней системе, а не в Битрикс24.

Метод [imconnector.send.messages](./imconnector/imconnector-send-messages.md) возвращает `CHAT_ID` Битрикс24 в объекте `session` — это значение передают дальше в методы `imopenlines.*`. Полный разбор идентификаторов коннектора — в разделе [Коннекторы открытых линий](./imconnector/index.md).

## Как начать работу

### Подключить собственный канал связи через коннектор

1. Создайте открытую линию методом [imopenlines.config.add](./openlines/imopenlines-config-add.md) или получите идентификатор существующей линии методом [imopenlines.config.list.get](./openlines/imopenlines-config-list-get.md) — передавайте его в параметре `LINE` начиная с третьего шага
2. Зарегистрируйте коннектор методом [imconnector.register](./imconnector/imconnector-register.md)
3. Включите коннектор на линии методом [imconnector.activate](./imconnector/imconnector-activate.md)
4. Задайте настройки канала методом [imconnector.connector.data.set](./imconnector/imconnector-connector-data-set.md). Порядок важен: настройки появятся в интерфейсе оператора только после активации коннектора
5. Проверьте готовность канала методом [imconnector.status](./imconnector/imconnector-status.md)
6. Передайте сообщение клиента методом [imconnector.send.messages](./imconnector/imconnector-send-messages.md)
7. Подпишитесь на [события коннекторов](./imconnector/events/index.md), чтобы получать ответы операторов и передавать их во внешний канал

### Подключить открытую линию другого Битрикс24

1. Подключите линию методом [imopenlines.network.join](./openlines/imopenlines-network-join.md) по 32-символьному коду `CODE` из карточки линии в Контакт-центре
2. Отправьте сообщение пользователю от имени подключенной линии методом [imopenlines.network.message.add](./openlines/imopenlines-network-message-add.md) — по тому же коду `CODE`

### Обработать обращение на своей линии

1. Получите идентификатор чата методом [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md) по коду `USER_CODE`
2. Примите диалог методом [imopenlines.operator.answer](./openlines/operators/imopenlines-operator-answer.md)
3. Прочитайте переписку методом [imopenlines.session.history.get](./openlines/sessions/imopenlines-session-history-get.md)
4. Завершите обращение методом [imopenlines.operator.finish](./openlines/operators/imopenlines-operator-finish.md)

Передать диалог другому оператору можно методом [imopenlines.operator.transfer](./openlines/operators/imopenlines-operator-transfer.md). Для автоматизации подключите [события открытых линий](./openlines/events/index.md).

### Построить отчет по открытым линиям во внешней системе

1. Получите агрегированные показатели за период с `dateFrom` по `dateTo` методом [imopenlines.v2.Stat.get](./statistics/imopenlines-v2-stat-get.md)
2. Получите список сессий методом [imopenlines.v2.Session.list](./statistics/imopenlines-v2-session-list.md) — период у него задают парой `dateCreateFrom` и `dateCreateTo` либо `dateCloseFrom` и `dateCloseTo`
3. Детализируйте выбранные сессии методами [imopenlines.v2.Session.Stat.get](./statistics/imopenlines-v2-session-stat-get.md) и [imopenlines.v2.Session.Transfer.list](./statistics/imopenlines-v2-session-transfer-list.md) — оба принимают идентификаторы сессий из второго шага
4. Выгрузите оцененные клиентом сессии методом [imopenlines.v2.Session.Rating.list](./statistics/imopenlines-v2-session-rating-list.md) — период у него задают обязательные `dateVoteFrom` и `dateVoteTo`, это даты оценки. Вместе с оценкой клиента метод возвращает оценку руководителя, если она доступна по тарифу и правам пользователя
5. Получите текущую нагрузку операторов методом [imopenlines.v2.Operator.list](./statistics/imopenlines-v2-operator-list.md)

## Ограничения и версии

- Ветка `imopenlines.v2.*` — единственная для статистики. Здесь `v2` — часть имени метода, а не префикс версии API: предыдущей версии этих методов в REST нет
- Параллельных и устаревших веток методов в разделе нет
- Метод [imopenlines.session.mode.silent](./openlines/sessions/imopenlines-session-mode-silent.md) помечен плашкой `DEPRECATED`, но продолжает работать. Это единственный метод раздела, у которого остановлено развитие
- Методы статистики в облаке работают, если тариф позволяет использовать отчеты открытых линий. В коробочной версии ограничение тарифа не применяется
- Метод [imopenlines.network.message.add](./openlines/imopenlines-network-message-add.md) не работает при сессионной авторизации и отправляет каждому пользователю не больше одного сообщения в неделю. На аккаунтах с лицензией Партнера (NFR) лимит не действует

## Обзор методов и событий {#all-methods}

> Scope: [`imopenlines`](../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода
>
> Кто может подписаться: любой пользователь

Методы коннекторов входят в тот же scope `imopenlines`. Методам группы [Чат-боты в открытых линиях](./openlines/chat-bots/index.md) нужны два scope: `imopenlines` и `imbot`. Подписаться на события можно только из приложения — методом [event.bind](../events/event-bind.md), работа с событиями описана в статье [Концепция и преимущества обработки событий](../events/index.md).

Ниже собраны справочные статьи раздела и ключевые методы и события каждой группы. Полные списки методов и событий, а также права, параметры, схемы ответа, примеры и коды ошибок — в обзорах подразделов и на страницах методов.

### Справочные материалы

#|
|| **Статья** | **Описание** ||
|| [Типы данных статистики открытых линий](./statistics/data-types.md) | Структуры объектов `session`, `rating`, `transfer` и других, которые возвращают методы `imopenlines.v2.*` ||
|#

### Настройка линий и работа с диалогами

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Открытые линии](./openlines/index.md) | Для настройки линий, очередей операторов и подключения Битрикс24 Network | [imopenlines.config.add](./openlines/imopenlines-config-add.md), [imopenlines.config.list.get](./openlines/imopenlines-config-list-get.md), [imopenlines.network.join](./openlines/imopenlines-network-join.md) ||
|| [Диалоги открытых линий](./openlines/sessions/index.md) | Для работы с чатами, сессиями, историей переписки, режимами диалога и оценкой руководителя за завершенную сессию | [imopenlines.session.open](./openlines/sessions/imopenlines-session-open.md), [imopenlines.dialog.get](./openlines/sessions/imopenlines-dialog-get.md), [imopenlines.session.history.get](./openlines/sessions/imopenlines-session-history-get.md) ||
|| [Операторы открытых линий](./openlines/operators/index.md) | Для действий оператора в активном диалоге: принять, передать, завершить | [imopenlines.operator.answer](./openlines/operators/imopenlines-operator-answer.md), [imopenlines.operator.transfer](./openlines/operators/imopenlines-operator-transfer.md), [imopenlines.operator.finish](./openlines/operators/imopenlines-operator-finish.md) ||
|| [Сообщения открытых линий](./openlines/messages/index.md) | Для отправки сообщений в чат, привязанный к объекту CRM, и сохранения быстрых ответов | [imopenlines.crm.message.add](./openlines/messages/imopenlines-crm-message-add.md), [imopenlines.message.quick.save](./openlines/messages/imopenlines-message-quick-save.md) ||
|| [Чаты CRM](./openlines/chats/index.md) | Для поиска чатов, связанных с объектами CRM, и управления их участниками | [imopenlines.crm.chat.get](./openlines/chats/imopenlines-crm-chat-get.md), [imopenlines.crm.chat.user.add](./openlines/chats/imopenlines-crm-chat-user-add.md) ||
|| [Чат-боты в открытых линиях](./openlines/chat-bots/index.md) | Для автоматизации диалога ботом: ответить, перевести на оператора, закрыть сессию | [imopenlines.bot.session.message.send](./openlines/chat-bots/imopenlines-bot-session-message-send.md), [imopenlines.bot.session.operator](./openlines/chat-bots/imopenlines-bot-session-operator.md), [imopenlines.bot.session.finish](./openlines/chat-bots/imopenlines-bot-session-finish.md) ||
|#

#|
|| **Раздел** | **Когда использовать** | **Ключевые события** ||
|| [События открытых линий](./openlines/events/index.md) | Для реакции на сообщения, начало и завершение сессии | [OnOpenLineMessageAdd](./openlines/events/on-open-line-message-add.md), [OnSessionStart](./openlines/events/on-session-start.md), [OnSessionFinish](./openlines/events/on-session-finish.md) ||
|#

### Коннекторы и статистика

#|
|| **Раздел** | **Когда использовать** | **Ключевые методы** ||
|| [Коннекторы открытых линий](./imconnector/index.md) | Для подключения собственного канала связи и обмена сообщениями с ним | [imconnector.register](./imconnector/imconnector-register.md), [imconnector.activate](./imconnector/imconnector-activate.md), [imconnector.send.messages](./imconnector/imconnector-send-messages.md) ||
|| [Статистика открытых линий](./statistics/index.md) | Для отчетов и дашбордов во внешней системе: агрегаты, сессии, оценки, переводы, нагрузка операторов | [imopenlines.v2.Stat.get](./statistics/imopenlines-v2-stat-get.md), [imopenlines.v2.Session.list](./statistics/imopenlines-v2-session-list.md), [imopenlines.v2.Operator.list](./statistics/imopenlines-v2-operator-list.md) ||
|#

#|
|| **Раздел** | **Когда использовать** | **Ключевые события** ||
|| [События коннекторов](./imconnector/events/index.md) | Для реакции на ответы операторов, создание и закрытие диалога, отключение статуса канала и удаление линии | [OnImConnectorMessageAdd](./imconnector/events/on-im-connector-message-add.md), [OnImConnectorDialogStart](./imconnector/events/on-im-connector-dialog-start.md), [OnImConnectorStatusDelete](./imconnector/events/on-im-connector-status-delete.md) ||
|#
