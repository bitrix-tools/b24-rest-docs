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

## Когда использовать каждый метод

Используйте [mail.message.list](./mail-message-list.md), когда нужно найти письма в ящиках текущего пользователя по условиям фильтра.

Используйте [mail.message.get](./mail-message-get.md), когда нужно получить письмо по его `id`.

Используйте [mail.message.thread](./mail-message-thread.md), когда нужно получить цепочку писем по `id` одного письма.

Используйте [mail.message.send](./mail-message-send.md), [mail.message.reply](./mail-message-reply.md) и [mail.message.forward](./mail-message-forward.md), когда нужно отправить новое письмо, ответ или пересылку.

Используйте [mail.message.movetofolder](./mail-message-movetofolder.md), когда нужно переместить письма в папку, спам или корзину.

Используйте [mail.message.createcrmactivity](./mail-message-createcrmactivity.md) и [mail.message.removecrmactivity](./mail-message-removecrmactivity.md), когда нужно создать или удалить связь письма с делом CRM.

Используйте [mail.message.createtask](./mail-message-createtask.md), [mail.message.createcalendarevent](./mail-message-createcalendarevent.md), [mail.message.createchat](./mail-message-createchat.md) и [mail.message.createfeedpost](./mail-message-createfeedpost.md), когда нужно передать содержание письма в задачу, календарь, чат или Ленту новостей.

Используйте [mail.message.field.list](./mail-message-field-list.md) и [mail.message.field.get](./mail-message-field-get.md), когда нужно:
- узнать доступные поля письма
- получить типы и метаданные конкретного поля

## Порядок работы с письмами

1. Получите список писем через [mail.message.list](./mail-message-list.md)
2. Получите полные данные письма через [mail.message.get](./mail-message-get.md) или цепочку через [mail.message.thread](./mail-message-thread.md)
3. Выполните целевое действие: отправьте новое письмо, ответ или пересылку через [mail.message.send](./mail-message-send.md), [mail.message.reply](./mail-message-reply.md), [mail.message.forward](./mail-message-forward.md)
4. При необходимости переместите письма в другую папку через [mail.message.movetofolder](./mail-message-movetofolder.md) или создайте связанные объекты в CRM, задачах, календаре, чате и Ленте новостей
5. Уточните структуру полей через `*.field.list` и `*.field.get`

## Ограничения раздела

- Текущий пользователь может работать только с письмами из ящиков, к которым у него есть доступ
- Для большинства операций нужен корректный `id` письма из `mail.message.list` или `mail.message.get`

## Связь с другими объектами

**Почтовый ящик.** Методы раздела работают с письмами в почтовых ящиках пользователя. Идентификатор ящика можно получить методами [mail.mailbox.*](../mailbox/index.md).

**Получатель.** Для подбора адресатов используйте методы [mail.recipient.*](../recipient/index.md).

**CRM.** Письмо можно связать с делом CRM и удалить эту связь через методы [mail.message.createcrmactivity](./mail-message-createcrmactivity.md) и [mail.message.removecrmactivity](./mail-message-removecrmactivity.md).

**Задача.** Письмо можно преобразовать в задачу методом [mail.message.createtask](./mail-message-createtask.md)

**Календарь.** Из письма можно создать событие календаря методом [mail.message.createcalendarevent](./mail-message-createcalendarevent.md)

**Чат.** Текст письма можно обсудить в чате методом [mail.message.createchat](./mail-message-createchat.md)

**Лента новостей.** Письмо можно опубликовать как сообщение в Ленту новостей методом [mail.message.createfeedpost](./mail-message-createfeedpost.md)

## Обзор методов {#all-methods}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [mail.message.list](./mail-message-list.md) | Ищет письма в почтовых ящиках текущего пользователя ||
|| [mail.message.get](./mail-message-get.md) | Возвращает письмо по идентификатору ||
|| [mail.message.thread](./mail-message-thread.md) | Возвращает цепочку писем по идентификатору одного письма ||
|| [mail.message.send](./mail-message-send.md) | Отправляет новое письмо ||
|| [mail.message.reply](./mail-message-reply.md) | Отправляет ответ на письмо ||
|| [mail.message.forward](./mail-message-forward.md) | Пересылает письмо ||
|| [mail.message.movetofolder](./mail-message-movetofolder.md) | Перемещает письма в папку, спам или корзину ||
|| [mail.message.createcrmactivity](./mail-message-createcrmactivity.md) | Создает дело CRM из письма ||
|| [mail.message.removecrmactivity](./mail-message-removecrmactivity.md) | Удаляет связь письма с делом CRM ||
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
