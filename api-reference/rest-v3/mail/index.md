# Почта в REST 3.0: обзор разделов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Почта в Битрикс24 позволяет работать с письмами прямо в интерфейсе: читать и отправлять письма, фильтровать переписку, связывать письма с CRM, а также создавать из письма чат, задачу, событие календаря и сообщение Ленты новостей.

Методы почты работают с тремя группами объектов:

- [Почтовые ящики](./mailbox/index.md) — показывают список ящиков пользователя, данные ящика и доступные адреса отправителя
- [Письма](./message/index.md) — находят и возвращают письма, отправляют и обрабатывают письмо, создают связанные объекты из письма
- [Получатели](./recipient/index.md) — находят контакты и сотрудников для адресации писем и показывают поля получателя

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с почтой в Битрикс24](https://helpdesk.bitrix24.ru/open/18258092/)

## Как начать работу

1. Получите список почтовых ящиков методом [mail.mailbox.list](./mailbox/mail-mailbox-list.md)
2. Выберите почтовый ящик и получите нужные письма методом [mail.message.list](./message/mail-message-list.md)
3. Получите письмо по идентификатору методом [mail.message.get](./message/mail-message-get.md)
4. Выполните действие с письмом: отправьте ответ, переместите письмо или создайте связанный объект

Для управления почтовыми сервисами используйте методы раздела [mailservice.*](../../mailservice/index.md).

## Ограничения и рекомендации

- Методы [mail.mailbox.*](./mailbox/index.md) и [mail.message.*](./message/index.md) работают только с почтовыми ящиками, к которым у текущего пользователя есть доступ
- Используйте методы `*.field.list` и `*.field.get` для проверки доступных полей и их типов

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа к почте в Битрикс24](https://helpdesk.bitrix24.ru/open/26849142/)

{% endnote %}

## Связь с другими объектами

**Почтовый ящик.** Методы [mail.mailbox.*](./mailbox/index.md) работают с ящиками текущего пользователя. Идентификатор ящика `id` используется в методах получения ящика и поиска писем. Доступные ящики можно получить методом [mail.mailbox.list](./mailbox/mail-mailbox-list.md).

**Письмо.** Методы [mail.message.*](./message/index.md) работают с письмами, доступными текущему пользователю. Идентификатор письма `id` нужен, чтобы получить письмо, ответить на него, переслать, переместить или создать связанный объект.

**Получатель.** Методы [mail.recipient.*](./recipient/index.md) помогают подобрать адресатов письма. Контакты можно найти методом [mail.recipient.listcontacts](./recipient/mail-recipient-listcontacts.md), сотрудников — методом [mail.recipient.listemployees](./recipient/mail-recipient-listemployees.md).

**CRM.** Письмо можно связать с делом CRM методом [mail.message.createcrmactivity](./message/mail-message-createcrmactivity.md). Связь можно удалить методом [mail.message.removecrmactivity](./message/mail-message-removecrmactivity.md).

**Задача.** Письмо можно преобразовать в задачу методом [mail.message.createtask](./message/mail-message-createtask.md)

**Календарь.** Из письма можно создать событие календаря методом [mail.message.createcalendarevent](./message/mail-message-createcalendarevent.md)

**Чат.** Текст письма можно обсудить в чате методом [mail.message.createchat](./message/mail-message-createchat.md)

**Лента новостей.** Письмо можно опубликовать как сообщение в Ленту новостей методом [mail.message.createfeedpost](./message/mail-message-createfeedpost.md)

## Обзор методов {#all-methods}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Почтовые ящики

#|
|| **Метод** | **Описание** ||
|| [mail.mailbox.list](./mailbox/mail-mailbox-list.md) | Возвращает список почтовых ящиков текущего пользователя ||
|| [mail.mailbox.get](./mailbox/mail-mailbox-get.md) | Возвращает почтовый ящик по идентификатору ||
|| [mail.mailbox.senders](./mailbox/mail-mailbox-senders.md) | Возвращает адреса отправителей, доступные текущему пользователю ||
|| [mail.mailbox.field.list](./mailbox/mail-mailbox-field-list.md) | Возвращает список полей почтового ящика ||
|| [mail.mailbox.field.get](./mailbox/mail-mailbox-field-get.md) | Возвращает описание поля почтового ящика ||
|#

### Письма

#|
|| **Метод** | **Описание** ||
|| [mail.message.list](./message/mail-message-list.md) | Ищет письма в почтовых ящиках текущего пользователя ||
|| [mail.message.get](./message/mail-message-get.md) | Возвращает письмо по идентификатору ||
|| [mail.message.thread](./message/mail-message-thread.md) | Возвращает цепочку писем по идентификатору одного письма ||
|| [mail.message.send](./message/mail-message-send.md) | Отправляет новое письмо ||
|| [mail.message.reply](./message/mail-message-reply.md) | Отправляет ответ на письмо ||
|| [mail.message.forward](./message/mail-message-forward.md) | Пересылает письмо ||
|| [mail.message.movetofolder](./message/mail-message-movetofolder.md) | Перемещает письма в папку, спам или корзину ||
|| [mail.message.createcrmactivity](./message/mail-message-createcrmactivity.md) | Создает дело CRM из письма ||
|| [mail.message.removecrmactivity](./message/mail-message-removecrmactivity.md) | Удаляет связь письма с делом CRM ||
|| [mail.message.createtask](./message/mail-message-createtask.md) | Создает задачу из письма ||
|| [mail.message.createcalendarevent](./message/mail-message-createcalendarevent.md) | Создает событие календаря из письма ||
|| [mail.message.createchat](./message/mail-message-createchat.md) | Создает чат из письма ||
|| [mail.message.createfeedpost](./message/mail-message-createfeedpost.md) | Создает сообщение Ленты новостей из письма ||
|| [mail.message.field.list](./message/mail-message-field-list.md) | Возвращает список полей письма ||
|| [mail.message.field.get](./message/mail-message-field-get.md) | Возвращает описание поля письма ||
|#

### Получатели

#|
|| **Метод** | **Описание** ||
|| [mail.recipient.listcontacts](./recipient/mail-recipient-listcontacts.md) | Ищет контакты из адресной книги ||
|| [mail.recipient.listemployees](./recipient/mail-recipient-listemployees.md) | Ищет сотрудников по имени или e-mail ||
|| [mail.recipient.field.list](./recipient/mail-recipient-field-list.md) | Возвращает список полей получателя ||
|| [mail.recipient.field.get](./recipient/mail-recipient-field-get.md) | Возвращает описание поля получателя ||
|#

## Продолжить изучение

- [{#T}](../index.md)
