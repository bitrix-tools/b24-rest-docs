# О пользовательских полях реквизитов

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

В этом разделе представлены методы для работы с пользовательскими полями реквизитов.
Для реквизитов могут создаваться пользовательские поля только следующих типов: [`string`](../../universal/user-defined-fields/crm-userfield-types.md), [`boolean`](../../universal/user-defined-fields/crm-userfield-types.md), [`double`](../../universal/user-defined-fields/crm-userfield-types.md), [`datetime`](../../universal/user-defined-fields/crm-userfield-types.md).

Описание общих методов работы с пользовательскими полями смотрите в разделе [Пользовательские поля в CRM](../../universal/user-defined-fields/index.md).

## Поля, описывающие пользовательское поле реквизита

#|
|| **Название**
`тип` | **Описание** | **Чтение** | **Запись** | **Обязательное** | **Неизменяемое** | **Множественное** ||
|| **ID**
[`int`](../../../data-types.md) | Идентификатор пользовательского поля | Да | Нет | Нет | Нет | Нет ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор сущности, к которой относится пользовательское поле. Для реквизитов это всегда `CRM_REQUISITE` | Да | Да | Да | Да | Нет ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Символьный код. Для реквизитов всегда начинается с префикса `UF_CRM_` | Да | Да | Да | Да | Нет ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип данных ([`string`](../../universal/user-defined-fields/crm-userfield-types.md), [`boolean`](../../universal/user-defined-fields/crm-userfield-types.md), [`double`](../../universal/user-defined-fields/crm-userfield-types.md) или [`datetime`](../../universal/user-defined-fields/crm-userfield-types.md)) | Да | Да | Да | Да | Нет ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком | Да | Да | Нет | Нет | Нет ||
|| **SORT**
[`int`](../../../data-types.md) | Сортировка | Да | Да | Нет | Нет | Нет ||
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
[`string`](../../../data-types.md) | Подпись в форме редактирования | Да | Да | Нет | Нет | Нет ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md) | Заголовок в списке | Да | Да | Нет | Нет | Нет ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md) | Подпись фильтра в списке | Да | Да | Нет | Нет | Нет ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Сообщение об ошибке | Да | Да | Нет | Нет | Нет ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md) | Помощь | Да | Да | Нет | Нет | Нет ||
|| **LIST**
[`uf_enum_element`](../../../data-types.md) | Элементы списка. Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-enumeration-fields.md) | Да | Да | Нет | Нет | Да ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные настройки (зависят от типа). Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-settings-fields.md) | Да | Да | Нет | Нет | Нет ||
|#

## Обзор методов

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.userfield.add.md](crm-requisite-userfield-add.md) | Создает новое пользовательское поле для реквизита ||
|| [crm.requisite.userfield.update.md](crm-requisite-userfield-update.md) | Изменяет существующее пользовательское поле реквизита ||
|| [crm.requisite.userfield.get.md](crm-requisite-userfield-get.md) | Возвращает пользовательское поле реквизита по идентификатору ||
|| [crm.requisite.userfield.list.md](crm-requisite-userfield-list.md) | Возвращает список пользовательских полей реквизита по фильтру ||
|| [crm.requisite.userfield.delete.md](crm-requisite-userfield-delete.md) | Удаляет пользовательское поле реквизита ||
|#