# Связи шаблонов задач: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Шаблон задачи можно связать с другими шаблонами и с задачами. Дочерние шаблоны привязываются к родительскому шаблону: по ним создаются подзадачи, когда задачу создают по родительскому шаблону. Связанные задачи шаблона — задачи, от которых будет зависеть новая задача, они хранятся в поле `dependsOn` шаблона.

Методы связей относятся к REST 3.0 и вызываются по адресу с `/rest/api/`. Особенности вызова и формат ответа описаны в [обзоре REST 3.0](../../../rest-v3.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как работать с шаблонами задач](https://helpdesk.bitrix24.ru/open/27889912/)

## Как начать работу

1. Получите идентификатор шаблона методом [tasks.template.list](../tasks-template-list-rest-v3.md) или создайте шаблон методом [tasks.template.add](../tasks-template-add-rest-v3.md)
2. Чтобы привязать дочерние шаблоны, вызовите [tasks.template.relation.child.add](./tasks-template-relation-child-add-rest-v3.md). Текущие дочерние шаблоны возвращают методы [tasks.template.relation.child.ids](./tasks-template-relation-child-ids-rest-v3.md) и [tasks.template.relation.child.list](./tasks-template-relation-child-list-rest-v3.md), отвязать их можно методом [tasks.template.relation.child.delete](./tasks-template-relation-child-delete-rest-v3.md)
3. Чтобы связать шаблон с задачами, вызовите [tasks.template.relation.related.add](./tasks-template-relation-related-add-rest-v3.md). Связанные задачи возвращает метод [tasks.template.relation.related.list](./tasks-template-relation-related-list-rest-v3.md), отвязать их можно методом [tasks.template.relation.related.delete](./tasks-template-relation-related-delete-rest-v3.md)
4. Создайте задачу по шаблону методом [tasks.template.task.add](../tasks-template-task-add-rest-v3.md). Чтобы вместе с задачей создались подзадачи по дочерним шаблонам, передайте `withSubTasks`

## Особенности методов

- Имена методов пишутся в нижнем регистре: `tasks.template.relation.child.listbyids`, а не `listByIds`. Для имени в другом регистре метод вернет ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`
- За один вызов можно передать до 20 шаблонов в методах дочерних шаблонов и до 50 задач в методах связанных задач
- У шаблона может быть только один родительский шаблон. Цикл из шаблонов создать нельзя: метод вернет ошибку конфликта связей
- Методы `list` и `ids` возвращают только дочерние шаблоны первого уровня и только те, которые пользователь может читать

## Связь с другими объектами

**Шаблоны задач.** Дочерние шаблоны — обычные шаблоны, их поля описаны на странице [Поля шаблона задачи v 3.0](../fields-rest-v3.md). Получить шаблон можно методом [tasks.template.get](../tasks-template-get-rest-v3.md).

**Задачи.** Связанные задачи шаблона попадают в поле `dependsOn` задачи, созданной по шаблону. Поля задачи описаны на странице [Поля задачи v 3.0](../../fields-rest-v3.md), список задач возвращает метод [tasks.task.list](../../tasks-task-list-rest-v3.md).

## Обзор методов {#all-methods}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Дочерние шаблоны

#|
|| **Метод** | **Описание** ||
|| [tasks.template.relation.child.add](./tasks-template-relation-child-add-rest-v3.md) | Привязывает дочерние шаблоны к родительскому ||
|| [tasks.template.relation.child.delete](./tasks-template-relation-child-delete-rest-v3.md) | Отвязывает дочерние шаблоны от родительского ||
|| [tasks.template.relation.child.ids](./tasks-template-relation-child-ids-rest-v3.md) | Возвращает идентификаторы дочерних шаблонов ||
|| [tasks.template.relation.child.list](./tasks-template-relation-child-list-rest-v3.md) | Возвращает список дочерних шаблонов с полями ||
|| [tasks.template.relation.child.listbyids](./tasks-template-relation-child-list-by-ids-rest-v3.md) | Возвращает дочерние шаблоны для нескольких шаблонов ||
|#

### Связанные задачи

#|
|| **Метод** | **Описание** ||
|| [tasks.template.relation.related.add](./tasks-template-relation-related-add-rest-v3.md) | Привязывает задачи к шаблону ||
|| [tasks.template.relation.related.delete](./tasks-template-relation-related-delete-rest-v3.md) | Отвязывает задачи от шаблона ||
|| [tasks.template.relation.related.list](./tasks-template-relation-related-list-rest-v3.md) | Возвращает список связанных задач ||
|| [tasks.template.relation.related.listbyids](./tasks-template-relation-related-list-by-ids-rest-v3.md) | Возвращает связанные задачи по идентификаторам ||
|#
