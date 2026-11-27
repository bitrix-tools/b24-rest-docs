# Комментарии таймлайна в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note info "" %}

Методы относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Комментарии таймлайна — текстовые заметки в карточке элемента CRM: договоренности с клиентом, итоги звонка, служебные пометки. Методы группы добавляют комментарий в таймлайн элемента, получают комментарий по идентификатору и список комментариев одного элемента.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% note warning "" %}

Изменять и удалять комментарии, а также прикреплять к ним файлы методы REST 3.0 не умеют. Используйте методы прошлой версии: [crm.timeline.comment.update](../../timeline/comments/crm-timeline-comment-update.md), [crm.timeline.comment.delete](../../timeline/comments/crm-timeline-comment-delete.md) и [crm.timeline.comment.add](../../timeline/comments/crm-timeline-comment-add.md) с полем `FILES`.

{% endnote %}

## Типы объектов и имена методов

Тип объекта задает сегмент `<тип>` в имени метода.

#|
|| **Тип объекта** | **Сегмент в имени метода** ||
|| Сделка | `deal` ||
|| Лид | `lead` ||
|| Контакт | `contact` ||
|| Компания | `company` ||
|| Моя компания | `mycompany` ||
|| Предложение | `quote` ||
|| Счет | `smartinvoice` ||
|| Документ CRM | `smartdocument` ||
|| Документ КЭДО | `smartb2edocument` ||
|| Смарт-процесс | `smartprocess<entityTypeId>`, например `smartprocess1038` ||
|#

Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). Имена методов пишутся в нижнем регистре: `crm.smartinvoice.timeline.comment.add`.

Компания и моя компания — разные типы. Методы `crm.company.timeline.comment.*` не находят мою компанию, а `crm.mycompany.timeline.comment.*` — обычную компанию.

## Как начать работу

1. Получите идентификатор элемента, например методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md)
2. Добавьте комментарий методом [crm.<тип>.timeline.comment.add](./crm-entity-timeline-comment-add-rest-v3.md): передайте `ownerId` элемента и `text`. Метод вернет `id` комментария
3. Получите комментарии элемента методом [crm.<тип>.timeline.comment.list](./crm-entity-timeline-comment-list-rest-v3.md) с фильтром `[["ownerId","=",<идентификатор элемента>]]` или один комментарий методом [crm.<тип>.timeline.comment.get](./crm-entity-timeline-comment-get-rest-v3.md). Передавайте `select`, например `["id","text","authorId","createdTime"]`: без него методы возвращают только `id`

## Особенности

- **Без `select` — только идентификатор.** Методы `get` и `list` без `select` возвращают у комментария одно поле `id`
- **Комментарии одного элемента.** Фильтр `list` принимает ровно одно условие `["ownerId","=",<идентификатор>]`. Других полей и операторов он не принимает, сортировать можно только по `createdTime`
- **Текст без обработки.** BB-коды и HTML-теги сохраняются и возвращаются как есть. Пустой текст и теги вложений `[DISK FILE ID=…]` вызывают ошибку. Текст длиннее 65 535 байт обрезается без ошибки
- **Автор — вызывающий пользователь.** Поле `authorId` задать нельзя
- **Права.** Для добавления нужно право на изменение элемента, для чтения — право на его просмотр. Для моей компании — право на изменение или просмотр моих компаний. Если права нет, методы отвечают ошибкой «не найдено», а не «доступ запрещен»

## Отличия от прошлой версии

Методы прошлой версии описаны в разделе [Комментарии таймлайна CRM](../../timeline/comments/index.md).

#|
|| **Прошлая версия** | **REST 3.0** ||
|| Тип элемента в поле `ENTITY_TYPE`, например `deal`, элемент — в `ENTITY_ID` | Тип элемента — в имени метода: `crm.deal.timeline.comment.add`, элемент — в `ownerId` ||
|| Поля в верхнем регистре: `ID`, `COMMENT`, `AUTHOR_ID`, `CREATED` | Поля в camelCase: `id`, `text`, `authorId`, `createdTime` ||
|| [crm.timeline.comment.update](../../timeline/comments/crm-timeline-comment-update.md) и [crm.timeline.comment.delete](../../timeline/comments/crm-timeline-comment-delete.md) | Аналогов нет, используйте методы прошлой версии ||
|| Файлы в поле `FILES` в [crm.timeline.comment.add](../../timeline/comments/crm-timeline-comment-add.md) и в ответах [get](../../timeline/comments/crm-timeline-comment-get.md) и [list](../../timeline/comments/crm-timeline-comment-list.md) | Файлы не передаются и не возвращаются. Теги вложений в тексте при добавлении вызывают ошибку, а при чтении удаляются из текста ||
|| Эмодзи в тексте возвращаются в служебном виде, например `:f09f9880:` | Эмодзи возвращаются как есть ||
|| [crm.timeline.comment.list](../../timeline/comments/crm-timeline-comment-list.md): страница из 50 записей, параметр `start` | `pagination` с `limit` до 1000, `page` и `offset` ||
|| Описание полей — [crm.timeline.comment.fields](../../timeline/comments/crm-timeline-comment-fields.md) | Описание полей — `crm.<тип>.timeline.comment.field.list` и `crm.<тип>.timeline.comment.field.get` ||
|#

Комментарий, созданный методом REST 3.0, можно изменить и удалить методами прошлой версии по тому же идентификатору.

## Связь с другими объектами

Комментарий связан с элементом CRM и автором.

**Элементы CRM.** Комментарий привязан к элементу: идентификатор элемента — в поле `ownerId`, тип объекта — в `ownerTypeId`, например `2` у сделки. Элемент получают методом [crm.<тип>.get](../items/crm-entity-get-rest-v3.md). Идентификаторы типов объектов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md).

**Пользователи.** Автор комментария — в поле `authorId`. Данные пользователя возвращает метод [user.get](../../../user/user-get.md).

**События.** Добавление комментария методом REST 3.0 вызывает событие [onCrmTimelineCommentAdd](../../timeline/comments/events/on-Crm-Timeline-Comment-Add.md). События комментариев описаны в разделе [События комментариев](../../timeline/comments/events/index.md).

## Методы полей

Описание полей комментария возвращают методы `crm.<тип>.timeline.comment.field.list` и `crm.<тип>.timeline.comment.field.get`. Они устроены как остальные методы полей REST 3.0: `field.list` принимает `select` со списком признаков описания, `field.get` — еще и `name` с именем поля, например `{"name":"text"}`. Признаки `filterable` и `sortable` в ответе показывают, что фильтровать можно только по `ownerId`, а сортировать — только по `createdTime`. Сами поля описаны в таблице на странице [crm.<тип>.timeline.comment.get](./crm-entity-timeline-comment-get-rest-v3.md#item).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: для добавления — пользователь с правом на изменение элемента, для чтения — с правом на просмотр элемента

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.timeline.comment.add](./crm-entity-timeline-comment-add-rest-v3.md) | Добавляет комментарий в таймлайн элемента ||
|| [crm.<тип>.timeline.comment.get](./crm-entity-timeline-comment-get-rest-v3.md) | Возвращает комментарий по идентификатору ||
|| [crm.<тип>.timeline.comment.list](./crm-entity-timeline-comment-list-rest-v3.md) | Возвращает комментарии одного элемента ||
|| `crm.<тип>.timeline.comment.field.list` | Возвращает описание полей комментария ||
|| `crm.<тип>.timeline.comment.field.get` | Возвращает описание поля комментария по имени ||
|#
