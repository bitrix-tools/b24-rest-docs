# Диалоги открытых линий: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Диалоги открытых линий — это чаты с клиентами через мессенджеры, социальные сети или онлайн-чаты.

В диалоге может быть несколько сессий. Каждая сессия — это один цикл обработки обращений: подключение оператора, обмен сообщениями, завершение и оценка.

Методы раздела позволяют:

- открывать диалог по данным внешнего клиента
- запускать сессии и управлять ими
- подключать операторов
- менять режимы диалога
- передавать результаты общения в CRM

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать со списком диалогов в открытых линиях](https://helpdesk.bitrix24.ru/open/25749858/)

## Связь диалогов с другими объектами

**Открытые линии.** Диалог принадлежит открытой линии и наследует ее правила обработки: очереди, маршрутизацию и режимы работы. Настройки линии меняйте методами [imopenlines.config.*](../index.md#config). Идентификатор линии `LINE_ID` входит в код пользователя `USER_CODE`.

**Чат.** Каждый диалог — это чат открытой линии с типом `lines`. Большинство методов раздела принимают числовой идентификатор этого чата `CHAT_ID`. Написать клиенту из карточки CRM и сохранить сообщение в быстрые ответы можно методами раздела [Сообщения](../messages/index.md).

**Пользователь внешнего канала.** Клиент связан с диалогом через код пользователя `USER_CODE`: коннектор, линия, чат и пользователь в канале. По коду можно найти чат методом [imopenlines.session.open](./imopenlines-session-open.md).

**Операторы.** Операторы участвуют в обработке сессий: принимают диалоги, передают их и завершают обращения. Для сценариев операторов используйте методы раздела [Операторы](../operators/index.md).

**CRM.** Диалог можно связать с CRM: метод [imopenlines.crm.lead.create](./imopenlines-crm-lead-create.md) создает лид по данным клиента. Привязки диалога к лиду, контакту, компании и сделке возвращает поле `entity_data_2` метода [imopenlines.dialog.get](./imopenlines-dialog-get.md). Дальше с лидом работают методы [crm.lead.*](../../../crm/leads/index.md).

## Основные идентификаторы

#|
|| **Идентификатор** | **Описание** ||
|| `USER_CODE` | Код пользователя из внешнего канала связи. Формат: ```<connector>|<LINE_ID>|<CONNECTOR_CHAT_ID>|<CONNECTOR_USER_ID>```. Пример: ```livechat|22|1761|587```. Возвращается в поле `entity_id` метода [imopenlines.dialog.get](./imopenlines-dialog-get.md) ||
|| `CHAT_ID` | Внутренний идентификатор чата в Битрикс24. Основной параметр для методов работы с диалогом. Формат: целое число. Пример: `2043` ||
|| `DIALOG_ID` | Строковое представление чата. Используется только в [`imopenlines.dialog.get`](./imopenlines-dialog-get.md). Формат: `chat<ID>`. Пример: `chat2043` ||
|| `SESSION_ID` | Идентификатор отдельной сессии внутри диалога. Формат: целое число. Пример: `3567`. Текущую сессию можно найти в шестом элементе поля `entity_data_1` метода [imopenlines.dialog.get](./imopenlines-dialog-get.md) или в поле `sessionId` метода [imopenlines.session.history.get](./imopenlines-session-history-get.md) ||
|#

## Как работать с диалогами

### Получить данные диалога

Чтобы получить данные диалога, используйте [imopenlines.dialog.get](./imopenlines-dialog-get.md).

Если диалог нужно найти по данным внешнего клиента, сначала вызовите [imopenlines.session.open](./imopenlines-session-open.md), затем передайте полученный идентификатор в `imopenlines.dialog.get`.

### Запустить сессию

Для старта нового цикла обработки в текущем чате вызовите [imopenlines.session.start](./imopenlines-session-start.md).

Если клиент начал новый вопрос в текущей сессии, закройте ее и начните новую с его сообщения методом [imopenlines.message.session.start](./imopenlines-message-session-start.md).

### Подключить оператора

Чтобы оператор вошел в диалог, используйте [imopenlines.session.join](./imopenlines-session-join.md).

Чтобы забрать диалог у другого оператора или чат-бота, используйте [imopenlines.session.intercept](./imopenlines-session-intercept.md).

### Получить историю

Вызовите [imopenlines.session.history.get](./imopenlines-session-history-get.md), чтобы получить сообщения сессии и данные участников. Метод возвращает сообщения постранично, до 200 за запрос.

### Управлять режимами диалога

Для закрепления и открепления диалогов используйте [imopenlines.session.mode.pin](./imopenlines-session-mode-pin.md), [imopenlines.session.mode.pinAll](./imopenlines-session-mode-pin-all.md), [imopenlines.session.mode.unpinAll](./imopenlines-session-mode-unpin-all.md).

Скрытый режим переключает метод [imopenlines.session.mode.silent](./imopenlines-session-mode-silent.md). Развитие метода остановлено, не используйте его в новых интеграциях.

### Завершить обработку и передать данные в CRM

Руководитель может оценить работу оператора в сессии методом [imopenlines.session.head.vote](./imopenlines-session-head-vote.md). Чтобы сохранить клиента в CRM, создайте лид методом [imopenlines.crm.lead.create](./imopenlines-crm-lead-create.md). Если линия настроена на сделки, метод создает сделку с контактом.

{% note tip "Пользовательская документация" %}

- [Оценка качества обслуживания в Открытых линиях Битрикс24](https://helpdesk.bitrix24.ru/open/5667405/)
- [Лимит на незакрытые диалоги у операторов открытых линий](https://helpdesk.bitrix24.ru/open/26928654/)
- [Как работать со статистикой диалогов в открытых линиях](https://helpdesk.bitrix24.ru/open/25904116/)

{% endnote %}

## Формат ответа и обработка ошибок

Большинство методов раздела возвращают объект `result` и служебный блок `time`.

При интеграции проверяйте:

- HTTP-статус ответа
- поле `error` и текст `error_description` при статусе `400`
- коды ошибок, которые описаны на странице метода

Часть методов возвращает одну и ту же ошибку `ACCESS_DENIED` и при отсутствии прав, и при неверном идентификаторе. Поэтому при такой ошибке проверьте и права пользователя на диалог, и значения `CHAT_ID`, `SESSION_ID`, `DIALOG_ID`, `USER_CODE`.

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

### Запустить и получить диалог

#|
|| **Метод** | **Описание** ||
|| [imopenlines.session.open](./imopenlines-session-open.md) | Получает идентификатор чата по коду пользователя ||
|| [imopenlines.dialog.get](./imopenlines-dialog-get.md) | Возвращает данные чата открытой линии по одному из идентификаторов ||
|| [imopenlines.session.start](./imopenlines-session-start.md) | Запускает новую сессию в текущем чате ||
|| [imopenlines.message.session.start](./imopenlines-message-session-start.md) | Закрывает текущую сессию и начинает новую с сообщения клиента ||
|| [imopenlines.session.history.get](./imopenlines-session-history-get.md) | Возвращает сообщения сессии постранично ||
|#

### Подключить оператора к диалогу

#|
|| **Метод** | **Описание** ||
|| [imopenlines.session.join](./imopenlines-session-join.md) | Присоединяет текущего оператора к диалогу ||
|| [imopenlines.session.intercept](./imopenlines-session-intercept.md) | Забирает диалог у текущего оператора или чат-бота ||
|#

### Управлять режимами диалога

#|
|| **Метод** | **Описание** ||
|| [imopenlines.session.mode.pin](./imopenlines-session-mode-pin.md) | Закрепляет или открепляет выбранный диалог ||
|| [imopenlines.session.mode.pinAll](./imopenlines-session-mode-pin-all.md) | Закрепляет все доступные диалоги за текущим оператором ||
|| [imopenlines.session.mode.unpinAll](./imopenlines-session-mode-unpin-all.md) | Открепляет все закрепленные диалоги текущего оператора ||
|| [imopenlines.session.mode.silent](./imopenlines-session-mode-silent.md) | Включает или выключает скрытый режим диалога. Развитие метода остановлено, не используйте его в новых интеграциях ||
|#

### Сохранить результаты и создать лид

#|
|| **Метод** | **Описание** ||
|| [imopenlines.session.head.vote](./imopenlines-session-head-vote.md) | Сохраняет оценку и комментарий руководителя к работе оператора ||
|| [imopenlines.crm.lead.create](./imopenlines-crm-lead-create.md) | Создает лид CRM по данным клиента из диалога ||
|#
