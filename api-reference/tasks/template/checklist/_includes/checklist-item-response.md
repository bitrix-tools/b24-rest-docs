#### Объект checkListItem {#checklistitem}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](/api-reference/data-types.html) | Идентификатор пункта чек-листа ||
|| **copiedId**
[`integer`](/api-reference/data-types.html) | Идентификатор исходного пункта, если пункт создан копированием. Для пунктов, созданных через REST, возвращается `null` ||
|| **userId**
[`integer`](/api-reference/data-types.html) | Идентификатор пользователя, который выполнил запрос ||
|| **createdBy**
[`integer`](/api-reference/data-types.html) | Идентификатор автора пункта. Заполняется в ответе метода `tasks.template.checklist.add`, в ответах остальных методов возвращается `null` ||
|| **parentId**
[`integer`](/api-reference/data-types.html) | Идентификатор родительского пункта. Значение `0` означает корневой пункт — название чек-листа ||
|| **title**
[`string`](/api-reference/data-types.html) | Текст пункта чек-листа ||
|| **sortIndex**
[`integer`](/api-reference/data-types.html) | Индекс сортировки среди пунктов одного уровня. Чем меньше значение, тем выше пункт ||
|| **displaySortIndex**
[`string`](/api-reference/data-types.html) | Служебное поле порядка отображения. Для пунктов шаблона возвращается пустая строка ||
|| **isComplete**
[`boolean`](/api-reference/data-types.html) | Статус выполнения пункта: `true` — выполнен, `false` — не выполнен ||
|| **isImportant**
[`boolean`](/api-reference/data-types.html) | Отметка важности пункта: `true` — важный, `false` — обычный ||
|| **completedCount**
[`integer`](/api-reference/data-types.html) | Служебный счетчик выполненных подпунктов. Для пунктов шаблона возвращается `0` ||
|| **members**
[`array`](/api-reference/data-types.html) | Массив объектов с [описанием участников](#members).

Если участников нет, возвращается пустой массив `[]` ||
|| **attachments**
[`object`](/api-reference/data-types.html) | Объект с [описанием вложений](#attachments).

Если вложений нет, возвращается пустой массив `[]` ||
|| **nodeId**
[`integer`](/api-reference/data-types.html) | Служебное поле. Для пунктов шаблона возвращается `null` ||
|| **templateId**
[`integer`](/api-reference/data-types.html) | Идентификатор шаблона задачи ||
|#

#### Объект members {#members}

Состав объекта зависит от метода:

- методы `tasks.template.checklist.add` и `tasks.template.checklist.update` возвращают участников в краткой форме, если в запросе передан `fields.MEMBERS`: только `id` с типом `integer` и `type`
- в остальных случаях возвращается полный набор полей из таблицы, `id` имеет тип `string`

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](/api-reference/data-types.html) \| [`integer`](/api-reference/data-types.html) | Идентификатор пользователя ||
|| **type**
[`string`](/api-reference/data-types.html) | Роль пользователя в пункте чек-листа. Возможные значения:
- `A` — соисполнитель
- `U` — наблюдатель ||
|| **name**
[`string`](/api-reference/data-types.html) | Имя и фамилия пользователя ||
|| **personalPhoto**
[`string`](/api-reference/data-types.html) | Идентификатор файла с аватаром пользователя ||
|| **personalGender**
[`string`](/api-reference/data-types.html) | Пол пользователя. Возможные значения:
- `M` — мужчина
- `F` — женщина
- пустая строка — не указан ||
|| **image**
[`string`](/api-reference/data-types.html) | Ссылка на аватар пользователя ||
|| **isCollaber**
[`boolean`](/api-reference/data-types.html) | Признак, что пользователь — внешний участник из коллабы ||
|#

#### Объект attachments {#attachments}

Объект вида `{ "идентификатор прикрепления": "n<идентификатор файла>" }`, например `{"621": "n10921"}`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ключ**
[`string`](/api-reference/data-types.html) | Идентификатор прикрепления файла к пункту. Передайте его в параметре `attachmentsIds` метода [tasks.template.checklist.removeAttachments](/api-reference/tasks/template/checklist/tasks-template-checklist-remove-attachments.html), чтобы удалить вложение ||
|| **значение**
[`string`](/api-reference/data-types.html) | Идентификатор файла на Диске с префиксом `n`. Тот же формат принимает параметр `filesIds` метода [tasks.template.checklist.addAttachmentsFromDisk](/api-reference/tasks/template/checklist/tasks-template-checklist-add-attachments-from-disk.html) ||
|#
