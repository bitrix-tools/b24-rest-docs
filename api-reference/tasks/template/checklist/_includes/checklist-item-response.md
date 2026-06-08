#### Объект checkListItem {#checklistitem}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](/api-reference/data-types.html) | Идентификатор пункта чек-листа ||
|| **copiedId**
[`integer`](/api-reference/data-types.html) | Идентификатор исходного пункта при копировании, если есть ||
|| **userId**
[`integer`](/api-reference/data-types.html) | Идентификатор пользователя, в контексте которого сформирован объект ||
|| **createdBy**
[`integer`](/api-reference/data-types.html) | Идентификатор автора пункта ||
|| **parentId**
[`integer`](/api-reference/data-types.html) | Идентификатор родительского пункта. Значение `0` означает корневой пункт ||
|| **title**
[`string`](/api-reference/data-types.html) | Текст пункта чек-листа ||
|| **sortIndex**
[`integer`](/api-reference/data-types.html) | Индекс сортировки. Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **displaySortIndex**
[`string`](/api-reference/data-types.html) | Вспомогательное значение порядка отображения ||
|| **isComplete**
[`boolean`](/api-reference/data-types.html) | Статус выполнения пункта ||
|| **isImportant**
[`boolean`](/api-reference/data-types.html) | Отметка важности пункта ||
|| **completedCount**
[`integer`](/api-reference/data-types.html) | Количество завершений пункта ||
|| **members**
[`array`](/api-reference/data-types.html) | Массив объектов с [описанием участников](#members).

Если данных нет, возвращается пустой массив `[]` ||
|| **attachments**
[`object`](/api-reference/data-types.html) | Объект с [описанием вложений](#attachments).

Если данных нет, возвращается пустой массив `[]` ||
|| **nodeId**
[`integer`](/api-reference/data-types.html) | Служебный идентификатор узла, если используется ||
|| **templateId**
[`integer`](/api-reference/data-types.html) | Идентификатор шаблона задачи ||
|#

#### Объект members {#members}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](/api-reference/data-types.html) | Идентификатор пользователя ||
|| **type**
[`string`](/api-reference/data-types.html) | Роль пользователя в пункте чек-листа. Возможные значения:
- `A` — соисполнитель
- `U` — наблюдатель ||
|| **name**
[`string`](/api-reference/data-types.html) | Имя пользователя ||
|| **personalPhoto**
[`string`](/api-reference/data-types.html) | Идентификатор файла с аватаром пользователя на Диске ||
|| **personalGender**
[`string`](/api-reference/data-types.html) | Пол пользователя. Возможные значения:
- `M` — мужчина
- `F` — женщина ||
|| **image**
[`string`](/api-reference/data-types.html) | Ссылка на аватар пользователя ||
|| **isCollaber**
[`boolean`](/api-reference/data-types.html) | Признак, что пользователь является внешним участником ||
|#

#### Объект attachments {#attachments}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachmentId**
[`string`](/api-reference/data-types.html) | Идентификатор файла на Диске в формате `n<fileId>`, где ключ — идентификатор прикрепления ||
|#
