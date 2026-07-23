# Пользовательские поля реквизитов CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля реквизитов дополняют стандартный набор полей реквизита собственными данными интеграции или бизнеса.

Для реквизитов могут создаваться пользовательские поля только следующих типов: [`string`](../../universal/user-defined-fields/crm-userfield-types.md), [`boolean`](../../universal/user-defined-fields/crm-userfield-types.md), [`double`](../../universal/user-defined-fields/crm-userfield-types.md), [`datetime`](../../universal/user-defined-fields/crm-userfield-types.md).

Общие правила работы с пользовательскими полями описаны на странице [Пользовательские поля в CRM](../../universal/user-defined-fields/index.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

## Как начать работу

1. Укажите объект пользовательского поля `ENTITY_ID` со значением `CRM_REQUISITE`
2. Выберите тип данных `USER_TYPE_ID`: `string`, `boolean`, `double` или `datetime`
3. Задайте символьный код `FIELD_NAME` с префиксом `UF_CRM_`
4. Создайте поле методом [crm.requisite.userfield.add](./crm-requisite-userfield-add.md)
5. Получите список пользовательских полей методом [crm.requisite.userfield.list](./crm-requisite-userfield-list.md)
6. Измените или удалите поле методами [crm.requisite.userfield.update](./crm-requisite-userfield-update.md) и [crm.requisite.userfield.delete](./crm-requisite-userfield-delete.md)

## Идентификаторы пользовательского поля

- `ID` — идентификатор пользовательского поля. Его возвращают методы [crm.requisite.userfield.add](./crm-requisite-userfield-add.md), [crm.requisite.userfield.get](./crm-requisite-userfield-get.md) и [crm.requisite.userfield.list](./crm-requisite-userfield-list.md)
- `ENTITY_ID` — идентификатор объекта, к которому относится пользовательское поле. Для реквизитов всегда передавайте `CRM_REQUISITE`
- `FIELD_NAME` — символьный код пользовательского поля. Для реквизитов код всегда начинается с префикса `UF_CRM_`
- `USER_TYPE_ID` — тип данных пользовательского поля. Доступные значения: `string`, `boolean`, `double`, `datetime`

## Поля, описывающие пользовательское поле реквизита

Обязательные поля отмечены `*`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`int`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID***
[`string`](../../../data-types.md) | Идентификатор объекта, к которому относится пользовательское поле. Для реквизитов это всегда `CRM_REQUISITE` ||
|| **FIELD_NAME***
[`string`](../../../data-types.md) | Символьный код. Для реквизитов всегда начинается с префикса `UF_CRM_` ||
|| **USER_TYPE_ID***
[`string`](../../../data-types.md) | Тип данных ([`string`](../../universal/user-defined-fields/crm-userfield-types.md), [`boolean`](../../universal/user-defined-fields/crm-userfield-types.md), [`double`](../../universal/user-defined-fields/crm-userfield-types.md) или [`datetime`](../../universal/user-defined-fields/crm-userfield-types.md)) ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **SORT**
[`int`](../../../data-types.md) | Сортировка ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Признак множественности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **MANDATORY**
[`char`](../../../data-types.md) | Признак обязательности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока
||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md) | Подпись в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md) | Заголовок в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md) | Подпись фильтра в списке ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md) | Помощь ||
|| **LIST**
[`uf_enum_element`](../../../data-types.md) | Элементы списка. Подробное описание полей элемента доступно на странице [{#T}](../../universal/user-defined-fields/crm-userfield-enumeration-fields.md) ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные настройки, которые зависят от типа поля. Подробное описание настроек доступно на странице [{#T}](../../universal/user-defined-fields/crm-userfield-settings-fields.md) ||
|#

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.userfield.add](./crm-requisite-userfield-add.md) | Создает новое пользовательское поле для реквизита ||
|| [crm.requisite.userfield.update](./crm-requisite-userfield-update.md) | Изменяет существующее пользовательское поле реквизита ||
|| [crm.requisite.userfield.get](./crm-requisite-userfield-get.md) | Возвращает пользовательское поле реквизита по идентификатору ||
|| [crm.requisite.userfield.list](./crm-requisite-userfield-list.md) | Возвращает список пользовательских полей реквизита по фильтру ||
|| [crm.requisite.userfield.delete](./crm-requisite-userfield-delete.md) | Удаляет пользовательское поле реквизита ||
|#
