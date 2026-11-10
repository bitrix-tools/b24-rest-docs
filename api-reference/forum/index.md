# Форум в REST 3.0: обзор разделов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Форум хранит сообщения, из которых в Битрикс24 состоят обсуждения: комментарии к событиям календаря, отчетам о рабочем времени, фотографиям, страницам вики и элементам универсальных списков, а также сообщения форумов. Комментарии задач хранятся в чате задачи, а не в форуме.

Методы раздела работают с двумя группами объектов:

- [Сообщения](./message/index.md) — удаляют сообщение форума
- [Пользовательские поля сообщений](./userfield/index.md) — создают, изменяют, получают и удаляют пользовательские поля сообщений форума, ведут значения полей типа «Список»

> Быстрый переход: [все методы](#all-methods)

{% note info "" %}

Методы раздела относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

## Как начать работу

1. Получите пользовательские поля сообщений методом [forum.message.field.custom.list](./userfield/forum-message-field-custom-list.md) или создайте новое поле методом [forum.message.field.custom.add](./userfield/forum-message-field-custom-add.md)
2. Для поля типа «Список» добавьте варианты значений методом [forum.message.field.custom.enum.add](./userfield/forum-message-field-custom-enum-add.md)
3. Чтобы удалить комментарий или сообщение форума, вызовите [forum.message.delete](./message/forum-message-delete.md) с идентификатором сообщения

## Ограничения и особенности

- В REST 3.0 нет метода, который возвращает сообщения форума, поэтому идентификатор сообщения для удаления нужно получить вне методов раздела
- Удалить сообщение может его автор или администратор. Вместе с сообщением удаляется связанная запись или комментарий в Ленте новостей
- Особенности пользовательских полей и значений списка описаны в [обзоре пользовательских полей](./userfield/index.md#restrictions)

## Связь с другими объектами

**Календарь.** Комментарий к событию календаря хранится как сообщение форума. События календаря создают и изменяют методы [calendar.event.*](../calendar/calendar-event/index.md). Метод [forum.message.delete](./message/forum-message-delete.md) удаляет такой комментарий по его идентификатору.

**Задачи.** Комментарий задачи — это сообщение чата задачи, методы форума с ним не работают. Методы для комментариев описаны в [обзоре комментариев задач](../tasks/comment-item/index.md).

**Лента новостей.** Комментарии к событиям календаря, отчетам о рабочем времени и другим объектам показываются в [Ленте новостей](../log/index.md). При удалении сообщения методом [forum.message.delete](./message/forum-message-delete.md) комментарий исчезает и из Ленты.

## Обзор методов {#all-methods}

> Scope: [`forum`](../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Сообщения

#|
|| **Метод** | **Описание** ||
|| [forum.message.delete](./message/forum-message-delete.md) | Удаляет сообщение форума ||
|#

### Пользовательские поля сообщений

#|
|| **Метод** | **Описание** ||
|| [forum.message.field.custom.add](./userfield/forum-message-field-custom-add.md) | Добавляет пользовательское поле сообщений форума ||
|| [forum.message.field.custom.update](./userfield/forum-message-field-custom-update.md) | Изменяет пользовательское поле ||
|| [forum.message.field.custom.get](./userfield/forum-message-field-custom-get.md) | Возвращает пользовательское поле по идентификатору ||
|| [forum.message.field.custom.list](./userfield/forum-message-field-custom-list.md) | Возвращает список пользовательских полей сообщений форума ||
|| [forum.message.field.custom.delete](./userfield/forum-message-field-custom-delete.md) | Удаляет пользовательское поле ||
|#

### Значения полей типа «Список»

#|
|| **Метод** | **Описание** ||
|| [forum.message.field.custom.enum.add](./userfield/forum-message-field-custom-enum-add.md) | Добавляет значение в поле типа «Список» ||
|| [forum.message.field.custom.enum.update](./userfield/forum-message-field-custom-enum-update.md) | Изменяет значение списка ||
|| [forum.message.field.custom.enum.get](./userfield/forum-message-field-custom-enum-get.md) | Возвращает значение списка по идентификатору ||
|| [forum.message.field.custom.enum.list](./userfield/forum-message-field-custom-enum-list.md) | Возвращает значения поля типа «Список» ||
|| [forum.message.field.custom.enum.delete](./userfield/forum-message-field-custom-enum-delete.md) | Удаляет значение списка ||
|#

## Продолжите изучение

- [{#T}](./message/index.md)
- [{#T}](./userfield/index.md)
- [{#T}](../rest-v3.md)
