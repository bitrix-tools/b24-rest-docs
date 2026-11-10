# Пользовательские поля сообщений форума: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля добавляют к сообщениям форума собственные данные: внешний код, приоритет, категорию и другие значения. Методы `forum.message.field.custom.*` создают, изменяют, получают и удаляют такие поля. Методы `forum.message.field.custom.enum.*` ведут варианты значений для полей типа «Список».

> Быстрый переход: [все методы](#all-methods)

{% note info "" %}

Методы раздела относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

## Как начать работу

1. Получите текущие пользовательские поля методом [forum.message.field.custom.list](./forum-message-field-custom-list.md). В Битрикс24 уже есть системные поля, например `UF_FORUM_MESSAGE_DOC` для файлов сообщения
2. Создайте поле методом [forum.message.field.custom.add](./forum-message-field-custom-add.md). Из ответа сохраните `id` — он нужен для изменения, удаления и работы со значениями списка
3. Для поля типа `enumeration` добавьте варианты значений методом [forum.message.field.custom.enum.add](./forum-message-field-custom-enum-add.md), передав `id` поля в `fieldId`
4. Проверьте варианты значений методом [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md)

## Идентификаторы

#|
|| **Идентификатор** | **Что обозначает** | **Где взять** ||
|| `id` поля | Числовой идентификатор пользовательского поля, например `6008093` | Ответ [forum.message.field.custom.add](./forum-message-field-custom-add.md) или [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|| `name` | Код поля с префиксом `UF_`, например `UF_PRIORITY`. Задается при создании и не меняется | Ответ [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|| `fieldId` | Идентификатор поля типа «Список», к которому относится значение. Совпадает с `id` поля | Ответ [forum.message.field.custom.list](./forum-message-field-custom-list.md) ||
|| `id` значения | Идентификатор варианта значения списка, например `4079`. Нумерация не связана с `id` полей | Ответ [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md) ||
|#

Код объекта `FORUM_MESSAGE`, к которому относятся поля, методы подставляют сами. Передавать `entityId` не нужно: переданное значение не учитывается.

## Ограничения и особенности {#restrictions}

- Подписи поля `editFormLabel`, `listColumnLabel`, `listFilterLabel`, `errorMessage` и `helpMessage` передаются объектом по языкам, например `{"ru":"Приоритет","en":"Priority"}`. Строка вместо объекта не сохраняется. В ответе подпись приходит строкой на языке ответа
- Если в [forum.message.field.custom.update](./forum-message-field-custom-update.md) передать хотя бы одну подпись, все непереданные подписи очищаются. Изменяя подпись, передавайте все подписи поля
- Настройки типа поля в `settings` при создании и изменении не сохраняются: поле получает настройки типа по умолчанию
- Метод [forum.message.field.custom.list](./forum-message-field-custom-list.md) всегда возвращает все пользовательские поля сообщений. Фильтр и постраничная навигация не применяются
- Метод [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md) принимает фильтр только одним условием `["fieldId", 6008093]`, без внешнего массива. Значения всегда возвращаются по возрастанию `sort`, постраничная навигация не применяется
- Пустое значение `value` в [forum.message.field.custom.enum.update](./forum-message-field-custom-enum-update.md) удаляет вариант списка, хотя метод возвращает успешный ответ
- Признак `isDefault` у варианта списка не снимается с других вариантов автоматически

## Обзор методов {#all-methods}

> Scope: [`forum`](../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

### Пользовательские поля

#|
|| **Метод** | **Описание** ||
|| [forum.message.field.custom.add](./forum-message-field-custom-add.md) | Добавляет пользовательское поле сообщений форума ||
|| [forum.message.field.custom.update](./forum-message-field-custom-update.md) | Изменяет пользовательское поле ||
|| [forum.message.field.custom.get](./forum-message-field-custom-get.md) | Возвращает пользовательское поле по идентификатору ||
|| [forum.message.field.custom.list](./forum-message-field-custom-list.md) | Возвращает список пользовательских полей сообщений форума ||
|| [forum.message.field.custom.delete](./forum-message-field-custom-delete.md) | Удаляет пользовательское поле ||
|#

### Значения полей типа «Список»

#|
|| **Метод** | **Описание** ||
|| [forum.message.field.custom.enum.add](./forum-message-field-custom-enum-add.md) | Добавляет значение в поле типа «Список» ||
|| [forum.message.field.custom.enum.update](./forum-message-field-custom-enum-update.md) | Изменяет значение списка ||
|| [forum.message.field.custom.enum.get](./forum-message-field-custom-enum-get.md) | Возвращает значение списка по идентификатору ||
|| [forum.message.field.custom.enum.list](./forum-message-field-custom-enum-list.md) | Возвращает значения поля типа «Список» ||
|| [forum.message.field.custom.enum.delete](./forum-message-field-custom-enum-delete.md) | Удаляет значение списка ||
|#

## Продолжите изучение

- [{#T}](./forum-message-field-custom-add.md)
- [{#T}](./forum-message-field-custom-enum-add.md)
- [{#T}](../message/index.md)
- [{#T}](../index.md)
