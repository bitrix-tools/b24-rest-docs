# Поля дела CRM

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не все описания полей есть в таблице
- для некоторых в полей в качестве типа указан метод. Как оформлять такие типы и куда ссылаться?
- у полей конфигурируемого дела нет одного типа поля

{% endnote %}

{% endif %}

## Поля системного дела

#|
|| **Поле** | **Описание** | **Примечание** ||
|| **ASSOCIATED_ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор связанной с делом сущности | Только для чтения ||
|| **AUTHOR_ID**
[`user`](../../../data-types.md)
| Создатель дела | ||
|| **AUTOCOMPLETE_RULE**
[`integer`](../../../data-types.md) | Автозаполнение | ||
|| **BINDINGS**
[`crm_activity_binding`](../../../data-types.md) | Привязки | Множественное, только для чтения. ||
|| **COMMUNICATIONS**
[`crm_activity_communication`](../../../data-types.md) | | Множественное, обязательное. ||
|| **COMPLETED**
[`char`](../../../data-types.md) | Завершено | ||
|| **CREATED**
[`datetime`](../../../data-types.md) | Создано | ||
|| **DEADLINE**
[`datetime`](../../../data-types.md) | Срок исполнения | Поле напрямую не устанавливается, значение берётся из START_TIME для звонка и встречи и из END_TIME для задачи. ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Описание | ||
|| **DESCRIPTION_TYPE**
[`crm.enum.contenttype`](../../../data-types.md) | Тип описания | ||
|| **DIRECTION**
[`crm.enum.activitydirection`](../../../data-types.md) | Направление дела: входящее/исходящее. | Актуально для звонков и писем, для встреч не используется. ||
|| **EDITOR_ID**
[`user`](../../../data-types.md) | Кто изменил | Только для чтения ||
|| **END_TIME**
[`datetime`](../../../data-types.md) | Время завершения | ||
|| **FILES**
[`diskfile`](../../../data-types.md) | Добавленные файлы | Множественное ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор дела | Только для чтения ||
|| **LAST_UPDATED**
[`datetime`](../../../data-types.md) | Дата последнего обновления | Только для чтения ||
|| **LOCATION**
[`string`](../../../data-types.md) | Местоположение. | ||
|| **NOTIFY_TYPE**
[`crm.enum.activitynotifytype`](../../../data-types.md) | Тип уведомлений | ||
|| **NOTIFY_VALUE**
[`integer`](../../../data-types.md) | | Только для чтения ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор источника данных | Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_ID**
[`string`](../../../data-types.md) | Идентификатор элемента в источнике данных | Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_VERSION**
[`string`](../../../data-types.md) | Оригинальная версия | Используется для защиты данных от случайного перетирания внешней системой. Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **OWNER_ID**
[`integer`](../../../data-types.md) | Собственник | Неизменяемое. ||
|| **OWNER_TYPE_ID**
[`crm.enum.ownertype`](../../../data-types.md) | Тип собственника | Неизменяемое. ||
|| **PRIORITY**
[`crm.enum.activitypriority`](../../../data-types.md) | Приоритет | ||
|| **PROVIDER_DATA**
[`string`](../../../data-types.md) | | ||
|| **PROVIDER_GROUP_ID**
[`string`](../../../data-types.md) | | ||
|| **PROVIDER_ID**
[`string`](../../../data-types.md) | Идентификатор провайдера | Только для чтения ||
|| **PROVIDER_TYPE_ID**
[`string`](../../../data-types.md) | Идентификатор типа провайдера | Статус из справочника ||
|| **PROVIDER_PARAMS**
[`object`](../../../data-types.md) | | ||
|| **RESPONSIBLE_ID**
[`user`](../../../data-types.md) | Ответственный | Обязательное. ||
|| **RESULT_CURRENCY_ID**
[`string`](../../../data-types.md) | | ||
|| **RESULT_MARK**
[`integer`](../../../data-types.md) | | ||
|| **RESULT_SOURCE_ID**
[`string`](../../../data-types.md) | | ||
|| **RESULT_STATUS**
[`integer`](../../../data-types.md) | | ||
|| **RESULT_STREAM**
[`integer`](../../../data-types.md) | Статистика отчётов | ||
|| **RESULT_SUM**
[`double`](../../../data-types.md) | | ||
|| **RESULT_VALUE**
[`double`](../../../data-types.md) | | ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Настройки | ||
|| **START_TIME**
[`datetime`](../../../data-types.md) | Время начала выполнения | ||
|| **STATUS**
[`crm_enum_activitystatus`](../../../data-types.md) | Статус | ||
|| **SUBJECT**
[`string`](../../../data-types.md) | Субъект | Обязательное ||
|| **TYPE_ID**
[`crm_enum_activitytype`](../../../data-types.md) | Тип | Обязательный, неизменяемый ||
|| **WEBDAV_ELEMENTS**
[`diskfile`](../../../data-types.md) | Добавленные файлы | Множественное. Устарел, сохраняется для совместимости. ||
|#

## Поля конфигурируемого дела

#|
|| **Поле** | **Описание** ||
|| **typeId**
[`unknown`](../../../data-types.md) | Тип конфигурируемого дела. Если не указано, то устанавливается значение по умолчанию `CONFIGURABLE`. Если указано, то значение должно соответствовать одному из типов, созданных методом [crm.activity.type.add](./types/crm-activity-type-add.md) с полем IS_CONFIGURABLE_TYPE равным `Y` в контексте того же rest-приложения. ||
|| **completed**
[`boolean`](../../../data-types.md) | Закрыто ли дело. Для установки значения можно использовать: Y/N,1/0, true/false. ||
|| **deadline**
[`datetime`](../../../data-types.md) | Крайний срок. ||
|| **pingOffsets**
[`array`](../../../data-types.md) | Массив смещений в секундах относительно крайнего срока, определяющий когда нужно сформировать записи-пинги по этому делу. ||
|| **isIncomingChannel**
[`boolean`](../../../data-types.md) | Дело из входящего канала. Для установки значения можно использовать: Y/N,1/0, true/false.  ||
|| **responsibleId**
[`user`](../../../data-types.md) | Ответственный. ||
|| **badgeCode**
[`string`](../../../data-types.md) | Код значка на канбане, соответствующего делу (смотри [crm.activity.badge.list](./badges/crm-activity-badge-list.md)). ||
|| **originatorId**
[`string`](../../../data-types.md) | Идентификатор источника данных. ||
|| **originId**
[`string`](../../../data-types.md) | Идентификатор элемента в источнике данных. ||
|#