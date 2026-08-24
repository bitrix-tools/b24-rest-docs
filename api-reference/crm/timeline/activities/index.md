# Дела в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В CRM дела используются для любых задач, связанных с клиентами: звонки, встречи, согласование документов.

Дела делятся на входящие и запланированные:

* Входящие — дела, поступившие от клиента, например письмо, звонок или чат. Для таких дел важно верно указать параметр `DIRECTION` = `1`, чтобы сработал счетчик входящих дел CRM
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
|| [Дело пользовательского типа](./types/index.md) | Приложение методом [crm.activity.add](./activity-base/crm-activity-add.md) после регистрации типа | Нужны своя иконка и название типа дела в интерфейсе ||
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

Направление дела задает параметр `DIRECTION`: `1` — входящее, `2` — исходящее. Направление актуально для звонков и писем, для встреч оно не используется.

## Как начать работу

1. Определите элемент CRM, в таймлайне которого будет храниться дело: тип объекта передается в `OWNER_TYPE_ID`, идентификатор — в `OWNER_ID`. Значения типов смотрите в справочнике [Тип объекта CRM](../../data-types.md#object_type).
2. Получите состав доступных полей методом [crm.activity.fields](./activity-base/crm-activity-fields.md).
3. Создайте дело методом нужного вида: [crm.activity.add](./activity-base/crm-activity-add.md), [crm.activity.todo.add](./todo/crm-activity-todo-add.md) или [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md).
4. Получите дело методом [crm.activity.get](./activity-base/crm-activity-get.md) или список дел элемента методом [crm.activity.list](./activity-base/crm-activity-list.md).
5. Удалите ненужное дело методом [crm.activity.delete](./activity-base/crm-activity-delete.md).
6. Подпишитесь на [события дел](./events/index.md), чтобы отслеживать изменения в реальном времени.

## Связи дел с другими элементами CRM

Дела, связанные с элементами CRM, хранятся в таймлайне карточки элемента. Если у дела есть связь с несколькими элементами — например, письмо может быть привязано и к сделке и к контакту — оно будет храниться в таймлайнах всех связанных элементов.

Связи между делами и элементами CRM можно добавлять и удалять методами группы [crm.activity.binding.*](./binding/index.md).

## Системные дела

Системные дела CRM создает автоматически:

* дело звонка создает подключенная в Битрикс24 телефония. Для завершения звонка используйте метод [telephony.externalcall.finish](../../../telephony/telephony-external-call-finish.md). Метод завершает звонок, создает дело в карточке элемента и возвращает идентификатор созданного дела в параметре `CRM_ACTIVITY_ID`
* дело письма создает почта. Когда на подключенный в Битрикс24 адрес приходит письмо от клиента, CRM проверяет, существует ли в базе клиент с e-mail из письма. По результатам проверки будет создано дело в карточке найденного элемента или новый клиент, в карточке которого появится дело

Чтобы создать, изменить или удалить системное дело, используйте группу методов [crm.activity.*](./activity-base/index.md). При создании системного дела указывайте `TYPE_ID`, например для дела письма — `TYPE_ID` = `4`. Значения остальных типов перечислены в блоке [Идентификаторы типов дел](#activity-types).

### Дела пользовательских типов

Приложения могут регистрировать пользовательские типы дел: загрузить собственную иконку и указать название типа. Например, можно создать свой тип дел с иконкой и названием вашего приложения.

* Зарегистрировать тип дела — используйте методы группы [crm.activity.type.*](./types/index.md). При создании типа необходимо задать его кодовое обозначение в параметре `TYPE_ID`
* Создать дело с типом приложения — используйте группу методов системных дел [crm.activity.add](./activity-base/crm-activity-add.md). При создании дела укажите кодовое обозначение пользовательского типа `TYPE_ID`, зарегистрированного для типа дел, в параметре `PROVIDER_TYPE_ID`

{% note tip "" %}

Методы [crm.activity.delete](./activity-base/crm-activity-delete.md) (удаляет дело) и [crm.activity.list](./activity-base/crm-activity-list.md) (получает список дел) общие для всех видов дел CRM.

{% endnote %}

## Универсальные дела

Универсальные дела — это тип дел с расширенными настройками: крайним сроком, цветом, участниками, переговорной и синхронизацией с календарем.

Создает дело метод [crm.activity.todo.add](./todo/crm-activity-todo-add.md), изменяет — [crm.activity.todo.update](./todo/crm-activity-todo-update.md). Отдельные методы меняют только одно свойство дела: крайний срок, описание, цвет или ответственного. Как выбрать нужный метод, описано в разделе [Универсальные дела CRM](./todo/index.md).

## Конфигурируемые дела

Конфигурируемые дела — это тип дел, создать который можно только из приложения. Для этого типа можно настроить внешний вид карточки дела и ее функционал:

* [Структура конфигурируемого дела](./configurable/structure/layout.md)
* [Бейджи конфигурируемого дела](./configurable/badges/index.md)

Чтобы создать или изменить конфигурируемое дело, используйте группу методов [crm.activity.configurable.*](./configurable/index.md).

## Виджеты

В дела можно встраивать приложения. Для встроек используют специальные места, в делах доступно одно — [Пункт контекстного меню дела в карточке элемента](../../../widgets/crm/activity-timeline-menu.md) `CRM_XXX_ACTIVITY_TIMELINE_MENU`.

Благодаря встройке можно будет использовать приложение, не покидая карточку элемента. Приложение будет открываться на той странице, которую вы укажете при регистрации встройки.

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встраивания виджетов](../../../widgets/index.md)
- [Создать дела из приложений](./app-embedding/activity-app.md)

{% endnote %}

## Дополнительные возможности

**Текстовые заметки** можно добавлять к делам и удалять их. Используйте группу методов [crm.timeline.note.*](../note/index.md).

**Контентные блоки** можно добавлять к делам и удалять их. Используйте группу методов [crm.activity.layout.blocks.*](./layout-blocks/index.md).

* [Доступные контентные блоки](./configurable/structure/content-block.md)

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Общие методы и события

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.activity.add](./activity-base/crm-activity-add.md) | Создает новое дело ||
    || [crm.activity.update](./activity-base/crm-activity-update.md) | Обновляет дело ||
    || [crm.activity.get](./activity-base/crm-activity-get.md) | Возвращает дело по идентификатору ||
    || [crm.activity.list](./activity-base/crm-activity-list.md) | Возвращает список дел всех типов по фильтру ||
    || [crm.activity.delete](./activity-base/crm-activity-delete.md) | Удаляет любой тип дел ||
    || [crm.activity.call.getTranscript](./activity-base/crm-activity-call-get-transcript.md) | Возвращает готовую расшифровку звонка ||
    || [crm.activity.fields](./activity-base/crm-activity-fields.md) | Возвращает описание полей дел ||
    || [crm.activity.communication.fields](./activity-base/crm-activity-communication-fields.md) | Возвращает описание полей коммуникации ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmActivityAdd](./events/on-crm-activity-add.md) | При создании дела вручную или методом [crm.activity.add](./activity-base/crm-activity-add.md) ||
    || [onCrmActivityUpdate](./events/on-crm-activity-update.md) | При обновлении дела вручную или методом [crm.activity.update](./activity-base/crm-activity-update.md) ||
    || [onCrmActivityDelete](./events/on-crm-activity-delete.md) | При удалении дела вручную или методом [crm.activity.delete](./activity-base/crm-activity-delete.md) ||
    |#

{% endlist %}

### Управление связями дел

#|
|| **Метод** | **Описание** ||
|| [crm.activity.binding.add](./binding/crm-activity-binding-add.md) | Добавляет связь дела с элементом CRM ||
|| [crm.activity.binding.list](./binding/crm-activity-binding-list.md) | Возвращает список связей дела ||
|| [crm.activity.binding.move](./binding/crm-activity-binding-move.md) | Переносит связь дела на другой элемент CRM ||
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
