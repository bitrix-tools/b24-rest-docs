# Дела в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дела — звонки, встречи, письма, задачи и другие действия, которые сотрудники выполняют с клиентом. Дело привязано к одному или нескольким элементам CRM и показывается в их карточках. Методы REST 3.0 читают дела, завершают их и возвращают в работу, удаляют, меняют привязки к элементам и работают с письмами CRM: читают текст, цепочку и отправляют ответ.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Дела в CRM](https://helpdesk.bitrix24.ru/open/21623188/)

{% note warning "" %}

Создавать и изменять дела методы REST 3.0 пока не умеют. Используйте методы предыдущей версии: [crm.activity.todo.add](../../timeline/activities/todo/crm-activity-todo-add.md) для универсального дела и [crm.activity.add](../../timeline/activities/activity-base/crm-activity-add.md) для дел других типов.

{% endnote %}

## Как выбрать метод

Методы чтения и изменения дела есть в двух вариантах: в контексте типа объекта и без него.

#|
|| **Вариант** | **Пример** | **Когда использовать** ||
|| В контексте типа объекта | `crm.deal.activity.get`, `crm.smartprocess1038.activity.list` | Работа с делами одного элемента CRM. Метод находит только дела, привязанные к элементу этого типа. Список дел элемента — [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|| Без типа объекта | `crm.activity.get`, `crm.activity.list` | Дело известно по идентификатору, а к чему оно привязано — неважно. [crm.activity.list](./crm-activity-list-rest-v3.md) возвращает дела всего Битрикс24 и доступен только администратору ||
|#

Тип объекта задает сегмент `<тип>` в имени метода:

#|
|| **Тип объекта** | **Сегмент в имени метода** ||
|| Сделка | `deal` ||
|| Лид | `lead` ||
|| Контакт | `contact` ||
|| Компания | `company` ||
|| Предложение | `quote` ||
|| Счет | `smartinvoice` ||
|| Документ CRM | `smartdocument` ||
|| Смарт-процесс | `smartprocess<entityTypeId>`, например `smartprocess1038` ||
|#

У моей компании и документов КЭДО методов дел нет. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Имена методов пишутся в нижнем регистре: `crm.deal.activity.get`. Исключение — методы писем `crm.activity.mail.getContent` и `crm.activity.mail.getThread`: их имена пишутся с заглавными буквами, как в таблице методов.

## Связь с другими объектами

Дело связано с элементами CRM, сотрудниками и почтой.

**Элементы CRM.** Дело привязано к одному или нескольким элементам: привязки приходят в поле `bindings` парами `entityTypeId` и `entityId`. Право на дело следует из прав на элементы, к которым оно привязано. Привязки меняют методы [crm.activity.binding.bind](./crm-activity-binding-bind-rest-v3.md), [unbind](./crm-activity-binding-unbind-rest-v3.md) и [move](./crm-activity-binding-move-rest-v3.md). Последнюю привязку снять нельзя, ее можно только перенести на другой элемент. Идентификаторы типов объектов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md).

**Сотрудники.** В `assignedById` — ответственный, в `authorId` — автор, в `editorId` — последний, кто изменял дело. Данные сотрудников можно получить методом [user.get](../../../user/user-get.md).

**Почта.** Письма CRM — дела с `providerId` равным `CRM_EMAIL`. Текст письма возвращает [crm.activity.mail.getContent](./crm-activity-mail-get-content-rest-v3.md), всю переписку — [crm.activity.mail.getThread](./crm-activity-mail-get-thread-rest-v3.md), ответ отправляет [crm.activity.mail.reply](./crm-activity-mail-reply-rest-v3.md).

## Поля дела {#fields}

Методы `get` и `list` без `select` возвращают все поля из таблицы. Чтобы получить часть полей, перечислите их в `select`. Поля только для чтения: методы REST 3.0 не меняют поля дела.

#|
|| **Поле**
`тип` | **Описание** | **Фильтр** | **Сортировка** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор дела | Да | Да ||
|| **type**
[`string`](../../../data-types.md) | Вид дела.

Возможные значения:

