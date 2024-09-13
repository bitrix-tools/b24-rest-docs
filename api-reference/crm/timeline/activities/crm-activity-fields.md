# Получить список полей дела crm.activity.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.fields` возвращает описание полей активности.

## Параметры

Без параметров

## Примеры

```js
BX24.callMethod(
    "crm.activity.fields",
    {},
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые поля

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