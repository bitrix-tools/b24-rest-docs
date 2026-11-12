# Дела в CRM: обзор методов и событий

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В CRM дела используются для любых задач, связанных с клиентами: звонки, встречи, согласование документов.

Дела делятся на входящие и запланированные:

* Входящие — дела, поступившие от клиента, например письмо, звонок или чат. Для таких дел важно верно указать направление, чтобы сработал счетчик входящих дел CRM
* Запланированные — дела, которые создают сотрудники, например задачи или универсальные дела. В них можно указать срок выполнения, добавить связи с элементами CRM, с календарем, пригласить коллег, прикрепить файлы

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [дела в CRM](https://helpdesk.bitrix24.ru/open/21623188/)

## Как выбрать вид дела

В CRM есть четыре вида дел. Они различаются тем, кто создает дело и насколько можно менять его карточку.

#|
|| **Вид дела** | **Кто создает** | **Когда использовать** ||
|| [Системное дело](./activity-base/index.md) | Телефония, почта, чат или приложение методом [crm.activity.add](./activity-base/crm-activity-add.md) | Нужны звонок, письмо, встреча или дело со стандартной карточкой ||
|| [Универсальное дело](./todo/index.md) | Сотрудник в карточке элемента или приложение методом [crm.activity.todo.add](./todo/crm-activity-todo-add.md) | Нужны срок, цвет, участники, переговорная и синхронизация с календарем ||
|| [Конфигурируемое дело](./configurable/index.md) | Только приложение методом [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md) | Нужен собственный внешний вид карточки дела с блоками и кнопками приложения ||
|| [Дело пользовательского типа](./types/index.md) | Приложение после регистрации типа: методом [crm.activity.add](./activity-base/crm-activity-add.md) или, для конфигурируемого типа, методом [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md) | Нужны своя иконка и название типа дела в интерфейсе ||
|#

## Идентификаторы типов дел {#activity-types}

Тип системного дела задает параметр `TYPE_ID`.

#|
|| **TYPE_ID** | **Тип дела** ||
|| `1` | Встреча ||
|| `2` | Звонок ||
|| `3` | Задача ||
|| `4` | Письмо ||
|| `5` | Общее дело, используется при импорте событий календаря ||
|| `6` | Дело провайдера: универсальные и конфигурируемые дела, дела приложений ||
|#

Значение `0` в ответе означает, что тип не определен. Статусы, важность, направление и другие перечисления дел описаны в справочнике [Перечисления дел](../../data-types.md#activity-enums).

Направление дела задает параметр `DIRECTION`: `1` — входящее, `2` — исходящее. Направление актуально для звонков и писем, для встреч оно не используется.

## Как начать работу

1. Определите элемент CRM, в таймлайне которого будет храниться дело: тип объекта передается в `OWNER_TYPE_ID`, идентификатор — в `OWNER_ID`. Значения типов смотрите в справочнике [Тип объекта CRM](../../data-types.md#object_type).
2. Получите описание полей в разделе [Поля дела REST 3.0](../../rest-v3/activities/index.md#fields). Описание полей с признаками фильтрации и сортировки возвращает метод `crm.activity.field.list`.
3. Создайте дело методом нужного вида: [crm.activity.todo.add](./todo/crm-activity-todo-add.md) для универсального дела, [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md) для конфигурируемого. Для остальных видов используйте [crm.activity.add](./activity-base/crm-activity-add.md): методы REST 3.0 пока не создают дела и не изменяют их поля. Изменяйте дело методом того же вида: [crm.activity.todo.update](./todo/crm-activity-todo-update.md), [crm.activity.configurable.update](./configurable/crm-activity-configurable-update.md) или [crm.activity.update](./activity-base/crm-activity-update.md).
4. Получите дело методом REST 3.0 [crm.activity.get](../../rest-v3/activities/crm-activity-get-rest-v3.md), а список дел элемента — методом [crm.<тип>.activity.list](../../rest-v3/activities/crm-entity-activity-list-rest-v3.md). Какие поля дела методы REST 3.0 не возвращают, указано в разделе [Устаревшие методы](#deprecated).
5. Удалите ненужное дело методом REST 3.0 [crm.activity.delete](../../rest-v3/activities/crm-activity-delete-rest-v3.md).
6. Подпишитесь на [события дел](./events/index.md), чтобы отслеживать изменения в реальном времени.

## Связи дел с другими элементами CRM {#bindings}

Дела, связанные с элементами CRM, хранятся в таймлайне карточки элемента. Если у дела есть связь с несколькими элементами — например, письмо может быть привязано и к сделке, и к контакту, — оно хранится в таймлайнах всех связанных элементов.

Связи между делами и элементами CRM добавляют, переносят и удаляют методы REST 3.0 [crm.activity.binding.bind](../../rest-v3/activities/crm-activity-binding-bind-rest-v3.md), [crm.activity.binding.move](../../rest-v3/activities/crm-activity-binding-move-rest-v3.md) и [crm.activity.binding.unbind](../../rest-v3/activities/crm-activity-binding-unbind-rest-v3.md), список связей возвращает [crm.activity.binding.list](../../rest-v3/activities/crm-activity-binding-list-rest-v3.md).

## Системные дела

Часть системных дел CRM создает автоматически:

* дело звонка создает подключенная в Битрикс24 телефония. Для завершения звонка используйте метод [telephony.externalcall.finish](../../../telephony/telephony-external-call-finish.md). Метод завершает звонок, создает дело в карточке элемента и возвращает идентификатор созданного дела в параметре `CRM_ACTIVITY_ID`
* дело письма создает почта. Когда на подключенный в Битрикс24 адрес приходит письмо от клиента, CRM проверяет, существует ли в базе клиент с e-mail из письма. Если клиент найден, дело появится в его карточке. Если нет — CRM создаст клиента и добавит дело в его карточку

Чтобы создать, изменить или удалить системное дело, используйте группу методов [crm.activity.*](./activity-base/index.md). Значения `TYPE_ID` перечислены в блоке [Идентификаторы типов дел](#activity-types).

### Дела пользовательских типов

Приложения могут регистрировать пользовательские типы дел с собственной иконкой и названием.

* Зарегистрировать тип дела — используйте методы группы [crm.activity.type.*](./types/index.md). При создании типа необходимо задать его кодовое обозначение в параметре `TYPE_ID`
* Создать дело с типом приложения — используйте метод [crm.activity.add](./activity-base/crm-activity-add.md): передайте код типа в `PROVIDER_TYPE_ID` и `PROVIDER_ID` = `REST_APP`. Если тип зарегистрирован с `IS_CONFIGURABLE_TYPE` = `Y`, передайте его код в поле `typeId` метода [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md)

## Универсальные дела

Кроме [crm.activity.todo.add](./todo/crm-activity-todo-add.md) и [crm.activity.todo.update](./todo/crm-activity-todo-update.md), для универсальных дел есть методы, которые меняют только одно свойство дела: крайний срок, описание, цвет или ответственного. Как выбрать нужный метод, описано в разделе [Универсальные дела CRM](./todo/index.md).

## Конфигурируемые дела

Приложение настраивает внешний вид и функции карточки конфигурируемого дела:

* [Структура конфигурируемого дела](./configurable/structure/layout.md)
* [Бейджи конфигурируемого дела](./configurable/badges/index.md)

## Виджеты

В дела можно встраивать приложения. В делах доступны две точки встраивания. [Пункт меню в списке дел](../../../widgets/crm/list-menu.md) — `CRM_ACTIVITY_LIST_MENU`. [Пункт контекстного меню дела в карточке элемента](../../../widgets/crm/activity-timeline-menu.md) — `CRM_XXX_ACTIVITY_TIMELINE_MENU`, где вместо `XXX` указывают тип объекта, например `DEAL`. Для смарт-процессов — `CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU`, где `XXX` — числовой идентификатор типа смарт-процесса, например `CRM_DYNAMIC_183_ACTIVITY_TIMELINE_MENU`.

Встройки позволяют работать с приложением, не покидая CRM. Приложение открывается на странице, которую вы укажете при регистрации встройки.

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../../widgets/index.md)
- [Создать дела из приложений](./app-embedding/activity-app.md)

{% endnote %}

## Дополнительные возможности

**Текстовые заметки** можно добавлять к делам и удалять их. Используйте группу методов [crm.timeline.note.*](../note/index.md).

**Контентные блоки** можно добавлять к делам и удалять их. Используйте группу методов [crm.activity.layout.blocks.*](./layout-blocks/index.md).

* [Доступные контентные блоки](./configurable/structure/content-block.md)

## Устаревшие методы {#deprecated}

Методы предыдущей версии работают, но их развитие остановлено. Для новой разработки используйте замены из таблицы.

#|
|| **Метод** | **Замена** | **Ограничение замены** ||
|| [crm.activity.add](./activity-base/crm-activity-add.md) | [crm.activity.todo.add](./todo/crm-activity-todo-add.md) | Создает только универсальное дело. Звонок, встречу, письмо и дело пользовательского типа по-прежнему создает `crm.activity.add` ||
|| [crm.activity.update](./activity-base/crm-activity-update.md) | [crm.activity.todo.update](./todo/crm-activity-todo-update.md) | Обновляет только универсальное дело ||
|| [crm.activity.get](./activity-base/crm-activity-get.md) | [crm.activity.get](../../rest-v3/activities/crm-activity-get-rest-v3.md) REST 3.0 | Не возвращает часть полей, например `settings`, `providerParams`, `location`, `status` ||
|| [crm.activity.list](./activity-base/crm-activity-list.md) | [crm.activity.list](../../rest-v3/activities/crm-activity-list-rest-v3.md) REST 3.0 | Доступен только администратору Битрикс24 и не возвращает часть полей. Дела одного элемента без прав администратора возвращает [crm.<тип>.activity.list](../../rest-v3/activities/crm-entity-activity-list-rest-v3.md) ||
|| [crm.activity.delete](./activity-base/crm-activity-delete.md) | [crm.activity.delete](../../rest-v3/activities/crm-activity-delete-rest-v3.md) REST 3.0 | Требует права на удаление в элементах CRM, к которым привязано дело ||
|| [crm.activity.fields](./activity-base/crm-activity-fields.md), [crm.activity.communication.fields](./activity-base/crm-activity-communication-fields.md) | `crm.activity.field.list` REST 3.0, описание в разделе [Поля дела](../../rest-v3/activities/index.md#fields) | Не описывает часть полей, например `settings` и `providerParams`. Средства связи описывает поле `communications` ||
|| [crm.activity.binding.*](./binding/index.md) | [crm.activity.binding.bind](../../rest-v3/activities/crm-activity-binding-bind-rest-v3.md), [unbind](../../rest-v3/activities/crm-activity-binding-unbind-rest-v3.md), [move](../../rest-v3/activities/crm-activity-binding-move-rest-v3.md), [list](../../rest-v3/activities/crm-activity-binding-list-rest-v3.md) REST 3.0 | Параметры и ответ в формате REST 3.0 описаны на страницах методов ||
|#

Остальные методы REST 3.0 для дел — завершение [crm.activity.complete](../../rest-v3/activities/crm-activity-complete-rest-v3.md), возврат в работу [crm.activity.uncomplete](../../rest-v3/activities/crm-activity-uncomplete-rest-v3.md), методы элемента `crm.<тип>.activity.*` и работа с письмами `crm.activity.mail.*` — перечислены в [обзоре дел REST 3.0](../../rest-v3/activities/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Общие методы и события

{% list tabs %}

- Методы

    Развитие методов, кроме `crm.activity.call.getTranscript`, остановлено. Замены перечислены в разделе [Устаревшие методы](#deprecated).

    #|
    || **Метод** | **Описание** ||
    || [crm.activity.add](./activity-base/crm-activity-add.md) | Создает новое дело ||
    || [crm.activity.update](./activity-base/crm-activity-update.md) | Обновляет дело ||
    || [crm.activity.get](./activity-base/crm-activity-get.md) | Возвращает дело по идентификатору ||
    || [crm.activity.list](./activity-base/crm-activity-list.md) | Возвращает список дел всех типов по фильтру ||
    || [crm.activity.delete](./activity-base/crm-activity-delete.md) | Удаляет дело любого вида ||
    || [crm.activity.call.getTranscript](./activity-base/crm-activity-call-get-transcript.md) | Возвращает готовую расшифровку звонка ||
    || [crm.activity.fields](./activity-base/crm-activity-fields.md) | Возвращает описание полей дел ||
    || [crm.activity.communication.fields](./activity-base/crm-activity-communication-fields.md) | Возвращает описание полей коммуникации ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmActivityAdd](./events/on-crm-activity-add.md) | При создании дела ||
    || [onCrmActivityUpdate](./events/on-crm-activity-update.md) | При изменении дела ||
    || [onCrmActivityDelete](./events/on-crm-activity-delete.md) | При удалении дела ||
    |#

{% endlist %}

### Управление связями дел

Развитие методов остановлено. Замены перечислены в разделе [Устаревшие методы](#deprecated).

#|
|| **Метод** | **Описание** ||
|| [crm.activity.binding.add](./binding/crm-activity-binding-add.md) | Добавляет связь дела с элементом CRM ||
|| [crm.activity.binding.move](./binding/crm-activity-binding-move.md) | Переносит связь дела на другой элемент CRM ||
|| [crm.activity.binding.list](./binding/crm-activity-binding-list.md) | Возвращает список связей дела ||
|| [crm.activity.binding.delete](./binding/crm-activity-binding-delete.md) | Удаляет связь дела с элементом CRM ||
|#

### Пользовательские типы дел

#|
|| **Метод** | **Описание** ||
|| [crm.activity.type.add](./types/crm-activity-type-add.md) | Регистрирует пользовательский тип дела с указанием названия и иконки ||
|| [crm.activity.type.list](./types/crm-activity-type-list.md) | Получает список пользовательских типов дел ||
|| [crm.activity.type.delete](./types/crm-activity-type-delete.md) | Удаляет пользовательский тип дела ||
|#

### Универсальное дело

#|
|| **Метод** | **Описание** ||
|| [crm.activity.todo.add](./todo/crm-activity-todo-add.md) | Создает универсальное дело ||
|| [crm.activity.todo.update](./todo/crm-activity-todo-update.md) | Обновляет универсальное дело ||
|| [crm.activity.todo.updateColor](./todo/crm-activity-todo-update-color.md) | Изменяет цвет ||
|| [crm.activity.todo.updateDeadline](./todo/crm-activity-todo-update-deadline.md) | Изменяет крайний срок ||
|| [crm.activity.todo.updateDescription](./todo/crm-activity-todo-update-description.md) | Изменяет описание ||
|| [crm.activity.todo.updateResponsibleUser](./todo/crm-activity-todo-update-responsible-user.md) | Изменяет ответственного ||
|#

### Конфигурируемое дело

#|
|| **Метод** | **Описание** ||
|| [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md) | Добавляет новое конфигурируемое дело в таймлайн ||
|| [crm.activity.configurable.update](./configurable/crm-activity-configurable-update.md) | Обновляет конфигурируемое дело ||
|| [crm.activity.configurable.get](./configurable/crm-activity-configurable-get.md) | Получает информацию о деле по идентификатору ||
|#

### Бейджи конфигурируемого дела

#|
|| **Метод** | **Описание** ||
|| [crm.activity.badge.add](./configurable/badges/crm-activity-badge-add.md) | Добавляет новый бейдж ||
|| [crm.activity.badge.get](./configurable/badges/crm-activity-badge-get.md) | Получает информацию о бейдже ||
|| [crm.activity.badge.list](./configurable/badges/crm-activity-badge-list.md) | Получает список бейджей ||
|| [crm.activity.badge.delete](./configurable/badges/crm-activity-badge-delete.md) | Удаляет бейдж по коду ||
|#

### Дополнительные контентные блоки

#|
|| **Метод** | **Описание** ||
|| [crm.activity.layout.blocks.set](./layout-blocks/crm-activity-layout-blocks-set.md) | Устанавливает набор дополнительных контентных блоков в дело ||
|| [crm.activity.layout.blocks.get](./layout-blocks/crm-activity-layout-blocks-get.md) | Получает установленный приложением набор дополнительных контентных блоков в деле ||
|| [crm.activity.layout.blocks.delete](./layout-blocks/crm-activity-layout-blocks-delete.md) | Удаляет установленный приложением набор дополнительных контентных блоков для дела ||
|#
