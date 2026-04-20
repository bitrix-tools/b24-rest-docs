# Комментарии таймлайна CRM: обзор методов и событий

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Комментарии в таймлайне фиксируют договоренности, уточнения и служебные заметки в карточке CRM. Например, менеджер может оставить комментарий о результате звонка или прикрепить файл с договором.

Методы раздела помогают управлять такими записями: создавать, получать, обновлять и удалять комментарии. События позволяют отслеживать изменения в реальном времени.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Таймлайн в карточке CRM](https://helpdesk.bitrix24.ru/open/23960160/)

## Связь с другими объектами

Комментарии существуют только в привязке к элементам CRM.

**Элемент CRM.** Связь комментария с элементом задают параметры `ENTITY_TYPE` и `ENTITY_ID`.

- `ENTITY_TYPE` хранит тип объекта CRM. Значения типов смотрите в справочнике [Тип объекта CRM](../../data-types.md#object_type).  
- `ENTITY_ID` хранит идентификатор элемента CRM. Его возвращают методы списка и методы создания, например, [crm.item.list](../../universal/crm-item-list.md), [crm.item.add](../../universal/crm-item-add.md).  

Параметры `ENTITY_TYPE` и `ENTITY_ID` используются в методах [crm.timeline.comment.add](./crm-timeline-comment-add.md) и [crm.timeline.comment.list](./crm-timeline-comment-list.md).

**Файлы.** Комментарий может содержать вложения в поле `FILES`. Формат передачи файлов описан в статьях [Как загрузить файлы](../../../files/how-to-upload-files.md) и [Как обновить файлы](../../../files/how-to-update-files.md).

Поле `FILES` обрабатывают методы [crm.timeline.comment.add](./crm-timeline-comment-add.md) и [crm.timeline.comment.update](./crm-timeline-comment-update.md), а в ответах вложения возвращают [crm.timeline.comment.get](./crm-timeline-comment-get.md) и [crm.timeline.comment.list](./crm-timeline-comment-list.md).  


## Как работать с комментариями

1. Определите элемент CRM, к которому относится комментарий.
2. Проверьте права доступа к элементу CRM, иначе методы могут вернуть ошибку `Access denied`. Доступ зависит от прав текущего пользователя на конкретный элемент.
3. Получите состав доступных полей методом [crm.timeline.comment.fields](./crm-timeline-comment-fields.md).
4. Добавьте комментарий методом [crm.timeline.comment.add](./crm-timeline-comment-add.md).
5. Получите список комментариев методом [crm.timeline.comment.list](./crm-timeline-comment-list.md) или данные конкретного комментария методом [crm.timeline.comment.get](./crm-timeline-comment-get.md).
6. Измените комментарий методом [crm.timeline.comment.update](./crm-timeline-comment-update.md).
7. Удалите ненужный комментарий методом [crm.timeline.comment.delete](./crm-timeline-comment-delete.md).
8. Для отслеживания изменений подпишитесь на события раздела [События комментариев](./events/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: `любой пользователь`

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.timeline.comment.add](./crm-timeline-comment-add.md) | Добавляет новый комментарий в таймлайн ||
    || [crm.timeline.comment.update](./crm-timeline-comment-update.md) | Обновляет комментарий ||
    || [crm.timeline.comment.get](./crm-timeline-comment-get.md) | Получает информацию о комментарии ||
    || [crm.timeline.comment.list](./crm-timeline-comment-list.md) | Получает список комментариев для элемента CRM ||
    || [crm.timeline.comment.delete](./crm-timeline-comment-delete.md) | Удаляет комментарий ||
    || [crm.timeline.comment.fields](./crm-timeline-comment-fields.md) | Получает список полей комментария таймлайна ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmTimelineCommentAdd](./events/on-Crm-Timeline-Comment-Add.md) | При создании нового комментария в таймлайне вручную или методом [crm.timeline.comment.add](./crm-timeline-comment-add.md) ||
    || [onCrmTimelineCommentUpdate](./events/on-Crm-Timeline-Comment-Update.md) | При обновлении комментария в таймлайне вручную или методом [crm.timeline.comment.update](./crm-timeline-comment-update.md) ||
    || [onCrmTimelineCommentDelete](./events/on-Crm-Timeline-Comment-Delete.md) | При удалении комментария в таймлайне вручную или методом [crm.timeline.comment.delete](./crm-timeline-comment-delete.md) ||
    |#

{% endlist %}
