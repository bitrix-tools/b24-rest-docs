# Шаблоны задач: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Шаблоны задач помогают заранее описать типовой сценарий работы и использовать единый набор настроек для новых задач. В шаблоне можно сохранить название и описание задачи, участников, сроки, проект, повторение, чек-лист, файлы и привязки к CRM.

С шаблонами работают две версии API. Методы прошлой версии вызываются по адресу `/rest/`, поля в них названы в верхнем регистре, например `RESPONSIBLE_ID`. Методы REST 3.0 вызываются по адресу `/rest/api/`, поля названы в camelCase, например `responsibleId`. Только в REST 3.0 есть копирование шаблона, файлы, история повторений, создание задачи по шаблону, дочерние шаблоны и связанные задачи.

> Быстрый переход: [все методы](#all-methods) | [методы REST 3.0](#rest-v3)
>
> Пользовательская документация: [Как работать с шаблонами задач](https://helpdesk.bitrix24.ru/open/27889912/)

## Как начать работу

1. Определите состав полей шаблона на странице [Поля шаблона задачи](./fields.md) или, для REST 3.0, [Поля шаблона задачи v 3.0](./fields-rest-v3.md). В прошлой версии описание полей возвращает метод [tasks.template.fields](./tasks-template-fields.md)
2. Получите идентификаторы пользователей, групп и объектов CRM, если привязки к перечисленным объектам нужны в шаблоне
3. Если шаблон должен создавать повторяющиеся задачи, подготовьте параметры повторения: `REPLICATE` и `REPLICATE_PARAMS` в прошлой версии, `replicate` и `replicateParams` в REST 3.0
4. Создайте шаблон методом [tasks.template.add](./tasks-template-add.md) или [tasks.template.add](./tasks-template-add-rest-v3.md) v 3.0. Чтобы создать шаблон по образцу существующего, используйте [tasks.template.copy](./tasks-template-copy-rest-v3.md) v 3.0
5. Проверьте сохраненные значения методом [tasks.template.get](./tasks-template-get.md) или [tasks.template.get](./tasks-template-get-rest-v3.md) v 3.0. Список доступных шаблонов возвращает [tasks.template.list](./tasks-template-list.md) или [tasks.template.list](./tasks-template-list-rest-v3.md) v 3.0
6. Измените шаблон методом [tasks.template.update](./tasks-template-update.md) или [tasks.template.update](./tasks-template-update-rest-v3.md) v 3.0
7. Если задача состоит из повторяющихся шагов, добавьте в шаблон чек-лист методами раздела [Чек-листы шаблонов задач](./checklist/index.md). Файлы к шаблону прикрепляет метод [tasks.template.file.attach](./tasks-template-file-attach-rest-v3.md) v 3.0
8. Включите повторение методом [tasks.template.replication.setstate](./tasks-template-replication-set-state-rest-v3.md) v 3.0 или создайте задачу по шаблону сразу методом [tasks.template.task.add](./tasks-template-task-add-rest-v3.md) v 3.0
9. Удалите шаблон методом [tasks.template.delete](./tasks-template-delete.md) или [tasks.template.delete](./tasks-template-delete-rest-v3.md) v 3.0, если он больше не нужен

## Права доступа

Права на работу с шаблонами задачи зависят от настроек доступа в задачах:

- создавать шаблоны может пользователь с правом создания шаблонов
- получать, изменять и удалять шаблон может пользователь с соответствующим правом на этот шаблон
- методы получения списка возвращают только шаблоны, доступные пользователю
- менять список доступа к шаблону в REST 3.0 могут администратор, автор шаблона и пользователь с полным доступом к шаблону
- какие действия с шаблоном доступны текущему пользователю, возвращает метод [tasks.template.access.get](./tasks-template-access-get-rest-v3.md) v 3.0

{% note tip "Пользовательская документация" %}

- [Как настроить права доступа в задачах Битрикс24](https://helpdesk.bitrix24.ru/open/27846332/)

{% endnote %}

## Особенности методов

### Прошлая версия

- При создании обязательны поля `TITLE` и `RESPONSIBLE_ID`. Если метод вызывает пользователь без прав администратора, постановщиком становится он сам, а `CREATED_BY` игнорируется
- Метод [tasks.template.list](./tasks-template-list.md) отдает до 50 шаблонов за запрос. Следующую страницу запрашивайте параметром `start`
- В `select` метода [tasks.template.list](./tasks-template-list.md) можно передать только поля из списка на странице метода. Значение `*` не поддерживается. Пользовательские поля `UF_*` и чек-лист метод возвращает, только если `select` не передан
- Список шаблонов приходит в `task_templates`: пустая страница — массивом `[]`, непустая — объектом с идентификаторами шаблонов в ключах
- Успешный ответ содержит `result` и `time`, ошибки возвращаются в `error` и `error_description`. Коды ошибок описаны на страницах методов

### REST 3.0

- При создании обязательны `title`, `creatorId` и исполнитель в `responsibleId` или `responsibleCollection`. Пользователь без прав администратора может указать постановщиком только себя
- Метод [tasks.template.list](./tasks-template-list-rest-v3.md) v 3.0 без `select` возвращает только `id`. Размер страницы задает `pagination.limit`: по умолчанию 50, максимум 1000. Фильтр принимает только условия, объединенные через `and`
- Логические поля принимают `true` и `false`, значения `Y` и `N` вызывают ошибку валидации. Поля со значением `null` в ответ не попадают
- Имена методов пишутся в нижнем регистре, например `tasks.template.replication.setstate`. Для имени в другом регистре метод вернет ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`
- Успешный ответ содержит объект `result`, ошибки возвращаются в объекте `error` с полями `code` и `message`

## Связь с другими объектами

**Задачи.** Шаблон хранит настройки будущей задачи: название, описание, сроки, ответственных, наблюдателей, чек-лист. Задачу по шаблону создает метод [tasks.template.task.add](./tasks-template-task-add-rest-v3.md) v 3.0, а [tasks.template.task.get](./tasks-template-task-get-rest-v3.md) v 3.0 показывает, какой получится задача, без ее создания. Для работы с задачами используйте методы [tasks.task.add](../tasks-task-add.md), [tasks.task.get](../tasks-task-get.md), [tasks.task.update](../tasks-task-update.md) и [tasks.task.list](../tasks-task-list.md).

**Пользователи.** В шаблоне можно задать постановщика, исполнителей, соисполнителей и наблюдателей: поля `CREATED_BY`, `RESPONSIBLE_ID`, `RESPONSIBLES`, `ACCOMPLICES`, `AUDITORS` в прошлой версии и `creatorId`, `responsibleCollection`, `accomplices`, `auditors` в REST 3.0. Идентификаторы пользователей можно получить методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**Группы и проекты.** Чтобы привязать шаблон к группе или проекту, используйте поле `GROUP_ID`, в REST 3.0 — `groupId`. Это позволяет создавать задачи в нужном рабочем пространстве. Идентификатор группы или проекта можно получить методами [sonet_group.get](../../sonet-group/sonet-group-get.md) и [socialnetwork.api.workgroup.list](../../sonet-group/socialnetwork-api-workgroup-list.md).

**CRM.** В шаблоне можно заранее сохранить привязку к объектам CRM. В поле `UF_CRM_TASK`, в REST 3.0 — `crmItemIds`, укажите идентификаторы объектов CRM c префиксом, например `L_15` для лида или `D_27` для сделки. Привязанные элементы возвращает метод [tasks.template.crm.item.list](./tasks-template-crm-item-list-rest-v3.md) v 3.0. Идентификаторы существующих элементов можно получить методом [crm.item.list](../../crm/universal/crm-item-list.md). Если объект нужно сначала создать, используйте [crm.item.add](../../crm/universal/crm-item-add.md).

**Файлы.** В REST 3.0 к шаблону прикрепляют файлы Диска методом [tasks.template.file.attach](./tasks-template-file-attach-rest-v3.md) v 3.0, список возвращает [tasks.template.file.list](./tasks-template-file-list-rest-v3.md) v 3.0. Идентификаторы файлов можно получить методами [disk.folder.getchildren](../../disk/folder/disk-folder-get-children.md) и [disk.folder.uploadfile](../../disk/folder/disk-folder-upload-file.md).

**Чек-листы.** Если типовая задача состоит из повторяющихся шагов, добавьте их в шаблон. Пункты чек-листа создаются, меняются и удаляются методами раздела [Чек-листы шаблонов задач](./checklist/index.md).

**Дочерние шаблоны и связанные задачи.** В REST 3.0 шаблон можно привязать к другому шаблону как дочерний: при создании задачи по родительскому шаблону дочерние создают подзадачи. Связанные задачи шаблона попадают в поле `dependsOn` будущей задачи. Связи меняют методы раздела [Связи шаблонов задач](./relation/index.md).

## Обзор методов {#all-methods}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [tasks.template.add](./tasks-template-add.md) | Создает шаблон задачи и возвращает его идентификатор ||
|| [tasks.template.update](./tasks-template-update.md) | Изменяет поля существующего шаблона ||
|| [tasks.template.get](./tasks-template-get.md) | Возвращает шаблон по идентификатору. По умолчанию — со всеми полями, включая пользовательские ||
|| [tasks.template.list](./tasks-template-list.md) | Возвращает доступные пользователю шаблоны с фильтром, сортировкой и выборкой по 50 записей ||
|| [tasks.template.delete](./tasks-template-delete.md) | Удаляет шаблон задачи ||
|| [tasks.template.fields](./tasks-template-fields.md) | Возвращает описание полей шаблона: название, тип, обязательность, значение по умолчанию и допустимые значения ||
|#

Пункты чек-листа шаблона, их порядок, отметки о выполнении и вложения описаны в разделе [Чек-листы шаблонов задач](./checklist/index.md).

## Методы REST 3.0 {#rest-v3}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Методы REST 3.0 вызываются по адресу с `/rest/api/`. Особенности вызова и формат ответа описаны в [обзоре REST 3.0](../../rest-v3.md). Поля шаблона в REST 3.0 названы в camelCase и описаны на странице [Поля шаблона задачи v 3.0](./fields-rest-v3.md). Имена методов пишутся в нижнем регистре, например `tasks.template.replication.setstate`.

### Шаблон

#|
|| **Метод** | **Описание** ||
|| [tasks.template.add](./tasks-template-add-rest-v3.md) | Создает шаблон задачи и возвращает его ||
|| [tasks.template.update](./tasks-template-update-rest-v3.md) | Изменяет поля шаблона ||
|| [tasks.template.get](./tasks-template-get-rest-v3.md) | Возвращает шаблон по идентификатору ||
|| [tasks.template.list](./tasks-template-list-rest-v3.md) | Возвращает список доступных шаблонов ||
|| [tasks.template.copy](./tasks-template-copy-rest-v3.md) | Создает копию шаблона ||
|| [tasks.template.delete](./tasks-template-delete-rest-v3.md) | Удаляет шаблон ||
|| [tasks.template.access.get](./tasks-template-access-get-rest-v3.md) | Возвращает действия, доступные пользователю с шаблоном ||
|| [tasks.template.crm.item.list](./tasks-template-crm-item-list-rest-v3.md) | Возвращает элементы CRM, привязанные к шаблону ||
|#

### Файлы и история

#|
|| **Метод** | **Описание** ||
|| [tasks.template.file.list](./tasks-template-file-list-rest-v3.md) | Возвращает файлы, прикрепленные к шаблону ||
|| [tasks.template.file.attach](./tasks-template-file-attach-rest-v3.md) | Прикрепляет файлы Диска к шаблону ||
|| [tasks.template.file.detach](./tasks-template-file-detach-rest-v3.md) | Открепляет файлы от шаблона ||
|| [tasks.template.history.list](./tasks-template-history-list-rest-v3.md) | Возвращает историю повторений шаблона ||
|| [tasks.template.history.count](./tasks-template-history-count-rest-v3.md) | Возвращает количество записей истории шаблона ||
|#

### Повторение и задачи по шаблону

#|
|| **Метод** | **Описание** ||
|| [tasks.template.replication.setstate](./tasks-template-replication-set-state-rest-v3.md) | Включает или отключает повторение шаблона ||
|| [tasks.template.state.set](./tasks-template-state-set-rest-v3.md) | Сохраняет значения по умолчанию для формы нового шаблона ||
|| [tasks.template.task.get](./tasks-template-task-get-rest-v3.md) | Возвращает заготовку задачи по шаблону без создания задачи ||
|| [tasks.template.task.add](./tasks-template-task-add-rest-v3.md) | Создает задачу по шаблону ||
|#

### Чек-лист

#|
|| **Метод** | **Описание** ||
|| [tasks.template.checklist.get](./checklist/tasks-template-checklist-get-rest-v3.md) | Возвращает все пункты чек-листа шаблона ||
|| [tasks.template.checklist.save](./checklist/tasks-template-checklist-save-rest-v3.md) | Сохраняет чек-лист шаблона целиком ||
|| [tasks.template.checklist.complete](./checklist/tasks-template-checklist-complete-rest-v3.md) | Отмечает выполненными все пункты ||
|| [tasks.template.checklist.renew](./checklist/tasks-template-checklist-renew-rest-v3.md) | Снимает отметку о выполнении со всех пунктов ||
|| [tasks.template.checklist.item.add](./checklist/tasks-template-checklist-item-add-rest-v3.md) | Добавляет пункт ||
|| [tasks.template.checklist.item.update](./checklist/tasks-template-checklist-item-update-rest-v3.md) | Изменяет пункт ||
|| [tasks.template.checklist.item.delete](./checklist/tasks-template-checklist-item-delete-rest-v3.md) | Удаляет пункт ||
|| [tasks.template.checklist.item.move](./checklist/tasks-template-checklist-item-move-rest-v3.md) | Перемещает пункт ||
|| [tasks.template.checklist.item.complete](./checklist/tasks-template-checklist-item-complete-rest-v3.md) | Отмечает пункт выполненным ||
|| [tasks.template.checklist.item.renew](./checklist/tasks-template-checklist-item-renew-rest-v3.md) | Снимает отметку о выполнении с пункта ||
|| [tasks.template.checklist.item.collapse](./checklist/tasks-template-checklist-item-collapse-rest-v3.md) | Сворачивает пункт ||
|| [tasks.template.checklist.item.expand](./checklist/tasks-template-checklist-item-expand-rest-v3.md) | Разворачивает пункт ||
|| [tasks.template.checklist.item.attachment.attach](./checklist/tasks-template-checklist-item-attachment-attach-rest-v3.md) | Прикрепляет к пункту файлы Диска ||
|| [tasks.template.checklist.item.attachment.upload](./checklist/tasks-template-checklist-item-attachment-upload-rest-v3.md) | Загружает файл в пункт ||
|| [tasks.template.checklist.item.attachment.detach](./checklist/tasks-template-checklist-item-attachment-detach-rest-v3.md) | Открепляет файлы от пункта ||
|#

### Связи

Подробнее о связях — в разделе [Связи шаблонов задач](./relation/index.md).

#|
|| **Метод** | **Описание** ||
|| [tasks.template.relation.child.add](./relation/tasks-template-relation-child-add-rest-v3.md) | Привязывает дочерние шаблоны ||
|| [tasks.template.relation.child.delete](./relation/tasks-template-relation-child-delete-rest-v3.md) | Отвязывает дочерние шаблоны ||
|| [tasks.template.relation.child.ids](./relation/tasks-template-relation-child-ids-rest-v3.md) | Возвращает идентификаторы дочерних шаблонов ||
|| [tasks.template.relation.child.list](./relation/tasks-template-relation-child-list-rest-v3.md) | Возвращает список дочерних шаблонов ||
|| [tasks.template.relation.child.listbyids](./relation/tasks-template-relation-child-list-by-ids-rest-v3.md) | Возвращает дочерние шаблоны для нескольких шаблонов ||
|| [tasks.template.relation.related.add](./relation/tasks-template-relation-related-add-rest-v3.md) | Привязывает задачи к шаблону ||
|| [tasks.template.relation.related.delete](./relation/tasks-template-relation-related-delete-rest-v3.md) | Отвязывает задачи от шаблона ||
|| [tasks.template.relation.related.list](./relation/tasks-template-relation-related-list-rest-v3.md) | Возвращает список связанных задач ||
|| [tasks.template.relation.related.listbyids](./relation/tasks-template-relation-related-list-by-ids-rest-v3.md) | Возвращает связанные задачи по идентификаторам ||
|#