- `meeting` — встреча
- `call` — звонок
- `task` — задача
- `email` — письмо
- `activity` — дело
- `provider` — дело, которое ведет провайдер, например универсальное дело `CRM_TODO` | Да | Нет ||
|| **providerId**
[`string`](../../../data-types.md) | Провайдер дела, например `CRM_TODO`, `CRM_EMAIL`, `VOXIMPLANT_CALL`. Провайдеры возвращает метод [crm.dictionary.activityprovider.list](../dictionaries/crm-dictionary-list-rest-v3.md) | Да | Нет ||
|| **providerTypeId**
[`string`](../../../data-types.md) | Подтип дела у провайдера, например `TODO` | Да | Нет ||
|| **subject**
[`string`](../../../data-types.md) | Тема дела | Нет | Нет ||
|| **description**
[`string`](../../../data-types.md) | Описание дела. Формат задает `descriptionType` | Нет | Нет ||
|| **descriptionType**
[`string`](../../../data-types.md) | Формат описания: `plain` — текст, `bbcode` — BB-код, `html` — HTML | Нет | Нет ||
|| **isCompleted**
[`boolean`](../../../data-types.md) | `true` — дело завершено, `false` — в работе | Да | Нет ||
|| **assignedById**
[`integer`](../../../data-types.md) | Идентификатор ответственного | Да | Нет ||
|| **authorId**
[`integer`](../../../data-types.md) | Идентификатор автора | Нет | Нет ||
|| **editorId**
[`integer`](../../../data-types.md) | Идентификатор сотрудника, который последним изменил дело | Нет | Нет ||
|| **originatorId**
[`string`](../../../data-types.md) | Внешняя система, из которой импортировано дело. `null`, если дело создано в Битрикс24 | Нет | Нет ||
|| **originId**
[`string`](../../../data-types.md) | Идентификатор дела во внешней системе | Нет | Нет ||
|| **isImportant**
[`boolean`](../../../data-types.md) | `true` — у дела высокая важность | Нет | Нет ||
|| **direction**
[`string`](../../../data-types.md) | Направление коммуникации: `incoming` — входящее, `outgoing` — исходящее, `undefined` — без направления | Да | Нет ||
|| **isIncomingChannel**
[`boolean`](../../../data-types.md) | `true` — дело пришло из канала входящих обращений | Нет | Нет ||
|| **createdTime**
[`datetime`](../../../data-types.md) | Дата и время создания | Да | Да ||
|| **updatedTime**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения | Да | Да ||
|| **startTime**
[`datetime`](../../../data-types.md) | Начало дела | Да | Да ||
|| **endTime**
[`datetime`](../../../data-types.md) | Окончание дела | Нет | Да ||
|| **deadlineTime**
[`datetime`](../../../data-types.md) | Крайний срок. `null`, если срока нет | Да | Да ||
|| **bindings**
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязано дело: `entityTypeId` — тип объекта, `entityId` — идентификатор элемента | Нет | Нет ||
|| **communications**
[`object[]`](../../../data-types.md) | Контакты коммуникации: `type` — канал, например `EMAIL` или `PHONE`, `value` — адрес или номер, `entityTypeId` и `entityId` — элемент CRM, которому принадлежит адрес. Если у вас нет доступа к элементу, `value`, `entityTypeId` и `entityId` равны `null` | Нет | Нет ||
|| **files**
[`object[]`](../../../data-types.md) | Файлы дела: `id`, `name`, `url`, `downloadUrl` | Нет | Нет ||
|#

Пустые `bindings`, `communications` и `files` приходят пустым массивом `[]`. Поле `assignedBy`, `author` и `editor` с данными сотрудника `select` принимает, но в ответе возвращает только идентификатор: `assignedById`, `authorId` или `editorId`.

Чтобы найти дела без крайнего срока, используйте условие `["deadlineTime","=",null]`. При сортировке по `deadlineTime` дела без срока могут оказаться и в начале, и в конце списка.

Описание полей с признаками `filterable` и `sortable` возвращают методы `crm.<тип>.activity.field.list` и `crm.<тип>.activity.field.get`, для методов без типа — `crm.activity.field.list` и `crm.activity.field.get`. Они устроены как остальные методы полей REST 3.0: `field.list` принимает `select` со списком признаков, `field.get` — еще и `name` с именем поля, например `{"name":"deadlineTime"}`. Описание полей привязки возвращают `crm.activity.binding.field.list` и `crm.activity.binding.field.get`.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Дела элемента CRM

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md) | Возвращает дело, привязанное к элементу этого типа объекта ||
|| [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) | Возвращает дела одного элемента ||
|| [crm.<тип>.activity.delete](./crm-entity-activity-delete-rest-v3.md) | Удаляет дело ||
|| [crm.<тип>.activity.complete](./crm-entity-activity-complete-rest-v3.md) | Завершает дело ||
|| [crm.<тип>.activity.uncomplete](./crm-entity-activity-uncomplete-rest-v3.md) | Возвращает дело в работу ||
|| `crm.<тип>.activity.field.list` | Возвращает описание полей дела ||
|| `crm.<тип>.activity.field.get` | Возвращает описание поля дела по имени ||
|#

### Дела без типа объекта

#|
|| **Метод** | **Описание** ||
|| [crm.activity.get](./crm-activity-get-rest-v3.md) | Возвращает дело по идентификатору ||
|| [crm.activity.list](./crm-activity-list-rest-v3.md) | Возвращает дела всего Битрикс24, только для администратора ||
|| [crm.activity.delete](./crm-activity-delete-rest-v3.md) | Удаляет дело ||
|| [crm.activity.complete](./crm-activity-complete-rest-v3.md) | Завершает дело ||
|| [crm.activity.uncomplete](./crm-activity-uncomplete-rest-v3.md) | Возвращает дело в работу ||
|| `crm.activity.field.list` | Возвращает описание полей дела ||
|| `crm.activity.field.get` | Возвращает описание поля дела по имени ||
|#

### Привязки дела

#|
|| **Метод** | **Описание** ||
|| [crm.activity.binding.bind](./crm-activity-binding-bind-rest-v3.md) | Привязывает дело к элементу CRM ||
|| [crm.activity.binding.unbind](./crm-activity-binding-unbind-rest-v3.md) | Отвязывает дело от элемента CRM ||
|| [crm.activity.binding.move](./crm-activity-binding-move-rest-v3.md) | Переносит привязку дела на другой элемент CRM ||
|| [crm.activity.binding.list](./crm-activity-binding-list-rest-v3.md) | Возвращает привязки дела ||
|| `crm.activity.binding.field.list` | Возвращает описание полей привязки ||
|| `crm.activity.binding.field.get` | Возвращает описание поля привязки по имени ||
|#

### Письма

#|
|| **Метод** | **Описание** ||
|| [crm.activity.mail.getContent](./crm-activity-mail-get-content-rest-v3.md) | Возвращает текст и адресатов письма ||
|| [crm.activity.mail.getThread](./crm-activity-mail-get-thread-rest-v3.md) | Возвращает цепочку писем ||
|| [crm.activity.mail.reply](./crm-activity-mail-reply-rest-v3.md) | Отправляет ответ на письмо ||
|#
