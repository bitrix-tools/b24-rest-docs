# Шаблоны в генераторе документов

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение шаблонов генератора документов

Методы раздела позволяют создавать, изменять, получать и удалять шаблоны, а также получать карточку полей шаблона.

Особенности REST-методов `documentgenerator.template.*`:
- шаблоны создаются в модуле `rest` и привязаны к единственному провайдеру `\Bitrix\DocumentGenerator\DataProvider\Rest`.
- при создании `moduleId` и `providers` заполняются автоматически.
- при получении списка по умолчанию возвращаются только неудаленные шаблоны (`isDeleted = "N"`).
- Так как интерфейс должен быть реализован самостоятельно, то настройки видимости (параметр `fields[users]`) нужны только самому приложению. Аналогично индекс сортировки (параметр `fields[sort]`) и активность (параметр `fields[active]`).

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.template.add](./document-generator-template-add.md) | Добавляет новый шаблон документа ||
|| [documentgenerator.template.update](./document-generator-template-update.md) | Обновляет существующий шаблон ||
|| [documentgenerator.template.get](./document-generator-template-get.md) | Возвращает шаблон по идентификатору ||
|| [documentgenerator.template.list](./document-generator-template-list.md) | Возвращает список шаблонов по фильтру ||
|| [documentgenerator.template.delete](./document-generator-template-delete.md) | Удаляет шаблон ||
|| [documentgenerator.template.getfields](./document-generator-template-get-fields.md) | Возвращает поля шаблона и их текущие значения ||
|#
