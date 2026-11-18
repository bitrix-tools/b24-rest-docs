# Письма в почте: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Письма в почте Битрикс24 — это сообщения в почтовых ящиках пользователя, включая цепочки переписки и связанные действия.

Методы раздела позволяют:
- искать письма и получать отдельное письмо или цепочку писем
- отправлять новое письмо, ответ и пересылку
- перемещать письма в папки, спам и корзину
- создавать из письма связанные объекты в других инструментах
- получать список полей письма и описание конкретного поля

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с почтой в Битрикс24](https://helpdesk.bitrix24.ru/open/18258092/)

{% note info "" %}

Методы раздела относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

## Порядок работы с письмами

1. Получите идентификатор ящика методом [mail.mailbox.list](../mailbox/mail-mailbox-list.md), если нужно искать письма в одном ящике
2. Найдите письма методом [mail.message.list](./mail-message-list.md)
3. Получите текст и копию письма методом [mail.message.get](./mail-message-get.md) или ветку переписки методом [mail.message.thread](./mail-message-thread.md)
4. Отправьте новое письмо, ответ или пересылку методами [mail.message.send](./mail-message-send.md), [mail.message.reply](./mail-message-reply.md) и [mail.message.forward](./mail-message-forward.md)
5. Переместите письма в папку, спам или корзину методом [mail.message.movetofolder](./mail-message-movetofolder.md) или создайте по письму объект в другом инструменте Битрикс24

## Особенности методов

- Имена методов передаются в нижнем регистре: `mail.message.createtask`, а не `mail.message.createTask`. Имя в другом регистре Битрикс24 не находит
- Пользователь работает только с письмами из ящиков, к которым у него есть доступ. Если у пользователя нет ящиков, `mail.message.list` возвращает пустой список
- Методы `create*` и `removecrmactivity` принимают идентификатор письма `messageId`. Его возвращают `mail.message.list` и `mail.message.get`
- Получить список папок ящика через REST нельзя. Имя или путь папки для `mail.message.movetofolder` нужно знать заранее

## Связь с другими объектами

**Почтовый ящик.** Письмо принадлежит ящику, его идентификатор приходит в поле `mailboxId`. Чтобы искать письма в одном ящике, передайте `mailboxId` в [mail.message.list](./mail-message-list.md). Список ящиков возвращает [mail.mailbox.list](../mailbox/mail-mailbox-list.md).

**Отправитель и получатели.** Адрес отправителя в `from` должен быть доступен пользователю. Список доступных адресов и их `senderId` возвращает [mail.mailbox.senders](../mailbox/mail-mailbox-senders.md). Адреса получателей можно подобрать методами раздела [Получатели](../recipient/index.md).

**Объекты Битрикс24.** Из письма можно создать дело CRM, задачу, событие календаря, чат или сообщение Ленты новостей. Созданные связи приходят в поле `bindings` ответа [mail.message.list](./mail-message-list.md) и [mail.message.get](./mail-message-get.md). Методы для каждого объекта перечислены в [таблице](#all-methods). Дела CRM, созданные по письму, удаляет метод [mail.message.removecrmactivity](./mail-message-removecrmactivity.md).

## Обзор методов {#all-methods}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [mail.message.list](./mail-message-list.md) | Возвращает список писем из почтовых ящиков текущего пользователя ||
|| [mail.message.get](./mail-message-get.md) | Возвращает письмо по идентификатору ||
|| [mail.message.thread](./mail-message-thread.md) | Возвращает ветку переписки по идентификатору одного письма ||
|| [mail.message.send](./mail-message-send.md) | Отправляет новое письмо ||
|| [mail.message.reply](./mail-message-reply.md) | Отправляет ответ на письмо ||
|| [mail.message.forward](./mail-message-forward.md) | Пересылает письмо ||
|| [mail.message.movetofolder](./mail-message-movetofolder.md) | Перемещает письма в папку, спам или корзину ||
|| [mail.message.createcrmactivity](./mail-message-createcrmactivity.md) | Создает дело CRM из письма ||
|| [mail.message.removecrmactivity](./mail-message-removecrmactivity.md) | Удаляет дела CRM, созданные по письму ||
|| [mail.message.createtask](./mail-message-createtask.md) | Создает задачу из письма ||
|| [mail.message.createcalendarevent](./mail-message-createcalendarevent.md) | Создает событие календаря из письма ||
|| [mail.message.createchat](./mail-message-createchat.md) | Создает чат из письма ||
|| [mail.message.createfeedpost](./mail-message-createfeedpost.md) | Создает сообщение Ленты новостей из письма ||
|| [mail.message.field.list](./mail-message-field-list.md) | Возвращает список полей письма ||
|| [mail.message.field.get](./mail-message-field-get.md) | Возвращает описание поля письма ||
|#

## Продолжите изучение

- [{#T}](../mailbox/index.md)
- [{#T}](../recipient/index.md)
- [{#T}](../index.md)
