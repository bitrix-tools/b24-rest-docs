# Опросы, голосования: обзор методов

В ленте новостей и мессенджере можно провести опрос сотрудников и устроить голосование за варианты ответов. Создатель опроса может настроить анонимность ответов и возможность переголосовать.

> Быстрый переход: [все методы](#all-methods) 
>
> Пользовательская документация: [Опросы в чатах Битрикс24: как создать и настроить](https://helpdesk.bitrix24.ru/open/25240550/), [Опрос в ленте Новостей](https://helpdesk.bitrix24.ru/open/25240550/)

## Связь с другими объектами

**Лента новостей.** Опрос в ленте новостей связан с постом. Получите `ID` поста в Битрикс24 методом [log.blogpost.get](../log/log-blogpost-get.md). Используйте `ID` поста в методах vote.AttachedVote.*, чтобы управлять голосованием и получать его результаты.

**Мессенджер**. Опрос в чате связан с сообщением мессенджера. Чтобы создать опрос, используйте метод [vote.Integration.Im.send](./vote.integration.im.send.md). Используйте `messageID` из результата в методах vote.AttachedVote.*, чтобы управлять голосованием.

**Пользователь.** Методы [vote.AttachedVote.getAnswerVoted](./vote.attachedvote.getAnswerVoted.md) и [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md) возвращают список проголосовавших пользователей и базовую информацию о них: ID, имя, должность, изображение. Чтобы получить подробную информацию о проголосовавшем пользователе, используйте метод [user.get](../user/user-get.md).

## Как скачать результаты

Чтобы скачать файл с результатами по ссылке:

1. Получите ссылку из параметра `downloadUrl`. Параметр доступен в методах:

   - [vote.AttachedVote.vote](./vote.attachedvote.vote.md),

   - [vote.AttachedVote.recall](./vote.attachedvote.recall.md),

   - [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md),

   - [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md),

   - [vote.AttachedVote.get](./vote.attachedvote.get.md).

2. Подставьте домен Битрикс24 к ссылке из параметра.

3. Авторизуйтесь в Битрикс24 в браузере и перейдите по сформированной ссылке.

Чтобы скачать файл с результатами через приложение или вебхук, используйте метод [vote.AttachedVote.download](./vote.attachedvote.download.md).

## Как остановить опрос

Опрос можно остановить в интерфейсе Битрикс24 или методом [vote.AttachedVote.stop](./vote.attachedvote.stop.md). После остановки никто из сотрудников не сможет больше голосовать или изменять свои ответы. Результаты опроса после остановки можно просматривать и скачивать.

Возобновить опрос после остановки можно только методом [vote.AttachedVote.resume](./vote.attachedvote.resume.md).

## Как удалить опрос

Если необходимо удалить опрос полностью, используйте методы:

- [log.blogpost.delete](../log/log-blogpost-delete.md) — если опрос привязан к посту в ленте новостей,

- [im.message.delete](../chats/messages/im-message-delete.md) — если опрос создан в чате.

Методы удалят пост или сообщение с опросом и результатами.

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
|| [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) | Возвращаеть несколько голосований ||
|| [vote.AttachedVote.getWithVoted](./vote.attachedvote.getWithVoted.md) | Возвращает данные голосования с информацией о проголосовавших||
|| [vote.AttachedVote.download](./vote.attachedvote.download.md) | Скачивает отчет по голосованию ||
|#
