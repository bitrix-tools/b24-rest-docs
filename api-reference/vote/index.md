# Опросы, голосования: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В ленте новостей и мессенджере можно провести опрос сотрудников и устроить голосование за варианты ответов. Создатель опроса может настроить анонимность ответов и возможность переголосовать.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Опросы в чатах Битрикс24: как создать и настроить](https://helpdesk.bitrix24.ru/open/25240550/)

## Как начать работу

1. Создайте опрос. В чате мессенджера опрос создает метод [vote.Integration.Im.send](./vote.integration.im.send.md). Опрос в ленте новостей создается только в интерфейсе Битрикс24 — через REST API можно управлять уже созданным опросом.
2. Получите идентификатор опроса. Метод [vote.Integration.Im.send](./vote.integration.im.send.md) возвращает идентификатор сообщения `messageId` и идентификатор голосования `voteId`. Для опроса в ленте новостей получите `ID` поста методом [log.blogpost.get](../log/log-blogpost-get.md).
3. Работайте с голосованием методами `vote.AttachedVote.*`. Каждый из них принимает опрос одним из трех способов: по идентификатору прикрепления `attachId`, по связке `moduleId` + `entityType` + `entityId` или по подписанному идентификатору `signedAttachId`.
4. Получите результаты методом [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md), а полный отчет — методом [vote.AttachedVote.download](./vote.attachedvote.download.md).

## Связь с другими объектами

**Лента новостей.** Опрос в ленте новостей прикреплен к посту. Передайте в методы `vote.AttachedVote.*` параметры `moduleId` = `blog`, `entityType` = `Bitrix\Vote\Attachment\BlogPostConnector` и `entityId` = `ID` поста. Получить `ID` поста можно методом [log.blogpost.get](../log/log-blogpost-get.md).

**Мессенджер.** Опрос в чате прикреплен к сообщению. Передайте в методы `vote.AttachedVote.*` параметры `moduleId` = `Im`, `entityType` = `Bitrix\Vote\Attachment\ImMessageConnector` и `entityId` = `messageId` из результата метода [vote.Integration.Im.send](./vote.integration.im.send.md).

**Пользователь.** Методы [vote.AttachedVote.getAnswerVoted](./vote.attachedvote.getAnswerVoted.md) и [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md) возвращают список проголосовавших пользователей и базовую информацию о них: ID, имя, должность, изображение. Чтобы получить подробную информацию о проголосовавшем пользователе, используйте метод [user.get](../user/user-get.md).

## Как скачать результаты

Чтобы скачать файл с результатами по ссылке:

1. Получите ссылку из параметра `downloadUrl`. Параметр доступен в методах:

   - [vote.AttachedVote.vote](./vote.attachedvote.vote.md)

   - [vote.AttachedVote.recall](./vote.attachedvote.recall.md)

   - [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md)

   - [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md)

   - [vote.AttachedVote.get](./vote.attachedvote.get.md)

2. Подставьте домен Битрикс24 к ссылке из параметра.

3. Авторизуйтесь в Битрикс24 в браузере и перейдите по сформированной ссылке.

Чтобы скачать файл с результатами через приложение или вебхук, используйте метод [vote.AttachedVote.download](./vote.attachedvote.download.md).

## Как остановить опрос

Опрос можно остановить в интерфейсе Битрикс24 или методом [vote.AttachedVote.stop](./vote.attachedvote.stop.md). После остановки никто из сотрудников не сможет больше голосовать или изменять свои ответы. Результаты опроса после остановки можно просматривать и скачивать.

Возобновить опрос после остановки можно только методом [vote.AttachedVote.resume](./vote.attachedvote.resume.md).

## Как удалить опрос

Чтобы удалить опрос полностью, используйте методы:

- [log.blogpost.delete](../log/log-blogpost-delete.md) — если опрос привязан к посту в ленте новостей

- [im.message.delete](../chats/messages/im-message-delete.md) — если опрос создан в чате

Методы удалят пост или сообщение с опросом и результатами.

## Типовые ошибки

#|
|| **Код или ситуация** | **Когда возникает** | **Что проверить** ||
|| `100` | Не передан корректный способ идентификации опроса | Передайте один из вариантов: `attachId`, `signedAttachId` или полную связку `moduleId` + `entityType` + `entityId` ||
|| `ATTACH_NOT_FOUND` | Голосование не найдено, в том числе из-за неверной связки `moduleId` + `entityType` + `entityId` | Проверьте модуль, тип объекта и идентификатор сообщения или поста ||
|| `0` — `Attach read access denied` | У пользователя нет прав на чтение опроса или участие в нем | Выполните запрос от имени пользователя, которому доступен пост или чат с опросом ||
|| `403` — `The poll is inactive.` | Метод [vote.AttachedVote.vote](./vote.attachedvote.vote.md) вызван для остановленного опроса | Возобновите опрос методом [vote.AttachedVote.resume](./vote.attachedvote.resume.md) или не отправляйте новые голоса ||
|| Ошибка декодирования JSON на клиенте | Ответ [vote.AttachedVote.download](./vote.attachedvote.download.md) обрабатывается как обычный ответ метода | Выполните прямой HTTP-запрос через вебхук или OAuth и сохраните ответ как бинарный файл ||
|#

Метод `vote.AttachedVote.download` поддерживает вебхуки. Ограничение относится к способу обработки ответа: метод возвращает файл, поэтому стандартный вызов, который ожидает JSON, использовать нельзя.

## Обзор методов {#all-methods}

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [vote.Integration.Im.send](./vote.integration.im.send.md) | Создает и отправляет голосование в чат ||
|| [vote.AttachedVote.vote](./vote.attachedvote.vote.md) | Голосует в прикрепленном голосовании ||
|| [vote.AttachedVote.recall](./vote.attachedvote.recall.md) | Отзывает голос ||
|| [vote.AttachedVote.resume](./vote.attachedvote.resume.md) | Возобновляет голосование ||
|| [vote.AttachedVote.stop](./vote.attachedvote.stop.md) | Останавливает голосование ||
|| [vote.AttachedVote.get](./vote.attachedvote.get.md) | Возвращает данные прикрепленного голосования ||
|| [vote.AttachedVote.getAnswerVoted](./vote.attachedvote.getAnswerVoted.md) | Возвращает список проголосовавших за ответ ||
|| [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) | Возвращает несколько голосований ||
|| [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md) | Возвращает данные голосования с информацией о проголосовавших ||
|| [vote.AttachedVote.download](./vote.attachedvote.download.md) | Скачивает отчет по голосованию ||
|#
