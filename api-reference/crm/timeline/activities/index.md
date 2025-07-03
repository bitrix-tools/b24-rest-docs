# Дела в CRM: обзор методов

В CRM дела используются для любых задач, связанных с клиентами: звонки, встречи, согласование документов. 

Дела делятся на входящие и запланированные: 

* Входящие — дела, поступившие от клиента, например письмо, звонок или чат. Для таких дел важно верно указать параметр `DIRECTION` =  `1`, чтобы сработал счетчик входящих дел CRM

* Запланированные — дела, которые создают сотрудники, например задачи или универсальные дела. В них можно указать срок выполнения, добавить связи с элементами CRM, с календарем, пригласить коллег, прикрепить файлы 

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [дела в CRM](https://helpdesk.bitrix24.ru/open/21623188/), [Направление активности](../../auxiliary/enum/outdated/crm-enum-activity-direction.md) 

## Связи дел с другими элементами CRM

Дела, связанные с элементами CRM, хранятся в таймлайне карточки элемента. Если у дела есть связь с несколькими элементами — например, письмо может быть привязано и к сделке и к контакту — оно будет храниться в таймлайнах всех связанных элементов. 

Связи между делами и элементами CRM можно добавлять и удалять методами группы [crm.activity.binding.*](./binding/index.md).

## Системные дела

Системные дела CRM создает автоматически: 

* дело звонка создает подключенная в Битрикс телефония. Для завершения звонка используйте метод [telephony.externalcall.finish](../../../telephony/telephony-external-call-finish.md). Метод завершает звонок, создает дело в карточке элемента, и возвращает ID созданного дела в параметре `CRM_ACTIVITY_ID` 

* дело письма создает почта. Когда на подключенный в Битрикс24 адрес приходит письмо от клиента, CRM проверяет, существует ли в базе клиент с e-mail из письма. По результатам проверки будет создано дело в карточке найденного элемента или новый клиент, в карточке которого появится дело 

Чтобы создать, изменить или удалить системное дело используйте группу методов [crm.activity.*](./activity-base/index.md). При создании системного дела указывайте `TYPE_ID`, например для дела письма `TYPE_ID` = `2` . Для получения значений других типов дел используйте метод [crm.enum.activitytype](../../auxiliary/enum/outdated/crm-enum-activity-type.md).

### Пользовательские типы дел

Приложения могут регистрировать пользовательские типы дел: загрузить собственную иконку и указать название типа. Например, можно создать свой тип дел с иконкой и названием вашего приложения. 

* Зарегистрировать тип дела — используйте методы группы [crm.activity.type.*](./types/index.md). При создании типа необходимо задать его кодовое обозначение в параметре `TYPE_ID`
  
* Создать дело с типом приложения — используйте группу методов системных дел [crm.activity.add](./activity-base/crm-activity-add.md). При создании дела укажите кодовое обозначение пользовательского типа `TYPE_ID`, зарегистрированного для типа дел, в параметре `PROVIDER_TYPE_ID`

{% note tip "" %}

Методы [crm.activity.delete](./activity-base/crm-activity-delete.md) (удаляет дело) и [crm.activity.list](./activity-base/crm-activity-list.md) (получает список дел) общие для всех видов дел CRM.

{% endnote %}

## Универсальные дела

Универсальные дела — это тип дел с расширенными настройками. В карточке универсального дела можно синхронизировать дело с календарем, выбрать место встречи с клиентом, добавить коллег, выбрать клиента из элемента CRM, разделить дела по цветам, выбрать переговорную. Расширенные настройки доступны сотруднику на стороне Битрикс24.

Для создания универсального используйте метод [crm.activity.todo.add](./todo/crm-activity-todo-add.md). Для изменения крайнего срока дела — метод [crm.activity.todo.updateDeadline](./todo/crm-activity-todo-update-deadline.md), для изменения описания дела — [crm.activity.todo.updateDescription](./todo/crm-activity-todo-update-description.md). 

   
{% note tip "Пользовательская документация" %}

  -	[Универсальное дело в Битрикс24](https://helpdesk.bitrix24.ru/open/21064046/)

{% endnote %}


## Конфигурируемые дела 

Конфигурируемые дела — это тип дел, создать который можно только из приложения.  Для этого типа можно настроить внешний вид карточки дела и ее функционал:

* [Структура конфигурируемого дела](./configurable/structure/layout.md)
* [Бейджи кофигурируемого дела](./configurable/badges/index.md)

Чтобы создать или изменить конфигурируемое дело, используйте группу методов [crm.activity.configurable.*](./configurable/crm-activity-configurable-add.md). 

## Виджеты

В дела можно встраивать приложения. Для встроек используют специальные места, в делах доступно одно — [Пункт контекстного меню дела в карточке элемента](../../../widgets/crm/activity-timeline-menu.md) `CRM_XXX_ACTIVITY_TIMELINE_MENU`. 

Благодаря встройке можно будет использовать приложение, не покидая карточку элемента. Приложение будет открываться на той странице, которую вы укажете при регистрации встройки.    

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../../widgets/index.md)
- [Создать дела из приложений](./app-embedding/activity-app.md)

{% endnote %}

## Дополнительные возможности 

**Текстовые заметки** можно добавлять к делам и удалять их. Используйте группу методов [crm.timeline.note.*](../note/index.md). 

**Контентные блоки** можно добавлять к делам и удалять их. Используйте группу методов [crm.activity.layout.blocks.*](./layout-blocks/index.md). 

 * [Доступные контентные блоки](./configurable/structure/body.md#contentblockdto)

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

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
    || [crm.activity.fields](./activity-base/crm-activity-fields.md) | Возвращает описание полей дел ||
    || [crm.activity.communication.fields](./activity-base/crm-activity-communication-fields.md) | Возвращает описание полей коммуникации ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmActivityAdd](./events/on-crm-activity-add.md) | При создании дела ||
    || [onCrmActivityUpdate](./events/on-crm-activity-update.md) | При обновлении дела ||
    || [onCrmActivityDelete](./events/on-crm-activity-delete.md) | При удалении дела ||
    |#

{% endlist %}

### Управление связями дел

#|
|| **Метод** | **Описание** ||
|| [crm.activity.binding.add](./binding/crm-activity-binding-add.md) | Добавляет привязку ||
|| [crm.activity.binding.list](./binding/crm-activity-binding-list.md) | Возвращает список привязок ||
|| [crm.activity.binding.delete](./binding/crm-activity-binding-delete.md) | Удаляет привязку ||
|#

### Пользовательские тип дел

#|
|| **Метод** | **Описание** ||
|| [crm.activity.type.add](./types/crm-activity-type-add.md) | Регистрирует пользовательский тип дела с указанием названия и иконки ||
|| [crm.activity.type.list](./types/crm-activity-type-list.md) | Получает список дел ||
|| [crm.activity.type.delete](./types/crm-activity-type-delete.md) | Удаляет пользовательский тип ||
|#

### Универсальное дело

#|
|| **Метод** | **Описание** ||
|| [crm.activity.todo.add](./todo/crm-activity-todo-add.md) | Создает универсальное дело ||
|| [crm.activity.todo.updateDeadline](./todo/crm-activity-todo-update-deadline.md) | Изменяет крайний срок ||
|| [crm.activity.todo.updateDescription](./todo/crm-activity-todo-update-description.md) | Изменяет описание ||
|#

### Конфигурируемое дело

#|
|| **Метод** | **Описание** ||
|| [crm.activity.configurable.add](./configurable/crm-activity-configurable-add.md) | Добавляет новое конфигурируемое дело в таймлайн ||
|| [crm.activity.configurable.update](./configurable/crm-activity-configurable-update.md) | Обновляет конфигурируемое дело ||
|| [crm.activity.configurable.get](./configurable/crm-activity-configurable-get.md) | Получает информацию о деле по идентификатору  ||
|#

### Бейджи конфигурируемого дела

#|
|| **Метод** | **Описание** ||
|| [crm.activity.badge.add](./configurable/badges/crm-activity-badge-add.md) | Создает значок ||
|| [crm.activity.badge.get](./configurable/badges/crm-activity-badge-get.md) | Возвращает информацию о значке ||
|| [crm.activity.badge.list](./configurable/badges/crm-activity-badge-list.md) | Возвращает список всех зарегистрированных значков  ||
|| [crm.activity.badge.delete](./configurable/badges/crm-activity-badge-delete.md) | Удаляет значок ||
|#

### Дополнительные контентные блоки

#|
|| **Метод** | **Описание** ||
|| [crm.activity.layout.blocks.set](./layout-blocks/crm-activity-layout-blocks-set.md) | Устанавливает набор дополнительных контентных блоков в дело ||
|| [crm.activity.layout.blocks.get](./layout-blocks/crm-activity-layout-blocks-get.md) | Получает установленный приложением набор дополнительных контентных блоков в деле ||
|| [crm.activity.layout.blocks.delete](./layout-blocks/crm-activity-layout-blocks-delete.md) | Удаляет установленный приложением набор дополнительных контентных блоков для дела ||
|#